const express = require('express');
const router = express.Router();
const { registerNGO, loginNGO, createCamp, getCamps, updateCamp, deleteCamp, addVolunteer, getVolunteers, updateVolunteer, deleteVolunteer, getDonations, assignVolunteer, getHospitals } = require('../controllers/ngoController');
const { ngoAuth } = require('../middleware/ngoAuth');

router.post('/register', registerNGO);
router.post('/login', loginNGO);
router.post('/camps', ngoAuth, createCamp);
router.get('/camps', ngoAuth, getCamps);
router.put('/camps/:id', ngoAuth, updateCamp);
router.delete('/camps/:id', ngoAuth, deleteCamp);
router.post('/volunteers', ngoAuth, addVolunteer);
router.get('/volunteers', ngoAuth, getVolunteers);
router.put('/volunteers/:id', ngoAuth, updateVolunteer);
router.delete('/volunteers/:id', ngoAuth, deleteVolunteer);
router.get('/donations', ngoAuth, getDonations);
router.post('/assign-volunteer', ngoAuth, assignVolunteer);
router.get('/hospitals', ngoAuth, getHospitals);

module.exports = router;
