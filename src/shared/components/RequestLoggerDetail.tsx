"use client";

import { useState, useEffect } from "react";
import {
  PROVIDER_COLORS,
  getHttpStatusStyle as getStatusStyle,
  getProtocolColor,
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
      <pre className="p-4 rounded-xl bg-black/5 dark:bg-black/30 border border-border overflow-x-auto text-xs font-mono text-text-main max-h-[600px] overflow-y-auto leading-relaxed whitespace-pre-wrap break-words">
        {json}
      </pre>
    </div>
  );
}

// ─── Detail Modal ───────────────────────────────────────────────────────────

type StreamChunks = Record<string, string | string[]>;

export default function RequestLoggerDetail({
  log,
  detail,
  loading,
  debugEnabled,
  onClose,
  onCopy,
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

  const providerStatus = detail?.pipelinePayloads?.providerResponse?.status;
  const hasStatusDiscrepancy = providerStatus && providerStatus !== log.status;

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
  const streamChunksText = (() => {
    if (!debugEnabled || !detail?.pipelinePayloads?.streamChunks) return null;
    let chunks: StreamChunks = detail.pipelinePayloads.streamChunks;

    // If stored as a JSON string, try to parse it so we can render joined raw chunks
    if (typeof chunks === "string") {
      try {
        const parsed = JSON.parse(chunks);
        chunks = parsed;
      } catch {
        // Keep as string and return raw text (don't JSON-stringify)
        return chunks;
      }
    }

    if (chunks && typeof chunks === "object") {
      try {
        return Object.entries(chunks)
          .map(([stage, arr]) => {
            const joined = Array.isArray(arr) ? arr.join("") : String(arr);
            return `--- ${stage} ---\n${joined}`;
          })
          .join("\n\n");
      } catch {
        return toPrettyJson(chunks);
      }
    }

    return null;
  })();
  const detailIssue =
    detail?.detailState === "missing"
      ? "Detailed payload artifact is no longer available for this log entry."
      : detail?.detailState === "corrupt"
        ? "Detailed payload artifact could not be parsed."
        : null;
  const tokenStats = {
    totalIn: detail?.tokens?.in ?? log.tokens?.in ?? 0,
    totalOut: detail?.tokens?.out ?? log.tokens?.out ?? 0,
    cacheRead: detail?.tokens?.cacheRead ?? log.tokens?.cacheRead,
    cacheWrite: detail?.tokens?.cacheWrite ?? log.tokens?.cacheWrite,
    reasoning: detail?.tokens?.reasoning ?? log.tokens?.reasoning,
  };

  const formatTokenValue = (value) => (value != null ? value.toLocaleString() : "N/A");

  const cacheSource = detail?.cacheSource || log.cacheSource || "upstream";
  const cacheSourceLabel =
    cacheSource === "semantic" ? "Semantic (OmniRoute)" : "Upstream (Provider)";
  const cacheSourceClassName =
    cacheSource === "semantic"
      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
      : "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30";

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
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block px-2.5 py-1 rounded text-xs font-bold"
                  style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                >
                  {log.status}
                </span>
                {hasStatusDiscrepancy && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-bg-subtle border border-border text-text-muted">
                    Upstream: {providerStatus}
                  </span>
                )}
                <span className="font-bold text-lg">{log.method}</span>
              </div>
              {hasStatusDiscrepancy && (
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">
                  OmniRoute returned {log.status} even though provider returned {providerStatus}
                </span>
              )}
            </div>
            <span className="text-text-muted font-mono text-sm self-center ml-2">{log.path}</span>
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
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-bg-subtle rounded-xl border border-border"
            data-testid="request-log-metadata-grid"
          >
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                Completed Time
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
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Input</div>
              <div className="flex flex-wrap items-center gap-1.5" data-testid="token-group-input">
                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold">
                  Total In: {tokenStats.totalIn.toLocaleString()}
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-700 dark:text-sky-400 text-xs font-bold">
                  Cache Read: {formatTokenValue(tokenStats.cacheRead)}
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold">
                  Cache Write: {formatTokenValue(tokenStats.cacheWrite)}
                </span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                Output
              </div>
              <div className="flex flex-wrap items-center gap-1.5" data-testid="token-group-output">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                  Total Out: {tokenStats.totalOut.toLocaleString()}
                </span>
                <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-700 dark:text-violet-400 text-xs font-bold">
                  Reasoning: {formatTokenValue(tokenStats.reasoning)}
                </span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Model</div>
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
                {detail?.requestedModel || log.requestedModel || "—"}
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
                {providerColor.label}
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
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/30">
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
              <div className="text-[10px] text-red-600 dark:text-red-400 uppercase tracking-wider mb-1 font-bold">
                Error
              </div>
              <div className="text-sm text-red-600 dark:text-red-300 font-mono">
                {detail?.error || log.error}
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
              {payloadSections.length > 0 &&
                payloadSections.map((section) => (
                  <PayloadSection
                    key={section.key}
                    title={section.title}
                    json={section.json}
                    onCopy={() => onCopy(section.json)}
                  />
                ))}

              {streamChunksText && (
                <PayloadSection
                  title="Event Stream (Debug)"
                  json={streamChunksText}
                  onCopy={() => onCopy(streamChunksText)}
                />
              )}

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
