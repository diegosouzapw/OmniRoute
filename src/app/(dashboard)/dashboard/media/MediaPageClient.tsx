"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Modality = "image" | "video" | "music" | "speech";
type GenerationResult = {
  type: Modality;
  data: any;
  timestamp: number;
  audioUrl?: string;
};

const MODALITY_CONFIG: Record<
  Modality,
  { icon: string; endpoint: string; label: string; placeholder: string; color: string }
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
  },
};

// Provider-aware voice options for the TTS speech tab
const PROVIDER_VOICE_PRESETS: Record<string, { id: string; label: string }[]> = {
  // OpenAI standard voices (also used as defaults)
  default: [
    { id: "alloy", label: "Alloy" },
    { id: "echo", label: "Echo" },
    { id: "fable", label: "Fable" },
    { id: "onyx", label: "Onyx" },
    { id: "nova", label: "Nova" },
    { id: "shimmer", label: "Shimmer" },
  ],
  // ElevenLabs — popular premade voice IDs
  elevenlabs: [
    { id: "21m00Tcm4TlvDq8ikWAM", label: "Rachel (EN, calm)" },
    { id: "AZnzlk1XvdvUeBnXmlld", label: "Domi (EN, strong)" },
    { id: "EXAVITQu4vr4xnSDxMaL", label: "Bella (EN, soft)" },
    { id: "ErXwobaYiN019PkySvjV", label: "Antoni (EN, well-rounded)" },
    { id: "MF3mGyEYCl7XYWbV9V6O", label: "Elli (EN, young)" },
    { id: "TxGEqnHWrfWFTfGW9XjX", label: "Josh (EN, deep)" },
    { id: "VR6AewLTigWG4xSOukaG", label: "Arnold (EN, crisp)" },
    { id: "pNInz6obpgDQGcFmaJgB", label: "Adam (EN, deep)" },
    { id: "yoZ06aMxZJJ28mfd3POQ", label: "Sam (EN, raspy)" },
  ],
  // Cartesia — Sonic model default voice
  cartesia: [
    { id: "a0e99841-438c-4a64-b679-ae501e7d6091", label: "Barbershop Man" },
    { id: "694f9389-aac1-45b6-b726-9d9369183238", label: "Friendly Reading Man" },
    { id: "b7d50908-b17c-442d-ad8d-810c63997ed9", label: "California Girl" },
  ],
  // Deepgram Aura voices
  deepgram: [
    { id: "aura-asteria-en", label: "Asteria (EN)" },
    { id: "aura-luna-en", label: "Luna (EN)" },
    { id: "aura-stella-en", label: "Stella (EN)" },
    { id: "aura-zeus-en", label: "Zeus (EN)" },
    { id: "aura-orion-en", label: "Orion (EN)" },
  ],
  // Inworld TTS voices
  inworld: [
    { id: "Eva", label: "Eva (EN)" },
    { id: "Marcus", label: "Marcus (EN)" },
  ],
};

function getVoicePresets(modelId: string) {
  for (const prefix of Object.keys(PROVIDER_VOICE_PRESETS)) {
    if (prefix !== "default" && modelId.startsWith(prefix + "/")) {
      return PROVIDER_VOICE_PRESETS[prefix];
    }
  }
  return PROVIDER_VOICE_PRESETS.default;
}

const SPEECH_FORMATS = ["mp3", "wav", "opus", "flac", "pcm"];

export default function MediaPageClient() {
  const t = useTranslations("media");
  const [activeTab, setActiveTab] = useState<Modality>("image");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Speech-specific state
  const [speechVoice, setSpeechVoice] = useState("alloy");
  const [speechFormat, setSpeechFormat] = useState("mp3");

  // Fetch available models for each modality
  const fetchModels = async (modality: Modality) => {
    if (modality === "speech") {
      // Models come from /v1/models filtered by speech providers
      setModels([]);
      return;
    }
    setLoadingModels(true);
    try {
      const res = await fetch(MODALITY_CONFIG[modality].endpoint);
      if (res.ok) {
        const data = await res.json();
        const modelList = data.data || [];
        setModels(modelList);
        if (modelList.length > 0) setModel(modelList[0].id);
      }
    } catch {
      setModels([]);
    }
    setLoadingModels(false);
  };

  const switchTab = (tab: Modality) => {
    setActiveTab(tab);
    setPrompt("");
    setResult(null);
    setError(null);
    fetchModels(tab);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const config = MODALITY_CONFIG[activeTab];

      if (activeTab === "speech") {
        // TTS: returns binary audio stream — create a Blob URL for <audio>
        const res = await fetch(config.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: model || "openai/tts-1",
            input: prompt.trim(),
            voice: speechVoice,
            response_format: speechFormat,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData?.error?.message || `TTS failed (${res.status})`);
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

      const res = await fetch(config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: model || undefined,
          prompt: prompt.trim(),
          ...(activeTab === "image" ? { size: "1024x1024", n: 1 } : {}),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Generation failed (${res.status})`);
      }

      const data = await res.json();
      setResult({ type: activeTab, data, timestamp: Date.now() });
    } catch (err: any) {
      setError(err.message || "Generation failed");
    }
    setLoading(false);
  };

  // Load models on first render
  useState(() => {
    fetchModels("image");
  });

  const config = MODALITY_CONFIG[activeTab];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-main">{t("title")}</h1>
        <p className="text-text-muted text-sm mt-1">{t("subtitle")}</p>
      </div>

      {/* Modality Tabs */}
      <div className="flex gap-2 p-1 bg-surface/50 rounded-xl border border-black/5 dark:border-white/5">
        {(Object.keys(MODALITY_CONFIG) as Modality[]).map((key) => {
          const cfg = MODALITY_CONFIG[key];
          const isActive = key === activeTab;
          return (
            <button
              key={key}
              onClick={() => switchTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
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
        {/* Model selector (not shown for speech — use manual model input) */}
        {activeTab !== "speech" && (
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">{t("model")}</label>
            {loadingModels ? (
              <div className="flex items-center gap-2 text-text-muted text-sm">
                <span className="material-symbols-outlined animate-spin text-[16px]">
                  progress_activity
                </span>
                {t("loadingModels")}
              </div>
            ) : models.length > 0 ? (
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.id}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-text-muted text-sm">{t("noModels")}</p>
            )}
          </div>
        )}

        {/* Speech: model input + voice + format */}
        {activeTab === "speech" && (
          <>
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">{t("model")}</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="openai/tts-1 · elevenlabs/eleven_multilingual_v2 · cartesia/sonic-3"
                className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Voice</label>
                <select
                  value={speechVoice}
                  onChange={(e) => setSpeechVoice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {getVoicePresets(model).map((v) => (
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
          </>
        )}

        {/* Prompt / Text */}
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

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all bg-gradient-to-r ${config.color} ${
            loading || !prompt.trim()
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-90 hover:shadow-lg"
          }`}
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">
                progress_activity
              </span>
              {activeTab === "speech" ? "Synthesizing..." : t("generating")}
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">
                {activeTab === "speech" ? "volume_up" : "auto_awesome"}
              </span>
              {activeTab === "speech" ? "Synthesize Speech" : `${t("generate")} ${config.label}`}
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

          {/* Audio player for TTS results */}
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {(Object.keys(MODALITY_CONFIG) as Modality[]).map((key) => {
          const cfg = MODALITY_CONFIG[key];
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
              <p className="text-xs text-text-muted">{t(`${key}Description`)}</p>
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
