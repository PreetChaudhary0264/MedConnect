import React from "react";
import { User, Phone, Mail, MapPin, Heart } from "lucide-react";

export default function UserProfile() {
  const user = {
    name: "Priyanshu Bhardwaj",
    age: 26,
    gender: "Male",
    phone: "+91 98765 43210",
    email: "priyanshu@example.com",
    address: "Lucknow, Uttar Pradesh",
    bloodGroup: "B+",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center py-20 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {user.name.charAt(0)}
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
          <p className="text-slate-600">Age {user.age} • {user.gender}</p>
        </div>

        <div className="mt-8 space-y-4 text-slate-700">
          <div className="flex items-center space-x-3">
            <Phone className="text-blue-600 w-5 h-5" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="text-blue-600 w-5 h-5" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="text-blue-600 w-5 h-5" />
            <span>{user.address}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Heart className="text-red-500 w-5 h-5" />
            <span>Blood Group: {user.bloodGroup}</span>
          </div>
        </div>

        <button className="w-full mt-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
