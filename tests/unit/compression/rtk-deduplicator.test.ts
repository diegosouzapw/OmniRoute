import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { deduplicateRepeatedLines } from "../../../open-sse/services/compression/engines/rtk/deduplicator.ts";

describe("RTK deduplicator", () => {
  it("collapses consecutive repeated lines with counters", () => {
    const result = deduplicateRepeatedLines(["same", "same", "same", "tail"].join("\n"), {
      threshold: 3,
    });

    assert.equal(result.collapsed, 2);
    assert.ok(result.text.includes("[line repeated 2x]"));
    assert.ok(result.text.includes("[rtk:dropped 2 repeated lines]"));
  });

  it("honors configurable threshold", () => {
    assert.equal(deduplicateRepeatedLines("a\na", { threshold: 3 }).collapsed, 0);
    assert.equal(deduplicateRepeatedLines("a\na", { threshold: 2 }).collapsed, 1);
  });
});
