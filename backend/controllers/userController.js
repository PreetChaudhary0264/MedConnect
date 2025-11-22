// controllers/userController.js - Full controller with getProfile, updateProfile, and new uploadDocument
const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate age from dateOfBirth
    //check
    let age = null;
    if (user.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(user.dateOfBirth);
      age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      age = `${age} years`;
    }

    res.status(200).json({
      success: true,
      profile: {
        ...user._doc,
        age
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Recalculate age
    let age = null;
    if (user.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(user.dateOfBirth);
      age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      age = `${age} years`;
    }

    res.status(200).json({
      success: true,
      profile: {
        ...user._doc,
        age
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    // If it's a validation error, handle specifically
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

const uploadDocument = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, date, type } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!name || !date || !type) {
      return res.status(400).json({ message: 'Name, date, and type are required' });
    }

    const url = `http://localhost:5000/uploads/${file.filename}`;

    user.documents.push({ name: name.trim(), date: date.trim(), type: type.trim(), url });
    await user.save();

    res.status(201).json({ success: true, url });
  } catch (error) {
    console.error('Upload document error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadDocument
};
