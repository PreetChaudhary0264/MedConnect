const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const NGO = require('../models/NGO');
const Camp = require('../models/Camp');
const Volunteer = require('../models/Volunteer');
const MedicineDonation = require('../models/MedicineDonation');
const Hospital = require('../models/Hospital');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerNGO = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    if (phone && phone.length !== 10) {
      return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
    }

    const existingNGO = await NGO.findOne({ $or: [{ email }, { phone }] });
    if (existingNGO) {
      return res.status(400).json({ message: 'NGO with this email or phone already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const ngo = await NGO.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword
    });

    const token = generateToken(ngo._id);

    res.status(201).json({
      success: true,
      token,
      ngo: {
        id: ngo._id,
        name: ngo.name,
        email: ngo.email,
        phone: ngo.phone,
        address: ngo.address
      }
    });
  } catch (error) {
    console.error('NGO registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.loginNGO = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ngo = await NGO.findOne({ email }).select('+password');
    if (!ngo) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(ngo._id);

    res.status(200).json({
      success: true,
      token,
      ngo: {
        id: ngo._id,
        name: ngo.name,
        email: ngo.email,
        phone: ngo.phone,
        address: ngo.address
      }
    });
  } catch (error) {
    console.error('NGO login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

exports.createCamp = async (req, res) => {
  try {
    const camp = await Camp.create({ ...req.body, ngo: req.ngo._id });
    await camp.populate('hospital', 'name');
    res.status(201).json({ success: true, camp });
  } catch (error) {
    console.error('Create camp error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getCamps = async (req, res) => {
  try {
    const camps = await Camp.find({ ngo: req.ngo._id })
      .populate('hospital', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, camps });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCamp = async (req, res) => {
  try {
    const camp = await Camp.findOneAndUpdate(
      { _id: req.params.id, ngo: req.ngo._id },
      req.body,
      { new: true }
    ).populate('hospital', 'name');
    if (!camp) return res.status(404).json({ message: 'Camp not found' });
    res.status(200).json({ success: true, camp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCamp = async (req, res) => {
  try {
    const camp = await Camp.findOneAndDelete({ _id: req.params.id, ngo: req.ngo._id });
    if (!camp) return res.status(404).json({ message: 'Camp not found' });
    res.status(200).json({ success: true, message: 'Camp deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.create({ ...req.body, ngo: req.ngo._id });
    res.status(201).json({ success: true, volunteer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ ngo: req.ngo._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, volunteers });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findOneAndUpdate(
      { _id: req.params.id, ngo: req.ngo._id },
      req.body,
      { new: true }
    );
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });
    res.status(200).json({ success: true, volunteer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findOneAndDelete({ _id: req.params.id, ngo: req.ngo._id });
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });
    res.status(200).json({ success: true, message: 'Volunteer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const donations = await MedicineDonation.find()
      .populate('user', 'fullName phone')
      .populate('assignedVolunteer', 'name phone')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, donations });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.assignVolunteer = async (req, res) => {
  try {
    const { donationId, volunteerId } = req.body;
    const donation = await MedicineDonation.findByIdAndUpdate(
      donationId,
      { assignedVolunteer: volunteerId, assignedNGO: req.ngo._id, status: 'approved' },
      { new: true }
    ).populate('user', 'fullName phone').populate('assignedVolunteer', 'name phone');
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.status(200).json({ success: true, donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().select('name email phone address');
    res.status(200).json({ success: true, hospitals });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
