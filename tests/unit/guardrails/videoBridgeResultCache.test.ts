import assert from "node:assert/strict";
import test from "node:test";

import { VideoBridgeGuardrail } from "../../../src/lib/guardrails/videoBridge.ts";
import {
  BridgeCache,
  type BridgeCacheEntry,
} from "../../../src/lib/guardrails/modalityBridge/bridgeCache.ts";
import { getBridgeStats } from "../../../src/lib/guardrails/modalityBridge/bridgeStats.ts";
import {
  getSharedVideoResultCacheFor,
  runVideoResultSingleflight,
  VIDEO_RESULT_CACHE_MAX_BYTES,
} from "../../../src/lib/guardrails/videoBridgeResultCache.ts";

const remoteVideoPayload = () => ({
  model: "example/text-only",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "input_video",
          video_url: "https://example.test/fu01-content.mp4",
        },
      ],
    },
  ],
});

function resultText(result: Awaited<ReturnType<VideoBridgeGuardrail["preCall"]>>): string {
  const body = result.modifiedPayload as ReturnType<typeof remoteVideoPayload>;
  return String((body.messages[0].content[0] as { text?: string }).text);
}

test("result cache fingerprints protected bytes instead of trusting a stable HTTPS URL", async () => {
  const contents = [Buffer.from("video-a"), Buffer.from("video-b"), Buffer.from("video-b")];
  let fetchedContent = "";
  let fetchCalls = 0;
  let describeCalls = 0;
  const deps = {
    getSettings: async () => ({
      modalityBridgeCacheEnabled: true,
      modalityBridgeCacheMaxEntries: 17,
      modalityBridgeCacheTtlMinutes: 57,
      modalityBridgeVideoEnabled: true,
      modalityBridgeVideoModel: "openai/gpt-4o-mini",
      modalityBridgeVisionPrompt: "FU-01 content fingerprint",
    }),
    getCapabilities: () => ({ supportsVideo: false }),
    selectVisionModel: async () => "openai/gpt-4o-mini",
    fetchRemote: async (url: string) => {
      const buffer = contents[Math.min(fetchCalls, contents.length - 1)];
      fetchCalls += 1;
      fetchedContent = buffer.toString("utf8");
      return { buffer, contentType: "video/mp4", url };
    },
    describePart: async () => {
      describeCalls += 1;
      return {
        description: `[Video description: ${fetchedContent}]`,
        durationSeconds: 1,
        framesRequested: 1,
        framesUsed: 1,
      };
    },
  };
  const bridge = new VideoBridgeGuardrail({ deps });

  const first = await bridge.preCall(remoteVideoPayload(), {});
  const second = await bridge.preCall(remoteVideoPayload(), {});
  const third = await bridge.preCall(remoteVideoPayload(), {});

  assert.match(resultText(first), /video-a/);
  assert.match(resultText(second), /video-b/);
  assert.match(resultText(third), /video-b/);
  assert.equal(fetchCalls, 3, "each HTTPS lookup must authenticate the current protected bytes");
  assert.equal(describeCalls, 2, "only identical content may reuse the complete result");
});

test("concurrent requests singleflight extraction and captions for identical content", async () => {
  let extractCalls = 0;
  let captionCalls = 0;
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeCacheEnabled: true,
        modalityBridgeCacheMaxEntries: 19,
        modalityBridgeCacheTtlMinutes: 59,
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVisionPrompt: "FU-01 singleflight",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      extractFrames: async () => {
        extractCalls += 1;
        await new Promise((resolve) => setTimeout(resolve, 25));
        return {
          durationSeconds: 1,
          frames: [{ dataUri: "data:image/jpeg;base64,U0lOR0xFRkxJR0hU", timestampSeconds: 0.5 }],
        };
      },
      callVisionModel: async () => {
        captionCalls += 1;
        return "one shared observation";
      },
    },
  });
  const payload = () => ({
    model: "example/text-only",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "input_video",
            video_url: "data:video/mp4;base64,U0lOR0xFRkxJR0hULVZJREVP",
          },
        ],
      },
    ],
  });

  const beforeStats = getBridgeStats().video;
  const [first, second] = await Promise.all([
    bridge.preCall(payload(), {}),
    bridge.preCall(payload(), {}),
  ]);
  const afterCoalesced = getBridgeStats().video;

  assert.equal(
    afterCoalesced.resultCacheHits - beforeStats.resultCacheHits,
    0,
    "joining in-flight work is not a persistent cache hit"
  );
  assert.equal(
    afterCoalesced.resultSingleflightCoalesced - beforeStats.resultSingleflightCoalesced,
    1,
    "the joining request must be reported as coalesced work"
  );
  assert.equal(afterCoalesced.resultCacheBytes, beforeStats.resultCacheBytes);
  assert.equal(afterCoalesced.resultCacheLatencyMs, beforeStats.resultCacheLatencyMs);

  const third = await bridge.preCall(payload(), {});
  const afterPersistentHit = getBridgeStats().video;

  assert.match(resultText(first), /one shared observation/);
  assert.match(resultText(second), /one shared observation/);
  assert.match(resultText(third), /one shared observation/);
  assert.equal(extractCalls, 1, "singleflight and the persistent hit must skip duplicate FFmpeg");
  assert.equal(captionCalls, 1, "singleflight and the persistent hit must skip duplicate captions");
  assert.equal(afterPersistentHit.resultCacheHits - beforeStats.resultCacheHits, 1);
  assert.equal(
    afterPersistentHit.resultSingleflightCoalesced - beforeStats.resultSingleflightCoalesced,
    1
  );
  assert.ok(
    afterPersistentHit.resultCacheBytes > beforeStats.resultCacheBytes,
    "only the completed-store hit contributes cached result bytes"
  );
});

test("result cache skips entries that exceed its aggregate byte budget", async () => {
  const cacheOptions = { maxBytes: 64, maxEntries: 10, ttlMs: 60_000 };
  const resultCache = new BridgeCache(cacheOptions);
  let describeCalls = 0;
  const deps = {
    getSettings: async () => ({
      modalityBridgeCacheEnabled: true,
      modalityBridgeCacheMaxEntries: 23,
      modalityBridgeCacheTtlMinutes: 63,
      modalityBridgeVideoEnabled: true,
      modalityBridgeVideoModel: "openai/gpt-4o-mini",
      modalityBridgeVisionPrompt: "FU-01 byte budget",
    }),
    getCapabilities: () => ({ supportsVideo: false }),
    selectVisionModel: async () => "openai/gpt-4o-mini",
    resultCache,
    describePart: async () => {
      describeCalls += 1;
      return {
        description: `[Video description: ${"x".repeat(256)}]`,
        durationSeconds: 1,
        framesRequested: 1,
        framesUsed: 1,
      };
    },
  };
  const bridge = new VideoBridgeGuardrail({ deps });
  const payload = {
    model: "example/text-only",
    messages: [
      {
        role: "user",
        content: [{ type: "input_video", video_url: "data:video/mp4;base64,QllURS1CVURHRVQ=" }],
      },
    ],
  };

  assert.ok((await bridge.preCall(structuredClone(payload), {})).modifiedPayload);
  assert.ok((await bridge.preCall(structuredClone(payload), {})).modifiedPayload);
  assert.equal(describeCalls, 2, "oversized results must fail open without being retained");
});

test("result cache enforces aggregate eviction and the fixed 16 MiB boundary", async (t) => {
  await t.test("aggregate bytes evict the least-recently-used entry", () => {
    const cache = new BridgeCache({ maxBytes: 140, maxEntries: 10, ttlMs: 60_000 });
    cache.setEntry("a", { value: "a".repeat(80) });
    cache.setEntry("b", { value: "b".repeat(80) });

    assert.equal(cache.getEntry("a"), undefined);
    assert.equal(cache.getEntry("b")?.value, "b".repeat(80));
    assert.ok(cache.bytes <= 140);
  });

  await t.test("the dedicated cache accepts the exact boundary and rejects one byte more", () => {
    const cache = getSharedVideoResultCacheFor({ cacheMaxEntries: 2, cacheTtlMinutes: 61 });
    const key = "k".repeat(64);
    const storedEnvelopeBytes = Buffer.byteLength(key, "utf8") + Buffer.byteLength("{}", "utf8");
    const exactValue = "x".repeat(VIDEO_RESULT_CACHE_MAX_BYTES - storedEnvelopeBytes);
    try {
      cache.clear();
      cache.setEntry(key, { value: exactValue });
      assert.equal(cache.size, 1);
      assert.equal(cache.bytes, VIDEO_RESULT_CACHE_MAX_BYTES);

      cache.clear();
      cache.setEntry(key, { value: `${exactValue}x` });
      assert.equal(cache.size, 0);
      assert.equal(cache.bytes, 0);
    } finally {
      cache.clear();
    }
  });
});

test("result cache expires complete results at its TTL", async () => {
  let now = 1_000;
  const resultCache = new BridgeCache({
    maxBytes: 4_096,
    maxEntries: 10,
    now: () => now,
    ttlMs: 10,
  });
  let describeCalls = 0;
  const deps = {
    getSettings: async () => ({
      modalityBridgeCacheEnabled: true,
      modalityBridgeVideoEnabled: true,
      modalityBridgeVideoModel: "openai/gpt-4o-mini",
      modalityBridgeVisionPrompt: "FU-01 TTL",
    }),
    getCapabilities: () => ({ supportsVideo: false }),
    selectVisionModel: async () => "openai/gpt-4o-mini",
    resultCache,
    describePart: async () => {
      describeCalls += 1;
      return {
        description: `[Video description: ttl-${describeCalls}]`,
        durationSeconds: 1,
        framesRequested: 1,
        framesUsed: 1,
      };
    },
  };
  const bridge = new VideoBridgeGuardrail({ deps });
  const payload = {
    model: "example/text-only",
    messages: [
      {
        role: "user",
        content: [{ type: "input_video", video_url: "data:video/mp4;base64,VFRMLVZJREVP" }],
      },
    ],
  };

  await bridge.preCall(structuredClone(payload), {});
  await bridge.preCall(structuredClone(payload), {});
  assert.equal(describeCalls, 1, "the unexpired request must hit");
  now = 1_011;
  await bridge.preCall(structuredClone(payload), {});
  assert.equal(describeCalls, 2, "the expired request must recompute");
});

test("result cache evicts the least-recently-used content at its entry bound", async () => {
  const resultCache = new BridgeCache({ maxBytes: 4_096, maxEntries: 1, ttlMs: 60_000 });
  let describeCalls = 0;
  const deps = {
    getSettings: async () => ({
      modalityBridgeCacheEnabled: true,
      modalityBridgeVideoEnabled: true,
      modalityBridgeVideoModel: "openai/gpt-4o-mini",
      modalityBridgeVisionPrompt: "FU-01 LRU",
    }),
    getCapabilities: () => ({ supportsVideo: false }),
    selectVisionModel: async () => "openai/gpt-4o-mini",
    resultCache,
    describePart: async () => {
      describeCalls += 1;
      return {
        description: `[Video description: lru-${describeCalls}]`,
        durationSeconds: 1,
        framesRequested: 1,
        framesUsed: 1,
      };
    },
  };
  const bridge = new VideoBridgeGuardrail({ deps });
  const payload = (base64: string) => ({
    model: "example/text-only",
    messages: [
      {
        role: "user",
        content: [{ type: "input_video", video_url: `data:video/mp4;base64,${base64}` }],
      },
    ],
  });

  await bridge.preCall(payload("TFJVLUE="), {});
  await bridge.preCall(payload("TFJVLUI="), {});
  await bridge.preCall(payload("TFJVLUE="), {});
  assert.equal(describeCalls, 3, "content A must recompute after content B evicts it");
});

test("an unavailable result cache fails open to normal video processing", async () => {
  let describeCalls = 0;
  const debugMessages: string[] = [];
  const unavailableCache = {
    delete: () => {
      throw new Error("cache unavailable");
    },
    getEntry: () => {
      throw new Error("cache unavailable");
    },
    setEntry: () => {
      throw new Error("cache unavailable");
    },
  };
  const deps = {
    getSettings: async () => ({
      modalityBridgeCacheEnabled: true,
      modalityBridgeVideoEnabled: true,
      modalityBridgeVideoModel: "openai/gpt-4o-mini",
      modalityBridgeVisionPrompt: "FU-01 unavailable cache",
    }),
    getCapabilities: () => ({ supportsVideo: false }),
    selectVisionModel: async () => "openai/gpt-4o-mini",
    resultCache: unavailableCache,
    describePart: async () => {
      describeCalls += 1;
      return {
        description: "[Video description: normal fail-open result]",
        durationSeconds: 1,
        framesRequested: 1,
        framesUsed: 1,
      };
    },
  };
  const bridge = new VideoBridgeGuardrail({ deps });
  const result = await bridge.preCall(
    {
      model: "example/text-only",
      messages: [
        {
          role: "user",
          content: [{ type: "input_video", video_url: "data:video/mp4;base64,VU5BVkFJTEFCTEU=" }],
        },
      ],
    },
    {
      log: {
        debug: (_tag, message) => {
          debugMessages.push(message);
        },
      },
    }
  );

  assert.match(resultText(result), /normal fail-open result/);
  assert.equal(describeCalls, 1);
  assert.deepEqual(debugMessages, [
    "Video result cache read failed open",
    "Video result cache write failed open",
  ]);
});

test("result-cache metadata carries the exact visual dedup policy identity", async () => {
  let storedMetadata: Record<string, unknown> | undefined;
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeCacheEnabled: true,
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoFrameCount: 8,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVisionPrompt: "FU-03 policy identity",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      resultCache: {
        delete: () => undefined,
        getEntry: () => undefined,
        setEntry: (_key: string, entry: BridgeCacheEntry) => {
          storedMetadata = entry.metadata;
        },
      },
      describePart: async () => ({
        dedupDropped: 2,
        description: "[Video description: policy-bound result]",
        durationSeconds: 3,
        framesExtracted: 16,
        framesRequested: 8,
        framesUsed: 8,
      }),
    },
  });

  await bridge.preCall(
    {
      model: "example/text-only",
      messages: [
        {
          role: "user",
          content: [{ type: "input_video", video_url: "data:video/mp4;base64,RlUtMDM=" }],
        },
      ],
    },
    {}
  );

  assert.ok(storedMetadata);
  // #12150 P1a: bumped to v6 alongside the descriptionRedacted cache-metadata
  // addition (see videoBridgeTranscriptCacheIdentity.test.ts for the
  // dedicated contract-version regression guard).
  assert.equal(storedMetadata.cacheVersion, "v6");
  assert.equal(storedMetadata.policyVersion, "sampling-then-dedup-v2");
  assert.equal(storedMetadata.dedupPolicyVersion, "grayscale-16x16-mean-cells-v2");
  assert.equal(storedMetadata.dedupThreshold, 0.04);
  assert.equal(storedMetadata.dedupCandidateFrameCount, 16);
});

test("a corrupt result-cache payload is discarded and recomputed", async () => {
  let describeCalls = 0;
  const corruptCache = {
    delete: () => undefined,
    getEntry: () => ({
      value: 42 as unknown as string,
      producerModel: "openai/gpt-4o-mini",
      metadata: {
        analysisMode: "full",
        cacheVersion: "v5",
        dedupCandidateFrameCount: 16,
        dedupPolicyVersion: "grayscale-16x16-mean-cells-v2",
        dedupThreshold: 0.04,
        policyVersion: "sampling-then-dedup-v2",
        extractorVersion: "v5",
        strategy: "uniform",
        model: "openai/gpt-4o-mini",
        prompt: "FU-01 corrupt cache",
        frameCount: 8,
        maxVideos: 1,
        durationSeconds: 1,
        framesRequested: 1,
        framesExtracted: 1,
        framesUsed: 1,
        focusHintFingerprint: null,
        cacheBytes: 2,
        modelUsed: "openai/gpt-4o-mini",
      },
    }),
    setEntry: () => undefined,
  };
  const deps = {
    getSettings: async () => ({
      modalityBridgeCacheEnabled: true,
      modalityBridgeVideoEnabled: true,
      modalityBridgeVideoModel: "openai/gpt-4o-mini",
      modalityBridgeVisionPrompt: "FU-01 corrupt cache",
    }),
    getCapabilities: () => ({ supportsVideo: false }),
    selectVisionModel: async () => "openai/gpt-4o-mini",
    resultCache: corruptCache,
    describePart: async () => {
      describeCalls += 1;
      return {
        description: "[Video description: recomputed after corruption]",
        durationSeconds: 1,
        framesRequested: 1,
        framesUsed: 1,
      };
    },
  };
  const bridge = new VideoBridgeGuardrail({ deps });
  const result = await bridge.preCall(
    {
      model: "example/text-only",
      messages: [
        {
          role: "user",
          content: [{ type: "input_video", video_url: "data:video/mp4;base64,Q09SUlVQVA==" }],
        },
      ],
    },
    {}
  );

  assert.match(resultText(result), /recomputed after corruption/);
  assert.equal(describeCalls, 1);
});

test("invalid numeric result-cache metadata is deleted and recomputed", async (t) => {
  const cachedValue = "[Video description: cached numeric metadata]";
  const validMetadata = (): Record<string, unknown> => ({
    analysisMode: "full",
    cacheVersion: "v5",
    dedupCandidateFrameCount: 16,
    dedupPolicyVersion: "grayscale-16x16-mean-cells-v2",
    dedupThreshold: 0.04,
    policyVersion: "sampling-then-dedup-v2",
    extractorVersion: "v5",
    strategy: "uniform",
    model: "openai/gpt-4o-mini",
    prompt: "FU-01 numeric cache validation",
    frameCount: 8,
    maxVideos: 1,
    durationSeconds: 3,
    framesRequested: 8,
    framesExtracted: 6,
    framesUsed: 5,
    dedupDropped: 1,
    focusHintFingerprint: null,
    cacheBytes: Buffer.byteLength(cachedValue, "utf8"),
    modelUsed: "openai/gpt-4o-mini",
  });
  const corruptions: Array<{
    name: string;
    mutate: (metadata: Record<string, unknown>) => void;
  }> = [
    { name: "NaN duration", mutate: (metadata) => (metadata.durationSeconds = Number.NaN) },
    {
      name: "infinite duration",
      mutate: (metadata) => (metadata.durationSeconds = Number.POSITIVE_INFINITY),
    },
    { name: "negative duration", mutate: (metadata) => (metadata.durationSeconds = -1) },
    { name: "NaN frame count", mutate: (metadata) => (metadata.framesRequested = Number.NaN) },
    {
      name: "infinite frame count",
      mutate: (metadata) => (metadata.framesExtracted = Number.POSITIVE_INFINITY),
    },
    { name: "negative frame count", mutate: (metadata) => (metadata.framesUsed = -1) },
    {
      name: "more extracted than the dedup candidate budget",
      mutate: (metadata) => (metadata.framesExtracted = 17),
    },
    { name: "more used than requested", mutate: (metadata) => (metadata.framesUsed = 9) },
    { name: "more used than extracted", mutate: (metadata) => (metadata.framesUsed = 7) },
    {
      name: "dedup and used exceed extracted",
      mutate: (metadata) => (metadata.dedupDropped = 2),
    },
    { name: "NaN cache bytes", mutate: (metadata) => (metadata.cacheBytes = Number.NaN) },
    {
      name: "infinite cache bytes",
      mutate: (metadata) => (metadata.cacheBytes = Number.POSITIVE_INFINITY),
    },
    { name: "negative cache bytes", mutate: (metadata) => (metadata.cacheBytes = -1) },
    {
      name: "mismatched cache bytes",
      mutate: (metadata) => (metadata.cacheBytes = Buffer.byteLength(cachedValue, "utf8") + 1),
    },
  ];

  for (const corruption of corruptions) {
    await t.test(corruption.name, async () => {
      const metadata = validMetadata();
      corruption.mutate(metadata);
      let deleteCalls = 0;
      let describeCalls = 0;
      const bridge = new VideoBridgeGuardrail({
        deps: {
          getSettings: async () => ({
            modalityBridgeCacheEnabled: true,
            modalityBridgeVideoEnabled: true,
            modalityBridgeVideoModel: "openai/gpt-4o-mini",
            modalityBridgeVisionPrompt: "FU-01 numeric cache validation",
          }),
          getCapabilities: () => ({ supportsVideo: false }),
          selectVisionModel: async () => "openai/gpt-4o-mini",
          resultCache: {
            delete: () => {
              deleteCalls += 1;
            },
            getEntry: () => ({
              value: cachedValue,
              producerModel: "openai/gpt-4o-mini",
              metadata,
            }),
            setEntry: () => undefined,
          },
          describePart: async () => {
            describeCalls += 1;
            return {
              description: "[Video description: recomputed numeric metadata]",
              durationSeconds: 1,
              framesRequested: 1,
              framesUsed: 1,
            };
          },
        },
      });

      const result = await bridge.preCall(
        {
          model: "example/text-only",
          messages: [
            {
              role: "user",
              content: [{ type: "input_video", video_url: "data:video/mp4;base64,TlVNRVJJQw==" }],
            },
          ],
        },
        {}
      );

      assert.match(resultText(result), /recomputed numeric metadata/);
      assert.equal(deleteCalls, 1, "invalid entries must be removed before recomputing");
      assert.equal(describeCalls, 1, "invalid entries must never be served as cache hits");
    });
  }
});

test("never-resolving model selection obeys abort and the attempt deadline", async (t) => {
  const payload = () => ({
    model: "example/text-only",
    messages: [
      {
        role: "user",
        content: [{ type: "input_video", video_url: "data:video/mp4;base64,U0VMRUNUSU9O" }],
      },
    ],
  });
  const createBridge = () =>
    new VideoBridgeGuardrail({
      deps: {
        getSettings: async () => ({
          modalityBridgeCacheEnabled: true,
          modalityBridgeVideoEnabled: true,
          modalityBridgeVideoModel: "openai/gpt-4o-mini",
          modalityBridgeVideoTimeout: 1_000,
        }),
        getCapabilities: () => ({ supportsVideo: false }),
        selectVisionModel: () => new Promise<string | null>(() => undefined),
      },
    });

  await t.test("request abort rejects without waiting for selection", async () => {
    const controller = new AbortController();
    const pending = createBridge().preCall(payload(), { signal: controller.signal });
    setTimeout(() => controller.abort(), 10);

    const outcome = await Promise.race([
      pending.then(
        () => "resolved",
        (error: unknown) => error
      ),
      new Promise<"timed out">((resolve) => setTimeout(() => resolve("timed out"), 500)),
    ]);

    assert.notEqual(outcome, "timed out", "abort must release model selection promptly");
    assert.match(String(outcome), /aborted/i);
  });

  await t.test("attempt deadline falls back without waiting for selection", async () => {
    const outcome = await Promise.race([
      createBridge().preCall(payload(), {}),
      new Promise<"timed out">((resolve) => setTimeout(() => resolve("timed out"), 2_500)),
    ]);

    assert.notEqual(outcome, "timed out", "deadline must release model selection promptly");
    if (outcome !== "timed out") {
      assert.match(resultText(outcome), /unavailable — video could not be described/);
    }
  });
});

test("concurrent HTTPS requests share one protected download buffer", async () => {
  const resultCache = new BridgeCache({ maxBytes: 4_096, maxEntries: 10, ttlMs: 60_000 });
  let fetchCalls = 0;
  let extractCalls = 0;
  let fetchedBuffer: Buffer | undefined;
  let extractedBuffer: Uint8Array | undefined;
  let markDownloadStarted: (() => void) | undefined;
  let releaseDownload: (() => void) | undefined;
  const downloadStarted = new Promise<void>((resolve) => {
    markDownloadStarted = resolve;
  });
  const downloadGate = new Promise<void>((resolve) => {
    releaseDownload = resolve;
  });
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeCacheEnabled: true,
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVisionPrompt: "FU-01 protected download singleflight",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      resultCache,
      fetchRemote: async (url: string) => {
        fetchCalls += 1;
        fetchedBuffer = Buffer.from("one-protected-download");
        markDownloadStarted?.();
        await downloadGate;
        return { buffer: fetchedBuffer, contentType: "video/mp4", url };
      },
      extractFrames: async (bytes: Uint8Array) => {
        extractCalls += 1;
        extractedBuffer = bytes;
        return {
          durationSeconds: 1,
          frames: [{ dataUri: "data:image/jpeg;base64,T05F", timestampSeconds: 0.5 }],
        };
      },
      callVisionModel: async () => "one protected observation",
    },
  });
  const context = {
    apiKeyInfo: { id: "tenant-protected-download" },
    endpoint: "/v1/chat/completions",
    sourceFormat: "openai",
    targetFormat: "openai",
  };

  const first = bridge.preCall(remoteVideoPayload(), context);
  await downloadStarted;
  const second = bridge.preCall(remoteVideoPayload(), context);
  await new Promise<void>((resolve) => setImmediate(resolve));
  releaseDownload?.();

  const [firstResult, secondResult] = await Promise.all([first, second]);
  assert.match(resultText(firstResult), /one protected observation/);
  assert.match(resultText(secondResult), /one protected observation/);
  assert.equal(fetchCalls, 1, "concurrent identical requests must allocate one download buffer");
  assert.equal(extractCalls, 1, "complete-result singleflight must extract the shared buffer once");
  assert.strictEqual(extractedBuffer, fetchedBuffer, "the protected buffer must not be copied");
});

test("cache-disabled production requests still share the bounded protected download", async () => {
  let fetchCalls = 0;
  let fetchedBuffer: Buffer | undefined;
  const extractedBuffers: Uint8Array[] = [];
  let markDownloadStarted: (() => void) | undefined;
  let releaseDownload: (() => void) | undefined;
  const downloadStarted = new Promise<void>((resolve) => {
    markDownloadStarted = resolve;
  });
  const downloadGate = new Promise<void>((resolve) => {
    releaseDownload = resolve;
  });
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeCacheEnabled: false,
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVisionPrompt: "FU-01 protected download without result cache",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      fetchRemote: async (url: string) => {
        fetchCalls += 1;
        fetchedBuffer = Buffer.from("bounded-without-result-cache");
        markDownloadStarted?.();
        await downloadGate;
        return { buffer: fetchedBuffer, contentType: "video/mp4", url };
      },
      extractFrames: async (bytes: Uint8Array) => {
        extractedBuffers.push(bytes);
        return {
          durationSeconds: 1,
          frames: [{ dataUri: "data:image/jpeg;base64,Tk9D", timestampSeconds: 0.5 }],
        };
      },
      callVisionModel: async () => "cache-disabled protected observation",
    },
  });
  const context = {
    apiKeyInfo: { id: "tenant-cache-disabled" },
    endpoint: "/v1/chat/completions",
  };

  const first = bridge.preCall(remoteVideoPayload(), context);
  await downloadStarted;
  const second = bridge.preCall(remoteVideoPayload(), context);
  await new Promise<void>((resolve) => setImmediate(resolve));
  releaseDownload?.();

  await Promise.all([first, second]);
  assert.equal(fetchCalls, 1, "the raw-media budget must not multiply when caching is disabled");
  assert.equal(extractedBuffers.length, 2, "result processing remains independent without cache");
  assert.ok(extractedBuffers.every((bytes) => bytes === fetchedBuffer));
});

test("aborting one singleflight waiter does not cancel another active request", async () => {
  const resultCache = new BridgeCache({ maxBytes: 4_096, maxEntries: 10, ttlMs: 60_000 });
  const firstController = new AbortController();
  let fetchCalls = 0;
  let extractCalls = 0;
  let captionCalls = 0;
  let producerSignal: AbortSignal | undefined;
  let markDownloadStarted: (() => void) | undefined;
  let releaseDownload: (() => void) | undefined;
  const downloadStarted = new Promise<void>((resolve) => {
    markDownloadStarted = resolve;
  });
  const deps = {
    getSettings: async () => ({
      modalityBridgeCacheEnabled: true,
      modalityBridgeVideoEnabled: true,
      modalityBridgeVideoModel: "openai/gpt-4o-mini",
      modalityBridgeVisionPrompt: "FU-01 abort waiter",
    }),
    getCapabilities: () => ({ supportsVideo: false }),
    selectVisionModel: async () => "openai/gpt-4o-mini",
    resultCache,
    fetchRemote: async (url: string, options: { enforceHttps: true; signal: AbortSignal }) => {
      fetchCalls += 1;
      producerSignal = options.signal;
      markDownloadStarted?.();
      return new Promise<{ buffer: Buffer; contentType: string; url: string }>(
        (resolve, reject) => {
          releaseDownload = () =>
            resolve({ buffer: Buffer.from("shared-video"), contentType: "video/mp4", url });
          const onAbort = () => reject(new Error("protected download producer aborted"));
          if (options.signal.aborted) onAbort();
          else options.signal.addEventListener("abort", onAbort, { once: true });
        }
      );
    },
    extractFrames: async (
      _bytes: Uint8Array,
      options: { signal?: AbortSignal }
    ): Promise<{
      durationSeconds: number;
      frames: Array<{ dataUri: string; timestampSeconds: number }>;
    }> => {
      extractCalls += 1;
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(resolve, 50);
        const abort = () => {
          clearTimeout(timer);
          reject(new Error("shared extraction aborted"));
        };
        if (options.signal?.aborted) abort();
        else options.signal?.addEventListener("abort", abort, { once: true });
      });
      return {
        durationSeconds: 1,
        frames: [{ dataUri: "data:image/jpeg;base64,QUJPUlQ=", timestampSeconds: 0.5 }],
      };
    },
    callVisionModel: async () => {
      captionCalls += 1;
      return "surviving waiter result";
    },
  };
  const bridge = new VideoBridgeGuardrail({ deps });
  const context = {
    apiKeyInfo: { id: "tenant-abort-waiter" },
    endpoint: "/v1/chat/completions",
  };

  const first = bridge.preCall(remoteVideoPayload(), {
    ...context,
    signal: firstController.signal,
  });
  await downloadStarted;
  const second = bridge.preCall(remoteVideoPayload(), context);
  await new Promise((resolve) => setTimeout(resolve, 10));
  firstController.abort();

  await assert.rejects(first, /aborted/i);
  assert.equal(producerSignal?.aborted, false, "one waiter must not abort the shared producer");
  releaseDownload?.();
  const surviving = await second;
  assert.match(resultText(surviving), /surviving waiter result/);
  assert.equal(fetchCalls, 1, "active identical waiters must share the protected download");
  assert.equal(extractCalls, 1, "the active waiter must keep the shared extraction alive");
  assert.equal(captionCalls, 1);
});

test("an abandoned protected download flight cannot capture a later request", async () => {
  const firstController = new AbortController();
  let fetchCalls = 0;
  let abandonedProducerSignal: AbortSignal | undefined;
  let markAbandonedStarted: (() => void) | undefined;
  const abandonedStarted = new Promise<void>((resolve) => {
    markAbandonedStarted = resolve;
  });
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeCacheEnabled: true,
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVisionPrompt: "FU-01 abandoned protected download",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      resultCache: new BridgeCache({ maxBytes: 4_096, maxEntries: 10, ttlMs: 60_000 }),
      fetchRemote: async (url: string, options: { enforceHttps: true; signal: AbortSignal }) => {
        fetchCalls += 1;
        if (fetchCalls === 1) {
          abandonedProducerSignal = options.signal;
          markAbandonedStarted?.();
          return new Promise<never>(() => undefined);
        }
        return { buffer: Buffer.from("fresh-download"), contentType: "video/mp4", url };
      },
      describePart: async () => ({
        description: "[Video description: fresh protected download]",
        durationSeconds: 1,
        framesRequested: 1,
        framesUsed: 1,
      }),
    },
  });
  const context = {
    apiKeyInfo: { id: "tenant-abandoned-download" },
    endpoint: "/v1/chat/completions",
  };

  const abandoned = bridge.preCall(remoteVideoPayload(), {
    ...context,
    signal: firstController.signal,
  });
  await abandonedStarted;
  firstController.abort();
  await assert.rejects(abandoned, /aborted/i);
  assert.equal(abandonedProducerSignal?.aborted, true);

  const replacement = await Promise.race([
    bridge.preCall(remoteVideoPayload(), context),
    new Promise<"timed out">((resolve) => setTimeout(() => resolve("timed out"), 500)),
  ]);

  assert.notEqual(replacement, "timed out", "the later request must start a fresh download");
  if (replacement !== "timed out") {
    assert.match(resultText(replacement), /fresh protected download/);
  }
  assert.equal(fetchCalls, 2);
});

test("protected download flights are isolated by authenticated principal", async () => {
  let fetchCalls = 0;
  let markBothStarted: (() => void) | undefined;
  let releaseDownloads: (() => void) | undefined;
  const bothStarted = new Promise<void>((resolve) => {
    markBothStarted = resolve;
  });
  const downloadGate = new Promise<void>((resolve) => {
    releaseDownloads = resolve;
  });
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeCacheEnabled: true,
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVisionPrompt: "FU-01 tenant download isolation",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      resultCache: new BridgeCache({ maxBytes: 4_096, maxEntries: 10, ttlMs: 60_000 }),
      fetchRemote: async (url: string) => {
        fetchCalls += 1;
        if (fetchCalls === 2) markBothStarted?.();
        await downloadGate;
        return { buffer: Buffer.from("tenant-isolated"), contentType: "video/mp4", url };
      },
      describePart: async () => ({
        description: "[Video description: tenant isolated]",
        durationSeconds: 1,
        framesRequested: 1,
        framesUsed: 1,
      }),
    },
  });
  const commonContext = { endpoint: "/v1/chat/completions" };

  const tenantA = bridge.preCall(remoteVideoPayload(), {
    ...commonContext,
    apiKeyInfo: { id: "tenant-a" },
  });
  const tenantB = bridge.preCall(remoteVideoPayload(), {
    ...commonContext,
    apiKeyInfo: { id: "tenant-b" },
  });
  await bothStarted;
  releaseDownloads?.();

  await Promise.all([tenantA, tenantB]);
  assert.equal(fetchCalls, 2, "different authenticated principals must not share downloads");
});

test("an abandoned flight cannot capture a later request", async () => {
  const firstController = new AbortController();
  let releaseAbandoned: ((value: string) => void) | undefined;
  let markStarted: (() => void) | undefined;
  const started = new Promise<void>((resolve) => {
    markStarted = resolve;
  });
  const abandoned = runVideoResultSingleflight("abandoned-flight", firstController.signal, () => {
    markStarted?.();
    return new Promise<string>((resolve) => {
      releaseAbandoned = resolve;
    });
  });

  await started;
  firstController.abort();
  await assert.rejects(abandoned, /aborted/i);

  const replacement = await Promise.race([
    runVideoResultSingleflight(
      "abandoned-flight",
      new AbortController().signal,
      async () => "fresh result"
    ),
    new Promise<"timed out">((resolve) => setTimeout(() => resolve("timed out"), 50)),
  ]);
  releaseAbandoned?.("stale result");

  assert.notEqual(replacement, "timed out", "a later request must start a fresh flight");
  if (replacement !== "timed out") {
    assert.equal(replacement.coalesced, false);
    assert.equal(replacement.value, "fresh result");
  }
});
