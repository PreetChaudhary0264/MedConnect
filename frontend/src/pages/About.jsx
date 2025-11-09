import React, { useState } from 'react';
import { Heart, Target, Eye, Award, Users, TrendingUp, Shield, Zap, Globe, CheckCircle, Star, ArrowRight, Lightbulb, Handshake, Stethoscope, Building, UserCheck, Activity } from 'lucide-react';

import Navbar from './Navbar';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { icon: <Users className="w-8 h-8" />, number: '10,000+', label: 'Happy Patients', color: 'from-blue-500 to-cyan-500' },
    { icon: <Stethoscope className="w-8 h-8" />, number: '500+', label: 'Expert Doctors', color: 'from-green-500 to-emerald-500' },
    { icon: <Building className="w-8 h-8" />, number: '50+', label: 'Partner Hospitals', color: 'from-purple-500 to-pink-500' },
    { icon: <Activity className="w-8 h-8" />, number: '25,000+', label: 'Consultations', color: 'from-orange-500 to-red-500' }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Patient-First Approach',
      description: 'We prioritize patient wellbeing and satisfaction in every decision we make.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security & Privacy',
      description: 'Your health data is protected with industry-leading encryption and security measures.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We continuously innovate to provide cutting-edge healthcare solutions.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: 'Trust & Transparency',
      description: 'We build lasting relationships through honest communication and reliable service.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Accessibility',
      description: 'Making quality healthcare accessible to everyone, everywhere, anytime.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'Committed to maintaining the highest standards of healthcare delivery.',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const team = [
    {
      name: 'Nabh Yadav',
      role: 'Chief Medical Officer',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      description: 'Leading medical innovation with 20+ years of experience'
    },
    {
      name: 'Priyanshu Bhardwaj',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      description: 'Visionary entrepreneur revolutionizing healthcare access'
    },
    {
      name: 'Ankit Patel',
      role: 'Head of Technology',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
      description: 'Building scalable healthcare technology solutions'
    },
    {
      name: 'Preet Chaudhary',
      role: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      description: 'Ensuring seamless operations and patient satisfaction'
    },
    {
      name: 'Vidant Bhardwaj',
      role: 'Director of Patient Care',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
      description: 'Dedicated to delivering exceptional patient experiences'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'MediConnect was founded with a vision to make healthcare accessible to all'
    },
    {
      year: '2021',
      title: 'First 100 Doctors',
      description: 'Onboarded 100+ verified doctors across multiple specializations'
    },
    {
      year: '2022',
      title: 'Hospital Partnerships',
      description: 'Partnered with 25+ major hospitals across India'
    },
    {
      year: '2023',
      title: '10,000 Patients',
      description: 'Reached milestone of serving 10,000+ patients successfully'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Launched Medi-Bot for intelligent health assistance'
    },
    {
      year: '2025',
      title: 'National Expansion',
      description: 'Expanded services to 50+ cities across India'
    }
  ];

  const achievements = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Best HealthTech Startup 2024',
      org: 'Indian Healthcare Awards'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Top Rated Healthcare App',
      org: 'Google Play Store'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Fastest Growing Platform',
      org: 'HealthTech India Summit'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'ISO 27001 Certified',
      org: 'International Standards'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-6">
                <Lightbulb className="w-4 h-4 mr-2" />
                About MediConnect
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Transforming
                </span>
                <br />
                <span className="text-slate-900">Healthcare Access</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                We're on a mission to make quality healthcare accessible to everyone. Through technology and innovation, we connect patients with the best healthcare providers, anytime, anywhere.
              </p>
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg flex items-center">
                Join Our Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop" 
                alt="Healthcare Team"
                className="relative rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-slate-100">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 text-white`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Tabs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="border-b border-slate-200">
              <div className="flex">
                {[
                  { id: 'mission', label: 'Our Mission', icon: <Target className="w-5 h-5" /> },
                  { id: 'vision', label: 'Our Vision', icon: <Eye className="w-5 h-5" /> },
                  { id: 'story', label: 'Our Story', icon: <Heart className="w-5 h-5" /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-4 font-semibold transition flex items-center justify-center space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-8 lg:p-12">
              {activeTab === 'mission' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Empowering Healthcare for All</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our mission is to democratize healthcare access by leveraging technology to connect patients with quality healthcare providers. We believe that everyone deserves access to affordable, reliable, and timely medical care, regardless of their location or economic status.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 pt-6">
                    {[
                      { title: 'Accessibility', desc: 'Breaking geographical barriers to healthcare' },
                      { title: 'Affordability', desc: 'Making quality care financially accessible' },
                      { title: 'Quality', desc: 'Connecting with verified healthcare professionals' }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                        <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'vision' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">A Healthier Tomorrow</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    We envision a future where healthcare is seamlessly integrated into daily life, where preventive care is prioritized, and where every individual has instant access to medical expertise. Through AI-powered diagnostics, telemedicine, and community health initiatives, we're building the healthcare ecosystem of tomorrow.
                  </p>
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Our 2030 Goals</h3>
                    <ul className="space-y-3">
                      {[
                        'Serve 10 million patients across India',
                        'Partner with 1,000+ hospitals and 10,000+ doctors',
                        'Reduce healthcare costs by 40% through technology',
                        'Launch AI-powered preventive care programs',
                        'Expand to rural areas with mobile health units'
                      ].map((goal, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'story' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">How We Started</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    MediConnect was born from a personal experience. When our founder's elderly parents struggled to access timely medical care in their rural hometown, she realized millions faced the same challenge. In 2020, we set out to bridge this gap using technology.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    What started as a simple video consultation platform has evolved into a comprehensive healthcare ecosystem. Today, we're proud to serve thousands of patients, partner with hundreds of healthcare providers, and continue innovating to make healthcare more accessible and affordable for everyone.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 pt-6">
                    <div className="p-6 bg-blue-50 rounded-xl">
                      <Target className="w-10 h-10 text-blue-600 mb-4" />
                      <h3 className="font-bold text-slate-900 mb-2">Problem We Solve</h3>
                      <p className="text-sm text-slate-600">Long wait times, geographical barriers, and high costs preventing access to quality healthcare.</p>
                    </div>
                    <div className="p-6 bg-green-50 rounded-xl">
                      <Lightbulb className="w-10 h-10 text-green-600 mb-4" />
                      <h3 className="font-bold text-slate-900 mb-2">Our Solution</h3>
                      <p className="text-sm text-slate-600">Digital platform connecting patients with doctors instantly, reducing costs and travel time.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-slate-100 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Our Journey</h2>
            <p className="text-xl text-slate-600">Key milestones in our growth story</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-indigo-600"></div>
            <div className="space-y-12">
              {milestones.map((milestone, idx) => (
                <div key={idx} className={`flex items-center ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h3>
                      <p className="text-slate-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-slate-600">The visionaries driving healthcare innovation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-slate-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Awards & Recognition</h2>
            <p className="text-xl text-blue-100">Honored for our contribution to healthcare innovation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 text-blue-600">
                  {achievement.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-sm text-blue-100">{achievement.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Join Us in Our Mission
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Whether you're a patient seeking care, a doctor wanting to help, or a partner looking to collaborate, we'd love to have you on board.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/bookconsultation">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg">
              Book Consultation
            </button></a>
            <button className="px-8 py-4 bg-white text-slate-700 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-lg border-2 border-slate-200">
              Partner With Us
            </button>
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
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Book Consultation</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Video Consultation</a></li>
                <li><a href="#" className="hover:text-white transition">Medicine Management</a></li>
                <li><a href="#" className="hover:text-white transition">Medi-Bot</a></li>
                <li><a href="#" className="hover:text-white transition">Health Records</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>support@mediconnect.com</li>
                <li>+91 1800-123-4567</li>
                <li>Connaught Place, New Delhi</li>
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