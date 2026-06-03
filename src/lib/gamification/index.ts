/**
 * Gamification module — barrel export.
 *
 * @module lib/gamification
 */

export { emitGamificationEvent } from "./events";
export {
  updateScore,
  getRank,
  getTopN,
  getNeighbors,
  rotateScope,
  type LeaderboardScope,
  type LeaderboardEntry,
} from "./leaderboard";
export { validateScoreChange, getAnomalies } from "./antiCheat";
export { BUILTIN_BADGES } from "./badges";
export {
  xpForLevel,
  cumulativeXpForLevel,
  calculateLevel,
  xpToNextLevel,
  getLevelTitle,
  getLevelTier,
  XP_REWARDS,
  type XpAction,
} from "./xp";
export { updateStreak } from "./streaks";
export {
  recordBadgeUnlock,
  consumeBadgeUnlocks,
  createBadgeNotificationStream,
} from "./notifications";
export { transferTokens, getBalance, getHistory } from "./sharing";
export { createInvite, redeemInvite as redeemInviteCode } from "./invites";
export { connectServer, disconnectServer, listServers } from "./servers";
