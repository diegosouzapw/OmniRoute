"use client";

import { useState, useEffect } from "react";
import { Card, Button, Input, Toggle } from "@/shared/components";
import { cn } from "@/shared/utils/cn";
import { useTranslations } from "next-intl";

export default function ComboDefaultsTab() {
  const [comboDefaults, setComboDefaults] = useState<any>({
    strategy: "priority",
    maxRetries: 1,
    retryDelayMs: 2000,
    timeoutMs: 120000,
    healthCheckEnabled: true,
    healthCheckTimeoutMs: 3000,
    maxComboDepth: 3,
    trackMetrics: true,
  });
  const [providerOverrides, setProviderOverrides] = useState<any>({});
  const [newOverrideProvider, setNewOverrideProvider] = useState("");
  const [saving, setSaving] = useState(false);
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const strategyOptions = [
    { value: "priority", label: t("priority"), icon: "sort" },
    { value: "weighted", label: t("weighted"), icon: "percent" },
    { value: "round-robin", label: t("roundRobin"), icon: "autorenew" },
    { value: "random", label: t("random"), icon: "shuffle" },
    { value: "least-used", label: t("leastUsed"), icon: "low_priority" },
    { value: "cost-optimized", label: t("costOpt"), icon: "savings" },
  ];
  const numericSettings = [
    { key: "maxRetries", label: t("maxRetriesLabel"), min: 0, max: 5 },
    { key: "retryDelayMs", label: t("retryDelayLabel"), min: 500, max: 10000, step: 500 },
    { key: "timeoutMs", label: t("timeoutLabel"), min: 5000, max: 300000, step: 5000 },
    { key: "maxComboDepth", label: t("maxNestingDepth"), min: 1, max: 10 },
  ];

  useEffect(() => {
    fetch("/api/settings/combo-defaults")
      .then((res) => res.json())
      .then((data) => {
        if (data.comboDefaults) setComboDefaults(data.comboDefaults);
        if (data.providerOverrides) setProviderOverrides(data.providerOverrides);
      })
      .catch((err) => console.error("Failed to fetch combo defaults:", err));
  }, []);

  const saveComboDefaults = async () => {
    setSaving(true);
    try {
      await fetch("/api/settings/combo-defaults", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comboDefaults, providerOverrides }),
      });
    } catch (err) {
      console.error("Failed to save combo defaults:", err);
    } finally {
      setSaving(false);
    }
  };

  const addProviderOverride = () => {
    const name = newOverrideProvider.trim().toLowerCase();
    if (!name || providerOverrides[name]) return;
    setProviderOverrides((prev) => ({ ...prev, [name]: { maxRetries: 1, timeoutMs: 120000 } }));
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
        <h3 className="text-lg font-semibold">{t("comboDefaultsTitle")}</h3>
        <span className="text-xs text-text-muted ml-auto">{t("globalComboConfig")}</span>
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
            className="grid grid-cols-3 gap-1 p-0.5 rounded-md bg-black/5 dark:bg-white/5"
          >
            {strategyOptions.map((s) => (
              <button
                key={s.value}
                role="tab"
                aria-selected={comboDefaults.strategy === s.value}
                onClick={() => setComboDefaults((prev) => ({ ...prev, strategy: s.value }))}
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

        {/* Toggles */}
        <div className="flex flex-col gap-3 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{t("healthCheck")}</p>
              <p className="text-xs text-text-muted">{t("healthCheckDesc")}</p>
            </div>
            <Toggle
              checked={comboDefaults.healthCheckEnabled !== false}
              onChange={() =>
                setComboDefaults((prev) => ({
                  ...prev,
                  healthCheckEnabled: !prev.healthCheckEnabled,
                }))
              }
            />
          </div>
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
              <Input
                type="number"
                min="5000"
                max="300000"
                step="5000"
                value={config.timeoutMs ?? 120000}
                onChange={(e) =>
                  setProviderOverrides((prev) => ({
                    ...prev,
                    [provider]: {
                      ...prev[provider],
                      timeoutMs: parseInt(e.target.value) || 120000,
                    },
                  }))
                }
                className="text-xs w-24"
                aria-label={t("providerTimeoutAria", { provider })}
              />
              <span className="text-[10px] text-text-muted">{t("ms")}</span>
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
