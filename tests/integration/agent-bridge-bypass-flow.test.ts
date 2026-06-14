/**
 * Integration tests: AgentBridge bypass patterns flow
 *
 * Covers:
 *   - POST  /api/tools/agent-bridge/bypass  → stores user patterns
 *   - GET   /api/tools/agent-bridge/bypass  → shows default + user patterns
 *   - DELETE /api/tools/agent-bridge/bypass?pattern=X  → removes a pattern
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ab-bypass-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { seedDefaultBypassPatterns } = await import("../../src/lib/db/agentBridgeBypass.ts");
const bypassRoute = await import("../../src/app/api/tools/agent-bridge/bypass/route.ts");

const DEFAULT_PATTERNS = [".bank.", ".gov.", "okta.com", "auth0.com"];

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
  seedDefaultBypassPatterns(DEFAULT_PATTERNS);
});

test.after(() => {
  try { fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }); } catch { /* noop */ }
});

// ── POST patterns ──────────────────────────────────────────────────────────

test("POST /bypass: stores user patterns", async () => {
  const res = await bypassRoute.POST(
    new Request("http://localhost/api/tools/agent-bridge/bypass", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ patterns: ["*.mycompany.com", "internal.corp"] }),
    })
  );
  assert.equal(res.status, 200);
  const body = await res.json() as { ok: boolean; patterns: Array<{ pattern: string; source: string }> };
  assert.equal(body.ok, true);
  assert.ok(Array.isArray(body.patterns));
  const userPatterns = body.patterns.filter((p) => p.source === "user");
  assert.equal(userPatterns.length, 2);
});

test("POST /bypass: invalid body returns 400", async () => {
  const res = await bypassRoute.POST(
    new Request("http://localhost/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ patterns: "not-an-array" }),
    })
  );
  assert.equal(res.status, 400);
  const body = await res.json() as Record<string, unknown>;
  const errMsg = (body.error as Record<string, unknown>)?.message as string;
  assert.ok(!errMsg.includes("at /"), "stack trace leaked in 400 error");
});

// ── GET patterns ───────────────────────────────────────────────────────────

test("GET /bypass: shows default + user patterns", async () => {
  // Add user patterns first
  await bypassRoute.POST(
    new Request("http://localhost/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ patterns: ["*.mycompany.com"] }),
    })
  );

  const res = await bypassRoute.GET();
  assert.equal(res.status, 200);
  const body = await res.json() as { patterns: Array<{ pattern: string; source: string }> };
  assert.ok(Array.isArray(body.patterns));

  const sources = new Set(body.patterns.map((p) => p.source));
  assert.ok(sources.has("default"), "No default patterns in response");
  assert.ok(sources.has("user"), "No user patterns in response");

  const defaultPatterns = body.patterns.filter((p) => p.source === "default");
  assert.ok(defaultPatterns.length >= DEFAULT_PATTERNS.length);
});

test("GET /bypass: error response does not leak stack trace", async () => {
  const res = await bypassRoute.GET();
  const text = await res.text();
  assert.ok(!text.includes("at /"), "stack trace leaked in GET /bypass response");
});

// ── DELETE pattern ─────────────────────────────────────────────────────────

test("DELETE /bypass?pattern=X: removes a user pattern", async () => {
  // Add two patterns
  await bypassRoute.POST(
    new Request("http://localhost/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ patterns: ["*.mycompany.com", "internal.corp"] }),
    })
  );

  // Delete one
  const deleteRes = await bypassRoute.DELETE(
    new Request("http://localhost/api/tools/agent-bridge/bypass?pattern=internal.corp", {
      method: "DELETE",
    })
  );
  assert.equal(deleteRes.status, 200);
  const deleteBody = await deleteRes.json() as { ok: boolean; patterns: Array<{ pattern: string; source: string }> };
  assert.equal(deleteBody.ok, true);

  // Verify it's gone
  const remaining = deleteBody.patterns.filter(
    (p) => p.source === "user" && p.pattern === "internal.corp"
  );
  assert.equal(remaining.length, 0, "Deleted pattern still present");

  // Other pattern still present
  const kept = deleteBody.patterns.filter(
    (p) => p.source === "user" && p.pattern === "*.mycompany.com"
  );
  assert.equal(kept.length, 1, "Remaining user pattern is missing");
});

test("DELETE /bypass: missing pattern param returns 400", async () => {
  const res = await bypassRoute.DELETE(
    new Request("http://localhost/api/tools/agent-bridge/bypass", {
      method: "DELETE",
    })
  );
  assert.equal(res.status, 400);
  const body = await res.json() as Record<string, unknown>;
  const errMsg = (body.error as Record<string, unknown>)?.message as string;
  assert.ok(!errMsg.includes("at /"), "stack trace leaked in DELETE 400");
});

test("DELETE /bypass?pattern=X: no-op when pattern not in user list", async () => {
  const res = await bypassRoute.DELETE(
    new Request(
      "http://localhost/api/tools/agent-bridge/bypass?pattern=not-in-list.com",
      { method: "DELETE" }
    )
  );
  assert.equal(res.status, 200);
  const body = await res.json() as { ok: boolean };
  assert.equal(body.ok, true);
});
