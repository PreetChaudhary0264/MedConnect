// routes/auth.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const { validate, signupSchema, loginSchema } = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', validate(signupSchema), register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validate(loginSchema), login);

module.exports = router;