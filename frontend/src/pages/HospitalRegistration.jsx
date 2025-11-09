import React from "react";

export default function HospitalRegistration() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-8">Hospital Registration</h1>
        <form className="grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Hospital Name" className="border border-slate-300 rounded-xl px-4 py-3" />
          <input type="text" placeholder="Registration Number" className="border border-slate-300 rounded-xl px-4 py-3" />
          <input type="text" placeholder="City" className="border border-slate-300 rounded-xl px-4 py-3" />
          <input type="text" placeholder="State" className="border border-slate-300 rounded-xl px-4 py-3" />
          <input type="email" placeholder="Official Email" className="border border-slate-300 rounded-xl px-4 py-3" />
          <input type="tel" placeholder="Contact Number" className="border border-slate-300 rounded-xl px-4 py-3" />
          <textarea placeholder="Address" rows="3" className="md:col-span-2 border border-slate-300 rounded-xl px-4 py-3"></textarea>
          <button className="md:col-span-2 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all">
            Register Hospital
          </button>
        </form>
      </div>
    </div>
  );
}
