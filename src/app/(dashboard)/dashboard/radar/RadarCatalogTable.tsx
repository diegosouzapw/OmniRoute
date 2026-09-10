"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";

export interface RadarMergedEntry {
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
  contextWindow?: number | null;
  capabilities?: {
    tools: boolean | null;
    vision: boolean | null;
    thinking: boolean | null;
  };
  metadataEvidenceUrls?: string[];
  budget?: { kind: string; tokensPerMonth?: number; poolId?: string };
  limits?: { rpm: number | null; rpd: number | null; tpm: number | null; tpd: number | null };
  setup?: { keyUrl: string | null; steps: string[] } | null;
}

interface RadarLocalModelState {
  provider: string;
  modelId: string;
  displayName: string | null;
  enabled: boolean | null;
  tombstoned: boolean;
  updatedAt: string;
}

interface RadarCatalogTableProps {
  entries: RadarMergedEntry[];
  refreshCatalog: () => Promise<void>;
  onError: (message: string) => void;
}

/**
 * Compact a plain count. Locale-independent on purpose: `toLocaleString()` would
 * make the rendering — and any test asserting on it — depend on the machine's
 * locale.
 */
export function compactCount(value: number): string {
  // The feed is JSON off the network, so the declared `number` is a hope, not a
  // guarantee: a string, a NaN or an Infinity would otherwise render as
  // "InfinityM" or "NaN/min" in the operator's table.
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return "?";
  if (numeric >= 1_000_000) return `${(numeric / 1_000_000).toFixed(1)}M`;
  if (numeric >= 1_000) return `${(numeric / 1_000).toFixed(0)}K`;
  return String(numeric);
}

function formatTokens(value: number): string {
  // A monthly budget of zero means the pool is rate-limited rather than
  // token-limited. That reading is specific to budgets — see `formatLimits`.
  if (value === 0) return "rate-only";
  return compactCount(value);
}

/**
 * Render the rate limits the feed reported, and nothing else. Each of the four
 * values is independently nullable, so an absent one is omitted rather than
 * printed as zero — "no reported limit" and "a limit of zero" are opposite
 * facts, and the second one is worth noticing. An entry with no limits at all,
 * or with four nulls, reads "—".
 *
 * Deliberately not built on `formatTokens`: that one maps 0 to "rate-only",
 * which would render a zero ceiling as "rate-only/min".
 */
export function formatLimits(entry: Pick<RadarMergedEntry, "limits">): string {
  const { rpm, rpd, tpm, tpd } = entry.limits ?? {};
  const parts: string[] = [];
  if (rpm != null) parts.push(`${compactCount(rpm)}/min`);
  if (rpd != null) parts.push(`${compactCount(rpd)}/day`);
  if (tpm != null) parts.push(`${compactCount(tpm)} tok/min`);
  if (tpd != null) parts.push(`${compactCount(tpd)} tok/day`);
  return parts.length ? parts.join(" · ") : "—";
}

function budgetLabel(entry: RadarMergedEntry): string {
  if (entry.budget?.kind === "shared_pool") {
    return `shared (${formatTokens(entry.budget.tokensPerMonth ?? entry.monthlyTokens)}/mo)`;
  }
  if (entry.budget?.kind === "rate_only" || entry.monthlyTokens === 0) return "rate-only";
  return `${formatTokens(entry.monthlyTokens)}/mo`;
}

function capabilityBadge(
  label: string,
  value: boolean | null | undefined,
  trueClass: string,
  unknownHelp: string
) {
  const state = value === true ? "✓" : value === false ? "✕" : "?";
  const stateClass =
    value === true
      ? trueClass
      : value === false
        ? "bg-red-500/10 text-red-400"
        : "bg-gray-500/10 text-gray-400";
  const unknown = value !== true && value !== false;
  return (
    <span
      className={`text-[10px] px-1.5 py-0.5 rounded ${stateClass}`}
      {...(unknown ? { title: unknownHelp } : {})}
    >
      {label} {state}
    </span>
  );
}

export function RadarCatalogTable({ entries, refreshCatalog, onError }: RadarCatalogTableProps) {
  const t = useTranslations("radarPage");
  const [states, setStates] = useState<RadarLocalModelState[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadState = useCallback(async () => {
    try {
      const response = await fetch("/api/radar/local-model-state");
      if (!response.ok) return;
      const payload = await response.json();
      setStates(Array.isArray(payload.states) ? payload.states : []);
    } catch {
      onError(t("errorLoading"));
    }
  }, [onError, t]);

  useEffect(() => {
    void (async () => {
      await loadState();
    })();
  }, [loadState]);

  const stateByKey = useMemo(
    () => new Map(states.map((state) => [`${state.provider}:${state.modelId}`, state])),
    [states]
  );
  const hiddenModels = useMemo(() => states.filter((state) => state.tombstoned), [states]);

  const applyResponse = useCallback(async (response: Response) => {
    if (!response.ok) throw new Error("save_failed");
    const payload = await response.json();
    setStates(Array.isArray(payload.states) ? payload.states : []);
  }, []);

  const mutate = useCallback(
    async (operation: () => Promise<Response>) => {
      setSaving(true);
      onError("");
      try {
        await applyResponse(await operation());
        setEditingKey(null);
        await refreshCatalog();
      } catch {
        onError(t("localStateSaveFailed"));
      } finally {
        setSaving(false);
      }
    },
    [applyResponse, onError, refreshCatalog, t]
  );

  const beginEdit = useCallback((entry: RadarMergedEntry) => {
    setEditingKey(`${entry.provider}:${entry.modelId}`);
    setDisplayName(entry.displayName);
    setEnabled(entry.enabled !== false);
  }, []);

  const saveOverride = useCallback(
    (entry: RadarMergedEntry) =>
      mutate(() =>
        fetch("/api/radar/local-model-state", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: entry.provider,
            modelId: entry.modelId,
            displayName,
            enabled,
          }),
        })
      ),
    [displayName, enabled, mutate]
  );

  const resetOverride = useCallback(
    (entry: Pick<RadarMergedEntry, "provider" | "modelId">) => {
      const query = new URLSearchParams({ provider: entry.provider, modelId: entry.modelId });
      return mutate(() =>
        fetch(`/api/radar/local-model-state?${query.toString()}`, { method: "DELETE" })
      );
    },
    [mutate]
  );

  const setTombstone = useCallback(
    (provider: string, modelId: string, tombstoned: boolean) =>
      mutate(() =>
        fetch("/api/radar/local-model-state", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider, modelId, tombstoned }),
        })
      ),
    [mutate]
  );

  return (
    <>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-text-muted border-b border-border">
                <th className="pb-3 font-medium">{t("colProvider")}</th>
                <th className="pb-3 font-medium">{t("colModel")}</th>
                <th className="pb-3 font-medium">{t("colQuota")}</th>
                <th className="pb-3 font-medium">{t("colLimits")}</th>
                <th className="pb-3 font-medium">{t("colContext")}</th>
                <th className="pb-3 font-medium">{t("colCapabilities")}</th>
                <th className="pb-3 font-medium">{t("colTos")}</th>
                <th className="pb-3 font-medium text-right">{t("colActions")}</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const key = `${entry.provider}:${entry.modelId}`;
                const localState = stateByKey.get(key);
                const hasOverride =
                  localState && (localState.displayName !== null || localState.enabled !== null);
                return (
                  <tr
                    key={key}
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
                        {entry.origin === "local" && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium">
                            {t("localBadge")}
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
                    <td className="py-3 text-text-muted text-sm font-mono max-w-[240px]">
                      {editingKey === key ? (
                        <input
                          type="text"
                          value={displayName}
                          onChange={(event) => setDisplayName(event.target.value)}
                          aria-label={t("modelDisplayName")}
                          maxLength={160}
                          className="w-full min-w-[180px] px-2 py-1 rounded border border-border bg-transparent text-text-main focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                      ) : (
                        <span className="block truncate">{entry.displayName}</span>
                      )}
                    </td>
                    <td className="py-3 text-sm">{budgetLabel(entry)}</td>
                    <td className="py-3 text-sm text-text-muted">
                      {(() => {
                        const limits = formatLimits(entry);
                        return limits === "—" ? (
                          <span title={t("limitsUnknownHelp")}>{limits}</span>
                        ) : (
                          limits
                        );
                      })()}
                    </td>
                    <td className="py-3 text-sm text-text-muted">
                      {entry.contextWindow != null ? (
                        `${(entry.contextWindow / 1000).toFixed(0)}K`
                      ) : (
                        <span title={t("contextUnknownHelp")}>—</span>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-1">
                        {capabilityBadge(
                          t("capTools"),
                          entry.capabilities?.tools,
                          "bg-blue-500/10 text-blue-400",
                          t("capabilityUnknownHelp")
                        )}
                        {capabilityBadge(
                          t("capVision"),
                          entry.capabilities?.vision,
                          "bg-purple-500/10 text-purple-400",
                          t("capabilityUnknownHelp")
                        )}
                        {capabilityBadge(
                          t("capThinking"),
                          entry.capabilities?.thinking,
                          "bg-amber-500/10 text-amber-400",
                          t("capabilityUnknownHelp")
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
                      {entry.trainsOnPrompts === true && (
                        <span
                          className="ml-1 text-xs px-2 py-1 rounded bg-orange-500/10 text-orange-400"
                          title={t("trainsOnPromptsHelp")}
                        >
                          {t("trainsOnPrompts")}
                        </span>
                      )}
                    </td>
                    <td className="py-3 pl-3">
                      {editingKey === key ? (
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          <label className="inline-flex items-center gap-1 text-xs text-text-muted">
                            <input
                              type="checkbox"
                              checked={enabled}
                              disabled={entry.disabledBy === "radar"}
                              onChange={(event) => setEnabled(event.target.checked)}
                            />
                            {t("modelEnabled")}
                          </label>
                          <button
                            type="button"
                            disabled={saving || displayName.trim().length === 0}
                            onClick={() => void saveOverride(entry)}
                            className="text-xs text-violet-400 hover:underline disabled:opacity-50"
                          >
                            {t("saveModel")}
                          </button>
                          <button
                            type="button"
                            disabled={saving}
                            onClick={() => setEditingKey(null)}
                            className="text-xs text-text-muted hover:text-text-main disabled:opacity-50"
                          >
                            {t("cancelEdit")}
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          <button
                            type="button"
                            disabled={saving}
                            onClick={() => beginEdit(entry)}
                            className="text-xs text-violet-400 hover:underline disabled:opacity-50"
                          >
                            {t("editModel")}
                          </button>
                          {hasOverride && (
                            <button
                              type="button"
                              disabled={saving}
                              onClick={() => void resetOverride(entry)}
                              className="text-xs text-text-muted hover:text-text-main disabled:opacity-50"
                            >
                              {t("resetModel")}
                            </button>
                          )}
                          <button
                            type="button"
                            disabled={saving}
                            onClick={() => void setTombstone(entry.provider, entry.modelId, true)}
                            className="text-xs text-red-400 hover:underline disabled:opacity-50"
                          >
                            {t("hideModel")}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {hiddenModels.length > 0 && (
        <Card>
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">{t("hiddenModelsTitle")}</h3>
            {hiddenModels.map((state) => (
              <div
                key={`${state.provider}:${state.modelId}:hidden`}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3 last:border-b-0 last:pb-0"
              >
                <div>
                  <span className="font-medium">{state.provider}</span>
                  <span className="ml-2 text-sm font-mono text-text-muted">
                    {state.displayName ?? state.modelId}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => void setTombstone(state.provider, state.modelId, false)}
                  className="text-sm text-violet-400 hover:underline disabled:opacity-50"
                >
                  {t("restoreModel")}
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}
