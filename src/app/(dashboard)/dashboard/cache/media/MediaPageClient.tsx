"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { IMAGE_PROVIDERS } from "@omniroute/open-sse/config/imageRegistry.ts";
import { AI_PROVIDERS } from "@/shared/constants/providers";

type Modality = "image" | "video" | "music" | "speech" | "transcription";
type GenerationResult = {
  type: Modality;
  data: any;
  timestamp: number;
  audioUrl?: string;
};

const PROVIDER_METADATA = AI_PROVIDERS as Record<string, { name?: string }>;
const IMAGE_PROVIDER_MODELS = Object.entries(IMAGE_PROVIDERS).map(([providerId, config]) => ({
  id: providerId,
  name: PROVIDER_METADATA[providerId]?.name || providerId,
  models: config.models.map((model) => ({
    id: `${providerId}/${model.id}`,
    name: model.name,
  })),
}));
const IMAGE_PROVIDERS_REQUIRING_CREDENTIALS = Object.entries(IMAGE_PROVIDERS)
  .filter(([, config]) => config.authType !== "none")
  .map(([providerId]) => providerId);

const MODALITY_CONFIG: Record<
  Modality,
  {
    icon: string;
    endpoint: string;
    label: string;
    placeholder?: string;
    color: string;
    textLabel?: string;
    needsCredentials: string[];
  }
> = {
  image: {
    icon: "image",
    endpoint: "/api/v1/images/generations",
    label: "Image Generation",
    placeholder: "A serene landscape with mountains at sunset...",
    color: "from-purple-500 to-pink-500",
    needsCredentials: IMAGE_PROVIDERS_REQUIRING_CREDENTIALS,
  },
  video: {
    icon: "videocam",
    endpoint: "/api/v1/videos/generations",
    label: "Video Generation",
    placeholder: "A timelapse of a flower blooming...",
    color: "from-blue-500 to-cyan-500",
    needsCredentials: [],
  },
  music: {
    icon: "music_note",
    endpoint: "/api/v1/music/generations",
    label: "Music Generation",
    placeholder: "Upbeat electronic music with synth pads...",
    color: "from-orange-500 to-yellow-500",
    needsCredentials: [],
  },
  speech: {
    icon: "record_voice_over",
    endpoint: "/api/v1/audio/speech",
    label: "Text to Speech",
    placeholder: "Hello! Welcome to OmniRoute, your intelligent AI gateway...",
    color: "from-green-500 to-teal-500",
    textLabel: "Text",
    needsCredentials: ["openai", "elevenlabs", "deepgram"],
  },
  transcription: {
    icon: "mic",
    endpoint: "/api/v1/audio/transcriptions",
    label: "Transcription",
    placeholder: "Upload an audio file to transcribe...",
    color: "from-indigo-500 to-blue-500",
    needsCredentials: ["deepgram", "groq", "openai"],
  },
};

// Provider+model registry (image is derived from the runtime image registry to avoid drift)
const PROVIDER_MODELS: Record<
  Modality,
  { id: string; name: string; models: { id: string; name: string }[] }[]
> = {
  image: IMAGE_PROVIDER_MODELS,
  video: [
    {
      id: "comfyui",
      name: "ComfyUI",
      models: [
        { id: "comfyui/animatediff", name: "AnimateDiff" },
        { id: "comfyui/svd", name: "Stable Video Diffusion" },
      ],
    },
    {
      id: "sdwebui",
      name: "SD WebUI",
      models: [{ id: "sdwebui/animatediff", name: "AnimateDiff (Local)" }],
    },
  ],
  music: [
    {
      id: "comfyui",
      name: "ComfyUI",
      models: [
        { id: "comfyui/stable-audio", name: "Stable Audio Open" },
        { id: "comfyui/musicgen", name: "MusicGen" },
      ],
    },
  ],
  speech: [
    {
      id: "openai",
      name: "OpenAI",
      models: [
        { id: "openai/tts-1", name: "TTS-1" },
        { id: "openai/tts-1-hd", name: "TTS-1 HD" },
        { id: "openai/gpt-4o-mini-tts", name: "GPT-4o Mini TTS" },
      ],
    },
    {
      id: "elevenlabs",
      name: "ElevenLabs",
      models: [
        { id: "elevenlabs/eleven_multilingual_v2", name: "Eleven Multilingual v2" },
        { id: "elevenlabs/eleven_turbo_v2_5", name: "Eleven Turbo v2.5" },
      ],
    },
    {
      id: "deepgram",
      name: "Deepgram",
      models: [
        { id: "deepgram/aura-asteria-en", name: "Aura Asteria (EN)" },
        { id: "deepgram/aura-luna-en", name: "Aura Luna (EN)" },
        { id: "deepgram/aura-stella-en", name: "Aura Stella (EN)" },
      ],
    },
    {
      id: "hyperbolic",
      name: "Hyperbolic",
      models: [{ id: "hyperbolic/melo-tts", name: "Melo TTS" }],
    },
    {
      id: "nvidia",
      name: "NVIDIA NIM",
      models: [
        { id: "nvidia/fastpitch", name: "FastPitch" },
        { id: "nvidia/tacotron2", name: "Tacotron2" },
      ],
    },
    {
      id: "inworld",
      name: "Inworld",
      models: [
        { id: "inworld/inworld-tts-1.5-max", name: "Inworld TTS Max" },
        { id: "inworld/inworld-tts-1.5-mini", name: "Inworld TTS Mini" },
      ],
    },
    {
      id: "cartesia",
      name: "Cartesia",
      models: [
        { id: "cartesia/sonic-2", name: "Sonic 2" },
        { id: "cartesia/sonic-3", name: "Sonic 3" },
      ],
    },
    {
      id: "playht",
      name: "PlayHT",
      models: [
        { id: "playht/PlayDialog", name: "PlayDialog" },
        { id: "playht/Play3.0-mini", name: "Play3.0 Mini" },
      ],
    },
    {
      id: "huggingface",
      name: "HuggingFace",
      models: [{ id: "huggingface/espnet/kan-bayashi_ljspeech_vits", name: "VITS LJSpeech" }],
    },
    { id: "qwen", name: "Qwen", models: [{ id: "qwen/qwen3-tts", name: "Qwen3 TTS" }] },
  ],
  transcription: [
    {
      id: "deepgram",
      name: "Deepgram ($200 free)",
      models: [
        { id: "deepgram/nova-3", name: "Nova 3 (Best)" },
        { id: "deepgram/nova-2", name: "Nova 2" },
        { id: "deepgram/enhanced", name: "Enhanced" },
        { id: "deepgram/base", name: "Base" },
      ],
    },
    {
      id: "assemblyai",
      name: "AssemblyAI ($50 free)",
      models: [
        { id: "assemblyai/universal-3-pro", name: "Universal 3 Pro (Best)" },
        { id: "assemblyai/universal-2", name: "Universal 2" },
        { id: "assemblyai/nano", name: "Nano (Fast)" },
      ],
    },
    {
      id: "groq",
      name: "Groq (Free — Whisper)",
      models: [
        { id: "groq/whisper-large-v3", name: "Whisper Large v3 (Free)" },
        { id: "groq/whisper-large-v3-turbo", name: "Whisper Turbo (Free)" },
      ],
    },
    {
      id: "openai",
      name: "OpenAI",
      models: [
        { id: "openai/whisper-1", name: "Whisper 1" },
        { id: "openai/gpt-4o-transcription", name: "GPT-4o Transcription" },
      ],
    },
    {
      id: "nvidia",
      name: "NVIDIA NIM",
      models: [{ id: "nvidia/nvidia/parakeet-ctc-1.1b-asr", name: "Parakeet CTC 1.1B" }],
    },
    {
      id: "huggingface",
      name: "HuggingFace",
      models: [{ id: "huggingface/openai/whisper-large-v3", name: "Whisper Large v3 (HF)" }],
    },
    { id: "qwen", name: "Qwen", models: [{ id: "qwen/qwen3-asr", name: "Qwen3 ASR" }] },
  ],
};

// Voice presets per TTS provider
const VOICE_PRESETS: Record<string, { id: string; label: string }[]> = {
  default: [
    { id: "alloy", label: "Alloy" },
    { id: "echo", label: "Echo" },
    { id: "fable", label: "Fable" },
    { id: "onyx", label: "Onyx" },
    { id: "nova", label: "Nova" },
    { id: "shimmer", label: "Shimmer" },
  ],
  elevenlabs: [
    { id: "21m00Tcm4TlvDq8ikWAM", label: "Rachel (EN)" },
    { id: "AZnzlk1XvdvUeBnXmlld", label: "Domi (EN)" },
    { id: "EXAVITQu4vr4xnSDxMaL", label: "Bella (EN)" },
    { id: "ErXwobaYiN019PkySvjV", label: "Antoni (EN)" },
    { id: "MF3mGyEYCl7XYWbV9V6O", label: "Elli (EN)" },
    { id: "TxGEqnHWrfWFTfGW9XjX", label: "Josh (EN)" },
    { id: "VR6AewLTigWG4xSOukaG", label: "Arnold (EN)" },
    { id: "pNInz6obpgDQGcFmaJgB", label: "Adam (EN)" },
    { id: "yoZ06aMxZJJ28mfd3POQ", label: "Sam (EN)" },
  ],
  cartesia: [
    { id: "a0e99841-438c-4a64-b679-ae501e7d6091", label: "Barbershop Man" },
    { id: "694f9389-aac1-45b6-b726-9d9369183238", label: "Friendly Reading Man" },
    { id: "b7d50908-b17c-442d-ad8d-810c63997ed9", label: "California Girl" },
  ],
  deepgram: [
    { id: "aura-asteria-en", label: "Asteria (EN)" },
    { id: "aura-luna-en", label: "Luna (EN)" },
    { id: "aura-stella-en", label: "Stella (EN)" },
    { id: "aura-zeus-en", label: "Zeus (EN)" },
    { id: "aura-orion-en", label: "Orion (EN)" },
  ],
  inworld: [
    { id: "Eva", label: "Eva (EN)" },
    { id: "Marcus", label: "Marcus (EN)" },
  ],
};

const SPEECH_FORMATS = ["mp3", "wav", "opus", "flac", "pcm"];

function getVoiceList(providerId: string) {
  return VOICE_PRESETS[providerId] ?? VOICE_PRESETS.default;
}

/** Parse a human-readable error from the API error response */
function parseApiError(raw: any, statusCode: number): { message: string; isCredentials: boolean } {
  const readErrorMessage = (value: any): string | null => {
    if (!value) return null;
    if (typeof value === "string") return value;
    if (Array.isArray(value)) {
      const messages = value
        .map((entry: any) => readErrorMessage(entry))
        .filter((entry: string | null): entry is string => Boolean(entry));
      if (messages.length > 0) return messages.join(", ");
      return null;
    }
    if (typeof value.message === "string") return value.message;
    if (typeof value.detail === "string") return value.detail;
    if (Array.isArray(value.errors)) {
      const messages = value.errors
        .map((entry: any) => readErrorMessage(entry))
        .filter((entry: string | null): entry is string => Boolean(entry));
      if (messages.length > 0) return messages.join(", ");
    }
    try {
      return JSON.stringify(value);
    } catch {
      return null;
    }
  };

  const msg =
    readErrorMessage(raw?.error) ||
    readErrorMessage(raw?.errors) ||
    raw?.err_msg ||
    raw?.message ||
    raw?.detail ||
    (typeof raw === "string" ? raw : null) ||
    `Request failed (${statusCode})`;

  const isCredentials =
    typeof msg === "string" &&
    (msg.toLowerCase().includes("no credentials") ||
      msg.toLowerCase().includes("invalid api key") ||
      msg.toLowerCase().includes("unauthorized") ||
      msg.toLowerCase().includes("authentication") ||
      msg.toLowerCase().includes("api key") ||
      statusCode === 401 ||
      statusCode === 403);

  return { message: String(msg), isCredentials };
}

/** Format file size to human-readable string */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("Failed to read file"));
    };
    reader.onerror = () => reject(reader.error || new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/** Render image result thumbnails */
function ImageResults({ data }: { data: any }) {
  const images: Array<{ url?: string; b64_json?: string; revised_prompt?: string }> =
    data?.data || [];
  if (images.length === 0) {
    return (
      <p className="text-sm text-text-muted italic">
        No images returned. The provider might have accepted the request but returned empty data.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {images.map((img, i) => {
        const src = img.url || (img.b64_json ? `data:image/png;base64,${img.b64_json}` : null);
        if (!src) return null;
        return (
          <div
            key={i}
            className="relative group rounded-lg overflow-hidden border border-black/10 dark:border-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={img.revised_prompt || `Generated image ${i + 1}`}
              className="w-full"
            />
            <a
              href={src}
              download={`image-${i + 1}.png`}
              className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[13px]">download</span>
              Save
            </a>
            {img.revised_prompt && (
              <p
                className="text-[11px] text-text-muted px-2 py-1 bg-surface/80 truncate"
                title={img.revised_prompt}
              >
                {img.revised_prompt}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function MediaPageClient() {
  const t = useTranslations("media");
  const [activeTab, setActiveTab] = useState<Modality>("image");
  const [prompt, setPrompt] = useState("");

  // Selected provider and model per modality
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCredentialsError, setIsCredentialsError] = useState(false);

  // Speech-specific
  const [speechVoice, setSpeechVoice] = useState("alloy");
  const [speechFormat, setSpeechFormat] = useState("mp3");

  // Transcription-specific
  const MAX_TRANSCRIPTION_FILE_SIZE = 4 * 1024 * 1024 * 1024; // 4 GB
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const [imageInputFile, setImageInputFile] = useState<File | null>(null);
  const [imageMaskFile, setImageMaskFile] = useState<File | null>(null);

  // Fix #390: Track which local providers (sdwebui, comfyui) are actually configured
  // so we can hide them when they haven't been set up in the providers page
  const LOCAL_PROVIDERS = ["sdwebui", "comfyui"];
  const [configuredLocalProviders, setConfiguredLocalProviders] = useState<Set<string>>(
    new Set(LOCAL_PROVIDERS) // Optimistic: show all until we know otherwise
  );

  useEffect(() => {
    // Fetch configured provider connections to determine which local providers are set up
    fetch("/api/providers")
      .then((r) => r.json())
      .then((data) => {
        const connections: { provider?: string; testStatus?: string }[] = Array.isArray(data)
          ? data
          : (data?.connections ?? data?.providers ?? []);
        const configured = new Set<string>();
        for (const conn of connections) {
          const pId = conn?.provider;
          if (pId && LOCAL_PROVIDERS.includes(pId)) {
            configured.add(pId);
          }
        }
        // Only update if at least one local provider was found, otherwise keep optimistic
        if (configured.size > 0) {
          setConfiguredLocalProviders(configured);
        } else {
          // No local providers configured — hide sdwebui/comfyui
          setConfiguredLocalProviders(new Set());
        }
      })
      .catch(() => {
        // On error, keep showing all (fail-open)
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter out unconfigured local providers from the provider list
  const currentProviders = (PROVIDER_MODELS[activeTab] ?? []).filter(
    (p) => !LOCAL_PROVIDERS.includes(p.id) || configuredLocalProviders.has(p.id)
  );
  const currentModels = currentProviders.find((p) => p.id === selectedProvider)?.models ?? [];

  const switchTab = (tab: Modality) => {
    setActiveTab(tab);
    setPrompt("");
    setResult(null);
    setError(null);
    setIsCredentialsError(false);
    setAudioFile(null);
    setImageInputFile(null);
    setImageMaskFile(null);
    // Pick first provider and first model automatically
    const providers = PROVIDER_MODELS[tab] ?? [];
    const firstProvider = providers[0];
    setSelectedProvider(firstProvider?.id ?? "");
    const firstModel = firstProvider?.models[0]?.id ?? "";
    setSelectedModel(firstModel);
    if (tab === "speech") {
      setSpeechVoice(getVoiceList(firstProvider?.id ?? "")[0]?.id ?? "alloy");
    }
  };

  const handleProviderChange = (providerId: string) => {
    setSelectedProvider(providerId);
    const models = PROVIDER_MODELS[activeTab]?.find((p) => p.id === providerId)?.models ?? [];
    const firstModel = models[0]?.id ?? "";
    setSelectedModel(firstModel);
    if (activeTab === "speech") {
      setSpeechVoice(getVoiceList(providerId)[0]?.id ?? "alloy");
    }
  };

  // Initialize on mount — pick first provider/model for image tab
  const initialized = useRef(false);
  if (!initialized.current) {
    initialized.current = true;
    const providers = PROVIDER_MODELS["image"] ?? [];
    const firstProvider = providers[0];
    setSelectedProvider(firstProvider?.id ?? "");
    setSelectedModel(firstProvider?.models[0]?.id ?? "");
  }

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setIsCredentialsError(false);
    setResult(null);

    try {
      const config = MODALITY_CONFIG[activeTab];
      const modelId = selectedModel;
      const promptValue = prompt.trim();

      if (activeTab === "speech") {
        if (!promptValue) {
          setError("Please enter text to synthesize.");
          setLoading(false);
          return;
        }
        const res = await fetch(config.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: modelId,
            input: promptValue,
            voice: speechVoice,
            response_format: speechFormat,
          }),
        });
        if (!res.ok) {
          const raw = await res.json().catch(() => ({}));
          const { message, isCredentials } = parseApiError(raw, res.status);
          setIsCredentialsError(isCredentials);
          throw new Error(message);
        }
        const blob = await res.blob();
        const audioUrl = URL.createObjectURL(blob);
        setResult({
          type: "speech",
          data: { format: speechFormat },
          timestamp: Date.now(),
          audioUrl,
        });
        setLoading(false);
        return;
      }

      if (activeTab === "transcription") {
        if (!audioFile) {
          setError("Please select an audio file to transcribe.");
          setLoading(false);
          return;
        }
        const form = new FormData();
        form.append("file", audioFile);
        form.append("model", modelId);
        const res = await fetch(config.endpoint, { method: "POST", body: form });
        if (!res.ok) {
          const raw = await res.json().catch(() => ({}));
          const { message, isCredentials } = parseApiError(raw, res.status);
          setIsCredentialsError(isCredentials);
          throw new Error(message);
        }
        const data = await res.json();
        // Check for noSpeechDetected flag (music, silence, etc.) — NOT a credential error
        if (data?.noSpeechDetected) {
          setError(
            `No speech detected in the audio file. If you uploaded music or a silent file, try an audio file with spoken words. Provider: "${selectedProvider}".`
          );
          setIsCredentialsError(false);
          setLoading(false);
          return;
        }
        // Warn if text is empty without the noSpeechDetected flag (unexpected)
        if (data && typeof data.text === "string" && data.text.trim() === "") {
          setError(
            `Transcription returned empty text. The audio may contain no recognizable speech, or the "${selectedProvider}" API key may be invalid. Check Dashboard → Logs → Proxy for details.`
          );
          // Only mark as credential error if we can confirm it from context
          setIsCredentialsError(false);
          setLoading(false);
          return;
        }
        setResult({ type: "transcription", data, timestamp: Date.now() });
        setLoading(false);
        return;
      }

      if (activeTab === "image" && selectedProvider === "topaz" && !imageInputFile) {
        setError("Topaz requires an input image.");
        setLoading(false);
        return;
      }

      if (!prompt.trim()) {
        if (activeTab !== "image" || selectedProvider !== "topaz") {
          setError("Please enter a prompt.");
          setLoading(false);
          return;
        }
      }

      const payload: Record<string, unknown> = {
        model: modelId,
        prompt:
          promptValue ||
          (activeTab === "image" && selectedProvider === "topaz" ? "Enhance this image" : ""),
        ...(activeTab === "image" ? { size: "1024x1024", n: 1 } : {}),
      };

      if (activeTab === "image" && imageInputFile) {
        const imageDataUrl = await fileToDataUrl(imageInputFile);
        payload.image_url = imageDataUrl;
        payload.imageUrls = [imageDataUrl];
      }

      if (activeTab === "image" && imageMaskFile) {
        const maskDataUrl = await fileToDataUrl(imageMaskFile);
        payload.mask = maskDataUrl;
        payload.mask_url = maskDataUrl;
      }

      const res = await fetch(config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const raw = await res.json().catch(() => ({}));
        const { message, isCredentials } = parseApiError(raw, res.status);
        setIsCredentialsError(isCredentials);
        throw new Error(message);
      }
      const data = await res.json();
      setResult({ type: activeTab, data, timestamp: Date.now() });
    } catch (err: any) {
      setError(err.message || "Generation failed");
    }
    setLoading(false);
  };

  const config = MODALITY_CONFIG[activeTab];
  const voiceList = getVoiceList(selectedProvider);
  const isTopazImageFlow = activeTab === "image" && selectedProvider === "topaz";
  const isGenerateDisabled =
    loading ||
    (activeTab === "transcription"
      ? !audioFile
      : activeTab === "image"
        ? isTopazImageFlow
          ? !imageInputFile
          : !prompt.trim()
        : !prompt.trim());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-main">{t("title")}</h1>
        <p className="text-text-muted text-sm mt-1">{t("subtitle")}</p>
      </div>

      {/* Modality Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-surface/50 rounded-xl border border-black/5 dark:border-white/5">
        {(Object.keys(MODALITY_CONFIG) as Modality[]).map((key) => {
          const cfg = MODALITY_CONFIG[key];
          const isActive = key === activeTab;
          return (
            <button
              key={key}
              onClick={() => switchTab(key)}
              className={`flex-1 min-w-[110px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/10 text-primary shadow-sm border border-primary/20"
                  : "text-text-muted hover:text-text-main hover:bg-surface/80"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{cfg.icon}</span>
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Generation Form */}
      <div className="bg-surface/30 rounded-xl border border-black/5 dark:border-white/5 p-6 space-y-4">
        {/* Provider + Model row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Provider dropdown */}
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">Provider</label>
            <select
              value={selectedProvider}
              onChange={(e) => handleProviderChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {currentProviders.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Model dropdown */}
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">{t("model")}</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {currentModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Credential hint */}
        {selectedProvider && !["sdwebui", "comfyui", "qwen"].includes(selectedProvider) && (
          <p className="text-xs text-text-muted flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-amber-500">info</span>
            Requires <strong className="capitalize">{selectedProvider}</strong> API key in{" "}
            <Link
              href="/dashboard/providers"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Providers
            </Link>
          </p>
        )}

        {/* Speech: voice + format */}
        {activeTab === "speech" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">Voice</label>
              <select
                value={speechVoice}
                onChange={(e) => setSpeechVoice(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {voiceList.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">Format</label>
              <select
                value={speechFormat}
                onChange={(e) => setSpeechFormat(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {SPEECH_FORMATS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Transcription: file upload */}
        {activeTab === "transcription" ? (
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">
              Audio / Video File
            </label>
            <input
              type="file"
              accept="audio/*,video/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setFileSizeError(null);
                if (file && file.size > MAX_TRANSCRIPTION_FILE_SIZE) {
                  setFileSizeError(
                    `File too large (${formatFileSize(file.size)}). Maximum allowed: 4 GB.`
                  );
                  setAudioFile(null);
                  e.target.value = "";
                  return;
                }
                setAudioFile(file);
              }}
              className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary file:text-sm"
            />
            {fileSizeError && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">error</span>
                {fileSizeError}
              </p>
            )}
            {audioFile && !fileSizeError && (
              <p className="text-xs text-text-muted mt-1">
                {audioFile.name} ({formatFileSize(audioFile.size)})
              </p>
            )}
            <p className="text-[10px] text-text-muted/60 mt-1">
              Supports audio and video files up to 4 GB
            </p>
          </div>
        ) : (
          <>
            {activeTab === "image" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">
                    Source Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageInputFile(e.target.files?.[0] ?? null)}
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary file:text-sm"
                  />
                  {imageInputFile && (
                    <p className="text-xs text-text-muted mt-1">
                      {imageInputFile.name} ({formatFileSize(imageInputFile.size)})
                    </p>
                  )}
                  <p className="text-[10px] text-text-muted/60 mt-1">
                    Optional for image-to-image, editing and upscale workflows.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">
                    Mask Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageMaskFile(e.target.files?.[0] ?? null)}
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary file:text-sm"
                  />
                  {imageMaskFile && (
                    <p className="text-xs text-text-muted mt-1">
                      {imageMaskFile.name} ({formatFileSize(imageMaskFile.size)})
                    </p>
                  )}
                  <p className="text-[10px] text-text-muted/60 mt-1">
                    Optional. Used by inpaint-style models that support masks.
                  </p>
                </div>
              </div>
            )}

            {/* Prompt / Text */}
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">
                {activeTab === "speech"
                  ? "Text"
                  : activeTab === "image" && selectedProvider === "topaz"
                    ? "Prompt (optional)"
                    : t("prompt")}
              </label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  activeTab === "image" && selectedProvider === "topaz"
                    ? "Optional enhancement instructions..."
                    : config.placeholder
                }
                className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>
          </>
        )}

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerateDisabled}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all bg-gradient-to-r ${config.color} ${
            isGenerateDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-90 hover:shadow-lg"
          }`}
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">
                progress_activity
              </span>
              {activeTab === "speech"
                ? "Synthesizing..."
                : activeTab === "transcription"
                  ? "Transcribing..."
                  : t("generating")}
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">
                {activeTab === "speech"
                  ? "volume_up"
                  : activeTab === "transcription"
                    ? "mic"
                    : "auto_awesome"}
              </span>
              {activeTab === "speech"
                ? "Synthesize Speech"
                : activeTab === "transcription"
                  ? "Transcribe Audio"
                  : `${t("generate")} ${config.label}`}
            </>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          className={`rounded-xl p-4 flex items-start gap-3 ${isCredentialsError ? "bg-amber-500/10 border border-amber-500/20" : "bg-red-500/10 border border-red-500/20"}`}
        >
          <span
            className={`material-symbols-outlined text-[20px] mt-0.5 ${isCredentialsError ? "text-amber-500" : "text-red-500"}`}
          >
            {isCredentialsError ? "key" : "error"}
          </span>
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium ${isCredentialsError ? "text-amber-500" : "text-red-500"}`}
            >
              {isCredentialsError ? "API Key Required" : t("error")}
            </p>
            <p className="text-sm text-text-muted mt-1 break-words">{error}</p>
            {isCredentialsError && (
              <Link
                href="/dashboard/providers"
                className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:underline"
              >
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                Configure API keys in Providers →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-surface/30 rounded-xl border border-black/5 dark:border-white/5 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`material-symbols-outlined text-[20px] bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}
            >
              {config.icon}
            </span>
            <h3 className="text-sm font-medium text-text-main">{t("result")}</h3>
            <span className="text-xs text-text-muted ml-auto">
              {new Date(result.timestamp).toLocaleTimeString()}
            </span>
          </div>

          {result.type === "speech" && result.audioUrl ? (
            <div className="space-y-3">
              <audio controls src={result.audioUrl} className="w-full rounded-lg" autoPlay />
              <a
                href={result.audioUrl}
                download={`speech.${result.data?.format || "mp3"}`}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                Download {result.data?.format?.toUpperCase() || "MP3"}
              </a>
            </div>
          ) : result.type === "image" ? (
            <ImageResults data={result.data} />
          ) : result.type === "transcription" ? (
            <div className="space-y-3">
              <div className="bg-surface rounded-lg p-4 text-sm text-text-main leading-relaxed whitespace-pre-wrap">
                {result.data?.text || (
                  <span className="text-text-muted italic">No text returned</span>
                )}
              </div>
              {result.data?.words && (
                <details className="mt-2">
                  <summary className="text-xs text-text-muted cursor-pointer hover:text-text-main">
                    Word-level timestamps ({result.data.words.length} words)
                  </summary>
                  <pre className="bg-surface rounded mt-2 p-3 text-xs text-text-muted overflow-auto max-h-48 custom-scrollbar">
                    {JSON.stringify(result.data.words, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ) : (
            <pre className="bg-surface rounded-lg p-4 text-xs text-text-muted overflow-auto max-h-96 custom-scrollbar">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          )}
        </div>
      )}

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {(Object.keys(MODALITY_CONFIG) as Modality[]).map((key) => {
          const cfg = MODALITY_CONFIG[key];
          const providerCount = PROVIDER_MODELS[key]?.length ?? 0;
          return (
            <div
              key={key}
              className="bg-surface/30 rounded-xl border border-black/5 dark:border-white/5 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`flex items-center justify-center size-8 rounded-lg bg-gradient-to-r ${cfg.color}`}
                >
                  <span className="material-symbols-outlined text-white text-[16px]">
                    {cfg.icon}
                  </span>
                </div>
                <span className="text-sm font-medium text-text-main">{cfg.label}</span>
              </div>
              <p className="text-xs text-text-muted">{providerCount} providers</p>
              <code className="block mt-2 text-xs text-primary/70 bg-primary/5 rounded px-2 py-1">
                POST {cfg.endpoint}
              </code>
            </div>
          );
        })}
      </div>
    </div>
  );
}
