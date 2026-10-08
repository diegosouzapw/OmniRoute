import assert from "node:assert/strict";
import { access, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  extractSubtitleStreamToFile,
  extractVideoSubtitlesFromBytes,
  probeSubtitleStreams,
  readBoundedSubtitleOutput,
  VIDEO_SUBTITLE_MAX_OUTPUT_BYTES,
} from "../../../src/lib/guardrails/videoBridgeSubtitleRuntime.ts";
import { type VideoCommandRunner } from "../../../src/lib/guardrails/videoBridgeRuntime.ts";

const CONTAINER_PROBE_STDOUT = JSON.stringify({
  format: { duration: "12.0", format_name: "mov,mp4,m4a,3gp,3g2,mj2" },
  streams: [{ index: 0, codec_type: "video", width: 640, height: 360 }],
});

// Per-run temp dir, never a fixed /tmp name: on a shared self-hosted runner a leftover file
// owned by another user makes a fixed path unwritable (EACCES under /tmp's sticky bit, even
// for root with fs.protected_regular), and parallel shards would race on the same name.
const TEMP_DIR = await mkdtemp(path.join(os.tmpdir(), "omniroute-subtitle-runtime-"));
test.after(() => rm(TEMP_DIR, { recursive: true, force: true }));

function isSubtitleStreamProbe(args: readonly string[]): boolean {
  return args.some((arg) => arg.includes("codec_name"));
}

test("lists only allowlisted subtitle streams, ordered by index and capped at two", async () => {
  const runner: VideoCommandRunner = async (executable, args) => {
    assert.equal(executable, "ffprobe");
    assert.ok(isSubtitleStreamProbe(args));
    return {
      stdout: JSON.stringify({
        streams: [
          { index: 4, codec_type: "subtitle", codec_name: "ass" },
          { index: 3, codec_type: "subtitle", codec_name: "webvtt" },
          { index: 1, codec_type: "subtitle", codec_name: "subrip" },
          { index: 2, codec_type: "subtitle", codec_name: "mov_text" },
          { index: 0, codec_type: "audio", codec_name: "aac" },
        ],
      }),
      stderr: "",
    };
  };

  const probes = await probeSubtitleStreams("/tmp/input.video", { runner, timeoutMs: 5_000 });

  assert.deepEqual(probes, [
    { codecName: "subrip", streamIndex: 1 },
    { codecName: "mov_text", streamIndex: 2 },
  ]);
});

test("an unparseable ffprobe response yields zero subtitle streams instead of throwing", async () => {
  const runner: VideoCommandRunner = async () => ({ stdout: "not json", stderr: "" });
  const probes = await probeSubtitleStreams("/tmp/input.video", { runner, timeoutMs: 5_000 });
  assert.deepEqual(probes, []);
});

test("extracts a single allowlisted stream to bounded WebVTT text", async () => {
  const runner: VideoCommandRunner = async (executable, args) => {
    if (executable === "ffmpeg") {
      await writeFile(args.at(-1) ?? "", "WEBVTT\n\n00:00:01.000 --> 00:00:02.000\nhi\n");
    }
    return { stdout: "", stderr: "" };
  };
  const outputPath = path.join(TEMP_DIR, "test.vtt");
  await extractSubtitleStreamToFile("/tmp/input.video", outputPath, 3, {
    runner,
    timeoutMs: 5_000,
  });
  const text = await readBoundedSubtitleOutput(outputPath);
  assert.match(text, /WEBVTT/);
});

test("readBoundedSubtitleOutput rejects output above the byte cap", async () => {
  const outputPath = path.join(TEMP_DIR, "oversized.vtt");
  await writeFile(outputPath, "x".repeat(VIDEO_SUBTITLE_MAX_OUTPUT_BYTES + 1));
  await assert.rejects(() => readBoundedSubtitleOutput(outputPath), /byte limit/);
});

test("readBoundedSubtitleOutput rejects an empty extraction result", async () => {
  const outputPath = path.join(TEMP_DIR, "empty.vtt");
  await writeFile(outputPath, "");
  await assert.rejects(() => readBoundedSubtitleOutput(outputPath), /no output/);
});

test("full bytes-to-WebVTT pipeline probes the container once, extracts up to two streams, and always cleans up", async () => {
  const calls: string[] = [];
  let capturedInputPath = "";
  const runner: VideoCommandRunner = async (executable, args) => {
    calls.push(executable);
    if (capturedInputPath === "") capturedInputPath = String(args.at(-1));
    if (executable === "ffprobe") {
      if (isSubtitleStreamProbe(args)) {
        return {
          stdout: JSON.stringify({
            streams: [
              { index: 2, codec_type: "subtitle", codec_name: "webvtt" },
              { index: 3, codec_type: "subtitle", codec_name: "subrip" },
            ],
          }),
          stderr: "",
        };
      }
      return { stdout: CONTAINER_PROBE_STDOUT, stderr: "" };
    }
    await writeFile(args.at(-1) ?? "", "WEBVTT\n\n00:00:01.000 --> 00:00:02.000\nhello\n");
    return { stdout: "", stderr: "" };
  };

  const result = await extractVideoSubtitlesFromBytes(Buffer.from("fake-video-bytes"), {
    maxDurationSeconds: 600,
    runner,
    timeoutMs: 5_000,
  });

  assert.equal(result.durationSeconds, 12);
  assert.equal(result.streams.length, 2);
  assert.deepEqual(
    result.streams.map((stream) => stream.streamIndex),
    [2, 3]
  );
  assert.equal(calls.filter((name) => name === "ffmpeg").length, 2);

  assert.ok(capturedInputPath.includes("omniroute-video-subtitle-"));
  const temporaryDirectory = capturedInputPath.slice(0, capturedInputPath.lastIndexOf("/"));
  await assert.rejects(() => access(temporaryDirectory));
});

test("one unusable stream (extraction throws) does not block trying the next allowlisted stream", async () => {
  let ffmpegCalls = 0;
  const runner: VideoCommandRunner = async (executable, args) => {
    if (executable === "ffprobe") {
      if (isSubtitleStreamProbe(args)) {
        return {
          stdout: JSON.stringify({
            streams: [
              { index: 2, codec_type: "subtitle", codec_name: "webvtt" },
              { index: 5, codec_type: "subtitle", codec_name: "mov_text" },
            ],
          }),
          stderr: "",
        };
      }
      return { stdout: CONTAINER_PROBE_STDOUT, stderr: "" };
    }
    ffmpegCalls += 1;
    if (ffmpegCalls === 1) throw new Error("simulated ffmpeg failure");
    await writeFile(args.at(-1) ?? "", "WEBVTT\n\n00:00:01.000 --> 00:00:02.000\nok\n");
    return { stdout: "", stderr: "" };
  };

  const result = await extractVideoSubtitlesFromBytes(Buffer.from("fake-video-bytes"), {
    maxDurationSeconds: 600,
    runner,
    timeoutMs: 5_000,
  });

  assert.equal(result.streams.length, 1);
  assert.equal(result.streams[0].streamIndex, 5);
});

test("temp directory is removed even when the container probe itself fails", async () => {
  let capturedInputPath = "";
  const runner: VideoCommandRunner = async (_executable, args) => {
    capturedInputPath = String(args.at(-1));
    throw new Error("ffprobe unavailable");
  };
  await assert.rejects(() =>
    extractVideoSubtitlesFromBytes(Buffer.from("fake-video-bytes"), {
      maxDurationSeconds: 600,
      runner,
      timeoutMs: 5_000,
    })
  );
  assert.ok(capturedInputPath.includes("omniroute-video-subtitle-"));
  const temporaryDirectory = capturedInputPath.slice(0, capturedInputPath.lastIndexOf("/"));
  await assert.rejects(() => access(temporaryDirectory));
});

test("an already-aborted signal is rejected before any command runs", async () => {
  const controller = new AbortController();
  controller.abort();
  let ran = false;
  const runner: VideoCommandRunner = async () => {
    ran = true;
    return { stdout: "", stderr: "" };
  };
  await assert.rejects(
    () =>
      extractVideoSubtitlesFromBytes(Buffer.from("fake-video-bytes"), {
        maxDurationSeconds: 600,
        runner,
        signal: controller.signal,
        timeoutMs: 5_000,
      }),
    /aborted/
  );
  assert.equal(ran, false);
});
