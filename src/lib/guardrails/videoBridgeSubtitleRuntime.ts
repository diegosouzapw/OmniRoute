/**
 * Loopback-only, server-owned subtitle extraction runtime for the Video Bridge broker
 * (#11659, FU-05). Mirrors the temp-file/ffprobe/ffmpeg lifecycle already established by
 * `videoBridgeRuntime.ts::extractVideoFramesFromBytes` (container safety probe, mkdtemp,
 * bounded read, guaranteed cleanup) but scoped to allowlisted embedded subtitle streams.
 *
 * This module never trusts caller-declared provenance: it only reports what the broker
 * itself extracted from the real container via ffprobe/ffmpeg. The HTTP-facing broker route
 * (`src/app/api/modality-bridge/video/extract/route.ts`) is the only caller and stamps the
 * response with the shared broker fingerprint so the client-side adapter
 * (`videoBridgeSubtitleProbe.ts`) can refuse anything that didn't come from this process.
 */
import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  assertLocalPath,
  defaultRunner,
  probeLocalVideo,
  type VideoCommandRunner,
} from "./videoBridgeRuntime";

/** mov_text (MP4), subrip (SRT/MKV) and webvtt are the only codecs this probe will touch. */
export const VIDEO_SUBTITLE_CODEC_ALLOWLIST = ["mov_text", "subrip", "webvtt"] as const;
export type VideoSubtitleCodec = (typeof VIDEO_SUBTITLE_CODEC_ALLOWLIST)[number];
const SUBTITLE_CODEC_SET: ReadonlySet<string> = new Set(VIDEO_SUBTITLE_CODEC_ALLOWLIST);

export const VIDEO_SUBTITLE_MAX_STREAMS = 2;
export const VIDEO_SUBTITLE_MAX_OUTPUT_BYTES = 256 * 1024;
/** Subtitle extraction never runs longer than this, regardless of the request deadline. */
export const VIDEO_SUBTITLE_SUBDEADLINE_MS = 10_000;

export interface VideoSubtitleStreamProbe {
  codecName: VideoSubtitleCodec;
  streamIndex: number;
}

export interface VideoSubtitleCommandOptions {
  runner?: VideoCommandRunner;
  signal?: AbortSignal;
  timeoutMs: number;
}

interface FfprobeStreamEntry {
  codec_name?: unknown;
  codec_type?: unknown;
  index?: unknown;
}

/** Lists only the allowlisted embedded subtitle streams, ordered by container index. */
export async function probeSubtitleStreams(
  inputPath: string,
  options: VideoSubtitleCommandOptions
): Promise<VideoSubtitleStreamProbe[]> {
  assertLocalPath(inputPath);
  const runner = options.runner ?? defaultRunner;
  const result = await runner(
    "ffprobe",
    [
      "-v",
      "error",
      "-protocol_whitelist",
      "file",
      "-threads",
      "1",
      "-show_entries",
      "stream=index,codec_type,codec_name",
      "-of",
      "json",
      inputPath,
    ],
    { signal: options.signal, timeoutMs: options.timeoutMs }
  );
  let streams: FfprobeStreamEntry[] = [];
  try {
    const parsed = JSON.parse(result.stdout) as { streams?: FfprobeStreamEntry[] };
    streams = Array.isArray(parsed.streams) ? parsed.streams : [];
  } catch {
    return [];
  }
  const probes: VideoSubtitleStreamProbe[] = [];
  for (const stream of streams) {
    if (stream.codec_type !== "subtitle") continue;
    const codecName = typeof stream.codec_name === "string" ? stream.codec_name : "";
    if (!SUBTITLE_CODEC_SET.has(codecName)) continue;
    const streamIndex = Number(stream.index);
    if (!Number.isInteger(streamIndex) || streamIndex < 0) continue;
    probes.push({ codecName: codecName as VideoSubtitleCodec, streamIndex });
  }
  return probes
    .sort((left, right) => left.streamIndex - right.streamIndex)
    .slice(0, VIDEO_SUBTITLE_MAX_STREAMS);
}

/** Remuxes a single subtitle stream to WebVTT text on disk. Never touches other streams. */
export async function extractSubtitleStreamToFile(
  inputPath: string,
  outputPath: string,
  streamIndex: number,
  options: VideoSubtitleCommandOptions
): Promise<void> {
  assertLocalPath(inputPath);
  assertLocalPath(outputPath);
  if (!Number.isInteger(streamIndex) || streamIndex < 0) {
    throw new Error("Video subtitle stream index is invalid");
  }
  const runner = options.runner ?? defaultRunner;
  await runner(
    "ffmpeg",
    [
      "-nostdin",
      "-hide_banner",
      "-loglevel",
      "error",
      "-protocol_whitelist",
      "file",
      "-threads",
      "1",
      "-i",
      inputPath,
      "-map",
      `0:${streamIndex}`,
      "-c:s",
      "webvtt",
      "-f",
      "webvtt",
      "-y",
      outputPath,
    ],
    { signal: options.signal, timeoutMs: options.timeoutMs }
  );
}

/** Bounded read: rejects anything empty, oversized, or that changed mid-read. */
export async function readBoundedSubtitleOutput(
  path: string,
  maxBytes: number = VIDEO_SUBTITLE_MAX_OUTPUT_BYTES
): Promise<string> {
  assertLocalPath(path);
  const metadata = await stat(path);
  if (!metadata.isFile() || metadata.size < 1) {
    throw new Error("Video subtitle extraction produced no output");
  }
  if (metadata.size > maxBytes) {
    throw new Error("Video subtitle extraction output exceeded its byte limit");
  }
  const bytes = await readFile(path);
  if (bytes.byteLength !== metadata.size) {
    throw new Error("Video subtitle output changed before it could be read");
  }
  return bytes.toString("utf8");
}

export interface VideoSubtitleExtractionResult {
  durationSeconds: number;
  formatName: string;
  streams: Array<{ codecName: VideoSubtitleCodec; streamIndex: number; webvtt: string }>;
}

/**
 * Full bytes -> bounded-WebVTT-text pipeline for the broker route. Attempts at most
 * `VIDEO_SUBTITLE_MAX_STREAMS` allowlisted streams within the caller-supplied subdeadline
 * (`options.timeoutMs`, already clamped by the route to <= 10s and to the request deadline).
 * One bad stream (timeout, oversized, empty) never prevents trying the next candidate.
 * The temp directory is always removed, including on abort/timeout/probe failure.
 */
export async function extractVideoSubtitlesFromBytes(
  bytes: Uint8Array,
  options: {
    maxDurationSeconds: number;
    runner?: VideoCommandRunner;
    signal?: AbortSignal;
    timeoutMs: number;
  }
): Promise<VideoSubtitleExtractionResult> {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), "omniroute-video-subtitle-"));
  try {
    if (options.signal?.aborted) throw new Error("Video subtitle extraction request aborted");
    const inputPath = join(temporaryDirectory, "input.video");
    await writeFile(inputPath, bytes, { mode: 0o600 });
    const probeTimeoutMs = Math.min(options.timeoutMs, 5_000);
    const containerMetadata = await probeLocalVideo(inputPath, {
      maxDurationSeconds: options.maxDurationSeconds,
      runner: options.runner,
      signal: options.signal,
      timeoutMs: probeTimeoutMs,
    });
    const streamProbes = await probeSubtitleStreams(inputPath, {
      runner: options.runner,
      signal: options.signal,
      timeoutMs: probeTimeoutMs,
    });
    const streams: VideoSubtitleExtractionResult["streams"] = [];
    const deadlineAt = Date.now() + options.timeoutMs;
    for (const probe of streamProbes) {
      if (options.signal?.aborted) throw new Error("Video subtitle extraction request aborted");
      const remainingMs = deadlineAt - Date.now();
      if (remainingMs <= 0) break;
      const outputPath = join(temporaryDirectory, `subtitle-${probe.streamIndex}.vtt`);
      try {
        await extractSubtitleStreamToFile(inputPath, outputPath, probe.streamIndex, {
          runner: options.runner,
          signal: options.signal,
          timeoutMs: remainingMs,
        });
        const webvtt = await readBoundedSubtitleOutput(outputPath);
        streams.push({ codecName: probe.codecName, streamIndex: probe.streamIndex, webvtt });
      } catch (error) {
        if (options.signal?.aborted) throw new Error("Video subtitle extraction request aborted");
        if (error instanceof Error && error.message.includes("aborted")) throw error;
        // A single unusable stream (timeout, empty, oversized) must not block the next candidate.
        continue;
      }
    }
    return {
      durationSeconds: containerMetadata.durationSeconds,
      formatName: containerMetadata.formatName,
      streams,
    };
  } finally {
    await rm(temporaryDirectory, { force: true, recursive: true });
  }
}
