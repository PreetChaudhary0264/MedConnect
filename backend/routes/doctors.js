const express = require('express');
const router = express.Router();
const { getDoctors } = require('../controllers/userController');

// @route   GET /api/doctors
// @desc    Get all doctors
// @access  Public
router.get('/', getDoctors);

module.exports = router;
