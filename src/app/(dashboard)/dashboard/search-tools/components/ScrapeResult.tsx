"use client";

import { useState, lazy, Suspense } from "react";
import { useTranslations } from "next-intl";
import type { ScrapeResult as ScrapeResultType } from "@/shared/schemas/searchTools";

/** D21 — cap at 256 KB to avoid freezing the renderer */
const CONTENT_CAP_BYTES = 256 * 1024;

// Lazy-load MarkdownMessage to avoid increasing initial bundle size
const MarkdownMessage = lazy(
  () => import("@/app/(dashboard)/dashboard/playground/components/MarkdownMessage")
);

interface ScrapeResultProps {
  result: ScrapeResultType;
  latencyMs?: number | null;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ScrapeResult({ result, latencyMs }: ScrapeResultProps) {
  const t = useTranslations("search");
  const [mode, setMode] = useState<"markdown" | "raw">("markdown");
  const [rawModalOpen, setRawModalOpen] = useState(false);

  const contentSize = new TextEncoder().encode(result.content).length;
  const isTruncated = contentSize > CONTENT_CAP_BYTES;
  const displayContent = isTruncated ? result.content.slice(0, CONTENT_CAP_BYTES) : result.content;

  return (
    <div className="space-y-3" data-testid="scrape-result">
      {/* Meta bar */}
      <div className="flex flex-wrap justify-between items-center gap-2 p-3 bg-bg-alt rounded-lg border border-border text-xs text-text-muted">
        <div className="flex flex-wrap gap-x-4 gap-y-1 items-center">
          {result.provider && (
            <span>
              {`${t("provider")}: `}
              <span className="font-medium text-text-main">{result.provider}</span>
            </span>
          )}
          {latencyMs != null && (
            <span>
              {`${t("latency")}: `}
              <span className="font-medium text-text-main">{latencyMs}ms</span>
            </span>
          )}
          <span>
            {`${t("size")}: `}
            <span className="font-medium text-text-main">{formatBytes(contentSize)}</span>
          </span>
          {result.links.length > 0 && (
            <span>
              {`${t("links")}: `}
              <span className="font-medium text-text-main">{result.links.length}</span>
            </span>
          )}
        </div>

        {/* View toggle */}
        <div className="flex gap-1">
          <button
            className={[
              "px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors",
              mode === "markdown"
                ? "bg-primary/15 text-primary"
                : "bg-black/5 dark:bg-white/5 text-text-muted hover:text-text-main",
            ].join(" ")}
            onClick={() => setMode("markdown")}
            data-testid="toggle-markdown"
          >
            {t("scrapePreview")}
          </button>
          <button
            className={[
              "px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors",
              mode === "raw"
                ? "bg-primary/15 text-primary"
                : "bg-black/5 dark:bg-white/5 text-text-muted hover:text-text-main",
            ].join(" ")}
            onClick={() => setMode("raw")}
            data-testid="toggle-raw"
          >
            {t("scrapeRaw")}
          </button>
        </div>
      </div>

      {/* Metadata card */}
      {result.metadata && (result.metadata.title || result.metadata.description) && (
        <div className="p-3 bg-surface border border-border rounded-lg text-xs">
          {result.metadata.title && (
            <div className="font-semibold text-text-main mb-0.5">{result.metadata.title}</div>
          )}
          {result.metadata.description && (
            <div className="text-text-muted">{result.metadata.description}</div>
          )}
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline block mt-1 truncate"
          >
            {result.url}
          </a>
        </div>
      )}

      {/* Truncation warning */}
      {isTruncated && (
        <div
          className="flex items-center justify-between p-3 bg-warning/10 border border-warning/30 rounded-lg text-xs text-warning"
          data-testid="truncation-warning"
        >
          <span>{t("contentTruncated", { size: formatBytes(contentSize) })}</span>
          <button
            className="ml-3 text-xs px-2 py-1 rounded bg-warning/20 text-warning hover:bg-warning/30 transition-colors"
            onClick={() => setRawModalOpen(true)}
            data-testid="view-raw-button"
          >
            {t("viewFullRaw")}
          </button>
        </div>
      )}

      {/* Content area */}
      {mode === "markdown" ? (
        <div
          className="prose prose-sm dark:prose-invert max-w-none p-4 bg-surface border border-border rounded-lg overflow-auto"
          data-testid="markdown-preview"
        >
          <Suspense
            fallback={
              <pre className="text-xs whitespace-pre-wrap text-text-muted">{displayContent}</pre>
            }
          >
            <MarkdownMessage content={displayContent} />
          </Suspense>
        </div>
      ) : (
        <textarea
          readOnly
          value={displayContent}
          className="w-full h-64 bg-surface border border-border rounded-lg p-3 text-xs text-text-main font-mono resize-none focus:outline-none"
          data-testid="raw-content"
          aria-label={t("rawScrapedContent")}
        />
      )}

      {/* Raw full-content modal (for truncated content) */}
      {rawModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          data-testid="raw-modal"
        >
          <div className="bg-surface border border-border rounded-xl shadow-2xl w-[90vw] max-w-4xl h-[80vh] flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-border">
              <span className="text-sm font-semibold text-text-main">
                {t("rawContent", { size: formatBytes(contentSize) })}
              </span>
              <button
                className="text-text-muted hover:text-text-main"
                onClick={() => setRawModalOpen(false)}
                aria-label={t("closeRawModal")}
              >
                ✕
              </button>
            </div>
            <textarea
              readOnly
              value={result.content}
              className="flex-1 bg-bg-alt p-4 text-xs text-text-main font-mono resize-none focus:outline-none rounded-b-xl"
              data-testid="raw-modal-content"
            />
          </div>
        </div>
      )}
    </div>
  );
}
