import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-supporter-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { BUILTIN_BADGES } = await import("../../src/lib/gamification/badges.ts");
const { emitGamificationEvent } = await import("../../src/lib/gamification/events.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Radar supporter has a dedicated badge and zero-XP idempotent action", async () => {
  const identity = `radar:${"a".repeat(64)}`;
  const badge = BUILTIN_BADGES.find((item) => item.id === "radar-supporter");
  assert.ok(badge);
  assert.equal(JSON.parse(badge.criteria).action, "radar_supporter");

  await emitGamificationEvent({ apiKeyId: identity, action: "radar_supporter" });
  await emitGamificationEvent({ apiKeyId: identity, action: "radar_supporter" });

  const db = getDbInstance();
  const userBadges = db
    .prepare("SELECT badge_id AS badgeId FROM user_badges WHERE api_key_id = ?")
    .all(identity) as Array<{ badgeId: string }>;
  const xpRows = db
    .prepare("SELECT action FROM xp_audit_log WHERE api_key_id = ?")
    .all(identity) as Array<{ action: string }>;
  const scoreRows = db
    .prepare("SELECT score FROM leaderboard WHERE api_key_id = ?")
    .all(identity) as Array<{ score: number }>;

  assert.deepEqual(userBadges, [{ badgeId: "radar-supporter" }]);
  assert.deepEqual(xpRows, []);
  assert.deepEqual(scoreRows, []);
});
