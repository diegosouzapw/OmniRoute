"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useApiKey } from "../../providers/hooks/useApiKey";
import { buildCurl } from "../../providers/utils/buildCurl";
import { PlaygroundCard } from "./PlaygroundCard";

interface Props {
  providerId: string;
}

/**
 * NOTE: /api/v1/web/fetch does not exist in the current codebase.
 * This card is included for forward compatibility with Phase 3 (webFetch
 * providers). The Run button will return a 404 error until the endpoint is
 * implemented.
 */
const ENDPOINT_PATH = "/api/v1/web/fetch";

const FORMAT_OPTIONS = ["markdown", "html", "links", "screenshot"] as const;
type FetchFormat = (typeof FORMAT_OPTIONS)[number];

const DEPTH_OPTIONS = [0, 1, 2, 3];

function extractError(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const err = d.error as Record<string, unknown> | undefined;
  if (err?.message) return String(err.message);
  if (typeof d.message === "string") return d.message;
  return null;
}

export function WebFetchExampleCard({ providerId }: Props) {
  const t = useTranslations("miniPlayground");
  const { apiKey } = useApiKey();

  const [url, setUrl] = useState<string>("https://example.com");
  const [format, setFormat] = useState<FetchFormat>("markdown");
  const [depth, setDepth] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [result, setResult] = useState<{ data: unknown; latencyMs: number } | undefined>();
  const [error, setError] = useState<string | null>(null);

  const buildBody = () => ({ url, provider: providerId, format, depth });

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

  return (
    <PlaygroundCard
      kindLabel="Web Fetch"
      apiEndpoint={ENDPOINT_PATH}
      onRun={handleRun}
      curlSnippet={curlSnippet}
      running={running}
      result={result}
      error={error}
    >
      {/* URL */}
      <div>
        <label className="block text-xs text-text-muted mb-1">{t("url")}</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/article"
          className="w-full rounded-md border border-border bg-bg-subtle text-sm px-2 py-1.5 text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      {/* Format + Depth row */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-text-muted mb-1">{t("format")}</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as FetchFormat)}
            className="w-full rounded-md border border-border bg-bg-subtle text-sm px-2 py-1.5 text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {FORMAT_OPTIONS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-text-muted mb-1">{t("depth")}</label>
          <select
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            className="w-full rounded-md border border-border bg-bg-subtle text-sm px-2 py-1.5 text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {DEPTH_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>
    </PlaygroundCard>
  );
}
