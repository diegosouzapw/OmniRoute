import test from "node:test";
import assert from "node:assert/strict";

import { applyStackedCompression } from "../../../open-sse/services/compression/strategySelector.ts";

/**
 * Regression coverage for the documented 78-95% "stacked" savings range
 * (docs/compression/COMPRESSION_GUIDE.md § "What 'eligible' actually means").
 *
 * A near-zero-savings result was reported on a real Claude Code session and initially looked
 * like a compression-pipeline bug. Investigation showed the pipeline was working correctly —
 * that session's tool output (file reads, grep matches) was genuinely non-redundant, so there
 * was nothing safe to remove. This test locks in the other half of the story: against content
 * the pipeline is actually designed for (an Anthropic-shape `tool_result` block full of exact
 * duplicate lines, as a stuck build loop would produce), RTK + Caveman must still deliver the
 * advertised range. If this regresses to near-zero, the compression pipeline itself broke —
 * unlike a single ordinary session's low savings, which is expected and not a bug.
 */
test("stacked RTK+Caveman achieves >90% token savings on a redundant Anthropic tool_result block", () => {
  const spammyLog = Array.from({ length: 300 }, () => "ERROR: connection refused at line 42").join(
    "\n"
  );

  const body = {
    model: "claude-sonnet-5",
    messages: [
      { role: "user", content: "Run the build and show me the log." },
      {
        role: "assistant",
        content: [
          { type: "text", text: "Running the build now." },
          { type: "tool_use", id: "toolu_01X", name: "Bash", input: { command: "npm run build" } },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "toolu_01X",
            content: [{ type: "text", text: spammyLog }],
          },
        ],
      },
    ],
  };

  const result = applyStackedCompression(body, [
    { engine: "rtk", intensity: "standard" },
    { engine: "caveman", intensity: "full" },
  ]);

  assert.equal(result.compressed, true, "expected the pipeline to report a compression happened");
  assert.ok(
    (result.stats?.savingsPercent ?? 0) > 90,
    `expected >90% token savings on redundant content, got ${result.stats?.savingsPercent}%`
  );
  assert.equal(
    result.stats?.fallbackApplied,
    undefined,
    "expected no validation fallback — the deduplicated log has nothing left to alter that " +
      "validateCompression() would flag (no code fences, URLs, versions, CONST_CASE identifiers)"
  );
});
