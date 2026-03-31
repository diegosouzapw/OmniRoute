/**
 * Audio Provider Registry
 *
 * Defines providers that support audio endpoints:
 * - /v1/audio/transcriptions (Whisper API)
 * - /v1/audio/speech (TTS API)
 */

interface AudioModel {
  id: string;
  name: string;
}

export interface AudioProvider {
  id: string;
  baseUrl: string;
  authType: string;
  authHeader: string;
  format?: string;
  async?: boolean;
  models: AudioModel[];
}

export const AUDIO_TRANSCRIPTION_PROVIDERS: Record<string, AudioProvider> = {
  openai: {
    id: "openai",
    baseUrl: "https://api.openai.com/v1/audio/transcriptions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "whisper-1", name: "Whisper 1" },
      { id: "gpt-4o-transcription", name: "GPT-4o Transcription" },
    ],
  },

  groq: {
    id: "groq",
    baseUrl: "https://api.groq.com/openai/v1/audio/transcriptions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "whisper-large-v3", name: "Whisper Large v3" },
      { id: "whisper-large-v3-turbo", name: "Whisper Large v3 Turbo" },
      { id: "distil-whisper-large-v3-en", name: "Distil Whisper Large v3 EN" },
    ],
  },

  deepgram: {
    id: "deepgram",
    baseUrl: "https://api.deepgram.com/v1/listen",
    authType: "apikey",
    authHeader: "token",
    format: "deepgram",
    models: [
      { id: "nova-3", name: "Nova 3" },
      { id: "nova-2", name: "Nova 2" },
      { id: "whisper-large", name: "Whisper Large" },
    ],
  },

  assemblyai: {
    id: "assemblyai",
    baseUrl: "https://api.assemblyai.com/v2/transcript",
    authType: "apikey",
    authHeader: "bearer",
    async: true,
    format: "assemblyai",
    models: [
      { id: "universal-3-pro", name: "Universal 3 Pro" },
      { id: "universal-2", name: "Universal 2" },
    ],
  },

  nvidia: {
    id: "nvidia",
    baseUrl: "https://integrate.api.nvidia.com/v1/audio/transcriptions",
    authType: "apikey",
    authHeader: "bearer",
    format: "nvidia-asr",
    models: [{ id: "nvidia/parakeet-ctc-1.1b-asr", name: "Parakeet CTC 1.1B" }],
  },

  huggingface: {
    id: "huggingface",
    baseUrl: "https://api-inference.huggingface.co/models",
    authType: "apikey",
    authHeader: "bearer",
    format: "huggingface-asr",
    models: [
      { id: "openai/whisper-large-v3", name: "Whisper Large v3 (HF)" },
      { id: "openai/whisper-small", name: "Whisper Small (HF)" },
    ],
  },

  qwen: {
    id: "qwen",
    baseUrl: "http://localhost:8000/v1/audio/transcriptions",
    authType: "none",
    authHeader: "none",
    format: "openai",
    models: [{ id: "qwen3-asr", name: "Qwen3 ASR" }],
  },
};

export const AUDIO_SPEECH_PROVIDERS: Record<string, AudioProvider> = {
  openai: {
    id: "openai",
    baseUrl: "https://api.openai.com/v1/audio/speech",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "tts-1", name: "TTS 1" },
      { id: "tts-1-hd", name: "TTS 1 HD" },
      { id: "gpt-4o-mini-tts", name: "GPT-4o Mini TTS" },
    ],
  },

  hyperbolic: {
    id: "hyperbolic",
    baseUrl: "https://api.hyperbolic.xyz/v1/audio/generation",
    authType: "apikey",
    authHeader: "bearer",
    format: "hyperbolic",
    models: [{ id: "melo-tts", name: "Melo TTS" }],
  },

  deepgram: {
    id: "deepgram",
    baseUrl: "https://api.deepgram.com/v1/speak",
    authType: "apikey",
    authHeader: "token",
    format: "deepgram",
    models: [
      { id: "aura-asteria-en", name: "Aura Asteria (EN)" },
      { id: "aura-luna-en", name: "Aura Luna (EN)" },
      { id: "aura-stella-en", name: "Aura Stella (EN)" },
    ],
  },

  nvidia: {
    id: "nvidia",
    baseUrl: "https://integrate.api.nvidia.com/v1/audio/speech",
    authType: "apikey",
    authHeader: "bearer",
    format: "nvidia-tts",
    models: [
      { id: "nvidia/fastpitch", name: "FastPitch" },
      { id: "nvidia/tacotron2", name: "Tacotron2" },
    ],
  },

  elevenlabs: {
    id: "elevenlabs",
    baseUrl: "https://api.elevenlabs.io/v1/text-to-speech",
    authType: "apikey",
    authHeader: "xi-api-key",
    format: "elevenlabs",
    models: [
      { id: "eleven_multilingual_v2", name: "Eleven Multilingual v2" },
      { id: "eleven_turbo_v2_5", name: "Eleven Turbo v2.5" },
    ],
  },

  huggingface: {
    id: "huggingface",
    baseUrl: "https://api-inference.huggingface.co/models",
    authType: "apikey",
    authHeader: "bearer",
    format: "huggingface-tts",
    models: [
      { id: "facebook/mms-tts-eng", name: "MMS TTS English" },
      { id: "microsoft/speecht5_tts", name: "SpeechT5 TTS" },
    ],
  },

  coqui: {
    id: "coqui",
    baseUrl: "http://localhost:5002/api/tts",
    authType: "none",
    authHeader: "none",
    format: "coqui",
    models: [{ id: "tts_models/en/ljspeech/tacotron2-DDC", name: "Tacotron2 DDC (LJSpeech)" }],
  },

  tortoise: {
    id: "tortoise",
    baseUrl: "http://localhost:5000/api/tts",
    authType: "none",
    authHeader: "none",
    format: "tortoise",
    models: [{ id: "tortoise-v2", name: "Tortoise v2" }],
  },

  qwen: {
    id: "qwen",
    baseUrl: "http://localhost:8000/v1/audio/speech",
    authType: "none",
    authHeader: "none",
    format: "openai",
    models: [{ id: "qwen3-tts", name: "Qwen3 TTS" }],
  },

  // ── Cloud TTS Providers (#248) ────────────────────────────────────────────

  inworld: {
    id: "inworld",
    // POST https://api.inworld.ai/tts/v1/voice
    // Auth: Authorization: Basic <api-key>
    // Response: JSON { audioContent: "<base64>", contentType, sampleRateHertz }
    baseUrl: "https://api.inworld.ai/tts/v1/voice",
    authType: "apikey",
    authHeader: "basic",
    format: "inworld",
    models: [
      { id: "inworld-tts-1.5-max", name: "Inworld TTS 1.5 Max" },
      { id: "inworld-tts-1.5-mini", name: "Inworld TTS 1.5 Mini" },
    ],
  },

  cartesia: {
    id: "cartesia",
    // POST https://api.cartesia.ai/tts/bytes
    // Auth: X-API-Key header, Cartesia-Version: 2024-06-10
    // Response: binary audio bytes
    baseUrl: "https://api.cartesia.ai/tts/bytes",
    authType: "apikey",
    authHeader: "x-api-key",
    format: "cartesia",
    models: [
      { id: "sonic-2", name: "Sonic 2" },
      { id: "sonic-3", name: "Sonic 3" },
    ],
  },

  playht: {
    id: "playht",
    // POST https://api.play.ht/api/v2/tts/stream
    // Auth: X-USER-ID + Authorization: Bearer <api-key>
    // Response: audio stream (mp3/wav)
    baseUrl: "https://api.play.ht/api/v2/tts/stream",
    authType: "apikey",
    authHeader: "playht",
    format: "playht",
    models: [
      { id: "PlayDialog", name: "PlayDialog" },
      { id: "Play3.0-mini", name: "Play3.0 Mini" },
    ],
  },
};

/**
 * Get transcription provider config by ID
 */
export function getTranscriptionProvider(providerId: string): AudioProvider | null {
  return AUDIO_TRANSCRIPTION_PROVIDERS[providerId] || null;
}

/**
 * Get speech provider config by ID
 */
export function getSpeechProvider(providerId: string): AudioProvider | null {
  return AUDIO_SPEECH_PROVIDERS[providerId] || null;
}

export interface ProviderNodeRow {
  prefix: string;
  name: string;
  baseUrl: string;
  apiType?: string;
}

/**
 * Build a dynamic AudioProvider from a provider_node DB entry.
 * Only used for local providers (localhost/127.0.0.1) — remote nodes are
 * excluded by the caller to prevent auth bypass and SSRF.
 */
export function buildDynamicAudioProvider(node: ProviderNodeRow, audioPath: string): AudioProvider {
  if (!node.prefix || !node.baseUrl) {
    throw new Error(`Invalid provider_node: missing prefix or baseUrl`);
  }
  const baseUrl = node.baseUrl.replace(/\/+$/, "");
  return {
    id: node.prefix,
    baseUrl: `${baseUrl}${audioPath}`,
    authType: "none",
    authHeader: "none",
    models: [],
  };
}

function parseAudioModel(
  modelStr: string | null,
  registry: Record<string, AudioProvider>,
  dynamicProviders?: AudioProvider[]
): { provider: string | null; model: string | null } {
  if (!modelStr) return { provider: null, model: null };

  // Phase 1: prefix match in hardcoded registry
  for (const [providerId] of Object.entries(registry)) {
    if (modelStr.startsWith(providerId + "/")) {
      return { provider: providerId, model: modelStr.slice(providerId.length + 1) };
    }
  }

  // Phase 2: bare model lookup in hardcoded registry
  for (const [providerId, config] of Object.entries(registry)) {
    if (config.models.some((m) => m.id === modelStr)) {
      return { provider: providerId, model: modelStr };
    }
  }

  // Phase 3: prefix match in dynamic providers (provider_nodes)
  if (dynamicProviders) {
    for (const dp of dynamicProviders) {
      if (modelStr.startsWith(dp.id + "/")) {
        return { provider: dp.id, model: modelStr.slice(dp.id.length + 1) };
      }
    }
  }

  return { provider: null, model: modelStr };
}

export function parseTranscriptionModel(
  modelStr: string | null,
  dynamicProviders?: AudioProvider[]
) {
  return parseAudioModel(modelStr, AUDIO_TRANSCRIPTION_PROVIDERS, dynamicProviders);
}

export function parseSpeechModel(modelStr: string | null, dynamicProviders?: AudioProvider[]) {
  return parseAudioModel(modelStr, AUDIO_SPEECH_PROVIDERS, dynamicProviders);
}

/**
 * Get all audio models as a flat list
 */
export function getAllAudioModels() {
  const models = [];

  for (const [providerId, config] of Object.entries(AUDIO_TRANSCRIPTION_PROVIDERS)) {
    for (const model of config.models) {
      models.push({
        id: model.id.startsWith(`${providerId}/`) ? model.id : `${providerId}/${model.id}`,
        name: model.name,
        provider: providerId,
        subtype: "transcription",
      });
    }
  }

  for (const [providerId, config] of Object.entries(AUDIO_SPEECH_PROVIDERS)) {
    for (const model of config.models) {
      models.push({
        id: model.id.startsWith(`${providerId}/`) ? model.id : `${providerId}/${model.id}`,
        name: model.name,
        provider: providerId,
        subtype: "speech",
      });
    }
  }

  return models;
}
