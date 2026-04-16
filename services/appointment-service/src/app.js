// src/app.js

import express from "express";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();

app.use(express.json());

// attach routes
app.use("/", appointmentRoutes);

export default app;