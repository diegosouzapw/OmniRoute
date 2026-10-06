import assert from "node:assert/strict";
import test from "node:test";

import {
  buildModalityBridgeHeader,
  getBridgeStats,
  recordBridgeUse,
} from "../../src/lib/guardrails/modalityBridge/bridgeStats.ts";

test("composes vision, audio, and video bridge header segments in deterministic order", () => {
  assert.equal(
    buildModalityBridgeHeader([
      {
        guardrail: "vision-bridge",
        meta: { imagesProcessed: 2, visionModel: "openai/gpt-4o-mini" },
      },
      {
        guardrail: "audio-bridge",
        meta: { clipsProcessed: 1, sttModel: "deepgram/nova-3" },
      },
      {
        guardrail: "video-bridge",
        meta: { videoModel: "openai/gpt-4o-mini", videosProcessed: 3 },
      },
    ]),
    "image->text;model=openai/gpt-4o-mini;parts=2, " +
      "audio->text;model=deepgram/nova-3;parts=1, " +
      "video->text;model=openai/gpt-4o-mini;parts=3"
  );
});

test("tracks attempts, successes, failures, cache hits, and latency without counting failures as bridged", () => {
  const before = getBridgeStats().video;
  recordBridgeUse("video", { cacheHits: 2, latencyMs: 120 });
  recordBridgeUse("video", { failure: true, latencyMs: 80 });
  const after = getBridgeStats().video;

  assert.equal(after.attempts - before.attempts, 2);
  assert.equal(after.successes - before.successes, 1);
  assert.equal(after.bridged - before.bridged, 1);
  assert.equal(after.cacheHits - before.cacheHits, 2);
  assert.equal(after.failures - before.failures, 1);
  assert.equal(after.totalLatencyMs - before.totalLatencyMs, 200);
  assert.equal(after.latencySamples - before.latencySamples, 2);
  assert.equal(after.averageLatencyMs, after.totalLatencyMs / after.latencySamples);
  assert.match(after.lastUsedAt ?? "", /^\d{4}-\d{2}-\d{2}T/);
});

test("Vision and Audio attempts without timing do not fabricate zero-millisecond samples", () => {
  for (const kind of ["vision", "audio"] as const) {
    const before = getBridgeStats()[kind];
    recordBridgeUse(kind, { cacheHit: true });
    const after = getBridgeStats()[kind];
    assert.equal(after.attempts - before.attempts, 1);
    assert.equal(after.latencySamples, before.latencySamples);
    assert.equal(after.totalLatencyMs, before.totalLatencyMs);
  }
});

test("video header is omitted when every attempted video failed", () => {
  assert.equal(
    buildModalityBridgeHeader([
      {
        guardrail: "video-bridge",
        meta: { videoModel: "auto", videosProcessed: 0, videosReplaced: 1, failures: 1 },
      },
    ]),
    null
  );
});
