// HealthcareLanding.jsx
import React, { useState, useEffect } from 'react';
import { Video, Pill, Clock, Users, Bot, Shield, Smartphone, TrendingUp, CheckCircle, ArrowRight, Heart } from 'lucide-react';

import Navbar from './Navbar'; // Assuming Navbar is in the same directory or adjust path as needed

export default function HealthcareLanding() {
  const features = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "Real-Time Consultations",
      description: "Connect with doctors instantly through high-quality video calls. No more travel or waiting times.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Pill className="w-8 h-8" />,
      title: "Medicine Management",
      description: "Track expiry dates, donate surplus medicines, and access affordable healthcare solutions.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Medi-Bot",
      description: "Bot to assist with your Reports.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Access healthcare 24/7",
      color: "from-purple-500 to-indigo-500"
    }
  ];
  const stats = [
    { number: "70%", label: "Reduced Travel Time" },
    { number: "50%", label: "Less Waiting Time" },
    { number: "24/7", label: "Healthcare Access" },
    { number: "1:10k", label: "Doctor-Patient Ratio in India" }
  ];
  const benefits = [
    "Integrated platform connecting patients, doctors, hospitals, and NGOs",
    "E-prescriptions for better medication tracking",
    "Secure cloud storage with data encryption",
    "Real-time health campaigns and community support",
    "Affordable medicine distribution system",
    "Multi-language support for diverse populations"
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
     
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium">
                <TrendingUp className="w-4 h-4 mr-2" />
                Revolutionizing Healthcare Access
              </div>
             
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Healthcare
                </span>
                <br />
                <span className="text-slate-900">For Everyone</span>
              </h1>
             
              <p className="text-xl text-slate-600 leading-relaxed">
                Connecting patients, doctors, hospitals, and NGOs on a unified digital platform.
                Access quality healthcare anytime, anywhere.
              </p>
             
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg flex items-center justify-center">
                  Book Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white text-slate-700 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-lg border-2 border-slate-200">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Next Consultation</p>
                    <p className="font-semibold text-slate-900">Dr. Sarah Johnson</p>
                    <p className="text-sm text-blue-600">In 15 minutes</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Clock className="w-6 h-6" />, label: "Quick Access" },
                    { icon: <Shield className="w-6 h-6" />, label: "Secure Data" },
                    { icon: <Users className="w-6 h-6" />, label: "Expert Doctors" },
                    { icon: <Heart className="w-6 h-6" />, label: "Care 24/7" }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl text-center">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-2 text-blue-600 shadow">
                        {item.icon}
                      </div>
                      <p className="text-sm font-medium text-slate-700">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need for accessible, affordable, and quality healthcare in one platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                Why Choose MediConnect?
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                We're addressing critical healthcare challenges in India by creating a unified ecosystem that reduces medicine wastage, improves access, and ensures affordable care for all.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-slate-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-slate-500">IMPACT</span>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-600">Medicine Wastage Reduction</span>
                        <span className="text-sm font-semibold text-slate-900">85%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-600">Patient Satisfaction</span>
                        <span className="text-sm font-semibold text-slate-900">92%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-600">Healthcare Accessibility</span>
                        <span className="text-sm font-semibold text-slate-900">78%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-semibold text-slate-900 mb-3">Trusted By</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">500+</p>
                      <p className="text-xs text-slate-600">Doctors</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">50+</p>
                      <p className="text-xs text-slate-600">Hospitals</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">100+</p>
                      <p className="text-xs text-slate-600">NGOs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <span className="text-xl font-bold">MediConnect</span>
              </div>
              <p className="text-slate-400 text-sm">
                Connecting healthcare, one consultation at a time.
              </p>
            </div>
           
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">For Patients</a></li>
                <li><a href="#" className="hover:text-white transition">For Doctors</a></li>
                <li><a href="#" className="hover:text-white transition">For Hospitals</a></li>
                <li><a href="#" className="hover:text-white transition">For NGOs</a></li>
              </ul>
            </div>
           
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
           
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
         
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 MediConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}