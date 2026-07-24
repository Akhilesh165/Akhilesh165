const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exercise: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  cal: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);
