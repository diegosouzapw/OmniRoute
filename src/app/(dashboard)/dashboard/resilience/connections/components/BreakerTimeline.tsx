"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";
import type { BreakerWithHistory } from "@/types/resilience";

interface BreakerTimelineProps {
  breakers: BreakerWithHistory[];
  onWindowChange: (ms: number) => void;
}

const WINDOWS = [
  { label: "1h", ms: 3600000 },
  { label: "6h", ms: 21600000 },
  { label: "24h", ms: 86400000 },
] as const;

export default function BreakerTimeline({ breakers, onWindowChange }: BreakerTimelineProps) {
  const t = useTranslations("resilienceConnections");
  const [selectedWindowMs, setSelectedWindowMs] = useState(3600000);

  const stateLabel = (state: string) => {
    const key = `timeline.state.${state.toLowerCase()}`;
    const label = t(key);
    return label === key ? state : label; // Fallback for unknown states
  };
  const reasonLabel = (reason?: string) => {
    if (!reason) return "";
    // Map known reasons; use prefix matching for parameterized reasons (e.g., "probe-failed (cycle 3)")
    const knownReasons = [
      "timeout-elapsed",
      "success-recovery",
      "manual-reset",
      "probe-success",
      "recovery",
      "probe-failed",
    ];
    const matched = knownReasons.find((r) => reason.startsWith(r));
    if (matched) {
      return t(`timeline.reason.${matched}`);
    }
    return reason; // Fallback: display raw reason string
  };

  // API already filters transitionHistory by windowMs; no client-side re-filter needed
  const filtered = breakers.filter((b) => b.transitionHistory.length > 0);
  // Current state: breakers that are OPEN/HALF_OPEN/DEGRADED even with no window transitions
  const currentBreakers = breakers.filter(
    (b) => b.state === "OPEN" || b.state === "HALF_OPEN" || b.state === "DEGRADED"
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {currentBreakers.length > 0 && (
        <div>
          <h3>{t("timeline.currentState")}</h3>
          {currentBreakers.map((b) => (
            <span key={b.name} style={{ display: "inline-block", marginRight: "8px" }}>
              <Badge
                variant={
                  b.state === "OPEN"
                    ? "error"
                    : b.state === "HALF_OPEN" || b.state === "DEGRADED"
                      ? "warning"
                      : "success"
                }
                size="sm"
              >
                {b.name} ({b.state})
              </Badge>
            </span>
          ))}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontWeight: 600 }}>{t("timeline.window")}</span>
        {WINDOWS.map((w) => (
          <button
            key={w.ms}
            type="button"
            onClick={() => {
              setSelectedWindowMs(w.ms);
              onWindowChange(w.ms);
            }}
            style={{ fontWeight: selectedWindowMs === w.ms ? 700 : 400 }}
          >
            {t(`timeline.window${w.label}`)}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p style={{ color: "var(--color-text-muted)" }}>{t("timeline.empty")}</p>
      ) : (
        filtered.map((b) => (
          <div key={b.name}>
            <Badge
              variant={
                b.state === "OPEN"
                  ? "error"
                  : b.state === "HALF_OPEN"
                    ? "warning"
                    : b.state === "DEGRADED"
                      ? "warning"
                      : "success"
              }
              size="sm"
            >
              {b.name} ({stateLabel(b.state)})
            </Badge>
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              {b.transitionHistory.map((tr, i) => (
                <li key={`${tr.timestamp}-${tr.from}-${tr.to}-${i}`}>
                  {new Date(tr.timestamp).toLocaleString()}: {stateLabel(tr.from)} {"->"}{" "}
                  {stateLabel(tr.to)}
                  {tr.reason ? ` (${reasonLabel(tr.reason)})` : ""}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
