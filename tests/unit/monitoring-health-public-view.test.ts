/**
 * GHSA-mvf8-qc78-5mxm — GET /api/monitoring/health returned host-fingerprinting
 * detail (version, node version, pid, memory, provider config) to anonymous
 * callers. It now serves only the liveness verdict to non-management callers.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-health-view-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/monitoring/health/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("anonymous health GET is reduced to liveness only (GHSA-mvf8)", async () => {
  const res = await route.GET(new Request("http://localhost/api/monitoring/health") as never);
  const body = (await res.json()) as Record<string, unknown>;
  assert.ok("status" in body, "liveness status must be present for probes");
  // No host fingerprinting for an anonymous caller.
  const keys = Object.keys(body);
  const allowed = new Set(["status", "setupComplete"]);
  for (const k of keys) {
    assert.ok(allowed.has(k), `anonymous health view leaked field: ${k}`);
  }
});

test("management session sees the full health payload", async () => {
  const sessionReq = (await makeManagementSessionRequest(
    "http://localhost/api/monitoring/health"
  )) as unknown as NextRequest;
  const res = await route.GET(sessionReq as never);
  const body = (await res.json()) as Record<string, unknown>;
  assert.ok(
    Object.keys(body).length > 2,
    "a management caller must still receive the detailed payload"
  );
});

/**
 * The local CLI reaches this PUBLIC-classified route with the machine
 * token, which `runAuthzPipeline` converts into the trusted subject stamp below
 * (the raw header is always stripped). The full payload — `version` in
 * particular — is what check:pack-boot asserts on the packed tarball, so pin the
 * stamped contract here.
 */
test("a stamped local-CLI caller receives the full payload including version", async () => {
  const pkgVersion = JSON.parse(
    fs.readFileSync(new URL("../../package.json", import.meta.url), "utf8")
  ).version;
  const res = await route.GET(
    new Request("http://localhost/api/monitoring/health", {
      headers: {
        "x-omniroute-auth-kind": "management_key",
        "x-omniroute-auth-label": "local-cli-token",
      },
    }) as never
  );
  const body = (await res.json()) as Record<string, unknown>;
  assert.equal(res.status, 200);
  assert.equal(body.version, pkgVersion);
});
