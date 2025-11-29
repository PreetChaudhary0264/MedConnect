import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, Calendar, LogOut, HandHeart, TrendingUp, Package, X, Building, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL; // Adjust if backend URL is different

export default function NGODashboard() {
  const navigate = useNavigate();
  const [ngo, setNgo] = useState(null);
  const [activeTab, setActiveTab] = useState('camps');
  const [camps, setCamps] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [showCampModal, setShowCampModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [editingCamp, setEditingCamp] = useState(null);
  const [editingVolunteer, setEditingVolunteer] = useState(null);

  const [campForm, setCampForm] = useState({
    name: '', type: '', date: '', time: '', location: '', description: '', hospital: ''
  });

  const [volunteerForm, setVolunteerForm] = useState({
    name: '', phone: '', email: '', address: ''
  });

  const campTypes = ['Eye Test', 'Blood Donation', 'Sugar Test', 'Blood Pressure', 'General Health', 'Vaccination', 'Other'];

  useEffect(() => {
    const ngoData = localStorage.getItem('ngo');
    if (!ngoData) {
      navigate('/ngo-auth');
      return;
    }
    setNgo(JSON.parse(ngoData));
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const [campsRes, volunteersRes, donationsRes, hospitalsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/ngos/camps`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE_URL}/ngos/volunteers`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE_URL}/ngos/donations`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE_URL}/ngos/hospitals`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      const campsData = await campsRes.json();
      const volunteersData = await volunteersRes.json();
      const donationsData = await donationsRes.json();
      const hospitalsData = await hospitalsRes.json();
      setCamps(campsData.camps || []);
      setVolunteers(volunteersData.volunteers || []);
      setDonations(donationsData.donations || []);
      setHospitals(hospitalsData.hospitals || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCampSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editingCamp ? `${API_BASE_URL}/ngos/camps/${editingCamp._id}` : `${API_BASE_URL}/ngos/camps`;
    const method = editingCamp ? 'PUT' : 'POST';
    try {
      await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(campForm)
      });
      fetchData();
      closeCampModal();
    } catch (error) {
      console.error('Error saving camp:', error);
    }
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editingVolunteer ? `${API_BASE_URL}/ngos/volunteers/${editingVolunteer._id}` : `${API_BASE_URL}/ngos/volunteers`;
    const method = editingVolunteer ? 'PUT' : 'POST';
    try {
      await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(volunteerForm)
      });
      fetchData();
      closeVolunteerModal();
    } catch (error) {
      console.error('Error saving volunteer:', error);
    }
  };

  const deleteCamp = async (id) => {
    if (!window.confirm('Delete this camp?')) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_BASE_URL}/ngos/camps/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting camp:', error);
    }
  };

  const deleteVolunteer = async (id) => {
    if (!window.confirm('Delete this volunteer?')) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_BASE_URL}/ngos/volunteers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting volunteer:', error);
    }
  };

  const assignVolunteer = async (donationId, volunteerId) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_BASE_URL}/ngos/assign-volunteer`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ donationId, volunteerId })
      });
      fetchData();
    } catch (error) {
      console.error('Error assigning volunteer:', error);
    }
  };

  const closeCampModal = () => {
    setShowCampModal(false);
    setEditingCamp(null);
    setCampForm({ name: '', type: '', date: '', time: '', location: '', description: '', hospital: '' });
  };

  const closeVolunteerModal = () => {
    setShowVolunteerModal(false);
    setEditingVolunteer(null);
    setVolunteerForm({ name: '', phone: '', email: '', address: '' });
  };

  const editCamp = (camp) => {
    setEditingCamp(camp);
    setCampForm({
      name: camp.name,
      type: camp.type,
      date: camp.date,
      time: camp.time,
      location: camp.location,
      description: camp.description || '',
      hospital: camp.hospital?._id || ''
    });
    setShowCampModal(true);
  };

  const editVolunteer = (volunteer) => {
    setEditingVolunteer(volunteer);
    setVolunteerForm({
      name: volunteer.name,
      phone: volunteer.phone,
      email: volunteer.email || '',
      address: volunteer.address || ''
    });
    setShowVolunteerModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ngo');
    navigate('/ngo-auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{ngo?.name}</h1>
                <p className="text-green-100 text-sm">NGO Management Portal</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center space-x-2 px-5 py-2.5 bg-white/20 rounded-xl hover:bg-white/30 transition font-medium">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">Active</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{camps.length}</h3>
            <p className="text-slate-600 text-sm">Total Camps</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Ready</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{volunteers.length}</h3>
            <p className="text-slate-600 text-sm">Volunteers</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Pending</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{donations.length}</h3>
            <p className="text-slate-600 text-sm">Donations</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">Live</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">Active</h3>
            <p className="text-slate-600 text-sm">NGO Status</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-slate-200 flex">
            {['camps', 'volunteers', 'donations'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-semibold transition ${activeTab === tab ? 'bg-green-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'camps' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Manage Camps</h2>
                  <button onClick={() => setShowCampModal(true)} className="flex items-center space-x-2 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                    <Plus className="w-5 h-5" />
                    <span>Add Camp</span>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Name</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Type</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Date & Time</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Location</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {camps.map(camp => (
                        <tr key={camp._id} className="border-t hover:bg-slate-50 transition">
                          <td className="px-6 py-4 font-medium text-slate-900">{camp.name}</td>
                          <td className="px-6 py-4 text-slate-600">{camp.type}</td>
                          <td className="px-6 py-4 text-slate-600">{camp.date} {camp.time}</td>
                          <td className="px-6 py-4 text-slate-600">{camp.location}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-3">
                              <button onClick={() => editCamp(camp)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => deleteCamp(camp._id)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'volunteers' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Manage Volunteers</h2>
                  <button onClick={() => setShowVolunteerModal(true)} className="flex items-center space-x-2 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                    <Plus className="w-5 h-5" />
                    <span>Add Volunteer</span>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Name</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Phone</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Email</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volunteers.map(volunteer => (
                        <tr key={volunteer._id} className="border-t hover:bg-slate-50 transition">
                          <td className="px-6 py-4 font-medium text-slate-900">{volunteer.name}</td>
                          <td className="px-6 py-4 text-slate-600">{volunteer.phone}</td>
                          <td className="px-6 py-4 text-slate-600">{volunteer.email || 'N/A'}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${volunteer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                              {volunteer.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-3">
                              <button onClick={() => editVolunteer(volunteer)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => deleteVolunteer(volunteer._id)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'donations' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Medicine Donations</h2>
                <div className="space-y-4">
                  {donations.map(donation => (
                    <div key={donation._id} className="border rounded-xl p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900">{donation.medicineName}</h3>
                          <p className="text-sm text-slate-600">{donation.quantity} {donation.units}</p>
                          <p className="text-sm text-slate-600">Donor: {donation.user?.fullName} ({donation.user?.phone})</p>
                          <p className="text-sm text-slate-600">Location: {donation.address}</p>
                          {donation.assignedVolunteer && (
                            <p className="text-sm text-green-600 font-semibold mt-2">
                              Assigned to: {donation.assignedVolunteer.name} ({donation.assignedVolunteer.phone})
                            </p>
                          )}
                        </div>
                        {!donation.assignedVolunteer && (
                          <select
                            onChange={(e) => assignVolunteer(donation._id, e.target.value)}
                            className="px-3 py-2 border rounded-lg text-sm"
                            defaultValue=""
                          >
                            <option value="" disabled>Assign Volunteer</option>
                            {volunteers.filter(v => v.status === 'active').map(v => (
                              <option key={v._id} value={v._id}>{v.name}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCampModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold text-slate-900">{editingCamp ? 'Edit Camp' : 'Add New Camp'}</h3>
              <button onClick={closeCampModal} className="text-slate-500 hover:text-slate-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCampSubmit} className="p-6 space-y-4">
              <input value={campForm.name} onChange={(e) => setCampForm({...campForm, name: e.target.value})} placeholder="Camp Name *" className="w-full px-4 py-3 border rounded-lg" required />
              <select value={campForm.type} onChange={(e) => setCampForm({...campForm, type: e.target.value})} className="w-full px-4 py-3 border rounded-lg" required>
                <option value="">Select Type *</option>
                {campTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="date" value={campForm.date} onChange={(e) => setCampForm({...campForm, date: e.target.value})} className="w-full px-4 py-3 border rounded-lg" required />
                <input type="time" value={campForm.time} onChange={(e) => setCampForm({...campForm, time: e.target.value})} className="w-full px-4 py-3 border rounded-lg" required />
              </div>
              <input value={campForm.location} onChange={(e) => setCampForm({...campForm, location: e.target.value})} placeholder="Location *" className="w-full px-4 py-3 border rounded-lg" required />
              <select value={campForm.hospital} onChange={(e) => setCampForm({...campForm, hospital: e.target.value})} className="w-full px-4 py-3 border rounded-lg">
                <option value="">No Hospital (Individual)</option>
                {hospitals.map(h => <option key={h._id} value={h._id}>{h.name}</option>)}
              </select>
              <textarea value={campForm.description} onChange={(e) => setCampForm({...campForm, description: e.target.value})} placeholder="Description" rows="3" className="w-full px-4 py-3 border rounded-lg" />
              <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
                {editingCamp ? 'Update Camp' : 'Create Camp'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showVolunteerModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold text-slate-900">{editingVolunteer ? 'Edit Volunteer' : 'Add New Volunteer'}</h3>
              <button onClick={closeVolunteerModal} className="text-slate-500 hover:text-slate-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleVolunteerSubmit} className="p-6 space-y-4">
              <input value={volunteerForm.name} onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})} placeholder="Name *" className="w-full px-4 py-3 border rounded-lg" required />
              <input value={volunteerForm.phone} onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})} placeholder="Phone (10 digits) *" maxLength="10" className="w-full px-4 py-3 border rounded-lg" required />
              <input type="email" value={volunteerForm.email} onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})} placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
              <textarea value={volunteerForm.address} onChange={(e) => setVolunteerForm({...volunteerForm, address: e.target.value})} placeholder="Address" rows="3" className="w-full px-4 py-3 border rounded-lg" />
              <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
                {editingVolunteer ? 'Update Volunteer' : 'Add Volunteer'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
