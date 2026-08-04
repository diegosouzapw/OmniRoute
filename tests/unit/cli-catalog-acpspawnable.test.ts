/**
 * F1: cli-catalog-acpspawnable.test.ts
 * Assert acpSpawnable values per plan 14 D16.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");

// Per D16: acpSpawnable: true for tools that also appear in ACP Agents
const ACP_SPAWNABLE_IDS = [
  "codex",
  "claude",
  "goose",
  "openclaw",
  "aider",
  "opencode",
  "cline",
  "forge",
  "interpreter",
  "cursor-cli",
  "warp",
  "qwen",
];

for (const id of ACP_SPAWNABLE_IDS) {
  test(`'${id}' has acpSpawnable === true (in ACP Agents badge)`, () => {
    const entry = CLI_TOOLS[id];
    assert.ok(entry, `Entry '${id}' must exist in CLI_TOOLS`);
    assert.equal(
      entry.acpSpawnable,
      true,
      `Expected CLI_TOOLS['${id}'].acpSpawnable to be true, got ${entry.acpSpawnable}`
    );
  });
}

// Tools that should NOT be acpSpawnable
const NOT_ACP_SPAWNABLE_IDS = [
  "copilot",
  "droid",
  "kilo",
  "continue",
  "roo",
  "jcode",
  "deepseek-tui",
  "codewhale",
  "smelt",
  "pi",
  "hermes-agent",
  "agent-deck",
  "custom",
];

for (const id of NOT_ACP_SPAWNABLE_IDS) {
  test(`'${id}' has acpSpawnable === false`, () => {
    const entry = CLI_TOOLS[id];
    assert.ok(entry, `Entry '${id}' must exist in CLI_TOOLS`);
    assert.equal(
      entry.acpSpawnable,
      false,
      `Expected CLI_TOOLS['${id}'].acpSpawnable to be false, got ${entry.acpSpawnable}`
    );
  });
}

// windsurf was removed — should not exist
test("windsurf is not in CLI_TOOLS (removed per D17)", () => {
  assert.equal(
    (CLI_TOOLS as Record<string, unknown>)["windsurf"],
    undefined,
    "windsurf must not be in CLI_TOOLS (removed per plan 14 D17)"
  );
});
