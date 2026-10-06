/**
 * Regression test for PR #10571 — bare "big-pickle" / "*-free" model ids must
 * keep routing to an opencode-family provider (opencode / opencode-zen) when
 * an opencode connection is active, even if the live-synced catalog for that
 * connection is temporarily stale/incomplete and would otherwise exclude it
 * during the normal live-catalog reconciliation step.
 *
 * This also regression-guards a bug found while writing this test: the
 * short-circuit as originally shipped checked `activeProviders?.has("opencode")`
 * literally. `getActiveProviderSet()` canonicalizes every connection's
 * provider id through `resolveProviderAlias()`, and a manual override in
 * `open-sse/services/model.ts` (`ALIAS_TO_PROVIDER_ID["opencode"] =
 * "opencode-zen"`) rewrites any "opencode" id to "opencode-zen" before it
 * ever reaches the active set — so a real active no-auth "opencode"
 * connection NEVER appears as "opencode" in `activeProviders`, making the
 * literal check unreachable. The fix checks every opencode-family candidate
 * (`opencode` and `opencode-zen`) that actually catalogs the model id.
 *
 * Without the short-circuit (or with the original unreachable literal
 * check), an active opencode connection + active opencode-zen connection
 * both carrying a synced catalog that omits "big-pickle" makes
 * `getModelInfoCore("big-pickle", null)` return
 * `{ provider: null, errorType: "model_not_found" }` instead of routing to
 * opencode — this test proves the short-circuit prevents exactly that.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-opencode-free-routing-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { getModelInfoCore } = await import("../../open-sse/services/model.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("bare big-pickle routes to an opencode-family provider when an opencode connection is active", async () => {
  await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "apikey",
    name: "opencode-active-big-pickle",
    isActive: true,
    testStatus: "unknown",
  });

  const info = await getModelInfoCore("big-pickle", null);
  assert.ok(
    info.provider === "opencode" || info.provider === "opencode-zen",
    `expected an opencode-family provider, got ${info.provider}`
  );
  assert.equal(info.model, "big-pickle");
});

test("bare deepseek-v4-flash-free (-free suffix) routes to an opencode-family provider when active", async () => {
  await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "apikey",
    name: "opencode-active-free-suffix",
    isActive: true,
    testStatus: "unknown",
  });

  const info = await getModelInfoCore("deepseek-v4-flash-free", null);
  assert.ok(
    info.provider === "opencode" || info.provider === "opencode-zen",
    `expected an opencode-family provider, got ${info.provider}`
  );
  assert.equal(info.model, "deepseek-v4-flash-free");
});

test("big-pickle still resolves to opencode when BOTH opencode + opencode-zen connections are active but their synced catalogs are stale and omit big-pickle [core regression]", async () => {
  const connOc = await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "apikey",
    name: "opencode-stale-catalog",
    isActive: true,
    testStatus: "unknown",
  });
  const connZen = await providersDb.createProviderConnection({
    provider: "opencode-zen",
    authType: "apikey",
    name: "opencode-zen-stale-catalog",
    isActive: true,
    testStatus: "unknown",
  });

  // Simulate a live catalog sync that is stale/incomplete for both
  // connections — neither includes "big-pickle" — which would otherwise
  // make the live-catalog reconciliation step EXCLUDE both providers.
  await modelsDb.replaceSyncedAvailableModelsForConnection("opencode", connOc.id, [
    { id: "some-other-model", name: "Some Other Model" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("opencode-zen", connZen.id, [
    { id: "some-other-model-2", name: "Some Other Model 2" },
  ]);

  const info = await getModelInfoCore("big-pickle", null);
  assert.notEqual(
    info.provider,
    null,
    "the free-tier short-circuit must bypass live-catalog exclusion for big-pickle/-free ids"
  );
  assert.ok(
    info.provider === "opencode" || info.provider === "opencode-zen",
    `expected an opencode-family provider, got ${info.provider}`
  );
  assert.equal(info.model, "big-pickle");
  assert.equal(
    "errorType" in info ? info.errorType : undefined,
    undefined,
    "must not return a model_not_found error"
  );
});
