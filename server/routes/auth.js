const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fallbackStore = require('../utils/fallbackStore');

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    if (!global.__dbConnected) {
      const existingUser = fallbackStore.findUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = fallbackStore.createUser({ username, passwordHash: hashedPassword });
      const token = signToken(newUser.id);

      return res.json({
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
        }
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Sign token
    const token = signToken(savedUser._id);

    res.json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    if (!global.__dbConnected) {
      const user = fallbackStore.findUserByUsername(username);
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = signToken(user.id);
      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
        }
      });
    }

    // Check for existing user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Sign token
    const token = signToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
