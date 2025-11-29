import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Search, Filter, Star, Award, TrendingUp, MapPin, Heart, ArrowRight, CheckCircle, X } from 'lucide-react';
import Navbar from './Navbar';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const DoctorCard = ({ doctor, onBook }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 group">
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <img 
              src={
                doctor.image || 
                `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.fullName || 'Doctor')}&background=random&color=fff&size=80&bold=true&rounded=true`
              } 
              alt={doctor.fullName || 'Doctor'}
              className="w-20 h-20 rounded-xl object-cover bg-indigo-100"
            />
            {doctor.available && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-1">{doctor.fullName || 'Dr. Unknown'}</h3>
            <p className="text-blue-600 font-medium mb-2">{doctor.specialization || 'General'}</p>
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 font-semibold text-slate-900">{doctor.rating || 'N/A'}</span>
              </div>
              <span className="text-slate-500">{doctor.experience || 0} years exp</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-4 text-sm text-slate-600">
          <MapPin className="w-4 h-4" />
          <span>{doctor.location || 'Location not available'}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <div>
            <p className="text-sm text-slate-600">Consultation Fee</p>
            <p className="text-2xl font-bold text-slate-900">₹{doctor.fee || 0}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600">Next Available</p>
            <p className="text-sm font-semibold text-blue-600">{doctor.nextAvailable || 'Today'}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {(doctor.expertise || []).slice(0, 3).map((skill, idx) => (
            <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
              {skill}
            </span>
          ))}
        </div>
        
        <button 
          onClick={() => onBook(doctor)}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center group-hover:scale-105"
        >
          Book Consultation
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const BookingModal = ({ doctor, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('video');
  const [symptoms, setSymptoms] = useState('');

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm({ doctor, date: selectedDate, time: selectedTime, type: consultationType, symptoms });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Book Consultation</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <img 
              src={
                doctor.image || 
                `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.fullName || 'Doctor')}&background=random&color=fff&size=64&bold=true&rounded=true`
              } 
              alt={doctor.fullName} 
              className="w-16 h-16 rounded-xl object-cover bg-indigo-100" 
            />
            <div>
              <h3 className="font-bold text-slate-900">{doctor.fullName}</h3>
              <p className="text-blue-600 text-sm">{doctor.specialization}</p>
              <p className="text-slate-600 text-sm">₹{doctor.fee} consultation fee</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">Consultation Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setConsultationType('video')}
                className={`p-4 rounded-xl border-2 transition ${
                  consultationType === 'video' 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Video className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="font-semibold text-slate-900">Video Call</p>
              </button>
              <button
                onClick={() => setConsultationType('clinic')}
                className={`p-4 rounded-xl border-2 transition ${
                  consultationType === 'clinic' 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="font-semibold text-slate-900">Clinic Visit</p>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">Select Time</label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 rounded-lg border-2 transition text-sm font-medium ${
                    selectedTime === time
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200 hover:border-blue-300 text-slate-700'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">Describe Your Symptoms (Optional)</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows="4"
              placeholder="Please describe your symptoms or reason for consultation..."
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none resize-none"
            />
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            Proceed to Payment
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function BookConsultation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const specializations = [
    'All', 'Cardiologist', 'Dermatologist', 'Pediatrician', 
    'Orthopedic', 'Psychiatrist', 'General Physician'
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/doctors`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data.doctors || []);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const filteredDoctors = doctors.filter(doctor => {
    const name = (doctor.fullName || '').toLowerCase();
    const specialization = (doctor.specialization || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = name.includes(query) || specialization.includes(query);
    const matchesSpecialization = selectedSpecialization === 'All' || 
                                 doctor.specialization === selectedSpecialization;

    return matchesSearch && matchesSpecialization;
  });

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async (details) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to book consultation');
        return;
      }

      const orderResponse = await fetch(`${API_BASE_URL}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: details.doctor.fee,
          doctorId: details.doctor._id,
          date: details.date,
          time: details.time,
          consultationType: details.type,
          symptoms: details.symptoms
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: 'MedConnect',
        description: `Consultation with ${details.doctor.fullName}`,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch(`${API_BASE_URL}/payment/verify-payment`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                doctorId: details.doctor._id,
                date: details.date,
                time: details.time,
                consultationType: details.type,
                symptoms: details.symptoms
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            setBookingDetails(details);
            setShowBookingModal(false);
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 5000);
          } catch (err) {
            alert(`Booking failed: ${err.message}`);
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#3B82F6'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(`Payment failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Book Your Consultation Today
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Expert Doctors
            </span>
            <br />
            <span className="text-slate-900">At Your Fingertips</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Connect with verified healthcare professionals. Book video consultations or clinic visits in just a few clicks.
          </p>
        </div>
      </section>

      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by doctor name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-lg"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-slate-600 flex-shrink-0" />
              {specializations.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialization(spec)}
                  className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition ${
                    selectedSpecialization === spec
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Available Doctors ({filteredDoctors.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-slate-600">Loading doctors...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor) => (
                <DoctorCard 
                  key={doctor.id || doctor._id} 
                  doctor={doctor} 
                  onBook={handleBookAppointment}
                />
              ))}
            </div>
          )}

          {!loading && filteredDoctors.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600">No doctors found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {showBookingModal && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleConfirmBooking}
        />
      )}

      {showConfirmation && bookingDetails && (
        <div className="fixed bottom-8 right-8 bg-white rounded-2xl shadow-2xl p-6 max-w-md border-2 border-green-500 animate-slide-up z-50">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Booking Confirmed!</h3>
              <p className="text-sm text-slate-600 mb-2">
                Your consultation with <strong>{bookingDetails.doctor.fullName}</strong> is confirmed
              </p>
              <p className="text-sm font-semibold text-blue-600">
                {new Date(bookingDetails.date).toLocaleDateString('en-GB')} at {bookingDetails.time}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
