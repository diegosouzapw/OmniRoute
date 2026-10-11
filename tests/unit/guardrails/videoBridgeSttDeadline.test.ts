import assert from "node:assert/strict";
import test from "node:test";

import {
  orchestrateVideoAudioTranscription,
  type VideoAudioOrchestrationOptions,
} from "../../../src/lib/guardrails/videoBridgeAudioOrchestration.ts";

function options(
  overrides: Partial<VideoAudioOrchestrationOptions> = {}
): VideoAudioOrchestrationOptions {
  return {
    model: "deepgram/nova-3",
    operatorOptIn: true,
    requestOptIn: true,
    timeoutMs: 1000,
    videoBytes: Buffer.from("video"),
    selectModel: async () => "deepgram/nova-3",
    extractAudio: async () => ({
      audio: { channels: 1, dataUri: "data:audio/wav;base64,UklGRg==", sampleRateHz: 16000 },
      durationSeconds: 4,
    }),
    transcribe: async () => ({ text: "speech" }),
    ...overrides,
  };
}

test("aborted requests cannot select a model or spend on extraction/transcription", async () => {
  const controller = new AbortController();
  controller.abort();
  let calls = 0;
  const result = await orchestrateVideoAudioTranscription(
    options({
      signal: controller.signal,
      selectModel: async () => {
        calls += 1;
        return "deepgram/nova-3";
      },
      extractAudio: async () => {
        throw new Error("must not extract");
      },
    })
  );
  assert.equal(calls, 0);
  assert.equal(result.reason, "ABORTED");
  assert.equal(result.track, null);
});

test("transcription receives cancellation and only the remaining extraction budget", async () => {
  const controller = new AbortController();
  let transcriptionBudget = 0;
  let propagated = false;
  const result = await orchestrateVideoAudioTranscription(
    options({
      signal: controller.signal,
      extractAudio: async () => {
        await new Promise((resolve) => setTimeout(resolve, 30));
        return {
          audio: { channels: 1, dataUri: "data:audio/wav;base64,UklGRg==", sampleRateHz: 16000 },
          durationSeconds: 4,
        };
      },
      transcribe: async (_part, config) => {
        transcriptionBudget = config.timeoutMs;
        const signal = (config as typeof config & { signal?: AbortSignal }).signal;
        controller.abort();
        propagated = signal?.aborted === true;
        throw new Error("aborted");
      },
    })
  );
  assert.ok(
    transcriptionBudget > 0 && transcriptionBudget <= 980,
    `remaining=${transcriptionBudget}`
  );
  assert.equal(propagated, true);
  assert.equal(result.reason, "ABORTED");
});

test("a pending model selector cannot outlive the shared deadline or later start paid work", async () => {
  let release!: (model: string) => void;
  const selection = new Promise<string>((resolve) => {
    release = resolve;
  });
  let extractions = 0;
  const running = orchestrateVideoAudioTranscription(
    options({
      timeoutMs: 20,
      selectModel: () => selection,
      extractAudio: async () => {
        extractions += 1;
        throw new Error("unexpected extraction");
      },
    })
  );
  let timer: ReturnType<typeof setTimeout>;
  const result = await Promise.race([
    running,
    new Promise<null>((resolve) => {
      timer = setTimeout(() => resolve(null), 500);
    }),
  ]);
  clearTimeout(timer!);
  release("deepgram/nova-3");
  await running;
  assert.equal(
    result?.reason,
    "TIMEOUT",
    "selector must be bounded, not merely checked after resolving"
  );
  assert.equal(extractions, 0);
});
