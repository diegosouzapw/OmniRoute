"use client";

/**
 * ModelStatusBadge — compact single-model status indicator
 *
 * Shows a small badge with status icon (cooldown/unavailable/error)
 * with a tooltip containing additional details like remaining cooldown time
 * or last error message.
 * Only renders for non-available models to keep the UI clean.
 *
 * Uses shared polling via ModelStatusContext to avoid redundant API calls.
 */

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Tooltip from "@/shared/components/Tooltip";
import { useModelStatus } from "./ModelStatusContext";

interface ModelStatusBadgeProps {
  provider: string;
  model: string;
  size?: "sm" | "md";
  className?: string;
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
  const status = useModelStatus(provider, model);

  // Store the latest remaining time calculated by the interval
  const [displayRemainingMs, setDisplayRemainingMs] = useState<number | null>(null);

  // Use ref to track server-provided initial cooldown duration for countdown calculation
  const initialCooldownMsRef = useRef<number | null>(null);
  // Track when we started counting down
  const countdownStartRef = useRef<number | null>(null);

  // Set up countdown timer when cooldown begins
  useEffect(() => {
    if (status?.status !== "cooldown" || !status.remainingMs) {
      // Reset refs when not in cooldown (no setState here)
      initialCooldownMsRef.current = null;
      countdownStartRef.current = null;
      return;
    }

    // Initialize timing refs (no setState here)
    initialCooldownMsRef.current = status.remainingMs;
    countdownStartRef.current = Date.now();

    // Update countdown every second via interval callback (setState allowed here)
    const interval = setInterval(() => {
      if (!initialCooldownMsRef.current || !countdownStartRef.current) {
        return;
      }

      const elapsed = Date.now() - countdownStartRef.current;
      const newRemaining = Math.max(0, initialCooldownMsRef.current - elapsed);

      setDisplayRemainingMs(newRemaining);

      // Stop updating when countdown reaches zero
      if (newRemaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [status?.status, status?.remainingMs]);

  // Derive the displayed remaining time: use countdown value if active, else use status value
  const remainingMs =
    status?.status === "cooldown" ? (displayRemainingMs ?? status.remainingMs ?? null) : null;

  // Don't render badge for available models (keep UI clean)
  if (!status || status.status === "available" || status.status === "unknown") {
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
