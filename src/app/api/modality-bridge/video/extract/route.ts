import { createErrorResponse } from "@/lib/api/errorResponse";
import {
  currentVideoBridgeBrokerFingerprint,
  VIDEO_BRIDGE_BROKER_PATH,
  isVideoBridgeBrokerInternalRequest,
} from "@/lib/guardrails/videoBridgeBrokerAuth";
import {
  createVideoExtractionQueue,
  type VideoExtractionQueue,
  VideoExtractionQueueError,
} from "@/lib/guardrails/videoBridgeBrokerQueue";
import {
  extractVideoAudioFromBytes,
  type ExtractedVideoAudio,
} from "@/lib/guardrails/videoBridgeAudioExtraction";
import {
  extractVideoFramesFromBytes,
  type VideoFocusBounds,
  type VideoSamplingPolicy,
} from "@/lib/guardrails/videoBridgeRuntime";
import {
  extractVideoSubtitlesFromBytes,
  VIDEO_SUBTITLE_SUBDEADLINE_MS,
} from "@/lib/guardrails/videoBridgeSubtitleRuntime";
import { resolveModelSyncInternalBaseUrl } from "@/shared/services/modelSyncScheduler";
import { VIDEO_BRIDGE_TIMEOUT_MAX_MS } from "@/shared/constants/modalityBridgeDefaults";
import { createLogger } from "@/shared/utils/logger";

const log = createLogger("video-bridge-broker");

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MAX_INPUT_BYTES = 50 * 1024 * 1024;
const MAX_DURATION_SECONDS = 600;
export const BROKER_TIMEOUT_MS = VIDEO_BRIDGE_TIMEOUT_MAX_MS;
const extractionQueue = createVideoExtractionQueue({
  concurrency: 1,
  maxPending: 4,
  maxQueuedBytes: 100 * 1024 * 1024,
});

function invalid(message: string, status = 400, headers?: Record<string, string>): Response {
  const response = createErrorResponse({ status, message, type: "invalid_request" });
  for (const [name, value] of Object.entries(headers ?? {})) response.headers.set(name, value);
  return response;
}

/**
 * The extract route serves up to three mutually exclusive operations behind one authenticated
 * path: subtitle probe (`?subtitles=1`), audio extraction (`?mode=audio`), and frame sampling
 * (default / `?mode=frames`).
 */
function isSubtitleProbeRequest(url: URL): boolean {
  return url.searchParams.get("subtitles") === "1";
}

export type VideoBrokerMode = "audio" | "frames";

const FRAME_ONLY_QUERY_KEYS = ["frames", "samplingPolicy", "start", "end"];

/** `mode` is opt-in and defaults to the pre-existing frame path (back-compat). */
function parseBrokerMode(url: URL): VideoBrokerMode | null {
  const raw = url.searchParams.get("mode");
  if (raw === null) return "frames";
  return raw === "frames" || raw === "audio" ? raw : null;
}

/** Audio mode shares this route/queue but takes no frame-shaping parameters (v1). */
function hasFrameOnlyParams(url: URL): boolean {
  return FRAME_ONLY_QUERY_KEYS.some((key) => url.searchParams.has(key));
}

function parseFrameCount(url: URL): number | null {
  if (
    [...url.searchParams.keys()].some(
      (key) => !["mode", ...FRAME_ONLY_QUERY_KEYS].includes(key)
    )
  ) {
    return null;
  }
  const raw = url.searchParams.get("frames");
  if (!raw || !/^\d{1,2}$/.test(raw)) return null;
  const samplingPolicy = url.searchParams.get("samplingPolicy");
  if (
    samplingPolicy !== null &&
    samplingPolicy !== "uniform" &&
    samplingPolicy !== "scene_aware" &&
    samplingPolicy !== "segment_aware"
  ) {
    return null;
  }
  const value = Number(raw);
  return Number.isInteger(value) && value >= 1 && value <= 16 ? value : null;
}

function parseFocusWindow(url: URL): VideoFocusBounds | null {
  const start = url.searchParams.get("start");
  const end = url.searchParams.get("end");
  if (start === null && end === null) return null;
  const parse = (value: string | null): number | undefined => {
    if (value === null || value.length === 0) return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
  };
  const startSeconds = parse(start);
  const endSeconds = parse(end);
  if (
    (start !== null && startSeconds === undefined) ||
    (end !== null && endSeconds === undefined)
  ) {
    return null;
  }
  return { endSeconds, startSeconds };
}

function parseSamplingPolicy(url: URL): VideoSamplingPolicy {
  const value = url.searchParams.get("samplingPolicy");
  return value === "scene_aware" || value === "segment_aware" ? value : "uniform";
}

function expectedBrokerPath(): string {
  const basePath = new URL(resolveModelSyncInternalBaseUrl()).pathname.replace(/\/$/, "");
  return `${basePath}${VIDEO_BRIDGE_BROKER_PATH}`;
}

export async function readBoundedVideoBrokerBody(
  request: Request,
  maxBytes = MAX_INPUT_BYTES
): Promise<Buffer> {
  if (!request.body) return Buffer.alloc(0);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > maxBytes) {
      await reader.cancel("Video Bridge input exceeds the byte limit");
      throw new Error("VIDEO_INPUT_TOO_LARGE");
    }
    chunks.push(value);
  }
  return Buffer.concat(
    chunks.map((chunk) => Buffer.from(chunk)),
    totalBytes
  );
}

interface VideoExtractionBrokerRouteDependencies {
  deadlineSignal?: AbortSignal;
  extractAudio?: typeof extractVideoAudioFromBytes;
  extractFrames?: typeof extractVideoFramesFromBytes;
  extractSubtitles?: typeof extractVideoSubtitlesFromBytes;
  queue?: VideoExtractionQueue;
}

/** Shared by all three operations: declared-length pre-check, bounded read, actual-size check. */
async function readValidatedVideoBrokerBytes(request: Request): Promise<Buffer | Response> {
  const declaredHeader = request.headers.get("content-length");
  const declaredLength = declaredHeader === null ? null : Number(declaredHeader);
  if (
    declaredLength !== null &&
    (!Number.isFinite(declaredLength) || declaredLength < 1 || declaredLength > MAX_INPUT_BYTES)
  ) {
    await request.body?.cancel("Video Bridge input exceeds the byte limit");
    return invalid("Video Bridge input exceeds the byte limit", 413);
  }
  let bytes: Buffer;
  try {
    bytes = await readBoundedVideoBrokerBody(request);
  } catch (error) {
    if (error instanceof Error && error.message === "VIDEO_INPUT_TOO_LARGE") {
      return invalid("Video Bridge input exceeds the byte limit", 413);
    }
    return invalid("Video Bridge input could not be read");
  }
  if (
    bytes.byteLength < 1 ||
    bytes.byteLength > MAX_INPUT_BYTES ||
    (declaredLength !== null && bytes.byteLength !== declaredLength)
  ) {
    return invalid("Video Bridge input exceeds the byte limit", 413);
  }
  return bytes;
}

/** Same status/telemetry mapping for both broker operations — one failure taxonomy. */
function mapBrokerExtractionError(
  error: unknown,
  context: { deadline: AbortSignal; inputBytes: number; mode: VideoBrokerMode; request: Request }
): Response {
  const unavailable =
    error && typeof error === "object" && "code" in error && error.code === "ENOENT";
  const queueCapacity =
    error instanceof VideoExtractionQueueError && error.code === "QUEUE_CAPACITY";
  const clientAborted = context.request.signal.aborted;
  const deadlineExceeded = !clientAborted && context.deadline.aborted;
  log.warn(
    {
      aborted: clientAborted,
      code: clientAborted
        ? "CLIENT_ABORTED"
        : queueCapacity
          ? "QUEUE_CAPACITY"
          : deadlineExceeded
            ? "DEADLINE_EXCEEDED"
            : unavailable
              ? "RUNTIME_UNAVAILABLE"
              : "EXTRACTION_FAILED",
      inputBytes: context.inputBytes,
      mode: context.mode,
    },
    "Video Bridge broker extraction failed"
  );
  if (clientAborted) return invalid("Video extraction was aborted", 499);
  if (deadlineExceeded) return invalid("Video extraction deadline exceeded", 504);
  if (queueCapacity) {
    return invalid("Video extraction capacity is temporarily unavailable", 503, {
      "Retry-After": "1",
    });
  }
  if (unavailable) return invalid("Video extraction runtime is unavailable", 503);
  return invalid("Video extraction failed", 422);
}

function serializeAudioResult(result: ExtractedVideoAudio & { durationSeconds: number }): unknown {
  return {
    audio: {
      channels: result.channels,
      dataUri: result.dataUri,
      sampleRateHz: result.sampleRateHz,
    },
    durationSeconds: result.durationSeconds,
  };
}

/**
 * Bounded, allowlisted-codec subtitle probe (#11659). Stamps the response with the shared
 * broker fingerprint so the client-side adapter can refuse anything not actually produced by
 * this trusted loopback process before treating it as "embedded" provenance.
 */
async function handleSubtitleProbeBrokerRequest(
  request: Request,
  url: URL,
  dependencies: VideoExtractionBrokerRouteDependencies
): Promise<Response> {
  if ([...url.searchParams.keys()].some((key) => key !== "subtitles")) {
    return invalid("Video Bridge subtitle probe accepts no other parameters");
  }
  const bytesOrResponse = await readValidatedVideoBrokerBytes(request);
  if (bytesOrResponse instanceof Response) return bytesOrResponse;
  const bytes = bytesOrResponse;

  const deadline =
    dependencies.deadlineSignal ?? AbortSignal.timeout(VIDEO_SUBTITLE_SUBDEADLINE_MS);
  const signal = AbortSignal.any([request.signal, deadline]);
  const queue = dependencies.queue ?? extractionQueue;
  const extractSubtitles = dependencies.extractSubtitles ?? extractVideoSubtitlesFromBytes;
  try {
    const result = await queue.run(
      bytes.byteLength,
      () =>
        extractSubtitles(bytes, {
          maxDurationSeconds: MAX_DURATION_SECONDS,
          signal,
          timeoutMs: VIDEO_SUBTITLE_SUBDEADLINE_MS,
        }),
      signal
    );
    return Response.json(
      { ...result, fingerprint: currentVideoBridgeBrokerFingerprint() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    const queueCapacity =
      error instanceof VideoExtractionQueueError && error.code === "QUEUE_CAPACITY";
    const clientAborted = request.signal.aborted;
    const deadlineExceeded = !clientAborted && deadline.aborted;
    log.warn(
      {
        aborted: clientAborted,
        code: clientAborted
          ? "CLIENT_ABORTED"
          : queueCapacity
            ? "QUEUE_CAPACITY"
            : deadlineExceeded
              ? "DEADLINE_EXCEEDED"
              : "EXTRACTION_FAILED",
        inputBytes: bytes.byteLength,
      },
      "Video Bridge broker subtitle probe failed"
    );
    if (clientAborted) return invalid("Video extraction was aborted", 499);
    if (deadlineExceeded) return invalid("Video extraction deadline exceeded", 504);
    if (queueCapacity) {
      return invalid("Video extraction capacity is temporarily unavailable", 503, {
        "Retry-After": "1",
      });
    }
    return invalid("Video extraction failed", 422);
  }
}

export async function handleVideoExtractionBrokerRequest(
  request: Request,
  dependencies: VideoExtractionBrokerRouteDependencies = {}
): Promise<Response> {
  const url = new URL(request.url);
  if (request.method !== "POST" || url.pathname !== expectedBrokerPath()) {
    return invalid("Invalid Video Bridge broker request", 404);
  }
  if (!isVideoBridgeBrokerInternalRequest(request, VIDEO_BRIDGE_BROKER_PATH)) {
    return invalid("This endpoint requires an authenticated internal loopback request", 403);
  }
  if (request.headers.get("content-type")?.toLowerCase() !== "application/octet-stream") {
    return invalid("Video Bridge broker requires application/octet-stream");
  }
  if (isSubtitleProbeRequest(url)) {
    return handleSubtitleProbeBrokerRequest(request, url, dependencies);
  }
  const mode = parseBrokerMode(url);
  if (!mode) return invalid("Video Bridge broker mode must be frames or audio");

  if (mode === "audio") {
    if (hasFrameOnlyParams(url)) {
      return invalid("Video Bridge audio mode does not accept frame parameters");
    }
    const bytes = await readValidatedVideoBrokerBytes(request);
    if (bytes instanceof Response) return bytes;

    // Same deadline/queue/byte budget the frame path uses — not a parallel set of limits.
    const deadline = dependencies.deadlineSignal ?? AbortSignal.timeout(BROKER_TIMEOUT_MS);
    const signal = AbortSignal.any([request.signal, deadline]);
    const queue = dependencies.queue ?? extractionQueue;
    const extractAudio = dependencies.extractAudio ?? extractVideoAudioFromBytes;
    try {
      const result = await queue.run(
        bytes.byteLength,
        () =>
          extractAudio(bytes, {
            maxDurationSeconds: MAX_DURATION_SECONDS,
            signal,
            timeoutMs: BROKER_TIMEOUT_MS,
          }),
        signal
      );
      return Response.json(serializeAudioResult(result), {
        headers: { "Cache-Control": "no-store" },
      });
    } catch (error) {
      return mapBrokerExtractionError(error, {
        deadline,
        inputBytes: bytes.byteLength,
        mode,
        request,
      });
    }
  }

  const frameCount = parseFrameCount(url);
  if (!frameCount) return invalid("Video Bridge frame count must be between 1 and 16");
  const samplingPolicy = parseSamplingPolicy(url);
  const focusWindow = parseFocusWindow(url);
  if (focusWindow === null && (url.searchParams.has("start") || url.searchParams.has("end"))) {
    return invalid("Video Bridge focus window bounds are invalid");
  }
  const bytes = await readValidatedVideoBrokerBytes(request);
  if (bytes instanceof Response) return bytes;

  const deadline = dependencies.deadlineSignal ?? AbortSignal.timeout(BROKER_TIMEOUT_MS);
  const signal = AbortSignal.any([request.signal, deadline]);
  const queue = dependencies.queue ?? extractionQueue;
  const extractFrames = dependencies.extractFrames ?? extractVideoFramesFromBytes;
  try {
    const result = await queue.run(
      bytes.byteLength,
      () =>
        extractFrames(bytes, {
          frameCount,
          focusWindow,
          maxDurationSeconds: MAX_DURATION_SECONDS,
          samplingPolicy,
          signal,
          timeoutMs: BROKER_TIMEOUT_MS,
        }),
      signal
    );
    return Response.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return mapBrokerExtractionError(error, { deadline, inputBytes: bytes.byteLength, mode, request });
  }
}

export async function POST(request: Request): Promise<Response> {
  return handleVideoExtractionBrokerRequest(request);
}
