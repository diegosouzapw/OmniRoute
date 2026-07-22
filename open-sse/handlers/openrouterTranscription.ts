import { Buffer } from "node:buffer";
/**
 * OpenRouter Transcription Handler
 *
 * Extracted from audioTranscription.ts to keep that file under the file-size
 * cap. Handles the OpenRouter-specific `openrouter-stt` provider format, which
 * uses a dedicated JSON STT endpoint (`input_audio` { data: base64, format })
 * rather than the standard Whisper-style multipart proxy.
 */

import type { AudioProvider } from "../config/audioRegistry.ts";
import { buildAuthHeaders } from "../config/registryUtils.ts";
import { errorResponse } from "../utils/error.ts";
import { upstreamErrorResponse } from "./audioTranscription.ts";

/**
 * Resolve the audio container format OpenRouter's dedicated STT endpoint
 * expects, from the uploaded file's extension first, then its MIME type.
 * Falls back to "wav" when neither is recognisable.
 */
export function resolveOpenRouterAudioFormat(file: Blob & { name?: unknown }): string {
  const fileName = typeof file.name === "string" ? file.name.toLowerCase() : "";
  const extension = fileName.includes(".") ? fileName.split(".").pop() || "" : "";
  if (["wav", "mp3", "flac", "m4a", "ogg", "webm", "aac"].includes(extension)) {
    return extension;
  }
  const mimeFormats: Record<string, string> = {
    "audio/wav": "wav",
    "audio/x-wav": "wav",
    "audio/mpeg": "mp3",
    "audio/mp3": "mp3",
    "audio/flac": "flac",
    "audio/x-flac": "flac",
    "audio/mp4": "m4a",
    "audio/ogg": "ogg",
    "audio/webm": "webm",
    "audio/aac": "aac",
  };
  // Browser-recorded blobs carry codec params (e.g. "audio/webm;codecs=opus");
  // match on the base MIME type only.
  const mimeType = (file.type || "").split(";")[0].trim().toLowerCase();
  return mimeFormats[mimeType] || "wav";
}

/**
 * Handle OpenRouter transcription via its dedicated STT endpoint.
 * Converts the multipart audio upload into OpenRouter's JSON
 * `input_audio` { data: base64, format } shape and forwards optional
 * language / temperature / response_format / timestamp_granularities fields
 * when present (temperature is coerced to a number for the JSON payload).
 */
export async function handleOpenRouterTranscription(
  provider: AudioProvider,
  file: Blob & { name?: unknown },
  model: string | null,
  token: string | null,
  formData: FormData
): Promise<Response> {
  const body: Record<string, unknown> = {
    model,
    input_audio: {
      data: Buffer.from(await file.arrayBuffer()).toString("base64"),
      format: resolveOpenRouterAudioFormat(file),
    },
  };
  const language = formData.get("language");
  if (language !== null) body.language = String(language);

  const responseFormat = formData.get("response_format");
  if (responseFormat !== null) body.response_format = String(responseFormat);

  // temperature arrives as a string from multipart form data; the JSON payload
  // needs a number or the upstream API rejects it.
  const temperature = formData.get("temperature");
  if (temperature !== null) {
    const parsed = Number.parseFloat(String(temperature));
    if (!Number.isNaN(parsed)) body.temperature = parsed;
  }

  // Forward timestamp granularities as a JSON array (the multipart path sends
  // them as repeated `timestamp_granularities[]` fields).
  const granularities = formData.getAll("timestamp_granularities[]");
  if (granularities.length > 0) {
    body.timestamp_granularities = granularities.map(String);
  }
  try {
    const res = await fetch(provider.baseUrl, {
      method: "POST",
      headers: { ...buildAuthHeaders(provider, token), "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return upstreamErrorResponse(res, await res.text());
    return new Response(await res.text(), {
      status: res.status,
      headers: { "Content-Type": res.headers.get("content-type") || "application/json" },
    });
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return errorResponse(500, `Transcription request failed: ${error.message}`);
  }
}
