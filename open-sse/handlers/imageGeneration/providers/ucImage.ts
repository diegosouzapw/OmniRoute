// UC (uncensored.com) image-generation handler.
// Family: uc-image | Provider: uc
//
// UC exposes image generation on TWO surfaces, and this handler serves both,
// picking by which credential is present:
//
//   (A) PERSONA WEB path (un-metered, Clerk-authenticated). No API key: the
//       durable Clerk `__client` cookie lives in the connection's
//       providerSpecificData, from which we mint a short-lived `__session` JWT
//       (mintUcSessionToken) and call:
//         POST https://internal.chatuncensored.ai/v2/image-gen
//           Authorization: Bearer <jwt>, Origin/Referer https://uncensored.com
//           body {prompt, mode:"dev", model_version, m_n_user, moderationMode,
//                 imageHeight, imageWidth, country, aspect_ratio, vdiscount}
//       The response is IMMEDIATE and carries a PRE-DETERMINED result URL:
//         {status:"pending", url:"https://gen.moveinwater.com/img_{uid}_{uuid}.png",
//          request_id}
//       We then POLL that url with GET until HTTP 200 (~4s typical), returning
//       the final url as an OpenAI images response.
//
//   (B) uc-direct REST path (metered, OpenAI-compatible). A `uai_sk_live_...`
//       X-api-key credential is present, so we call the official REST endpoint:
//         POST https://api.uncensored.com/api/v1/images/generations
//           X-api-key: <key>
//           body {model, prompt, n, size}
//       The response is already OpenAI-shaped ({created, data:[{url}|{b64_json}]}).
//
// Residential egress / TLS (if any) is applied transparently at the infra layer;
// nothing egress-specific lives here. The handler is pure and testable: fetch and
// sleep are injectable so unit tests drive the pending→poll→200 sequence with no
// live network.

import { resolveUcCredential } from "../../../executors/uc/credentials.ts";
import { mintUcSessionToken } from "../../../executors/uc/clerkAuth.ts";
import { UC_ORIGIN } from "../../../executors/uc/constants.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "../../imageGeneration.ts";

/** Persona web image-gen endpoint (immediate response + result-URL polling). */
export const UC_PERSONA_IMAGE_URL = "https://internal.chatuncensored.ai/v2/image-gen";
/** uc-direct metered REST endpoint (OpenAI-compatible). */
export const UC_DIRECT_IMAGE_URL = "https://api.uncensored.com/api/v1/images/generations";

const UC_IMAGE_N_MAX = 4;
const UC_POLL_TIMEOUT_MS_DEFAULT = 60_000;
const UC_POLL_INTERVAL_MS_DEFAULT = 2_000;

/** Aspect ratios UC's web picker accepts, mapped to imageWidth/imageHeight strings. */
const UC_ASPECT_SIZES: Record<string, { imageWidth: string; imageHeight: string }> = {
  "1:1": { imageWidth: "1024", imageHeight: "1024" },
  "16:9": { imageWidth: "1024", imageHeight: "576" },
  "9:16": { imageWidth: "576", imageHeight: "1024" },
  "4:3": { imageWidth: "1024", imageHeight: "768" },
  "3:4": { imageWidth: "768", imageHeight: "1024" },
};

const UC_DEFAULT_ASPECT = "1:1";

/**
 * Strip a routing prefix (`uc/` or `uc-direct/`) and return the canonical UC
 * image model id (the web picker's `model_version` shortname / the REST `model`).
 */
export function resolveUcImageModel(model: unknown): string {
  let m = typeof model === "string" ? model.trim() : "";
  if (m.startsWith("uc-direct/")) m = m.slice("uc-direct/".length);
  else if (m.startsWith("uc/")) m = m.slice("uc/".length);
  return m;
}

/**
 * Resolve an aspect ratio to the {aspect_ratio, imageWidth, imageHeight} the UC
 * persona web body expects (width/height are STRINGS). Accepts either an explicit
 * aspect ratio (`"16:9"`) or an OpenAI-style `"WxH"` size, which is snapped to the
 * nearest supported bucket. Unknown/absent input defaults to 1:1.
 */
export function ucAspectToSize(aspectOrSize: unknown): {
  aspect_ratio: string;
  imageWidth: string;
  imageHeight: string;
} {
  const raw = typeof aspectOrSize === "string" ? aspectOrSize.trim() : "";

  // Explicit aspect ratio (e.g. "16:9").
  if (raw && UC_ASPECT_SIZES[raw]) {
    return { aspect_ratio: raw, ...UC_ASPECT_SIZES[raw] };
  }

  // OpenAI-style "WxH" -> nearest aspect bucket by ratio.
  if (raw.includes("x")) {
    const [wRaw, hRaw] = raw.split("x");
    const w = Number(wRaw);
    const h = Number(hRaw);
    if (Number.isFinite(w) && Number.isFinite(h) && w > 0 && h > 0) {
      const target = w / h;
      let best = UC_DEFAULT_ASPECT;
      let bestDelta = Infinity;
      for (const [aspect, dims] of Object.entries(UC_ASPECT_SIZES)) {
        const r = Number(dims.imageWidth) / Number(dims.imageHeight);
        const delta = Math.abs(r - target);
        if (delta < bestDelta) {
          bestDelta = delta;
          best = aspect;
        }
      }
      return { aspect_ratio: best, ...UC_ASPECT_SIZES[best] };
    }
  }

  return { aspect_ratio: UC_DEFAULT_ASPECT, ...UC_ASPECT_SIZES[UC_DEFAULT_ASPECT] };
}

/** Extract OpenAI image data[] items from a uc-direct REST response. */
export function extractUcDirectImages(json: unknown): Array<{ url?: string; b64_json?: string }> {
  const data =
    json && typeof json === "object" && Array.isArray((json as Record<string, unknown>).data)
      ? ((json as Record<string, unknown>).data as unknown[])
      : [];
  const out: Array<{ url?: string; b64_json?: string }> = [];
  for (const it of data) {
    if (it && typeof it === "object") {
      const rec = it as Record<string, unknown>;
      if (typeof rec.url === "string" && rec.url) out.push({ url: rec.url });
      else if (typeof rec.b64_json === "string" && rec.b64_json)
        out.push({ b64_json: rec.b64_json });
    }
  }
  return out;
}

function normalizePositiveNumber(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

type SleepImpl = (ms: number) => Promise<void>;
const realSleep: SleepImpl = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

interface UcImageBody {
  prompt?: unknown;
  size?: unknown;
  aspect_ratio?: unknown;
  n?: unknown;
  timeout_ms?: unknown;
  poll_interval_ms?: unknown;
}

interface UcImageCredentials {
  apiKey?: string;
  accessToken?: string;
  providerSpecificData?: Record<string, unknown> | null;
}

interface UcImageHandlerArgs {
  model: string;
  provider: string;
  body: UcImageBody;
  credentials: UcImageCredentials;
  log?: { info?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void };
  signal?: AbortSignal;
  fetchImpl?: typeof fetch;
  sleepImpl?: SleepImpl;
}

/** True when the credential is a uc-direct metered API key (`uai_sk_live_...`). */
function isUcDirectCredential(credentials: UcImageCredentials): boolean {
  const key = typeof credentials?.apiKey === "string" ? credentials.apiKey.trim() : "";
  return key.startsWith("uai_");
}

/**
 * PERSONA WEB path (surface A): mint a Clerk JWT, POST the image-gen request,
 * then poll the pre-determined result URL until it returns 200.
 */
async function handleUcPersonaImage(
  args: Required<Pick<UcImageHandlerArgs, "model" | "provider" | "body" | "credentials">> &
    Pick<UcImageHandlerArgs, "log" | "signal"> & {
      fetchImpl: typeof fetch;
      sleepImpl: SleepImpl;
      startTime: number;
      prompt: string;
    }
) {
  const {
    model,
    provider,
    body,
    credentials,
    log,
    signal,
    fetchImpl,
    sleepImpl,
    startTime,
    prompt,
  } = args;

  const cred = resolveUcCredential(credentials?.providerSpecificData);
  if (!cred) {
    return saveImageErrorResult({
      provider,
      model,
      status: 401,
      startTime,
      error: "UC persona credentials missing (need clientCookie + sid + uid)",
      retryable: true,
    });
  }

  const mint = await mintUcSessionToken({
    sid: cred.sid,
    cookies: cred.cookies,
    fetchImpl,
    signal,
  });
  if (!mint.ok || !mint.token) {
    return saveImageErrorResult({
      provider,
      model,
      status: mint.status === 0 ? 502 : mint.status,
      startTime,
      error: sanitizeErrorMessage(mint.error || "UC Clerk token mint failed"),
      // 401/403 = durable login lapsed or revoked: rotate to the next account.
      retryable: mint.status === 401 || mint.status === 403,
    });
  }

  const modelVersion = resolveUcImageModel(model);
  const { aspect_ratio, imageWidth, imageHeight } = ucAspectToSize(body.aspect_ratio ?? body.size);
  const requestBody = {
    prompt,
    mode: "dev",
    model_version: modelVersion,
    m_n_user: true,
    moderationMode: "SUPER_LIGHT",
    imageHeight,
    imageWidth,
    country: "US",
    aspect_ratio,
    vdiscount: false,
  };
  const headers: Record<string, string> = {
    Authorization: `Bearer ${mint.token.jwt}`,
    Origin: UC_ORIGIN,
    Referer: UC_ORIGIN + "/",
    "Content-Type": "application/json",
  };

  let resp: Response;
  try {
    resp = await fetchImpl(UC_PERSONA_IMAGE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
      signal,
    });
  } catch (err) {
    const errorText = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    log?.error?.("IMAGE", `${provider} uc-image (persona) transport error: ${errorText}`);
    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: errorText,
      requestBody,
    });
  }

  if (!resp.ok) {
    const detail = (await resp.text().catch(() => "")).slice(0, 500);
    log?.error?.("IMAGE", `${provider} uc-image (persona) error ${resp.status}: ${detail}`);
    return saveImageErrorResult({
      provider,
      model,
      status: resp.status,
      startTime,
      error: detail || `UC persona image generation failed (HTTP ${resp.status})`,
      requestBody,
      retryable: resp.status === 401 || resp.status === 403,
    });
  }

  let json: unknown;
  try {
    json = await resp.json();
  } catch {
    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: "UC persona returned a non-JSON image response",
      requestBody,
    });
  }

  const resultUrl =
    json && typeof json === "object" && typeof (json as Record<string, unknown>).url === "string"
      ? ((json as Record<string, unknown>).url as string)
      : "";
  if (!resultUrl) {
    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: "UC persona image response carried no result url",
      requestBody,
    });
  }

  const timeoutMs = normalizePositiveNumber(
    body.timeout_ms,
    normalizePositiveNumber(process.env.UC_IMAGE_POLL_TIMEOUT_MS, UC_POLL_TIMEOUT_MS_DEFAULT)
  );
  const pollIntervalMs = normalizePositiveNumber(
    body.poll_interval_ms,
    normalizePositiveNumber(process.env.UC_IMAGE_POLL_INTERVAL_MS, UC_POLL_INTERVAL_MS_DEFAULT)
  );

  const poll = await pollUcResultUrl(
    resultUrl,
    timeoutMs,
    pollIntervalMs,
    fetchImpl,
    sleepImpl,
    signal,
    log
  );
  if (poll.state === "failed") {
    log?.error?.("IMAGE", `${provider} uc-image (persona) poll ${poll.status}: ${poll.error}`);
    return saveImageErrorResult({
      provider,
      model,
      status: poll.status,
      startTime,
      error: poll.error,
      requestBody,
    });
  }

  return saveImageSuccessResult({
    provider,
    model,
    startTime,
    requestBody,
    responseBody: { images_count: 1 },
    images: [{ url: resultUrl }],
  });
}

type UcPollOutcome = { state: "ready" } | { state: "failed"; status: number; error: string };

/** Poll the pre-determined result URL with GET until HTTP 200, or time out. */
async function pollUcResultUrl(
  url: string,
  timeoutMs: number,
  pollIntervalMs: number,
  fetchImpl: typeof fetch,
  sleepImpl: SleepImpl,
  signal: AbortSignal | undefined,
  log?: { info?: (...args: unknown[]) => void }
): Promise<UcPollOutcome> {
  const deadline = Date.now() + timeoutMs;
  let attempt = 0;
  // Poll at least once even when timeoutMs is 0.
  do {
    attempt += 1;
    let resp: Response;
    try {
      resp = await fetchImpl(url, { method: "GET", signal });
    } catch (err) {
      return {
        state: "failed",
        status: 502,
        error: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
      };
    }
    if (resp.ok) return { state: "ready" };
    // 403/404 = not ready yet; anything else is a hard failure.
    if (resp.status !== 403 && resp.status !== 404) {
      return {
        state: "failed",
        status: resp.status,
        error: `UC result URL returned HTTP ${resp.status}`,
      };
    }
    log?.info?.("IMAGE", `uc-image result pending, poll #${attempt} in ${pollIntervalMs}ms`);
    if (Date.now() + pollIntervalMs >= deadline) break;
    await sleepImpl(pollIntervalMs);
  } while (Date.now() < deadline);

  return {
    state: "failed",
    status: 504,
    error: "UC image generation timed out waiting for a result",
  };
}

/**
 * uc-direct REST path (surface B): OpenAI-compatible metered endpoint keyed by
 * `X-api-key`. The response is already OpenAI-shaped.
 */
async function handleUcDirectImage(
  args: Required<Pick<UcImageHandlerArgs, "model" | "provider" | "body" | "credentials">> &
    Pick<UcImageHandlerArgs, "log" | "signal"> & {
      fetchImpl: typeof fetch;
      startTime: number;
      prompt: string;
    }
) {
  const { model, provider, body, credentials, log, signal, fetchImpl, startTime, prompt } = args;

  const apiKey = typeof credentials.apiKey === "string" ? credentials.apiKey.trim() : "";
  const canonicalModel = resolveUcImageModel(model);
  const nRaw = Number(body.n);
  const n = Number.isFinite(nRaw) && nRaw >= 1 ? Math.min(Math.floor(nRaw), UC_IMAGE_N_MAX) : 1;
  const requestBody: Record<string, unknown> = {
    model: canonicalModel,
    prompt,
    n,
  };
  if (typeof body.size === "string" && body.size.trim()) requestBody.size = body.size.trim();

  const headers: Record<string, string> = {
    "X-api-key": apiKey,
    "Content-Type": "application/json",
  };

  let resp: Response;
  try {
    resp = await fetchImpl(UC_DIRECT_IMAGE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
      signal,
    });
  } catch (err) {
    const errorText = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    log?.error?.("IMAGE", `${provider} uc-image (direct) transport error: ${errorText}`);
    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: errorText,
      requestBody,
    });
  }

  if (!resp.ok) {
    const detail = (await resp.text().catch(() => "")).slice(0, 500);
    log?.error?.("IMAGE", `${provider} uc-image (direct) error ${resp.status}: ${detail}`);
    return saveImageErrorResult({
      provider,
      model,
      status: resp.status,
      startTime,
      error: detail || `UC direct image generation failed (HTTP ${resp.status})`,
      requestBody,
      // 429 = rate limit (retry another account/later). 402 funds / 403 moderation
      // are non-retryable per the REST error contract.
      retryable: resp.status === 429 || undefined,
    });
  }

  let json: unknown;
  try {
    json = await resp.json();
  } catch {
    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: "UC direct returned a non-JSON image response",
      requestBody,
    });
  }

  const images = extractUcDirectImages(json);
  if (images.length === 0) {
    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: "UC direct image generation returned no images",
      requestBody,
    });
  }

  const created =
    json &&
    typeof json === "object" &&
    typeof (json as Record<string, unknown>).created === "number"
      ? ((json as Record<string, unknown>).created as number)
      : null;

  return saveImageSuccessResult({
    provider,
    model,
    startTime,
    requestBody,
    responseBody: { images_count: images.length },
    created,
    images,
  });
}

export async function handleUcImageGeneration({
  model,
  provider,
  body,
  credentials,
  log,
  signal,
  fetchImpl = fetch,
  sleepImpl = realSleep,
}: UcImageHandlerArgs) {
  const startTime = Date.now();

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: "Prompt is required for UC image generation",
    });
  }

  if (isUcDirectCredential(credentials)) {
    return handleUcDirectImage({
      model,
      provider,
      body,
      credentials,
      log,
      signal,
      fetchImpl,
      startTime,
      prompt,
    });
  }
  return handleUcPersonaImage({
    model,
    provider,
    body,
    credentials,
    log,
    signal,
    fetchImpl,
    sleepImpl,
    startTime,
    prompt,
  });
}
