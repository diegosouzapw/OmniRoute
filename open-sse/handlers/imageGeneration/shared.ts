import { saveCallLog } from "@/lib/usageDb";
import { fetchUntrustedRemoteImage } from "@/shared/network/remoteImageFetch";
import { HTTP_STATUS } from "../../config/constants.ts";
import { mapImageSize } from "../../translator/image/sizeMapper.ts";
import {
  FetchTimeoutError,
  fetchWithTimeout,
  getConfiguredTimeout,
} from "@/shared/utils/fetchTimeout";
import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../utils/error.ts";
import { isJsonObject } from "../../utils/kieTask.ts";
import { stringifyImageErrorForLog } from "../imageErrorLog.ts";
import { buildImageEndpointSuccess, type ImageEndpointResult } from "./result.ts";

export { saveCallLog, fetchUntrustedRemoteImage, fetchWithTimeout, FetchTimeoutError };
/**
 * Resolve the upstream images endpoint for a custom (OpenAI-compatible) image
 * provider node (#3205).
 *
 * Custom provider nodes store their base URL the same way the chat path does:
 * in `credentials.providerSpecificData.baseUrl` (e.g. `https://example.com/v1`),
 * NOT as a top-level `credentials.baseUrl`. Older callers may still pass a
 * top-level `baseUrl`, so we honor that as a secondary source. When neither is
 * present the caller may use its explicit fallback. Custom-node callers use
 * failClosed so they never route to a built-in provider endpoint.
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
    { baseUrl?: unknown; providerSpecificData?: { baseUrl?: unknown } | null } | null | undefined,
  fallback: string,
  endpoint: "generations" | "edits" = "generations",
  failClosed = false
): string {
  const nodeBaseUrl = resolveConfiguredImageBaseUrl(credentials);

  if (!nodeBaseUrl) return failClosed ? "" : fallback;

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
export function parseJsonOrNull(value: string): unknown | null {
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
const FAL_PRESET_SIZES = {
  "1024x1024": "square_hd",
  "512x512": "square",
  "1792x1024": "landscape_16_9",
  "1024x1792": "portrait_16_9",
  "1024x768": "landscape_4_3",
  "768x1024": "portrait_4_3",
  "1536x1024": "landscape_3_2",
  "1024x1536": "portrait_3_2",
  "576x1024": "portrait_16_9",
  "1024x576": "landscape_16_9",
};

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

  collectMessageImageInputs(body, pushCandidate);

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
    // Caller-input URL — public-only + DNS-pinned policy lives in fetchUntrustedRemoteImage.
    const remoteImage = await fetchUntrustedRemoteImage(trimmed);
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

export function mapFalImageSize(size, fallback = "square_hd") {
  if (typeof size !== "string") return fallback;
  if (FAL_PRESET_SIZES[size]) return FAL_PRESET_SIZES[size];
  if (size.includes("x")) {
    const { width, height } = parseSizeToDimensions(size, 1024);
    return { width, height };
  }
  return fallback;
}

export function mapFalAspectRatio(size, fallback = "1:1") {
  if (!size) return fallback;
  return mapImageSize(size);
}

export function normalizeRecraftStyle(style) {
  if (style === "vivid") return "digital_illustration";
  if (style === "natural") return "realistic_image";
  return style;
}

export async function normalizeProviderImagePayload(payload, body, log, defaultFormat) {
  const candidates = [];

  const pushCandidate = (value) => {
    if (value === undefined || value === null) return;
    candidates.push(value);
  };

  collectProviderImageArrays(payload, pushCandidate);
  collectProviderImageFields(payload, pushCandidate);

  const normalized = [];
  for (const candidate of candidates) {
    const item = await normalizeProviderImageCandidate(candidate, body, defaultFormat);
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

async function normalizeProviderImageCandidate(candidate, body, defaultFormat) {
  const wantsBase64 = body?.response_format === "b64_json" || defaultFormat === "b64_json";
  let { url, b64 } = parseProviderImageCandidate(candidate);

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

export function firstString(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.length > 0) return value;
  }
  return null;
}

export function isHttpUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}
export function saveImageSuccessResult({
  provider,
  model,
  startTime,
  requestBody = null,
  responseBody = null,
  created = null,
  images,
  path = "/v1/images/generations",
}) {
  saveCallLog({
    method: "POST",
    path,
    status: 200,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    requestBody,
    responseBody,
  }).catch(() => {});

  return {
    success: true,
    data: {
      created: created || Math.floor(Date.now() / 1000),
      data: images,
    },
  };
}

export function saveImageErrorResult({
  provider,
  model,
  status,
  startTime,
  error,
  requestBody = null,
  path = "/v1/images/generations",
  // #8307: opt-in signal for executeImageWithCredentialFallback — set by a
  // provider handler when the failure is account/session-specific (expired
  // or blocked credentials) rather than a generic request/provider error, so
  // the retry loop tries the next eligible account even when the upstream
  // status isn't a plain 401. Defaults to unset (existing 401-only behavior
  // for every other provider is unchanged).
  retryable = undefined,
}: {
  provider: string;
  model: string;
  status: number;
  startTime: number;
  error: unknown;
  requestBody?: unknown;
  path?: string;
  retryable?: boolean;
}) {
  saveCallLog({
    method: "POST",
    path,
    status,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    error: stringifyImageErrorForLog(error).slice(0, 500),
    requestBody,
  }).catch(() => {});

  return {
    success: false,
    status,
    error,
    ...(retryable !== undefined ? { retryable } : {}),
  };
}

/**
 * Fetch a single image endpoint and normalize response
 */
export async function fetchImageEndpoint(
  url,
  headers,
  body,
  provider,
  log
): Promise<ImageEndpointResult> {
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
      const timeoutResult = getImageFetchTimeoutResult(err, provider, log);
      if (timeoutResult) return timeoutResult;
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
    const items = Array.isArray(data?.data) ? data.data : [];

    // Some providers return HTTP 2xx with an empty or malformed image
    // payload (empty data array, missing/blank b64_json and url). Treating that
    // as success makes image-combo strategies stop on the first leg and hand an
    // image-less 200 to the client. Require at least one usable image item and
    // surface an empty 2xx as a retryable 502 so combos fall back to the next
    // priority leg.
    const hasUsableImage = items.some(
      (item: unknown) =>
        isJsonObject(item) &&
        ((typeof item.b64_json === "string" && item.b64_json.length > 0) ||
          (typeof item.url === "string" && item.url.length > 0))
    );
    if (!hasUsableImage) {
      if (log) {
        log.warn(
          "IMAGE",
          `${provider} returned 200 without a usable image payload; treating as retryable 502`
        );
      }
      return {
        success: false,
        status: HTTP_STATUS.BAD_GATEWAY,
        error: sanitizeErrorMessage(
          "Image provider returned a success status without an image payload"
        ),
      };
    }

    return buildImageEndpointSuccess(data, items);
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
export function normalizePositiveNumber(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.floor(n);
}

function resolveConfiguredImageBaseUrl(credentials) {
  const psd = credentials?.providerSpecificData;
  const psdBaseUrl =
    psd && typeof psd === "object" && typeof psd.baseUrl === "string" && psd.baseUrl.trim()
      ? psd.baseUrl.trim()
      : null;
  const topLevelBaseUrl =
    typeof credentials?.baseUrl === "string" && credentials.baseUrl.trim()
      ? credentials.baseUrl.trim()
      : null;
  return psdBaseUrl || topLevelBaseUrl;
}

function collectMessageImageInputs(body, pushCandidate) {
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
}

function collectProviderImageArrays(payload, pushCandidate) {
  if (Array.isArray(payload?.data)) {
    for (const item of payload.data) pushCandidate(item);
  }

  if (Array.isArray(payload?.images)) {
    for (const item of payload.images) pushCandidate(item);
  }
}

function collectProviderImageFields(payload, pushCandidate) {
  if (payload?.image) pushCandidate({ b64_json: payload.image });
  if (payload?.url) pushCandidate({ url: payload.url });
  if (payload?.sample) pushCandidate({ url: payload.sample });
  if (payload?.result?.sample) pushCandidate({ url: payload.result.sample });
  if (Array.isArray(payload?.result?.images)) {
    for (const item of payload.result.images) pushCandidate(item);
  }
}

function parseProviderImageCandidate(candidate) {
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

  return { url, b64 };
}

function getImageFetchTimeoutResult(err: unknown, provider, log) {
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
      success: false as const,
      status: 504,
      error: `Image provider error: ${sanitizeErrorMessage(message || err)}`,
    };
  }
  return null;
}
