"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Button } from "@/shared/components";

interface PlaygroundResult {
  data: unknown;
  latencyMs: number;
}

interface PlaygroundCardProps {
  kindLabel: string;
  /** Used in the Endpoint display row — the full URL string */
  apiEndpoint: string;
  /** Form fields to render above the action row */
  children: React.ReactNode;
  /** Called when the user clicks Run */
  onRun: () => Promise<void>;
  /** Pre-built cURL command string (may contain the real API key — UI provides reveal toggle) */
  curlSnippet: string;
  running: boolean;
  result?: PlaygroundResult;
  error?: string | null;
  /** Custom renderer for the result data; defaults to a JSON <pre> block */
  resultRenderer?: (data: unknown) => React.ReactNode;
}

export function PlaygroundCard({
  kindLabel,
  apiEndpoint,
  children,
  onRun,
  curlSnippet,
  running,
  result,
  error,
  resultRenderer,
}: PlaygroundCardProps) {
  const t = useTranslations("miniPlayground");
  const [showCurl, setShowCurl] = useState<boolean>(false);
  const [curlCopied, setCurlCopied] = useState<boolean>(false);
  const [keyRevealed, setKeyRevealed] = useState<boolean>(false);

  const handleCopyCurl = async () => {
    try {
      await navigator.clipboard.writeText(curlSnippet);
      setCurlCopied(true);
      setTimeout(() => setCurlCopied(false), 2000);
    } catch {
      // clipboard not available — show the snippet so user can copy manually
      setShowCurl(true);
    }
  };

  // Mask the Authorization header value in the displayed snippet unless revealed
  const displayedCurl = keyRevealed
    ? curlSnippet
    : curlSnippet.replace(/(Authorization': Bearer )([^\s']+)/g, "$1••••••••");

  return (
    <Card padding="md">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-text-muted">labs</span>
          <h3 className="text-sm font-semibold">
            {t("exampleLabel")} · {kindLabel}
          </h3>
        </div>
      </div>

      {/* Endpoint display */}
      <div className="mb-3">
        <label className="block text-xs text-text-muted mb-1">{t("endpoint")}</label>
        <code className="block text-xs font-mono bg-bg-subtle rounded px-2 py-1.5 border border-border text-text-main truncate">
          {apiEndpoint}
        </code>
      </div>

      {/* Injected fields */}
      <div className="flex flex-col gap-3">{children}</div>

      {/* Action row */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleCopyCurl}
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[14px]">content_copy</span>
          {curlCopied ? t("copied") : t("copyCurl")}
        </button>
        <Button size="sm" onClick={() => void onRun()} disabled={running} loading={running}>
          {running ? t("running") : `▶ ${t("run")}`}
        </Button>
      </div>

      {/* cURL snippet display (toggle) */}
      {showCurl && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-text-muted font-mono">cURL</span>
            <button
              type="button"
              onClick={() => setKeyRevealed((v) => !v)}
              className="text-xs text-text-muted hover:text-text-primary"
            >
              {keyRevealed ? t("hideKey") : t("revealKey")}
            </button>
          </div>
          <pre className="text-xs bg-bg-subtle border border-border rounded p-2 overflow-x-auto whitespace-pre-wrap break-all">
            {displayedCurl}
          </pre>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2">
          <span className="material-symbols-outlined text-[16px] text-red-400 shrink-0">error</span>
          <p className="text-xs text-red-400">{error}</p>
        </div>
      )}

      {/* Result display */}
      {result && !error && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-text-muted">{t("response")}</span>
            <span className="flex items-center gap-0.5 text-xs text-text-muted">
              <span className="material-symbols-outlined text-[13px]">bolt</span>
              {t("latency", { ms: Math.round(result.latencyMs) })}
            </span>
          </div>
          <div className="rounded-lg border border-border bg-bg-subtle overflow-auto max-h-64">
            {resultRenderer ? (
              resultRenderer(result.data)
            ) : (
              <pre className="text-xs p-3 text-text-main">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
