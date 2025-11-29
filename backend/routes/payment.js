const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { protect } = require('../middleware/auth');
const Booking = require('../models/Booking');
const User = require('../models/User');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { amount, doctorId, date, time, consultationType, symptoms } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Verify payment and create booking
router.post('/verify-payment', protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      doctorId,
      date,
      time,
      consultationType,
      symptoms,
    } = req.body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Payment verified, create booking
    const doctor = await User.findOne({ _id: doctorId, role: 'doctor' });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const hospitalId = doctor.hospitalId || null;

    const booking = await Booking.create({
      patient: req.user.id,
      doctor: doctorId,
      hospital: hospitalId,
      date,
      time,
      consultationType: consultationType || 'video',
      symptoms: symptoms || '',
      status: 'confirmed',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });

    // Add to patient's consultations
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        consultations: {
          doctor: doctor.fullName,
          specialization: doctor.specialization || 'General Physician',
          date: `${date} ${time}`,
          status: 'Confirmed',
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Payment verified and booking confirmed',
      booking,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: 'Payment verification failed' });
  }
});

module.exports = router;
