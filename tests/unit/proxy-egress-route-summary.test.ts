/**
 * GET /api/settings/proxies/egress returns the existing
 * diagnostic payload PLUS an additive anonymous `summary` computed from
 * persisted proxy_logs. Auth pattern from api-auth.test.ts; probe seam from
 * proxy-egress-visibility.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-egress-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.API_KEY_SECRET = "test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const { updateSettings } = await import("@/lib/db/settings");
const localDb = { updateSettings };
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const route = await import("../../src/app/api/settings/proxies/egress/route.ts");

function resetStorage() {
  core.resetDbInstance();
  proxyLogger.clearProxyLogs();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function setupAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password"; // pragma: allowlist secret (fixture du dépôt, même valeur que api-auth.test.ts)
  await localDb.updateSettings({ requireLogin: true, password: "" });
  const key = await apiKeysDb.createApiKey("admin-key", "machine-test", ["manage"]);
  return key.key;
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("GET /api/settings/proxies/egress adds an anonymous summary to the existing payload", async () => {
  const bearer = await setupAuth();

  // Seed two codex accounts on one egress IP (persisted proxy_logs).
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "codex",
    targetUrl: "codex/gpt-5.5",
    egressIp: "100.115.194.84",
    account: "acc-a",
    connectionId: "conn-a",
  });
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "codex",
    targetUrl: "codex/gpt-5.5",
    egressIp: "100.115.194.84",
    account: "acc-b",
    connectionId: "conn-b",
  });
  // logProxyEvent only enqueues for the 1s/100-entry background batch; the route
  // below reads persisted proxy_logs synchronously, so flush before asserting or
  // the rows are not yet on disk (timing-flaky otherwise).
  proxyLogger.flushProxyLogsSync();

  const response = await route.GET(
    new Request("https://example.com/api/settings/proxies/egress", {
      headers: { authorization: `Bearer ${bearer}` },
    })
  );
  assert.equal(response.status, 200);

  const body = await response.json();

  // Existing payload shape untouched.
  assert.ok(Array.isArray(body.connections));
  assert.ok(body.byEgressIp && typeof body.byEgressIp === "object");
  assert.ok(Array.isArray(body.sharedWithinRotationGroup));

  // Additive anonymous summary.
  assert.equal(body.summary.distinctEgressIps, 1);
  assert.equal(body.summary.maxAccountsSharingOneIp, 2);
  assert.equal(body.summary.sharingByRotationGroup[0].rotationGroup, "openai-auth0");
  const json = JSON.stringify(body.summary);
  assert.ok(!json.includes("100.115.194.84"), "no IP literal in the summary");
  assert.ok(!json.includes("acc-a"), "no account identity in the summary");
});

test("GET returns 401 without a management token (auth untouched)", async () => {
  // Self-contained auth setup (the reference api-auth.test.ts calls setupAuth
  // inside each auth test) — no reliance on a previous test's env leakage.
  process.env.INITIAL_PASSWORD = "bootstrap-password"; // pragma: allowlist secret (fixture du dépôt, même valeur que api-auth.test.ts)
  await localDb.updateSettings({ requireLogin: true, password: "" });

  const response = await route.GET(new Request("https://example.com/api/settings/proxies/egress"));
  assert.equal(response.status, 401);
});
