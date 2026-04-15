// src/templates/appointmentRejected.js

const appointmentRejectedTemplate = (data = {}) => {
  const {
    patientName = "Patient",
    doctorName = "Doctor",
    appointmentDate = "",
    startTime = "",
    appointmentId = "",
    reason = "No reason provided"
  } = data;

  const subject = "Your appointment has been rejected";

  const text = `
Hello ${patientName},

We are sorry. Your appointment has been rejected.

Doctor: ${doctorName}
Date: ${appointmentDate}
Time: ${startTime}
Appointment ID: ${appointmentId}
Reason: ${reason}

Thank you,
iDoc Team
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Appointment Rejected</h2>
      <p>Hello ${patientName},</p>
      <p>We are sorry. Your appointment has been rejected.</p>
      <ul>
        <li><strong>Doctor:</strong> ${doctorName}</li>
        <li><strong>Date:</strong> ${appointmentDate}</li>
        <li><strong>Time:</strong> ${startTime}</li>
        <li><strong>Appointment ID:</strong> ${appointmentId}</li>
        <li><strong>Reason:</strong> ${reason}</li>
      </ul>
      <p>Thank you,<br/>iDoc Team</p>
    </div>
  `;

  return { subject, text, html };
};

export default appointmentRejectedTemplate;