/**
 * The severity vocabulary is shared, and it stays shared.
 *
 * RTK decides which lines survive truncation at four independent stages, and before this
 * module the same idea was spelled out three times with three different word lists:
 *
 *   1. `index.ts::defaultPriorityPatterns` — engine hard cap
 *      (`error|failed|exception|traceback|TS\d{4}|FAIL|✖`)
 *   2. `filterSchema.ts::validateRtkFilter` — per-filter priority/keep patterns
 *   3. `rawOutput.ts::isLikelyFailureOutput` — retention predicate
 *      (`error|failed|failure|exception|traceback|panic|fatal|critical|TS\d{4}|FAIL`)
 *
 * The disagreement was observable: a `FATAL … rollback required` line was classified as a
 * failure worth retaining (layer 3) while the compressor truncated it out of the body
 * (layers 1-2), and `TS2345` was protected by layer 2 but not by layer 3.
 *
 * These tests pin the single source of truth. If a future change reintroduces a local copy
 * of the list, the drift test below fails — which is the point: the four stages must never
 * disagree about what a severity word is again.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  SEVERITY_ALTERNATION,
  SEVERITY_WORDS,
  severityPattern,
  severityPatternStrings,
  severityWordPattern,
} from "../../../open-sse/services/compression/engines/rtk/severityVocabulary.ts";
import { isLikelyFailureOutput } from "../../../open-sse/services/compression/engines/rtk/rawOutput.ts";
import { validateRtkFilter } from "../../../open-sse/services/compression/engines/rtk/filterSchema.ts";
import { applyLineFilter } from "../../../open-sse/services/compression/engines/rtk/lineFilter.ts";

describe("RTK severity vocabulary (single source of truth)", () => {
  it("exposes one vocabulary, not four", () => {
    const words = severityPatternStrings();
    assert.deepEqual(words, [...SEVERITY_WORDS]);
    assert.equal(new Set(words).size, words.length, "the vocabulary must not repeat a word");
    assert.equal(SEVERITY_ALTERNATION, SEVERITY_WORDS.join("|"));
  });

  it("compiles to a valid, case-insensitive matcher", () => {
    const pattern = severityPattern();
    assert.equal(pattern.flags, "i");
    assert.equal(severityWordPattern().flags, "i");
    // A pattern that throws here would take out the whole truncation path at request time.
    assert.doesNotThrow(() => severityWordPattern().test("anything"));
  });

  /**
   * The escape that broke once already: `TS\d{4}` must reach the regex compiler as a literal
   * backslash-d. Written as `TS\\d{4}` *inside a regex literal* it becomes an escaped
   * backslash followed by `d`, i.e. it matches nothing — the exact regression that made
   * `TS2345` unprotected at the engine layer while the filter layer still caught it.
   *
   * A bare `TS2345` line is the decisive case: it carries no other severity word, so any
   * layer that cannot see it drops it.
   */
  it("matches a bare TS compiler code, with no other severity word on the line", () => {
    const bareTsCode = "src/app.ts(12,5): TS2345: Argument of type 'string' is not assignable.";
    assert.ok(severityPattern().test(bareTsCode), "engine pattern must catch a bare TS code");
    assert.ok(severityWordPattern().test(bareTsCode), "retention pattern must catch it too");
    assert.ok(
      isLikelyFailureOutput(bareTsCode),
      "a bare TS code is failure output for retention purposes"
    );
    // And it must NOT be a false positive for ordinary output.
    assert.equal(severityPattern().test("INFO request handled service=api"), false);
  });

  it("keeps the terminal-state words the engine regex used to miss", () => {
    for (const word of ["FATAL", "CRITICAL", "SEVERE", "PANIC", "OOMKilled"]) {
      assert.ok(
        severityPattern().test(`2026-09-20 12:07:04 ${word} marker rollback required`),
        `${word} must be a severity word`
      );
    }
  });

  /**
   * Layer 3 must agree with layers 1-2. Before the fix this predicate knew neither
   * `fatal`-family retention semantics nor TS codes consistently with the engine.
   */
  it("agrees with the engine pattern on every vocabulary word", () => {
    for (const word of SEVERITY_WORDS) {
      const line = `2026-09-20 12:07:04 prefix ${word} suffix`;
      assert.equal(
        isLikelyFailureOutput(line),
        severityWordPattern().test(line),
        `retention predicate disagrees with the shared vocabulary on "${word}"`
      );
    }
  });

  /**
   * Layer 2 (the filter bridge) must inject the SAME list into the priority stage, so a
   * severity word is not dropped by truncation.
   */
  it("the filter bridge injects the shared vocabulary into the priority stage", () => {
    const filter = validateRtkFilter({
      id: "vocab-probe",
      label: "Vocab probe",
      description: "probe",
      category: "shell",
      match: { commands: ["probe"], patterns: [], outputTypes: [] },
      rules: { includePatterns: ["^INFO"] },
      preserve: { errorPatterns: ["^ERROR"] },
    });

    for (const word of SEVERITY_WORDS) {
      assert.ok(
        filter.priorityPatterns.includes(word),
        `priority set is missing the shared word "${word}"`
      );
    }
  });

  /**
   * The keep stage is the layer that TRUNCATES before any priority pattern runs, so the
   * vocabulary has to reach it — but NOT by rewriting `keepPatterns`:
   *
   *   - appending words to an EMPTY `includePatterns` would switch the stage on
   *     (lineFilter.ts: `if (keepPatterns.length > 0)`) and newly drop every non-severity
   *     line — a behaviour change, not a severity fix;
   *   - appending them to every filter's own list also leaks 23 words into the filter
   *     catalog and the inline-test/verify surfaces, which is what the first attempt at
   *     this fix did (and which broke `test-jest`'s own inline sample).
   *
   * The bypass therefore lives in `lineFilter.ts`, and the filter's own list stays exactly
   * what the filter declared.
   */
  it("leaves the filter's own keep list untouched — the bypass lives in the keep stage", () => {
    const filter = validateRtkFilter({
      id: "vocab-untouched-keep",
      label: "Vocab untouched keep",
      description: "probe",
      category: "shell",
      match: { commands: ["probe3"], patterns: [], outputTypes: [] },
      rules: { includePatterns: ["^INFO", "^WARN"] },
      preserve: { errorPatterns: ["^ERROR"] },
    });

    assert.deepEqual(
      filter.keepPatterns,
      ["^INFO", "^WARN"],
      "the bridge must not rewrite the filter's declared keep list"
    );
  });

  /**
   * The behavioural half: a severity line survives a filter whose `includePatterns` do not
   * mention it. This is the actual bug — a `FATAL … rollback required` line was dropped by
   * the keep stage in a filter that only listed ERROR/WARN, and the priority stage never
   * got the chance to protect it.
   */
  it("a severity line survives a keep stage that does not list it", () => {
    const filter = validateRtkFilter({
      id: "keep-bypass-probe",
      label: "Keep bypass probe",
      description: "probe",
      category: "shell",
      match: { commands: ["probe4"], patterns: [], outputTypes: [] },
      rules: { includePatterns: ["^INFO"] },
      preserve: { errorPatterns: ["^ERROR"] },
    });
    const severityLine = "2026-09-20 12:07:04 FATAL deployment aborted - rollback required";
    const output = ["2026-09-20 12:07:04 INFO starting", severityLine].join("\n");

    const applied = applyLineFilter(output, filter);

    assert.ok(
      applied.text.includes("FATAL deployment aborted"),
      "the keep stage dropped a severity line its includePatterns did not list"
    );
  });

  /**
   * The counterpart: an EMPTY `includePatterns` means the keep stage is skipped entirely
   * (lineFilter.ts: `if (keepPatterns.length > 0)`). Populating it would switch the stage on
   * and newly drop every non-severity line — a behaviour change, not a severity fix.
   */
  it("never switches the keep stage on for a filter that had none", () => {
    const filter = validateRtkFilter({
      id: "vocab-empty-keep",
      label: "Vocab empty keep",
      description: "probe",
      category: "shell",
      match: { commands: ["probe2"], patterns: [], outputTypes: [] },
      rules: { includePatterns: [] },
      preserve: { errorPatterns: ["^ERROR"] },
    });

    assert.deepEqual(filter.keepPatterns, [], "an empty keep stage must stay empty");
    assert.ok(
      filter.priorityPatterns.includes("fatal"),
      "the priority stage must still carry the vocabulary"
    );

    // And the stage must not start filtering: a non-severity line still survives it.
    const applied = applyLineFilter("2026-09-20 12:07:04 INFO starting", filter);
    assert.ok(applied.text.includes("INFO starting"), "the skipped keep stage must stay skipped");
  });
});
