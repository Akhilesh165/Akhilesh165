const { randomUUID } = require('crypto');

const usersByUsername = new Map();
const usersById = new Map();
const workoutsByUser = new Map();

function findUserByUsername(username) {
  const userId = usersByUsername.get(username.toLowerCase());
  return userId ? usersById.get(userId) : null;
}

function createUser({ username, passwordHash }) {
  const user = {
    id: randomUUID(),
    username,
    password: passwordHash,
  };

  usersByUsername.set(username.toLowerCase(), user.id);
  usersById.set(user.id, user);
  workoutsByUser.set(user.id, []);
  return user;
}

function listWorkouts(userId) {
  return (workoutsByUser.get(userId) || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));
}

function createWorkout(userId, workoutData) {
  const existing = workoutsByUser.get(userId) || [];
  const workout = { id: randomUUID(), ...workoutData, user: userId };
  existing.unshift(workout);
  workoutsByUser.set(userId, existing);
  return workout;
}

module.exports = {
  createUser,
  findUserByUsername,
  listWorkouts,
  createWorkout,
};
