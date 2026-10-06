/**
 * Real-media FU-07 structural-sampling evaluation.
 *
 * Run: node --import tsx/esm scripts/perf/video-bridge-fu07-eval.ts
 * Optional estimate: append --caption-cost-per-call-usd <positive number>.
 *
 * This evaluates deterministic structural oracles, not semantic model quality.
 * Model quality and monetary savings remain HOLD without an external receipt.
 */
import { execFile } from "node:child_process";
import { access, mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { performance } from "node:perf_hooks";
import { promisify } from "node:util";

import { deduplicateVideoFrames } from "../../src/lib/guardrails/videoBridgeHelpers";
import {
  analyzeVideoStructure,
  calculateSamplingDecision,
  extractFramesFromLocalVideo,
  readBoundedExtractedFrames,
  type VideoCommandRunner,
  type VideoStructuralAnalysis,
  type VideoStructuralSample,
} from "../../src/lib/guardrails/videoBridgeRuntime";

const execFileAsync = promisify(execFile);
const REQUIRED_FILTERS = ["scdet", "freezedetect", "blurdetect", "signalstats", "siti"];
const TIME_MARKER = "__FU07_TIME__";

interface ChildCost {
  maxRssKiB: number | null;
  systemSeconds: number | null;
  userSeconds: number | null;
  wallMs: number;
}

interface FixtureResult {
  captionCallsAvoided: number;
  childCost: ChildCost;
  freezeIntervals: number;
  name: string;
  oracle: Record<string, boolean | number | string>;
  passed: boolean;
  sceneCandidates: number;
  structuralFrames: number;
  uniformFrames: number;
}

function average(values: Array<number | null | undefined>): number | null {
  const finite = values.filter(
    (value): value is number => value !== null && value !== undefined && Number.isFinite(value)
  );
  return finite.length > 0 ? finite.reduce((sum, value) => sum + value, 0) / finite.length : null;
}

function samplesIn(
  analysis: VideoStructuralAnalysis,
  startSeconds: number,
  endSeconds: number
): VideoStructuralSample[] {
  return analysis.samples.filter(
    (sample) => sample.timestampSeconds >= startSeconds && sample.timestampSeconds < endSeconds
  );
}

async function generateFixture(outputPath: string, args: readonly string[]): Promise<void> {
  await execFileAsync(
    "ffmpeg",
    ["-hide_banner", "-loglevel", "error", ...args, "-threads", "1", "-y", outputPath],
    { maxBuffer: 1024 * 1024, timeout: 30_000 }
  );
}

async function generateStaticFixture(outputPath: string): Promise<void> {
  await generateFixture(outputPath, [
    "-f",
    "lavfi",
    "-i",
    "color=c=blue:s=320x180:d=8:r=12",
    "-c:v",
    "libx264",
    "-preset",
    "ultrafast",
    "-pix_fmt",
    "yuv420p",
  ]);
}

async function generateMixedFixture(outputPath: string): Promise<void> {
  await generateFixture(outputPath, [
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
  ]);
}

async function generateBlurExposureFixture(outputPath: string): Promise<void> {
  await generateFixture(outputPath, [
    "-f",
    "lavfi",
    "-i",
    "testsrc2=s=320x180:d=3:r=12",
    "-f",
    "lavfi",
    "-i",
    "color=c=black:s=320x180:d=3:r=12",
    "-f",
    "lavfi",
    "-i",
    "testsrc2=s=320x180:d=4:r=12",
    "-filter_complex",
    "[0:v]gblur=sigma=12[blur];[blur][1:v][2:v]concat=n=3:v=1:a=0,format=yuv420p[v]",
    "-map",
    "[v]",
    "-c:v",
    "libx264",
    "-preset",
    "ultrafast",
  ]);
}

async function generateDenseTailFixture(outputPath: string): Promise<void> {
  const args: string[] = [];
  for (const source of [
    "color=c=black:s=160x90:d=0.5:r=10",
    "color=c=white:s=160x90:d=0.5:r=10",
    "color=c=black:s=160x90:d=0.5:r=10",
    "color=c=white:s=160x90:d=0.5:r=10",
    "testsrc2=s=160x90:d=8:r=10",
  ]) {
    args.push("-f", "lavfi", "-i", source);
  }
  args.push(
    "-filter_complex",
    "[0:v][1:v][2:v][3:v][4:v]concat=n=5:v=1:a=0,format=yuv420p[v]",
    "-map",
    "[v]",
    "-c:v",
    "libx264",
    "-preset",
    "ultrafast"
  );
  await generateFixture(outputPath, args);
}

async function generateGradualFadeFixture(outputPath: string): Promise<void> {
  await generateFixture(outputPath, [
    "-f",
    "lavfi",
    "-i",
    "color=c=white:s=320x180:d=8:r=12",
    "-vf",
    "fade=t=out:st=0:d=8,format=yuv420p",
    "-c:v",
    "libx264",
    "-preset",
    "ultrafast",
  ]);
}

async function supportsTimeBinary(): Promise<boolean> {
  try {
    await access("/usr/bin/time");
    return true;
  } catch {
    return false;
  }
}

function parseTimeCost(stderr: string, wallMs: number): ChildCost {
  const match = new RegExp(`${TIME_MARKER} ([\\d.]+) ([\\d.]+) ([\\d.]+)`).exec(stderr);
  return {
    maxRssKiB: match ? Number(match[3]) : null,
    systemSeconds: match ? Number(match[2]) : null,
    userSeconds: match ? Number(match[1]) : null,
    wallMs,
  };
}

async function timedAnalysis(
  inputPath: string,
  durationSeconds: number,
  useTimeBinary: boolean
): Promise<{ analysis: VideoStructuralAnalysis; cost: ChildCost }> {
  let cost: ChildCost = {
    maxRssKiB: null,
    systemSeconds: null,
    userSeconds: null,
    wallMs: 0,
  };
  const runner: VideoCommandRunner = async (executable, args, options) => {
    const startedAt = performance.now();
    const command = useTimeBinary ? "/usr/bin/time" : executable;
    const commandArgs = useTimeBinary
      ? ["-f", `${TIME_MARKER} %U %S %M`, executable, ...args]
      : [...args];
    const result = await execFileAsync(command, commandArgs, {
      encoding: "utf8",
      maxBuffer: 1024 * 1024,
      signal: options.signal,
      timeout: options.timeoutMs,
    });
    cost = parseTimeCost(String(result.stderr), performance.now() - startedAt);
    return { stderr: String(result.stderr), stdout: String(result.stdout) };
  };
  const analysis = await analyzeVideoStructure(inputPath, {
    durationSeconds,
    runner,
    streamIndex: 0,
    timeoutMs: 30_000,
  });
  return { analysis, cost };
}

function sampling(
  durationSeconds: number,
  frameCount: number,
  analysis: VideoStructuralAnalysis
): { structural: number[]; uniform: number[] } {
  const uniform = calculateSamplingDecision(durationSeconds, frameCount, "uniform").timestamps;
  const structural = calculateSamplingDecision(
    durationSeconds,
    frameCount,
    "segment_aware",
    analysis.sceneCandidates,
    null,
    analysis
  ).timestamps;
  return { structural, uniform };
}

async function captionCallsAfterDedup(
  inputPath: string,
  outputDirectory: string,
  samplingPolicy: "segment_aware" | "uniform"
): Promise<number> {
  await mkdir(outputDirectory, { mode: 0o700 });
  const frames = await extractFramesFromLocalVideo(inputPath, outputDirectory, {
    durationSeconds: 8,
    frameCount: 8,
    samplingPolicy,
    streamIndex: 0,
    timeoutMs: 30_000,
  });
  const bytes = await readBoundedExtractedFrames(frames);
  const deduplicated = await deduplicateVideoFrames(
    frames.map((frame, index) => ({
      dataUri: `data:image/jpeg;base64,${bytes[index].toString("base64")}`,
      timestampSeconds: frame.timestampSeconds,
    }))
  );
  return deduplicated.frames.length;
}

function result(
  name: string,
  cost: ChildCost,
  analysis: VideoStructuralAnalysis,
  uniform: number[],
  structural: number[],
  oracle: Record<string, boolean | number | string>,
  captionCallsAvoided = 0
): FixtureResult {
  const booleans = Object.values(oracle).filter(
    (value): value is boolean => typeof value === "boolean"
  );
  return {
    captionCallsAvoided,
    childCost: cost,
    freezeIntervals: analysis.freezeIntervals.length,
    name,
    oracle,
    passed: booleans.every(Boolean),
    sceneCandidates: analysis.sceneCandidates.length,
    structuralFrames: structural.length,
    uniformFrames: uniform.length,
  };
}

async function main(): Promise<void> {
  const version = await execFileAsync("ffmpeg", ["-version"], { timeout: 5_000 });
  const filters = await execFileAsync("ffmpeg", ["-hide_banner", "-filters"], {
    maxBuffer: 2 * 1024 * 1024,
    timeout: 5_000,
  });
  const missingFilters = REQUIRED_FILTERS.filter(
    (filter) => !new RegExp(`\\b${filter}\\b`).test(String(filters.stdout))
  );
  if (missingFilters.length > 0)
    throw new Error(`Missing required FFmpeg filters: ${missingFilters.join(", ")}`);

  const directory = await mkdtemp(join(tmpdir(), "video-fu07-eval-"));
  const useTimeBinary = await supportsTimeBinary();
  const results: FixtureResult[] = [];
  try {
    const staticPath = join(directory, "static.mp4");
    await generateStaticFixture(staticPath);
    const staticRun = await timedAnalysis(staticPath, 8, useTimeBinary);
    const staticSampling = sampling(8, 8, staticRun.analysis);
    const uniformCaptionCalls = await captionCallsAfterDedup(
      staticPath,
      join(directory, "static-uniform"),
      "uniform"
    );
    const structuralCaptionCalls = await captionCallsAfterDedup(
      staticPath,
      join(directory, "static-structural"),
      "segment_aware"
    );
    const staticCaptionCallsAvoided = Math.max(0, uniformCaptionCalls - structuralCaptionCalls);
    results.push(
      result(
        "static-caption-savings",
        staticRun.cost,
        staticRun.analysis,
        staticSampling.uniform,
        staticSampling.structural,
        {
          fullFreezeDetected: staticRun.analysis.freezeIntervals.some(
            (interval) => interval.startSeconds <= 1 && interval.endSeconds >= 7
          ),
          oneIncrementalCaptionCallAvoided: staticCaptionCallsAvoided === 1,
          structuralCaptionCalls,
          uniformCaptionCalls,
        },
        staticCaptionCallsAvoided
      )
    );

    const mixedPath = join(directory, "mixed.mp4");
    await generateMixedFixture(mixedPath);
    const mixedRun = await timedAnalysis(mixedPath, 10, useTimeBinary);
    const mixedSampling = sampling(10, 4, mixedRun.analysis);
    const uniformDense = mixedSampling.uniform.filter((timestamp) => timestamp > 6).length;
    const structuralDense = mixedSampling.structural.filter((timestamp) => timestamp > 6).length;
    results.push(
      result(
        "dense-budget-quality-oracle",
        mixedRun.cost,
        mixedRun.analysis,
        mixedSampling.uniform,
        mixedSampling.structural,
        {
          denseFramesStructural: structuralDense,
          denseFramesUniform: uniformDense,
          denseRegionGetsMoreBudget: structuralDense > uniformDense,
          frozenRegionRetainsCoverage: mixedSampling.structural.some((timestamp) => timestamp < 6),
        }
      )
    );

    const qualityPath = join(directory, "blur-exposure.mp4");
    await generateBlurExposureFixture(qualityPath);
    const qualityRun = await timedAnalysis(qualityPath, 10, useTimeBinary);
    const qualitySampling = sampling(10, 6, qualityRun.analysis);
    const blurred = samplesIn(qualityRun.analysis, 0, 3);
    const dark = samplesIn(qualityRun.analysis, 3, 6);
    const sharp = samplesIn(qualityRun.analysis, 6, 10);
    const blurredBlur = average(blurred.map((sample) => sample.blur));
    const blurredSpatial = average(blurred.map((sample) => sample.spatialInformation));
    const darkLuma = average(dark.map((sample) => sample.brightness));
    const sharpBlur = average(sharp.map((sample) => sample.blur));
    const sharpSpatial = average(sharp.map((sample) => sample.spatialInformation));
    const sharpTemporal = average(sharp.map((sample) => sample.temporalInformation));
    const sharpLuma = average(sharp.map((sample) => sample.brightness));
    results.push(
      result(
        "blur-exposure-spatial-temporal-evidence",
        qualityRun.cost,
        qualityRun.analysis,
        qualitySampling.uniform,
        qualitySampling.structural,
        {
          blurMetricSeparated:
            blurredBlur !== null && sharpBlur !== null && Math.abs(blurredBlur - sharpBlur) >= 0.05,
          blurredBlur: blurredBlur ?? "missing",
          darkLuma: darkLuma ?? "missing",
          exposureSeparated: darkLuma !== null && sharpLuma !== null && sharpLuma - darkLuma >= 50,
          sharpBlur: sharpBlur ?? "missing",
          sharpSpatial: sharpSpatial ?? "missing",
          sharpTemporal: sharpTemporal ?? "missing",
          spatialDetailSeparated:
            blurredSpatial !== null && sharpSpatial !== null && sharpSpatial - blurredSpatial >= 20,
          structuralKeepsSharpRegion:
            qualitySampling.structural.filter((timestamp) => timestamp >= 6).length >= 2,
          temporalChangeDetected: sharpTemporal !== null && sharpTemporal >= 5,
        }
      )
    );

    const tailPath = join(directory, "dense-tail.mp4");
    await generateDenseTailFixture(tailPath);
    const tailRun = await timedAnalysis(tailPath, 10, useTimeBinary);
    const tailSampling = sampling(10, 4, tailRun.analysis);
    results.push(
      result(
        "dense-cuts-long-tail-regression",
        tailRun.cost,
        tailRun.analysis,
        tailSampling.uniform,
        tailSampling.structural,
        {
          multipleEarlyCuts: tailRun.analysis.sceneCandidates.length >= 3,
          trailingEightSecondsRepresented: tailSampling.structural.some(
            (timestamp) => timestamp > 2
          ),
        }
      )
    );

    const fadePath = join(directory, "gradual-fade.mp4");
    await generateGradualFadeFixture(fadePath);
    const fadeRun = await timedAnalysis(fadePath, 8, useTimeBinary);
    const fadeSampling = sampling(8, 4, fadeRun.analysis);
    results.push(
      result(
        "gradual-fade-false-positive",
        fadeRun.cost,
        fadeRun.analysis,
        fadeSampling.uniform,
        fadeSampling.structural,
        {
          hardCutFalsePositives: fadeRun.analysis.sceneCandidates.length,
          noHardCutBurst: fadeRun.analysis.sceneCandidates.length <= 1,
          noCaptionBudgetPruning: fadeSampling.structural.length === fadeSampling.uniform.length,
        }
      )
    );
  } finally {
    await rm(directory, { force: true, recursive: true });
  }

  const callsAvoided = results.reduce((sum, fixture) => sum + fixture.captionCallsAvoided, 0);
  const costFlag = process.argv.indexOf("--caption-cost-per-call-usd");
  const explicitCost = Number(costFlag >= 0 ? process.argv[costFlag + 1] : Number.NaN);
  const report = {
    captionCost:
      Number.isFinite(explicitCost) && explicitCost > 0
        ? {
            estimatedUsdAvoided: callsAvoided * explicitCost,
            source: "explicit environment input",
            status: "ESTIMATED_FROM_INPUT",
          }
        : {
            reason: "--caption-cost-per-call-usd was not supplied with a positive number",
            status: "HOLD",
          },
    ffmpegVersion: String(version.stdout).split("\n")[0],
    fixtures: results,
    modelQuality: {
      reason:
        "No authorized real caption-model endpoint, credentials, or frozen judge rubric were configured; deterministic structural oracles are not semantic quality.",
      status: "HOLD",
    },
    gainCostComparison: {
      reason:
        "The real post-dedup caption-call delta is measured, but no authorized caption latency/cost receipt or child CPU/RSS receipt is configured.",
      status: "HOLD",
    },
    resourceCost: useTimeBinary
      ? { source: "/usr/bin/time", status: "MEASURED" }
      : {
          reason: "/usr/bin/time is unavailable; wall time is measured but child CPU/RSS are not",
          status: "HOLD",
        },
    summary: {
      captionCallsAvoided: callsAvoided,
      failed: results.filter((fixture) => !fixture.passed).map((fixture) => fixture.name),
      passed: results.filter((fixture) => fixture.passed).length,
      total: results.length,
    },
    timeBinary: useTimeBinary ? "/usr/bin/time" : null,
  };
  console.log(JSON.stringify(report, null, 2));
  if (report.summary.failed.length > 0) process.exitCode = 1;
}

await main();
