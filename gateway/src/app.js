import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

/*
  Important:
  Do NOT use express.json() before proxy middleware here.
  If you parse the body first, proxied POST/PUT/PATCH requests
  can break unless you manually restream the body.
  Since this gateway mainly forwards requests, keep it lean.
*/

// Basic CORS
const allowedOrigins = (process.env.CORS_ORIGINS || "*")
  .split(",")
  .map((item) => item.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman / curl / same-machine requests without browser origin
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes("*") ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      return callback(new Error("CORS blocked by API Gateway"));
    }
  })
);

app.use(morgan("dev"));

// Health route
app.get("/", (_req, res) => {
  res.status(200).json({
    service: "api-gateway",
    status: "running",
    routes: {
      admin: "/api/admin",
      doctors: "/api/doctors",
      patients: "/api/patients",
      uploads: "/uploads"
    }
  });
});

// Common proxy factory
const buildProxy = (target, serviceName) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    xfwd: true,
    proxyTimeout: 60000,
    timeout: 60000,
    onError: (err, _req, res) => {
      if (!res.headersSent) {
        res.status(502).json({
          message: `${serviceName} is unavailable through gateway`,
          error: err.message
        });
      }
    }
  });

// Route proxies
app.use(
  "/api/admin",
  buildProxy(process.env.ADMIN_SERVICE_URL, "admin-service")
);

app.use(
  "/api/doctors",
  buildProxy(process.env.DOCTOR_SERVICE_URL, "doctor-service")
);

app.use(
  "/api/patients",
  buildProxy(process.env.PATIENT_SERVICE_URL, "patient-service")
);

// Static uploaded files from patient-service
app.use(
  "/uploads",
  buildProxy(process.env.PATIENT_SERVICE_URL, "patient-service uploads")
);

// 404
app.use((_req, res) => {
  res.status(404).json({
    message: "Gateway route not found"
  });
});

export default app;