"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

interface CustomRangePickerProps {
  start: string;
  end: string;
  onApply: (start: string, end: string) => void;
  onClose: () => void;
}

function toLocalDatetime(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromLocalDatetime(local: string): string {
  if (!local) return "";
  return new Date(local).toISOString();
}

function getPresetRange(preset: string): { start: string; end: string } {
  const now = new Date();
  const end = toLocalDatetime(now.toISOString());
  const s = new Date(now);

  switch (preset) {
    case "today":
      s.setHours(0, 0, 0, 0);
      break;
    case "yesterday": {
      s.setDate(s.getDate() - 1);
      s.setHours(0, 0, 0, 0);
      const e = new Date(s);
      e.setHours(23, 59, 59, 999);
      return { start: toLocalDatetime(s.toISOString()), end: toLocalDatetime(e.toISOString()) };
    }
    case "thisWeek":
      s.setDate(s.getDate() - s.getDay());
      s.setHours(0, 0, 0, 0);
      break;
    case "thisMonth":
      s.setDate(1);
      s.setHours(0, 0, 0, 0);
      break;
    case "last3d":
      s.setDate(s.getDate() - 3);
      break;
    case "last14d":
      s.setDate(s.getDate() - 14);
      break;
    default:
      s.setDate(s.getDate() - 7);
  }

  return { start: toLocalDatetime(s.toISOString()), end };
}

export default function CustomRangePicker({
  start,
  end,
  onApply,
  onClose,
}: CustomRangePickerProps) {
  const t = useTranslations("analytics");
  const [localStart, setLocalStart] = useState(toLocalDatetime(start) || "");
  const [localEnd, setLocalEnd] = useState(toLocalDatetime(end) || "");
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleApply = useCallback(() => {
    if (localStart && localEnd) {
      onApply(fromLocalDatetime(localStart), fromLocalDatetime(localEnd));
    }
  }, [localStart, localEnd, onApply]);

  const handlePreset = useCallback((preset: string) => {
    const { start: s, end: e } = getPresetRange(preset);
    setLocalStart(s);
    setLocalEnd(e);
  }, []);

  const isValid = localStart && localEnd && new Date(localStart) <= new Date(localEnd);

  const presets = [
    { key: "today", label: t("rangeToday") },
    { key: "yesterday", label: t("rangeYesterday") },
    { key: "last3d", label: t("rangeLast3Days") },
    { key: "thisWeek", label: t("rangeThisWeek") },
    { key: "last14d", label: t("rangeLast14Days") },
    { key: "thisMonth", label: t("rangeThisMonth") },
  ];

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full z-50 mt-2 w-[340px] rounded-xl border border-border/50 bg-surface p-4 shadow-xl"
      style={{ backdropFilter: "blur(16px)" }}
    >
      {/* Quick presets */}
      <div className="mb-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">
          {t("rangeQuickSelect")}
        </p>
        <div className="flex flex-wrap gap-1">
          {presets.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => handlePreset(p.key)}
              className="rounded-md border border-border/30 bg-black/[0.03] px-2.5 py-1 text-[11px] font-medium text-text-muted transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/30 dark:bg-white/[0.03]"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border/30 mb-3" />

      {/* Date inputs */}
      <div className="flex flex-col gap-2.5">
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1 block">
            {t("rangeStart")}
          </label>
          <input
            type="datetime-local"
            value={localStart}
            onChange={(e) => setLocalStart(e.target.value)}
            className="w-full rounded-lg border border-border/50 bg-black/[0.04] px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary dark:bg-white/[0.04]"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1 block">
            {t("rangeEnd")}
          </label>
          <input
            type="datetime-local"
            value={localEnd}
            onChange={(e) => setLocalEnd(e.target.value)}
            className="w-full rounded-lg border border-border/50 bg-black/[0.04] px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary dark:bg-white/[0.04]"
          />
        </div>
      </div>

      {/* Validation hint */}
      {localStart && localEnd && !isValid && (
        <p className="mt-1.5 text-[11px] text-error">{t("rangeErrorInvalid")}</p>
      )}

      {/* Actions */}
      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-text-muted hover:text-text-main transition-colors"
        >
          {t("rangeCancel")}
        </button>
        <button
          type="button"
          disabled={!isValid}
          onClick={handleApply}
          className="rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t("rangeApply")}
        </button>
      </div>
    </div>
  );
}
