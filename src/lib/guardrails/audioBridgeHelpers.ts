import { AUDIO_TRANSCRIPTION_PROVIDERS } from "@omniroute/open-sse/config/audioRegistry.ts";
import { detectMediaParts } from "@omniroute/open-sse/utils/mediaParts";

import { getRuntimePorts } from "@/lib/runtime/ports";
import { fetchRemoteImage } from "@/shared/network/remoteImageFetch";
import { resolveSelfLoopBearer } from "@/shared/middleware/chatBodyAdmission";

import { hasUsableCredentialsForModel } from "./visionBridgeCredentials";

export type AudioCredentialCheck = (model: string) => Promise<boolean | null>;

export interface AudioPart {
  messageIndex: number;
  partIndex: number;
  ref: string;
  shape: "input_audio" | "audio_url" | "audio_source";
  format?: string;
}

export interface AudioTranscriptionConfig {
  model: string;
  timeoutMs: number;
}

export interface AudioTranscriptionDependencies {
  fetchImpl?: typeof fetch;
  fetchRemote?: (
    url: string,
    options: { signal: AbortSignal }
  ) => Promise<{ buffer: Buffer; contentType: string; url: string }>;
  getPort?: () => number;
  getBearer?: () => string;
}

const AUDIO_FORMAT_MIME: Record<string, string> = {
  aac: "audio/aac",
  flac: "audio/flac",
  m4a: "audio/mp4",
  mp3: "audio/mpeg",
  mp4: "audio/mp4",
  ogg: "audio/ogg",
  opus: "audio/opus",
  wav: "audio/wav",
  webm: "audio/webm",
};

const AUDIO_MIME_FORMAT: Record<string, string> = {
  "audio/aac": "aac",
  "audio/flac": "flac",
  "audio/mp4": "mp4",
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/ogg": "ogg",
  "audio/opus": "opus",
  "audio/wav": "wav",
  "audio/wave": "wav",
  "audio/webm": "webm",
  "audio/x-wav": "wav",
};

type AudioMessage = { role?: string; content?: unknown };

function formatFromRef(ref: string): string | undefined {
  const dataMime = /^data:([^;,]+)/i.exec(ref)?.[1]?.toLowerCase();
  if (dataMime) return AUDIO_MIME_FORMAT[dataMime];
  try {
    const pathname = new URL(ref).pathname;
    const extension = pathname.includes(".") ? pathname.split(".").pop()?.toLowerCase() : undefined;
    return extension && AUDIO_FORMAT_MIME[extension] ? extension : undefined;
  } catch {
    return undefined;
  }
}

function formatForDetectedPart(
  messages: ReadonlyArray<AudioMessage>,
  messageIndex: number,
  partIndex: number,
  ref: string
): string | undefined {
  const content = messages[messageIndex]?.content;
  const raw = Array.isArray(content) ? content[partIndex] : null;
  if (!raw || typeof raw !== "object") return formatFromRef(ref);
  const part = raw as Record<string, unknown>;
  const inputAudio = part.input_audio as Record<string, unknown> | undefined;
  if (typeof inputAudio?.format === "string" && inputAudio.format.trim()) {
    return inputAudio.format.trim().toLowerCase();
  }
  const source = part.source as Record<string, unknown> | undefined;
  if (typeof source?.media_type === "string") {
    return AUDIO_MIME_FORMAT[source.media_type.toLowerCase()] ?? formatFromRef(ref);
  }
  return formatFromRef(ref);
}

/** Extract only spliceable top-level audio parts from every message. */
export function extractAudioParts(
  messages: ReadonlyArray<AudioMessage> | undefined | null
): AudioPart[] {
  if (!Array.isArray(messages)) return [];
  return detectMediaParts(messages)
    .filter(
      (part) =>
        part.kind === "audio" &&
        !part.nested &&
        part.ref.length > 0 &&
        (part.shape === "input_audio" ||
          part.shape === "audio_url" ||
          part.shape === "audio_source")
    )
    .map((part) => ({
      messageIndex: part.messageIndex,
      partIndex: part.partIndex,
      ref: part.ref,
      shape: part.shape as AudioPart["shape"],
      format: formatForDetectedPart(messages, part.messageIndex, part.partIndex, part.ref),
    }));
}

/** Replace successful transcripts in place; null results preserve the original audio. */
export function replaceAudioParts<TBody extends { messages?: AudioMessage[] }>(
  body: TBody,
  parts: readonly AudioPart[],
  transcripts: readonly (string | null)[]
): TBody {
  const result = structuredClone(body);
  for (let index = 0; index < parts.length && index < transcripts.length; index++) {
    const transcript = transcripts[index];
    if (transcript === null) continue;
    const part = parts[index];
    const content = result.messages?.[part.messageIndex]?.content;
    if (!Array.isArray(content) || part.partIndex >= content.length) continue;
    content[part.partIndex] = { type: "text", text: transcript };
  }
  return result;
}

function listTranscriptionModels(): string[] {
  const models: string[] = [];
  for (const [providerId, provider] of Object.entries(AUDIO_TRANSCRIPTION_PROVIDERS)) {
    for (const model of provider.models) {
      models.push(model.id.startsWith(`${providerId}/`) ? model.id : `${providerId}/${model.id}`);
    }
  }
  return models;
}

/** Select a configured STT model, or the first catalog model with usable credentials. */
export async function selectAudioBridgeModel(
  configuredModel: string,
  hasUsableCredentials: AudioCredentialCheck = hasUsableCredentialsForModel
): Promise<string | null> {
  const fixed = configuredModel.trim();
  if (fixed && fixed !== "auto") {
    return (await hasUsableCredentials(fixed)) === false ? null : fixed;
  }

  for (const candidate of listTranscriptionModels()) {
    if ((await hasUsableCredentials(candidate)) === true) return candidate;
  }
  return null;
}

/** Send one audio part through OmniRoute's existing multipart transcription route. */
export async function callAudioTranscription(
  part: AudioPart,
  config: AudioTranscriptionConfig,
  deps: AudioTranscriptionDependencies = {}
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);
  try {
    let bytes: Buffer;
    let detectedMime: string | undefined;
    const dataUri = /^data:([^;,]+);base64,(.+)$/is.exec(part.ref);
    if (dataUri) {
      detectedMime = dataUri[1].toLowerCase();
      bytes = Buffer.from(dataUri[2], "base64");
    } else if (/^https?:\/\//i.test(part.ref)) {
      const fetchRemote =
        deps.fetchRemote ??
        ((url: string, options: { signal: AbortSignal }) =>
          fetchRemoteImage(url, {
            guard: "public-only",
            maxBytes: 25 * 1024 * 1024,
            pinDns: true,
            signal: options.signal,
            timeoutMs: config.timeoutMs,
          }));
      const remote = await fetchRemote(part.ref, { signal: controller.signal });
      bytes = remote.buffer;
      detectedMime = remote.contentType.split(";", 1)[0]?.trim().toLowerCase();
    } else {
      bytes = Buffer.from(part.ref, "base64");
    }

    const configuredFormat = part.format?.trim().toLowerCase();
    const format =
      configuredFormat || (detectedMime ? AUDIO_MIME_FORMAT[detectedMime] : undefined) || "wav";
    const mime =
      (detectedMime?.startsWith("audio/") ? detectedMime : undefined) ??
      AUDIO_FORMAT_MIME[format] ??
      "application/octet-stream";
    const file = new Blob([Uint8Array.from(bytes)], { type: mime });
    const form = new FormData();
    form.set("file", file, `audio.${format.replace(/[^a-z0-9]/g, "") || "wav"}`);
    form.set("model", config.model);

    const port = (deps.getPort ?? (() => getRuntimePorts().port))();
    const bearer = (deps.getBearer ?? resolveSelfLoopBearer)();
    const response = await (deps.fetchImpl ?? fetch)(
      `http://localhost:${port}/v1/audio/transcriptions`,
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${bearer}`,
        },
        body: form,
      }
    );
    if (!response.ok) {
      throw new Error(`Audio transcription failed (${response.status})`);
    }
    const data = (await response.json()) as { text?: unknown };
    if (typeof data.text !== "string") {
      throw new Error("Audio transcription returned an invalid response");
    }
    return data.text.trim();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Audio transcription timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
