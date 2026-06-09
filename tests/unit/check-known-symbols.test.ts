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
  type ExecutorLike,
} from "../../scripts/check/check-known-symbols.ts";

// ───────────────────────────────────────────────────────────────────────────
// (2) COMBO STRATEGIES — extractHandledStrategies + diffComboStrategies
// ───────────────────────────────────────────────────────────────────────────

test("extractHandledStrategies pulls every `strategy === \"...\"` literal, deduped", () => {
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
    '  "gemini-cli": new Foo(),',
    "  agy: new Foo(), // Alias",
    '  "amazon-q": new Foo("amazon-q"),',
    "};",
    "export function getExecutor() {}",
  ].join("\n");
  assert.deepEqual(extractExecutorAliases(src), [
    "antigravity",
    "gemini-cli",
    "agy",
    "amazon-q",
  ]);
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

test("IMPLICIT_DEFAULT_STRATEGIES documents `priority` with a justification", () => {
  assert.ok(Object.prototype.hasOwnProperty.call(IMPLICIT_DEFAULT_STRATEGIES, "priority"));
  assert.ok(IMPLICIT_DEFAULT_STRATEGIES.priority.length > 20);
});

test("KNOWN_TRANSLATOR_PAIRS is a non-empty, well-formed, deduped from:to snapshot", () => {
  assert.ok(KNOWN_TRANSLATOR_PAIRS.length > 0);
  assert.equal(new Set(KNOWN_TRANSLATOR_PAIRS).size, KNOWN_TRANSLATOR_PAIRS.length);
  for (const pair of KNOWN_TRANSLATOR_PAIRS) {
    assert.match(pair, /^[a-z0-9-]+:[a-z0-9-]+$/, `malformed translator pair: ${pair}`);
  }
});
