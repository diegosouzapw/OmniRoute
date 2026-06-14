import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-agent-bridge-state-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const mod = await import("../../src/lib/db/agentBridgeState.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("migration is idempotent — running getDbInstance twice does not throw", () => {
  // First init
  const db1 = core.getDbInstance();
  assert.ok(db1);
  core.resetDbInstance();

  // Second init — migrations should skip already-applied files
  const db2 = core.getDbInstance();
  assert.ok(db2);
});

test("getAgentBridgeState returns null for unknown agent", () => {
  const result = mod.getAgentBridgeState("unknown-agent");
  assert.equal(result, null);
});

test("upsertAgentBridgeState creates a new row with defaults", () => {
  mod.upsertAgentBridgeState({ agent_id: "copilot" });
  const row = mod.getAgentBridgeState("copilot");

  assert.ok(row);
  assert.equal(row.agent_id, "copilot");
  assert.equal(row.dns_enabled, false);
  assert.equal(row.cert_trusted, false);
  assert.equal(row.setup_completed, false);
  assert.equal(row.last_started_at, null);
  assert.equal(row.last_error, null);
});

test("upsertAgentBridgeState updates an existing row", () => {
  mod.upsertAgentBridgeState({ agent_id: "cursor" });
  mod.upsertAgentBridgeState({ agent_id: "cursor", dns_enabled: true, cert_trusted: true });

  const row = mod.getAgentBridgeState("cursor");
  assert.ok(row);
  assert.equal(row.dns_enabled, true);
  assert.equal(row.cert_trusted, true);
  assert.equal(row.setup_completed, false);
});

test("setLastStarted persists timestamp and auto-creates row if missing", () => {
  const ts = new Date().toISOString();
  mod.setLastStarted("kiro", ts);

  const row = mod.getAgentBridgeState("kiro");
  assert.ok(row);
  assert.equal(row.last_started_at, ts);
});

test("setLastError persists error string and clears it with null", () => {
  mod.upsertAgentBridgeState({ agent_id: "codex" });
  mod.setLastError("codex", "upstream timeout");

  let row = mod.getAgentBridgeState("codex");
  assert.equal(row?.last_error, "upstream timeout");

  mod.setLastError("codex", null);
  row = mod.getAgentBridgeState("codex");
  assert.equal(row?.last_error, null);
});

test("getAllAgentBridgeStates returns all rows", () => {
  mod.upsertAgentBridgeState({ agent_id: "antigravity" });
  mod.upsertAgentBridgeState({ agent_id: "zed" });

  const rows = mod.getAllAgentBridgeStates();
  assert.ok(rows.length >= 2);
  const ids = rows.map((r) => r.agent_id);
  assert.ok(ids.includes("antigravity"));
  assert.ok(ids.includes("zed"));
});
