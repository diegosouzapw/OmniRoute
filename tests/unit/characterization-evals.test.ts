/**
 * Characterization — src/lib/evals (rail 3.8.55, pre-v4 extraction to @omniroute/mod-*).
 *
 * Pins the PUBLIC surface and observable behaviour of the eval framework as it is today so
 * the v4 extraction can be proven byte-for-byte. Quirks are pinned, not fixed — their test
 * names start with "characterization: … currently …". Surface snapshots are literal lists:
 * update them consciously, never by regeneration.
 *
 * External consumers (the real boundary): src/app/api/evals/route.ts (listSuites, runSuite,
 * createScorecard, buildEvalTargetOptions, runEvalSuiteAgainstTarget) and
 * src/app/api/evals/[suiteId]/route.ts (getSuite).
 *
 * "Fake judge": the grading step is exercised with the `custom` strategy, whose `fn` is the
 * judge — no model is called. The model-calling half (runEvalSuiteAgainstTarget →
 * chat-completions route) is only pinned up to its pre-flight validation.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-char-evals-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const runner = await import("../../src/lib/evals/evalRunner.ts");
const runtime = await import("../../src/lib/evals/runtime.ts");
const builtins = await import("../../src/lib/evals/evalRunner/builtinSuites.ts");
const evalsDb = await import("../../src/lib/db/evals.ts");

test.after(() => {
  runner.resetSuites();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ─── (a) Surface snapshots ───────────────────────────────────────────────────

test("surface: evals module runtime exports", () => {
  assert.deepEqual(
    {
      evalRunner: Object.keys(runner).sort(),
      runtime: Object.keys(runtime).sort(),
      builtinSuites: Object.keys(builtins).sort(),
    },
    {
      evalRunner: [
        "createScorecard",
        "evaluateCase",
        "getSuite",
        "listSuites",
        "registerSuite",
        "resetSuites",
        "runSuite",
      ],
      runtime: [
        "buildEvalCaseRequest",
        "buildEvalTargetOptions",
        "getEvalTargetLabel",
        "normalizeEvalTarget",
        "runEvalSuiteAgainstTarget",
      ],
      builtinSuites: [
        "builtInSuites",
        "codexComparisonSuite",
        "codingSuite",
        "goldenSet",
        "instructionSuite",
        "multilingualSuite",
        "reasoningSuite",
        "safetySuite",
      ],
    }
  );
});

test("surface: built-in suites registered at load (id, name, source, caseCount)", () => {
  const listed = runner
    .listSuites()
    .map((s) => [s.id, s.name, s.source, s.caseCount] as [string, string, string, number]);
  assert.deepEqual(listed, [
    ["golden-set", "OmniRoute Golden Set", "built-in", 10],
    ["coding-proficiency", "Coding Proficiency", "built-in", 5],
    ["reasoning-logic", "Reasoning & Logic", "built-in", 5],
    ["multilingual", "Multilingual", "built-in", 5],
    ["safety-guardrails", "Safety & Guardrails", "built-in", 6],
    ["instruction-following", "Instruction Following", "built-in", 5],
    ["codex-comparison", "Codex Comparison", "built-in", 8],
  ]);
  assert.deepEqual(
    builtins.builtInSuites.map((s) => s.id),
    listed.map(([id]) => id)
  );
});

// ─── (b) Contracts — run a minimal suite with a fake judge ───────────────────

const judgeCalls: Array<{ output: string; caseId: string }> = [];
const fakeJudge = (output: string, evalCase: { id: string }) => {
  judgeCalls.push({ output, caseId: evalCase.id });
  return output.includes("42");
};

const MINI_SUITE = {
  id: "char-mini",
  name: "Characterization Mini",
  description: "fake-judge suite",
  cases: [
    {
      id: "c1",
      name: "judge pass",
      model: "m-a",
      input: {},
      expected: { strategy: "custom", fn: fakeJudge },
    },
    {
      id: "c2",
      name: "judge fail",
      model: "m-a",
      input: {},
      expected: { strategy: "custom", fn: fakeJudge },
    },
    {
      id: "c3",
      name: "contains",
      model: "m-b",
      input: {},
      expected: { strategy: "contains", value: "PARIS" },
    },
    {
      id: "c4",
      name: "errored",
      model: "m-b",
      input: {},
      expected: { strategy: "regex", value: "error" },
    },
  ],
};

test("runSuite: fake-judge suite → per-case results + rounded summary", () => {
  runner.registerSuite(MINI_SUITE);
  judgeCalls.length = 0;
  const run = runner.runSuite(
    "char-mini",
    { c1: "the answer is 42", c2: "no idea", c3: "It is paris.", c4: "[ERROR] upstream error" },
    { c1: { durationMs: 12.6 }, c4: { durationMs: -5, error: "upstream error" } }
  );

  assert.equal(run.suiteId, "char-mini");
  assert.equal(run.suiteName, "Characterization Mini");
  assert.deepEqual(
    run.results.map((r) => [r.caseId, r.caseName, r.passed, r.error]),
    [
      ["c1", "judge pass", true, undefined],
      ["c2", "judge fail", false, undefined],
      ["c3", "contains", true, undefined],
      // A case whose call errored is forced to failed even though /error/ matched (#13137).
      ["c4", "errored", false, "upstream error"],
    ]
  );
  assert.deepEqual(judgeCalls, [
    { output: "the answer is 42", caseId: "c1" },
    { output: "no idea", caseId: "c2" },
  ]);
  // Case metrics override the measured duration: rounded, clamped at 0.
  assert.equal(run.results[0].durationMs, 13);
  assert.equal(run.results[3].durationMs, 0);
  assert.deepEqual(run.summary, { total: 4, passed: 2, failed: 2, passRate: 50 });
});

test("runSuite: missing output is graded as the empty string", () => {
  judgeCalls.length = 0;
  const run = runner.runSuite("char-mini", {});
  assert.deepEqual(
    judgeCalls.map((c) => c.output),
    ["", ""]
  );
  assert.deepEqual(run.summary, { total: 4, passed: 0, failed: 4, passRate: 0 });
});

test("createScorecard: aggregates runs; empty input → zeros", () => {
  const a = runner.runSuite("char-mini", { c1: "42", c3: "paris" });
  const card = runner.createScorecard([a, { ...a, suiteId: "x", suiteName: "X" }]);
  assert.deepEqual(card, {
    suites: 2,
    totalCases: 8,
    totalPassed: 4,
    overallPassRate: 50,
    perSuite: [
      { id: "char-mini", name: "Characterization Mini", passRate: 50 },
      { id: "x", name: "X", passRate: 50 },
    ],
  });
  assert.deepEqual(runner.createScorecard([]), {
    suites: 0,
    totalCases: 0,
    totalPassed: 0,
    overallPassRate: 0,
    perSuite: [],
  });
});

test("resetSuites: drops runtime-registered suites, keeps the built-ins", () => {
  assert.ok(runner.getSuite("char-mini"));
  runner.resetSuites();
  assert.equal(runner.getSuite("char-mini"), null);
  assert.equal(runner.listSuites().length, 7);
});

test("custom suites persisted in the DB are listed (source=custom) and runnable", () => {
  evalsDb.saveCustomEvalSuite({
    id: "char-custom",
    name: "Char Custom",
    cases: [
      {
        id: "k1",
        name: "says hi",
        model: "m-c",
        input: { messages: [{ role: "user", content: "hi" }] },
        expected: { strategy: "contains", value: "hello" },
      },
    ],
  });
  const listed = runner.listSuites().find((s) => s.id === "char-custom");
  assert.equal(listed?.source, "custom");
  assert.equal(listed?.caseCount, 1);
  assert.equal(runner.getSuite("char-custom")?.name, "Char Custom");
  const run = runner.runSuite("char-custom", { k1: "Hello there" });
  assert.deepEqual(run.summary, { total: 1, passed: 1, failed: 0, passRate: 100 });
});

// ─── (b) Contracts — evaluateCase strategies ─────────────────────────────────

function evalWith(expected: Record<string, unknown>, output: string) {
  const r = runner.evaluateCase({ id: "e", name: "E", expected }, output);
  return { passed: r.passed, error: r.error, details: r.details };
}

test("evaluateCase: exact / contains / regex semantics", () => {
  assert.equal(evalWith({ strategy: "exact", value: "A" }, "A").passed, true);
  assert.equal(evalWith({ strategy: "exact", value: "A" }, "a").passed, false);
  assert.equal(evalWith({ strategy: "contains", value: "WORLD" }, "hello world").passed, true);
  assert.equal(evalWith({ strategy: "contains", value: 5 }, "5").passed, false);
  // String patterns compile with dotAll, so "." spans newlines (#13138).
  assert.equal(evalWith({ strategy: "regex", value: "a.b" }, "a\nb").passed, true);
  assert.equal(evalWith({ strategy: "regex", value: /a.b/ }, "a\nb").passed, true);
  assert.equal(evalWith({ strategy: "regex", value: /^x$/g }, "x").passed, true);
  assert.equal(
    evalWith({ strategy: "exact", value: "A" }, "A".repeat(300)).details?.actualSnippet.length,
    240
  );
});

// ─── (c) Errors / invalid input ──────────────────────────────────────────────

test("evaluateCase: unknown strategy → passed=false with an error, no throw", () => {
  const r = evalWith({ strategy: "semantic" }, "x");
  assert.deepEqual(
    [r.passed, r.error, r.details],
    [false, "Unknown strategy: semantic", undefined]
  );
});

test("evaluateCase: unsafe / oversized / missing regex is rejected, not executed", () => {
  assert.deepEqual(
    evalWith({ strategy: "regex", value: "(a+)+$" }, "aaaa").details?.error,
    "Regex pattern rejected as potentially unsafe (catastrophic backtracking risk). Simplify the pattern."
  );
  assert.equal(
    evalWith({ strategy: "regex", value: "a".repeat(600) }, "a").details?.error,
    "Regex pattern too large for safe evaluation."
  );
  assert.equal(
    evalWith({ strategy: "regex" }, "a").details?.error,
    "No regex value provided for evaluation."
  );
});

test("characterization: evaluateCase 'custom' currently passes the judge's raw return value through", () => {
  // No fn → silently false (no error).
  assert.deepEqual(
    [evalWith({ strategy: "custom" }, "x").passed, evalWith({ strategy: "custom" }, "x").error],
    [false, undefined]
  );
  // A judge returning a truthy non-boolean is not coerced: `passed` is that value.
  assert.equal(evalWith({ strategy: "custom", fn: () => "yes" }, "x").passed, "yes");
  // A throwing judge is caught and reported as a failed case.
  const thrown = evalWith(
    {
      strategy: "custom",
      fn: () => {
        throw new Error("judge exploded");
      },
    },
    "x"
  );
  assert.deepEqual([thrown.passed, thrown.error], [false, "judge exploded"]);
});

test("evaluateCase: a case without `expected` is caught and reported, not thrown", () => {
  const r = runner.evaluateCase({ id: "bad", name: "Bad" }, "x");
  assert.equal(r.passed, false);
  assert.match(String(r.error), /Cannot read properties of undefined/);
});

test("runSuite: unknown suite id throws 'Suite not found: <id>'", () => {
  assert.throws(() => runner.runSuite("does-not-exist", {}), {
    message: "Suite not found: does-not-exist",
  });
  assert.equal(runner.getSuite("does-not-exist"), null);
});

// ─── (b) Contracts — runtime helpers ─────────────────────────────────────────

test("normalizeEvalTarget / getEvalTargetLabel", () => {
  assert.deepEqual(runtime.normalizeEvalTarget(null), { type: "suite-default", id: null });
  assert.deepEqual(runtime.normalizeEvalTarget({ type: "combo", id: "  fast  " }), {
    type: "combo",
    id: "fast",
  });
  // Any non-combo, non-default type collapses to "model".
  assert.deepEqual(runtime.normalizeEvalTarget({ type: "weird" as "model", id: "" }), {
    type: "model",
    id: null,
  });
  assert.equal(runtime.getEvalTargetLabel({ type: "combo", id: "fast" }), "Combo: fast");
  assert.equal(runtime.getEvalTargetLabel({ type: "model", id: null }), "Model: Unknown");
  assert.equal(runtime.getEvalTargetLabel({ type: "suite-default" }), "Suite defaults");
});

test("buildEvalCaseRequest: model resolution, defaults and headers", async () => {
  const caseDefault = runtime.buildEvalCaseRequest(
    { model: "m-a", input: { messages: [{ role: "user", content: "q" }] } },
    { type: "suite-default" },
    null
  );
  assert.equal(caseDefault.url, "http://localhost/api/v1/chat/completions");
  assert.equal(caseDefault.method, "POST");
  assert.equal(caseDefault.headers.get("authorization"), null);
  assert.deepEqual(JSON.parse(await caseDefault.text()), {
    messages: [{ role: "user", content: "q" }],
    model: "m-a",
    stream: false,
    max_tokens: 512,
  });

  const forced = runtime.buildEvalCaseRequest(
    { model: "m-a", input: { max_tokens: 64, stream: true } },
    { type: "combo", id: "fast" },
    "sk-x"
  );
  assert.equal(forced.headers.get("authorization"), "Bearer sk-x");
  assert.deepEqual(JSON.parse(await forced.text()), {
    stream: false,
    model: "fast",
    max_tokens: 64,
  });

  const fallback = runtime.buildEvalCaseRequest({ input: [] }, { type: "suite-default" }, null);
  assert.deepEqual(JSON.parse(await fallback.text()), {
    model: "gpt-4o",
    stream: false,
    max_tokens: 512,
  });
});

test("buildEvalTargetOptions: default option, then sorted case models, then combos", async () => {
  const options = await runtime.buildEvalTargetOptions();
  assert.deepEqual(options[0], {
    key: "suite-default:__default__",
    type: "suite-default",
    id: null,
    label: "Suite defaults",
    description: "Use each case's built-in model",
  });
  assert.deepEqual(
    options.slice(1).map((o) => o.key),
    [
      "model:claude-sonnet-4-20250514",
      "model:codex",
      "model:gemini-2.5-flash",
      "model:gpt-4o",
      "model:m-c", // from the persisted custom suite above
    ]
  );
});

test("runEvalSuiteAgainstTarget: pre-flight errors reject before any model call", async () => {
  await assert.rejects(runtime.runEvalSuiteAgainstTarget({ suiteId: "nope" }), {
    message: "Suite not found: nope",
  });
  await assert.rejects(
    runtime.runEvalSuiteAgainstTarget({ suiteId: "golden-set", apiKeyId: "missing-key" }),
    { message: "Selected API key was not found" }
  );
});
