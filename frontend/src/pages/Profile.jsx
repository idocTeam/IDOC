import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Shield,
  Camera,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  Calendar,
  Home,
  VenusAndMars,
} from 'lucide-react';
import { patientService } from '../services';
import { getStoredUser, updateStoredUser } from '../utils/session';

const buildProfileForm = (patient = {}) => ({
  fullName: patient.fullName || patient.name || '',
  email: patient.email || '',
  phone: patient.phone || '',
  address: patient.address || '',
  dateOfBirth: patient.dateOfBirth ? String(patient.dateOfBirth).slice(0, 10) : '',
  gender: patient.gender || '',
});

const Profile = () => {
  const [profile, setProfile] = useState(buildProfileForm(getStoredUser() || {}));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const user = getStoredUser();
  const initials = useMemo(() => (profile.fullName?.[0] || user?.name?.[0] || 'U').toUpperCase(), [profile.fullName, user?.name]);

  const fetchProfile = async () => {
    try {
      const { data } = await patientService.getProfile();
      setProfile(buildProfileForm(data.patient));
      updateStoredUser(data.patient);
    } catch (err) {
      console.error('Failed to load profile', err);
      setMessage({ type: 'error', content: 'Could not load your latest profile. Showing saved session data.' });
      setProfile(buildProfileForm(user || {}));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', content: '' });

    try {
      const payload = {
        fullName: profile.fullName,
        phone: profile.phone,
        address: profile.address,
        dateOfBirth: profile.dateOfBirth || null,
        gender: profile.gender,
      };

      const { data } = await patientService.updateProfile(payload);
      const nextProfile = buildProfileForm(data.patient);
      setProfile(nextProfile);
      updateStoredUser(data.patient);
      setMessage({ type: 'success', content: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (err) {
      setMessage({
        type: 'error',
        content: err.response?.data?.message || 'Failed to update profile.',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 flex justify-center min-h-screen bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Personal Profile</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your personal information and patient account details.</p>
        </div>

        {message.content && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-2xl flex items-center space-x-3 border ${
              message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-medium">{message.content}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="card text-center p-8 space-y-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-primary-100 rounded-[40px] flex items-center justify-center text-4xl font-bold text-primary-700 border-4 border-white shadow-xl">
                  {initials}
                </div>
                <button type="button" className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-2xl shadow-lg border border-slate-100 text-primary-600">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{profile.fullName || user?.name}</h2>
                <p className="text-slate-500 font-medium capitalize">Patient</p>
              </div>
              <div className="pt-6 border-t border-slate-50 flex justify-around">
                <div className="text-center">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">DOB</p>
                  <p className="text-lg font-bold text-slate-900">{profile.dateOfBirth || 'N/A'}</p>
                </div>
                <div className="w-px bg-slate-100 h-10" />
                <div className="text-center">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Status</p>
                  <p className="text-lg font-bold text-green-600">Active</p>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-primary-600 text-white relative overflow-hidden border-none">
              <Shield className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
              <h3 className="font-bold text-lg mb-2 relative z-10">Verified Account</h3>
              <p className="text-sm text-primary-100 relative z-10 leading-relaxed">
                Your patient account is authenticated and ready for appointment booking, payment, and report management.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card p-8 lg:p-10">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-bold text-slate-900">Account Information</h3>
                <button
                  type="button"
                  onClick={() => setIsEditing((prev) => !prev)}
                  className={`text-sm font-bold transition-colors ${isEditing ? 'text-red-600' : 'text-primary-600'}`}
                >
                  {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        disabled={!isEditing}
                        className="input pl-12 disabled:bg-slate-50 disabled:text-slate-500"
                        value={profile.fullName}
                        onChange={(e) => setProfile((prev) => ({ ...prev, fullName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input disabled className="input pl-12 bg-slate-50 text-slate-500" value={profile.email} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        disabled={!isEditing}
                        className="input pl-12 disabled:bg-slate-50 disabled:text-slate-500"
                        value={profile.phone}
                        onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="date"
                        disabled={!isEditing}
                        className="input pl-12 disabled:bg-slate-50 disabled:text-slate-500"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Gender</label>
                    <div className="relative">
                      <VenusAndMars className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <select
                        disabled={!isEditing}
                        className="input pl-12 disabled:bg-slate-50 disabled:text-slate-500"
                        value={profile.gender}
                        onChange={(e) => setProfile((prev) => ({ ...prev, gender: e.target.value }))}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Address</label>
                    <div className="relative">
                      <Home className="absolute left-4 top-5 text-slate-400 w-5 h-5" />
                      <textarea
                        disabled={!isEditing}
                        rows={3}
                        className="input pl-12 py-4 disabled:bg-slate-50 disabled:text-slate-500 resize-none"
                        value={profile.address}
                        onChange={(e) => setProfile((prev) => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary w-full h-14 flex items-center justify-center space-x-3"
                  >
                    {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <><span>Save Changes</span><ChevronRight className="w-5 h-5" /></>}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
