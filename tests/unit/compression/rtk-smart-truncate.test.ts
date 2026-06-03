import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { smartTruncate } from "../../../open-sse/services/compression/engines/rtk/smartTruncate.ts";

describe("RTK smart truncate", () => {
  it("leaves short text unchanged", () => {
    const result = smartTruncate("short\ntext", { maxLines: 10 });
    assert.equal(result.truncated, false);
    assert.equal(result.text, "short\ntext");
  });

  it("preserves head, tail and priority lines", () => {
    const text = Array.from({ length: 20 }, (_, index) =>
      index === 10 ? "ERROR important failure" : `line ${index}`
    ).join("\n");
    const result = smartTruncate(text, {
      maxLines: 8,
      preserveHead: 2,
      preserveTail: 2,
      priorityPatterns: [/ERROR/],
    });

    assert.equal(result.truncated, true);
    assert.ok(result.text.includes("line 0"));
    assert.ok(result.text.includes("ERROR important failure"));
    assert.ok(result.text.includes("line 19"));
    assert.ok(result.text.includes("[rtk:truncated"));
  });

  it("respects maxChars as alternate limit", () => {
    const result = smartTruncate("x".repeat(500), { maxChars: 80 });
    assert.equal(result.truncated, true);
    assert.ok(result.text.length <= 80);
  });

  it("respects maxChars when the marker consumes the full char budget", () => {
    const result = smartTruncate("x".repeat(500), { maxChars: 10 });

    assert.equal(result.truncated, true);
    assert.ok(result.text.length <= 10);
  });
});
