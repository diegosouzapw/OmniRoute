import { getGrokBuildClientHeaders, GROK_BUILD_TOKEN_AUTH } from "../config/grokBuild.ts";
import { buildMultipartBody } from "../utils/audioMultipart.ts";
import { audioStreamResponse } from "../utils/audioResponse.ts";
import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse, sanitizeErrorMessage } from "../utils/error.ts";
import { checkAndRefreshToken } from "@/sse/services/tokenRefresh";
import { saveImageSuccessResult, saveImageErrorResult } from "./imageResult.ts";

type GrokCredentials = {
  accessToken?: string;
  apiKey?: string;
  refreshToken?: string;
  expiresAt?: string;
  connectionId?: string;
};

type GrokProvider = { baseUrl: string };

function requestError(message: string, status = 400): Error & { status: number } {
  return Object.assign(new Error(message), { status });
}

export async function getGrokMediaToken(credentials?: GrokCredentials | null): Promise<string> {
  if (!credentials?.accessToken) throw requestError("Grok OAuth access token is required", 401);
  const refreshed = await checkAndRefreshToken("grok-cli", credentials);
  const expiresAt = refreshed.expiresAt ? Date.parse(refreshed.expiresAt) : null;
  if (
    !refreshed.accessToken ||
    (expiresAt !== null && (!Number.isFinite(expiresAt) || expiresAt <= Date.now()))
  ) {
    throw requestError("Grok OAuth access token could not be renewed", 401);
  }
  return refreshed.accessToken;
}

export function grokMediaHeaders(token: string): Record<string, string> {
  return {
    ...getGrokBuildClientHeaders(),
    "X-XAI-Token-Auth": GROK_BUILD_TOKEN_AUTH,
    Authorization: `Bearer ${token}`,
  };
}

function failure(error: unknown): { success: false; status: number; error: string } {
  const candidate = error as { status?: unknown; name?: string } | null;
  const status = Number(candidate?.status);
  return {
    success: false,
    status:
      Number.isInteger(status) && status >= 400 && status <= 599
        ? status
        : ["AbortError", "TimeoutError"].includes(candidate?.name || "")
          ? 504
          : 502,
    error: sanitizeErrorMessage(error) || "Grok media request failed",
  };
}

async function requireSuccess(response: Response): Promise<void> {
  if (response.ok) return;
  const payload = await response.json().catch(() => null);
  const message =
    payload?.error?.message || payload?.message || `Grok media upstream error (${response.status})`;
  throw requestError(sanitizeErrorMessage(String(message)), response.status);
}

function buildGrokImagePayload(model: string, body: Record<string, unknown>) {
  const count = body.n ?? 1;
  const format = body.response_format ?? "url";
  if (!Number.isInteger(count) || Number(count) < 1 || Number(count) > 10)
    throw requestError("n must be an integer between 1 and 10");
  if (format !== "url" && format !== "b64_json")
    throw requestError("Grok images support url or b64_json response_format");
  const payload: Record<string, unknown> = {
    model,
    prompt: body.prompt,
    n: count,
    response_format: format,
  };
  if (body.size !== undefined) {
    if (body.size !== "1024x1024" && body.size !== "2048x2048")
      throw requestError(
        "Use 1024x1024, 2048x2048, or native aspect_ratio and resolution for Grok images"
      );
    payload.aspect_ratio = "1:1";
    payload.resolution = body.size === "2048x2048" ? "2k" : "1k";
  }
  for (const key of ["aspect_ratio", "resolution"])
    if (body[key] !== undefined) payload[key] = body[key];
  return payload;
}

export async function handleGrokImageGeneration({
  model,
  providerConfig,
  body,
  credentials,
  signal = null,
}: {
  model: string;
  providerConfig: GrokProvider;
  body: Record<string, unknown>;
  credentials?: GrokCredentials | null;
  signal?: AbortSignal | null;
}) {
  const startTime = Date.now();
  try {
    const payload = buildGrokImagePayload(model, body);
    const token = await getGrokMediaToken(credentials);
    const timeout = AbortSignal.timeout(120000);
    const response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: { ...grokMediaHeaders(token), "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
      redirect: "error",
    });
    await requireSuccess(response);
    const data = await response.json();
    if (!Array.isArray(data?.data) || !data.data.length)
      throw requestError("Grok image response contained no images", 502);
    return saveImageSuccessResult({
      provider: "grok-cli",
      model,
      startTime,
      created: data.created,
      images: data.data,
      responseBody: { images_count: data.data.length },
    });
  } catch (error) {
    const result = failure(error);
    return saveImageErrorResult({
      provider: "grok-cli",
      model,
      startTime,
      status: result.status,
      error: result.error,
    });
  }
}

const speechCodecs = new Set(["mp3", "wav", "pcm", "mulaw", "alaw"]);

function validateGrokSpeechSpeed(speed: unknown) {
  if (
    speed !== undefined &&
    (typeof speed !== "number" || !Number.isFinite(speed) || speed < 0.7 || speed > 1.5)
  )
    throw requestError("Grok speech speed must be between 0.7 and 1.5");
}

function buildGrokSpeechPayload(body: Record<string, unknown>) {
  const nativeFormat =
    body.output_format &&
    typeof body.output_format === "object" &&
    !Array.isArray(body.output_format)
      ? (body.output_format as Record<string, unknown>)
      : {};
  const codec = body.response_format ?? nativeFormat.codec ?? "mp3";
  if (typeof codec !== "string" || !speechCodecs.has(codec))
    throw requestError("Grok speech supports mp3, wav, pcm, mulaw, or alaw");
  validateGrokSpeechSpeed(body.speed);
  return {
    text: body.input,
    voice_id: body.voice_id ?? body.voice ?? "eve",
    language: body.language ?? "auto",
    output_format: { ...nativeFormat, codec },
    ...(body.speed !== undefined ? { speed: body.speed } : {}),
  };
}

export async function handleGrokSpeech(
  providerConfig: GrokProvider,
  body: Record<string, unknown>,
  credentials?: GrokCredentials | null
): Promise<Response> {
  try {
    const payload = buildGrokSpeechPayload(body);
    const token = await getGrokMediaToken(credentials);
    const response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: { ...grokMediaHeaders(token), "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(120000),
      redirect: "error",
    });
    await requireSuccess(response);
    return audioStreamResponse(response);
  } catch (error) {
    const result = failure(error);
    return errorResponse(result.status, result.error);
  }
}

export async function handleGrokTranscription(
  providerConfig: GrokProvider,
  file: Blob & { name?: unknown },
  model: string,
  credentials: GrokCredentials | null,
  formData: FormData
): Promise<Response> {
  try {
    const format = formData.get("response_format") ?? "json";
    if (!["json", "verbose_json", "text"].includes(String(format)))
      throw requestError("Grok transcription supports json, verbose_json, or text response_format");
    const fields: Record<string, string> = { model };
    for (const key of [
      "language",
      "diarize",
      "multichannel",
      "channels",
      "sample_rate",
      "audio_format",
      "format",
      "filler_words",
    ]) {
      const value = formData.get(key);
      if (typeof value === "string") fields[key] = value;
    }
    const token = await getGrokMediaToken(credentials);
    const multipart = await buildMultipartBody(file, fields);
    const response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: { ...grokMediaHeaders(token), "Content-Type": multipart.contentType },
      body: multipart.body,
      signal: AbortSignal.timeout(300000),
      redirect: "error",
    });
    await requireSuccess(response);
    const data = await response.json();
    if (typeof data?.text !== "string")
      throw requestError("Grok transcription response contained no text", 502);
    return format === "text"
      ? new Response(data.text, {
          headers: { ...CORS_HEADERS, "Content-Type": "text/plain; charset=utf-8" },
        })
      : Response.json(data, { headers: { ...CORS_HEADERS } });
  } catch (error) {
    const result = failure(error);
    return errorResponse(result.status, result.error);
  }
}
