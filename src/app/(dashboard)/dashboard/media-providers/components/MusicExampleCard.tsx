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

const ENDPOINT_PATH = "/api/v1/music/generations";

function extractError(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const err = d.error as Record<string, unknown> | undefined;
  if (err?.message) return String(err.message);
  if (typeof d.message === "string") return d.message;
  return null;
}

export function MusicExampleCard({ providerId }: Props) {
  const t = useTranslations("miniPlayground");
  const { apiKey } = useApiKey();
  const { models } = useProviderModels(providerId);

  const firstModel = models[0]?.id ?? "";
  const [model, setModel] = useState<string>("");
  const [prompt, setPrompt] = useState<string>(() => t("musicSample"));
  const [duration, setDuration] = useState<number>(10);
  const [running, setRunning] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioBlobRef = useRef<Blob | null>(null);

  const effectiveModel = model || firstModel;
  const buildBody = () => ({ model: effectiveModel, prompt, duration });

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
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
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

      // Try JSON first (some providers return URLs), fall back to blob audio
      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        const data = (await res.json()) as Record<string, unknown>;
        const items = Array.isArray(data.data) ? (data.data as Array<Record<string, unknown>>) : [];
        const url =
          typeof items[0]?.url === "string"
            ? items[0].url
            : typeof data.url === "string"
              ? data.url
              : null;
        if (url) {
          setAudioUrl(url);
          setLatencyMs(elapsed);
        } else {
          setError(t("noAudioUrl", { response: JSON.stringify(data) }));
        }
      } else {
        const blob = await res.blob();
        audioBlobRef.current = blob;
        setAudioUrl(URL.createObjectURL(blob));
        setLatencyMs(elapsed);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("requestFailed"));
    } finally {
      setRunning(false);
    }
  };

  const audioResult = audioUrl ? { data: { audioUrl }, latencyMs: latencyMs ?? 0 } : undefined;

  const renderAudio = () => (
    <div className="p-3">
      <audio controls src={audioUrl!} className="w-full">
        {t("browserAudioUnsupported")}
      </audio>
    </div>
  );

  const modelOptions = models.length > 0 ? models : [{ id: "musicgen-stereo-melody-large" }];

  return (
    <PlaygroundCard
      kindLabel={t("music")}
      apiEndpoint={ENDPOINT_PATH}
      onRun={handleRun}
      curlSnippet={curlSnippet}
      running={running}
      result={audioResult}
      error={error}
      resultRenderer={renderAudio}
    >
      {/* Model */}
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
      {/* Duration */}
      <div>
        <label className="block text-xs text-text-muted mb-1">
          {t("duration")} ({duration}s)
        </label>
        <input
          type="range"
          min="5"
          max="60"
          step="5"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full"
        />
      </div>
      {/* Prompt */}
      <div>
        <label className="block text-xs text-text-muted mb-1">{t("prompt")}</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          placeholder={t("musicSample")}
          className="w-full rounded-md border border-border bg-bg-subtle text-sm px-2 py-1.5 text-text-main focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      </div>
    </PlaygroundCard>
  );
}
