"use client";

import { useState, useEffect } from "react";
import { Card, Button, Input, Toggle } from "@/shared/components";
import { cn } from "@/shared/utils/cn";

export default function ComboDefaultsTab() {
  const [comboDefaults, setComboDefaults] = useState({
    strategy: "priority",
    maxRetries: 1,
    retryDelayMs: 2000,
    timeoutMs: 120000,
    healthCheckEnabled: true,
    healthCheckTimeoutMs: 3000,
    maxComboDepth: 3,
    trackMetrics: true,
  });
  const [providerOverrides, setProviderOverrides] = useState({});
  const [newOverrideProvider, setNewOverrideProvider] = useState("");
  const [saving, setSaving] = useState(false);

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
        <h3 className="text-lg font-semibold">Combo Defaults</h3>
        <span className="text-xs text-text-muted ml-auto">Global combo configuration</span>
      </div>
      <div className="flex flex-col gap-4">
        {/* Default Strategy */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Default Strategy</p>
            <p className="text-xs text-text-muted">
              Applied to new combos without explicit strategy
            </p>
          </div>
          <div
            role="tablist"
            aria-label="Combo strategy"
            className="inline-flex p-0.5 rounded-md bg-black/5 dark:bg-white/5"
          >
            {["priority", "weighted", "round-robin"].map((s) => (
              <button
                key={s}
                role="tab"
                aria-selected={comboDefaults.strategy === s}
                onClick={() => setComboDefaults((prev) => ({ ...prev, strategy: s }))}
                className={cn(
                  "px-3 py-1 rounded text-xs font-medium transition-all capitalize",
                  comboDefaults.strategy === s
                    ? "bg-white dark:bg-white/10 text-text-main shadow-sm"
                    : "text-text-muted hover:text-text-main"
                )}
              >
                {s === "round-robin" ? "Round-Robin" : s}
              </button>
            ))}
          </div>
        </div>

        {/* Numeric settings */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
          {[
            { key: "maxRetries", label: "Max Retries", min: 0, max: 5 },
            { key: "retryDelayMs", label: "Retry Delay (ms)", min: 500, max: 10000, step: 500 },
            { key: "timeoutMs", label: "Timeout (ms)", min: 5000, max: 300000, step: 5000 },
            { key: "maxComboDepth", label: "Max Nesting Depth", min: 1, max: 10 },
          ].map(({ key, label, min, max, step }) => (
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
              label="Concurrency / Model"
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
              label="Queue Timeout (ms)"
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
              <p className="font-medium text-sm">Health Check</p>
              <p className="text-xs text-text-muted">Pre-check provider availability</p>
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
              <p className="font-medium text-sm">Track Metrics</p>
              <p className="text-xs text-text-muted">Record per-combo request metrics</p>
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
          <p className="font-medium text-sm mb-2">Provider Overrides</p>
          <p className="text-xs text-text-muted mb-3">
            Override timeout and retries per provider. Provider settings override global defaults.
          </p>

          {Object.entries(providerOverrides).map(([provider, config]) => (
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
                aria-label={`${provider} max retries`}
              />
              <span className="text-[10px] text-text-muted">retries</span>
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
                aria-label={`${provider} timeout ms`}
              />
              <span className="text-[10px] text-text-muted">ms</span>
              <button
                onClick={() => removeProviderOverride(provider)}
                className="ml-auto text-red-400 hover:text-red-500 transition-colors"
                aria-label={`Remove ${provider} override`}
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
              placeholder="e.g. google, openai..."
              value={newOverrideProvider}
              onChange={(e) => setNewOverrideProvider(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addProviderOverride()}
              className="text-xs flex-1"
              aria-label="New provider name"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={addProviderOverride}
              disabled={!newOverrideProvider.trim()}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Save */}
        <div className="pt-3 border-t border-border/50">
          <Button variant="primary" size="sm" onClick={saveComboDefaults} loading={saving}>
            Save Combo Defaults
          </Button>
        </div>
      </div>
    </Card>
  );
}
