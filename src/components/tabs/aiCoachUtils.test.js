import test from 'node:test';
import assert from 'node:assert/strict';
import { buildFallbackWorkoutPlan } from './aiCoachUtils.js';

test('buildFallbackWorkoutPlan returns a structured plan', () => {
  const plan = buildFallbackWorkoutPlan({
    goal: 'Build muscle',
    daysPerWeek: '4',
    duration: '45',
    equipment: 'Dumbbells only',
    level: 'Intermediate',
    focus: 'Upper body',
    injuries: 'Lower back pain',
    user: { age: 28, weight: 75 },
  });

  assert.equal(plan.planName, 'Strength Builder - Upper body');
  assert.equal(plan.weeklySchedule.length, 4);
  assert.ok(plan.summary.includes('Upper body'));
  assert.ok(plan.tips.length >= 3);
  assert.equal(plan.weeklySchedule[0].exercises.length, 3);
});
