import { test } from "node:test";
import assert from "node:assert";
import {
  extractHandledStrategies,
  diffComboStrategies,
  extractExecutorAliases,
  findNonConformingExecutors,
  findMissingTranslatorPairs,
  findNewTranslatorPairs,
  IMPLICIT_DEFAULT_STRATEGIES,
  KNOWN_TRANSLATOR_PAIRS,
  // (4) MCP tools
  checkMcpToolsHaveScopes,
  findMissingMcpTools,
  findNewMcpTools,
  KNOWN_MCP_TOOL_NAMES,
  // (5) A2A skills
  diffA2ASkills,
  // (6) Cloud agents
  diffCloudAgents,
  type ExecutorLike,
} from "../../scripts/check/check-known-symbols.ts";
import { reportStaleEntries } from "../../scripts/check/lib/allowlist.mjs";
import { ROUTING_STRATEGY_VALUES } from "../../src/shared/constants/routingStrategies.ts";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(fileURLToPath(import.meta.url), "../../..");

// ───────────────────────────────────────────────────────────────────────────
// (2) COMBO STRATEGIES — extractHandledStrategies + diffComboStrategies
// ───────────────────────────────────────────────────────────────────────────

test('extractHandledStrategies pulls every `strategy === "..."` literal, deduped', () => {
  const src = [
    'if (strategy === "round-robin") {',
    '} else if (strategy === "p2c") {',
    'const x = strategy === "weighted" ? a : b;',
    '} else if (strategy === "p2c") {', // dup → deduped by the Set
  ].join("\n");
  const handled = extractHandledStrategies(src);
  assert.deepEqual([...handled].sort(), ["p2c", "round-robin", "weighted"]);
});

test("extractHandledStrategies ignores non-matching comparisons", () => {
  const src = 'if (mode === "fast") {}\nif (strategy == "loose") {}\nif (strategy === "auto") {}';
  // `mode ===` and the loose `==` must not match; only the strict strategy compare.
  assert.deepEqual([...extractHandledStrategies(src)], ["auto"]);
});

test("diffComboStrategies: no mismatch when dispatch + implicit defaults cover canonical exactly", () => {
  const canonical = ["priority", "weighted", "auto"];
  const handled = new Set(["weighted", "auto"]);
  const implicit = { priority: "default no-branch" };
  const result = diffComboStrategies(canonical, handled, implicit);
  assert.deepEqual(result.canonicalNotHandled, []);
  assert.deepEqual(result.handledNotCanonical, []);
});

test("diffComboStrategies flags a canonical strategy added without a dispatch branch", () => {
  const canonical = ["priority", "weighted", "newfangled"];
  const handled = new Set(["weighted"]);
  const implicit = { priority: "default no-branch" };
  const result = diffComboStrategies(canonical, handled, implicit);
  assert.deepEqual(result.canonicalNotHandled, ["newfangled"]);
  assert.deepEqual(result.handledNotCanonical, []);
});

test("diffComboStrategies flags an invented dispatch string not in the canonical set", () => {
  const canonical = ["priority", "weighted"];
  const handled = new Set(["weighted", "ghost-strategy"]);
  const implicit = { priority: "default no-branch" };
  const result = diffComboStrategies(canonical, handled, implicit);
  assert.deepEqual(result.handledNotCanonical, ["ghost-strategy"]);
  assert.deepEqual(result.canonicalNotHandled, []);
});

test("diffComboStrategies: an implicit-default string handled in dispatch is not flagged as invented", () => {
  // If priority later gets an explicit branch, it appears in both handled AND implicit —
  // it must NOT be reported as an invented (handledNotCanonical) string.
  const canonical = ["priority", "weighted"];
  const handled = new Set(["priority", "weighted"]);
  const implicit = { priority: "default no-branch" };
  const result = diffComboStrategies(canonical, handled, implicit);
  assert.deepEqual(result.canonicalNotHandled, []);
  assert.deepEqual(result.handledNotCanonical, []);
});

// ───────────────────────────────────────────────────────────────────────────
// (1) EXECUTOR CONFORMANCE — extractExecutorAliases + findNonConformingExecutors
// ───────────────────────────────────────────────────────────────────────────

test("extractExecutorAliases parses quoted and bare keys from the executors literal", () => {
  const src = [
    'import { Foo } from "./foo.ts";',
    "const executors = {",
    "  antigravity: new Foo(),",
    "  agy: new Foo(), // Alias",
    '  "amazon-q": new Foo("amazon-q"),',
    "};",
    "export function getExecutor() {}",
  ].join("\n");
  assert.deepEqual(extractExecutorAliases(src), ["antigravity", "agy", "amazon-q"]);
});

test("extractExecutorAliases throws when the executors map cannot be located", () => {
  assert.throws(() => extractExecutorAliases("const other = { a: 1 };"), /could not find/);
});

test("findNonConformingExecutors returns [] when every alias resolves to a valid executor", () => {
  const good = { execute: () => {}, getProvider: () => "x" } as ExecutorLike;
  const resolve = (_alias: string) => good;
  const isInstance = (_value: unknown) => true;
  assert.deepEqual(findNonConformingExecutors(["a", "b"], resolve, isInstance), []);
});

test("findNonConformingExecutors flags an alias that does not resolve at all", () => {
  const good = { execute: () => {}, getProvider: () => "x" } as ExecutorLike;
  const resolve = (alias: string) => (alias === "ghost" ? null : good);
  const isInstance = (_value: unknown) => true;
  assert.deepEqual(findNonConformingExecutors(["a", "ghost", "b"], resolve, isInstance), ["ghost"]);
});

test("findNonConformingExecutors flags an alias resolving to a non-BaseExecutor instance", () => {
  const stray = { execute: () => {}, getProvider: () => "x" } as ExecutorLike;
  const resolve = (_alias: string) => stray;
  // Simulate `instanceof BaseExecutor` returning false for the stray object.
  const isInstance = (_value: unknown) => false;
  assert.deepEqual(findNonConformingExecutors(["stray"], resolve, isInstance), ["stray"]);
});

test("findNonConformingExecutors flags an executor missing execute() or getProvider()", () => {
  const noExecute = { getProvider: () => "x" } as ExecutorLike;
  const noProvider = { execute: () => {} } as ExecutorLike;
  const valid = { execute: () => {}, getProvider: () => "x" } as ExecutorLike;
  const map: Record<string, ExecutorLike> = { ne: noExecute, np: noProvider, ok: valid };
  const resolve = (alias: string) => map[alias];
  const isInstance = (_value: unknown) => true;
  assert.deepEqual(findNonConformingExecutors(["ne", "np", "ok"], resolve, isInstance), [
    "ne",
    "np",
  ]);
});

// ───────────────────────────────────────────────────────────────────────────
// (3) TRANSLATOR PAIRS — findMissingTranslatorPairs + findNewTranslatorPairs
// ───────────────────────────────────────────────────────────────────────────

test("findMissingTranslatorPairs returns [] when every frozen pair is still live", () => {
  const frozen = ["openai:claude", "claude:openai"];
  const live = new Set(["openai:claude", "claude:openai", "gemini:openai"]);
  assert.deepEqual(findMissingTranslatorPairs(frozen, live), []);
});

test("findMissingTranslatorPairs flags a frozen pair that disappeared from the live registry", () => {
  const frozen = ["openai:claude", "claude:openai"];
  const live = new Set(["openai:claude"]);
  assert.deepEqual(findMissingTranslatorPairs(frozen, live), ["claude:openai"]);
});

test("findNewTranslatorPairs reports live pairs absent from the frozen snapshot, sorted", () => {
  const frozen = ["openai:claude"];
  const live = new Set(["openai:claude", "z:y", "a:b"]);
  assert.deepEqual(findNewTranslatorPairs(frozen, live), ["a:b", "z:y"]);
});

test("findNewTranslatorPairs returns [] when live is a subset of frozen", () => {
  const frozen = ["openai:claude", "claude:openai"];
  const live = new Set(["openai:claude"]);
  assert.deepEqual(findNewTranslatorPairs(frozen, live), []);
});

// ───────────────────────────────────────────────────────────────────────────
// Allowlist / snapshot sanity (documented frozen sets stay well-formed)
// ───────────────────────────────────────────────────────────────────────────

test("IMPLICIT_DEFAULT_STRATEGIES: every documented key carries a non-trivial justification", () => {
  // The map may be empty (all canonical strategies are referenced in combo.ts), but any
  // entry that DOES exist must explain why the strategy has no explicit dispatch branch.
  for (const [key, justification] of Object.entries(IMPLICIT_DEFAULT_STRATEGIES)) {
    assert.ok(
      typeof justification === "string" && justification.length > 20,
      `weak/missing justification for "${key}"`
    );
  }
});

// --- stale-allowlist enforcement (6A.3) ---

test("stale-enforcement: an IMPLICIT_DEFAULT_STRATEGIES key now referenced in dispatch is reported as stale", () => {
  // "priority" gained a `strategy === "priority"` reference in combo.ts, so it is now in
  // the handled set and no longer in canonicalNotHandled — an implicit-default for it would
  // suppress nothing → stale.
  const liveImplicitNeeded: string[] = []; // canonicalNotHandled WITHOUT the allowlist
  const stale = (reportStaleEntries as (a: string[], l: string[], g: string) => string[])(
    ["priority"],
    liveImplicitNeeded,
    "known-symbols:combo"
  );
  assert.deepEqual(stale, ["priority"]);
});

test("stale-enforcement: an IMPLICIT_DEFAULT_STRATEGIES key still uncovered by dispatch is NOT stale", () => {
  // A canonical strategy with no `strategy === "..."` reference IS still suppressed by the
  // implicit-default, so the entry is live (must stay).
  const liveImplicitNeeded = ["priority"]; // priority would be canonicalNotHandled without it
  const stale = (reportStaleEntries as (a: string[], l: string[], g: string) => string[])(
    ["priority"],
    liveImplicitNeeded,
    "known-symbols:combo"
  );
  assert.deepEqual(stale, []);
});

test("stale-enforcement: live repo IMPLICIT_DEFAULT_STRATEGIES has no stale entries", () => {
  // Every key must still be a canonical strategy that lacks a `strategy === "..."` reference
  // in combo.ts; otherwise the suppression is dead and must be removed.
  const comboSource = fs.readFileSync(path.join(REPO_ROOT, "open-sse/services/combo.ts"), "utf8");
  const handled = extractHandledStrategies(comboSource);
  const liveImplicitNeeded = diffComboStrategies(
    ROUTING_STRATEGY_VALUES as readonly string[],
    handled,
    {}
  ).canonicalNotHandled;
  const stale = (reportStaleEntries as (a: string[], l: string[], g: string) => string[])(
    Object.keys(IMPLICIT_DEFAULT_STRATEGIES),
    liveImplicitNeeded,
    "known-symbols:combo"
  );
  assert.deepEqual(stale, [], `IMPLICIT_DEFAULT_STRATEGIES has stale entries: ${stale.join(", ")}`);
});

test("KNOWN_TRANSLATOR_PAIRS is a non-empty, well-formed, deduped from:to snapshot", () => {
  assert.ok(KNOWN_TRANSLATOR_PAIRS.length > 0);
  assert.equal(new Set(KNOWN_TRANSLATOR_PAIRS).size, KNOWN_TRANSLATOR_PAIRS.length);
  for (const pair of KNOWN_TRANSLATOR_PAIRS) {
    assert.match(pair, /^[a-z0-9-]+:[a-z0-9-]+$/, `malformed translator pair: ${pair}`);
  }
});

// ───────────────────────────────────────────────────────────────────────────
// (4) MCP TOOLS — scope check + snapshot catraca
// ───────────────────────────────────────────────────────────────────────────

test("checkMcpToolsHaveScopes returns [] when every tool has at least one scope", () => {
  const tools = [
    { name: "tool_a", scopes: ["read:health"] },
    { name: "tool_b", scopes: ["write:combos"] },
  ];
  assert.deepEqual(checkMcpToolsHaveScopes(tools), []);
});

test("checkMcpToolsHaveScopes flags tools with empty scopes array", () => {
  const tools = [
    { name: "tool_ok", scopes: ["read:health"] },
    { name: "tool_bad", scopes: [] as string[] },
  ];
  assert.deepEqual(checkMcpToolsHaveScopes(tools), ["tool_bad"]);
});

test("checkMcpToolsHaveScopes flags tools with undefined scopes", () => {
  const tools = [
    { name: "tool_ok", scopes: ["read:health"] },
    { name: "tool_no_scope", scopes: undefined as unknown as string[] },
  ];
  assert.deepEqual(checkMcpToolsHaveScopes(tools), ["tool_no_scope"]);
});

test("findMissingMcpTools returns [] when every frozen tool is still registered", () => {
  const frozen = ["tool_a", "tool_b"];
  const live = new Set(["tool_a", "tool_b", "tool_c"]);
  assert.deepEqual(findMissingMcpTools(frozen, live), []);
});

test("findMissingMcpTools flags a frozen tool that disappeared from the live registry", () => {
  const frozen = ["tool_a", "tool_b"];
  const live = new Set(["tool_a"]);
  assert.deepEqual(findMissingMcpTools(frozen, live), ["tool_b"]);
});

test("findNewMcpTools reports live tools absent from the frozen snapshot, sorted", () => {
  const frozen = ["tool_a"];
  const live = new Set(["tool_a", "tool_z", "tool_m"]);
  assert.deepEqual(findNewMcpTools(frozen, live), ["tool_m", "tool_z"]);
});

test("findNewMcpTools returns [] when live is a subset of frozen", () => {
  const frozen = ["tool_a", "tool_b"];
  const live = new Set(["tool_a"]);
  assert.deepEqual(findNewMcpTools(frozen, live), []);
});

test("KNOWN_MCP_TOOL_NAMES is a non-empty, well-formed, deduped snapshot", () => {
  assert.ok(KNOWN_MCP_TOOL_NAMES.length > 0);
  assert.equal(new Set(KNOWN_MCP_TOOL_NAMES).size, KNOWN_MCP_TOOL_NAMES.length);
  for (const name of KNOWN_MCP_TOOL_NAMES) {
    assert.match(name, /^[a-z0-9_]+$/, `malformed MCP tool name: ${name}`);
  }
});

// ───────────────────────────────────────────────────────────────────────────
// (5) A2A SKILLS — bidirectional diff
// ───────────────────────────────────────────────────────────────────────────

test("diffA2ASkills returns empty when handlers and agent card match exactly", () => {
  const handlers = new Set(["smart-routing", "quota-management", "health-report"]);
  const agentCard = new Set(["smart-routing", "quota-management", "health-report"]);
  const result = diffA2ASkills(handlers, agentCard);
  assert.deepEqual(result.inHandlersNotCard, []);
  assert.deepEqual(result.inCardNotHandlers, []);
});

test("diffA2ASkills flags skill in handlers but missing from agent card", () => {
  const handlers = new Set(["smart-routing", "ghost-skill"]);
  const agentCard = new Set(["smart-routing"]);
  const result = diffA2ASkills(handlers, agentCard);
  assert.deepEqual(result.inHandlersNotCard, ["ghost-skill"]);
  assert.deepEqual(result.inCardNotHandlers, []);
});

test("diffA2ASkills flags skill in agent card but missing from handlers", () => {
  const handlers = new Set(["smart-routing"]);
  const agentCard = new Set(["smart-routing", "orphan-skill"]);
  const result = diffA2ASkills(handlers, agentCard);
  assert.deepEqual(result.inHandlersNotCard, []);
  assert.deepEqual(result.inCardNotHandlers, ["orphan-skill"]);
});

// ───────────────────────────────────────────────────────────────────────────
// (6) CLOUD AGENTS — registry keys vs agent files
// ───────────────────────────────────────────────────────────────────────────

test("diffCloudAgents returns empty when registry and files match", () => {
  const registryKeys = new Set(["jules", "devin", "codex-cloud"]);
  const agentFiles = new Set(["jules", "devin", "codex-cloud"]);
  const result = diffCloudAgents(registryKeys, agentFiles);
  assert.deepEqual(result.inRegistryNotFiles, []);
  assert.deepEqual(result.inFilesNotRegistry, []);
});

test("diffCloudAgents flags registry key with no corresponding agent file", () => {
  const registryKeys = new Set(["jules", "ghost-agent"]);
  const agentFiles = new Set(["jules"]);
  const result = diffCloudAgents(registryKeys, agentFiles);
  assert.deepEqual(result.inRegistryNotFiles, ["ghost-agent"]);
  assert.deepEqual(result.inFilesNotRegistry, []);
});

test("diffCloudAgents flags agent file with no registry entry", () => {
  const registryKeys = new Set(["jules"]);
  const agentFiles = new Set(["jules", "orphan-agent"]);
  const result = diffCloudAgents(registryKeys, agentFiles);
  assert.deepEqual(result.inRegistryNotFiles, []);
  assert.deepEqual(result.inFilesNotRegistry, ["orphan-agent"]);
});
