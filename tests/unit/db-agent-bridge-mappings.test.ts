import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-db-agent-bridge-mappings-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const mod = await import("../../src/lib/db/agentBridgeMappings.ts");

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

test("getMappingsForAgent returns empty array when no mappings exist", () => {
  const rows = mod.getMappingsForAgent("antigravity");
  assert.deepEqual(rows, []);
});

test("setMappings inserts and retrieves mappings for an agent", () => {
  mod.setMappings("copilot", [
    { source: "gpt-4", target: "openai/gpt-4.1" },
    { source: "gpt-3.5-turbo", target: "openai/gpt-4o-mini" },
  ]);

  const rows = mod.getMappingsForAgent("copilot");
  assert.equal(rows.length, 2);

  const sources = rows.map((r) => r.source_model);
  assert.ok(sources.includes("gpt-4"));
  assert.ok(sources.includes("gpt-3.5-turbo"));

  const gpt4Row = rows.find((r) => r.source_model === "gpt-4");
  assert.equal(gpt4Row?.target_model, "openai/gpt-4.1");
  assert.equal(gpt4Row?.agent_id, "copilot");
});

test("setMappings is transactional — replaces all mappings idempotently", () => {
  // First set
  mod.setMappings("cursor", [
    { source: "claude-3-5-sonnet", target: "anthropic/claude-sonnet-4-5" },
  ]);

  // Second set — should replace (not accumulate)
  mod.setMappings("cursor", [
    { source: "claude-3-opus", target: "anthropic/claude-opus-4" },
    { source: "gpt-4o", target: "openai/gpt-4.1" },
  ]);

  const rows = mod.getMappingsForAgent("cursor");
  assert.equal(rows.length, 2);

  const sources = rows.map((r) => r.source_model);
  assert.ok(!sources.includes("claude-3-5-sonnet"), "old mapping should be replaced");
  assert.ok(sources.includes("claude-3-opus"));
  assert.ok(sources.includes("gpt-4o"));
});

test("setMappings with empty array clears all mappings for agent", () => {
  mod.setMappings("zed", [{ source: "gpt-4", target: "openai/gpt-4.1" }]);
  mod.setMappings("zed", []);

  const rows = mod.getMappingsForAgent("zed");
  assert.equal(rows.length, 0);
});

test("setMappings does not affect mappings for other agents", () => {
  mod.setMappings("kiro", [{ source: "gpt-4", target: "openai/gpt-4.1" }]);
  mod.setMappings("codex", [{ source: "o3", target: "openai/o3" }]);
  mod.setMappings("kiro", [{ source: "gpt-4o", target: "openai/gpt-4o" }]);

  const codexRows = mod.getMappingsForAgent("codex");
  assert.equal(codexRows.length, 1);
  assert.equal(codexRows[0].source_model, "o3");
});

test("deleteMapping removes a specific source mapping", () => {
  mod.setMappings("antigravity", [
    { source: "gpt-4", target: "openai/gpt-4.1" },
    { source: "gpt-3.5-turbo", target: "openai/gpt-4o-mini" },
  ]);

  mod.deleteMapping("antigravity", "gpt-4");

  const rows = mod.getMappingsForAgent("antigravity");
  assert.equal(rows.length, 1);
  assert.equal(rows[0].source_model, "gpt-3.5-turbo");
});

test("deleteMapping is a no-op when mapping does not exist", () => {
  mod.setMappings("claude-code", [{ source: "claude-3", target: "anthropic/claude-opus-4" }]);
  mod.deleteMapping("claude-code", "nonexistent-model");

  const rows = mod.getMappingsForAgent("claude-code");
  assert.equal(rows.length, 1);
});
