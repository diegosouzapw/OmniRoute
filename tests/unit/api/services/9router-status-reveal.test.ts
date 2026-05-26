/**
 * Tests for GET /api/services/9router/status?reveal=key (R-01)
 *
 * - Without ?reveal: returns only masked key
 * - With ?reveal=key but missing X-Reveal-Confirm: returns 403
 * - With ?reveal=key and X-Reveal-Confirm: yes: returns apiKeyPlain + logs audit
 */

import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9router-reveal-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// Bootstrap DB and seed service row
const core = await import("../../../../src/lib/db/core.ts");
const db = core.getDbInstance();

db.prepare(
  `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
   VALUES ('9router', 'stopped', 20130, 0, 1, 1)`
).run();

const { updateVersionManagerTool } = await import("../../../../src/lib/db/versionManager.ts");
await updateVersionManagerTool("9router", {
  installedVersion: "0.4.59",
  status: "stopped",
});

// Ensure audit_log table exists (compliance init)
const { initAuditLog, countAuditLog } = await import("../../../../src/lib/compliance/index.ts");
initAuditLog();

// Import GET after env is set
const { GET } =
  await import("../../../../src/app/api/services/9router/status/route.ts?t=reveal-suite");

function makeRequest(url: string, headers?: Record<string, string>): Request {
  return new Request(url, { headers });
}

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

describe("GET /api/services/9router/status", () => {
  it("without ?reveal returns only masked key (no plain)", async () => {
    const req = makeRequest("http://localhost/api/services/9router/status");
    const res = await GET(req);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok("apiKeyMasked" in body, "should have apiKeyMasked");
    assert.ok(!("apiKeyPlain" in body), "should NOT have apiKeyPlain");
  });

  it("?reveal=key without X-Reveal-Confirm returns 403", async () => {
    const req = makeRequest("http://localhost/api/services/9router/status?reveal=key");
    const res = await GET(req);
    assert.equal(res.status, 403);
    const body = await res.json();
    assert.ok(
      body.error?.message?.toLowerCase().includes("confirm") ||
        body.error?.message?.toLowerCase().includes("header") ||
        body.message?.toLowerCase().includes("confirm") ||
        String(body).toLowerCase().includes("confirm"),
      `body should mention confirmation: ${JSON.stringify(body)}`
    );
  });

  it("?reveal=key with wrong X-Reveal-Confirm value returns 403", async () => {
    const req = makeRequest("http://localhost/api/services/9router/status?reveal=key", {
      "X-Reveal-Confirm": "no",
    });
    const res = await GET(req);
    assert.equal(res.status, 403);
  });

  it("?reveal=key with X-Reveal-Confirm: yes returns apiKeyPlain", async () => {
    const req = makeRequest("http://localhost/api/services/9router/status?reveal=key", {
      "X-Reveal-Confirm": "yes",
    });
    const res = await GET(req);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(typeof body.apiKeyPlain === "string", "should have apiKeyPlain string");
    assert.ok(body.apiKeyPlain.startsWith("nr_"), "plain key should start with nr_");
    // masked should also be present
    assert.ok("apiKeyMasked" in body, "should still have apiKeyMasked");
  });

  it("reveal logs an audit entry with action=service.reveal_api_key", async () => {
    const countBefore = countAuditLog({ action: "service.reveal_api_key" });

    const req = makeRequest("http://localhost/api/services/9router/status?reveal=key", {
      "X-Reveal-Confirm": "yes",
    });
    const res = await GET(req);
    assert.equal(res.status, 200);

    const countAfter = countAuditLog({ action: "service.reveal_api_key" });
    assert.equal(
      countAfter,
      countBefore + 1,
      `audit entries should increase by 1 (was ${countBefore}, now ${countAfter})`
    );
  });

  it("plain key is different from masked key (not trivially masked)", async () => {
    const req = makeRequest("http://localhost/api/services/9router/status?reveal=key", {
      "X-Reveal-Confirm": "yes",
    });
    const res = await GET(req);
    const body = await res.json();
    assert.notEqual(body.apiKeyPlain, body.apiKeyMasked, "plain and masked should differ");
    assert.ok(
      body.apiKeyPlain.length > body.apiKeyMasked.length ||
        !body.apiKeyMasked.includes(body.apiKeyPlain),
      "masked should not contain the full plain key"
    );
  });
});
