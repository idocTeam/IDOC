import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, CreditCard, Ticket } from 'lucide-react';

const PaymentStatus = ({ variant = 'success' }) => {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get('appointmentId');
  const isSuccess = variant === 'success';

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 px-4">
      <div className="max-w-2xl mx-auto card p-10 text-center space-y-8">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${isSuccess ? 'bg-green-50' : 'bg-amber-50'}`}>
          {isSuccess ? <CheckCircle2 className="w-12 h-12 text-green-600" /> : <AlertCircle className="w-12 h-12 text-amber-600" />}
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">{isSuccess ? 'Payment Submitted Successfully' : 'Payment Was Cancelled'}</h1>
          <p className="text-slate-500">
            {isSuccess
              ? 'Your payment has been submitted. The payment service webhook may take a few moments to finalize the appointment and ticket.'
              : 'You cancelled the checkout process. Your appointment remains unpaid until you complete payment.'}
          </p>
        </div>

        <div className="bg-slate-50 rounded-3xl border border-slate-100 p-6 text-left space-y-3">
          <div className="flex items-center gap-3 text-slate-700"><CreditCard className="w-5 h-5 text-primary-600" /><span className="font-medium">Appointment ID: {appointmentId || 'Not provided'}</span></div>
          <p className="text-sm text-slate-500">Use the dashboard to re-check payment status, open the e-ticket, or retry payment if needed.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard" className="btn btn-outline inline-flex items-center justify-center gap-2">Back to Dashboard</Link>
          {appointmentId && isSuccess && (
            <Link to={`/ticket/${appointmentId}`} className="btn btn-primary inline-flex items-center justify-center gap-2">
              <Ticket className="w-4 h-4" />
              <span>Open E-Ticket</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
