"use client";

import { useMemo, useState } from "react";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import { useNotificationStore } from "@/store/notificationStore";
import {
  FACTOR_LABELS,
  MODE_PACK_OPTIONS,
  buildIntelligentProviderScores,
  normalizeIntelligentRoutingConfig,
} from "@/lib/combos/intelligentRouting";

function getI18nOrFallback(t: any, key: string, fallback: string) {
  if (typeof t?.has === "function" && t.has(key)) return t(key);
  return fallback;
}

function formatProviderLabel(providerId: string, activeProviders: any[] = []) {
  const matchedConnection = activeProviders.find(
    (provider) =>
      provider?.provider === providerId ||
      provider?.id === providerId ||
      provider?.name === providerId
  );

  if (matchedConnection?.name && matchedConnection.name !== providerId) {
    return `${matchedConnection.name} (${providerId})`;
  }

  return providerId;
}

export default function IntelligentComboPanel({
  t,
  combo,
  allCombos,
  activeProviders,
  onComboUpdated,
}: {
  t: any;
  combo: any;
  allCombos: any[];
  activeProviders: any[];
  onComboUpdated?: (combo: any) => void;
}) {
  const notify = useNotificationStore();
  const [savingModePack, setSavingModePack] = useState<string | null>(null);
  const normalizedConfig = useMemo(
    () => normalizeIntelligentRoutingConfig(combo?.config),
    [combo?.config]
  );
  const providerScores = useMemo(() => buildIntelligentProviderScores(combo), [combo]);

  const handleModePackChange = async (modePackId: string) => {
    if (!combo?.id || modePackId === normalizedConfig.modePack) return;
    setSavingModePack(modePackId);

    try {
      const response = await fetch(`/api/combos/${combo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config: {
            ...(combo?.config || {}),
            modePack: modePackId,
          },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(
          errorBody?.error?.message || errorBody?.error || "Failed to update mode pack"
        );
      }

      const updatedCombo = await response.json();
      onComboUpdated?.(updatedCombo);
      notify.success(
        getI18nOrFallback(t, "modePackUpdated", "Mode pack updated to {pack}.").replace(
          "{pack}",
          modePackId
        )
      );
    } catch (error: any) {
      notify.error(error?.message || "Failed to update mode pack.");
    } finally {
      setSavingModePack(null);
    }
  };

  return (
    <Card
      className="border-primary/10 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent"
      padding="sm"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">
                auto_awesome
              </span>
              <h2 className="text-lg font-semibold text-text-main">
                {getI18nOrFallback(t, "intelligentPanelTitle", "Intelligent Routing Dashboard")}
              </h2>
            </div>
            <p className="text-sm text-text-muted mt-1">
              {getI18nOrFallback(
                t,
                "intelligentPanelDesc",
                "Real-time scoring and health status for this auto-routing combo."
              )}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-text-muted">
              <code className="rounded bg-black/5 dark:bg-white/5 px-2 py-1 text-text-main">
                {combo?.name}
              </code>
              <span>{allCombos.length} intelligent combo(s)</span>
              <span>
                {normalizedConfig.candidatePool.length || activeProviders.length} providers in scope
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-300">
            <span className="material-symbols-outlined text-[14px]">tune</span>
            {getI18nOrFallback(t, "configOnlyStatus", "Configuration View")}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card.Section>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-text-main">
                  {getI18nOrFallback(t, "statusOverview", "Status Overview")}
                </p>
                <p className="text-[11px] text-text-muted mt-1">
                  {getI18nOrFallback(
                    t,
                    "configOnlyHint",
                    "This panel shows routing inputs only. Live breaker state is available on the Health page."
                  )}
                </p>
              </div>
              <div className="rounded-lg bg-black/5 dark:bg-white/5 px-3 py-2 text-right">
                <p className="text-[10px] uppercase tracking-wide text-text-muted">
                  Candidate Pool
                </p>
                <p className="text-lg font-semibold text-text-main">
                  {normalizedConfig.candidatePool.length || activeProviders.length}
                </p>
              </div>
            </div>
          </Card.Section>

          <Card.Section>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-text-main">
                  {getI18nOrFallback(t, "activeModePack", "Active Mode Pack")}
                </p>
                <p className="text-[11px] text-text-muted mt-1">
                  {getI18nOrFallback(
                    t,
                    "modePackHint",
                    "Switch presets to bias the routing engine without rebuilding the combo."
                  )}
                </p>
              </div>
              {savingModePack && (
                <span className="text-[11px] text-text-muted">Saving {savingModePack}…</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              {MODE_PACK_OPTIONS.map((modePack) => {
                const isActive = normalizedConfig.modePack === modePack.id;
                return (
                  <Button
                    key={modePack.id}
                    variant={isActive ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => handleModePackChange(modePack.id)}
                    disabled={Boolean(savingModePack)}
                    className="!justify-start"
                  >
                    <span className="material-symbols-outlined text-[14px]">{modePack.emoji}</span>
                    {modePack.label}
                  </Button>
                );
              })}
            </div>
          </Card.Section>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card.Section>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-text-main">
                  {getI18nOrFallback(t, "providerScores", "Provider Scores")}
                </p>
                <p className="text-[11px] text-text-muted mt-1">
                  {normalizedConfig.candidatePool.length > 0
                    ? `${normalizedConfig.candidatePool.length} providers currently ranked for this combo.`
                    : getI18nOrFallback(
                        t,
                        "allProvidersEvaluated",
                        "No candidate pool configured. All active providers are evaluated at runtime."
                      )}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {providerScores.length === 0 ? (
                <div className="rounded-lg border border-dashed border-black/10 dark:border-white/10 p-3 text-[11px] text-text-muted">
                  {getI18nOrFallback(
                    t,
                    "allProvidersEvaluated",
                    "No candidate pool configured. All active providers are evaluated at runtime."
                  )}
                </div>
              ) : (
                providerScores.map((entry) => {
                  const percentage = Math.round(entry.score * 100);
                  return (
                    <div
                      key={entry.provider}
                      className="rounded-lg border border-black/8 dark:border-white/8 bg-white/60 dark:bg-white/[0.03] p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold text-text-main">
                            {formatProviderLabel(entry.provider, activeProviders)}
                          </p>
                          <p className="text-[11px] text-text-muted mt-0.5">{entry.model}</p>
                        </div>
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-[11px] font-semibold text-primary">
                          {percentage}%
                        </span>
                      </div>

                      <div className="mt-2 h-2 rounded-full bg-black/8 dark:bg-white/8 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-500 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {Object.entries(entry.factors).map(([factorKey, factorValue]) => (
                          <span
                            key={`${entry.provider}-${factorKey}`}
                            className="rounded-full bg-black/5 dark:bg-white/5 px-2 py-1 text-[10px] text-text-muted"
                          >
                            {FACTOR_LABELS[factorKey as keyof typeof FACTOR_LABELS]}{" "}
                            {Math.round(Number(factorValue) * 100)}%
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card.Section>

          <Card.Section>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-text-main">
                  {getI18nOrFallback(t, "routingInputs", "Routing Inputs")}
                </p>
                <p className="text-[11px] text-text-muted mt-1">
                  {getI18nOrFallback(
                    t,
                    "routingInputsHint",
                    "Mode pack and weighting stay here; breaker runtime state stays on the Health page."
                  )}
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-black/8 bg-white/60 p-3 dark:border-white/8 dark:bg-white/[0.03]">
                <p className="text-[11px] uppercase tracking-wide text-text-muted">Mode Pack</p>
                <p className="mt-1 text-sm font-semibold text-text-main">
                  {normalizedConfig.modePack}
                </p>
              </div>
              <div className="rounded-lg border border-black/8 bg-white/60 p-3 dark:border-white/8 dark:bg-white/[0.03]">
                <p className="text-[11px] uppercase tracking-wide text-text-muted">
                  Exploration Rate
                </p>
                <p className="mt-1 text-sm font-semibold text-text-main">
                  {Math.round(normalizedConfig.explorationRate * 100)}%
                </p>
              </div>
            </div>
          </Card.Section>
        </div>
      </div>
    </Card>
  );
}
