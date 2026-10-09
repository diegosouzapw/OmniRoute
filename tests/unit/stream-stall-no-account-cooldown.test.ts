// A stream content stall is the watchdog giving up on ONE request that sent no model
// output in time — in production almost always a long xhigh/max reasoning turn on Codex
// (`reasoning_open=yes`). Cooling the account for it took the only usable Codex account
// out of routing for a minute at a time, so every request in that window failed over to
// fallbacks or 503'd. Stalls keep the failure observable but no longer cool the account,
// unless the operator opts back in with resilienceSettings.streamStallCooldown.enabled.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-stall-cooldown-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const auth = await import("../../src/sse/services/auth.ts");

const STALL_MESSAGE =
  "stream content stall: no model output within 100000ms (bytes=73343 events=26 " +
  "top=response.output_item.added:12,response.output_item.done:10 reasoning_open=yes)";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedCodex() {
  return providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    accessToken: "codex-access-token",
    isActive: true,
    testStatus: "active",
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a stream content stall does not cool down the account by default", async () => {
  await resetStorage();
  const conn = await seedCodex();

  const result = await auth.markAccountUnavailable(
    conn.id,
    502,
    STALL_MESSAGE,
    "codex",
    "gpt-6.1-sol-xhigh"
  );

  assert.equal(result.cooldownMs, 0);
  assert.equal(result.shouldFallback, true, "the combo may still try its next target");
  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after.testStatus, "active");
  assert.ok(!after.rateLimitedUntil, "connection must not be rate-limited");
  assert.match(String(after.lastError), /stall/i, "the stall stays observable");
});

test("streamStallCooldown.enabled restores the account cooldown for stalls", async () => {
  await resetStorage();
  const conn = await seedCodex();
  await settingsDb.updateSettings({
    resilienceSettings: { streamStallCooldown: { enabled: true } },
  });

  const result = await auth.markAccountUnavailable(
    conn.id,
    502,
    STALL_MESSAGE,
    "codex",
    "gpt-6.1-sol-xhigh"
  );

  assert.ok(result.cooldownMs > 0, "opted-in stalls cool the account like other 502s");
  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.ok(after.rateLimitedUntil, "connection is rate-limited");
});

test("other upstream 502s still cool down the account", async () => {
  await resetStorage();
  const conn = await seedCodex();

  const result = await auth.markAccountUnavailable(
    conn.id,
    502,
    "upstream connect error or disconnect/reset before headers",
    "codex",
    "gpt-6.1-sol-xhigh"
  );

  assert.ok(result.cooldownMs > 0);
});
