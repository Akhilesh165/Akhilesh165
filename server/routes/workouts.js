const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Workout = require('../models/Workout');

// GET all workouts for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST a new workout log
router.post('/', auth, async (req, res) => {
  try {
    const { exercise, sets, reps, cal, date } = req.body;

    const newWorkout = new Workout({
      user: req.user.id,
      exercise,
      sets,
      reps,
      cal,
      date
    });

    const workout = await newWorkout.save();
    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
