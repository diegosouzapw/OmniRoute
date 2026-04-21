import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-t25-extra-usage-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const claudeExtraUsage = await import("../../open-sse/services/claudeExtraUsage.ts");

async function resetStorage() {
  core.resetDbInstance();
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

test("Claude extra usage block persists cooldown state and routing skips the blocked account", async () => {
  const blocked = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    email: "blocked@example.com",
    accessToken: "claude-oauth-token",
    testStatus: "active",
    priority: 1,
  });
  const healthy = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    email: "healthy@example.com",
    accessToken: "claude-oauth-token-healthy",
    testStatus: "active",
    priority: 2,
  });

  const resetAt = new Date(Date.now() + 30 * 60_000).toISOString();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url).includes("/api/oauth/usage")) {
      return new Response(
        JSON.stringify({
          five_hour: { utilization: 100, resets_at: resetAt },
        }),
        { status: 200 }
      );
    }
    throw new Error(`unexpected fetch: ${url}`);
  };

  try {
    const changed = await claudeExtraUsage.syncClaudeExtraUsageBlockState({
      provider: "claude",
      connectionId: blocked.id,
      accessToken: "claude-oauth-token",
      providerSpecificData: blocked.providerSpecificData,
      blockExtraUsage: true,
      extraUsage: {
        usage: {
          extra_usage: {
            queued: true,
            billing_amount: 0.5,
          },
        },
      },
    });

    assert.equal(changed, true);

    const updated = await providersDb.getProviderConnectionById(blocked.id);
    assert.equal(updated.rateLimitedUntil, resetAt);
    assert.equal(updated.testStatus, "quota_exhausted");
    assert.equal(updated.lastErrorType, "quota_exhausted");
    assert.equal(updated.lastErrorSource, "claude_extra_usage");
    assert.equal(updated.errorCode, "extra_usage");
    assert.equal(updated.providerSpecificData.claudeExtraUsageState.queued, true);
    assert.equal(updated.providerSpecificData.claudeExtraUsageState.billingAmount, 0.5);
    assert.equal(updated.providerSpecificData.claudeExtraUsageState.blockedUntil, resetAt);
    assert.equal(
      updated.providerSpecificData.claudeExtraUsageState.blockedUntilSource,
      "oauth_usage"
    );

    const selected = await auth.getProviderCredentials("claude");
    assert.equal(selected.connectionId, healthy.id);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Claude extra usage block respects the per-connection toggle and leaves the account available", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    email: "allow-extra-usage@example.com",
    accessToken: "claude-oauth-token",
    testStatus: "active",
    blockExtraUsage: false,
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    throw new Error(`fetch should not run when blockExtraUsage=false: ${url}`);
  };

  try {
    const changed = await claudeExtraUsage.syncClaudeExtraUsageBlockState({
      provider: "claude",
      connectionId: connection.id,
      accessToken: "claude-oauth-token",
      providerSpecificData: connection.providerSpecificData,
      blockExtraUsage: false,
      extraUsage: {
        usage: {
          extra_usage: {
            queued: true,
            billing_amount: 0.25,
          },
        },
      },
    });

    assert.equal(changed, false);

    const updated = await providersDb.getProviderConnectionById(connection.id);
    assert.equal(updated.rateLimitedUntil, undefined);
    assert.equal(updated.testStatus, "active");
    assert.equal(updated.blockExtraUsage, false);

    const selected = await auth.getProviderCredentials("claude");
    assert.equal(selected.connectionId, connection.id);
    assert.equal(selected.blockExtraUsage, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
