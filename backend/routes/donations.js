const express = require('express');
const MedicineDonation = require('../models/MedicineDonation');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// @desc    Create new donation
// @route   POST /api/donations
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { medicineName, units, quantity, expiryDate, address, demand } = req.body;
    const imageUrl = req.file ? req.file.path : null;

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
    const donations = await MedicineDonation.find({ status: { $ne: 'delivered' } })
      .populate('user', 'fullName email phone')
      .populate('assignedVolunteer', 'name phone')
      .populate('assignedNGO', 'name')
      .sort({ createdAt: -1 })
      .limit(50);

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

// @desc    Get user's donations
// @route   GET /api/donations/my-donations
// @access  Private
router.get('/my-donations', protect, async (req, res) => {
  try {
    console.log('Fetching donations for user:', req.user.id);
    const donations = await MedicineDonation.find({ user: req.user.id })
      .populate('assignedVolunteer', 'name phone email')
      .populate('assignedNGO', 'name phone')
      .sort({ createdAt: -1 });
    
    console.log('Found donations:', donations.length);
    res.status(200).json({
      success: true,
      donations
    });
  } catch (error) {
    console.error('Get my donations error:', error);
    res.status(500).json({ message: 'Server error while fetching your donations' });
  }
});

module.exports = router;