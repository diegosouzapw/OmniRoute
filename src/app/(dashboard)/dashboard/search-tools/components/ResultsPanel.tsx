"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/shared/components";
import Editor from "@/shared/components/MonacoEditor";

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  score?: number;
  date?: string;
}

interface SearchResponse {
  id: string;
  provider: string;
  results: SearchResult[];
  query: string;
  answer?: string | null;
  cached: boolean;
  usage: {
    queries_used: number;
    search_cost_usd: number;
  };
  metrics: {
    response_time_ms: number;
    upstream_latency_ms: number;
    total_results_available: number | null;
  };
}

interface ResultsPanelProps {
  response: SearchResponse | null;
  rawJson: string;
  loading: boolean;
  error: string;
  statusCode: number;
  duration: number;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export default function ResultsPanel({
  response,
  rawJson,
  loading,
  error,
  statusCode,
  duration,
}: ResultsPanelProps) {
  const t = useTranslations("search");
  const [showJson, setShowJson] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return "text-success";
    if (score >= 0.7) return "text-warning";
    return "text-error";
  };

  const getScoreBg = (score: number) => {
    if (score >= 0.9) return "bg-green-500/10";
    if (score >= 0.7) return "bg-yellow-500/10";
    return "bg-red-500/10";
  };

  const editorTheme =
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "vs-dark"
      : "light";

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            {t("searchResults")}
          </span>
          {statusCode > 0 && (
            <>
              <Badge variant={statusCode < 400 ? "success" : "error"} size="sm">
                {statusCode}
              </Badge>
              <span className="text-xs text-text-muted">{duration}ms</span>
            </>
          )}
        </div>
        {response && (
          <div className="flex gap-1">
            <button
              className={`text-xs px-3 py-1 rounded-md ${
                !showJson
                  ? "bg-primary/15 text-primary font-medium"
                  : "bg-black/5 dark:bg-white/5 text-text-muted"
              }`}
              onClick={() => setShowJson(false)}
            >
              {t("formatted")}
            </button>
            <button
              className={`text-xs px-3 py-1 rounded-md ${
                showJson
                  ? "bg-primary/15 text-primary font-medium"
                  : "bg-black/5 dark:bg-white/5 text-text-muted"
              }`}
              onClick={() => setShowJson(true)}
            >
              {t("rawJson")}
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <span className="material-symbols-outlined text-[24px] text-primary animate-spin">
            progress_activity
          </span>
        </div>
      )}

      {error && !loading && (
        <div className="p-4">
          <div className="text-error text-sm">{error}</div>
        </div>
      )}

      {response && !showJson && !loading && (
        <div className="p-4 space-y-3">
          {/* Meta bar */}
          <div className="flex justify-between items-center p-2 bg-bg-alt rounded-lg">
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span>
                {response.results.length} {t("results").toLowerCase()}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {response.provider}
              </span>
              <span>{response.metrics?.response_time_ms}ms</span>
              <span>${response.usage?.search_cost_usd?.toFixed(4)}</span>
              <span>{formatBytes(rawJson.length)}</span>
            </div>
            <span
              className={`text-xs flex items-center gap-1 ${
                response.cached ? "text-success" : "text-warning"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  response.cached ? "bg-success" : "bg-warning"
                }`}
              />
              {response.cached ? t("cacheHit") : t("cacheMiss")}
            </span>
          </div>

          {/* Results list */}
          {response.results.map((r, i) => (
            <div
              key={i}
              className="border-l-[3px] border-l-primary p-3 bg-surface rounded-r-lg border border-border"
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-text-main">
                  {i + 1}. {r.title}
                </span>
                {r.score != null && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md ml-2 whitespace-nowrap ${getScoreBg(r.score)} ${getScoreColor(r.score)}`}
                  >
                    {r.score.toFixed(2)}
                  </span>
                )}
              </div>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent text-[11px] block mt-0.5"
              >
                {r.url}
              </a>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">{r.snippet}</p>
            </div>
          ))}
        </div>
      )}

      {response && showJson && !loading && (
        <div className="h-64">
          <Editor
            height="100%"
            language="json"
            value={rawJson}
            theme={editorTheme}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 12,
              automaticLayout: true,
              wordWrap: "on",
            }}
          />
        </div>
      )}

      {!loading && !error && !response && (
        <div className="flex items-center justify-center py-20 text-text-muted text-sm">
          {t("emptyState")}
        </div>
      )}
    </div>
  );
}
