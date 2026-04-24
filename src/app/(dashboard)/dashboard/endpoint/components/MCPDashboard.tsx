"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Button } from "@/shared/components";
import { useTranslations } from "next-intl";

type McpStatusResponse = {
  status: "online" | "offline";
  online: boolean;
  heartbeatPath: string;
  heartbeat: {
    pid: number;
    startedAt: string;
    lastHeartbeatAt: string;
    version: string;
    transport: "stdio";
    scopesEnforced: boolean;
    allowedScopes: string[];
    toolCount: number;
    pidAlive: boolean;
    heartbeatAgeMs: number | null;
    uptimeMs: number | null;
  } | null;
  activity: {
    totalCalls24h: number;
    successRate: number;
    avgDurationMs: number;
    topTools: Array<{ tool: string; count: number }>;
    lastCallAt: string | null;
    lastCallTool: string | null;
  };
};

type McpTool = {
  name: string;
  description: string;
  scopes: string[];
  phase: 1 | 2;
  auditLevel: "none" | "basic" | "full";
  sourceEndpoints: string[];
};

type McpAuditEntry = {
  id: number;
  toolName: string;
  inputHash: string;
  outputSummary: string;
  durationMs: number;
  apiKeyId: string | null;
  success: boolean;
  errorCode: string | null;
  createdAt: string;
};

type McpAuditResponse = {
  entries: McpAuditEntry[];
  total: number;
  limit: number;
  offset: number;
};

type Combo = {
  id: string;
  name: string;
  isActive?: boolean;
};

const AUDIT_PAGE_SIZE = 20;

const RESILIENCE_PRESETS = {
  aggressive: {
    requestQueue: {
      requestsPerMinute: 180,
      minTimeBetweenRequestsMs: 100,
      concurrentRequests: 16,
    },
    connectionCooldown: {
      oauth: {
        baseCooldownMs: 30000,
        useUpstreamRetryHints: false,
        maxBackoffSteps: 4,
      },
      apikey: {
        baseCooldownMs: 2000,
        useUpstreamRetryHints: true,
        maxBackoffSteps: 3,
      },
    },
    providerBreaker: {
      oauth: {
        failureThreshold: 2,
        resetTimeoutMs: 30000,
      },
      apikey: {
        failureThreshold: 3,
        resetTimeoutMs: 15000,
      },
    },
  },
  balanced: {
    requestQueue: {
      requestsPerMinute: 100,
      minTimeBetweenRequestsMs: 200,
      concurrentRequests: 10,
    },
    connectionCooldown: {
      oauth: {
        baseCooldownMs: 60000,
        useUpstreamRetryHints: false,
        maxBackoffSteps: 8,
      },
      apikey: {
        baseCooldownMs: 3000,
        useUpstreamRetryHints: true,
        maxBackoffSteps: 5,
      },
    },
    providerBreaker: {
      oauth: {
        failureThreshold: 3,
        resetTimeoutMs: 60000,
      },
      apikey: {
        failureThreshold: 5,
        resetTimeoutMs: 30000,
      },
    },
  },
  conservative: {
    requestQueue: {
      requestsPerMinute: 60,
      minTimeBetweenRequestsMs: 350,
      concurrentRequests: 6,
    },
    connectionCooldown: {
      oauth: {
        baseCooldownMs: 120000,
        useUpstreamRetryHints: false,
        maxBackoffSteps: 10,
      },
      apikey: {
        baseCooldownMs: 30000,
        useUpstreamRetryHints: false,
        maxBackoffSteps: 8,
      },
    },
    providerBreaker: {
      oauth: {
        failureThreshold: 8,
        resetTimeoutMs: 120000,
      },
      apikey: {
        failureThreshold: 8,
        resetTimeoutMs: 60000,
      },
    },
  },
} as const;

function formatDuration(ms: number | null | undefined) {
  if (typeof ms !== "number" || !Number.isFinite(ms)) return "—";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatPercent(value: number | null | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "0%";
  return `${(value * 100).toFixed(1)}%`;
}

export default function McpDashboardPage() {
  const t = useTranslations("mcpDashboard");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<McpStatusResponse | null>(null);
  const [tools, setTools] = useState<McpTool[]>([]);
  const [combos, setCombos] = useState<Combo[]>([]);

  const [toolFilter, setToolFilter] = useState("");
  const [successFilter, setSuccessFilter] = useState<"all" | "true" | "false">("all");
  const [apiKeyFilter, setApiKeyFilter] = useState("");
  const [auditOffset, setAuditOffset] = useState(0);
  const [auditData, setAuditData] = useState<McpAuditResponse>({
    entries: [],
    total: 0,
    limit: AUDIT_PAGE_SIZE,
    offset: 0,
  });
  const [auditLoading, setAuditLoading] = useState(false);

  const [selectedComboId, setSelectedComboId] = useState("");
  const [selectedProfile, setSelectedProfile] =
    useState<keyof typeof RESILIENCE_PRESETS>("balanced");
  const [actionBusy, setActionBusy] = useState<null | "switch" | "resilience" | "reset">(null);
  const [actionMessage, setActionMessage] = useState<string>("");

  const selectedCombo = useMemo(
    () => combos.find((combo) => combo.id === selectedComboId) || null,
    [combos, selectedComboId]
  );

  const refreshSummary = useCallback(async () => {
    try {
      const [statusRes, toolsRes, combosRes] = await Promise.all([
        fetch("/api/mcp/status"),
        fetch("/api/mcp/tools"),
        fetch("/api/combos"),
      ]);

      if (statusRes.ok) {
        const json = await statusRes.json();
        setStatus(json);
      }

      if (toolsRes.ok) {
        const json = await toolsRes.json();
        setTools(Array.isArray(json.tools) ? json.tools : []);
      }

      if (combosRes.ok) {
        const json = await combosRes.json();
        const nextCombos = Array.isArray(json?.combos) ? json.combos : [];
        setCombos(nextCombos);
        if (!selectedComboId && nextCombos.length > 0) {
          setSelectedComboId(nextCombos[0].id);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [selectedComboId]);

  const refreshAudit = useCallback(async () => {
    setAuditLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", String(AUDIT_PAGE_SIZE));
      params.set("offset", String(auditOffset));
      if (toolFilter) params.set("tool", toolFilter);
      if (successFilter !== "all") params.set("success", successFilter);
      if (apiKeyFilter) params.set("apiKeyId", apiKeyFilter);

      const response = await fetch(`/api/mcp/audit?${params.toString()}`);
      if (!response.ok) return;

      const json = await response.json();
      setAuditData({
        entries: Array.isArray(json.entries) ? json.entries : [],
        total: Number(json.total || 0),
        limit: Number(json.limit || AUDIT_PAGE_SIZE),
        offset: Number(json.offset || 0),
      });
    } finally {
      setAuditLoading(false);
    }
  }, [auditOffset, toolFilter, successFilter, apiKeyFilter]);

  useEffect(() => {
    refreshSummary();
    const interval = setInterval(refreshSummary, 30000);
    return () => clearInterval(interval);
  }, [refreshSummary]);

  useEffect(() => {
    refreshAudit();
  }, [refreshAudit]);

  const handleSwitchCombo = async () => {
    if (!selectedCombo) return;
    const nextState = selectedCombo.isActive === false;
    const confirmLabel = nextState ? t("activate") : t("deactivate");
    if (
      !globalThis.confirm(
        t("confirmSwitchCombo", { action: confirmLabel, combo: selectedCombo.name })
      )
    )
      return;

    setActionBusy("switch");
    setActionMessage("");
    try {
      const response = await fetch(`/api/combos/${selectedCombo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: nextState }),
      });

      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        setActionMessage(json?.error || t("switchComboFailed"));
        return;
      }

      setActionMessage(t("switchComboSuccess", { combo: selectedCombo.name }));
      await refreshSummary();
    } finally {
      setActionBusy(null);
    }
  };

  const handleApplyResilience = async () => {
    const preset = RESILIENCE_PRESETS[selectedProfile];
    const profileLabelById: Record<keyof typeof RESILIENCE_PRESETS, string> = {
      aggressive: t("profileAggressive"),
      balanced: t("profileBalanced"),
      conservative: t("profileConservative"),
    };
    const profileLabel = profileLabelById[selectedProfile];
    if (!globalThis.confirm(t("confirmApplyProfile", { profile: profileLabel }))) return;

    setActionBusy("resilience");
    setActionMessage("");
    try {
      const response = await fetch("/api/resilience", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preset),
      });

      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        setActionMessage(json?.error || t("applyProfileFailed"));
        return;
      }

      setActionMessage(t("applyProfileSuccess", { profile: profileLabel }));
      await refreshSummary();
    } finally {
      setActionBusy(null);
    }
  };

  const handleResetCircuitBreakers = async () => {
    if (!globalThis.confirm(t("confirmResetBreakers"))) return;

    setActionBusy("reset");
    setActionMessage("");
    try {
      const response = await fetch("/api/monitoring/health", { method: "DELETE" });
      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        setActionMessage(json?.error || t("resetBreakersFailed"));
        return;
      }

      const json = await response.json().catch(() => ({}));
      setActionMessage(json?.message || t("resetBreakersSuccess"));
      await refreshSummary();
    } finally {
      setActionBusy(null);
    }
  };

  const totalPages = Math.max(1, Math.ceil((auditData.total || 0) / AUDIT_PAGE_SIZE));
  const currentPage = Math.floor((auditData.offset || 0) / AUDIT_PAGE_SIZE) + 1;
  const topTools = status?.activity?.topTools || [];

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-sm text-text-muted">{t("loading")}</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label={t("processStatus")} value={status?.online ? t("online") : t("offline")} />
        <StatCard label={t("pid")} value={status?.heartbeat?.pid ?? "—"} />
        <StatCard
          label={t("sessionUptime")}
          value={formatDuration(status?.heartbeat?.uptimeMs ?? null)}
        />
        <StatCard
          label={t("lastHeartbeat")}
          value={formatDuration(status?.heartbeat?.heartbeatAgeMs ?? null)}
        />
      </div>

      <Card className="p-5">
        <h2 className="text-lg font-semibold mb-4">{t("activity24h")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <StatCard label={t("totalCalls")} value={status?.activity?.totalCalls24h ?? 0} compact />
          <StatCard
            label={t("successRate")}
            value={formatPercent(status?.activity?.successRate)}
            compact
          />
          <StatCard
            label={t("avgLatency")}
            value={formatDuration(status?.activity?.avgDurationMs ?? null)}
            compact
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border p-3">
            <h3 className="text-sm font-semibold mb-2">{t("topTools")}</h3>
            {topTools.length === 0 ? (
              <p className="text-sm text-text-muted">{t("noToolCalls24h")}</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {topTools.map((entry) => (
                  <li key={entry.tool} className="flex justify-between">
                    <span className="font-mono text-xs">{entry.tool}</span>
                    <span>{entry.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-lg border border-border p-3">
            <h3 className="text-sm font-semibold mb-2">{t("runtimeDetails")}</h3>
            <div className="text-sm space-y-1">
              <p>
                {t("transport")}:{" "}
                <span className="font-mono">{status?.heartbeat?.transport || "—"}</span>
              </p>
              <p>
                {t("scopesEnforced")}:{" "}
                <span className="font-semibold">
                  {status?.heartbeat?.scopesEnforced ? t("yes") : t("no")}
                </span>
              </p>
              <p>
                {t("lastCall")}:{" "}
                <span className="font-mono text-xs">
                  {status?.activity?.lastCallTool || "—"}{" "}
                  {status?.activity?.lastCallAt
                    ? `(${new Date(status.activity.lastCallAt).toLocaleString()})`
                    : ""}
                </span>
              </p>
              <p>
                {t("heartbeatPath")}:{" "}
                <span className="font-mono text-xs break-all">{status?.heartbeatPath || "—"}</span>
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-lg font-semibold mb-4">{t("operationalControls")}</h2>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="rounded-lg border border-border p-3 space-y-3">
            <p className="text-sm font-semibold">{t("switchCombo")}</p>
            <select
              className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm"
              value={selectedComboId}
              onChange={(event) => setSelectedComboId(event.target.value)}
            >
              {combos.map((combo) => (
                <option key={combo.id} value={combo.id}>
                  {combo.name} ({combo.isActive === false ? t("inactive") : t("active")})
                </option>
              ))}
            </select>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleSwitchCombo}
              disabled={!selectedCombo || actionBusy === "switch"}
            >
              {selectedCombo?.isActive === false ? t("activateCombo") : t("deactivateCombo")}
            </Button>
          </div>

          <div className="rounded-lg border border-border p-3 space-y-3">
            <p className="text-sm font-semibold">{t("applyResilienceProfile")}</p>
            <select
              className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm"
              value={selectedProfile}
              onChange={(event) =>
                setSelectedProfile(event.target.value as keyof typeof RESILIENCE_PRESETS)
              }
            >
              <option value="aggressive">{t("profileAggressive")}</option>
              <option value="balanced">{t("profileBalanced")}</option>
              <option value="conservative">{t("profileConservative")}</option>
            </select>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleApplyResilience}
              disabled={actionBusy === "resilience"}
            >
              {t("applyProfile")}
            </Button>
          </div>

          <div className="rounded-lg border border-border p-3 space-y-3">
            <p className="text-sm font-semibold">{t("resetCircuitBreakers")}</p>
            <p className="text-xs text-text-muted">{t("resetCircuitBreakersHelp")}</p>
            <Button
              size="sm"
              onClick={handleResetCircuitBreakers}
              className="bg-red-500! hover:bg-red-600! text-white!"
              disabled={actionBusy === "reset"}
            >
              {t("resetAllBreakers")}
            </Button>
          </div>
        </div>
        {actionMessage && <p className="text-sm text-text-muted mt-3">{actionMessage}</p>}
      </Card>

      <Card className="p-5">
        <h2 className="text-lg font-semibold mb-4">{t("toolsAndScopes")}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-2">{t("tableTool")}</th>
                <th className="text-left py-2 pr-2">{t("tableScopes")}</th>
                <th className="text-left py-2 pr-2">{t("tablePhase")}</th>
                <th className="text-left py-2">{t("tableAudit")}</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.name} className="border-b border-border/40">
                  <td className="py-2 pr-2 font-mono text-xs">{tool.name}</td>
                  <td className="py-2 pr-2 text-xs">{tool.scopes.join(", ") || "—"}</td>
                  <td className="py-2 pr-2">{tool.phase}</td>
                  <td className="py-2">{tool.auditLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex flex-wrap gap-2 items-end justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">{t("auditLog")}</h2>
            <p className="text-sm text-text-muted">
              {t("auditSummary", { total: auditData.total, page: currentPage, totalPages })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              className="rounded-lg border border-border bg-bg px-3 py-2 text-sm"
              value={toolFilter}
              onChange={(event) => {
                setAuditOffset(0);
                setToolFilter(event.target.value);
              }}
            >
              <option value="">{t("allTools")}</option>
              {tools.map((tool) => (
                <option key={tool.name} value={tool.name}>
                  {tool.name}
                </option>
              ))}
            </select>
            <select
              className="rounded-lg border border-border bg-bg px-3 py-2 text-sm"
              value={successFilter}
              onChange={(event) => {
                setAuditOffset(0);
                setSuccessFilter(event.target.value as "all" | "true" | "false");
              }}
            >
              <option value="all">{t("allResults")}</option>
              <option value="true">{t("success")}</option>
              <option value="false">{t("failure")}</option>
            </select>
            <input
              className="rounded-lg border border-border bg-bg px-3 py-2 text-sm"
              placeholder={t("apiKeyIdPlaceholder")}
              value={apiKeyFilter}
              onChange={(event) => {
                setAuditOffset(0);
                setApiKeyFilter(event.target.value);
              }}
            />
          </div>
        </div>

        {auditLoading ? (
          <p className="text-sm text-text-muted">{t("loadingAuditEntries")}</p>
        ) : auditData.entries.length === 0 ? (
          <p className="text-sm text-text-muted">{t("noAuditEntriesForFilters")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-2">{t("tableTimestamp")}</th>
                  <th className="text-left py-2 pr-2">{t("tableTool")}</th>
                  <th className="text-left py-2 pr-2">{t("tableDuration")}</th>
                  <th className="text-left py-2 pr-2">{t("tableResult")}</th>
                  <th className="text-left py-2">{t("tableApiKey")}</th>
                </tr>
              </thead>
              <tbody>
                {auditData.entries.map((entry) => (
                  <tr key={entry.id} className="border-b border-border/40">
                    <td className="py-2 pr-2 text-xs">
                      {new Date(entry.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 pr-2 font-mono text-xs">{entry.toolName}</td>
                    <td className="py-2 pr-2">{entry.durationMs}ms</td>
                    <td className="py-2 pr-2">
                      <span className={entry.success ? "text-green-500" : "text-red-500"}>
                        {entry.success ? t("success") : entry.errorCode || t("failed")}
                      </span>
                    </td>
                    <td className="py-2">{entry.apiKeyId || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            size="sm"
            variant="secondary"
            disabled={auditOffset === 0}
            onClick={() => setAuditOffset((current) => Math.max(0, current - AUDIT_PAGE_SIZE))}
          >
            {t("previous")}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            disabled={auditOffset + AUDIT_PAGE_SIZE >= auditData.total}
            onClick={() =>
              setAuditOffset((current) =>
                current + AUDIT_PAGE_SIZE < auditData.total ? current + AUDIT_PAGE_SIZE : current
              )
            }
          >
            {t("next")}
          </Button>
        </div>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string | number;
  compact?: boolean;
}) {
  return (
    <div className={`rounded-lg border border-border bg-bg p-4 ${compact ? "" : "min-h-[84px]"}`}>
      <p className="text-xs text-text-muted uppercase tracking-wide">{label}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}
