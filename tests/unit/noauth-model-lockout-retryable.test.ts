/**
 * A temporary model lockout on a no-auth provider must surface as the same
 * "all credentials cooling down for this model" outcome that real connections
 * produce (retryable, with a Retry-After), not as a bare null that the chat
 * handler turns into a 401 "No active credentials".
 *
 * Symptom: a 502 on one request locks the model for a few seconds on the
 * shared synthetic connection; every request for that model arriving inside the
 * window (including valid, concurrent ones) received a fatal 401.
 */
import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-noauth-retryable-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-noauth-retryable-secret";

const core = await import("../../src/lib/db/core.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { handleNoCredentials } = await import("../../src/sse/handlers/chatHelpers.ts");
const { recordModelLockoutFailure, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");

type SelectionOutcome = {
  allRateLimited?: boolean;
  cooldownScope?: string;
  cooldownModel?: string;
  lastErrorCode?: number;
  retryAfter: string;
  connectionId?: string;
} | null;

const PROVIDER = "opencode";
const MODEL = "muse-spark-1.3-contributor-free";

beforeEach(() => clearAllModelLockouts());
after(() => {
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("locked model on noauth returns the model-scoped cooldown outcome, not null", async () => {
  recordModelLockoutFailure(PROVIDER, "noauth", MODEL, "server_error", 502, 3000);

  const result = (await auth.getProviderCredentials(
    PROVIDER,
    null,
    null,
    MODEL
  )) as SelectionOutcome;

  assert.ok(result, "a temporary lockout must not collapse to null");
  if (!result) return;
  assert.equal(result.allRateLimited, true);
  assert.equal(result.cooldownScope, "model");
  assert.equal(result.cooldownModel, MODEL);
  assert.equal(result.lastErrorCode, 429);
  const remainingMs = Date.parse(result.retryAfter) - Date.now();
  assert.ok(
    remainingMs > 0 && remainingMs <= 3500,
    `retryAfter within the lock (${remainingMs}ms)`
  );
});

test("a permanent-style lockout reason (not_found) keeps returning null", async () => {
  recordModelLockoutFailure(PROVIDER, "noauth", MODEL, "not_found", 404, 60_000);
  const result = await auth.getProviderCredentials(PROVIDER, null, null, MODEL);
  assert.equal(result, null);
});

test("the cooldown outcome maps to a 429 model_cooldown with Retry-After", async () => {
  recordModelLockoutFailure(PROVIDER, "noauth", MODEL, "server_error", 502, 3000);
  const credentials = await auth.getProviderCredentials(PROVIDER, null, null, MODEL);

  const res = handleNoCredentials(credentials, null, PROVIDER, MODEL, null, null);

  assert.equal(res.status, 429);
  const body = (await res.json()) as { error: { code: string } };
  assert.equal(body.error.code, "model_cooldown");
  assert.ok(Number(res.headers.get("Retry-After")) >= 1);
});

test("another model on the same provider is not affected", async () => {
  recordModelLockoutFailure(PROVIDER, "noauth", MODEL, "server_error", 502, 3000);
  const other = (await auth.getProviderCredentials(
    PROVIDER,
    null,
    null,
    "other-free"
  )) as SelectionOutcome;
  assert.equal(other?.connectionId, "noauth");
});

test("an expired lockout is not enforced", async () => {
  recordModelLockoutFailure(PROVIDER, "noauth", MODEL, "server_error", 502, 1);
  await new Promise((r) => setTimeout(r, 20));
  const result = (await auth.getProviderCredentials(
    PROVIDER,
    null,
    null,
    MODEL
  )) as SelectionOutcome;
  assert.equal(result?.connectionId, "noauth");
});

test("a provider that was never configured still gets the original 401 message", async () => {
  const res = handleNoCredentials(null, null, "zz-unknown", "m", null, null);
  assert.equal(res.status, 401);
  assert.match(await res.text(), /No active credentials for provider: zz-unknown/);
});
