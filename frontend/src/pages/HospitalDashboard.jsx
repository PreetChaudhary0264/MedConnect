import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, Calendar, LogOut, Building, X, Heart, TrendingUp, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoCall from '../components/VideoCall';

const API_BASE_URL = import.meta.env.VITE_API_URL; // Adjust if backend URL is different

// List of specializations from your image
const SPECIALIZATIONS = [
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic',
  'Psychiatrist',
  'General Physician',
  'Neurologist',
  'Gynecologist',
  'Ophthalmologist',
  'ENT Specialist',
  'Dentist',
  'Urologist'
];

export default function HospitalDashboard() {
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [camps, setCamps] = useState([]);
  const [showCamps, setShowCamps] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [currentCallRoom, setCurrentCallRoom] = useState(null);
  const [currentCallPatient, setCurrentCallPatient] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '',
    specialization: '', rating: '', experience: '', location: '',
    fee: '', nextAvailable: '', image: '', expertise: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const hospitalData = localStorage.getItem('hospital');
    if (!hospitalData) {
      navigate('/hospital-auth');
      return;
    }
    setHospital(JSON.parse(hospitalData));
    fetchDoctors();
    fetchBookings();
    fetchCamps();
  }, [navigate]);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/hospitals/doctors`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/hospitals/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchCamps = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/hospitals/camps`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setCamps(data.camps || []);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };

  const fetchPatientDetails = async (patientId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/hospitals/patients/${patientId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setPatientDetails(data.patient);
        setSelectedPatient(patientId);
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/hospitals/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        await fetchBookings();
      } else {
        alert('Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Error updating booking status');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    else if (formData.fullName.trim().length < 2) newErrors.fullName = 'Full name must be at least 2 characters';
    else if (formData.fullName.trim().length > 100) newErrors.fullName = 'Full name cannot exceed 100 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';

    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be exactly 10 digits';

    if (!editingDoctor) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.specialization) newErrors.specialization = 'Please select a specialization';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    else if (formData.experience < 0) newErrors.experience = 'Experience cannot be negative';
    if (!formData.rating) newErrors.rating = 'Rating is required';
    else if (formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Rating must be between 0 and 5';
    if (!formData.fee) newErrors.fee = 'Fee is required';
    else if (formData.fee <= 0) newErrors.fee = 'Fee must be greater than 0';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...formData,
        role: 'doctor',
        available: true,
        experience: Number(formData.experience),
        rating: Number(formData.rating),
        fee: Number(formData.fee),
        expertise: formData.expertise.split(',').map(e => e.trim()).filter(Boolean)
      };

      const url = editingDoctor
        ? `${API_BASE_URL}/hospitals/doctors/${editingDoctor._id}`
        : `${API_BASE_URL}/hospitals/doctors`;

      const method = editingDoctor ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        fetchDoctors();
        fetchBookings();
        closeModal();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to save doctor. Please try again.');
      }
    } catch (error) {
      console.error('Error saving doctor:', error);
      alert(error.message || 'An error occurred. Please try again.');
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      fullName: doctor.fullName || '',
      email: doctor.email || '',
      phone: doctor.phone || '',
      password: '',
      specialization: doctor.specialization || '',
      rating: doctor.rating || '',
      experience: doctor.experience || '',
      location: doctor.location || '',
      fee: doctor.fee || '',
      nextAvailable: doctor.nextAvailable || '',
      image: doctor.image || '',
      expertise: doctor.expertise?.join(', ') || ''
    });
    setErrors({});
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingDoctor(null);
    setFormData({
      fullName: '', email: '', phone: '', password: '',
      specialization: '', rating: '', experience: '', location: '',
      fee: '', nextAvailable: '', image: '', expertise: ''
    });
    setErrors({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE_URL}/hospitals/doctors/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('hospital');
    navigate('/hospital-auth');
  };

  return (
    <>
      {showVideoCall && (
        <VideoCall
          roomId={currentCallRoom}
          userName={hospital?.name || 'Doctor'}
          userRole="doctor"
          onClose={() => {
            setShowVideoCall(false);
            setCurrentCallRoom(null);
            setCurrentCallPatient(null);
          }}
        />
      )}
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{hospital?.name || 'Hospital'}</h1>
                <p className="text-blue-100 text-sm">Hospital Management Portal</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center space-x-2 px-5 py-2.5 bg-white/20 rounded-xl hover:bg-white/30 transition font-medium">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Active</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{doctors.length}</h3>
            <p className="text-slate-600 text-sm">Total Doctors</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border border-slate-100 cursor-pointer" onClick={() => setShowCamps(!showCamps)}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">View</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{camps.length}</h3>
            <p className="text-slate-600 text-sm">NGO Camps</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">Live</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">Active</h3>
            <p className="text-slate-600 text-sm">Hospital Status</p>
          </div>
        </div>

        {/* Camps Section */}
        {showCamps && camps.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">NGO Organized Camps</h2>
            <div className="space-y-4">
              {camps.map(camp => (
                <div key={camp._id} className="border rounded-xl p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{camp.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        <span className="font-semibold">Type:</span> {camp.type}
                      </p>
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold">Date & Time:</span> {camp.date} at {camp.time}
                      </p>
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold">Location:</span> {camp.location}
                      </p>
                      {camp.description && (
                        <p className="text-sm text-slate-600 mt-2">{camp.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600 font-semibold">Organized by</p>
                      <p className="text-sm text-slate-900 font-medium">{camp.ngo?.name}</p>
                      {camp.ngo?.phone && (
                        <p className="text-xs text-slate-600">{camp.ngo.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Doctors Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Manage Doctors</h2>
            <button
              onClick={() => {
                setEditingDoctor(null);
                setFormData({
                  fullName: '', email: '', phone: '', password: '',
                  specialization: '', rating: '', experience: '', location: '',
                  fee: '', nextAvailable: '', image: '', expertise: ''
                });
                setErrors({});
                setShowAddModal(true);
              }}
              className="flex items-center space-x-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Add Doctor</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Specialization</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Experience</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Fee</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-slate-500">No doctors added yet.</td>
                  </tr>
                ) : (
                  doctors.map((doctor) => {
                   const doctorBookings = bookings.filter(b => b.doctor && b.doctor._id === doctor._id);

                    return (
                      <React.Fragment key={doctor._id}>
                        <tr className="border-t hover:bg-slate-50 transition">
                          <td className="px-6 py-4 font-medium text-slate-900">{doctor.fullName}</td>
                          <td className="px-6 py-4 text-slate-600">{doctor.specialization}</td>
                          <td className="px-6 py-4 text-slate-600">{doctor.experience} years</td>
                          <td className="px-6 py-4 text-slate-600">₹{doctor.fee}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-3">
                              <button onClick={() => setSelectedDoctor(selectedDoctor === doctor._id ? null : doctor._id)} className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition">
                                <Users className="w-4 h-4" />
                                <span className="text-xs ml-1">({doctorBookings.length})</span>
                              </button>
                              <button onClick={() => handleEdit(doctor)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(doctor._id)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {selectedDoctor === doctor._id && doctorBookings.length > 0 && (
                          <tr>
                            <td colSpan="5" className="px-6 py-4 bg-slate-50">
                              <div className="space-y-2">
                                <h4 className="font-semibold text-slate-900 mb-3">Bookings for {doctor.fullName}</h4>
                                {doctorBookings.map(booking => (
                                  <div key={booking._id} className="bg-white p-4 rounded-lg border flex justify-between items-center">
                                    <div className="flex-1">
                                      <p 
                                        className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer underline"
                                        onClick={() => fetchPatientDetails(booking.patient._id)}
                                      >
                                        {booking.patient.fullName}
                                      </p>
                                      <p className="text-sm text-slate-600">{booking.patient.phone} • {booking.date} at {booking.time}</p>
                                      <p className="text-sm text-slate-500">{booking.consultationType} • {booking.symptoms}</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      {(booking.status === 'pending' || booking.status === 'confirmed') && (
                                        <button
                                          onClick={() => {
                                            const roomId = `${doctor.fullName.replace(/[^a-zA-Z0-9]/g, '')}_${booking.date.replace(/[^a-zA-Z0-9]/g, '')}_${doctor.specialization.replace(/[^a-zA-Z0-9]/g, '')}`;
                                            setCurrentCallRoom(roomId);
                                            setCurrentCallPatient(booking.patient.fullName);
                                            setShowVideoCall(true);
                                          }}
                                          className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                                        >
                                          <Video className="w-4 h-4" />
                                          <span>Join Call</span>
                                        </button>
                                      )}
                                      <select
                                        value={booking.status}
                                        onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                                        className="px-3 py-2 border rounded-lg text-sm"
                                      >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                      </select>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && patientDetails && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
              <h3 className="text-2xl font-bold">Patient Details</h3>
              <button onClick={() => { setSelectedPatient(null); setPatientDetails(null); }} className="text-white hover:bg-white/20 p-2 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Info */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 border-b pb-2">Personal Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><span className="font-semibold">Name:</span> {patientDetails.fullName}</div>
                  <div><span className="font-semibold">Age:</span> {patientDetails.age || 'N/A'}</div>
                  <div><span className="font-semibold">Gender:</span> {patientDetails.gender || 'N/A'}</div>
                  <div><span className="font-semibold">Blood Group:</span> {patientDetails.bloodGroup || 'N/A'}</div>
                  <div><span className="font-semibold">Phone:</span> {patientDetails.phone}</div>
                  <div><span className="font-semibold">Email:</span> {patientDetails.email}</div>
                  <div className="md:col-span-2"><span className="font-semibold">Address:</span> {patientDetails.address || 'N/A'}</div>
                </div>
              </div>

              {/* Emergency Contact */}
              {patientDetails.emergencyContactName && (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3 border-b pb-2">Emergency Contact</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">Name:</span> {patientDetails.emergencyContactName}</div>
                    <div><span className="font-semibold">Phone:</span> {patientDetails.emergencyContact}</div>
                  </div>
                </div>
              )}

              {/* Vitals */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 border-b pb-2">Current Vitals</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><span className="font-semibold">Height:</span> {patientDetails.height || 'N/A'}</div>
                  <div><span className="font-semibold">Weight:</span> {patientDetails.weight || 'N/A'}</div>
                  <div><span className="font-semibold">BMI:</span> {patientDetails.bmi || 'N/A'}</div>
                  <div><span className="font-semibold">Blood Pressure:</span> {patientDetails.bloodPressure || 'N/A'}</div>
                  <div><span className="font-semibold">Heart Rate:</span> {patientDetails.heartRate || 'N/A'}</div>
                  <div><span className="font-semibold">Temperature:</span> {patientDetails.temperature || 'N/A'}</div>
                  <div><span className="font-semibold">Oxygen Level:</span> {patientDetails.oxygenLevel || 'N/A'}</div>
                  <div><span className="font-semibold">Last Updated:</span> {patientDetails.lastUpdatedVitals || 'N/A'}</div>
                </div>
              </div>

              {/* Allergies */}
              {patientDetails.allergies && patientDetails.allergies.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-red-600 mb-3 border-b pb-2">⚠️ Allergies</h4>
                  <div className="flex flex-wrap gap-2">
                    {patientDetails.allergies.map((allergy, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">{allergy}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Chronic Conditions */}
              {patientDetails.chronicConditions && patientDetails.chronicConditions.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-orange-600 mb-3 border-b pb-2">Chronic Conditions</h4>
                  <div className="flex flex-wrap gap-2">
                    {patientDetails.chronicConditions.map((condition, idx) => (
                      <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">{condition}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Medications */}
              {patientDetails.currentMedications && patientDetails.currentMedications.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3 border-b pb-2">Current Medications</h4>
                  <div className="space-y-2">
                    {patientDetails.currentMedications.map((med, idx) => (
                      <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                        <span className="font-semibold">{med.name}</span> - {med.dosage} ({med.frequency})
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {patientDetails.documents && patientDetails.documents.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3 border-b pb-2">Medical Documents</h4>
                  <div className="space-y-2">
                    {patientDetails.documents.map((doc, idx) => (
                      <div key={idx} className="bg-slate-50 p-3 rounded-lg flex justify-between items-center">
                        <div>
                          <span className="font-semibold">{doc.name}</span>
                          <p className="text-sm text-slate-600">{doc.type} • {doc.date}</p>
                        </div>
                        {doc.url && (
                          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">View</a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Consultation History */}
              {patientDetails.consultations && patientDetails.consultations.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3 border-b pb-2">Consultation History</h4>
                  <div className="space-y-2">
                    {patientDetails.consultations.map((consult, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-semibold text-slate-900">{consult.doctor}</span>
                            <p className="text-sm text-slate-600">{consult.specialization}</p>
                            <p className="text-sm text-slate-500">{consult.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            consult.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            consult.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                            consult.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {consult.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appointment Info */}
              {(patientDetails.lastCheckup || patientDetails.nextAppointment) && (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3 border-b pb-2">Appointment Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {patientDetails.lastCheckup && (
                      <div><span className="font-semibold">Last Checkup:</span> {patientDetails.lastCheckup}</div>
                    )}
                    {patientDetails.nextAppointment && (
                      <div><span className="font-semibold">Next Appointment:</span> {patientDetails.nextAppointment}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold text-slate-900">
                {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
              </h3>
              <button onClick={closeModal} className="text-slate-500 hover:text-slate-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name *"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email *"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone (10 digits) *"
                    maxLength="10"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={editingDoctor ? "New Password (leave blank to keep)" : "Password *"}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Specialization *</option>
                    {SPECIALIZATIONS.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                  {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
                </div>

                <div>
                  <input
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Experience (years) *"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                </div>

                <div>
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={handleInputChange}
                    placeholder="Rating (0-5) *"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                </div>

                <div>
                  <input
                    name="fee"
                    type="number"
                    value={formData.fee}
                    onChange={handleInputChange}
                    placeholder="Consultation Fee *"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.fee && <p className="text-red-500 text-sm mt-1">{errors.fee}</p>}
                </div>

                <div>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Location *"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <input
                    name="nextAvailable"
                    value={formData.nextAvailable}
                    onChange={handleInputChange}
                    placeholder="Next Available (e.g. Tomorrow 10AM)"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Image URL (optional)"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <input
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    placeholder="Expertise (comma separated, e.g. Heart Surgery, ECG)"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
                >
                  {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}