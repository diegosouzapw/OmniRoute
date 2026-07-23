import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-quota-hydrate-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-quota-hydrate-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const quotaSnapshotsDb = await import("../../src/lib/db/quotaSnapshots.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const auth = await import("../../src/sse/services/auth.ts");

function futureIso(ms = 60_000) {
  return new Date(Date.now() + ms).toISOString();
}

async function resetStorage() {
  core.resetDbInstance();
  quotaCache.__clearForTests();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Codex selection ignores hydrated Spark-only exhaustion for normal Codex models", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-normal-hydrated-spark-exhausted",
    apiKey: null,
    accessToken: "codex-normal-hydrated-access",
    refreshToken: "codex-normal-hydrated-refresh",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const connectionId = (connection as { id: string }).id;

  const snapshots = [
    ["session", 90, 0, futureIso(60_000)],
    ["weekly", 98, 0, futureIso(120_000)],
    ["gpt_5_3_codex_spark_session", 100, 0, futureIso(180_000)],
    ["gpt_5_3_codex_spark_weekly", 0, 1, futureIso(240_000)],
  ] as const;
  for (const [windowKey, remaining, exhausted, resetAt] of snapshots) {
    quotaSnapshotsDb.saveQuotaSnapshot({
      provider: "codex",
      connection_id: connectionId,
      window_key: windowKey,
      remaining_percentage: remaining,
      is_exhausted: exhausted,
      next_reset_at: resetAt,
      window_duration_ms: null,
      raw_data: JSON.stringify({ source: "test" }),
    });
  }

  // Simulate a restart: the in-memory cache is empty, and lazy hydration promotes
  // the exhausted Spark snapshot into the connection-level exhausted flag.
  quotaCache.__clearForTests();

  const normalSelected = await auth.getProviderCredentials("codex", null, null, "codex/gpt-5.5");
  const sparkSelected = await auth.getProviderCredentials(
    "codex",
    null,
    null,
    "gpt-5.3-codex-spark"
  );

  assert.equal(normalSelected.connectionId, connectionId);
  assert.equal(sparkSelected.allRateLimited, true);
});
