"use client";

/**
 * CloudSyncStatus — Compact sync status indicator for the sidebar
 *
 * Shows cloud sync connection state with a small icon + label.
 * Fetches status from /api/sync/cloud periodically.
 * Listens for 'cloud-status-changed' events to re-poll immediately.
 *
 * @module shared/components/CloudSyncStatus
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const STATUS_CONFIG = {
  connected: { icon: "cloud_done", color: "text-green-500", label: "Cloud" },
  syncing: { icon: "cloud_sync", color: "text-blue-400 animate-pulse", label: "Syncing..." },
  disconnected: { icon: "cloud_off", color: "text-amber-500", label: "Cloud Off" },
  error: { icon: "cloud_off", color: "text-red-400", label: "Cloud Error" },
  disabled: { icon: "cloud_off", color: "text-text-muted/50", label: "Disabled" },
};

export default function CloudSyncStatus({ collapsed = false }) {
  const [status, setStatus] = useState("disabled");
  const [lastSync, setLastSync] = useState(null);
  const mountedRef = useRef(true);
  const router = useRouter();

  const poll = useCallback(async () => {
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
      else if (data.connected) {
        setStatus("connected");
        if (data.lastSync) setLastSync(new Date(data.lastSync));
      } else setStatus("disconnected");
    } catch {
      if (mountedRef.current) setStatus("disconnected");
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    // Schedule initial poll outside of effect body to avoid setState-in-effect lint
    queueMicrotask(poll);
    const interval = setInterval(poll, 30000);

    // Listen for immediate re-poll events from EndpointPageClient
    const handleCloudChange = () => {
      setTimeout(poll, 500); // Small delay to let backend settle
    };
    globalThis.addEventListener("cloud-status-changed", handleCloudChange);

    return () => {
      mountedRef.current = false;
      clearInterval(interval);
      globalThis.removeEventListener("cloud-status-changed", handleCloudChange);
    };
  }, [poll]);

  // Don't render if cloud sync is disabled
  if (status === "disabled") return null;

  const config = STATUS_CONFIG[status];

  return (
    <button
      onClick={() => router.push("/dashboard/endpoint")}
      className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg hover:bg-white/5 transition-colors cursor-pointer w-full"
      title={
        lastSync
          ? `Cloud ${status === "connected" ? "connected" : "disconnected"} — Last sync: ${lastSync.toLocaleTimeString()}`
          : config.label
      }
      aria-label={`Cloud sync status: ${config.label}`}
    >
      <span className={`material-symbols-outlined text-[16px] ${config.color}`} aria-hidden="true">
        {config.icon}
      </span>
      {!collapsed && (
        <span
          className={`truncate ${status === "connected" ? "text-green-500" : "text-text-muted"}`}
        >
          {config.label}
        </span>
      )}
    </button>
  );
}
