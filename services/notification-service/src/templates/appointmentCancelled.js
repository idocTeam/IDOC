// src/templates/appointmentCancelled.js

const appointmentCancelledTemplate = (data = {}) => {
  const {
    patientName = "User",
    doctorName = "Doctor",
    appointmentDate = "",
    startTime = "",
    appointmentId = "",
    cancelledBy = "System"
  } = data;

  const subject = "Appointment cancelled";

  const text = `
Hello ${patientName},

Your appointment has been cancelled.

Doctor: ${doctorName}
Date: ${appointmentDate}
Time: ${startTime}
Appointment ID: ${appointmentId}
Cancelled By: ${cancelledBy}

Thank you,
iDoc Team
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Appointment Cancelled</h2>
      <p>Hello ${patientName},</p>
      <p>Your appointment has been cancelled.</p>
      <ul>
        <li><strong>Doctor:</strong> ${doctorName}</li>
        <li><strong>Date:</strong> ${appointmentDate}</li>
        <li><strong>Time:</strong> ${startTime}</li>
        <li><strong>Appointment ID:</strong> ${appointmentId}</li>
        <li><strong>Cancelled By:</strong> ${cancelledBy}</li>
      </ul>
      <p>Thank you,<br/>iDoc Team</p>
    </div>
  `;

  return { subject, text, html };
};

export default appointmentCancelledTemplate;