/**
 * tests/unit/apikeypolicy-quota-only.test.ts
 *
 * TDD coverage for Phase B4: quota-exclusive enforcement in enforceApiKeyPolicy.
 *
 * Cases:
 * 1. Key with allowedQuotas (pool "Times" → codex connection) + the canonical
 *    quotaShared-* virtual model for that pool → ALLOWED (rejection null).
 * 2. Same key + raw model "cx/gpt-5.5" → REJECTED 403 QUOTA_ONLY
 *    (message: "This quota-exclusive API key may only use quotaShared-* models").
 * 3. Same key + quotaShared-* belonging to a DIFFERENT pool → REJECTED 403 QUOTA_ONLY
 *    (message: "not in this key's quota pools").
 * 4. Key with empty allowedQuotas → existing behavior unchanged.
 * 5. Dangling pool (non-existent pool ID) → fail-closed 403 QUOTA_ONLY.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-apikeypolicy-quota-only-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "quota-only-test-secret";

// Import DB modules using top-level await (Node test runner supports ESM TLA)
const coreDb = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");
const { quotaModelName } = await import("../../src/lib/quota/quotaModelNaming.ts");

rateLimiter.setRateLimiterTestMode(true);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  coreDb.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if ((err?.code === "EBUSY" || err?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function loadPolicy(label: string) {
  const modulePath = path.join(process.cwd(), "src/shared/utils/apiKeyPolicy.ts");
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

function makeRequest(apiKey: string | null) {
  return new Request("http://localhost/api/v1/chat/completions", {
    method: "POST",
    headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
  });
}

async function readBody(response: Response) {
  return response.json() as Promise<{ error: { message: string; code: string } }>;
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  apiKeysDb.resetApiKeyState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test("quota-only key requesting its quotaShared-* virtual model is allowed", async () => {
  // Pool name "Times" → slug "times"; provider "codex"
  const conn = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "quota-b4-codex-conn",
    apiKey: "sk-codex-b4-allowed",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  assert.ok(connId);

  const pool = poolsDb.createPool({ connectionId: connId, name: "Times" });

  const created = await apiKeysDb.createApiKey("Quota-B4 Key Allowed", "machine-b4-allowed");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedQuotas: [pool.id],
  });

  const policy = await loadPolicy("b4-quota-allowed");

  // Build the canonical virtual model name using the same helper the B4 implementation uses.
  // Pool "Times" → slug "times"; provider "codex" (canonical, not alias "cx"); model "gpt-5.5"
  // → qtSd/times/codex/gpt-5.5  (new format after B3)
  const virtualModel = quotaModelName("Times", "codex", "gpt-5.5");
  assert.equal(virtualModel, "qtSd/times/codex/gpt-5.5");

  const result = await policy.enforceApiKeyPolicy(makeRequest(created.key), virtualModel);
  assert.equal(
    result.rejection,
    null,
    "quota-exclusive key should pass through for its own quotaShared-* model"
  );
});

test("quota-only key requesting raw model name is rejected 403 QUOTA_ONLY", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "quota-b4-codex-conn-raw",
    apiKey: "sk-codex-b4-raw",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "Times" });

  const created = await apiKeysDb.createApiKey("Quota-B4 Key Raw Reject", "machine-b4-raw");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedQuotas: [pool.id],
  });

  const policy = await loadPolicy("b4-quota-raw-rejected");

  // Raw model name (not a quotaShared-* name) → must be rejected
  const result = await policy.enforceApiKeyPolicy(makeRequest(created.key), "cx/gpt-5.5");

  assert.ok(result.rejection, "should produce a rejection Response for raw model name");
  assert.equal(result.rejection.status, 403, "rejection should be 403 Forbidden");

  const body = await readBody(result.rejection);
  assert.equal(body.error.code, "QUOTA_ONLY", "error code should be QUOTA_ONLY");
  assert.match(
    body.error.message,
    /quota-exclusive API key may only use quotaShared-\* models/,
    "error message should indicate only quotaShared-* models are allowed"
  );
  assert.ok(!body.error.message.includes(" at "), "message must not contain stack trace");
});

test("quota-only key requesting a quotaShared-* model from a different pool is rejected 403 QUOTA_ONLY", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "quota-b4-codex-conn-otherpool",
    apiKey: "sk-codex-b4-otherpool",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "Times" });

  const created = await apiKeysDb.createApiKey("Quota-B4 Key Other Pool", "machine-b4-other");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedQuotas: [pool.id],
  });

  const policy = await loadPolicy("b4-quota-otherpool-rejected");

  // qtSd/ for a DIFFERENT pool slug ("otherpool") — must be rejected
  const otherPoolVirtualModel = quotaModelName("OtherPool", "codex", "gpt-5.5");
  assert.equal(otherPoolVirtualModel, "qtSd/otherpool/codex/gpt-5.5");

  const result = await policy.enforceApiKeyPolicy(makeRequest(created.key), otherPoolVirtualModel);

  assert.ok(result.rejection, "should produce a rejection Response for other-pool quotaShared-* model");
  assert.equal(result.rejection.status, 403, "rejection should be 403 Forbidden");

  const body = await readBody(result.rejection);
  assert.equal(body.error.code, "QUOTA_ONLY", "error code should be QUOTA_ONLY");
  assert.match(
    body.error.message,
    /not in this key's quota pools/,
    "error message should mention quota pools"
  );
  assert.ok(!body.error.message.includes(" at "), "message must not contain stack trace");
});

test("key with empty allowedQuotas is subject to normal model restriction checks", async () => {
  // A key with no allowedQuotas but with allowedModels = ["openai/gpt-4.1"]
  const created = await apiKeysDb.createApiKey("Normal Key", "machine-b4-normal");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedModels: ["openai/gpt-4.1"],
  });

  const policy = await loadPolicy("b4-quota-empty-normal");

  // Allowed model should pass
  const allowed = await policy.enforceApiKeyPolicy(makeRequest(created.key), "openai/gpt-4.1");
  assert.equal(
    allowed.rejection,
    null,
    "model in allowedModels should pass for a non-quota key"
  );

  // Disallowed model should be rejected via the normal allowedModels path
  const blocked = await policy.enforceApiKeyPolicy(makeRequest(created.key), "anthropic/claude-3-7-sonnet");
  assert.ok(blocked.rejection, "disallowed model should be rejected");
  assert.equal(blocked.rejection.status, 403);

  const body = await readBody(blocked.rejection);
  assert.match(body.error.message, /not allowed for this API key/);
  // The code for this case comes from errorConfig (403 → "insufficient_quota")
  // rather than QUOTA_ONLY — confirming paths are separate
  assert.notEqual(body.error.code, "QUOTA_ONLY", "normal key rejection must NOT use QUOTA_ONLY code");
});

test("quota-only key whose allowedQuotas references a non-existent pool is rejected 403 QUOTA_ONLY (fail-closed)", async () => {
  // Create an API key bound to a pool ID that does not exist in the DB (dangling reference)
  const created = await apiKeysDb.createApiKey("Dangling Quota Key", "machine-b4-dangling");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedQuotas: ["non-existent-pool-id-00000000"],
  });

  const policy = await loadPolicy("b4-quota-dangling-pool");

  // resolveQuotaKeyScope will return empty scope for the dangling pool id → fail-closed
  // A raw model name will also be rejected by the "raw model" branch
  const result = await policy.enforceApiKeyPolicy(makeRequest(created.key), "openai/gpt-4.1");

  assert.ok(result.rejection, "should produce a rejection Response for a dangling pool");
  assert.equal(result.rejection.status, 403, "rejection should be 403 Forbidden");

  const body = await readBody(result.rejection);
  assert.equal(body.error.code, "QUOTA_ONLY", "error code should be QUOTA_ONLY");
  assert.ok(!body.error.message.includes(" at "), "message must not contain stack trace");
});
