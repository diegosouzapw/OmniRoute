import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  validateRtkFilter,
  isReDoSProne,
} from "../../../open-sse/services/compression/engines/rtk/filterSchema.ts";

// Custom RTK filters (DATA_DIR/rtk/filters.json) carry user-supplied regex strings that are
// compiled and run against untrusted tool output. A nested unbounded quantifier ((a+)+, (a*)*)
// can trigger catastrophic backtracking (ReDoS). validateRtkFilter must drop such patterns so
// they are never compiled. Dependency-free heuristic (safe-regex not installable here).
describe("RTK filter ReDoS guard", () => {
  it("flags nested unbounded quantifiers and accepts safe patterns", () => {
    assert.equal(isReDoSProne("(a+)+"), true);
    assert.equal(isReDoSProne("(a*)*"), true);
    assert.equal(isReDoSProne("([a-z]+)+"), true);
    assert.equal(isReDoSProne("(a+|b)+"), true);
    assert.equal(isReDoSProne("(?:\\d+)+"), true);

    assert.equal(isReDoSProne("(ab)+"), false);
    assert.equal(isReDoSProne("\\d{1,8}"), false);
    assert.equal(isReDoSProne("error|fail|FAIL"), false);
    assert.equal(isReDoSProne("^\\s*$"), false);
  });

  it("strips ReDoS-prone patterns from a canonical filter at validation", () => {
    const def = validateRtkFilter({
      id: "x",
      label: "X",
      category: "generic",
      match: { commands: [], patterns: ["(a+)+", "ERROR\\b"], outputTypes: [] },
      rules: { dropPatterns: ["(.*)*", "^\\s*$"] },
      // preserve provided explicitly: a pack filter omitting it crashes validateRtkFilter
      // (pre-existing: rtkFilterPreserveSchema.default({}) leaves errorPatterns undefined).
      preserve: { errorPatterns: [], summaryPatterns: [] },
    });

    assert.deepEqual(def.matchPatterns, ["ERROR\\b"], "catastrophic matchPattern dropped");
    assert.deepEqual(def.stripPatterns, ["^\\s*$"], "catastrophic dropPattern removed");
  });

  it("strips ReDoS-prone patterns from a legacy filter at validation", () => {
    const def = validateRtkFilter({
      id: "y",
      name: "Y",
      category: "generic",
      commandTypes: ["shell"],
      stripPatterns: ["([a-z]+)*", "keepme"],
    });

    assert.deepEqual(def.stripPatterns, ["keepme"], "catastrophic legacy stripPattern removed");
  });
});
