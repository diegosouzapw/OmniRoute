/**
 * Badge Definitions for OmniRoute Gamification
 *
 * Defines 20+ built-in badges across 5 categories. Event-specific unlock
 * logic lives in events.ts.
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
