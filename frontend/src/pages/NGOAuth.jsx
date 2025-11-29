import React, { useState } from 'react';
import { HandHeart, Mail, Lock, Phone, MapPin, Eye, EyeOff, ArrowRight, Check, AlertCircle, Heart, Users, Package, Globe } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL; // Adjust if backend URL is different

export default function NGOAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '', email: '', phone: '', address: '', password: '', confirmPassword: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === 'phone') {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    setSignupData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleApiCall = async (endpoint, data) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${API_BASE_URL}/ngos/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Something went wrong');

      localStorage.setItem('token', result.token);
      localStorage.setItem('ngo', JSON.stringify(result.ngo));
      setSuccess('Success! Redirecting...');
      setTimeout(() => window.location.href = '/ngo-dashboard', 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      handleApiCall('login', loginData);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (signupData.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits!');
      return;
    }
    const { confirmPassword, ...signupPayload } = signupData;
    handleApiCall('register', signupPayload);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          
          {/* Left Side - Branding */}
          <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-12 text-white hidden lg:flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" fill="white" />
                </div>
                <span className="text-3xl font-bold">MediConnect</span>
              </div>
              <h2 className="text-4xl font-bold leading-tight mb-6">
                {isLogin ? 'Welcome Back!' : 'Join Our Mission'}
              </h2>
              <p className="text-green-100 text-lg mb-8">
                {isLogin 
                  ? 'Login to manage your NGO profile and community health initiatives'
                  : 'Register your NGO to collaborate on healthcare accessibility'
                }
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <p className="text-green-50">Organize health camps</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <p className="text-green-50">Manage medicine distribution</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <HandHeart className="w-5 h-5" />
                  </div>
                  <p className="text-green-50">Coordinate volunteers</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <p className="text-green-50">Partner with hospitals</p>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-white/20">
              <p className="text-green-100 text-sm">Trusted by 100+ NGOs making impact</p>
            </div>
          </div>

          {/* Right Side - Forms */}
          <div className="p-8 lg:p-12">
            
            {/* Toggle Buttons */}
            <div className="flex bg-slate-100 rounded-xl p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isLogin ? 'bg-white text-green-600 shadow-md' : 'text-slate-600'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  !isLogin ? 'bg-white text-green-600 shadow-md' : 'text-slate-600'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-green-700">{success}</span>
              </div>
            )}

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">NGO Login</h3>
                  <p className="text-slate-600">Enter your credentials to continue</p>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                    <Mail className="w-4 h-4 mr-2 text-green-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="ngo@example.com"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                    <Lock className="w-4 h-4 mr-2 text-green-600" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="Enter password"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold flex items-center justify-center"
                >
                  {loading ? 'Logging in...' : (
                    <>
                      Login to Portal
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              // Signup Form
              <form onSubmit={handleSignupSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Register NGO</h3>
                  <p className="text-slate-600">Create your NGO account</p>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                    <HandHeart className="w-4 h-4 mr-2 text-green-600" />
                    NGO Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    placeholder="Enter NGO name"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                      <Mail className="w-4 h-4 mr-2 text-green-600" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      placeholder="ngo@example.com"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                      <Phone className="w-4 h-4 mr-2 text-green-600" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={signupData.phone}
                      onChange={handleSignupChange}
                      placeholder="9876543210"
                      maxLength="10"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-green-600" />
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={signupData.address}
                    onChange={handleSignupChange}
                    placeholder="NGO address"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                      <Lock className="w-4 h-4 mr-2 text-green-600" />
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      placeholder="Create password"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                      <Lock className="w-4 h-4 mr-2 text-green-600" />
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      placeholder="Confirm password"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold flex items-center justify-center"
                >
                  {loading ? 'Creating Account...' : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
