"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  TYPE_COLORS,
  LEVEL_COLORS,
  PROVIDER_COLORS,
  getProxyStatusStyle as getStatusStyle,
} from "@/shared/constants/colors";
import {
  formatDuration as formatLatency,
  maskAccount,
  maskSegment,
} from "@/shared/utils/formatting";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";

/**
 * Proxy log detail modal — shows full proxy event metadata, error info, and config.
 * Extracted from ProxyLogger.js for maintainability.
 */
/**
 * Proxy label for the detail pane: the registry name when the log carries one
 * (`murphy-eu-fr (http://host:port)`), else `type://host:port`, else the direct label.
 * Module-scope so the component's cyclomatic complexity stays inside the ratchet.
 */
function formatProxyLabel(proxy, directLabel) {
  if (!proxy) return directLabel;
  const endpoint = `${proxy.type}://${proxy.host}:${proxy.port}`;
  return proxy.name ? `${proxy.name} (${endpoint})` : endpoint;
}

function ObservedField({ label, children }) {
  return (
    <div>
      <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{label}</div>
      <div className="text-sm font-medium font-mono">{children}</div>
    </div>
  );
}

function ObservedLinkField({ label, href, title, short }) {
  return (
    <div>
      <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{label}</div>
      {href ? (
        <a
          href={href}
          title={title}
          className="text-sm font-medium font-mono text-primary hover:underline break-all"
        >
          {short}…
        </a>
      ) : (
        <div className="text-sm text-text-muted">—</div>
      )}
    </div>
  );
}

function StatusBadges({ log, t }) {
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
  return (
    <>
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{t("type")}</div>
        <span
          className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
          style={{ backgroundColor: typeColor.bg, color: typeColor.text }}
        >
          {typeColor.label}
        </span>
      </div>
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
          {t("level")}
        </div>
        <span
          className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
          style={{ backgroundColor: levelColor.bg, color: levelColor.text }}
        >
          {levelColor.label}
        </span>
      </div>
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
          {t("provider")}
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
      <TlsBadge log={log} t={t} />
    </>
  );
}

function TlsBadge({ log, t }) {
  return (
    <div>
      <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
        {t("tlsFingerprint")}
      </div>
      {log.tlsFingerprint ? (
        <span
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase"
          style={{ backgroundColor: "rgba(6, 182, 212, 0.15)", color: "#22d3ee" }}
        >
          <span style={{ fontSize: "12px" }}>🔒</span> Chrome 124
        </span>
      ) : (
        <div className="text-sm text-text-muted">{t("directNative")}</div>
      )}
    </div>
  );
}

function ObservedMetadataGrid({ log, t, emailsVisible }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-bg-subtle rounded-xl border border-border">
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{t("time")}</div>
        <div className="text-sm font-medium">{formatDateValue(log.timestamp)}</div>
      </div>
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
          {t("latency")}
        </div>
        <div className="text-sm font-medium">{formatLatency(log.latencyMs)}</div>
      </div>
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
          {t("clientIp")}
        </div>
        <div className="text-sm font-medium font-mono text-emerald-400">{log.clientIp || "—"}</div>
      </div>
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
          {t("proxy")}
        </div>
        <div className="text-sm font-medium font-mono text-primary">
          {formatProxyLabel(log.proxy, t("direct"))}
        </div>
      </div>
      <StatusBadges log={log} t={t} />
      <ObservedField label={t("upstreamStatus")}>
        {typeof log.upstreamStatus === "number" ? String(log.upstreamStatus) : t("noResponse")}
      </ObservedField>
      <ObservedField label={t("egressIp")}>
        <span className="text-emerald-400">{maskSegment(log.egressIp) || "—"}</span>
      </ObservedField>
      <ObservedLinkField
        label={t("correlationId")}
        href={
          log.correlationId
            ? `/dashboard/logs?correlationId=${encodeURIComponent(log.correlationId)}`
            : null
        }
        title={log.correlationId}
        short={log.correlationId?.slice(0, 12)}
      />
      <ObservedField label={t("servedBy")}>
        {maskAccount(log.rotationAccount ?? log.account, emailsVisible) || "—"}
      </ObservedField>
      <div className="col-span-2">
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
          {t("targetUrl")}
        </div>
        <div className="text-sm font-medium font-mono text-text-muted break-all">
          {log.targetUrl || "—"}
        </div>
      </div>
    </div>
  );
}

function formatDateValue(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR") + ", " + d.toLocaleTimeString("en-US", { hour12: false });
  } catch {
    return iso;
  }
}

export default function ProxyLogDetail({ log, onClose }) {
  const t = useTranslations("proxyLog");
  const { emailsVisible } = useEmailPrivacyStore();
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const statusStyle = getStatusStyle(log.status);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[5vh]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t("detailAriaLabel")}
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
            <span className="font-bold text-lg">{t("event")}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
            aria-label={t("close")}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Metadata Grid */}
          <ObservedMetadataGrid log={log} t={t} emailsVisible={emailsVisible} />

          {/* Error */}
          {log.error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="text-[10px] text-red-400 uppercase tracking-wider mb-1 font-bold">
                {t("error")}
              </div>
              <div className="text-sm text-red-300 font-mono">{log.error}</div>
            </div>
          )}

          {/* Proxy Config Details */}
          {log.proxy && (
            <div className="p-4 rounded-xl bg-bg-subtle border border-border">
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-2 font-bold">
                {t("configuration")}
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
