import Doctor from "../models/Doctor.js";

// Small helper to safely build regex search
const escapeRegex = (value = "") => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// Public-safe fields for patient-facing responses
const PUBLIC_DOCTOR_FIELDS =
  "fullName specialty qualifications hospital consultationFee bio experienceYears availability createdAt updatedAt";

// Internal fields for doctor/internal-service use
const INTERNAL_DOCTOR_FIELDS =
  "-pw";


// Common query builder for approved + active doctors
const buildApprovedDoctorQuery = () => {
  const query = { approvalStatus: "approved" };

  // Only apply isActive filter if your schema has that field
  if (Doctor.schema.path("isActive")) {
    query.isActive = true;
  }

  return query;
};



// Doctor views own full profile
export const getMyDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id).select(INTERNAL_DOCTOR_FIELDS);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found."
      });
    }

    return res.status(200).json({
      doctor
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch doctor profile.",
      error: error.message
    });
  }
};