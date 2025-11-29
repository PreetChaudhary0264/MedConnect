import React, { useState, useEffect } from 'react';
import { Heart, Search, Filter, MapPin, Calendar, Package, Pill, User, Phone, ArrowRight, X, SlidersHorizontal, Loader2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL;
import Navbar from './Navbar';
export default function MedicineSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/donations`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Something went wrong');
        }

        // Map API data to component format
        const mappedMedicines = result.donations.map(donation => ({
          id: donation._id,
          name: donation.medicineName,
          donor: donation.user.fullName,
          units: donation.units.charAt(0).toUpperCase() + donation.units.slice(1),
          quantity: donation.quantity,
          expiryDate: donation.expiryDate,
          location: donation.address,
          phone: donation.user.phone,
          instructions: donation.demand,
          status: donation.status,
          assignedVolunteer: donation.assignedVolunteer,
          assignedNGO: donation.assignedNGO,
          image: donation.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'
        }));
        

        setMedicines(mappedMedicines);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const filterOptions = [
    { value: 'all', label: 'All Medicines' },
    { value: 'tablets', label: 'Tablets' },
    { value: 'capsules', label: 'Capsules' },
    { value: 'syrup', label: 'Syrup' },
    { value: 'injection', label: 'Injections' },
    { value: 'strips', label: 'Strips' }
  ];

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         med.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         med.units.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter && med.status !== 'delivered';
  });

  const getExpiryStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const monthsLeft = (expiry - today) / (1000 * 60 * 60 * 24 * 30);
    
    if (monthsLeft < 3) return { color: 'text-red-600 bg-red-50', text: 'Expires Soon' };
    if (monthsLeft < 6) return { color: 'text-yellow-600 bg-yellow-50', text: 'Expires in 6 months' };
    return { color: 'text-green-600 bg-green-50', text: 'Good Validity' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading available medicines...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Error Loading Medicines</h3>
          <p className="text-slate-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
   <Navbar />

      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-6">
            <Pill className="w-4 h-4 mr-2" />
            Find Medicine You Need
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Available Medicines
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
            Search and connect with donors who have the medicine you need
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by medicine name or location..."
                className="w-full pl-14 pr-14 py-5 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none transition text-slate-900 placeholder-slate-400 text-lg shadow-lg"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <SlidersHorizontal className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Filter Pills */}
            {showFilters && (
              <div className="mt-4 flex flex-wrap gap-3 justify-center">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedFilter(option.value)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedFilter === option.value
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'bg-white text-slate-700 hover:shadow-md'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-slate-600 font-medium">
          Showing <span className="text-blue-600 font-bold">{filteredMedicines.length}</span> available medicines
        </p>
      </div>

      {/* Medicine Cards Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((medicine) => {
              const expiryStatus = getExpiryStatus(medicine.expiryDate);
              return (
                <div
                  key={medicine.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  {/* Medicine Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${expiryStatus.color}`}>
                        {expiryStatus.text}
                      </span>
                    </div>
                  </div>

                  {/* Medicine Details */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{medicine.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <User className="w-4 h-4" />
                        <span>Donated by {medicine.donor}</span>
                      </div>
                      {medicine.assignedNGO && (
                        <div className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold inline-block">
                          Managed by {medicine.assignedNGO.name}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Package className="w-4 h-4 text-blue-600" />
                        <span className="text-slate-700">{medicine.quantity} {medicine.units}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-slate-700">{new Date(medicine.expiryDate).toLocaleDateString('en-GB')}</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{medicine.location}</span>
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-2">
                      {medicine.instructions}
                    </p>

                    <button
                      onClick={() => setSelectedMedicine(medicine)}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center group"
                    >
                      {medicine.assignedNGO ? 'Contact NGO' : 'Contact Donor'}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredMedicines.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No medicines found</h3>
              <p className="text-slate-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Modal */}
      {selectedMedicine && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-slate-900">
                  {selectedMedicine.assignedNGO ? 'Contact NGO' : 'Contact Donor'}
                </h2>
                <button
                  onClick={() => setSelectedMedicine(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>

              <div className="space-y-6">
                <img
                  src={selectedMedicine.image}
                  alt={selectedMedicine.name}
                  className="w-full h-64 object-cover rounded-2xl"
                />

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedMedicine.name}</h3>
                  <div className="inline-flex px-4 py-2 rounded-full text-sm font-semibold bg-blue-50 text-blue-700">
                    {selectedMedicine.quantity} {selectedMedicine.units} Available
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-slate-500">Donor Name</p>
                      <p className="font-semibold text-slate-900">{selectedMedicine.donor}</p>
                    </div>
                  </div>

                  {selectedMedicine.assignedNGO ? (
                    <>
                      <div className="border-t pt-4">
                        <p className="text-sm font-semibold text-green-700 mb-3">Managed by NGO</p>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="text-sm text-slate-500">NGO Name</p>
                              <p className="font-semibold text-slate-900">{selectedMedicine.assignedNGO.name}</p>
                            </div>
                          </div>
                          {selectedMedicine.assignedNGO.phone && (
                            <div className="flex items-center space-x-3">
                              <Phone className="w-5 h-5 text-green-600" />
                              <div>
                                <p className="text-sm text-slate-500">NGO Contact</p>
                                <p className="font-semibold text-slate-900">{selectedMedicine.assignedNGO.phone}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {selectedMedicine.assignedVolunteer && (
                        <div className="border-t pt-4">
                          <p className="text-sm font-semibold text-blue-700 mb-3">Assigned Volunteer</p>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <User className="w-5 h-5 text-blue-600" />
                              <div>
                                <p className="text-sm text-slate-500">Volunteer Name</p>
                                <p className="font-semibold text-slate-900">{selectedMedicine.assignedVolunteer.name}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Phone className="w-5 h-5 text-blue-600" />
                              <div>
                                <p className="text-sm text-slate-500">Volunteer Contact</p>
                                <p className="font-semibold text-slate-900">{selectedMedicine.assignedVolunteer.phone}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-slate-500">Contact Number</p>
                        <p className="font-semibold text-slate-900">{selectedMedicine.phone}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="font-semibold text-slate-900">{selectedMedicine.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm text-slate-500">Expiry Date</p>
                      <p className="font-semibold text-slate-900">{new Date(selectedMedicine.expiryDate).toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Instructions</h4>
                  <p className="text-slate-700">{selectedMedicine.instructions}</p>
                </div>

                <div className="flex gap-4">
                  <a
                    href={`tel:${selectedMedicine.assignedVolunteer?.phone || selectedMedicine.assignedNGO?.phone || selectedMedicine.phone}`}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-center"
                  >
                    Call {selectedMedicine.assignedNGO ? 'NGO' : 'Donor'}
                  </a>
                  <a
                    href={`sms:${selectedMedicine.assignedVolunteer?.phone || selectedMedicine.assignedNGO?.phone || selectedMedicine.phone}`}
                    className="flex-1 px-6 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-center"
                  >
                    Send SMS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold">MediConnect</span>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Connecting healthcare, one medicine at a time.
          </p>
          <div className="border-t border-slate-800 pt-6 text-slate-400 text-sm">
            <p>&copy; 2025 MediConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}