import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { processRtkText } from "../../../open-sse/services/compression/engines/rtk/index.ts";

// The make filter (filters/make.json) declares:
//   preserve.summaryPatterns: ["built", "linking"]
//   preserve.errorPatterns:   ["error:", "failed", "***"]
//
// Its dropPatterns strip only "entering/leaving directory", empty lines, and
// "Nothing to be done". It has NO includePatterns (keepPatterns), so lines
// are NOT narrowed down by a keep-only pass — bulk filler survives the filter.
//
// This lets us craft content where, after applyLineFilter, there are still
// more lines than maxLinesPerResult, so the second smartTruncate in
// processRtkText fires.  The summary / error lines land in the MIDDLE, so
// they are outside the preserved head/tail and get dropped — unless the fix
// propagates filter.priorityPatterns into that smartTruncate call.

// Hardcoded default pattern in processRtkText:
//   /error|failed|exception|traceback|TS\d{4}|FAIL|✖/i
//
// "linking" does NOT match the hardcoded pattern → good test for summaryPatterns.
// "***" alone (without "Error"/"failed") does NOT match → good test for
// errorPatterns.  We use "*** [make-sentinel]" with no error-family words.

describe("RTK truncate – filter preserve patterns propagate to smartTruncate", () => {
  it("summary line declared in filter preserve.summaryPatterns survives truncation", () => {
    // 50 filler lines that don't match make's collapsePatterns (^cc|gcc|clang|g\+\+)
    const filler = Array.from(
      { length: 50 },
      (_, i) => `ld -rpath module${i}.o -o module${i}`
    ).join("\n");
    // "linking" matches make's summaryPatterns but NOT the hardcoded defaults.
    const summaryLine = "linking all objects into the final binary";
    const moreFiller = Array.from({ length: 50 }, (_, i) => `ranlib libfoo${i}.a`).join("\n");

    // make filter matches on command "^make\\b"
    const input = [filler, summaryLine, moreFiller].join("\n");

    // maxLinesPerResult=30 forces smartTruncate to fire after the filter
    const result = processRtkText(input, {
      command: "make all",
      config: { maxLinesPerResult: 30, maxCharsPerResult: 0, applyToCodeBlocks: false },
    });

    assert.ok(
      result.techniquesUsed.includes("rtk-truncate"),
      `expected rtk-truncate; techniquesUsed: ${result.techniquesUsed.join(", ")}`
    );

    // After the fix, "linking" must survive because the make filter's
    // preserve.summaryPatterns includes "linking".
    assert.ok(
      result.text.includes("linking"),
      `summary line was truncated away; got:\n${result.text}`
    );
  });

  it("error sentinel declared in filter preserve.errorPatterns survives truncation", () => {
    const filler = Array.from(
      { length: 50 },
      (_, i) => `ld -rpath module${i}.o -o module${i}`
    ).join("\n");
    // "***" matches make's errorPatterns but NOT the default hardcoded pattern
    // (/error|failed|exception|traceback|TS\d{4}|FAIL|✖/i) — no "error"/"failed".
    const errorLine = "make: *** [Makefile:10: all] compilation-sentinel-37f4";
    const moreFiller = Array.from({ length: 50 }, (_, i) => `ranlib libfoo${i}.a`).join("\n");

    const input = [filler, errorLine, moreFiller].join("\n");

    const result = processRtkText(input, {
      command: "make all",
      config: { maxLinesPerResult: 30, maxCharsPerResult: 0, applyToCodeBlocks: false },
    });

    assert.ok(
      result.techniquesUsed.includes("rtk-truncate"),
      `expected rtk-truncate; techniquesUsed: ${result.techniquesUsed.join(", ")}`
    );

    // "***" is in make filter's errorPatterns — must survive after the fix.
    assert.ok(
      result.text.includes("compilation-sentinel-37f4"),
      `error sentinel line was truncated away; got:\n${result.text}`
    );
  });
});
