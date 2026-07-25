const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function buildFallbackWorkoutPlan({ goal, daysPerWeek, duration, equipment, level, focus, injuries, user }) {
  const count = Math.min(Number(daysPerWeek) || 4, 5);
  const baseFocus = focus || 'Full body';
  const goalLabel = goal || 'Build muscle';
  const levelLabel = level || 'Intermediate';
  const equipmentLabel = equipment || 'Full gym';
  const injuryNote = injuries ? ` with modifications for ${injuries}` : '';

  const planName = goalLabel.includes('Lose')
    ? 'Fat Loss Power Plan'
    : goalLabel.includes('Strength')
      ? 'Strength Builder'
      : goalLabel.includes('Athletic')
        ? 'Athletic Performance Plan'
        : 'Strength Builder';

  const weeklySchedule = Array.from({ length: count }, (_, index) => {
    const dayName = dayNames[index] || `Day ${index + 1}`;
    const dayLabel = `Day ${index + 1} - ${dayName}`;

    const exerciseTemplates = [
      { name: 'Dynamic warm-up circuit', sets: 2, reps: '10 reps', rest: '45s', notes: 'Keep the pace brisk and controlled.' },
      { name: baseFocus.includes('Upper') ? 'Dumbbell shoulder press' : 'Goblet squat', sets: 3, reps: '8-10', rest: '75s', notes: 'Focus on clean tempo and full range.' },
      { name: baseFocus.includes('Lower') ? 'Romanian deadlift' : 'Incline dumbbell press', sets: 3, reps: '8-12', rest: '60s', notes: 'Drive through the floor and brace your core.' },
    ];

    return {
      day: dayLabel,
      focus: `${baseFocus} ${goalLabel.toLowerCase()}`,
      exercises: exerciseTemplates.map(ex => ({ ...ex })),
      warmup: `${Math.max(5, Number(duration) / 10)} min light cardio + dynamic mobility`,
      cooldown: '5 min stretching and breathing',
    };
  });

  return {
    planName: `${planName} - ${baseFocus}`,
    summary: `A ${levelLabel.toLowerCase()}-level ${goalLabel.toLowerCase()} plan focused on ${baseFocus} and built around ${equipmentLabel.toLowerCase()} with ${duration} minutes per session${injuryNote}.`,
    weeklySchedule,
    tips: [
      'Prioritize sleep and hydration for recovery.',
      'Use a steady tempo and stop 1-2 reps before failure.',
      'Increase load gradually once your form feels solid.',
    ],
  };
}

function buildFallbackCoachReply(userMessage, generatedPlan) {
  const normalized = (userMessage || '').toLowerCase();
  if (normalized.includes('harder')) {
    return 'I can make it harder by increasing the load, adding pauses, or reducing rest time between sets.';
  }
  if (normalized.includes('knee') || normalized.includes('pain')) {
    return 'If you have pain, swap the movement for a pain-free variation and keep the range of motion controlled.';
  }
  if (generatedPlan?.planName) {
    return `Your ${generatedPlan.planName} plan is a strong starting point. I’d keep the reps controlled and progress only when your form stays consistent.`;
  }
  return 'I can help you refine your plan by adjusting volume, tempo, or exercise selection based on your goals.';
}

export { buildFallbackWorkoutPlan, buildFallbackCoachReply };
