const mongoose = require('mongoose');

const campSchema = new mongoose.Schema({
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    required: true
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    default: null
  },
  name: {
    type: String,
    required: [true, 'Camp name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Camp type is required'],
    enum: ['Eye Test', 'Blood Donation', 'Sugar Test', 'Blood Pressure', 'General Health', 'Vaccination', 'Other']
  },
  date: {
    type: String,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  }
}, { timestamps: true });

module.exports = mongoose.model('Camp', campSchema);
