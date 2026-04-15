// src/templates/appointmentAccepted.js

const appointmentAcceptedTemplate = (data = {}) => {
  const {
    patientName = "Patient",
    doctorName = "Doctor",
    appointmentDate = "",
    startTime = "",
    consultationType = "",
    appointmentId = ""
  } = data;

  const subject = "Your appointment has been accepted";

  const text = `
Hello ${patientName},

Your appointment has been accepted.

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
      <h2>Appointment Accepted</h2>
      <p>Hello ${patientName},</p>
      <p>Your appointment has been accepted.</p>
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

export default appointmentAcceptedTemplate;