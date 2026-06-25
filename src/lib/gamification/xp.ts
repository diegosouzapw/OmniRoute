/**
 * XP/Level Engine for OmniRoute Gamification
 *
 * Pure functions for XP calculations, level progression, and reward definitions.
 * No side effects or DB calls — all stateful logic lives in the persistence layer.
 */

// ─── XP Curve ────────────────────────────────────────────────────────────────

/**
 * XP required for a specific level (delta, not cumulative).
 * Polynomial curve: `xp_for_level(n) = floor(100 * n^1.5)`
 *
 * @param level - Target level (must be >= 1)
 * @returns XP needed to gain this level (0 for level 1)
 *
 * @example
 * xpForLevel(1)  // 0
 * xpForLevel(10) // 3162
 * xpForLevel(50) // 35355
 */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(100 * Math.pow(level, 1.5));
}

/**
 * Cumulative XP required to reach a given level (sum of all prior level deltas).
 *
 * @param level - Target level (must be >= 1)
 * @returns Total XP accumulated by that level
 *
 * @example
 * cumulativeXpForLevel(1)  // 0
 * cumulativeXpForLevel(10) // sum of xpForLevel(2..10)
 */
export function cumulativeXpForLevel(level: number): number {
  if (level <= 1) return 0;
  let total = 0;
  for (let i = 2; i <= level; i++) {
    total += xpForLevel(i);
  }
  return total;
}

/**
 * Calculate level from total XP using the inverse of the cumulative XP curve.
 *
 * The cumulative XP for level L approximates to `100 * L^2.5 / 2.5`.
 * Solving for L gives `L ≈ (totalXp * 2.5 / 100) ^ 0.4`.
 *
 * @param totalXp - Total accumulated XP
 * @returns Current level (minimum 1)
 *
 * @example
 * calculateLevel(0)      // 1
 * calculateLevel(5000)   // ~8
 * calculateLevel(100000) // ~100
 */
export function calculateLevel(totalXp: number): number {
  if (totalXp <= 0) return 1;
  return Math.max(1, Math.floor(Math.pow((totalXp * 2.5) / 100, 0.4)));
}

/**
 * Get XP needed to reach the next level from the current total XP.
 *
 * @param totalXp - Current total XP
 * @returns Remaining XP until next level-up
 *
 * @example
 * xpToNextLevel(0)    // XP needed to reach level 2
 * xpToNextLevel(5000) // XP needed from 5000 to next level
 */
export function xpToNextLevel(totalXp: number): number {
  const currentLevel = calculateLevel(totalXp);
  const nextLevelXp = cumulativeXpForLevel(currentLevel + 1);
  return nextLevelXp - totalXp;
}

// ─── Level Titles & Tiers ────────────────────────────────────────────────────

/**
 * Get a human-readable title for a given level.
 *
 * @param level - Current level
 * @returns Level title string
 *
 * @example
 * getLevelTitle(5)   // "Beginner"
 * getLevelTitle(15)  // "Explorer"
 * getLevelTitle(30)  // "Expert"
 * getLevelTitle(60)  // "Master"
 * getLevelTitle(80)  // "Legend"
 */
export function getLevelTitle(level: number): string {
  if (level >= 76) return "Legend";
  if (level >= 51) return "Master";
  if (level >= 26) return "Expert";
  if (level >= 11) return "Explorer";
  return "Beginner";
}

/**
 * Get the badge tier for a given level.
 *
 * @param level - Current level
 * @returns Tier identifier suitable for badge display
 *
 * @example
 * getLevelTier(5)   // "bronze"
 * getLevelTier(20)  // "silver"
 * getLevelTier(40)  // "gold"
 * getLevelTier(60)  // "platinum"
 * getLevelTier(90)  // "diamond"
 */
export function getLevelTier(level: number): "bronze" | "silver" | "gold" | "platinum" | "diamond" {
  if (level >= 76) return "diamond";
  if (level >= 51) return "platinum";
  if (level >= 26) return "gold";
  if (level >= 11) return "silver";
  return "bronze";
}

// ─── XP Rewards ──────────────────────────────────────────────────────────────

/** Base XP rewards for each gamified action. */
export const XP_REWARDS = {
  /** Per API request routed through OmniRoute */
  request: 1,
  /** Switching to a different provider */
  provider_switch: 5,
  /** Switching to a different model */
  model_switch: 3,
  /** Creating a new combo */
  combo_create: 10,
  /** Using a combo for a request */
  combo_use: 2,
  /** Per 1 000 tokens shared with another user */
  token_share: 1,
  /** Redeeming an invite code */
  invite_redeem: 50,
  /** Daily active usage (once per day) */
  daily_login: 5,
  /** Per consecutive streak day (multiplied by streak length) */
  streak_bonus: 2,
  /** Unlocking a badge */
  badge_unlock: 10,
} as const;

/** Union type of all XP action keys. */
type XpAction = keyof typeof XP_REWARDS;
