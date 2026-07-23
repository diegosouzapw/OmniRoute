/**
 * Split-guard — evalRunner ↔ evalRunner/builtinSuites
 *
 * Guards the extraction of the 7 built-in golden-set suites (pure data) into
 * the leaf `src/lib/evals/evalRunner/builtinSuites.ts`. Characterizes the suite
 * data (ids, case counts, key cases) and proves the host still registers every
 * leaf suite at module load. DB-free by design: only getSuite(builtInId) is
 * exercised, which short-circuits on the in-memory Map before any DB fallback.
 */

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";

import {
  goldenSet,
  codingSuite,
  reasoningSuite,
  multilingualSuite,
  safetySuite,
  instructionSuite,
  codexComparisonSuite,
  builtInSuites,
} from "../../src/lib/evals/evalRunner/builtinSuites.ts";

import { getSuite, resetSuites } from "../../src/lib/evals/evalRunner.ts";

describe("evalRunner/builtinSuites split-guard", () => {
  after(() => {
    // Restore built-ins in case a sibling test mutated the registry.
    resetSuites();
  });

  it("leaf exports the 7 built-in suites plus the aggregate array", () => {
    const named = [
      goldenSet,
      codingSuite,
      reasoningSuite,
      multilingualSuite,
      safetySuite,
      instructionSuite,
      codexComparisonSuite,
    ];
    for (const s of named) {
      assert.ok(s, "suite must be defined");
      assert.equal(typeof s.id, "string");
      assert.equal(typeof s.name, "string");
      assert.ok(Array.isArray(s.cases));
    }
    // Same references, same order — the host relies on this ordering for load-time registration.
    assert.equal(builtInSuites.length, 7);
    assert.deepEqual(builtInSuites, named);
  });

  it("built-in suite ids and case counts are stable (data pin)", () => {
    assert.deepEqual(
      builtInSuites.map((s) => [s.id, s.cases.length]),
      [
        ["golden-set", 10],
        ["coding-proficiency", 5],
        ["reasoning-logic", 5],
        ["multilingual", 5],
        ["safety-guardrails", 6],
        ["instruction-following", 5],
        ["codex-comparison", 8],
      ]
    );
  });

  it("golden-set first case is the contains-hello greeting", () => {
    const gs01 = goldenSet.cases[0];
    assert.equal(gs01.id, "gs-01");
    assert.equal(gs01.name, "Simple greeting");
    assert.equal(gs01.model, "gpt-4o");
    assert.deepEqual(gs01.expected, { strategy: "contains", value: "hello" });
  });

  it("every codex-comparison case targets the codex model", () => {
    assert.equal(codexComparisonSuite.id, "codex-comparison");
    assert.equal(codexComparisonSuite.cases.length, 8);
    for (const c of codexComparisonSuite.cases) {
      assert.equal(c.model, "codex");
    }
  });

  it("every safety-guardrails case carries the safety tag", () => {
    assert.equal(safetySuite.cases.length, 6);
    for (const c of safetySuite.cases) {
      assert.ok(
        Array.isArray(c.tags) && c.tags.includes("safety"),
        `case ${c.id} needs safety tag`
      );
    }
  });

  it("host registers every leaf suite at module load", () => {
    resetSuites();
    for (const s of builtInSuites) {
      const registered = getSuite(s.id);
      assert.ok(registered, `suite ${s.id} should be registered on the host`);
      assert.equal(registered.id, s.id);
      assert.equal(registered.name, s.name);
      assert.equal(registered.cases.length, s.cases.length);
    }
  });
});
