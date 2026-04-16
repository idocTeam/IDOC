import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, ChevronLeft, Clock, CreditCard, FileText, Loader2, User, Video } from 'lucide-react';
import { appointmentService } from '../services';
import { getStoredUser } from '../utils/session';

const AppointmentDetails = () => {
  const { id } = useParams();
  const user = getStoredUser();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const fetchAppointment = async () => {
    try {
      setLoading(true);
      const { data } = await appointmentService.getById(id);
      setAppointment(data.appointment);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load appointment details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 min-h-screen flex justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 px-4">
        <div className="max-w-3xl mx-auto card p-10 text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">Appointment Not Found</h1>
          <p className="text-slate-500">{error || 'The appointment could not be found.'}</p>
          <Link to="/dashboard" className="btn btn-primary inline-flex mx-auto">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link to="/dashboard" className="inline-flex items-center text-slate-500 hover:text-primary-600 font-bold transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="card p-8 lg:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary-600 mb-2">Appointment Details</p>
              <h1 className="text-3xl font-bold text-slate-900">{user?.role === 'patient' ? `Dr. ${appointment.doctorName}` : appointment.patientName || 'Patient'}</h1>
            </div>
            <span className="px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider self-start">
              {appointment.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
              <div className="flex items-center gap-3 text-slate-600"><Calendar className="w-5 h-5 text-primary-600" /><span className="font-medium">{appointment.appointmentDate}</span></div>
              <div className="flex items-center gap-3 text-slate-600"><Clock className="w-5 h-5 text-primary-600" /><span className="font-medium">{appointment.startTime} - {appointment.endTime}</span></div>
              <div className="flex items-center gap-3 text-slate-600"><Video className="w-5 h-5 text-primary-600" /><span className="font-medium capitalize">{appointment.consultationType === 'online' ? 'Telemedicine' : 'Physical Visit'}</span></div>
              <div className="flex items-center gap-3 text-slate-600"><CreditCard className="w-5 h-5 text-primary-600" /><span className="font-medium capitalize">Payment: {appointment.paymentStatus}</span></div>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
              <div className="flex items-center gap-3 text-slate-600"><User className="w-5 h-5 text-primary-600" /><span className="font-medium">Doctor ID: {appointment.doctorId}</span></div>
              <div className="flex items-center gap-3 text-slate-600"><User className="w-5 h-5 text-primary-600" /><span className="font-medium">Patient ID: {appointment.patientId}</span></div>
              <div className="flex items-start gap-3 text-slate-600"><FileText className="w-5 h-5 text-primary-600 mt-0.5" /><span className="font-medium">Reason: {appointment.reason || 'No reason provided'}</span></div>
            </div>
          </div>

          <div className="p-6 bg-white border border-slate-100 rounded-3xl">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Appointment Timeline</h2>
            <div className="text-sm text-slate-500 space-y-2">
              <p>Created: {new Date(appointment.createdAt).toLocaleString()}</p>
              {appointment.updatedAt && <p>Last updated: {new Date(appointment.updatedAt).toLocaleString()}</p>}
              {appointment.amountPaid > 0 && <p>Amount paid: ${appointment.amountPaid}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
