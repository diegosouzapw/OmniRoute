import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "zero-reward-16200-"));
process.env.DATA_DIR = dataDir;

const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { getXp, hasBadge } = await import("../../../src/lib/db/gamification.ts");
const { emitGamificationEvent } = await import("../../../src/lib/gamification/events.ts");
const { getStreak } = await import("../../../src/lib/gamification/streaks.ts");
const { consumeBadgeUnlocks } = await import("../../../src/lib/gamification/notifications.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function scores(apiKeyId: string) {
  return getDbInstance()
    .prepare("SELECT scope, score, updated_at FROM leaderboard WHERE api_key_id = ? ORDER BY scope")
    .all(apiKeyId) as Array<{ scope: string; score: number; updated_at: string }>;
}

function emitUnknown(apiKeyId: string, action: string) {
  // Exercise runtime input outside the public TypeScript union, without replacing the emitter.
  return emitGamificationEvent({
    apiKeyId,
    action: action as Parameters<typeof emitGamificationEvent>[0]["action"],
  });
}

test("#16200 unknown event creates neither XP nor any leaderboard scope", async () => {
  const key = "zero-new";
  assert.deepEqual(scores(key), []);
  await emitUnknown(key, "not-an-action");
  assert.equal(getXp(key), null);
  assert.deepEqual(scores(key), []);
});

test("#16200 request still awards XP, all three scores, streak and one badge", async () => {
  const key = "positive-request";
  await emitGamificationEvent({ apiKeyId: key, action: "request" });
  assert.equal(getXp(key)?.totalXp, 11);
  assert.deepEqual(
    scores(key).map(({ scope, score }) => [scope, score]),
    [
      ["global", 11],
      ["monthly", 11],
      ["weekly", 11],
    ]
  );
  assert.equal((await getStreak(key)).currentStreak, 1);
  assert.equal(hasBadge(key, "first-token"), true);
  assert.deepEqual(
    consumeBadgeUnlocks(key).map((item) => item.badgeId),
    ["first-token"]
  );
  await emitGamificationEvent({ apiKeyId: key, action: "request" });
  assert.equal(getXp(key)?.totalXp, 12);
  assert.deepEqual(
    scores(key).map(({ score }) => score),
    [12, 12, 12]
  );
  assert.deepEqual(consumeBadgeUnlocks(key), []);
});

for (const action of ["", "another-unrewarded-action", "constructor", "toString"]) {
  test(`#16200 runtime action ${JSON.stringify(action)} adds no scores`, async () => {
    const key = `runtime-${action}`;
    await emitUnknown(key, action);
    assert.equal(getXp(key), null);
    assert.deepEqual(scores(key), []);
    assert.deepEqual(consumeBadgeUnlocks(key), []);
  });
}

test("#16200 zero reward preserves existing scores and their timestamps", async () => {
  const key = "existing-ranking";
  await emitGamificationEvent({ apiKeyId: key, action: "request" });
  getDbInstance()
    .prepare("UPDATE leaderboard SET updated_at = '2000-01-01 00:00:00' WHERE api_key_id = ?")
    .run(key);
  const before = scores(key);
  assert.deepEqual(before, [
    { scope: "global", score: 11, updated_at: "2000-01-01 00:00:00" },
    { scope: "monthly", score: 11, updated_at: "2000-01-01 00:00:00" },
    { scope: "weekly", score: 11, updated_at: "2000-01-01 00:00:00" },
  ]);
  const xpBefore = getXp(key);
  consumeBadgeUnlocks(key);
  await emitUnknown(key, "not-an-action");
  assert.deepEqual(scores(key), before);
  assert.deepEqual(getXp(key), xpBefore);
  assert.equal((await getStreak(key)).currentStreak, 1);
  assert.equal(hasBadge(key, "first-token"), true);
  assert.deepEqual(consumeBadgeUnlocks(key), []);
});

test("#16200 historical zero rows are preserved rather than migrated", async () => {
  const key = "historical-zero";
  getDbInstance()
    .prepare(
      "INSERT INTO leaderboard (api_key_id, scope, score, updated_at) VALUES (?, 'global', 0, '2000-01-01 00:00:00')"
    )
    .run(key);
  await emitUnknown(key, "not-an-action");
  assert.deepEqual(scores(key), [{ scope: "global", score: 0, updated_at: "2000-01-01 00:00:00" }]);
});

test("#16200 token_share retains weighted badge progress and each score scope", async () => {
  const key = "positive-sharing";
  await emitGamificationEvent({ apiKeyId: key, action: "token_share", metadata: { amount: 1000 } });
  assert.equal(getXp(key)?.totalXp, 11);
  assert.deepEqual(
    scores(key).map(({ scope, score }) => [scope, score]),
    [
      ["global", 11],
      ["monthly", 11],
      ["tokens_shared", 1],
      ["weekly", 11],
    ]
  );
  assert.equal(hasBadge(key, "generous"), true);
  assert.deepEqual(
    consumeBadgeUnlocks(key).map((item) => item.badgeId),
    ["generous"]
  );
  await emitGamificationEvent({ apiKeyId: key, action: "token_share", metadata: { amount: 1 } });
  assert.equal(getXp(key)?.totalXp, 12);
  assert.deepEqual(
    scores(key).map(({ scope, score }) => [scope, score]),
    [
      ["global", 12],
      ["monthly", 12],
      ["tokens_shared", 2],
      ["weekly", 12],
    ]
  );
  assert.deepEqual(consumeBadgeUnlocks(key), []);
});

test("#16200 radar supporter keeps recognition and one toast without XP or ranking", async () => {
  const key = "recognition-only";
  await emitGamificationEvent({ apiKeyId: key, action: "radar_supporter" });
  await emitGamificationEvent({ apiKeyId: key, action: "radar_supporter" });
  assert.equal(hasBadge(key, "radar-supporter"), true);
  assert.deepEqual(
    consumeBadgeUnlocks(key).map((item) => item.badgeId),
    ["radar-supporter"]
  );
  assert.equal(getXp(key), null);
  assert.deepEqual(scores(key), []);
});

test("#16200 rejected positive award creates no ranking, XP or streak", async () => {
  const key = "anti-cheat-rejected";
  getDbInstance()
    .prepare("INSERT INTO xp_audit_log (api_key_id, action, xp_earned) VALUES (?, 'seed', 1000)")
    .run(key);
  await emitGamificationEvent({ apiKeyId: key, action: "request" });
  assert.equal(getXp(key), null);
  assert.deepEqual(scores(key), []);
  assert.equal((await getStreak(key)).currentStreak, 0);
  assert.equal(hasBadge(key, "first-token"), false);
  assert.deepEqual(consumeBadgeUnlocks(key), []);
});

test("#16200 unknown key and missing key cannot change another participant", async () => {
  const key = "isolated-participant";
  await emitGamificationEvent({ apiKeyId: key, action: "request" });
  const before = { scores: scores(key), xp: getXp(key), streak: await getStreak(key) };
  consumeBadgeUnlocks(key);
  await emitUnknown("unrelated-participant", "not-an-action");
  await emitGamificationEvent({ apiKeyId: "", action: "request" });
  assert.deepEqual({ scores: scores(key), xp: getXp(key), streak: await getStreak(key) }, before);
  assert.equal(hasBadge(key, "first-token"), true);
  assert.deepEqual(consumeBadgeUnlocks(key), []);
  assert.deepEqual(scores("unrelated-participant"), []);
  assert.deepEqual(scores(""), []);
});
