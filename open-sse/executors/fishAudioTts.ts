import { errorResponse } from "../utils/error.ts";
import { audioStreamResponse, upstreamErrorResponse } from "../utils/audioResponse.ts";

const FISH_AUDIO_FORMATS = new Set(["wav", "pcm", "mp3", "opus"]);
const FISH_AUDIO_LATENCY = new Set(["low", "normal", "balanced"]);
const FISH_AUDIO_SAMPLE_RATES = new Set([8000, 16000, 24000, 32000, 44100, 48000]);
const FISH_AUDIO_MP3_BITRATES = new Set([64, 128, 192]);
const FISH_AUDIO_OPUS_BITRATES = new Set([-1000, 24000, 32000, 48000, 64000]);

type JsonRecord = Record<string, unknown>;

type FishAudioPayloadResult =
  | { payload: JsonRecord; error?: never }
  | { payload?: never; error: string };

function isJsonObject(value: unknown): value is JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeResponseFormat(value: unknown): string {
  if (typeof value !== "string" || !value) return "mp3";
  const lower = value.toLowerCase();
  return lower === "ogg" ? "opus" : lower;
}

function fishAudioOptions(body: JsonRecord): JsonRecord {
  const providerOptions = isJsonObject(body.provider_options) ? body.provider_options : {};
  return isJsonObject(providerOptions.fishaudio) ? providerOptions.fishaudio : {};
}

function numberOption(
  value: unknown,
  name: string,
  options: { min?: number; max?: number; integer?: boolean } = {}
): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${name} must be a finite number`);
  }
  if (options.integer && !Number.isInteger(value)) {
    throw new Error(`${name} must be an integer`);
  }
  if (options.min !== undefined && value < options.min) {
    throw new Error(`${name} must be >= ${options.min}`);
  }
  if (options.max !== undefined && value > options.max) {
    throw new Error(`${name} must be <= ${options.max}`);
  }
  return value;
}

function booleanOption(value: unknown, name: string): boolean | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "boolean") throw new Error(`${name} must be a boolean`);
  return value;
}

function enumOption<T extends string | number>(
  value: unknown,
  name: string,
  allowed: Set<T>
): T | undefined {
  if (value === undefined) return undefined;
  if (!allowed.has(value as T)) {
    throw new Error(`${name} must be one of: ${Array.from(allowed).join(", ")}`);
  }
  return value as T;
}

function setReferenceId(payload: JsonRecord, referenceId: unknown): void {
  if (referenceId === undefined) return;
  if (typeof referenceId === "string" && referenceId.trim()) {
    payload.reference_id = referenceId.trim();
    return;
  }
  if (
    Array.isArray(referenceId) &&
    referenceId.length > 0 &&
    referenceId.every((item) => typeof item === "string" && item.trim().length > 0)
  ) {
    payload.reference_id = referenceId.map((item) => item.trim());
    return;
  }
  throw new Error("reference_id must be a non-empty string or array of non-empty strings");
}

function applyGenerationOptions(payload: JsonRecord, options: JsonRecord): void {
  const values: Array<[string, unknown]> = [
    ["temperature", numberOption(options.temperature, "temperature", { min: 0, max: 1 })],
    ["top_p", numberOption(options.top_p, "top_p", { min: 0, max: 1 })],
    [
      "chunk_length",
      numberOption(options.chunk_length, "chunk_length", { min: 100, max: 300, integer: true }),
    ],
    ["normalize", booleanOption(options.normalize, "normalize")],
    ["sample_rate", enumOption(options.sample_rate, "sample_rate", FISH_AUDIO_SAMPLE_RATES)],
    ["mp3_bitrate", enumOption(options.mp3_bitrate, "mp3_bitrate", FISH_AUDIO_MP3_BITRATES)],
    ["opus_bitrate", enumOption(options.opus_bitrate, "opus_bitrate", FISH_AUDIO_OPUS_BITRATES)],
    ["latency", enumOption(options.latency, "latency", FISH_AUDIO_LATENCY)],
    [
      "max_new_tokens",
      numberOption(options.max_new_tokens, "max_new_tokens", { min: 1, integer: true }),
    ],
    [
      "repetition_penalty",
      numberOption(options.repetition_penalty, "repetition_penalty", { min: 0 }),
    ],
    [
      "min_chunk_length",
      numberOption(options.min_chunk_length, "min_chunk_length", { min: 0, max: 100, integer: true }),
    ],
    [
      "condition_on_previous_chunks",
      booleanOption(options.condition_on_previous_chunks, "condition_on_previous_chunks"),
    ],
    [
      "early_stop_threshold",
      numberOption(options.early_stop_threshold, "early_stop_threshold", { min: 0, max: 1 }),
    ],
  ];

  for (const [key, value] of values) {
    if (value !== undefined) payload[key] = value;
  }

  if (options.features !== undefined) {
    if (
      !Array.isArray(options.features) ||
      options.features.some((feature) => typeof feature !== "string" || !feature.trim())
    ) {
      throw new Error("features must be an array of non-empty strings");
    }
    payload.features = options.features.map((feature) => feature.trim());
  }
}

function applyProsody(payload: JsonRecord, body: JsonRecord, options: JsonRecord): void {
  const rawProsody = options.prosody;
  if (rawProsody !== undefined && rawProsody !== null && !isJsonObject(rawProsody)) {
    throw new Error("prosody must be an object");
  }
  const prosody = isJsonObject(rawProsody) ? rawProsody : {};
  const speed = numberOption(body.speed ?? prosody.speed, "prosody.speed", { min: 0.5, max: 2 });
  const volume = numberOption(prosody.volume, "prosody.volume", { min: -20, max: 20 });
  const normalizeLoudness = booleanOption(
    prosody.normalize_loudness,
    "prosody.normalize_loudness"
  );

  if (speed !== undefined || volume !== undefined || normalizeLoudness !== undefined) {
    payload.prosody = {
      ...(speed !== undefined ? { speed } : {}),
      ...(volume !== undefined ? { volume } : {}),
      ...(normalizeLoudness !== undefined ? { normalize_loudness: normalizeLoudness } : {}),
    };
  }
}

/**
 * Build Fish Audio's JSON TTS payload while keeping provider-specific controls
 * namespaced under `provider_options.fishaudio` in the OpenAI-compatible request.
 * Inline reference audio is intentionally not accepted here: Fish requires
 * MessagePack for that path. Use a persistent /model clone and pass its id.
 */
export function buildFishAudioSpeechPayload(body: JsonRecord): FishAudioPayloadResult {
  try {
    const options = fishAudioOptions(body);
    if (options.references !== undefined) {
      throw new Error(
        "inline references require Fish Audio MessagePack; create a persistent voice via /v1/providers/fishaudio/voices and pass its id as voice/reference_id"
      );
    }

    const format = enumOption(
      normalizeResponseFormat(body.response_format),
      "response_format",
      FISH_AUDIO_FORMATS
    );
    const payload: JsonRecord = {
      text: body.input,
      format: format || "mp3",
    };

    setReferenceId(payload, options.reference_id ?? body.voice);
    applyGenerationOptions(payload, options);
    applyProsody(payload, body, options);
    return { payload };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Invalid Fish Audio provider options" };
  }
}

/** Fish Audio TTS adapter for /v1/audio/speech. */
export async function handleFishAudioSpeech(
  providerConfig: { baseUrl: string },
  body: JsonRecord,
  modelId: string,
  token: string
): Promise<Response> {
  const built = buildFishAudioSpeechPayload(body);
  if (built.error) return errorResponse(400, `Fish Audio: ${built.error}`);

  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      model: modelId,
    },
    body: JSON.stringify(built.payload),
  });

  if (!res.ok) return upstreamErrorResponse(res, await res.text());
  return audioStreamResponse(res);
}
