// routes/donations.js - New routes for donations
const express = require('express');
const multer = require('multer');
const path = require('path');
const MedicineDonation = require('../models/MedicineDonation');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Create 'uploads' folder in root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// @desc    Create new donation
// @route   POST /api/donations
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { medicineName, units, quantity, expiryDate, address, demand } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate expiry date (at least 3 months from now)
    const today = new Date();
    const threeMonthsFromNow = new Date(today);
    threeMonthsFromNow.setMonth(today.getMonth() + 3);
    const expiry = new Date(expiryDate);
    if (expiry <= threeMonthsFromNow) {
      return res.status(400).json({ message: 'Medicine must have at least 3 months validity from today' });
    }

    const donation = await MedicineDonation.create({
      user: req.user.id,
      medicineName,
      units,
      quantity,
      expiryDate: expiry,
      address,
      demand,
      imageUrl
    });

    // Populate user info
    await donation.populate('user', 'fullName email phone');

    res.status(201).json({
      success: true,
      donation
    });
  } catch (error) {
    console.error('Donation creation error:', error);
    res.status(500).json({ message: 'Server error during donation submission' });
  }
});

// @desc    Get all donations (for search page)
// @route   GET /api/donations
// @access  Public
router.get('/', async (req, res) => {
  try {
    const donations = await MedicineDonation.find({ status: { $ne: 'delivered' } }) // Show only non-delivered
      .populate('user', 'fullName email phone')
      .sort({ createdAt: -1 })
      .limit(50); // Limit for performance

    res.status(200).json({
      success: true,
      count: donations.length,
      donations
    });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ message: 'Server error while fetching donations' });
  }
});

module.exports = router;