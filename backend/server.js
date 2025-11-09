// server.js - Updated to include user routes
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const donationsRoutes = require('./routes/donations');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Helmet (must allow cross origin for images)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS (must come before routes and static)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Serve static files from uploads with CORS
app.use('/uploads', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationsRoutes);
app.use('/api/users', userRoutes);

// Global error handler
app.use(errorHandler);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'MediConnect Backend API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
