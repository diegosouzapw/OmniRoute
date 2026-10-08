import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const data = fs.mkdtempSync(path.join(os.tmpdir(), "omni-codex-quota-optout-"));
process.env.DATA_DIR = data;
process.env.APP_LOG_TO_FILE = "false";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const { evaluateQuotaCutoff, registerQuotaFetcher } =
  await import("../../open-sse/services/quotaPreflight.ts");
const { getProviderCredentialsWithQuotaPreflight } =
  await import("../../src/sse/services/auth.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");

const optedOut = { limitPolicy: { enabled: false }, quotaPreflightEnabled: false };
const resetAt = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString();
const exhausted = {
  used: 100, total: 100, percentUsed: 1, resetAt, limitReached: true,
  windows: { session: { percentUsed: 1, resetAt } },
};
let connectionId = "";

test.before(async () => {
  const connection = await providers.createProviderConnection({
    provider: "codex", authType: "oauth", name: "quota-optout-fixture",
    accessToken: "fixture-access", isActive: true, testStatus: "active",
    providerSpecificData: {},
  });
  assert.ok(typeof connection.id === "string");
  connectionId = connection.id;
});

test.after(async () => {
  await (await import("../../src/lib/usage/callLogs.ts")).closeCallLogSaves(5_000);
  core.resetDbInstance();
  fs.rmSync(data, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}, { timeout: 6_000 });

test("Codex combined opt-out preserves observations and bypasses cached/live quota cutoffs",
  { timeout: 5_000 }, async () => {
    quotaCache.setQuotaCache(connectionId, "codex", {
      session: { remainingPercentage: 0, resetAt },
    });
    const previous = structuredClone(quotaCache.getQuotaCache(connectionId));
    assert.equal(quotaCache.isQuotaExhaustedForRequest(connectionId, "codex", "gpt-6.1-sol"), true);
    assert.equal(evaluateQuotaCutoff(exhausted, undefined, { provider: "codex" }).proceed, false);

    await providers.updateProviderConnection(connectionId, { providerSpecificData: optedOut });
    invalidateDbCache("connections", connectionId);
    assert.equal(
      quotaCache.isQuotaExhaustedForRequest(connectionId, "codex", "gpt-6.1-sol", optedOut),
      false
    );
    assert.equal(evaluateQuotaCutoff(exhausted, undefined, {
      provider: "codex", providerSpecificData: optedOut,
    }).proceed, true);
    assert.deepEqual(quotaCache.getQuotaCache(connectionId), previous);

    registerQuotaFetcher("codex", async () => {
      assert.fail("Explicit opt-out must not perform an upstream quota fetch");
    });
    const selected = await getProviderCredentialsWithQuotaPreflight(
      "codex", null, [connectionId], "gpt-6.1-sol"
    );
    assert.ok(selected && "connectionId" in selected);
    assert.equal(selected.connectionId, connectionId);
  });

test("Partial, malformed and other-provider settings retain exhausted-window filtering",
  { timeout: 1_000 }, () => {
    for (const settings of [
      {}, { quotaPreflightEnabled: false }, { limitPolicy: { enabled: false } },
      { limitPolicy: { enabled: "false" }, quotaPreflightEnabled: false },
      { limitPolicy: { enabled: false }, quotaPreflightEnabled: "false" },
    ]) {
      assert.equal(
        quotaCache.isQuotaExhaustedForRequest(connectionId, "codex", "gpt-6.1-sol", settings),
        true
      );
      assert.equal(evaluateQuotaCutoff(exhausted, undefined, {
        provider: "codex", providerSpecificData: settings,
      }).proceed, false);
    }
    assert.equal(evaluateQuotaCutoff(exhausted, undefined, {
      provider: "openai", providerSpecificData: optedOut,
    }).proceed, false);
    quotaCache.setQuotaCache("other-provider", "openai", {
      session: { remainingPercentage: 0, resetAt },
    });
    assert.equal(
      quotaCache.isQuotaExhaustedForRequest("other-provider", "openai", "gpt-6.1-sol", optedOut),
      true
    );
  });

test("Restoring filtering and terminal account protection remain effective",
  { timeout: 5_000 }, async () => {
    await providers.updateProviderConnection(connectionId, {
      providerSpecificData: {}, testStatus: "active",
    });
    invalidateDbCache("connections", connectionId);
    const restored = await getProviderCredentialsWithQuotaPreflight(
      "codex", null, [connectionId], "gpt-6.1-sol"
    );
    assert.ok(restored && "allRateLimited" in restored);
    assert.equal(restored.allRateLimited, true);

    await providers.updateProviderConnection(connectionId, {
      providerSpecificData: optedOut, testStatus: "banned",
    });
    invalidateDbCache("connections", connectionId);
    const banned = await getProviderCredentialsWithQuotaPreflight(
      "codex", null, [connectionId], "gpt-6.1-sol"
    );
    assert.ok(!banned || !("connectionId" in banned) || banned.connectionId !== connectionId);
  });
