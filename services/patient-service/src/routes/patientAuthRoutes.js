import express from "express";
import {
  registerPatient,
  loginPatient,
  getMyPatientProfile,
  updateMyPatientProfile,
  deleteMyPatientProfile,
  getPatientById,
  deletePatientByAdmin
} from "../controllers/patientAuthController.js";
import { protectPatient } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register patient
router.post("/register", registerPatient);

// Login patient
router.post("/login", loginPatient);

// Get logged-in patient profile
router.get("/me", protectPatient, getMyPatientProfile);

// Update logged-in patient profile
router.put("/me", protectPatient, updateMyPatientProfile);

// Delete logged-in patient profile
router.delete("/me", protectPatient, deleteMyPatientProfile);

// Get all patients (Internal/Admin)
router.get("/internal/all", (req, res, next) => {
  // Simple check for internal service secret or admin middleware
  if (req.headers["x-internal-service-key"] !== process.env.INTERNAL_SERVICE_SECRET) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}, async (req, res) => {
  try {
    const Patient = (await import("../models/Patient.js")).default;
    const patients = await Patient.find({ deletedAt: null }).select("-pw");
    res.status(200).json({ patients });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get patient by ID (Internal/Admin)
router.get("/:id", getPatientById);

// NEW: delete patient account (Internal/Admin)
router.delete("/internal/admin/:id", deletePatientByAdmin);

export default router;