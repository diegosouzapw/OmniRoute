"use client";

import { useState, useEffect } from "react";
import { Card, Button, Input, Toggle } from "@/shared/components";
import { cn } from "@/shared/utils/cn";
import {
  ROUTING_STRATEGIES,
  SETTINGS_FALLBACK_STRATEGY_VALUES,
} from "@/shared/constants/routingStrategies";
import { useTranslations } from "next-intl";

const STRATEGY_LABEL_FALLBACKS: Record<string, string> = {
  "context-relay": "Context Relay",
};

const LEGACY_COMBO_RESILIENCE_KEYS = new Set([
  "timeoutMs",
  "healthCheckEnabled",
  "healthCheckTimeoutMs",
]);
const ACCOUNT_FALLBACK_STRATEGIES = new Set<string>(SETTINGS_FALLBACK_STRATEGY_VALUES);

function translateOrFallback(
  t: ReturnType<typeof useTranslations>,
  key: string,
  fallback: string
): string {
  return typeof t.has === "function" && t.has(key) ? t(key) : fallback;
}

function sanitizeComboRuntimeConfig(config?: Record<string, any> | null) {
  if (!config || typeof config !== "object") return {};
  return Object.fromEntries(
    Object.entries(config).filter(
      ([key, value]) =>
        value !== undefined && value !== null && !LEGACY_COMBO_RESILIENCE_KEYS.has(key)
    )
  );
}

function sanitizeProviderOverrides(overrides?: Record<string, any> | null) {
  if (!overrides || typeof overrides !== "object") return {};
  return Object.fromEntries(
    Object.entries(overrides).map(([providerId, config]) => [
      providerId,
      sanitizeComboRuntimeConfig(config),
    ])
  );
}

function toGlobalRoutingPatch(strategy: string | undefined, stickyRoundRobinLimit?: number) {
  const patch: Record<string, unknown> = {};
  if (strategy && ACCOUNT_FALLBACK_STRATEGIES.has(strategy)) {
    patch.fallbackStrategy = strategy;
  }
  if (strategy === "round-robin" && stickyRoundRobinLimit !== undefined) {
    patch.stickyRoundRobinLimit = stickyRoundRobinLimit;
  }
  return patch;
}

export default function ComboDefaultsTab() {
  const [comboDefaults, setComboDefaults] = useState<any>({
    strategy: "priority",
    maxRetries: 1,
    retryDelayMs: 2000,
    maxComboDepth: 3,
    trackMetrics: true,
    handoffThreshold: 0.85,
    handoffModel: "",
    maxMessagesForSummary: 30,
    stickyRoundRobinLimit: 3,
  });
  const [providerOverrides, setProviderOverrides] = useState<any>({});
  const [newOverrideProvider, setNewOverrideProvider] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  });
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const strategyOptions = ROUTING_STRATEGIES.map((strategy) => ({
    value: strategy.value,
    label: translateOrFallback(
      t,
      strategy.labelKey,
      STRATEGY_LABEL_FALLBACKS[strategy.value] || strategy.value
    ),
    icon: strategy.icon,
  }));
  const numericSettings = [
    { key: "maxRetries", label: t("maxRetriesLabel"), min: 0, max: 5 },
    { key: "retryDelayMs", label: t("retryDelayLabel"), min: 500, max: 10000, step: 500 },
    { key: "maxComboDepth", label: t("maxNestingDepth"), min: 1, max: 10 },
  ];

  useEffect(() => {
    Promise.all([
      fetch("/api/settings/combo-defaults").then((res) => res.json()),
      fetch("/api/settings").then((res) => res.json()),
    ])
      .then(([comboData, settingsData]) => {
        setComboDefaults((prev) => ({
          ...prev,
          ...sanitizeComboRuntimeConfig(comboData.comboDefaults),
          strategy:
            comboData.comboDefaults?.strategy ?? settingsData.fallbackStrategy ?? prev.strategy,
          stickyRoundRobinLimit:
            settingsData.stickyRoundRobinLimit ??
            comboData.comboDefaults?.stickyRoundRobinLimit ??
            prev.stickyRoundRobinLimit,
        }));
        if (comboData.providerOverrides) {
          setProviderOverrides(sanitizeProviderOverrides(comboData.providerOverrides));
        }
      })
      .catch((err) => console.error("Failed to fetch combo defaults:", err));
  }, []);

  const showStatus = (type: "success" | "error", message: string) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: "", message: "" }), 2500);
  };

  const syncGlobalRoutingSettings = async (patch: Record<string, unknown>) => {
    if (Object.keys(patch).length === 0) return;

    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });

    if (!res.ok) {
      throw new Error("Failed to sync global routing settings");
    }
  };

  const saveComboDefaults = async () => {
    setSaving(true);
    try {
      const { stickyRoundRobinLimit, ...comboDefaultsPayload } = comboDefaults;
      const settingsPatch = toGlobalRoutingPatch(comboDefaults.strategy, stickyRoundRobinLimit);

      const comboDefaultsRes = await fetch("/api/settings/combo-defaults", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comboDefaults: sanitizeComboRuntimeConfig(comboDefaultsPayload),
          providerOverrides: sanitizeProviderOverrides(providerOverrides),
        }),
      });

      if (!comboDefaultsRes.ok) {
        throw new Error("Failed to save combo defaults");
      }

      await syncGlobalRoutingSettings(settingsPatch);
      showStatus("success", t("savedSuccessfully"));
    } catch (err) {
      console.error("Failed to save combo defaults:", err);
      showStatus("error", t("errorOccurred"));
    } finally {
      setSaving(false);
    }
  };

  const addProviderOverride = () => {
    const name = newOverrideProvider.trim().toLowerCase();
    if (!name || providerOverrides[name]) return;
    setProviderOverrides((prev) => ({ ...prev, [name]: { maxRetries: 1 } }));
    setNewOverrideProvider("");
  };

  const removeProviderOverride = (provider) => {
    setProviderOverrides((prev) => {
      const copy = { ...prev };
      delete copy[provider];
      return copy;
    });
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            tune
          </span>
        </div>
        <h3 className="text-lg font-semibold">
          {translateOrFallback(t, "comboDefaultsTitle", "Default Routing & Combo Settings")}
        </h3>
        <span className="text-xs text-text-muted ml-auto">{t("globalComboConfig")}</span>
        {status.message && (
          <span
            className={`text-xs font-medium ml-2 ${
              status.type === "success" ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {status.message}
          </span>
        )}
      </div>
      <div className="mb-4 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
        <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
          {translateOrFallback(t, "routingAdvancedGuideTitle", "Advanced routing guidance")}
        </p>
        <p className="text-xs text-text-muted mt-1">
          {translateOrFallback(
            t,
            "routingAdvancedGuideHint1",
            "Use Fill First for predictable priority, Round Robin for fairness, and P2C for latency resilience."
          )}
        </p>
        <p className="text-xs text-text-muted">
          {translateOrFallback(
            t,
            "routingAdvancedGuideHint2",
            "If providers vary in quality or cost, start with Cost Opt for background work and Least Used for balanced wear."
          )}
        </p>
      </div>
      <div className="mb-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
        <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
          {t("comboDefaultsGuideTitle")}
        </p>
        <p className="text-xs text-text-muted mt-1">{t("comboDefaultsGuideHint1")}</p>
        <p className="text-xs text-text-muted">{t("comboDefaultsGuideHint2")}</p>
      </div>
      <div className="flex flex-col gap-4">
        {/* Default Strategy */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">{t("defaultStrategy")}</p>
            <p className="text-xs text-text-muted">{t("defaultStrategyDesc")}</p>
          </div>
          <div
            role="tablist"
            aria-label={t("comboStrategyAria")}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 p-0.5 rounded-md bg-black/5 dark:bg-white/5"
          >
            {strategyOptions.map((s) => (
              <button
                key={s.value}
                role="tab"
                aria-selected={comboDefaults.strategy === s.value}
                onClick={async () => {
                  setComboDefaults((prev) => ({ ...prev, strategy: s.value }));
                  try {
                    await syncGlobalRoutingSettings(toGlobalRoutingPatch(s.value));
                  } catch (error) {
                    console.error("Failed to sync fallback strategy:", error);
                    showStatus("error", t("errorOccurred"));
                  }
                }}
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium transition-all flex items-center justify-center gap-0.5",
                  comboDefaults.strategy === s.value
                    ? "bg-white dark:bg-white/10 text-text-main shadow-sm"
                    : "text-text-muted hover:text-text-main"
                )}
              >
                <span className="material-symbols-outlined text-[14px]">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {comboDefaults.strategy === "round-robin" && (
          <div className="flex items-center justify-between pt-3 border-t border-border/30">
            <div>
              <p className="text-sm font-medium">{t("stickyLimit")}</p>
              <p className="text-xs text-text-muted">{t("stickyLimitDesc")}</p>
            </div>
            <Input
              type="number"
              min="1"
              max="10"
              value={comboDefaults.stickyRoundRobinLimit || 3}
              onChange={async (e) => {
                const nextLimit = parseInt(e.target.value) || 3;
                setComboDefaults((prev) => ({
                  ...prev,
                  stickyRoundRobinLimit: nextLimit,
                }));
                try {
                  await syncGlobalRoutingSettings({ stickyRoundRobinLimit: nextLimit });
                } catch (error) {
                  console.error("Failed to sync sticky round robin limit:", error);
                  showStatus("error", t("errorOccurred"));
                }
              }}
              className="w-20 text-center"
            />
          </div>
        )}

        {/* Numeric settings */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
          {numericSettings.map(({ key, label, min, max, step }) => (
            <Input
              key={key}
              label={label}
              type="number"
              min={min}
              max={max}
              step={step || 1}
              value={comboDefaults[key] ?? ""}
              onChange={(e) =>
                setComboDefaults((prev) => ({ ...prev, [key]: parseInt(e.target.value) || 0 }))
              }
              className="text-sm"
            />
          ))}
        </div>

        {/* Round-Robin specific */}
        {comboDefaults.strategy === "round-robin" && (
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
            <Input
              label={t("concurrencyPerModel")}
              type="number"
              min={1}
              max={20}
              value={comboDefaults.concurrencyPerModel ?? ""}
              placeholder="3"
              onChange={(e) =>
                setComboDefaults((prev) => ({
                  ...prev,
                  concurrencyPerModel: parseInt(e.target.value) || 0,
                }))
              }
              className="text-sm"
            />
            <Input
              label={t("queueTimeout")}
              type="number"
              min={1000}
              max={120000}
              step={1000}
              value={comboDefaults.queueTimeoutMs ?? ""}
              placeholder="30000"
              onChange={(e) =>
                setComboDefaults((prev) => ({
                  ...prev,
                  queueTimeoutMs: parseInt(e.target.value) || 0,
                }))
              }
              className="text-sm"
            />
          </div>
        )}

        {comboDefaults.strategy === "context-relay" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-border/50">
            <Input
              label={translateOrFallback(t, "contextRelayHandoffThreshold", "Handoff Threshold")}
              type="number"
              min={0.5}
              max={0.94}
              step={0.01}
              value={comboDefaults.handoffThreshold ?? ""}
              placeholder="0.85"
              onChange={(e) =>
                setComboDefaults((prev) => ({
                  ...prev,
                  handoffThreshold: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="text-sm"
            />
            <Input
              label={translateOrFallback(t, "contextRelayMaxMessages", "Max Messages For Summary")}
              type="number"
              min={5}
              max={100}
              value={comboDefaults.maxMessagesForSummary ?? ""}
              placeholder="30"
              onChange={(e) =>
                setComboDefaults((prev) => ({
                  ...prev,
                  maxMessagesForSummary: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="text-sm"
            />
            <Input
              label={translateOrFallback(t, "contextRelaySummaryModel", "Summary Model")}
              type="text"
              value={comboDefaults.handoffModel ?? ""}
              placeholder="codex/gpt-5.4"
              onChange={(e) =>
                setComboDefaults((prev) => ({
                  ...prev,
                  handoffModel: e.target.value,
                }))
              }
              className="text-sm"
            />
            <div className="md:col-span-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                {translateOrFallback(
                  t,
                  "contextRelayProviderNote",
                  "Context Relay currently generates handoffs for Codex accounts and uses these values as global defaults for new or unconfigured combos."
                )}
              </p>
            </div>
          </div>
        )}

        {/* Toggles */}
        <div className="flex flex-col gap-3 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{t("trackMetrics")}</p>
              <p className="text-xs text-text-muted">{t("trackMetricsDesc")}</p>
            </div>
            <Toggle
              checked={comboDefaults.trackMetrics !== false}
              onChange={() =>
                setComboDefaults((prev) => ({ ...prev, trackMetrics: !prev.trackMetrics }))
              }
            />
          </div>
        </div>

        {/* Provider Overrides */}
        <div className="pt-3 border-t border-border/50">
          <p className="font-medium text-sm mb-2">{t("providerOverrides")}</p>
          <p className="text-xs text-text-muted mb-3">{t("providerOverridesDesc")}</p>

          {Object.entries(providerOverrides).map(([provider, config]: [string, any]) => (
            <div
              key={provider}
              className="flex items-center gap-2 mb-2 p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]"
            >
              <span className="text-xs font-mono font-medium min-w-[80px]">{provider}</span>
              <Input
                type="number"
                min="0"
                max="5"
                value={config.maxRetries ?? 1}
                onChange={(e) =>
                  setProviderOverrides((prev) => ({
                    ...prev,
                    [provider]: { ...prev[provider], maxRetries: parseInt(e.target.value) || 0 },
                  }))
                }
                className="text-xs w-16"
                aria-label={t("providerMaxRetriesAria", { provider })}
              />
              <span className="text-[10px] text-text-muted">{t("retries")}</span>
              <button
                onClick={() => removeProviderOverride(provider)}
                className="ml-auto text-red-400 hover:text-red-500 transition-colors"
                aria-label={t("removeProviderOverrideAria", { provider })}
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  close
                </span>
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2 mt-2">
            <Input
              type="text"
              placeholder={t("newProviderNamePlaceholder")}
              value={newOverrideProvider}
              onChange={(e) => setNewOverrideProvider(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addProviderOverride()}
              className="text-xs flex-1"
              aria-label={t("newProviderNameAria")}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={addProviderOverride}
              disabled={!newOverrideProvider.trim()}
            >
              {tc("add")}
            </Button>
          </div>
        </div>

        {/* Save */}
        <div className="pt-3 border-t border-border/50">
          <Button variant="primary" size="sm" onClick={saveComboDefaults} loading={saving}>
            {t("saveComboDefaults")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
