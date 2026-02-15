"use client";

import { useState, useEffect } from "react";
import {
  TYPE_COLORS,
  LEVEL_COLORS,
  PROVIDER_COLORS,
  getProxyStatusStyle as getStatusStyle,
} from "@/shared/constants/colors";
import { formatDuration as formatLatency } from "@/shared/utils/formatting";

/**
 * Proxy log detail modal — shows full proxy event metadata, error info, and config.
 * Extracted from ProxyLogger.js for maintainability.
 */
export default function ProxyLogDetail({ log, onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const statusStyle = getStatusStyle(log.status);
  const typeColor = TYPE_COLORS[log.proxy?.type] || {
    bg: "#6B7280",
    text: "#fff",
    label: log.proxy?.type || "-",
  };
  const levelColor = LEVEL_COLORS[log.level] || LEVEL_COLORS.direct;
  const providerColor = PROVIDER_COLORS[log.provider] || {
    bg: "#374151",
    text: "#fff",
    label: (log.provider || "-").toUpperCase(),
  };

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return (
        d.toLocaleDateString("pt-BR") + ", " + d.toLocaleTimeString("en-US", { hour12: false })
      );
    } catch {
      return iso;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[5vh]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Proxy log detail"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-bg-primary border border-border rounded-xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-bg-primary/95 backdrop-blur-sm rounded-t-xl">
          <div className="flex items-center gap-3">
            <span
              className="inline-block px-2.5 py-1 rounded text-xs font-bold uppercase"
              style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
            >
              {log.status}
            </span>
            <span className="font-bold text-lg">Proxy Event</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
            aria-label="Close proxy detail modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-bg-subtle rounded-xl border border-border">
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Time</div>
              <div className="text-sm font-medium">{formatDate(log.timestamp)}</div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                Latency
              </div>
              <div className="text-sm font-medium">{formatLatency(log.latencyMs)}</div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                Public IP
              </div>
              <div className="text-sm font-medium font-mono text-emerald-400">
                {log.publicIp || "—"}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Proxy</div>
              <div className="text-sm font-medium font-mono text-primary">
                {log.proxy ? `${log.proxy.type}://${log.proxy.host}:${log.proxy.port}` : "Direct"}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Type</div>
              <span
                className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
                style={{ backgroundColor: typeColor.bg, color: typeColor.text }}
              >
                {typeColor.label}
              </span>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Level</div>
              <span
                className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
                style={{ backgroundColor: levelColor.bg, color: levelColor.text }}
              >
                {levelColor.label}
              </span>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                Provider
              </div>
              {log.provider ? (
                <span
                  className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
                  style={{ backgroundColor: providerColor.bg, color: providerColor.text }}
                >
                  {providerColor.label}
                </span>
              ) : (
                <div className="text-sm text-text-muted">—</div>
              )}
            </div>
            <div className="col-span-2">
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                Target URL
              </div>
              <div className="text-sm font-medium font-mono text-text-muted break-all">
                {log.targetUrl || "—"}
              </div>
            </div>
          </div>

          {/* Error */}
          {log.error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="text-[10px] text-red-400 uppercase tracking-wider mb-1 font-bold">
                Error
              </div>
              <div className="text-sm text-red-300 font-mono">{log.error}</div>
            </div>
          )}

          {/* Proxy Config Details */}
          {log.proxy && (
            <div className="p-4 rounded-xl bg-bg-subtle border border-border">
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-2 font-bold">
                Proxy Configuration
              </div>
              <pre className="text-xs font-mono text-text-primary bg-black/20 rounded-lg p-3 overflow-x-auto">
                {JSON.stringify(log.proxy, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
