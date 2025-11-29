import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Building, Heart, Loader2, Users } from 'lucide-react';
import Navbar from './Navbar';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Camps() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/camps`);
      if (!response.ok) throw new Error('Failed to fetch camps');
      const data = await response.json();
      setCamps(data.camps || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            <button onClick={fetchCamps} className="px-6 py-3 bg-blue-600 text-white rounded-xl">Retry</button>
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
              <Users className="w-4 h-4 mr-2" />
              Health Camps
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Upcoming Health Camps
              </span>
            </h1>
            <p className="text-xl text-slate-600">Free health checkups organized by NGOs</p>
          </div>

          {camps.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="w-20 h-20 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Camps Scheduled</h3>
              <p className="text-slate-600">Check back later for upcoming health camps</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {camps.map(camp => (
                <div key={camp._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100">
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-slate-900">{camp.name}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {camp.type}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-slate-600">
                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                        <span>{camp.date}</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Clock className="w-4 h-4 mr-2 text-blue-600" />
                        <span>{camp.time}</span>
                      </div>
                      <div className="flex items-start text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 text-blue-600 mt-0.5" />
                        <span className="line-clamp-2">{camp.location}</span>
                      </div>
                    </div>

                    {camp.description && (
                      <p className="text-sm text-slate-600 line-clamp-3">{camp.description}</p>
                    )}

                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500">Organized by</p>
                          <p className="font-semibold text-slate-900">{camp.ngo?.name || 'NGO'}</p>
                        </div>
                        {camp.hospital && (
                          <div className="text-right">
                            <Building className="w-4 h-4 text-blue-600 inline mr-1" />
                            <span className="text-xs text-slate-600">{camp.hospital.name}</span>
                          </div>
                        )}
                      </div>
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
            Connecting healthcare, one camp at a time.
          </p>
          <div className="border-t border-slate-800 pt-6 text-slate-400 text-sm">
            <p>&copy; 2025 MediConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
