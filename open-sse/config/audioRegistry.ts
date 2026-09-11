/**
 * Audio Provider Registry
 *
 * Defines providers that support audio endpoints:
 * - /v1/audio/transcriptions (Whisper API)
 * - /v1/audio/translations (Whisper translate-to-English API)
 * - /v1/audio/speech (TTS API)
 */

import { getProviderAlias } from "@/shared/constants/providers";

interface AudioModel {
  id: string;
  name: string;
}

export interface AudioProvider {
  id: string;
  /**
   * Provider key to look credentials up under. Dynamic provider nodes are exposed
   * to callers under their `prefix` (that is what appears in `provider/model`),
   * but their connections are stored under the node **id** — without this the
   * credential lookup silently misses. Absent for hardcoded providers, where the
   * id already is the credential key.
   */
  credentialProviderId?: string;
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

  soniox: {
    id: "soniox",
    baseUrl: "https://api.soniox.com/v1/transcriptions",
    authType: "apikey",
    authHeader: "bearer",
    async: true,
    format: "soniox",
    models: [
      { id: "stt-async-v5", name: "Soniox STT Async v5" },
      { id: "stt-async-v4", name: "Soniox STT Async v4" },
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

  nanogpt: {
    id: "nanogpt",
    baseUrl: "https://nano-gpt.com/api/v1/audio/transcriptions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "whisper-1", name: "Whisper 1" },
      { id: "gpt-4o-transcription", name: "GPT-4o Transcription" },
    ],
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
  google: {
    id: "google",
    credentialProviderId: "gemini",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/models",
    authType: "apikey",
    authHeader: "x-goog-api-key",
    format: "gemini-tts",
    models: [
      { id: "gemini-3.1-flash-tts-preview", name: "Gemini 3.1 Flash TTS" },
      { id: "gemini-2.5-flash-preview-tts", name: "Gemini 2.5 Flash TTS" },
      { id: "gemini-2.5-pro-preview-tts", name: "Gemini 2.5 Pro TTS" },
    ],
  },
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

  soniox: {
    id: "soniox",
    baseUrl: "https://tts-rt.soniox.com/tts",
    authType: "apikey",
    authHeader: "bearer",
    format: "soniox-tts",
    models: [{ id: "tts-rt-v1", name: "Soniox TTS RT v1" }],
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

  nanogpt: {
    id: "nanogpt",
    baseUrl: "https://nano-gpt.com/api/v1/audio/speech",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "tts-1-hd", name: "TTS 1 HD" },
      { id: "tts-1", name: "TTS 1" },
    ],
  },

  // UC (uncensored.com) voice synthesis over its dedicated TTS WebSocket. Auth is
  // a Clerk session JWT minted per-connect from the durable connection cred; the
  // `format: "uc-tts"` branch in audioSpeech.ts drives the socket. The baseUrl is
  // a synthetic marker (the real transport is wss://tts-stream.chatuncensored.ai)
  // and is never fetched.
  uc: {
    id: "uc",
    baseUrl: "wss://tts-stream.chatuncensored.ai",
    authType: "web-cookie",
    authHeader: "none",
    format: "uc-tts",
    models: [{ id: "jade", name: "UC Voice (Jade)" }],
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
  /** provider_node row id — the key its connections (and credentials) are stored under. */
  id?: string;
  prefix: string;
  name: string;
  baseUrl: string;
  apiType?: string;
}

/** Hosts reachable only from the operator's machine/Docker network. */
export function isLoopbackNodeHost(baseUrl: string): boolean {
  try {
    const hostname = new URL(baseUrl).hostname;
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(hostname)
    );
  } catch {
    return false;
  }
}

/**
 * Build a dynamic AudioProvider from a provider_node DB entry.
 *
 * Loopback nodes keep `authType: "none"` — a local Ollama/LM Studio has no key and
 * must not be blocked on a missing credential. A remote node is the opposite: it is
 * only reachable when the operator opted in, and it must present the credential
 * stored on its connection, so it is built as an api-key provider keyed by the node
 * id (`credentialProviderId`) rather than by the caller-facing prefix.
 */
export function buildDynamicAudioProvider(node: ProviderNodeRow, audioPath: string): AudioProvider {
  if (!node.prefix || !node.baseUrl) {
    throw new Error(`Invalid provider_node: missing prefix or baseUrl`);
  }
  const baseUrl = node.baseUrl.replace(/\/+$/, "");
  const isLocal = isLoopbackNodeHost(node.baseUrl);
  return {
    id: node.prefix,
    ...(node.id ? { credentialProviderId: node.id } : {}),
    baseUrl: `${baseUrl}${audioPath}`,
    authType: isLocal ? "none" : "apikey",
    authHeader: isLocal ? "none" : "bearer",
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

  // Phase 1.5: prefix match against the short provider alias the catalog itself
  // advertises (e.g. "el/eleven_multilingual_v2" for elevenlabs) when it differs
  // from the canonical registry key already tried in Phase 1.
  for (const [providerId] of Object.entries(registry)) {
    const alias = getProviderAlias(providerId);
    if (alias && alias !== providerId && modelStr.startsWith(alias + "/")) {
      return { provider: providerId, model: modelStr.slice(alias.length + 1) };
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

export interface AudioProviderMatch {
  provider: string;
  model: string;
  config: AudioProvider;
}

/**
 * Candidate model ids to try when the prefix-matched provider has no credentials.
 * Includes the raw request string (a gateway may list `deepgram/nova-3` as its
 * own model id) plus the parsed native id and `provider/model`.
 */
export function audioModelAliasCandidates(
  originalModel: string,
  failedProvider: string,
  resolvedModel: string | null
): string[] {
  const candidates = [originalModel];
  if (resolvedModel) {
    candidates.push(resolvedModel);
    candidates.push(`${failedProvider}/${resolvedModel}`);
  }
  return [...new Set(candidates.filter(Boolean))];
}

/**
 * Find another registry provider that lists one of the candidate model ids.
 * Used when `deepgram/nova-3` prefix-matches native Deepgram but only a
 * gateway such as OpenRouter has credentials for that model id.
 */
export function findAlternateAudioProvider(
  registry: Record<string, AudioProvider>,
  failedProvider: string,
  candidates: string[]
): AudioProviderMatch | null {
  const seen = new Set<string>();
  for (const candidate of candidates) {
    if (!candidate || seen.has(candidate)) continue;
    seen.add(candidate);
    for (const [providerId, config] of Object.entries(registry)) {
      if (providerId === failedProvider) continue;
      if (config.models.some((m) => m.id === candidate)) {
        return { provider: providerId, model: candidate, config };
      }
    }
  }
  return null;
}

/** Qualified catalog ids (`gateway/model`) that list the same nested model. */
export function listAlternateAudioModelIds(
  registry: Record<string, AudioProvider>,
  failedProvider: string,
  candidates: string[]
): string[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const candidate of candidates) {
    if (!candidate) continue;
    for (const [providerId, config] of Object.entries(registry)) {
      if (providerId === failedProvider) continue;
      if (!config.models.some((m) => m.id === candidate)) continue;
      const id = `${providerId}/${candidate}`;
      if (seen.has(id)) continue;
      seen.add(id);
      ids.push(id);
    }
  }
  return ids;
}

export function missingAudioProviderCredentialsMessage(
  provider: string,
  alternateIds: string[] = []
): string {
  const base = `No credentials for provider: ${provider}`;
  if (alternateIds.length === 0) return base;
  return `${base}. The catalog also lists this model as ${alternateIds.join(", ")}`;
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
