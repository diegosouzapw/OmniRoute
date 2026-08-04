/**
 * Regression test for #6403 — AgentBridge MITM startup failure:
 *   "MITM server failed to start: no API key was provided
 *   (ROUTER_API_KEY is required). Set a router API key in OmniRoute and retry."
 *
 * Root cause: `resolveRouterApiKey()` (src/app/api/tools/agent-bridge/server/route.ts)
 * only checked an explicit `apiKey` request field — never sent by the AgentBridge
 * UI, since `AgentBridgeServerActionSchema` has no `apiKey` field — and the
 * `ROUTER_API_KEY` process env var, which is unset unless an operator manually
 * exports it before launching OmniRoute. On a normal built-from-source install
 * neither is ever set, so `startMitm()` always received `""` even though
 * OmniRoute already had a usable API key sitting in its own DB. The fix falls
 * back to `pickApiKeyForInternalUse()` — the same DB-backed selector already
 * used by the combo-health-check / cloud-sync-verify internal probes — so
 * AgentBridge reuses an existing OmniRoute key instead of hard-failing.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ab-routerkey-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-secret-for-agentbridge-6403";

const core = await import("../../src/lib/db/core.ts");
const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
const { resolveRouterApiKey } = await import(
  "../../src/app/api/tools/agent-bridge/server/route.ts"
);

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
  delete process.env.ROUTER_API_KEY;
});

test.after(() => {
  delete process.env.ROUTER_API_KEY;
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    /* noop */
  }
});

test("resolveRouterApiKey: explicit apiKey field always wins", async () => {
  await createApiKey("Test Key", "machine-1");
  const resolved = await resolveRouterApiKey("sk-explicit-override");
  assert.equal(resolved, "sk-explicit-override");
});

test("resolveRouterApiKey: ROUTER_API_KEY env wins over DB when set", async () => {
  process.env.ROUTER_API_KEY = "sk-from-env";
  await createApiKey("Test Key", "machine-1");
  const resolved = await resolveRouterApiKey("");
  assert.equal(resolved, "sk-from-env");
});

// This is the #6403 reproduction: no explicit apiKey, no env var — but
// OmniRoute already has a usable key in its own DB. Before the fix this
// returned "" (empty string), which made startMitm() spawn server.cjs
// without ROUTER_API_KEY, causing the "no API key was provided" failure.
test("resolveRouterApiKey: falls back to an existing OmniRoute API key (#6403)", async () => {
  const created = await createApiKey("AgentBridge Default", "machine-1");
  const resolved = await resolveRouterApiKey("");
  assert.equal(resolved, created.key, "must reuse the existing OmniRoute API key, not fail empty");
  assert.notEqual(resolved, "", "must never silently resolve to an empty ROUTER_API_KEY");
});

test("resolveRouterApiKey: no explicit key, no env, no DB key -> empty (unchanged failure path)", async () => {
  const resolved = await resolveRouterApiKey("");
  assert.equal(resolved, "");
});
