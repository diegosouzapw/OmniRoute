/**
 * Characterization — src/lib/gamification (rail 3.8.55, pre-v4 extraction to @omniroute/mod-*).
 *
 * Pins the PUBLIC surface and the observable behaviour (XP curve, levels/tiers, the award
 * pipeline's points + badges for a fixed fixture, streaks, anti-cheat, sharing, invites,
 * servers) as it is today, so the v4 extraction can be proven byte-for-byte. Quirks are pinned,
 * not fixed — their names start with "characterization: … currently …". Surface snapshots are
 * literal lists: update them consciously, never by regeneration.
 *
 * External consumers (the real boundary): open-sse/handlers/chatCore/gamificationEvent.ts and
 * src/lib/radar/intelSync.ts (emitGamificationEvent), open-sse/mcp-server/tools/
 * gamificationTools.ts (leaderboard/xp/streaks/sharing/invites/servers/antiCheat),
 * src/app/api/gamification/** and the dashboard profile page (xp helpers). Note: every
 * consumer imports the individual modules — none imports the index.ts barrel.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-char-gamification-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const gamificationDb = await import("../../src/lib/db/gamification.ts");
const MODULES = {
  index: await import("../../src/lib/gamification/index.ts"),
  antiCheat: await import("../../src/lib/gamification/antiCheat.ts"),
  badges: await import("../../src/lib/gamification/badges.ts"),
  events: await import("../../src/lib/gamification/events.ts"),
  invites: await import("../../src/lib/gamification/invites.ts"),
  leaderboard: await import("../../src/lib/gamification/leaderboard.ts"),
  notifications: await import("../../src/lib/gamification/notifications.ts"),
  servers: await import("../../src/lib/gamification/servers.ts"),
  sharing: await import("../../src/lib/gamification/sharing.ts"),
  streaks: await import("../../src/lib/gamification/streaks.ts"),
  xp: await import("../../src/lib/gamification/xp.ts"),
};
const { antiCheat, badges, events, invites, leaderboard, notifications, servers, sharing } =
  MODULES;
const { streaks, xp } = MODULES;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const todayUtc = () => new Date().toISOString().split("T")[0];
const yesterdayUtc = () => new Date(Date.now() - 86_400_000).toISOString().split("T")[0];

// ─── (a) Surface snapshots ───────────────────────────────────────────────────

test("surface: gamification runtime exports (barrel + every module)", () => {
  const surface = Object.fromEntries(
    Object.entries(MODULES).map(([name, mod]) => [name, Object.keys(mod).sort()])
  );
  assert.deepEqual(surface, {
    index: [
      "BUILTIN_BADGES",
      "XP_REWARDS",
      "calculateLevel",
      "connectServer",
      "consumeBadgeUnlocks",
      "createBadgeNotificationStream",
      "createInvite",
      "cumulativeXpForLevel",
      "disconnectServer",
      "emitGamificationEvent",
      "getAggregateStreak",
      "getAnomalies",
      "getBalance",
      "getHistory",
      "getLevelTier",
      "getLevelTitle",
      "getNeighbors",
      "getRank",
      "getStreak",
      "getTopN",
      "listServers",
      "recordBadgeUnlock",
      "redeemInviteCode",
      "rotateScope",
      "transferTokens",
      "updateScore",
      "updateStreak",
      "validateScoreChange",
      "xpForLevel",
      "xpToNextLevel",
    ],
    antiCheat: ["getAnomalies", "validateScoreChange"],
    badges: ["BUILTIN_BADGES", "evaluateBadges", "seedBuiltinBadges"],
    events: ["emitGamificationEvent"],
    invites: ["createInvite", "listInvites", "redeemInvite", "revokeInvite"],
    leaderboard: ["getNeighbors", "getRank", "getTopN", "rotateScope", "updateScore"],
    notifications: ["consumeBadgeUnlocks", "createBadgeNotificationStream", "recordBadgeUnlock"],
    servers: [
      "connectServer",
      "disconnectServer",
      "healthCheck",
      "listServers",
      "pushScore",
      "syncLeaderboard",
    ],
    sharing: ["getBalance", "getHistory", "transferTokens"],
    streaks: ["advanceStreak", "getAggregateStreak", "getStreak", "updateStreak"],
    xp: [
      "XP_REWARDS",
      "calculateLevel",
      "cumulativeXpForLevel",
      "getLevelTier",
      "getLevelTitle",
      "xpForLevel",
      "xpToNextLevel",
    ],
  });
  // The barrel re-exports the module functions themselves (same references).
  assert.equal(MODULES.index.emitGamificationEvent, events.emitGamificationEvent);
  assert.equal(MODULES.index.redeemInviteCode, invites.redeemInvite);
});

test("surface: XP_REWARDS table", () => {
  assert.deepEqual(xp.XP_REWARDS, {
    request: 1,
    provider_switch: 5,
    model_switch: 3,
    combo_create: 10,
    combo_use: 2,
    token_share: 1,
    invite_redeem: 50,
    daily_login: 5,
    streak_bonus: 2,
    badge_unlock: 10,
  });
});

test("surface: BUILTIN_BADGES catalogue (id, category, rarity, criteria type, hidden)", () => {
  const catalogue = badges.BUILTIN_BADGES.map((b) => [
    b.id,
    b.category,
    b.rarity,
    JSON.parse(b.criteria ?? "null")?.type,
    b.hidden,
  ]);
  assert.deepEqual(catalogue, [
    ["first-token", "usage", "common", "action_count", 0],
    ["token-consumer", "usage", "uncommon", "action_count", 0],
    ["token-machine", "usage", "rare", "action_count", 0],
    ["token-whale", "usage", "legendary", "action_count", 0],
    ["generous", "sharing", "common", "action_count", 0],
    ["philanthropist", "sharing", "uncommon", "action_count", 0],
    ["token-santa", "sharing", "rare", "action_count", 0],
    ["community-hero", "sharing", "legendary", "action_count", 0],
    ["explorer", "contribution", "uncommon", "unique_count", 0],
    ["polyglot", "contribution", "rare", "unique_count", 0],
    ["architect", "contribution", "uncommon", "action_count", 0],
    ["speedster", "contribution", "rare", "threshold", 0],
    ["resilient", "contribution", "rare", "threshold", 0],
    ["radar-supporter", "contribution", "rare", "action_count", 0],
    ["daily-user", "streak", "common", "streak", 0],
    ["weekly-warrior", "streak", "uncommon", "streak", 0],
    ["monthly-master", "streak", "rare", "streak", 0],
    ["unstoppable", "streak", "legendary", "streak", 0],
    ["early-adopter", "rare", "legendary", "first", 0],
    ["bug-hunter", "rare", "rare", "action_count", 0],
    ["contributor", "rare", "rare", "action_count", 0],
    ["community-leader", "rare", "rare", "rank", 0],
    ["secret-badge", "rare", "legendary", "hidden", 1],
  ]);
});

// ─── (b) Contracts — pure XP / level math ────────────────────────────────────

test("xp: curve, cumulative thresholds and level inversion", () => {
  assert.deepEqual(
    [1, 2, 3, 10, 50, 100].map((l) => [l, xp.xpForLevel(l), xp.cumulativeXpForLevel(l)]),
    [
      [1, 0, 0],
      [2, 282, 282],
      [3, 519, 801],
      [10, 3162, 14164],
      [50, 35355, 724749],
      [100, 100000, 4049979],
    ]
  );
  assert.deepEqual(
    [0, 281, 282, 283, 800, 5000, 1_000_000, -5].map((v) => [
      v,
      xp.calculateLevel(v),
      xp.xpToNextLevel(v),
    ]),
    [
      [0, 1, 282],
      [281, 1, 1],
      [282, 2, 519],
      [283, 2, 518],
      [800, 2, 1],
      [5000, 6, 1040],
      [1_000_000, 56, 2661],
      [-5, 1, 287],
    ]
  );
});

test("xp: level titles and tiers at every boundary", () => {
  assert.deepEqual(
    [0, 10, 11, 25, 26, 50, 51, 75, 76, 1000].map((l) => [
      l,
      xp.getLevelTitle(l),
      xp.getLevelTier(l),
    ]),
    [
      [0, "Beginner", "bronze"],
      [10, "Beginner", "bronze"],
      [11, "Explorer", "silver"],
      [25, "Explorer", "silver"],
      [26, "Expert", "gold"],
      [50, "Expert", "gold"],
      [51, "Master", "platinum"],
      [75, "Master", "platinum"],
      [76, "Legend", "diamond"],
      [1000, "Legend", "diamond"],
    ]
  );
});

test("characterization: xp currently maps non-finite totals to level 1 and leaks NaN/-Infinity", () => {
  assert.equal(xp.calculateLevel(Number.NaN), 1);
  assert.equal(xp.calculateLevel(Number.POSITIVE_INFINITY), 1);
  assert.ok(Number.isNaN(xp.xpToNextLevel(Number.NaN)));
  assert.equal(xp.xpToNextLevel(Number.POSITIVE_INFINITY), Number.NEGATIVE_INFINITY);
});

// ─── (b) Contracts — award pipeline (deterministic fixture) ──────────────────

test("emitGamificationEvent(request) on a fresh key: 1 XP + first-token badge (+10)", async () => {
  await events.emitGamificationEvent({ apiKeyId: "fx-fresh", action: "request" });

  const level = gamificationDb.getXp("fx-fresh");
  assert.deepEqual([level?.totalXp, level?.currentLevel], [11, 1]);
  assert.equal(gamificationDb.hasBadge("fx-fresh", "first-token"), true);
  assert.equal(await leaderboard.getRank("fx-fresh", "global"), 1);
  const scores = (await leaderboard.getTopN("global")).map((r) => [r.apiKeyId, r.score]);
  assert.deepEqual(scores, [["fx-fresh", 11]]);
  for (const scope of ["weekly", "monthly"] as const) {
    assert.deepEqual(
      (await leaderboard.getTopN(scope)).map((r) => [r.apiKeyId, r.score]),
      [["fx-fresh", 11]]
    );
  }
  assert.deepEqual(await streaks.getStreak("fx-fresh"), {
    currentStreak: 1,
    longestStreak: 1,
    lastActiveDate: todayUtc(),
    streakStartDate: todayUtc(),
  });

  // Badge toast buffer: definitions are not seeded here, so name falls back to the id.
  const toasts = notifications.consumeBadgeUnlocks("fx-fresh");
  assert.deepEqual(
    toasts.map(({ unlockedAt: _u, ...rest }) => rest),
    [
      {
        badgeId: "first-token",
        badgeName: "first-token",
        badgeDescription: "",
        badgeIcon: "award",
        badgeRarity: "common",
      },
    ]
  );
  assert.deepEqual(notifications.consumeBadgeUnlocks("fx-fresh"), [], "consume drains the buffer");

  // A second request the same UTC day: +1 XP, no new badge, no streak bonus.
  await events.emitGamificationEvent({ apiKeyId: "fx-fresh", action: "request" });
  assert.equal(gamificationDb.getXp("fx-fresh")?.totalXp, 12);
  assert.equal((await streaks.getStreak("fx-fresh")).currentStreak, 1);
});

test("emitGamificationEvent(request) extending a 2-day streak: streak bonus 2×3 + daily-user", async () => {
  const db = core.getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "gamification:streaks",
    "fx-streak",
    JSON.stringify({
      currentStreak: 2,
      longestStreak: 2,
      lastActiveDate: yesterdayUtc(),
      streakStartDate: "2000-01-01",
    })
  );
  await events.emitGamificationEvent({ apiKeyId: "fx-streak", action: "request" });

  // 1 (request) + 6 (streak_bonus 2×3) + 10 (daily-user) + 10 (first-token) = 27.
  assert.equal(gamificationDb.getXp("fx-streak")?.totalXp, 27);
  assert.equal(gamificationDb.hasBadge("fx-streak", "daily-user"), true);
  assert.equal(gamificationDb.hasBadge("fx-streak", "first-token"), true);
  assert.deepEqual(await streaks.getStreak("fx-streak"), {
    currentStreak: 3,
    longestStreak: 3,
    lastActiveDate: todayUtc(),
    streakStartDate: "2000-01-01",
  });
  notifications.consumeBadgeUnlocks("fx-streak");
});

test("emitGamificationEvent(combo_create / radar_supporter): XP-only vs recognition-only", async () => {
  await events.emitGamificationEvent({ apiKeyId: "fx-combo", action: "combo_create" });
  assert.equal(gamificationDb.getXp("fx-combo")?.totalXp, 10);
  assert.equal((await streaks.getStreak("fx-combo")).currentStreak, 0, "only `request` streaks");

  await events.emitGamificationEvent({ apiKeyId: "fx-radar", action: "radar_supporter" });
  assert.equal(gamificationDb.getXp("fx-radar"), null, "recognition earns no XP");
  assert.equal(gamificationDb.hasBadge("fx-radar", "radar-supporter"), true);
  assert.equal(await leaderboard.getRank("fx-radar", "global"), 0, "and no leaderboard row");
  notifications.consumeBadgeUnlocks("fx-radar");
});

test("characterization: evaluateBadges (no production caller) unlocks first/rank badges", async () => {
  await badges.seedBuiltinBadges();
  await badges.seedBuiltinBadges(); // idempotent
  const count = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS n FROM badge_definitions")
    .get() as {
    n: number;
  };
  assert.equal(count.n, 23);
  // fx-fresh already holds first-token; it is inside the 30-day window and ranked.
  assert.deepEqual(await badges.evaluateBadges("fx-fresh", "request"), [
    "early-adopter",
    "community-leader",
  ]);
});

// ─── (c) Errors / invalid input ──────────────────────────────────────────────

test("emitGamificationEvent: empty apiKeyId is a silent no-op", async () => {
  const before = (await leaderboard.getTopN("global")).length;
  await assert.doesNotReject(events.emitGamificationEvent({ apiKeyId: "", action: "request" }));
  assert.equal((await leaderboard.getTopN("global")).length, before);
});

test("characterization: emitGamificationEvent(unknown action) currently writes a 0-score leaderboard row", async () => {
  await events.emitGamificationEvent({
    apiKeyId: "fx-unknown",
    action: "not-an-action" as "request",
  });
  assert.equal(gamificationDb.getXp("fx-unknown"), null);
  const row = (await leaderboard.getTopN("global")).find((r) => r.apiKeyId === "fx-unknown");
  assert.equal(row?.score, 0);
});

test("validateScoreChange: >1000 XP/min is rejected with a reason; small awards allowed", async () => {
  assert.deepEqual(await antiCheat.validateScoreChange("fx-ac", "request", 1001), {
    allowed: false,
    reason: "Rate limit exceeded: 1001 > 1000 XP/min",
  });
  assert.deepEqual(await antiCheat.validateScoreChange("fx-ac", "request", 1), { allowed: true });
  assert.ok(Array.isArray(await antiCheat.getAnomalies()));
});

test("transferTokens: validation errors and insufficient balance", async () => {
  assert.deepEqual(await sharing.transferTokens("a", "a", 5), {
    success: false,
    idempotencyKey: "",
    error: "Cannot transfer to yourself",
  });
  assert.deepEqual(await sharing.transferTokens("a", "b", 0), {
    success: false,
    idempotencyKey: "",
    error: "Amount must be positive",
  });
  const broke = await sharing.transferTokens("a", "b", 5, undefined, "idem-1");
  assert.deepEqual(broke, {
    success: false,
    idempotencyKey: "idem-1",
    error: "insufficient_balance",
  });
  assert.equal(await sharing.getBalance("a"), 0);
  assert.deepEqual(await sharing.getHistory("a"), []);
});

test("characterization: transferTokens(NaN) currently passes validation and surfaces the raw SQLite error", async () => {
  const result = await sharing.transferTokens("a", "b", Number.NaN, undefined, "idem-nan");
  assert.deepEqual(result, {
    success: false,
    idempotencyKey: "idem-nan",
    error: "NOT NULL constraint failed: token_ledger.amount",
  });
});

test("invites: create → redeem rules → revoke", async () => {
  const invite = await invites.createInvite("creator", "https://srv.example", 1);
  assert.match(invite.code, /^[A-Za-z0-9]{8}$/);
  assert.match(invite.token, /^[A-Za-z0-9_-]{43}$/);

  assert.deepEqual(await invites.redeemInvite("nope1234", "x"), {
    success: false,
    error: "Invalid invite code",
  });
  assert.deepEqual(await invites.redeemInvite(invite.code, "creator"), {
    success: false,
    error: "Cannot redeem your own invite",
  });
  assert.deepEqual(await invites.redeemInvite(invite.code, "guest"), {
    success: true,
    serverUrl: "https://srv.example",
  });
  assert.deepEqual(await invites.redeemInvite(invite.code, "guest-2"), {
    success: false,
    error: "Invite has been fully redeemed",
  });

  const second = await invites.createInvite("creator");
  const listed = await invites.listInvites("creator");
  const secondRow = listed.find((i) => i.code === second.code)!;
  assert.deepEqual([secondRow.serverUrl, secondRow.maxUses, secondRow.useCount], [null, 1, 0]);
  assert.equal(await invites.revokeInvite(secondRow.id), true);
  assert.deepEqual(await invites.redeemInvite(second.code, "guest"), {
    success: false,
    error: "Invite has been revoked",
  });
});

test("characterization: revokeInvite currently returns true for an unknown invite id", async () => {
  assert.equal(await invites.revokeInvite("does-not-exist"), true);
});

test("servers: connect → list (no key hash exposed) → disconnect", async () => {
  const conn = await servers.connectServer("Peer", "https://peer.example", "peer-key");
  assert.deepEqual(
    { ...conn, id: typeof conn.id },
    {
      id: "string",
      name: "Peer",
      url: "https://peer.example",
      status: "connected",
      lastSyncAt: null,
      errorMessage: null,
    }
  );
  const listed = await servers.listServers();
  const mine = listed.find((s) => s.id === conn.id) as Record<string, unknown> | undefined;
  assert.ok(mine);
  assert.equal("apiKeyHash" in mine, false);
  await servers.disconnectServer(conn.id);
});

test("badges: malformed criteria do not abort valid awards or hidden prerequisite evaluation", async () => {
  // The malformed definition remains stored but is ignored consistently in both paths.
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO badge_definitions (id, name, description, icon, category, rarity, criteria, hidden)
       VALUES ('char-broken', 'Broken', '', 'x', 'usage', 'common', 'not json', 0)`
    )
    .run();
  gamificationDb.addXp("fx-criteria-recovery", "request", 1);
  const unlocked = await badges.evaluateBadges("fx-criteria-recovery", "request");
  assert.ok(unlocked.includes("first-token"));
  assert.equal(gamificationDb.hasBadge("fx-criteria-recovery", "first-token"), true);
  assert.equal(gamificationDb.hasBadge("fx-criteria-recovery", "char-broken"), false);
});
