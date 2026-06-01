"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "@/shared/components";
import { getProviderDisplayName } from "@/lib/display/names";

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
  severity: "info" | "warning" | "critical";
  title: string;
  recommendation: string;
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

function formatConnectionEvidence(issue: AutopilotIssue): string | null {
  const evidence = issue.evidence || {};
  const parts: string[] = [];
  if (typeof evidence.label === "string") parts.push(evidence.label);
  if (typeof evidence.remainingMs === "number" && evidence.remainingMs > 0) {
    parts.push(`remaining ${Math.ceil(evidence.remainingMs / 1000)}s`);
  }
  if (typeof evidence.errorCode === "string" || typeof evidence.errorCode === "number") {
    parts.push(`code ${evidence.errorCode}`);
  }
  if (typeof evidence.lastErrorType === "string") parts.push(evidence.lastErrorType);
  return parts.length > 0 ? parts.join(" · ") : null;
}

export default function ProviderHealthAutopilotCard() {
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
      setError(err instanceof Error ? err.message : "Failed to load autopilot report");
    } finally {
      setLoading(false);
    }
  }, []);

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
      if (action.requiresConfirmation && !confirm(`${action.label}?\n\n${issue.recommendation}`)) {
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
        setMessage(`${action.label} applied.`);
        await load();
      } catch (err) {
        setMessage(err instanceof Error ? err.message : "Autopilot action failed");
      } finally {
        setBusyAction(null);
      }
    },
    [load]
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
              <h2 className="text-lg font-semibold text-text-main">Provider Health Autopilot</h2>
              <p className="text-sm text-text-muted">
                Finds unstable providers, account cooldowns, stale errors, and safe manual fixes.
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => void load()}
          disabled={loading}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main transition-colors hover:bg-surface/80 disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <div
          className={`rounded-xl border px-3 py-2 ${STATUS_STYLES[report?.status || "healthy"]}`}
        >
          <p className="text-xs uppercase tracking-wide opacity-80">Status</p>
          <p className="text-lg font-semibold capitalize">{report?.status || "loading"}</p>
        </div>
        <div className="rounded-xl border border-border bg-bg-subtle px-3 py-2">
          <p className="text-xs uppercase tracking-wide text-text-muted">Issues</p>
          <p className="text-lg font-semibold text-text-main">{report?.summary.issueCount ?? 0}</p>
        </div>
        <div className="rounded-xl border border-border bg-bg-subtle px-3 py-2">
          <p className="text-xs uppercase tracking-wide text-text-muted">Actions</p>
          <p className="text-lg font-semibold text-text-main">
            {report?.summary.actionableCount ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-bg-subtle px-3 py-2">
          <p className="text-xs uppercase tracking-wide text-text-muted">Connections</p>
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
        <p className="mt-4 text-sm text-text-muted">Loading provider recommendations...</p>
      ) : topProviders.length === 0 ? (
        <p className="mt-4 text-sm text-text-muted">
          No provider health recommendations right now.
        </p>
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
                    {getProviderDisplayName(provider.provider)}
                  </h3>
                  <p className="text-xs text-text-muted">
                    score {(provider.score * 100).toFixed(0)}% · active{" "}
                    {provider.signals.connections.active}/{provider.signals.connections.total} ·{" "}
                    cooldown {provider.signals.connections.cooldown} · model lockouts{" "}
                    {provider.signals.modelLockouts}
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
                  {provider.state}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                {[...provider.issues]
                  .sort(
                    (left, right) => SEVERITY_RANK[left.severity] - SEVERITY_RANK[right.severity]
                  )
                  .slice(0, 4)
                  .map((issue) => (
                    <div key={issue.id} className="rounded-lg border border-border bg-surface p-3">
                      <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${SEVERITY_STYLES[issue.severity]}`}
                            >
                              {issue.severity}
                            </span>
                            <p className="text-sm font-medium text-text-main">{issue.title}</p>
                          </div>
                          <p className="mt-1 text-xs text-text-muted">{issue.recommendation}</p>
                          {formatConnectionEvidence(issue) && (
                            <p className="mt-1 text-xs text-text-muted">
                              {formatConnectionEvidence(issue)}
                            </p>
                          )}
                        </div>
                        {issue.actions.length > 0 && (
                          <div className="flex flex-wrap gap-2 lg:justify-end">
                            {issue.actions.map((action) => {
                              const busy = busyAction === `${issue.id}:${action.type}`;
                              return (
                                <button
                                  key={`${issue.id}:${action.type}`}
                                  onClick={() => void applyAction(issue, action)}
                                  disabled={busy || Boolean(busyAction)}
                                  className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
                                >
                                  {busy ? "Applying..." : action.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
