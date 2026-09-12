import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { isAbsolute, join } from "node:path";
import { promisify } from "node:util";

import { JPEG_FRAME_DATA_URI_PREFIX } from "./videoBridgeFrameContract";

const execFileAsync = promisify(execFile);

export interface VideoCommandOptions {
  timeoutMs: number;
  signal?: AbortSignal;
}

export type VideoCommandRunner = (
  executable: "ffmpeg" | "ffprobe",
  args: readonly string[],
  options: VideoCommandOptions
) => Promise<{ stdout: string; stderr: string }>;

export interface VideoRuntimeStatus {
  available: boolean;
  ffmpegVersion: string | null;
  ffprobeVersion: string | null;
  reason?: string;
}

export interface VideoFrameFile {
  path: string;
  timestampSeconds: number;
}

export type VideoSamplingPolicy = "uniform" | "scene_aware" | "segment_aware";

export interface VideoSamplingMetadata {
  candidateCount: number;
  focusWindow?: VideoFocusWindow;
  policyEffective: VideoSamplingPolicy;
  policyRequested: VideoSamplingPolicy;
}

export interface VideoFocusBounds {
  endSeconds?: number;
  startSeconds?: number;
}

export interface VideoFocusWindow {
  endSeconds: number;
  startSeconds: number;
}

export interface VideoFrameFileList extends Array<VideoFrameFile> {
  sampling: VideoSamplingMetadata;
}

export interface VideoProbeMetadata {
  durationSeconds: number;
  formatName: string;
  height: number;
  streamIndex: number;
  width: number;
}

export interface ExtractedVideoFrame {
  dataUri: string;
  timestampSeconds: number;
}

export interface VideoSamplingDecision extends VideoSamplingMetadata {
  timestamps: number[];
}

export interface VideoStructuralInterval {
  endSeconds: number;
  startSeconds: number;
}
export interface VideoStructuralSample {
  blur?: number | null;
  brightness?: number | null;
  sceneScore?: number | null;
  spatialInformation?: number | null;
  temporalInformation?: number | null;
  timestampSeconds: number;
}
export interface VideoStructuralAnalysis {
  freezeIntervals: VideoStructuralInterval[];
  samples: VideoStructuralSample[];
  sceneCandidates: number[];
}

export function resolveVideoFocusWindow(
  durationSeconds: number,
  bounds: VideoFocusBounds
): VideoFocusWindow | null {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    throw new Error("Video focus window requires a positive duration");
  }
  if (bounds.startSeconds === undefined && bounds.endSeconds === undefined) return null;
  if (
    (bounds.startSeconds !== undefined && !Number.isFinite(bounds.startSeconds)) ||
    (bounds.endSeconds !== undefined && !Number.isFinite(bounds.endSeconds))
  ) {
    throw new Error("Video focus window bounds must be finite");
  }
  const startSeconds = Math.max(0, Math.min(durationSeconds, bounds.startSeconds ?? 0));
  const endSeconds = Math.max(0, Math.min(durationSeconds, bounds.endSeconds ?? durationSeconds));
  if (endSeconds <= startSeconds) {
    throw new Error("Video focus window must have a positive duration");
  }
  return { endSeconds, startSeconds };
}

export const VIDEO_FRAME_MAX_BYTES = 4 * 1024 * 1024;
export const VIDEO_FRAMES_TOTAL_MAX_BYTES = 23 * 1024 * 1024;
export const VIDEO_MAX_DIMENSION = 8_192;
export const VIDEO_MAX_PIXELS = 33_554_432;
const VIDEO_STRUCTURAL_ANALYSIS_FPS = 1;
const VIDEO_STRUCTURAL_ANALYSIS_MAX_SAMPLES = 600;
const VIDEO_STRUCTURAL_ANALYSIS_MAX_WIDTH = 320;
const VIDEO_STRUCTURAL_SCENE_THRESHOLD = 10;

const SAFE_FORMATS = new Set([
  "3g2",
  "3gp",
  "avi",
  "flac",
  "flv",
  "m4a",
  "matroska",
  "mj2",
  "mov",
  "mp4",
  "ogg",
  "webm",
]);
const SAFE_FORMAT_WHITELIST = [...SAFE_FORMATS].join(",");
export const defaultRunner: VideoCommandRunner = async (executable, args, options) => {
  const result = await execFileAsync(executable, [...args], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024,
    signal: options.signal,
    timeout: options.timeoutMs,
    windowsHide: true,
  });
  return { stdout: String(result.stdout), stderr: String(result.stderr) };
};
export function assertLocalPath(filePath: string): void {
  if (!isAbsolute(filePath) || filePath.includes("\0") || filePath.includes("://")) {
    throw new Error("Video runtime requires a local path");
  }
}

function parseVersion(output: string): string | null {
  const version = /\bversion\s+([^\s]+)/i.exec(output)?.[1];
  return version ? version.slice(0, 80).replace(/[^A-Za-z0-9._+-]/g, "_") : null;
}

let runtimeProbeCache: { expiresAt: number; value: VideoRuntimeStatus } | null = null;

export function resetVideoRuntimeProbeCacheForTests(): void {
  runtimeProbeCache = null;
}

export async function probeVideoRuntime(
  options: {
    cacheTtlMs?: number;
    runner?: VideoCommandRunner;
    signal?: AbortSignal;
    timeoutMs?: number;
  } = {}
): Promise<VideoRuntimeStatus> {
  const now = Date.now();
  if (runtimeProbeCache && runtimeProbeCache.expiresAt > now) {
    return structuredClone(runtimeProbeCache.value);
  }

  const runner = options.runner ?? defaultRunner;
  const commandOptions = {
    signal: options.signal,
    timeoutMs: options.timeoutMs ?? 5_000,
  };
  let value: VideoRuntimeStatus;
  try {
    const [ffmpeg, ffprobe] = await Promise.all([
      runner("ffmpeg", ["-version"], commandOptions),
      runner("ffprobe", ["-version"], commandOptions),
    ]);
    const ffmpegVersion = parseVersion(ffmpeg.stdout);
    const ffprobeVersion = parseVersion(ffprobe.stdout);
    value =
      ffmpegVersion && ffprobeVersion
        ? { available: true, ffmpegVersion, ffprobeVersion }
        : {
            available: false,
            ffmpegVersion,
            ffprobeVersion,
            reason: "FFmpeg and ffprobe versions could not be verified",
          };
  } catch {
    value = {
      available: false,
      ffmpegVersion: null,
      ffprobeVersion: null,
      reason: "FFmpeg and ffprobe are not available on PATH",
    };
  }

  runtimeProbeCache = {
    expiresAt: now + (options.cacheTtlMs ?? 30_000),
    value,
  };
  return structuredClone(value);
}

export function calculateFrameTimestamps(
  durationSeconds: number,
  requestedFrameCount: number
): number[] {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    throw new Error("Video duration must be positive");
  }
  if (
    !Number.isInteger(requestedFrameCount) ||
    requestedFrameCount < 1 ||
    requestedFrameCount > 16
  ) {
    throw new Error("Video frame count must be between 1 and 16");
  }
  const frameCount = Math.min(requestedFrameCount, Math.max(1, Math.floor(durationSeconds)));
  return Array.from(
    { length: frameCount },
    (_unused, index) => ((index + 0.5) * durationSeconds) / frameCount
  );
}

function normalizeSceneCandidates(
  durationSeconds: number,
  candidates: readonly number[]
): number[] {
  const unique = new Set<number>();
  for (const candidate of candidates) {
    if (!Number.isFinite(candidate) || candidate <= 0 || candidate >= durationSeconds) continue;
    unique.add(Number(candidate.toFixed(3)));
  }
  return [...unique].sort((left, right) => left - right);
}
export function parseSceneChangeTimestamps(output: string, durationSeconds: number): number[] {
  const candidates: number[] = [];
  const timestampPattern = /\bpts_time:([+-]?(?:\d+(?:\.\d*)?|\.\d+))\b/g;
  for (const match of output.matchAll(timestampPattern)) {
    const timestamp = Number(match[1]);
    if (Number.isFinite(timestamp)) candidates.push(timestamp);
  }
  return normalizeSceneCandidates(durationSeconds, candidates);
}
const STRUCTURAL_METRIC_FIELDS = {
  "lavfi.blur": "blur",
  "lavfi.scd.score": "sceneScore",
  "lavfi.signalstats.YAVG": "brightness",
  "lavfi.siti.si": "spatialInformation",
  "lavfi.siti.ti": "temporalInformation",
} as const;
function parseStructuralSamples(output: string, durationSeconds: number): VideoStructuralSample[] {
  const samples = new Map<number, VideoStructuralSample>();
  const pattern = /\bpts_time:([+-]?(?:\d+(?:\.\d*)?|\.\d+))[^\n]*\r?\n([A-Za-z0-9_.]+)=([^\s]+)/g;
  for (const match of output.matchAll(pattern)) {
    const timestamp = Number(Number(match[1]).toFixed(3));
    const field = STRUCTURAL_METRIC_FIELDS[match[2] as keyof typeof STRUCTURAL_METRIC_FIELDS];
    const metric = Number(match[3]);
    const unusable = !field || timestamp < 0 || timestamp >= durationSeconds;
    if (unusable || (!Number.isFinite(metric) && !samples.has(timestamp))) continue;
    if (!samples.has(timestamp)) {
      if (samples.size >= VIDEO_STRUCTURAL_ANALYSIS_MAX_SAMPLES) continue;
      samples.set(timestamp, {
        timestampSeconds: timestamp,
      });
    }
    const sample = samples.get(timestamp);
    if (sample) sample[field] = Number.isFinite(metric) ? metric : null;
  }
  return [...samples.values()].sort(
    (left, right) => left.timestampSeconds - right.timestampSeconds
  );
}
function parseStructuralMetricEvents(output: string, metric: string): number[] {
  const pattern = new RegExp(`${metric}:\\s*([+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+))`, "g");
  return [...output.matchAll(pattern)].map((match) => Number(match[1])).filter(Number.isFinite);
}
function parseFreezeIntervals(output: string, durationSeconds: number): VideoStructuralInterval[] {
  const starts = parseStructuralMetricEvents(output, "freeze_start");
  const ends = parseStructuralMetricEvents(output, "freeze_end");
  const durations = parseStructuralMetricEvents(output, "freeze_duration");
  return starts
    .map((start, index) => {
      const startSeconds = Math.max(0, Math.min(durationSeconds, start));
      const inferredEnd = start + (durations[index] ?? durationSeconds - start);
      const endSeconds = Math.max(
        startSeconds,
        Math.min(durationSeconds, ends[index] ?? inferredEnd)
      );
      return { endSeconds, startSeconds };
    })
    .filter((interval) => interval.endSeconds - interval.startSeconds >= 1);
}
export function parseVideoStructuralAnalysis(
  metadataOutput: string,
  diagnosticOutput: string,
  durationSeconds: number
): VideoStructuralAnalysis {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    throw new Error("Video structural analysis requires a positive duration");
  }
  const samples = parseStructuralSamples(metadataOutput, durationSeconds);
  const diagnosticScenes = [
    ...diagnosticOutput.matchAll(/lavfi\.scd\.score:\s*[\d.]+,\s*lavfi\.scd\.time:\s*([\d.]+)/g),
  ].map((match) => Number(match[1]));
  return {
    freezeIntervals: parseFreezeIntervals(diagnosticOutput, durationSeconds),
    samples,
    sceneCandidates: normalizeSceneCandidates(durationSeconds, [
      ...samples
        .filter((sample) => (sample.sceneScore ?? 0) >= VIDEO_STRUCTURAL_SCENE_THRESHOLD)
        .map((sample) => sample.timestampSeconds),
      ...diagnosticScenes,
    ]),
  };
}
interface StructuralSamplingSegment {
  endSeconds: number;
  frozen: boolean;
  priority: number;
  startSeconds: number;
}
function averageStructuralMetric(values: Array<number | null | undefined>): number | null {
  const finite = values.filter(
    (value): value is number => value !== null && value !== undefined && Number.isFinite(value)
  );
  return finite.length > 0 ? finite.reduce((sum, value) => sum + value, 0) / finite.length : null;
}
function normalizedStructuralMetric(
  samples: readonly VideoStructuralSample[],
  field: Exclude<keyof VideoStructuralSample, "timestampSeconds">,
  fallback: number,
  scale: number
): number {
  return Math.min(
    1,
    Math.max(
      0,
      (averageStructuralMetric(samples.map((sample) => sample[field])) ?? fallback) / scale
    )
  );
}
function structuralSegmentPriority(
  startSeconds: number,
  endSeconds: number,
  analysis: VideoStructuralAnalysis
): StructuralSamplingSegment {
  const length = endSeconds - startSeconds;
  const samples = analysis.samples.filter(
    (sample) => sample.timestampSeconds >= startSeconds && sample.timestampSeconds < endSeconds
  );
  const freezeCoverage = Math.min(
    1,
    analysis.freezeIntervals.reduce(
      (sum, interval) =>
        sum +
        Math.max(
          0,
          Math.min(endSeconds, interval.endSeconds) - Math.max(startSeconds, interval.startSeconds)
        ),
      0
    ) / length
  );
  const spatial = normalizedStructuralMetric(samples, "spatialInformation", 40, 100);
  const temporal = normalizedStructuralMetric(samples, "temporalInformation", 10, 30);
  const sharpness = 1 - normalizedStructuralMetric(samples, "blur", 10, 20);
  const brightness = averageStructuralMetric(samples.map((sample) => sample.brightness));
  const exposure = brightness === null || (brightness >= 24 && brightness <= 232) ? 1 : 0.25;
  const interest = exposure * (0.2 + spatial * 0.3 + temporal * 0.4 + sharpness * 0.1);
  const maxTemporal = Math.max(0, ...samples.map((sample) => sample.temporalInformation ?? 0));
  return {
    endSeconds,
    frozen: freezeCoverage >= 0.8 && maxTemporal <= 1,
    priority: length * Math.max(0.05, interest) * (1 - freezeCoverage * 0.75),
    startSeconds,
  };
}
function allocateStructuralFrames(
  segments: readonly StructuralSamplingSegment[],
  frameCount: number
): number[] {
  if (segments.length > frameCount) return segments.map(() => 0);
  const allocation = segments.map(() => 1);
  let remaining = frameCount - segments.length;
  const totalPriority = segments.reduce(
    (sum, segment) => sum + (segment.frozen ? 0 : segment.priority),
    0
  );
  if (totalPriority <= 0) return allocation;
  const idealExtras = segments.map((segment) =>
    segment.frozen ? 0 : (segment.priority / totalPriority) * remaining
  );
  const extras = idealExtras.map((value) => Math.floor(value));
  remaining -= extras.reduce((sum, value) => sum + value, 0);
  const remainderOrder = idealExtras
    .map((value, index) => ({ index, remainder: value - Math.floor(value) }))
    .sort((left, right) => right.remainder - left.remainder || left.index - right.index);
  for (let index = 0; index < remaining; index++) extras[remainderOrder[index].index] += 1;
  return allocation.map((value, index) => value + extras[index]);
}
function timestampsFromSegmentAllocation(
  segments: readonly Pick<StructuralSamplingSegment, "endSeconds" | "startSeconds">[],
  allocation: readonly number[]
): number[] {
  return segments.flatMap((segment, segmentIndex) =>
    Array.from(
      { length: allocation[segmentIndex] },
      (_unused, index) =>
        segment.startSeconds +
        ((index + 0.5) * (segment.endSeconds - segment.startSeconds)) / allocation[segmentIndex]
    )
  );
}
function calculateLengthWeightedSegmentTimestamps(
  startSeconds: number,
  endSeconds: number,
  frameCount: number,
  boundaries: readonly number[]
): number[] {
  const uniform = calculateFrameTimestamps(endSeconds - startSeconds, frameCount).map(
    (timestamp) => timestamp + startSeconds
  );
  const starts = [startSeconds, ...boundaries];
  const ends = [...boundaries, endSeconds];
  const segments = starts.map((start, index) => ({
    endSeconds: ends[index],
    frozen: false,
    priority: ends[index] - start,
    startSeconds: start,
  }));
  return segments.length > frameCount
    ? uniform
    : timestampsFromSegmentAllocation(segments, allocateStructuralFrames(segments, frameCount));
}
/** Allocate a bounded caption budget across validated structural segments. */
export function calculateSegmentAwareTimestamps(
  durationSeconds: number,
  requestedFrameCount: number,
  sceneCandidates: readonly number[],
  focusWindow: VideoFocusWindow | null = null,
  structuralAnalysis: VideoStructuralAnalysis | null = null
): number[] {
  const startSeconds = focusWindow?.startSeconds ?? 0;
  const endSeconds = focusWindow?.endSeconds ?? durationSeconds;
  const uniform = calculateFrameTimestamps(endSeconds - startSeconds, requestedFrameCount).map(
    (timestamp) => timestamp + startSeconds
  );
  const structuralBoundaries = structuralAnalysis?.freezeIntervals.flatMap((interval) => [
    interval.startSeconds,
    interval.endSeconds,
  ]);
  const sceneBoundaries = sceneCandidates.filter(
    (candidate) =>
      !structuralBoundaries?.some(
        (boundary) => Math.abs(candidate - boundary) <= 1 / VIDEO_STRUCTURAL_ANALYSIS_FPS
      )
  );
  const boundaries = normalizeSceneCandidates(durationSeconds, [
    ...sceneBoundaries,
    ...(structuralBoundaries ?? []),
  ]).filter((timestamp) => timestamp > startSeconds && timestamp < endSeconds);
  if (!structuralAnalysis) {
    return boundaries.length === 0
      ? uniform
      : calculateLengthWeightedSegmentTimestamps(
          startSeconds,
          endSeconds,
          uniform.length,
          boundaries
        );
  }
  const starts = [startSeconds, ...boundaries];
  const ends = [...boundaries, endSeconds];
  const segments = starts.map((start, index) =>
    structuralSegmentPriority(start, ends[index], structuralAnalysis)
  );
  const allocation = allocateStructuralFrames(segments, uniform.length);
  if (segments.length > uniform.length) {
    return calculateLengthWeightedSegmentTimestamps(
      startSeconds,
      endSeconds,
      uniform.length,
      boundaries
    );
  }
  return timestampsFromSegmentAllocation(segments, allocation);
}
export function calculateSamplingDecision(
  durationSeconds: number,
  requestedFrameCount: number,
  policy: VideoSamplingPolicy,
  sceneCandidates: readonly number[] = [],
  focusWindow: VideoFocusWindow | null = null,
  structuralAnalysis: VideoStructuralAnalysis | null = null
): VideoSamplingDecision {
  const startSeconds = focusWindow?.startSeconds ?? 0;
  const endSeconds = focusWindow?.endSeconds ?? durationSeconds;
  const uniform = calculateFrameTimestamps(endSeconds - startSeconds, requestedFrameCount).map(
    (timestamp) => timestamp + startSeconds
  );
  if (policy === "uniform") {
    return {
      candidateCount: 0,
      ...(focusWindow ? { focusWindow } : {}),
      policyEffective: "uniform",
      policyRequested: "uniform",
      timestamps: uniform,
    };
  }
  const candidates = normalizeSceneCandidates(durationSeconds, sceneCandidates).filter(
    (timestamp) => timestamp > startSeconds && timestamp < endSeconds
  );
  const focusHasSample = structuralAnalysis?.samples.some(
    (sample) => sample.timestampSeconds >= startSeconds && sample.timestampSeconds < endSeconds
  );
  const focusHasFreeze = structuralAnalysis?.freezeIntervals.some(
    (interval) => interval.startSeconds < endSeconds && interval.endSeconds > startSeconds
  );
  const hasStructuralEvidence = Boolean(focusHasSample || focusHasFreeze);
  if (policy === "segment_aware" && (candidates.length > 0 || hasStructuralEvidence)) {
    return {
      candidateCount: candidates.length,
      ...(focusWindow ? { focusWindow } : {}),
      policyEffective: "segment_aware",
      policyRequested: "segment_aware",
      timestamps: calculateSegmentAwareTimestamps(
        durationSeconds,
        requestedFrameCount,
        candidates,
        focusWindow,
        structuralAnalysis
      ),
    };
  }
  if (candidates.length === 0) {
    return {
      candidateCount: 0,
      ...(focusWindow ? { focusWindow } : {}),
      policyEffective: "uniform",
      policyRequested: policy,
      timestamps: uniform,
    };
  }
  const frameCount = uniform.length;
  if (frameCount === 1) {
    return {
      candidateCount: candidates.length,
      ...(focusWindow ? { focusWindow } : {}),
      policyEffective: "uniform",
      policyRequested: "scene_aware",
      timestamps: uniform,
    };
  }
  const selected =
    candidates.length <= frameCount
      ? [...candidates]
      : candidates.filter(
          (_candidate, index) =>
            index === 0 ||
            index === candidates.length - 1 ||
            index % Math.max(1, Math.ceil((candidates.length - 1) / (frameCount - 1))) === 0
        );
  for (const timestamp of uniform) {
    if (selected.length >= frameCount) break;
    if (!selected.some((candidate) => Math.abs(candidate - timestamp) < 0.001)) {
      selected.push(timestamp);
    }
  }
  selected.sort((left, right) => left - right);
  while (selected.length > frameCount) {
    const removableIndex = selected.findIndex(
      (timestamp) => !candidates.some((candidate) => Math.abs(candidate - timestamp) < 0.001)
    );
    selected.splice(removableIndex >= 0 ? removableIndex : selected.length - 2, 1);
  }
  return {
    candidateCount: candidates.length,
    ...(focusWindow ? { focusWindow } : {}),
    policyEffective: "scene_aware",
    policyRequested: "scene_aware",
    timestamps: selected,
  };
}
export async function detectSceneChangeTimestamps(
  inputPath: string,
  options: {
    durationSeconds: number;
    runner?: VideoCommandRunner;
    signal?: AbortSignal;
    streamIndex: number;
    timeoutMs?: number;
  }
): Promise<number[]> {
  assertLocalPath(inputPath);
  if (!Number.isInteger(options.streamIndex) || options.streamIndex < 0) {
    throw new Error("Video stream index is invalid");
  }
  const result = await (options.runner ?? defaultRunner)(
    "ffmpeg",
    [
      "-nostdin",
      "-hide_banner",
      "-loglevel",
      "info",
      "-protocol_whitelist",
      "file",
      "-format_whitelist",
      SAFE_FORMAT_WHITELIST,
      "-threads",
      "1",
      "-i",
      inputPath,
      "-map",
      `0:${options.streamIndex}`,
      "-vf",
      "select='gt(scene,0.30)',showinfo",
      "-an",
      "-f",
      "null",
      "-",
    ],
    { signal: options.signal, timeoutMs: options.timeoutMs ?? 30_000 }
  );
  return parseSceneChangeTimestamps(`${result.stdout}\n${result.stderr}`, options.durationSeconds);
}
const STRUCTURAL_ANALYSIS_FILTER = [
  `scale=w='min(${VIDEO_STRUCTURAL_ANALYSIS_MAX_WIDTH},iw)':h=-2:flags=fast_bilinear`,
  `scdet=threshold=${VIDEO_STRUCTURAL_SCENE_THRESHOLD}`,
  "freezedetect=n=-60dB:d=1",
  `fps=${VIDEO_STRUCTURAL_ANALYSIS_FPS}`,
  "siti",
  "blurdetect=radius=10:block_width=32:block_height=32",
  "signalstats",
  ...[
    "lavfi.scd.score",
    "lavfi.siti.si",
    "lavfi.siti.ti",
    "lavfi.blur",
    "lavfi.signalstats.YAVG",
  ].map((key) => `metadata=mode=print:key=${key}:file=-`),
].join(",");
export async function analyzeVideoStructure(
  inputPath: string,
  options: {
    durationSeconds: number;
    runner?: VideoCommandRunner;
    signal?: AbortSignal;
    streamIndex: number;
    timeoutMs?: number;
  }
): Promise<VideoStructuralAnalysis> {
  assertLocalPath(inputPath);
  if (!Number.isFinite(options.durationSeconds) || options.durationSeconds <= 0) {
    throw new Error("Video structural analysis requires a positive duration");
  }
  if (!Number.isInteger(options.streamIndex) || options.streamIndex < 0) {
    throw new Error("Video stream index is invalid");
  }
  const result = await (options.runner ?? defaultRunner)(
    "ffmpeg",
    [
      "-nostdin",
      "-hide_banner",
      "-loglevel",
      "info",
      "-nostats",
      "-protocol_whitelist",
      "file",
      "-format_whitelist",
      SAFE_FORMAT_WHITELIST,
      "-threads",
      "1",
      "-filter_threads",
      "1",
      "-i",
      inputPath,
      "-map",
      `0:${options.streamIndex}`,
      "-vf",
      STRUCTURAL_ANALYSIS_FILTER,
      "-an",
      "-frames:v",
      String(VIDEO_STRUCTURAL_ANALYSIS_MAX_SAMPLES),
      "-f",
      "null",
      "-",
    ],
    { signal: options.signal, timeoutMs: Math.min(options.timeoutMs ?? 30_000, 30_000) }
  );
  return parseVideoStructuralAnalysis(result.stdout, result.stderr, options.durationSeconds);
}
export async function probeLocalVideo(
  inputPath: string,
  options: {
    maxDurationSeconds?: number;
    runner?: VideoCommandRunner;
    signal?: AbortSignal;
    timeoutMs?: number;
  } = {}
): Promise<VideoProbeMetadata> {
  assertLocalPath(inputPath);
  const result = await (options.runner ?? defaultRunner)(
    "ffprobe",
    [
      "-v",
      "error",
      "-protocol_whitelist",
      "file",
      "-format_whitelist",
      SAFE_FORMAT_WHITELIST,
      "-threads",
      "1",
      "-show_entries",
      "format=duration,format_name:stream=index,codec_type,width,height:stream_disposition=default,attached_pic",
      "-of",
      "json",
      inputPath,
    ],
    { signal: options.signal, timeoutMs: options.timeoutMs ?? 30_000 }
  );
  let durationSeconds = Number.NaN;
  let formatName = "";
  let width = Number.NaN;
  let height = Number.NaN;
  let streamIndex = Number.NaN;
  let allVideoStreamsSafe = false;
  let playableVideoStreamCount = 0;
  try {
    const parsed = JSON.parse(result.stdout) as {
      format?: { duration?: unknown; format_name?: unknown };
      streams?: Array<{
        codec_type?: unknown;
        disposition?: unknown;
        height?: unknown;
        index?: unknown;
        width?: unknown;
      }>;
    };
    durationSeconds = Number(parsed.format?.duration);
    formatName = typeof parsed.format?.format_name === "string" ? parsed.format.format_name : "";
    const videoStreams = parsed.streams?.filter((stream) => stream.codec_type === "video") ?? [];
    const dispositionFlag = (stream: (typeof videoStreams)[number], key: string): boolean => {
      const disposition = stream.disposition;
      if (!disposition || typeof disposition !== "object" || Array.isArray(disposition)) {
        return false;
      }
      const value = (disposition as Record<string, unknown>)[key];
      return value === 1 || value === "1";
    };
    const playableVideoStreams = videoStreams.filter(
      (stream) => !dispositionFlag(stream, "attached_pic")
    );
    playableVideoStreamCount = playableVideoStreams.length;
    allVideoStreamsSafe =
      playableVideoStreams.length > 0 &&
      !playableVideoStreams.some((stream) => {
        const streamWidth = Number(stream.width);
        const streamHeight = Number(stream.height);
        const candidateIndex = Number(stream.index);
        return (
          !Number.isInteger(candidateIndex) ||
          candidateIndex < 0 ||
          !Number.isInteger(streamWidth) ||
          !Number.isInteger(streamHeight) ||
          streamWidth < 1 ||
          streamHeight < 1 ||
          streamWidth > VIDEO_MAX_DIMENSION ||
          streamHeight > VIDEO_MAX_DIMENSION ||
          streamWidth * streamHeight > VIDEO_MAX_PIXELS
        );
      });
    const selectedStream = [...playableVideoStreams].sort((left, right) => {
      const defaultPreference =
        Number(dispositionFlag(right, "default")) - Number(dispositionFlag(left, "default"));
      return defaultPreference || Number(left.index) - Number(right.index);
    })[0];
    if (selectedStream) {
      streamIndex = Number(selectedStream.index);
      width = Number(selectedStream.width);
      height = Number(selectedStream.height);
    }
  } catch {
    // The stable error below deliberately excludes raw ffprobe output.
  }
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    throw new Error("Video runtime returned invalid duration metadata");
  }
  if (durationSeconds > (options.maxDurationSeconds ?? 600)) {
    throw new Error("Video exceeds the maximum duration");
  }
  const formats = formatName
    .toLowerCase()
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  if (formats.length === 0 || formats.some((entry) => !SAFE_FORMATS.has(entry))) {
    throw new Error("Video container format is not allowed");
  }
  if (playableVideoStreamCount === 0) {
    throw new Error("Video container has no playable video stream");
  }
  if (!allVideoStreamsSafe) {
    throw new Error("Video stream metadata or dimensions exceed the safe processing limit");
  }
  return { durationSeconds, formatName, height, streamIndex, width };
}

export async function extractFramesFromLocalVideo(
  inputPath: string,
  outputDirectory: string,
  options: {
    durationSeconds: number;
    frameCount: number;
    focusWindow?: VideoFocusBounds | null;
    runner?: VideoCommandRunner;
    samplingPolicy?: VideoSamplingPolicy;
    signal?: AbortSignal;
    streamIndex: number;
    timeoutMs?: number;
  }
): Promise<VideoFrameFileList> {
  assertLocalPath(inputPath);
  assertLocalPath(outputDirectory);
  const policy = options.samplingPolicy ?? "uniform";
  let sceneCandidates: number[] = [];
  let structuralAnalysis: VideoStructuralAnalysis | null = null;
  if (policy !== "uniform") {
    try {
      if (policy === "segment_aware") {
        structuralAnalysis = await analyzeVideoStructure(inputPath, {
          durationSeconds: options.durationSeconds,
          runner: options.runner,
          signal: options.signal,
          streamIndex: options.streamIndex,
          timeoutMs: Math.min(options.timeoutMs ?? 30_000, 30_000),
        });
        sceneCandidates = structuralAnalysis.sceneCandidates;
      } else {
        sceneCandidates = await detectSceneChangeTimestamps(inputPath, {
          durationSeconds: options.durationSeconds,
          runner: options.runner,
          signal: options.signal,
          streamIndex: options.streamIndex,
          timeoutMs: Math.min(options.timeoutMs ?? 30_000, 30_000),
        });
      }
    } catch {
      if (options.signal?.aborted) throw new Error("Video extraction request aborted");
      sceneCandidates = [];
      structuralAnalysis = null;
    }
  }
  const focusWindow = options.focusWindow
    ? resolveVideoFocusWindow(options.durationSeconds, options.focusWindow)
    : null;
  const sampling = calculateSamplingDecision(
    options.durationSeconds,
    options.frameCount,
    policy,
    sceneCandidates,
    focusWindow,
    structuralAnalysis
  );
  if (!Number.isInteger(options.streamIndex) || options.streamIndex < 0) {
    throw new Error("Video stream index is invalid");
  }
  const runner = options.runner ?? defaultRunner;
  const frames = [] as VideoFrameFileList;
  frames.sampling = {
    candidateCount: sampling.candidateCount,
    ...(sampling.focusWindow ? { focusWindow: sampling.focusWindow } : {}),
    policyEffective: sampling.policyEffective,
    policyRequested: sampling.policyRequested,
  };

  for (let index = 0; index < sampling.timestamps.length; index++) {
    const timestampSeconds = sampling.timestamps[index];
    const outputPath = join(outputDirectory, `frame-${String(index + 1).padStart(2, "0")}.jpg`);
    await runner(
      "ffmpeg",
      [
        "-nostdin",
        "-hide_banner",
        "-loglevel",
        "error",
        "-protocol_whitelist",
        "file",
        "-format_whitelist",
        SAFE_FORMAT_WHITELIST,
        "-threads",
        "1",
        "-filter_threads",
        "1",
        "-ss",
        timestampSeconds.toFixed(3),
        "-i",
        inputPath,
        "-map",
        `0:${options.streamIndex}`,
        "-vf",
        "scale=w='min(1024,iw)':h='min(1024,ih)':force_original_aspect_ratio=decrease",
        "-frames:v",
        "1",
        "-q:v",
        "2",
        "-y",
        outputPath,
      ],
      { signal: options.signal, timeoutMs: options.timeoutMs ?? 120_000 }
    );
    frames.push({ path: outputPath, timestampSeconds });
  }
  return frames;
}

export async function readBoundedExtractedFrames(
  frames: readonly VideoFrameFile[],
  options: { maxFrameBytes?: number; maxTotalBytes?: number } = {}
): Promise<Buffer[]> {
  const maxFrameBytes = options.maxFrameBytes ?? VIDEO_FRAME_MAX_BYTES;
  const maxTotalBytes = options.maxTotalBytes ?? VIDEO_FRAMES_TOTAL_MAX_BYTES;
  let totalBytes = 0;
  const sizes: number[] = [];
  for (const frame of frames) {
    const metadata = await stat(frame.path);
    if (!metadata.isFile() || metadata.size < 1 || metadata.size > maxFrameBytes) {
      throw new Error("Extracted video frame byte limit exceeded");
    }
    totalBytes += metadata.size;
    if (totalBytes > maxTotalBytes) {
      throw new Error("Extracted video total frame byte limit exceeded");
    }
    sizes.push(metadata.size);
  }

  const output: Buffer[] = [];
  for (let index = 0; index < frames.length; index++) {
    const bytes = await readFile(frames[index].path);
    if (bytes.byteLength !== sizes[index]) {
      throw new Error("Extracted video frame changed before it could be read");
    }
    output.push(bytes);
  }
  return output;
}

export async function extractVideoFramesFromBytes(
  bytes: Uint8Array,
  options: {
    frameCount: number;
    focusWindow?: VideoFocusBounds | null;
    maxDurationSeconds: number;
    runner?: VideoCommandRunner;
    samplingPolicy?: VideoSamplingPolicy;
    signal?: AbortSignal;
    timeoutMs: number;
  }
): Promise<{
  durationSeconds: number;
  frames: ExtractedVideoFrame[];
  sampling: VideoSamplingMetadata;
}> {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), "omniroute-video-broker-"));
  try {
    if (options.signal?.aborted) throw new Error("Video extraction request aborted");
    const inputPath = join(temporaryDirectory, "input.video");
    const framesDirectory = join(temporaryDirectory, "frames");
    await mkdir(framesDirectory, { mode: 0o700 });
    await writeFile(inputPath, bytes, { mode: 0o600 });
    const metadata = await probeLocalVideo(inputPath, {
      maxDurationSeconds: options.maxDurationSeconds,
      runner: options.runner,
      signal: options.signal,
      timeoutMs: Math.min(options.timeoutMs, 30_000),
    });
    const frameFiles = await extractFramesFromLocalVideo(inputPath, framesDirectory, {
      durationSeconds: metadata.durationSeconds,
      frameCount: options.frameCount,
      focusWindow: options.focusWindow,
      runner: options.runner,
      samplingPolicy: options.samplingPolicy,
      signal: options.signal,
      streamIndex: metadata.streamIndex,
      timeoutMs: options.timeoutMs,
    });
    const frameBytes = await readBoundedExtractedFrames(frameFiles);
    return {
      durationSeconds: metadata.durationSeconds,
      frames: frameFiles.map((frame, index) => ({
        dataUri: `${JPEG_FRAME_DATA_URI_PREFIX}${frameBytes[index].toString("base64")}`,
        timestampSeconds: frame.timestampSeconds,
      })),
      sampling: frameFiles.sampling,
    };
  } finally {
    await rm(temporaryDirectory, { force: true, recursive: true });
  }
}
