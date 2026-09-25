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

  it("keeps a severe line when a matching filter truncates first", () => {
    // docker-logs keeps only ERROR/WARN/Exception/Traceback/failed/listening/started,
    // then truncates to head 20 + tail 60. These markers sit in the dropped middle,
    // so they survive only when both the keep stage and preserve.errorPatterns
    // carry the severity vocabulary.
    const lines = ["Attaching to api"];
    for (let index = 0; index < 200; index++) {
      if (index === 40) lines.push("FATAL database unavailable");
      else if (index === 60) lines.push("SEVERE request unavailable");
      else if (index === 80) lines.push("CRITICAL disk pressure on /var");
      else if (index === 100) lines.push("PANIC unrecoverable state");
      else lines.push(`ERROR boom ${index}`);
    }
    lines.push("routine-chatter-xyz");

    const result = processRtkText(lines.join("\n"), {
      command: "docker logs api",
      config: { maxLinesPerResult: 32, maxCharsPerResult: 0, applyToCodeBlocks: false },
    });

    assert.ok(result.rulesApplied.includes("docker-logs:keep"));
    assert.ok(result.rulesApplied.includes("docker-logs:truncate"));
    assert.ok(result.text.includes("FATAL database unavailable"));
    assert.ok(result.text.includes("SEVERE request unavailable"));
    assert.ok(result.text.includes("CRITICAL disk pressure on /var"));
    assert.ok(result.text.includes("PANIC unrecoverable state"));
    assert.equal(result.text.includes("routine-chatter-xyz"), false);
  });

  it("keeps severe lines in the engine cap when no filter runs", () => {
    // skipFilters isolates the hard cap. Text containing "critical" otherwise
    // matches the npm-audit filter before that cap runs.
    const text = Array.from({ length: 100 }, (_, index) => {
      if (index === 40) return "FATAL database unavailable";
      if (index === 45) return "SEVERE request unavailable";
      if (index === 50) return "PANIC unrecoverable state";
      if (index === 55) return "CRITICAL deployment aborted";
      if (index === 65) return "OOMKilled container terminated";
      return `line ${index}`;
    }).join("\n");
    const result = processRtkText(text, {
      command: "printf",
      skipFilters: true,
      config: { maxLinesPerResult: 32, maxCharsPerResult: 0, applyToCodeBlocks: false },
    });

    assert.ok(result.techniquesUsed.includes("rtk-truncate"));
    assert.equal(result.techniquesUsed.includes("rtk-filter"), false);
    assert.ok(result.text.includes("FATAL database unavailable"));
    assert.ok(result.text.includes("SEVERE request unavailable"));
    assert.ok(result.text.includes("PANIC unrecoverable state"));
    assert.ok(result.text.includes("CRITICAL deployment aborted"));
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
