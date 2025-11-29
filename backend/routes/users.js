const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getDoctors,
  createBooking,
  getMyBookings,
  uploadDocument
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/doctors', getDoctors);
router.post('/bookings', protect, createBooking);
router.get('/bookings', protect, getMyBookings);
router.post('/documents/upload', protect, upload.single('file'), uploadDocument);

module.exports = router;