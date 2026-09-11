// UC (uncensored.com) video-generation handler.
// Family: uc-video | Provider: uc
//
// UC exposes video generation on TWO surfaces, and this handler serves both,
// picking by which credential is present (mirrors the sibling image handler,
// imageGeneration/providers/ucImage.ts):
//
//   (A) PERSONA WEB path (un-metered, Clerk-authenticated). No API key: the
//       durable Clerk `__client` cookie lives in the connection's
//       providerSpecificData, from which we mint a short-lived `__session` JWT
//       (mintUcSessionToken). Two sub-cases keyed on whether the request carries
//       an input image:
//
//         • text-to-video (no input image):
//             POST https://internal.chatuncensored.ai/text_to_video
//               {prompt, model, num_frames, frames_per_second, num_inference_steps,
//                guide_scale, shift, aspect_ratio, pro_mode, turbo, resolution,
//                sora_resolution, seconds, video_to_video_duration, vdiscount}
//           NOTE: `/text_to_video` is the documented sibling of `/image_to_video`
//           but was NOT directly HAR-captured (only `/image_to_video` was). The
//           wire shape here mirrors `/image_to_video` minus the blob fields; if a
//           live capture later shows a different path/body, adjust here. See
//           UC-MEDIA-GENERATION.md lines 44-97.
//
//         • image-to-video (has an input image): a 3-step upload+generate flow:
//             (1) POST https://internal-6.pubyar.com/generate-signed-url
//                   {content_type:"image/png", user_identifier:<uid>}
//                 -> {signed_url:"https://d.moveinwater.com/up/<token>", blob_name}
//             (2) PUT <signed_url> with the raw image bytes
//             (3) POST https://internal.chatuncensored.ai/image_to_video
//                   {prompt, media_blob_name:<blob_name>, num_frames:81, ...,
//                    model:"wan-2.2-spicy", seconds:5, ...}
//
//       Both persona POSTs carry Authorization: Bearer <clerk jwt> plus
//       Origin/Referer https://uncensored.com. The generate response carries a
//       PRE-DETERMINED result URL (https://videogen.moveinwater.com/<blob>) plus
//       eta_seconds / timeout_seconds. We then POLL that url with HEAD until
//       HTTP 200 (403 = not ready), bounded by timeout_seconds.
//
//   (B) uc-direct REST path (metered, OpenAI-compatible). A `uai_sk_live_...`
//       X-api-key credential is present, so we call the official REST endpoint:
//         POST https://api.uncensored.com/api/v1/videos/generations
//           X-api-key: <key>
//           body {model, prompt, ...}
//       The endpoint is async: the response carries a job (status + optional
//       status_url). We poll status_url until the job completes and returns a
//       video url, or return the job id when the backend is callback-only.
//
// Residential egress / TLS (if any) is applied transparently at the infra layer;
// nothing egress-specific lives here. The handler is pure and testable: fetch and
// sleep are injectable so unit tests drive the upload -> generate -> poll sequence
// with no live network.

import { resolveUcCredential } from "../../../executors/uc/credentials.ts";
import { mintUcSessionToken } from "../../../executors/uc/clerkAuth.ts";
import { UC_ORIGIN } from "../../../executors/uc/constants.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

/** Persona signed-upload-URL endpoint (for the image-to-video input image). */
export const UC_PERSONA_SIGNED_URL = "https://internal-6.pubyar.com/generate-signed-url";
/** Persona image-to-video generation endpoint. */
export const UC_PERSONA_IMAGE_TO_VIDEO_URL = "https://internal.chatuncensored.ai/image_to_video";
/** Persona text-to-video generation endpoint (documented sibling; see file header). */
export const UC_PERSONA_TEXT_TO_VIDEO_URL = "https://internal.chatuncensored.ai/text_to_video";
/** uc-direct metered REST endpoint (OpenAI-compatible, async). */
export const UC_DIRECT_VIDEO_URL = "https://api.uncensored.com/api/v1/videos/generations";

/** Default persona web video model (the picker default). */
export const UC_DEFAULT_VIDEO_MODEL = "wan-2.2-spicy";

const UC_POLL_TIMEOUT_MS_DEFAULT = 300_000;
const UC_POLL_INTERVAL_MS_DEFAULT = 3_000;

type SleepImpl = (ms: number) => Promise<void>;
const realSleep: SleepImpl = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

interface UcVideoLog {
  info?: (...args: unknown[]) => void;
  error?: (...args: unknown[]) => void;
}

interface UcVideoBody {
  prompt?: unknown;
  // Any of these signal an image-to-video request (a data URL, http(s) URL, or
  // bare base64 payload for the first frame).
  image?: unknown;
  image_url?: unknown;
  input_image?: unknown;
  media?: unknown;
  // Optional web knobs (fall back to the capture-confirmed defaults).
  model?: unknown;
  num_frames?: unknown;
  frames_per_second?: unknown;
  num_inference_steps?: unknown;
  guide_scale?: unknown;
  shift?: unknown;
  aspect_ratio?: unknown;
  pro_mode?: unknown;
  turbo?: unknown;
  resolution?: unknown;
  sora_resolution?: unknown;
  seconds?: unknown;
  duration?: unknown;
  size?: unknown;
  timeout_ms?: unknown;
  poll_interval_ms?: unknown;
  [key: string]: unknown;
}

interface UcVideoCredentials {
  apiKey?: string;
  accessToken?: string;
  providerSpecificData?: Record<string, unknown> | null;
}

interface UcVideoHandlerArgs {
  model: string;
  provider?: string;
  body: UcVideoBody;
  credentials: UcVideoCredentials;
  /** Optional; falls back to `body.prompt`. */
  prompt?: string;
  log?: UcVideoLog | null;
  signal?: AbortSignal;
  fetchImpl?: typeof fetch;
  sleepImpl?: SleepImpl;
}

type UcVideoResult =
  | {
      success: true;
      data: {
        created: number;
        data: Array<{
          url?: string;
          b64_json?: string;
          format?: string;
          request_id?: string;
          status?: string;
        }>;
      };
    }
  | { success: false; status: number; error: string; retryable?: boolean };

/**
 * Strip a routing prefix (`uc/` or `uc-direct/`) and return the canonical UC
 * video model id (the web picker shortname / the REST `model`). Empty input
 * falls back to the persona default (`wan-2.2-spicy`).
 */
export function resolveUcVideoModel(model: unknown): string {
  let m = typeof model === "string" ? model.trim() : "";
  if (m.startsWith("uc-direct/")) m = m.slice("uc-direct/".length);
  else if (m.startsWith("uc/")) m = m.slice("uc/".length);
  return m || UC_DEFAULT_VIDEO_MODEL;
}

/** True when the credential is a uc-direct metered API key (`uai_sk_live_...`). */
export function isUcDirectVideoCredential(credentials: UcVideoCredentials): boolean {
  const key = typeof credentials?.apiKey === "string" ? credentials.apiKey.trim() : "";
  return key.startsWith("uai_");
}

/** The first input-image field present on the body, or null for text-to-video. */
export function resolveUcInputImage(body: UcVideoBody): string | null {
  for (const v of [body.image, body.image_url, body.input_image, body.media]) {
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return null;
}

function normalizePositiveNumber(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function firstNumber(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Build the persona web generation body shared by text-to-video and
 * image-to-video. `mediaBlobName` (null for t2v) becomes `media_blob_name`.
 */
export function buildUcPersonaVideoBody(
  prompt: string,
  model: string,
  body: UcVideoBody,
  mediaBlobName: string | null
): Record<string, unknown> {
  const seconds = firstNumber(body.seconds ?? body.duration, 5);
  return {
    prompt,
    media_blob_name: mediaBlobName,
    num_frames: firstNumber(body.num_frames, 81),
    frames_per_second: firstNumber(body.frames_per_second, 16),
    num_inference_steps: firstNumber(body.num_inference_steps, 30),
    guide_scale: firstNumber(body.guide_scale, 5),
    shift: firstNumber(body.shift, 5),
    aspect_ratio: typeof body.aspect_ratio === "string" ? body.aspect_ratio : "auto",
    pro_mode: body.pro_mode === true,
    turbo: body.turbo === true,
    resolution: typeof body.resolution === "string" ? body.resolution : "480p",
    sora_resolution: typeof body.sora_resolution === "string" ? body.sora_resolution : "480p",
    end_frame_blob_name: null,
    model,
    seconds,
    video_to_video_duration: firstNumber(body.duration, seconds),
    vdiscount: false,
  };
}

/**
 * Extract a ready video URL (and any job/status hints) from a uc-direct REST
 * response. Tolerant of the several OpenAI-ish shapes the async endpoint may
 * return: `data:[{url}]`, top-level `url`/`video_url`, `video:{url}`, `output`.
 */
export function extractUcDirectVideo(json: unknown): {
  url?: string;
  statusUrl?: string;
  status?: string;
  requestId?: string;
} {
  if (!json || typeof json !== "object") return {};
  const rec = json as Record<string, unknown>;
  const out: { url?: string; statusUrl?: string; status?: string; requestId?: string } = {};

  if (typeof rec.status === "string") out.status = rec.status;
  if (typeof rec.status_url === "string") out.statusUrl = rec.status_url;
  const rid = rec.request_id ?? rec.id ?? rec.job_id;
  if (typeof rid === "string" && rid) out.requestId = rid;

  // data:[{url}]
  if (Array.isArray(rec.data)) {
    for (const it of rec.data) {
      if (it && typeof it === "object") {
        const item = it as Record<string, unknown>;
        if (typeof item.url === "string" && item.url) {
          out.url = item.url;
          break;
        }
      }
    }
  }
  // top-level url / video_url
  if (!out.url && typeof rec.url === "string" && rec.url) out.url = rec.url;
  if (!out.url && typeof rec.video_url === "string" && rec.video_url) out.url = rec.video_url;
  // video:{url}
  if (!out.url && rec.video && typeof rec.video === "object") {
    const vurl = (rec.video as Record<string, unknown>).url;
    if (typeof vurl === "string" && vurl) out.url = vurl;
  }
  // output (string url)
  if (!out.url && typeof rec.output === "string" && rec.output) out.url = rec.output;

  return out;
}

/** A uc-direct status is terminal-complete when the video is ready. */
function isDirectComplete(status: string | undefined, url: string | undefined): boolean {
  if (url) return true;
  const s = (status || "").toLowerCase();
  return (
    s === "complete" || s === "completed" || s === "succeeded" || s === "success" || s === "done"
  );
}

/** A uc-direct status is terminal-failed. */
function isDirectFailed(status: string | undefined): boolean {
  const s = (status || "").toLowerCase();
  return s === "failed" || s === "error" || s === "canceled" || s === "cancelled";
}

/** Decode an input image reference into raw bytes for the signed-URL PUT. */
async function resolveImageBytes(
  ref: string,
  fetchImpl: typeof fetch,
  signal: AbortSignal | undefined
): Promise<Uint8Array | null> {
  // data URL: data:image/png;base64,<payload>
  const dataMatch = /^data:[^;]*;base64,(.*)$/.exec(ref);
  if (dataMatch) {
    try {
      return new Uint8Array(Buffer.from(dataMatch[1], "base64"));
    } catch {
      return null;
    }
  }
  // http(s) URL: fetch the bytes.
  if (/^https?:\/\//i.test(ref)) {
    try {
      const resp = await fetchImpl(ref, { method: "GET", signal });
      if (!resp.ok) return null;
      const buf = await resp.arrayBuffer();
      return new Uint8Array(buf);
    } catch {
      return null;
    }
  }
  // Bare base64 payload.
  try {
    return new Uint8Array(Buffer.from(ref, "base64"));
  } catch {
    return null;
  }
}

type UcPollOutcome = { state: "ready" } | { state: "failed"; status: number; error: string };

/** Poll the pre-determined persona result URL with HEAD until HTTP 200, or time out. */
async function pollUcVideoUrl(
  url: string,
  timeoutMs: number,
  pollIntervalMs: number,
  fetchImpl: typeof fetch,
  sleepImpl: SleepImpl,
  signal: AbortSignal | undefined,
  log?: UcVideoLog | null
): Promise<UcPollOutcome> {
  const deadline = Date.now() + timeoutMs;
  let attempt = 0;
  // Poll at least once even when timeoutMs is 0.
  do {
    attempt += 1;
    let resp: Response;
    try {
      resp = await fetchImpl(url, { method: "HEAD", signal });
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
        error: `UC video result URL returned HTTP ${resp.status}`,
      };
    }
    log?.info?.("VIDEO", `uc-video result pending, poll #${attempt} in ${pollIntervalMs}ms`);
    if (Date.now() + pollIntervalMs >= deadline) break;
    await sleepImpl(pollIntervalMs);
  } while (Date.now() < deadline);

  return {
    state: "failed",
    status: 504,
    error: "UC video generation timed out waiting for a result",
  };
}

interface PersonaContext {
  model: string;
  provider: string;
  body: UcVideoBody;
  credentials: UcVideoCredentials;
  prompt: string;
  log?: UcVideoLog | null;
  signal?: AbortSignal;
  fetchImpl: typeof fetch;
  sleepImpl: SleepImpl;
}

/**
 * PERSONA WEB path (surface A): mint a Clerk JWT, then run either the
 * text-to-video POST or the image-to-video upload+generate flow, and poll the
 * pre-determined result URL until it returns 200.
 */
async function handleUcPersonaVideo(ctx: PersonaContext): Promise<UcVideoResult> {
  const { model, provider, body, credentials, prompt, log, signal, fetchImpl, sleepImpl } = ctx;

  const cred = resolveUcCredential(credentials?.providerSpecificData);
  if (!cred) {
    return {
      success: false,
      status: 401,
      error: "UC persona credentials missing (need clientCookie + sid + uid)",
      retryable: true,
    };
  }

  const mint = await mintUcSessionToken({
    sid: cred.sid,
    cookies: cred.cookies,
    fetchImpl,
    signal,
  });
  if (!mint.ok || !mint.token) {
    return {
      success: false,
      status: mint.status === 0 ? 502 : mint.status,
      error: sanitizeErrorMessage(mint.error || "UC Clerk token mint failed"),
      // 401/403 = durable login lapsed or revoked: rotate to the next account.
      retryable: mint.status === 401 || mint.status === 403,
    };
  }

  const jwt = mint.token.jwt;
  const authHeaders: Record<string, string> = {
    Authorization: `Bearer ${jwt}`,
    Origin: UC_ORIGIN,
    Referer: UC_ORIGIN + "/",
    "Content-Type": "application/json",
  };

  const canonicalModel = resolveUcVideoModel(model);
  const inputImage = resolveUcInputImage(body);

  let genUrl: string;
  let requestBody: Record<string, unknown>;

  if (inputImage) {
    // Image-to-video: (1) signed URL, (2) PUT bytes, (3) generate.
    const bytes = await resolveImageBytes(inputImage, fetchImpl, signal);
    if (!bytes) {
      return {
        success: false,
        status: 400,
        error: "UC image-to-video could not decode the input image",
      };
    }

    const signedBody = { content_type: "image/png", user_identifier: cred.uid };
    let signedResp: Response;
    try {
      signedResp = await fetchImpl(UC_PERSONA_SIGNED_URL, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(signedBody),
        signal,
      });
    } catch (err) {
      const errorText = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
      log?.error?.(
        "VIDEO",
        `${provider} uc-video (persona) signed-url transport error: ${errorText}`
      );
      return { success: false, status: 502, error: errorText };
    }
    if (!signedResp.ok) {
      const detail = (await signedResp.text().catch(() => "")).slice(0, 500);
      return {
        success: false,
        status: signedResp.status,
        error: detail || `UC signed-url request failed (HTTP ${signedResp.status})`,
        retryable: signedResp.status === 401 || signedResp.status === 403,
      };
    }
    let signedJson: unknown;
    try {
      signedJson = await signedResp.json();
    } catch {
      return { success: false, status: 502, error: "UC signed-url returned a non-JSON response" };
    }
    const signedRec = (signedJson && typeof signedJson === "object" ? signedJson : {}) as Record<
      string,
      unknown
    >;
    const signedUrl = typeof signedRec.signed_url === "string" ? signedRec.signed_url : "";
    const blobName = typeof signedRec.blob_name === "string" ? signedRec.blob_name : "";
    if (!signedUrl || !blobName) {
      return {
        success: false,
        status: 502,
        error: "UC signed-url response missing signed_url or blob_name",
      };
    }

    // (2) PUT the image bytes to the signed URL. Fresh copy so BodyInit is a
    // plain ArrayBuffer (not a possibly-shared buffer view).
    const putBody = new Uint8Array(bytes.byteLength);
    putBody.set(bytes);
    let putResp: Response;
    try {
      putResp = await fetchImpl(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": "image/png" },
        body: putBody,
        signal,
      });
    } catch (err) {
      const errorText = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
      log?.error?.("VIDEO", `${provider} uc-video (persona) upload transport error: ${errorText}`);
      return { success: false, status: 502, error: errorText };
    }
    if (!putResp.ok) {
      return {
        success: false,
        status: putResp.status,
        error: `UC input-image upload failed (HTTP ${putResp.status})`,
      };
    }

    genUrl = UC_PERSONA_IMAGE_TO_VIDEO_URL;
    requestBody = buildUcPersonaVideoBody(prompt, canonicalModel, body, blobName);
  } else {
    // Text-to-video: single generate POST (no media blob).
    genUrl = UC_PERSONA_TEXT_TO_VIDEO_URL;
    requestBody = buildUcPersonaVideoBody(prompt, canonicalModel, body, null);
  }

  let genResp: Response;
  try {
    genResp = await fetchImpl(genUrl, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(requestBody),
      signal,
    });
  } catch (err) {
    const errorText = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    log?.error?.("VIDEO", `${provider} uc-video (persona) generate transport error: ${errorText}`);
    return { success: false, status: 502, error: errorText };
  }
  if (!genResp.ok) {
    const detail = (await genResp.text().catch(() => "")).slice(0, 500);
    log?.error?.(
      "VIDEO",
      `${provider} uc-video (persona) generate error ${genResp.status}: ${detail}`
    );
    return {
      success: false,
      status: genResp.status,
      error: detail || `UC persona video generation failed (HTTP ${genResp.status})`,
      retryable: genResp.status === 401 || genResp.status === 403,
    };
  }

  let genJson: unknown;
  try {
    genJson = await genResp.json();
  } catch {
    return { success: false, status: 502, error: "UC persona returned a non-JSON video response" };
  }
  const genRec = (genJson && typeof genJson === "object" ? genJson : {}) as Record<string, unknown>;
  const resultUrl = typeof genRec.url === "string" ? genRec.url : "";
  if (!resultUrl) {
    return {
      success: false,
      status: 502,
      error: "UC persona video response carried no result url",
    };
  }
  const requestId = typeof genRec.request_id === "string" ? genRec.request_id : undefined;
  const timeoutSeconds = Number(genRec.timeout_seconds);

  const defaultTimeoutMs =
    Number.isFinite(timeoutSeconds) && timeoutSeconds > 0
      ? timeoutSeconds * 1000
      : normalizePositiveNumber(process.env.UC_VIDEO_POLL_TIMEOUT_MS, UC_POLL_TIMEOUT_MS_DEFAULT);
  const timeoutMs = normalizePositiveNumber(body.timeout_ms, defaultTimeoutMs);
  const pollIntervalMs = normalizePositiveNumber(
    body.poll_interval_ms,
    normalizePositiveNumber(process.env.UC_VIDEO_POLL_INTERVAL_MS, UC_POLL_INTERVAL_MS_DEFAULT)
  );

  const poll = await pollUcVideoUrl(
    resultUrl,
    timeoutMs,
    pollIntervalMs,
    fetchImpl,
    sleepImpl,
    signal,
    log
  );
  if (poll.state === "failed") {
    log?.error?.("VIDEO", `${provider} uc-video (persona) poll ${poll.status}: ${poll.error}`);
    return { success: false, status: poll.status, error: poll.error };
  }

  return {
    success: true,
    data: {
      created: Math.floor(Date.now() / 1000),
      data: [{ url: resultUrl, format: "mp4", ...(requestId ? { request_id: requestId } : {}) }],
    },
  };
}

interface DirectContext {
  model: string;
  provider: string;
  body: UcVideoBody;
  credentials: UcVideoCredentials;
  prompt: string;
  log?: UcVideoLog | null;
  signal?: AbortSignal;
  fetchImpl: typeof fetch;
  sleepImpl: SleepImpl;
}

/**
 * uc-direct REST path (surface B): OpenAI-compatible metered endpoint keyed by
 * `X-api-key`. Async: submit, then poll `status_url` until the video is ready,
 * or return the job id when the backend is callback-only.
 */
async function handleUcDirectVideo(ctx: DirectContext): Promise<UcVideoResult> {
  const { model, provider, body, credentials, prompt, log, signal, fetchImpl, sleepImpl } = ctx;

  const apiKey = typeof credentials.apiKey === "string" ? credentials.apiKey.trim() : "";
  const canonicalModel = resolveUcVideoModel(model);
  const requestBody: Record<string, unknown> = { model: canonicalModel, prompt };
  if (typeof body.size === "string" && body.size.trim()) requestBody.size = body.size.trim();
  if (typeof body.aspect_ratio === "string" && body.aspect_ratio.trim()) {
    requestBody.aspect_ratio = body.aspect_ratio.trim();
  }
  if (typeof body.resolution === "string" && body.resolution.trim())
    requestBody.resolution = body.resolution.trim();
  if (body.duration != null && Number.isFinite(Number(body.duration)))
    requestBody.duration = Number(body.duration);
  const inputImage = resolveUcInputImage(body);
  if (inputImage) requestBody.image = inputImage;

  const headers: Record<string, string> = {
    "X-api-key": apiKey,
    "Content-Type": "application/json",
  };

  let resp: Response;
  try {
    resp = await fetchImpl(UC_DIRECT_VIDEO_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
      signal,
    });
  } catch (err) {
    const errorText = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    log?.error?.("VIDEO", `${provider} uc-video (direct) transport error: ${errorText}`);
    return { success: false, status: 502, error: errorText };
  }

  if (!resp.ok) {
    const detail = (await resp.text().catch(() => "")).slice(0, 500);
    log?.error?.("VIDEO", `${provider} uc-video (direct) error ${resp.status}: ${detail}`);
    return {
      success: false,
      status: resp.status,
      error: detail || `UC direct video generation failed (HTTP ${resp.status})`,
      // 429 = rate limit (retry another account/later). 402 funds / 403 moderation
      // are non-retryable per the REST error contract.
      ...(resp.status === 429 ? { retryable: true } : {}),
    };
  }

  let json: unknown;
  try {
    json = await resp.json();
  } catch {
    return { success: false, status: 502, error: "UC direct returned a non-JSON video response" };
  }

  let extracted = extractUcDirectVideo(json);
  if (isDirectFailed(extracted.status)) {
    return {
      success: false,
      status: 502,
      error: `UC direct video job failed (status: ${extracted.status})`,
    };
  }

  // Already complete (sync-ish response carrying a url).
  if (isDirectComplete(extracted.status, extracted.url) && extracted.url) {
    return buildDirectSuccess(extracted.url, extracted.requestId, extracted.status);
  }

  // No status_url to poll -> callback-only job: return the job id so the caller
  // can reconcile via its own callback.
  if (!extracted.statusUrl) {
    if (extracted.requestId) {
      return {
        success: true,
        data: {
          created: Math.floor(Date.now() / 1000),
          data: [
            {
              request_id: extracted.requestId,
              status: extracted.status || "pending",
              format: "mp4",
            },
          ],
        },
      };
    }
    return {
      success: false,
      status: 502,
      error: "UC direct video job returned no url, status_url, or job id",
    };
  }

  // Poll status_url until complete or timeout.
  const statusUrl = extracted.statusUrl;
  const timeoutMs = normalizePositiveNumber(body.timeout_ms, UC_POLL_TIMEOUT_MS_DEFAULT);
  const pollIntervalMs = normalizePositiveNumber(
    body.poll_interval_ms,
    UC_POLL_INTERVAL_MS_DEFAULT
  );
  const deadline = Date.now() + timeoutMs;
  let attempt = 0;
  do {
    attempt += 1;
    let statusResp: Response;
    try {
      statusResp = await fetchImpl(statusUrl, {
        method: "GET",
        headers: { "X-api-key": apiKey },
        signal,
      });
    } catch (err) {
      return {
        success: false,
        status: 502,
        error: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
      };
    }
    if (!statusResp.ok) {
      return {
        success: false,
        status: statusResp.status,
        error: `UC direct status poll failed (HTTP ${statusResp.status})`,
        ...(statusResp.status === 429 ? { retryable: true } : {}),
      };
    }
    let statusJson: unknown;
    try {
      statusJson = await statusResp.json();
    } catch {
      return {
        success: false,
        status: 502,
        error: "UC direct status poll returned a non-JSON response",
      };
    }
    extracted = extractUcDirectVideo(statusJson);
    if (isDirectFailed(extracted.status)) {
      return {
        success: false,
        status: 502,
        error: `UC direct video job failed (status: ${extracted.status})`,
      };
    }
    if (isDirectComplete(extracted.status, extracted.url) && extracted.url) {
      return buildDirectSuccess(extracted.url, extracted.requestId, extracted.status);
    }
    log?.info?.("VIDEO", `uc-video (direct) job pending, poll #${attempt} in ${pollIntervalMs}ms`);
    if (Date.now() + pollIntervalMs >= deadline) break;
    await sleepImpl(pollIntervalMs);
  } while (Date.now() < deadline);

  return {
    success: false,
    status: 504,
    error: "UC direct video generation timed out waiting for a result",
  };
}

function buildDirectSuccess(url: string, requestId?: string, status?: string): UcVideoResult {
  return {
    success: true,
    data: {
      created: Math.floor(Date.now() / 1000),
      data: [
        {
          url,
          format: "mp4",
          ...(requestId ? { request_id: requestId } : {}),
          ...(status ? { status } : {}),
        },
      ],
    },
  };
}

/**
 * UC video generation entrypoint. Picks the surface by credential:
 * a `uai_...` X-api-key routes to the metered REST path; otherwise the persona
 * web path (mint -> upload/generate -> poll) is used.
 */
export async function handleUcVideoGeneration({
  model,
  provider = "uc",
  body,
  credentials,
  prompt: promptArg,
  log,
  signal,
  fetchImpl = fetch,
  sleepImpl = realSleep,
}: UcVideoHandlerArgs): Promise<UcVideoResult> {
  const prompt =
    typeof promptArg === "string" && promptArg.trim()
      ? promptArg.trim()
      : typeof body.prompt === "string"
        ? body.prompt.trim()
        : "";
  if (!prompt) {
    return { success: false, status: 400, error: "Prompt is required for UC video generation" };
  }

  if (isUcDirectVideoCredential(credentials)) {
    return handleUcDirectVideo({
      model,
      provider,
      body,
      credentials,
      prompt,
      log,
      signal,
      fetchImpl,
      sleepImpl,
    });
  }
  return handleUcPersonaVideo({
    model,
    provider,
    body,
    credentials,
    prompt,
    log,
    signal,
    fetchImpl,
    sleepImpl,
  });
}
