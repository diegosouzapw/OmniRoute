/**
 * Integration tests: AgentBridge model mappings round-trip
 *
 * Covers:
 *   - PUT  /api/tools/agent-bridge/agents/[id]/mappings  — replace mappings
 *   - GET  /api/tools/agent-bridge/agents/[id]/mappings  — read back
 *   - Zod 400 on invalid body
 *   - Error responses do not leak stack traces
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ab-mappings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const mappingsRoute = await import(
  "../../src/app/api/tools/agent-bridge/agents/[id]/mappings/route.ts"
);

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  try { fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }); } catch { /* noop */ }
});

// ── GET (empty) ────────────────────────────────────────────────────────────

test("GET /mappings: returns empty array for new agent", async () => {
  const res = await mappingsRoute.GET(
    new Request("http://localhost/"),
    { params: { id: "copilot" } }
  );
  assert.equal(res.status, 200);
  const body = await res.json() as { mappings: unknown[] };
  assert.ok(Array.isArray(body.mappings));
  assert.equal(body.mappings.length, 0);
});

// ── PUT → GET round-trip ───────────────────────────────────────────────────

test("PUT → GET round-trip: stores and retrieves mappings", async () => {
  const mappings = [
    { source: "gpt-4o", target: "claude-sonnet-4-5" },
    { source: "gpt-4o-mini", target: "claude-haiku-3" },
  ];

  const putRes = await mappingsRoute.PUT(
    new Request("http://localhost/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mappings }),
    }),
    { params: { id: "copilot" } }
  );
  assert.equal(putRes.status, 200);
  const putBody = await putRes.json() as { ok: boolean; mappings: Array<{ agent_id: string; source_model: string; target_model: string }> };
  assert.equal(putBody.ok, true);
  assert.equal(putBody.mappings.length, 2);

  // GET reads back the same data
  const getRes = await mappingsRoute.GET(
    new Request("http://localhost/"),
    { params: { id: "copilot" } }
  );
  assert.equal(getRes.status, 200);
  const getBody = await getRes.json() as { mappings: Array<{ source_model: string; target_model: string }> };
  assert.equal(getBody.mappings.length, 2);

  const sources = getBody.mappings.map((m) => m.source_model).sort();
  assert.deepEqual(sources, ["gpt-4o", "gpt-4o-mini"]);

  const targets = getBody.mappings.map((m) => m.target_model).sort();
  assert.deepEqual(targets, ["claude-haiku-3", "claude-sonnet-4-5"]);
});

test("PUT: replaces all previous mappings", async () => {
  // First PUT
  await mappingsRoute.PUT(
    new Request("http://localhost/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mappings: [{ source: "old-model", target: "old-target" }] }),
    }),
    { params: { id: "cursor" } }
  );

  // Second PUT — replaces
  const putRes = await mappingsRoute.PUT(
    new Request("http://localhost/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mappings: [{ source: "new-model", target: "new-target" }] }),
    }),
    { params: { id: "cursor" } }
  );
  assert.equal(putRes.status, 200);

  const getRes = await mappingsRoute.GET(
    new Request("http://localhost/"),
    { params: { id: "cursor" } }
  );
  const body = await getRes.json() as { mappings: Array<{ source_model: string }> };
  assert.equal(body.mappings.length, 1);
  assert.equal(body.mappings[0].source_model, "new-model");
});

test("PUT: empty mappings array clears all mappings", async () => {
  // Add then clear
  await mappingsRoute.PUT(
    new Request("http://localhost/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mappings: [{ source: "x", target: "y" }] }),
    }),
    { params: { id: "zed" } }
  );
  const putRes = await mappingsRoute.PUT(
    new Request("http://localhost/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mappings: [] }),
    }),
    { params: { id: "zed" } }
  );
  assert.equal(putRes.status, 200);
  const body = await putRes.json() as { mappings: unknown[] };
  assert.equal(body.mappings.length, 0);
});

// ── Zod validation ─────────────────────────────────────────────────────────

test("PUT: invalid body (missing mappings) returns 400", async () => {
  const res = await mappingsRoute.PUT(
    new Request("http://localhost/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ wrong_key: [] }),
    }),
    { params: { id: "antigravity" } }
  );
  assert.equal(res.status, 400);
  const body = await res.json() as Record<string, unknown>;
  const errMsg = (body.error as Record<string, unknown>)?.message as string;
  assert.ok(!errMsg.includes("at /"), "stack trace leaked in 400 error");
});

test("PUT: invalid JSON returns 400", async () => {
  const res = await mappingsRoute.PUT(
    new Request("http://localhost/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: "not-json",
    }),
    { params: { id: "antigravity" } }
  );
  assert.equal(res.status, 400);
});

test("PUT: error responses do not leak stack traces", async () => {
  const res = await mappingsRoute.PUT(
    new Request("http://localhost/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mappings: "not-an-array" }),
    }),
    { params: { id: "codex" } }
  );
  const text = await res.text();
  assert.ok(!text.includes("at /"), "stack trace leaked in PUT /mappings error");
});

test("GET: error responses do not leak stack traces", async () => {
  const res = await mappingsRoute.GET(
    new Request("http://localhost/"),
    { params: { id: "antigravity" } }
  );
  const text = await res.text();
  assert.ok(!text.includes("at /"), "stack trace leaked in GET /mappings response");
});
