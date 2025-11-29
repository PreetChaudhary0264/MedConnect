const jwt = require('jsonwebtoken');
const Hospital = require('../models/Hospital');

const hospitalAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hospital = await Hospital.findById(decoded.id).select('-password');
    
    if (!hospital) {
      return res.status(401).json({ message: 'Hospital not found' });
    }

    req.hospital = hospital;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { hospitalAuth };
