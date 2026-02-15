"use client";

import { useState, useEffect } from "react";
import {
  PROTOCOL_COLORS,
  PROVIDER_COLORS,
  getHttpStatusStyle as getStatusStyle,
} from "@/shared/constants/colors";
import { formatDuration, formatApiKeyLabel } from "@/shared/utils/formatting";

// ─── Payload Code Block ─────────────────────────────────────────────────────

function PayloadSection({ title, json, onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await onCopy();
    if (success !== false) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[11px] text-text-muted uppercase tracking-wider font-bold">{title}</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs text-text-muted hover:text-text-primary transition-colors"
          aria-label={`Copy ${title}`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {copied ? "check" : "content_copy"}
          </span>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 rounded-xl bg-black/30 border border-border overflow-x-auto text-xs font-mono text-text-primary max-h-[600px] overflow-y-auto leading-relaxed whitespace-pre-wrap break-words">
        {json}
      </pre>
    </div>
  );
}

// ─── Detail Modal ───────────────────────────────────────────────────────────

export default function RequestLoggerDetail({ log, detail, loading, onClose, onCopy }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const statusStyle = getStatusStyle(log.status);
  const protocolKey = log.sourceFormat || log.provider;
  const protocol = PROTOCOL_COLORS[protocolKey] ||
    PROTOCOL_COLORS[log.provider] || {
      bg: "#6B7280",
      text: "#fff",
      label: (protocolKey || log.provider || "-").toUpperCase(),
    };
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

  const requestJson = detail?.requestBody ? JSON.stringify(detail.requestBody, null, 2) : null;
  const responseJson = detail?.responseBody ? JSON.stringify(detail.responseBody, null, 2) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[5vh]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Request log detail"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-bg-primary border border-border rounded-xl w-full max-w-[900px] max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-bg-primary/95 backdrop-blur-sm rounded-t-xl">
          <div className="flex items-center gap-3">
            <span
              className="inline-block px-2.5 py-1 rounded text-xs font-bold"
              style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
            >
              {log.status}
            </span>
            <span className="font-bold text-lg">{log.method}</span>
            <span className="text-text-muted font-mono text-sm">{log.path}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
            aria-label="Close detail modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-bg-subtle rounded-xl border border-border">
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Time</div>
              <div className="text-sm font-medium">{formatDate(log.timestamp)}</div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                Duration
              </div>
              <div className="text-sm font-medium">{formatDuration(log.duration)}</div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                Tokens (I/O)
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold">
                  In: {(detail?.tokens?.in || log.tokens?.in || 0).toLocaleString()}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                  Out: {(detail?.tokens?.out || log.tokens?.out || 0).toLocaleString()}
                </span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Model</div>
              <div className="text-sm font-medium text-primary font-mono">{log.model}</div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                Provider
              </div>
              <span
                className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
                style={{ backgroundColor: providerColor.bg, color: providerColor.text }}
              >
                {providerColor.label}
              </span>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                Protocol
              </div>
              <span
                className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
                style={{ backgroundColor: protocol.bg, color: protocol.text }}
              >
                {protocol.label}
              </span>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                Account
              </div>
              <div className="text-sm font-medium">{detail?.account || log.account || "-"}</div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                API Key
              </div>
              <div
                className="text-sm font-medium"
                title={
                  detail?.apiKeyName ||
                  detail?.apiKeyId ||
                  log.apiKeyName ||
                  log.apiKeyId ||
                  "No API key"
                }
              >
                {formatApiKeyLabel(
                  detail?.apiKeyName || log.apiKeyName,
                  detail?.apiKeyId || log.apiKeyId
                )}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Combo</div>
              {detail?.comboName || log.comboName ? (
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {detail?.comboName || log.comboName}
                </span>
              ) : (
                <div className="text-sm text-text-muted">—</div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {(detail?.error || log.error) && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="text-[10px] text-red-400 uppercase tracking-wider mb-1 font-bold">
                Error
              </div>
              <div className="text-sm text-red-300 font-mono">{detail?.error || log.error}</div>
            </div>
          )}

          {loading ? (
            <div className="p-8 text-center text-text-muted animate-pulse">
              Loading request details...
            </div>
          ) : (
            <>
              {/* Request Payload */}
              {requestJson && (
                <PayloadSection
                  title="Request Payload"
                  json={requestJson}
                  onCopy={() => onCopy(requestJson)}
                />
              )}

              {/* Response Payload */}
              {responseJson && (
                <PayloadSection
                  title="Response Payload"
                  json={responseJson}
                  onCopy={() => onCopy(responseJson)}
                />
              )}

              {!requestJson && !responseJson && !loading && (
                <div className="p-6 text-center text-text-muted">
                  <span className="material-symbols-outlined text-[32px] mb-2 block opacity-40">
                    info
                  </span>
                  <p className="text-sm">No payload data available for this log entry.</p>
                  <p className="text-xs mt-1">
                    Request/response bodies are only captured for non-streaming calls or when
                    streaming completes normally.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
