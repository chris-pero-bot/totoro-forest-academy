export const SCORING = {
  CORRECT_FIRST_TRY: 3,
  CORRECT_SECOND_TRY: 1,
  STREAK_5_BONUS: 5,
  STREAK_10_BONUS: 15,
  CLEARING_COMPLETE: 10,
  TRAIL_COMPLETE: 25,
  REALM_COMPLETE: 100,
}

export const POWER_UP_COSTS = {
  meis_hint: 10,
  totoros_roar: 20,
  catbus_skip: 30,
  soot_sprite_rescue: 40,
}

export const INITIAL_LIVES = 5

export function calculateStars(totalTasks, correctFirstTry) {
  if (totalTasks === 0) return 1
  const percentage = correctFirstTry / totalTasks
  if (percentage >= 1.0) return 3
  if (percentage >= 0.8) return 2
  return 1
}

export function calculateStreakBonus(streak) {
  let bonus = 0
  if (streak >= 10) bonus += SCORING.STREAK_10_BONUS
  else if (streak >= 5) bonus += SCORING.STREAK_5_BONUS
  return bonus
}
