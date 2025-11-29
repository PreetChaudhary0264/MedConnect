// controllers/bookingController.js
const Booking = require('../models/Booking');
const User = require('../models/User');
const Hospital = require('../models/Hospital'); // अगर है तो

const createBooking = async (req, res) => {
  try {
    const { doctorId, date, time, consultationType, symptoms } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: 'Doctor, date and time are required' });
    }

    // Verify doctor exists and is a doctor
    const doctor = await User.findOne({ _id: doctorId, role: 'doctor' });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Default hospital (आपके पास hospitalId नहीं आ रहा frontend से, तो doctor के hospitalId का use करें)
    const hospitalId = doctor.hospitalId || null;
    if (!hospitalId) {
      return res.status(400).json({ message: 'Doctor has no associated hospital' });
    }

    // Create the booking
    const booking = await Booking.create({
      patient: req.user.id,
      doctor: doctorId,
      hospital: hospitalId,
      date,
      time,
      consultationType: consultationType || 'video',
      symptoms: symptoms || '',
      status: 'pending'
    });

    // IMPORTANT: Add to patient's consultations array
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          consultations: {
            doctor: doctor.fullName,
            specialization: doctor.specialization || 'General Physician',
            date: `${date} ${time}`,
            status: 'Upcoming' // यहाँ 'Upcoming' रखें क्योंकि frontend में यही दिखता है
          }
        }
      }
    );

    // Optional: Add to doctor's upcoming appointments (future use के लिए)
    await User.findByIdAndUpdate(doctorId, {
      $push: {
        consultations: {
          doctor: doctor.fullName,
          specialization: doctor.specialization,
          date: `${date} ${time}`,
          status: 'Upcoming'
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });

  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Optional: Get my bookings
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

module.exports = { createBooking, getMyBookings };