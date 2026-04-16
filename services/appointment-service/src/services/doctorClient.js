// src/services/doctorClient.js

import axios from "axios";

/**
 * Fetch doctor booking context from doctor-service
 */
export const getDoctorById = async (doctorId) => {
  const DOCTOR_SERVICE_URL = process.env.DOCTOR_SERVICE_URL;

  try {
    const url = `${DOCTOR_SERVICE_URL}/availability/internal/${doctorId}/booking-context`;

    console.log("DOCTOR_SERVICE_URL =", DOCTOR_SERVICE_URL);
    console.log("Calling doctor-service:", url);

    const res = await axios.get(url);

    return res.data.doctor;
  } catch (err) {
    console.error("doctorClient error status:", err.response?.status);
    console.error("doctorClient error data:", err.response?.data);
    console.error("doctorClient error message:", err.message);

    throw new Error("Doctor service unavailable");
  }
};