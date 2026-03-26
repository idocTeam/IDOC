import express from "express";
import cors from "cors";
import morgan from "morgan";

import doctorAuthRoutes from "./routes/doctorAuthRoutes.js";
import doctorProfileRoutes from "./routes/doctorProfileRoutes.js";

const app = express();

// -----------------------------
// Global Middlewares
// -----------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// -----------------------------
// Health Check Route
// -----------------------------
app.get("/", (req, res) => {
  res.status(200).json({
    service: "doctor-service",
    status: "running",
    message: "Doctor service is up and running"
  });
});

// -----------------------------
// API Routes
// -----------------------------
app.use("/api/doctors/auth", doctorAuthRoutes);
app.use("/api/doctors/profile", doctorProfileRoutes);

// -----------------------------
// 404 Route Handler
// -----------------------------
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// -----------------------------
// Global Error Handler
// -----------------------------
app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
});

export default app;