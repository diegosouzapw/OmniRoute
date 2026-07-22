"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";
import { getProviderDisplayName } from "@/lib/display/names";
import { useProviderNodeMap, resolveProviderName } from "@/lib/display/useProviderNodeMap";

type AutopilotAction = {
  type: string;
  label: string;
  risk: "low" | "medium" | "high";
  requiresConfirmation: boolean;
  target: {
    provider: string;
    connectionId?: string;
    model?: string;
  };
  preconditionsHash: string;
};

type AutopilotIssue = {
  id: string;
  kind: string;
  severity: "info" | "warning" | "critical";
  title: string;
  recommendation: string;
  target: AutopilotAction["target"];
  evidence?: Record<string, unknown>;
  actions: AutopilotAction[];
};

type AutopilotProvider = {
  provider: string;
  state: "healthy" | "degraded" | "down";
  score: number;
  signals: {
    connections: {
      total: number;
      active: number;
      cooldown: number;
      terminal: number;
      staleErrors: number;
    };
    modelLockouts: number;
  };
  issues: AutopilotIssue[];
};

type AutopilotReport = {
  status: "healthy" | "warning" | "critical";
  checkedAt: string;
  summary: {
    providerCount: number;
    connectionCount: number;
    issueCount: number;
    actionableCount: number;
  };
  providers: AutopilotProvider[];
};

const STATUS_STYLES: Record<AutopilotReport["status"], string> = {
  healthy: "bg-green-500/10 text-green-400 border-green-500/20",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
};

const SEVERITY_STYLES: Record<AutopilotIssue["severity"], string> = {
  info: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  warning: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  critical: "bg-red-500/10 text-red-300 border-red-500/20",
};

const SEVERITY_RANK: Record<AutopilotIssue["severity"], number> = {
  critical: 0,
  warning: 1,
  info: 2,
};

function getErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback;
  const record = payload as { error?: unknown };
  if (typeof record.error === "string") return record.error;
  if (record.error && typeof record.error === "object") {
    const nested = record.error as { message?: unknown };
    if (typeof nested.message === "string") return nested.message;
  }
  return fallback;
}

function formatConnectionEvidence(
  issue: AutopilotIssue,
  t: ReturnType<typeof useTranslations>
): string | null {
  const evidence = issue.evidence || {};
  const parts: string[] = [];
  if (typeof evidence.label === "string") parts.push(evidence.label);
  if (typeof evidence.remainingMs === "number" && evidence.remainingMs > 0) {
    parts.push(t("remainingSeconds", { seconds: Math.ceil(evidence.remainingMs / 1000) }));
  }
  if (typeof evidence.errorCode === "string" || typeof evidence.errorCode === "number") {
    parts.push(t("errorCode", { code: String(evidence.errorCode) }));
  }
  if (typeof evidence.lastErrorType === "string") parts.push(evidence.lastErrorType);
  return parts.length > 0 ? parts.join(" · ") : null;
}

function issueText(
  issue: AutopilotIssue,
  field: "title" | "recommendation",
  t: ReturnType<typeof useTranslations>
) {
  const label = typeof issue.evidence?.label === "string" ? issue.evidence.label : "";
  const model = issue.target.model ?? "";
  const status = typeof issue.evidence?.status === "string" ? issue.evidence.status : "";
  const keys: Record<string, { title: string; recommendation: string }> = {
    provider_circuit_open: {
      title: "issue.circuitOpenTitle",
      recommendation: "issue.circuitOpenRecommendation",
    },
    provider_circuit_half_open: {
      title: "issue.circuitRecoveryTitle",
      recommendation: "issue.circuitRecoveryRecommendation",
    },
    terminal_connection_error: {
      title: "issue.terminalTitle",
      recommendation: "issue.terminalRecommendation",
    },
    connection_cooldown: {
      title: "issue.cooldownTitle",
      recommendation: "issue.cooldownRecommendation",
    },
    stale_connection_error: {
      title: "issue.staleErrorTitle",
      recommendation: "issue.staleErrorRecommendation",
    },
    inactive_connection: {
      title: "issue.inactiveTitle",
      recommendation: "issue.inactiveRecommendation",
    },
    model_lockout: {
      title: "issue.modelLockoutTitle",
      recommendation: "issue.modelLockoutRecommendation",
    },
    quota_monitor_warning: {
      title: "issue.quotaTitle",
      recommendation: "issue.quotaRecommendation",
    },
  };
  const key = keys[issue.kind]?.[field];
  return key ? t(key, { label, model, status }) : issue[field];
}

function actionLabel(action: AutopilotAction, t: ReturnType<typeof useTranslations>) {
  const keys: Record<string, string> = {
    clear_provider_breaker: "action.resetProviderBreaker",
    clear_connection_cooldown: "action.clearConnectionCooldown",
    deactivate_connection: "action.disableConnection",
    clear_stale_connection_error: "action.clearStaleError",
    reactivate_connection: "action.reactivateConnection",
    clear_model_lockout: "action.clearModelLockout",
  };
  return keys[action.type] ? t(keys[action.type]) : action.label;
}

function ProviderIssues({
  issues,
  busyAction,
  onApply,
}: {
  issues: AutopilotIssue[];
  busyAction: string | null;
  onApply: (issue: AutopilotIssue, action: AutopilotAction) => Promise<void>;
}) {
  const t = useTranslations("providerHealthAutopilot");
  const orderedIssues = [...issues]
    .sort((left, right) => SEVERITY_RANK[left.severity] - SEVERITY_RANK[right.severity])
    .slice(0, 4);
  return (
    <div className="mt-3 space-y-2">
      {orderedIssues.map((issue) => {
        const evidence = formatConnectionEvidence(issue, t);
        return (
          <div key={issue.id} className="rounded-lg border border-border bg-surface p-3">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${SEVERITY_STYLES[issue.severity]}`}
                  >
                    {t(`severity.${issue.severity}`)}
                  </span>
                  <p className="text-sm font-medium text-text-main">
                    {issueText(issue, "title", t)}
                  </p>
                </div>
                <p className="mt-1 text-xs text-text-muted">
                  {issueText(issue, "recommendation", t)}
                </p>
                {evidence && <p className="mt-1 text-xs text-text-muted">{evidence}</p>}
              </div>
              {issue.actions.length > 0 && (
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {issue.actions.map((action) => {
                    const busy = busyAction === `${issue.id}:${action.type}`;
                    return (
                      <button
                        key={`${issue.id}:${action.type}`}
                        onClick={() => void onApply(issue, action)}
                        disabled={busy || Boolean(busyAction)}
                        className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
                      >
                        {busy ? t("applying") : actionLabel(action, t)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ProviderHealthAutopilotCard() {
  const t = useTranslations("providerHealthAutopilot");
  const nodeMap = useProviderNodeMap();
  const [report, setReport] = useState<AutopilotReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/providers/health-autopilot?includeHealthy=false", {
        cache: "no-store",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(getErrorMessage(json, `HTTP ${res.status}`));
      setReport(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("loadFailed"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void load();
    const timer = setInterval(() => void load(), 15000);
    return () => clearInterval(timer);
  }, [load]);

  const topProviders = useMemo(
    () =>
      [...(report?.providers ?? [])].sort((left, right) => left.score - right.score).slice(0, 6),
    [report]
  );

  const applyAction = useCallback(
    async (issue: AutopilotIssue, action: AutopilotAction) => {
      const localizedAction = actionLabel(action, t);
      const localizedRecommendation = issueText(issue, "recommendation", t);
      if (
        action.requiresConfirmation &&
        !confirm(`${localizedAction}?\n\n${localizedRecommendation}`)
      ) {
        return;
      }

      setBusyAction(`${issue.id}:${action.type}`);
      setMessage(null);
      try {
        const res = await fetch("/api/providers/health-autopilot/actions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: action.type,
            target: action.target,
            preconditionsHash: action.preconditionsHash,
            confirm: true,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(getErrorMessage(json, `HTTP ${res.status}`));
        setMessage(t("actionApplied", { action: localizedAction }));
        await load();
      } catch (err) {
        setMessage(err instanceof Error ? err.message : t("actionFailed"));
      } finally {
        setBusyAction(null);
      }
    },
    [load, t]
  );

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-main">{t("title")}</h2>
              <p className="text-sm text-text-muted">{t("description")}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => void load()}
          disabled={loading}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main transition-colors hover:bg-surface/80 disabled:opacity-50"
        >
          {t("refresh")}
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <div
          className={`rounded-xl border px-3 py-2 ${STATUS_STYLES[report?.status || "healthy"]}`}
        >
          <p className="text-xs uppercase tracking-wide opacity-80">{t("status")}</p>
          <p className="text-lg font-semibold capitalize">
            {t(`state.${report?.status || "loading"}`)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-bg-subtle px-3 py-2">
          <p className="text-xs uppercase tracking-wide text-text-muted">{t("issues")}</p>
          <p className="text-lg font-semibold text-text-main">{report?.summary.issueCount ?? 0}</p>
        </div>
        <div className="rounded-xl border border-border bg-bg-subtle px-3 py-2">
          <p className="text-xs uppercase tracking-wide text-text-muted">{t("actions")}</p>
          <p className="text-lg font-semibold text-text-main">
            {report?.summary.actionableCount ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-bg-subtle px-3 py-2">
          <p className="text-xs uppercase tracking-wide text-text-muted">{t("connections")}</p>
          <p className="text-lg font-semibold text-text-main">
            {report?.summary.connectionCount ?? 0}
          </p>
        </div>
      </div>

      {message && (
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-sm text-primary">
          {message}
        </div>
      )}

      {error ? (
        <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </div>
      ) : loading && !report ? (
        <p className="mt-4 text-sm text-text-muted">{t("loadingRecommendations")}</p>
      ) : topProviders.length === 0 ? (
        <p className="mt-4 text-sm text-text-muted">{t("noRecommendations")}</p>
      ) : (
        <div className="mt-4 space-y-3">
          {topProviders.map((provider) => (
            <div
              key={provider.provider}
              className="rounded-xl border border-border bg-bg-subtle p-4"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-text-main">
                    {resolveProviderName(provider.provider, nodeMap)}
                  </h3>
                  <p className="text-xs text-text-muted">
                    {t("providerMetrics", {
                      score: (provider.score * 100).toFixed(0),
                      active: provider.signals.connections.active,
                      total: provider.signals.connections.total,
                      cooldown: provider.signals.connections.cooldown,
                      lockouts: provider.signals.modelLockouts,
                    })}
                  </p>
                </div>
                <span
                  className={`w-fit rounded-full border px-2 py-1 text-xs font-medium ${
                    provider.state === "down"
                      ? "border-red-500/20 bg-red-500/10 text-red-300"
                      : provider.state === "degraded"
                        ? "border-amber-500/20 bg-amber-500/10 text-amber-300"
                        : "border-green-500/20 bg-green-500/10 text-green-300"
                  }`}
                >
                  {t(`providerState.${provider.state}`)}
                </span>
              </div>

              <ProviderIssues
                issues={provider.issues}
                busyAction={busyAction}
                onApply={applyAction}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
