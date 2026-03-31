// src/routes/appointmentRoutes.js

import express from "express";
import {
  create,
  accept,
  cancel,
  getBookableSlots
} from "../controllers/appointmentController.js";
import { protectPatient, protectDoctor } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/doctors/:doctorId/bookable-slots", getBookableSlots);

// patient creates appointment
router.post("/create", protectPatient, create);

// doctor accepts
router.patch("/:id/accept", protectDoctor, accept);

// patient cancels
router.patch("/:id/cancel", protectPatient, cancel);

export default router;