import assert from "node:assert/strict";
import test from "node:test";

import { VideoBridgeGuardrail } from "../../../src/lib/guardrails/videoBridge.ts";
import type { BridgeCacheEntry } from "../../../src/lib/guardrails/modalityBridge/bridgeCache.ts";

// FU-05 (#11652): "the normalized transcript contract must be part of cache
// identity ... cache hits cannot cross transcript identity or provenance
// changes." These tests exercise the third named seam alongside
// normalizeVideoTranscript/describeVideoPart: the guardrail's result-cache
// key, which already folds in a fingerprint of the raw transcript/
// audioTranscript payload (videoBridge.ts::buildVideoResultCacheKey).

function payloadWithTranscript(transcript: unknown): Record<string, unknown> {
  return {
    model: "example/text-only",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "input_video",
            video_url: "data:video/mp4;base64,VFJBTlNDUklQVC1DQUNIRQ==",
            transcript,
          },
        ],
      },
    ],
  };
}

function makeBridge(onDescribe: () => Promise<{ description: string; durationSeconds: number; framesRequested: number; framesUsed: number }>) {
  return new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeCacheEnabled: true,
        modalityBridgeCacheMaxEntries: 11,
        modalityBridgeCacheTtlMinutes: 5,
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVisionPrompt: "FU-05 transcript cache identity",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      describePart: onDescribe,
    },
  });
}

test("a cache hit does not cross a transcript provenance change on an otherwise identical video", async () => {
  let describeCalls = 0;
  const bridge = makeBridge(async () => {
    describeCalls += 1;
    return {
      description: "[Video description: cache identity probe]",
      durationSeconds: 5,
      framesRequested: 1,
      framesUsed: 1,
    };
  });

  const clientDeclared = {
    cues: [{ text: "same words", start: 1, end: 2, source: "client" }],
  };
  const audioBridgeDeclared = {
    cues: [{ text: "same words", start: 1, end: 2, source: "audio-bridge" }],
  };

  await bridge.preCall(payloadWithTranscript(clientDeclared), {});
  await bridge.preCall(payloadWithTranscript(clientDeclared), {});
  await bridge.preCall(payloadWithTranscript(audioBridgeDeclared), {});

  assert.equal(
    describeCalls,
    2,
    "the repeated identical (video, transcript) pair must reuse the cached result, " +
      "but the raw provenance change must force a miss even though both sources are " +
      "reclassified to client after normalization"
  );
});

test("a cache hit does not cross a transcript identity change (different cues, same video)", async () => {
  let describeCalls = 0;
  const bridge = makeBridge(async () => {
    describeCalls += 1;
    return {
      description: "[Video description: cache identity probe]",
      durationSeconds: 5,
      framesRequested: 1,
      framesUsed: 1,
    };
  });

  await bridge.preCall(
    payloadWithTranscript({ cues: [{ text: "first cue", start: 1, end: 2, source: "client" }] }),
    {}
  );
  await bridge.preCall(
    payloadWithTranscript({ cues: [{ text: "second cue", start: 1, end: 2, source: "client" }] }),
    {}
  );

  assert.equal(describeCalls, 2, "different transcript content must never share a cache entry");
});

test("the result-cache contract version is bumped to v6 for the descriptionRedacted cache-metadata addition (#12150)", async () => {
  let storedMetadata: Record<string, unknown> | undefined;
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeCacheEnabled: true,
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVisionPrompt: "FU-05 cache version",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      resultCache: {
        delete: () => undefined,
        getEntry: () => undefined,
        setEntry: (_key: string, entry: BridgeCacheEntry) => {
          storedMetadata = entry.metadata as Record<string, unknown>;
        },
      },
      describePart: async () => ({
        description: "[Video description: version probe]",
        durationSeconds: 1,
        framesRequested: 1,
        framesUsed: 1,
      }),
    },
  });

  await bridge.preCall(
    payloadWithTranscript({ cues: [{ text: "cue", start: 0, end: 1, source: "client" }] }),
    {}
  );

  assert.ok(storedMetadata);
  // #12150 P1a: VideoResultCacheMetadata gained `descriptionRedacted`, so the
  // contract version must be exactly "v6" — not merely "not the pre-FU-05
  // v4" — or a cache entry written before that field existed (v5 or older)
  // could be served post-diff with `descriptionRedacted` silently undefined.
  assert.equal(
    storedMetadata?.cacheVersion,
    "v6",
    "a cache entry computed under an older contract (pre-FU-05 v4, or pre-#12150 v5) must never match"
  );
});
