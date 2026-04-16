import React, { useState, useEffect } from 'react';
import { adminService } from '../services';
import { 
  Users, 
  UserCheck, 
  UserX, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Search, 
  AlertCircle, 
  LayoutDashboard,
  LogOut,
  Stethoscope,
  ClipboardList
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pendingDoctors');
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pendingRes, approvedRes, patientsRes] = await Promise.all([
        adminService.getPendingDoctors(),
        adminService.getApprovedDoctors(),
        adminService.getAllPatients()
      ]);
      setPendingDoctors(pendingRes.data.doctors || []);
      setApprovedDoctors(approvedRes.data.doctors || []);
      setPatients(patientsRes.data.patients || []);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await adminService.approveDoctor(id);
      fetchData();
    } catch (err) {
      alert('Failed to approve doctor');
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Please enter rejection reason:');
    if (reason === null) return;
    try {
      await adminService.rejectDoctor(id, reason);
      fetchData();
    } catch (err) {
      alert('Failed to reject doctor');
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    try {
      await adminService.deleteDoctor(id);
      fetchData();
    } catch (err) {
      alert('Failed to delete doctor');
    }
  };

  const handleDeletePatient = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    try {
      await adminService.deletePatient(id);
      fetchData();
    } catch (err) {
      alert('Failed to delete patient');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin');
  };

  const filteredData = () => {
    let data = [];
    if (activeTab === 'pendingDoctors') data = pendingDoctors;
    if (activeTab === 'approvedDoctors') data = approvedDoctors;
    if (activeTab === 'patients') data = patients;

    return data.filter(item => 
      (item.fullName || item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-primary-600" />
              Admin Dashboard
            </h1>
            <p className="text-slate-500 mt-1">Manage doctors, patients and platform activities.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="btn bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-2 self-start md:self-center"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pending Doctors</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{pendingDoctors.length}</h3>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                <ClipboardList className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Approved Doctors</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{approvedDoctors.length}</h3>
              </div>
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <Stethoscope className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Patients</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{patients.length}</h3>
              </div>
              <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Tabs & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border-b border-slate-100 gap-4">
            <div className="flex p-1 bg-slate-100 rounded-xl self-start">
              <button
                onClick={() => setActiveTab('pendingDoctors')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'pendingDoctors' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Pending Doctors
              </button>
              <button
                onClick={() => setActiveTab('approvedDoctors')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'approvedDoctors' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Approved Doctors
              </button>
              <button
                onClick={() => setActiveTab('patients')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'patients' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Patients
              </button>
            </div>
            
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="input pl-10 h-10 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                  {activeTab !== 'patients' && (
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Specialty</th>
                  )}
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData().map((item) => (
                  <tr key={item.id || item._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold">
                          {(item.fullName || item.name || '?')[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{item.fullName || item.name}</p>
                          <p className="text-xs text-slate-500">ID: {item.userId || item._id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700">{item.email}</p>
                      <p className="text-xs text-slate-500">{item.phone}</p>
                    </td>
                    {activeTab !== 'patients' && (
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-bold">
                          {item.specialty}
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        (item.approvalStatus === 'approved' || activeTab === 'patients') 
                        ? 'bg-green-50 text-green-600' 
                        : item.approvalStatus === 'rejected' 
                          ? 'bg-red-50 text-red-600'
                          : 'bg-amber-50 text-amber-600'
                      }`}>
                        {activeTab === 'patients' ? 'Active' : item.approvalStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {activeTab === 'pendingDoctors' && (
                          <>
                            <button 
                              onClick={() => handleApprove(item._id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleReject(item._id)}
                              className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        <button 
                          onClick={() => activeTab === 'patients' ? handleDeletePatient(item._id) : handleDeleteDoctor(item._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredData().length === 0 && (
              <div className="p-12 text-center">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No records found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
