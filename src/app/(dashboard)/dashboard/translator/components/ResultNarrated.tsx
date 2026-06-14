"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { Badge, Button, Card } from "@/shared/components";
import type { AdvancedSlug, TranslateNarratedResult } from "../types";
import { FORMAT_META } from "../exampleTemplates";

interface ResultNarratedProps {
  result: TranslateNarratedResult;
  onSeeTranslatedJson: () => void;
  onSeePipeline: () => void;
}

// Resolve a display label for a FormatId
function formatLabel(id: string | null): string {
  if (!id) return "—";
  const meta = (FORMAT_META as Record<string, { label: string }>)[id];
  return meta?.label ?? id;
}

// Ensure stack traces are never surfaced — safety net on top of hook sanitization
function safeErrorMessage(raw: string | null): string {
  if (!raw) return "Unknown error";
  return raw
    .replace(/\sat\s\/[^\s]*/g, "")
    .replace(/sk-[A-Za-z0-9_-]{16,}/g, "[REDACTED]")
    .replace(/Bearer\s+[A-Za-z0-9_.-]+/g, "Bearer [REDACTED]");
}

export default function ResultNarrated({
  result,
  onSeeTranslatedJson,
  onSeePipeline,
}: ResultNarratedProps) {
  const t = useTranslations("translator");

  const tr = useCallback(
    (key: string, fallback: string, params?: Record<string, string | number>): string => {
      try {
        const translated = t(key as Parameters<typeof t>[0], params as Parameters<typeof t>[1]);
        if (translated === key || translated === `translator.${key}`) {
          // i18n key not found — use fallback with param substitution
          if (params) {
            return Object.entries(params).reduce(
              (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
              fallback
            );
          }
          return fallback;
        }
        return translated;
      } catch {
        if (params && fallback) {
          return Object.entries(params).reduce(
            (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
            fallback
          );
        }
        return fallback;
      }
    },
    [t]
  );

  const isSpinning = result.status === "translating" || result.status === "sending";

  return (
    <Card className="flex flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">
          translate
        </span>
        <h3 className="text-sm font-semibold text-text-main">
          {tr("simpleResultPanelTitle", "Translation + Response")}
        </h3>
      </div>

      {/* Status area — aria-live for screen-reader announcements (D20) */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="flex flex-1 flex-col gap-3"
      >
        {/* idle */}
        {result.status === "idle" && (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
            <span className="material-symbols-outlined text-[40px] text-text-muted/40" aria-hidden="true">
              info
            </span>
            <p className="text-sm text-text-muted">
              {tr("simpleStartWithExamplePlaceholder", "Select a ready-made example")}
            </p>
          </div>
        )}

        {/* translating or sending */}
        {isSpinning && (
          <div className="flex items-center gap-3 py-6">
            <span className="material-symbols-outlined animate-spin text-[24px] text-primary" aria-hidden="true">
              progress_activity
            </span>
            <span className="text-sm text-text-muted">
              {result.status === "translating"
                ? tr("narratedTranslating", "Translating to {target}...", {
                    target: formatLabel(result.target),
                  })
                : tr("narratedSending", "Sending to {target}...", {
                    target: formatLabel(result.target),
                  })}
            </span>
          </div>
        )}

        {/* ok */}
        {result.status === "ok" && (
          <div className="flex flex-col gap-3">
            {/* Detection badge */}
            {result.detected && (
              <Badge variant="success">
                {tr("narratedDetected", "✓ Detected: {format}", {
                  format: formatLabel(result.detected),
                })}
              </Badge>
            )}

            {/* Narrated success line */}
            <p className="text-sm text-text-main">
              {tr("narratedSuccess", "→ translated to {target} · response in {latency}ms", {
                target: formatLabel(result.target),
                latency: result.latencyMs ?? 0,
              })}
            </p>

            {/* Response preview */}
            {result.responsePreview && (
              <div className="rounded-md border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
                <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-xs text-text-main">
                  {result.responsePreview.slice(0, 500)}
                </pre>
              </div>
            )}

            {/* Secondary action buttons */}
            <div className="flex flex-wrap gap-2">
              {result.translatedJson && (
                <Button
                  variant="secondary"
                  size="sm"
                  icon="code"
                  onClick={onSeeTranslatedJson}
                  aria-label={tr("narratedSeeTranslatedJson", "see translated JSON")}
                >
                  {tr("narratedSeeTranslatedJson", "see translated JSON")}
                </Button>
              )}
              <Button
                variant="secondary"
                size="sm"
                icon="account_tree"
                onClick={onSeePipeline}
                aria-label={tr("narratedSeePipeline", "see pipeline")}
              >
                {tr("narratedSeePipeline", "see pipeline")}
              </Button>
            </div>
          </div>
        )}

        {/* error */}
        {result.status === "error" && (
          <div className="flex flex-col gap-2">
            <Badge variant="error">
              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                error
              </span>
              Error
            </Badge>
            <p className="text-sm text-text-main">
              {tr("narratedError", "Failed: {reason}", {
                reason: safeErrorMessage(result.errorMessage),
              })}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
