/**
 * SYNTX.ai audio: TTS (/v1/audio/speech), music (/v1/music/generations),
 * and transcription (/v1/audio/transcriptions).
 */
import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse, sanitizeErrorMessage } from "../utils/error.ts";
import { audioStreamResponse } from "../utils/audioResponse.ts";
import { saveCallLog } from "@/lib/usageDb";
import {
  SyntxMediaError,
  fetchSyntxMediaBytes,
  firstMediaUrl,
  mapSyntxAudioRequestSettings,
  resolveSyntxMediaTarget,
  resolveSyntxToken,
  runSyntxAudioGeneration,
  transcribeSyntxAudio,
} from "../services/syntxMedia.ts";
import { looksLikeJwt } from "../services/syntxAuth.ts";

type Creds = {
  apiKey?: string;
  accessToken?: string;
  providerSpecificData?: unknown;
};

function tokenFrom(credentials: Creds | null | undefined): string {
  return resolveSyntxToken({
    apiKey: credentials?.apiKey,
    accessToken: credentials?.accessToken,
    providerSpecificData: credentials?.providerSpecificData,
  });
}

export async function handleSyntxSpeech({
  model,
  body,
  credentials,
  fetchImpl = fetch,
}: {
  model: string;
  body: Record<string, unknown>;
  credentials: Creds | null | undefined;
  fetchImpl?: typeof fetch;
}): Promise<Response> {
  const input = typeof body.input === "string" ? body.input.trim() : "";
  if (!input) return errorResponse(400, "input is required");
  const token = tokenFrom(credentials);
  if (!looksLikeJwt(token)) {
    return errorResponse(401, "Missing SYNTX JWT — paste the Authorization Bearer token from syntx.ai");
  }

  try {
    const { aiName, modelType } = resolveSyntxMediaTarget(model, "speech");
    const settings = mapSyntxAudioRequestSettings(aiName, modelType, body);
    const result = await runSyntxAudioGeneration({
      token,
      model,
      prompt: input,
      kind: "speech",
      settings,
      fetchImpl,
    });
    const url = firstMediaUrl(result, "audio") || result.media[0]?.url;
    if (!url) return errorResponse(502, "SYNTX speech completed without an audio URL");
    const audioRes = await fetchImpl(url);
    return audioStreamResponse(audioRes);
  } catch (error) {
    const status = error instanceof SyntxMediaError ? error.status : 502;
    return errorResponse(
      status,
      sanitizeErrorMessage(error instanceof Error ? error.message : error) || "SYNTX speech failed"
    );
  }
}

export async function handleSyntxTranscription({
  model,
  file,
  credentials,
  fetchImpl = fetch,
}: {
  model: string;
  file: Blob & { name?: string };
  credentials: Creds | null | undefined;
  fetchImpl?: typeof fetch;
}): Promise<Response> {
  void model;
  const token = tokenFrom(credentials);
  if (!looksLikeJwt(token)) {
    return errorResponse(401, "Missing SYNTX JWT — paste the Authorization Bearer token from syntx.ai");
  }
  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const filename = typeof file.name === "string" && file.name ? file.name : "audio.mp3";
    const mimeType = file.type || "audio/mpeg";
    const text = await transcribeSyntxAudio({
      token,
      bytes,
      filename,
      mimeType,
      fetchImpl,
    });
    return Response.json({ text }, { headers: { ...CORS_HEADERS } });
  } catch (error) {
    const status = error instanceof SyntxMediaError ? error.status : 502;
    return errorResponse(
      status,
      sanitizeErrorMessage(error instanceof Error ? error.message : error) || "SYNTX transcription failed"
    );
  }
}

export async function handleSyntxMusicGeneration({
  model,
  provider,
  body,
  credentials,
  log,
  fetchImpl = fetch,
}: {
  model: string;
  provider: string;
  body: Record<string, unknown>;
  credentials: Creds | null | undefined;
  log?: { info?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void };
  fetchImpl?: typeof fetch;
}) {
  const startTime = Date.now();
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return { success: false, status: 400, error: "Prompt is required for SYNTX music generation" };
  }
  const token = tokenFrom(credentials);
  if (!looksLikeJwt(token)) {
    return {
      success: false,
      status: 401,
      error: "Missing SYNTX JWT — paste the Authorization Bearer token from syntx.ai",
    };
  }

  try {
    const { aiName, modelType } = resolveSyntxMediaTarget(model, "music");
    const settings = mapSyntxAudioRequestSettings(aiName, modelType, body);
    if (body.instrumental === true) settings.is_instrumental = true;
    const result = await runSyntxAudioGeneration({
      token,
      model,
      prompt,
      kind: "music",
      settings,
      fetchImpl,
    });
    const url = firstMediaUrl(result, "audio") || result.media[0]?.url;
    if (!url) {
      return { success: false, status: 502, error: "SYNTX music generation completed without an audio URL" };
    }
    const wantsBase64 = String(body.response_format || "").toLowerCase() === "b64_json";
    const item = wantsBase64
      ? { b64_json: (await fetchSyntxMediaBytes(url, fetchImpl)).bytes.toString("base64"), format: "mp3" }
      : { url, format: "mp3" };

    saveCallLog({
      method: "POST",
      path: "/v1/music/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
    }).catch(() => {});

    log?.info?.("MUSIC", `SYNTX generated music via ${model}`);
    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: [item] },
    };
  } catch (error) {
    const status = error instanceof SyntxMediaError ? error.status : 502;
    const message = sanitizeErrorMessage(error instanceof Error ? error.message : error);
    log?.error?.("MUSIC", `SYNTX music generation failed: ${message}`);
    return { success: false, status, error: message || "SYNTX music generation failed" };
  }
}
