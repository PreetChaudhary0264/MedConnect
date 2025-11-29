const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const VideoRoom = require('../models/VideoRoom');
const Booking = require('../models/Booking');

// nanoid को सही तरीके से import किया (CommonJS + ESM compatible)
let nanoid;
import('nanoid/non-secure').then(module => {
  nanoid = module.nanoid;
}).catch(err => {
  console.error('Failed to load nanoid, falling back to crypto', err);
  const crypto = require('crypto');
  nanoid = () => crypto.randomBytes(10).toString('hex');
});

// @desc    Create video room for booking
// @route   POST /api/video/create-room
// @access  Private
router.post('/create-room', protect, async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: 'Booking ID is required' });
    }

    const booking = await Booking.findById(bookingId)
      .populate('doctor', 'fullName')
      .populate('patient', 'fullName');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is either doctor or patient
    if (booking.patient._id.toString() !== req.user.id && 
        booking.doctor._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if room already exists
    let videoRoom = await VideoRoom.findOne({ booking: bookingId });

    if (!videoRoom) {
      // अगर nanoid load नहीं हुआ तो fallback
      const generateId = nanoid || (() => Date.now().toString(36) + Math.random().toString(36).substr(2));
      const roomId = `medconnect_${generateId(10)}`;
      
      videoRoom = await VideoRoom.create({
        roomId,
        booking: bookingId,
        doctor: booking.doctor._id,
        patient: booking.patient._id,
        status: 'scheduled'
      });
    }

    res.status(200).json({
      success: true,
      roomId: videoRoom.roomId,
      doctorName: booking.doctor.fullName,
      patientName: booking.patient.fullName
    });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Start video call
// @route   POST /api/video/start-call/:roomId
// @access  Private
router.post('/start-call/:roomId', protect, async (req, res) => {
  try {
    const { roomId } = req.params;

    const videoRoom = await VideoRoom.findOne({ roomId });

    if (!videoRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check authorization
    if (videoRoom.patient.toString() !== req.user.id && 
        videoRoom.doctor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    videoRoom.status = 'active';
    videoRoom.startTime = new Date();
    await videoRoom.save();

    res.status(200).json({
      success: true,
      message: 'Call started',
      videoRoom
    });
  } catch (error) {
    console.error('Start call error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    End video call
// @route   POST /api/video/end-call/:roomId
// @access  Private
router.post('/end-call/:roomId', protect, async (req, res) => {
  try {
    const { roomId } = req.params;

    const videoRoom = await VideoRoom.findOne({ roomId });

    if (!videoRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check authorization
    if (videoRoom.patient.toString() !== req.user.id && 
        videoRoom.doctor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    videoRoom.status = 'completed';
    videoRoom.endTime = new Date();
    
    if (videoRoom.startTime) {
      const duration = Math.floor((videoRoom.endTime - videoRoom.startTime) / 60000); // minutes
      videoRoom.duration = duration;
    }

    await videoRoom.save();

    // Update booking status
    await Booking.findByIdAndUpdate(videoRoom.booking, { status: 'completed' });

    res.status(200).json({
      success: true,
      message: 'Call ended',
      duration: videoRoom.duration
    });
  } catch (error) {
    console.error('End call error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get room details
// @route   GET /api/video/room/:roomId
// @access  Private
router.get('/room/:roomId', protect, async (req, res) => {
  try {
    const { roomId } = req.params;

    const videoRoom = await VideoRoom.findOne({ roomId })
      .populate('doctor', 'fullName specialization')
      .populate('patient', 'fullName')
      .populate('booking');

    if (!videoRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check authorization
    if (videoRoom.patient._id.toString() !== req.user.id && 
        videoRoom.doctor._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      videoRoom
    });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;