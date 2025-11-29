const express = require('express');
const router = express.Router();
const Camp = require('../models/Camp');

// @desc    Get all camps for public view
// @route   GET /api/camps
// @access  Public
router.get('/', async (req, res) => {
  try {
    const camps = await Camp.find({ status: { $ne: 'cancelled' } })
      .populate('ngo', 'name phone')
      .populate('hospital', 'name')
      .sort({ date: 1, createdAt: -1 });
    
    res.status(200).json({ success: true, camps });
  } catch (error) {
    console.error('Get camps error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
