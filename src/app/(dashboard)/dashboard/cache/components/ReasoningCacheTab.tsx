"use client";

import { useState, useEffect, useCallback } from "react";
import { Button, EmptyState } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";

// ──────────────── Types ────────────────

interface ReasoningCacheEntry {
  toolCallId: string;
  provider: string;
  model: string;
  reasoning: string;
  charCount: number;
  createdAt: string;
  expiresAt: string;
}

interface ReasoningCacheStats {
  memoryEntries: number;
  dbEntries: number;
  totalEntries: number;
  totalChars: number;
  hits: number;
  misses: number;
  replays: number;
  replayRate: string;
  byProvider: Record<string, { entries: number; chars: number }>;
  byModel: Record<string, { entries: number; chars: number }>;
  oldestEntry: string | null;
  newestEntry: string | null;
}

interface ReasoningCacheData {
  stats: ReasoningCacheStats;
  entries: ReasoningCacheEntry[];
}

// ──────────────── Helpers ────────────────

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatChars(chars: number): string {
  if (chars >= 1_000_000) return `${(chars / 1_000_000).toFixed(1)}M`;
  if (chars >= 1_000) return `${(chars / 1_000).toFixed(1)}K`;
  return String(chars);
}

// ──────────────── Sub-Components ────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  accent = "text-text-main",
}: {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/30 bg-surface-raised/70 p-4">
      <div className="flex items-center gap-1.5 text-xs text-text-muted">
        <span className="material-symbols-outlined text-base leading-none" aria-hidden="true">
          {icon}
        </span>
        <span>{label}</span>
      </div>
      <div className={`mt-3 text-2xl font-semibold tabular-nums ${accent}`}>{value}</div>
      {sub && <div className="mt-1 text-xs text-text-muted">{sub}</div>}
    </div>
  );
}

function SectionBadge({
  icon,
  children,
  tone = "neutral",
}: {
  icon: string;
  children: React.ReactNode;
  tone?: "neutral" | "green" | "amber" | "blue";
}) {
  const toneClass =
    tone === "green"
      ? "border-green-500/20 bg-green-500/10 text-green-300"
      : tone === "amber"
        ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
        : tone === "blue"
          ? "border-blue-400/20 bg-blue-400/10 text-blue-300"
          : "border-border/40 bg-surface/50 text-text-muted";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] ${toneClass}`}
    >
      <span className="material-symbols-outlined text-sm leading-none" aria-hidden="true">
        {icon}
      </span>
      {children}
    </span>
  );
}

function InfoRow({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2 text-sm text-text-muted">
      <span
        className="material-symbols-outlined shrink-0 text-base leading-5 text-blue-400"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span>{children}</span>
    </div>
  );
}

// ──────────────── Main Component ────────────────

const REFRESH_INTERVAL_MS = 10_000;

export default function ReasoningCacheTab() {
  const t = useTranslations("cache");
  const notify = useNotificationStore();

  const [data, setData] = useState<ReasoningCacheData | null>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/cache/reasoning");
      if (res.ok) {
        const json: ReasoningCacheData = await res.json();
        setData(json);
      }
    } catch (error) {
      console.error("[ReasoningCacheTab] Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
    const id = setInterval(() => void fetchData(), REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchData]);

  const handleClear = async () => {
    setClearing(true);
    try {
      const res = await fetch("/api/cache/reasoning", { method: "DELETE" });
      if (res.ok) {
        const result = await res.json();
        notify.success(t("reasoningClearSuccess", { count: result.cleared ?? 0 }));
        await fetchData();
      } else {
        notify.error(t("reasoningClearError"));
      }
    } catch {
      notify.error(t("reasoningClearError"));
    } finally {
      setClearing(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4" aria-busy="true">
        <div className="h-32 rounded-2xl bg-surface-raised animate-pulse" />
        <div className="h-48 rounded-2xl bg-surface-raised animate-pulse" />
      </div>
    );
  }

  if (!data) {
    return (
      <EmptyState
        icon="psychology"
        title={t("reasoningCache")}
        description={t("reasoningNoData")}
        actionLabel={t("refresh")}
        onAction={() => void fetchData()}
      />
    );
  }

  const { stats, entries } = data;
  const providerEntries = Object.entries(stats.byProvider).sort(
    ([, a], [, b]) => b.entries - a.entries
  );
  const modelEntries = Object.entries(stats.byModel).sort(([, a], [, b]) => b.entries - a.entries);
  const totalLookups = stats.hits + stats.misses;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <SectionBadge icon="psychology" tone="blue">
            {t("reasoningCache")}
          </SectionBadge>
          <div>
            <h2 className="text-lg font-semibold text-text-main">{t("reasoningCache")}</h2>
            <p className="mt-1 max-w-3xl text-sm text-text-muted">{t("reasoningCacheDesc")}</p>
          </div>
        </div>
        <Button
          variant="danger"
          icon="delete_sweep"
          size="sm"
          onClick={() => void handleClear()}
          disabled={clearing || loading || stats.totalEntries === 0}
          loading={clearing}
          aria-label={t("reasoningClearAll")}
        >
          {t("reasoningClearAll")}
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
        <StatCard
          icon="psychology"
          label={t("reasoningEntries")}
          value={stats.totalEntries}
          sub={`${stats.memoryEntries} memory / ${stats.dbEntries} DB`}
          accent="text-blue-400"
        />
        <StatCard
          icon="speed"
          label={t("reasoningReplayRate")}
          value={stats.replayRate}
          sub={`${totalLookups.toLocaleString()} lookups`}
          accent="text-emerald-500"
        />
        <StatCard
          icon="replay"
          label={t("reasoningReplays")}
          value={stats.replays.toLocaleString()}
          sub={t("reasoningBehaviorReplay")}
          accent="text-cyan-400"
        />
        <StatCard
          icon="text_fields"
          label={t("reasoningCharsCached")}
          value={formatChars(stats.totalChars)}
          sub={`${stats.totalChars.toLocaleString()} chars`}
          accent="text-purple-400"
        />
        <StatCard
          icon="error_outline"
          label={t("reasoningMisses")}
          value={stats.misses.toLocaleString()}
          sub={`${stats.hits.toLocaleString()} hits`}
          accent="text-red-400"
        />
      </div>

      {/* By Provider */}
      {providerEntries.length > 0 && (
        <div className="rounded-2xl border border-border/30 bg-surface/20 p-5">
          <h3 className="text-sm font-medium text-text-main">{t("reasoningByProvider")}</h3>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-border/20 bg-surface/35">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 text-left text-[11px] uppercase tracking-[0.12em] text-text-muted">
                  <th className="px-4 py-3">Provider</th>
                  <th className="px-4 py-3">{t("reasoningEntries")}</th>
                  <th className="px-4 py-3">{t("reasoningChars")}</th>
                  <th className="px-4 py-3">Share</th>
                </tr>
              </thead>
              <tbody>
                {providerEntries.map(([prov, d]) => {
                  const share =
                    stats.totalEntries > 0
                      ? ((d.entries / stats.totalEntries) * 100).toFixed(1)
                      : "0.0";
                  return (
                    <tr key={prov} className="border-b border-border/15 last:border-b-0">
                      <td className="px-4 py-3 font-medium text-text-main">{prov}</td>
                      <td className="px-4 py-3 tabular-nums text-text-main">
                        {d.entries.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 tabular-nums text-purple-400">
                        {formatChars(d.chars)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 overflow-hidden rounded-full bg-surface/60">
                            <div
                              className="h-full rounded-full bg-blue-400"
                              style={{
                                width: `${Math.min(parseFloat(share), 100)}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs font-semibold tabular-nums text-text-main">
                            {share}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* By Model */}
      {modelEntries.length > 0 && (
        <div className="rounded-2xl border border-border/30 bg-surface/20 p-5">
          <h3 className="text-sm font-medium text-text-main">{t("reasoningByModel")}</h3>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-border/20 bg-surface/35">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 text-left text-[11px] uppercase tracking-[0.12em] text-text-muted">
                  <th className="px-4 py-3">Model</th>
                  <th className="px-4 py-3">{t("reasoningEntries")}</th>
                  <th className="px-4 py-3">Avg Chars</th>
                  <th className="px-4 py-3">{t("reasoningChars")}</th>
                </tr>
              </thead>
              <tbody>
                {modelEntries.map(([mdl, d]) => {
                  const avgChars = d.entries > 0 ? Math.round(d.chars / d.entries) : 0;
                  return (
                    <tr key={mdl} className="border-b border-border/15 last:border-b-0">
                      <td className="px-4 py-3 font-medium text-text-main">{mdl}</td>
                      <td className="px-4 py-3 tabular-nums text-text-main">
                        {d.entries.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 tabular-nums text-cyan-400">
                        {avgChars.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 tabular-nums text-purple-400">
                        {formatChars(d.chars)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Entries */}
      <div className="rounded-2xl border border-border/30 bg-surface/20 p-5">
        <div className="mb-4 flex flex-col gap-1">
          <h3 className="text-sm font-medium text-text-main">{t("reasoningRecentEntries")}</h3>
          <p className="text-sm text-text-muted">{t("reasoningCacheDesc")}</p>
        </div>

        {entries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/40 bg-surface/10 px-4 py-6 text-sm text-text-muted">
            {t("reasoningNoData")}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border/20 bg-surface/35">
            <div className="grid grid-cols-[minmax(120px,1fr)_100px_minmax(100px,1fr)_80px_80px_60px] gap-3 border-b border-border/20 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted">
              <span>{t("reasoningToolCallId")}</span>
              <span>Provider</span>
              <span>Model</span>
              <span>{t("reasoningChars")}</span>
              <span>{t("reasoningAge")}</span>
              <span />
            </div>
            <div className="max-h-96 overflow-y-auto">
              {entries.map((entry) => (
                <div key={entry.toolCallId}>
                  <div className="grid grid-cols-[minmax(120px,1fr)_100px_minmax(100px,1fr)_80px_80px_60px] gap-3 border-b border-border/15 px-4 py-3 last:border-b-0">
                    <div
                      className="truncate text-sm font-mono text-text-main"
                      title={entry.toolCallId}
                    >
                      {entry.toolCallId}
                    </div>
                    <div className="text-sm text-text-muted">{entry.provider}</div>
                    <div className="truncate text-sm text-text-muted" title={entry.model}>
                      {entry.model}
                    </div>
                    <div className="text-sm tabular-nums text-purple-400">
                      {entry.charCount.toLocaleString()}
                    </div>
                    <div className="text-sm text-text-muted">{timeAgo(entry.createdAt)}</div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(expandedId === entry.toolCallId ? null : entry.toolCallId)
                      }
                      className="flex items-center justify-center rounded-md p-1 text-text-muted transition-colors hover:bg-surface/60 hover:text-text-main"
                      aria-label={t("reasoningView")}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {expandedId === entry.toolCallId ? "expand_less" : "visibility"}
                      </span>
                    </button>
                  </div>

                  {/* Expanded Detail */}
                  {expandedId === entry.toolCallId && (
                    <div className="border-b border-border/15 bg-surface/15 px-4 py-4">
                      <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                        <span className="material-symbols-outlined text-sm text-blue-400">
                          psychology
                        </span>
                        <span className="font-medium">
                          {t("reasoningDetail")} ({entry.toolCallId})
                        </span>
                      </div>
                      <pre className="max-h-72 overflow-auto rounded-xl bg-black/20 p-4 text-xs leading-relaxed text-text-main font-mono whitespace-pre-wrap break-words">
                        {entry.reasoning}
                      </pre>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-text-muted">
                        <span>
                          Provider: <span className="text-text-main">{entry.provider}</span>
                        </span>
                        <span>
                          Model: <span className="text-text-main">{entry.model}</span>
                        </span>
                        <span>
                          Created:{" "}
                          <span className="text-text-main">
                            {new Date(entry.createdAt).toLocaleString()}
                          </span>
                        </span>
                        <span>
                          Expires:{" "}
                          <span className="text-text-main">
                            {new Date(entry.expiresAt).toLocaleString()}
                          </span>
                        </span>
                        <span>
                          {t("reasoningChars")}:{" "}
                          <span className="text-purple-400">
                            {entry.charCount.toLocaleString()}
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Behavior Info */}
      <div className="rounded-2xl border border-border/30 bg-surface/20 p-5">
        <h3 className="text-sm font-medium text-text-main">{t("reasoningBehavior")}</h3>
        <div className="mt-4 grid gap-3">
          <InfoRow icon="info">{t("reasoningBehaviorCapture")}</InfoRow>
          <InfoRow icon="info">{t("reasoningBehaviorReplay")}</InfoRow>
          <InfoRow icon="info">{t("reasoningBehaviorFallback")}</InfoRow>
          <InfoRow icon="info">{t("reasoningBehaviorTtl")}</InfoRow>
          <InfoRow icon="info">{t("reasoningBehaviorModels")}</InfoRow>
        </div>
      </div>
    </div>
  );
}
