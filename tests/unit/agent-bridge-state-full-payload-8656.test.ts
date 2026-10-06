/**
 * Regression test for issue #8656: Agent Bridge DNS start succeeds but UI does
 * not show model mapping or dns-configured status.
 *
 * Root cause: GET /api/tools/agent-bridge/state returns { server, agents } but
 * the UI expects { serverState, agentStates, bypassPatterns, mappings }. The
 * normalizeAgentBridgeState function intentionally does NOT coerce the `agents`
 * key to `agentStates` (comment at normalizeState.ts:45-47), so after every
 * refresh agentStates=[], mappings={}, bypassPatterns=[].
 *
 * DNS toggle DOES write dns_enabled=true to the DB via upsertAgentBridgeState
 * in agents/[id]/dns/route.ts:72, but the state route never reads
 * getAllAgentBridgeStates(), so the UI never sees the flag flip.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import os from "os";
import path from "path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8656-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// Import db core first to allow reset
const core = await import("../../src/lib/db/core.ts");
const { upsertAgentBridgeState } = await import("../../src/lib/db/agentBridgeState.ts");
const { setMappings } = await import("../../src/lib/db/agentBridgeMappings.ts");
const { replaceUserBypassPatterns } = await import("../../src/lib/db/agentBridgeBypass.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    /* noop */
  }
});

// ── Core #8656 Regression Tests ────────────────────────────────────────────

test("GET /state: returns agentStates array with dns_enabled from DB (#8656)", async () => {
  // Arrange: simulate the user clicking "Start DNS" for claude-code, which
  // writes dns_enabled=true to the DB via agents/[id]/dns/route.ts:72
  upsertAgentBridgeState({ agent_id: "claude-code", dns_enabled: true });

  // Dynamic import to bypass module cache after DB reset
  const { GET } = await import(
    "../../src/app/api/tools/agent-bridge/state/route.ts?t=" + Date.now()
  );

  // Act: the UI polls /state after the DNS toggle
  const res = await GET();
  const body = (await res.json()) as Record<string, unknown>;

  // Assert: agentStates must be populated (not empty) so the UI can read dns_enabled
  assert.ok(Array.isArray(body.agentStates), "body.agentStates missing or not array");
  assert.ok(
    body.agentStates.length > 0,
    "agentStates should not be empty — at least claude-code should be present"
  );

  const claudeCodeState = body.agentStates.find(
    (s: { agent_id: string }) => s.agent_id === "claude-code"
  );
  assert.ok(claudeCodeState, "claude-code not in agentStates");
  assert.equal(
    (claudeCodeState as { dns_enabled: boolean }).dns_enabled,
    true,
    "dns_enabled should be true after upsertAgentBridgeState"
  );
});

test("GET /state: returns mappings object keyed by agentId (#8656)", async () => {
  // Arrange: simulate the setup wizard configuring model mappings for claude-code
  setMappings("claude-code", [{ source: "claude-sonnet-4", target: "openai/gpt-4o" }]);

  const { GET } = await import(
    "../../src/app/api/tools/agent-bridge/state/route.ts?t=" + Date.now()
  );

  // Act
  const res = await GET();
  const body = (await res.json()) as Record<string, unknown>;

  // Assert: mappings must be present so the UI can render the model mapping table
  assert.ok(typeof body.mappings === "object", "body.mappings missing");
  assert.ok(Array.isArray(body.mappings["claude-code"]), "mappings[claude-code] missing");
  assert.equal(body.mappings["claude-code"].length, 1);
  assert.equal(body.mappings["claude-code"][0].source, "claude-sonnet-4");
  assert.equal(body.mappings["claude-code"][0].target, "openai/gpt-4o");
});

test("GET /state: returns bypassPatterns array (#8656)", async () => {
  // Arrange: simulate the user configuring custom bypass patterns
  replaceUserBypassPatterns(["*.internal", "localhost"]);

  const { GET } = await import(
    "../../src/app/api/tools/agent-bridge/state/route.ts?t=" + Date.now()
  );

  // Act
  const res = await GET();
  const body = (await res.json()) as Record<string, unknown>;

  // Assert: bypassPatterns must be present so the UI can display/edit them
  assert.ok(Array.isArray(body.bypassPatterns), "body.bypassPatterns missing");
  assert.ok(body.bypassPatterns.length >= 2, "should include user patterns");
  assert.ok(body.bypassPatterns.includes("*.internal"));
  assert.ok(body.bypassPatterns.includes("localhost"));
});

test("GET /state: serverState.certTrusted distinct from certExists (#8656)", async () => {
  // certTrusted (OS trust store check) was confused with certExists (file on disk).
  // getMitmStatus returns certExists only; normalizeState maps certExists → certTrusted
  // as a fallback, so the UI showed "trusted" when the cert file existed but wasn't
  // actually trusted by the OS.
  const { GET } = await import(
    "../../src/app/api/tools/agent-bridge/state/route.ts?t=" + Date.now()
  );

  const res = await GET();
  const body = (await res.json()) as Record<string, unknown>;

  // Assert: certExists and certTrusted should be distinct fields
  const server = body.server as Record<string, unknown>;
  assert.ok("certExists" in server, "server.certExists missing");
  assert.ok("certTrusted" in server, "server.certTrusted missing");

  // Both should be false when no cert exists (this test doesn't generate a cert)
  assert.equal(server.certExists, false, "certExists should be false (no cert generated)");
  assert.equal(
    server.certTrusted,
    false,
    "certTrusted should be false (no cert in OS trust store)"
  );
});

test("GET /state: maintains backward compat (server + agents keys) (#8656)", async () => {
  // Integration tests and other routes (settings/mitm) depend on the legacy
  // { server, agents } shape. The fix must add the new keys without breaking old callers.
  const { GET } = await import(
    "../../src/app/api/tools/agent-bridge/state/route.ts?t=" + Date.now()
  );

  const res = await GET();
  const body = (await res.json()) as Record<string, unknown>;

  // Assert: legacy keys still present
  assert.ok("server" in body, "body.server missing — breaks backward compat");
  assert.ok("agents" in body, "body.agents missing");
  assert.ok(Array.isArray(body.agents), "agents should be array");

  // Assert: new keys also present
  assert.ok("serverState" in body, "body.serverState missing");
  assert.ok("agentStates" in body, "body.agentStates missing");
  assert.ok("bypassPatterns" in body, "body.bypassPatterns missing");
  assert.ok("mappings" in body, "body.mappings missing");
});

test("GET /state: agentStates entries have expected shape (#8656)", async () => {
  // Arrange: set all fields for antigravity to ensure they're mapped through
  upsertAgentBridgeState({
    agent_id: "antigravity",
    dns_enabled: true,
    cert_trusted: false,
    setup_completed: true,
    last_started_at: "2026-07-27T12:00:00.000Z",
    last_error: null,
  });

  const { GET } = await import(
    "../../src/app/api/tools/agent-bridge/state/route.ts?t=" + Date.now()
  );

  const res = await GET();
  const body = (await res.json()) as Record<string, unknown>;

  const antigravityState = body.agentStates.find(
    (s: { agent_id: string }) => s.agent_id === "antigravity"
  );
  assert.ok(antigravityState, "antigravity should be in agentStates");

  const state = antigravityState as {
    agent_id: string;
    dns_enabled: boolean;
    cert_trusted: boolean;
    setup_completed: boolean;
    last_started_at: string | null;
    last_error: string | null;
  };

  assert.equal(state.agent_id, "antigravity");
  assert.equal(state.dns_enabled, true);
  assert.equal(state.cert_trusted, false);
  assert.equal(state.setup_completed, true);
  assert.equal(state.last_started_at, "2026-07-27T12:00:00.000Z");
  assert.equal(state.last_error, null);
});
