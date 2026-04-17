import axios from "axios";

export const sendAppointmentPaymentSuccessNotification = async ({
  recipient,
  data
}) => {
  const notificationServiceBaseUrl = String(process.env.NOTIFICATION_SERVICE_URL || "").replace(/\/+$/, "");
  const sendUrl = notificationServiceBaseUrl.endsWith("/api/notifications")
    ? `${notificationServiceBaseUrl}/send`
    : `${notificationServiceBaseUrl}/api/notifications/send`;

  const response = await axios.post(
    sendUrl,
    {
      type: "APPOINTMENT_PAYMENT_SUCCESS",
      recipient,
      channels: ["email"],
      data
    }
  );

  return response.data;
};