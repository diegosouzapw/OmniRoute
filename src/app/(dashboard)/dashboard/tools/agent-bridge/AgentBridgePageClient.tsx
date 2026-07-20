"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { RiskNoticeBanner } from "./components/RiskNoticeBanner";
import { AgentBridgeServerCard } from "./components/AgentBridgeServerCard";
import { AgentBridgeMaintenanceCard } from "./components/AgentBridgeMaintenanceCard";
import { AgentList } from "./components/AgentList";
import { EmptyStateNoProviders } from "./components/EmptyStateNoProviders";
import { useAgentBridgeState } from "./hooks/useAgentBridgeState";
import type { MitmTargetView } from "@/mitm/types";
import type { MappingRow } from "./components/ModelMappingTable";

// ── Types ────────────────────────────────────────────────────────────────────

export interface AgentStateEntry {
  agent_id: string;
  dns_enabled: boolean;
  cert_trusted: boolean;
  setup_completed: boolean;
  last_started_at: string | null;
  last_error: string | null;
}

/** Manual cert-install guide returned when auto-trust isn't possible (containers). */
export interface CertManualGuide {
  platform: string;
  certPath: string;
  downloadUrl: string;
  steps: string[];
}

export interface AgentBridgeServerState {
  running: boolean;
  port: number;
  certTrusted: boolean;
  upstreamCa: string | null;
  lastStartedAt: string | null;
  activeConns: number;
  interceptedCount: number;
  /** Target hostnames are spoofed in /etc/hosts (from getMitmStatus). */
  dnsConfigured: boolean;
  /** A crash/SIGKILL left system state behind — surfaces the repair banner. */
  orphanedStateDetected: boolean;
  /** Session-cached sudo password from a prior MITM privileged action. */
  hasCachedPassword?: boolean;
  /** Server OS requires a sudo password and none is cached (#7836). */
  needsSudoPassword?: boolean;
  /** Whether the OmniRoute server is running on Windows. */
  isWin?: boolean;
}

export type AgentMappingsMap = Record<string, MappingRow[]>;

export interface AgentBridgePageData {
  serverState: AgentBridgeServerState;
  agentStates: AgentStateEntry[];
  bypassPatterns: string[];
  mappings: AgentMappingsMap;
}

interface AgentBridgePageClientProps {
  initialData: AgentBridgePageData;
  targets: MitmTargetView[];
  hasProviders: boolean;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function AgentBridgePageClient({
  initialData,
  targets,
  hasProviders,
}: AgentBridgePageClientProps) {
  const t = useTranslations("agentBridge");
  const { data, refresh } = useAgentBridgeState({ initialData });
  const [actionError, setActionError] = useState<string | null>(null);
  const [certGuide, setCertGuide] = useState<CertManualGuide | null>(null);

  // ── Server actions ────────────────────────────────────────────────────────

  const handleServerAction = useCallback(
    async (action: "start" | "stop" | "restart" | "trust-cert" | "regenerate-cert") => {
      setActionError(null);
      try {
        const res = await fetch("/api/tools/agent-bridge/server", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        });
        const payload = (await res.json().catch(() => ({}))) as {
          error?: { message?: string };
          skippable?: boolean;
          manualGuide?: CertManualGuide;
        };
        if (!res.ok) {
          throw new Error(payload.error?.message ?? `HTTP ${res.status}`);
        }
        // Cert couldn't be auto-installed (container / headless): not an error —
        // surface the manual-install guide instead of blocking. (#4546)
        if (payload.skippable && payload.manualGuide) {
          setCertGuide(payload.manualGuide);
        } else if (action === "trust-cert") {
          setCertGuide(null);
        }
        await refresh();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : "Unknown error");
      }
    },
    [refresh]
  );

  // ── Upstream CA ───────────────────────────────────────────────────────────

  const handleUpstreamCaSave = useCallback(async (path: string) => {
    setActionError(null);
    try {
      const res = await fetch("/api/tools/agent-bridge/upstream-ca", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await refresh();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Unknown error");
    }
  }, [refresh]);

  // ── Bypass list ───────────────────────────────────────────────────────────

  const handleBypassSave = useCallback(async (patterns: string[]) => {
    setActionError(null);
    try {
      const res = await fetch("/api/tools/agent-bridge/bypass", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patterns }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await refresh();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Unknown error");
    }
  }, [refresh]);

  // ── DNS toggle ────────────────────────────────────────────────────────────

  const handleDnsToggle = useCallback(
    async (agentId: string, enabled: boolean) => {
      setActionError(null);
      try {
        const res = await fetch(`/api/tools/agent-bridge/agents/${agentId}/dns`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enabled }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await refresh();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : "Unknown error");
      }
    },
    [refresh]
  );

  // ── Mappings save ─────────────────────────────────────────────────────────

  const handleMappingsSave = useCallback(
    async (agentId: string, mappings: MappingRow[]) => {
      setActionError(null);
      try {
        const res = await fetch(`/api/tools/agent-bridge/agents/${agentId}/mappings`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mappings }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await refresh();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : "Unknown error");
      }
    },
    [refresh]
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-5">
      {/* Risk banner */}
      <RiskNoticeBanner />

      {/* Error alert */}
      {actionError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400"
        >
          <span className="material-symbols-outlined text-[16px]">error</span>
          {actionError}
          <button
            type="button"
            onClick={() => setActionError(null)}
            className="ml-auto text-red-500 hover:text-red-400"
            aria-label="Dismiss"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Manual cert-install guide (container / headless fallback) */}
      {certGuide && (
        <div
          role="status"
          className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-700 dark:text-amber-300"
        >
          <div className="flex items-center gap-2 font-medium">
            <span className="material-symbols-outlined text-[16px]">info</span>
            {t("certManualTitle") ||
              "Certificate couldn't be installed automatically (e.g. inside a container). The bridge can still run — trust the CA manually:"}
            <button
              type="button"
              onClick={() => setCertGuide(null)}
              className="ml-auto text-amber-600 hover:text-amber-500"
              aria-label="Dismiss"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
          <ol className="mt-2 list-decimal pl-6 space-y-1">
            {certGuide.steps.map((step, i) => (
              <li key={i} className="font-mono text-xs break-all">
                {step}
              </li>
            ))}
          </ol>
          <a
            href={certGuide.downloadUrl}
            download
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium underline hover:no-underline"
          >
            <span className="material-symbols-outlined text-[14px]">download</span>
            {t("downloadCert") || "Download Cert"}
          </a>
        </div>
      )}

      {/* Empty state: no providers */}
      {!hasProviders ? (
        <EmptyStateNoProviders />
      ) : (
        <>
          {/* Server card */}
          <AgentBridgeServerCard
            serverState={data.serverState}
            onAction={handleServerAction}
            onUpstreamCaSave={handleUpstreamCaSave}
            onBypassSave={handleBypassSave}
            bypassPatterns={data.bypassPatterns}
          />

          {/* Maintenance & diagnostics */}
          <AgentBridgeMaintenanceCard
            orphanedStateDetected={data.serverState.orphanedStateDetected}
            certTrusted={data.serverState.certTrusted}
            hasCachedPassword={data.serverState.hasCachedPassword === true}
            needsSudoPassword={data.serverState.needsSudoPassword === true}
            isWin={data.serverState.isWin === true}
            onError={setActionError}
            onRefresh={refresh}
          />

          {/* Agent list */}
          <AgentList
            targets={targets}
            agentStates={data.agentStates}
            serverRunning={data.serverState.running}
            mappingsMap={data.mappings}
            onDnsToggle={handleDnsToggle}
            onMappingsSave={handleMappingsSave}
          />

          {/* Quick links */}
          <div className="rounded-xl border border-border/40 bg-card px-5 py-4">
            <h3 className="text-xs font-semibold text-text-muted mb-2 uppercase tracking-wide">
              {t("quickLinks") || "Quick links"}
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/providers"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <span className="material-symbols-outlined text-[14px]">dns</span>
                {t("quickLinkProviders") || "Configure providers"}
              </Link>
              <Link
                href="/dashboard/tools/traffic-inspector"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <span className="material-symbols-outlined text-[14px]">network_check</span>
                {t("quickLinkInspector") || "View traffic in Traffic Inspector"}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
