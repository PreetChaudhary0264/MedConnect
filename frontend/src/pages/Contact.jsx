import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Heart, MessageSquare, Headphones, Building, Users, Globe } from 'lucide-react';
import Navbar from './Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    userType: 'patient'
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: ['+91 1800-123-4567', '+91 1800-765-4321'],
      subtext: 'Mon-Sat, 9 AM - 6 PM',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: ['support@mediconnect.com', 'info@mediconnect.com'],
      subtext: 'We reply within 24 hours',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Office',
      details: ['123 Healthcare Plaza', 'Connaught Place, New Delhi - 110001'],
      subtext: 'Visit us during office hours',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Working Hours',
      details: ['Monday - Friday: 9 AM - 8 PM', 'Saturday - Sunday: 10 AM - 6 PM'],
      subtext: 'Emergency support 24/7',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const departments = [
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'Customer Support',
      description: 'General inquiries and assistance',
      email: 'support@mediconnect.com',
      phone: '+91 1800-123-4567'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Doctor Partnership',
      description: 'Join our network of healthcare providers',
      email: 'doctors@mediconnect.com',
      phone: '+91 1800-234-5678'
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: 'Hospital Collaboration',
      description: 'Partner with us for better healthcare',
      email: 'hospitals@mediconnect.com',
      phone: '+91 1800-345-6789'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'NGO Partnership',
      description: 'Collaborate for community health',
      email: 'ngos@mediconnect.com',
      phone: '+91 1800-456-7890'
    }
  ];

  const faqs = [
    {
      question: 'How do I book a consultation?',
      answer: 'You can book a consultation through our Book Consultation page by selecting your preferred doctor and time slot.'
    },
    {
      question: 'What are the consultation fees?',
      answer: 'Consultation fees vary by doctor and specialization, typically ranging from ₹500 to ₹1000 per session.'
    },
    {
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes, you can cancel or reschedule up to 2 hours before your scheduled appointment time.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely! We use industry-standard encryption and follow strict HIPAA guidelines to protect your data.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        userType: 'patient'
      });
      
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-6">
            <MessageSquare className="w-4 h-4 mr-2" />
            We're Here to Help
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </span>
            <br />
            <span className="text-slate-900">With Us</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Have questions or need assistance? Our team is ready to help you 24/7. Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-slate-100">
                <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mb-4 text-white`}>
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-slate-700 mb-1">{detail}</p>
                ))}
                <p className="text-sm text-slate-500 mt-2">{info.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Send us a Message</h2>
              <div className="space-y-6">
                {/* User Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">I am a</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['patient', 'doctor', 'hospital', 'ngo'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData(prev => ({ ...prev, userType: type }))}
                        className={`py-3 rounded-xl border-2 transition capitalize font-medium ${
                          formData.userType === type
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                      errors.name ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email and Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                        errors.email ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                        errors.phone ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help you?"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                      errors.subject ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'
                    }`}
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Tell us more about your inquiry..."
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none resize-none transition ${
                      errors.message ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-lg flex items-center justify-center group"
                >
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Departments & Map */}
            <div className="space-y-8">
              {/* Departments */}
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Departments</h2>
                <div className="space-y-4">
                  {departments.map((dept, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl hover:shadow-md transition">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                          {dept.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 mb-1">{dept.title}</h3>
                          <p className="text-sm text-slate-600 mb-2">{dept.description}</p>
                          <div className="flex flex-col text-sm space-y-1">
                            <a href={`mailto:${dept.email}`} className="text-blue-600 hover:underline">
                              {dept.email}
                            </a>
                            <a href={`tel:${dept.phone}`} className="text-blue-600 hover:underline">
                              {dept.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-80 bg-gradient-to-br from-slate-200 to-slate-300 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9776938304243!2d77.21789931508066!3d28.628364593915947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd371d9e0c2f%3A0x5df2f0c7b3e9e47f!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">Quick answers to common questions</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-slate-900 hover:bg-slate-50 transition flex items-center justify-between">
                  {faq.question}
                  <span className="text-blue-600 text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-4 text-slate-600 border-t border-slate-100 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Success Message Toast */}
      {showSuccess && (
        <div className="fixed bottom-8 right-8 bg-white rounded-2xl shadow-2xl p-6 max-w-md border-2 border-green-500 z-50">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Message Sent Successfully!</h3>
              <p className="text-sm text-slate-600">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

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
                <li><a href="#" className="hover:text-white transition">Book Consultation</a></li>
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
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