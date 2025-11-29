// models/MedicineDonation.js - New model for medicine donations
const mongoose = require('mongoose');

const medicineDonationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  medicineName: {
    type: String,
    required: [true, 'Medicine name is required'],
    trim: true
  },
  units: {
    type: String,
    required: [true, 'Units are required'],
    enum: ['tablets', 'capsules', 'syrup', 'injection', 'strips', 'bottles', 'boxes']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  demand: {
    type: String,
    required: [true, 'Special instructions are required'],
    trim: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'collected', 'delivered'],
    default: 'pending'
  },
  assignedVolunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    default: null
  },
  assignedNGO: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('MedicineDonation', medicineDonationSchema);