import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { FREE_CATALOG_CURATED_AT } from "@omniroute/open-sse/config/freeModelCatalog.data.ts";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-freetier-route-"));

const { GET } = await import("../../src/app/api/free-tier/summary/route.ts");

test("GET /api/free-tier/summary returns per-model totals and headline", async () => {
  const res = await GET(new Request("http://localhost/api/free-tier/summary"));
  assert.equal(res.status, 200);
  const body = await res.json();
  // Per-model catalog fields (supersedes per-provider documentedMonthlyTokens/providerCount/byProvider)
  assert.ok(body.steadyRecurringTokens >= 1_000_000_000);
  assert.ok(body.firstMonthRealisticTokens >= body.steadyRecurringTokens);
  assert.ok(Array.isArray(body.perModel) && body.perModel.length >= 400);
  assert.match(body.headline, /free tokens\/month/);
  assert.ok(!JSON.stringify(body).includes("at /")); // no stack-trace leak
});

test("summary returns per-model totals, used-this-month and remaining", async () => {
  const res = await GET(new Request("http://localhost/api/free-tier/summary"));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(body.steadyRecurringTokens >= 1_000_000_000);
  assert.ok(body.firstMonthRealisticTokens >= body.steadyRecurringTokens);
  assert.ok(Array.isArray(body.perModel) && body.perModel.length >= 400);
  assert.equal(typeof body.usedThisMonth, "number");
  assert.equal(body.remaining, Math.max(0, body.steadyRecurringTokens - body.usedThisMonth));
  assert.ok(!JSON.stringify(body).includes("at /")); // no stack-trace leak
});

test("summary surfaces the uncapped providers and the deposit-unlock boost", async () => {
  const res = await GET(new Request("http://localhost/api/free-tier/summary"));
  const body = await res.json();
  assert.ok(Array.isArray(body.uncappedProviders) && body.uncappedProviders.length >= 3);
  assert.equal(typeof body.boostMonthlyTokens, "number");
  assert.ok(body.boostMonthlyTokens >= 24_000_000);
  // the boost is reported, not folded into steady
  assert.ok(body.boostMonthlyTokens < body.steadyRecurringTokens);
});

test("GET /api/free-tier/summary excludeTosAvoid filters models", async () => {
  const res = await GET(new Request("http://localhost/api/free-tier/summary?excludeTosAvoid=1"));
  assert.equal(res.status, 200);
  const body = await res.json();
  // With tos-avoid excluded, modelCount must still be positive
  assert.ok(body.modelCount >= 1);
  assert.equal(typeof body.usedThisMonth, "number");
});

test("summary reports the catalog curation date, not a build timestamp", async () => {
  const res = await GET(new Request("http://localhost/api/free-tier/summary"));
  const body = await res.json();

  // Must be the hand-maintained constant, never a file mtime: a standalone
  // build rewrites timestamps on deploy, which would advertise a stale catalog
  // as freshly updated.
  assert.equal(body.catalogUpdatedAt, FREE_CATALOG_CURATED_AT);
  assert.ok(!Number.isNaN(Date.parse(body.catalogUpdatedAt)), "must be a parsable date");
  assert.ok(
    Date.parse(body.catalogUpdatedAt) <= Date.now(),
    "curation date cannot be in the future"
  );
});
