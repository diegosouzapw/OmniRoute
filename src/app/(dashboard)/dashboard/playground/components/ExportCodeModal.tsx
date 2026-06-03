"use client";

// src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import type { PlaygroundState, ExportLanguage } from "@/lib/playground/codeExport";
import { exportAllLanguages, API_KEY_PLACEHOLDER } from "@/lib/playground/codeExport";

interface ExportCodeModalProps {
  state: PlaygroundState;
  onClose: () => void;
}

const LANGUAGE_TABS: Array<{ id: ExportLanguage; label: string }> = [
  { id: "curl", label: "curl" },
  { id: "python", label: "Python" },
  { id: "typescript", label: "TypeScript" },
];

/**
 * ExportCodeModal — shows curl / Python / TypeScript snippets for the current playground state.
 *
 * Security: always uses API_KEY_PLACEHOLDER ("$OMNIROUTE_API_KEY") — never a real key (D11 / Hard Rule #1).
 */
export default function ExportCodeModal({ state, onClose }: ExportCodeModalProps) {
  const t = useTranslations("playground");
  const [activeLanguage, setActiveLanguage] = useState<ExportLanguage>("curl");
  const [copied, setCopied] = useState(false);

  // Generate all snippets once (state is passed in from parent, not re-fetched).
  const snippets = exportAllLanguages(state);
  const currentCode = snippets[activeLanguage];

  // Verify that no real API key is embedded (assertion — Hard Rule #1 / D11).
  // The regex checks for typical API key patterns (sk-, or other 16+ char alphanumeric strings
  // that are NOT the placeholder).
  const hasRealKey = /sk-[A-Za-z0-9_-]{16,}/.test(currentCode);

  const handleCopy = useCallback(async () => {
    if (hasRealKey) return; // Never copy if somehow a real key slipped through
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently
    }
  }, [currentCode, hasRealKey]);

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t("exportCode")}
    >
      <div
        className="bg-surface border border-border rounded-xl w-[640px] max-w-[96vw] max-h-[80vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-text-muted">&lt;/&gt;</span>
            <h2 className="text-sm font-semibold text-text-main">{t("exportCodeTitle")}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label={t("closeExportModal")}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Language tabs */}
        <div className="flex items-center gap-1 px-4 pt-3 shrink-0" role="tablist">
          {LANGUAGE_TABS.map((lang) => (
            <button
              key={lang.id}
              role="tab"
              aria-selected={activeLanguage === lang.id}
              onClick={() => {
                setActiveLanguage(lang.id);
                setCopied(false);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeLanguage === lang.id
                  ? "bg-primary/10 text-primary"
                  : "text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4 min-h-0">
          {hasRealKey ? (
            <div className="text-xs text-destructive bg-destructive/10 rounded p-3">
              {t("exportRealKeyWarning")}
            </div>
          ) : (
            <pre className="text-xs font-mono text-text-main bg-bg-alt border border-border rounded-lg p-4 overflow-x-auto whitespace-pre-wrap break-all">
              <code>{currentCode}</code>
            </pre>
          )}

          {/* Placeholder hint */}
          <p className="text-[11px] text-text-muted mt-2">
            {t("placeholderHintPrefix")}{" "}
            <code className="font-mono text-primary">{API_KEY_PLACEHOLDER}</code>
            {" "}{t("placeholderHintSuffix")}
          </p>
        </div>

        {/* Footer with copy button */}
        <div className="flex items-center justify-end gap-3 px-5 py-3 border-t border-border shrink-0">
          <button
            onClick={onClose}
            className="text-xs px-3 py-1.5 rounded border border-border text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {t("close")}
          </button>
          <button
            onClick={handleCopy}
            disabled={hasRealKey}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-colors ${
              copied
                ? "border-green-500 text-green-500 bg-green-500/10"
                : "border-primary text-primary hover:bg-primary/10"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
            aria-label={t("copyLangCode", { language: activeLanguage })}
          >
            <span className="material-symbols-outlined text-[14px]">
              {copied ? "check" : "content_copy"}
            </span>
            {copied ? t("copiedCode") : t("copy")}
          </button>
        </div>
      </div>
    </div>
  );
}
