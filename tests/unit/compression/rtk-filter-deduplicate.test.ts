import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { applyLineFilter } from "../../../open-sse/services/compression/engines/rtk/lineFilter.ts";
import type { RtkFilterDefinition } from "../../../open-sse/services/compression/engines/rtk/filterSchema.ts";

// A custom RTK filter can set `deduplicate: true` (rules.deduplicate in the filter JSON), and it
// was carried onto RtkFilterDefinition — but applyLineFilter never read it, so the flag did
// nothing. This wires it: when set, consecutive duplicate lines in the filter's output are
// collapsed (the same line-dedup the engine offers globally, now controllable per filter).
function filter(over: Partial<RtkFilterDefinition>): RtkFilterDefinition {
  return {
    id: "t",
    name: "t",
    description: "",
    commandTypes: [],
    commandPatterns: [],
    matchPatterns: [],
    category: "generic",
    priority: 50,
    stripPatterns: [],
    keepPatterns: [],
    priorityPatterns: [],
    collapsePatterns: [],
    stripAnsi: false,
    replace: [],
    matchOutput: [],
    truncateLineAt: 0,
    onEmpty: "",
    filterStderr: false,
    deduplicate: false,
    maxLines: 0,
    preserveHead: 20,
    preserveTail: 20,
    tests: [],
    ...over,
  };
}

const TEXT = ["start", "dup", "dup", "dup", "dup", "end"].join("\n");

describe("applyLineFilter — per-filter deduplicate flag", () => {
  it("collapses repeated lines and records the rule when deduplicate is set", () => {
    const result = applyLineFilter(TEXT, filter({ deduplicate: true }));
    assert.ok(result.appliedRules.includes("t:deduplicate"), "records the deduplicate rule");
    const dupCount = result.text.split(/\r?\n/).filter((l) => l === "dup").length;
    assert.ok(dupCount < 4, `the 4-line dup run must be collapsed (got ${dupCount} dup lines)`);
    assert.ok(result.text.includes("start") && result.text.includes("end"), "keeps non-dup lines");
  });

  it("does NOT deduplicate when the flag is off (default)", () => {
    const result = applyLineFilter(TEXT, filter({ deduplicate: false }));
    assert.ok(!result.appliedRules.includes("t:deduplicate"));
    const dupCount = result.text.split(/\r?\n/).filter((l) => l === "dup").length;
    assert.equal(dupCount, 4, "the dup run must remain intact when deduplicate is off");
  });
});
