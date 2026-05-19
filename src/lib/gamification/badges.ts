/**
 * Badge Definitions & Evaluation Engine for OmniRoute Gamification
 *
 * Defines 20+ built-in badges across 5 categories and evaluates unlock
 * criteria against user activity. All DB access goes through dynamic imports
 * to avoid circular dependencies.
 *
 * @module lib/gamification/badges
 */

import type { BadgeDefinition } from "../db/gamification";

// ─── Built-in Badge Definitions ──────────────────────────────────────────────

/**
 * All built-in badges shipped with OmniRoute.
 * Spread with `{ created_at: new Date().toISOString() }` when inserting.
 */
export const BUILTIN_BADGES: Omit<BadgeDefinition, "createdAt">[] = [
  // ── Token Usage (Milestone) ──────────────────────────────────────────────
  {
    id: "first-token",
    name: "First Token",
    description: "Made your first API request",
    icon: "sparkles",
    category: "usage",
    rarity: "common",
    criteria: JSON.stringify({ type: "action_count", action: "request", threshold: 1 }),
    hidden: 0,
  },
  {
    id: "token-consumer",
    name: "Token Consumer",
    description: "Made 1,000 API requests",
    icon: "zap",
    category: "usage",
    rarity: "uncommon",
    criteria: JSON.stringify({ type: "action_count", action: "request", threshold: 1000 }),
    hidden: 0,
  },
  {
    id: "token-machine",
    name: "Token Machine",
    description: "Made 10,000 API requests",
    icon: "cpu",
    category: "usage",
    rarity: "rare",
    criteria: JSON.stringify({ type: "action_count", action: "request", threshold: 10000 }),
    hidden: 0,
  },
  {
    id: "token-whale",
    name: "Token Whale",
    description: "Made 100,000 API requests",
    icon: "whale",
    category: "usage",
    rarity: "legendary",
    criteria: JSON.stringify({ type: "action_count", action: "request", threshold: 100000 }),
    hidden: 0,
  },

  // ── Token Sharing (Social) ───────────────────────────────────────────────
  {
    id: "generous",
    name: "Generous",
    description: "Shared 1,000 tokens with others",
    icon: "gift",
    category: "sharing",
    rarity: "common",
    criteria: JSON.stringify({ type: "action_count", action: "token_share", threshold: 1000 }),
    hidden: 0,
  },
  {
    id: "philanthropist",
    name: "Philanthropist",
    description: "Shared 10,000 tokens with others",
    icon: "heart",
    category: "sharing",
    rarity: "uncommon",
    criteria: JSON.stringify({ type: "action_count", action: "token_share", threshold: 10000 }),
    hidden: 0,
  },
  {
    id: "token-santa",
    name: "Token Santa",
    description: "Shared 100,000 tokens with others",
    icon: "santa",
    category: "sharing",
    rarity: "rare",
    criteria: JSON.stringify({ type: "action_count", action: "token_share", threshold: 100000 }),
    hidden: 0,
  },
  {
    id: "community-hero",
    name: "Community Hero",
    description: "Shared 1,000,000 tokens with others",
    icon: "trophy",
    category: "sharing",
    rarity: "legendary",
    criteria: JSON.stringify({
      type: "action_count",
      action: "token_share",
      threshold: 1000000,
    }),
    hidden: 0,
  },

  // ── Contribution (Achievement) ───────────────────────────────────────────
  {
    id: "explorer",
    name: "Explorer",
    description: "Used 5 different providers",
    icon: "compass",
    category: "contribution",
    rarity: "uncommon",
    criteria: JSON.stringify({ type: "unique_count", action: "provider", threshold: 5 }),
    hidden: 0,
  },
  {
    id: "polyglot",
    name: "Polyglot",
    description: "Used 10 different models",
    icon: "languages",
    category: "contribution",
    rarity: "rare",
    criteria: JSON.stringify({ type: "unique_count", action: "model", threshold: 10 }),
    hidden: 0,
  },
  {
    id: "architect",
    name: "Architect",
    description: "Created 3 combo routes",
    icon: "blocks",
    category: "contribution",
    rarity: "uncommon",
    criteria: JSON.stringify({ type: "action_count", action: "combo_create", threshold: 3 }),
    hidden: 0,
  },
  {
    id: "speedster",
    name: "Speedster",
    description: "Maintained <500ms avg latency for 100 requests",
    icon: "gauge",
    category: "contribution",
    rarity: "rare",
    criteria: JSON.stringify({
      type: "threshold",
      metric: "avg_latency",
      threshold: 500,
      window: 100,
    }),
    hidden: 0,
  },
  {
    id: "resilient",
    name: "Resilient",
    description: "100% uptime for 7 days",
    icon: "shield",
    category: "contribution",
    rarity: "rare",
    criteria: JSON.stringify({ type: "threshold", metric: "uptime", threshold: 100, window: 7 }),
    hidden: 0,
  },

  // ── Streak (Engagement) ──────────────────────────────────────────────────
  {
    id: "daily-user",
    name: "Daily User",
    description: "Active for 3 consecutive days",
    icon: "flame",
    category: "streak",
    rarity: "common",
    criteria: JSON.stringify({ type: "streak", threshold: 3 }),
    hidden: 0,
  },
  {
    id: "weekly-warrior",
    name: "Weekly Warrior",
    description: "Active for 7 consecutive days",
    icon: "sword",
    category: "streak",
    rarity: "uncommon",
    criteria: JSON.stringify({ type: "streak", threshold: 7 }),
    hidden: 0,
  },
  {
    id: "monthly-master",
    name: "Monthly Master",
    description: "Active for 30 consecutive days",
    icon: "crown",
    category: "streak",
    rarity: "rare",
    criteria: JSON.stringify({ type: "streak", threshold: 30 }),
    hidden: 0,
  },
  {
    id: "unstoppable",
    name: "Unstoppable",
    description: "Active for 365 consecutive days",
    icon: "infinity",
    category: "streak",
    rarity: "legendary",
    criteria: JSON.stringify({ type: "streak", threshold: 365 }),
    hidden: 0,
  },

  // ── Rare / Legendary ─────────────────────────────────────────────────────
  {
    id: "early-adopter",
    name: "Early Adopter",
    description: "Joined within the first month of gamification",
    icon: "rocket",
    category: "rare",
    rarity: "legendary",
    criteria: JSON.stringify({ type: "first", window_days: 30 }),
    hidden: 0,
  },
  {
    id: "bug-hunter",
    name: "Bug Hunter",
    description: "Reported 5 issues",
    icon: "bug",
    category: "rare",
    rarity: "rare",
    criteria: JSON.stringify({ type: "action_count", action: "issue_report", threshold: 5 }),
    hidden: 0,
  },
  {
    id: "contributor",
    name: "Contributor",
    description: "Merged 1 pull request",
    icon: "git-merge",
    category: "rare",
    rarity: "rare",
    criteria: JSON.stringify({ type: "action_count", action: "pr_merge", threshold: 1 }),
    hidden: 0,
  },
  {
    id: "community-leader",
    name: "Community Leader",
    description: "Reached top 10 on any leaderboard",
    icon: "medal",
    category: "rare",
    rarity: "rare",
    criteria: JSON.stringify({ type: "rank", threshold: 10 }),
    hidden: 0,
  },
  {
    id: "secret-badge",
    name: "???",
    description: "A hidden achievement awaits...",
    icon: "question",
    category: "rare",
    rarity: "legendary",
    criteria: JSON.stringify({ type: "hidden" }),
    hidden: 1,
  },
];

// ─── Criteria Types ──────────────────────────────────────────────────────────

interface ActionCountCriteria {
  type: "action_count";
  action: string;
  threshold: number;
}

interface StreakCriteria {
  type: "streak";
  threshold: number;
}

interface UniqueCountCriteria {
  type: "unique_count";
  action: string;
  threshold: number;
}

interface ThresholdCriteria {
  type: "threshold";
  metric: string;
  threshold: number;
  window?: number;
}

interface RankCriteria {
  type: "rank";
  threshold: number;
}

interface FirstCriteria {
  type: "first";
  window_days: number;
}

interface HiddenCriteria {
  type: "hidden";
}

type BadgeCriteria =
  | ActionCountCriteria
  | StreakCriteria
  | UniqueCountCriteria
  | ThresholdCriteria
  | RankCriteria
  | FirstCriteria
  | HiddenCriteria;

// ─── Helper: Action Count ────────────────────────────────────────────────────

/**
 * Get the total count of a specific action for an API key from the XP audit log.
 */
async function getActionCount(apiKeyId: string, action: string): Promise<number> {
  const { getDbInstance } = await import("../db/core");
  const db = getDbInstance();

  const row = db
    .prepare(
      `SELECT COALESCE(SUM(
        CASE WHEN metadata IS NOT NULL
          THEN CAST(json_extract(metadata, '$.amount') AS INTEGER)
          ELSE 1
        END
      ), 0) AS total
      FROM xp_audit_log
      WHERE api_key_id = ? AND action = ?`
    )
    .get(apiKeyId, action) as { total: number } | undefined;

  return row?.total ?? 0;
}

// ─── Helper: Unique Count ────────────────────────────────────────────────────

/**
 * Get the count of unique values for a given type (provider, model, etc.)
 * from the XP audit log metadata.
 */
async function getUniqueCount(apiKeyId: string, type: string): Promise<number> {
  const { getDbInstance } = await import("../db/core");
  const db = getDbInstance();

  const row = db
    .prepare(
      `SELECT COUNT(DISTINCT json_extract(metadata, '$.' || ?)) AS total
      FROM xp_audit_log
      WHERE api_key_id = ? AND metadata IS NOT NULL`
    )
    .get(type, apiKeyId) as { total: number } | undefined;

  return row?.total ?? 0;
}

// ─── Helper: Streak ──────────────────────────────────────────────────────────

/**
 * Get the current streak count for an API key.
 * Delegates to the streaks module to avoid duplication.
 */
async function getStreak(apiKeyId: string): Promise<number> {
  const { getStreak: fetchStreak } = await import("./streaks");
  const data = await fetchStreak(apiKeyId);
  return data.currentStreak;
}

// ─── Helper: Leaderboard Rank ────────────────────────────────────────────────

/**
 * Get the rank of an API key on the global leaderboard.
 * Rank = number of users with a higher score + 1.
 */
async function getRank(apiKeyId: string, scope: string): Promise<number> {
  const { getDbInstance } = await import("../db/core");
  const db = getDbInstance();

  const scoreRow = db
    .prepare("SELECT score FROM leaderboard WHERE api_key_id = ? AND scope = ?")
    .get(apiKeyId, scope) as { score: number } | undefined;

  if (!scoreRow) return Infinity;

  const rankRow = db
    .prepare("SELECT COUNT(*) AS rank FROM leaderboard WHERE scope = ? AND score > ?")
    .get(scope, scoreRow.score) as { rank: number } | undefined;

  return (rankRow?.rank ?? 0) + 1;
}

// ─── Badge Evaluation Engine ─────────────────────────────────────────────────

/**
 * Evaluate if an action triggers any badge unlocks.
 *
 * Iterates over all badge definitions, skips already-earned badges,
 * and checks each unearned badge's criteria against current user state.
 * Returns the list of newly unlocked badge IDs.
 *
 * @param apiKeyId - The API key to evaluate
 * @param action - The action that was just performed (e.g. "request", "token_share")
 * @param metadata - Optional context (provider, model, amount, etc.)
 * @returns Array of newly unlocked badge IDs
 */
export async function evaluateBadges(
  apiKeyId: string,
  action: string,
  metadata?: Record<string, unknown>
): Promise<string[]> {
  // Import DB functions dynamically to avoid circular deps
  const { getBadgeDefinitions, unlockBadge, getBadges } = await import("../db/gamification");

  const definitions = getBadgeDefinitions();
  const earned = getBadges(apiKeyId);
  const earnedIds = new Set(earned.map((b) => b.badgeId));
  const newlyUnlocked: string[] = [];

  for (const def of definitions) {
    if (earnedIds.has(def.id)) continue; // Already earned

    if (!def.criteria) continue;

    let criteria: BadgeCriteria;
    try {
      criteria = JSON.parse(def.criteria) as BadgeCriteria;
    } catch {
      continue; // Malformed criteria, skip
    }

    let unlocked = false;

    switch (criteria.type) {
      case "action_count": {
        if (criteria.action === action) {
          const count = await getActionCount(apiKeyId, action);
          unlocked = count >= criteria.threshold;
        }
        break;
      }

      case "streak": {
        const streak = await getStreak(apiKeyId);
        unlocked = streak >= criteria.threshold;
        break;
      }

      case "unique_count": {
        if (criteria.action === action || action === "request") {
          // Check on any qualifying action, not just exact match
          const uniqueCount = await getUniqueCount(apiKeyId, criteria.action);
          unlocked = uniqueCount >= criteria.threshold;
        }
        break;
      }

      case "threshold": {
        // Threshold badges are evaluated externally (e.g. latency, uptime)
        // and triggered via metadata
        if (metadata && typeof metadata[criteria.metric] === "number") {
          const value = metadata[criteria.metric] as number;
          if (criteria.metric === "avg_latency") {
            unlocked = value < criteria.threshold;
          } else {
            unlocked = value >= criteria.threshold;
          }
        }
        break;
      }

      case "rank": {
        const rank = await getRank(apiKeyId, "global");
        unlocked = rank <= criteria.threshold;
        break;
      }

      case "first": {
        // Time-limited badge: check if user joined within window
        const { getDbInstance } = await import("../db/core");
        const db = getDbInstance();

        const firstLog = db
          .prepare(`SELECT MIN(created_at) AS first_at FROM xp_audit_log WHERE api_key_id = ?`)
          .get(apiKeyId) as { first_at: string | null } | undefined;

        if (firstLog?.first_at) {
          const joinDate = new Date(firstLog.first_at);
          const windowEnd = new Date(joinDate);
          windowEnd.setDate(windowEnd.getDate() + (criteria as FirstCriteria).window_days);
          unlocked = new Date() <= windowEnd;
        }
        break;
      }

      case "hidden": {
        // Secret badge: unlocked by having earned all other badges
        const allOtherDefs = definitions.filter(
          (d) => d.id !== def.id && !JSON.parse(d.criteria).type?.toString().includes("hidden")
        );
        const allOtherEarned = allOtherDefs.every((d) => earnedIds.has(d.id));
        unlocked = allOtherEarned;
        break;
      }
    }

    if (unlocked) {
      unlockBadge(apiKeyId, def.id);
      newlyUnlocked.push(def.id);
    }
  }

  return newlyUnlocked;
}

/**
 * Seed built-in badge definitions into the database.
 * Idempotent — uses INSERT OR IGNORE so existing badges are not overwritten.
 */
export async function seedBuiltinBadges(): Promise<void> {
  const { getDbInstance } = await import("../db/core");
  const db = getDbInstance();

  const insert = db.prepare(
    `INSERT OR IGNORE INTO badge_definitions (id, name, description, icon, category, rarity, criteria, hidden)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );

  const insertMany = db.transaction((badges: typeof BUILTIN_BADGES) => {
    for (const badge of badges) {
      insert.run(
        badge.id,
        badge.name,
        badge.description,
        badge.icon,
        badge.category,
        badge.rarity,
        badge.criteria,
        badge.hidden
      );
    }
  });

  insertMany(BUILTIN_BADGES);
}
