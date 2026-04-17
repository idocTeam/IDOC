// src/utils/patientClient.js

import axios from "axios";

export const getPatientById = async (patientId) => {
  const response = await axios.get(
    `${process.env.PATIENT_SERVICE_URL}/auth/${patientId}`
  );

  return response.data?.patient || response.data || null;
};