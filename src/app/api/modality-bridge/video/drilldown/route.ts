import { z } from "zod";

import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";
import {
  resolveVideoBridgeDrilldownPrincipal,
  VIDEO_BRIDGE_DRILLDOWN_PATH,
} from "@/lib/guardrails/videoBridgeBrokerAuth";
import {
  VideoDrilldownAbortedError,
  VideoDrilldownCache,
  VideoDrilldownValidationError,
  VIDEO_DRILLDOWN_MAX_ENTRY_BYTES,
  VIDEO_DRILLDOWN_MAX_FRAME_DATA_URI_CHARS,
} from "@/lib/guardrails/videoBridgeDrilldown";
import { resolveModelSyncInternalBaseUrl } from "@/shared/services/modelSyncScheduler";
import { createLogger } from "@/shared/utils/logger";

const log = createLogger("video-bridge-drilldown");

export const dynamic = "force-dynamic";
export const revalidate = 0;

export { VIDEO_BRIDGE_DRILLDOWN_PATH };
export const VIDEO_DRILLDOWN_MAX_BODY_BYTES =
  Math.ceil(VIDEO_DRILLDOWN_MAX_ENTRY_BYTES / 3) * 4 + 64 * 1024;

function isCanonicalOpaqueId(value: string): boolean {
  return value === value.trim();
}

function isAsciiAlphaNumeric(code: number): boolean {
  return (
    (code >= 0x30 && code <= 0x39) ||
    (code >= 0x41 && code <= 0x5a) ||
    (code >= 0x61 && code <= 0x7a)
  );
}

function isDerivationToken(value: string): boolean {
  if (value.length < 1 || value.length > 64 || !isAsciiAlphaNumeric(value.charCodeAt(0))) {
    return false;
  }
  for (let index = 1; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (
      !isAsciiAlphaNumeric(code) &&
      code !== 0x2e &&
      code !== 0x5f &&
      code !== 0x2f &&
      code !== 0x2d
    ) {
      return false;
    }
  }
  return true;
}

function isSha256Id(value: string): boolean {
  if (value.length !== 71 || !value.startsWith("sha256:")) return false;
  for (let index = 7; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (!((code >= 0x30 && code <= 0x39) || (code >= 0x61 && code <= 0x66))) return false;
  }
  return true;
}

function isCanonicalNonNegativeNumber(value: string): boolean {
  if (value.length < 1 || value.length > 64 || value !== value.trim()) return false;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0;
}

function isCanonicalFrameCount(value: string): boolean {
  if (value.length < 1 || value.length > 2) return false;
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code < 0x30 || code > 0x39) return false;
  }
  const parsed = Number(value);
  return parsed >= 1 && parsed <= 16;
}

const SessionIdSchema = z
  .string()
  .min(1)
  .max(128)
  .refine(isCanonicalOpaqueId, "sessionId must not contain surrounding whitespace");
const VideoRefSchema = z
  .string()
  .min(1)
  .max(4096)
  .refine(isCanonicalOpaqueId, "videoRef must not contain surrounding whitespace");
const NonNegativeQueryNumberSchema = z
  .string()
  .refine(isCanonicalNonNegativeNumber)
  .transform(Number);
const FrameCountQuerySchema = z.string().refine(isCanonicalFrameCount).transform(Number);
const DrilldownReadQuerySchema = z
  .object({
    end: NonNegativeQueryNumberSchema.optional(),
    frames: FrameCountQuerySchema.optional(),
    sessionId: SessionIdSchema,
    start: NonNegativeQueryNumberSchema.optional(),
    videoRef: VideoRefSchema,
  })
  .strict();
const DrilldownDeleteQuerySchema = z.object({ sessionId: SessionIdSchema }).strict();
const DrilldownDerivationSchema = z
  .object({
    parentContentHash: z.string().refine(isSha256Id),
    policy: z.string().refine(isDerivationToken),
    version: z.string().refine(isDerivationToken),
  })
  .strict();
const DrilldownFrameSchema = z
  .object({
    dataUri: z.string().min(1).max(VIDEO_DRILLDOWN_MAX_FRAME_DATA_URI_CHARS),
    timestampSeconds: z.number().finite().nonnegative(),
  })
  .strict();
const DrilldownPostBodySchema = z
  .object({
    derivation: DrilldownDerivationSchema,
    durationSeconds: z.number().finite().positive().max(600),
    frames: z.array(DrilldownFrameSchema).min(1).max(16),
    sessionId: SessionIdSchema,
    videoRef: VideoRefSchema,
  })
  .strict()
  .superRefine((value, context) => {
    for (let index = 0; index < value.frames.length; index += 1) {
      if (value.frames[index].timestampSeconds > value.durationSeconds) {
        context.addIssue({
          code: "custom",
          message: "frame timestamp exceeds duration",
          path: ["frames", index, "timestampSeconds"],
        });
      }
    }
  });
const drilldownCache = new VideoDrilldownCache({
  maxEntries: 64,
  maxEntriesPerPrincipal: 16,
  maxBytesPerPrincipal: 64 * 1024 * 1024,
  // Global retained-JPEG ceiling: without it, 64 entries × 32 MiB could pin ~2 GiB.
  maxTotalBytes: 256 * 1024 * 1024,
  ttlMs: 10 * 60 * 1000,
});

function expectedPath(): string {
  const basePath = new URL(resolveModelSyncInternalBaseUrl()).pathname.replace(/\/$/, "");
  return `${basePath}${VIDEO_BRIDGE_DRILLDOWN_PATH}`;
}

function invalid(message: string, status = 400): Response {
  return createErrorResponse({ status, message, type: "invalid_request" });
}

class VideoDrilldownRequestAbortedError extends Error {}

function queryRecord(searchParams: URLSearchParams): Record<string, string | string[]> {
  const values: Record<string, string | string[]> = {};
  for (const [key, value] of searchParams) {
    const existing = values[key];
    values[key] =
      existing === undefined
        ? value
        : Array.isArray(existing)
          ? [...existing, value]
          : [existing, value];
  }
  return values;
}

function yieldToEventLoop(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

async function readBodyWithAbort(request: Request): Promise<ArrayBuffer> {
  if (request.signal.aborted) throw new VideoDrilldownRequestAbortedError();
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const onAbort = () => {
      request.signal.removeEventListener("abort", onAbort);
      reject(new VideoDrilldownRequestAbortedError());
    };
    request.signal.addEventListener("abort", onAbort, { once: true });
    request.arrayBuffer().then(
      (bytes) => {
        request.signal.removeEventListener("abort", onAbort);
        resolve(bytes);
      },
      (error: unknown) => {
        request.signal.removeEventListener("abort", onAbort);
        reject(error);
      }
    );
  });
}

function parseQuery(url: URL): {
  endSeconds?: number;
  frameCount?: number;
  sessionId: string;
  startSeconds?: number;
  videoRef: string;
} | null {
  const parsed = DrilldownReadQuerySchema.safeParse(queryRecord(url.searchParams));
  if (!parsed.success) return null;
  return {
    endSeconds: parsed.data.end,
    frameCount: parsed.data.frames,
    sessionId: parsed.data.sessionId,
    startSeconds: parsed.data.start,
    videoRef: parsed.data.videoRef,
  };
}

interface VideoDrilldownRouteDependencies {
  cache?: VideoDrilldownCache;
}

export async function handleVideoDrilldownRequest(
  request: Request,
  dependencies: VideoDrilldownRouteDependencies = {}
): Promise<Response> {
  const url = new URL(request.url);
  if (url.pathname !== expectedPath()) return invalid("Invalid Video Bridge drill-down path", 404);
  const principalId = resolveVideoBridgeDrilldownPrincipal(request);
  if (!principalId) {
    return invalid("This endpoint requires an authenticated internal loopback request", 403);
  }
  const cache = dependencies.cache ?? drilldownCache;
  if (request.method === "GET") {
    const query = parseQuery(url);
    if (!query) return invalid("Invalid Video Bridge drill-down query");
    const result = cache.get(principalId, query.sessionId, query.videoRef, query);
    return result
      ? Response.json(result, { headers: { "Cache-Control": "no-store" } })
      : invalid("Video Bridge drill-down result was not found", 404);
  }
  if (request.method === "DELETE") {
    const query = DrilldownDeleteQuerySchema.safeParse(queryRecord(url.searchParams));
    if (!query.success) return invalid("A canonical sessionId is required");
    return Response.json({ removed: cache.clearSession(principalId, query.data.sessionId) });
  }
  if (request.method !== "POST") return invalid("Invalid Video Bridge drill-down method", 405);
  if (request.headers.get("content-type")?.toLowerCase() !== "application/json") {
    return invalid("Video Bridge drill-down requires application/json");
  }
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > VIDEO_DRILLDOWN_MAX_BODY_BYTES) {
    return invalid("Video Bridge drill-down payload is too large", 413);
  }
  let body: unknown;
  try {
    const bytes = await readBodyWithAbort(request);
    if (bytes.byteLength > VIDEO_DRILLDOWN_MAX_BODY_BYTES)
      return invalid("Video Bridge drill-down payload is too large", 413);
    body = JSON.parse(Buffer.from(bytes).toString("utf8"));
  } catch (error: unknown) {
    if (error instanceof VideoDrilldownRequestAbortedError) {
      return invalid("Video Bridge drill-down request was cancelled", 499);
    }
    return invalid("Video Bridge drill-down payload is invalid");
  }
  const parsed = DrilldownPostBodySchema.safeParse(body);
  if (!parsed.success) return invalid("Video Bridge drill-down payload is invalid");
  await yieldToEventLoop();
  if (request.signal.aborted) {
    return invalid("Video Bridge drill-down request was cancelled", 499);
  }
  try {
    await cache.put(principalId, parsed.data.sessionId, parsed.data.videoRef, parsed.data, {
      signal: request.signal,
    });
  } catch (error: unknown) {
    if (error instanceof VideoDrilldownValidationError) {
      return invalid("Video Bridge drill-down payload is invalid");
    }
    if (error instanceof VideoDrilldownAbortedError || request.signal.aborted) {
      return invalid("Video Bridge drill-down request was cancelled", 499);
    }
    log.error(
      {
        errorName: error instanceof Error ? sanitizeErrorMessage(error.name) : "UnknownError",
      },
      "Unexpected Video Bridge drill-down cache failure"
    );
    return createErrorResponse({
      status: 500,
      message: "Video Bridge drill-down could not be stored",
      type: "server_error",
    });
  }
  return Response.json({ stored: true }, { status: 201, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request): Promise<Response> {
  return handleVideoDrilldownRequest(request);
}

export async function GET(request: Request): Promise<Response> {
  return handleVideoDrilldownRequest(request);
}

export async function DELETE(request: Request): Promise<Response> {
  return handleVideoDrilldownRequest(request);
}
