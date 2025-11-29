import React from 'react';
import { Building, Heart, ArrowRight, Users, Stethoscope, HandHeart, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Partner() {
  const navigate = useNavigate();

  const partners = [
    {
      type: 'hospital',
      icon: <Building className="w-16 h-16" />,
      title: 'Hospital Partnership',
      description: 'Join our network of healthcare providers and expand your reach to thousands of patients.',
      color: 'from-blue-500 to-cyan-500',
      benefits: ['Increase patient reach', 'Digital presence', 'Easy appointment management', 'Verified platform']
    },
    {
      type: 'ngo',
      icon: <HandHeart className="w-16 h-16" />,
      title: 'NGO Partnership',
      description: 'Collaborate with us to provide healthcare access to underserved communities.',
      color: 'from-green-500 to-emerald-500',
      benefits: ['Community impact', 'Medicine distribution', 'Health campaigns', 'Volunteer network']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-6">
            <Users className="w-4 h-4 mr-2" />
            Partner With Us
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Join Our Network
            </span>
            <br />
            <span className="text-slate-900">Transform Healthcare Together</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Be part of India's leading healthcare platform connecting patients, doctors, hospitals, and NGOs.
          </p>
        </div>
      </section>

      {/* Partner Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300">
                <div className={`bg-gradient-to-br ${partner.color} p-8 text-white`}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-6">
                    {partner.icon}
                  </div>
                  <h2 className="text-3xl font-bold mb-3">{partner.title}</h2>
                  <p className="text-white/90 text-lg">{partner.description}</p>
                </div>
                
                <div className="p-8">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-600" />
                    Benefits
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {partner.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-slate-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => navigate(`/${partner.type}-auth`)}
                    className={`group w-full py-4 bg-gradient-to-r ${partner.color} text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center`}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Hospitals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">NGOs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-blue-100">Patients</div>
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
            Connecting healthcare, one partnership at a time.
          </p>
          <div className="border-t border-slate-800 pt-6 text-slate-400 text-sm">
            <p>&copy; 2025 MediConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
