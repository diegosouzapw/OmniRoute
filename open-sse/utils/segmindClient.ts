// Shared Segmind (#6656) REST wire client — used by both the image
// (imageGeneration/providers/segmind.ts) and video
// (videoGeneration/providers/segmind.ts) handlers, since Segmind exposes
// image and video models under the exact same `POST /v1/{model}` shape:
// x-api-key auth, JSON request body, raw media bytes response (no JSON
// envelope) on success, JSON/text error body on failure.
//
// Factored out so each per-modality handler stays a thin body-builder +
// response-formatter (keeps both under the complexity/max-lines ratchets).

import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "./error.ts";

export interface SegmindLogger {
  info: (scope: string, message: string) => void;
  error: (scope: string, message: string) => void;
}

export interface SegmindRequestOptions {
  baseUrl: string;
  model: string;
  token: string;
  upstreamBody: Record<string, unknown>;
  callLogPath: string;
  provider: string;
  scope: "IMAGE" | "VIDEO";
  log?: SegmindLogger | null;
}

export type SegmindRequestResult =
  | { ok: true; buffer: Buffer; contentType: string }
  | { ok: false; status: number; error: string };

async function logSegmindFailure(
  opts: SegmindRequestOptions,
  status: number,
  duration: number,
  errorText: string
): Promise<SegmindRequestResult> {
  if (opts.log) {
    opts.log.error(
      opts.scope,
      `${opts.provider} error ${status}: ${errorText.slice(0, 200)}`
    );
  }
  saveCallLog({
    method: "POST",
    path: opts.callLogPath,
    status,
    model: `${opts.provider}/${opts.model}`,
    provider: opts.provider,
    duration,
    error: errorText.slice(0, 500),
  }).catch(() => {});
  return {
    ok: false,
    status,
    error: sanitizeErrorMessage(errorText) || `Segmind request failed (${status})`,
  };
}

/**
 * POST {baseUrl}/{model} with x-api-key auth and a JSON body. Returns the
 * raw response bytes + content-type on success, or a sanitized error result.
 */
export async function segmindRequest(opts: SegmindRequestOptions): Promise<SegmindRequestResult> {
  const startTime = Date.now();
  try {
    const response = await fetch(`${opts.baseUrl.replace(/\/$/, "")}/${opts.model}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": opts.token },
      body: JSON.stringify(opts.upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return logSegmindFailure(opts, response.status, Date.now() - startTime, errorText);
    }

    const contentType = response.headers.get("content-type") || "";
    const buffer = Buffer.from(await response.arrayBuffer());

    saveCallLog({
      method: "POST",
      path: opts.callLogPath,
      status: 200,
      model: `${opts.provider}/${opts.model}`,
      provider: opts.provider,
      duration: Date.now() - startTime,
    }).catch(() => {});

    return { ok: true, buffer, contentType };
  } catch (err) {
    const message = (err as Error)?.message ?? String(err);
    if (opts.log) opts.log.error(opts.scope, `${opts.provider} fetch error: ${message}`);
    saveCallLog({
      method: "POST",
      path: opts.callLogPath,
      status: 502,
      model: `${opts.provider}/${opts.model}`,
      provider: opts.provider,
      duration: Date.now() - startTime,
      error: message,
    }).catch(() => {});
    return {
      ok: false,
      status: 502,
      error: `${opts.scope === "IMAGE" ? "Image" : "Video"} provider error: ${sanitizeErrorMessage(message)}`,
    };
  }
}
