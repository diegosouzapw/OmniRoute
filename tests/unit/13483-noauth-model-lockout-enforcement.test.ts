/**
 * #13483 — Model-only lockout for no-auth providers is recorded but never
 * enforced. Before the fix, recordModelLockoutFailure writes a lockout entry
 * keyed on (provider, "noauth", model) but the no-auth early-return branch in
 * getProviderCredentials never consults getModelLockoutInfo — every subsequent
 * request re-contacts the upstream and re-records the same lockout indefinitely.
 *
 * The fix adds a getModelLockoutInfo check before returning the synthetic
 * no-auth credentials, so the combo records model_lockout and skips the
 * upstream call while the lockout is active.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13483-lockout-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { lockModel, clearAllModelLockouts } = await import(
  "../../open-sse/services/accountFallback.ts"
);

const LOCKED_PROVIDER = "opencode";
const LOCKED_MODEL = "deepseek-v4-flash-free";
const ACTIVE_COOLDOWN_MS = 60_000;

test.after(() => {
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#13483 no-auth provider returns null while model lockout is active", async () => {
  clearAllModelLockouts();

  // Record a model_capacity lockout for the no-auth provider's synthetic
  // connection — exactly what recordModelLockoutFailure does on a 400.
  lockModel(LOCKED_PROVIDER, "noauth", LOCKED_MODEL, "model_capacity", ACTIVE_COOLDOWN_MS);

  // getProviderCredentials must now respect the lockout and return null
  // instead of handing back the synthetic no-auth credentials.
  const creds = await getProviderCredentials(LOCKED_PROVIDER, null, null, LOCKED_MODEL);

  assert.equal(creds, null, "synthetic no-auth credentials must not be returned while model is locked");
});

test("#13483 no-auth provider returns credentials after lockout expires", async () => {
  clearAllModelLockouts();

  // Lock with negative cooldown so the entry expires immediately (Date.now() + (-60000) < now).
  lockModel(LOCKED_PROVIDER, "noauth", LOCKED_MODEL, "model_capacity", -60_000);

  // The lockout is already expired — credentials should be returned normally.
  const creds = await getProviderCredentials(LOCKED_PROVIDER, null, null, LOCKED_MODEL);

  assert.ok(creds, "synthetic no-auth credentials must be returned after lockout expires");
  assert.equal(creds!.connectionId, "noauth", "connectionId must be the synthetic noauth id");
});

test("#13483 no-auth provider ignores lockout when no model is requested", async () => {
  clearAllModelLockouts();

  // Lock a specific model but request without a model filter.
  lockModel(LOCKED_PROVIDER, "noauth", LOCKED_MODEL, "model_capacity", ACTIVE_COOLDOWN_MS);

  // With requestedModel=null, the lockout check is skipped (same as real connections).
  const creds = await getProviderCredentials(LOCKED_PROVIDER, null, null, null);

  assert.ok(creds, "credentials must be returned when no model is requested (lockout check skipped)");
  assert.equal(creds!.connectionId, "noauth");
});

test("#13483 no-auth provider ignores lockout for a different model", async () => {
  clearAllModelLockouts();

  // Lock one model but request a different one.
  lockModel(LOCKED_PROVIDER, "noauth", LOCKED_MODEL, "model_capacity", ACTIVE_COOLDOWN_MS);

  const OTHER_MODEL = "grok-code";
  const creds = await getProviderCredentials(LOCKED_PROVIDER, null, null, OTHER_MODEL);

  assert.ok(creds, "credentials must be returned when requesting a different model than the locked one");
  assert.equal(creds!.connectionId, "noauth");
});
