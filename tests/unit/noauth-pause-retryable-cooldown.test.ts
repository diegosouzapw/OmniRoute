/**
 * A paused no-auth provider must answer with a retryable cooldown (429 +
 * Retry-After), not a fatal 401 "No active credentials".
 *
 * Symptom: while the short refusal pause covers the shared synthetic
 * connection, every request for that provider received null from selection
 * and surfaced as 401, which clients do not retry.
 */
import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-noauth-pause-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-noauth-pause-secret";

const core = await import("../../src/lib/db/core.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { noteOpencodeFreeTierSkip, clearOpencodeFreeTierSkips, getOpencodeFreeTierSkipRemainingMs } =
  await import("../../open-sse/services/opencodeFreeTierSkip.ts");
const { pauseCooldownIfPaused } = await import("../../src/sse/services/noAuthModelCooldown.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");

const PROVIDER = "opencode";
const MODEL = "muse-spark-1.3-contributor-free";

beforeEach(() => {
  clearOpencodeFreeTierSkips();
  clearAllModelLockouts();
});
after(() => {
  clearOpencodeFreeTierSkips();
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("reader reports the positive remaining time while the pause covers the provider", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, 60_000);
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + 10_000), 50_000);
});

test("reader returns null with no entry", () => {
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER), null);
});

test("reader returns null for a foreign provider", () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  assert.equal(getOpencodeFreeTierSkipRemainingMs("groq"), null);
});

test("reader returns null once the pause expires and drops the entry", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, 50);
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + 50), null);
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + 51), null);
});

test("builder returns a connection-scoped 429 envelope near the end of the pause", () => {
  noteOpencodeFreeTierSkip(PROVIDER, Date.now(), 60_000);
  const before = Date.now();
  const outcome = pauseCooldownIfPaused(PROVIDER, "noauth");
  assert.ok(outcome, "an active pause must answer a cooldown, not null");
  if (!outcome) return;
  assert.equal(outcome.allRateLimited, true);
  assert.equal(outcome.lastErrorCode, 429);
  assert.equal(outcome.cooldownScope, "connection");
  assert.equal(outcome.cooldownModel, null);
  assert.equal(outcome.lastError, "The shared no-auth connection is in a refusal pause");
  assert.equal(outcome.connectionsCount, 1);
  const remaining = Date.parse(outcome.retryAfter) - before;
  assert.ok(
    remaining > 0 && remaining <= 60_000 + 2000,
    `retryAfter near pause end (${remaining}ms)`
  );
});

test("excluded noauth connection keeps returning null during a pause", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const result = await auth.getProviderCredentials(PROVIDER, "noauth", null, MODEL);
  assert.equal(result, null);
});

test("restricted allowlist keeps returning null during a pause", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const result = await auth.getProviderCredentials(PROVIDER, null, ["conn-other"], MODEL);
  assert.equal(result, null);
});

test("another provider is unchanged during a pause", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const result = await auth.getProviderCredentials("groq", null, null, MODEL);
  assert.equal(result, null);
});

test("storage returns to its starting size after pauses expire", () => {
  const start = Date.now();
  const count = 25;
  for (let i = 0; i < count; i += 1) {
    noteOpencodeFreeTierSkip(`opencode-${i}`, start, 50);
  }
  for (let i = 0; i < count; i += 1) {
    assert.equal(getOpencodeFreeTierSkipRemainingMs(`opencode-${i}`, start + 51), null);
  }
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, start + 51), null);
});
