import assert from "node:assert/strict";
import { access, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  calculateFrameTimestamps,
  extractFramesFromLocalVideo,
  extractVideoFramesFromBytes,
  probeLocalVideo,
  probeVideoRuntime,
  readBoundedExtractedFrames,
  resetVideoRuntimeProbeCacheForTests,
  type VideoCommandRunner,
} from "../../../src/lib/guardrails/videoBridgeRuntime.ts";

test("calculates uniform midpoint timestamps", () => {
  assert.deepEqual(calculateFrameTimestamps(8, 4), [1, 3, 5, 7]);
  assert.deepEqual(calculateFrameTimestamps(0.4, 8), [0.2]);
});

test("probes and extracts a local video using shell-free bounded commands", async () => {
  const calls: Array<{ executable: string; args: string[]; timeoutMs: number }> = [];
  const runner: VideoCommandRunner = async (executable, args, options) => {
    calls.push({ executable, args: [...args], timeoutMs: options.timeoutMs });
    if (executable === "ffprobe") {
      return {
        stdout: JSON.stringify({
          format: { duration: "8.0", format_name: "mov,mp4,m4a,3gp,3g2,mj2" },
          streams: [{ index: 0, codec_type: "video", width: 1920, height: 1080 }],
        }),
        stderr: "",
      };
    }
    return { stdout: "", stderr: "" };
  };

  const metadata = await probeLocalVideo("/tmp/input.mp4", {
    maxDurationSeconds: 600,
    runner,
    timeoutMs: 5_000,
  });
  const frames = await extractFramesFromLocalVideo("/tmp/input.mp4", "/tmp/frames", {
    durationSeconds: metadata.durationSeconds,
    frameCount: 4,
    runner,
    streamIndex: metadata.streamIndex,
    timeoutMs: 10_000,
  });

  assert.equal(metadata.durationSeconds, 8);
  assert.deepEqual(
    frames.map((frame) => frame.timestampSeconds),
    [1, 3, 5, 7]
  );
  assert.equal(calls[0].executable, "ffprobe");
  assert.equal(calls[0].timeoutMs, 5_000);
  assert.deepEqual(calls[0].args.slice(-2), ["json", "/tmp/input.mp4"]);
  assert.deepEqual(
    calls[0].args.slice(
      calls[0].args.indexOf("-protocol_whitelist"),
      calls[0].args.indexOf("-protocol_whitelist") + 2
    ),
    ["-protocol_whitelist", "file"]
  );
  assert.ok(calls[0].args.includes("-format_whitelist"));
  assert.equal(
    calls[0].args[calls[0].args.indexOf("-show_entries") + 1],
    "format=duration,format_name:stream=index,codec_type,width,height:stream_disposition=default,attached_pic"
  );
  assert.equal(
    calls.slice(1).every((call) => call.executable === "ffmpeg"),
    true
  );
  assert.equal(
    calls.slice(1).every((call) => call.args.includes("-nostdin")),
    true
  );
  assert.equal(
    calls.slice(1).every((call) => call.args.includes("-protocol_whitelist")),
    true
  );
  assert.equal(
    calls.slice(1).every((call) => call.args.includes("-format_whitelist")),
    true
  );
  assert.equal(
    calls.slice(1).every((call) => call.args.includes("-threads") && call.args.includes("1")),
    true
  );
  assert.equal(
    calls
      .slice(1)
      .every((call) =>
        call.args.some(
          (arg) =>
            arg.includes("min(1024,iw)") &&
            arg.includes("min(1024,ih)") &&
            arg.includes("force_original_aspect_ratio=decrease")
        )
      ),
    true
  );
  assert.equal(
    calls.slice(1).every((call) => !call.args.some((arg) => arg.includes("://"))),
    true
  );
});

test("rejects remote process inputs and videos beyond the duration bound", async () => {
  const runner: VideoCommandRunner = async () => ({
    stdout: JSON.stringify({
      format: { duration: "601", format_name: "mp4" },
      streams: [{ index: 0, codec_type: "video", width: 1280, height: 720 }],
    }),
    stderr: "private upstream details",
  });
  await assert.rejects(
    () => probeLocalVideo("https://example.test/video.mp4", { runner }),
    /local path/
  );
  await assert.rejects(
    () => probeLocalVideo("/tmp/input.mp4", { maxDurationSeconds: 600, runner }),
    /maximum duration/
  );
});

test("rejects reference-bearing formats before extraction and confines both tools to local files", async () => {
  const calls: Array<{ executable: string; args: string[] }> = [];
  const runner: VideoCommandRunner = async (executable, args) => {
    calls.push({ executable, args: [...args] });
    return {
      stdout: JSON.stringify({
        format: { duration: "10", format_name: "hls" },
        streams: [{ index: 0, codec_type: "video", width: 640, height: 360 }],
      }),
      stderr: "http://169.254.169.254/latest/meta-data",
    };
  };

  await assert.rejects(() => probeLocalVideo("/tmp/malicious.m3u8", { runner }), /format/);
  assert.equal(calls.length, 1, "a rejected manifest must never reach ffmpeg");
  assert.deepEqual(
    calls[0].args.slice(
      calls[0].args.indexOf("-protocol_whitelist"),
      calls[0].args.indexOf("-protocol_whitelist") + 2
    ),
    ["-protocol_whitelist", "file"]
  );
  assert.equal(
    calls[0].args.some((arg) => arg.includes("169.254.169.254")),
    false
  );
});

test("safe containers may contain URL or traversal-like compressed bytes without false rejection", async () => {
  const calls: string[] = [];
  const runner: VideoCommandRunner = async (executable, args) => {
    calls.push(executable);
    if (executable === "ffprobe") {
      return {
        stdout: JSON.stringify({
          format: { duration: "2", format_name: "mp4" },
          streams: [{ index: 0, codec_type: "video", width: 640, height: 360 }],
        }),
        stderr: "",
      };
    }
    await writeFile(args.at(-1) ?? "", Buffer.from([0xff, 0xd8, 0xff, 0xd9]));
    return { stdout: "", stderr: "" };
  };
  const validContainerBytes = Buffer.concat([
    Buffer.from([0, 0, 0, 24, 0x66, 0x74, 0x79, 0x70]),
    Buffer.from("compressed-chunk:http://127.0.0.1/../not-a-reference"),
  ]);

  const result = await extractVideoFramesFromBytes(validContainerBytes, {
    frameCount: 1,
    maxDurationSeconds: 600,
    runner,
    timeoutMs: 5_000,
  });

  assert.deepEqual(calls, ["ffprobe", "ffmpeg"]);
  assert.equal(result.frames.length, 1);
});

test("rejects oversized dimensions and pixel counts from sanitized probe metadata", async () => {
  const runner: VideoCommandRunner = async () => ({
    stdout: JSON.stringify({
      format: { duration: "2", format_name: "mp4" },
      streams: [{ index: 0, codec_type: "video", width: 16384, height: 16384 }],
    }),
    stderr: "private path",
  });
  await assert.rejects(() => probeLocalVideo("/tmp/oversized.mp4", { runner }), /dimensions/);
});

test("rejects a container when any video stream exceeds dimension or pixel limits", async () => {
  const runner: VideoCommandRunner = async () => ({
    stdout: JSON.stringify({
      format: { duration: "2", format_name: "mp4" },
      streams: [
        { index: 0, codec_type: "video", width: 640, height: 360 },
        { index: 1, codec_type: "video", width: 16384, height: 16384 },
      ],
    }),
    stderr: "",
  });

  await assert.rejects(
    () => probeLocalVideo("/tmp/multiple-streams.mp4", { runner }),
    /dimensions/
  );
});

test("selects the lowest validated video stream index and maps it explicitly in ffmpeg", async () => {
  const calls: Array<{ executable: string; args: string[] }> = [];
  const runner: VideoCommandRunner = async (executable, args) => {
    calls.push({ executable, args: [...args] });
    return executable === "ffprobe"
      ? {
          stdout: JSON.stringify({
            format: { duration: "4", format_name: "mp4" },
            streams: [
              { index: 3, codec_type: "video", width: 1280, height: 720 },
              { index: 1, codec_type: "video", width: 640, height: 360 },
            ],
          }),
          stderr: "",
        }
      : { stdout: "", stderr: "" };
  };

  const metadata = await probeLocalVideo("/tmp/multiple-safe.mp4", { runner });
  await extractFramesFromLocalVideo("/tmp/multiple-safe.mp4", "/tmp/frames", {
    durationSeconds: metadata.durationSeconds,
    frameCount: 1,
    runner,
    streamIndex: metadata.streamIndex,
  });

  assert.equal(metadata.streamIndex, 1);
  const ffmpegArgs = calls.find((call) => call.executable === "ffmpeg")?.args ?? [];
  const mapIndex = ffmpegArgs.indexOf("-map");
  assert.deepEqual(ffmpegArgs.slice(mapIndex, mapIndex + 2), ["-map", "0:1"]);
});

test("ignores an attached cover and maps the preferred playable default stream", async () => {
  const calls: Array<{ executable: string; args: string[] }> = [];
  const runner: VideoCommandRunner = async (executable, args) => {
    calls.push({ executable, args: [...args] });
    return executable === "ffprobe"
      ? {
          stdout: JSON.stringify({
            format: { duration: "4", format_name: "mp4" },
            streams: [
              {
                index: 0,
                codec_type: "video",
                width: 20000,
                height: 20000,
                disposition: { attached_pic: 1, default: 0 },
              },
              {
                index: 1,
                codec_type: "video",
                width: 640,
                height: 360,
                disposition: { attached_pic: 0, default: 0 },
              },
              {
                index: 2,
                codec_type: "video",
                width: 1280,
                height: 720,
                disposition: { attached_pic: 0, default: 1 },
              },
            ],
          }),
          stderr: "",
        }
      : { stdout: "", stderr: "" };
  };

  const metadata = await probeLocalVideo("/tmp/cover-and-video.mp4", { runner });
  await extractFramesFromLocalVideo("/tmp/cover-and-video.mp4", "/tmp/frames", {
    durationSeconds: metadata.durationSeconds,
    frameCount: 1,
    runner,
    streamIndex: metadata.streamIndex,
  });

  assert.equal(metadata.streamIndex, 2);
  assert.equal(metadata.width, 1280);
  assert.equal(metadata.height, 720);
  const ffmpegArgs = calls.find((call) => call.executable === "ffmpeg")?.args ?? [];
  const mapIndex = ffmpegArgs.indexOf("-map");
  assert.deepEqual(ffmpegArgs.slice(mapIndex, mapIndex + 2), ["-map", "0:2"]);
});

test("rejects a container whose only video stream is an attached picture", async () => {
  const runner: VideoCommandRunner = async () => ({
    stdout: JSON.stringify({
      format: { duration: "4", format_name: "mp4" },
      streams: [
        { index: 0, codec_type: "audio" },
        {
          index: 1,
          codec_type: "video",
          width: 600,
          height: 600,
          disposition: { attached_pic: 1, default: 1 },
        },
      ],
    }),
    stderr: "",
  });

  await assert.rejects(
    () => probeLocalVideo("/tmp/audio-with-cover.mp4", { runner }),
    /playable video stream/
  );
});

test("malformed playable stream disposition or index fails closed without selecting a cover", async () => {
  const runner: VideoCommandRunner = async () => ({
    stdout: JSON.stringify({
      format: { duration: "4", format_name: "mp4" },
      streams: [
        {
          index: 0,
          codec_type: "video",
          width: 300,
          height: 300,
          disposition: { attached_pic: "1", default: "not-a-flag" },
        },
        {
          index: "bad",
          codec_type: "video",
          width: 1280,
          height: 720,
          disposition: { attached_pic: 0, default: 1 },
        },
      ],
    }),
    stderr: "",
  });

  await assert.rejects(
    () => probeLocalVideo("/tmp/malformed-stream.mp4", { runner }),
    /dimensions|stream metadata/
  );
});

test("runtime status exposes sanitized versions and a sanitized unavailable reason", async () => {
  resetVideoRuntimeProbeCacheForTests();
  const ready = await probeVideoRuntime({
    cacheTtlMs: 0,
    runner: async (executable) => ({
      stdout:
        executable === "ffmpeg" ? "ffmpeg version 6.1.1 secret" : "ffprobe version 6.1.1 secret",
      stderr: "",
    }),
  });
  assert.deepEqual(ready, {
    available: true,
    ffmpegVersion: "6.1.1",
    ffprobeVersion: "6.1.1",
  });

  resetVideoRuntimeProbeCacheForTests();
  const unavailable = await probeVideoRuntime({
    cacheTtlMs: 0,
    runner: async () => {
      throw new Error("spawn /private/operator/path ENOENT");
    },
  });
  assert.deepEqual(unavailable, {
    available: false,
    ffmpegVersion: null,
    ffprobeVersion: null,
    reason: "FFmpeg and ffprobe are not available on PATH",
  });
});

test("runtime probe uses its short cache instead of spawning on every status read", async () => {
  resetVideoRuntimeProbeCacheForTests();
  let calls = 0;
  const runner: VideoCommandRunner = async (executable) => {
    calls += 1;
    return {
      stdout: `${executable} version 7.0`,
      stderr: "",
    };
  };

  const first = await probeVideoRuntime({ cacheTtlMs: 30_000, runner });
  const second = await probeVideoRuntime({ cacheTtlMs: 30_000, runner });
  assert.deepEqual(second, first);
  assert.equal(calls, 2, "one ffmpeg + one ffprobe process should serve both reads");
});

test("checks individual and aggregate frame byte caps before returning broker output", async () => {
  const directory = await mkdtemp(join(tmpdir(), "video-frame-caps-"));
  const first = join(directory, "first.jpg");
  const second = join(directory, "second.jpg");
  await writeFile(first, Buffer.alloc(3));
  await writeFile(second, Buffer.alloc(3));
  const frames = [
    { path: first, timestampSeconds: 1 },
    { path: second, timestampSeconds: 2 },
  ];
  try {
    await assert.rejects(
      () => readBoundedExtractedFrames(frames, { maxFrameBytes: 2, maxTotalBytes: 8 }),
      /frame byte limit/
    );
    await assert.rejects(
      () => readBoundedExtractedFrames(frames, { maxFrameBytes: 4, maxTotalBytes: 5 }),
      /total frame byte limit/
    );
    const result = await readBoundedExtractedFrames(frames, {
      maxFrameBytes: 4,
      maxTotalBytes: 6,
    });
    assert.equal(result.length, 2);
    assert.equal(
      result.reduce((sum, frame) => sum + frame.byteLength, 0),
      6
    );
  } finally {
    await rm(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("byte extraction removes its private temporary tree after a subprocess failure", async () => {
  let temporaryInput = "";
  const runner: VideoCommandRunner = async (_executable, args) => {
    temporaryInput = args.at(-1) ?? "";
    throw Object.assign(new Error("private ffprobe path"), { code: "ENOENT" });
  };

  await assert.rejects(
    () =>
      extractVideoFramesFromBytes(Buffer.from("video"), {
        frameCount: 1,
        maxDurationSeconds: 600,
        runner,
        timeoutMs: 5_000,
      }),
    /private ffprobe path/
  );
  assert.notEqual(temporaryInput, "");
  await assert.rejects(() => access(temporaryInput));
});
