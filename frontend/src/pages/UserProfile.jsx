// Updated UserProfile.jsx - Added date picker for DOB, document upload with view/download, ensured medical history fetches from DB
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Heart, Activity, Droplet, Weight, Ruler, Pill, FileText, Clock, Edit2, Camera, AlertCircle, CheckCircle, Download, Eye } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';
import Navbar from './Navbar';

export default function MedicalProfile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      dateOfBirthIso: '',
      age: '',
      gender: '',
      bloodGroup: '',
      address: '',
      emergencyContact: '',
      emergencyContactName: ''
    },
    medical: {
      height: '',
      weight: '',
      bmi: '',
      allergies: [],
      chronicConditions: [],
      currentMedications: [],
      lastCheckup: '',
      nextAppointment: ''
    },
    documents: [],
    consultations: []
  });

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
    { id: 'medical', label: 'Medical History', icon: <Heart className="w-4 h-4" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
    { id: 'consultations', label: 'Consultations', icon: <Clock className="w-4 h-4" /> }
  ];

  // Gender options
  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  // Blood group options
  const bloodGroupOptions = [
    { value: '', label: 'Select Blood Group' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  // Consultation status options
  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Upcoming', label: 'Upcoming' }
  ];

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please login again.');
        return;
      }
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        let errorMessage = 'Failed to fetch profile';
        try {
          const errData = await response.json();
          errorMessage = errData.message || errorMessage;
        } catch {
          // If can't parse JSON, use default
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const profile = data.profile;
      const dobDate = profile.dateOfBirth ? new Date(profile.dateOfBirth) : null;
      const dateOfBirth = dobDate ? dobDate.toLocaleDateString('en-GB') : '';
      const dateOfBirthIso = dobDate ? dobDate.toISOString().split('T')[0] : '';
      setProfileData({
        personal: {
          name: profile.fullName || '',
          email: profile.email || '',
          phone: profile.phone || '',
          dateOfBirth,
          dateOfBirthIso,
          age: profile.age || '',
          gender: profile.gender || '',
          bloodGroup: profile.bloodGroup || '',
          address: profile.address || '',
          emergencyContact: profile.emergencyContact || '',
          emergencyContactName: profile.emergencyContactName || ''
        },
        medical: {
          height: profile.height || '',
          weight: profile.weight || '',
          bmi: profile.bmi || '',
          allergies: profile.allergies || [],
          chronicConditions: profile.chronicConditions || [],
          currentMedications: profile.currentMedications || [],
          lastCheckup: profile.lastCheckup || '',
          nextAppointment: profile.nextAppointment || ''
        },
        documents: profile.documents || [],
        consultations: profile.consultations || []
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (updates) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found.');
        return;
      }
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        let errorMessage = 'Failed to update profile';
        try {
          const errData = await response.json();
          errorMessage = errData.message || errorMessage;
        } catch {
          // If can't parse JSON, use default
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const profile = data.profile;
      const dobDate = profile.dateOfBirth ? new Date(profile.dateOfBirth) : null;
      const dateOfBirth = dobDate ? dobDate.toLocaleDateString('en-GB') : '';
      const dateOfBirthIso = dobDate ? dobDate.toISOString().split('T')[0] : '';
      // Update local state with new data
      setProfileData({
        personal: {
          name: profile.fullName || '',
          email: profile.email || '',
          phone: profile.phone || '',
          dateOfBirth,
          dateOfBirthIso,
          age: profile.age || '',
          gender: profile.gender || '',
          bloodGroup: profile.bloodGroup || '',
          address: profile.address || '',
          emergencyContact: profile.emergencyContact || '',
          emergencyContactName: profile.emergencyContactName || ''
        },
        medical: {
          height: profile.height || '',
          weight: profile.weight || '',
          bmi: profile.bmi || '',
          allergies: profile.allergies || [],
          chronicConditions: profile.chronicConditions || [],
          currentMedications: profile.currentMedications || [],
          lastCheckup: profile.lastCheckup || '',
          nextAppointment: profile.nextAppointment || ''
        },
        documents: profile.documents || [],
        consultations: profile.consultations || []
      });
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle save changes
  const handleSave = () => {
    // Prepare updates from all sections, trim strings
    const trimValue = (val) => typeof val === 'string' ? val.trim() : val;
    const updates = {
      fullName: trimValue(profileData.personal.name),
      email: trimValue(profileData.personal.email),
      phone: trimValue(profileData.personal.phone),
      dateOfBirth: profileData.personal.dateOfBirthIso ? new Date(profileData.personal.dateOfBirthIso) : null,
      gender: trimValue(profileData.personal.gender),
      bloodGroup: trimValue(profileData.personal.bloodGroup),
      address: trimValue(profileData.personal.address),
      emergencyContactName: trimValue(profileData.personal.emergencyContactName),
      emergencyContact: trimValue(profileData.personal.emergencyContact),
      height: trimValue(profileData.medical.height),
      weight: trimValue(profileData.medical.weight),
      allergies: profileData.medical.allergies.map(trimValue).filter(Boolean),
      chronicConditions: profileData.medical.chronicConditions.map(trimValue).filter(Boolean),
      currentMedications: profileData.medical.currentMedications.map(med => ({
        name: trimValue(med.name),
        dosage: trimValue(med.dosage),
        frequency: trimValue(med.frequency)
      })).filter(med => med.name),
      lastCheckup: trimValue(profileData.medical.lastCheckup),
      nextAppointment: trimValue(profileData.medical.nextAppointment),
      documents: profileData.documents.map(doc => ({
        name: trimValue(doc.name),
        date: trimValue(doc.date),
        type: trimValue(doc.type),
        url: trimValue(doc.url)
      })).filter(doc => doc.name),
      consultations: profileData.consultations.map(consult => ({
        doctor: trimValue(consult.doctor),
        specialization: trimValue(consult.specialization),
        date: trimValue(consult.date),
        status: trimValue(consult.status)
      })).filter(consult => consult.doctor)
    };
    updateProfile(updates);
  };

  // Handle input changes for nested objects
  const handleChange = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle array changes for nested arrays (medical, personal, vitals)
  const handleArrayChange = (section, field, index, subField, value) => {
    const currentArray = [...profileData[section][field]];
    if (subField) {
      currentArray[index] = { ...currentArray[index], [subField]: value };
    } else {
      currentArray[index] = value;
    }
    // Filter empty strings for simple arrays
    if (!subField) {
      const filtered = currentArray.filter(item => item && item.trim());
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: filtered
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: currentArray
        }
      }));
    }
  };

  // Handle changes for top-level arrays (documents, consultations)
  const handleTopLevelArrayChange = (arrayName, index, subField, value) => {
    const currentArray = [...profileData[arrayName]];
    currentArray[index] = { ...currentArray[index], [subField]: value };
    setProfileData(prev => ({
      ...prev,
      [arrayName]: currentArray
    }));
  };

  // Add item to array
  const addToArray = (section, field) => {
    if (section === 'medical' && field === 'currentMedications') {
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: [...prev[section][field], { name: '', dosage: '', frequency: '' }]
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: [...prev[section][field], '']
        }
      }));
    }
  };

  // Remove item from array
  const removeFromArray = (section, field, index) => {
    const newArray = profileData[section][field].filter((_, i) => i !== index);
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: newArray
      }
    }));
  };

  // Handle document upload
  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,application/pdf,.doc,.docx';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const name = prompt('Document Name:', file.name);
      if (!name || !name.trim()) return;
      const dateStr = prompt('Date (dd/mm/yyyy):', new Date().toLocaleDateString('en-GB'));
      if (!dateStr || !dateStr.trim()) return;
      let type = file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Document';
      type = prompt('Document Type:', type);
      if (!type || !type.trim()) return;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name.trim());
      formData.append('date', dateStr.trim());
      formData.append('type', type.trim());
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/users/documents/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.message || 'Upload failed');
        }
        const { url } = await response.json();
        setProfileData(prev => ({
          ...prev,
          documents: [...prev.documents, { name: name.trim(), date: dateStr.trim(), type: type.trim(), url }]
        }));
      } catch (err) {
        alert(`Upload failed: ${err.message}`);
      }
    };
    input.click();
  };

  // Handle document download
  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (err) {
      alert(`Download failed: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const maxDate = new Date().toISOString().split('T')[0];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4" />
          <p>{error}</p>
          <button
            onClick={fetchProfile}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Medical Profile</h1>
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              disabled={loading}
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold flex items-center space-x-2 ${
                isEditing
                  ? 'bg-green-600 text-white hover:shadow-xl'
                  : 'bg-white text-blue-600 hover:shadow-xl'
              }`}
            >
              <Edit2 className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 pb-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {profileData.personal.name.split(' ').map(n => n[0]).join('')}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
                    <Camera className="w-5 h-5 text-blue-600" />
                  </button>
                )}
              </div>
             
              <div className="flex-1 text-center md:text-left">
                <input
                  value={profileData.personal.name}
                  onChange={(e) => handleChange('personal', 'name', e.target.value)}
                  className={`text-3xl font-bold ${isEditing ? 'border-b border-slate-300 bg-transparent' : 'text-slate-900'} mb-2`}
                  readOnly={!isEditing}
                />
                <p className="text-slate-600 mb-4">{profileData.personal.age} • {profileData.personal.gender}</p>
               
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow">
                    <Droplet className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-semibold text-slate-700">{profileData.personal.bloodGroup}</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-slate-700">{profileData.personal.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-slate-700">{profileData.personal.phone}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-xl p-4 shadow">
                  <Weight className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  {isEditing ? (
                    <div className="flex justify-center items-baseline space-x-1">
                      <input
                        value={profileData.medical.weight}
                        onChange={(e) => handleChange('medical', 'weight', e.target.value)}
                        className="text-2xl font-bold border-b border-slate-300 bg-transparent text-center w-auto"
                      />
                      <span className="text-2xl font-bold text-slate-900">kg</span>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-slate-900">{profileData.medical.weight || 0} kg</p>
                  )}
                  <p className="text-xs text-slate-600">Weight</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow">
                  <Ruler className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  {isEditing ? (
                    <div className="flex justify-center items-baseline space-x-1">
                      <input
                        value={profileData.medical.height}
                        onChange={(e) => handleChange('medical', 'height', e.target.value)}
                        className="text-2xl font-bold border-b border-slate-300 bg-transparent text-center w-auto"
                      />
                      <span className="text-2xl font-bold text-slate-900">cm</span>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-slate-900">{profileData.medical.height || 0} cm</p>
                  )}
                  <p className="text-xs text-slate-600">Height</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow">
                  <Activity className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-900">{profileData.medical.bmi}</p>
                  <p className="text-xs text-slate-600">BMI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200">
            <div className="flex overflow-x-auto px-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* DOB with calendar */}
                  <div className="md:col-span-1">
                    <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl">
                      <div className="mt-1"><Calendar className="w-5 h-5 text-blue-600" /></div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-600 mb-1">Date of Birth</p>
                        {isEditing ? (
                          <input
                            type="date"
                            value={profileData.personal.dateOfBirthIso}
                            onChange={(e) => handleChange('personal', 'dateOfBirthIso', e.target.value)}
                            max={maxDate}
                            className="font-semibold w-full border-b border-slate-300 bg-transparent"
                          />
                        ) : (
                          <p className="font-semibold text-slate-900">{profileData.personal.dateOfBirth || 'Not set'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <SelectField
                    icon={<User className="w-5 h-5 text-green-600" />}
                    label="Gender"
                    value={profileData.personal.gender}
                    isEditing={isEditing}
                    onChange={(value) => handleChange('personal', 'gender', value)}
                    options={genderOptions}
                  />
                  <SelectField
                    icon={<Droplet className="w-5 h-5 text-red-600" />}
                    label="Blood Group"
                    value={profileData.personal.bloodGroup}
                    isEditing={isEditing}
                    onChange={(value) => handleChange('personal', 'bloodGroup', value)}
                    options={bloodGroupOptions}
                  />
                  <InfoField
                    icon={<MapPin className="w-5 h-5 text-purple-600" />}
                    label="Address"
                    value={profileData.personal.address}
                    fullWidth
                    isEditing={isEditing}
                    onChange={(value) => handleChange('personal', 'address', value)}
                  />
                </div>
                <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-100">
                  <h4 className="font-semibold text-red-900 mb-4 flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Emergency Contact</span>
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-red-700 mb-1">Name</p>
                      <input
                        value={profileData.personal.emergencyContactName}
                        onChange={(e) => handleChange('personal', 'emergencyContactName', e.target.value)}
                        className={`w-full p-2 border rounded ${isEditing ? 'border-red-300' : 'bg-transparent'}`}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-red-700 mb-1">Phone</p>
                      <input
                        value={profileData.personal.emergencyContact}
                        onChange={(e) => handleChange('personal', 'emergencyContact', e.target.value)}
                        className={`w-full p-2 border rounded ${isEditing ? 'border-red-300' : 'bg-transparent'}`}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'medical' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Medical History</h3>
               
                {/* Allergies */}
                <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
                  <h4 className="font-semibold text-amber-900 mb-3 flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Allergies</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.medical.allergies.map((allergy, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <input
                          value={allergy}
                          onChange={(e) => handleArrayChange('medical', 'allergies', idx, null, e.target.value)}
                          className={`px-4 py-2 bg-amber-100 text-amber-900 rounded-lg font-medium border ${isEditing ? 'border-amber-300' : ''}`}
                          readOnly={!isEditing}
                        />
                        {isEditing && (
                          <button
                            onClick={() => removeFromArray('medical', 'allergies', idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button
                        onClick={() => addToArray('medical', 'allergies')}
                        className="px-4 py-2 bg-white text-amber-600 rounded-lg font-medium border border-amber-300"
                      >
                        Add Allergy
                      </button>
                    )}
                  </div>
                </div>
                {/* Chronic Conditions */}
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Chronic Conditions</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.medical.chronicConditions.map((condition, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <input
                          value={condition}
                          onChange={(e) => handleArrayChange('medical', 'chronicConditions', idx, null, e.target.value)}
                          className={`px-4 py-2 bg-blue-100 text-blue-900 rounded-lg font-medium border ${isEditing ? 'border-blue-300' : ''}`}
                          readOnly={!isEditing}
                        />
                        {isEditing && (
                          <button
                            onClick={() => removeFromArray('medical', 'chronicConditions', idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button
                        onClick={() => addToArray('medical', 'chronicConditions')}
                        className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium border border-blue-300"
                      >
                        Add Condition
                      </button>
                    )}
                  </div>
                </div>
                {/* Current Medications */}
                <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-4 flex items-center space-x-2">
                    <Pill className="w-5 h-5" />
                    <span>Current Medications</span>
                  </h4>
                  <div className="space-y-3">
                    {profileData.medical.currentMedications.map((med, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg space-x-4">
                        <input
                          value={med.name}
                          onChange={(e) => handleArrayChange('medical', 'currentMedications', idx, 'name', e.target.value)}
                          className={`flex-1 p-2 border rounded ${isEditing ? 'border-green-300' : ''}`}
                          placeholder="Medicine name"
                          readOnly={!isEditing}
                        />
                        <input
                          value={med.dosage}
                          onChange={(e) => handleArrayChange('medical', 'currentMedications', idx, 'dosage', e.target.value)}
                          className={`flex-1 p-2 border rounded ${isEditing ? 'border-green-300' : ''}`}
                          placeholder="Dosage"
                          readOnly={!isEditing}
                        />
                        <input
                          value={med.frequency}
                          onChange={(e) => handleArrayChange('medical', 'currentMedications', idx, 'frequency', e.target.value)}
                          className={`flex-1 p-2 border rounded ${isEditing ? 'border-green-300' : ''}`}
                          placeholder="Frequency"
                          readOnly={!isEditing}
                        />
                        {isEditing && (
                          <button
                            onClick={() => removeFromArray('medical', 'currentMedications', idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button
                        onClick={() => addToArray('medical', 'currentMedications')}
                        className="w-full p-4 bg-white text-green-600 rounded-lg font-medium border border-green-300"
                      >
                        Add Medication
                      </button>
                    )}
                  </div>
                </div>
                {/* Checkup Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-2">Last Checkup</p>
                    <input
                      value={profileData.medical.lastCheckup}
                      onChange={(e) => handleChange('medical', 'lastCheckup', e.target.value)}
                      className={`text-2xl font-bold w-full ${isEditing ? 'border-b border-slate-300 bg-transparent' : 'text-slate-900'}`}
                      readOnly={!isEditing}
                    />
                  </div>
                  <div className="p-6 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-2">Next Appointment</p>
                    <input
                      value={profileData.medical.nextAppointment}
                      onChange={(e) => handleChange('medical', 'nextAppointment', e.target.value)}
                      className={`text-2xl font-bold w-full ${isEditing ? 'border-b border-slate-300 bg-transparent' : 'text-slate-900'}`}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Medical Documents</h3>
                  <button onClick={handleUpload} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold">
                    Upload Document
                  </button>
                </div>
                <div className="space-y-3">
                  {profileData.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-6 bg-slate-50 rounded-xl hover:shadow-lg transition-all">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <input
                            value={doc.name}
                            onChange={(e) => handleTopLevelArrayChange('documents', idx, 'name', e.target.value)}
                            className={`font-semibold ${isEditing ? 'border-b border-slate-300 bg-transparent' : 'text-slate-900'}`}
                            readOnly={!isEditing}
                          />
                          <p className="text-sm text-slate-600">
                            <input
                              value={doc.type}
                              onChange={(e) => handleTopLevelArrayChange('documents', idx, 'type', e.target.value)}
                              className={`mr-2 ${isEditing ? 'border-b border-slate-300 bg-transparent' : ''}`}
                              readOnly={!isEditing}
                            /> •
                            <input
                              value={doc.date}
                              onChange={(e) => handleTopLevelArrayChange('documents', idx, 'date', e.target.value)}
                              className={`ml-1 ${isEditing ? 'border-b border-slate-300 bg-transparent' : ''}`}
                              readOnly={!isEditing}
                            />
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.url && (
                          <>
                            <button onClick={() => window.open(doc.url, '_blank')} className="p-2 hover:bg-white rounded-lg transition-all">
                              <Eye className="w-5 h-5 text-slate-600" />
                            </button>
                            <button onClick={() => handleDownload(doc.url, doc.name)} className="p-2 hover:bg-white rounded-lg transition-all">
                              <Download className="w-5 h-5 text-slate-600" />
                            </button>
                          </>
                        )}
                        {isEditing && (
                          <button
                            onClick={() => {
                              const newDocs = profileData.documents.filter((_, i) => i !== idx);
                              setProfileData(prev => ({ ...prev, documents: newDocs }));
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={() => setProfileData(prev => ({ ...prev, documents: [...prev.documents, { name: '', date: '', type: '', url: '' }] }))}
                      className="w-full p-4 bg-white text-blue-600 rounded-lg font-medium border border-blue-300"
                    >
                      Add Document
                    </button>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'consultations' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Consultation History</h3>
               
                <div className="space-y-4">
                  {profileData.consultations.map((consultation, idx) => (
                    <div key={idx} className="p-6 bg-slate-50 rounded-xl hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {consultation.doctor.split(' ')[1]?.[0] || 'D'}
                          </div>
                          <div className="flex-1">
                            <input
                              value={consultation.doctor}
                              onChange={(e) => handleTopLevelArrayChange('consultations', idx, 'doctor', e.target.value)}
                              className={`font-semibold text-lg ${isEditing ? 'border-b border-slate-300 bg-transparent' : 'text-slate-900'}`}
                              readOnly={!isEditing}
                            />
                            <p className="text-sm text-slate-600">
                              <input
                                value={consultation.specialization}
                                onChange={(e) => handleTopLevelArrayChange('consultations', idx, 'specialization', e.target.value)}
                                className={`mr-2 ${isEditing ? 'border-b border-slate-300 bg-transparent' : ''}`}
                                readOnly={!isEditing}
                              />
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                              <input
                                value={consultation.date}
                                onChange={(e) => handleTopLevelArrayChange('consultations', idx, 'date', e.target.value)}
                                className={`mr-2 ${isEditing ? 'border-b border-slate-300 bg-transparent' : ''}`}
                                readOnly={!isEditing}
                              />
                            </p>
                          </div>
                        </div>
                        <SelectField
                          value={consultation.status}
                          isEditing={isEditing}
                          onChange={(value) => handleTopLevelArrayChange('consultations', idx, 'status', value)}
                          options={statusOptions}
                          className={`px-4 py-2 rounded-full font-semibold ${isEditing ? 'border border-slate-300' : consultation.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}
                        />
                        {isEditing && (
                          <button
                            onClick={() => {
                              const newConsults = profileData.consultations.filter((_, i) => i !== idx);
                              setProfileData(prev => ({ ...prev, consultations: newConsults }));
                            }}
                            className="text-red-500 hover:text-red-700 ml-4"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={() => setProfileData(prev => ({ ...prev, consultations: [...prev.consultations, { doctor: '', specialization: '', date: '', status: '' }] }))}
                      className="w-full p-4 bg-white text-blue-600 rounded-lg font-medium border border-blue-300"
                    >
                      Add Consultation
                    </button>
                  )}
                </div>
               <a href="/bookconsultation">
                <button className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold">
                  Book New Consultation
                </button></a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ icon, label, value, fullWidth = false, isEditing = false, onChange }) {
  return (
    <div className={`${fullWidth ? 'md:col-span-2' : ''}`}>
      <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl">
        <div className="mt-1">{icon}</div>
        <div className="flex-1">
          <p className="text-sm text-slate-600 mb-1">{label}</p>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`font-semibold w-full ${isEditing ? 'border-b border-slate-300 bg-transparent' : 'text-slate-900'}`}
            readOnly={!isEditing}
          />
        </div>
      </div>
    </div>
  );
}

function SelectField({ icon, label, value, fullWidth = false, isEditing = false, onChange, options, className = '' }) {
  return (
    <div className={`${fullWidth ? 'md:col-span-2' : ''}`}>
      {icon && label ? (
        <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl">
          <div className="mt-1">{icon}</div>
          <div className="flex-1">
            <p className="text-sm text-slate-600 mb-1">{label}</p>
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`font-semibold w-full ${isEditing ? 'border-b border-slate-300 bg-transparent' : 'text-slate-900'} ${className}`}
              disabled={!isEditing}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${className}`}
          disabled={!isEditing}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}