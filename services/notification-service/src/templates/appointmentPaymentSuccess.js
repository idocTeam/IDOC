const appointmentPaymentSuccessTemplate = (data = {}) => {
  const {
    patientName = "Patient",
    appointmentId = "",
    patientId = "",
    doctorName = "",
    appointmentDate = "",
    startTime = "",
    endTime = "",
    paymentStatus = "paid",
    consultationType = "",
    videoMeetingLink = ""
  } = data;

  const subject = `Payment Successful - Appointment #${appointmentId}`;

  const text = `
Dear ${patientName},

Your appointment payment was completed successfully.

Appointment ID: #${appointmentId}
Patient ID: ${patientId}
Doctor Name: ${doctorName}
Date: ${appointmentDate}
Time: ${startTime} - ${endTime}
Payment Status: ${paymentStatus}
Consultation Type: ${consultationType}
${videoMeetingLink ? `Video Meeting Link: ${videoMeetingLink}` : ""}

Regards,
iDoc Team
  `.trim();

  const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background-color: #00BFA6; height: 6px;"></div>

        <div style="padding: 30px; color: #333333;">
          <div style="margin-bottom: 25px;">
             <span style="color: #0086FF; font-size: 26px; font-weight: bold; display: flex; align-items: center;">
               <span style="margin-right: 8px;">💙</span> IDOC.
             </span>
          </div>

          <h2 style="color: #1a1a1a; margin-top: 0; font-size: 22px;">Payment Confirmation</h2>
          <p style="font-size: 16px;">Dear <strong>${patientName}</strong>,</p>
          <p style="font-size: 15px; color: #666666;">Your appointment payment was completed successfully. Here are your appointment details:</p>

          <div style="background-color: #f6fff9; border-left: 4px solid #00BFA6; padding: 20px; margin: 25px 0; border-radius: 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666666; width: 40%; font-size: 14px;"><strong>Appointment ID</strong></td>
                <td style="padding: 10px 0; font-family: monospace; font-size: 14px; color: #1a1a1a;">#${appointmentId}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666666; font-size: 14px;"><strong>Patient ID</strong></td>
                <td style="padding: 10px 0; font-family: monospace; font-size: 14px; color: #1a1a1a;">${patientId}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666666; font-size: 14px;"><strong>Doctor Name</strong></td>
                <td style="padding: 10px 0; font-size: 14px; color: #1a1a1a;">${doctorName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666666; font-size: 14px;"><strong>Date</strong></td>
                <td style="padding: 10px 0; font-size: 14px; color: #1a1a1a;">${appointmentDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666666; font-size: 14px;"><strong>Time</strong></td>
                <td style="padding: 10px 0; font-size: 14px; color: #1a1a1a;">${startTime} - ${endTime}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666666; font-size: 14px;"><strong>Payment Status</strong></td>
                <td style="padding: 10px 0; font-size: 14px; color: #1a1a1a;">${paymentStatus}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666666; font-size: 14px;"><strong>Consultation Type</strong></td>
                <td style="padding: 10px 0;">
                  <span style="background: #e0f7f4; color: #00BFA6; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                    ${consultationType}
                  </span>
                </td>
              </tr>
            </table>
          </div>

          ${videoMeetingLink ? `
          <div style="text-align: center; margin: 30px 0; padding: 25px; border: 1px dashed #0086FF; border-radius: 12px;">
            <p style="margin-top: 0; font-size: 14px; color: #666666; margin-bottom: 15px;">Your telemedicine link is ready:</p>
            <a href="${videoMeetingLink}" target="_blank" style="background-color: #0086FF; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; display: inline-block;">
              Join Video Consultation
            </a>
          </div>
          ` : ""}

          <p style="margin-top: 20px; font-size: 14px; color: #666666;">Please keep this email for your records.</p>

          <p style="font-size: 13px; color: #999999; margin-top: 30px; line-height: 1.5; text-align: center;">
            <span style="color: #0086FF; font-weight: bold;">iDoc Team 💙</span>
          </p>
        </div>

        <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #eeeeee;">
          © ${new Date().getFullYear()} iDoc Health Services. All rights reserved.
        </div>
      </div>
    `;

  return { subject, text, html };
};

export default appointmentPaymentSuccessTemplate;