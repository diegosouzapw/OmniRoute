/**
 * Native OpenRouter video transport.
 *
 * OpenRouter's video API is asynchronous and intentionally does not use the
 * OpenAI-compatible `/videos/generations` path:
 *
 *   POST /api/v1/videos
 *   GET  /api/v1/videos/:jobId
 *   GET  /api/v1/videos/:jobId/content
 *
 * OmniRoute keeps its public POST `/v1/videos/generations` contract and
 * normalizes the authenticated content response into the same `b64_json`
 * artifact shape already used by other video transports.
 */

import { saveCallLog } from "@/lib/usageDb";
import {
  FetchTimeoutError,
  fetchWithTimeout,
  getConfiguredTimeout,
} from "@/shared/utils/fetchTimeout";
import { sanitizeErrorMessage } from "../../utils/error.ts";

interface OpenRouterVideoBody {
  prompt?: unknown;
  aspect_ratio?: unknown;
  callback_url?: unknown;
  duration?: unknown;
  frame_images?: unknown;
  generate_audio?: unknown;
  input_references?: unknown;
  provider?: unknown;
  resolution?: unknown;
  seed?: unknown;
  size?: unknown;
  timeout_ms?: unknown;
  poll_interval_ms?: unknown;
  [key: string]: unknown;
}

interface OpenRouterVideoCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  connectionId?: string | null;
}

interface OpenRouterVideoLog {
  info?: (scope: string, message: string, meta?: unknown) => void;
  error?: (scope: string, message: string) => void;
}

type JsonObject = Record<string, unknown>;

const DEFAULT_JOB_TIMEOUT_MS = 10 * 60_000;
const MIN_JOB_TIMEOUT_MS = 30_000;
const MAX_JOB_TIMEOUT_MS = 30 * 60_000;
const DEFAULT_POLL_INTERVAL_MS = 30_000;
const MIN_POLL_INTERVAL_MS = 1_000;
const MAX_POLL_INTERVAL_MS = 30_000;
const MAX_REQUEST_TIMEOUT_MS = 60_000;

function clampNumber(value: unknown, fallback: number, min: number, max: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(parsed)));
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function asJsonObject(value: unknown): JsonObject {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : {};
}

function upstreamMessage(payload: unknown, fallback: string): string {
  const row = asJsonObject(payload);
  const error = row.error;
  if (typeof error === "string" && error.trim()) return error.trim();
  const nested = asJsonObject(error);
  if (typeof nested.message === "string" && nested.message.trim()) return nested.message.trim();
  if (typeof row.message === "string" && row.message.trim()) return row.message.trim();
  return fallback;
}

function buildPayload(model: string, body: OpenRouterVideoBody): JsonObject {
  const payload: JsonObject = {
    model,
    prompt: typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? ""),
  };
  for (const field of [
    "aspect_ratio",
    "callback_url",
    "duration",
    "frame_images",
    "generate_audio",
    "input_references",
    "provider",
    "resolution",
    "seed",
    "size",
  ] as const) {
    if (body[field] !== undefined) payload[field] = body[field];
  }
  return payload;
}

function requestTimeoutMs(): number {
  return Math.min(MAX_REQUEST_TIMEOUT_MS, getConfiguredTimeout());
}

async function readJsonResponse(response: Response): Promise<JsonObject> {
  return asJsonObject(await response.json().catch(() => ({})));
}

async function fetchJson(
  url: string,
  init: RequestInit,
  log?: OpenRouterVideoLog | null
): Promise<{ response: Response; payload: JsonObject }> {
  const response = await fetchWithTimeout(url, {
    ...init,
    timeoutMs: requestTimeoutMs(),
  });
  const payload = await readJsonResponse(response);
  if (!response.ok) {
    log?.error?.(
      "VIDEO",
      `OpenRouter video upstream HTTP ${response.status}: ${upstreamMessage(payload, "request failed")}`
    );
  }
  return { response, payload };
}

function videoStatus(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isTerminalFailure(status: string): boolean {
  return status === "failed" || status === "cancelled" || status === "expired";
}

export async function handleOpenRouterVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string; statusUrl?: string };
  body: OpenRouterVideoBody;
  credentials?: OpenRouterVideoCredentials | null;
  log?: OpenRouterVideoLog | null;
}) {
  const startedAt = Date.now();
  const token = credentials?.apiKey || credentials?.accessToken;
  if (!token) {
    return { success: false, status: 401, error: "OpenRouter API key is required" };
  }

  const createUrl = trimTrailingSlash(providerConfig.baseUrl);
  const statusBaseUrl = trimTrailingSlash(providerConfig.statusUrl || createUrl);
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const timeoutMs = clampNumber(
    body.timeout_ms,
    DEFAULT_JOB_TIMEOUT_MS,
    MIN_JOB_TIMEOUT_MS,
    MAX_JOB_TIMEOUT_MS
  );
  const pollIntervalMs = clampNumber(
    body.poll_interval_ms,
    DEFAULT_POLL_INTERVAL_MS,
    MIN_POLL_INTERVAL_MS,
    MAX_POLL_INTERVAL_MS
  );

  log?.info?.("VIDEO", `OpenRouter native video generation: ${model} -> ${createUrl}`);

  try {
    const created = await fetchJson(
      createUrl,
      { method: "POST", headers, body: JSON.stringify(buildPayload(model, body)) },
      log
    );
    if (!created.response.ok) {
      return {
        success: false,
        status: created.response.status || 502,
        error: upstreamMessage(created.payload, "OpenRouter video submission failed"),
      };
    }

    const jobId = typeof created.payload.id === "string" ? created.payload.id.trim() : "";
    if (!jobId) {
      return {
        success: false,
        status: 502,
        error: "OpenRouter video submission did not return a job id",
      };
    }

    // Construct every follow-up URL from the trusted configured OpenRouter base.
    // Never follow a caller/upstream-controlled polling URL.
    const encodedJobId = encodeURIComponent(jobId);
    const pollUrl = `${statusBaseUrl}/${encodedJobId}`;
    const deadline = startedAt + timeoutMs;
    let latest = created.payload;
    let status = videoStatus(latest.status) || "pending";

    while (status !== "completed" && !isTerminalFailure(status)) {
      const remainingMs = deadline - Date.now();
      if (remainingMs <= 0) {
        return {
          success: false,
          status: 504,
          error: `OpenRouter video job ${jobId} timed out (status: ${status || "unknown"})`,
        };
      }
      await new Promise((resolve) => setTimeout(resolve, Math.min(pollIntervalMs, remainingMs)));
      if (Date.now() >= deadline) {
        return {
          success: false,
          status: 504,
          error: `OpenRouter video job ${jobId} timed out (status: ${status || "unknown"})`,
        };
      }
      const polled = await fetchJson(pollUrl, { method: "GET", headers }, log);
      if (!polled.response.ok) {
        return {
          success: false,
          status: polled.response.status || 502,
          error: upstreamMessage(polled.payload, "OpenRouter video polling failed"),
        };
      }
      latest = polled.payload;
      status = videoStatus(latest.status) || status;
    }

    if (isTerminalFailure(status)) {
      return {
        success: false,
        status: 502,
        error: upstreamMessage(latest, `OpenRouter video job ${status}`),
      };
    }

    const contentUrl = `${statusBaseUrl}/${encodedJobId}/content?index=0`;
    const content = await fetchWithTimeout(contentUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      timeoutMs: requestTimeoutMs(),
    });
    if (!content.ok) {
      const errorPayload = await readJsonResponse(content);
      return {
        success: false,
        status: content.status || 502,
        error: upstreamMessage(errorPayload, "OpenRouter video content retrieval failed"),
      };
    }

    const contentType = content.headers.get("content-type") || "video/mp4";
    const bytes = Buffer.from(await content.arrayBuffer());
    if (bytes.length === 0) {
      return { success: false, status: 502, error: "OpenRouter returned empty video content" };
    }

    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      connectionId: credentials?.connectionId || undefined,
      duration: Date.now() - startedAt,
      responseBody: {
        videos_count: 1,
        upstream_job_id: jobId,
        upstream_generation_id:
          typeof latest.generation_id === "string" ? latest.generation_id : undefined,
      },
    }).catch(() => {});

    return {
      success: true,
      data: {
        created: Math.floor(Date.now() / 1000),
        data: [
          {
            b64_json: bytes.toString("base64"),
            format: contentType.includes("webm") ? "webm" : "mp4",
            mime_type: contentType,
          },
        ],
      },
    };
  } catch (error: unknown) {
    const isTimeout =
      error instanceof FetchTimeoutError ||
      (error && typeof error === "object" && "name" in error && error.name === "AbortError");
    return {
      success: false,
      status: isTimeout ? 504 : 502,
      error: sanitizeErrorMessage(error) || "OpenRouter video provider error",
    };
  }
}
