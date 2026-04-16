import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import AuthLayout from '../components/layout/AuthLayout';
import { adminService } from '../services';
import { saveAuthSession } from '../utils/session';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await adminService.login({ email, pw: password });
      
      saveAuthSession({
        token: data.token,
        user: { ...data.admin, fullName: 'Admin' },
        role: 'admin',
      });

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Admin login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Admin Portal" 
      subtitle="Authorized access only. Sign in to manage the IDOC platform."
    >
      <div className="flex justify-center mb-8">
        <div className="p-4 bg-primary-50 rounded-full">
          <ShieldCheck className="w-12 h-12 text-primary-600" />
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Admin Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="email"
              required
              className="input pl-12"
              placeholder="admin@idoc.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="password"
              required
              className="input pl-12"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="btn btn-primary w-full flex items-center justify-center space-x-3 h-14"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default AdminLogin;
