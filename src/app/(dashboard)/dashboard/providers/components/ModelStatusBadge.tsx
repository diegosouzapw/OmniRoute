"use client";

/**
 * ModelStatusBadge — compact single-model status indicator
 *
 * Shows a small badge with status icon (cooldown/unavailable/error)
 * with a tooltip containing additional details like remaining cooldown time
 * or last error message.
 * Only renders for non-available models to keep the UI clean.
 */

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Tooltip from "@/shared/components/Tooltip";

interface ModelStatusBadgeProps {
  provider: string;
  model: string;
  size?: "sm" | "md";
  className?: string;
}

interface ModelStatus {
  status: "available" | "cooldown" | "unavailable" | "error" | "unknown";
  reason?: string;
  remainingMs?: number;
  lastError?: string;
}

function formatRemainingTime(ms: number): string {
  if (ms <= 0) return "";
  const seconds = Math.ceil(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) {
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export default function ModelStatusBadge({
  provider,
  model,
  size = "sm",
  className = "",
}: ModelStatusBadgeProps) {
  const t = useTranslations("providers");
  const [status, setStatus] = useState<ModelStatus>({ status: "unknown" });
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  // Use ref for badge start time to avoid triggering re-renders
  const badgeStartMsRef = useRef<number | null>(null);
  const cooldownMsRef = useRef<number | null>(null);

  // Poll status every 15 seconds
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/models/availability");
        if (res.ok) {
          const json = await res.json();
          const models = json?.models || [];
          const modelEntry = models.find(
            (m: any) =>
              m.provider === provider &&
              (m.model === model || m.model?.includes(model) || model.includes(m.model))
          );
          if (modelEntry) {
            const newStatus: ModelStatus = {
              status: modelEntry.status || "unknown",
              reason: modelEntry.reason,
              remainingMs: modelEntry.remainingMs,
              lastError: modelEntry.lastError,
            };
            setStatus(newStatus);
            if (modelEntry.status === "cooldown" && modelEntry.remainingMs) {
              badgeStartMsRef.current = Date.now();
              cooldownMsRef.current = modelEntry.remainingMs;
              setRemainingMs(modelEntry.remainingMs);
            } else {
              badgeStartMsRef.current = null;
              cooldownMsRef.current = null;
              setRemainingMs(null);
            }
          } else {
            setStatus({ status: "available" });
            setRemainingMs(null);
          }
        }
      } catch {
        setStatus({ status: "unknown" });
        setRemainingMs(null);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, [provider, model]);

  // Update remaining time every second for countdown using refs
  useEffect(() => {
    if (status.status !== "cooldown" || !cooldownMsRef.current || !badgeStartMsRef.current) {
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - (badgeStartMsRef.current || Date.now());
      const totalRemaining = cooldownMsRef.current || 0;
      const newRemaining = totalRemaining - elapsed;
      if (newRemaining <= 0) {
        setRemainingMs(0);
      } else {
        setRemainingMs(newRemaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [status.status]);

  // Don't render badge for available models (keep UI clean)
  if (status.status === "available" || status.status === "unknown") {
    return null;
  }

  const getStatusColor = () => {
    switch (status.status) {
      case "cooldown":
        return "#f59e0b";
      case "unavailable":
      case "error":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusIcon = () => {
    switch (status.status) {
      case "cooldown":
        return "schedule";
      case "unavailable":
      case "error":
        return "error";
      default:
        return "help";
    }
  };

  const getTooltipText = () => {
    switch (status.status) {
      case "cooldown": {
        const remaining = remainingMs !== null ? formatRemainingTime(remainingMs) : "";
        const reason = status.reason ? ` (${status.reason})` : "";
        const remainingText = remaining ? ` - ${remaining}` : "";
        return `${t("cooldown")}${reason}${remainingText}`;
      }
      case "unavailable":
        return `${t("unavailable")}${status.reason ? `: ${status.reason}` : ""}`;
      case "error":
        return `${t("error")}${status.lastError ? `: ${status.lastError}` : ""}`;
      default:
        return "";
    }
  };

  const color = getStatusColor();
  const sizeClasses = size === "sm" ? "px-1.5 py-0.5" : "px-2 py-1";
  const iconSize = size === "sm" ? "text-[12px]" : "text-[14px]";

  return (
    <Tooltip content={getTooltipText()} position="top" delayMs={200}>
      <span
        className={`inline-flex items-center gap-1 rounded-full text-[10px] font-semibold ${sizeClasses} ${className}`}
        style={{
          backgroundColor: `${color}15`,
          color: color,
        }}
      >
        <span className={`material-symbols-outlined ${iconSize}`} aria-hidden="true">
          {getStatusIcon()}
        </span>
        {status.status === "cooldown" && remainingMs !== null && (
          <span>{formatRemainingTime(remainingMs)}</span>
        )}
      </span>
    </Tooltip>
  );
}
