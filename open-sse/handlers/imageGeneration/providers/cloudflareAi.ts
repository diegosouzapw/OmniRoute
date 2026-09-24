// Cloudflare Workers AI image generation (FLUX.1 Schnell, edge inference).
// Reuses the same Account ID + API Token connection as the existing cloudflare-ai
// *chat* provider (open-sse/executors/cloudflare-ai.ts) — Account ID resolution
// order matches that executor: providerSpecificData.accountId → credentials.accountId
// → CLOUDFLARE_ACCOUNT_ID env var.
//
// Invoke shape: POST https://api.cloudflare.com/client/v4/accounts/<accountId>/ai/run/<model>
//   Authorization: Bearer <API Token>
// Response: { result: { image: "<base64>" }, success, errors, messages } — a raw
// base64 JPEG string (no data: URI prefix), which maps directly onto the
// OpenAI-compatible `data[].b64_json` field.
//
// Free tier: 10,000 Neurons/day, all Workers plans (verified against
// developers.cloudflare.com/workers-ai/platform/pricing/, 2026-09-21). FLUX.1
// Schnell costs 4.80 Neurons per 512x512 tile (~500 images/day at 1024x1024,
// ~19.2 Neurons each). Past the daily allowance, requests fail with an error
// (hard block) — no surprise billing. Get a Token + Account ID at
// dash.cloudflare.com.

import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

interface CloudflareAiImageGenArgs {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: {
    prompt?: unknown;
    size?: unknown;
    seed?: unknown;
    num_steps?: unknown;
  };
  credentials:
    | {
        apiKey?: string;
        accessToken?: string;
        accountId?: string;
        providerSpecificData?: { accountId?: string } | null;
      }
    | null
    | undefined;
  log?: {
    info?: (tag: string, msg: string) => void;
    error?: (tag: string, msg: string) => void;
  } | null;
}

interface CloudflareAiCallLogParams {
  status: number;
  model: string;
  provider: string;
  duration: number;
  error?: string;
  requestBody?: unknown;
  responseBody?: unknown;
}

function resolveCloudflareAccountId(credentials: CloudflareAiImageGenArgs["credentials"]): string {
  return (
    credentials?.providerSpecificData?.accountId ||
    credentials?.accountId ||
    process.env.CLOUDFLARE_ACCOUNT_ID ||
    ""
  );
}

function parseCloudflareDimensions(size: unknown): { width?: number; height?: number } {
  if (typeof size !== "string" || !size || size === "auto") return {};
  const match = /^(\d+)x(\d+)$/.exec(size);
  if (!match) return {};
  return { width: Number(match[1]), height: Number(match[2]) };
}

/** Fire-and-forget usage log for a Cloudflare Workers AI image-generation call. */
function logCloudflareAiCall(params: CloudflareAiCallLogParams): void {
  saveCallLog({
    method: "POST",
    path: "/v1/images/generations",
    ...params,
  }).catch(() => {});
}

export async function handleCloudflareAiImageGeneration({
  model,
  provider,
  body,
  credentials,
  log,
}: CloudflareAiImageGenArgs) {
  const startTime = Date.now();
  const accountId = resolveCloudflareAccountId(credentials);

  if (!accountId) {
    return {
      success: false as const,
      status: 400,
      error:
        "Cloudflare Workers AI requires an Account ID. Add it in provider settings under " +
        "'Account ID'. Find it at: https://dash.cloudflare.com (right sidebar).",
    };
  }

  const token = credentials?.apiKey || credentials?.accessToken || "";
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  const { width, height } = parseCloudflareDimensions(body.size);
  const upstreamBody: Record<string, unknown> = { prompt };
  if (width) upstreamBody.width = width;
  if (height) upstreamBody.height = height;
  if (typeof body.seed === "number") upstreamBody.seed = body.seed;
  if (typeof body.num_steps === "number") upstreamBody.num_steps = body.num_steps;

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;

  log?.info?.(
    "IMAGE",
    `${provider}/${model} (cloudflare-ai-image) | prompt: "${prompt.slice(0, 60)}..."`
  );

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    const text = await response.text();
    let data: unknown = null;
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }

    if (!response.ok || !data || typeof data !== "object") {
      const errors = (data as { errors?: unknown })?.errors;
      const errorMsg =
        Array.isArray(errors) && errors.length
          ? JSON.stringify(errors)
          : text.slice(0, 500) || `HTTP ${response.status}`;
      log?.error?.("IMAGE", `${provider} error ${response.status}: ${errorMsg}`);
      logCloudflareAiCall({
        status: response.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorMsg,
        requestBody: upstreamBody,
      });
      return { success: false as const, status: response.status || 502, error: errorMsg };
    }

    const record = data as { result?: { image?: string }; success?: boolean };
    const b64 = record.result?.image;

    if (!record.success || !b64) {
      const errorMsg = "No image returned from Cloudflare Workers AI";
      logCloudflareAiCall({
        status: 502,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorMsg,
        responseBody: data,
      });
      return { success: false as const, status: 502, error: errorMsg };
    }

    logCloudflareAiCall({
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { images_count: 1 },
    });

    return {
      success: true as const,
      data: {
        created: Math.floor(Date.now() / 1000),
        data: [{ b64_json: b64, revised_prompt: prompt }],
      },
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    log?.error?.("IMAGE", `${provider} fetch error: ${errMsg}`);
    logCloudflareAiCall({
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: errMsg,
    });
    return {
      success: false as const,
      status: 502,
      error: `Image provider error: ${sanitizeErrorMessage(errMsg)}`,
    };
  }
}
