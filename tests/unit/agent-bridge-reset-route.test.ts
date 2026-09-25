/**
 * Unit tests: POST /api/tools/agent-bridge/agents/[id]/reset
 *
 * "Restore default" — the per-agent full undo requested after a user reported
 * that AgentBridge left Antigravity broken with no way to fully revert it.
 * Covers:
 *   - Route-validation guards, mirroring the sibling `dns` route (unknown
 *     agent 404, malformed JSON 400, invalid body shape 400, no stack leak).
 *   - The success path: DNS un-spoofed (agent-scoped only), mappings cleared,
 *     dns_enabled/setup_completed reset, and `otherAgentsStillActive` computed
 *     from the OTHER agents' state (not this one).
 *
 * DNS/system-trust mutation is disabled via OMNIROUTE_SKIP_DNS_WRITE — the
 * suite must never touch the real hosts file (tests/_setup/isolateDataDir.ts
 * sets this globally too; set explicitly here so this file is self-contained
 * when run directly, matching tests/unit/db-agent-bridge-state.test.ts).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.OMNIROUTE_SKIP_DNS_WRITE = "1";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-bridge-reset-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const stateDb = await import("../../src/lib/db/agentBridgeState.ts");
const mappingsDb = await import("../../src/lib/db/agentBridgeMappings.ts");
const resetRoute = await import("../../src/app/api/tools/agent-bridge/agents/[id]/reset/route.ts");
const { checkDNSEntryForAgent } = await import("../../src/mitm/dns/dnsConfig.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function makeRequest(agentId: string, body: unknown = { sudoPassword: "test-sudo-password" }) {
  return new Request(`http://127.0.0.1/api/tools/agent-bridge/agents/${agentId}/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ── Validation guards ────────────────────────────────────────────────────

test("POST .../[id]/reset: unknown agent id returns 404 before any mutation", async () => {
  const res = await resetRoute.POST(makeRequest("__nonexistent_agent__"), {
    params: Promise.resolve({ id: "__nonexistent_agent__" }),
  });
  assert.equal(res.status, 404);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.ok(JSON.stringify(body).includes("__nonexistent_agent__"));
});

test("POST .../[id]/reset: malformed JSON body returns 400", async () => {
  const req = new Request("http://127.0.0.1/api/tools/agent-bridge/agents/cursor/reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{not-json",
  });
  const res = await resetRoute.POST(req, { params: Promise.resolve({ id: "cursor" }) });
  assert.equal(res.status, 400);
});

test("POST .../[id]/reset: non-string sudoPassword returns 400 (schema validated first)", async () => {
  const res = await resetRoute.POST(makeRequest("cursor", { sudoPassword: 12345 }), {
    params: Promise.resolve({ id: "cursor" }),
  });
  assert.equal(res.status, 400);
});

test("POST .../[id]/reset: error responses do not leak stack traces", async () => {
  const res = await resetRoute.POST(makeRequest("__nonexistent_agent__"), {
    params: Promise.resolve({ id: "__nonexistent_agent__" }),
  });
  const text = await res.text();
  assert.ok(!text.includes("at /"), "stack trace leaked in reset route 404 response");
});

// ── Success path ─────────────────────────────────────────────────────────

test("POST .../[id]/reset: clears mappings, resets dns_enabled/setup_completed for that agent only", async () => {
  stateDb.upsertAgentBridgeState({
    agent_id: "antigravity",
    dns_enabled: true,
    setup_completed: true,
  });
  mappingsDb.setMappings("antigravity", [
    { source: "gemini-pro", target: "anthropic/claude-sonnet-4" },
  ]);

  // A second, unrelated agent must be left untouched by resetting antigravity.
  stateDb.upsertAgentBridgeState({ agent_id: "cursor", dns_enabled: true, setup_completed: true });
  mappingsDb.setMappings("cursor", [{ source: "gpt-4o", target: "openai/gpt-4o" }]);

  const res = await resetRoute.POST(makeRequest("antigravity"), {
    params: Promise.resolve({ id: "antigravity" }),
  });
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    ok: boolean;
    agent_id: string;
    dns_enabled: boolean;
    mappingsCleared: boolean;
    verified: boolean;
    otherAgentsStillActive: boolean;
    restartRequired: boolean;
  };

  assert.equal(body.ok, true);
  assert.equal(body.agent_id, "antigravity");
  assert.equal(body.dns_enabled, false);
  assert.equal(body.mappingsCleared, true);
  assert.equal(body.restartRequired, true);
  // OMNIROUTE_SKIP_DNS_WRITE keeps the route from touching /etc/hosts, but `verified`
  // still reads the machine's real hosts file. A box that already carries the agent's
  // spoof entries (e.g. a CI host where the MITM once ran) legitimately reports false,
  // so assert the route's wiring against the same probe instead of a fixed value.
  assert.equal(body.verified, !checkDNSEntryForAgent("antigravity"));
  // cursor is still dns_enabled=true -> reset must report other agents remain active.
  assert.equal(body.otherAgentsStillActive, true);

  const antigravityState = stateDb.getAgentBridgeState("antigravity");
  assert.equal(antigravityState?.dns_enabled, false);
  assert.equal(antigravityState?.setup_completed, false);
  assert.deepEqual(mappingsDb.getMappingsForAgent("antigravity"), []);

  // cursor's own state and mappings must be untouched by resetting antigravity.
  const cursorState = stateDb.getAgentBridgeState("cursor");
  assert.equal(cursorState?.dns_enabled, true);
  assert.equal(cursorState?.setup_completed, true);
  assert.equal(mappingsDb.getMappingsForAgent("cursor").length, 1);
});

test("POST .../[id]/reset: otherAgentsStillActive is false once the last active agent is reset", async () => {
  stateDb.upsertAgentBridgeState({ agent_id: "antigravity", dns_enabled: true });

  const res = await resetRoute.POST(makeRequest("antigravity"), {
    params: Promise.resolve({ id: "antigravity" }),
  });
  const body = (await res.json()) as { otherAgentsStillActive: boolean };
  assert.equal(body.otherAgentsStillActive, false);
});
