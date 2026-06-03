"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Props {
  expiresAt: number | null; // unix seconds
  variant?: "default" | "compact";
}

function formatRemaining(secondsFromNow: number): string {
  if (secondsFromNow <= 0) return "0s";
  if (secondsFromNow < 60) return `${secondsFromNow}s`;
  const m = Math.floor(secondsFromNow / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ${m % 60}m`;
  return `${Math.floor(h / 24)}d`;
}

export default function ExpirationBadge({ expiresAt, variant = "default" }: Props) {
  const t = useTranslations("common");
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));
  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 60_000);
    return () => clearInterval(id);
  }, []);
  if (!expiresAt) return null;
  const remaining = expiresAt - now;
  if (remaining <= 0) {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium border bg-gray-500/15 text-gray-400 border-gray-500/25">
        {t("expirationBadgeExpired")}
      </span>
    );
  }
  // D11 tiers: <1h critical (red) · <6h warning (yellow) · else normal (green).
  // Plan specifies "<24h normal" — in practice batches always expire ≤24h (OpenAI window),
  // so "else" maps to that case. If a provider (e.g. Gemini 48h) yields remaining >24h,
  // we still render normal — graceful, no separate tier needed.
  let tone = "bg-emerald-500/15 text-emerald-400 border-emerald-500/25";
  let label = t("expirationBadgeNormal");
  if (remaining < 3600) {
    tone = "bg-red-500/15 text-red-400 border-red-500/25";
    label = t("expirationBadgeCritical");
  } else if (remaining < 6 * 3600) {
    tone = "bg-yellow-500/15 text-yellow-400 border-yellow-500/25";
    label = t("expirationBadgeWarning");
  }
  const display = formatRemaining(remaining);
  if (variant === "compact") {
    return (
      <span
        className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-medium border ${tone}`}
        title={label}
      >
        {/* P3 — sr-only label so screen-readers + colorblind users get the urgency
            tier (Critical/Soon/Pending) and aren't forced to rely on color alone. */}
        <span className="sr-only">{label}: </span>
        {display}
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium border ${tone}`}
    >
      <span className="material-symbols-outlined text-[12px]">schedule</span>
      <span className="sr-only">{label}: </span>
      {display}
    </span>
  );
}
