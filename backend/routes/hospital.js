const express = require('express');
const router = express.Router();
const { registerHospital, loginHospital, addDoctor, getDoctors, updateDoctor, deleteDoctor, getHospitalBookings, updateBookingStatus, getHospitalCamps, getPatientDetails } = require('../controllers/hospitalController');
const { hospitalAuth } = require('../middleware/hospitalAuth');

router.post('/register', registerHospital);
router.post('/login', loginHospital);
router.post('/doctors', hospitalAuth, addDoctor);
router.get('/doctors', hospitalAuth, getDoctors);
router.put('/doctors/:id', hospitalAuth, updateDoctor);
router.delete('/doctors/:id', hospitalAuth, deleteDoctor);
router.get('/bookings', hospitalAuth, getHospitalBookings);
router.put('/bookings/:id/status', hospitalAuth, updateBookingStatus);
router.get('/camps', hospitalAuth, getHospitalCamps);
router.get('/patients/:patientId', hospitalAuth, getPatientDetails);

module.exports = router;
