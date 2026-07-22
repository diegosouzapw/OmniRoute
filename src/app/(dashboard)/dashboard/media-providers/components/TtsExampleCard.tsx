"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useApiKey } from "../../providers/hooks/useApiKey";
import { useProviderModels } from "../../providers/hooks/useProviderModels";
import { buildCurl } from "../../providers/utils/buildCurl";
import { PlaygroundCard } from "./PlaygroundCard";

interface Props {
  providerId: string;
}

const ENDPOINT_PATH = "/api/v1/audio/speech";

const VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer", "rachel", "bella", "adam"];

function extractError(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const err = d.error as Record<string, unknown> | undefined;
  if (err?.message) return String(err.message);
  if (typeof d.message === "string") return d.message;
  return null;
}

export function TtsExampleCard({ providerId }: Props) {
  const t = useTranslations("miniPlayground");
  const { apiKey } = useApiKey();
  const { models } = useProviderModels(providerId);

  const firstModel = models[0]?.id ?? "tts-1";
  const [model, setModel] = useState<string>("");
  const [voice, setVoice] = useState<string>("alloy");
  const [speed, setSpeed] = useState<string>("1.0");
  const [inputText, setInputText] = useState<string>(() => t("ttsSample"));
  const [running, setRunning] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioSize, setAudioSize] = useState<number | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioBlobRef = useRef<Blob | null>(null);

  const effectiveModel = model || firstModel;
  const buildBody = () => ({
    model: effectiveModel,
    voice,
    input: inputText,
    speed: parseFloat(speed) || 1.0,
  });

  const curlSnippet = buildCurl({
    endpoint:
      (typeof window !== "undefined" ? window.location.origin : "http://localhost:20128") +
      ENDPOINT_PATH,
    headers: {
      Authorization: `Bearer ${apiKey || "<your-api-key>"}`,
      "Content-Type": "application/json",
    },
    body: buildBody(),
  });

  const handleRun = async () => {
    setRunning(true);
    setError(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    const t0 = performance.now();
    try {
      const res = await fetch(ENDPOINT_PATH, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "x-connection-id": providerId,
        },
        body: JSON.stringify(buildBody()),
      });
      const elapsed = performance.now() - t0;

      if (!res.ok) {
        const data: unknown = await res.json().catch(() => null);
        setError(extractError(data) ?? `HTTP ${res.status}`);
        return;
      }

      const blob = await res.blob();
      audioBlobRef.current = blob;
      setAudioUrl(URL.createObjectURL(blob));
      setAudioSize(blob.size);
      setLatencyMs(elapsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("requestFailed"));
    } finally {
      setRunning(false);
    }
  };

  const handleDownload = () => {
    if (!audioBlobRef.current) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(audioBlobRef.current);
    a.download = `tts-${Date.now()}.mp3`;
    a.click();
  };

  const audioResult = audioUrl
    ? { data: { audioUrl, sizeBytes: audioSize }, latencyMs: latencyMs ?? 0 }
    : undefined;

  const renderAudio = () => (
    <div className="p-3 flex flex-col gap-2">
      <audio controls src={audioUrl!} className="w-full">
        {t("browserAudioUnsupported")}
      </audio>
      <div className="flex items-center gap-2">
        {audioSize !== null && (
          <span className="text-xs text-text-muted">{Math.round(audioSize / 1024)}KB</span>
        )}
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <span className="material-symbols-outlined text-[13px]">download</span>
          {t("download")} .mp3
        </button>
      </div>
    </div>
  );

  const modelOptions = models.length > 0 ? models : [{ id: "tts-1" }];

  return (
    <PlaygroundCard
      kindLabel={t("textToSpeech")}
      apiEndpoint={ENDPOINT_PATH}
      onRun={handleRun}
      curlSnippet={curlSnippet}
      running={running}
      result={audioResult}
      error={error}
      resultRenderer={renderAudio}
    >
      {/* Model + Voice row */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-text-muted mb-1">{t("model")}</label>
          <select
            value={model || firstModel}
            onChange={(e) => setModel(e.target.value)}
            className="w-full rounded-md border border-border bg-bg-subtle text-sm px-2 py-1.5 text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {modelOptions.map((m) => (
              <option key={m.id} value={m.id}>
                {m.id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-text-muted mb-1">{t("voice")}</label>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="w-full rounded-md border border-border bg-bg-subtle text-sm px-2 py-1.5 text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {VOICES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Speed */}
      <div>
        <label className="block text-xs text-text-muted mb-1">
          {t("speed")} ({speed}×)
        </label>
        <input
          type="range"
          min="0.25"
          max="4.0"
          step="0.25"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="w-full"
        />
      </div>
      {/* Input */}
      <div>
        <label className="block text-xs text-text-muted mb-1">{t("input")}</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={2}
          placeholder={t("ttsSample")}
          className="w-full rounded-md border border-border bg-bg-subtle text-sm px-2 py-1.5 text-text-main focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      </div>
    </PlaygroundCard>
  );
}
