// src/services/appointmentService.js

import Appointment from "../models/Appointment.js";
import { getDoctorById } from "./doctorClient.js";
import {
  buildBookableSlots,
  countAppointmentsInSlot,
  findMatchingGeneratedSlot,
  hasDoctorConflict,
  hasPatientConflict
} from "./slotService.js";

/**
 * Get bookable slots for a doctor on a given date
 */
export const getBookableSlotsForDoctor = async ({
  doctorId,
  date,
  mode = ""
}) => {
  if (!doctorId) {
    throw new Error("doctorId is required");
  }

  if (!date) {
    throw new Error("date is required");
  }

  const doctor = await getDoctorById(doctorId);

  if (!doctor || doctor.approvalStatus !== "approved") {
    throw new Error("Doctor not available");
  }

  const slots = await buildBookableSlots({
    doctorId,
    appointmentDate: date,
    consultationType: mode,
    availability: doctor.availability || []
  });

  return {
    doctor: {
      id: doctor.id,
      fullName: doctor.fullName,
      specialty: doctor.specialty,
      hospital: doctor.hospital
    },
    date,
    mode,
    slots
  };
};

/**
 * Create Appointment
 */
export const createAppointment = async (data, user) => {
  const {
    doctorId,
    appointmentDate,
    startTime,
    endTime,
    consultationType,
    reason
  } = data;

  const patientId = user.userId;

  // 1. Validate doctor
  const doctor = await getDoctorById(doctorId);

  if (!doctor || doctor.approvalStatus !== "approved") {
    throw new Error("Doctor not available");
  }

  // 2. Verify selected slot is one real generated slot
  const matched = findMatchingGeneratedSlot({
    availability: doctor.availability || [],
    appointmentDate,
    startTime,
    endTime,
    consultationType
  });

  if (!matched) {
    throw new Error("Selected time slot is not valid for this doctor");
  }

  // 3. Check doctor already booked in that exact/overlapping slot
  const doctorConflict = await hasDoctorConflict(
    doctorId,
    appointmentDate,
    startTime,
    endTime
  );

  if (doctorConflict) {
    throw new Error("Selected slot is already booked");
  }

  // 4. Check patient conflict
  const patientConflict = await hasPatientConflict(
    patientId,
    appointmentDate,
    startTime,
    endTime
  );

  if (patientConflict) {
    throw new Error("You already have another appointment at this time");
  }

  // 5. Check per-slot capacity
  const currentCount = await countAppointmentsInSlot({
    doctorId,
    appointmentDate,
    startTime,
    endTime
  });

  const maxPatientsPerSlot = matched.parentWindow.maxPatientsPerSlot || 1;

  if (currentCount >= maxPatientsPerSlot) {
    throw new Error("Selected slot is full");
  }

  // 6. Create appointment
  const appointment = new Appointment({
    patientId,
    doctorId,
    appointmentDate,
    startTime,
    endTime,
    consultationType,
    reason,
    status: "pending",
    doctorName: doctor.fullName,
    doctorSpecialty: doctor.specialty
  });

  await appointment.save();

  return appointment;
};

/**
 * Accept Appointment
 */
export const acceptAppointment = async (appointmentId, user) => {
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) throw new Error("Appointment not found");

  if (appointment.doctorId.toString() !== user.id.toString()) {
    throw new Error("Unauthorized");
  }

  if (appointment.status !== "pending") {
    throw new Error("Invalid state transition");
  }

  appointment.status = "accepted";
  await appointment.save();

  return appointment;
};

/**
 * Cancel Appointment
 */
export const cancelAppointment = async (appointmentId, user) => {
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) throw new Error("Not found");

  if (appointment.patientId.toString() !== user.userId) {
    throw new Error("Unauthorized");
  }

  if (appointment.status === "completed") {
    throw new Error("Cannot cancel completed appointment");
  }

  appointment.status = "cancelled";
  await appointment.save();

  return appointment;
};