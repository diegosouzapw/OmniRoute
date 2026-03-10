"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Modality = "image" | "video" | "music" | "speech" | "transcription";
type GenerationResult = {
  type: Modality;
  data: any;
  timestamp: number;
  audioUrl?: string;
};

const MODALITY_CONFIG: Record<
  Modality,
  {
    icon: string;
    endpoint: string;
    label: string;
    placeholder?: string;
    color: string;
    textLabel?: string;
  }
> = {
  image: {
    icon: "image",
    endpoint: "/api/v1/images/generations",
    label: "Image Generation",
    placeholder: "A serene landscape with mountains at sunset...",
    color: "from-purple-500 to-pink-500",
  },
  video: {
    icon: "videocam",
    endpoint: "/api/v1/videos/generations",
    label: "Video Generation",
    placeholder: "A timelapse of a flower blooming...",
    color: "from-blue-500 to-cyan-500",
  },
  music: {
    icon: "music_note",
    endpoint: "/api/v1/music/generations",
    label: "Music Generation",
    placeholder: "Upbeat electronic music with synth pads...",
    color: "from-orange-500 to-yellow-500",
  },
  speech: {
    icon: "record_voice_over",
    endpoint: "/api/v1/audio/speech",
    label: "Text to Speech",
    placeholder: "Hello! Welcome to OmniRoute, your intelligent AI gateway...",
    color: "from-green-500 to-teal-500",
    textLabel: "Text",
  },
  transcription: {
    icon: "mic",
    endpoint: "/api/v1/audio/transcriptions",
    label: "Transcription",
    placeholder: "Upload an audio file to transcribe...",
    color: "from-indigo-500 to-blue-500",
  },
};

// Static provider+model registry (mirrors open-sse/config/*Registry.ts)
//  — kept client-side so no API round-trip needed.
const PROVIDER_MODELS: Record<
  Modality,
  { id: string; name: string; models: { id: string; name: string }[] }[]
> = {
  image: [
    {
      id: "openai",
      name: "OpenAI",
      models: [
        { id: "openai/dall-e-3", name: "DALL-E 3" },
        { id: "openai/dall-e-2", name: "DALL-E 2" },
      ],
    },
    { id: "xai", name: "xAI (Grok)", models: [{ id: "xai/grok-2-image", name: "Grok 2 Image" }] },
    {
      id: "together",
      name: "Together AI",
      models: [
        { id: "together/stable-diffusion-xl", name: "SDXL" },
        { id: "together/FLUX.1-schnell-Free", name: "FLUX.1 Schnell" },
      ],
    },
    {
      id: "fireworks",
      name: "Fireworks AI",
      models: [
        { id: "fireworks/stable-diffusion-xl-1024-v1-0", name: "SDXL 1024" },
        { id: "fireworks/flux-1-dev-fp8", name: "FLUX.1 Dev" },
      ],
    },
    {
      id: "nebius",
      name: "Nebius AI",
      models: [
        { id: "nebius/flux-dev", name: "FLUX Dev" },
        { id: "nebius/sdxl", name: "SDXL" },
      ],
    },
    {
      id: "hyperbolic",
      name: "Hyperbolic",
      models: [
        { id: "hyperbolic/SDXL1.0-base", name: "SDXL Base" },
        { id: "hyperbolic/stable-diffusion-2", name: "SD 2" },
      ],
    },
    {
      id: "nanobanana",
      name: "NanoBanana",
      models: [{ id: "nanobanana/flux-schnell", name: "FLUX Schnell" }],
    },
    {
      id: "sdwebui",
      name: "SD WebUI",
      models: [{ id: "sdwebui/sd_xl_base_1.0", name: "SDXL Base (Local)" }],
    },
    {
      id: "comfyui",
      name: "ComfyUI",
      models: [
        { id: "comfyui/flux-dev", name: "FLUX Dev (Local)" },
        { id: "comfyui/sdxl", name: "SDXL (Local)" },
      ],
    },
  ],
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
      id: "openai",
      name: "OpenAI",
      models: [
        { id: "openai/whisper-1", name: "Whisper 1" },
        { id: "openai/gpt-4o-transcription", name: "GPT-4o Transcription" },
      ],
    },
    {
      id: "groq",
      name: "Groq",
      models: [
        { id: "groq/whisper-large-v3", name: "Whisper Large v3" },
        { id: "groq/whisper-large-v3-turbo", name: "Whisper Turbo" },
      ],
    },
    {
      id: "deepgram",
      name: "Deepgram",
      models: [
        { id: "deepgram/nova-3", name: "Nova 3" },
        { id: "deepgram/nova-2", name: "Nova 2" },
      ],
    },
    {
      id: "assemblyai",
      name: "AssemblyAI",
      models: [
        { id: "assemblyai/universal-3-pro", name: "Universal 3 Pro" },
        { id: "assemblyai/universal-2", name: "Universal 2" },
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
  openai: [
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
const CUSTOM_VOICE_VALUE = "__custom_voice__";

function getVoiceList(providerId: string) {
  return VOICE_PRESETS[providerId] ?? [];
}

function getInitialVoice(providerId: string) {
  const firstPreset = getVoiceList(providerId)[0]?.id;
  return firstPreset || CUSTOM_VOICE_VALUE;
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

  // Speech-specific
  const [speechVoice, setSpeechVoice] = useState(getInitialVoice("openai"));
  const [customSpeechVoice, setCustomSpeechVoice] = useState("");
  const [speechFormat, setSpeechFormat] = useState("mp3");

  // Transcription-specific
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const currentProviders = PROVIDER_MODELS[activeTab] ?? [];
  const currentModels = currentProviders.find((p) => p.id === selectedProvider)?.models ?? [];

  const switchTab = (tab: Modality) => {
    setActiveTab(tab);
    setPrompt("");
    setResult(null);
    setError(null);
    setAudioFile(null);
    // Pick first provider and first model automatically
    const providers = PROVIDER_MODELS[tab] ?? [];
    const firstProvider = providers[0];
    setSelectedProvider(firstProvider?.id ?? "");
    const firstModel = firstProvider?.models[0]?.id ?? "";
    setSelectedModel(firstModel);
    if (tab === "speech") {
      setSpeechVoice(getInitialVoice(firstProvider?.id ?? ""));
      setCustomSpeechVoice("");
    }
  };

  const handleProviderChange = (providerId: string) => {
    setSelectedProvider(providerId);
    const models = PROVIDER_MODELS[activeTab]?.find((p) => p.id === providerId)?.models ?? [];
    const firstModel = models[0]?.id ?? "";
    setSelectedModel(firstModel);
    if (activeTab === "speech") {
      setSpeechVoice(getInitialVoice(providerId));
      setCustomSpeechVoice("");
    }
  };

  // Initialize on mount — pick first provider/model for image tab
  const [initialized, setInitialized] = useState(false);
  if (!initialized) {
    setInitialized(true);
    const providers = PROVIDER_MODELS["image"] ?? [];
    const firstProvider = providers[0];
    setSelectedProvider(firstProvider?.id ?? "");
    setSelectedModel(firstProvider?.models[0]?.id ?? "");
  }

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const config = MODALITY_CONFIG[activeTab];
      const modelId = selectedModel;

      if (activeTab === "speech") {
        if (!prompt.trim()) {
          setError("Please enter text to synthesize.");
          setLoading(false);
          return;
        }
        const res = await fetch(config.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: modelId,
            input: prompt.trim(),
            voice:
              speechVoice === CUSTOM_VOICE_VALUE
                ? (customSpeechVoice.trim() || undefined)
                : speechVoice,
            response_format: speechFormat,
          }),
        });
        if (!res.ok) {
          const e = await res.json().catch(() => ({}));
          throw new Error(e?.error?.message || `TTS failed (${res.status})`);
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
          const e = await res.json().catch(() => ({}));
          throw new Error(e?.error?.message || `Transcription failed (${res.status})`);
        }
        const data = await res.json();
        setResult({ type: "transcription", data, timestamp: Date.now() });
        setLoading(false);
        return;
      }

      if (!prompt.trim()) {
        setError("Please enter a prompt.");
        setLoading(false);
        return;
      }
      const res = await fetch(config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: modelId,
          prompt: prompt.trim(),
          ...(activeTab === "image" ? { size: "1024x1024", n: 1 } : {}),
        }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e?.error?.message || `Generation failed (${res.status})`);
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

        {/* Speech: voice + format */}
        {activeTab === "speech" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-main">Voice</label>
              <select
                value={speechVoice}
                onChange={(e) => {
                  const value = e.target.value;
                  setSpeechVoice(value);
                  if (value !== CUSTOM_VOICE_VALUE) {
                    setCustomSpeechVoice("");
                  }
                }}
                className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {voiceList.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
                <option value={CUSTOM_VOICE_VALUE}>Custom voice ID…</option>
              </select>

              {speechVoice === CUSTOM_VOICE_VALUE && (
                <input
                  type="text"
                  value={customSpeechVoice}
                  onChange={(e) => setCustomSpeechVoice(e.target.value)}
                  placeholder="Enter provider voice ID/name"
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              )}
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
            <label className="block text-sm font-medium text-text-main mb-2">Audio File</label>
            <input
              type="file"
              accept="audio/*,video/*"
              onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
              className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary file:text-sm"
            />
            {audioFile && (
              <p className="text-xs text-text-muted mt-1">
                {audioFile.name} ({(audioFile.size / 1024).toFixed(0)} KB)
              </p>
            )}
          </div>
        ) : (
          /* Prompt / Text */
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">
              {activeTab === "speech" ? "Text" : t("prompt")}
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={config.placeholder}
              className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
        )}

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={loading || (activeTab === "transcription" ? !audioFile : !prompt.trim())}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all bg-gradient-to-r ${config.color} ${
            loading || (activeTab === "transcription" ? !audioFile : !prompt.trim())
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
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
          <span className="material-symbols-outlined text-red-500 text-[20px] mt-0.5">error</span>
          <div>
            <p className="text-sm font-medium text-red-500">{t("error")}</p>
            <p className="text-sm text-text-muted mt-1">{error}</p>
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
