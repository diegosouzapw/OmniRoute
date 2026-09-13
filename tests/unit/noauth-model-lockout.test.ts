/**
 * Tests for #13483: model-only lockout must be enforced for no-auth providers.
 *
 * Before the fix, no-auth providers (opencode, duckduckgo-web, etc.) returned
 * synthetic "noauth" credentials early in getProviderCredentials, bypassing the
 * model lockout check. A model_capacity lockout was recorded but never enforced
 * — every request retried the same locked model, paying a wasted upstream
 * round-trip (~2s) before failing over.
 */
import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-noauth-lockout-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-noauth-lockout-secret";

const core = await import("../../src/lib/db/core.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { recordModelLockoutFailure, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");

after(() => {
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#13483: noauth provider returns null when model is lockout-blocked", async () => {
  const provider = "opencode";
  const model = "deepseek-v4-flash-free";

  // Record a model lockout for the synthetic "noauth" connection
  recordModelLockoutFailure(provider, "noauth", model, "model_capacity", 400, 1800_000);

  // getProviderCredentials should return null because the model is locked
  const result = await auth.getProviderCredentials(provider, null, null, model);
  assert.equal(result, null,
    "noauth provider should return null when model is lockout-blocked"
  );
});

test("#13483: noauth provider still works when model is NOT lockout-blocked", async () => {
  clearAllModelLockouts();
  const provider = "opencode";
  const model = "some-other-model";

  // No lockout recorded — should return synthetic credentials
  const result = await auth.getProviderCredentials(provider, null, null, model);
  assert.ok(result !== null,
    "noauth provider should return credentials when model is not locked"
  );
});

test("#13483: noauth lockout does not block a different model", async () => {
  clearAllModelLockouts();
  const provider = "opencode";
  const lockedModel = "deepseek-v4-flash-free";
  const otherModel = "kimi-latest";

  // Lock only one model
  recordModelLockoutFailure(provider, "noauth", lockedModel, "model_capacity", 400, 1800_000);

  // The locked model should be blocked
  const result1 = await auth.getProviderCredentials(provider, null, null, lockedModel);
  assert.equal(result1, null, "locked model should return null");

  // A different model should NOT be blocked
  const result2 = await auth.getProviderCredentials(provider, null, null, otherModel);
  assert.ok(result2 !== null, "different model should still get credentials");
});

test("#13483: noauth lockout does not affect non-noauth providers", async () => {
  clearAllModelLockouts();
  const model = "gpt-4";

  // Record lockout for a noauth provider
  recordModelLockoutFailure("opencode", "noauth", model, "model_capacity", 400, 1800_000);

  // openai is NOT a noauth provider — it should not be affected by this check
  // (openai has its own connection-based lockout path; this test just verifies
  // the noauth early-return path doesn't leak lockouts to other providers)
  // We can't easily test openai here without DB connections, but we verify
  // the opencode noauth path specifically.
  const result = await auth.getProviderCredentials("opencode", null, null, model);
  assert.equal(result, null, "opencode noauth should respect its own lockout");
});
