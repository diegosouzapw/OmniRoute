"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

interface HistoryEntry {
  query: string;
  provider: string;
  timestamp: string;
  filters: Record<string, any>;
}

interface SearchHistoryProps {
  onReplay: (entry: HistoryEntry) => void;
}

function timeAgo(timestamp: string, locale: string): string {
  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60_000);
    if (minutes < 1) return rtf.format(0, "minute");
    if (minutes < 60) return rtf.format(-minutes, "minute");
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return rtf.format(-hours, "hour");
    return rtf.format(-Math.floor(hours / 24), "day");
  } catch {
    return new Date(timestamp).toLocaleString(locale);
  }
}

export default function SearchHistory({ onReplay }: SearchHistoryProps) {
  const t = useTranslations("search");
  const locale = useLocale();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    fetch("/api/search/stats")
      .then((res) => res.json())
      .then((data) => setEntries(data.recent_searches || []))
      .catch(() => {});
  }, []);

  if (entries.length === 0) return null;

  return (
    <div className="p-4 flex-1">
      <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
        {t("searchHistory")}
      </span>
      <div className="mt-2 space-y-1.5">
        {entries.map((entry, i) => (
          <button
            key={`${entry.timestamp}:${entry.provider}:${entry.query}`}
            onClick={() => onReplay(entry)}
            className="w-full text-left p-2 bg-surface border border-border rounded-lg hover:border-primary/30 transition-colors"
          >
            <div className="text-xs text-text-main truncate">{entry.query}</div>
            <div className="flex justify-between mt-0.5">
              <span className="text-[10px] text-text-muted">{entry.provider}</span>
              <span className="text-[10px] text-text-muted">
                {timeAgo(entry.timestamp, locale)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
