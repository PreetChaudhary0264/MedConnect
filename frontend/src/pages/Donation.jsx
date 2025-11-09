// Updated MedicineDonation.jsx - Added API integration for submitting donation
import React, { useState } from 'react';
import { Heart, Upload, Calendar, MapPin, Pill, Package, Camera, ArrowRight, CheckCircle, AlertCircle, X } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

export default function MedicineDonation() {
  const [formData, setFormData] = useState({
    medicineName: '',
    units: '',
    quantity: '',
    expiryDate: '',
    address: '',
    demand: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      setLoading(true);
      setError('');
      const formDataToSend = new FormData();
      formDataToSend.append('medicineName', formData.medicineName);
      formDataToSend.append('units', formData.units);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('expiryDate', formData.expiryDate);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('demand', formData.demand);
      if (image) {
        formDataToSend.append('image', image);
      }

      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${API_BASE_URL}/donations`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formDataToSend,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Something went wrong');
        }

        setSubmitted(true);
        setTimeout(() => {
          setFormData({
            medicineName: '',
            units: '',
            quantity: '',
            expiryDate: '',
            address: '',
            demand: ''
          });
          setImage(null);
          setImagePreview(null);
          setSubmitted(false);
        }, 3000);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const isFormValid = formData.medicineName && formData.units && formData.quantity && 
                       formData.expiryDate && formData.address && formData.demand;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MediConnect
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="/" className="text-slate-700 hover:text-blue-600 transition font-medium">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-medium mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Make a Difference Today
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Donate Medicine
            </span>
            <br />
            <span className="text-slate-900">Save Lives</span>
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Your unused medicines can help someone in need. Join our mission to reduce medicine wastage and make healthcare accessible to all.
          </p>
        </div>
      </section>

      {/* Success Message */}
      {submitted && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 flex items-center space-x-4">
            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 text-lg">Donation Submitted Successfully!</h3>
              <p className="text-green-700">Thank you for your contribution. We'll connect you with those in need soon.</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-center space-x-4">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 text-lg">Submission Failed</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            
            <div className="space-y-8">
              
              {/* Medicine Name */}
              <div>
                <label className="flex items-center text-lg font-semibold text-slate-900 mb-3">
                  <Pill className="w-5 h-5 mr-2 text-blue-600" />
                  Medicine Name *
                </label>
                <input
                  type="text"
                  name="medicineName"
                  value={formData.medicineName}
                  onChange={handleInputChange}
                  placeholder="Enter medicine name (e.g., Paracetamol 500mg)"
                  className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900 placeholder-slate-400"
                />
              </div>

              {/* Units and Quantity */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-lg font-semibold text-slate-900 mb-3">
                    <Package className="w-5 h-5 mr-2 text-blue-600" />
                    Units *
                  </label>
                  <select
                    name="units"
                    value={formData.units}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
                  >
                    <option value="">Select unit type</option>
                    <option value="tablets">Tablets</option>
                    <option value="capsules">Capsules</option>
                    <option value="syrup">Syrup (ml)</option>
                    <option value="injection">Injection</option>
                    <option value="strips">Strips</option>
                    <option value="bottles">Bottles</option>
                    <option value="boxes">Boxes</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-lg font-semibold text-slate-900 mb-3">
                    <Package className="w-5 h-5 mr-2 text-blue-600" />
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter quantity"
                    min="1"
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="flex items-center text-lg font-semibold text-slate-900 mb-3">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Expiry Date *
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
                />
                <p className="mt-2 text-sm text-slate-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Medicine must have at least 3 months validity from today
                </p>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="flex items-center text-lg font-semibold text-slate-900 mb-3">
                  <Camera className="w-5 h-5 mr-2 text-blue-600" />
                  Medicine Photo (Optional)
                </label>
                
                {!imagePreview ? (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 transition cursor-pointer bg-slate-50"
                    >
                      <Upload className="w-12 h-12 text-slate-400 mb-3" />
                      <p className="text-slate-600 font-medium">Click to upload photo</p>
                      <p className="text-slate-400 text-sm mt-1">PNG, JPG up to 5MB</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Medicine preview"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center text-lg font-semibold text-slate-900 mb-3">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Pickup Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address for medicine pickup"
                  rows={4}
                  className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900 placeholder-slate-400 resize-none"
                />
              </div>

              {/* Demand/Special Instructions */}
              <div>
                <label className="flex items-center text-lg font-semibold text-slate-900 mb-3">
                  <Heart className="w-5 h-5 mr-2 text-blue-600" />
                  Special Instructions / Demand *
                </label>
                <textarea
                  name="demand"
                  value={formData.demand}
                  onChange={handleInputChange}
                  placeholder="Any specific requirements or who should receive this medicine? (e.g., for elderly patients, children, specific medical conditions)"
                  rows={4}
                  className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900 placeholder-slate-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!isFormValid || loading}
                className={`group w-full px-8 py-5 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-300 ${
                  isFormValid && !loading
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-2xl'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <span className="flex items-center">Submitting...</span>
                ) : (
                  <>
                    Submit Donation
                    <ArrowRight className={`ml-2 w-5 h-5 ${isFormValid ? 'group-hover:translate-x-1' : ''} transition-transform`} />
                  </>
                )}
              </button>

            </div>

            {/* Info Cards */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Verified Process</h4>
                <p className="text-sm text-slate-600">All donations are verified and tracked</p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Direct Impact</h4>
                <p className="text-sm text-slate-600">Your medicine reaches those in need</p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Free Pickup</h4>
                <p className="text-sm text-slate-600">We collect from your doorstep</p>
              </div>
            </div>

          </div>
        </div>
      </section>

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