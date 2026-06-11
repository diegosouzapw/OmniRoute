
/**
 * Image Generation Handler
 *
 * Handles POST /v1/images/generations requests.
 * Proxies to upstream image generation providers using OpenAI-compatible format.
 *
 * Request format (OpenAI-compatible):
 * {
 *   "model": "openai/gpt-image-2",
 *   "prompt": "a beautiful sunset over mountains",
 *   "n": 1,
 *   "size": "1024x1024",
 *   "quality": "standard",       // optional: "standard" | "hd"
 *   "response_format": "url"     // optional: "url" | "b64_json"
 * }
 */

import { getImageProvider, parseImageModel } from "../../config/imageRegistry.ts";

import { HTTP_STATUS } from "../../config/constants.ts";

import { applyAntigravityClientProfileHeaders } from "../../services/antigravityClientProfile.ts";

import { getAntigravityEnvelopeUserAgent } from "../../services/antigravityIdentity.ts";

import { kieExecutor } from "../../executors/kie.ts";

import { mapImageSize } from "../../translator/image/sizeMapper.ts";

import { getCodexClientVersion, getCodexUserAgent } from "../../config/codexClient.ts";

import { ChatGptWebExecutor } from "../../executors/chatgpt-web.ts";

import { getChatGptImage, findChatGptImageBySha256 } from "../../services/chatgptImageCache.ts";

import { createHash } from "node:crypto";

import { sleep } from "../../utils/sleep.ts";

import {
  getKieErrorMessage,
  getKieErrorStatus,
  isJsonObject,
  parseKieResultJson,
} from "../../utils/kieTask.ts";

import {
  submitComfyWorkflow,
  pollComfyResult,
  fetchComfyOutput,
  extractComfyOutputFiles,
} from "../../utils/comfyuiClient.ts";

import { fetchRemoteImage } from "@/shared/network/remoteImageFetch";

import { FetchTimeoutError, fetchWithTimeout, getConfiguredTimeout } from "@/shared/utils/fetchTimeout";

import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../utils/error.ts";




const IMAGE_ASPECT_RATIO_PATTERN = /^\d+:\d+$/;



/**
 * Resolve the upstream images endpoint for a custom (OpenAI-compatible) image
 * provider node (#3205).
 *
 * Custom provider nodes store their base URL the same way the chat path does:
 * in `credentials.providerSpecificData.baseUrl` (e.g. `https://example.com/v1`),
 * NOT as a top-level `credentials.baseUrl`. Older callers may still pass a
 * top-level `baseUrl`, so we honor that as a secondary source. When neither is
 * present we fall back to `fallback` (the built-in Gemini OpenAI endpoint).
 *
 * Resolution order: providerSpecificData.baseUrl → credentials.baseUrl → fallback.
 *
 * A node base URL like `https://example.com/v1` is normalized and the
 * OpenAI-compatible `/images/generations` path appended (mirroring
 * `buildOpenAICompatibleUrl` in services/provider.ts). A node URL that already
 * ends in `/images/generations` is returned as-is (no double-append). The
 * `fallback` value is assumed to already be a complete URL and is returned
 * verbatim.
 */
export function resolveImageBaseUrl(
  credentials:
    | { baseUrl?: unknown; providerSpecificData?: { baseUrl?: unknown } | null }
    | null
    | undefined,
  fallback: string,
  endpoint: "generations" | "edits" = "generations"
): string {
  const psd = credentials?.providerSpecificData;
  const psdBaseUrl =
    psd && typeof psd === "object" && typeof psd.baseUrl === "string" && psd.baseUrl.trim()
      ? psd.baseUrl.trim()
      : null;
  const topLevelBaseUrl =
    typeof credentials?.baseUrl === "string" && credentials.baseUrl.trim()
      ? credentials.baseUrl.trim()
      : null;
  const nodeBaseUrl = psdBaseUrl || topLevelBaseUrl;

  if (!nodeBaseUrl) return fallback;

  // A single configured node serves both image routes: honor a base URL that already
  // points at the requested OpenAI image path, and rewrite one that points at the other
  // image endpoint (e.g. `.../images/generations` requested for edits) (#3214/#3215).
  const suffix = `/images/${endpoint}`;
  // Trim trailing slashes without a backtracking-prone regex (`/\/+$/` is a
  // polynomial-ReDoS pattern on long runs of "/" — CodeQL js/polynomial-redos).
  let normalized = nodeBaseUrl;
  while (normalized.endsWith("/")) normalized = normalized.slice(0, -1);
  if (normalized.endsWith(suffix)) return normalized;
  const stripped = normalized.replace(/\/images\/(?:generations|edits)$/, "");
  return `${stripped}${suffix}`;
}



export function normalizeImageAspectRatio(value: unknown, fallbackSize: unknown): string {
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    if (IMAGE_ASPECT_RATIO_PATTERN.test(trimmedValue)) return trimmedValue;
  }
  return mapImageSize(typeof fallbackSize === "string" ? fallbackSize : null);
}



function parseJsonOrNull(value: string): unknown | null {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}



export function sanitizeImageProviderError(errorText: string): unknown {
  const parsed = parseJsonOrNull(errorText);
  if (parsed !== null) {
    return sanitizeUpstreamDetails(parsed) || sanitizeErrorMessage(errorText);
  }
  return sanitizeErrorMessage(errorText);
}



function formatImageProviderError(err) {
  const sanitized = sanitizeErrorMessage(err);
  const message = (sanitized || "").replace(/^Error:\s*/i, "").trim();
  return message ? `Image provider error: ${message}` : "Image provider error";
}



export function appendOptionalFormValue(formData, key, value) {
  if (value === undefined || value === null || value === "") return;
  formData.append(key, String(value));
}



export function appendImageFormValue(formData, key, source, filename) {
  formData.append(
    key,
    new Blob([source.buffer], {
      type: source.contentType || "application/octet-stream",
    }),
    filename
  );
}



export function extractImageInputs(body) {
  const imageUrls = [];
  const seen = new Set();

  const pushCandidate = (candidate) => {
    if (typeof candidate !== "string") return;
    const trimmed = candidate.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    imageUrls.push(trimmed);
  };

  pushCandidate(body?.image_url);
  pushCandidate(body?.image);

  if (Array.isArray(body?.imageUrls)) {
    for (const candidate of body.imageUrls) pushCandidate(candidate);
  }

  if (Array.isArray(body?.image_urls)) {
    for (const candidate of body.image_urls) pushCandidate(candidate);
  }

  if (Array.isArray(body?.messages)) {
    for (const msg of body.messages) {
      if (!Array.isArray(msg?.content)) continue;
      for (const part of msg.content) {
        if (part?.type === "image_url") {
          pushCandidate(part?.image_url?.url);
        }
      }
    }
  }

  return {
    imageUrl: imageUrls[0] || null,
    imageUrls,
    maskUrl:
      typeof body?.mask_url === "string"
        ? body.mask_url
        : typeof body?.mask === "string"
          ? body.mask
          : null,
  };
}



export async function resolveImageSource(source) {
  if (typeof source !== "string" || source.trim().length === 0) {
    throw new Error("Invalid image source");
  }

  const trimmed = source.trim();
  const dataUriMatch = /^data:([^;]+);base64,(.+)$/i.exec(trimmed);
  if (dataUriMatch) {
    const [, contentType, base64] = dataUriMatch;
    return {
      buffer: Buffer.from(base64, "base64"),
      base64,
      contentType,
    };
  }

  if (isHttpUrl(trimmed)) {
    const remoteImage = await fetchRemoteImage(trimmed);
    return {
      buffer: remoteImage.buffer,
      base64: remoteImage.buffer.toString("base64"),
      contentType: remoteImage.contentType,
    };
  }

  return {
    buffer: Buffer.from(trimmed, "base64"),
    base64: trimmed,
    contentType: "application/octet-stream",
  };
}



export function parseSizeToDimensions(size, fallback = 1024) {
  if (typeof size !== "string" || !size.includes("x")) {
    return { width: fallback, height: fallback };
  }

  const [widthRaw, heightRaw] = size.split("x");
  const width = Number(widthRaw);
  const height = Number(heightRaw);
  return {
    width: Number.isFinite(width) && width > 0 ? width : fallback,
    height: Number.isFinite(height) && height > 0 ? height : fallback,
  };
}



export function normalizeRequestedImageFormat(
  body,
  fallback = "png",
  allowedFormats = ["jpeg", "png", "webp"]
) {
  const formatCandidate =
    typeof body?.output_format === "string"
      ? body.output_format.toLowerCase()
      : typeof body?.response_format === "string" &&
          !["url", "b64_json"].includes(body.response_format.toLowerCase())
        ? body.response_format.toLowerCase()
        : fallback;

  if (allowedFormats.includes(formatCandidate)) {
    return formatCandidate;
  }

  return fallback;
}



export async function normalizeProviderImagePayload(payload, body, log) {
  const candidates = [];

  const pushCandidate = (value) => {
    if (value === undefined || value === null) return;
    candidates.push(value);
  };

  if (Array.isArray(payload?.data)) {
    for (const item of payload.data) pushCandidate(item);
  }

  if (Array.isArray(payload?.images)) {
    for (const item of payload.images) pushCandidate(item);
  }

  if (payload?.image) pushCandidate({ b64_json: payload.image });
  if (payload?.url) pushCandidate({ url: payload.url });
  if (payload?.sample) pushCandidate({ url: payload.sample });
  if (payload?.result?.sample) pushCandidate({ url: payload.result.sample });
  if (Array.isArray(payload?.result?.images)) {
    for (const item of payload.result.images) pushCandidate(item);
  }

  const normalized = [];
  for (const candidate of candidates) {
    const item = await normalizeProviderImageCandidate(candidate, body);
    if (item) normalized.push(item);
  }

  if (normalized.length === 0 && log) {
    log.warn(
      "IMAGE",
      `Provider returned no recognizable image payload: ${JSON.stringify(payload).slice(0, 240)}`
    );
  }

  return normalized;
}



async function normalizeProviderImageCandidate(candidate, body) {
  const wantsBase64 = body?.response_format === "b64_json";
  let url = null;
  let b64 = null;

  if (typeof candidate === "string") {
    const dataUriMatch = /^data:[^;]+;base64,(.+)$/i.exec(candidate);
    if (dataUriMatch) {
      b64 = dataUriMatch[1];
    } else if (isHttpUrl(candidate)) {
      url = candidate;
    } else {
      b64 = candidate;
    }
  } else if (candidate && typeof candidate === "object") {
    url =
      firstString(candidate.url, candidate.image_url, candidate.sample, candidate.file_url) || null;
    b64 =
      firstString(candidate.b64_json, candidate.image, candidate.base64, candidate.data) || null;
  }

  if (wantsBase64 && !b64 && url) {
    b64 = (await resolveImageSource(url)).base64;
  }

  if (url && !wantsBase64) {
    return { url, revised_prompt: body?.prompt };
  }

  if (b64) {
    return { b64_json: b64, revised_prompt: body?.prompt };
  }

  if (url) {
    return { url, revised_prompt: body?.prompt };
  }

  return null;
}



function firstString(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.length > 0) return value;
  }
  return null;
}



export function isHttpUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}



/**
 * Codex image generation — translate GPT-Image-style /v1/images/generations
 * request into a /v1/responses call with the `image_generation` hosted tool,
 * parse the SSE stream, and return the base64 PNG in OpenAI image response shape.
 *
 * Requires ChatGPT OAuth credentials (Codex provider connection). The hosted
 * image_generation tool is only served upstream under ChatGPT auth; API-key
 * users will receive a 400 from OpenAI.
 */
export function extractImageGenerationCalls(
  sseText: string
): Array<{ b64: string; revisedPrompt: string | null }> {
  const results: Array<{ b64: string; revisedPrompt: string | null }> = [];
  const lines = String(sseText || "").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    let evt: Record<string, unknown>;
    try {
      evt = JSON.parse(payload) as Record<string, unknown>;
    } catch {
      continue;
    }
    if (evt?.type !== "response.output_item.done") continue;
    const item = evt.item as Record<string, unknown> | undefined;
    if (!item || item.type !== "image_generation_call") continue;
    const result = typeof item.result === "string" ? item.result : "";
    if (!result) continue;
    const revisedPrompt = typeof item.revised_prompt === "string" ? item.revised_prompt : null;
    results.push({ b64: result, revisedPrompt });
  }
  return results;
}



// The image_generation hosted tool accepts { "auto" | "low" | "medium" | "high" }
// for `quality`. Legacy image clients often send "standard" / "hd". Map those values
// so OpenWebUI's quality dropdown doesn't silently get rejected upstream.
export function mapLegacyImageQualityToImageTool(value: string): string {
  const normalized = value.toLowerCase();
  if (normalized === "standard") return "medium";
  if (normalized === "hd") return "high";
  return normalized;
}



/**
 * Fetch a single image endpoint and normalize response
 */
export async function fetchImageEndpoint(url, headers, body, provider, log) {
  try {
    let response;
    try {
      response = await fetchWithTimeout(url, {
        method: "POST",
        headers,
        body,
        timeoutMs: getConfiguredTimeout(),
      });
    } catch (err: unknown) {
      const isAbortError =
        typeof err === "object" &&
        err !== null &&
        "name" in err &&
        (err as { name?: unknown }).name === "AbortError";
      if (err instanceof FetchTimeoutError || isAbortError) {
        const message = err instanceof Error ? err.message : String(err);
        if (log) {
          log.error("IMAGE", `${provider} fetch error: ${message}`);
        }
        return {
          success: false,
          status: 504,
          error: `Image provider error: ${sanitizeErrorMessage(message || err)}`,
        };
      }
      throw err;
    }

    if (!response.ok) {
      const errorText = await response.text();
      if (log) {
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      }
      return {
        success: false,
        status: response.status,
        error: errorText,
      };
    }

    const data = await response.json();

    // Normalize response to OpenAI format
    return {
      success: true,
      data: {
        created: data.created || Math.floor(Date.now() / 1000),
        data: data.data || [],
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (log) {
      log.error("IMAGE", `${provider} fetch error: ${message}`);
    }
    return {
      success: false,
      status: 502,
      error: `Image provider error: ${sanitizeErrorMessage(message || err)}`,
    };
  }
}



export function inferResolutionFromSize(size) {
  if (typeof size !== "string") return null;
  const [wRaw, hRaw] = size.split("x");
  const width = Number(wRaw);
  const height = Number(hRaw);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return null;

  const longestSide = Math.max(width, height);
  if (longestSide <= 1024) return "1K";
  if (longestSide <= 2048) return "2K";
  return "4K";
}



export function normalizePositiveNumber(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.floor(n);
}

