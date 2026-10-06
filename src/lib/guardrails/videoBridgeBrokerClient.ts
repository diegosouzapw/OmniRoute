import { z } from "zod";

import {
  fetchModelSyncInternal,
  resolveModelSyncInternalBaseUrl,
} from "@/shared/services/modelSyncScheduler";

import {
  VIDEO_BRIDGE_BROKER_PATH,
  buildVideoBridgeBrokerHeaders,
  isVideoBridgeBrokerInternalRequest,
} from "./videoBridgeBrokerAuth";
import type {
  VideoFocusBounds,
  VideoSamplingMetadata,
  VideoSamplingPolicy,
} from "./videoBridgeRuntime";
import { VIDEO_SUBTITLE_CODEC_ALLOWLIST } from "./videoBridgeSubtitleRuntime";

export {
  VIDEO_BRIDGE_BROKER_PATH,
  buildVideoBridgeBrokerHeaders,
  isVideoBridgeBrokerInternalRequest,
};

export interface BrokerExtractedFrame {
  dataUri: string;
  timestampSeconds: number;
}

export interface BrokerExtractionResult {
  durationSeconds: number;
  frames: BrokerExtractedFrame[];
  sampling?: VideoSamplingMetadata;
}

export interface BrokerExtractionOptions {
  frameCount: number;
  focusWindow?: VideoFocusBounds | null;
  samplingPolicy?: VideoSamplingPolicy;
  signal?: AbortSignal;
  timeoutMs: number;
}

const MAX_BROKER_RESPONSE_BYTES = 32 * 1024 * 1024;

export function resolveVideoBridgeBrokerBaseUrl(_candidate?: string): string {
  return resolveModelSyncInternalBaseUrl();
}

async function readBoundedResponse(response: Response, maxBytes: number): Promise<unknown> {
  const length = Number(response.headers.get("content-length"));
  if (Number.isFinite(length) && length > maxBytes) {
    await response.body?.cancel("Video extraction broker response exceeded its byte limit");
    throw new Error("Video extraction broker response exceeded its byte limit");
  }
  if (!response.body) {
    throw new Error("Video extraction broker returned an invalid response");
  }
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel("Video extraction broker response exceeded its byte limit");
        throw new Error("Video extraction broker response exceeded its byte limit");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const text = Buffer.concat(
    chunks.map((chunk) => Buffer.from(chunk)),
    totalBytes
  ).toString("utf8");
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Video extraction broker returned an invalid response");
  }
}

function parseBrokerResult(value: unknown, frameCount: number): BrokerExtractionResult {
  const record = value && typeof value === "object" ? (value as Record<string, unknown>) : null;
  const durationSeconds = Number(record?.durationSeconds);
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0 || !Array.isArray(record?.frames)) {
    throw new Error("Video extraction broker returned invalid metadata");
  }
  if (record.frames.length < 1 || record.frames.length > frameCount) {
    throw new Error("Video extraction broker returned an invalid frame count");
  }
  const frames = record.frames.map((entry) => {
    const frame = entry && typeof entry === "object" ? (entry as Record<string, unknown>) : null;
    const timestampSeconds = Number(frame?.timestampSeconds);
    const dataUri = typeof frame?.dataUri === "string" ? frame.dataUri : "";
    if (
      !Number.isFinite(timestampSeconds) ||
      timestampSeconds < 0 ||
      !/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(dataUri)
    ) {
      throw new Error("Video extraction broker returned an invalid frame");
    }
    return { dataUri, timestampSeconds };
  });
  const samplingRecord =
    record?.sampling && typeof record.sampling === "object"
      ? (record.sampling as Record<string, unknown>)
      : {};
  const policyRequested =
    samplingRecord.policyRequested === "scene_aware" ||
    samplingRecord.policyRequested === "segment_aware"
      ? samplingRecord.policyRequested
      : "uniform";
  const policyEffective =
    samplingRecord.policyEffective === "scene_aware" ||
    samplingRecord.policyEffective === "segment_aware"
      ? samplingRecord.policyEffective
      : "uniform";
  const candidateCount = Number(samplingRecord.candidateCount ?? 0);
  return {
    durationSeconds,
    frames,
    sampling: {
      candidateCount: Number.isInteger(candidateCount) && candidateCount >= 0 ? candidateCount : 0,
      policyEffective,
      policyRequested,
    },
  };
}

export async function extractVideoFramesViaBroker(
  bytes: Uint8Array,
  options: BrokerExtractionOptions,
  dependencies: { fetchImpl?: typeof fetch; maxResponseBytes?: number } = {}
): Promise<BrokerExtractionResult> {
  if (options.signal?.aborted) throw new Error("Video extraction request aborted");
  const baseUrl = resolveVideoBridgeBrokerBaseUrl();
  const url = new URL(`${baseUrl}${VIDEO_BRIDGE_BROKER_PATH}`);
  url.searchParams.set("frames", String(options.frameCount));
  if (options.samplingPolicy && options.samplingPolicy !== "uniform") {
    url.searchParams.set("samplingPolicy", options.samplingPolicy);
  }
  if (options.focusWindow?.startSeconds !== undefined) {
    url.searchParams.set("start", String(options.focusWindow.startSeconds));
  }
  if (options.focusWindow?.endSeconds !== undefined) {
    url.searchParams.set("end", String(options.focusWindow.endSeconds));
  }
  const fetchImpl = dependencies.fetchImpl ?? fetchModelSyncInternal;
  const timeoutSignal = AbortSignal.timeout(options.timeoutMs);
  const signal = options.signal ? AbortSignal.any([options.signal, timeoutSignal]) : timeoutSignal;
  let response: Response;
  try {
    response = await fetchImpl(url, {
      method: "POST",
      body: Buffer.from(bytes),
      headers: {
        "Content-Type": "application/octet-stream",
        ...buildVideoBridgeBrokerHeaders(),
      },
      redirect: "error",
      signal,
    });
  } catch {
    if (signal.aborted) throw new Error("Video extraction request aborted");
    throw new Error("Video extraction broker is unavailable");
  }
  if (!response.ok) {
    throw new Error(`Video extraction broker failed (${response.status})`);
  }
  const maxResponseBytes = Math.min(
    MAX_BROKER_RESPONSE_BYTES,
    dependencies.maxResponseBytes ?? MAX_BROKER_RESPONSE_BYTES
  );
  return parseBrokerResult(
    await readBoundedResponse(response, maxResponseBytes),
    options.frameCount
  );
}

// ─── Subtitle probe (#11659) ──────────────────────────────────────────────
// The transport/shape half of the adapter: send bounded bytes to the same loopback-only
// broker path, and Zod-validate the raw envelope before any provenance/text normalization
// happens. Bounded WebVTT parsing and the success/absent/transient_failure outcome contract
// live in `videoBridgeSubtitleProbe.ts`, which is the caller of this function.

export const VIDEO_SUBTITLE_MAX_STREAMS = 2;
// Mirrors the broker's own 256 KiB output cap as a client-side defense-in-depth bound —
// never trust the broker (same process, but still an HTTP hop) to have enforced it.
const VIDEO_SUBTITLE_MAX_RAW_TEXT_CODE_UNITS = 300_000;

const VideoSubtitleBrokerStreamSchema = z
  .object({
    codecName: z.enum(VIDEO_SUBTITLE_CODEC_ALLOWLIST),
    streamIndex: z.number().int().nonnegative(),
    webvtt: z.string().max(VIDEO_SUBTITLE_MAX_RAW_TEXT_CODE_UNITS),
  })
  .strict();

const VideoSubtitleBrokerResponseSchema = z
  .object({
    durationSeconds: z.number().positive(),
    fingerprint: z.string().uuid(),
    formatName: z.string().regex(/^[a-z0-9,_]{1,64}$/i),
    streams: z.array(VideoSubtitleBrokerStreamSchema).max(VIDEO_SUBTITLE_MAX_STREAMS),
  })
  .strict();

export type VideoSubtitleBrokerResponse = z.infer<typeof VideoSubtitleBrokerResponseSchema>;

export interface BrokerSubtitleExtractionOptions {
  signal?: AbortSignal;
  timeoutMs: number;
}

export interface BrokerAudioExtractionResult {
  audio: { channels: number; dataUri: string; sampleRateHz: number };
  durationSeconds: number;
}

export interface BrokerAudioExtractionOptions {
  maxDurationSeconds?: number;
  signal?: AbortSignal;
  timeoutMs: number;
}

/**
 * Requests a bounded, allowlisted-codec subtitle probe from the loopback broker. Only the
 * transport + envelope shape are validated here (safe container metadata, bounded stream
 * count, canonical codec names, a well-formed fingerprint) — never trust this alone for
 * provenance: the caller must still compare `fingerprint` against
 * `currentVideoBridgeBrokerFingerprint()` before treating anything as "embedded".
 */
export async function extractVideoSubtitlesViaBroker(
  bytes: Uint8Array,
  options: BrokerSubtitleExtractionOptions,
  dependencies: { fetchImpl?: typeof fetch; maxResponseBytes?: number } = {}
): Promise<VideoSubtitleBrokerResponse> {
  if (options.signal?.aborted) throw new Error("Video extraction request aborted");
  const baseUrl = resolveVideoBridgeBrokerBaseUrl();
  const url = new URL(`${baseUrl}${VIDEO_BRIDGE_BROKER_PATH}`);
  url.searchParams.set("subtitles", "1");
  const fetchImpl = dependencies.fetchImpl ?? fetchModelSyncInternal;
  const timeoutSignal = AbortSignal.timeout(options.timeoutMs);
  const signal = options.signal ? AbortSignal.any([options.signal, timeoutSignal]) : timeoutSignal;
  let response: Response;
  try {
    response = await fetchImpl(url, {
      method: "POST",
      body: Buffer.from(bytes),
      headers: {
        "Content-Type": "application/octet-stream",
        ...buildVideoBridgeBrokerHeaders(),
      },
      redirect: "error",
      signal,
    });
  } catch {
    if (signal.aborted) throw new Error("Video extraction request aborted");
    throw new Error("Video extraction broker is unavailable");
  }
  if (!response.ok) {
    throw new Error(`Video extraction broker failed (${response.status})`);
  }
  const maxResponseBytes = Math.min(
    MAX_BROKER_RESPONSE_BYTES,
    dependencies.maxResponseBytes ?? MAX_BROKER_RESPONSE_BYTES
  );
  const raw = await readBoundedResponse(response, maxResponseBytes);
  const parsed = VideoSubtitleBrokerResponseSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error("Video extraction broker returned invalid subtitle metadata");
  }
  return parsed.data;
}

function parseBrokerAudioResult(value: unknown): BrokerAudioExtractionResult {
  const record = value && typeof value === "object" ? (value as Record<string, unknown>) : null;
  const durationSeconds = Number(record?.durationSeconds);
  const audio =
    record?.audio && typeof record.audio === "object"
      ? (record.audio as Record<string, unknown>)
      : null;
  const dataUri = typeof audio?.dataUri === "string" ? audio.dataUri : "";
  const sampleRateHz = Number(audio?.sampleRateHz);
  const channels = Number(audio?.channels);
  if (
    !Number.isFinite(durationSeconds) ||
    durationSeconds <= 0 ||
    !/^data:audio\/wav;base64,[A-Za-z0-9+/=]+$/.test(dataUri) ||
    !Number.isInteger(sampleRateHz) ||
    sampleRateHz <= 0 ||
    !Number.isInteger(channels) ||
    channels <= 0
  ) {
    throw new Error("Video audio extraction broker returned invalid metadata");
  }
  return { audio: { channels, dataUri, sampleRateHz }, durationSeconds };
}

/**
 * The loopback-only broker's mono 16 kHz PCM WAV extraction operation. Shares
 * the exact route, queue, deadline, and byte budgets as
 * {@link extractVideoFramesViaBroker} — only the `mode=audio` query flag and
 * response shape differ.
 */
export async function extractVideoAudioViaBroker(
  bytes: Uint8Array,
  options: BrokerAudioExtractionOptions,
  dependencies: { fetchImpl?: typeof fetch; maxResponseBytes?: number } = {}
): Promise<BrokerAudioExtractionResult> {
  if (options.signal?.aborted) throw new Error("Video audio extraction request aborted");
  const baseUrl = resolveVideoBridgeBrokerBaseUrl();
  const url = new URL(`${baseUrl}${VIDEO_BRIDGE_BROKER_PATH}`);
  url.searchParams.set("mode", "audio");
  const fetchImpl = dependencies.fetchImpl ?? fetchModelSyncInternal;
  const timeoutSignal = AbortSignal.timeout(options.timeoutMs);
  const signal = options.signal ? AbortSignal.any([options.signal, timeoutSignal]) : timeoutSignal;
  let response: Response;
  try {
    response = await fetchImpl(url, {
      method: "POST",
      body: Buffer.from(bytes),
      headers: {
        "Content-Type": "application/octet-stream",
        ...buildVideoBridgeBrokerHeaders(),
      },
      redirect: "error",
      signal,
    });
  } catch {
    if (signal.aborted) throw new Error("Video audio extraction request aborted");
    throw new Error("Video extraction broker is unavailable");
  }
  if (!response.ok) {
    throw new Error(`Video extraction broker failed (${response.status})`);
  }
  const maxResponseBytes = Math.min(
    MAX_BROKER_RESPONSE_BYTES,
    dependencies.maxResponseBytes ?? MAX_BROKER_RESPONSE_BYTES
  );
  return parseBrokerAudioResult(await readBoundedResponse(response, maxResponseBytes));
}
