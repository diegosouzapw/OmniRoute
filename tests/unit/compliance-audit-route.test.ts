import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compliance-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const auditRoute = await import("../../src/app/api/compliance/audit-log/route.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("compliance audit route keeps array payloads and exposes total count with structured filters", async () => {
  compliance.initAuditLog();
  compliance.logAuditEvent({
    action: "auth.login.success",
    actor: "admin",
    resourceType: "auth_session",
    status: "success",
    requestId: "req-login-1",
    ipAddress: "203.0.113.5",
    createdAt: "2026-04-14T12:00:00.000Z",
  });
  compliance.logAuditEvent({
    action: "provider.validation.ssrf_blocked",
    actor: "admin",
    target: "provider-node",
    resourceType: "provider_validation",
    status: "blocked",
    requestId: "req-validation-1",
    metadata: {
      route: "/api/provider-nodes/validate",
      baseUrl: "http://127.0.0.1:11434/v1",
    },
    createdAt: "2026-04-14T13:00:00.000Z",
  });

  const response = await auditRoute.GET(
    new Request(
      "http://localhost/api/compliance/audit-log?resourceType=provider_validation&status=blocked&requestId=req-validation-1&limit=10&offset=0"
    )
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-total-count"), "1");
  assert.equal(response.headers.get("x-page-limit"), "10");
  const payload = (await response.json()) as any;
  assert.equal(Array.isArray(payload), true);
  assert.equal(payload.length, 1);
  assert.equal(payload[0].action, "provider.validation.ssrf_blocked");
  assert.equal(payload[0].resourceType, "provider_validation");
  assert.equal(payload[0].requestId, "req-validation-1");
});
