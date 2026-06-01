"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";

export interface RiskNoticeModalProps {
  open: boolean;
  title: string;
  body: string;
  dontShowAgainKey: string;
  onAccept: () => void;
  onCancel: () => void;
}

/**
 * Generic risk notice modal (D16).
 * Persists "don't show again" preference to localStorage using `dontShowAgainKey`.
 */
export function RiskNoticeModal({
  open,
  title,
  body,
  dontShowAgainKey,
  onAccept,
  onCancel,
}: RiskNoticeModalProps) {
  const t = useTranslations("common");

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  const handleAccept = () => {
    try {
      localStorage.setItem(dontShowAgainKey, "true");
    } catch {
      // ignore storage errors
    }
    onAccept();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="risk-modal-title"
    >
      <div className="w-full max-w-md rounded-xl border border-amber-500/30 bg-card p-6 shadow-xl">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
            <span className="material-symbols-outlined text-[20px]">warning</span>
          </div>
          <h2 id="risk-modal-title" className="text-base font-semibold text-text-main pt-1">
            {title}
          </h2>
        </div>

        <p className="text-sm text-text-muted mb-6 leading-relaxed">{body}</p>

        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={onCancel}>
            {t("cancel") || "Cancel"}
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            <span className="material-symbols-outlined text-[14px] mr-1">check</span>
            {t("understand") || "I understand"}
          </Button>
        </div>
      </div>
    </div>
  );
}
