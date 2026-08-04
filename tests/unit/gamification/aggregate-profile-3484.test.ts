import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #3484 — the dashboard profile page fetches /api/gamification/{level,badges,badges/earned}
// without an apiKeyId (operator-wide view). These helpers back the no-key case and the
// badge catalog must be seeded so the grid is populated (see #3472).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gami-3484-"));
process.env.DATA_DIR = TEST_DATA_DIR;
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = "test-gami-3484-secret-" + Date.now();
}

const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");
const gami = await import("../../../src/lib/db/gamification.ts");
const { seedBuiltinBadges, BUILTIN_BADGES } = await import("../../../src/lib/gamification/badges.ts");

test.after(() => {
  try {
    getDbInstance().close();
  } catch {
    /* ignore */
  }
  try {
    resetDbInstance();
  } catch {
    /* ignore */
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#3484 getAggregateXp on an empty ledger → zero XP, level 1, no throw", () => {
  const agg = gami.getAggregateXp();
  assert.equal(agg.totalXp, 0);
  assert.equal(agg.currentLevel, 1);
  assert.equal(agg.apiKeyId, "*");
});

test("#3484 seedBuiltinBadges populates the catalog (getBadgeDefinitions non-empty)", async () => {
  assert.equal(gami.getBadgeDefinitions().length, 0); // unseeded
  await seedBuiltinBadges();
  assert.equal(gami.getBadgeDefinitions().length, BUILTIN_BADGES.length);
  await seedBuiltinBadges(); // idempotent — no duplicates
  assert.equal(gami.getBadgeDefinitions().length, BUILTIN_BADGES.length);
});

test("#3484 getAggregateXp sums XP across keys and takes the highest level", () => {
  const db = getDbInstance();
  const upsert = db.prepare(
    `INSERT OR REPLACE INTO user_levels (api_key_id, total_xp, current_level, updated_at)
     VALUES (?, ?, ?, datetime('now'))`
  );
  upsert.run("key-a", 100, 2);
  upsert.run("key-b", 250, 5);

  const agg = gami.getAggregateXp();
  assert.equal(agg.totalXp, 350);
  assert.equal(agg.currentLevel, 5);
});

test("#3484 getAllEarnedBadges returns distinct badges earned by any key", () => {
  const db = getDbInstance();
  const [b0, b1] = BUILTIN_BADGES;
  const award = db.prepare(
    `INSERT OR IGNORE INTO user_badges (api_key_id, badge_id, unlocked_at)
     VALUES (?, ?, datetime('now'))`
  );
  award.run("key-a", b0.id); // earned by A
  award.run("key-b", b0.id); // same badge earned by B → must dedupe to one
  award.run("key-b", b1.id); // distinct badge earned by B

  const earned = gami.getAllEarnedBadges();
  const ids = earned.map((e) => e.badgeId).sort();
  assert.deepEqual(ids, [b0.id, b1.id].sort());
  assert.ok(earned.every((e) => typeof e.badgeName === "string" && e.badgeName.length > 0));
});
