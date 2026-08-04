/**
 * DeepInfra native text/image-to-video generation.
 *
 * DeepInfra's `/v1/inference/{model}` endpoint is already proven in this codebase for
 * reranking (`open-sse/handlers/rerank.ts` + `open-sse/config/rerankRegistry.ts`) — same
 * host, same Bearer auth, same non-OpenAI response shape. This reuses the stored
 * `deepinfra` provider credential (already registered for chat) — no new credential flow.
 *
 * Confirmed against DeepInfra's own docs (https://deepinfra.com/<model>/api): the call is
 * synchronous — `POST {prompt}` returns `{video_url, seed, request_id, inference_status}`
 * directly, no task/poll loop like `kie-video`/`dashscope-video`.
 */

import { sanitizeErrorMessage } from "../../utils/error.ts";
import { saveCallLog } from "@/lib/usageDb";

interface DeepinfraHandlerArgs {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown> & {
    prompt?: unknown;
    negative_prompt?: unknown;
    image?: unknown;
    image_url?: unknown;
    seed?: unknown;
  };
  credentials?: { apiKey?: string; accessToken?: string } | null;
  log?: {
    info?: (scope: string, message: string) => void;
    error?: (scope: string, message: string) => void;
  } | null;
}

interface DeepinfraVideoResponse {
  video_url?: unknown;
  seed?: unknown;
  request_id?: unknown;
  inference_status?: { status?: unknown; error?: unknown } | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Builds the DeepInfra `/v1/inference/{model}` request body from the OmniRoute video body. */
/* @testonly */ export function buildDeepinfraVideoRequestBody(
  body: DeepinfraHandlerArgs["body"]
): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    prompt: typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? ""),
  };
  if (typeof body.negative_prompt === "string" && body.negative_prompt) {
    payload.negative_prompt = body.negative_prompt;
  }
  const image = body.image ?? body.image_url;
  if (typeof image === "string" && image) {
    payload.image = image;
  }
  if (typeof body.seed === "number" && Number.isFinite(body.seed)) {
    payload.seed = body.seed;
  }
  return payload;
}

/** Extracts a human-readable error message from a DeepInfra error/inference_status payload. */
/* @testonly */ export function extractDeepinfraErrorMessage(data: unknown): string | null {
  if (!isRecord(data)) return null;
  const direct = data.error ?? data.detail ?? data.message;
  if (typeof direct === "string" && direct) return direct;
  if (isRecord(direct) && typeof direct.message === "string" && direct.message) {
    return direct.message;
  }
  const status = data.inference_status;
  if (isRecord(status) && typeof status.error === "string" && status.error) {
    return status.error;
  }
  return null;
}

interface CallLogContext {
  provider: string;
  model: string;
  startTime: number;
}

function logDeepinfraCall(
  ctx: CallLogContext,
  status: number,
  extra: { error?: string; responseBody?: Record<string, unknown> }
) {
  saveCallLog({
    method: "POST",
    path: "/v1/videos/generations",
    status,
    model: `${ctx.provider}/${ctx.model}`,
    provider: ctx.provider,
    duration: Date.now() - ctx.startTime,
    ...extra,
  }).catch(() => {});
}

function buildDeepinfraFetchError(
  ctx: CallLogContext,
  status: number,
  data: unknown,
  log?: DeepinfraHandlerArgs["log"]
) {
  const errorMessage = extractDeepinfraErrorMessage(data) || `DeepInfra returned HTTP ${status}`;
  log?.error?.("VIDEO", `${ctx.provider} deepinfra-video error ${status}: ${errorMessage}`);
  logDeepinfraCall(ctx, status, { error: errorMessage.slice(0, 500) });
  return { success: false, status, error: errorMessage };
}

function buildDeepinfraSuccess(ctx: CallLogContext, videoUrl: string) {
  logDeepinfraCall(ctx, 200, { responseBody: { videos_count: 1 } });
  return {
    success: true,
    data: {
      created: Math.floor(Date.now() / 1000),
      data: [{ url: videoUrl, format: "mp4" }],
    },
  };
}

function buildDeepinfraCatchError(
  ctx: CallLogContext,
  err: unknown,
  log?: DeepinfraHandlerArgs["log"]
) {
  const errorMessage = sanitizeErrorMessage(err) || "Video provider error";
  log?.error?.("VIDEO", `${ctx.provider} deepinfra-video error: ${errorMessage}`);
  logDeepinfraCall(ctx, 502, { error: errorMessage });
  return { success: false, status: 502, error: errorMessage };
}

async function fetchDeepinfraVideo(
  baseUrl: string,
  model: string,
  token: string,
  requestBody: unknown
) {
  const res = await fetch(`${baseUrl}/${model}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });
  const data: DeepinfraVideoResponse = await res.json().catch(() => ({}));
  return { res, data };
}

export async function handleDeepinfraVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: DeepinfraHandlerArgs) {
  const ctx: CallLogContext = { provider, model, startTime: Date.now() };
  const token = credentials?.apiKey || credentials?.accessToken;
  if (!token) {
    return { success: false, status: 401, error: "DeepInfra API key is required" };
  }

  const baseUrl = providerConfig.baseUrl.replace(/\/$/, "");
  const requestBody = buildDeepinfraVideoRequestBody(body);
  const promptPreview = String(body.prompt ?? "").slice(0, 60);
  log?.info?.("VIDEO", `${provider}/${model} (deepinfra-video) | prompt: "${promptPreview}..."`);

  try {
    const { res, data } = await fetchDeepinfraVideo(baseUrl, model, token, requestBody);
    if (!res.ok) return buildDeepinfraFetchError(ctx, res.status, data, log);

    const videoUrl = typeof data.video_url === "string" ? data.video_url : null;
    if (!videoUrl) {
      const errorMessage =
        extractDeepinfraErrorMessage(data) || "DeepInfra video generation did not return video_url";
      return { success: false, status: 502, error: errorMessage };
    }

    return buildDeepinfraSuccess(ctx, videoUrl);
  } catch (err: unknown) {
    return buildDeepinfraCatchError(ctx, err, log);
  }
}
