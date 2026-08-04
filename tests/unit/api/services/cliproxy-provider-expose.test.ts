/**
 * Tests for POST /api/services/cliproxy/provider-expose
 */

import { beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cliproxy-provider-expose-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// Initialise DB first.
const core = await import("../../../../src/lib/db/core.ts");
const { upsertVersionManagerTool, getVersionManagerTool } =
  await import("../../../../src/lib/db/versionManager.ts");

const { POST } = await import("../../../../src/app/api/services/cliproxy/provider-expose/route.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/services/cliproxy/provider-expose", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  resetDb();
});

describe("POST /api/services/cliproxy/provider-expose", () => {
  it("returns 400 for invalid JSON body", async () => {
    const req = new Request("http://localhost/api/services/cliproxy/provider-expose", {
      method: "POST",
      body: "not-json",
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    assert.equal(res.status, 400);
  });

  it("returns 400 when enabled is missing", async () => {
    const req = makeRequest({});
    const res = await POST(req);
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.ok(body?.error?.message ?? body?.message, "should have an error message");
  });

  it("returns 400 when enabled is not a boolean", async () => {
    const req = makeRequest({ enabled: "yes" });
    const res = await POST(req);
    assert.equal(res.status, 400);
  });

  it("sets providerExpose to true and returns 204", async () => {
    await upsertVersionManagerTool({ tool: "cliproxy", status: "stopped" });

    const req = makeRequest({ enabled: true });
    const res = await POST(req);
    assert.equal(res.status, 204);

    const row = await getVersionManagerTool("cliproxy");
    assert.equal(row?.providerExpose, true, "providerExpose should be true in DB");
  });

  it("sets providerExpose to false and returns 204", async () => {
    await upsertVersionManagerTool({ tool: "cliproxy", status: "stopped" });

    await POST(makeRequest({ enabled: true }));
    const res = await POST(makeRequest({ enabled: false }));
    assert.equal(res.status, 204);

    const row = await getVersionManagerTool("cliproxy");
    assert.equal(row?.providerExpose, false, "providerExpose should be false in DB");
  });

  it("error response does not leak stack traces", async () => {
    const req = makeRequest({});
    const res = await POST(req);
    assert.equal(res.status, 400);
    const text = await res.text();
    assert.ok(!text.includes("at /"), "error body must not expose stack trace");
  });
});
