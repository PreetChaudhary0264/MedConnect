const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Hospital = require('../models/Hospital');
const User = require('../models/User');
const Booking = require('../models/Booking');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerHospital = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    if (phone && phone.length !== 10) {
      return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
    }

    const existingHospital = await Hospital.findOne({ $or: [{ email }, { phone }] });
    if (existingHospital) {
      return res.status(400).json({ message: 'Hospital with this email or phone already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const hospital = await Hospital.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword
    });

    const token = generateToken(hospital._id);

    res.status(201).json({
      success: true,
      token,
      hospital: {
        id: hospital._id,
        name: hospital.name,
        email: hospital.email,
        phone: hospital.phone,
        address: hospital.address
      }
    });
  } catch (error) {
    console.error('Hospital registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.loginHospital = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hospital = await Hospital.findOne({ email }).select('+password');
    if (!hospital) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(hospital._id);

    res.status(200).json({
      success: true,
      token,
      hospital: {
        id: hospital._id,
        name: hospital.name,
        email: hospital.email,
        phone: hospital.phone,
        address: hospital.address
      }
    });
  } catch (error) {
    console.error('Hospital login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

exports.addDoctor = async (req, res) => {
  try {
    const { email, phone } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or phone already exists' });
    }

    const doctorData = { ...req.body, role: 'doctor', hospitalId: req.hospital._id };
    const doctor = await User.create(doctorData);
    
    const doctorResponse = doctor.toObject();
    delete doctorResponse.password;
    
    res.status(201).json({ success: true, doctor: doctorResponse });
  } catch (error) {
    console.error('Add doctor error:', error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ hospitalId: req.hospital._id, role: 'doctor' }).select('-password');
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    } else {
      delete updates.password;
    }
    const doctor = await User.findOneAndUpdate(
      { _id: id, hospitalId: req.hospital._id, role: 'doctor' },
      updates,
      { new: true }
    ).select('-password');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await User.findOneAndDelete({ _id: id, hospitalId: req.hospital._id, role: 'doctor' });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json({ success: true, message: 'Doctor deleted' });
  } catch (error) {
    console.error('Delete doctor error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getHospitalBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ hospital: req.hospital._id })
      .populate('patient', 'fullName phone')
      .populate('doctor', 'fullName specialization')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.hospital.toString() !== req.hospital._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = status;
    await booking.save();
    await booking.populate('patient', 'fullName phone');
    await booking.populate('doctor', 'fullName specialization');

    const statusMap = {
      'pending': 'Upcoming',
      'confirmed': 'Confirmed',
      'completed': 'Completed',
      'cancelled': 'Cancelled'
    };
    const consultationStatus = statusMap[status] || 'Upcoming';
    
    const patient = await User.findById(booking.patient._id);
    if (patient && patient.consultations) {
      const consultationIndex = patient.consultations.findIndex(
        c => c.doctor === booking.doctor.fullName && c.date === `${booking.date} ${booking.time}`
      );
      if (consultationIndex !== -1) {
        patient.consultations[consultationIndex].status = consultationStatus;
        await patient.save();
      }
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getHospitalCamps = async (req, res) => {
  try {
    const Camp = require('../models/Camp');
    const camps = await Camp.find({ hospital: req.hospital._id })
      .populate('ngo', 'name phone')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, camps });
  } catch (error) {
    console.error('Get camps error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPatientDetails = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await User.findById(patientId).select('-password');
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    
    let age = null;
    if (patient.dateOfBirth) {
      const today = new Date();
      const birth = new Date(patient.dateOfBirth);
      age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      age = `${age} years`;
    }

    res.status(200).json({ success: true, patient: { ...patient.toObject(), age } });
  } catch (error) {
    console.error('Get patient details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
