// Characterization tests for #11657 (Video Bridge pipeline extraction).
//
// These exercise ONLY the public `VideoBridgeGuardrail.preCall` seam (the same
// seam tests/unit/guardrails/videoBridge.test.ts already covers extensively)
// and pin down the one aggregation edge case that suite does not: a SINGLE
// request that mixes a whole-result cache hit with a freshly described video.
// That is the exact branch the #11657 extraction had to preserve byte-for-byte
// when it moved the per-part loop body into videoBridgePipeline.ts's
// `processVideoPart` — a `successfulModels` Set populated from heterogeneous
// per-part outcomes (cache-hit metadata vs. a fresh `DescribedVideo`).
//
// Recorded evidence (see the #11657 PR body for the exact run): this file was
// run against the pre-extraction `videoBridge.ts` (git HEAD before #11657)
// and passed, then run again unchanged against the post-extraction code and
// passed identically.
import assert from "node:assert/strict";
import test from "node:test";

import { VideoBridgeGuardrail } from "../../../src/lib/guardrails/videoBridge.ts";

function twoVideoPayload(refA: string, refB?: string) {
  return {
    model: "example/text-only",
    messages: [
      {
        role: "user",
        content: [
          { type: "input_video", video_url: refA },
          ...(refB ? [{ type: "video_url", video_url: refB }] : []),
        ],
      },
    ],
  };
}

test("mixes a whole-result cache hit with a freshly described video in one request", async () => {
  let describeCalls = 0;
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoMaxVideos: 2,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeCacheEnabled: true,
        modalityBridgeCacheTtlMinutes: 60,
        modalityBridgeCacheMaxEntries: 50,
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      describePart: async () => {
        describeCalls += 1;
        const isFirst = describeCalls === 1;
        return {
          description: isFirst
            ? "[Video description: frame@t=00:01.000 first clip]"
            : "[Video description: frame@t=00:01.000 second clip]",
          durationSeconds: 2,
          framesRequested: 1,
          framesUsed: 1,
          modelUsed: isFirst ? "provider-a/model-a" : "provider-b/model-b",
        };
      },
    },
  });

  const refA = "data:video/mp4;base64,QUJD";
  const refB = "data:video/mp4;base64,REVG";

  // Warm the whole-result cache for video A alone.
  const warmup = await bridge.preCall(twoVideoPayload(refA), {});
  assert.equal(describeCalls, 1);
  assert.equal(warmup.meta?.videoModel, "provider-a/model-a");

  // Second request: video A is now a whole-result cache hit, video B is fresh.
  const result = await bridge.preCall(twoVideoPayload(refA, refB), {});

  assert.equal(describeCalls, 2, "the cached video must not call describePart again");
  assert.equal(result.meta?.videosProcessed, 2);
  assert.equal(result.meta?.videosReplaced, 2);
  assert.equal(result.meta?.failures, 0);
  assert.equal(result.meta?.framesUsed, 2, "frame counts from both outcomes must sum");
  assert.equal(
    result.meta?.videoModel,
    "mixed",
    "a cache-hit producer and a fresh producer must combine to \"mixed\""
  );
  assert.equal(
    result.meta?.cacheHits,
    0,
    "a whole-result cache hit must not be double-counted as a frame-level cache hit"
  );

  const modified = result.modifiedPayload as ReturnType<typeof twoVideoPayload>;
  const texts = (modified.messages[0].content as Array<{ text?: string }>).map((p) => p.text);
  assert.deepEqual(texts, [
    "[Video description: frame@t=00:01.000 first clip]",
    "[Video description: frame@t=00:01.000 second clip]",
  ]);
});
