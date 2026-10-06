import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { promisify } from "node:util";

import {
  analyzeVideoStructure,
  calculateSamplingDecision,
  extractFramesFromLocalVideo,
  extractVideoFramesFromBytes,
  parseVideoStructuralAnalysis,
  type VideoCommandRunner,
  type VideoStructuralAnalysis,
} from "../../../src/lib/guardrails/videoBridgeRuntime.ts";

const execFileAsync = promisify(execFile);

async function writeFrozenThenMotionFixture(fixturePath: string): Promise<void> {
  await execFileAsync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-f",
      "lavfi",
      "-i",
      "color=c=black:s=320x180:d=6:r=12",
      "-f",
      "lavfi",
      "-i",
      "testsrc2=s=320x180:d=4:r=12",
      "-filter_complex",
      "[0:v][1:v]concat=n=2:v=1:a=0,format=yuv420p[v]",
      "-map",
      "[v]",
      "-c:v",
      "libx264",
      "-preset",
      "ultrafast",
      "-threads",
      "1",
      "-y",
      fixturePath,
    ],
    { timeout: 30_000 }
  );
}

const realRunner: VideoCommandRunner = async (executable, args, options) => {
  const result = await execFileAsync(executable, [...args], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024,
    signal: options.signal,
    timeout: options.timeoutMs,
  });
  return { stderr: String(result.stderr), stdout: String(result.stdout) };
};

function structuralAnalysis(
  overrides: Partial<VideoStructuralAnalysis> = {}
): VideoStructuralAnalysis {
  return {
    freezeIntervals: [{ endSeconds: 6, startSeconds: 0 }],
    samples: [
      {
        blur: null,
        brightness: 16,
        sceneScore: 0,
        spatialInformation: 0,
        temporalInformation: 0,
        timestampSeconds: 1,
      },
      {
        blur: 4.8,
        brightness: 121,
        sceneScore: 42,
        spatialInformation: 120,
        temporalInformation: 32,
        timestampSeconds: 6,
      },
      {
        blur: 4.9,
        brightness: 122,
        sceneScore: 0,
        spatialInformation: 118,
        temporalInformation: 28,
        timestampSeconds: 8,
      },
    ],
    sceneCandidates: [6],
    ...overrides,
  };
}

test("parses scene, freeze, blur, exposure, and spatial-temporal evidence", () => {
  const metadata = [
    "frame:0 pts:0 pts_time:0",
    "lavfi.scd.score=0.000",
    "frame:0 pts:0 pts_time:0",
    "lavfi.siti.si=0.00",
    "frame:0 pts:0 pts_time:0",
    "lavfi.siti.ti=0.00",
    "frame:0 pts:0 pts_time:0",
    "lavfi.blur=-nan",
    "frame:0 pts:0 pts_time:0",
    "lavfi.signalstats.YAVG=16",
    "frame:6 pts:6 pts_time:6",
    "lavfi.scd.score=41.013",
    "frame:6 pts:6 pts_time:6",
    "lavfi.siti.si=108.50",
    "frame:6 pts:6 pts_time:6",
    "lavfi.siti.ti=66.51",
    "frame:6 pts:6 pts_time:6",
    "lavfi.blur=4.75",
    "frame:6 pts:6 pts_time:6",
    "lavfi.signalstats.YAVG=121.5",
  ].join("\n");
  const stderr = [
    "lavfi.freezedetect.freeze_start: 0",
    "lavfi.freezedetect.freeze_duration: 6",
    "lavfi.freezedetect.freeze_end: 6",
  ].join("\n");

  const analysis = parseVideoStructuralAnalysis(metadata, stderr, 10);

  assert.deepEqual(analysis.sceneCandidates, [6]);
  assert.deepEqual(analysis.freezeIntervals, [{ endSeconds: 6, startSeconds: 0 }]);
  assert.deepEqual(analysis.samples, [
    {
      blur: null,
      brightness: 16,
      sceneScore: 0,
      spatialInformation: 0,
      temporalInformation: 0,
      timestampSeconds: 0,
    },
    {
      blur: 4.75,
      brightness: 121.5,
      sceneScore: 41.013,
      spatialInformation: 108.5,
      temporalInformation: 66.51,
      timestampSeconds: 6,
    },
  ]);
});

test("runs all structural filters in one fixed, local-only, bounded FFmpeg pass", async () => {
  const calls: Array<{ args: string[]; timeoutMs: number }> = [];
  const runner: VideoCommandRunner = async (executable, args, options) => {
    assert.equal(executable, "ffmpeg");
    calls.push({ args: [...args], timeoutMs: options.timeoutMs });
    return {
      stderr: "lavfi.freezedetect.freeze_start: 0\nlavfi.freezedetect.freeze_end: 2",
      stdout: "frame:0 pts:0 pts_time:0\nlavfi.scd.score=0",
    };
  };

  await analyzeVideoStructure("/tmp/input.mp4", {
    durationSeconds: 8,
    runner,
    streamIndex: 2,
    timeoutMs: 4_000,
  });

  assert.equal(calls.length, 1, "structural analysis must decode the video exactly once");
  assert.equal(calls[0].timeoutMs, 4_000);
  assert.ok(calls[0].args.includes("-nostdin"));
  assert.deepEqual(calls[0].args.slice(calls[0].args.indexOf("-map"), -1), [
    "-map",
    "0:2",
    "-vf",
    calls[0].args[calls[0].args.indexOf("-vf") + 1],
    "-an",
    "-frames:v",
    "600",
    "-f",
    "null",
  ]);
  const filter = calls[0].args[calls[0].args.indexOf("-vf") + 1];
  for (const expected of ["scdet", "freezedetect", "blurdetect", "signalstats", "siti"]) {
    assert.match(filter, new RegExp(expected));
  }
  assert.equal(
    calls[0].args.some((argument) => argument.includes("://")),
    false
  );
});

test("spends one frame on a frozen segment and reallocates the budget to dense motion", () => {
  const analysis = structuralAnalysis();
  const decision = calculateSamplingDecision(
    10,
    4,
    "segment_aware",
    analysis.sceneCandidates,
    null,
    analysis
  );

  assert.equal(decision.policyEffective, "segment_aware");
  assert.equal(decision.timestamps.length, 4);
  assert.equal(decision.timestamps.filter((timestamp) => timestamp < 6).length, 1);
  assert.equal(decision.timestamps.filter((timestamp) => timestamp > 6).length, 3);
});

test("avoids redundant caption work for an entirely frozen video", () => {
  const analysis = structuralAnalysis({
    freezeIntervals: [{ endSeconds: 8, startSeconds: 0 }],
    samples: [
      {
        blur: null,
        brightness: 81,
        sceneScore: 0,
        spatialInformation: 0,
        temporalInformation: 0,
        timestampSeconds: 4,
      },
    ],
    sceneCandidates: [],
  });
  const decision = calculateSamplingDecision(8, 8, "segment_aware", [], null, analysis);

  assert.equal(decision.policyEffective, "segment_aware");
  assert.equal(decision.timestamps.length, 1);
  assert.deepEqual(decision.timestamps, [4]);
});

test("does not prune a moving clip when freeze evidence is absent", () => {
  const analysis = structuralAnalysis({
    freezeIntervals: [],
    samples: [
      {
        blur: 4.8,
        brightness: 120,
        sceneScore: 0,
        spatialInformation: 100,
        temporalInformation: 30,
        timestampSeconds: 1,
      },
      {
        blur: 4.9,
        brightness: 122,
        sceneScore: 0,
        spatialInformation: 105,
        temporalInformation: 32,
        timestampSeconds: 7,
      },
    ],
    sceneCandidates: [],
  });
  const decision = calculateSamplingDecision(8, 4, "segment_aware", [], null, analysis);

  assert.equal(decision.policyEffective, "segment_aware");
  assert.deepEqual(decision.timestamps, [1, 3, 5, 7]);
});

test("uses lower FFmpeg blur scores as sharper evidence for the extra frame", () => {
  const common = {
    brightness: 120,
    sceneScore: 0,
    spatialInformation: 50,
    temporalInformation: 10,
  };
  const analysis = structuralAnalysis({
    freezeIntervals: [],
    samples: [
      { ...common, blur: 17, timestampSeconds: 1 },
      { ...common, blur: 4, timestampSeconds: 5 },
    ],
    sceneCandidates: [4],
  });
  const decision = calculateSamplingDecision(8, 3, "segment_aware", [4], null, analysis);

  assert.equal(decision.timestamps.filter((timestamp) => timestamp < 4).length, 1);
  assert.equal(decision.timestamps.filter((timestamp) => timestamp > 4).length, 2);
});

test("malformed-only structural metadata fails open to uniform sampling", () => {
  const analysis = parseVideoStructuralAnalysis("frame:0 pts:0 pts_time:0\nlavfi.blur=-nan", "", 8);
  const decision = calculateSamplingDecision(8, 4, "segment_aware", [], null, analysis);

  assert.deepEqual(analysis.samples, []);
  assert.equal(decision.policyEffective, "uniform");
  assert.deepEqual(decision.timestamps, [1, 3, 5, 7]);
});

test("keeps the long trailing segment when scene boundaries outnumber the frame budget", () => {
  const decision = calculateSamplingDecision(20, 4, "segment_aware", [1, 2, 3, 4]);

  assert.equal(decision.timestamps.length, 4);
  assert.ok(
    decision.timestamps.some((timestamp) => timestamp > 4),
    "the 16-second tail must not be dropped by early short cuts"
  );
});

test("preserves the legacy length-weighted allocation without structural evidence", () => {
  const decision = calculateSamplingDecision(10, 8, "segment_aware", [2]);

  assert.equal(decision.policyEffective, "segment_aware");
  assert.deepEqual(
    decision.timestamps.map((timestamp) => Number(timestamp.toFixed(3))),
    [0.5, 1.5, 2.667, 4, 5.333, 6.667, 8, 9.333]
  );
});

test("does not report a focus-window boundary as usable segment evidence", () => {
  const decision = calculateSamplingDecision(10, 4, "segment_aware", [2], {
    endSeconds: 8,
    startSeconds: 2,
  });

  assert.equal(decision.policyEffective, "uniform");
  assert.equal(decision.candidateCount, 0);
  assert.deepEqual(decision.timestamps, [2.75, 4.25, 5.75, 7.25]);
});

test("does not claim segment-aware evidence that falls outside the focus window", () => {
  const analysis = structuralAnalysis({
    freezeIntervals: [{ endSeconds: 10, startSeconds: 8 }],
    samples: [{ timestampSeconds: 9, temporalInformation: 0 }],
    sceneCandidates: [],
  });
  const decision = calculateSamplingDecision(
    10,
    4,
    "segment_aware",
    [],
    { endSeconds: 8, startSeconds: 2 },
    analysis
  );

  assert.equal(decision.policyEffective, "uniform");
  assert.deepEqual(decision.timestamps, [2.75, 4.25, 5.75, 7.25]);
});

test("structural timeout fails open to uniform while an abort stops extraction", async () => {
  let analysisCalls = 0;
  const timeoutRunner: VideoCommandRunner = async (_executable, args) => {
    if (args.some((argument) => argument.includes("freezedetect"))) {
      analysisCalls += 1;
      throw new Error("structural deadline exceeded");
    }
    return { stderr: "", stdout: "" };
  };

  const frames = await extractFramesFromLocalVideo("/tmp/input.mp4", "/tmp/frames", {
    durationSeconds: 8,
    frameCount: 4,
    runner: timeoutRunner,
    samplingPolicy: "segment_aware",
    streamIndex: 0,
    timeoutMs: 250,
  });
  assert.equal(analysisCalls, 1);
  assert.equal(frames.sampling.policyEffective, "uniform");
  assert.deepEqual(
    frames.map((frame) => frame.timestampSeconds),
    [1, 3, 5, 7]
  );

  const controller = new AbortController();
  let frameExtractionCalls = 0;
  const abortRunner: VideoCommandRunner = async (_executable, args, options) => {
    if (args.some((argument) => argument.includes("freezedetect"))) {
      assert.equal(options.signal, controller.signal);
      controller.abort();
      throw new Error("aborted inside structural analysis");
    }
    frameExtractionCalls += 1;
    return { stderr: "", stdout: "" };
  };
  await assert.rejects(
    () =>
      extractFramesFromLocalVideo("/tmp/input.mp4", "/tmp/frames", {
        durationSeconds: 8,
        frameCount: 4,
        runner: abortRunner,
        samplingPolicy: "segment_aware",
        signal: controller.signal,
        streamIndex: 0,
        timeoutMs: 250,
      }),
    /aborted/
  );
  assert.equal(frameExtractionCalls, 0);
});

test("real FFmpeg evidence distinguishes a frozen dark segment from dense motion", async (t) => {
  try {
    await execFileAsync("ffmpeg", ["-version"], { timeout: 5_000 });
  } catch {
    t.skip("FFmpeg is an optional runtime dependency");
    return;
  }

  const directory = await mkdtemp(join(tmpdir(), "video-fu07-real-"));
  const fixturePath = join(directory, "frozen-then-motion.mp4");
  try {
    await writeFrozenThenMotionFixture(fixturePath);

    const analysis = await analyzeVideoStructure(fixturePath, {
      durationSeconds: 10,
      streamIndex: 0,
      timeoutMs: 30_000,
    });
    const decision = calculateSamplingDecision(
      10,
      4,
      "segment_aware",
      analysis.sceneCandidates,
      null,
      analysis
    );

    assert.ok(analysis.samples.length >= 8);
    assert.ok(analysis.sceneCandidates.some((timestamp) => Math.abs(timestamp - 6) <= 1));
    assert.ok(
      analysis.freezeIntervals.some(
        (interval) => interval.startSeconds <= 1 && interval.endSeconds >= 5
      )
    );
    assert.ok(analysis.samples.some((sample) => (sample.spatialInformation ?? 0) > 20));
    assert.ok(analysis.samples.some((sample) => (sample.temporalInformation ?? 0) > 5));
    assert.ok(analysis.samples.some((sample) => (sample.blur ?? 0) > 0));
    assert.ok(analysis.samples.some((sample) => (sample.brightness ?? 255) < 24));
    assert.equal(decision.timestamps.filter((timestamp) => timestamp < 6).length, 1);
    assert.equal(decision.timestamps.filter((timestamp) => timestamp > 6).length, 3);
  } finally {
    await rm(directory, { force: true, recursive: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("real FFmpeg abort stops preanalysis, skips frame extraction, and cleans the private tree", async (t) => {
  try {
    await execFileAsync("ffmpeg", ["-version"], { timeout: 5_000 });
  } catch {
    t.skip("FFmpeg is an optional runtime dependency");
    return;
  }

  const directory = await mkdtemp(join(tmpdir(), "video-fu07-abort-"));
  const fixturePath = join(directory, "abort.mp4");
  const controller = new AbortController();
  let privateInputPath = "";
  let analysisStarted = false;
  let frameExtractionCalls = 0;
  try {
    await writeFrozenThenMotionFixture(fixturePath);
    const bytes = await readFile(fixturePath);
    const runner: VideoCommandRunner = async (executable, args, options) => {
      if (executable === "ffprobe") privateInputPath = args.at(-1) ?? "";
      if (args.some((argument) => argument.includes("freezedetect"))) {
        analysisStarted = true;
        setTimeout(() => controller.abort(), 25);
      } else if (executable === "ffmpeg") {
        frameExtractionCalls += 1;
      }
      return realRunner(executable, args, options);
    };

    await assert.rejects(
      () =>
        extractVideoFramesFromBytes(bytes, {
          frameCount: 4,
          maxDurationSeconds: 600,
          runner,
          samplingPolicy: "segment_aware",
          signal: controller.signal,
          timeoutMs: 30_000,
        }),
      /aborted/
    );
    assert.equal(analysisStarted, true);
    assert.equal(frameExtractionCalls, 0);
    assert.notEqual(privateInputPath, "");
    await assert.rejects(() => access(privateInputPath));
  } finally {
    await rm(directory, { force: true, recursive: true, maxRetries: 5, retryDelay: 100 });
  }
});
