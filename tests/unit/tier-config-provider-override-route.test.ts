/**
 * Regression test for #7818 — a custom provider (or any provider) can be
 * pinned to a routing tier through the new /api/settings/tier-config route.
 *
 * Before this route existed, the DB-backed `providerOverrides` mechanism in
 * `classifyTier()` was reachable in code but had no HTTP surface — this test
 * exercises the route module directly (GET/PUT) against a real, isolated
 * SQLite test DB, per the `tests/unit/model-aliases-settings-route-selfheal.test.ts`
 * convention (isolated DATA_DIR + resetDbInstance in beforeEach/after).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tier-config-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/settings/tier-config/route.ts");

function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
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

function getRequest() {
  return new Request("http://localhost/api/settings/tier-config");
}

test("PUT sets a tier override for a custom (non-registry) provider id, and GET returns it", async () => {
  const customProviderId = "my-custom-endpoint-123";

  const putRes = (await route.PUT(
    putRequest({ provider: customProviderId, tier: "premium" })
  )) as Response;
  assert.equal(putRes.status, 200, "PUT should succeed");
  const putBody = await putRes.json();
  assert.deepEqual(
    putBody.providerOverrides,
    [{ provider: customProviderId, tier: "premium" }],
    "PUT response should reflect the new override"
  );

  const getRes = (await route.GET(getRequest())) as Response;
  assert.equal(getRes.status, 200);
  const getBody = await getRes.json();
  assert.deepEqual(
    getBody.providerOverrides,
    [{ provider: customProviderId, tier: "premium" }],
    "GET should return the persisted override — proves the custom provider gap in #7818 is closed"
  );
});

test("PUT with tier: null clears an existing override without touching others", async () => {
  await route.PUT(putRequest({ provider: "custom-a", tier: "cheap" }));
  await route.PUT(putRequest({ provider: "custom-b", tier: "free" }));

  const clearRes = (await route.PUT(putRequest({ provider: "custom-a", tier: null }))) as Response;
  assert.equal(clearRes.status, 200);
  const body = await clearRes.json();
  assert.deepEqual(
    body.providerOverrides,
    [{ provider: "custom-b", tier: "free" }],
    "clearing custom-a should leave custom-b's override untouched"
  );
});

test("PUT with an invalid tier value is rejected with 400", async () => {
  const res = (await route.PUT(putRequest({ provider: "custom-a", tier: "gold" }))) as Response;
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(body.error, "should return a structured error body");
  assert.ok(
    !JSON.stringify(body).includes("at /"),
    "error body must not leak a stack trace (ERROR_SANITIZATION.md)"
  );
});

test("PUT with an empty provider string is rejected with 400", async () => {
  const res = (await route.PUT(putRequest({ provider: "", tier: "free" }))) as Response;
  assert.equal(res.status, 400);
});

test("route round-trips cleanly against an already-populated tier_config table (no migration involved, #7818)", async () => {
  // Simulate an existing installation whose tier_config row was already
  // written by migration 059 (or a prior save) before this PR — this PR adds
  // no schema change, so GET/PUT must work unmodified against that row.
  const { saveTierConfig } = await import("../../src/lib/db/tierConfig.ts");
  const { DEFAULT_TIER_CONFIG } = await import("../../open-sse/services/tierConfig.ts");
  saveTierConfig({
    ...DEFAULT_TIER_CONFIG,
    providerOverrides: [{ provider: "pre-existing-provider", tier: "cheap" }],
  });

  const getRes = (await route.GET(getRequest())) as Response;
  assert.equal(getRes.status, 200);
  const getBody = await getRes.json();
  assert.ok(Array.isArray(getBody.freeProviders), "should still expose the DEFAULT_TIER_CONFIG shape");
  assert.deepEqual(getBody.providerOverrides, [{ provider: "pre-existing-provider", tier: "cheap" }]);

  const putRes = (await route.PUT(
    putRequest({ provider: "my-custom-endpoint-999", tier: "free" })
  )) as Response;
  assert.equal(putRes.status, 200, "PUT should round-trip without error against a pre-populated row");
  const putBody = await putRes.json();
  assert.deepEqual(putBody.providerOverrides, [
    { provider: "pre-existing-provider", tier: "cheap" },
    { provider: "my-custom-endpoint-999", tier: "free" },
  ]);
});
