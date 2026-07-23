import { describe, test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Isolated DB + auth disabled so requireManagementAuth passes (no key configured).
let tmpDataDir: string;
let core: typeof import("@/lib/db/core");
let db: typeof import("@/lib/db/discoveryResults");
let resultsRoute: typeof import("@/app/api/discovery/results/route");
let resultByIdRoute: typeof import("@/app/api/discovery/results/[id]/route");
let scanRoute: typeof import("@/app/api/discovery/scan/route");
let verifyRoute: typeof import("@/app/api/discovery/verify/[id]/route");

function req(method: string, url: string, body?: unknown): Request {
  return new Request(`http://localhost${url}`, {
    method,
    headers: { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

before(async () => {
  tmpDataDir = mkdtempSync(join(tmpdir(), "omniroute-discovery-routes-"));
  process.env.DATA_DIR = tmpDataDir;
  delete process.env.REQUIRE_API_KEY;
  process.env.OMNIROUTE_DISABLE_AUTH = "1";
  core = await import("@/lib/db/core");
  core.resetDbInstance();
  core.getDbInstance();
  db = await import("@/lib/db/discoveryResults");
  resultsRoute = await import("@/app/api/discovery/results/route");
  resultByIdRoute = await import("@/app/api/discovery/results/[id]/route");
  scanRoute = await import("@/app/api/discovery/scan/route");
  verifyRoute = await import("@/app/api/discovery/verify/[id]/route");
});

after(() => {
  core.resetDbInstance();
  if (tmpDataDir) rmSync(tmpDataDir, { recursive: true, force: true });
});

describe("discovery API routes", () => {
  test("GET /results lists persisted findings (and filters by providerId)", async () => {
    db.upsertDiscoveryResult({
      providerId: "acme",
      method: "free_tier",
      authType: "none",
      feasibility: 3,
      riskLevel: "none",
      status: "pending",
    });
    const res = await resultsRoute.GET(req("GET", "/api/discovery/results?providerId=acme"));
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.results));
    assert.ok(body.results.some((r: { providerId: string }) => r.providerId === "acme"));
  });

  test("GET /results/:id returns the row, 404 when missing, 400 on bad id", async () => {
    const created = db.upsertDiscoveryResult({
      providerId: "beta",
      method: "trial",
      authType: "api_key",
      feasibility: 2,
      riskLevel: "low",
      status: "pending",
    });
    const ok = await resultByIdRoute.GET(req("GET", `/api/discovery/results/${created.id}`), {
      params: Promise.resolve({ id: String(created.id) }),
    });
    assert.equal(ok.status, 200);

    const missing = await resultByIdRoute.GET(req("GET", "/api/discovery/results/999999"), {
      params: Promise.resolve({ id: "999999" }),
    });
    assert.equal(missing.status, 404);

    const bad = await resultByIdRoute.GET(req("GET", "/api/discovery/results/abc"), {
      params: Promise.resolve({ id: "abc" }),
    });
    assert.equal(bad.status, 400);
  });

  test("POST /scan persists findings; rejects an empty providerId with 400", async () => {
    const res = await scanRoute.POST(req("POST", "/api/discovery/scan", { providerId: "gamma" }));
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.results) && body.results.length > 0);
    assert.ok(body.results[0].id > 0);
    // the persisted row is now queryable
    assert.ok(db.getDiscoveryResults("gamma").length > 0);

    const invalid = await scanRoute.POST(req("POST", "/api/discovery/scan", { providerId: "" }));
    assert.equal(invalid.status, 400);

    const malformed = new Request("http://localhost/api/discovery/scan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not json",
    });
    const malformedRes = await scanRoute.POST(malformed);
    assert.equal(malformedRes.status, 400);
  });

  test("POST /verify/:id marks verified, 404 when missing", async () => {
    const created = db.upsertDiscoveryResult({
      providerId: "delta",
      method: "public_api",
      authType: "api_key",
      feasibility: 5,
      riskLevel: "none",
      status: "pending",
    });
    const res = await verifyRoute.POST(req("POST", `/api/discovery/verify/${created.id}`), {
      params: Promise.resolve({ id: String(created.id) }),
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.result.status, "verified");

    const missing = await verifyRoute.POST(req("POST", "/api/discovery/verify/999999"), {
      params: Promise.resolve({ id: "999999" }),
    });
    assert.equal(missing.status, 404);
  });

  test("DELETE /results/:id removes the row, 404 on second delete", async () => {
    const created = db.upsertDiscoveryResult({
      providerId: "epsilon",
      method: "free_tier",
      authType: "none",
      feasibility: 1,
      riskLevel: "none",
      status: "pending",
    });
    const first = await resultByIdRoute.DELETE(req("DELETE", `/api/discovery/results/${created.id}`), {
      params: Promise.resolve({ id: String(created.id) }),
    });
    assert.equal(first.status, 200);
    const second = await resultByIdRoute.DELETE(req("DELETE", `/api/discovery/results/${created.id}`), {
      params: Promise.resolve({ id: String(created.id) }),
    });
    assert.equal(second.status, 404);
  });

  test("error responses do not leak stack traces", async () => {
    const missing = await resultByIdRoute.GET(req("GET", "/api/discovery/results/424242"), {
      params: Promise.resolve({ id: "424242" }),
    });
    const body = await missing.json();
    assert.ok(!String(body.error?.message ?? "").includes("at /"));
  });
});
