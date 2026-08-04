import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sse-auth-ag-credits-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "sse-auth-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const auth = await import("../../src/sse/services/auth.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Antigravity always mode bypasses request-path quota preflight", async () => {
  const previousCreditsMode = process.env.ANTIGRAVITY_CREDITS;
  process.env.ANTIGRAVITY_CREDITS = "always";

  try {
    const conn = await providersDb.createProviderConnection({
      provider: "antigravity",
      name: "antigravity-credits-first",
      authType: "oauth",
      accessToken: "fake-antigravity-access",
      refreshToken: "fake-antigravity-refresh",
      isActive: true,
      testStatus: "active",
      providerSpecificData: {
        quotaPreflightEnabled: true,
        limitPolicy: {
          enabled: true,
          thresholdPercent: 75,
          windows: ["daily"],
        },
      },
    });
    quotaCache.setQuotaCache(conn.id, "antigravity", {
      daily: { remainingPercentage: 10, resetAt: new Date(Date.now() + 60_000).toISOString() },
    });

    const quotaPreflight = await import("../../open-sse/services/quotaPreflight.ts");
    let fetcherCalls = 0;
    quotaPreflight.registerQuotaFetcher("antigravity", async () => {
      fetcherCalls++;
      return { used: 0, total: 100, percentUsed: 0 };
    });

    const selected = await auth.getProviderCredentialsWithQuotaPreflight(
      "antigravity",
      null,
      null,
      "gemini-2.5-flash"
    );

    assert(selected && "connectionId" in selected);
    assert.equal(selected.connectionId, conn.id);
    assert.equal(fetcherCalls, 0, "credits-first routing must not issue a normal quota probe");
  } finally {
    if (previousCreditsMode === undefined) delete process.env.ANTIGRAVITY_CREDITS;
    else process.env.ANTIGRAVITY_CREDITS = previousCreditsMode;
  }
});
