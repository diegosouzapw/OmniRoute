"use client";

/**
 * Maintenance Banner — Phase 8.4
 *
 * Shows a warning banner at the top of the dashboard when the server
 * is restarting or in maintenance mode. Auto-dismisses when the server
 * comes back online.
 */

import { useState, useEffect, useCallback } from "react";

export default function MaintenanceBanner() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const checkHealth = useCallback(async () => {
    try {
      const res = await fetch("/api/monitoring/health", {
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        // Server is healthy — hide banner if shown
        if (show) {
          setShow(false);
          setMessage("");
        }
      } else {
        setShow(true);
        setMessage("Server is experiencing issues. Some features may be unavailable.");
      }
    } catch {
      setShow(true);
      setMessage("Server is unreachable. Reconnecting...");
    }
  }, [show]);

  useEffect(() => {
    // Check health every 10 seconds
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, [checkHealth]);

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
        onClick={() => setShow(false)}
        className="p-1 rounded hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
        aria-label="Dismiss"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
}
