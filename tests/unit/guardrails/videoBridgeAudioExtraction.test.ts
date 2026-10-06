import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import test from "node:test";

import {
  VIDEO_AUDIO_CHANNELS,
  VIDEO_AUDIO_SAMPLE_RATE_HZ,
  extractVideoAudioFromBytes,
} from "../../../src/lib/guardrails/videoBridgeAudioExtraction.ts";
import type { VideoCommandRunner } from "../../../src/lib/guardrails/videoBridgeRuntime.ts";

test("extracts bounded mono 16kHz WAV bytes and reuses the probed duration", async () => {
  const calls: Array<{ executable: string; args: string[] }> = [];
  const runner: VideoCommandRunner = async (executable, args) => {
    calls.push({ executable, args: [...args] });
    if (executable === "ffprobe") {
      return {
        stdout: JSON.stringify({
          format: { duration: "4.5", format_name: "mp4" },
          streams: [{ index: 0, codec_type: "video", width: 640, height: 360 }],
        }),
        stderr: "",
      };
    }
    await writeFile(args.at(-1) ?? "", Buffer.from("RIFF....WAVEfmt "));
    return { stdout: "", stderr: "" };
  };

  const result = await extractVideoAudioFromBytes(Buffer.from("fake video bytes"), {
    maxDurationSeconds: 600,
    runner,
    timeoutMs: 5_000,
  });

  assert.equal(result.durationSeconds, 4.5);
  assert.equal(result.channels, VIDEO_AUDIO_CHANNELS);
  assert.equal(result.sampleRateHz, VIDEO_AUDIO_SAMPLE_RATE_HZ);
  assert.match(result.dataUri, /^data:audio\/wav;base64,/);
  assert.deepEqual(
    Buffer.from(result.dataUri.split(",", 2)[1], "base64"),
    Buffer.from("RIFF....WAVEfmt ")
  );

  const ffmpegCall = calls.find((call) => call.executable === "ffmpeg");
  assert.ok(ffmpegCall, "ffmpeg must be invoked");
  assert.deepEqual(ffmpegCall!.args.slice(ffmpegCall!.args.indexOf("-map"), ffmpegCall!.args.indexOf("-map") + 2), [
    "-map",
    "0:a:0",
  ]);
  assert.deepEqual(ffmpegCall!.args.slice(ffmpegCall!.args.indexOf("-ac"), ffmpegCall!.args.indexOf("-ac") + 2), [
    "-ac",
    "1",
  ]);
  assert.deepEqual(ffmpegCall!.args.slice(ffmpegCall!.args.indexOf("-ar"), ffmpegCall!.args.indexOf("-ar") + 2), [
    "-ar",
    "16000",
  ]);
  // No shell string ever built — every arg is a discrete array element (Hard Rule #13).
  assert.equal(
    ffmpegCall!.args.some((arg) => arg.includes(";") || arg.includes("&&")),
    false
  );
});

test("propagates the shared probe's duration cap instead of re-validating it", async () => {
  const runner: VideoCommandRunner = async (executable) => {
    if (executable === "ffprobe") {
      return {
        stdout: JSON.stringify({
          format: { duration: "700", format_name: "mp4" },
          streams: [{ index: 0, codec_type: "video", width: 640, height: 360 }],
        }),
        stderr: "",
      };
    }
    throw new Error("ffmpeg must not run once the shared duration cap already rejected the file");
  };

  await assert.rejects(
    () =>
      extractVideoAudioFromBytes(Buffer.from("fake video bytes"), {
        maxDurationSeconds: 600,
        runner,
        timeoutMs: 5_000,
      }),
    /maximum duration/
  );
});

test("rejects a WAV output that exceeds the configured byte cap", async () => {
  const runner: VideoCommandRunner = async (executable, args) => {
    if (executable === "ffprobe") {
      return {
        stdout: JSON.stringify({
          format: { duration: "4", format_name: "mp4" },
          streams: [{ index: 0, codec_type: "video", width: 640, height: 360 }],
        }),
        stderr: "",
      };
    }
    await writeFile(args.at(-1) ?? "", Buffer.alloc(16));
    return { stdout: "", stderr: "" };
  };

  await assert.rejects(
    () =>
      extractVideoAudioFromBytes(Buffer.from("fake video bytes"), {
        maxDurationSeconds: 600,
        maxOutputBytes: 8,
        runner,
        timeoutMs: 5_000,
      }),
    /byte limit exceeded/
  );
});

test("propagates ffmpeg's own failure when the container has no audio stream", async () => {
  const runner: VideoCommandRunner = async (executable) => {
    if (executable === "ffprobe") {
      return {
        stdout: JSON.stringify({
          format: { duration: "4", format_name: "mp4" },
          streams: [{ index: 0, codec_type: "video", width: 640, height: 360 }],
        }),
        stderr: "",
      };
    }
    throw new Error("Stream map '0:a:0' matches no streams");
  };

  await assert.rejects(
    () =>
      extractVideoAudioFromBytes(Buffer.from("fake video bytes"), {
        maxDurationSeconds: 600,
        runner,
        timeoutMs: 5_000,
      }),
    /matches no streams/
  );
});
