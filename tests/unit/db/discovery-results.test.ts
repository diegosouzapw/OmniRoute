import { describe, test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Isolate the DB into a throwaway DATA_DIR so migrations run against a fresh file.
let tmpDataDir: string;
let mod: typeof import("@/lib/db/discoveryResults");
let core: typeof import("@/lib/db/core");

before(async () => {
  tmpDataDir = mkdtempSync(join(tmpdir(), "omniroute-discovery-"));
  process.env.DATA_DIR = tmpDataDir;
  core = await import("@/lib/db/core");
  core.resetDbInstance();
  // Touch the instance so migrations (incl. 074_discovery_results) apply.
  core.getDbInstance();
  mod = await import("@/lib/db/discoveryResults");
});

after(() => {
  core.resetDbInstance();
  if (tmpDataDir) rmSync(tmpDataDir, { recursive: true, force: true });
});

describe("discoveryResults DB module", () => {
  test("upsert inserts a new row and returns it with an id", () => {
    const row = mod.upsertDiscoveryResult({
      providerId: "acme",
      method: "free_tier",
      authType: "none",
      feasibility: 4,
      riskLevel: "low",
      status: "pending",
      models: ["acme-large", "acme-small"],
      endpoint: "https://acme.example/api",
    });
    assert.ok(typeof row.id === "number" && row.id > 0);
    assert.equal(row.providerId, "acme");
    assert.deepEqual(row.models, ["acme-large", "acme-small"]);
    assert.equal(row.status, "pending");
  });

  test("upsert on the same (provider, method, endpoint) updates instead of duplicating", () => {
    const first = mod.upsertDiscoveryResult({
      providerId: "beta",
      method: "web_cookie",
      authType: "cookie",
      feasibility: 3,
      riskLevel: "medium",
      status: "pending",
      endpoint: "https://beta.example/chat",
    });
    const second = mod.upsertDiscoveryResult({
      providerId: "beta",
      method: "web_cookie",
      authType: "cookie",
      feasibility: 5,
      riskLevel: "medium",
      status: "testing",
      endpoint: "https://beta.example/chat",
    });
    assert.equal(second.id, first.id);
    assert.equal(second.feasibility, 5);
    assert.equal(second.status, "testing");
    const all = mod.getDiscoveryResults("beta");
    assert.equal(all.length, 1);
  });

  test("getDiscoveryResults filters by providerId and returns all when omitted", () => {
    const beta = mod.getDiscoveryResults("beta");
    assert.ok(beta.every((r) => r.providerId === "beta"));
    const all = mod.getDiscoveryResults();
    assert.ok(all.length >= 2);
  });

  test("getDiscoveryResultById returns the row or null", () => {
    const created = mod.upsertDiscoveryResult({
      providerId: "gamma",
      method: "trial",
      authType: "api_key",
      feasibility: 2,
      riskLevel: "low",
      status: "pending",
    });
    const found = mod.getDiscoveryResultById(created.id!);
    assert.equal(found?.providerId, "gamma");
    assert.equal(mod.getDiscoveryResultById(999999), null);
  });

  test("markVerified sets status=verified and stamps verified_at", () => {
    const created = mod.upsertDiscoveryResult({
      providerId: "delta",
      method: "public_api",
      authType: "api_key",
      feasibility: 5,
      riskLevel: "none",
      status: "pending",
    });
    const updated = mod.markVerified(created.id!);
    assert.equal(updated?.status, "verified");
    assert.ok(updated?.verifiedAt);
  });

  test("markVerified on a missing id returns null", () => {
    assert.equal(mod.markVerified(999999), null);
  });

  test("deleteDiscoveryResult removes the row and returns true, false if absent", () => {
    const created = mod.upsertDiscoveryResult({
      providerId: "epsilon",
      method: "free_tier",
      authType: "none",
      feasibility: 1,
      riskLevel: "none",
      status: "pending",
    });
    assert.equal(mod.deleteDiscoveryResult(created.id!), true);
    assert.equal(mod.getDiscoveryResultById(created.id!), null);
    assert.equal(mod.deleteDiscoveryResult(created.id!), false);
  });
});

describe("discovery service reporter delegation", () => {
  test("persistDiscoveryResult writes through and getDiscoveryResults reads it back", async () => {
    const svc = await import("@/lib/discovery/index");
    const saved = svc.persistDiscoveryResult({
      providerId: "zeta",
      method: "public_api",
      authType: "api_key",
      feasibility: 5,
      riskLevel: "none",
      status: "verified",
      models: ["zeta-1"],
    });
    assert.ok(saved.id! > 0);
    const read = svc.getDiscoveryResults("zeta");
    assert.equal(read.length, 1);
    assert.equal(read[0].providerId, "zeta");
    assert.deepEqual(read[0].models, ["zeta-1"]);
  });
});
