/**
 * #7623 — auto-combo candidate pool must honor existing model lockouts so
 * repeatedly failing no-auth models (e.g. opencode 401) are not re-advertised.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7623-noauth-lockout-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");

async function resetStorage() {
  core.resetDbInstance();
  accountFallback.clearAllModelLockouts();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("#7623: a model-locked no-auth opencode model is ABSENT from the auto-combo candidate pool", async () => {
  accountFallback.lockModel("opencode", "noauth", "mimo-v2.5-free", "model_not_found", 60_000);

  const combo = await virtualFactory.createVirtualAutoCombo(undefined);
  const modelStrings = combo.models.map((m: { model: string }) => m.model);

  assert.ok(
    !modelStrings.some((model: string) => model.endsWith("/mimo-v2.5-free")),
    "BUG #7623: locked no-auth model must not appear in auto-combo pool. Pool: " +
      JSON.stringify(modelStrings)
  );
});

test("#7623: sibling no-auth models stay in the pool when only one model is locked", async () => {
  accountFallback.lockModel("opencode", "noauth", "mimo-v2.5-free", "model_not_found", 60_000);

  const combo = await virtualFactory.createVirtualAutoCombo(undefined);
  const modelStrings = combo.models.map((m: { model: string }) => m.model);

  assert.ok(
    modelStrings.some((model: string) => model.endsWith("/big-pickle")),
    `healthy sibling model must remain in pool. Pool: ${JSON.stringify(modelStrings)}`
  );
});

test("#7623: credentialed provider drops a connection from allowedConnectionIds when that model is locked", async () => {
  const tokenExpiresAt = new Date(Date.now() + 60_000).toISOString();
  const locked = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "locked@example.com",
    accessToken: "fake-token-locked",
    tokenExpiresAt,
  });
  const healthy = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "healthy@example.com",
    accessToken: "fake-token-healthy",
    tokenExpiresAt,
  });

  const lockedModel = "claude-sonnet-4-6";
  accountFallback.lockModel("antigravity", locked.id, lockedModel, "rate_limited", 60_000);

  const combo = await virtualFactory.createVirtualAutoCombo(undefined);
  const candidate = combo.models.find(
    (m: { model: string }) => m.model === `antigravity/${lockedModel}`
  ) as { allowedConnectionIds?: string[] } | undefined;

  assert.ok(candidate, `expected antigravity/${lockedModel} logical candidate`);
  assert.deepEqual(
    [...(candidate.allowedConnectionIds ?? [])].sort(),
    [healthy.id].sort(),
    "locked connection must be removed from allowedConnectionIds"
  );
  assert.ok(
    !(candidate.allowedConnectionIds ?? []).includes(locked.id),
    "locked connection must not remain eligible"
  );
});
