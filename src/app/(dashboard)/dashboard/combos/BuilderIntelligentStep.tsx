"use client";

import { useMemo } from "react";
import Card from "@/shared/components/Card";
import {
  DEFAULT_INTELLIGENT_WEIGHTS,
  FACTOR_LABELS,
  MODE_PACK_OPTIONS,
  ROUTER_STRATEGY_OPTIONS,
  normalizeIntelligentRoutingConfig,
} from "@/lib/combos/intelligentRouting";

function getI18nOrFallback(t: any, key: string, fallback: string) {
  if (typeof t?.has === "function" && t.has(key)) return t(key);
  return fallback;
}

function toProviderOptions(activeProviders: any[] = [], candidatePool: string[] = []) {
  const uniqueProviders = new Map<string, { id: string; label: string; connectionCount: number }>();

  activeProviders.forEach((provider) => {
    const providerId =
      typeof provider?.provider === "string" && provider.provider.trim().length > 0
        ? provider.provider
        : typeof provider?.id === "string" && provider.id.trim().length > 0
          ? provider.id
          : null;

    if (!providerId) return;

    const currentEntry = uniqueProviders.get(providerId);
    const fallbackLabel =
      typeof provider?.name === "string" && provider.name.trim().length > 0
        ? provider.name
        : providerId;

    uniqueProviders.set(providerId, {
      id: providerId,
      label: currentEntry?.label || fallbackLabel,
      connectionCount: (currentEntry?.connectionCount || 0) + 1,
    });
  });

  candidatePool.forEach((poolId) => {
    if (!uniqueProviders.has(poolId)) {
      uniqueProviders.set(poolId, {
        id: poolId,
        label: `${poolId} (Offline/Deleted)`,
        connectionCount: 0,
      });
    }
  });

  return [...uniqueProviders.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export default function BuilderIntelligentStep({
  t,
  config,
  onChange,
  activeProviders,
}: {
  t: any;
  config: Record<string, unknown>;
  onChange: (nextConfig: Record<string, unknown>) => void;
  activeProviders: any[];
}) {
  const normalizedConfig = normalizeIntelligentRoutingConfig(config);
  const providerOptions = useMemo(
    () => toProviderOptions(activeProviders, normalizedConfig.candidatePool),
    [activeProviders, normalizedConfig.candidatePool]
  );

  const updateConfig = (patch: Record<string, unknown>) => {
    onChange({
      ...normalizedConfig,
      ...patch,
      weights: {
        ...normalizedConfig.weights,
        ...((patch.weights as Record<string, number>) || {}),
      },
    });
  };

  const toggleCandidateProvider = (providerId: string) => {
    const nextCandidatePool = normalizedConfig.candidatePool.includes(providerId)
      ? normalizedConfig.candidatePool.filter((entry) => entry !== providerId)
      : [...normalizedConfig.candidatePool, providerId];

    updateConfig({ candidatePool: nextCandidatePool });
  };

  return (
    <div className="flex flex-col gap-3">
      <Card.Section>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-text-main">
              {getI18nOrFallback(t, "builderIntelligentTitle", "Intelligent Routing Configuration")}
            </h3>
            <p className="text-xs text-text-muted mt-1">
              {getI18nOrFallback(
                t,
                "builderIntelligentDesc",
                "Configure the multi-factor scoring engine for this auto-routing combo."
              )}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
            <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
            Intelligent
          </span>
        </div>
      </Card.Section>

      <Card.Section>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-text-main">
              {getI18nOrFallback(t, "candidatePoolLabel", "Candidate Pool")}
            </p>
            <p className="text-[11px] text-text-muted mt-1">
              {getI18nOrFallback(
                t,
                "candidatePoolHint",
                "Select which providers this engine should evaluate. Leave empty to use all active providers."
              )}
            </p>
          </div>
          <span className="text-[10px] text-text-muted">
            {normalizedConfig.candidatePool.length > 0
              ? `${normalizedConfig.candidatePool.length} selected`
              : "All active providers"}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {providerOptions.length === 0 && (
            <span className="text-[11px] text-text-muted">
              {getI18nOrFallback(t, "candidatePoolEmpty", "No active providers available yet.")}
            </span>
          )}

          {providerOptions.map((provider) => {
            const isSelected = normalizedConfig.candidatePool.includes(provider.id);
            return (
              <button
                key={provider.id}
                type="button"
                onClick={() => toggleCandidateProvider(provider.id)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-black/10 dark:border-white/10 text-text-main hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {provider.label}
                <span className="ml-1 text-[10px] text-text-muted">
                  {provider.connectionCount} acct
                  {provider.connectionCount === 1 ? "" : "s"}
                </span>
              </button>
            );
          })}
        </div>
      </Card.Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card.Section>
          <label className="text-xs font-semibold text-text-main block mb-2">
            {getI18nOrFallback(t, "modePackLabel", "Mode Pack")}
          </label>
          <select
            value={normalizedConfig.modePack}
            onChange={(event) => updateConfig({ modePack: event.target.value })}
            className="w-full text-xs py-2 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
          >
            {MODE_PACK_OPTIONS.map((modePack) => (
              <option key={modePack.id} value={modePack.id}>
                {getI18nOrFallback(
                  t,
                  `modePack${modePack.id[0].toUpperCase()}${modePack.id.slice(1)}`,
                  modePack.label
                )}
              </option>
            ))}
          </select>
        </Card.Section>

        <Card.Section>
          <label className="text-xs font-semibold text-text-main block mb-2">
            {getI18nOrFallback(t, "routerStrategyLabel", "Router Strategy")}
          </label>
          <select
            value={normalizedConfig.routerStrategy}
            onChange={(event) => updateConfig({ routerStrategy: event.target.value })}
            className="w-full text-xs py-2 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
          >
            {ROUTER_STRATEGY_OPTIONS.map((strategy) => (
              <option key={strategy.id} value={strategy.id}>
                {strategy.id === "rules"
                  ? getI18nOrFallback(t, "strategyRules", strategy.label)
                  : strategy.label}
              </option>
            ))}
          </select>
        </Card.Section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card.Section>
          <label className="text-xs font-semibold text-text-main block">
            {getI18nOrFallback(t, "explorationRateLabel", "Exploration Rate")}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={normalizedConfig.explorationRate}
            onChange={(event) => updateConfig({ explorationRate: Number(event.target.value || 0) })}
            className="mt-3 w-full accent-primary"
          />
          <p className="text-[11px] text-text-muted mt-2">
            {getI18nOrFallback(
              t,
              "explorationRateHint",
              "{percent}% of requests can explore non-optimal providers."
            ).replace("{percent}", `${Math.round(normalizedConfig.explorationRate * 100)}`)}
          </p>
        </Card.Section>

        <Card.Section>
          <label className="text-xs font-semibold text-text-main block mb-2">
            {getI18nOrFallback(t, "budgetCapLabel", "Budget Cap (USD / request)")}
          </label>
          <input
            type="number"
            min="0"
            step="0.0001"
            value={normalizedConfig.budgetCap ?? ""}
            placeholder={getI18nOrFallback(t, "budgetCapPlaceholder", "No limit")}
            onChange={(event) =>
              updateConfig({
                budgetCap: event.target.value ? Number(event.target.value) : undefined,
              })
            }
            className="w-full text-xs py-2 px-2 rounded border border-black/10 dark:border-white/10 bg-transparent focus:border-primary focus:outline-none"
          />
        </Card.Section>
      </div>

      <details className="rounded-lg border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] p-3">
        <summary className="cursor-pointer text-xs font-semibold text-text-main">
          {getI18nOrFallback(t, "advancedWeightsTitle", "Advanced: Scoring Weights")}
        </summary>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          {Object.entries(normalizedConfig.weights).map(([weightKey, weightValue]) => (
            <div
              key={weightKey}
              className="rounded-lg border border-black/6 dark:border-white/6 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <label className="text-[11px] font-medium text-text-main">
                  {getI18nOrFallback(
                    t,
                    `weight${weightKey[0].toUpperCase()}${weightKey.slice(1)}`,
                    FACTOR_LABELS[weightKey as keyof typeof DEFAULT_INTELLIGENT_WEIGHTS]
                  )}
                </label>
                <span className="text-[11px] text-text-muted">
                  {Math.round(Number(weightValue) * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={weightValue}
                onChange={(event) =>
                  updateConfig({
                    weights: {
                      ...normalizedConfig.weights,
                      [weightKey]: Number(event.target.value || 0),
                    },
                  })
                }
                className="mt-3 w-full accent-primary"
              />
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
