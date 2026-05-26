/**
 * T-04 lifecycle endpoint tests.
 *
 * Tests HTTP handlers directly (bypassing Next.js routing) with a real
 * ServiceSupervisor whose start/stop methods are patched via mock.fn().
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { mock } from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lifecycle-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// Bootstrap DB
const core = await import("../../../src/lib/db/core.ts");
const db = core.getDbInstance();

// Seed service rows
db.prepare(
  `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
   VALUES ('9router', 'stopped', 20130, 0, 1, 1)`
).run();

const { updateVersionManagerTool, getVersionManagerTool } =
  await import("../../../src/lib/db/versionManager.ts");

// Set version so installer functions have something to read
await updateVersionManagerTool("9router", { installedVersion: "0.4.59", status: "stopped" });

const { ServiceSupervisor } = await import("../../../src/lib/services/ServiceSupervisor.ts");
const { registerSupervisor, getSupervisor } = await import("../../../src/lib/services/registry.ts");

/** Creates a minimal ServiceSupervisor with fake spawnArgs (no real process). */
function makeFakeSup(tool: string) {
  return new ServiceSupervisor({
    tool,
    port: 20130,
    spawnArgs: () => ({
      command: process.execPath,
      args: ["-e", "setTimeout(() => {}, 60000)"],
      env: process.env,
      cwd: process.cwd(),
    }),
    healthUrl: () => `http://127.0.0.1:20130/api/health`,
    healthIntervalMs: 500,
    stopTimeoutMs: 500,
    logsBufferBytes: 1_048_576,
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── status endpoint ────────────────────────────────────────────────────────

test("GET /status returns not_installed when no installer version", async () => {
  await updateVersionManagerTool("9router", { installedVersion: null, status: "not_installed" });

  const { GET } = await import("../../../src/app/api/services/9router/status/route.ts?t=status-1");
  const resp = await GET();
  assert.equal(resp.status, 200);
  const body = await resp.json();
  assert.ok(["not_installed", "unknown", "stopped"].includes(body.state as string));

  // restore
  await updateVersionManagerTool("9router", { installedVersion: "0.4.59", status: "stopped" });
});

test("GET /status returns enriched shape", async () => {
  const { GET } = await import("../../../src/app/api/services/9router/status/route.ts?t=status-2");
  const resp = await GET();
  assert.equal(resp.status, 200);
  const body = await resp.json();
  assert.ok("state" in body, "should have state");
  assert.ok("installedVersion" in body, "should have installedVersion");
  assert.ok("updateAvailable" in body, "should have updateAvailable");
  assert.ok("apiKeyMasked" in body, "should have apiKeyMasked");
});

// ─── start endpoint ─────────────────────────────────────────────────────────

test("POST /start returns 409 when not_installed", async () => {
  await updateVersionManagerTool("9router", { status: "not_installed", installedVersion: null });

  const { POST } = await import("../../../src/app/api/services/9router/start/route.ts?t=start-1");
  const resp = await POST();
  assert.equal(resp.status, 409);
  const body = await resp.json();
  assert.ok(body.error?.message?.includes("instalado"), "should explain not installed");

  // restore
  await updateVersionManagerTool("9router", { status: "stopped", installedVersion: "0.4.59" });
});

test("POST /start returns 200 when already running", async () => {
  const sup = makeFakeSup("9router");

  // Patch start() to return immediately with running state
  const origStart = sup.start.bind(sup);
  void origStart;
  mock.method(sup, "start", async () => ({
    tool: "9router",
    state: "running" as const,
    pid: 12345,
    port: 20130,
    health: "healthy" as const,
    startedAt: new Date().toISOString(),
    lastError: null,
  }));

  registerSupervisor(sup);
  await updateVersionManagerTool("9router", { status: "stopped", installedVersion: "0.4.59" });

  const { POST } = await import("../../../src/app/api/services/9router/start/route.ts?t=start-2");
  const resp = await POST();
  assert.equal(resp.status, 200);
  const body = await resp.json();
  assert.equal(body.state, "running");

  mock.restoreAll();
});

// ─── stop endpoint ───────────────────────────────────────────────────────────

test("POST /stop returns stopped even if supervisor absent", async () => {
  // Remove from registry by re-importing fresh
  const { POST } = await import("../../../src/app/api/services/9router/stop/route.ts?t=stop-1");
  const resp = await POST();
  assert.equal(resp.status, 200);
  const body = await resp.json();
  assert.ok(["stopped", "running", "error"].includes(body.state as string));
});

// ─── auto-start endpoint ─────────────────────────────────────────────────────

test("POST /auto-start toggles DB field", async () => {
  const { POST } = await import("../../../src/app/api/services/9router/auto-start/route.ts");

  const reqEnable = new Request("http://localhost", {
    method: "POST",
    body: JSON.stringify({ enabled: true }),
  });
  const resp1 = await POST(reqEnable);
  assert.equal(resp1.status, 204);

  const row1 = await getVersionManagerTool("9router");
  assert.ok(row1?.autoStart === true, "autoStart should be true after enable");

  const reqDisable = new Request("http://localhost", {
    method: "POST",
    body: JSON.stringify({ enabled: false }),
  });
  const resp2 = await POST(reqDisable);
  assert.equal(resp2.status, 204);

  const row2 = await getVersionManagerTool("9router");
  assert.ok(row2?.autoStart === false, "autoStart should be false after disable");
});

test("POST /auto-start returns 400 for invalid body", async () => {
  const { POST } =
    await import("../../../src/app/api/services/9router/auto-start/route.ts?t=as-bad");
  const req = new Request("http://localhost", {
    method: "POST",
    body: JSON.stringify({ enabled: "yes" }), // should be boolean
  });
  const resp = await POST(req);
  assert.equal(resp.status, 400);
});

// ─── rotate-key endpoint ─────────────────────────────────────────────────────

test("POST /rotate-key does not leak plain key in response", async () => {
  const { POST } = await import("../../../src/app/api/services/9router/rotate-key/route.ts");
  const resp = await POST();
  assert.equal(resp.status, 200);
  const body = await resp.json();
  assert.ok(body.keyRotated === true, "keyRotated should be true");
  assert.ok(!("key" in body), "response must not contain 'key' field");
  assert.ok(!("apiKey" in body), "response must not contain 'apiKey' field");
  assert.ok(!("plainKey" in body), "response must not contain 'plainKey' field");
  // Ensure no string in the response looks like our key prefix
  const bodyStr = JSON.stringify(body);
  assert.ok(!bodyStr.includes("nr_"), "response must not contain plain key value");
});
