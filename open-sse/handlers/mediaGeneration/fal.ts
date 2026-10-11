import { saveCallLog } from "@/lib/usageDb";
import {
  FetchTimeoutError,
  fetchWithTimeout,
  getConfiguredTimeout,
} from "../../../src/shared/utils/fetchTimeout.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

type MediaKind = "video" | "music";

type FalBody = Record<string, unknown>;

type FalCredentials = {
  apiKey?: unknown;
  accessToken?: unknown;
};

type FalProviderConfig = {
  baseUrl: string;
};

type FalLog = {
  info?: (scope: string, message: string, meta?: unknown) => void;
  error?: (scope: string, message: string) => void;
};

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function stringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map(stringValue).filter((value): value is string => Boolean(value));
}

/**
 * fal model ids are `<owner>/<app>[/path]`. First-party apps live under the
 * `fal-ai` owner; third-party vendors publish under their own owner namespace
 * (bytedance, alibaba, minimax, …).
 *
 * The previous code recognised only `fal-ai/`, `xai/` and `google/` as
 * already-owned and prefixed everything else with `fal-ai/`, which rewrote
 * `bytedance/seedance-2.5/text-to-video` to
 * `fal-ai/bytedance/seedance-2.5/text-to-video`. fal reads the first segment as
 * the app name, so it answered 404 “Application bytedance not found” — leaving
 * every vendor-owned model unreachable even when the registry lists the owner
 * and the account is entitled to it.
 *
 * Owners derived from fal's public video catalogue (24 namespaces, ~157 models
 * that were previously unreachable). Extend the set if fal adds a vendor.
 */
const FAL_VENDOR_OWNERS = new Set([
  "fal-ai",
  "alibaba",
  "argil",
  "blackforestlabs",
  "bria",
  "bytedance",
  "cassetteai",
  "clarityai",
  "creatify",
  "decart",
  "elevenlabs",
  "google",
  "lightricks",
  "luma",
  "minimax",
  "mirage-api",
  "mirelo-ai",
  "moonvalley",
  "nvidia",
  "pixelcut",
  "sonilo",
  "topaz",
  "veed",
  "wan",
  "xai",
]);

/**
 * fal expects `<owner>/<app>[/path]`. An id that already carries a vendor owner
 * is used verbatim; anything else is a first-party app that needs `fal-ai/`.
 */
function falModelPath(resolvedModel: string): string {
  const owner = resolvedModel.split("/")[0];
  return FAL_VENDOR_OWNERS.has(owner) ? resolvedModel : `fal-ai/${resolvedModel}`;
}

function numberValue(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function falDuration(value: unknown, fallback: string): string {
  if (typeof value === "string" && /^(4|6|8)s$/.test(value)) return value;
  const numeric = numberValue(value);
  return numeric && [4, 6, 8].includes(numeric) ? `${numeric}s` : fallback;
}

/** Seconds from a caller-supplied duration, accepting `8`, `"8"` or `"8s"`. */
function falSeconds(value: unknown): number | undefined {
  const numeric = numberValue(value);
  if (numeric !== undefined) return numeric;
  if (typeof value === "string") {
    const match = value.trim().match(/^(\d+(?:\.\d+)?)s?$/);
    if (match) return Number(match[1]);
  }
  return undefined;
}

function clampInt(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round(value)));
}

/**
 * fal apps disagree on the duration wire format and only reject a mismatch with a
 * 422, so each format has to be encoded per app family:
 *   - fal-ai's own wrappers (Veo, LTX, …) take the `"8s"` string form
 *   - most vendor apps take a bare numeric string `"8"` (Seedance, Kling, …)
 *   - some take a bare number `8` (Wan)
 * `falDuration` above keeps the historical `"Ns"` default, and the overrides
 * below cover the families that were verified against fal's published OpenAPI
 * schemas. Add an entry here rather than changing the default, so models that
 * already work stay untouched.
 */
const FAL_DURATION_OVERRIDES: Array<{
  test: RegExp;
  encode: (seconds: number) => string | number;
  fallback: string | number;
}> = [
  // bytedance/seedance-*: string enum "auto" | "4" … "30"
  { test: /(?:^|\/)seedance-/, encode: (n) => String(clampInt(n, 4, 30)), fallback: "auto" },
  // fal-ai/kling-video/v3/*: string enum "3" … "15"
  { test: /kling-video\/v3\//, encode: (n) => String(clampInt(n, 3, 15)), fallback: "5" },
  // fal-ai/wan/* (and the wan/ owner): integer enum 2 … 15
  { test: /(?:^|\/)wan\//, encode: (n) => clampInt(n, 2, 15), fallback: 5 },
  // minimax/h3-*: bare integer 5 … 15 (verified against fal's OpenAPI:
  // `{"type": "integer", "minimum": 5, "maximum": 15, "default": 5}`)
  { test: /(?:^|\/)h3(?:-|\/)/, encode: (n) => clampInt(n, 5, 15), fallback: 5 },
];

/** Duration in the wire format the addressed fal app expects. */
function falDurationFor(model: string, value: unknown): string | number {
  const override = FAL_DURATION_OVERRIDES.find((entry) => entry.test.test(model));
  if (!override) return falDuration(value, "8s");
  const seconds = falSeconds(value);
  return seconds === undefined ? override.fallback : override.encode(seconds);
}

/**
 * fal apps disagree on the resolution wire format too. Most accept the lowercase
 * `"720p"` form, but some vendor apps publish an uppercase enum — MiniMax H3 uses
 * `"480P" | "768P" | "1080P"` and has no 720p tier at all — and reject a mismatch
 * with a 422. As with the duration overrides above, add an entry here rather than
 * changing the default, so models that already work stay untouched.
 */
const FAL_RESOLUTION_OVERRIDES: Array<{
  test: RegExp;
  encode: (resolution: string) => string;
}> = [
  // minimax/h3-*: uppercase enum "480P" | "768P" | "1080P". 720p has no tier on
  // this app, so it maps onto its native 768P mid-tier.
  {
    test: /(?:^|\/)h3(?:-|\/)/,
    encode: (r) => (r.startsWith("480") ? "480P" : r.startsWith("1080") ? "1080P" : "768P"),
  },
];

/** Resolution in the wire format the addressed fal app expects. */
function falResolutionFor(model: string, value: unknown, quality: unknown): string {
  const explicit = stringValue(value);
  const resolution = explicit || (quality === "hd" ? "1080p" : "720p");
  const override = FAL_RESOLUTION_OVERRIDES.find((entry) => entry.test.test(model));
  return override ? override.encode(resolution.toLowerCase()) : resolution;
}

function grokDuration(value: unknown, fallback = 6): number {
  const numeric = numberValue(value);
  if (numeric !== undefined) return Math.round(numeric);
  if (typeof value === "string") {
    const match = value.trim().match(/^(\d+)s$/);
    if (match) return Number(match[1]);
  }
  return fallback;
}

function geminiDuration(value: unknown, fallback = 8): number {
  const numeric = numberValue(value);
  const parsed =
    numeric ??
    (typeof value === "string" && /^\d+(?:\.\d+)?s$/.test(value.trim())
      ? Number(value.trim().slice(0, -1))
      : undefined);
  return parsed === undefined ? fallback : Math.min(10, Math.max(3, Math.round(parsed)));
}

export function buildFalVideoRequestBody(body: FalBody, model = ""): FalBody {
  if (model.startsWith("google/gemini-omni-flash")) {
    const request: FalBody = {
      prompt: stringValue(body.prompt) || "",
      aspect_ratio: stringValue(body.aspect_ratio) || "16:9",
      duration: geminiDuration(body.duration),
    };

    const imageUrl = stringValue(body.image_url) || stringArray(body.image_urls)[0];
    if (imageUrl) request.image_url = imageUrl;

    return request;
  }

  if (model.startsWith("xai/grok-imagine-video/")) {
    const request: FalBody = {
      prompt: stringValue(body.prompt) || "",
      aspect_ratio: stringValue(body.aspect_ratio) || "16:9",
      duration: grokDuration(body.duration),
      resolution: stringValue(body.resolution) || "720p",
    };

    const imageUrls = stringArray(body.image_urls);
    if (imageUrls.length === 1) {
      request.image_url = imageUrls[0];
    } else if (imageUrls.length > 1) {
      request.reference_image_urls = imageUrls;
    }

    return request;
  }

  const request: FalBody = {
    prompt: stringValue(body.prompt) || "",
    aspect_ratio: stringValue(body.aspect_ratio) || "16:9",
    duration: falDurationFor(model, body.duration),
    resolution: falResolutionFor(model, body.resolution, body.quality),
    generate_audio: typeof body.generate_audio === "boolean" ? body.generate_audio : true,
  };

  const optionalStringFields = ["negative_prompt", "safety_tolerance"];
  for (const field of optionalStringFields) {
    const value = stringValue(body[field]);
    if (value) request[field] = value;
  }

  const seed = numberValue(body.seed);
  if (seed !== undefined) request.seed = seed;
  if (typeof body.auto_fix === "boolean") request.auto_fix = body.auto_fix;

  return request;
}

function resolveFalModel(model: string, body: FalBody, kind: MediaKind): string {
  if (kind !== "video") return model;

  if (model.startsWith("google/gemini-omni-flash") && !model.endsWith("/image-to-video")) {
    const hasImage = typeof body.image_url === "string" || stringArray(body.image_urls).length > 0;
    return hasImage ? "google/gemini-omni-flash/image-to-video" : model;
  }

  if (!model.startsWith("xai/grok-imagine-video/")) return model;

  const suffix = Array.isArray(body.reference_image_urls)
    ? "reference-to-video"
    : typeof body.image_url === "string"
      ? "image-to-video"
      : "text-to-video";
  return `xai/grok-imagine-video/${suffix}`;
}

export function buildFalMusicRequestBody(body: FalBody): FalBody {
  const request: FalBody = {
    tags: stringValue(body.tags) || stringValue(body.prompt) || "",
  };

  const lyrics = stringValue(body.lyrics);
  if (lyrics) request.lyrics = lyrics;

  const duration = numberValue(body.duration);
  if (duration !== undefined) request.duration = Math.min(240, Math.max(5, duration));

  const seed = numberValue(body.seed);
  if (seed !== undefined) request.seed = seed;

  const optionalNumberFields = [
    "number_of_steps",
    "granularity_scale",
    "guidance_interval",
    "guidance_interval_decay",
    "tag_guidance_scale",
    "lyric_guidance_scale",
    "minimum_guidance_scale",
    "guidance_scale",
  ];
  for (const field of optionalNumberFields) {
    const value = numberValue(body[field]);
    if (value !== undefined) request[field] = value;
  }

  const scheduler = stringValue(body.scheduler);
  if (scheduler === "euler" || scheduler === "heun") request.scheduler = scheduler;

  const guidanceType = stringValue(body.guidance_type);
  if (guidanceType === "cfg" || guidanceType === "apg" || guidanceType === "cfg_star") {
    request.guidance_type = guidanceType;
  }

  return request;
}

function extensionFromMedia(item: Record<string, unknown>, kind: MediaKind): string {
  const contentType = stringValue(item.content_type);
  if (contentType?.includes("/")) return contentType.split("/", 2)[1];

  const fileName = stringValue(item.file_name);
  const url = stringValue(item.url);
  const candidate = fileName || url || "";
  const extension = candidate.match(/\.([a-z0-9]+)(?:\?|$)/i)?.[1]?.toLowerCase();
  return extension || (kind === "video" ? "mp4" : "wav");
}

export function normalizeFalMediaResult(payload: unknown, kind: MediaKind) {
  const record = payload && typeof payload === "object" ? (payload as FalBody) : {};
  const media = record[kind === "video" ? "video" : "audio"];
  const item = media && typeof media === "object" ? (media as Record<string, unknown>) : null;
  const url = stringValue(item?.url);

  if (!url) {
    return {
      success: false as const,
      status: 502,
      error: `Fal ${kind} generation returned no media URL`,
    };
  }

  return {
    success: true as const,
    data: {
      created: numberValue(record.created) || 0,
      data: [{ url, format: extensionFromMedia(item, kind) }],
    },
  };
}

function absoluteFalUrl(value: unknown, baseUrl: string): string | undefined {
  const url = stringValue(value);
  if (!url) return undefined;
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `${baseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
}

function getToken(credentials: FalCredentials | null | undefined): string {
  return String(credentials?.apiKey || credentials?.accessToken || "");
}

async function wait(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function runFalQueue({
  model,
  body,
  kind,
  provider,
  providerConfig,
  credentials,
  log,
}: {
  model: string;
  body: FalBody;
  kind: MediaKind;
  provider: string;
  providerConfig: FalProviderConfig;
  credentials: FalCredentials | null | undefined;
  log?: FalLog | null;
}) {
  const startTime = Date.now();
  const baseUrl = providerConfig.baseUrl.replace(/\/$/, "");
  const token = getToken(credentials);
  // Missing-credential guard — do not send an unauthenticated request upstream.
  // The standalone falHandler.ts this module superseded (#9982/#10198 over
  // #9969) returned this local 401; preserve that contract.
  if (!token) {
    return { success: false, status: 401, error: "Fal API key is required" };
  }
  const headers = {
    Authorization: `Key ${token}`,
    "Content-Type": "application/json",
  };
  const timeoutMs = getConfiguredTimeout();
  const deadline = startTime + timeoutMs;
  const resolvedModel = resolveFalModel(model, body, kind);
  const falModel = falModelPath(resolvedModel);
  const queueUrl = `${baseUrl}/${falModel}`;

  try {
    const createResponse = await fetchWithTimeout(queueUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      timeoutMs,
    });
    const createPayload = await createResponse.json().catch(() => ({}));

    if (!createResponse.ok) {
      const error = JSON.stringify(createPayload).slice(0, 500);
      log?.error?.(
        "MEDIA",
        `${provider} ${kind} create failed (${createResponse.status}): ${error}`
      );
      saveCallLog({
        method: "POST",
        path: `/v1/${kind === "video" ? "videos" : "music"}/generations`,
        status: createResponse.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error,
      }).catch(() => {});
      return { success: false, status: createResponse.status, error };
    }

    const requestId = stringValue(createPayload?.request_id);
    if (!requestId) {
      const normalized = normalizeFalMediaResult(createPayload, kind);
      if (!normalized.success) return normalized;
      return normalized;
    }

    const statusUrl =
      absoluteFalUrl(createPayload.status_url, baseUrl) ||
      `${queueUrl}/requests/${requestId}/status`;
    const responseUrl =
      absoluteFalUrl(createPayload.response_url, baseUrl) || `${queueUrl}/requests/${requestId}`;

    while (Date.now() < deadline) {
      const statusResponse = await fetchWithTimeout(statusUrl, {
        headers: { Authorization: `Key ${token}` },
        timeoutMs: Math.min(getConfiguredTimeout(), Math.max(1000, deadline - Date.now())),
      });
      const statusPayload = await statusResponse.json().catch(() => ({}));

      if (!statusResponse.ok) {
        const error = JSON.stringify(statusPayload).slice(0, 500);
        return { success: false, status: statusResponse.status, error };
      }

      const status = stringValue(statusPayload?.status);
      if (status === "COMPLETED") {
        const resultResponse = await fetchWithTimeout(responseUrl, {
          headers: { Authorization: `Key ${token}` },
          timeoutMs: Math.min(getConfiguredTimeout(), Math.max(1000, deadline - Date.now())),
        });
        const resultPayload = await resultResponse.json().catch(() => ({}));
        if (!resultResponse.ok) {
          return {
            success: false,
            status: resultResponse.status,
            error: JSON.stringify(resultPayload).slice(0, 500),
          };
        }

        const normalized = normalizeFalMediaResult(resultPayload, kind);
        saveCallLog({
          method: "POST",
          path: `/v1/${kind === "video" ? "videos" : "music"}/generations`,
          status: normalized.success ? 200 : normalized.status,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          ...(normalized.success ? {} : { error: normalized.error }),
        }).catch(() => {});
        return normalized;
      }

      if (status && !["IN_QUEUE", "IN_PROGRESS"].includes(status)) {
        return {
          success: false,
          status: 502,
          error: `Fal ${kind} generation ended with status ${status}`,
        };
      }

      await wait(Math.min(1000, Math.max(100, deadline - Date.now())));
    }

    return {
      success: false,
      status: 504,
      error: `Fal ${kind} generation timed out after ${timeoutMs}ms`,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const isTimeout =
      error instanceof FetchTimeoutError || (error as { name?: string })?.name === "AbortError";
    const status = isTimeout ? 504 : 502;
    log?.error?.("MEDIA", `${provider} ${kind} request failed: ${sanitizeErrorMessage(message)}`);
    return {
      success: false,
      status,
      error: `Fal ${kind} provider error: ${sanitizeErrorMessage(message)}`,
    };
  }
}

export function handleFalVideoGeneration(args: {
  model: string;
  provider: string;
  providerConfig: FalProviderConfig;
  body: FalBody;
  credentials: FalCredentials | null | undefined;
  log?: FalLog | null;
}) {
  return runFalQueue({
    ...args,
    body: buildFalVideoRequestBody(args.body, args.model),
    kind: "video",
  });
}

export function handleFalMusicGeneration(args: {
  model: string;
  provider: string;
  providerConfig: FalProviderConfig;
  body: FalBody;
  credentials: FalCredentials | null | undefined;
  log?: FalLog | null;
}) {
  return runFalQueue({ ...args, body: buildFalMusicRequestBody(args.body), kind: "music" });
}
