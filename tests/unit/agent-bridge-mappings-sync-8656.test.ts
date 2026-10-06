/**
 * Regression test for issue #8656 follow-up: model mappings saved via the UI
 * are invisible to the MITM proxy because the proxy reads from key_value
 * (namespace='mitmAlias') while the UI writes to agent_bridge_mappings.
 *
 * This test verifies that syncAgentBridgeMappingsToMitmAlias() properly copies
 * mappings from agent_bridge_mappings to key_value for agents that have a
 * registered alias key in standaloneRouting.cjs::AGENT_ROUTE_CONFIG.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import os from "os";
import path from "path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8656-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// Import db core first to allow reset
const core = await import("../../src/lib/db/core.ts");

// Import getMitmAlias to verify key_value entries
const { getMitmAlias } = await import("../../src/lib/db/models/mitmAlias.ts");

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

// ── Sync Tests ─────────────────────────────────────────────────────────────

test("syncAgentBridgeMappingsToMitmAlias: copies antigravity mappings to key_value", async () => {
  // Dynamic import after DB reset
  const { setMappings, syncAgentBridgeMappingsToMitmAlias } = await import(
    "../../src/lib/db/agentBridgeMappings.ts?t=" + Date.now()
  );

  // Arrange: save mappings for antigravity
  setMappings("antigravity", [
    { source: "gpt-oss-120b-medium", target: "openai/gpt-4o" },
    { source: "gemini-2.0-flash", target: "anthropic/claude-sonnet-4" },
  ]);

  // Act: sync to mitmAlias
  syncAgentBridgeMappingsToMitmAlias("antigravity");

  // Get a fresh import of getMitmAlias to read the key_value table
  const { getMitmAlias: getAlias } = await import(
    "../../src/lib/db/models/mitmAlias.ts?t=" + Date.now()
  );

  // Assert: key_value has the mappings
  const alias = await getAlias("antigravity");
  assert.ok(alias, "mitmAlias for antigravity should exist");
  assert.equal(
    alias["gpt-oss-120b-medium"],
    "openai/gpt-4o",
    "gpt-oss-120b-medium should map to openai/gpt-4o"
  );
  assert.equal(
    alias["gemini-2.0-flash"],
    "anthropic/claude-sonnet-4",
    "gemini-2.0-flash should map to anthropic/claude-sonnet-4"
  );
});

test("syncAgentBridgeMappingsToMitmAlias: skips agents not in MITM_ALIAS_AGENTS", async () => {
  const { setMappings, syncAgentBridgeMappingsToMitmAlias } = await import(
    "../../src/lib/db/agentBridgeMappings.ts?t=" + Date.now()
  );

  // Arrange: save mappings for cursor (not in MITM_ALIAS_AGENTS)
  setMappings("cursor", [{ source: "gpt-4o", target: "openai/gpt-4o" }]);

  // Act: sync should skip cursor (no-op)
  syncAgentBridgeMappingsToMitmAlias("cursor");

  // Assert: key_value should have no mitmAlias entry for cursor
  const { getMitmAlias: getAlias } = await import(
    "../../src/lib/db/models/mitmAlias.ts?t=" + Date.now()
  );
  const alias = await getAlias();
  assert.equal(alias["cursor"], undefined, "cursor should not have a mitmAlias entry");
});

test("syncAgentBridgeMappingsToMitmAlias: replaces existing mitmAlias entry", async () => {
  const { setMappings, syncAgentBridgeMappingsToMitmAlias } = await import(
    "../../src/lib/db/agentBridgeMappings.ts?t=" + Date.now()
  );

  // Arrange: save initial mappings and sync
  setMappings("antigravity", [{ source: "gpt-oss-120b-medium", target: "openai/gpt-4o" }]);
  syncAgentBridgeMappingsToMitmAlias("antigravity");

  // Act: save different mappings and sync again
  setMappings("antigravity", [
    { source: "gpt-oss-120b-medium", target: "anthropic/claude-opus-4" },
  ]);
  syncAgentBridgeMappingsToMitmAlias("antigravity");

  // Assert: key_value should have the updated mapping
  const { getMitmAlias: getAlias } = await import(
    "../../src/lib/db/models/mitmAlias.ts?t=" + Date.now()
  );
  const alias = await getAlias("antigravity");
  assert.equal(
    alias["gpt-oss-120b-medium"],
    "anthropic/claude-opus-4",
    "should have updated mapping after re-sync"
  );
});

test("syncAgentBridgeMappingsToMitmAlias: empty mappings clear key_value entry", async () => {
  const { setMappings, syncAgentBridgeMappingsToMitmAlias } = await import(
    "../../src/lib/db/agentBridgeMappings.ts?t=" + Date.now()
  );

  // Arrange: save some mappings first
  setMappings("antigravity", [{ source: "gpt-oss-120b-medium", target: "openai/gpt-4o" }]);
  syncAgentBridgeMappingsToMitmAlias("antigravity");

  // Act: clear mappings and sync
  setMappings("antigravity", []);
  syncAgentBridgeMappingsToMitmAlias("antigravity");

  // Assert: key_value entry should be an empty object
  const { getMitmAlias: getAlias } = await import(
    "../../src/lib/db/models/mitmAlias.ts?t=" + Date.now()
  );
  const alias = await getAlias("antigravity");
  assert.ok(alias, "antigravity mitmAlias entry should still exist (empty object)");
  assert.equal(Object.keys(alias).length, 0, "antigravity mitmAlias should have no mappings");
});

test("syncAgentBridgeMappingsToMitmAlias: works for claude-code agent", async () => {
  const { setMappings, syncAgentBridgeMappingsToMitmAlias } = await import(
    "../../src/lib/db/agentBridgeMappings.ts?t=" + Date.now()
  );

  // Arrange: save and sync for claude-code
  setMappings("claude-code", [{ source: "claude-sonnet-4", target: "openai/gpt-4o" }]);
  syncAgentBridgeMappingsToMitmAlias("claude-code");

  // Assert
  const { getMitmAlias: getAlias } = await import(
    "../../src/lib/db/models/mitmAlias.ts?t=" + Date.now()
  );
  const alias = await getAlias("claude-code");
  assert.ok(alias, "mitmAlias for claude-code should exist");
  assert.equal(
    alias["claude-sonnet-4"],
    "openai/gpt-4o",
    "claude-sonnet-4 should map to openai/gpt-4o"
  );
});
