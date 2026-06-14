import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  groupSimilarLines,
  type GroupingOptions,
} from "../../../open-sse/services/compression/engines/rtk/grouper.ts";
import { processRtkText } from "../../../open-sse/services/compression/index.ts";

describe("RTK grouping strategy (R5)", () => {
  // ── Unit: groupSimilarLines ───────────────────────────────────────────────

  it("collapses N near-equivalent lines that differ only by numbers into one representative + count", () => {
    const lines = [
      "Downloaded chunk 1",
      "Downloaded chunk 2",
      "Downloaded chunk 3",
      "Downloaded chunk 4",
      "Downloaded chunk 5",
      "Downloaded chunk 6",
    ];
    const result = groupSimilarLines(lines.join("\n"));

    // Should have collapsed to fewer lines
    const outputLines = result.text.split("\n").filter((l) => l.trim());
    assert.ok(outputLines.length < lines.length, "grouped output should have fewer lines");

    // Count N (6) should appear in the output
    assert.match(result.text, /6/, "count of grouped items must appear in output");

    // grouped marker must be present
    assert.match(result.text, /\[rtk:grouped/i, "must emit rtk:grouped marker");

    // grouped count must be collapsed (no line 2..6 variants)
    assert.ok(!result.text.includes("chunk 2"), "intermediate variants should be collapsed");
    assert.ok(result.grouped > 0, "grouped count should be > 0");
  });

  it("preserves non-similar lines untouched", () => {
    const input = [
      "Downloading package 1",
      "Downloading package 2",
      "Downloading package 3",
      "Build succeeded",
      "Tests passed: 42",
    ].join("\n");

    const result = groupSimilarLines(input);

    assert.ok(result.text.includes("Build succeeded"), "unique line must survive");
    assert.ok(result.text.includes("Tests passed: 42"), "unique line must survive");
  });

  it("does not group when run-length is below threshold (default 3)", () => {
    const input = ["Fetching step 1", "Fetching step 2"].join("\n");
    const result = groupSimilarLines(input);

    // Below default threshold of 3 — should NOT be grouped
    assert.equal(result.grouped, 0);
    assert.ok(result.text.includes("Fetching step 1"));
    assert.ok(result.text.includes("Fetching step 2"));
  });

  it("respects a custom threshold option", () => {
    const input = ["Item 1", "Item 2"].join("\n");
    const resultDefault = groupSimilarLines(input);
    const resultLow = groupSimilarLines(input, { threshold: 2 });

    assert.equal(resultDefault.grouped, 0, "default threshold=3 should not group 2 lines");
    assert.ok(resultLow.grouped > 0, "threshold=2 should group 2 similar lines");
  });

  it("groups lines that differ by hex ids (volatile bits)", () => {
    const lines = [
      "Processing task a1b2c3d4",
      "Processing task e5f6a7b8",
      "Processing task c9d0e1f2",
    ];
    const result = groupSimilarLines(lines.join("\n"), { threshold: 3 });

    assert.ok(result.grouped > 0, "hex-id lines should be grouped");
    assert.match(result.text, /\[rtk:grouped/i);
  });

  it("groups lines that differ by timestamps (volatile bits)", () => {
    const lines = [
      "[2024-01-01 10:00:00] Heartbeat received",
      "[2024-01-01 10:00:05] Heartbeat received",
      "[2024-01-01 10:00:10] Heartbeat received",
    ];
    const result = groupSimilarLines(lines.join("\n"), { threshold: 3 });

    assert.ok(result.grouped > 0, "timestamp-prefixed lines should be grouped");
    assert.match(result.text, /\[rtk:grouped/i);
  });

  // ── Integration: processRtkText with enableGrouping flag ─────────────────

  it("processRtkText emits rtk-grouping in techniquesUsed when enableGrouping=true", () => {
    const lines = Array.from({ length: 6 }, (_, i) => `Downloaded chunk ${i + 1}`);
    const result = processRtkText(lines.join("\n"), {
      config: {
        enabled: true,
        enableGrouping: true,
      },
    });

    assert.ok(
      result.techniquesUsed.includes("rtk-grouping"),
      `techniquesUsed must include 'rtk-grouping', got: ${result.techniquesUsed.join(", ")}`
    );
    assert.ok(
      result.rulesApplied.some((r) => r.startsWith("rtk:group")),
      `rulesApplied must include rtk:group* rule, got: ${result.rulesApplied.join(", ")}`
    );
  });

  it("processRtkText does NOT apply grouping when enableGrouping is false (default)", () => {
    const lines = Array.from({ length: 6 }, (_, i) => `Downloaded chunk ${i + 1}`);
    const result = processRtkText(lines.join("\n"), {
      config: { enabled: true },
    });

    assert.ok(
      !result.techniquesUsed.includes("rtk-grouping"),
      "grouping must be OFF by default to preserve existing behaviour"
    );
  });

  it("grouped output is shorter than original input", () => {
    const lines = Array.from({ length: 8 }, (_, i) => `Checking dependency v${i + 1}.0.0`);
    const input = lines.join("\n");
    const result = processRtkText(input, {
      config: { enabled: true, enableGrouping: true },
    });

    assert.ok(
      result.text.length < input.length,
      "grouped output must be shorter than the original"
    );
  });
});
