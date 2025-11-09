import React from "react";
import { Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
            <Heart className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-slate-900">About MediConnect</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
          MediConnect is a digital healthcare ecosystem designed to make medical services more accessible, affordable, 
          and efficient for everyone — especially in underserved areas. We connect patients, doctors, hospitals, 
          and NGOs through technology that empowers both rural and urban healthcare delivery.
        </p>
        <div className="mt-12 text-left bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-blue-700">Our Mission</h2>
          <p className="text-slate-600">
            To create a unified healthcare network that minimizes medicine wastage, reduces waiting time, 
            and ensures that everyone, regardless of location, receives timely medical assistance.
          </p>

          <h2 className="text-2xl font-bold text-blue-700">Our Vision</h2>
          <p className="text-slate-600">
            A world where quality healthcare is accessible to all — connecting patients and healthcare providers 
            with trust, technology, and transparency.
          </p>
        </div>
      </div>
    </div>
  );
}

