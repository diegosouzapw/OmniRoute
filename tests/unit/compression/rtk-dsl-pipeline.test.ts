import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { validateRtkFilter } from "../../../open-sse/services/compression/engines/rtk/filterSchema.ts";
import { applyLineFilter } from "../../../open-sse/services/compression/engines/rtk/lineFilter.ts";

function makeFilter(overrides: Record<string, unknown> = {}) {
  return validateRtkFilter({
    id: "dsl-test",
    label: "DSL Test",
    category: "generic",
    priority: 100,
    match: { outputTypes: ["dsl-test"], commands: ["^dsl"], patterns: [] },
    preserve: { errorPatterns: ["error"], summaryPatterns: [] },
    ...overrides,
  });
}

describe("RTK declarative DSL pipeline", () => {
  it("runs stripAnsi, replace, strip, truncateLineAt, max lines, and onEmpty in order", () => {
    const filter = makeFilter({
      rules: {
        stripAnsi: true,
        replace: [{ pattern: "NOISE", replacement: "drop" }],
        dropPatterns: ["^drop"],
        truncateLineAt: 8,
        maxLines: 2,
        headLines: 2,
        tailLines: 0,
        onEmpty: "dsl: empty",
      },
    });

    const result = applyLineFilter(
      "\u001b[31mNOISE one\u001b[0m\nimportant-long-line\nsecond-long-line\nthird-long-line",
      filter
    );

    assert.ok(result.appliedRules.includes("dsl-test:strip-ansi"));
    assert.ok(result.appliedRules.includes("dsl-test:replace"));
    assert.ok(result.appliedRules.includes("dsl-test:strip"));
    assert.ok(result.appliedRules.includes("dsl-test:truncate-line"));
    assert.ok(result.text.includes("impor..."));
    assert.ok(!result.text.includes("NOISE"));
  });

  it("short-circuits matchOutput and respects unless", () => {
    const filter = makeFilter({
      rules: {
        matchOutput: [
          { pattern: "Build complete", message: "build: ok", unless: "error|failed" },
          { pattern: "Build complete", message: "build: completed with diagnostics" },
        ],
        dropPatterns: ["^noise"],
      },
    });

    assert.equal(applyLineFilter("Build complete", filter).text, "build: ok");
    assert.equal(
      applyLineFilter("Build complete\nerror: warning promoted", filter).text,
      "build: completed with diagnostics"
    );
  });

  it("uses onEmpty when filtering removes every line", () => {
    const filter = makeFilter({
      rules: {
        dropPatterns: [".*"],
        onEmpty: "dsl: empty",
      },
    });

    assert.equal(applyLineFilter("drop me", filter).text, "dsl: empty");
  });

  it("normalizes stderr prefixes before applying keep/drop rules", () => {
    const filter = makeFilter({
      rules: {
        filterStderr: true,
        includePatterns: ["^error:"],
        dropPatterns: ["debug"],
      },
    });

    const result = applyLineFilter(
      "stdout | ok\nstderr | error: boom\nstderr: debug noise",
      filter
    );

    assert.equal(result.text, "error: boom");
    assert.ok(result.appliedRules.includes("dsl-test:filter-stderr"));
    assert.ok(result.appliedRules.includes("dsl-test:keep"));
  });
});
