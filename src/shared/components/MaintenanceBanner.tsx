"use client";

/**
 * Maintenance Banner — Phase 8.4
 *
 * Shows a warning banner at the top of the dashboard when the server
 * is restarting or in maintenance mode. Auto-dismisses when the server
 * comes back online.
 */

import { useState, useEffect } from "react";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function MaintenanceBanner() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const consecutiveFailuresRef = useRef(0);
  const dismissedUntilRecoveryRef = useRef(false);
  const t = useTranslations("common");

  useEffect(() => {
    const checkHealth = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort("Health check timeout"), 8000);
      try {
        const res = await fetch("/api/monitoring/health", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (res.ok) {
          consecutiveFailuresRef.current = 0;
          dismissedUntilRecoveryRef.current = false;
          setShow(false);
          setMessage("");
        } else {
          consecutiveFailuresRef.current += 1;
          // Require at least 2 failed checks to avoid transient false positives.
          if (consecutiveFailuresRef.current >= 2 && !dismissedUntilRecoveryRef.current) {
            setShow(true);
            setMessage(t("maintenanceServerIssues"));
          }
        }
      } catch {
        consecutiveFailuresRef.current += 1;
        if (consecutiveFailuresRef.current >= 2 && !dismissedUntilRecoveryRef.current) {
          setShow(true);
          setMessage(t("maintenanceServerUnreachable"));
        }
      } finally {
        clearTimeout(timeoutId);
      }
    };

    // Run immediately on mount, then every 10 seconds
    checkHealth();
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, [t]);

  if (!show) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 flex items-center justify-between gap-3 animate-in slide-in-from-top">
      <div className="flex items-center gap-2.5">
        <span className="material-symbols-outlined text-amber-500 text-[18px] animate-pulse">
          warning
        </span>
        <span className="text-sm text-amber-200">{message}</span>
      </div>
      <button
        onClick={() => {
          dismissedUntilRecoveryRef.current = true;
          setShow(false);
        }}
        className="p-1 rounded hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
        aria-label={t("close")}
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
}
