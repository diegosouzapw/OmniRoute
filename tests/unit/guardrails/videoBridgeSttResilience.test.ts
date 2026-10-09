import assert from "node:assert/strict";
import test from "node:test";

import sharp from "sharp";

import {
  VideoBridgeGuardrail,
  type VideoBridgeDependencies,
} from "../../../src/lib/guardrails/videoBridge.ts";

const request = () => ({
  model: "example/text-only",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "input_video",
          video_url: "data:video/mp4;base64,QUJD",
          audioTranscription: true,
        },
      ],
    },
  ],
});

async function dependencies(): Promise<VideoBridgeDependencies> {
  const jpeg = await sharp({
    create: {
      width: 32,
      height: 32,
      channels: 3,
      background: "blue",
    },
  })
    .jpeg()
    .toBuffer();
  return {
    getSettings: async () => ({
      modalityBridgeVideoEnabled: true,
      modalityBridgeAudioEnabled: true,
      modalityBridgeVideoAudioTranscriptionEnabled: true,
      modalityBridgeCacheEnabled: false,
    }),
    getCapabilities: () => ({ supportsVideo: false }),
    selectVisionModel: async () => "openai/gpt-4o-mini",
    selectAudioModel: async () => "deepgram/nova-3",
    extractAudio: async () => ({
      audio: { channels: 1, dataUri: "data:audio/wav;base64,UklGRg==", sampleRateHz: 16000 },
      durationSeconds: 4,
    }),
    transcribeAudio: async () => ({ text: "private speech" }),
    extractFrames: async () => ({
      durationSeconds: 4,
      frames: [
        {
          dataUri: `data:image/jpeg;base64,${jpeg.toString("base64")}`,
          timestampSeconds: 1,
        },
      ],
    }),
    callVisionModel: async () => "visible blue screen",
  };
}

test("STT model selection failure preserves the visual description without leaking its error", async () => {
  const deps = await dependencies();
  deps.selectAudioModel = async () => {
    throw new Error("private selection failure");
  };
  const result = await new VideoBridgeGuardrail({ deps }).preCall(request(), {});
  assert.ok(JSON.stringify(result.modifiedPayload).includes("visible blue screen"));
  assert.ok(!JSON.stringify(result).includes("private selection failure"));
  assert.equal(result.meta?.audioFusionPartials, 1);
});

test("global Audio Bridge opt-out blocks paid STT even with video dual consent", async () => {
  const deps = await dependencies();
  const getSettings = deps.getSettings!;
  deps.getSettings = async () => ({ ...(await getSettings()), modalityBridgeAudioEnabled: false });
  let calls = 0;
  deps.selectAudioModel = async () => { calls += 1; return "deepgram/nova-3"; };
  const result = await new VideoBridgeGuardrail({ deps }).preCall(request(), {});
  assert.equal(calls, 0);
  assert.ok(JSON.stringify(result.modifiedPayload).includes("visible blue screen"));
  assert.equal(result.meta?.audioFusionPartials, 0);
});
