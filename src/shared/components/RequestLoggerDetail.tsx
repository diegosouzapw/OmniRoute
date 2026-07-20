"use client";

import { useState, useEffect, useRef } from "react";
import {
  PROVIDER_COLORS,
  getHttpStatusStyle as getStatusStyle,
  getProtocolColor,
} from "@/shared/constants/colors";
import { formatDuration, formatApiKeyLabel, maskAccount } from "@/shared/utils/formatting";
import { formatErrorForDisplay } from "@/shared/utils/formatting";

// ─── Payload Code Block ─────────────────────────────────────────────────────

function PayloadSection({ title, json, onCopy, collapsible = true, defaultOpen = true }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(defaultOpen);

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
        <div className="flex items-center gap-3">
          <h3 className="text-[11px] text-text-muted uppercase tracking-wider font-bold">
            {title}
          </h3>
          {collapsible && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="p-1 rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
              aria-label={open ? `Collapse ${title}` : `Expand ${title}`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {open ? "expand_less" : "expand_more"}
              </span>
            </button>
          )}
        </div>
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
      {open && (
        <pre className="p-4 rounded-xl bg-black/5 dark:bg-black/30 border border-border overflow-x-auto text-xs font-mono text-text-main max-h-150 overflow-y-auto leading-relaxed whitespace-pre-wrap break-words">
          {json}
        </pre>
      )}
    </div>
  );
}

// ─── Stream section + Detail Modal ───────────────────────────────────────────────────────────

function StreamSection({ title, json, onCopy }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(true);
  const [autoscroll, setAutoscroll] = useState(() => {
    try {
      const v = localStorage.getItem("pref:stream:autoscroll");
      return v == null ? true : v === "1";
    } catch {
      return true;
    }
  });
  const ref = useRef(null);

  const handleCopy = async () => {
    const success = await onCopy();
    if (success !== false) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (!autoscroll || !open) return;
    const el = ref.current;
    if (!el) return;
    // scroll on next animation frame to avoid layout thrash
    requestAnimationFrame(() => {
      try {
        el.scrollTop = el.scrollHeight;
      } catch {}
    });
  }, [json, autoscroll, open]);

  const toggleAutoscroll = () => {
    const next = !autoscroll;
    setAutoscroll(next);
    try {
      localStorage.setItem("pref:stream:autoscroll", next ? "1" : "0");
    } catch {}
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-[11px] text-text-muted uppercase tracking-wider font-bold">
            {title}
          </h3>
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-1 rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
            aria-label={open ? `Collapse ${title}` : `Expand ${title}`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {open ? "expand_less" : "expand_more"}
            </span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAutoscroll}
            title={autoscroll ? "Autoscroll: on" : "Autoscroll: off"}
            className={`p-1 rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors ${autoscroll ? "text-primary" : ""}`}
            aria-pressed={autoscroll}
          >
            <span className="material-symbols-outlined text-[18px]">vertical_align_bottom</span>
          </button>
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
      </div>
      {open && (
        <div
          ref={ref}
          className="p-4 rounded-xl bg-black/5 dark:bg-black/30 border border-border overflow-x-auto text-xs font-mono text-text-main max-h-150 overflow-y-auto leading-relaxed whitespace-pre-wrap break-words"
        >
          {json}
        </div>
      )}
    </div>
  );
}

// ─── Detail Modal ───────────────────────────────────────────────────────────

type StreamChunks = Record<string, string | string[]>;

function getCodexAccountRotation(detail) {
  const sources = [detail?.requestBody, detail?.responseBody];

  for (const source of sources) {
    const meta = source?._omniroute;
    const rotation = meta?.codexAccountRotation;
    if (
      rotation &&
      typeof rotation.initialConnectionId === "string" &&
      typeof rotation.finalConnectionId === "string" &&
      rotation.initialConnectionId !== rotation.finalConnectionId
    ) {
      return rotation;
    }
  }

  return null;
}

function formatConnectionId(value) {
  if (typeof value !== "string" || value.length === 0) return "-";
  return value.length > 8 ? `${value.slice(0, 8)}...` : value;
}

export default function RequestLoggerDetail({
  log,
  detail,
  loading,
  debugEnabled,
  emailsVisible = false,
  onClose,
  onCopy,
  onPrevious,
  onNext,
  relatedLogs = [],
  onSelectRelated,
}) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    globalThis.addEventListener("keydown", handler);
    return () => globalThis.removeEventListener("keydown", handler);
  }, [onClose]);

  const statusStyle = getStatusStyle(log.status);
  const protocolKey = log.sourceFormat || log.provider;
  const protocol = getProtocolColor(protocolKey, log.provider);
  const providerColor = PROVIDER_COLORS[log.provider] || {
    bg: "#374151",
    text: "#fff",
    label: (log.provider || "-").toUpperCase(),
  };
  const providerLabel = log.providerDisplay || providerColor.label;

  const [unblocking, setUnblocking] = useState(false);
  const [cleared, setCleared] = useState(false);

  const errorText = (detail?.error || log.error) ?? "";
  const isCombo503 =
    log.status === 503 && errorText.toLowerCase().includes("all targets exhausted");
  const isModelCooldown = !isCombo503 && errorText.toLowerCase().includes("cooling down");

  const [unblockAllBusy, setUnblockAllBusy] = useState(false);

  const handleUnblockModel = async () => {
    if (!log.provider || !log.model) return;
    setUnblocking(true);
    try {
      const res = await fetch("/api/resilience/model-cooldowns", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: log.provider, model: log.model }),
      });
      if (res.ok) setCleared(true);
    } catch {
      /* ignore */
    } finally {
      setUnblocking(false);
    }
  };

  const handleUnblockAll = async () => {
    setUnblockAllBusy(true);
    try {
      const res = await fetch("/api/resilience/model-cooldowns", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      if (res.ok) setCleared(true);
    } catch {
      /* ignore */
    } finally {
      setUnblockAllBusy(false);
    }
  };

  const providerStatus = detail?.pipelinePayloads?.providerResponse?.status;
  const hasStatusDiscrepancy = providerStatus && providerStatus !== log.status;

  const formatDate = (iso) => {
    if (iso == null) return "\u2014";
    try {
      const d = new Date(iso);
      if (!Number.isFinite(d.getTime())) return "\u2014";
      return (
        d.toLocaleDateString("pt-BR") + ", " + d.toLocaleTimeString("en-US", { hour12: false })
      );
    } catch {
      return "\u2014";
    }
  };

  const toPrettyJson = (payload) => {
    if (payload === null || payload === undefined) return null;
    try {
      return JSON.stringify(payload, null, 2);
    } catch {
      return String(payload);
    }
  };

  const pipelinePayloads = detail?.pipelinePayloads || null;
  const payloadSections = pipelinePayloads
    ? [
        ["clientRawRequest", "Client Raw Request"],
        ["clientRequest", "Client Request"],
        ["openaiRequest", "OpenAI Request"],
        ["providerRequest", "Provider Request"],
        ["providerResponse", "Provider Response"],
        ["clientResponse", "Client Response"],
        ["error", "Pipeline Error"],
      ]
        .map(([key, title]) => ({
          key,
          title,
          json: toPrettyJson(pipelinePayloads[key]),
        }))
        .filter((section) => section.json)
    : [];
  const requestJson = detail?.requestBody ? toPrettyJson(detail.requestBody) : null;
  const responseJson = detail?.responseBody ? toPrettyJson(detail.responseBody) : null;
  const streamChunks = (() => {
    if (!debugEnabled || !detail?.pipelinePayloads?.streamChunks) return null;
    let chunks: StreamChunks = detail.pipelinePayloads.streamChunks;
    if (typeof chunks === "string") {
      try {
        chunks = JSON.parse(chunks);
      } catch {
        return null;
      }
    }
    if (chunks && typeof chunks === "object") return chunks;
    return null;
  })();
  const detailIssue =
    detail?.detailState === "missing"
      ? "Detailed payload artifact is no longer available for this log entry."
      : detail?.detailState === "corrupt"
        ? "Detailed payload artifact could not be parsed."
        : null;
  const tokenStats = {
    totalIn: detail?.tokens?.in ?? log.tokens?.in ?? null,
    totalOut: detail?.tokens?.out ?? log.tokens?.out ?? null,
    cacheRead: detail?.tokens?.cacheRead ?? log.tokens?.cacheRead,
    cacheWrite: detail?.tokens?.cacheWrite ?? log.tokens?.cacheWrite,
    reasoning: detail?.tokens?.reasoning ?? log.tokens?.reasoning,
    compressed: detail?.tokens?.compressed ?? log.tokens?.compressed,
  };

  const formatTokenValue = (value) => (value != null ? value.toLocaleString() : "N/A");

  const cacheSource = detail?.cacheSource || log.cacheSource || "upstream";
  const cacheSourceLabel =
    cacheSource === "semantic" ? "Semantic (OmniRoute)" : "Upstream (Provider)";
  const cacheSourceClassName =
    cacheSource === "semantic"
      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
      : "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30";
  const accountLabel = maskAccount(detail?.account || log.account, emailsVisible);
  const codexAccountRotation = getCodexAccountRotation(detail);
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
        className="relative bg-bg-primary border border-border rounded-xl w-full max-w-225 max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-bg-primary/95 backdrop-blur-sm rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {log.active ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    <span className="inline-block h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  </span>
                ) : log.status === 0 ? (
                  <span className="inline-block px-2.5 py-1 rounded text-xs font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    Completed
                  </span>
                ) : (
                  <span
                    className="inline-block px-2.5 py-1 rounded text-xs font-bold"
                    style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                  >
                    {log.status}
                  </span>
                )}
                {hasStatusDiscrepancy && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-bg-subtle border border-border text-text-muted">
                    Upstream: {providerStatus}
                  </span>
                )}
                {log.method && <span className="font-bold text-lg">{log.method}</span>}
              </div>
              {hasStatusDiscrepancy && (
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">
                  OmniRoute returned {log.status} even though provider returned {providerStatus}
                </span>
              )}
            </div>
            <span className="text-text-muted font-mono text-sm self-center ml-2">{log.path}</span>
            {log.id && (
              <span className="text-[10px] text-text-muted/50 font-mono self-center ml-2 px-1.5 py-0.5 rounded bg-bg-subtle border border-border/40 select-all">
                {log.id}
              </span>
            )}
            {log.correlationId && (
              <span
                className="text-[10px] text-text-muted/50 font-mono self-center ml-2 px-1.5 py-0.5 rounded bg-bg-subtle border border-border/40 select-all"
                title="Correlation ID"
              >
                cid: {log.correlationId}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onPrevious}
              disabled={!onPrevious}
              className="p-1.5 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Previous request"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button
              onClick={onNext}
              disabled={!onNext}
              className="p-1.5 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Next request"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
              aria-label="Close detail modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Metadata Grid */}
          {log.active ? (
            <div className="flex flex-wrap gap-4 p-4 bg-bg-subtle rounded-xl border border-border">
              <div className="min-w-[140px] flex-1">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Started At
                </div>
                <div className="text-sm font-medium">{formatDate(log.timestamp)}</div>
              </div>
              <div className="min-w-[100px] flex-1">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Duration
                </div>
                <div className="text-sm font-medium">{formatDuration(log.duration)}</div>
              </div>
              <div className="min-w-[140px] flex-1">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Model
                </div>
                <div className="text-sm font-medium text-primary font-mono">{log.model}</div>
              </div>
              <div className="min-w-[120px] flex-1">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Provider
                </div>
                <span
                  className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
                  style={{ backgroundColor: providerColor.bg, color: providerColor.text }}
                >
                  {providerLabel}
                </span>
              </div>
              <div className="min-w-[120px] flex-1">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Account
                </div>
                <div className="text-sm font-medium">{accountLabel}</div>
              </div>
            </div>
          ) : (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-bg-subtle rounded-xl border border-border"
              data-testid="request-log-metadata-grid"
            >
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Started At
                </div>
                <div className="text-sm font-medium">
                  {(() => {
                    try {
                      const ts = new Date(log.timestamp).getTime();
                      if (!Number.isFinite(ts)) return "\u2014";
                      return formatDate(new Date(ts - (log.duration || 0)).toISOString());
                    } catch {
                      return "\u2014";
                    }
                  })()}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Ended At
                </div>
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
                  Input
                </div>
                <div
                  className="flex flex-wrap items-center gap-1.5"
                  data-testid="token-group-input"
                >
                  <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold">
                    Total In: {formatTokenValue(tokenStats.totalIn)}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-700 dark:text-sky-400 text-xs font-bold">
                    Cache Read: {formatTokenValue(tokenStats.cacheRead)}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold">
                    Cache Write: {formatTokenValue(tokenStats.cacheWrite)}
                  </span>
                  {tokenStats.compressed != null &&
                    tokenStats.compressed > 0 &&
                    (() => {
                      const fromTokens = tokenStats.compressed + Math.max(0, tokenStats.totalIn);
                      const saved = Math.min(tokenStats.compressed, fromTokens);
                      const pct =
                        fromTokens > 0
                          ? Math.max(0, Math.min(100, Math.round((saved / fromTokens) * 100)))
                          : 100;
                      return (
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold">
                          Compressed: {fromTokens.toLocaleString()} →{" "}
                          {Math.max(0, tokenStats.totalIn).toLocaleString()} ({pct}% saved)
                        </span>
                      );
                    })()}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Output
                </div>
                <div
                  className="flex flex-wrap items-center gap-1.5"
                  data-testid="token-group-output"
                >
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                    Total Out: {formatTokenValue(tokenStats.totalOut)}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-700 dark:text-violet-400 text-xs font-bold">
                    Reasoning: {formatTokenValue(tokenStats.reasoning)}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Model
                </div>
                <div className="text-sm font-medium text-primary font-mono">{log.model}</div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Requested Model
                </div>
                <div
                  className={`text-sm font-medium font-mono ${
                    (detail?.requestedModel || log.requestedModel) &&
                    (detail?.requestedModel || log.requestedModel) !== log.model
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-text-muted"
                  }`}
                >
                  {detail?.requestedModel || log.requestedModel || "\u2014"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Provider
                </div>
                <span
                  className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
                  style={{ backgroundColor: providerColor.bg, color: providerColor.text }}
                >
                  {providerLabel}
                </span>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Req Protocol
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
                  Cache Source
                </div>
                <span
                  className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold border ${cacheSourceClassName}`}
                >
                  {cacheSourceLabel}
                </span>
              </div>
              {(detail?.modelPinned || log.modelPinned) && (
                <div>
                  <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                    Model Pinning
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/25">
                    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M4.5 2A1.5 1.5 0 003 3.5v1.9l-1.4 2.8A.5.5 0 002 9h4v4.5a.5.5 0 00.5.5h3a.5.5 0 00.5-.5V9h4a.5.5 0 00.44-.73L13 5.4V3.5A1.5 1.5 0 0011.5 2h-7z" />
                    </svg>
                    Active — model selected via session pinning
                  </span>
                </div>
              )}
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Account
                </div>
                <div className="text-sm font-medium">{accountLabel}</div>
                {codexAccountRotation && (
                  <div
                    className="mt-1 text-[10px] text-amber-600 dark:text-amber-400 font-mono"
                    title={`${codexAccountRotation.initialConnectionId} -> ${codexAccountRotation.finalConnectionId}`}
                  >
                    Rotated: {formatConnectionId(codexAccountRotation.initialConnectionId)} -&gt;{" "}
                    {formatConnectionId(codexAccountRotation.finalConnectionId)}
                  </div>
                )}
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
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Combo
                </div>
                {detail?.comboName || log.comboName ? (
                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/30">
                    {detail?.comboName || log.comboName}
                  </span>
                ) : (
                  <div className="text-sm text-text-muted">\u2014</div>
                )}
              </div>
            </div>
          )}

          {/* Error Message */}
          {(detail?.error || log.error) && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-center justify-between mb-1">
                <div className="text-[10px] text-red-600 dark:text-red-400 uppercase tracking-wider font-bold">
                  Error
                </div>
                {isCombo503 && !cleared && (
                  <button
                    onClick={handleUnblockAll}
                    disabled={unblockAllBusy}
                    className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-lg
                      bg-amber-500/10 border border-amber-500/30 text-amber-600
                      hover:bg-amber-500/15 hover:border-amber-500/50
                      dark:text-amber-400 transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="6" width="10" height="8" rx="1" />
                      <path d="M5 6V4a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1" />
                      <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
                    </svg>
                    {unblockAllBusy ? "..." : "Unblock all"}
                  </button>
                )}
                {isCombo503 && cleared && (
                  <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-lg bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="4 8 7 11 12 4" />
                    </svg>
                    Cleared
                  </span>
                )}
                {isModelCooldown && !cleared && (
                  <button
                    onClick={handleUnblockModel}
                    disabled={unblocking}
                    className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-lg
                      bg-amber-500/10 border border-amber-500/30 text-amber-600
                      hover:bg-amber-500/15 hover:border-amber-500/50
                      dark:text-amber-400 transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="6" width="10" height="8" rx="1" />
                      <path d="M5 6V4a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1" />
                      <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
                    </svg>
                    {unblocking ? "..." : "Unblock"}
                  </button>
                )}
                {isModelCooldown && cleared && (
                  <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-lg bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="4 8 7 11 12 4" />
                    </svg>
                    Cleared
                  </span>
                )}
              </div>
              <div className="text-sm text-red-600 dark:text-red-300 font-mono whitespace-pre-wrap break-words">
                {formatErrorForDisplay(detail?.error || log.error)}
              </div>
            </div>
          )}

          {/* Related Requests (same correlation ID) */}
          {relatedLogs.length > 1 && (
            <div className="p-4 rounded-xl bg-bg-subtle border border-border">
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-2 font-bold">
                Related Requests ({relatedLogs.length})
              </div>
              <div className="flex flex-col gap-1">
                {[...relatedLogs]
                  .sort((a, b) => {
                    const aStart = new Date(a.timestamp).getTime() - (a.duration || 0);
                    const bStart = new Date(b.timestamp).getTime() - (b.duration || 0);
                    return aStart - bStart;
                  })
                  .map((r) => {
                    const rStatusStyle = r.active ? null : getStatusStyle(r.status);
                    const isCurrent = r.id === log.id;
                    const startTime = new Date(new Date(r.timestamp).getTime() - (r.duration || 0));
                    return (
                      <button
                        key={r.id}
                        onClick={() => !isCurrent && onSelectRelated?.(r)}
                        disabled={isCurrent}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded text-left text-xs transition-colors ${
                          isCurrent
                            ? "bg-primary/10 border border-primary/30 cursor-default"
                            : "hover:bg-bg-hover cursor-pointer"
                        }`}
                      >
                        <span
                          className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold min-w-[28px] text-center"
                          style={
                            rStatusStyle
                              ? { backgroundColor: rStatusStyle.bg, color: rStatusStyle.text }
                              : { backgroundColor: "#374151", color: "#fff" }
                          }
                        >
                          {r.status || "..."}
                        </span>
                        <span className="font-mono text-text-muted">{r.id}</span>
                        <span className="text-text-muted">{r.model}</span>
                        <span className="text-text-muted text-[10px]">
                          {startTime.toLocaleTimeString("en-US", { hour12: false })}
                        </span>
                        <span className="text-text-muted ml-auto">
                          {formatDuration(r.duration)}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] text-primary font-bold ml-1">current</span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {detailIssue && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="text-[10px] text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1 font-bold">
                Detail Status
              </div>
              <div className="text-sm text-amber-700 dark:text-amber-200">{detailIssue}</div>
            </div>
          )}

          {loading ? (
            <div className="p-8 text-center text-text-muted animate-pulse">
              Loading request details...
            </div>
          ) : (
            <>
              {streamChunks && streamChunks.provider && (
                <StreamSection
                  title="Provider Event Stream"
                  json={
                    Array.isArray(streamChunks.provider)
                      ? streamChunks.provider.join("")
                      : String(streamChunks.provider)
                  }
                  onCopy={() =>
                    onCopy(
                      Array.isArray(streamChunks.provider)
                        ? streamChunks.provider.join("")
                        : String(streamChunks.provider)
                    )
                  }
                />
              )}

              {streamChunks && streamChunks.client && (
                <StreamSection
                  title="Client Event Stream"
                  json={
                    Array.isArray(streamChunks.client)
                      ? streamChunks.client.join("")
                      : String(streamChunks.client)
                  }
                  onCopy={() =>
                    onCopy(
                      Array.isArray(streamChunks.client)
                        ? streamChunks.client.join("")
                        : String(streamChunks.client)
                    )
                  }
                />
              )}

              {streamChunks &&
                streamChunks.openai &&
                !streamChunks.provider &&
                !streamChunks.client && (
                  <StreamSection
                    title="Event Stream"
                    json={
                      Array.isArray(streamChunks.openai)
                        ? streamChunks.openai.join("")
                        : String(streamChunks.openai)
                    }
                    onCopy={() =>
                      onCopy(
                        Array.isArray(streamChunks.openai)
                          ? streamChunks.openai.join("")
                          : String(streamChunks.openai)
                      )
                    }
                  />
                )}

              {payloadSections.length > 0 &&
                payloadSections.map((section) => (
                  <PayloadSection
                    key={section.key}
                    title={section.title}
                    json={section.json}
                    onCopy={() => onCopy(section.json)}
                  />
                ))}

              {payloadSections.length === 0 && responseJson && (
                <PayloadSection
                  title="Response Payload (Legacy)"
                  json={responseJson}
                  onCopy={() => onCopy(responseJson)}
                />
              )}

              {payloadSections.length === 0 && requestJson && (
                <PayloadSection
                  title="Request Payload (Legacy)"
                  json={requestJson}
                  onCopy={() => onCopy(requestJson)}
                />
              )}

              {payloadSections.length === 0 && !requestJson && !responseJson && !loading && (
                <div className="p-6 text-center text-text-muted">
                  <span className="material-symbols-outlined text-[32px] mb-2 block opacity-40">
                    info
                  </span>
                  <p className="text-sm">No payload data available for this log entry.</p>
                  <p className="text-xs mt-1">
                    Enable detailed logging first if you want the four-stage client/provider payload
                    view for new requests.
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
