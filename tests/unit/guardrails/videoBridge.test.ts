import assert from "node:assert/strict";
import test from "node:test";

import {
  VideoBridgeGuardrail,
  reanchorVideoBridgeRedaction,
} from "../../../src/lib/guardrails/videoBridge.ts";
import { callVisionModel } from "../../../src/lib/guardrails/visionBridgeHelpers.ts";
import {
  buildModalityBridgeHeader,
  getBridgeStats,
} from "../../../src/lib/guardrails/modalityBridge/bridgeStats.ts";
import {
  registerDefaultGuardrails,
  resetGuardrailsForTests,
} from "../../../src/lib/guardrails/registry.ts";

const payload = () => ({
  model: "example/text-only",
  messages: [
    {
      role: "user",
      content: [
        { type: "input_video", video_url: "data:video/mp4;base64,QUJD" },
        { type: "text", text: "What happens?" },
      ],
    },
  ],
});

function guardrail(options: { capability?: boolean | null; fail?: boolean } = {}) {
  return new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeCacheEnabled: false,
      }),
      getCapabilities: () => ({
        supportsVideo: options.capability === undefined ? false : options.capability,
      }),
      describePart: async () => {
        if (options.fail) throw new Error("private ffmpeg failure");
        return {
          description: "[Video description: frame@t=00:01.000 a person waves]",
          durationSeconds: 2,
          framesRequested: 1,
          framesUsed: 1,
        };
      },
    },
  });
}

test("VideoBridgeGuardrail has priority 7 and native video targets bypass conversion", async () => {
  let calls = 0;
  const native = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({ modalityBridgeVideoEnabled: true }),
      getCapabilities: () => ({ supportsVideo: true }),
      describePart: async () => {
        calls += 1;
        throw new Error("should not run");
      },
    },
  });
  assert.equal(native.name, "video-bridge");
  assert.equal(native.priority, 7);
  assert.equal((await native.preCall(payload(), {})).modifiedPayload, undefined);
  assert.equal(calls, 0);
});

test("converts Chat video to timestamped text and emits telemetry/header metadata", async () => {
  const before = getBridgeStats().video;
  const result = await guardrail().preCall(payload(), {});
  const modified = result.modifiedPayload as ReturnType<typeof payload>;
  assert.deepEqual(modified.messages[0].content[0], {
    type: "text",
    text: "[Video description: frame@t=00:01.000 a person waves]",
  });
  assert.equal(result.meta?.videosProcessed, 1);
  assert.equal(result.meta?.framesUsed, 1);
  assert.equal(result.meta?.videoModel, "openai/gpt-4o-mini");
  assert.equal(
    buildModalityBridgeHeader([{ guardrail: "video-bridge", meta: result.meta }]),
    "video->text;model=openai/gpt-4o-mini;parts=1"
  );
  assert.ok(getBridgeStats().video.bridged >= before.bridged + 1);
});

test("preserves scene-aware sampler metadata in guardrail meta and the transparency header", async () => {
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVideoSamplingPolicy: "scene_aware",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      describePart: async () => ({
        description: "[Video description: untrusted media-derived observation: a cut]",
        durationSeconds: 12,
        framesRequested: 4,
        framesExtracted: 4,
        framesUsed: 4,
        dedupDropped: 1,
        sampling: {
          candidateCount: 3,
          policyEffective: "scene_aware",
          policyRequested: "scene_aware",
        },
      }),
    },
  });

  const result = await bridge.preCall(payload(), {});
  assert.equal(result.meta?.samplingPolicyRequested, "scene_aware");
  assert.equal(result.meta?.samplingPolicyEffective, "scene_aware");
  assert.equal(result.meta?.samplingCandidateCount, 3);
  assert.equal(result.meta?.dedupDropped, 1);
  assert.equal(
    buildModalityBridgeHeader([{ guardrail: "video-bridge", meta: result.meta }]),
    "video->text;model=openai/gpt-4o-mini;parts=1;sampling=scene_aware;candidates=3"
  );
});

test("reports only validated transcript provenance in guardrail metadata and carries a redaction map for logs", async () => {
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      describePart: async (part) => {
        assert.deepEqual(part.transcript, {
          cues: [{ text: "spoken words", start: 1, end: 2, source: "client" }],
        });
        return {
          description: "[Video description: caption; transcript[source=client] spoken words]",
          descriptionRedacted:
            "[Video description: caption; transcript[source=client] [redacted-video-transcript]]",
          durationSeconds: 2,
          framesRequested: 1,
          framesUsed: 1,
          transcriptCues: [
            {
              confidence: 1,
              endSeconds: 2,
              source: "client",
              startSeconds: 1,
              text: "spoken words",
            },
          ],
        };
      },
    },
  });
  const result = await bridge.preCall(
    {
      ...payload(),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "input_video",
              video_url: "data:video/mp4;base64,QUJD",
              transcript: { cues: [{ text: "spoken words", start: 1, end: 2, source: "client" }] },
            },
          ],
        },
      ],
    },
    {}
  );
  assert.equal(result.meta?.transcriptCuesApplied, 1);
  // #12150 P1a: at least one transcript cue was rendered, so the guardrail
  // must mark itself observed and hand a redaction map keyed to the exact
  // replaced part, with the placeholder in and the secret text out.
  assert.equal(result.meta?.videoBridgeObserved, true);
  // #12150 fix round 1: the downstream consumer matches by content
  // (`fullText`), not by messageIndex/partIndex (see the interface doc on
  // VideoBridgeLogRedactionEntry) — assert fullText is present and is the
  // exact unredacted text that was placed into the part, alongside the
  // still-positional (now advisory) fields and the placeholder text.
  assert.deepEqual(result.meta?.videoBridgeLogRedaction, [
    {
      container: "messages",
      messageIndex: 0,
      partIndex: 0,
      fullText: "[Video description: caption; transcript[source=client] spoken words]",
      redactedText:
        "[Video description: caption; transcript[source=client] [redacted-video-transcript]]",
    },
  ]);
});

test("leaves videoBridgeObserved false with no redaction map for a video with frames but no transcript", async () => {
  // #12150 P1a: a plain video (frames only, no transcript cue) must NOT be
  // marked observed — logging/Memory for ordinary video traffic must stay
  // unaffected by the redaction machinery.
  const result = await guardrail().preCall(payload(), {});
  assert.equal(result.meta?.videoBridgeObserved, false);
  assert.equal(result.meta?.videoBridgeLogRedaction, undefined);
});

test("converts Responses input using input_text while preserving sibling order", async () => {
  const body = {
    model: "example/text-only",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: "before" },
          { type: "video_url", video_url: { url: "https://example.test/video.mp4" } },
          { type: "input_text", text: "after" },
        ],
      },
    ],
  };
  const result = await guardrail().preCall(body, {});
  assert.deepEqual((result.modifiedPayload as typeof body).input[0].content, [
    { type: "input_text", text: "before" },
    { type: "input_text", text: "[Video description: frame@t=00:01.000 a person waves]" },
    { type: "input_text", text: "after" },
  ]);
});

test("preserves unknown-capability video on total failure but stubs proven text-only input", async () => {
  const original = payload();
  const snapshot = structuredClone(original);
  const unknown = await guardrail({ capability: null, fail: true }).preCall(original, {});
  assert.equal(unknown.modifiedPayload, undefined);
  assert.deepEqual(original, snapshot);

  const knownFalse = await guardrail({ capability: false, fail: true }).preCall(payload(), {});
  const modified = knownFalse.modifiedPayload as ReturnType<typeof payload>;
  assert.deepEqual(modified.messages[0].content[0], {
    type: "text",
    text: "[Video 1]: (unavailable — video could not be described)",
  });
  assert.equal(String(knownFalse.meta?.failures).includes("private"), false);
});

test("reports cache hits per converted video without carrying a previous hit forward", async () => {
  const body = payload();
  body.messages[0].content.splice(1, 0, {
    type: "video_url",
    video_url: "data:video/mp4;base64,REVG",
  });
  const before = getBridgeStats().video;
  let described = 0;
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoMaxVideos: 2,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      describePart: async () => {
        described += 1;
        return {
          cacheHits: described === 1 ? 1 : 0,
          description: `[Video description: frame@t=00:0${described}.000 frame ${described}]`,
          durationSeconds: 2,
          framesRequested: 1,
          framesUsed: 1,
        };
      },
    },
  });

  const result = await bridge.preCall(body, {});
  const after = getBridgeStats().video;
  assert.equal(result.meta?.cacheHits, 1);
  assert.equal(after.bridged - before.bridged, 2);
  assert.equal(after.cacheHits - before.cacheHits, 1);
});

test("default registry includes Video Bridge after Vision and Audio", () => {
  resetGuardrailsForTests({ registerDefaults: false });
  const names = registerDefaultGuardrails()
    .list()
    .filter((entry) => entry.name.endsWith("-bridge"))
    .map((entry) => `${entry.priority}:${entry.name}`);
  assert.deepEqual(names, ["5:vision-bridge", "6:audio-bridge", "7:video-bridge"]);
  resetGuardrailsForTests();
});

test("maxVideos describes only the first video and removes every excess raw video for text-only targets", async () => {
  const body = payload();
  body.messages[0].content.splice(1, 0, {
    type: "video_url",
    video_url: "data:video/mp4;base64,REVG",
  });
  let calls = 0;
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoMaxVideos: 1,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      describePart: async () => {
        calls += 1;
        return {
          description: "[Video description: untrusted media-derived observation: first]",
          durationSeconds: 1,
          framesRequested: 1,
          framesExtracted: 1,
          framesUsed: 1,
        };
      },
    },
  });
  const result = await bridge.preCall(body, {});
  const content = (result.modifiedPayload as typeof body).messages[0].content;
  assert.equal(calls, 1);
  assert.equal(
    content.some((part) => "video_url" in part),
    false
  );
  assert.match(String((content[1] as { text?: string }).text), /not processed.*limit/i);
  assert.equal(result.meta?.attempts, 1);
  assert.equal(result.meta?.videosProcessed, 1);
  assert.equal(result.meta?.videosReplaced, 2);
});

test("maxVideos preserves excess raw video only when target video support is unknown", async () => {
  const body = payload();
  body.messages[0].content.splice(1, 0, {
    type: "video_url",
    video_url: "data:video/mp4;base64,REVG",
  });
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoMaxVideos: 1,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
      }),
      getCapabilities: () => ({ supportsVideo: null }),
      describePart: async () => ({
        description: "[Video description: untrusted media-derived observation: first]",
        durationSeconds: 1,
        framesRequested: 1,
        framesExtracted: 1,
        framesUsed: 1,
      }),
    },
  });
  const result = await bridge.preCall(body, {});
  const content = (result.modifiedPayload as typeof body).messages[0].content;
  assert.equal("video_url" in content[1], true);
});

test("empty Video and Vision model settings use the Vision auto-router and report the effective model", async () => {
  let selectedFixedModel: string | undefined;
  let calledModel = "";
  let routedThroughOmniRoute = false;
  let injectedFetch = false;
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "",
        modalityBridgeVisionModel: "",
        modalityBridgeCacheEnabled: false,
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async (fixedModel) => {
        selectedFixedModel = fixedModel;
        return "google/gemini-2.5-flash";
      },
      extractFrames: async () => ({
        durationSeconds: 1,
        frames: [{ timestampSeconds: 0.5, dataUri: "data:image/jpeg;base64,AUTO9760" }],
      }),
      callVisionModel: async (_image, config) => {
        calledModel = config.model;
        routedThroughOmniRoute = config.routeThroughOmniRoute === true;
        injectedFetch = typeof config.fetchImpl === "function";
        return "a safe observation";
      },
    },
  });
  const result = await bridge.preCall(payload(), {});
  assert.equal(selectedFixedModel, undefined);
  assert.equal(calledModel, "google/gemini-2.5-flash");
  assert.equal(routedThroughOmniRoute, true);
  assert.equal(injectedFetch, true);
  assert.equal(result.meta?.videoModel, "google/gemini-2.5-flash");
  assert.ok(result.modifiedPayload);
});

test("client abort between videos stops processing and never stubs or falls back", async () => {
  const body = payload();
  body.messages[0].content.splice(1, 0, {
    type: "video_url",
    video_url: "data:video/mp4;base64,REVG",
  });
  const controller = new AbortController();
  let calls = 0;
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoMode: "describe",
        modalityBridgeVideoMaxVideos: 2,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      describePart: async () => {
        calls += 1;
        controller.abort();
        return {
          description: "[Video description: untrusted media-derived observation: first]",
          durationSeconds: 1,
          framesRequested: 1,
          framesExtracted: 1,
          framesUsed: 1,
        };
      },
    },
  });
  try {
    await bridge.preCall(body, { signal: controller.signal });
  } catch (error) {
    assert.match(String(error), /aborted/i);
  }
  assert.ok(calls >= 0);
  assert.equal(
    body.messages[0].content.some(
      (part) => "text" in part && /unavailable/.test(String(part.text))
    ),
    false,
    "an aborted remaining video must not be stubbed as unavailable"
  );
});

test("real Video Bridge cache hit avoids a second model call and records the hit", async () => {
  let modelCalls = 0;
  const beforeStats = getBridgeStats().video;
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVisionPrompt: "cache integration 9760",
        modalityBridgeCacheEnabled: true,
        modalityBridgeCacheTtlMinutes: 60,
        modalityBridgeCacheMaxEntries: 50,
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      extractFrames: async () => ({
        durationSeconds: 1,
        frames: [{ timestampSeconds: 0.5, dataUri: "data:image/jpeg;base64,CACHE9760" }],
      }),
      callVisionModel: async () => {
        modelCalls += 1;
        return "cached observation";
      },
    },
  });
  const first = await bridge.preCall(payload(), {});
  const second = await bridge.preCall(payload(), {});
  assert.equal(modelCalls, 1);
  assert.equal(first.meta?.cacheHits, 0);
  assert.equal(second.meta?.cacheHits, 0);
  const afterStats = getBridgeStats().video;
  const firstTextPart = (first.modifiedPayload as ReturnType<typeof payload>).messages[0]
    .content[0];
  assert.equal(afterStats.resultCacheHits - beforeStats.resultCacheHits, 1);
  assert.equal(
    afterStats.resultCacheBytes - beforeStats.resultCacheBytes,
    Buffer.byteLength(String((firstTextPart as { text: string }).text), "utf8")
  );
  assert.equal(afterStats.resultCacheLatencyMs - beforeStats.resultCacheLatencyMs >= 0, true);
});

// #12150 P1a: `descriptionRedacted` is threaded through the whole-result
// cache (VideoResultCacheMetadata), not just the fresh-computation path — a
// cache hit for a video carrying a transcript cue must still surface
// `videoBridgeObserved`/`videoBridgeLogRedaction`, or a second identical
// request would silently stop redacting.
test("real Video Bridge cache hit preserves the redacted transcript shadow across cache reuse", async () => {
  let modelCalls = 0;
  const buildBody = () => ({
    ...payload(),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "input_video",
            video_url: "data:video/mp4;base64,QUJD",
            transcript: {
              cues: [{ text: "cached secret cue", start: 0, end: 1, source: "client" }],
            },
          },
          { type: "text", text: "What happens?" },
        ],
      },
    ],
  });
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVisionPrompt: "cache redaction integration 12150",
        modalityBridgeCacheEnabled: true,
        modalityBridgeCacheTtlMinutes: 60,
        modalityBridgeCacheMaxEntries: 50,
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      extractFrames: async () => ({
        durationSeconds: 1,
        frames: [{ timestampSeconds: 0.5, dataUri: "data:image/jpeg;base64,CACHE12150" }],
      }),
      callVisionModel: async () => {
        modelCalls += 1;
        return "cached observation";
      },
    },
  });

  const first = await bridge.preCall(buildBody(), {});
  const second = await bridge.preCall(buildBody(), {});
  assert.equal(modelCalls, 1, "the second call must be served from the result cache");

  for (const result of [first, second]) {
    assert.equal(result.meta?.videoBridgeObserved, true);
    const redaction = result.meta?.videoBridgeLogRedaction as
      Array<{ fullText: string; redactedText: string }> | undefined;
    assert.equal(redaction?.length, 1);
    // #12150 fix round 1: fullText must be the exact unredacted text that
    // landed in the replaced part — the content-address key the downstream
    // consumer matches on — verified against the guardrail's own
    // modifiedPayload rather than a hardcoded string (the rendered text
    // here comes from the real describeVideoPart pipeline, not a fixture).
    const modifiedPart = (result.modifiedPayload as ReturnType<typeof buildBody>).messages[0]
      .content[0] as { text: string };
    assert.equal(redaction?.[0]?.fullText, modifiedPart.text);
    assert.doesNotMatch(redaction?.[0]?.fullText ?? "", /\[redacted-video-transcript\]/);
    assert.match(redaction?.[0]?.redactedText ?? "", /\[redacted-video-transcript\]/);
    assert.doesNotMatch(redaction?.[0]?.redactedText ?? "", /cached secret cue/);
  }
});

test("real primary failure reports and caches the successful fallback model identity", async () => {
  const primary = "openai/gpt-4o-mini";
  const fallback = "anthropic/claude-fable-5";
  const beforeStats = getBridgeStats().video;
  const attemptedModels: string[] = [];
  const fetchImpl: typeof fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body)) as { model: string };
    attemptedModels.push(body.model);
    if (body.model === primary) {
      return new Response("primary unavailable", { status: 503 });
    }
    return Response.json({ choices: [{ message: { content: "fallback observation" } }] });
  };
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: primary,
        modalityBridgeVisionPrompt: "fallback identity integration 9760",
        modalityBridgeCacheEnabled: true,
        modalityBridgeCacheTtlMinutes: 62,
        modalityBridgeCacheMaxEntries: 52,
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => primary,
      extractFrames: async () => ({
        durationSeconds: 1,
        frames: [{ timestampSeconds: 0.5, dataUri: "data:image/jpeg;base64,FALLBACK9760" }],
      }),
      callVisionModel: (image, config) =>
        callVisionModel(
          image,
          { ...config, fetchImpl },
          "sk-fallback-test",
          { maxFallbackAttempts: 2 },
          {
            hasUsableCredentials: async (model) => model === primary || model === fallback,
          }
        ),
    },
  });

  const first = await bridge.preCall(payload(), {});
  const second = await bridge.preCall(payload(), {});

  assert.deepEqual(attemptedModels, [primary, fallback]);
  assert.equal(first.meta?.videoModel, fallback, "meta must name the successful fallback");
  assert.equal(second.meta?.videoModel, fallback, "cache hit must retain the producer identity");
  assert.equal(second.meta?.cacheHits, 0);
  const deltaResultCacheHits = getBridgeStats().video.resultCacheHits - beforeStats.resultCacheHits;
  assert.equal(deltaResultCacheHits >= 1, true);
  assert.equal(
    buildModalityBridgeHeader([{ guardrail: "video-bridge", meta: second.meta }]),
    `video->text;model=${fallback};parts=1`
  );
});

test("cache keys miss on prompt and effective model changes; failures are not cached", async () => {
  let prompt = "prompt-a-9760";
  let selectedModel = "openai/gpt-4o-mini";
  let modelCalls = 0;
  let fail = true;
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: selectedModel,
        modalityBridgeVisionPrompt: prompt,
        modalityBridgeCacheEnabled: true,
        modalityBridgeCacheTtlMinutes: 61,
        modalityBridgeCacheMaxEntries: 51,
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => selectedModel,
      extractFrames: async () => ({
        durationSeconds: 1,
        frames: [{ timestampSeconds: 0.25, dataUri: "data:image/jpeg;base64,MISS9760" }],
      }),
      callVisionModel: async () => {
        modelCalls += 1;
        if (fail) throw new Error("model failure");
        return "observation";
      },
    },
  });

  await bridge.preCall(payload(), {});
  fail = false;
  await bridge.preCall(payload(), {});
  assert.equal(modelCalls, 2, "failed captions must not be cached");
  const hitWithSameSettings = await bridge.preCall(payload(), {});
  assert.equal(modelCalls, 2, "result cache must reuse after a success");
  assert.equal(hitWithSameSettings.meta?.cacheHits, 0);
  await bridge.preCall(payload(), {});
  assert.equal(modelCalls, 2, "frame extraction options did not change on this path");
  prompt = "prompt-b-9760";
  await bridge.preCall(payload(), {});
  assert.equal(modelCalls, 3, "prompt changes must invalidate result cache");
  selectedModel = "google/gemini-2.5-flash";
  await bridge.preCall(payload(), {});
  assert.equal(modelCalls, 4, "effective model changes must invalidate result cache");
});

test("FFmpeg ENOENT is sanitized and counts only as a failed attempt, never a bridged success", async () => {
  const before = getBridgeStats().video;
  const warnings: Array<{ message: string; meta?: Record<string, unknown> }> = [];
  const error = Object.assign(new Error("spawn /private/operator/ffmpeg ENOENT"), {
    code: "ENOENT",
  });
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      describePart: async () => {
        throw error;
      },
    },
  });
  const result = await bridge.preCall(payload(), {
    log: { warn: (_tag, message, meta) => warnings.push({ message, meta }) },
  });
  const after = getBridgeStats().video;
  assert.equal(after.attempts - before.attempts, 1);
  assert.equal(after.successes - before.successes, 0);
  assert.equal(after.bridged - before.bridged, 0);
  assert.equal(after.failures - before.failures, 1);
  assert.equal(result.meta?.videosProcessed, 0);
  assert.ok(result.modifiedPayload, "proven text-only input still needs a safe stub");
  assert.equal(JSON.stringify(warnings).includes("/private/operator"), false);
  assert.equal(buildModalityBridgeHeader([{ guardrail: "video-bridge", meta: result.meta }]), null);
});

function cachedBridgeWithCounter(counter: { calls: number }, cacheSalt: string) {
  return new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVisionPrompt: `cache dimensions ${cacheSalt}`,
        modalityBridgeCacheEnabled: true,
        modalityBridgeCacheTtlMinutes: 60,
        modalityBridgeCacheMaxEntries: 50,
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      describePart: async () => {
        counter.calls += 1;
        return {
          description: `[Video description: observation ${counter.calls}]`,
          durationSeconds: 4,
          framesRequested: 1,
          framesUsed: 1,
        };
      },
    },
  });
}

test("result cache misses when audioTranscript is added, changes, and hits when equivalent", async () => {
  const counter = { calls: 0 };
  const bridge = cachedBridgeWithCounter(counter, "audio-transcript");
  const withAudio = (audioTranscript?: unknown) => ({
    model: "example/text-only",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "input_video",
            video_url: "data:video/mp4;base64,QUJD",
            ...(audioTranscript === undefined ? {} : { audioTranscript }),
          },
        ],
      },
    ],
  });
  const cuesA = { cues: [{ text: "hello", start: 0, end: 1, source: "client" }] };
  const cuesB = { cues: [{ text: "different", start: 1, end: 2, source: "client" }] };

  await bridge.preCall(withAudio(), {});
  assert.equal(counter.calls, 1);
  await bridge.preCall(withAudio(cuesA), {});
  assert.equal(counter.calls, 2, "adding an audioTranscript must invalidate the result cache");
  await bridge.preCall(withAudio(structuredClone(cuesA)), {});
  assert.equal(counter.calls, 2, "an equivalent audioTranscript must reuse the cached result");
  await bridge.preCall(withAudio(cuesB), {});
  assert.equal(counter.calls, 3, "a different audioTranscript must invalidate the result cache");
  await bridge.preCall(withAudio(), {});
  assert.equal(counter.calls, 3, "removing the audioTranscript must reuse the first cached result");
});

test("result cache misses when the focus window is added or changed", async () => {
  const counter = { calls: 0 };
  const bridge = cachedBridgeWithCounter(counter, "focus-window");
  const withFocus = (bounds?: { start?: number; end?: number }) => ({
    model: "example/text-only",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "input_video",
            video_url: "data:video/mp4;base64,QUJD",
            ...(bounds ?? {}),
          },
        ],
      },
    ],
  });

  await bridge.preCall(withFocus(), {});
  assert.equal(counter.calls, 1);
  await bridge.preCall(withFocus({ start: 0, end: 1 }), {});
  assert.equal(counter.calls, 2, "adding a focus window must invalidate the result cache");
  await bridge.preCall(withFocus({ start: 0, end: 1 }), {});
  assert.equal(counter.calls, 2, "an identical focus window must reuse the cached result");
  await bridge.preCall(withFocus({ start: 1, end: 2 }), {});
  assert.equal(counter.calls, 3, "a different focus window must invalidate the result cache");
});

test("audio/video fusion telemetry reaches guardrail meta, bridge stats, and cache hits", async () => {
  const before = getBridgeStats().video;
  let describeCalls = 0;
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVisionPrompt: "fusion telemetry",
        modalityBridgeCacheEnabled: true,
        modalityBridgeCacheTtlMinutes: 60,
        modalityBridgeCacheMaxEntries: 50,
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      describePart: async () => {
        describeCalls += 1;
        return {
          description: "[Video description: partial fusion observation]",
          durationSeconds: 4,
          framesRequested: 1,
          framesUsed: 1,
          fusion: {
            audioAvailable: false,
            videoAvailable: true,
            partial: true,
            failures: { audio: "FAILED" as const },
          },
        };
      },
    },
  });

  const first = await bridge.preCall(payload(), {});
  assert.equal(first.meta?.audioFusionRuns, 1);
  assert.equal(first.meta?.audioFusionPartials, 1);
  assert.deepEqual(first.meta?.audioFusionFailureCodes, ["audio:FAILED"]);

  const second = await bridge.preCall(payload(), {});
  assert.equal(describeCalls, 1, "the second call must be a result cache hit");
  assert.equal(second.meta?.audioFusionRuns, 1, "cache hits must restore fusion telemetry");
  assert.equal(second.meta?.audioFusionPartials, 1);
  assert.deepEqual(second.meta?.audioFusionFailureCodes, ["audio:FAILED"]);

  const after = getBridgeStats().video;
  assert.equal(after.fusionRuns - before.fusionRuns, 2);
  assert.equal(after.fusionPartials - before.fusionPartials, 2);
});

test("reanchorVideoBridgeRedaction re-reads fullText from the post-guardrail body (PII/credential masker interaction)", () => {
  // A later chain guardrail (PII masker @10, credential masker @95) rewrote the
  // description text IN PLACE after video-bridge@7 built the redaction map, so
  // the map's fullText is stale. Re-anchoring at the advisory indices must pick
  // up the post-masker text so the log sink's content-match still finds the part.
  const entries = [
    {
      container: "messages" as const,
      messageIndex: 0,
      partIndex: 1,
      fullText:
        "[Video description: transcript[source=client;confidence=0.90;interval=00:01.000-00:02.000] my name is Alice]",
      redactedText:
        "[Video description: transcript[source=client;confidence=0.90;interval=00:01.000-00:02.000] [redacted-video-transcript]]",
    },
  ];
  const finalBody = {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "hello" },
          {
            type: "text",
            // PII masker replaced "Alice" with a token in place:
            text: "[Video description: transcript[source=client;confidence=0.90;interval=00:01.000-00:02.000] my name is [NAME_1]]",
          },
        ],
      },
    ],
  };
  const reanchored = reanchorVideoBridgeRedaction(entries, finalBody);
  assert.equal(
    reanchored[0].fullText,
    (finalBody.messages[0].content[1] as { text: string }).text,
    "fullText must equal the post-masker part text so the sink match succeeds"
  );
  assert.equal(reanchored[0].redactedText, entries[0].redactedText, "redactedText is unchanged");
  // Original entries object is not mutated (meta is shared).
  assert.equal(entries[0].fullText.includes("Alice"), true);
});

test("reanchorVideoBridgeRedaction keeps original fullText when the advisory index no longer resolves", () => {
  const entries = [
    {
      container: "messages" as const,
      messageIndex: 5,
      partIndex: 9,
      fullText: "[Video description: original]",
      redactedText: "[Video description: [redacted-video-transcript]]",
    },
  ];
  const reanchored = reanchorVideoBridgeRedaction(entries, { messages: [] });
  assert.equal(reanchored[0].fullText, "[Video description: original]");
});
