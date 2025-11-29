// models/User.js - Updated to allow empty strings for non-required enum fields by defaulting to null
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Full name must be at least 2 characters'],
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    match: [/^\d{10}$/, 'Phone must be exactly 10 digits']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'doctor'],
    default: 'user'
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    default: null
  },
  // Doctor specific fields
  specialization: {
    type: String,
    trim: true,
    default: null
  },
  rating: {
    type: Number,
    default: null
  },
  experience: {
    type: Number,
    default: null
  },
  location: {
    type: String,
    trim: true,
    default: null
  },
  fee: {
    type: Number,
    default: null
  },
  nextAvailable: {
    type: String,
    trim: true,
    default: null
  },
  available: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    trim: true,
    default: null
  },
  expertise: [{
    type: String,
    trim: true
  }],
  // Personal Info
  dateOfBirth: {
    type: Date,
    default: null
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: null
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    default: null
  },
  address: {
    type: String,
    trim: true,
    default: null
  },
  emergencyContactName: {
    type: String,
    trim: true,
    default: null
  },
  emergencyContact: {
    type: String,
    match: [/^\+?\d{10,15}$/],
    default: null
  },
  // Medical History
  height: {
    type: String, // e.g., "175 cm"
    default: null
  },
  weight: {
    type: String, // e.g., "78 kg"
    default: null
  },
  bmi: {
    type: String, // e.g., "25.4"
    default: null
  },
  allergies: [{
    type: String,
    trim: true
  }],
  chronicConditions: [{
    type: String,
    trim: true
  }],
  currentMedications: [{
    name: { type: String, required: true, trim: true },
    dosage: { type: String, required: true, trim: true },
    frequency: { type: String, required: true, trim: true }
  }],
  lastCheckup: {
    type: String, // e.g., "15/10/2024"
    default: null
  },
  nextAppointment: {
    type: String, // e.g., "20/11/2024"
    default: null
  },
  // Vitals (current)
  bloodPressure: {
    type: String, // e.g., "128/82 mmHg"
    default: null
  },
  heartRate: {
    type: String, // e.g., "72 bpm"
    default: null
  },
  temperature: {
    type: String, // e.g., "98.6°F"
    default: null
  },
  oxygenLevel: {
    type: String, // e.g., "98%"
    default: null
  },
  lastUpdatedVitals: {
    type: String, // e.g., "05/11/2024"
    default: null
  },
  // Documents
  documents: [{
    name: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    url: { type: String, default: null }
  }],
  // Consultations
  consultations: [{
    doctor: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    status: { type: String, enum: ['Completed', 'Upcoming', 'Confirmed', 'Cancelled'], required: true }
  }]
}, { timestamps: true });

// Pre-save middleware to handle empty strings for enum fields
 userSchema.pre('save', async function(next) {
  // For enum fields, if empty string, set to null
  if (this.gender === '') this.gender = null;
  if (this.bloodGroup === '') this.bloodGroup = null;
  if (this.status === '') this.status = null; // For subdocs, but handled in validation

  // For array fields, filter empty strings
  this.allergies = this.allergies.filter(allergy => allergy && allergy.trim());
  this.chronicConditions = this.chronicConditions.filter(condition => condition && condition.trim());

  // For subdoc arrays, filter invalid subdocs
  this.currentMedications = this.currentMedications.filter(med => 
    med.name && med.name.trim() && med.dosage && med.dosage.trim() && med.frequency && med.frequency.trim()
  );
  this.documents = this.documents.filter(doc => 
    doc.name && doc.name.trim() && doc.date && doc.date.trim() && doc.type && doc.type.trim()
  );
  this.consultations = this.consultations.filter(consult => 
    consult.doctor && consult.doctor.trim() && consult.specialization && consult.specialization.trim() && 
    consult.date && consult.date.trim() && consult.status && ['Completed', 'Upcoming', 'Confirmed', 'Cancelled'].includes(consult.status)
  );

  if (!this.isModified('password')) {
    return next();
  }
  try {
    if (this.password && !this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);