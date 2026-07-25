const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

function createApp() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  global.__dbConnected = false;

  // DB Config
  const db = process.env.MONGODB_URI?.trim();

  // Connect to MongoDB when a real connection string is provided
  const hasValidDbConfig = db && db !== 'your_mongodb_atlas_connection_string_here' && db !== 'replace_with_a_secure_secret';
  if (hasValidDbConfig) {
    mongoose.connect(db, { serverSelectionTimeoutMS: 5000 })
      .then(() => {
        global.__dbConnected = true;
        console.log('MongoDB connected successfully.');
      })
      .catch(err => {
        global.__dbConnected = false;
        console.log('MongoDB connection error:', err.message || err);
      });

    mongoose.connection.on('connected', () => {
      global.__dbConnected = true;
    });
    mongoose.connection.on('disconnected', () => {
      global.__dbConnected = false;
      console.warn('MongoDB disconnected');
    });
    mongoose.connection.on('error', (err) => {
      global.__dbConnected = false;
      console.error('MongoDB error:', err.message || err);
    });
  } else {
    console.warn('WARNING: Missing or invalid MongoDB connection string.');
    console.warn('Falling back to in-memory auth/workout storage so the API remains functional.');
  }

  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      database: global.__dbConnected ? 'connected' : 'demo',
      message: global.__dbConnected ? 'Backend ready' : 'Backend ready in demo mode',
    });
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

  return app;
}

if (require.main === module) {
  const app = createApp();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = { createApp }; 
