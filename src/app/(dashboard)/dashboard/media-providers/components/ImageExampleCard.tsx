"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useApiKey } from "../../providers/hooks/useApiKey";
import { useProviderModels } from "../../providers/hooks/useProviderModels";
import { buildCurl } from "../../providers/utils/buildCurl";
import { PlaygroundCard } from "./PlaygroundCard";

interface Props {
  providerId: string;
}

const ENDPOINT_PATH = "/api/v1/images/generations";

const IMAGE_SIZES = ["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"];

function extractError(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const err = d.error as Record<string, unknown> | undefined;
  if (err?.message) return String(err.message);
  if (typeof d.message === "string") return d.message;
  return null;
}

function ImageResultRenderer(data: unknown) {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const items = Array.isArray(d.data) ? (d.data as Array<Record<string, unknown>>) : [];
  if (items.length === 0) {
    return <pre className="text-xs p-3 text-text-main">{JSON.stringify(data, null, 2)}</pre>;
  }
  return (
    <div className="flex flex-wrap gap-2 p-3">
      {items.map((item, i) => {
        const url = typeof item.url === "string" ? item.url : null;
        const b64 = typeof item.b64_json === "string" ? item.b64_json : null;
        const src = url ?? (b64 ? `data:image/png;base64,${b64}` : null);
        if (!src) return null;
        return (
          <img
            key={i}
            src={src}
            alt={`Generated image ${i + 1}`}
            className="max-w-full rounded-lg border border-border"
            style={{ maxHeight: "200px" }}
          />
        );
      })}
    </div>
  );
}

export function ImageExampleCard({ providerId }: Props) {
  const t = useTranslations("miniPlayground");
  const { apiKey } = useApiKey();
  const { models } = useProviderModels(providerId);

  const firstModel = models[0]?.id ?? "dall-e-3";
  const [model, setModel] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("A serene landscape with mountains at sunset");
  const [size, setSize] = useState<string>("1024x1024");
  const [running, setRunning] = useState<boolean>(false);
  const [result, setResult] = useState<{ data: unknown; latencyMs: number } | undefined>();
  const [error, setError] = useState<string | null>(null);

  const effectiveModel = model || firstModel;
  const buildBody = () => ({ model: effectiveModel, prompt, size, n: 1 });

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
    setResult(undefined);
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
      const data: unknown = await res.json();
      const latencyMs = performance.now() - t0;
      const errMsg = extractError(data);
      if (!res.ok || errMsg) {
        setError(errMsg ?? `HTTP ${res.status}`);
      } else {
        setResult({ data, latencyMs });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setRunning(false);
    }
  };

  const modelOptions = models.length > 0 ? models : [{ id: "dall-e-3" }];

  return (
    <PlaygroundCard
      kindLabel="Image"
      apiEndpoint={ENDPOINT_PATH}
      onRun={handleRun}
      curlSnippet={curlSnippet}
      running={running}
      result={result}
      error={error}
      resultRenderer={ImageResultRenderer}
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
      {/* Size */}
      <div>
        <label className="block text-xs text-text-muted mb-1">{t("size")}</label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full rounded-md border border-border bg-bg-subtle text-sm px-2 py-1.5 text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {IMAGE_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      {/* Prompt */}
      <div>
        <label className="block text-xs text-text-muted mb-1">{t("prompt")}</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          placeholder="A serene landscape..."
          className="w-full rounded-md border border-border bg-bg-subtle text-sm px-2 py-1.5 text-text-main focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      </div>
    </PlaygroundCard>
  );
}
