import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateSamplingDecision,
  calculateSegmentAwareTimestamps,
  extractFramesFromLocalVideo,
  parseSceneChangeTimestamps,
  type VideoCommandRunner,
} from "../../../src/lib/guardrails/videoBridgeRuntime.ts";

test("scene-aware sampling preserves a rapid final cut and stays within the frame cap", () => {
  const decision = calculateSamplingDecision(12, 4, "scene_aware", [2.25, 5.5, 11.75]);

  assert.equal(decision.policyRequested, "scene_aware");
  assert.equal(decision.policyEffective, "scene_aware");
  assert.equal(decision.candidateCount, 3);
  assert.equal(decision.timestamps.length, 4);
  assert.equal(decision.timestamps.at(-1), 11.75);
  assert.ok(decision.timestamps.every((timestamp) => timestamp > 0 && timestamp < 12));
});

test("scene-aware sampling falls back to deterministic uniform midpoints for a static scene", () => {
  const decision = calculateSamplingDecision(8, 4, "scene_aware", []);

  assert.deepEqual(decision.timestamps, [1, 3, 5, 7]);
  assert.equal(decision.policyRequested, "scene_aware");
  assert.equal(decision.policyEffective, "uniform");
  assert.equal(decision.candidateCount, 0);
});

test("scene-aware sampling falls back to the midpoint when one frame cannot cover both ends", () => {
  const decision = calculateSamplingDecision(8, 1, "scene_aware", [0.25, 7.75]);

  assert.deepEqual(decision.timestamps, [4]);
  assert.equal(decision.policyRequested, "scene_aware");
  assert.equal(decision.policyEffective, "uniform");
  assert.equal(decision.candidateCount, 2);
});

test("one-frame scene-aware fallback uses the active focus-window midpoint", () => {
  const decision = calculateSamplingDecision(10, 1, "scene_aware", [2.25, 7.75], {
    endSeconds: 8,
    startSeconds: 2,
  });

  assert.deepEqual(decision.timestamps, [5]);
  assert.equal(decision.policyEffective, "uniform");
  assert.deepEqual(decision.focusWindow, { endSeconds: 8, startSeconds: 2 });
});

test("scene candidates are parsed from showinfo output and malformed values are ignored", () => {
  const output = [
    "[Parsed_showinfo_0 @ 0x1] n:1 pts_time:1.250",
    "[Parsed_showinfo_0 @ 0x1] n:2 pts_time:1.250",
    "[Parsed_showinfo_0 @ 0x1] n:3 pts_time:9.750",
    "[Parsed_showinfo_0 @ 0x1] n:4 pts_time:-1",
    "[Parsed_showinfo_0 @ 0x1] n:5 pts_time:nan",
  ].join("\n");

  assert.deepEqual(parseSceneChangeTimestamps(output, 10), [1.25, 9.75]);
});

test("extracts scene-aware timestamps through a fixed ffmpeg seam and reports fallback metadata", async () => {
  const calls: Array<{ executable: string; args: string[] }> = [];
  const runner: VideoCommandRunner = async (executable, args) => {
    calls.push({ executable, args: [...args] });
    if (args.some((arg) => arg.includes("showinfo"))) {
      return {
        stdout: "",
        stderr: "[Parsed_showinfo_0] pts_time:7.500",
      };
    }
    return { stdout: "", stderr: "" };
  };

  const frames = await extractFramesFromLocalVideo("/tmp/input.mp4", "/tmp/frames", {
    durationSeconds: 8,
    frameCount: 4,
    runner,
    samplingPolicy: "scene_aware",
    streamIndex: 0,
    timeoutMs: 5_000,
  });

  assert.equal(frames.sampling.policyRequested, "scene_aware");
  assert.equal(frames.sampling.policyEffective, "scene_aware");
  assert.equal(frames.sampling.candidateCount, 1);
  assert.equal(frames.at(-1)?.timestampSeconds, 7.5);
  assert.equal(calls[0].executable, "ffmpeg");
  assert.ok(calls[0].args.some((arg) => arg.includes("showinfo")));
  assert.equal(calls.filter((call) => call.executable === "ffmpeg").length, 5);
});

test("scene detection timeout or runtime failure falls back to uniform sampling", async () => {
  const frames = await extractFramesFromLocalVideo("/tmp/input.mp4", "/tmp/frames", {
    durationSeconds: 8,
    frameCount: 4,
    runner: async (_executable, args) => {
      if (args.some((arg) => arg.includes("showinfo"))) {
        throw new Error("scene detector unavailable");
      }
      return { stdout: "", stderr: "" };
    },
    samplingPolicy: "scene_aware",
    streamIndex: 0,
    timeoutMs: 5_000,
  });

  assert.deepEqual(
    frames.map((frame) => frame.timestampSeconds),
    [1, 3, 5, 7]
  );
  assert.deepEqual(frames.sampling, {
    candidateCount: 0,
    policyEffective: "uniform",
    policyRequested: "scene_aware",
  });
});

test("segment-aware sampling allocates frames across long and short scene segments", () => {
  const timestamps = calculateSegmentAwareTimestamps(20, 6, [2, 10, 12]);
  assert.equal(timestamps.length, 6);
  assert.ok(timestamps.some((timestamp) => timestamp < 2));
  assert.ok(timestamps.some((timestamp) => timestamp > 2 && timestamp < 10));
  assert.ok(timestamps.some((timestamp) => timestamp > 12));
  assert.ok(timestamps.every((timestamp) => timestamp > 0 && timestamp < 20));
});

test("segment-aware sampling falls back to uniform when boundaries are unusable", () => {
  const decision = calculateSamplingDecision(8, 4, "segment_aware", []);
  assert.equal(decision.policyRequested, "segment_aware");
  assert.equal(decision.policyEffective, "uniform");
  assert.deepEqual(decision.timestamps, [1, 3, 5, 7]);
});
