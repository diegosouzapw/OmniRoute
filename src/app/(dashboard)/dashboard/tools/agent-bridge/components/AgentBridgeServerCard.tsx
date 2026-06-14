"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CertStatusIcon } from "./shared/CertStatusIcon";
import { UpstreamCaField } from "./UpstreamCaField";
import { BypassListEditor } from "./BypassListEditor";
import type { AgentBridgeServerState } from "../AgentBridgePageClient";

interface AgentBridgeServerCardProps {
  serverState: AgentBridgeServerState;
  onAction: (action: "start" | "stop" | "restart" | "trust-cert" | "regenerate-cert") => Promise<void>;
  onUpstreamCaSave: (path: string) => Promise<void>;
  onBypassSave: (patterns: string[]) => Promise<void>;
  bypassPatterns: string[];
}

/**
 * Global server card — status + action buttons + CA field + bypass list.
 * Matches plan 11 §3 AgentBridge Server layout.
 */
export function AgentBridgeServerCard({
  serverState,
  onAction,
  onUpstreamCaSave,
  onBypassSave,
  bypassPatterns,
}: AgentBridgeServerCardProps) {
  const t = useTranslations("agentBridge");
  const [loading, setLoading] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [upstreamCa, setUpstreamCa] = useState(serverState.upstreamCa ?? "");

  const runAction = async (action: "start" | "stop" | "restart" | "trust-cert" | "regenerate-cert") => {
    setLoading(action);
    try {
      await onAction(action);
    } finally {
      setLoading(null);
    }
  };

  const isRunning = serverState.running;

  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
      {/* Header row */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <span className="material-symbols-outlined text-[20px] text-primary">link</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text-main flex items-center gap-2">
              {t("serverCardTitle") || "AgentBridge Server"}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  isRunning
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isRunning ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"}`}
                />
                {isRunning ? t("statusRunning") || "Running" : t("statusStopped") || "Stopped"}
              </span>
            </h2>
            <div className="flex items-center gap-3 mt-0.5 text-xs text-text-muted">
              <span>
                {t("serverPort") || "Port"}: {serverState.port ?? 443}
              </span>
              <CertStatusIcon trusted={serverState.certTrusted ?? false} />
              {serverState.activeConns !== undefined && (
                <span>
                  {t("serverConns") || "Connections"}: {serverState.activeConns}
                </span>
              )}
              {serverState.interceptedCount !== undefined && (
                <span>
                  {t("serverIntercepted") || "Intercepted"}: {serverState.interceptedCount.toLocaleString()}
                </span>
              )}
              {serverState.lastStartedAt && (
                <span>
                  {t("serverLastStarted") || "Last started"}:{" "}
                  {new Date(serverState.lastStartedAt).toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-text-muted hover:text-text-main transition-colors"
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          <span className="material-symbols-outlined text-[18px]">
            {expanded ? "expand_less" : "expand_more"}
          </span>
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 px-5 pb-4">
        <button
          type="button"
          onClick={() => runAction("start")}
          disabled={isRunning || loading !== null}
          aria-label={t("startServer")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 px-3 py-1.5 text-xs font-medium hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[14px]">play_arrow</span>
          {loading === "start" ? t("starting") || "Starting…" : t("startServer") || "Start"}
        </button>

        <button
          type="button"
          onClick={() => runAction("stop")}
          disabled={!isRunning || loading !== null}
          aria-label={t("stopServer")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 text-red-600 px-3 py-1.5 text-xs font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[14px]">stop</span>
          {loading === "stop" ? t("stopping") || "Stopping…" : t("stopServer") || "Stop"}
        </button>

        <button
          type="button"
          onClick={() => runAction("restart")}
          disabled={loading !== null}
          aria-label={t("restartServer")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/10 text-amber-600 px-3 py-1.5 text-xs font-medium hover:bg-amber-500/20 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[14px]">refresh</span>
          {loading === "restart" ? t("restarting") || "Restarting…" : t("restartServer") || "Restart"}
        </button>

        <button
          type="button"
          onClick={() => runAction("trust-cert")}
          disabled={loading !== null}
          aria-label={t("trustCert")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 text-blue-600 px-3 py-1.5 text-xs font-medium hover:bg-blue-500/20 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[14px]">security</span>
          {loading === "trust-cert" ? t("trusting") || "Trusting…" : t("trustCert") || "Trust Cert"}
        </button>

        <a
          href="/api/tools/agent-bridge/cert/download"
          download
          aria-label={t("downloadCert")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-violet-500/10 text-violet-600 px-3 py-1.5 text-xs font-medium hover:bg-violet-500/20 transition-colors"
        >
          <span className="material-symbols-outlined text-[14px]">download</span>
          {t("downloadCert") || "Download Cert"}
        </a>

        <button
          type="button"
          onClick={() => runAction("regenerate-cert")}
          disabled={loading !== null}
          aria-label={t("regenerateCert")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-500/10 text-text-muted px-3 py-1.5 text-xs font-medium hover:bg-zinc-500/20 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[14px]">autorenew</span>
          {loading === "regenerate-cert"
            ? t("regenerating") || "Regenerating…"
            : t("regenerateCert") || "Regenerate Cert"}
        </button>
      </div>

      {/* Expanded: CA + Bypass */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-border/30 pt-4 flex flex-col gap-5">
          <UpstreamCaField
            value={upstreamCa}
            onChange={setUpstreamCa}
            onSave={onUpstreamCaSave}
          />
          <div>
            <h4 className="text-xs font-semibold text-text-main mb-2">
              {t("bypassSectionTitle") || "Bypass List"}
            </h4>
            <p className="text-xs text-text-muted mb-3">
              {t("bypassSectionDesc") ||
                "Hosts matching these patterns are tunneled directly (no TLS decryption). Defaults include banks, .gov, and corporate SSO."}
            </p>
            <BypassListEditor
              patterns={bypassPatterns}
              onSave={onBypassSave}
            />
          </div>
        </div>
      )}
    </div>
  );
}
