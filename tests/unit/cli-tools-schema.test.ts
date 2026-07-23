import test from "node:test";
import assert from "node:assert/strict";

test("CLI_TOOLS registry contains all expected tools including rebuilt Qwen Code", async () => {
  const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");
  // windsurf and amp removed per plan 14 D17 (MITM backlog plan 11)
  // New entries added: roo, jcode, deepseek-tui, smelt, pi, aider, forge,
  //   cursor-cli, goose, interpreter, warp, agent-deck (+ hermes-agent already existed)
  // crush added — ported from upstream decolua/9router#1233
  // codewhale added 2026-07-02 as a dual entry alongside deepseek-tui
  //   (CodeWhale is the actively-maintained successor to DeepSeek TUI).
  // omp + letta added by #6318 (agent-category CLI integrations).
  // grok-build added — xAI Grok Build TUI coding agent (ported from upstream decolua/9router#2571).
  const expected = [
    "claude",
    "codex",
    "droid",
    "openclaw",
    "cursor",
    "cline",
    "kilo",
    "continue",
    "antigravity",
    "copilot",
    "opencode",
    "hermes",
    "hermes-agent",
    "kiro",
    "custom",
    "aider",
    "forge",
    "cursor-cli",
    "roo",
    "jcode",
    "deepseek-tui",
    "codewhale",
    "smelt",
    "pi",
    "goose",
    "interpreter",
    "warp",
    "omp",
    "letta",
    "agent-deck",
    "crush",
    "grok-build",
    "qwen",
  ];
  for (const id of expected) {
    assert.ok(id in CLI_TOOLS, `Missing tool: ${id}`);
  }
  assert.equal(Object.keys(CLI_TOOLS).length, expected.length);
  assert.equal(CLI_TOOLS.qwen.previewConfigMode, "qwen");
  // Confirm removed entries are gone
  assert.equal((CLI_TOOLS as Record<string, unknown>)["windsurf"], undefined);
  assert.equal((CLI_TOOLS as Record<string, unknown>)["amp"], undefined);
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

test("CLI tools registry does not export provider model mapping helper", async () => {
  const registry = await import("../../src/shared/constants/cliTools.ts");
  assert.equal("getProviderModelsForMapping" in registry, false);
});
