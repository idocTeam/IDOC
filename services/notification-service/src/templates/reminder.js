// src/templates/reminder.js

const reminderTemplate = (data = {}) => {
  const {
    patientName = "Patient",
    doctorName = "Doctor",
    appointmentDate = "",
    startTime = "",
    consultationType = "",
    appointmentId = ""
  } = data;

  const subject = "Appointment reminder";

  const text = `
Hello ${patientName},

This is a reminder for your upcoming appointment.

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
      <h2>Appointment Reminder</h2>
      <p>Hello ${patientName},</p>
      <p>This is a reminder for your upcoming appointment.</p>
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

export default reminderTemplate;