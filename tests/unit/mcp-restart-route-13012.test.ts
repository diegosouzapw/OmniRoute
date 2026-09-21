// Regression for GitHub issue #13012 (Bug 2): `omniroute mcp restart` POSTs to
// /api/mcp/restart, but that route never existed — every call 404d. This test
// boots the route handler directly and pins its behavior across the three
// states the CLI can hit: disabled, enabled+stdio, enabled+http-family.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-mcp-restart-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { POST } = await import("../../src/app/api/mcp/restart/route.ts");
const { shutdownMcpHttp } = await import("../../open-sse/mcp-server/httpTransport.ts");
const { isLocalOnlyPath } = await import("../../src/server/authz/routeGuard.ts");

// Hard Rule #15: /api/mcp/ must stay LOCAL_ONLY so loopback enforcement runs
// unconditionally before any auth check — a leaked JWT over a tunnel must not
// reach a route that can tear down/spin up MCP transport sessions.
test("issue #13012: POST /api/mcp/restart is classified LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/mcp/restart"), true);
});

function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  reset();
  // No JWT_SECRET / requireLogin=false ⇒ auth-disabled deployment (pre-existing
  // open-door contract also exercised by tests/unit/mcp-route-scope-carveout.test.ts).
  await settingsDb.updateSettings({ requireLogin: false });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function restartRequest(): Request {
  return new Request("http://localhost:20128/api/mcp/restart", { method: "POST" });
}

test("issue #13012: POST /api/mcp/restart exists and returns 409 when MCP is disabled", async () => {
  await settingsDb.updateSettings({ mcpEnabled: false });
  const res = await POST(restartRequest());
  assert.equal(res.status, 409);
  const body = (await res.json()) as { error?: string };
  assert.match(body.error ?? "", /disabled/i);
});

test("POST /api/mcp/restart returns 501 for the stdio transport (no in-process handle)", async () => {
  await settingsDb.updateSettings({ mcpEnabled: true, mcpTransport: "stdio" });
  const res = await POST(restartRequest());
  assert.equal(res.status, 501);
  const body = (await res.json()) as { error?: string };
  assert.match(body.error ?? "", /stdio/i);
});

test("POST /api/mcp/restart tears down HTTP sessions and returns 200 for sse/streamable-http", async () => {
  await settingsDb.updateSettings({ mcpEnabled: true, mcpTransport: "sse" });
  const res = await POST(restartRequest());
  assert.equal(res.status, 200);
  const body = (await res.json()) as { status?: string; enabled?: boolean; transport?: string };
  assert.equal(body.status, "restarted");
  assert.equal(body.enabled, true);
  assert.equal(body.transport, "sse");
});

test("shutdownMcpHttp is exported and callable (route depends on this contract)", () => {
  assert.equal(typeof shutdownMcpHttp, "function");
});
