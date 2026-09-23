import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { processRtkText } from "../../../open-sse/services/compression/engines/rtk/index.ts";
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

  it("preserves common severe failure lines in the RTK default priorities", () => {
    const text = Array.from({ length: 100 }, (_, index) => {
      if (index === 40) return "FATAL database unavailable";
      if (index === 45) return "SEVERE request unavailable";
      if (index === 50) return "PANIC unrecoverable state";
      if (index === 55) return "OOMKilled container terminated";
      return `line ${index}`;
    }).join("\n");
    const result = processRtkText(text, {
      command: "printf",
      config: { maxLinesPerResult: 32, maxCharsPerResult: 0, applyToCodeBlocks: false },
    });

    assert.ok(result.techniquesUsed.includes("rtk-truncate"));
    assert.ok(result.text.includes("FATAL database unavailable"));
    assert.ok(result.text.includes("SEVERE request unavailable"));
    assert.ok(result.text.includes("PANIC unrecoverable state"));
    assert.ok(result.text.includes("OOMKilled container terminated"));
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
