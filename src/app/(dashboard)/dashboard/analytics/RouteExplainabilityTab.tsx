"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";
import Card from "@/shared/components/Card";
import { Skeleton } from "@/shared/components/Loading";
import { cn } from "@/shared/utils/cn";
import { useProviderNodeMap, resolveProviderName } from "@/lib/display/useProviderNodeMap";

type CallLogOption = {
  id: string;
  timestamp: string | null;
  status: number;
  model: string | null;
  requestedModel: string | null;
  provider: string | null;
  comboName: string | null;
  duration: number;
};

type AnalyticsTranslator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

function analyticsText(t: AnalyticsTranslator, key: string, fallback: string) {
  return typeof t.has === "function" && t.has(key) ? t(key) : fallback;
}

type ExplanationFactor = {
  name: string;
  value: string;
  status: "positive" | "warning" | "negative" | "neutral";
  weight: number;
  contribution: number;
  details: string;
};

type ExplainTarget = {
  id: string;
  timestamp: string | null;
  status: number;
  provider: string | null;
  model: string | null;
  comboStepId: string | null;
  comboExecutionKey: string | null;
  durationMs: number;
  outcome: "selected" | "related";
  reason: string;
};

type ReplayFactor = {
  key: string;
  value: number;
  weight: number;
  contribution: number;
  source: string;
  note?: string;
};

type ReplayCandidate = {
  executionKey: string;
  stepId: string | null;
  provider: string;
  model: string;
  connectionId: string | null;
  label: string | null;
  rank: number;
  score: number;
  isRuntimeSelected: boolean;
  wouldSelectNow: boolean;
  factors: ReplayFactor[];
  signals: {
    quotaRemainingPct: number | null;
    projectedQuotaRemainingPct: number | null;
    successRate: number | null;
    avgLatencyMs: number | null;
    forecastRisk: string | null;
    autopilotIssueCount: number;
  };
};

type DecisionReplay = {
  runtime: {
    source: "call_logs";
    exact: true;
    selectedCallLogId: string;
    comboName: string | null;
    comboStepId: string | null;
    comboExecutionKey: string | null;
    provider: string | null;
    model: string | null;
    connectionId: string | null;
    status: number;
    timestamp: string | null;
    durationMs: number;
  };
  recompute: null | {
    source: "comboScoringInspector";
    method: "read_only_recompute";
    exactRuntimeReplay: false;
    asOf: string;
    timeRange: "24h";
    horizon: "7d";
    comboId: string;
    comboName: string;
    strategy: string;
    taskType: "default";
    recomputedSelectedExecutionKey: string | null;
    runtimeSelectedRank: number | null;
    runtimeSelectedScore: number | null;
    alignment:
      | "matches_recomputed_top_target"
      | "differs_from_recomputed_top_target"
      | "runtime_target_missing_from_recompute"
      | "not_combo_routed";
    candidates: ReplayCandidate[];
    warnings: string[];
  };
  warnings: string[];
};

type RouteExplainabilityResponse = {
  requestId: string;
  routeType: "combo" | "direct";
  confidence: "high" | "medium" | "low";
  summary: string;
  comboUsed: string | null;
  providerSelected: string | null;
  modelUsed: string | null;
  score: number;
  latencyActual: number;
  decision: {
    status: number;
    factors: ExplanationFactor[];
    fallbacksTriggered: ExplainTarget[];
  };
  request: {
    timestamp: string | null;
    requestedModel: string | null;
    requestType: string | null;
    sourceFormat: string | null;
    targetFormat: string | null;
    cacheSource: string | null;
    apiKeyName: string | null;
  };
  selectedTarget: {
    provider: string | null;
    model: string | null;
    account: string | null;
    connectionId: string | null;
    comboStepId: string | null;
    comboExecutionKey: string | null;
    durationMs: number;
    status: number;
    tokensIn: number;
    tokensOut: number;
  };
  targetStats: {
    sampleSize: number;
    successRate: number;
    avgLatencyMs: number;
    lastStatus: "ok" | "error" | null;
    lastUsedAt: string | null;
  };
  relatedTargets: ExplainTarget[];
  evidence: Array<{ label: string; value: string; tone: ExplanationFactor["status"] }>;
  recommendations: string[];
  limitations: string[];
  decisionReplay?: DecisionReplay;
};

function formatDate(value: string | null) {
  if (!value) return "n/a";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatDuration(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "n/a";
  if (value >= 1000) return `${(value / 1000).toFixed(1)}s`;
  return `${Math.round(value)}ms`;
}

function getToneVariant(tone: ExplanationFactor["status"]) {
  if (tone === "positive") return "success" as const;
  if (tone === "warning") return "warning" as const;
  if (tone === "negative") return "error" as const;
  return "default" as const;
}

function getStatusVariant(status: number) {
  if (status >= 200 && status < 400) return "success" as const;
  if (status >= 400) return "error" as const;
  return "default" as const;
}

function RouteMetric({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-black/5 bg-black/2 p-4 dark:border-white/5 dark:bg-white/2">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
        <span className="material-symbols-outlined text-[16px]">{icon}</span>
        {label}
      </div>
      <div className="mt-2 text-xl font-semibold text-text-main">{value}</div>
    </div>
  );
}

function ExplainabilitySkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
      <Skeleton className="h-72 rounded-lg" />
      <Skeleton className="h-72 rounded-lg" />
    </div>
  );
}

function FactorCard({ factor }: { factor: ExplanationFactor }) {
  const t = useTranslations("analytics");
  const contributionPct = Math.round(factor.contribution * 100);
  const weightPct = Math.round(factor.weight * 100);

  return (
    <div className="rounded-lg border border-black/5 bg-black/2 p-4 dark:border-white/5 dark:bg-white/2">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-text-main">{factor.name}</div>
          <div className="mt-1 truncate text-xs text-text-muted">{factor.value}</div>
        </div>
        <Badge variant={getToneVariant(factor.status)} size="sm">
          {contributionPct}%
        </Badge>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
        <div className="h-full rounded-full bg-primary" style={{ width: `${contributionPct}%` }} />
      </div>
      <div className="mt-2 text-xs text-text-muted">
        {t("routeWeight", { weight: weightPct })} · {factor.details}
      </div>
    </div>
  );
}

function TargetTimeline({ targets }: { targets: ExplainTarget[] }) {
  const t = useTranslations("analytics");
  const nodeMap = useProviderNodeMap();
  if (targets.length === 0) {
    return <div className="text-sm text-text-muted">{t("routeNoRelatedEvidence")}</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      {targets.map((target) => (
        <div
          key={`${target.id}-${target.comboExecutionKey || target.comboStepId || target.provider}`}
          className={cn(
            "rounded-lg border p-4",
            target.outcome === "selected"
              ? "border-primary/30 bg-primary/5"
              : "border-black/5 bg-black/2 dark:border-white/5 dark:bg-white/2"
          )}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate text-sm font-medium text-text-main">
                  {resolveProviderName(target.provider, nodeMap)} / {target.model || t("unknown")}
                </span>
                {target.outcome === "selected" ? (
                  <Badge variant="primary" size="sm">
                    {t("selected")}
                  </Badge>
                ) : null}
              </div>
              <div className="mt-1 text-xs text-text-muted">
                {formatDate(target.timestamp)} · {target.comboStepId || t("routeNoStepId")}
              </div>
              <div className="mt-1 text-xs text-text-muted">{target.reason}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getStatusVariant(target.status)} size="sm">
                HTTP {target.status || "n/a"}
              </Badge>
              <Badge size="sm">{formatDuration(target.durationMs)}</Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function replayAlignmentLabel(
  alignment: NonNullable<DecisionReplay["recompute"]>["alignment"],
  t: ReturnType<typeof useTranslations>
) {
  if (alignment === "matches_recomputed_top_target") return t("routeMatchesTopTarget");
  if (alignment === "differs_from_recomputed_top_target") return t("routeDiffersFromTop");
  if (alignment === "runtime_target_missing_from_recompute") return t("routeTargetMissingNow");
  return t("routeNotComboRouted");
}

function replayAlignmentVariant(alignment: NonNullable<DecisionReplay["recompute"]>["alignment"]) {
  if (alignment === "matches_recomputed_top_target") return "success" as const;
  if (alignment === "differs_from_recomputed_top_target") return "warning" as const;
  if (alignment === "runtime_target_missing_from_recompute") return "error" as const;
  return "default" as const;
}

function WhyThisTargetCard({ replay }: { replay: DecisionReplay | undefined }) {
  const t = useTranslations("analytics");
  const nodeMap = useProviderNodeMap();
  if (!replay) return null;
  const recompute = replay.recompute;
  const candidates = recompute?.candidates ?? [];

  return (
    <Card title={t("routeWhyTarget")} subtitle={t("routeWhyTargetSubtitle")} icon="psychology">
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-text-main">
                {t("routeExactRuntimeLog")}
              </div>
              <div className="mt-1 truncate text-xs text-text-muted">
                {resolveProviderName(replay.runtime.provider, nodeMap)} /{" "}
                {replay.runtime.model || t("unknown")}
              </div>
              <div className="mt-1 text-xs text-text-muted">
                {formatDate(replay.runtime.timestamp)} ·{" "}
                {replay.runtime.comboStepId || t("routeNoStep")}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={getStatusVariant(replay.runtime.status)} size="sm">
                HTTP {replay.runtime.status || "n/a"}
              </Badge>
              <Badge variant="success" size="sm">
                {t("routeCallLogsExact")}
              </Badge>
            </div>
          </div>
        </div>

        {recompute ? (
          <div className="rounded-lg border border-black/5 bg-black/2 p-4 dark:border-white/5 dark:bg-white/2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-text-main">
                  {t("routeReadOnlyRecompute")}
                </div>
                <div className="mt-1 text-xs text-text-muted">
                  {recompute.comboName} · {recompute.strategy} · {recompute.timeRange} /{" "}
                  {recompute.horizon}
                </div>
              </div>
              <Badge variant={replayAlignmentVariant(recompute.alignment)} size="sm">
                {replayAlignmentLabel(recompute.alignment, t)}
              </Badge>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <RouteMetric
                icon="leaderboard"
                label={t("routeRuntimeRankNow")}
                value={recompute.runtimeSelectedRank ? `#${recompute.runtimeSelectedRank}` : "n/a"}
              />
              <RouteMetric
                icon="score"
                label={t("routeRuntimeScoreNow")}
                value={
                  recompute.runtimeSelectedScore !== null
                    ? `${Math.round(recompute.runtimeSelectedScore * 100)}%`
                    : "n/a"
                }
              />
              <RouteMetric
                icon="looks_one"
                label={t("routeWouldSelectNow")}
                value={recompute.recomputedSelectedExecutionKey || "n/a"}
              />
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-warning/20 bg-warning/10 p-4 text-sm text-text-muted">
            {t("routeNoRecomputeCandidates")}
          </div>
        )}

        {candidates.length > 0 ? (
          <div className="flex flex-col gap-2">
            {candidates.slice(0, 5).map((candidate) => (
              <div
                key={candidate.executionKey}
                className={cn(
                  "rounded-lg border p-3",
                  candidate.isRuntimeSelected
                    ? "border-primary/30 bg-primary/5"
                    : "border-black/5 bg-bg dark:border-white/5"
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-text-main">
                      <span>#{candidate.rank}</span>
                      <span className="truncate">
                        {resolveProviderName(candidate.provider, nodeMap)} / {candidate.model}
                      </span>
                      {candidate.isRuntimeSelected ? (
                        <Badge variant="primary" size="sm">
                          {t("runtime")}
                        </Badge>
                      ) : null}
                      {candidate.wouldSelectNow ? (
                        <Badge variant="success" size="sm">
                          {t("routeTopNow")}
                        </Badge>
                      ) : null}
                    </div>
                    <div className="mt-1 text-xs text-text-muted">
                      {candidate.label || candidate.stepId || candidate.executionKey}
                    </div>
                  </div>
                  <Badge size="sm">{Math.round(candidate.score * 100)}%</Badge>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {replay.warnings.length > 0 ? (
          <ul className="flex flex-col gap-2 text-xs text-text-muted">
            {replay.warnings.map((warning) => (
              <li key={warning} className="flex items-start gap-2">
                <span className="material-symbols-outlined mt-0.5 text-[15px] text-warning">
                  info
                </span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Card>
  );
}

export default function RouteExplainabilityTab({
  initialRequestId = "",
}: {
  initialRequestId?: string;
}) {
  const t = useTranslations("analytics") as AnalyticsTranslator;
  const nodeMap = useProviderNodeMap();
  const [logs, setLogs] = useState<CallLogOption[]>([]);
  const [selectedId, setSelectedId] = useState(initialRequestId);
  const [explanation, setExplanation] = useState<RouteExplainabilityResponse | null>(null);
  const [logsLoading, setLogsLoading] = useState(true);
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(
    async (signal?: AbortSignal) => {
      setLogsLoading(true);
      try {
        const response = await fetch("/api/usage/call-logs?limit=75", {
          signal,
          cache: "no-store",
        });
        if (!response.ok) throw new Error(t("routeFetchLogsFailed"));
        const data = (await response.json()) as CallLogOption[];
        setLogs(data);
        setSelectedId((current) => {
          const preferredId = current || initialRequestId;
          if (preferredId && data.some((log) => log.id === preferredId)) {
            return preferredId;
          }
          return data[0]?.id || "";
        });
        setError(null);
      } catch (fetchError) {
        if ((fetchError as Error).name === "AbortError") return;
        setError(fetchError instanceof Error ? fetchError.message : t("routeFetchLogsFailed"));
        setLogs([]);
      } finally {
        if (!signal?.aborted) setLogsLoading(false);
      }
    },
    [initialRequestId, t]
  );

  const fetchExplanation = useCallback(
    async (requestId: string, signal?: AbortSignal) => {
      if (!requestId) return;
      setExplanationLoading(true);
      try {
        const response = await fetch(`/api/usage/route-explain/${encodeURIComponent(requestId)}`, {
          signal,
          cache: "no-store",
        });
        if (!response.ok) throw new Error(t("routeExplainFailed"));
        const data = (await response.json()) as RouteExplainabilityResponse;
        setExplanation(data);
        setError(null);
      } catch (fetchError) {
        if ((fetchError as Error).name === "AbortError") return;
        setError(fetchError instanceof Error ? fetchError.message : t("routeExplainFailed"));
        setExplanation(null);
      } finally {
        if (!signal?.aborted) setExplanationLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchLogs(controller.signal);
    return () => controller.abort();
  }, [fetchLogs]);

  useEffect(() => {
    if (!selectedId) return;
    const controller = new AbortController();
    fetchExplanation(selectedId, controller.signal);
    return () => controller.abort();
  }, [fetchExplanation, selectedId]);

  useEffect(() => {
    if (!selectedId || typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (
      url.searchParams.get("tab") === "route-trace" ||
      url.searchParams.get("tab") === "route-explain"
    ) {
      url.searchParams.set("tab", "route-trace");
      url.searchParams.set("id", selectedId);
      window.history.replaceState(null, "", url.toString());
    }
  }, [selectedId]);

  const selectedLog = useMemo(
    () => logs.find((log) => log.id === selectedId) || null,
    [logs, selectedId]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl border border-black/5 bg-surface p-5 shadow-sm dark:border-white/5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-main">
            {analyticsText(t, "routeTraceTitle", "Route Trace View")}
          </h2>
          <p className="mt-1 max-w-3xl text-sm text-text-muted">
            {analyticsText(
              t,
              "routeTraceDescription",
              "Inspect the persisted request trace: selected target, routing factors, fallback evidence, current scoring replay, latency, tokens and target health."
            )}
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-2 sm:min-w-90">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            {analyticsText(t, "routeTraceRequestLog", "Request log")}
          </label>
          <select
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
            disabled={logsLoading || logs.length === 0}
            className="focus-ring rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text-main disabled:cursor-not-allowed disabled:opacity-60"
          >
            {logs.map((log) => (
              <option key={log.id} value={log.id}>
                {formatDate(log.timestamp)} · HTTP {log.status} ·{" "}
                {log.comboName || resolveProviderName(log.provider, nodeMap) || t("direct")} ·{" "}
                {log.model || log.requestedModel || log.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {logsLoading || explanationLoading ? <ExplainabilitySkeleton /> : null}

      {!logsLoading && !explanationLoading && error ? (
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <span className="material-symbols-outlined text-[40px] text-error">route_off</span>
            <div className="font-medium text-text-main">{t("routeUnableToLoad")}</div>
            <div className="text-sm text-text-muted">{error}</div>
            <button
              type="button"
              onClick={() => fetchLogs()}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              {t("retry")}
            </button>
          </div>
        </Card>
      ) : null}

      {!logsLoading && !explanationLoading && !error && logs.length === 0 ? (
        <Card className="p-10">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="material-symbols-outlined text-[40px] text-text-muted/70">route</span>
            <div className="text-base font-medium text-text-main">{t("routeNoRequestLogs")}</div>
            <div className="max-w-md text-sm text-text-muted">
              {t("routeNoRequestLogsDescription")}
            </div>
          </div>
        </Card>
      ) : null}

      {!logsLoading && !explanationLoading && explanation ? (
        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-6">
            <Card
              title={t("routeDecisionSummary")}
              subtitle={selectedLog?.id || explanation.requestId}
              icon="alt_route"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={explanation.routeType === "combo" ? "primary" : "default"}>
                    {explanation.routeType}
                  </Badge>
                  <Badge variant={getStatusVariant(explanation.selectedTarget.status)}>
                    HTTP {explanation.selectedTarget.status}
                  </Badge>
                  <Badge
                    variant={
                      explanation.confidence === "high"
                        ? "success"
                        : explanation.confidence === "medium"
                          ? "warning"
                          : "default"
                    }
                  >
                    {t("routeConfidence", { confidence: explanation.confidence })}
                  </Badge>
                </div>
                <p className="text-sm text-text-muted">{explanation.summary}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <RouteMetric
                    icon="analytics"
                    label={t("routeScore")}
                    value={`${Math.round(explanation.score * 100)}%`}
                  />
                  <RouteMetric
                    icon="timer"
                    label={t("latency")}
                    value={formatDuration(explanation.latencyActual)}
                  />
                  <RouteMetric
                    icon="task_alt"
                    label={t("routeRecentSuccess")}
                    value={`${explanation.targetStats.successRate}%`}
                  />
                  <RouteMetric
                    icon="bolt"
                    label={t("routeAvgTargetLatency")}
                    value={formatDuration(explanation.targetStats.avgLatencyMs)}
                  />
                </div>
              </div>
            </Card>

            <Card title={t("routeSelectedTarget")} icon="my_location">
              <div className="grid gap-3 text-sm">
                {[
                  [
                    t("provider"),
                    resolveProviderName(explanation.selectedTarget.provider, nodeMap),
                  ],
                  [t("model"), explanation.selectedTarget.model || t("notAvailable")],
                  [t("account"), explanation.selectedTarget.account || t("notAvailable")],
                  [t("connection"), explanation.selectedTarget.connectionId || t("notAvailable")],
                  [t("combo"), explanation.comboUsed || t("direct")],
                  [t("routeStep"), explanation.selectedTarget.comboStepId || t("notAvailable")],
                  [
                    t("tokens"),
                    t("routeTokenCounts", {
                      input: explanation.selectedTarget.tokensIn.toLocaleString(),
                      output: explanation.selectedTarget.tokensOut.toLocaleString(),
                    }),
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-4 border-b border-black/5 pb-2 last:border-b-0 last:pb-0 dark:border-white/5"
                  >
                    <span className="text-text-muted">{label}</span>
                    <span className="max-w-[65%] truncate text-right font-medium text-text-main">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <WhyThisTargetCard replay={explanation.decisionReplay} />

            <Card title={t("routeEvidence")} icon="fact_check">
              <div className="flex flex-col gap-2">
                {explanation.evidence.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 rounded-lg bg-black/2 px-3 py-2 text-sm dark:bg-white/2"
                  >
                    <span className="text-text-muted">{item.label}</span>
                    <Badge variant={getToneVariant(item.tone)} size="sm">
                      {item.value}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card title={t("routeFactors")} subtitle={t("routeFactorsSubtitle")} icon="schema">
              <div className="grid gap-3 lg:grid-cols-2">
                {explanation.decision.factors.map((factor) => (
                  <FactorCard key={factor.name} factor={factor} />
                ))}
              </div>
            </Card>

            <Card
              title={t("routeFallbackTimeline")}
              subtitle={t("routeFallbackTimelineSubtitle")}
              icon="timeline"
            >
              <TargetTimeline targets={explanation.relatedTargets} />
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card title={t("routeRecommendations")} icon="tips_and_updates">
                <ul className="flex flex-col gap-2 text-sm text-text-muted">
                  {explanation.recommendations.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="material-symbols-outlined mt-0.5 text-[16px] text-primary">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card title={t("routeLimitations")} icon="info">
                {explanation.limitations.length > 0 ? (
                  <ul className="flex flex-col gap-2 text-sm text-text-muted">
                    {explanation.limitations.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="material-symbols-outlined mt-0.5 text-[16px] text-warning">
                          info
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-text-muted">{t("routeNoKnownLimitations")}</div>
                )}
              </Card>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
