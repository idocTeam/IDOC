import api from './api';

export const patientService = {
  login: (credentials) => api.post('/patients/auth/login', credentials),
  register: (data) => api.post('/patients/auth/register', data),
  getProfile: () => api.get('/patients/auth/me'),
  updateProfile: (data) => api.put('/patients/auth/me', data),
};

export const doctorService = {
  login: (credentials) => api.post('/doctors/auth/login', credentials),
  register: (data) => api.post('/doctors/auth/register', data),
  getAll: (params) => api.get('/doctors/profile/approved', { params }),
  search: (params) => api.get('/doctors/profile/search', { params }),
  getById: (id) => api.get(`/doctors/profile/${id}`),
  getAvailability: (id, date) => api.get(`/appointments/doctors/${id}/bookable-slots`, { params: { date } }),
};

export const appointmentService = {
  create: (data) => api.post('/appointments/create', data),
  getPatientAppointments: () => api.get('/appointments/mine'),
  getDoctorAppointments: () => api.get('/appointments/doctor/me'),
  accept: (id) => api.patch(`/appointments/${id}/accept`),
  reject: (id) => api.patch(`/appointments/${id}/reject`),
  cancel: (id) => api.patch(`/appointments/${id}/cancel`),
};

export const paymentService = {
  createCheckoutSession: (appointmentId) => api.post('/payments/create-checkout-session', { appointmentId }),
  getTicket: (appointmentId) => api.get(`/payments/ticket/${appointmentId}`),
};

export const telemedicineService = {
  getSession: (appointmentId) => api.get(`/telemedicine/sessions/appointment/${appointmentId}`),
};
