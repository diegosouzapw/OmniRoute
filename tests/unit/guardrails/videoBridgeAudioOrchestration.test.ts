import assert from "node:assert/strict";
import test from "node:test";

import { BridgeCache } from "../../../src/lib/guardrails/modalityBridge/bridgeCache.ts";
import { orchestrateVideoAudioTranscription } from "../../../src/lib/guardrails/videoBridgeAudioOrchestration.ts";

const VIDEO_BYTES = Buffer.from("fake video bytes");

function baseOptions(overrides: Partial<Parameters<typeof orchestrateVideoAudioTranscription>[0]> = {}) {
  return {
    extractAudio: async () => {
      throw new Error("extractAudio must not be called in this test");
    },
    hasUsableCredentials: async () => true,
    model: "deepgram/nova-3",
    operatorOptIn: true,
    requestOptIn: true,
    timeoutMs: 5_000,
    transcribe: async () => {
      throw new Error("transcribe must not be called in this test");
    },
    videoBytes: VIDEO_BYTES,
    ...overrides,
  };
}

function extraction(overrides: Partial<{ durationSeconds: number; dataUri: string }> = {}) {
  return {
    audio: {
      channels: 1,
      dataUri: overrides.dataUri ?? "data:audio/wav;base64,UklGRg==",
      sampleRateHz: 16_000,
    },
    durationSeconds: overrides.durationSeconds ?? 4,
  };
}

// --- Dual opt-in permutations -------------------------------------------------

test("neither opt-in: no extraction and no transcription call happens", async () => {
  let extractCalled = false;
  let transcribeCalled = false;
  const result = await orchestrateVideoAudioTranscription(
    baseOptions({
      operatorOptIn: false,
      requestOptIn: false,
      extractAudio: async () => {
        extractCalled = true;
        return extraction();
      },
      transcribe: async () => {
        transcribeCalled = true;
        return { text: "should never happen" };
      },
    })
  );

  assert.equal(result.attempted, false);
  assert.equal(result.reason, "OPERATOR_OPT_OUT");
  assert.equal(result.track, null);
  assert.equal(extractCalled, false);
  assert.equal(transcribeCalled, false);
});

test("operator opt-in only: request opt-out still blocks every call", async () => {
  let extractCalled = false;
  let transcribeCalled = false;
  const result = await orchestrateVideoAudioTranscription(
    baseOptions({
      operatorOptIn: true,
      requestOptIn: false,
      extractAudio: async () => {
        extractCalled = true;
        return extraction();
      },
      transcribe: async () => {
        transcribeCalled = true;
        return { text: "should never happen" };
      },
    })
  );

  assert.equal(result.attempted, false);
  assert.equal(result.reason, "REQUEST_OPT_OUT");
  assert.equal(extractCalled, false);
  assert.equal(transcribeCalled, false);
});

test("request opt-in only: operator opt-out still blocks every call", async () => {
  let extractCalled = false;
  let transcribeCalled = false;
  const result = await orchestrateVideoAudioTranscription(
    baseOptions({
      operatorOptIn: false,
      requestOptIn: true,
      extractAudio: async () => {
        extractCalled = true;
        return extraction();
      },
      transcribe: async () => {
        transcribeCalled = true;
        return { text: "should never happen" };
      },
    })
  );

  assert.equal(result.attempted, false);
  assert.equal(result.reason, "OPERATOR_OPT_OUT");
  assert.equal(extractCalled, false);
  assert.equal(transcribeCalled, false);
});

test("both opt-ins present: this is the only permutation that transcribes", async () => {
  let extractCalled = false;
  let transcribeCalled = false;
  const result = await orchestrateVideoAudioTranscription(
    baseOptions({
      operatorOptIn: true,
      requestOptIn: true,
      extractAudio: async (bytes) => {
        extractCalled = true;
        assert.equal(bytes, VIDEO_BYTES, "must reuse the exact same already-downloaded bytes");
        return extraction();
      },
      transcribe: async () => {
        transcribeCalled = true;
        return { text: "hello world" };
      },
    })
  );

  assert.equal(result.attempted, true);
  assert.equal(extractCalled, true);
  assert.equal(transcribeCalled, true);
  assert.ok(result.track);
  assert.equal(result.track?.observations[0]?.text, "hello world");
});

// --- Core scenarios ------------------------------------------------------------

test("audio extraction success feeds STT and returns a source-owned observation", async () => {
  const result = await orchestrateVideoAudioTranscription(
    baseOptions({
      extractAudio: async () => extraction({ durationSeconds: 6 }),
      transcribe: async () => ({ text: "spoken words" }),
    })
  );

  assert.equal(result.attempted, true);
  assert.equal(result.sttModel, "deepgram/nova-3");
  assert.equal(result.timingPrecision, "coarse");
  assert.deepEqual(result.track, {
    observations: [
      { confidence: 1, endSeconds: 6, source: "audio", startSeconds: 0, text: "spoken words" },
    ],
  });
});

test("STT success with provider segments preserves exact per-segment timing", async () => {
  const result = await orchestrateVideoAudioTranscription(
    baseOptions({
      extractAudio: async () => extraction({ durationSeconds: 10 }),
      transcribe: async () => ({
        segments: [
          { confidence: 0.9, endSeconds: 2, startSeconds: 0, text: "hello" },
          { endSeconds: 4, startSeconds: 2, text: "world" },
        ],
        text: "hello world",
      }),
    })
  );

  assert.equal(result.timingPrecision, "exact");
  assert.deepEqual(result.track?.observations, [
    { confidence: 0.9, endSeconds: 2, source: "audio", startSeconds: 0, text: "hello" },
    { confidence: 1, endSeconds: 4, source: "audio", startSeconds: 2, text: "world" },
  ]);
});

test("unavailable STT provider: extraction never runs and the result is a visual-only-safe partial", async () => {
  let extractCalled = false;
  const result = await orchestrateVideoAudioTranscription(
    baseOptions({
      hasUsableCredentials: async () => false,
      extractAudio: async () => {
        extractCalled = true;
        return extraction();
      },
    })
  );

  assert.equal(result.attempted, true);
  assert.equal(result.reason, "PROVIDER_UNAVAILABLE");
  assert.equal(result.sttModel, null);
  assert.equal(result.track, null);
  assert.equal(extractCalled, false, "no broker call once no provider is usable");
});

test("extraction timeout is reported distinctly from a generic extraction failure", async () => {
  const result = await orchestrateVideoAudioTranscription(
    baseOptions({
      extractAudio: async () => {
        throw new Error("Video audio extraction request aborted");
      },
    })
  );

  assert.equal(result.reason, "TIMEOUT");
  assert.equal(result.track, null);
});

test("caller abort during extraction is reported as ABORTED, not TIMEOUT", async () => {
  const controller = new AbortController();
  controller.abort();
  const result = await orchestrateVideoAudioTranscription(
    baseOptions({
      signal: controller.signal,
      extractAudio: async () => {
        throw new Error("Video audio extraction request aborted");
      },
    })
  );

  assert.equal(result.reason, "ABORTED");
});

test("caller abort during transcription is reported as ABORTED", async () => {
  const controller = new AbortController();
  const result = await orchestrateVideoAudioTranscription(
    baseOptions({
      signal: controller.signal,
      extractAudio: async () => extraction(),
      transcribe: async () => {
        controller.abort();
        throw new Error("Audio transcription timed out");
      },
    })
  );

  assert.equal(result.reason, "ABORTED");
});

test("transcription-boundary timeout is reported distinctly from a generic transcription failure", async () => {
  const result = await orchestrateVideoAudioTranscription(
    baseOptions({
      extractAudio: async () => extraction(),
      transcribe: async () => {
        throw new Error("Audio transcription timed out");
      },
    })
  );

  assert.equal(result.reason, "TIMEOUT");
});

test("a generic transcription failure is reported as TRANSCRIPTION_FAILED, not confused with a timeout", async () => {
  const result = await orchestrateVideoAudioTranscription(
    baseOptions({
      extractAudio: async () => extraction(),
      transcribe: async () => {
        throw new Error("Audio transcription failed (500)");
      },
    })
  );

  assert.equal(result.reason, "TRANSCRIPTION_FAILED");
});

test("a generic extraction failure (no audio track) is reported as EXTRACTION_FAILED", async () => {
  const result = await orchestrateVideoAudioTranscription(
    baseOptions({
      extractAudio: async () => {
        throw new Error("Stream map '0:a:0' matches no streams");
      },
    })
  );

  assert.equal(result.reason, "EXTRACTION_FAILED");
});

test("every failure path stays a well-defined partial — never throws, always track: null", async () => {
  for (const scenario of [
    () =>
      orchestrateVideoAudioTranscription(
        baseOptions({
          extractAudio: async () => {
            throw new Error("boom");
          },
        })
      ),
    () =>
      orchestrateVideoAudioTranscription(
        baseOptions({
          extractAudio: async () => extraction(),
          transcribe: async () => {
            throw new Error("boom");
          },
        })
      ),
    () => orchestrateVideoAudioTranscription(baseOptions({ hasUsableCredentials: async () => false })),
  ]) {
    const result = await scenario();
    assert.equal(result.track, null, "visual-only fallback must remain available");
  }
});

// --- Cache -----------------------------------------------------------------

test("a cache hit skips both the broker call and the transcription boundary", async () => {
  const cache = new BridgeCache({ maxEntries: 10, ttlMs: 60_000 });
  let extractCalls = 0;
  let transcribeCalls = 0;
  const options = baseOptions({
    cache,
    cacheKeyRef: "video-ref-1",
    extractAudio: async () => {
      extractCalls += 1;
      return extraction();
    },
    transcribe: async () => {
      transcribeCalls += 1;
      return { text: "cached transcript" };
    },
  });

  const first = await orchestrateVideoAudioTranscription(options);
  assert.equal(extractCalls, 1);
  assert.equal(transcribeCalls, 1);

  const second = await orchestrateVideoAudioTranscription(options);
  assert.equal(extractCalls, 1, "second call must not re-extract");
  assert.equal(transcribeCalls, 1, "second call must not re-transcribe — no repeat paid STT call");
  assert.deepEqual(second.track, first.track);
  assert.equal(second.attempted, true);
});

test("a different cache key (different video) does not share another video's cache entry", async () => {
  const cache = new BridgeCache({ maxEntries: 10, ttlMs: 60_000 });
  let extractCalls = 0;
  const run = (cacheKeyRef: string) =>
    orchestrateVideoAudioTranscription(
      baseOptions({
        cache,
        cacheKeyRef,
        extractAudio: async () => {
          extractCalls += 1;
          return extraction();
        },
        transcribe: async () => ({ text: "distinct transcript" }),
      })
    );

  await run("video-a");
  await run("video-b");
  assert.equal(extractCalls, 2, "each distinct video ref must be extracted independently");
});

// --- Shared budgets ----------------------------------------------------------

test("the same timeoutMs and signal thread through both the extraction and transcription steps", async () => {
  const controller = new AbortController();
  const seen: Array<{ signal?: AbortSignal; timeoutMs: number }> = [];
  await orchestrateVideoAudioTranscription(
    baseOptions({
      signal: controller.signal,
      timeoutMs: 42_000,
      extractAudio: async (_bytes, options) => {
        seen.push({ signal: options.signal, timeoutMs: options.timeoutMs });
        return extraction();
      },
      transcribe: async (_part, config) => {
        seen.push({ timeoutMs: config.timeoutMs });
        return { text: "ok" };
      },
    })
  );

  assert.equal(seen[0].timeoutMs, 42_000);
  assert.equal(seen[0].signal, controller.signal);
  assert.equal(seen[1].timeoutMs, 42_000, "the transcription boundary must reuse the same shared budget");
});
