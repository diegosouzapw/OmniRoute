"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import Badge from "@/shared/components/Badge";
import { Card } from "@/shared/components";
import { getProviderDisplayName } from "@/lib/display/names";
import { cn } from "@/shared/utils/cn";

type HealthState = "healthy" | "degraded" | "down";
type ModelStatus = "healthy" | "degraded" | "error" | "locked" | "idle";
type RangeValue = "1h" | "24h" | "7d" | "30d";

type HealthMatrixModel = {
  model: string;
  status: ModelStatus;
  isLockedOut: boolean;
  lockoutReason: string | null;
  lockoutRemainingMs: number;
  requests: number;
  successRate: number | null;
  avgLatencyMs: number | null;
  lastStatus: number | null;
  lastErrorStatus: number | null;
  lastRequestAt: string | null;
  lastErrorAt: string | null;
};

type HealthMatrixAccount = {
  connectionId: string | null;
  label: string;
  isSynthetic: boolean;
  isActive: boolean;
  state: HealthState;
  testStatus: string | null;
  rateLimitedUntil: string | null;
  cooldownRemainingMs: number;
  lastErrorType: string | null;
  errorCode: string | null;
  backoffLevel: number;
  modelCount: number;
  issueCount: number;
  models: HealthMatrixModel[];
};

type HealthMatrixProvider = {
  provider: string;
  state: HealthState;
  score: number;
  circuitBreaker: {
    state: string;
    failureCount: number;
    retryAfterMs: number;
    lastFailureTime: number | null;
  } | null;
  connections: {
    total: number;
    active: number;
    cooldown: number;
    inactive: number;
    terminal: number;
  };
  modelLockoutCount: number;
  requests: number;
  successRate: number | null;
  avgLatencyMs: number | null;
  lastRequestAt: string | null;
  lastErrorAt: string | null;
  issueCount: number;
  accounts: HealthMatrixAccount[];
};

type HealthMatrixResponse = {
  checkedAt: string;
  range: RangeValue;
  summary: {
    providerCount: number;
    connectionCount: number;
    modelCount: number;
    issueCount: number;
    healthyCount: number;
    degradedCount: number;
    downCount: number;
  };
  providers: HealthMatrixProvider[];
};

type HealthMessageTranslator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

function healthText(
  t: HealthMessageTranslator,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
): string {
  if (typeof t.has === "function" && t.has(key)) return t(key, values);
  if (!values) return fallback;
  return Object.entries(values).reduce(
    (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
    fallback
  );
}

function formatDuration(ms: number | null | undefined, t?: HealthMessageTranslator): string {
  if (!ms || !Number.isFinite(ms) || ms <= 0)
    return t ? healthText(t, "notAvailable", "n/a") : "n/a";
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.round(ms)}ms`;
}

function formatDate(
  value: string | number | null | undefined,
  t?: HealthMessageTranslator
): string {
  if (!value) return t ? healthText(t, "notAvailable", "n/a") : "n/a";
  const date = typeof value === "number" ? new Date(value) : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function stateVariant(state: HealthState) {
  if (state === "healthy") return "success" as const;
  if (state === "degraded") return "warning" as const;
  return "error" as const;
}

function modelVariant(status: ModelStatus) {
  if (status === "healthy") return "success" as const;
  if (status === "degraded" || status === "locked") return "warning" as const;
  if (status === "error") return "error" as const;
  return "default" as const;
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-surface/50 p-3">
      <p className="text-xs uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-text-main">{value}</p>
    </div>
  );
}

function ModelPill({ model }: { model: HealthMatrixModel }) {
  const t = useTranslations("health");
  const successRateLabel =
    model.successRate === null ? healthText(t, "notAvailable", "n/a") : `${model.successRate}%`;
  return (
    <div
      className={cn(
        "rounded-lg border px-3 py-2 text-xs",
        model.status === "healthy" && "border-green-500/20 bg-green-500/5",
        model.status === "degraded" && "border-yellow-500/20 bg-yellow-500/5",
        model.status === "locked" && "border-amber-500/20 bg-amber-500/5",
        model.status === "error" && "border-red-500/20 bg-red-500/5",
        model.status === "idle" && "border-border bg-bg-subtle/60"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-medium text-text-main" title={model.model}>
            {model.model}
          </p>
          <p className="mt-1 text-text-muted">
            {healthText(
              t,
              "modelPillSummary",
              "{requests} req · {successRate} success · {latency} avg",
              {
                requests: model.requests.toLocaleString(),
                successRate: successRateLabel,
                latency: formatDuration(model.avgLatencyMs, t),
              }
            )}
          </p>
          {model.isLockedOut ? (
            <p className="mt-1 text-amber-500">
              {healthText(t, "modelLockoutSummary", "{reason} · {duration} left", {
                reason: model.lockoutReason || healthText(t, "locked", "locked"),
                duration: formatDuration(model.lockoutRemainingMs, t),
              })}
            </p>
          ) : null}
        </div>
        <Badge variant={modelVariant(model.status)} size="sm" dot>
          {model.status}
        </Badge>
      </div>
    </div>
  );
}

function AccountRow({ account }: { account: HealthMatrixAccount }) {
  const t = useTranslations("health");
  const visibleModels = account.models.slice(0, 8);
  const hiddenCount = Math.max(0, account.models.length - visibleModels.length);
  const additionalModelsLabel = t.has("additionalModels")
    ? t("additionalModels", { count: hiddenCount })
    : `+${hiddenCount} more models`;

  return (
    <div className="rounded-xl border border-border bg-bg p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-text-main" title={account.label}>
              {account.label}
            </p>
            {account.isSynthetic ? (
              <Badge variant="info" size="sm">
                {healthText(t, "inferred", "inferred")}
              </Badge>
            ) : null}
            {!account.isActive ? (
              <Badge variant="error" size="sm">
                {healthText(t, "inactive", "inactive")}
              </Badge>
            ) : null}
          </div>
          <p className="mt-1 text-xs text-text-muted">
            {healthText(t, "accountModelSummary", "{connectionId} · {count} models", {
              connectionId:
                account.connectionId || healthText(t, "noConnectionId", "no connection id"),
              count: account.modelCount,
            })}
          </p>
          {account.lastErrorType || account.errorCode || account.cooldownRemainingMs > 0 ? (
            <p className="mt-1 text-xs text-amber-500">
              {account.lastErrorType || account.errorCode || healthText(t, "cooldown", "cooldown")}
              {account.cooldownRemainingMs > 0
                ? ` · ${healthText(t, "durationRemaining", "{duration} remaining", {
                    duration: formatDuration(account.cooldownRemainingMs, t),
                  })}`
                : ""}
            </p>
          ) : null}
        </div>
        <Badge variant={stateVariant(account.state)} size="sm" dot>
          {account.state}
        </Badge>
      </div>
      {visibleModels.length > 0 ? (
        <div className="mt-3 grid gap-2 lg:grid-cols-2">
          {visibleModels.map((model) => (
            <ModelPill key={`${account.connectionId || "none"}-${model.model}`} model={model} />
          ))}
          {hiddenCount > 0 ? (
            <div className="rounded-lg border border-dashed border-border px-3 py-2 text-xs text-text-muted">
              {additionalModelsLabel}
            </div>
          ) : null}
        </div>
      ) : (
        <p className="mt-3 text-sm text-text-muted">
          {healthText(t, "noSyncedModelsOrTraffic", "No synced models or recent traffic yet.")}
        </p>
      )}
    </div>
  );
}

export default function ProviderHealthMatrixCard() {
  const t = useTranslations("health");
  const [data, setData] = useState<HealthMatrixResponse | null>(null);
  const [range, setRange] = useState<RangeValue>("24h");
  const [providerFilter, setProviderFilter] = useState("");
  const [onlyIssues, setOnlyIssues] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatrix = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        range,
        includeHealthy: onlyIssues ? "false" : "true",
      });
      if (providerFilter.trim()) params.set("provider", providerFilter.trim());
      const response = await fetch(`/api/providers/health-matrix?${params.toString()}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const next = (await response.json()) as HealthMatrixResponse;
      setData(next);
      setExpanded((current) => current || next.providers[0]?.provider || null);
      setError(null);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to load matrix");
    } finally {
      setLoading(false);
    }
  }, [onlyIssues, providerFilter, range]);

  useEffect(() => {
    fetchMatrix();
    const id = setInterval(fetchMatrix, 30000);
    return () => clearInterval(id);
  }, [fetchMatrix]);

  const providers = useMemo(() => data?.providers ?? [], [data?.providers]);
  const providerOptions = useMemo(() => providers.map((entry) => entry.provider), [providers]);

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-main">
                {healthText(t, "providerHealthMatrixTitle", "Provider Health Matrix")}
              </h2>
              <p className="text-sm text-text-muted">
                {healthText(
                  t,
                  "providerHealthMatrixDescription",
                  "Provider × account × model states from breakers, cooldowns, lockouts and logs."
                )}
              </p>
            </div>
          </div>
          {data ? (
            <p className="mt-2 text-xs text-text-muted">
              {healthText(t, "updatedAt", "Updated {time}", {
                time: formatDate(data.checkedAt, t),
              })}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={range}
            onChange={(event) => setRange(event.target.value as RangeValue)}
            className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-main"
            aria-label={healthText(t, "healthMatrixRange", "Health matrix range")}
          >
            <option value="1h">1h</option>
            <option value="24h">24h</option>
            <option value="7d">7d</option>
            <option value="30d">30d</option>
          </select>
          <input
            value={providerFilter}
            onChange={(event) => setProviderFilter(event.target.value)}
            list="provider-health-matrix-providers"
            placeholder={healthText(t, "providerFilter", "Provider filter")}
            className="w-44 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-main"
          />
          <datalist id="provider-health-matrix-providers">
            {providerOptions.map((provider) => (
              <option key={provider} value={provider} />
            ))}
          </datalist>
          <button
            type="button"
            onClick={() => setOnlyIssues((value) => !value)}
            className={cn(
              "rounded-lg border px-3 py-2 text-sm transition-colors",
              onlyIssues
                ? "border-warning/40 bg-warning/10 text-warning"
                : "border-border bg-bg text-text-muted hover:text-text-main"
            )}
          >
            {healthText(t, "onlyIssues", "Only issues")}
          </button>
          <button
            type="button"
            onClick={fetchMatrix}
            disabled={loading}
            className="rounded-lg bg-primary/10 px-3 py-2 text-sm text-primary transition-colors hover:bg-primary/20 disabled:opacity-60"
          >
            {healthText(t, "refresh", "Refresh")}
          </button>
        </div>
      </div>

      {data ? (
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-6">
          <Metric
            label={healthText(t, "providers", "Providers")}
            value={data.summary.providerCount}
          />
          <Metric
            label={healthText(t, "accounts", "Accounts")}
            value={data.summary.connectionCount}
          />
          <Metric label={healthText(t, "models", "Models")} value={data.summary.modelCount} />
          <Metric label={healthText(t, "issues", "Issues")} value={data.summary.issueCount} />
          <Metric
            label={healthText(t, "degraded", "Degraded")}
            value={data.summary.degradedCount}
          />
          <Metric label={healthText(t, "down", "Down")} value={data.summary.downCount} />
        </div>
      ) : null}

      {loading && !data ? (
        <div className="mt-6 rounded-xl border border-border bg-bg-subtle p-8 text-center text-text-muted">
          {healthText(t, "loadingProviderHealthMatrix", "Loading provider health matrix...")}
        </div>
      ) : null}

      {error ? (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {healthText(
            t,
            "failedProviderHealthMatrix",
            "Failed to load Provider Health Matrix: {error}",
            {
              error,
            }
          )}
        </div>
      ) : null}

      {!loading && !error && providers.length === 0 ? (
        <div className="mt-6 rounded-xl border border-border bg-bg-subtle p-8 text-center text-text-muted">
          {healthText(t, "noProvidersMatchedFilters", "No providers matched the current filters.")}
        </div>
      ) : null}

      <div className="mt-5 space-y-3">
        {providers.map((provider) => {
          const isExpanded = expanded === provider.provider;
          return (
            <div key={provider.provider} className="rounded-xl border border-border bg-surface/50">
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : provider.provider)}
                className="flex w-full flex-col gap-3 p-4 text-left lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-sm font-semibold text-text-main">
                      {getProviderDisplayName(provider.provider)}
                    </span>
                    <span className="font-mono text-xs text-text-muted">{provider.provider}</span>
                    <Badge variant={stateVariant(provider.state)} size="sm" dot>
                      {provider.state}
                    </Badge>
                    {provider.circuitBreaker ? (
                      <Badge
                        variant={
                          provider.circuitBreaker.state === "OPEN"
                            ? "error"
                            : provider.circuitBreaker.state === "HALF_OPEN"
                              ? "warning"
                              : "success"
                        }
                        size="sm"
                      >
                        CB {provider.circuitBreaker.state}
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-text-muted">
                    {healthText(
                      t,
                      "providerRowSummary",
                      "{active}/{total} active accounts · {requests} req · {successRate} success · {latency} avg",
                      {
                        active: provider.connections.active,
                        total: provider.connections.total,
                        requests: provider.requests.toLocaleString(),
                        successRate:
                          provider.successRate === null
                            ? healthText(t, "notAvailable", "n/a")
                            : `${provider.successRate}%`,
                        latency: formatDuration(provider.avgLatencyMs, t),
                      }
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {provider.connections.cooldown > 0 ? (
                    <Badge variant="warning" size="sm">
                      {healthText(t, "cooldownCount", "{count} cooldown", {
                        count: provider.connections.cooldown,
                      })}
                    </Badge>
                  ) : null}
                  {provider.modelLockoutCount > 0 ? (
                    <Badge variant="warning" size="sm">
                      {healthText(t, "lockoutCount", "{count} lockouts", {
                        count: provider.modelLockoutCount,
                      })}
                    </Badge>
                  ) : null}
                  {provider.issueCount > 0 ? (
                    <Badge variant="error" size="sm">
                      {healthText(t, "issueCount", "{count} issues", {
                        count: provider.issueCount,
                      })}
                    </Badge>
                  ) : null}
                  <span className="material-symbols-outlined text-[18px] text-text-muted">
                    {isExpanded ? "expand_less" : "expand_more"}
                  </span>
                </div>
              </button>
              {isExpanded ? (
                <div className="border-t border-border p-4 pt-3">
                  <div className="grid gap-3 lg:grid-cols-4">
                    <Metric
                      label={healthText(t, "score", "Score")}
                      value={`${Math.round(provider.score * 100)}%`}
                    />
                    <Metric
                      label={healthText(t, "lastRequest", "Last request")}
                      value={formatDate(provider.lastRequestAt, t)}
                    />
                    <Metric
                      label={healthText(t, "lastError", "Last error")}
                      value={formatDate(provider.lastErrorAt, t)}
                    />
                    <Metric
                      label={healthText(t, "inactive", "Inactive")}
                      value={provider.connections.inactive}
                    />
                  </div>
                  <div className="mt-3 space-y-3">
                    {provider.accounts.map((account) => (
                      <AccountRow
                        key={`${provider.provider}-${account.connectionId || "none"}`}
                        account={account}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
