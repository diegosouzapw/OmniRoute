"use client";

/**
 * CloudSyncStatus — Compact sync status indicator for the sidebar
 *
 * Shows cloud sync connection state with a small icon + label.
 * Fetches status from /api/sync/cloud periodically.
 *
 * @module shared/components/CloudSyncStatus
 */

import { useState, useEffect, useRef } from "react";

const STATUS_CONFIG = {
  connected: { icon: "cloud_done", color: "text-green-500", label: "Synced" },
  syncing: { icon: "cloud_sync", color: "text-blue-400 animate-pulse", label: "Syncing..." },
  disconnected: { icon: "cloud_off", color: "text-text-muted", label: "Offline" },
  error: { icon: "cloud_off", color: "text-red-400", label: "Error" },
  disabled: { icon: "cloud_off", color: "text-text-muted/50", label: "Disabled" },
};

export default function CloudSyncStatus({ collapsed = false }) {
  const [status, setStatus] = useState("disabled");
  const [lastSync, setLastSync] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    async function poll() {
      try {
        const res = await fetch("/api/sync/cloud");
        if (!mountedRef.current) return;
        if (!res.ok) {
          setStatus("disconnected");
          return;
        }
        const data = await res.json();
        if (!mountedRef.current) return;

        if (!data.enabled) setStatus("disabled");
        else if (data.syncing) setStatus("syncing");
        else if (data.connected || data.lastSync) {
          setStatus("connected");
          if (data.lastSync) setLastSync(new Date(data.lastSync));
        } else setStatus("disconnected");
      } catch {
        if (mountedRef.current) setStatus("disconnected");
      }
    }

    poll();
    const interval = setInterval(poll, 30000);
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);

  // Don't render if cloud sync is disabled
  if (status === "disabled") return null;

  const config = STATUS_CONFIG[status];

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg hover:bg-white/5 transition-colors cursor-default"
      title={lastSync ? `Last sync: ${lastSync.toLocaleTimeString()}` : config.label}
      aria-label={`Cloud sync status: ${config.label}`}
    >
      <span className={`material-symbols-outlined text-[16px] ${config.color}`} aria-hidden="true">
        {config.icon}
      </span>
      {!collapsed && <span className="text-text-muted truncate">{config.label}</span>}
    </div>
  );
}
