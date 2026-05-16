import test from "node:test";
import assert from "node:assert/strict";

test("CLI_TOOLS registry contains all 17 expected tools", async () => {
  const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");
  const expected = [
    "claude",
    "codex",
    "opencode",
    "cline",
    "kilo",
    "continue",
    "qwen",
    "windsurf",
    "hermes",
    "amp",
    "kiro",
    "cursor",
    "droid",
    "antigravity",
    "copilot",
    "openclaw",
    "custom",
  ];
  for (const id of expected) {
    assert.ok(id in CLI_TOOLS, `Missing tool: ${id}`);
  }
  assert.equal(Object.keys(CLI_TOOLS).length, expected.length);
});

test("Every tool has required fields: id, name, description, configType", async () => {
  const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");
  for (const [key, tool] of Object.entries(CLI_TOOLS)) {
    assert.equal(typeof tool.id, "string", `${key}.id must be string`);
    assert.equal(tool.id, key, `${key}.id must match its registry key`);
    assert.equal(typeof tool.name, "string", `${key}.name must be string`);
    assert.ok(tool.name.length > 0, `${key}.name must be non-empty`);
    assert.equal(typeof tool.description, "string", `${key}.description must be string`);
    assert.equal(typeof tool.configType, "string", `${key}.configType must be string`);
  }
});

test("listCliTools returns all tools as an array", async () => {
  const { listCliTools, CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");
  const tools = listCliTools();
  assert.ok(Array.isArray(tools));
  assert.equal(tools.length, Object.keys(CLI_TOOLS).length);
  for (const tool of tools) {
    assert.equal(typeof tool.id, "string");
  }
});

test("getCliTool returns correct tool by id", async () => {
  const { getCliTool } = await import("../../src/shared/constants/cliTools.ts");
  const claude = getCliTool("claude");
  assert.ok(claude);
  assert.equal(claude.id, "claude");
  assert.equal(claude.name, "Claude Code");

  const missing = getCliTool("nonexistent");
  assert.equal(missing, undefined);
});
