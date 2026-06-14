"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button, Select } from "@/shared/components";
import { cn } from "@/shared/utils/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CompressionPreviewResult {
  originalTokens: number;
  compressedTokens: number;
  tokensSaved: number;
  savingsPct: number;
  techniquesUsed: string[];
  durationMs: number;
}

export interface CompressionPreviewAccordionProps {
  /** Force the accordion open on mount (used by deep-link). */
  forceOpen?: boolean;
  /** Called whenever the open state changes (used for URL sync). */
  onOpenChange?: (open: boolean) => void;
  /**
   * Content to compress. If provided (from TranslateTab state), the accordion
   * uses it directly. If absent or empty, shows an empty-state hint.
   */
  inputContent?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Sanitize an error message: strip Node stack-trace lines (e.g. "at /home/…"). */
function sanitizeError(e: unknown): string {
  const raw = e instanceof Error ? e.message : String(e);
  // Remove stack-trace lines that start with "at " followed by a path
  return raw.replace(/\s+at\s+[^\n]+/g, "").trim();
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COMPRESSION_MODES = [
  { value: "off", label: "Off" },
  { value: "lite", label: "Lite" },
  { value: "standard", label: "Standard" },
  { value: "aggressive", label: "Aggressive" },
  { value: "ultra", label: "Ultra" },
] as const;

// ---------------------------------------------------------------------------
// Inner content (always mounted when hasOpened is true)
// ---------------------------------------------------------------------------

function CompressionPreviewContent({ inputContent = "" }: { inputContent?: string }) {
  const t = useTranslations("translator");

  const [compressionMode, setCompressionMode] = useState<string>("standard");
  const [compressionResult, setCompressionResult] = useState<CompressionPreviewResult | null>(
    null,
  );
  const [compressionLoading, setCompressionLoading] = useState(false);
  const [compressionError, setCompressionError] = useState<string | null>(null);

  const hasInput = inputContent.trim().length > 0;

  const handleCompressionPreview = useCallback(async () => {
    if (!hasInput) return;

    let messages: Array<{ role: string; content: string }>;
    try {
      const parsed: Record<string, unknown> = JSON.parse(inputContent);
      messages = Array.isArray(parsed.messages)
        ? (parsed.messages as Array<{ role: string; content: string }>)
        : [{ role: "user", content: inputContent }];
    } catch {
      messages = [{ role: "user", content: inputContent }];
    }

    setCompressionLoading(true);
    setCompressionError(null);

    try {
      const res = await fetch("/api/compression/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, mode: compressionMode }),
      });
      const data: CompressionPreviewResult & { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Preview failed");
      setCompressionResult(data);
    } catch (e: unknown) {
      setCompressionError(sanitizeError(e));
    } finally {
      setCompressionLoading(false);
    }
  }, [hasInput, inputContent, compressionMode]);

  return (
    <div className="space-y-4">
      {/* Empty state */}
      {!hasInput && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-black/5 dark:bg-white/5 text-sm text-text-muted">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            info
          </span>
          <span>
            {t("compressionEmptyHint") ||
              "Preencha o campo de entrada na aba Translate (Simple Controls ou Raw JSON) para habilitar o preview."}
          </span>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select
          value={compressionMode}
          onChange={(e) => setCompressionMode(e.target.value)}
          options={COMPRESSION_MODES}
          className="text-sm"
          aria-label={t("compressionModeLabel") || "Modo de compressão"}
        />
        <Button
          icon="play_arrow"
          onClick={handleCompressionPreview}
          loading={compressionLoading}
          disabled={compressionLoading || !hasInput}
          className="text-sm"
        >
          {compressionLoading
            ? t("compressionPreviewing") || "Previewing…"
            : t("compressionPreviewButton") || "Preview Compression"}
        </Button>
      </div>

      {/* Error */}
      {compressionError && (
        <div className="text-sm text-red-500" role="alert">
          {compressionError}
        </div>
      )}

      {/* Result grid — 4 cards */}
      {compressionResult && (
        <div className="space-y-3">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            data-testid="compression-result-grid"
          >
            <div className="card p-3 text-center bg-black/5 dark:bg-white/5 rounded-lg border border-border">
              <div className="text-xs text-text-muted">Original</div>
              <div className="text-lg font-bold">{compressionResult.originalTokens}</div>
              <div className="text-xs text-text-muted">tokens</div>
            </div>
            <div className="card p-3 text-center bg-black/5 dark:bg-white/5 rounded-lg border border-border">
              <div className="text-xs text-text-muted">Compressed</div>
              <div className="text-lg font-bold">{compressionResult.compressedTokens}</div>
              <div className="text-xs text-text-muted">tokens</div>
            </div>
            <div className="card p-3 text-center bg-black/5 dark:bg-white/5 rounded-lg border border-border">
              <div className="text-xs text-text-muted">Saved</div>
              <div className="text-lg font-bold text-green-500">
                {compressionResult.tokensSaved}
              </div>
              <div className="text-xs text-text-muted">{compressionResult.savingsPct}%</div>
            </div>
            <div className="card p-3 text-center bg-black/5 dark:bg-white/5 rounded-lg border border-border">
              <div className="text-xs text-text-muted">Duration</div>
              <div className="text-lg font-bold">{compressionResult.durationMs}</div>
              <div className="text-xs text-text-muted">ms</div>
            </div>
          </div>

          {compressionResult.techniquesUsed.length > 0 && (
            <div className="text-xs text-text-muted">
              <span className="font-semibold">{t("techniques") || "Técnicas:"}</span>{" "}
              {compressionResult.techniquesUsed.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Accordion wrapper — owns open state to support D7 lazy-render + onOpenChange
// ---------------------------------------------------------------------------

/**
 * CompressionPreviewAccordion — F7
 *
 * Extracted from PlaygroundMode.tsx lines 506-584 (Compression Preview Panel).
 * Uses a self-contained collapsible header (matches Collapsible visual style)
 * with an explicit `open` state so we can implement:
 *   - D7 lazy-render guard (mount content only after first open)
 *   - `onOpenChange` callback for deep-link URL sync
 *   - `forceOpen` prop for deep-link initial state
 *
 * Note: We manage open state here rather than delegating to Collapsible because
 * Collapsible is purely uncontrolled (no onOpenChange prop). D7 requires knowing
 * when the accordion opens to set hasOpened, which requires controlled state.
 */
export default function CompressionPreviewAccordion({
  forceOpen = false,
  onOpenChange,
  inputContent,
}: CompressionPreviewAccordionProps) {
  const t = useTranslations("translator");

  // Lazy-render guard (D7): track whether the accordion has ever been opened.
  const [hasOpened, setHasOpened] = useState(forceOpen);
  const [open, setOpen] = useState(forceOpen);
  // Track previous forceOpen so the effect only reacts to false→true transitions.
  // Without this, a manual close while forceOpen stays true would re-open the accordion
  // on the very next render (the test "toggle closes accordion again" guards this).
  const prevForceOpen = useRef(forceOpen);

  // Sync forceOpen changes from parent after mount (deep-link / back-forward navigation).
  useEffect(() => {
    const prev = prevForceOpen.current;
    prevForceOpen.current = Boolean(forceOpen);
    if (!prev && forceOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing deep-link prop into local state
      setOpen(true);
      setHasOpened(true);
      onOpenChange?.(true);
    }
  }, [forceOpen, onOpenChange]);

  const handleToggle = useCallback(() => {
    const next = !open;
    if (next && !hasOpened) {
      setHasOpened(true);
    }
    setOpen(next);
    onOpenChange?.(next);
  }, [open, hasOpened, onOpenChange]);

  // i18n with inline EN fallbacks (D19 pattern).
  const title = t("advancedCompressionTitle") || "Compression Preview";
  const subtitle =
    t("advancedCompressionSubtitle") || "Estime economia de tokens em diferentes modos.";

  return (
    <div
      className="rounded-lg border border-black/5 dark:border-white/5 bg-surface w-full"
      data-testid="compression-accordion"
    >
      {/* Header row — matches Collapsible visual style */}
      <div
        className={cn(
          "flex items-center gap-3 p-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors",
          open && "border-b border-black/5 dark:border-white/5",
        )}
      >
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={open}
          aria-controls="compression-preview-content"
          className="flex items-center gap-3 flex-1 min-w-0 text-left -m-1 p-1 rounded"
        >
          <span
            className="material-symbols-outlined text-text-muted text-[20px] shrink-0"
            aria-hidden="true"
          >
            {open ? "expand_more" : "chevron_right"}
          </span>
          <span
            className="material-symbols-outlined text-text-muted text-[18px] shrink-0"
            aria-hidden="true"
          >
            compress
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-text-main truncate">{title}</div>
            <div className="text-xs text-text-muted truncate">{subtitle}</div>
          </div>
        </button>
      </div>

      {/* Content — D7 lazy-render */}
      {open && (
        <div id="compression-preview-content" className="p-4">
          {/* hasOpened is set to true before we set open=true, so this is always true when open */}
          {hasOpened && <CompressionPreviewContent inputContent={inputContent} />}
        </div>
      )}
    </div>
  );
}
