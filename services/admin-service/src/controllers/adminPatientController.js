import axios from "axios";

// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.PATIENT_SERVICE_URL}/auth/internal/all`,
      {
        headers: {
          "x-internal-service-key": process.env.INTERNAL_SERVICE_SECRET
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      message: "Failed to fetch patients.",
      error: error.response?.data || error.message
    });
  }
};

// Delete patient account
export const deletePatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Forward request to patient-service internal endpoint
    const response = await axios.delete(
      `${process.env.PATIENT_SERVICE_URL}/auth/internal/admin/${patientId}`,
      {
        headers: {
          "x-internal-service-key": process.env.INTERNAL_SERVICE_SECRET
        }
      }
    );

    return res.status(200).json({
      message: "Patient deleted successfully.",
      data: response.data
    });
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      message: "Failed to delete patient.",
      error: error.response?.data || error.message
    });
  }
};