/**
 * VeoAIFreeWebExecutor — Veo AI Free Multi-Tool Provider
 *
 * Routes requests through veoaifree.com's WordPress AJAX API.
 * Supports: text-to-video, image-to-video, image generation, TTS, prompt enhancement.
 *
 * No auth required. Rate limited to 6 requests/hour per IP.
 */
import dns from "node:dns";
import { isIP } from "node:net";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  OutboundUrlGuardError,
  isPrivateHost,
  parseAndValidatePublicUrl,
} from "@/shared/network/outboundUrlGuard";

const BASE_URL = "https://veoaifree.com";
const AJAX_URL = `${BASE_URL}/wp-admin/admin-ajax.php`;
const TTS_URL = `${BASE_URL}/video/googletts.php`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
const POLL_INTERVAL_MS = 20_000;
const MAX_POLLS = 30; // 10 minutes max
const FETCH_TIMEOUT_MS = 30_000;
const ARTIFACT_MAX_BYTES = 100 * 1024 * 1024;
const ARTIFACT_MAX_REDIRECTS = 3;
const ARTIFACT_READY_RETRY_INTERVAL_MS = 5_000;
const ARTIFACT_READY_MAX_ATTEMPTS = 12;
const RETRYABLE_ARTIFACT_STATUSES = new Set([202, 404, 409, 425]);

type ToolIntent = "video" | "image" | "tts" | "enhance";

type VeoSessionContext = {
  cookieHeader: string;
  userAgent: string;
  origin: string;
  referer: string;
  signal?: AbortSignal;
};

class VeoArtifactError extends Error {
  code: string;
  status: number;
  retryable: boolean;

  constructor(code: string, message: string, status = 502, options?: { retryable?: boolean }) {
    super(message);
    this.name = "VeoArtifactError";
    this.code = code;
    this.status = status;
    this.retryable = options?.retryable === true;
  }
}

// ————————————————————————— Helpers —————————————————————————

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw signal.reason instanceof Error ? signal.reason : new Error("Request aborted");
  }
}

function withTimeout(signal?: AbortSignal): { signal: AbortSignal; cleanup: () => void } {
  const controller = new AbortController();
  const abort = () => controller.abort(signal?.reason || new Error("Request aborted"));
  const timeout = setTimeout(
    () => controller.abort(new Error("VeoAIFree request timed out")),
    FETCH_TIMEOUT_MS
  );

  if (signal?.aborted) {
    abort();
  } else {
    signal?.addEventListener("abort", abort, { once: true });
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timeout);
      signal?.removeEventListener("abort", abort);
    },
  };
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  signal?: AbortSignal
): Promise<Response> {
  throwIfAborted(signal);
  const timeout = withTimeout(signal);
  try {
    return await fetch(url, { ...init, signal: timeout.signal });
  } finally {
    timeout.cleanup();
  }
}

function waitForDuration(ms: number, signal?: AbortSignal): Promise<void> {
  throwIfAborted(signal);
  let abort: (() => void) | undefined;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, ms);
    abort = () => {
      clearTimeout(timeout);
      reject(signal?.reason instanceof Error ? signal.reason : new Error("Request aborted"));
    };
    signal?.addEventListener("abort", abort, { once: true });
  }).finally(() => {
    if (abort) signal?.removeEventListener("abort", abort);
  });
}

function waitForPoll(signal?: AbortSignal): Promise<void> {
  return waitForDuration(POLL_INTERVAL_MS, signal);
}

function jsonResp(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function errResp(message: string, status = 502, code = "upstream_error"): Response {
  return jsonResp(
    {
      error: {
        message: sanitizeErrorMessage(message),
        type: "upstream_error",
        code,
      },
    },
    status
  );
}

function getSetCookieHeaders(headers: Headers): string[] {
  const value = headers as Headers & { getSetCookie?: () => string[] };
  if (typeof value.getSetCookie === "function") {
    return value.getSetCookie();
  }
  const raw = headers.get("set-cookie");
  return raw ? [raw] : [];
}

function parseSetCookiePair(setCookie: string): { name: string; value: string } | null {
  const pair = setCookie.split(";")[0]?.trim();
  if (!pair) return null;
  const eq = pair.indexOf("=");
  if (eq <= 0) return null;
  return { name: pair.slice(0, eq).trim(), value: pair.slice(eq + 1) };
}

function mergeCookieHeaderWithSetCookie(cookieHeader: string, setCookieHeaders: string[]): string {
  const cookieMap = new Map<string, string>();

  for (const part of cookieHeader.split(";")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    cookieMap.set(trimmed.slice(0, eq).trim(), trimmed.slice(eq + 1));
  }

  for (const setCookie of setCookieHeaders) {
    const parsed = parseSetCookiePair(setCookie);
    if (!parsed || !parsed.value) continue;
    cookieMap.set(parsed.name, parsed.value);
  }

  return [...cookieMap.entries()].map(([name, value]) => `${name}=${value}`).join("; ");
}

function updateSessionCookies(context: VeoSessionContext, response: Response): void {
  const setCookieHeaders = getSetCookieHeaders(response.headers);
  if (setCookieHeaders.length === 0) return;
  context.cookieHeader = mergeCookieHeaderWithSetCookie(context.cookieHeader, setCookieHeaders);
}

function buildRequestHeaders(
  context: VeoSessionContext,
  options?: {
    contentType?: string;
    referer?: string;
    includeOrigin?: boolean;
    includeCookie?: boolean;
  }
): Record<string, string> {
  const headers: Record<string, string> = {
    "User-Agent": context.userAgent,
    Referer: options?.referer || context.referer,
  };
  if (options?.contentType) headers["Content-Type"] = options.contentType;
  if (options?.includeOrigin) headers.Origin = context.origin;
  if (options?.includeCookie !== false && context.cookieHeader) {
    headers.Cookie = context.cookieHeader;
  }
  return headers;
}

async function fetchSession(
  context: VeoSessionContext,
  url: string,
  init: RequestInit = {}
): Promise<Response> {
  const response = await fetchWithTimeout(url, init, context.signal);
  updateSessionCookies(context, response);
  return response;
}

async function fetchNonce(context: VeoSessionContext): Promise<string> {
  const res = await fetchSession(context, BASE_URL, {
    headers: buildRequestHeaders(context, { includeCookie: false }),
  });
  const html = await res.text();
  const match = html.match(/nonce":"([a-f0-9]+)"/);
  if (!match) throw new Error("Failed to extract CSRF nonce from veoaifree.com");
  return match[1];
}

async function postAjax(
  context: VeoSessionContext,
  nonce: string,
  params: Record<string, string>
): Promise<string> {
  const body = new URLSearchParams({ action: "veo_video_generator", nonce, ...params });
  const res = await fetchSession(context, AJAX_URL, {
    method: "POST",
    headers: buildRequestHeaders(context, {
      contentType: "application/x-www-form-urlencoded",
      includeOrigin: true,
    }),
    body: body.toString(),
  });
  return res.text();
}

function buildSessionContext(signal?: AbortSignal): VeoSessionContext {
  return {
    cookieHeader: "",
    userAgent: USER_AGENT,
    origin: BASE_URL,
    referer: `${BASE_URL}/`,
    signal,
  };
}

export function detectIntent(model?: string, prompt?: string): ToolIntent {
  const m = (model || "").toLowerCase();
  if (m.includes("tts") || m.includes("speech") || m.includes("audio")) return "tts";
  if (m.includes("image") || m.includes("banana") || m.includes("imagen")) return "image";
  if (m.includes("enhance") || m.includes("prompt")) return "enhance";
  if (m.includes("video") || m.includes("veo") || m.includes("seedance")) return "video";
  const p = (prompt || "").toLowerCase();
  if (p.startsWith("generate image") || p.startsWith("create image") || p.startsWith("draw ")) {
    return "image";
  }
  if (p.startsWith("enhance") || p.startsWith("improve prompt")) return "enhance";
  return "video";
}

async function handleImage(
  context: VeoSessionContext,
  nonce: string,
  prompt: string,
  aspectRatio: string
): Promise<Response> {
  const result = await postAjax(context, nonce, {
    promptIMG: prompt,
    totalVariationsIMG: "1",
    aspectRatioIMG: aspectRatio,
    actionType: "banan-image-generator",
  });
  const trimmed = result.trim();
  if (!trimmed || trimmed === "0" || trimmed.toLowerCase().includes("error")) {
    return errResp("Image generation failed");
  }
  const parts = trimmed
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const images = parts.map((p) =>
    p.startsWith("http") ? { url: p, type: "image" } : { b64_json: p, type: "image" }
  );
  return jsonResp({ object: "image.generation", data: images, status: "completed" });
}

async function handleTTS(
  prompt: string,
  voice?: string,
  lang?: string,
  signal?: AbortSignal
): Promise<Response> {
  const text = prompt;
  const selectedVoice = voice || "en-US-AvaNeural";
  const selectedLang = lang || "en-US";

  const res = await fetchWithTimeout(
    TTS_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
        Origin: BASE_URL,
        Referer: `${BASE_URL}/free-ai-text-to-speech/`,
      },
      body: JSON.stringify({
        text: text.slice(0, 10000),
        voice: selectedVoice,
        lang: selectedLang,
        pitch: "0",
        speed: "1.0",
      }),
    },
    signal
  );

  if (!res.ok) {
    return errResp(`TTS failed (${res.status})`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (
    contentType.includes("audio") ||
    contentType.includes("octet-stream") ||
    contentType.includes("wav")
  ) {
    return new Response(res.body, {
      headers: {
        "Content-Type": contentType.includes("wav") ? "audio/wav" : "audio/mpeg",
        "Content-Disposition": 'attachment; filename="speech.wav"',
      },
    });
  }

  const data = await res.text();
  try {
    const json = JSON.parse(data);
    if (json.audio_data) {
      return jsonResp({ object: "audio.speech", audio: json.audio_data, status: "completed" });
    }
    if (json.url) {
      return jsonResp({ object: "audio.speech", url: json.url, status: "completed" });
    }
  } catch {
    /* not JSON */
  }
  return errResp("TTS unexpected response format");
}

async function handleEnhance(
  context: VeoSessionContext,
  nonce: string,
  prompt: string
): Promise<Response> {
  const result = await postAjax(context, nonce, {
    prompt,
    actionType: "main-prompt-generation",
  });
  const trimmed = result.trim();
  if (!trimmed || trimmed === "0") {
    return errResp("Prompt enhancement failed");
  }
  return jsonResp({ object: "prompt.enhancement", enhanced: trimmed, status: "completed" });
}

function validateArtifactUrl(input: string): URL {
  let url: URL;
  try {
    url = parseAndValidatePublicUrl(input);
  } catch (error) {
    if (error instanceof OutboundUrlGuardError) {
      throw new VeoArtifactError(
        error.code === "OUTBOUND_URL_INVALID"
          ? "VIDEO_ARTIFACT_URL_INVALID"
          : "VIDEO_ARTIFACT_URL_BLOCKED",
        error.code === "OUTBOUND_URL_INVALID"
          ? "Video artifact URL is invalid"
          : "Video artifact URL is blocked",
        502
      );
    }
    throw new VeoArtifactError("VIDEO_ARTIFACT_URL_INVALID", "Video artifact URL is invalid", 502);
  }

  if (url.protocol !== "https:") {
    throw new VeoArtifactError(
      "VIDEO_ARTIFACT_URL_INVALID",
      "Video artifact URL must use HTTPS",
      502
    );
  }

  return url;
}

async function assertHostnameResolvesPublic(hostname: string): Promise<void> {
  const bare =
    hostname.startsWith("[") && hostname.endsWith("]") ? hostname.slice(1, -1) : hostname;
  if (isIP(bare)) {
    if (isPrivateHost(bare)) {
      throw new VeoArtifactError(
        "VIDEO_ARTIFACT_URL_BLOCKED",
        "Video artifact host resolves to a blocked address",
        502
      );
    }
    return;
  }

  let resolved: Array<{ address: string }>;
  try {
    resolved = await dns.promises.lookup(bare, { all: true });
  } catch {
    throw new VeoArtifactError(
      "VIDEO_ARTIFACT_DOWNLOAD_FAILED",
      "Video artifact host could not be resolved",
      502
    );
  }

  if (!resolved.length) {
    throw new VeoArtifactError(
      "VIDEO_ARTIFACT_DOWNLOAD_FAILED",
      "Video artifact host could not be resolved",
      502
    );
  }

  for (const { address } of resolved) {
    if (isPrivateHost(address)) {
      throw new VeoArtifactError(
        "VIDEO_ARTIFACT_URL_BLOCKED",
        "Video artifact host resolves to a blocked address",
        502
      );
    }
  }
}

async function readCappedBuffer(response: Response, maxBytes: number): Promise<Buffer> {
  const contentLengthHeader = response.headers.get("content-length");
  const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : null;
  if (contentLength !== null && Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new VeoArtifactError(
      "VIDEO_ARTIFACT_TOO_LARGE",
      "Video artifact exceeds the maximum supported size",
      502
    );
  }

  if (!response.body) {
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength > maxBytes) {
      throw new VeoArtifactError(
        "VIDEO_ARTIFACT_TOO_LARGE",
        "Video artifact exceeds the maximum supported size",
        502
      );
    }
    return buffer;
  }

  const reader = response.body.getReader();
  const chunks: Buffer[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = Buffer.from(value);
      totalBytes += chunk.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        throw new VeoArtifactError(
          "VIDEO_ARTIFACT_TOO_LARGE",
          "Video artifact exceeds the maximum supported size",
          502
        );
      }
      chunks.push(chunk);
    }
  } finally {
    reader.releaseLock();
  }

  return Buffer.concat(chunks, totalBytes);
}

function validateMp4Buffer(buffer: Buffer): void {
  if (buffer.length <= 0) {
    throw new VeoArtifactError("VIDEO_ARTIFACT_SIGNATURE_INVALID", "Video artifact is empty", 502);
  }

  if (buffer.length < 12 || buffer.toString("ascii", 4, 8) !== "ftyp") {
    throw new VeoArtifactError(
      "VIDEO_ARTIFACT_SIGNATURE_INVALID",
      "Video artifact is not a valid MP4 file",
      502
    );
  }
}

async function downloadArtifactOnce(
  context: VeoSessionContext,
  artifactUrl: string
): Promise<Buffer> {
  let currentUrl = artifactUrl;

  for (let redirectCount = 0; redirectCount <= ARTIFACT_MAX_REDIRECTS; redirectCount++) {
    const parsedUrl = validateArtifactUrl(currentUrl);
    await assertHostnameResolvesPublic(parsedUrl.hostname);

    const response = await fetchSession(context, parsedUrl.toString(), {
      method: "GET",
      redirect: "manual",
      headers: buildRequestHeaders(context),
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) {
        throw new VeoArtifactError(
          "VIDEO_ARTIFACT_DOWNLOAD_FAILED",
          "Video artifact redirect is missing a destination",
          502
        );
      }
      if (redirectCount >= ARTIFACT_MAX_REDIRECTS) {
        throw new VeoArtifactError(
          "VIDEO_ARTIFACT_DOWNLOAD_FAILED",
          "Video artifact exceeded the redirect limit",
          502
        );
      }
      try {
        currentUrl = new URL(location, parsedUrl.toString()).toString();
      } catch {
        throw new VeoArtifactError(
          "VIDEO_ARTIFACT_URL_INVALID",
          "Video artifact redirect destination is invalid",
          502
        );
      }
      continue;
    }

    if (RETRYABLE_ARTIFACT_STATUSES.has(response.status)) {
      throw new VeoArtifactError(
        response.status === 202 ? "VIDEO_ARTIFACT_NOT_READY" : "VIDEO_ARTIFACT_UNAVAILABLE",
        "Video artifact is not available yet",
        502,
        { retryable: true }
      );
    }

    if (!response.ok) {
      throw new VeoArtifactError(
        "VIDEO_ARTIFACT_DOWNLOAD_FAILED",
        `Video artifact download failed (${response.status})`,
        502
      );
    }

    const contentType = (response.headers.get("content-type") || "")
      .split(";")[0]
      .trim()
      .toLowerCase();
    if (contentType !== "video/mp4" && contentType !== "application/octet-stream") {
      throw new VeoArtifactError(
        "VIDEO_ARTIFACT_CONTENT_TYPE_INVALID",
        "Video artifact returned an unsupported content type",
        502
      );
    }

    const buffer = await readCappedBuffer(response, ARTIFACT_MAX_BYTES);
    validateMp4Buffer(buffer);
    return buffer;
  }

  throw new VeoArtifactError(
    "VIDEO_ARTIFACT_DOWNLOAD_FAILED",
    "Video artifact exceeded the redirect limit",
    502
  );
}

async function downloadArtifactWithAvailabilityWindow(
  context: VeoSessionContext,
  artifactUrl: string
): Promise<Buffer> {
  let lastError: VeoArtifactError | null = null;

  for (let attempt = 0; attempt < ARTIFACT_READY_MAX_ATTEMPTS; attempt++) {
    try {
      return await downloadArtifactOnce(context, artifactUrl);
    } catch (error) {
      if (!(error instanceof VeoArtifactError)) throw error;
      if (!error.retryable) throw error;
      lastError = error;
      if (attempt === ARTIFACT_READY_MAX_ATTEMPTS - 1) break;
      await waitForDuration(ARTIFACT_READY_RETRY_INTERVAL_MS, context.signal);
    }
  }

  if (lastError?.code === "VIDEO_ARTIFACT_NOT_READY") {
    throw new VeoArtifactError(
      "VIDEO_ARTIFACT_UNAVAILABLE",
      "Video artifact did not become available in time",
      502
    );
  }

  throw new VeoArtifactError(
    "VIDEO_ARTIFACT_UNAVAILABLE",
    "Video artifact did not become available in time",
    502
  );
}

function extractCandidateUrls(value: string): string[] {
  return value
    .split(/[,\n]/)
    .map((part) => part.trim())
    .filter((part) => /^https?:\/\//i.test(part));
}

async function handleVideo(
  context: VeoSessionContext,
  nonce: string,
  prompt: string,
  aspectRatio: string
): Promise<Response> {
  const genResult = await postAjax(context, nonce, {
    prompt,
    totalVariations: "1",
    aspectRatio,
    actionType: "full-video-generate",
  });
  const sceneData = genResult.trim();
  if (!sceneData || sceneData === "0" || sceneData.toLowerCase().includes("error")) {
    return errResp("Video generation failed");
  }

  for (let i = 0; i < MAX_POLLS; i++) {
    await waitForPoll(context.signal);
    throwIfAborted(context.signal);
    try {
      const pollResult = await postAjax(context, nonce, {
        sceneData,
        actionType: "final-video-results",
      });
      const trimmed = pollResult.trim();
      if (!trimmed || trimmed === "0" || trimmed.toLowerCase().includes("error")) {
        continue;
      }

      const urls = extractCandidateUrls(trimmed);
      if (urls.length === 0) {
        continue;
      }

      let artifactBuffer: Buffer | null = null;
      try {
        artifactBuffer = await downloadArtifactWithAvailabilityWindow(context, urls[0]);
        const b64 = artifactBuffer.toString("base64");
        return jsonResp({
          created: Math.floor(Date.now() / 1000),
          data: [{ b64_json: b64, format: "mp4" }],
        });
      } catch (error) {
        if (artifactBuffer) artifactBuffer.fill(0);
        if (error instanceof VeoArtifactError) {
          return errResp(error.message, error.status, error.code);
        }
        throw error;
      } finally {
        if (artifactBuffer) artifactBuffer.fill(0);
      }
    } catch (error) {
      if (error instanceof VeoArtifactError) {
        return errResp(error.message, error.status, error.code);
      }
      if (error instanceof Error && error.message === "Request aborted") {
        throw error;
      }
    }
  }

  return errResp("Video generation timed out after 10 minutes", 504, "VIDEO_ARTIFACT_NOT_READY");
}

// ————————————————————————— Executor —————————————————————————

export class VeoAIFreeWebExecutor extends BaseExecutor {
  constructor() {
    super("veoaifree-web", { id: "veoaifree-web", baseUrl: BASE_URL });
  }

  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const body = input.body as Record<string, unknown> | undefined;
    const model = input.model || (body?.model as string) || "veo-3.1";

    const messages = (body?.messages as Array<Record<string, unknown>>) || [];
    const userMsg = messages.filter((m) => m.role === "user").pop();
    const systemMsg = messages.filter((m) => m.role === "system").pop();
    const prompt = (userMsg?.content as string) || "";
    const systemText = (systemMsg?.content as string) || "";

    if (!prompt.trim()) {
      return {
        response: errResp("No prompt provided", 400, "invalid_request"),
        url: AJAX_URL,
        headers: {},
        transformedBody: null,
      };
    }

    const intent = detectIntent(model, prompt);

    if (intent === "tts") {
      const voiceMatch = systemText.match(/voice:\s*(\S+)/);
      const langMatch = systemText.match(/lang:\s*(\S+)/);
      const resp = await handleTTS(prompt, voiceMatch?.[1], langMatch?.[1], input.signal);
      return { response: resp, url: TTS_URL, headers: {}, transformedBody: { intent, model } };
    }

    const context = buildSessionContext(input.signal || undefined);

    let nonce: string;
    try {
      nonce = await fetchNonce(context);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to get nonce";
      return {
        response: errResp(sanitizeErrorMessage(msg), 502, "upstream_error"),
        url: BASE_URL,
        headers: {},
        transformedBody: null,
      };
    }

    const arMatch = systemText.match(/aspect[_-]?ratio:\s*(\S+)/i);
    const aspectRatio = arMatch?.[1] || "VIDEO_ASPECT_RATIO_LANDSCAPE";

    let resp: Response;
    switch (intent) {
      case "image":
        resp = await handleImage(context, nonce, prompt, aspectRatio.replace("VIDEO_", "IMAGE_"));
        break;
      case "enhance":
        resp = await handleEnhance(context, nonce, prompt);
        break;
      default:
        resp = await handleVideo(context, nonce, prompt, aspectRatio);
    }

    return { response: resp, url: AJAX_URL, headers: {}, transformedBody: { intent, model } };
  }
}
