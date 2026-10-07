import assert from "node:assert/strict";
import test from "node:test";

import { fuseVideoAndAudio, type FusionTrack } from "../../../src/lib/guardrails/videoAudioFusion";

const track = (source: "audio" | "video", text: string, startSeconds: number): FusionTrack => ({
  observations: [
    {
      confidence: 0.9,
      endSeconds: startSeconds + 1,
      source,
      startSeconds,
      text,
    },
  ],
});

test("fuses video and audio observations on one sorted timeline", async () => {
  let videoSignal: AbortSignal | undefined;
  let audioSignal: AbortSignal | undefined;
  const result = await fuseVideoAndAudio({
    audio: async (signal) => {
      audioSignal = signal;
      return track("audio", "spoken", 1);
    },
    timeoutMs: 1000,
    video: async (signal) => {
      videoSignal = signal;
      return track("video", "scene", 0);
    },
  });

  assert.equal(videoSignal, audioSignal);
  assert.deepEqual(
    result.observations.map((item) => item.source),
    ["video", "audio"]
  );
  assert.equal(result.partial, false);
});

test("keeps a successful side and reports partial failure without leaking the error", async () => {
  const result = await fuseVideoAndAudio({
    audio: async () => {
      throw new Error("provider secret");
    },
    timeoutMs: 1000,
    video: async () => track("video", "scene", 0),
  });

  assert.equal(result.partial, true);
  assert.deepEqual(
    result.observations.map((item) => item.source),
    ["video"]
  );
  assert.deepEqual(result.failures, { audio: "FAILED" });
  assert.equal(JSON.stringify(result).includes("provider secret"), false);
});

test("aborting the shared budget stops both branches and rejects safely", async () => {
  const controller = new AbortController();
  let aborted = 0;
  const wait = (signal: AbortSignal): Promise<FusionTrack> =>
    new Promise((resolve) => {
      signal.addEventListener("abort", () => {
        aborted += 1;
        resolve({ observations: [] });
      });
    });
  const pending = fuseVideoAndAudio({
    audio: wait,
    signal: controller.signal,
    timeoutMs: 5000,
    video: wait,
  });
  controller.abort();
  await assert.rejects(pending, /aborted/i);
  assert.equal(aborted, 2);
});

test("an already-aborted budget rejects before either branch starts", async () => {
  const controller = new AbortController();
  controller.abort();
  let videoStarted = false;
  let audioStarted = false;

  await assert.rejects(
    fuseVideoAndAudio({
      audio: async () => {
        audioStarted = true;
        return track("audio", "spoken", 1);
      },
      signal: controller.signal,
      timeoutMs: 1000,
      video: async () => {
        videoStarted = true;
        return track("video", "scene", 0);
      },
    }),
    /aborted/i
  );

  assert.equal(videoStarted, false);
  assert.equal(audioStarted, false);
});

test("rejects when both sides fail and removes exact duplicate observations", async () => {
  const observation = {
    confidence: 1,
    endSeconds: 2,
    source: "video" as const,
    startSeconds: 1,
    text: "same",
  };
  const result = await fuseVideoAndAudio({
    audio: async () => ({ observations: [{ ...observation, source: "audio" as const }] }),
    timeoutMs: 1000,
    video: async () => ({ observations: [observation] }),
  });
  assert.equal(result.observations.length, 2);

  await assert.rejects(
    fuseVideoAndAudio({
      audio: async () => {
        throw new Error("audio down");
      },
      timeoutMs: 1000,
      video: async () => {
        throw new Error("video down");
      },
    }),
    /fusion failed/i
  );
});
