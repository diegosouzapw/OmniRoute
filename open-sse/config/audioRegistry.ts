/**
 * Audio Provider Registry
 *
 * Defines providers that support audio endpoints:
 * - /v1/audio/transcriptions (Whisper API)
 * - /v1/audio/translations (Whisper translate-to-English API)
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
  supportedFormats?: string[];
  async?: boolean;
  models: AudioModel[];
}

export const AUDIO_TRANSCRIPTION_PROVIDERS: Record<string, AudioProvider> = {
  vertex: {
    id: "vertex",
    baseUrl: "https://us-central1-aiplatform.googleapis.com/v1",
    authType: "apikey",
    authHeader: "bearer",
    format: "vertex-gemini",
    models: [
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash (Vertex Transcribe)" },
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro (Vertex Transcribe)" },
      { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash (Vertex Transcribe)" },
    ],
  },

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

  openrouter: {
    id: "openrouter",
    baseUrl: "https://openrouter.ai/api/v1/audio/transcriptions",
    authType: "apikey",
    authHeader: "bearer",
    format: "openrouter-stt",
    supportedFormats: ["wav", "mp3", "flac", "m4a", "ogg", "webm", "aac"],
    models: [
      { id: "deepgram/nova-3", name: "Deepgram Nova-3" },
      { id: "microsoft/mai-transcribe-1.5", name: "Microsoft MAI-Transcribe 1.5" },
      { id: "nvidia/parakeet-tdt-0.6b-v3", name: "NVIDIA Parakeet TDT 0.6B v3" },
      { id: "mistralai/voxtral-mini-transcribe", name: "Mistral Voxtral Mini Transcribe" },
      { id: "qwen/qwen3-asr-flash-2026-02-10", name: "Qwen3 ASR Flash 2026-02-10" },
      { id: "google/chirp-3", name: "Google Chirp 3" },
      { id: "openai/gpt-4o-mini-transcribe", name: "OpenAI GPT-4o Mini Transcribe" },
      { id: "openai/whisper-large-v3", name: "OpenAI Whisper Large v3" },
      { id: "openai/whisper-large-v3-turbo", name: "OpenAI Whisper Large v3 Turbo" },
      { id: "openai/whisper-1", name: "OpenAI Whisper 1" },
      { id: "openai/gpt-4o-transcribe", name: "OpenAI GPT-4o Transcribe" },
    ],
  },

  cohere: {
    id: "cohere",
    baseUrl: "https://api.cohere.com/v2/audio/transcriptions",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "cohere-transcribe-03-2026", name: "Cohere Transcribe 2026-03" }],
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

  pollinations: {
    id: "pollinations",
    baseUrl: "https://gen.pollinations.ai/v1/audio/transcriptions",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [{ id: "whisper", name: "Pollinations Whisper (Free)" }],
  },

  together: {
    id: "together",
    baseUrl: "https://api.together.xyz/v1/audio/transcriptions",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [
      { id: "openai/whisper-large-v3", name: "Whisper Large v3" },
      { id: "openai/whisper-large-v3-turbo", name: "Whisper Large v3 Turbo" },
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
    models: [
      { id: "nvidia/parakeet-ctc-1.1b-asr", name: "Parakeet CTC 1.1B" },
      { id: "openai/whisper-large-v3", name: "Whisper Large v3 (NVIDIA)" },
    ],
  },

  huggingface: {
    id: "huggingface",
    baseUrl: "https://api-inference.huggingface.co/models",
    authType: "apikey",
    authHeader: "bearer",
    format: "huggingface-asr",
    models: [
      { id: "openai/whisper-large-v3-turbo", name: "Whisper Large v3 Turbo (HF)" },
      { id: "openai/whisper-large-v3", name: "Whisper Large v3 (HF)" },
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

  kie: {
    id: "kie",
    baseUrl: "https://api.kie.ai",
    authType: "apikey",
    authHeader: "bearer",
    format: "kie-audio",
    models: [
      { id: "elevenlabs/speech-to-text", name: "ElevenLabs STT" },
      { id: "elevenlabs/audio-isolation", name: "ElevenLabs Audio Isolation" },
    ],
  },

  gladia: {
    id: "gladia",
    // POST https://api.gladia.io/v2/pre-recorded — async workflow: upload → submit → poll
    // Auth: x-gladia-key: <API_KEY> (custom header, not a standard Bearer/Token scheme)
    // Free tier: 10 hours/month, no credit card required
    baseUrl: "https://api.gladia.io/v2/pre-recorded",
    authType: "apikey",
    authHeader: "x-gladia-key",
    async: true,
    format: "gladia",
    models: [
      { id: "solaria-1", name: "Solaria 1" },
      { id: "solaria-mini", name: "Solaria Mini" },
    ],
  },

  "rev-ai": {
    id: "rev-ai",
    baseUrl: "https://api.rev.ai/speechtotext/v1",
    authType: "apikey",
    authHeader: "bearer",
    async: true,
    format: "rev-ai",
    models: [
      { id: "machine", name: "Reverb ASR" },
      { id: "low_cost", name: "Low-Cost ASR" },
      { id: "fusion", name: "Fusion ASR" },
    ],
  },

  speechmatics: {
    id: "speechmatics",
    // POST https://asr.api.speechmatics.com/v2/jobs — async batch workflow:
    // submit multipart job (audio + JSON config) → poll → fetch transcript.
    // Auth: Authorization: Bearer <api-key>
    // Free tier: 8 hours/month, no credit card required.
    // Streaming (WebSocket real-time) mode is out of scope for v1 — batch only.
    baseUrl: "https://asr.api.speechmatics.com/v2/jobs",
    authType: "apikey",
    authHeader: "bearer",
    async: true,
    format: "speechmatics",
    models: [{ id: "enhanced", name: "Enhanced" }],
  },
};

/**
 * Providers that expose an OpenAI-Whisper-compatible /audio/translations
 * endpoint (translate-to-English). This is a narrower surface than
 * transcription: only Whisper-family models support it, and there is no
 * `language` input — output is always English regardless of source audio.
 */
export const AUDIO_TRANSLATION_PROVIDERS: Record<string, AudioProvider> = {
  openai: {
    id: "openai",
    baseUrl: "https://api.openai.com/v1/audio/translations",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "whisper-1", name: "Whisper 1" }],
  },

  groq: {
    id: "groq",
    baseUrl: "https://api.groq.com/openai/v1/audio/translations",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "whisper-large-v3", name: "Whisper Large v3" }],
  },
};

export const AUDIO_SPEECH_PROVIDERS: Record<string, AudioProvider> = {
  vertex: {
    id: "vertex",
    baseUrl: "https://us-central1-aiplatform.googleapis.com/v1",
    authType: "apikey",
    authHeader: "bearer",
    format: "vertex-gemini-tts",
    models: [
      { id: "gemini-3.1-flash-tts-preview", name: "Gemini 3.1 Flash TTS (Vertex)" },
      { id: "gemini-2.5-flash-preview-tts", name: "Gemini 2.5 Flash TTS (Vertex)" },
      { id: "gemini-2.5-pro-preview-tts", name: "Gemini 2.5 Pro TTS (Vertex)" },
    ],
  },

  openai: {
    id: "openai",
    baseUrl: "https://api.openai.com/v1/audio/speech",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "tts-1-hd", name: "TTS 1 HD" },
      { id: "tts-1", name: "TTS 1" },
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
      { id: "canopylabs/orpheus-3b-0.1-ft", name: "Orpheus 3B" },
      { id: "ResembleAI/chatterbox", name: "Chatterbox" },
      { id: "hexgrad/Kokoro-82M", name: "Kokoro TTS" },
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
    supportedFormats: ["mp3", "wav", "opus", "pcm"],
    models: [
      { id: "inworld-tts-2", name: "Inworld TTS 2" },
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
      { id: "sonic-3", name: "Sonic 3" },
      { id: "sonic-2", name: "Sonic 2" },
    ],
  },

  fishaudio: {
    id: "fishaudio",
    // POST https://api.fish.audio/v1/tts
    // Auth: Authorization: Bearer <api-key>, model as an HTTP header
    // Response: binary audio bytes
    baseUrl: "https://api.fish.audio/v1/tts",
    authType: "apikey",
    authHeader: "bearer",
    format: "fishaudio",
    models: [
      { id: "s1", name: "Fish Speech S1" },
      { id: "speech-1.6", name: "Fish Speech 1.6" },
      { id: "speech-1.5", name: "Fish Speech 1.5" },
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

  kie: {
    id: "kie",
    baseUrl: "https://api.kie.ai",
    authType: "apikey",
    authHeader: "bearer",
    format: "kie-audio",
    models: [
      { id: "elevenlabs/text-to-speech-multilingual-v2", name: "ElevenLabs TTS v2" },
      { id: "elevenlabs/text-to-speech-turbo-2-5", name: "ElevenLabs TTS Turbo 2.5" },
      { id: "elevenlabs/text-to-dialogue-v3", name: "ElevenLabs Text to Dialogue v3" },
      { id: "elevenlabs/sound-effect-v2", name: "ElevenLabs Sound Effect v2" },
    ],
  },

  "aws-polly": {
    id: "aws-polly",
    // POST https://polly.{region}.amazonaws.com/v1/speech
    // Auth: AWS SigV4. The provider apiKey stores Secret Access Key; PSD stores accessKeyId/region.
    baseUrl: "https://polly.us-east-1.amazonaws.com",
    authType: "apikey",
    authHeader: "aws-sigv4",
    format: "aws-polly",
    models: [
      { id: "standard", name: "Polly Standard" },
      { id: "neural", name: "Polly Neural" },
      { id: "long-form", name: "Polly Long-Form" },
      { id: "generative", name: "Polly Generative" },
    ],
  },
  pollinations: {
    id: "pollinations",
    baseUrl: "https://gen.pollinations.ai/v1/audio/speech",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [{ id: "default", name: "Pollinations TTS (Free)" }],
  },

  minimax: {
    id: "minimax",
    baseUrl: "https://api.minimax.io/v1/t2a_v2",
    authType: "apikey",
    authHeader: "bearer",
    format: "minimax-tts",
    models: [{ id: "speech-2.8-hd", name: "Speech 2.8 HD" }],
  },

  together: {
    id: "together",
    baseUrl: "https://api.together.xyz/v1/audio/speech",
    authType: "apikey",
    authHeader: "bearer",
    format: "openai",
    models: [
      { id: "cartesia/sonic-2", name: "Cartesia Sonic 2" },
      { id: "hexgrad/Kokoro-82M", name: "Kokoro 82M" },
      { id: "canopylabs/orpheus-3b-0.1-ft", name: "Orpheus 3B" },
    ],
  },

  edgetts: {
    id: "edgetts",
    // Microsoft Edge "Read Aloud" — reverse-engineered, no API key required.
    // WebSocket transport (unlike every other entry here) — handled by
    // open-sse/executors/edgeTts.ts, dispatched via the "edgetts" format.
    baseUrl: "wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1",
    authType: "none",
    authHeader: "none",
    format: "edgetts",
    supportedFormats: ["mp3"],
    models: [
      { id: "en-US-AriaNeural", name: "Aria (EN-US, Female)" },
      { id: "en-US-GuyNeural", name: "Guy (EN-US, Male)" },
      { id: "en-GB-SoniaNeural", name: "Sonia (EN-GB, Female)" },
      { id: "en-GB-RyanNeural", name: "Ryan (EN-GB, Male)" },
      { id: "es-ES-ElviraNeural", name: "Elvira (ES-ES, Female)" },
      { id: "pt-BR-FranciscaNeural", name: "Francisca (PT-BR, Female)" },
      { id: "pt-BR-AntonioNeural", name: "Antonio (PT-BR, Male)" },
      { id: "fr-FR-DeniseNeural", name: "Denise (FR-FR, Female)" },
      { id: "de-DE-KatjaNeural", name: "Katja (DE-DE, Female)" },
      { id: "ja-JP-NanamiNeural", name: "Nanami (JA-JP, Female)" },
      { id: "zh-CN-XiaoxiaoNeural", name: "Xiaoxiao (ZH-CN, Female)" },
    ],
  },

  gtts: {
    id: "gtts",
    // Google Translate TTS — reverse-engineered, no API key required.
    // POST batchexecute RPC (unlike the deprecated GET /translate_tts) —
    // handled by open-sse/executors/gtts.ts, dispatched via the "gtts" format.
    // No official SLA; per-IP rate-limited by Google without notice.
    baseUrl: "https://translate.google.com/_/TranslateWebserverUi/data/batchexecute",
    authType: "none",
    authHeader: "none",
    format: "gtts",
    supportedFormats: ["mp3"],
    models: [{ id: "default", name: "Google Translate TTS (Free)" }],
  },

  "xiaomi-mimo": {
    id: "xiaomi-mimo",
    baseUrl: "https://api.xiaomimimo.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    format: "xiaomi-mimo-tts",
    supportedFormats: ["mp3", "wav"],
    models: [
      { id: "mimo-v2.5-tts", name: "MiMo V2.5 TTS" },
      { id: "mimo-v2.5-tts-voicedesign", name: "MiMo V2.5 Voice Design" },
      { id: "mimo-v2.5-tts-voiceclone", name: "MiMo V2.5 Voice Clone" },
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
 * Get translation provider config by ID
 */
export function getTranslationProvider(providerId: string): AudioProvider | null {
  return AUDIO_TRANSLATION_PROVIDERS[providerId] || null;
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

export function parseTranslationModel(modelStr: string | null, dynamicProviders?: AudioProvider[]) {
  return parseAudioModel(modelStr, AUDIO_TRANSLATION_PROVIDERS, dynamicProviders);
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
