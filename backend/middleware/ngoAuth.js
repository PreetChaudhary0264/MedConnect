const jwt = require('jsonwebtoken');
const NGO = require('../models/NGO');

const ngoAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const ngo = await NGO.findById(decoded.id).select('-password');
    
    if (!ngo) {
      return res.status(401).json({ message: 'NGO not found' });
    }

    req.ngo = ngo;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { ngoAuth };
