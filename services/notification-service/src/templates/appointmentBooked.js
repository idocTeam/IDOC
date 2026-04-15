// src/templates/appointmentBooked.js

const appointmentBookedTemplate = (data = {}) => {
  const {
    patientName = "Patient",
    doctorName = "Doctor",
    appointmentDate = "",
    startTime = "",
    consultationType = "",
    appointmentId = ""
  } = data;

  const subject = "Appointment booked successfully";

  const text = `
Hello ${patientName},

Your appointment has been booked successfully.

Doctor: ${doctorName}
Date: ${appointmentDate}
Time: ${startTime}
Consultation Type: ${consultationType}
Appointment ID: ${appointmentId}

Thank you,
iDoc Team
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Appointment Booked</h2>
      <p>Hello ${patientName},</p>
      <p>Your appointment has been booked successfully.</p>
      <ul>
        <li><strong>Doctor:</strong> ${doctorName}</li>
        <li><strong>Date:</strong> ${appointmentDate}</li>
        <li><strong>Time:</strong> ${startTime}</li>
        <li><strong>Consultation Type:</strong> ${consultationType}</li>
        <li><strong>Appointment ID:</strong> ${appointmentId}</li>
      </ul>
      <p>Thank you,<br/>iDoc Team</p>
    </div>
  `;

  return { subject, text, html };
};

export default appointmentBookedTemplate;