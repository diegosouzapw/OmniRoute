import { test } from "node:test";
import assert from "node:assert/strict";
import { applyRtkCompression } from "../../open-sse/services/compression/engines/rtk/index.ts";

// Issue #10765: enabling RTK causes ~100% CPU even when the engine finds nothing to
// compress ("It also occurs when the engine does not modify the request and reports
// no token savings."). Root cause: applyRtkCompression() unconditionally calls
// createCompressionStats() at the end of the function — which does a full
// JSON.stringify() (+ tiktoken tokenize for Codex bodies) of the ENTIRE request body,
// TWICE (original + compressed) — even when zero messages were touched.
//
// Every sibling stacked engine (headroom, session-dedup, ccr, relevance, ionizer,
// readLifecycle) returns `stats: null` early when nothing changed, skipping this
// expensive computation entirely. RTK is the outlier: it always pays the cost.
test("RTK no-op run should skip the expensive stats computation (like sibling engines)", () => {
  const body = {
    model: "codex/gpt-5",
    provider: "codex",
    messages: [
      { role: "user", content: "hello, this is a simple message with nothing to compress" },
    ],
  };

  const result = applyRtkCompression(body, { config: { enabled: true } });

  assert.equal(result.compressed, false, "RTK made no changes");
  assert.equal(
    result.stats,
    null,
    "RTK should return stats: null on a no-op run, like every sibling stacked engine"
  );
});
