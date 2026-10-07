/**
 * Video Bridge — bounded mono 16 kHz PCM WAV audio extraction (FU-06, #11654).
 *
 * Runs strictly local, array-argument `ffmpeg` (never a shell string — Hard
 * Rule #13) against a video file already probed by
 * {@link probeLocalVideo}, so the safe-container/format/dimension validation
 * that path already enforces for frame extraction stays the single source of
 * truth. This module owns only the audio-specific extraction step and its
 * own output byte cap; it does not duplicate probing.
 */
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

import { probeLocalVideo, type VideoCommandRunner } from "./videoBridgeRuntime";

const execFileAsync = promisify(execFile);

/** Bounded output — a 10-minute mono 16 kHz 16-bit WAV tops out well under this. */
export const VIDEO_AUDIO_MAX_BYTES = 25 * 1024 * 1024;
export const VIDEO_AUDIO_SAMPLE_RATE_HZ = 16_000;
export const VIDEO_AUDIO_CHANNELS = 1;

export interface ExtractedVideoAudio {
  channels: number;
  dataUri: string;
  durationSeconds: number;
  sampleRateHz: number;
}

export interface VideoAudioExtractionOptions {
  maxDurationSeconds: number;
  maxOutputBytes?: number;
  runner?: VideoCommandRunner;
  signal?: AbortSignal;
  timeoutMs: number;
}

const defaultRunner: VideoCommandRunner = async (executable, args, options) => {
  const result = await execFileAsync(executable, [...args], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024,
    signal: options.signal,
    timeout: options.timeoutMs,
    windowsHide: true,
  });
  return { stdout: String(result.stdout), stderr: String(result.stderr) };
};

/** Extract the first audio stream of `bytes` as a bounded mono 16 kHz PCM WAV. */
export async function extractVideoAudioFromBytes(
  bytes: Uint8Array,
  options: VideoAudioExtractionOptions
): Promise<ExtractedVideoAudio> {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), "omniroute-video-audio-broker-"));
  try {
    if (options.signal?.aborted) throw new Error("Video audio extraction request aborted");
    const runner = options.runner ?? defaultRunner;
    const inputPath = join(temporaryDirectory, "input.video");
    const outputPath = join(temporaryDirectory, "audio.wav");
    await writeFile(inputPath, bytes, { mode: 0o600 });
    // Reuses the frame path's container/format/dimension safety checks — this
    // module adds no parallel validation of its own.
    const metadata = await probeLocalVideo(inputPath, {
      maxDurationSeconds: options.maxDurationSeconds,
      runner,
      signal: options.signal,
      timeoutMs: Math.min(options.timeoutMs, 30_000),
    });
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
        "-vn",
        "-map",
        "0:a:0",
        "-ac",
        String(VIDEO_AUDIO_CHANNELS),
        "-ar",
        String(VIDEO_AUDIO_SAMPLE_RATE_HZ),
        "-sample_fmt",
        "s16",
        "-t",
        metadata.durationSeconds.toFixed(3),
        "-f",
        "wav",
        "-y",
        outputPath,
      ],
      { signal: options.signal, timeoutMs: options.timeoutMs }
    );
    const outputStats = await stat(outputPath);
    const maxOutputBytes = options.maxOutputBytes ?? VIDEO_AUDIO_MAX_BYTES;
    if (!outputStats.isFile() || outputStats.size < 1) {
      throw new Error("Video audio extraction produced no output");
    }
    if (outputStats.size > maxOutputBytes) {
      throw new Error("Extracted video audio byte limit exceeded");
    }
    const audioBytes = await readFile(outputPath);
    if (audioBytes.byteLength !== outputStats.size) {
      throw new Error("Extracted video audio changed before it could be read");
    }
    return {
      channels: VIDEO_AUDIO_CHANNELS,
      dataUri: `data:audio/wav;base64,${audioBytes.toString("base64")}`,
      durationSeconds: metadata.durationSeconds,
      sampleRateHz: VIDEO_AUDIO_SAMPLE_RATE_HZ,
    };
  } finally {
    await rm(temporaryDirectory, { force: true, recursive: true });
  }
}
