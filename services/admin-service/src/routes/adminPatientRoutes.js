import express from "express";
import { getAllPatients, deletePatient } from "../controllers/adminPatientController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all patients
router.get("/", protectAdmin, getAllPatients);

// Delete patient
router.delete("/:patientId", protectAdmin, deletePatient);

export default router;