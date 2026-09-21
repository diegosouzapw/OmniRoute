"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useApiKey } from "../../providers/hooks/useApiKey";
import { buildCurl } from "../../providers/utils/buildCurl";
import { PLAYGROUND_KEY_ID_HEADER, resolvePlaygroundKeyId } from "../../providers/utils/playgroundAuth";
import { PlaygroundCard } from "./PlaygroundCard";

interface Props {
  providerId: string;
}

const ENDPOINT_PATH = "/api/v1/search";

function extractError(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const err = d.error as Record<string, unknown> | undefined;
  if (err?.message) return String(err.message);
  if (typeof d.message === "string") return d.message;
  return null;
}

function SearchResultRenderer(data: unknown, fallbackTitle: (number: number) => string) {
  if (!data || typeof data !== "object") {
    return <pre className="text-xs p-3 text-text-main">{JSON.stringify(data, null, 2)}</pre>;
  }
  const d = data as Record<string, unknown>;
  const results = Array.isArray(d.results) ? d.results : Array.isArray(d.data) ? d.data : null;
  if (!results) {
    return <pre className="text-xs p-3 text-text-main">{JSON.stringify(data, null, 2)}</pre>;
  }
  return (
    <div className="flex flex-col divide-y divide-border">
      {(results as Array<Record<string, unknown>>).map((item, i) => {
        const title = typeof item.title === "string" ? item.title : fallbackTitle(i + 1);
        const url = typeof item.url === "string" ? item.url : null;
        const snippet =
          typeof item.snippet === "string"
            ? item.snippet
            : typeof item.description === "string"
              ? item.description
              : null;
        return (
          <div key={i} className="p-3">
            <p className="text-xs font-medium text-text-main">{title}</p>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-primary hover:underline truncate block"
              >
                {url}
              </a>
            )}
            {snippet && <p className="text-[11px] text-text-muted mt-0.5">{snippet}</p>}
          </div>
        );
      })}
    </div>
  );
}

export function WebSearchExampleCard({ providerId }: Props) {
  const t = useTranslations("miniPlayground");
  const { apiKey, keys } = useApiKey();

  const [query, setQuery] = useState<string>(() => t("webSearchSample"));
  const [numResults, setNumResults] = useState<number>(5);
  const [running, setRunning] = useState<boolean>(false);
  const [result, setResult] = useState<{ data: unknown; latencyMs: number } | undefined>();
  const [error, setError] = useState<string | null>(null);

  // #13245 — The /api/v1/search route selects providers from body.provider,
  // not the x-connection-id header.  Send both: the body field drives the
  // backend; the header is kept for call-log attribution.
  const buildBody = () => ({ query, max_results: numResults, provider: providerId });

  const curlSnippet = buildCurl({
    endpoint:
      (typeof window !== "undefined" ? window.location.origin : "http://localhost:20128") +
      ENDPOINT_PATH,
    headers: {
      Authorization: "Bearer <your-api-key>",
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
      // Authenticate via the dashboard session cookie — never send the masked
      // apiKey as a Bearer token (it is not a real credential; see #9935).
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "x-connection-id": providerId,
      };
      const playgroundKeyId = resolvePlaygroundKeyId(apiKey, keys);
      if (playgroundKeyId) headers[PLAYGROUND_KEY_ID_HEADER] = playgroundKeyId;
      const res = await fetch(ENDPOINT_PATH, {
        method: "POST",
        credentials: "same-origin",
        headers,
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
      setError(err instanceof Error ? err.message : t("requestFailed"));
    } finally {
      setRunning(false);
    }
  };

  return (
    <PlaygroundCard
      kindLabel={t("webSearch")}
      apiEndpoint={ENDPOINT_PATH}
      onRun={handleRun}
      curlSnippet={curlSnippet}
      running={running}
      result={result}
      error={error}
      resultRenderer={(data) =>
        SearchResultRenderer(data, (number) => t("searchResultFallback", { number }))
      }
    >
      {/* Query */}
      <div>
        <label className="block text-xs text-text-muted mb-1">{t("query")}</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("webSearchSample")}
          className="w-full rounded-md border border-border bg-bg-subtle text-sm px-2 py-1.5 text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      {/* Max results */}
      <div>
        <label className="block text-xs text-text-muted mb-1">
          {t("numResults")} ({numResults})
        </label>
        <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={numResults}
          onChange={(e) => setNumResults(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </PlaygroundCard>
  );
}
