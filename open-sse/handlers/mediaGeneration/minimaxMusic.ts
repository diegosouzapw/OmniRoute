/**
 * MiniMax music generation handler (format: "minimax-music").
 *
 * The provider entry has been in musicRegistry since the media registries were
 * introduced, but handleMusicGeneration never grew a branch for its format — so
 * every registered `minimax/*` music model fell through the dispatch chain to
 * `Unsupported music format: minimax-music` (400) and the models were
 * advertised by /v1/models while being impossible to call.
 *
 * The upstream contract is a single synchronous POST — unlike the vendor's
 * task-based media endpoints there is no task id and no query endpoint, so a
 * request is either finished (`data.status` 2, audio in `data.audio`) or still
 * generating (`data.status` 1), which can only be reported back, never awaited.
 * Failures are carried in the `base_resp` envelope (`status_code` 0 = success)
 * even on HTTP 200.
 *
 * `output_format` selects how the audio comes back: `url` (a short-lived link,
 * valid for 24h — callers must download it before it expires) or `hex` (the raw
 * container inline, normalized here to base64 so the response matches the
 * OpenAI-shaped payload the other music branches return).
 */

import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../utils/error.ts";

type MinimaxMusicBody = Record<string, unknown>;

interface MinimaxMusicProviderConfig {
  baseUrl: string;
  /** Regional deployment of the same contract — see resolveEndpoint below. */
  regionalBaseUrl?: string;
}

interface MinimaxMusicCredentials {
  apiKey?: unknown;
  accessToken?: unknown;
  providerSpecificData?: { baseUrl?: unknown } | null;
}

interface MinimaxMusicLog {
  info?: (scope: string, message: string) => void;
  error?: (scope: string, message: string) => void;
}

interface MinimaxMusicArgs {
  model: string;
  provider: string;
  providerConfig: MinimaxMusicProviderConfig;
  body: MinimaxMusicBody;
  credentials?: MinimaxMusicCredentials | null;
  log?: MinimaxMusicLog | null;
}

/** Containers accepted by `audio_setting.format`. */
const AUDIO_FORMATS = new Set(["mp3", "wav", "pcm"]);
/** Accepted `output_format` values. */
const OUTPUT_FORMATS = new Set(["url", "hex"]);
/** Container assumed when the request does not pin `audio_setting.format`. */
const DEFAULT_AUDIO_FORMAT = "mp3";
/** `data.status`: 1 = still generating, 2 = finished. */
const STATUS_IN_PROGRESS = 1;
/** String request fields forwarded verbatim when the caller provides them. */
const STRING_REQUEST_FIELDS = [
  "prompt",
  "lyrics",
  "audio_url",
  "audio_base64",
  "cover_feature_id",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function numberValue(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function booleanValue(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

/** Fire-and-forget usage log for a MiniMax music-generation call. */
function logMinimaxMusicCall(params: {
  status: number;
  model: string;
  provider: string;
  duration: number;
  error?: string;
  requestBody?: unknown;
  responseBody?: unknown;
}): void {
  saveCallLog({
    method: "POST",
    path: "/v1/music/generations",
    ...params,
  }).catch(() => {});
}

/**
 * Endpoint for this call: the per-connection `providerSpecificData.baseUrl`
 * override (the same storage every configurable-base-URL provider uses) wins
 * over the registry default. That override is how a connection targets the
 * regional deployment declared as `regionalBaseUrl`.
 */
function resolveEndpoint(
  providerConfig: MinimaxMusicProviderConfig,
  credentials?: MinimaxMusicCredentials | null
): string {
  const psd = credentials?.providerSpecificData;
  const override = isRecord(psd) ? stringValue(psd.baseUrl) : undefined;
  return override || providerConfig.baseUrl;
}

/** True when `endpoint` is the regional deployment declared by the registry. */
function isRegionalEndpoint(endpoint: string, regionalBaseUrl?: string): boolean {
  if (!regionalBaseUrl) return false;
  try {
    return new URL(endpoint).host === new URL(regionalBaseUrl).host;
  } catch {
    return false;
  }
}

/** Forwards only the recognized `audio_setting` members, dropping unknown containers. */
function buildAudioSetting(body: MinimaxMusicBody): Record<string, unknown> | undefined {
  const provided: Record<string, unknown> = isRecord(body.audio_setting) ? body.audio_setting : {};
  const setting: Record<string, unknown> = {};

  const sampleRate = numberValue(provided.sample_rate);
  if (sampleRate !== undefined) setting.sample_rate = sampleRate;

  const bitrate = numberValue(provided.bitrate);
  if (bitrate !== undefined) setting.bitrate = bitrate;

  const format = stringValue(provided.format)?.toLowerCase();
  if (format && AUDIO_FORMATS.has(format)) setting.format = format;

  return Object.keys(setting).length > 0 ? setting : undefined;
}

/** Container reported back to the caller — mirrors what was asked upstream. */
function resolveAudioFormat(body: MinimaxMusicBody): string {
  const provided: Record<string, unknown> = isRecord(body.audio_setting) ? body.audio_setting : {};
  const format = stringValue(provided.format)?.toLowerCase();
  return format && AUDIO_FORMATS.has(format) ? format : DEFAULT_AUDIO_FORMAT;
}

function resolveOutputFormat(body: MinimaxMusicBody): string {
  const requested = stringValue(body.output_format)?.toLowerCase();
  return requested && OUTPUT_FORMATS.has(requested) ? requested : "url";
}

/**
 * Upstream request body. `stream` is pinned false: this route answers with a
 * single JSON payload, and streaming responses would also be restricted to the
 * hex output format.
 */
function buildUpstreamBody(
  model: string,
  body: MinimaxMusicBody,
  regional: boolean
): Record<string, unknown> {
  const request: Record<string, unknown> = {
    model,
    stream: false,
    output_format: resolveOutputFormat(body),
  };

  for (const field of STRING_REQUEST_FIELDS) {
    const value = stringValue(body[field]);
    if (value !== undefined) request[field] = value;
  }

  const audioSetting = buildAudioSetting(body);
  if (audioSetting) request.audio_setting = audioSetting;

  const lyricsOptimizer = booleanValue(body.lyrics_optimizer);
  if (lyricsOptimizer !== undefined) request.lyrics_optimizer = lyricsOptimizer;

  // `instrumental` is the spelling the other music branches already accept.
  const isInstrumental = booleanValue(body.is_instrumental) ?? booleanValue(body.instrumental);
  if (isInstrumental !== undefined) request.is_instrumental = isInstrumental;

  // Only the regional endpoint accepts a watermark flag.
  if (regional) {
    const watermark = booleanValue(body.aigc_watermark);
    if (watermark !== undefined) request.aigc_watermark = watermark;
  }

  return request;
}

async function readPayload(response: Response): Promise<Record<string, unknown>> {
  const rawText = await response.text();
  if (!rawText) return {};
  try {
    const parsed: unknown = JSON.parse(rawText);
    return isRecord(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

/** Hex payloads are normalized to base64; Buffer would silently drop bad nibbles. */
function hexAudioToBase64(audioHex: string): string {
  if (audioHex.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(audioHex)) {
    throw new Error("MiniMax music generation returned invalid hex audio");
  }
  return Buffer.from(audioHex, "hex").toString("base64");
}

/** `base_resp.status_code` is non-zero on failures that still answer HTTP 200. */
function readEnvelopeError(payload: Record<string, unknown>): string | undefined {
  const baseResp: Record<string, unknown> = isRecord(payload.base_resp) ? payload.base_resp : {};
  const statusCode = numberValue(baseResp.status_code);
  if (statusCode === undefined || statusCode === 0) return undefined;
  return stringValue(baseResp.status_msg) || `upstream status code ${statusCode}`;
}

export async function handleMinimaxMusicGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: MinimaxMusicArgs) {
  const startTime = Date.now();
  const token = stringValue(credentials?.apiKey) || stringValue(credentials?.accessToken);
  if (!token) {
    return { success: false as const, status: 401, error: "MiniMax API key is required" };
  }

  const modelId = stringValue(model);
  if (!modelId) {
    return { success: false as const, status: 400, error: "MiniMax music model is required" };
  }

  const endpoint = resolveEndpoint(providerConfig, credentials);
  const upstreamBody = buildUpstreamBody(
    modelId,
    body,
    isRegionalEndpoint(endpoint, providerConfig.regionalBaseUrl)
  );
  const audioFormat = resolveAudioFormat(body);
  const modelLabel = `${provider}/${modelId}`;

  log?.info?.(
    "MUSIC",
    `${modelLabel} (minimax-music) | prompt: "${String(body.prompt ?? "").slice(0, 60)}..." | ` +
      `output_format: ${upstreamBody.output_format} | audio_format: ${audioFormat}`
  );

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    const payload = await readPayload(response);

    if (!response.ok) {
      const errorMessage =
        readEnvelopeError(payload) || `MiniMax music generation failed (${response.status})`;
      log?.error?.("MUSIC", `${provider} minimax-music error ${response.status}: ${errorMessage}`);
      logMinimaxMusicCall({
        status: response.status,
        model: modelLabel,
        provider,
        duration: Date.now() - startTime,
        error: errorMessage,
        requestBody: upstreamBody,
      });
      return { success: false as const, status: response.status, error: errorMessage };
    }

    const envelopeError = readEnvelopeError(payload);
    if (envelopeError) {
      log?.error?.("MUSIC", `${provider} minimax-music rejected the request: ${envelopeError}`);
      logMinimaxMusicCall({
        status: 502,
        model: modelLabel,
        provider,
        duration: Date.now() - startTime,
        error: envelopeError,
        requestBody: upstreamBody,
      });
      return { success: false as const, status: 502, error: envelopeError };
    }

    const data: Record<string, unknown> = isRecord(payload.data) ? payload.data : {};

    // No task id and no query endpoint exist for this operation, so an
    // unfinished generation cannot be polled — surface it instead of hanging.
    if (numberValue(data.status) === STATUS_IN_PROGRESS) {
      const pending = "MiniMax music generation is still in progress; retry the request";
      logMinimaxMusicCall({
        status: 502,
        model: modelLabel,
        provider,
        duration: Date.now() - startTime,
        error: pending,
      });
      return { success: false as const, status: 502, error: pending };
    }

    const audio = stringValue(data.audio);
    if (!audio) {
      const errorMessage = "MiniMax music generation returned no audio";
      logMinimaxMusicCall({
        status: 502,
        model: modelLabel,
        provider,
        duration: Date.now() - startTime,
        error: errorMessage,
      });
      return { success: false as const, status: 502, error: errorMessage };
    }

    const track =
      upstreamBody.output_format === "hex"
        ? { b64_json: hexAudioToBase64(audio), format: audioFormat }
        : { url: audio, format: audioFormat };

    logMinimaxMusicCall({
      status: 200,
      model: modelLabel,
      provider,
      duration: Date.now() - startTime,
      responseBody: { audio_count: 1 },
    });

    return {
      success: true as const,
      data: { created: Math.floor(Date.now() / 1000), data: [track] },
    };
  } catch (err: unknown) {
    const errorMessage = sanitizeErrorMessage(err) || "Music provider error";
    log?.error?.("MUSIC", `${provider} minimax-music error: ${errorMessage}`);
    logMinimaxMusicCall({
      status: 502,
      model: modelLabel,
      provider,
      duration: Date.now() - startTime,
      error: errorMessage,
    });
    return { success: false as const, status: 502, error: errorMessage };
  }
}
