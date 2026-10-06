/**
 * Video Bridge benchmarks (VB-FU-03 dedup comparator, VB-FU-07 sampler overhead,
 * and VB-FU-09 contact sheet A/B).
 *
 * Run: node --import tsx/esm scripts/perf/video-bridge-bench.ts
 *
 * 1. Dedup: measures bounded CPU and process-memory observations for the
 *    production 16x16 grayscale comparator over the hard 16-frame candidate cap.
 * 2. Sampler: measures the pure timestamp-selection cost of uniform vs
 *    scene_aware vs segment_aware for growing scene-candidate counts. The
 *    ffmpeg scene-detection pass is shared by both aware policies and is
 *    I/O-bound, so the incremental policy cost is exactly this selection step.
 * 3. Contact sheet: composes synthetic JPEG frames into the visually timestamped
 *    grid and compares payload bytes + structural call counts. This microbenchmark
 *    does not measure real-model tokens, latency, or quality; use
 *    video-bridge-contact-sheet-eval.ts before considering promotion.
 */
import { performance } from "node:perf_hooks";

import { buildVideoContactSheet } from "../../src/lib/guardrails/videoBridgeContactSheet";
import {
  compareVideoFramesByGrayscale,
  VIDEO_DEDUP_POLICY_VERSION,
  VIDEO_DEDUP_THRESHOLD,
} from "../../src/lib/guardrails/videoBridgeHelpers";
import {
  calculateSamplingDecision,
  type VideoSamplingPolicy,
} from "../../src/lib/guardrails/videoBridgeRuntime";

const SAMPLER_ITERATIONS = 2_000;
const DEDUP_FRAME_CAP = 16;
const DEDUP_ITERATIONS = 10;

function mebibytes(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(2);
}

async function benchDedupComparator(): Promise<void> {
  const frames = await Promise.all(
    Array.from({ length: DEDUP_FRAME_CAP }, async (_unused, index) => ({
      dataUri: await syntheticJpegFrame(index, 1024, 576),
      timestampSeconds: index,
    }))
  );
  await compareVideoFramesByGrayscale(frames[0], frames[1]);
  const memoryBefore = process.memoryUsage();
  const maxRssBefore = process.resourceUsage().maxRSS * 1024;
  const cpuBefore = process.cpuUsage();
  const wallBefore = performance.now();
  let comparisons = 0;
  for (let iteration = 0; iteration < DEDUP_ITERATIONS; iteration++) {
    for (let index = 1; index < frames.length; index++) {
      await compareVideoFramesByGrayscale(frames[index - 1], frames[index]);
      comparisons += 1;
    }
  }
  const wallMs = performance.now() - wallBefore;
  const cpu = process.cpuUsage(cpuBefore);
  const memoryAfter = process.memoryUsage();
  const maxRssAfter = process.resourceUsage().maxRSS * 1024;
  const cpuMs = (cpu.user + cpu.system) / 1000;

  console.log("== Visual dedup comparator (synthetic 1024x576 JPEG, bounded) ==");
  console.log(
    `policy=${VIDEO_DEDUP_POLICY_VERSION} threshold=${VIDEO_DEDUP_THRESHOLD} frames=${DEDUP_FRAME_CAP} iterations=${DEDUP_ITERATIONS} comparisons=${comparisons}`
  );
  console.log(
    `wall_ms=${wallMs.toFixed(1)} cpu_ms=${cpuMs.toFixed(1)} cpu_ms/comparison=${(cpuMs / comparisons).toFixed(3)}`
  );
  console.log(
    `rss_delta_MiB=${mebibytes(memoryAfter.rss - memoryBefore.rss)} heap_delta_MiB=${mebibytes(memoryAfter.heapUsed - memoryBefore.heapUsed)} max_rss_delta_MiB=${mebibytes(Math.max(0, maxRssAfter - maxRssBefore))}`
  );
  console.log(
    "Scope: comparator decode/resize/delta cost only; this does not measure caption-model quality."
  );
}

function benchSampler(): void {
  console.log("== Sampler timestamp-selection cost (pure, per call) ==");
  console.log("duration frames candidates | uniform scene_aware segment_aware (µs/op)");
  for (const durationSeconds of [60, 600]) {
    for (const frameCount of [8, 16]) {
      for (const candidateCount of [0, 16, 128, 512]) {
        const candidates = Array.from(
          { length: candidateCount },
          (_unused, index) => ((index + 1) * durationSeconds) / (candidateCount + 1)
        );
        const row: string[] = [];
        for (const policy of ["uniform", "scene_aware", "segment_aware"] as VideoSamplingPolicy[]) {
          const start = performance.now();
          for (let iteration = 0; iteration < SAMPLER_ITERATIONS; iteration++) {
            calculateSamplingDecision(durationSeconds, frameCount, policy, candidates, null);
          }
          const microsPerOp = ((performance.now() - start) * 1000) / SAMPLER_ITERATIONS;
          row.push(microsPerOp.toFixed(1));
        }
        console.log(
          `${String(durationSeconds).padStart(5)}s ${String(frameCount).padStart(5)} ${String(candidateCount).padStart(10)} | ${row.join("  ")}`
        );
      }
    }
  }
}

async function syntheticJpegFrame(index: number, width = 512, height = 288): Promise<string> {
  const { default: sharp } = await import("sharp");
  const buffer = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: (index * 37) % 255, g: (index * 91) % 255, b: (index * 53) % 255 },
    },
  })
    .jpeg({ quality: 80 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

async function benchContactSheet(): Promise<void> {
  console.log("\n== Contact sheet vs individual frames (synthetic 512x288 JPEG) ==");
  console.log(
    "STRUCTURAL ONLY: real-model tokens/latency/quality are unmeasured; promotion remains HOLD."
  );
  console.log("frames | sheet_ms sheet_KiB individual_KiB model_calls(sheet/individual)");
  for (const frameCount of [1, 4, 8, 16]) {
    const frames = await Promise.all(
      Array.from({ length: frameCount }, async (_unused, index) => ({
        dataUri: await syntheticJpegFrame(index),
        timestampSeconds: index * 2,
      }))
    );
    const individualBytes = frames.reduce((sum, frame) => sum + frame.dataUri.length, 0);
    const start = performance.now();
    const sheet = await buildVideoContactSheet(frames, { timeoutMs: 30_000 });
    const elapsedMs = performance.now() - start;
    const sheetBytes = sheet.used && sheet.dataUri ? sheet.dataUri.length : individualBytes;
    console.log(
      `${String(frameCount).padStart(6)} | ${elapsedMs.toFixed(1).padStart(8)} ${(sheetBytes / 1024).toFixed(1).padStart(9)} ${(individualBytes / 1024).toFixed(1).padStart(14)} ${sheet.used ? 1 : frameCount}/${frameCount}`
    );
    if (!sheet.used) {
      console.log(`        fallbackReason=${sheet.fallbackReason ?? "unknown"}`);
    }
  }
}

await benchDedupComparator();
console.log("");
benchSampler();
await benchContactSheet();
