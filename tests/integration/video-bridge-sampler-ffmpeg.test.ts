/**
 * Real FFmpeg fixture gate for the scene-aware Video Bridge sampler.
 *
 * Run explicitly because FFmpeg is an optional operational dependency:
 * RUN_VIDEO_BRIDGE_FFMPEG=1 node --import tsx/esm --test \
 *   tests/integration/video-bridge-sampler-ffmpeg.test.ts
 */
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { promisify } from "node:util";

import {
  extractVideoFramesFromBytes,
  type VideoCommandRunner,
} from "../../src/lib/guardrails/videoBridgeRuntime.ts";

const execFileAsync = promisify(execFile);
const REAL_FFMPEG_ENABLED = process.env.RUN_VIDEO_BRIDGE_FFMPEG === "1";
const REAL_FFMPEG_SKIP = REAL_FFMPEG_ENABLED
  ? false
  : "Set RUN_VIDEO_BRIDGE_FFMPEG=1 to run the real FFmpeg fixture matrix";

const realRunner: VideoCommandRunner = async (executable, args, options) => {
  const result = await execFileAsync(executable, [...args], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024,
    signal: options.signal,
    timeout: options.timeoutMs,
    windowsHide: true,
  });
  return { stderr: String(result.stderr), stdout: String(result.stdout) };
};

async function createFixture(
  directory: string,
  name: string,
  inputArgs: readonly string[],
  videoFilter: string
): Promise<Buffer> {
  const outputPath = join(directory, `${name}.mkv`);
  await realRunner(
    "ffmpeg",
    [
      "-nostdin",
      "-hide_banner",
      "-loglevel",
      "error",
      ...inputArgs,
      "-vf",
      videoFilter,
      "-c:v",
      "ffv1",
      "-y",
      outputPath,
    ],
    { timeoutMs: 30_000 }
  );
  return readFile(outputPath);
}

async function createRapidEdgeCutFixture(directory: string): Promise<Buffer> {
  const outputPath = join(directory, "rapid-edge-cuts.mkv");
  await realRunner(
    "ffmpeg",
    [
      "-nostdin",
      "-hide_banner",
      "-loglevel",
      "error",
      "-f",
      "lavfi",
      "-i",
      "color=c=red:s=64x64:r=10:d=0.2",
      "-f",
      "lavfi",
      "-i",
      "color=c=black:s=64x64:r=10:d=2.6",
      "-f",
      "lavfi",
      "-i",
      "color=c=white:s=64x64:r=10:d=0.2",
      "-filter_complex",
      "[0:v][1:v][2:v]concat=n=3:v=1:a=0,format=yuv420p[v]",
      "-map",
      "[v]",
      "-c:v",
      "ffv1",
      "-y",
      outputPath,
    ],
    { timeoutMs: 30_000 }
  );
  return readFile(outputPath);
}

async function sample(bytes: Buffer, frameCount: number, runner = realRunner) {
  return extractVideoFramesFromBytes(bytes, {
    frameCount,
    maxDurationSeconds: 600,
    runner,
    samplingPolicy: "scene_aware",
    timeoutMs: 30_000,
  });
}

test(
  "scene-aware sampling handles the canonical real FFmpeg fixture matrix",
  { skip: REAL_FFMPEG_SKIP },
  async (context) => {
    const directory = await mkdtemp(join(tmpdir(), "omniroute-video-sampler-fixtures-"));
    context.after(async () =>
      rm(directory, { force: true, recursive: true, maxRetries: 5, retryDelay: 100 })
    );

    const rapidCuts = await createRapidEdgeCutFixture(directory);
    await context.test("rapid cuts near both ends retain coverage within the cap", async () => {
      const result = await sample(rapidCuts, 4);

      assert.deepEqual(
        result.frames.map((frame) => frame.timestampSeconds),
        [0.2, 0.5, 2.8]
      );
      assert.deepEqual(result.sampling, {
        candidateCount: 2,
        policyEffective: "scene_aware",
        policyRequested: "scene_aware",
      });
      assert.ok(result.frames.length <= 16);
    });

    await context.test("one frame falls back to the full-window midpoint", async () => {
      const result = await sample(rapidCuts, 1);

      assert.deepEqual(
        result.frames.map((frame) => frame.timestampSeconds),
        [1.5]
      );
      assert.deepEqual(result.sampling, {
        candidateCount: 2,
        policyEffective: "uniform",
        policyRequested: "scene_aware",
      });
    });

    const staticVideo = await createFixture(
      directory,
      "static",
      ["-f", "lavfi", "-i", "color=c=blue:s=64x64:r=10:d=4"],
      "format=yuv420p"
    );
    await context.test("a static scene falls back to uniform midpoints", async () => {
      const result = await sample(staticVideo, 4);

      assert.deepEqual(
        result.frames.map((frame) => frame.timestampSeconds),
        [0.5, 1.5, 2.5, 3.5]
      );
      assert.deepEqual(result.sampling, {
        candidateCount: 0,
        policyEffective: "uniform",
        policyRequested: "scene_aware",
      });
    });

    const slowChange = await createFixture(
      directory,
      "slow-change",
      ["-f", "lavfi", "-i", "nullsrc=s=64x64:r=10:d=4"],
      "geq=lum='clip(16+200*T/4,16,235)':cb=128:cr=128,format=yuv420p"
    );
    await context.test("a gradual luminance change does not become a false scene cut", async () => {
      const result = await sample(slowChange, 4);

      assert.deepEqual(
        result.frames.map((frame) => frame.timestampSeconds),
        [0.5, 1.5, 2.5, 3.5]
      );
      assert.equal(result.sampling.candidateCount, 0);
      assert.equal(result.sampling.policyEffective, "uniform");
    });

    const shortVideo = await createFixture(
      directory,
      "short",
      ["-f", "lavfi", "-i", "color=c=yellow:s=64x64:r=10:d=0.4"],
      "format=yuv420p"
    );
    await context.test("a sub-second clip remains deterministic and bounded", async () => {
      const result = await sample(shortVideo, 8);

      assert.deepEqual(
        result.frames.map((frame) => frame.timestampSeconds),
        [0.2]
      );
      assert.equal(result.sampling.policyEffective, "uniform");
    });

    await context.test(
      "a detector failure falls back while real frame extraction continues",
      async () => {
        const detectorFailureRunner: VideoCommandRunner = async (executable, args, options) => {
          if (args.some((arg) => arg.includes("showinfo"))) {
            throw new Error("fixture scene detector failure");
          }
          return realRunner(executable, args, options);
        };
        const result = await sample(staticVideo, 4, detectorFailureRunner);

        assert.deepEqual(
          result.frames.map((frame) => frame.timestampSeconds),
          [0.5, 1.5, 2.5, 3.5]
        );
        assert.deepEqual(result.sampling, {
          candidateCount: 0,
          policyEffective: "uniform",
          policyRequested: "scene_aware",
        });
      }
    );
  }
);
