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
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonObject) : {};
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

interface OpenRouterVideoRequest {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string; statusUrl?: string };
  body: OpenRouterVideoBody;
  credentials?: OpenRouterVideoCredentials | null;
  log?: OpenRouterVideoLog | null;
}

interface OpenRouterVideoContext extends OpenRouterVideoRequest {
  startedAt: number;
  token: string;
  createUrl: string;
  statusBaseUrl: string;
  headers: Record<string, string>;
  timeoutMs: number;
  pollIntervalMs: number;
}

type VideoFailure = { success: false; status: number; error: string };

function videoFailure(status: number, error: string): VideoFailure {
  return { success: false, status, error };
}

function createVideoContext(
  request: OpenRouterVideoRequest,
  token: string,
  startedAt: number
): OpenRouterVideoContext {
  const createUrl = trimTrailingSlash(request.providerConfig.baseUrl);
  return {
    ...request,
    startedAt,
    token,
    createUrl,
    statusBaseUrl: trimTrailingSlash(request.providerConfig.statusUrl || createUrl),
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    timeoutMs: clampNumber(
      request.body.timeout_ms,
      DEFAULT_JOB_TIMEOUT_MS,
      MIN_JOB_TIMEOUT_MS,
      MAX_JOB_TIMEOUT_MS
    ),
    pollIntervalMs: clampNumber(
      request.body.poll_interval_ms,
      DEFAULT_POLL_INTERVAL_MS,
      MIN_POLL_INTERVAL_MS,
      MAX_POLL_INTERVAL_MS
    ),
  };
}

async function submitVideoJob(
  context: OpenRouterVideoContext
): Promise<{ success: true; jobId: string; latest: JsonObject } | VideoFailure> {
  const created = await fetchJson(
    context.createUrl,
    {
      method: "POST",
      headers: context.headers,
      body: JSON.stringify(buildPayload(context.model, context.body)),
    },
    context.log
  );
  if (!created.response.ok) {
    return videoFailure(
      created.response.status || 502,
      upstreamMessage(created.payload, "OpenRouter video submission failed")
    );
  }

  const jobId = typeof created.payload.id === "string" ? created.payload.id.trim() : "";
  return jobId
    ? { success: true, jobId, latest: created.payload }
    : videoFailure(502, "OpenRouter video submission did not return a job id");
}

function timedOut(jobId: string, status: string): VideoFailure {
  return videoFailure(
    504,
    `OpenRouter video job ${jobId} timed out (status: ${status || "unknown"})`
  );
}

async function waitForNextPoll(
  deadline: number,
  pollIntervalMs: number,
  jobId: string,
  status: string
): Promise<VideoFailure | null> {
  const remainingMs = deadline - Date.now();
  if (remainingMs <= 0) return timedOut(jobId, status);
  await new Promise((resolve) => setTimeout(resolve, Math.min(pollIntervalMs, remainingMs)));
  return Date.now() >= deadline ? timedOut(jobId, status) : null;
}

type PollResult = { success: true; latest: JsonObject } | VideoFailure;

async function pollVideoJob(
  context: OpenRouterVideoContext,
  jobId: string,
  initial: JsonObject
): Promise<PollResult> {
  const pollUrl = `${context.statusBaseUrl}/${encodeURIComponent(jobId)}`;
  const deadline = context.startedAt + context.timeoutMs;
  let latest = initial;
  let status = videoStatus(latest.status) || "pending";

  while (status !== "completed" && !isTerminalFailure(status)) {
    const timeout = await waitForNextPoll(deadline, context.pollIntervalMs, jobId, status);
    if (timeout) return timeout;
    const polled = await fetchJson(
      pollUrl,
      { method: "GET", headers: context.headers },
      context.log
    );
    if (!polled.response.ok) {
      return videoFailure(
        polled.response.status || 502,
        upstreamMessage(polled.payload, "OpenRouter video polling failed")
      );
    }
    latest = polled.payload;
    status = videoStatus(latest.status) || status;
  }

  return isTerminalFailure(status)
    ? videoFailure(502, upstreamMessage(latest, `OpenRouter video job ${status}`))
    : { success: true, latest };
}

type ContentResult = { success: true; bytes: Buffer; contentType: string } | VideoFailure;

async function downloadVideoContent(
  context: OpenRouterVideoContext,
  jobId: string
): Promise<ContentResult> {
  const contentUrl = `${context.statusBaseUrl}/${encodeURIComponent(jobId)}/content?index=0`;
  const content = await fetchWithTimeout(contentUrl, {
    method: "GET",
    headers: { Authorization: `Bearer ${context.token}` },
    timeoutMs: requestTimeoutMs(),
  });
  if (!content.ok) {
    const errorPayload = await readJsonResponse(content);
    return videoFailure(
      content.status || 502,
      upstreamMessage(errorPayload, "OpenRouter video content retrieval failed")
    );
  }

  const bytes = Buffer.from(await content.arrayBuffer());
  return bytes.length > 0
    ? { success: true, bytes, contentType: content.headers.get("content-type") || "video/mp4" }
    : videoFailure(502, "OpenRouter returned empty video content");
}

function recordSuccessfulVideoCall(
  context: OpenRouterVideoContext,
  jobId: string,
  latest: JsonObject
): void {
  saveCallLog({
    method: "POST",
    path: "/v1/videos/generations",
    status: 200,
    model: `${context.provider}/${context.model}`,
    provider: context.provider,
    connectionId: context.credentials?.connectionId || undefined,
    duration: Date.now() - context.startedAt,
    responseBody: {
      videos_count: 1,
      upstream_job_id: jobId,
      upstream_generation_id:
        typeof latest.generation_id === "string" ? latest.generation_id : undefined,
    },
  }).catch(() => {});
}

async function runVideoGeneration(context: OpenRouterVideoContext) {
  const submitted = await submitVideoJob(context);
  if (!submitted.success) return submitted;

  // Follow-up URLs always derive from the trusted configured OpenRouter base.
  const polled = await pollVideoJob(context, submitted.jobId, submitted.latest);
  if (!polled.success) return polled;
  const content = await downloadVideoContent(context, submitted.jobId);
  if (!content.success) return content;

  recordSuccessfulVideoCall(context, submitted.jobId, polled.latest);
  return {
    success: true,
    data: {
      created: Math.floor(Date.now() / 1000),
      data: [
        {
          b64_json: content.bytes.toString("base64"),
          format: content.contentType.includes("webm") ? "webm" : "mp4",
          mime_type: content.contentType,
        },
      ],
    },
  };
}

function transportFailure(error: unknown): VideoFailure {
  const isTimeout =
    error instanceof FetchTimeoutError ||
    (error !== null && typeof error === "object" && "name" in error && error.name === "AbortError");
  return videoFailure(
    isTimeout ? 504 : 502,
    sanitizeErrorMessage(error) || "OpenRouter video provider error"
  );
}

export async function handleOpenRouterVideoGeneration(request: OpenRouterVideoRequest) {
  const startedAt = Date.now();
  const token = request.credentials?.apiKey || request.credentials?.accessToken;
  if (!token) return videoFailure(401, "OpenRouter API key is required");

  const context = createVideoContext(request, token, startedAt);
  request.log?.info?.(
    "VIDEO",
    `OpenRouter native video generation: ${request.model} -> ${context.createUrl}`
  );

  try {
    return await runVideoGeneration(context);
  } catch (error: unknown) {
    return transportFailure(error);
  }
}
