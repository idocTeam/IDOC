import React, { useState, useEffect } from 'react';
import { adminService, apiOrigin } from '../services';
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
  ClipboardList,
  Eye,
  X
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
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  const getPhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    if (photoPath.startsWith('http')) return photoPath;
    return `${apiOrigin}/api/doctors${photoPath}`;
  };

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
      
      // Fixed data extraction: admin-service returns { message, data: { doctors } }
      setPendingDoctors(pendingRes.data.data?.doctors || []);
      setApprovedDoctors(approvedRes.data.data?.doctors || []);
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
      setSelectedDoctor(null);
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
      setSelectedDoctor(null);
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
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:border-primary-200 transition-all" onClick={() => setActiveTab('pendingDoctors')}>
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
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:border-primary-200 transition-all" onClick={() => setActiveTab('approvedDoctors')}>
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
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:border-primary-200 transition-all" onClick={() => setActiveTab('patients')}>
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
                        {activeTab !== 'patients' && (
                          <button 
                            onClick={() => setSelectedDoctor(item)}
                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        )}
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

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Doctor Details</h2>
              <button onClick={() => setSelectedDoctor(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="w-24 h-24 bg-primary-100 rounded-3xl flex items-center justify-center text-primary-600 text-3xl font-black shrink-0 overflow-hidden">
                  {selectedDoctor.photoPath ? (
                    <img src={getPhotoUrl(selectedDoctor.photoPath)} alt={selectedDoctor.fullName} className="w-full h-full object-cover" />
                  ) : (
                    selectedDoctor.fullName[0]
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{selectedDoctor.fullName}</h3>
                    <p className="text-primary-600 font-bold">{selectedDoctor.specialty}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</p>
                      <p className="text-sm font-bold text-slate-700">{selectedDoctor.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-bold text-slate-700">{selectedDoctor.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hospital</p>
                    <p className="text-sm font-bold text-slate-700">{selectedDoctor.hospital}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Qualifications</p>
                    <p className="text-sm font-bold text-slate-700">{selectedDoctor.qualifications}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experience</p>
                    <p className="text-sm font-bold text-slate-700">{selectedDoctor.experienceYears} Years</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">License Number</p>
                    <p className="text-sm font-bold text-slate-700">{selectedDoctor.medicalLicenseNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Consultation Fee</p>
                    <p className="text-sm font-bold text-slate-700">${selectedDoctor.consultationFee}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      selectedDoctor.approvalStatus === 'approved' 
                      ? 'bg-green-50 text-green-600' 
                      : selectedDoctor.approvalStatus === 'rejected' 
                        ? 'bg-red-50 text-red-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      {selectedDoctor.approvalStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Biography</p>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
                  "{selectedDoctor.bio}"
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Close
              </button>
              {selectedDoctor.approvalStatus === 'pending' && (
                <>
                  <button 
                    onClick={() => handleReject(selectedDoctor._id)}
                    className="px-6 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-all flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                  <button 
                    onClick={() => handleApprove(selectedDoctor._id)}
                    className="px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all flex items-center gap-2 shadow-lg shadow-green-200"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Doctor
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

