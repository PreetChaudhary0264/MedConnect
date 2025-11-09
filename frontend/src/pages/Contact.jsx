import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center py-20 px-6">
      <div className="max-w-3xl w-full bg-white p-10 rounded-3xl shadow-2xl space-y-6">
        <h1 className="text-4xl font-bold text-center text-blue-700">Contact Us</h1>
        <p className="text-center text-slate-600">
          Have questions or feedback? We’d love to hear from you.
        </p>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full border border-slate-300 rounded-xl px-4 py-3" />
          <input type="email" placeholder="Email Address" className="w-full border border-slate-300 rounded-xl px-4 py-3" />
          <textarea placeholder="Your Message" rows="5" className="w-full border border-slate-300 rounded-xl px-4 py-3"></textarea>
          <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
