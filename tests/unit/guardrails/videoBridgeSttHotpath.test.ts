import assert from "node:assert/strict";
import test from "node:test";

import sharp from "sharp";

import { VideoBridgeGuardrail } from "../../../src/lib/guardrails/videoBridge.ts";

test("a real guardrail request with dual consent transcribes the same bytes and renders a redaction shadow", async () => {
  const bytes = Buffer.from("bounded protected video fixture");
  const jpeg = await sharp({
    create: { width: 32, height: 32, channels: 3, background: "blue" },
  })
    .jpeg()
    .toBuffer();
  let audioBytes: Uint8Array | undefined;
  let frameBytes: Uint8Array | undefined;
  const deps = {
    getSettings: async () => ({
      modalityBridgeVideoEnabled: true,
      modalityBridgeVideoAudioTranscriptionEnabled: true,
      modalityBridgeAudioModel: "deepgram/nova-3",
      modalityBridgeCacheEnabled: false,
    }),
    getCapabilities: () => ({ supportsVideo: false as const }),
    selectVisionModel: async () => "openai/gpt-4o-mini",
    selectAudioModel: async () => "deepgram/nova-3",
    extractAudio: async (input: Uint8Array) => {
      audioBytes = input;
      return {
        audio: { channels: 1, dataUri: "data:audio/wav;base64,UklGRg==", sampleRateHz: 16000 },
        durationSeconds: 4,
      };
    },
    transcribeAudio: async () => ({
      text: "private spoken sentinel",
      segments: [{ startSeconds: 0, endSeconds: 2, text: "private spoken sentinel" }],
    }),
    extractFrames: async (input: Uint8Array) => {
      frameBytes = input;
      return {
        durationSeconds: 4,
        frames: [
          { dataUri: `data:image/jpeg;base64,${jpeg.toString("base64")}`, timestampSeconds: 1 },
        ],
      };
    },
    callVisionModel: async () => "a blue screen",
  };
  const result = await new VideoBridgeGuardrail({ deps }).preCall(
    {
      model: "example/text-only",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "input_video",
              video_url: `data:video/mp4;base64,${bytes.toString("base64")}`,
              audioTranscription: true,
            },
          ],
        },
      ],
    },
    { apiKeyInfo: { id: "tenant-a" } }
  );
  const body = JSON.stringify(result.modifiedPayload);
  assert.ok(body.includes("private spoken sentinel"), "STT output must reach the final model");
  assert.ok(body.includes("source=audio-bridge"), "trusted provenance is minted by the adapter");
  assert.ok(audioBytes && frameBytes);
  assert.equal(audioBytes, frameBytes, "audio and frames must reuse one admitted byte buffer");
  assert.ok(result.meta?.videoBridgeObserved);
  const shadows = JSON.stringify(result.meta?.videoBridgeLogRedaction);
  assert.ok(shadows.includes("redacted-video-transcript"));
  const entries = result.meta?.videoBridgeLogRedaction as Array<{ redactedText: string }>;
  assert.ok(!entries[0].redactedText.includes("private spoken sentinel"));
});

test("only strict dual consent permits an STT call through the guardrail", async () => {
  const jpeg = await sharp({
    create: { width: 32, height: 32, channels: 3, background: "blue" },
  })
    .jpeg()
    .toBuffer();
  for (const [operator, request, expected] of [
    [false, true, 0],
    [true, false, 0],
    [true, "true", 0],
    [true, true, 1],
  ] as const) {
    let calls = 0;
    const deps = {
      getSettings: async () => ({
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoAudioTranscriptionEnabled: operator,
        modalityBridgeCacheEnabled: false,
      }),
      getCapabilities: () => ({ supportsVideo: false as const }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      selectAudioModel: async () => "deepgram/nova-3",
      extractAudio: async () => ({
        audio: { channels: 1, dataUri: "data:audio/wav;base64,UklGRg==", sampleRateHz: 16000 },
        durationSeconds: 4,
      }),
      transcribeAudio: async () => {
        calls += 1;
        throw new Error("private provider error must not be retained");
      },
      extractFrames: async () => ({
        durationSeconds: 4,
        frames: [
          { dataUri: `data:image/jpeg;base64,${jpeg.toString("base64")}`, timestampSeconds: 1 },
        ],
      }),
      callVisionModel: async () => "a blue screen",
    };
    const result = await new VideoBridgeGuardrail({ deps }).preCall(
      {
        model: "example/text-only",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "input_video",
                video_url: "data:video/mp4;base64,QUJD",
                audioTranscription: request,
              },
            ],
          },
        ],
      },
      {}
    );
    assert.equal(calls, expected);
    assert.ok(JSON.stringify(result.modifiedPayload).includes("a blue screen"));
    assert.ok(!JSON.stringify(result).includes("private provider error"));
    assert.equal(result.meta?.audioFusionPartials, expected);
  }
});
