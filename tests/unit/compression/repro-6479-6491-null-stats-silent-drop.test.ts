import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { applyStackedCompression } from "../../../open-sse/services/compression/strategySelector.ts";

/**
 * Regression coverage for #6479 and #6491: a dispatched stacked-pipeline step whose engine
 * legitimately finds nothing eligible (`session-dedup` with no repeated blocks, `ccr` below its
 * min-chars threshold) returns `{ stats: null }`. Before the fix, `mergeStackStep()` in
 * `stackedStepCore.ts` silently dropped that step from the accumulator: no `engineBreakdown`
 * entry, no `validationWarnings`, no `validationErrors` — zero trace the engine ever ran.
 *
 * Both issues report the exact same symptom for two different registered/known engines, so both
 * are covered here against the shared fix (a `validationWarnings` entry recorded whenever a step
 * returns `stats: null`).
 */
describe("#6479/#6491 — null-stats step no longer silently dropped from the pipeline", () => {
  it("session-dedup with nothing to dedupe is explained in engineBreakdown or validationWarnings", () => {
    // Small markdown table, short rows — well under session-dedup's 80-char/3-line
    // suffix-block threshold, so session-dedup legitimately finds nothing to dedupe.
    const body = {
      messages: [
        {
          role: "user",
          content:
            "| a | b |\n|---|---|\n| 1 | 2 |\n| 1 | 2 |\n| 1 | 2 |\n| 1 | 2 |\n| 1 | 2 |\n| 1 | 2 |",
        },
      ],
    };

    const pipeline = [{ engine: "session-dedup" }, { engine: "rtk" }, { engine: "caveman" }];
    const result = applyStackedCompression(body, pipeline);

    const engines = result.stats?.engineBreakdown?.map((e) => e.engine) ?? [];
    const warnings = result.stats?.validationWarnings ?? [];
    const errors = result.stats?.validationErrors ?? [];

    assert.ok(
      engines.includes("session-dedup") ||
        warnings.some((w) => w.includes("session-dedup")) ||
        errors.some((w) => w.includes("session-dedup")),
      `session-dedup missing from engineBreakdown (${JSON.stringify(engines)}) with no ` +
        `explanation in validationWarnings/validationErrors — matches issue #6479's report`
    );
    // Specifically: the shared no-op reason must be present.
    assert.ok(
      warnings.some((w) => w === "session-dedup: skipped (no eligible content)") ||
        engines.includes("session-dedup"),
      `expected an explicit skip reason for session-dedup, got warnings=${JSON.stringify(warnings)}`
    );
  });

  it("ccr with no duplicate-eligible block (>=600 chars) is explained, not silently dropped", () => {
    const body = {
      messages: [
        {
          role: "tool",
          content: Array.from({ length: 8 }, () => "same noisy tool output line").join("\n"),
        },
        {
          role: "user",
          content:
            "Please provide a detailed explanation of the authentication configuration and how it works",
        },
      ],
    };

    const pipeline = [{ engine: "ccr" }];
    const result = applyStackedCompression(body, pipeline);

    const engines = result.stats?.engineBreakdown?.map((e) => e.engine) ?? [];
    const warnings = result.stats?.validationWarnings ?? [];
    const errors = result.stats?.validationErrors ?? [];

    assert.ok(
      engines.includes("ccr") ||
        warnings.some((w) => w.includes("ccr")) ||
        errors.some((w) => w.includes("ccr")),
      `ccr missing from engineBreakdown (${JSON.stringify(engines)}) with no explanation in ` +
        `validationWarnings/validationErrors — matches issue #6491's report`
    );
    assert.ok(
      warnings.some((w) => w === "ccr: skipped (no eligible content)") || engines.includes("ccr"),
      `expected an explicit skip reason for ccr, got warnings=${JSON.stringify(warnings)}`
    );
  });

  it("control: ccr with a large duplicate-eligible block (>=600 chars) still runs and advances", () => {
    const bigBody = {
      messages: [
        {
          role: "tool",
          content: Array.from({ length: 40 }, () => "same noisy tool output line").join("\n"),
        },
        { role: "user", content: "please explain" },
      ],
    };

    const result = applyStackedCompression(bigBody, [{ engine: "ccr" }]);
    const engines = result.stats?.engineBreakdown?.map((e) => e.engine) ?? [];
    assert.ok(engines.includes("ccr"), `expected 'ccr' in engineBreakdown (control), got ${JSON.stringify(engines)}`);
  });
});
