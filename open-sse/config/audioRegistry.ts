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

interface AudioProvider {
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

/**
 * Parse audio model string (format: "provider/model" or just "model")
 */
function parseAudioModel(modelStr: string | null, registry: Record<string, AudioProvider>): { provider: string | null; model: string | null } {
  if (!modelStr) return { provider: null, model: null };

  for (const [providerId, config] of Object.entries(registry)) {
    if (modelStr.startsWith(providerId + "/")) {
      return { provider: providerId, model: modelStr.slice(providerId.length + 1) };
    }
  }

  for (const [providerId, config] of Object.entries(registry)) {
    if (config.models.some((m) => m.id === modelStr)) {
      return { provider: providerId, model: modelStr };
    }
  }

  return { provider: null, model: modelStr };
}

export function parseTranscriptionModel(modelStr: string | null) {
  return parseAudioModel(modelStr, AUDIO_TRANSCRIPTION_PROVIDERS);
}

export function parseSpeechModel(modelStr: string | null) {
  return parseAudioModel(modelStr, AUDIO_SPEECH_PROVIDERS);
}

/**
 * Get all audio models as a flat list
 */
export function getAllAudioModels() {
  const models = [];

  for (const [providerId, config] of Object.entries(AUDIO_TRANSCRIPTION_PROVIDERS)) {
    for (const model of config.models) {
      models.push({
        id: `${providerId}/${model.id}`,
        name: model.name,
        provider: providerId,
        subtype: "transcription",
      });
    }
  }

  for (const [providerId, config] of Object.entries(AUDIO_SPEECH_PROVIDERS)) {
    for (const model of config.models) {
      models.push({
        id: `${providerId}/${model.id}`,
        name: model.name,
        provider: providerId,
        subtype: "speech",
      });
    }
  }

  return models;
}
