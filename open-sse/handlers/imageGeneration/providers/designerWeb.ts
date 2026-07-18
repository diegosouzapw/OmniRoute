// Microsoft Designer (unofficial, reverse-engineered web API) image handler.
// Family: designer-web | Provider: microsoft-designer-web
// Reference: g4f/Provider/needs_auth/MicrosoftDesigner.py (fetched + verified
// during triage of #6672) — Bearer access_token auth against
// designerapp.officeapps.live.com/designerapp/DallE.ashx, submit-then-poll
// for image_urls_thumbnail[].ImageUrl.
//
// The upstream ClientId header is a fixed, publicly-shared value the
// designer.microsoft.com frontend sends on every session (not a secret) —
// routed through resolvePublicCred() per Hard Rule #11 / docs/security/PUBLIC_CREDS.md.

import { randomUUID, randomBytes } from "node:crypto";
import { resolvePublicCred } from "../../../utils/publicCreds.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "../../imageGeneration.ts";

const DESIGNER_WEB_POLL_TIMEOUT_MS_DEFAULT = 60000;
const DESIGNER_WEB_POLL_INTERVAL_MS_DEFAULT = 2000;
const DESIGNER_WEB_BATCH_SIZE = "4";

/** Maps an OpenAI-style "WxH" size string to the closest Designer aspect ratio bucket. */
export function mapDesignerWebImageSize(size: unknown): "1_1" | "16_9" | "9_16" {
  if (typeof size !== "string" || !size.includes("x")) return "1_1";
  const [wRaw, hRaw] = size.split("x");
  const w = Number(wRaw);
  const h = Number(hRaw);
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return "1_1";
  if (w > h * 1.2) return "16_9";
  if (h > w * 1.2) return "9_16";
  return "1_1";
}

/** Builds the fixed + per-request headers Microsoft Designer expects on every call. */
export function buildDesignerWebHeaders({
  accessToken,
  sessionId = randomUUID(),
  userId = randomBytes(16).toString("hex"),
}: {
  accessToken: string;
  sessionId?: string;
  userId?: string;
}): Record<string, string> {
  return {
    Authorization: `Bearer ${accessToken}`,
    ClientId: resolvePublicCred("microsoft_designer_client_id"),
    SessionId: sessionId,
    UserId: userId,
    "Content-Type": "application/x-www-form-urlencoded",
  };
}

/** Builds the DallE.ashx form body from an OpenAI-shaped image-generation request. */
export function buildDesignerWebFormBody(prompt: string, size: unknown): URLSearchParams {
  const params = new URLSearchParams();
  params.set("dalle-caption", prompt);
  params.set("dalle-image-size", mapDesignerWebImageSize(size));
  params.set("dalle-batch-size", DESIGNER_WEB_BATCH_SIZE);
  params.set("dalle-seed", String(Math.floor(Math.random() * 1_000_000_000)));
  return params;
}

interface DesignerWebParsedResponse {
  status: "ready" | "pending" | "empty";
  imageUrls: string[];
  pollIntervalMs: number | null;
}

/** Parses a DallE.ashx JSON body into a ready/pending/empty verdict. */
export function parseDesignerWebResponse(json: unknown): DesignerWebParsedResponse {
  const body = (json ?? {}) as Record<string, unknown>;
  const thumbs = Array.isArray(body.image_urls_thumbnail) ? body.image_urls_thumbnail : [];
  const imageUrls = thumbs
    .map((t) => (t && typeof t === "object" ? (t as Record<string, unknown>).ImageUrl : null))
    .filter((u): u is string => typeof u === "string" && u.length > 0);

  if (imageUrls.length > 0) {
    return { status: "ready", imageUrls, pollIntervalMs: null };
  }

  const pollingMeta = (body.polling_response as Record<string, unknown> | undefined)
    ?.polling_meta_data as Record<string, unknown> | undefined;
  const pollIntervalMs = Number.isFinite(pollingMeta?.poll_interval)
    ? Number(pollingMeta?.poll_interval)
    : null;

  if (pollIntervalMs !== null) {
    return { status: "pending", imageUrls: [], pollIntervalMs };
  }

  return { status: "empty", imageUrls: [], pollIntervalMs: null };
}

function normalizePositiveNumber(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

interface DesignerWebRequestConfig {
  prompt: string;
  accessToken: string;
  headers: Record<string, string>;
  formBody: URLSearchParams;
  timeoutMs: number;
  pollIntervalMs: number;
}

/** Validates the request and resolves auth + poll timing. Returns an error status/message on failure. */
function resolveDesignerWebRequest(
  body: { prompt?: unknown; size?: unknown; timeout_ms?: unknown; poll_interval_ms?: unknown },
  credentials: { apiKey?: string; accessToken?: string }
): { ok: true; config: DesignerWebRequestConfig } | { ok: false; status: number; error: string } {
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return {
      ok: false,
      status: 400,
      error: "Prompt is required for Microsoft Designer image generation",
    };
  }

  const accessToken = credentials?.apiKey || credentials?.accessToken;
  if (!accessToken) {
    return { ok: false, status: 401, error: "Microsoft Designer credentials missing access_token" };
  }

  const timeoutMs = normalizePositiveNumber(
    body.timeout_ms,
    normalizePositiveNumber(
      process.env.DESIGNER_WEB_POLL_TIMEOUT_MS,
      DESIGNER_WEB_POLL_TIMEOUT_MS_DEFAULT
    )
  );
  const pollIntervalMs = normalizePositiveNumber(
    body.poll_interval_ms,
    normalizePositiveNumber(
      process.env.DESIGNER_WEB_POLL_INTERVAL_MS,
      DESIGNER_WEB_POLL_INTERVAL_MS_DEFAULT
    )
  );

  return {
    ok: true,
    config: {
      prompt,
      accessToken,
      headers: buildDesignerWebHeaders({ accessToken }),
      formBody: buildDesignerWebFormBody(prompt, body.size),
      timeoutMs,
      pollIntervalMs,
    },
  };
}

type DesignerWebStepResult =
  | { done: false; waitMs: number }
  | { done: true; success: true; imageUrls: string[] }
  | { done: true; success: false; status: number; error: string };

/** Runs one submit/poll fetch cycle and classifies the outcome. */
async function stepDesignerWebPoll(
  baseUrl: string,
  headers: Record<string, string>,
  formBody: URLSearchParams,
  pollIntervalMs: number,
  fetchImpl: typeof fetch
): Promise<DesignerWebStepResult> {
  const resp = await fetchImpl(baseUrl, { method: "POST", headers, body: formBody });

  if (!resp.ok) {
    return { done: true, success: false, status: resp.status, error: sanitizeErrorMessage(await resp.text()) };
  }

  const parsed = parseDesignerWebResponse(await resp.json());

  if (parsed.status === "ready") {
    return { done: true, success: true, imageUrls: parsed.imageUrls };
  }
  if (parsed.status === "empty") {
    return {
      done: true,
      success: false,
      status: 502,
      error: "Microsoft Designer response did not contain image data or polling metadata",
    };
  }
  return { done: false, waitMs: Math.min(parsed.pollIntervalMs ?? pollIntervalMs, pollIntervalMs) };
}

/** Drives the submit-then-poll loop to completion, timeout, or a terminal error. */
async function runDesignerWebPollLoop(
  baseUrl: string,
  config: DesignerWebRequestConfig,
  fetchImpl: typeof fetch,
  log?: { info?: (...args: unknown[]) => void }
): Promise<DesignerWebStepResult | { done: true; success: false; status: 504; error: string }> {
  const deadline = Date.now() + config.timeoutMs;
  let attempt = 0;

  while (Date.now() < deadline) {
    attempt += 1;
    const step = await stepDesignerWebPoll(
      baseUrl,
      config.headers,
      config.formBody,
      config.pollIntervalMs,
      fetchImpl
    );
    if (step.done) return step;
    log?.info?.("IMAGE", `designer-web pending, poll #${attempt} in ${step.waitMs}ms`);
    await new Promise((resolve) => setTimeout(resolve, step.waitMs));
  }

  return {
    done: true,
    success: false,
    status: 504,
    error: "Microsoft Designer image generation timed out waiting for a result",
  };
}

export async function handleDesignerWebImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
  fetchImpl = fetch,
}: {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: { prompt?: unknown; size?: unknown; timeout_ms?: unknown; poll_interval_ms?: unknown };
  credentials: { apiKey?: string; accessToken?: string };
  log?: { info?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void };
  fetchImpl?: typeof fetch;
}) {
  const startTime = Date.now();
  const resolved = resolveDesignerWebRequest(body, credentials);
  if (!resolved.ok) {
    return saveImageErrorResult({ provider, model, status: resolved.status, startTime, error: resolved.error });
  }

  try {
    const outcome = await runDesignerWebPollLoop(providerConfig.baseUrl, resolved.config, fetchImpl, log);
    if (outcome.success) {
      return saveImageSuccessResult({
        provider,
        model,
        startTime,
        images: outcome.imageUrls.map((url) => ({ url })),
      });
    }
    if (log?.error) {
      log.error("IMAGE", `${provider} designer-web error ${outcome.status}: ${outcome.error}`);
    }
    return saveImageErrorResult({ provider, model, status: outcome.status, startTime, error: outcome.error });
  } catch (err) {
    const errorText = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    if (log?.error) {
      log.error("IMAGE", `${provider} designer-web exception: ${errorText}`);
    }
    return saveImageErrorResult({ provider, model, status: 500, startTime, error: errorText });
  }
}
