const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Config
const db = process.env.MONGODB_URI?.trim();
const jwtSecret = process.env.JWT_SECRET?.trim() || 'fallback_secret';

// Connect to MongoDB
let dbConnected = false;
if (db && db !== 'your_mongodb_atlas_connection_string_here' && db !== 'replace_with_a_secure_secret') {
  mongoose.connect(db, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
      dbConnected = true;
      console.log('MongoDB connected successfully.');
    })
    .catch(err => {
      dbConnected = false;
      console.log('MongoDB connection error:', err.message || err);
    });
  mongoose.connection.on('connected', () => { dbConnected = true; });
  mongoose.connection.on('disconnected', () => { dbConnected = false; console.warn('MongoDB disconnected'); });
  mongoose.connection.on('error', (err) => { dbConnected = false; console.error('MongoDB error:', err.message || err); });
} else {
  console.warn('WARNING: Missing or invalid MongoDB connection string.');
  console.warn('Create a .env file from .env.example and set MONGODB_URI before using the API routes.');
}

// Routes
// If DB not connected, return 503 for API routes to fail fast in production
app.use('/api', (req, res, next) => {
  if (!dbConnected) return res.status(503).json({ message: 'Service unavailable: database not connected' });
  next();
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/workouts', require('./routes/workouts'));

// Serve static frontend in production or when `dist` exists
const distPath = path.join(__dirname, '..', 'dist');
const fs = require('fs');
if (process.env.NODE_ENV === 'production' || fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
