import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { discoverNormalizeLine } from "../../../open-sse/services/compression/engines/rtk/discover.ts";

describe("RTK discover — ReDoS safety (CLAUDE.md regex rule)", () => {
  it("normalizes a long word-char line with no '@' in bounded time", () => {
    // The package@version regex used to be /[\w][\w.-]*@.../ — catastrophic
    // backtracking on a long word-char run lacking '@'. Bounded quantifiers fix it.
    const pathological = "a".repeat(100_000); // 100k word chars, no '@'
    const start = performance.now();
    const out = discoverNormalizeLine(pathological);
    const elapsedMs = performance.now() - start;
    assert.ok(typeof out === "string");
    assert.ok(
      elapsedMs < 1000,
      `discoverNormalizeLine took ${elapsedMs.toFixed(0)}ms (ReDoS regression — must be < 1000ms)`
    );
  });

  it("still normalizes real package@version templates", () => {
    assert.equal(discoverNormalizeLine("left-pad@1.2.3"), "<PKG>@<N>");
    assert.equal(
      discoverNormalizeLine("npm WARN deprecated foo@2.0.0: msg"),
      "npm WARN deprecated <PKG>@<N>: msg"
    );
  });
});
