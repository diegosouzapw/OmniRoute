/**
 * F1: cli-catalog-counts.test.ts
 * Assert catalog cardinality per plan 14 D15 / §3.1-§3.2.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");
const { EXPECTED_CODE_COUNT, EXPECTED_AGENT_COUNT } =
  await import("../../src/shared/schemas/cliCatalog.ts");

const all = Object.values(CLI_TOOLS);
const codeAll = all.filter((t) => t.category === "code");
const agentAll = all.filter((t) => t.category === "agent");
const codeVisible = codeAll.filter((t) => t.baseUrlSupport !== "none");

test(`CLI_TOOLS has exactly ${EXPECTED_CODE_COUNT} code entries with baseUrlSupport !== 'none'`, () => {
  assert.equal(
    codeVisible.length,
    EXPECTED_CODE_COUNT,
    `Expected ${EXPECTED_CODE_COUNT} visible code entries, got ${codeVisible.length}: ${codeVisible.map((t) => t.id).join(", ")}`
  );
});

test(`CLI_TOOLS has exactly ${EXPECTED_AGENT_COUNT} agent entries`, () => {
  assert.equal(
    agentAll.length,
    EXPECTED_AGENT_COUNT,
    `Expected ${EXPECTED_AGENT_COUNT} agent entries, got ${agentAll.length}: ${agentAll.map((t) => t.id).join(", ")}`
  );
});

test("CLI_TOOLS total code entries (including none) equals 25 (21 visible + 4 none)", () => {
  // code-none entries: antigravity, kiro, cursor (app), hermes (simple guide)
  const codeNone = codeAll.filter((t) => t.baseUrlSupport === "none");
  assert.equal(
    codeNone.length,
    4,
    `Expected 4 code entries with baseUrlSupport='none', got ${codeNone.length}: ${codeNone.map((t) => t.id).join(", ")}`
  );
  assert.equal(codeAll.length, 25, `Expected 25 total code entries, got ${codeAll.length}`);
});

test("CLI_TOOLS total (code + agent) = 33", () => {
  assert.equal(all.length, 33, `Expected 33 total entries, got ${all.length}`);
});

test("All code-none entries have configType mitm OR are legacy excluded entries", () => {
  const codeNone = codeAll.filter((t) => t.baseUrlSupport === "none");
  const allowedIds = new Set(["antigravity", "kiro", "cursor", "hermes"]);
  for (const entry of codeNone) {
    assert.ok(
      allowedIds.has(entry.id),
      `Unexpected code entry with baseUrlSupport='none': ${entry.id}`
    );
  }
});

test("All agent entries have baseUrlSupport 'full' or 'partial' (no agent is 'none')", () => {
  for (const entry of agentAll) {
    assert.notEqual(
      entry.baseUrlSupport,
      "none",
      `Agent entry '${entry.id}' has unexpected baseUrlSupport='none'`
    );
  }
});

test("The 21 visible code entries include Qwen Code's rebuilt integration", () => {
  const d15List = new Set([
    "claude",
    "codex",
    "cline",
    "kilo",
    "roo",
    "continue",
    "aider",
    "forge",
    "jcode",
    "deepseek-tui",
    "codewhale",
    "opencode",
    "droid",
    "copilot",
    "cursor-cli",
    "smelt",
    "pi",
    "custom",
    "crush",
    "grok-build",
    "qwen",
  ]);
  const visibleIds = new Set(codeVisible.map((t) => t.id));
  for (const id of d15List) {
    assert.ok(visibleIds.has(id), `D15 entry '${id}' not found in visible code list`);
  }
  for (const id of visibleIds) {
    assert.ok(d15List.has(id), `Visible code entry '${id}' not in D15 list`);
  }
});

test("The 8 agent entries match D15 list exactly (+ omp + letta, #6318)", () => {
  const d15Agents = new Set([
    "hermes-agent",
    "openclaw",
    "goose",
    "interpreter",
    "warp",
    "agent-deck",
    "omp",
    "letta",
  ]);
  const agentIds = new Set(agentAll.map((t) => t.id));
  for (const id of d15Agents) {
    assert.ok(agentIds.has(id), `D15 agent '${id}' not found in agent entries`);
  }
  for (const id of agentIds) {
    assert.ok(d15Agents.has(id), `Agent entry '${id}' not in D15 agent list`);
  }
});
