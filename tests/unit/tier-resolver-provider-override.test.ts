/**
 * Regression test for #7818 — after a caller sets a provider-tier override
 * through the new /api/settings/tier-config route, `classifyTier()` must pick
 * it up immediately (the route calls `setTierConfig()` to bust the in-process
 * routing cache — this test asserts that cache-bust actually matters, not
 * just that the override array is stored).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tier-resolver-override-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/settings/tier-config/route.ts");
const tierResolver = await import("../../open-sse/services/tierResolver.ts");

function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // classifyTier() caches by provider::model — reset the routing-side config
  // too so tests don't leak assignments across each other.
  tierResolver.setTierConfig(null);
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function putRequest(body: unknown) {
  return new Request("http://localhost/api/settings/tier-config", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("classifyTier() honors a provider override set via the route, for a custom provider id", async () => {
  const customProviderId = "my-custom-endpoint-456";
  const model = "some-model";

  // Before the override: cost-based classification applies (no override yet).
  const before = tierResolver.classifyTier(customProviderId, model);
  assert.notEqual(
    before.reason.includes("Provider-level override"),
    true,
    "should not be an override-based assignment before the PUT"
  );

  const putRes = (await route.PUT(
    putRequest({ provider: customProviderId, tier: "premium" })
  )) as Response;
  assert.equal(putRes.status, 200);

  // After the override: classifyTier() must reflect it on the very next call
  // for a *different* model (classifyTier caches by provider::model, so we
  // use a fresh model key to prove the override — not a stale per-key cache
  // entry — drives the result).
  const after = tierResolver.classifyTier(customProviderId, `${model}-2`);
  assert.equal(after.tier, "premium", "classifyTier should honor the newly-set override");
  assert.ok(
    after.reason.includes("Provider-level override"),
    "reason should reflect the provider-level override path"
  );
});

test("clearing an override via PUT falls back to cost-based classification again", async () => {
  const customProviderId = "my-custom-endpoint-789";

  await route.PUT(putRequest({ provider: customProviderId, tier: "free" }));
  const withOverride = tierResolver.classifyTier(customProviderId, "model-a");
  assert.equal(withOverride.tier, "free");

  await route.PUT(putRequest({ provider: customProviderId, tier: null }));
  const afterClear = tierResolver.classifyTier(customProviderId, "model-b");
  assert.notEqual(
    afterClear.reason.includes("Provider-level override"),
    true,
    "after clearing, classification should fall back to cost-based logic"
  );
});
