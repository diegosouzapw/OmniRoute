import { Buffer } from "node:buffer";
import { extractInlineAudio, parsePcmSampleRate, pcmToWav } from "./vertexMedia.ts";
import { CORS_HEADERS } from "../utils/cors.ts";
import { upstreamErrorResponse } from "../utils/audioResponse.ts";
import { errorResponse } from "../utils/error.ts";

type GeminiTtsCredentials = {
  apiKey?: string | null;
  accessToken?: string | null;
};

export class GeminiTtsUpstreamError extends Error {
  constructor(
    public readonly response: Response,
    public readonly body: string
  ) {
    super(`Gemini TTS upstream error (${response.status})`);
  }
}

export async function geminiGenerateSpeech(
  credentials: GeminiTtsCredentials,
  options: { model: string; text: string; voice: string }
): Promise<Buffer> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (credentials.apiKey) {
    headers["x-goog-api-key"] = credentials.apiKey;
  } else if (credentials.accessToken) {
    headers.Authorization = `Bearer ${credentials.accessToken}`;
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(options.model)}:generateContent`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        contents: [{ parts: [{ text: options.text }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: options.voice },
            },
          },
        },
      }),
    }
  );
  if (!response.ok) {
    throw new GeminiTtsUpstreamError(response, await response.text());
  }

  const inline = extractInlineAudio(await response.json());
  if (!inline) throw new Error("Gemini TTS response did not contain audio data");
  return pcmToWav(Buffer.from(inline.base64, "base64"), parsePcmSampleRate(inline.mimeType));
}

export async function handleGeminiTtsSpeech(
  credentials: GeminiTtsCredentials,
  options: { model: string; text: string; voice?: unknown }
): Promise<Response> {
  try {
    const wav = await geminiGenerateSpeech(credentials, {
      model: options.model,
      text: options.text,
      voice:
        typeof options.voice === "string" && options.voice.trim() ? options.voice.trim() : "Kore",
    });
    return new Response(new Uint8Array(wav), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "audio/wav" },
    });
  } catch (error) {
    if (error instanceof GeminiTtsUpstreamError) {
      return upstreamErrorResponse(error.response, error.body);
    }
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(500, `Speech request failed: ${message}`);
  }
}
