"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { IMAGE_PROVIDERS } from "@omniroute/open-sse/config/imageRegistry.ts";
import { VIDEO_PROVIDERS } from "@omniroute/open-sse/config/videoRegistry.ts";
import { MUSIC_PROVIDERS } from "@omniroute/open-sse/config/musicRegistry.ts";
import {
  AUDIO_SPEECH_PROVIDERS,
  AUDIO_TRANSCRIPTION_PROVIDERS,
} from "@omniroute/open-sse/config/audioRegistry.ts";
import { AI_PROVIDERS } from "@/shared/constants/providers";

type Modality = "image" | "video" | "music" | "speech" | "transcription";
type GenerationResult = {
  type: Modality;
  data: any;
  timestamp: number;
  audioUrl?: string;
};
type MediaModelConfig = { id: string; name: string };
type MediaProviderConfig = {
  id: string;
  authType: string;
  supportedFormats?: string[];
  models: MediaModelConfig[];
};
type ProviderModelGroup = {
  id: string;
  name: string;
  models: { id: string; name: string }[];
};

const PROVIDER_METADATA = AI_PROVIDERS as Record<string, { name?: string }>;

function toProviderModels(registry: Record<string, MediaProviderConfig>): ProviderModelGroup[] {
  return Object.entries(registry).map(([providerId, config]) => ({
    id: providerId,
    name: PROVIDER_METADATA[providerId]?.name || config.id || providerId,
    models: config.models.map((model) => ({
      id: model.id.startsWith(`${providerId}/`) ? model.id : `${providerId}/${model.id}`,
      name: model.name,
    })),
  }));
}

function providersRequiringCredentials(registry: Record<string, MediaProviderConfig>): string[] {
  return Object.entries(registry)
    .filter(([, config]) => config.authType !== "none")
    .map(([providerId]) => providerId);
}

const IMAGE_PROVIDER_MODELS = toProviderModels(IMAGE_PROVIDERS);
const VIDEO_PROVIDER_MODELS = toProviderModels(VIDEO_PROVIDERS);
const MUSIC_PROVIDER_MODELS = toProviderModels(MUSIC_PROVIDERS);
const SPEECH_PROVIDER_MODELS = toProviderModels(AUDIO_SPEECH_PROVIDERS);
const TRANSCRIPTION_PROVIDER_MODELS = toProviderModels(AUDIO_TRANSCRIPTION_PROVIDERS);

const IMAGE_PROVIDERS_REQUIRING_CREDENTIALS = providersRequiringCredentials(IMAGE_PROVIDERS);
const VIDEO_PROVIDERS_REQUIRING_CREDENTIALS = providersRequiringCredentials(VIDEO_PROVIDERS);
const MUSIC_PROVIDERS_REQUIRING_CREDENTIALS = providersRequiringCredentials(MUSIC_PROVIDERS);
const SPEECH_PROVIDERS_REQUIRING_CREDENTIALS =
  providersRequiringCredentials(AUDIO_SPEECH_PROVIDERS);
const TRANSCRIPTION_PROVIDERS_REQUIRING_CREDENTIALS = providersRequiringCredentials(
  AUDIO_TRANSCRIPTION_PROVIDERS
);

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
    needsCredentials: VIDEO_PROVIDERS_REQUIRING_CREDENTIALS,
  },
  music: {
    icon: "music_note",
    endpoint: "/api/v1/music/generations",
    label: "Music Generation",
    placeholder: "Upbeat electronic music with synth pads...",
    color: "from-orange-500 to-yellow-500",
    needsCredentials: MUSIC_PROVIDERS_REQUIRING_CREDENTIALS,
  },
  speech: {
    icon: "record_voice_over",
    endpoint: "/api/v1/audio/speech",
    label: "Text to Speech",
    placeholder: "Hello! Welcome to OmniRoute, your intelligent AI gateway...",
    color: "from-green-500 to-teal-500",
    textLabel: "Text",
    needsCredentials: SPEECH_PROVIDERS_REQUIRING_CREDENTIALS,
  },
  transcription: {
    icon: "mic",
    endpoint: "/api/v1/audio/transcriptions",
    label: "Transcription",
    placeholder: "Upload an audio file to transcribe...",
    color: "from-indigo-500 to-blue-500",
    needsCredentials: TRANSCRIPTION_PROVIDERS_REQUIRING_CREDENTIALS,
  },
};

// Provider+model registry derived from runtime registries to avoid dashboard drift
const PROVIDER_MODELS: Record<Modality, ProviderModelGroup[]> = {
  image: IMAGE_PROVIDER_MODELS,
  video: VIDEO_PROVIDER_MODELS,
  music: MUSIC_PROVIDER_MODELS,
  speech: SPEECH_PROVIDER_MODELS,
  transcription: TRANSCRIPTION_PROVIDER_MODELS,
};
const INITIAL_IMAGE_PROVIDER = PROVIDER_MODELS.image[0];
const INITIAL_IMAGE_MODEL = INITIAL_IMAGE_PROVIDER?.models[0];

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
  kie: [
    { id: "Rachel", label: "Rachel (EN)" },
    { id: "Adam", label: "Adam (EN)" },
    { id: "Brian", label: "Brian (EN)" },
    { id: "Roger", label: "Roger (EN)" },
    { id: "Bella", label: "Bella (EN)" },
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
    { id: "Abby", label: "Abby (EN)" },
    { id: "Alex", label: "Alex (EN)" },
    { id: "Amina", label: "Amina (EN)" },
    { id: "Anjali", label: "Anjali (EN)" },
    { id: "Arjun", label: "Arjun (EN)" },
    { id: "Ashley", label: "Ashley (EN)" },
    { id: "Avery", label: "Avery (EN)" },
    { id: "Bianca", label: "Bianca (EN)" },
    { id: "Blake", label: "Blake (EN)" },
    { id: "Brandon", label: "Brandon (EN)" },
    { id: "Brian", label: "Brian (EN)" },
    { id: "Callum", label: "Callum (EN)" },
    { id: "Carter", label: "Carter (EN)" },
    { id: "Cedric", label: "Cedric (EN)" },
    { id: "Celeste", label: "Celeste (EN)" },
    { id: "Chloe", label: "Chloe (EN)" },
    { id: "Claire", label: "Claire (EN)" },
    { id: "Clive", label: "Clive (EN)" },
    { id: "Conrad", label: "Conrad (EN)" },
    { id: "Craig", label: "Craig (EN)" },
    { id: "Damon", label: "Damon (EN)" },
    { id: "Darlene", label: "Darlene (EN)" },
    { id: "Deborah", label: "Deborah (EN)" },
    { id: "Dennis", label: "Dennis (EN)" },
    { id: "Derek", label: "Derek (EN)" },
    { id: "Dominus", label: "Dominus (EN)" },
    { id: "Duncan", label: "Duncan (EN)" },
    { id: "Edward", label: "Edward (EN)" },
    { id: "Eleanor", label: "Eleanor (EN)" },
    { id: "Elliot", label: "Elliot (EN)" },
    { id: "Ethan", label: "Ethan (EN)" },
    { id: "Evan", label: "Evan (EN)" },
    { id: "Evelyn", label: "Evelyn (EN)" },
    { id: "Felix", label: "Felix (EN)" },
    { id: "Gareth", label: "Gareth (EN)" },
    { id: "Graham", label: "Graham (EN)" },
    { id: "Hades", label: "Hades (EN)" },
    { id: "Hamish", label: "Hamish (EN)" },
    { id: "Hana", label: "Hana (EN)" },
    { id: "Hank", label: "Hank (EN)" },
    { id: "James", label: "James (EN)" },
    { id: "Jason", label: "Jason (EN)" },
    { id: "Jessica", label: "Jessica (EN)" },
    { id: "Jonah", label: "Jonah (EN)" },
    { id: "Kelsey", label: "Kelsey (EN)" },
    { id: "Lauren", label: "Lauren (EN)" },
    { id: "Levi", label: "Levi (EN)" },
    { id: "Liam", label: "Liam (EN)" },
    { id: "Loretta", label: "Loretta (EN)" },
    { id: "Lucian", label: "Lucian (EN)" },
    { id: "Luna", label: "Luna (EN)" },
    { id: "Malcolm", label: "Malcolm (EN)" },
    { id: "Marcus", label: "Marcus (EN)" },
    { id: "Mark", label: "Mark (EN)" },
    { id: "Marlene", label: "Marlene (EN)" },
    { id: "Mia", label: "Mia (EN)" },
    { id: "Miranda", label: "Miranda (EN)" },
    { id: "Mortimer", label: "Mortimer (EN)" },
    { id: "Nadia", label: "Nadia (EN)" },
    { id: "Naomi", label: "Naomi (EN)" },
    { id: "Nate", label: "Nate (EN)" },
    { id: "Oliver", label: "Oliver (EN)" },
    { id: "Olivia", label: "Olivia (EN)" },
    { id: "Pippa", label: "Pippa (EN)" },
    { id: "Pixie", label: "Pixie (EN)" },
    { id: "Reed", label: "Reed (EN)" },
    { id: "Riley", label: "Riley (EN)" },
    { id: "Ronald", label: "Ronald (EN)" },
    { id: "Rupert", label: "Rupert (EN)" },
    { id: "Saanvi", label: "Saanvi (EN)" },
    { id: "Sarah", label: "Sarah (EN)" },
    { id: "Sebastian", label: "Sebastian (EN)" },
    { id: "Selene", label: "Selene (EN)" },
    { id: "Serena", label: "Serena (EN)" },
    { id: "Simon", label: "Simon (EN)" },
    { id: "Snik", label: "Snik (EN)" },
    { id: "Sophie", label: "Sophie (EN)" },
    { id: "Tessa", label: "Tessa (EN)" },
    { id: "Theodore", label: "Theodore (EN)" },
    { id: "Timothy", label: "Timothy (EN)" },
    { id: "Trevor", label: "Trevor (EN)" },
    { id: "Tristan", label: "Tristan (EN)" },
    { id: "Tyler", label: "Tyler (EN)" },
    { id: "Veronica", label: "Veronica (EN)" },
    { id: "Victor", label: "Victor (EN)" },
    { id: "Victoria", label: "Victoria (EN)" },
    { id: "Vinny", label: "Vinny (EN)" },
    { id: "Wendy", label: "Wendy (EN)" },
    { id: "Aanya", label: "Aanya (HI)" },
    { id: "Aarav", label: "Aarav (HI)" },
    { id: "Manoj", label: "Manoj (HI)" },
    { id: "Riya", label: "Riya (HI)" },
    { id: "Alain", label: "Alain (FR)" },
    { id: "Étienne", label: "Étienne (FR)" },
    { id: "Hélène", label: "Hélène (FR)" },
    { id: "Mathieu", label: "Mathieu (FR)" },
    { id: "Asuka", label: "Asuka (JP)" },
    { id: "Haruto", label: "Haruto (JP)" },
    { id: "Hina", label: "Hina (JP)" },
    { id: "Satoshi", label: "Satoshi (JP)" },
    { id: "Beatriz", label: "Beatriz (PT)" },
    { id: "Heitor", label: "Heitor (PT)" },
    { id: "Maitê", label: "Maitê (PT)" },
    { id: "Mariana", label: "Mariana (PT)" },
    { id: "Murilo", label: "Murilo (PT)" },
    { id: "Camila", label: "Camila (ES)" },
    { id: "Diego", label: "Diego (ES)" },
    { id: "Lupita", label: "Lupita (ES)" },
    { id: "Mateo", label: "Mateo (ES)" },
    { id: "Mauricio", label: "Mauricio (ES)" },
    { id: "Miguel", label: "Miguel (ES)" },
    { id: "Rafael", label: "Rafael (ES)" },
    { id: "Sofia", label: "Sofia (ES)" },
    { id: "Dmitry", label: "Dmitry (RU)" },
    { id: "Elena", label: "Elena (RU)" },
    { id: "Nikolai", label: "Nikolai (RU)" },
    { id: "Svetlana", label: "Svetlana (RU)" },
    { id: "Erik", label: "Erik (NL)" },
    { id: "Katrien", label: "Katrien (NL)" },
    { id: "Lennart", label: "Lennart (NL)" },
    { id: "Lore", label: "Lore (NL)" },
    { id: "Gianni", label: "Gianni (IT)" },
    { id: "Orietta", label: "Orietta (IT)" },
    { id: "Hyunwoo", label: "Hyunwoo (KO)" },
    { id: "Minji", label: "Minji (KO)" },
    { id: "Seojun", label: "Seojun (KO)" },
    { id: "Yoona", label: "Yoona (KO)" },
    { id: "Jing", label: "Jing (ZH)" },
    { id: "Mei", label: "Mei (ZH)" },
    { id: "Ming", label: "Ming (ZH)" },
    { id: "Xiaoyin", label: "Xiaoyin (ZH)" },
    { id: "Xinyi", label: "Xinyi (ZH)" },
    { id: "Yichen", label: "Yichen (ZH)" },
    { id: "Johanna", label: "Johanna (DE)" },
    { id: "Josef", label: "Josef (DE)" },
    { id: "Nour", label: "Nour (AR)" },
    { id: "Omar", label: "Omar (AR)" },
    { id: "Oren", label: "Oren (HE)" },
    { id: "Yael", label: "Yael (HE)" },
    { id: "Szymon", label: "Szymon (PL)" },
    { id: "Wojciech", label: "Wojciech (PL)" },
  ],
  "xiaomi-mimo": [
    { id: "冰糖", label: "冰糖 (Chinese Female)" },
    { id: "茉莉", label: "茉莉 (Chinese Female)" },
    { id: "苏打", label: "苏打 (Chinese Male)" },
    { id: "白桦", label: "白桦 (Chinese Male)" },
    { id: "Mia", label: "Mia (English Female)" },
    { id: "Chloe", label: "Chloe (English Female)" },
    { id: "Milo", label: "Milo (English Male)" },
    { id: "Dean", label: "Dean (English Male)" },
  ],
};

const SPEECH_FORMATS = ["mp3", "wav", "opus", "flac", "pcm"];

function getSpeechFormats(providerId: string): string[] {
  const providerFormats = AUDIO_SPEECH_PROVIDERS[providerId]?.supportedFormats;
  return providerFormats?.length ? providerFormats : SPEECH_FORMATS;
}

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
  const [selectedProvider, setSelectedProvider] = useState<string>(
    INITIAL_IMAGE_PROVIDER?.id ?? ""
  );
  const [selectedModel, setSelectedModel] = useState<string>(INITIAL_IMAGE_MODEL?.id ?? "");

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
    const audioUrl = result?.audioUrl;
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [result?.audioUrl]);

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
      setSpeechFormat(getSpeechFormats(firstProvider?.id ?? "")[0] ?? "mp3");
    }
  };

  const handleProviderChange = (providerId: string) => {
    setSelectedProvider(providerId);
    const models = PROVIDER_MODELS[activeTab]?.find((p) => p.id === providerId)?.models ?? [];
    const firstModel = models[0]?.id ?? "";
    setSelectedModel(firstModel);
    if (activeTab === "speech") {
      setSpeechVoice(getVoiceList(providerId)[0]?.id ?? "alloy");
      const formats = getSpeechFormats(providerId);
      setSpeechFormat((current) => (formats.includes(current) ? current : (formats[0] ?? "mp3")));
    }
  };

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
  const currentSpeechFormats = getSpeechFormats(selectedProvider);
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
                {currentSpeechFormats.map((f) => (
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
