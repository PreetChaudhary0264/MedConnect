// controllers/userController.js  →  अब ये User + Booking दोनों का काम करेगा

const User = require('../models/User');
const Booking = require('../models/Booking');

// ====================== USER PROFILE ======================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .lean();

    if (!user) return res.status(404).json({ message: 'User not found' });
    
    let age = null;
    if (user.dateOfBirth) {
      const today = new Date();
      const birth = new Date(user.dateOfBirth);
      age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      age = `${age} years`;
    }

    res.json({
      success: true,
      profile: { ...user, age, consultations: user.consultations || [] }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password').lean();

    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log(user);
    let age = null;
    if (user.dateOfBirth) {
      const today = new Date();
      const birth = new Date(user.dateOfBirth);
      age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      age = `${age} years`;
    }

    res.json({
      success: true,
      profile: { ...user, age, consultations: user.consultations || [] }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password');
    res.json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ====================== BOOKING (अब यही पर है) ======================

const createBooking = async (req, res) => {
  try {
    const { doctorId, date, time, consultationType, symptoms } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: 'Doctor, date and time required' });
    }

    const doctor = await User.findOne({ _id: doctorId, role: 'doctor' });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    // अगर doctor का hospitalId नहीं है तो भी booking चलेगी (optional बना दिया)
    const hospitalId = doctor.hospitalId || null;

    // Create booking
    const booking = await Booking.create({
      patient: req.user.id,
      doctor: doctorId,
      hospital: hospitalId,
      date,
      time,
      consultationType: consultationType || 'video',
      symptoms: symptoms || '',
    });

    // Patient के profile में consultation entry डाल दो
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        consultations: {
          doctor: doctor.fullName,
          specialization: doctor.specialization || 'General Physician',
          date: `${date} ${time}`,
          status: 'Upcoming'
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Booking successful',
      booking
    });

  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ patient: req.user.id })
      .populate('doctor', 'fullName specialization image fee')
      .populate('hospital', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ====================== DOCUMENT UPLOAD ======================
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const url = req.file.path;
    res.json({ success: true, url });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Upload failed' });
  }
};

// ====================== EXPORT ======================
module.exports = {
  getProfile,
  updateProfile,
  getDoctors,
  createBooking,
  getMyBookings,
  uploadDocument
};