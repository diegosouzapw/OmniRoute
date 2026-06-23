/**
 * Google Flow (labs.google/flow) video generation — pure helpers.
 *
 * Google Flow drives Veo video generation through Google's internal AI Sandbox
 * endpoint (`aisandbox-pa.googleapis.com`) using a Google account OAuth bearer
 * token — the same Google OAuth credential family that the Antigravity provider
 * already uses (accessToken + Cloud Code projectId). The request/response shape
 * mirrors the *documented* Veo `predictLongRunning` long-running-operation API
 * (see `open-sse/executors/vertexMedia.ts::vertexGenerateVideo`):
 *
 *   submit  →  { instances: [{ prompt, image? }], parameters: { sampleCount, ... } }  →  { name: <operation> }
 *   poll    →  { operationName }  →  { done, error?, response: { videos: [{ bytesBase64Encoded | gcsUri }] } }
 *
 * ⚠️ PENDING LIVE VALIDATION (Hard Rule #18): the exact AI-Sandbox URL path and
 * whether Flow wraps the Veo body in the Cloud-Code `{ project, request }` envelope
 * cannot be unit-tested — they require a real Google Flow account + a captured HAR.
 * Everything that depends on the wire host/path is isolated in the two constants
 * below and in the handler, so confirming a captured HAR is a one-line change.
 * The transformation logic in this file is grounded in the documented Veo shape
 * and is fully unit-tested.
 */

/**
 * Google Flow has no standalone connection — it reuses the Antigravity Google
 * OAuth credential (accessToken + Cloud Code projectId). Credential lookups for
 * the `googleflow` provider resolve against this provider id.
 */
export const GOOGLE_FLOW_CREDENTIAL_PROVIDER = "antigravity";

/** Map a video provider id to the provider id whose stored credentials it uses. */
export function resolveVideoCredentialProvider(provider: string): string {
  return provider === "googleflow" ? GOOGLE_FLOW_CREDENTIAL_PROVIDER : provider;
}

// --- Wire endpoint (isolated; confirm against a real Flow HAR — Rule #18) ---
export const GOOGLE_FLOW_HOST = "https://aisandbox-pa.googleapis.com";
export const GOOGLE_FLOW_SUBMIT_PATH = "/v1:generateVideo";
export const GOOGLE_FLOW_POLL_PATH = "/v1:fetchOperation";

export interface FlowVideoParams {
  prompt: string;
  aspectRatio?: string;
  durationSeconds?: number;
  sampleCount: number;
  negativePrompt?: string;
  resolution?: string;
}

export interface FlowOperationResult {
  done: boolean;
  error?: string;
  base64?: string;
  url?: string;
  format?: string;
}

function asTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

const ASPECT_RATIO_RE = /^\d{1,2}:\d{1,2}$/;

/**
 * Normalize an OpenAI-style /v1/videos/generations body into Veo parameters.
 * Accepts both snake_case (OpenAI) and camelCase (native) field names, and
 * treats a `size` that looks like a ratio (e.g. "16:9") as the aspect ratio.
 */
export function normalizeFlowVideoParams(body: Record<string, unknown> | null | undefined): FlowVideoParams {
  const b = body ?? {};
  const prompt = typeof b.prompt === "string" ? b.prompt : String(b.prompt ?? "");

  const sizeMaybeRatio = asTrimmedString(b.size);
  const aspectRatio =
    asTrimmedString(b.aspect_ratio) ??
    asTrimmedString(b.aspectRatio) ??
    (sizeMaybeRatio && ASPECT_RATIO_RE.test(sizeMaybeRatio) ? sizeMaybeRatio : undefined);

  const durationRaw =
    typeof b.duration === "number"
      ? b.duration
      : typeof b.durationSeconds === "number"
        ? b.durationSeconds
        : undefined;
  const durationSeconds =
    typeof durationRaw === "number" && Number.isFinite(durationRaw) && durationRaw > 0
      ? Math.floor(durationRaw)
      : undefined;

  const nRaw = typeof b.n === "number" ? b.n : undefined;
  const sampleCount =
    typeof nRaw === "number" && Number.isFinite(nRaw) && nRaw > 0 ? Math.floor(nRaw) : 1;

  return {
    prompt,
    aspectRatio,
    durationSeconds,
    sampleCount,
    negativePrompt: asTrimmedString(b.negative_prompt) ?? asTrimmedString(b.negativePrompt),
    resolution: asTrimmedString(b.resolution),
  };
}

/**
 * Build the documented Veo `predictLongRunning` request body for the submit call.
 * Only includes optional parameters that were actually provided.
 */
export function buildGoogleFlowSubmitBody(params: FlowVideoParams): {
  instances: Array<Record<string, unknown>>;
  parameters: Record<string, unknown>;
} {
  const parameters: Record<string, unknown> = { sampleCount: params.sampleCount };
  if (params.aspectRatio) parameters.aspectRatio = params.aspectRatio;
  if (typeof params.durationSeconds === "number") parameters.durationSeconds = params.durationSeconds;
  if (params.negativePrompt) parameters.negativePrompt = params.negativePrompt;
  if (params.resolution) parameters.resolution = params.resolution;

  return {
    instances: [{ prompt: params.prompt }],
    parameters,
  };
}

/**
 * Extract the long-running-operation name from a submit response.
 * Tolerates both `{ name }` and `{ operation: { name } }` envelopes.
 */
export function parseFlowOperationName(json: unknown): string | null {
  if (!json || typeof json !== "object") return null;
  const direct = (json as { name?: unknown }).name;
  if (typeof direct === "string" && direct.length > 0) return direct;
  const op = (json as { operation?: { name?: unknown } }).operation;
  if (op && typeof op === "object" && typeof op.name === "string" && op.name.length > 0) {
    return op.name;
  }
  return null;
}

function extractVideoFromResponse(response: unknown): { base64?: string; url?: string } | null {
  if (!response || typeof response !== "object") return null;

  // Documented Veo LRO shape: response.videos[].bytesBase64Encoded | gcsUri
  const videos = (response as { videos?: unknown }).videos;
  if (Array.isArray(videos) && videos.length > 0) {
    const v = videos[0] as Record<string, unknown>;
    if (typeof v.bytesBase64Encoded === "string") return { base64: v.bytesBase64Encoded };
    if (typeof v.gcsUri === "string") return { url: v.gcsUri };
    if (typeof v.uri === "string") return { url: v.uri };
  }

  // Alternate Veo shape: response.generateVideoResponse.generatedSamples[].video.uri
  const gen = (response as { generateVideoResponse?: { generatedSamples?: unknown } })
    .generateVideoResponse;
  const samples = gen && typeof gen === "object" ? gen.generatedSamples : undefined;
  if (Array.isArray(samples) && samples.length > 0) {
    const video = (samples[0] as { video?: Record<string, unknown> }).video;
    if (video && typeof video.uri === "string") return { url: video.uri };
    if (video && typeof video.bytesBase64Encoded === "string") {
      return { base64: video.bytesBase64Encoded };
    }
  }

  return null;
}

/**
 * Interpret a poll/fetch-operation response into a normalized result.
 * `done: false` means still running; callers should keep polling.
 */
export function parseFlowOperationResult(json: unknown): FlowOperationResult {
  if (!json || typeof json !== "object") return { done: false };

  const done = Boolean((json as { done?: unknown }).done);
  if (!done) return { done: false };

  const opError = (json as { error?: { message?: unknown } }).error;
  if (opError && typeof opError === "object") {
    return { done: true, error: String(opError.message || "Google Flow video operation failed") };
  }

  const response = (json as { response?: unknown }).response;
  const video = extractVideoFromResponse(response);
  if (video?.base64) return { done: true, base64: video.base64, format: "mp4" };
  if (video?.url) return { done: true, url: video.url, format: "mp4" };

  return { done: true, error: "Google Flow operation completed but returned no video" };
}

/** Resolve the Cloud Code projectId from the OAuth credential record (mirrors Antigravity). */
export function resolveFlowProjectId(
  credentials: Record<string, unknown> | null | undefined
): string | null {
  const cred = credentials ?? {};
  const direct = asTrimmedString(cred.projectId);
  if (direct) return direct;
  const psd = cred.providerSpecificData;
  if (psd && typeof psd === "object") {
    const fromPsd = asTrimmedString((psd as Record<string, unknown>).projectId);
    if (fromPsd) return fromPsd;
  }
  return null;
}

/** Resolve the OAuth bearer token from the credential record. */
export function resolveFlowAccessToken(
  credentials: Record<string, unknown> | null | undefined
): string | null {
  const cred = credentials ?? {};
  return asTrimmedString(cred.accessToken) ?? asTrimmedString(cred.apiKey) ?? null;
}
