import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The dashboard profile page reads `/api/gamification/level` without an apiKeyId
// (operator-wide view, #3484) and now expects the streak alongside the level payload so
// the streak card (#2403) shows real data instead of a hard-coded 0.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-level-streak-"));
process.env.DATA_DIR = TEST_DATA_DIR;
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = "test-level-streak-secret-" + Date.now();
}

const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { updateStreak } = await import("../../../src/lib/gamification/streaks.ts");
const { GET } = await import("../../../src/app/api/gamification/level/route.ts");
const { NextRequest } = await import("next/server");

const STREAK_NAMESPACE = "gamification:streaks";

interface LevelPayload {
  level: { apiKeyId: string; totalXp: number; currentLevel: number } | null;
  streak: { current: number; longest: number };
}

async function getLevel(query = ""): Promise<LevelPayload> {
  const response = await GET(new NextRequest(`http://localhost/api/gamification/level${query}`));
  assert.equal(response.status, 200);
  return (await response.json()) as LevelPayload;
}

test.before(async () => {
  await updateStreak("key-a"); // today → current 1 / longest 1
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(
      STREAK_NAMESPACE,
      "key-b",
      JSON.stringify({
        currentStreak: 7,
        longestStreak: 9,
        lastActiveDate: "2026-08-31",
        streakStartDate: "2026-08-25",
      })
    );
});

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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("GET /api/gamification/level without apiKeyId returns the aggregate streak next to the level", async () => {
  const body = await getLevel();
  assert.equal(body.level?.apiKeyId, "*");
  assert.deepEqual(body.streak, { current: 7, longest: 9 });
});

test("GET /api/gamification/level?apiKeyId returns that key's own streak", async () => {
  const keyA = await getLevel("?apiKeyId=key-a");
  assert.deepEqual(keyA.streak, { current: 1, longest: 1 });

  const keyB = await getLevel("?apiKeyId=key-b");
  assert.deepEqual(keyB.streak, { current: 7, longest: 9 });
});

test("GET /api/gamification/level?apiKeyId for an unknown key returns a zero streak, not an error", async () => {
  const body = await getLevel("?apiKeyId=never-seen");
  assert.equal(body.level, null);
  assert.deepEqual(body.streak, { current: 0, longest: 0 });
});
