import assert from "node:assert/strict";
import test from "node:test";

import { callAudioTranscriptionTimed } from "../../../src/lib/guardrails/audioBridgeHelpers.ts";

const part = {
  format: "wav",
  messageIndex: 0,
  partIndex: 0,
  ref: "data:audio/wav;base64,UklGRg==",
  shape: "input_audio" as const,
};

test("the existing Audio Bridge HTTP request is cancelled by its caller", async () => {
  const controller = new AbortController();
  let transportSignal: AbortSignal | null = null;
  await assert.rejects(
    callAudioTranscriptionTimed(
      part,
      {
        model: "deepgram/nova-3",
        signal: controller.signal,
        timeoutMs: 1000,
      },
      {
        getBearer: () => "test-only-loopback-bearer",
        getPort: () => 20128,
        fetchImpl: async (_url, init) => {
          transportSignal = init!.signal as AbortSignal;
          return new Promise<Response>((_resolve, reject) => {
            transportSignal!.addEventListener(
              "abort",
              () => reject(new DOMException("Aborted", "AbortError")),
              { once: true }
            );
            controller.abort();
          });
        },
      }
    )
  );
  assert.equal(transportSignal?.aborted, true);
});

test("a pre-aborted transcription performs no HTTP request", async () => {
  const controller = new AbortController();
  controller.abort();
  let calls = 0;
  await assert.rejects(
    callAudioTranscriptionTimed(
      part,
      {
        model: "deepgram/nova-3",
        signal: controller.signal,
        timeoutMs: 1000,
      },
      {
        fetchImpl: async () => {
          calls += 1;
          return new Response();
        },
      }
    )
  );
  assert.equal(calls, 0);
});
