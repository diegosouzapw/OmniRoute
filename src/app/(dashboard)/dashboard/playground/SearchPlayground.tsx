"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Card, Button, Select, Badge } from "@/shared/components";
import Editor from "@/shared/components/MonacoEditor";

interface SearchProvider {
  id: string;
  name: string;
  status: "active" | "no_credentials";
  cost_per_query: number;
}

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
  answer: string | null;
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

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export default function SearchPlayground() {
  const t = useTranslations("search");
  const [providers, setProviders] = useState<SearchProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [requestBody, setRequestBody] = useState(
    JSON.stringify(
      {
        query: "latest AI developments",
        max_results: 5,
        search_type: "web",
      },
      null,
      2
    )
  );
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [rawResponse, setRawResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [duration, setDuration] = useState(0);
  const [statusCode, setStatusCode] = useState(0);
  const [showJson, setShowJson] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    fetch("/api/search/providers")
      .then((res) => res.json())
      .then((data) => {
        const allProviders = data.providers || [];
        setProviders(allProviders);
        const firstActive = allProviders.find((p: SearchProvider) => p.status === "active");
        if (firstActive) setSelectedProvider(firstActive.id);
      })
      .catch(() => {});
  }, []);

  const handleSend = async () => {
    setLoading(true);
    setError("");
    setResponse(null);
    setRawResponse("");
    setStatusCode(0);

    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15_000);
    const start = Date.now();

    try {
      let body: any;
      try {
        body = JSON.parse(requestBody);
      } catch {
        setError("Invalid JSON in request body");
        setLoading(false);
        clearTimeout(timeout);
        return;
      }

      if (selectedProvider) body.provider = selectedProvider;

      const res = await fetch("/api/v1/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      setDuration(Date.now() - start);
      setStatusCode(res.status);

      const data = await res.json();
      setRawResponse(JSON.stringify(data, null, 2));

      if (res.ok) {
        setResponse(data);
      } else {
        setError(data.error?.message || data.error || `Error ${res.status}`);
      }
    } catch (err: any) {
      setDuration(Date.now() - start);
      if (err.name === "AbortError") {
        setError("Request timed out (15s)");
      } else {
        setError(err.message || "Network error");
      }
    } finally {
      setLoading(false);
      clearTimeout(timeout);
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
  };

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

  const noProviders = providers.filter((p) => p.status === "active").length === 0;

  const editorTheme =
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "vs-dark"
      : "light";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Request panel */}
      <Card>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-text-muted">upload</span>
              <h3 className="text-sm font-semibold text-text-main">Request</h3>
              <Badge variant="info" size="sm">
                POST /v1/search
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigator.clipboard.writeText(requestBody)}
                className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
                title="Copy"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
              </button>
              <button
                onClick={() =>
                  setRequestBody(
                    JSON.stringify(
                      {
                        query: "latest AI developments",
                        max_results: 5,
                        search_type: "web",
                      },
                      null,
                      2
                    )
                  )
                }
                className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
                title="Reset to default"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              </button>
            </div>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <Editor
              height="400px"
              defaultLanguage="json"
              value={requestBody}
              onChange={(value: string | undefined) => setRequestBody(value || "")}
              theme={editorTheme}
              options={{
                minimap: { enabled: false },
                fontSize: 12,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true,
                formatOnPaste: true,
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Select
                value={selectedProvider}
                onChange={(e: any) => setSelectedProvider(e.target.value)}
                options={providers.map((p) => ({
                  value: p.id,
                  label: `${p.name}${p.status === "no_credentials" ? " (no key)" : ""}`,
                }))}
                className="w-full"
              />
            </div>
            {loading ? (
              <Button icon="stop" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            ) : (
              <Button
                icon="search"
                onClick={handleSend}
                disabled={noProviders || !requestBody.trim()}
              >
                {t("webSearch")}
              </Button>
            )}
          </div>
          {noProviders && <p className="text-xs text-text-muted">{t("noSearchProviders")}</p>}
        </div>
      </Card>

      {/* Response panel */}
      <Card>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-text-muted">
                download
              </span>
              <h3 className="text-sm font-semibold text-text-main">Response</h3>
              {statusCode > 0 && (
                <>
                  <Badge variant={statusCode < 400 ? "success" : "error"} size="sm">
                    {statusCode}
                  </Badge>
                  <span className="text-xs text-text-muted">{duration}ms</span>
                </>
              )}
              {loading && (
                <span className="material-symbols-outlined text-[14px] text-primary animate-spin">
                  progress_activity
                </span>
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

          <div className="border border-border rounded-lg overflow-hidden min-h-[400px]">
            {loading && (
              <div className="flex items-center justify-center h-[400px]">
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
                      {response.results.length} {t("searchResults").toLowerCase()}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {response.provider}
                    </span>
                    <span>${response.usage?.search_cost_usd?.toFixed(4)}</span>
                    <span>{formatBytes(rawResponse.length)}</span>
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

                {/* Results */}
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
              <Editor
                height="400px"
                defaultLanguage="json"
                value={rawResponse}
                theme={editorTheme}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 12,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  automaticLayout: true,
                }}
              />
            )}

            {!loading && !error && !response && (
              <div className="flex items-center justify-center h-[400px] text-text-muted text-sm">
                {t("emptyState")}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
