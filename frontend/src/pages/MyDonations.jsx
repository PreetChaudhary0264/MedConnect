import React, { useState, useEffect } from 'react';
import { Package, User, Phone, MapPin, Calendar, Pill, Heart, Loader2 } from 'lucide-react';
import Navbar from './Navbar';

const API_BASE_URL = import.meta.env.VITE_API_URL; // Adjust if backend URL is different 

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyDonations();
  }, []);

  const fetchMyDonations = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token ? 'exists' : 'missing');
      if (!token) {
        setError('Please login to view your donations');
        setLoading(false);
        return;
      }

      console.log('Fetching from:', `${API_BASE_URL}/donations/my-donations`);
      const response = await fetch(`${API_BASE_URL}/donations/my-donations`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('Response status:', response.status);
      if (!response.ok) throw new Error('Failed to fetch donations');

      const data = await response.json();
      console.log('Received data:', data);
      console.log('Donations count:', data.donations?.length || 0);
      setDonations(data.donations || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-blue-100 text-blue-700',
      collected: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <a href="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-xl">Login</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Your Contributions
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                My Donations
              </span>
            </h1>
            <p className="text-xl text-slate-600">Track your medicine donations and their delivery status</p>
          </div>

          {donations.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-20 h-20 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Donations Yet</h3>
              <p className="text-slate-600 mb-6">Start making a difference by donating medicines</p>
              <a href="/donate" className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold">
                Donate Now
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.map(donation => (
                <div key={donation._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100">
                  {donation.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img src={donation.imageUrl} alt={donation.medicineName} className="w-full h-full object-cover" />
                    </div>
                  )}
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-slate-900">{donation.medicineName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(donation.status)}`}>
                        {donation.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-slate-600">
                        <Pill className="w-4 h-4 mr-2 text-blue-600" />
                        <span>{donation.quantity} {donation.units}</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                        <span>Expires: {new Date(donation.expiryDate).toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className="flex items-start text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 text-blue-600 mt-0.5" />
                        <span className="line-clamp-2">{donation.address}</span>
                      </div>
                    </div>

                    {donation.assignedVolunteer && (
                      <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                        <p className="text-sm font-semibold text-green-900 mb-2">Assigned Volunteer</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center text-green-700">
                            <User className="w-4 h-4 mr-2" />
                            <span>{donation.assignedVolunteer.name}</span>
                          </div>
                          <div className="flex items-center text-green-700">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>{donation.assignedVolunteer.phone}</span>
                          </div>
                          {donation.assignedVolunteer.email && (
                            <div className="flex items-center text-green-700">
                              <span className="text-xs">{donation.assignedVolunteer.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {donation.assignedNGO && (
                      <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-700">
                          Managed by: <span className="font-semibold">{donation.assignedNGO.name}</span>
                        </p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-xs text-slate-500">
                        Donated on {new Date(donation.createdAt).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold">MediConnect</span>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Connecting healthcare, one donation at a time.
          </p>
          <div className="border-t border-slate-800 pt-6 text-slate-400 text-sm">
            <p>&copy; 2025 MediConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
