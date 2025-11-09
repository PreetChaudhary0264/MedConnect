import React from "react";

export default function PatientRegistration() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-20 px-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-8">Patient Registration</h1>
        <form className="grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Full Name" className="border border-slate-300 rounded-xl px-4 py-3" />
          <input type="number" placeholder="Age" className="border border-slate-300 rounded-xl px-4 py-3" />
          <select className="border border-slate-300 rounded-xl px-4 py-3">
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input type="tel" placeholder="Mobile Number" className="border border-slate-300 rounded-xl px-4 py-3" />
          <input type="email" placeholder="Email Address" className="border border-slate-300 rounded-xl px-4 py-3" />
          <input type="text" placeholder="Blood Group" className="border border-slate-300 rounded-xl px-4 py-3" />
          <textarea placeholder="Address" rows="3" className="md:col-span-2 border border-slate-300 rounded-xl px-4 py-3"></textarea>
          <button className="md:col-span-2 w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all">
            Register as Patient
          </button>
        </form>
      </div>
    </div>
  );
}
