// #2482: MiniMax Text-to-Image provider handler.
// MiniMax's image_generation endpoint is synchronous (unlike its video/music
// endpoints, which are task-based and polled) and returns image URLs directly
// in `data.image_urls`. This normalizes that response into the OpenAI-compatible
// images payload the rest of the handler expects.

import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

interface MinimaxImageGenArgs {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: { prompt?: string; size?: string; n?: number; response_format?: string };
  credentials: { apiKey?: string; accessToken?: string };
  log?: {
    info?: (tag: string, msg: string) => void;
    error?: (tag: string, msg: string) => void;
  } | null;
}

interface MinimaxCallLogParams {
  status: number;
  model: string;
  provider: string;
  duration: number;
  error?: string;
  requestBody?: unknown;
  responseBody?: unknown;
}

const MINIMAX_ASPECT_RATIOS = new Set(["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3"]);

function mapMinimaxAspectRatio(size?: string): string {
  if (size && MINIMAX_ASPECT_RATIOS.has(size)) return size;
  return "1:1";
}

/** Fire-and-forget usage log for a MiniMax image-generation call. */
function logMinimaxCall(params: MinimaxCallLogParams): void {
  saveCallLog({
    method: "POST",
    path: "/v1/images/generations",
    ...params,
  }).catch(() => {});
}

/** Builds the upstream MiniMax request body from the OpenAI-shaped input body. */
function buildMinimaxUpstreamBody(model: string, prompt: string, body: MinimaxImageGenArgs["body"]) {
  return {
    model: model || "image-01",
    prompt,
    aspect_ratio: mapMinimaxAspectRatio(body.size),
    n: body.n ?? 1,
    response_format: "url",
  };
}

/** Handles a non-2xx MiniMax response: logs, records the call, and shapes the error result. */
async function handleMinimaxUpstreamError(
  response: Response,
  ctx: { provider: string; model: string; startTime: number; upstreamBody: unknown; log?: MinimaxImageGenArgs["log"] }
) {
  const errorText = await response.text();
  ctx.log?.error?.("IMAGE", `${ctx.provider} error ${response.status}: ${errorText.slice(0, 200)}`);

  logMinimaxCall({
    status: response.status,
    model: `${ctx.provider}/${ctx.model}`,
    provider: ctx.provider,
    duration: Date.now() - ctx.startTime,
    error: errorText.slice(0, 500),
    requestBody: ctx.upstreamBody,
  });

  return { success: false as const, status: response.status, error: errorText };
}

/** Extracts and validates the `image_urls` array from a MiniMax response payload. */
function extractMinimaxImageUrls(data: unknown): unknown[] {
  const record = data as { data?: { image_urls?: unknown } } | undefined;
  return Array.isArray(record?.data?.image_urls) ? (record?.data?.image_urls as unknown[]) : [];
}

interface MinimaxResultCtx {
  provider: string;
  model: string;
  startTime: number;
}

/** MiniMax returned 2xx but no images — logs and shapes the empty-result error. */
function buildMinimaxNoImagesResult(data: unknown, ctx: MinimaxResultCtx) {
  const record = data as { base_resp?: { status_msg?: string } } | undefined;
  const errorMsg = record?.base_resp?.status_msg || "No images returned from MiniMax";
  logMinimaxCall({
    status: 502,
    model: `${ctx.provider}/${ctx.model}`,
    provider: ctx.provider,
    duration: Date.now() - ctx.startTime,
    error: errorMsg,
  });
  return { success: false as const, status: 502, error: errorMsg };
}

/** MiniMax returned images — logs and shapes the OpenAI-compatible success result. */
function buildMinimaxSuccessResult(imageUrls: unknown[], prompt: string, ctx: MinimaxResultCtx) {
  const images = imageUrls.map((url) => ({ url, revised_prompt: prompt }));

  logMinimaxCall({
    status: 200,
    model: `${ctx.provider}/${ctx.model}`,
    provider: ctx.provider,
    duration: Date.now() - ctx.startTime,
    responseBody: { images_count: images.length },
  });

  return {
    success: true as const,
    data: { created: Math.floor(Date.now() / 1000), data: images },
  };
}

/** Network/parse failure reaching MiniMax — logs and shapes the sanitized error result. */
function buildMinimaxFetchErrorResult(
  err: unknown,
  ctx: MinimaxResultCtx & { log?: MinimaxImageGenArgs["log"] }
) {
  const errMsg = err instanceof Error ? err.message : String(err);
  ctx.log?.error?.("IMAGE", `${ctx.provider} fetch error: ${errMsg}`);

  logMinimaxCall({
    status: 502,
    model: `${ctx.provider}/${ctx.model}`,
    provider: ctx.provider,
    duration: Date.now() - ctx.startTime,
    error: errMsg,
  });

  return {
    success: false as const,
    status: 502,
    error: `Image provider error: ${sanitizeErrorMessage(errMsg)}`,
  };
}

export async function handleMinimaxImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: MinimaxImageGenArgs) {
  const startTime = Date.now();
  const token = credentials?.apiKey || credentials?.accessToken || "";
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  const upstreamBody = buildMinimaxUpstreamBody(model, prompt, body);

  log?.info?.(
    "IMAGE",
    `${provider}/${model} (minimax-image) | prompt: "${prompt.slice(0, 60)}..." | aspect_ratio: ${upstreamBody.aspect_ratio}`
  );

  try {
    const response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      return handleMinimaxUpstreamError(response, { provider, model, startTime, upstreamBody, log });
    }

    const data = await response.json();
    const imageUrls = extractMinimaxImageUrls(data);
    const ctx: MinimaxResultCtx = { provider, model, startTime };

    if (imageUrls.length === 0) {
      return buildMinimaxNoImagesResult(data, ctx);
    }

    return buildMinimaxSuccessResult(imageUrls, prompt, ctx);
  } catch (err: unknown) {
    return buildMinimaxFetchErrorResult(err, { provider, model, startTime, log });
  }
}
