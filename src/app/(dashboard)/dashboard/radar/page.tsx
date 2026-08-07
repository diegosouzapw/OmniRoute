"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card } from "@/shared/components";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RadarMeta {
  version: string;
  tier: string;
  fetchedAt: string;
}

interface RadarMergedEntry {
  provider: string;
  modelId: string;
  displayName: string;
  monthlyTokens: number;
  creditTokens: number;
  freeType: string;
  poolKey: string | null;
  tos: string;
  trainsOnPrompts?: boolean;
  enabled?: boolean;
  origin: "baseline" | "radar" | "local";
  disabledBy?: "radar";
  // Extended feed fields (present when origin=radar)
  contextWindow?: number | null;
  capabilities?: { tools: boolean; vision: boolean; thinking: boolean };
  budget?: { kind: string; tokensPerMonth?: number; poolId?: string };
  limits?: { rpm: number | null; rpd: number | null; tpm: number | null; tpd: number | null };
  setup?: { keyUrl: string | null; steps: string[] } | null;
}

type PageState = "flag_off" | "optin_pending" | "empty" | "populated";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Determine the page state from the fetch result. */
export function resolveRadarPageState(
  flagOn: boolean,
  optedIn: boolean,
  hasEntries: boolean,
): PageState {
  if (!flagOn) return "flag_off";
  if (!optedIn) return "optin_pending";
  if (!hasEntries) return "empty";
  return "populated";
}

/** Relative time string (e.g., "3h ago", "2d ago"). */
function relativeTime(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;
  if (diffMs < 0) return "just now";
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/** Format token count as human-readable. */
function formatTokens(n: number): string {
  if (n === 0) return "rate-only";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

/** Budget display string. */
function budgetLabel(entry: RadarMergedEntry): string {
  if (entry.budget?.kind === "shared_pool") {
    return `shared (${formatTokens(entry.budget.tokensPerMonth ?? entry.monthlyTokens)}/mo)`;
  }
  if (entry.budget?.kind === "rate_only" || entry.monthlyTokens === 0) return "rate-only";
  return `${formatTokens(entry.monthlyTokens)}/mo`;
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function RadarPage() {
  const t = useTranslations("radarPage");
  const [entries, setEntries] = useState<RadarMergedEntry[]>([]);
  const [meta, setMeta] = useState<RadarMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [optIn, setOptIn] = useState<boolean | null>(null);
  const [activating, setActivating] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Fetch catalog
  const fetchCatalog = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/radar/catalog");
      if (res.status === 404) {
        // Flag off — treat as not found
        setOptIn(false);
        setEntries([]);
        setMeta(null);
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setEntries(data.entries || []);
      setMeta(data.meta || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errorLoading"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  // Fetch settings to determine opt-in state
  const fetchSettings = useCallback(async () => {
    try {
      // We don't have a GET /api/radar/settings — infer from catalog response:
      // If catalog returns meta=null and entries are baseline-only, user hasn't opted in.
      // A 404 means flag is off.
      const res = await fetch("/api/radar/catalog");
      if (res.status === 404) {
        setOptIn(false);
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setEntries(data.entries || []);
      setMeta(data.meta || null);
      // If meta is null, the user hasn't synced yet (or hasn't opted in).
      // We need to check opt-in state. Since there's no GET endpoint for settings,
      // we infer: if flag is on and we got baseline, user may or may not be opted in.
      // The activation flow handles this — we show the activation screen if meta is null.
      setOptIn(null); // unknown — will determine from user action
    } catch {
      setOptIn(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Sync (defined before handleActivate which depends on it)
  const handleSync = useCallback(async () => {
    setSyncing(true);
    setError("");
    try {
      const res = await fetch("/api/radar/sync", { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status === "updated" || data.status === "stale") {
        await fetchCatalog();
      } else if (data.status === "error") {
        setError(data.reason || t("syncFailed"));
      } else if (data.status === "disabled") {
        setError(t("flagDisabled"));
      } else if (data.status === "opt_out") {
        setOptIn(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("syncFailed"));
    } finally {
      setSyncing(false);
    }
  }, [t, fetchCatalog]);

  // Activate opt-in
  const handleActivate = useCallback(async () => {
    setActivating(true);
    try {
      const res = await fetch("/api/radar/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optIn: true }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setOptIn(true);
      // After activation, trigger a sync
      await handleSync();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("activationFailed"));
    } finally {
      setActivating(false);
    }
  }, [t, handleSync]);

  // Determine effective state
  const flagOn = optIn !== false || entries.length > 0 || meta !== null;
  const pageState = resolveRadarPageState(
    optIn !== false, // if we got a 404, optIn=false => flag off
    optIn === true,
    entries.length > 0 && meta !== null,
  );

  // Flag off — render not-found
  if (pageState === "flag_off" && !loading) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-sm text-text-muted mt-1">{t("subtitle")}</p>
        </div>
        {pageState === "populated" && (
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-violet-500 text-violet-400 hover:bg-violet-500/10 transition-colors disabled:opacity-50"
          >
            {syncing ? t("syncing") : t("syncNow")}
          </button>
        )}
      </div>

      {/* Feed freshness header */}
      {meta && (
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span>
            {t("feedVersion")}: <span className="font-mono">{meta.version}</span>
          </span>
          <span>
            {t("feedTier")}:{" "}
            <span className={meta.tier === "live" ? "text-green-400" : "text-amber-400"}>
              {meta.tier === "live" ? t("tierLive") : t("tierCommunity")}
            </span>
          </span>
          <span>
            {t("feedFetched")}: {relativeTime(meta.fetchedAt)}
          </span>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-text-muted">{t("loading")}</div>
        </div>
      ) : (
        <>
          {/* Opt-in pending */}
          {pageState === "optin_pending" && (
            <Card>
              <div className="flex flex-col items-center gap-6 py-8 text-center max-w-lg mx-auto">
                <div className="text-4xl">📡</div>
                <h2 className="text-xl font-semibold">{t("activateTitle")}</h2>
                <p className="text-text-muted">{t("activateDescription")}</p>
                <div className="flex flex-col gap-2 text-sm text-text-muted text-left w-full">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>{t("privacyNoUpload")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>{t("privacyOnlySigned")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>{t("privacyLocalOnly")}</span>
                  </div>
                </div>
                <button
                  onClick={handleActivate}
                  disabled={activating}
                  className="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {activating ? t("activating") : t("activateButton")}
                </button>
              </div>
            </Card>
          )}

          {/* Empty cache — opted in but no data yet */}
          {pageState === "empty" && (
            <Card>
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <p className="text-text-muted">{t("emptyState")}</p>
                <button
                  onClick={handleSync}
                  disabled={syncing}
                  className="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {syncing ? t("syncing") : t("syncCta")}
                </button>
              </div>
            </Card>
          )}

          {/* Populated catalog table */}
          {pageState === "populated" && (
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-text-muted border-b border-border">
                      <th className="pb-3 font-medium">{t("colProvider")}</th>
                      <th className="pb-3 font-medium">{t("colModel")}</th>
                      <th className="pb-3 font-medium">{t("colQuota")}</th>
                      <th className="pb-3 font-medium">{t("colContext")}</th>
                      <th className="pb-3 font-medium">{t("colCapabilities")}</th>
                      <th className="pb-3 font-medium">{t("colTos")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr
                        key={`${entry.provider}:${entry.modelId}`}
                        className={`border-b border-border/50 last:border-b-0 ${
                          entry.enabled === false ? "opacity-50" : ""
                        }`}
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{entry.provider}</span>
                            {entry.origin === "radar" && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 font-medium">
                                {t("newBadge")}
                              </span>
                            )}
                            {entry.setup?.keyUrl && (
                              <Link
                                href={`/dashboard/radar/setup?provider=${encodeURIComponent(entry.provider)}`}
                                className="text-xs text-violet-400 hover:underline"
                                title={t("setupGuide")}
                              >
                                ⚙
                              </Link>
                            )}
                          </div>
                          {entry.enabled === false && entry.disabledBy === "radar" && (
                            <p className="text-xs text-red-400 mt-0.5">{t("disabledByFeed")}</p>
                          )}
                        </td>
                        <td className="py-3 text-text-muted text-sm font-mono truncate max-w-[200px]">
                          {entry.displayName}
                        </td>
                        <td className="py-3 text-sm">{budgetLabel(entry)}</td>
                        <td className="py-3 text-sm text-text-muted">
                          {entry.contextWindow
                            ? `${(entry.contextWindow / 1000).toFixed(0)}K`
                            : "—"}
                        </td>
                        <td className="py-3">
                          <div className="flex gap-1">
                            {entry.capabilities?.tools && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">
                                {t("capTools")}
                              </span>
                            )}
                            {entry.capabilities?.vision && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400">
                                {t("capVision")}
                              </span>
                            )}
                            {entry.capabilities?.thinking && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">
                                {t("capThinking")}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              entry.tos === "ok"
                                ? "bg-green-500/10 text-green-400"
                                : entry.tos === "caution"
                                  ? "bg-yellow-500/10 text-yellow-400"
                                  : entry.tos === "avoid"
                                    ? "bg-red-500/10 text-red-400"
                                    : "bg-gray-500/10 text-gray-400"
                            }`}
                          >
                            {entry.tos}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
