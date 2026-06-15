/**
 * Vertex AI media generation client.
 *
 * Google's Vertex AI serves speech (Gemini TTS), transcription (Gemini), music
 * (Lyria) and video (Veo) — but through the same `aiplatform.googleapis.com`
 * surface that the chat executor authenticates against, NOT through the
 * third-party media registries (kie/suno/deepgram/…). This module reuses the
 * Vertex chat executor's auth (Service Account JSON → OAuth bearer, or Express
 * API key) and implements the verified per-model contracts:
 *
 * - Speech:        `{model}:generateContent` + responseModalities:["AUDIO"] → PCM L16 → WAV
 * - Transcription: `{model}:generateContent` with inline audio + text prompt → text
 * - Music (Lyria): `{model}:predict` → predictions[0].bytesBase64Encoded (WAV)
 * - Video (Veo):   `{model}:predictLongRunning` → poll `{model}:fetchPredictOperation`
 *                  → response.videos[0].bytesBase64Encoded (MP4)
 */

import { Buffer } from "node:buffer";
import { sleep } from "../utils/sleep.ts";
import {
  parseSAFromApiKey,
  getAccessToken,
  looksLikeServiceAccountJson,
  isExpressApiKey,
} from "./vertex.ts";

export interface VertexMediaCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
}

interface ResolvedVertexAuth {
  project: string;
  region: string;
  bearerToken: string | null;
  expressKey: string | null;
}

const DEFAULT_REGION = "us-central1";

function resolveRegion(credentials: VertexMediaCredentials | null | undefined): string {
  const psd = credentials?.providerSpecificData;
  if (psd && typeof psd === "object") {
    const region = (psd as Record<string, unknown>).region;
    if (typeof region === "string" && region.trim().length > 0) return region.trim();
  }
  return DEFAULT_REGION;
}

async function resolveVertexAuth(
  credentials: VertexMediaCredentials | null | undefined
): Promise<ResolvedVertexAuth> {
  const apiKey = typeof credentials?.apiKey === "string" ? credentials.apiKey.trim() : "";
  const region = resolveRegion(credentials);
  let bearerToken =
    typeof credentials?.accessToken === "string" && credentials.accessToken.trim().length > 0
      ? credentials.accessToken.trim()
      : null;
  let project = "";
  let expressKey: string | null = null;

  if (looksLikeServiceAccountJson(apiKey)) {
    const sa = parseSAFromApiKey(apiKey);
    project = typeof sa.project_id === "string" ? sa.project_id : "";
    if (!bearerToken) bearerToken = await getAccessToken(sa);
  } else if (isExpressApiKey(apiKey)) {
    expressKey = apiKey;
  }

  return { project, region, bearerToken, expressKey };
}

/**
 * Build the request URL + headers for a Vertex publisher-model action.
 * SA path → project-scoped regional endpoint + Bearer auth.
 * Express path (best-effort) → project-less global publisher endpoint + ?key=.
 */
function buildModelRequest(
  auth: ResolvedVertexAuth,
  model: string,
  action: string
): { url: string; headers: Record<string, string> } {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (auth.bearerToken && auth.project) {
    headers["Authorization"] = `Bearer ${auth.bearerToken}`;
    return {
      url: `https://${auth.region}-aiplatform.googleapis.com/v1/projects/${auth.project}/locations/${auth.region}/publishers/google/models/${model}:${action}`,
      headers,
    };
  }

  if (auth.expressKey) {
    return {
      url: `https://aiplatform.googleapis.com/v1/publishers/google/models/${model}:${action}?key=${encodeURIComponent(
        auth.expressKey
      )}`,
      headers,
    };
  }

  throw new Error(
    "Vertex AI requires a Service Account JSON (with project_id) or a Vertex AI Express API key"
  );
}

interface VertexHttpError extends Error {
  status?: number;
}

async function vertexError(res: Response): Promise<VertexHttpError> {
  let detail = "";
  try {
    detail = await res.text();
  } catch {
    /* ignore */
  }
  let message = `Vertex AI error (${res.status})`;
  if (detail) {
    try {
      const parsed = JSON.parse(detail);
      message = parsed?.error?.message || message;
    } catch {
      message = detail.slice(0, 300);
    }
  }
  const err = new Error(message) as VertexHttpError;
  err.status = res.status;
  return err;
}

/** Wrap raw little-endian 16-bit PCM mono samples in a minimal WAV container. */
export function pcmToWav(pcm: Buffer, sampleRate = 24000, channels = 1, bitsPerSample = 16): Buffer {
  const blockAlign = (channels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

function parseSampleRate(mimeType: string | undefined): number {
  if (!mimeType) return 24000;
  const match = /rate=(\d+)/i.exec(mimeType);
  return match ? parseInt(match[1], 10) : 24000;
}

function extractInlineAudio(
  data: unknown
): { base64: string; mimeType: string } | null {
  const parts = (data as { candidates?: Array<{ content?: { parts?: unknown[] } }> })?.candidates?.[0]
    ?.content?.parts;
  if (!Array.isArray(parts)) return null;
  for (const part of parts) {
    const inline = (part as { inlineData?: { data?: unknown; mimeType?: unknown } })?.inlineData;
    if (inline && typeof inline.data === "string" && inline.data.length > 0) {
      return {
        base64: inline.data,
        mimeType: typeof inline.mimeType === "string" ? inline.mimeType : "audio/L16;rate=24000",
      };
    }
  }
  return null;
}

function extractText(data: unknown): string {
  const parts = (data as { candidates?: Array<{ content?: { parts?: unknown[] } }> })?.candidates?.[0]
    ?.content?.parts;
  if (!Array.isArray(parts)) return "";
  return parts
    .map((part) => (part as { text?: unknown })?.text)
    .filter((text): text is string => typeof text === "string")
    .join("")
    .trim();
}

/** Gemini TTS → WAV audio buffer. */
export async function vertexGenerateSpeech(
  credentials: VertexMediaCredentials,
  options: { model: string; input: string; voice?: string }
): Promise<{ audio: Buffer; contentType: string }> {
  const auth = await resolveVertexAuth(credentials);
  const { url, headers } = buildModelRequest(auth, options.model, "generateContent");
  const payload = {
    contents: [{ role: "user", parts: [{ text: options.input }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: options.voice && options.voice.trim() ? options.voice.trim() : "Kore" },
        },
      },
    },
  };
  const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(payload) });
  if (!res.ok) throw await vertexError(res);
  const data = await res.json();
  const inline = extractInlineAudio(data);
  if (!inline) throw new Error("Vertex TTS returned no audio content");
  const pcm = Buffer.from(inline.base64, "base64");
  return { audio: pcmToWav(pcm, parseSampleRate(inline.mimeType)), contentType: "audio/wav" };
}

/** Gemini transcription (audio → text). `audioBase64` is the raw file bytes, base64-encoded. */
export async function vertexTranscribe(
  credentials: VertexMediaCredentials,
  options: { model: string; audioBase64: string; mimeType?: string; prompt?: string; language?: string }
): Promise<string> {
  const auth = await resolveVertexAuth(credentials);
  const { url, headers } = buildModelRequest(auth, options.model, "generateContent");
  const instruction =
    options.prompt && options.prompt.trim().length > 0
      ? options.prompt.trim()
      : `Transcribe this audio verbatim. Output only the spoken words${
          options.language ? ` (language: ${options.language})` : ""
        }, with no commentary.`;
  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          { text: instruction },
          { inlineData: { mimeType: options.mimeType || "audio/wav", data: options.audioBase64 } },
        ],
      },
    ],
  };
  const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(payload) });
  if (!res.ok) throw await vertexError(res);
  return extractText(await res.json());
}

/** Lyria music generation → { base64 WAV, format }. */
export async function vertexGenerateMusic(
  credentials: VertexMediaCredentials,
  options: { model?: string; prompt: string; negativePrompt?: string; sampleCount?: number; seed?: number }
): Promise<{ base64: string; format: string }> {
  const auth = await resolveVertexAuth(credentials);
  const model = options.model && options.model.trim() ? options.model.trim() : "lyria-002";
  const { url, headers } = buildModelRequest(auth, model, "predict");
  const instance: Record<string, unknown> = { prompt: options.prompt };
  if (options.negativePrompt) instance.negative_prompt = options.negativePrompt;
  if (typeof options.seed === "number") instance.seed = options.seed;
  const parameters: Record<string, unknown> = {};
  if (typeof options.sampleCount === "number") parameters.sample_count = options.sampleCount;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ instances: [instance], parameters }),
  });
  if (!res.ok) throw await vertexError(res);
  const data = await res.json();
  const base64 = (data as { predictions?: Array<{ bytesBase64Encoded?: unknown }> })?.predictions?.[0]
    ?.bytesBase64Encoded;
  if (typeof base64 !== "string" || base64.length === 0) {
    throw new Error("Vertex Lyria returned no audio");
  }
  return { base64, format: "wav" };
}

/** Veo video generation (async long-running) → { base64 MP4 or gcsUri, format }. */
export async function vertexGenerateVideo(
  credentials: VertexMediaCredentials,
  options: {
    model: string;
    prompt: string;
    aspectRatio?: string;
    durationSeconds?: number;
    sampleCount?: number;
    negativePrompt?: string;
    image?: { bytesBase64Encoded: string; mimeType: string };
    pollIntervalMs?: number;
    maxWaitMs?: number;
  }
): Promise<{ base64?: string; url?: string; format: string }> {
  const auth = await resolveVertexAuth(credentials);
  const submit = buildModelRequest(auth, options.model, "predictLongRunning");

  const instance: Record<string, unknown> = { prompt: options.prompt };
  if (options.image) instance.image = options.image;
  const parameters: Record<string, unknown> = {
    sampleCount: typeof options.sampleCount === "number" ? options.sampleCount : 1,
  };
  if (options.aspectRatio) parameters.aspectRatio = options.aspectRatio;
  if (typeof options.durationSeconds === "number") parameters.durationSeconds = options.durationSeconds;
  if (options.negativePrompt) parameters.negativePrompt = options.negativePrompt;

  const submitRes = await fetch(submit.url, {
    method: "POST",
    headers: submit.headers,
    body: JSON.stringify({ instances: [instance], parameters }),
  });
  if (!submitRes.ok) throw await vertexError(submitRes);
  const op = await submitRes.json();
  const operationName = (op as { name?: unknown })?.name;
  if (typeof operationName !== "string" || operationName.length === 0) {
    throw new Error("Vertex Veo did not return an operation name");
  }

  const poll = buildModelRequest(auth, options.model, "fetchPredictOperation");
  const intervalMs = options.pollIntervalMs && options.pollIntervalMs > 0 ? options.pollIntervalMs : 10000;
  const maxWaitMs = options.maxWaitMs && options.maxWaitMs > 0 ? options.maxWaitMs : 5 * 60 * 1000;
  const deadline = Date.now() + maxWaitMs;

  while (Date.now() < deadline) {
    await sleep(intervalMs);
    const pollRes = await fetch(poll.url, {
      method: "POST",
      headers: poll.headers,
      body: JSON.stringify({ operationName }),
    });
    if (!pollRes.ok) throw await vertexError(pollRes);
    const pollData = await pollRes.json();
    if ((pollData as { done?: unknown })?.done) {
      const opError = (pollData as { error?: { message?: unknown } })?.error;
      if (opError) throw new Error(String(opError.message || "Veo operation failed"));
      const videos = (pollData as { response?: { videos?: unknown } })?.response?.videos;
      const video = Array.isArray(videos) ? (videos[0] as Record<string, unknown>) : null;
      if (video && typeof video.bytesBase64Encoded === "string") {
        return { base64: video.bytesBase64Encoded, format: "mp4" };
      }
      if (video && typeof video.gcsUri === "string") {
        return { url: video.gcsUri, format: "mp4" };
      }
      throw new Error("Veo operation completed but returned no video");
    }
  }
  throw new Error("Vertex Veo video generation timed out");
}
