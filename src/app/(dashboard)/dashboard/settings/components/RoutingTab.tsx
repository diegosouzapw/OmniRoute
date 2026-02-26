"use client";

import { useState, useEffect } from "react";
import { Card, Input, Button } from "@/shared/components";
import FallbackChainsEditor from "./FallbackChainsEditor";
import { useTranslations } from "next-intl";

const STRATEGIES = [
  {
    value: "fill-first",
    labelKey: "fillFirst",
    descKey: "fillFirstDesc",
    icon: "vertical_align_top",
  },
  { value: "round-robin", labelKey: "roundRobin", descKey: "roundRobinDesc", icon: "loop" },
  { value: "p2c", labelKey: "p2c", descKey: "p2cDesc", icon: "balance" },
  { value: "random", labelKey: "random", descKey: "randomDesc", icon: "shuffle" },
  {
    value: "least-used",
    labelKey: "leastUsed",
    descKey: "leastUsedDesc",
    icon: "low_priority",
  },
  {
    value: "cost-optimized",
    labelKey: "costOpt",
    descKey: "costOptDesc",
    icon: "savings",
  },
];

export default function RoutingTab() {
  const [settings, setSettings] = useState<any>({ fallbackStrategy: "fill-first" });
  const [loading, setLoading] = useState(true);
  const [aliases, setAliases] = useState([]);
  const [newPattern, setNewPattern] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const t = useTranslations("settings");
  const strategyHintKeyByValue: Record<string, string> = {
    "fill-first": "fillFirstDesc",
    "round-robin": "roundRobinDesc",
    p2c: "p2cDesc",
    random: "randomDesc",
    "least-used": "leastUsedDesc",
    "cost-optimized": "costOptDesc",
  };

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setAliases(data.wildcardAliases || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateSetting = async (patch) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, ...patch }));
      }
    } catch (err) {
      console.error("Failed to update settings:", err);
    }
  };

  const addAlias = async () => {
    if (!newPattern.trim() || !newTarget.trim()) return;
    const updated = [...aliases, { pattern: newPattern.trim(), target: newTarget.trim() }];
    await updateSetting({ wildcardAliases: updated });
    setAliases(updated);
    setNewPattern("");
    setNewTarget("");
  };

  const removeAlias = async (idx) => {
    const updated = aliases.filter((_, i) => i !== idx);
    await updateSetting({ wildcardAliases: updated });
    setAliases(updated);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Strategy Selection */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              route
            </span>
          </div>
          <h3 className="text-lg font-semibold">{t("routingStrategy")}</h3>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 mb-4"
          style={{ gridAutoRows: "1fr" }}
        >
          {STRATEGIES.map((s) => (
            <button
              key={s.value}
              onClick={() => updateSetting({ fallbackStrategy: s.value })}
              disabled={loading}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border text-center transition-all ${
                settings.fallbackStrategy === s.value
                  ? "border-blue-500/50 bg-blue-500/5 ring-1 ring-blue-500/20"
                  : "border-border/50 hover:border-border hover:bg-surface/30"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[24px] ${
                  settings.fallbackStrategy === s.value ? "text-blue-400" : "text-text-muted"
                }`}
              >
                {s.icon}
              </span>
              <div>
                <p
                  className={`text-sm font-medium ${settings.fallbackStrategy === s.value ? "text-blue-400" : ""}`}
                >
                  {t(s.labelKey)}
                </p>
                <p className="text-xs text-text-muted mt-0.5">{t(s.descKey)}</p>
              </div>
            </button>
          ))}
        </div>

        {settings.fallbackStrategy === "round-robin" && (
          <div className="flex items-center justify-between pt-3 border-t border-border/30">
            <div>
              <p className="text-sm font-medium">{t("stickyLimit")}</p>
              <p className="text-xs text-text-muted">{t("stickyLimitDesc")}</p>
            </div>
            <Input
              type="number"
              min="1"
              max="10"
              value={settings.stickyRoundRobinLimit || 3}
              onChange={(e) => updateSetting({ stickyRoundRobinLimit: parseInt(e.target.value) })}
              disabled={loading}
              className="w-20 text-center"
            />
          </div>
        )}

        <p className="text-xs text-text-muted italic pt-3 border-t border-border/30 mt-3">
          {t(strategyHintKeyByValue[settings.fallbackStrategy] || "fillFirstDesc")}
        </p>
      </Card>

      {/* Wildcard Aliases */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              alt_route
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("modelAliases")}</h3>
            <p className="text-sm text-text-muted">{t("modelAliasesDesc")}</p>
          </div>
        </div>

        {aliases.length > 0 && (
          <div className="flex flex-col gap-1.5 mb-4">
            {aliases.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-surface/30 border border-border/20"
              >
                <div className="flex min-w-0 items-center gap-2 text-sm">
                  <span className="font-mono text-purple-400 break-all">{a.pattern}</span>
                  <span className="material-symbols-outlined text-[14px] text-text-muted">
                    arrow_forward
                  </span>
                  <span className="font-mono text-text-main break-all">{a.target}</span>
                </div>
                <button
                  onClick={() => removeAlias(i)}
                  className="shrink-0 text-text-muted hover:text-red-400 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-end">
          <div className="flex-1">
            <Input
              label={t("pattern")}
              placeholder={t("aliasPatternPlaceholder")}
              value={newPattern}
              onChange={(e) => setNewPattern(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              label={t("targetModel")}
              placeholder={t("aliasTargetPlaceholder")}
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
            />
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={addAlias}
            className="mb-[2px] sm:w-auto w-full"
          >
            {t("add")}
          </Button>
        </div>
      </Card>

      {/* Fallback Chains */}
      <FallbackChainsEditor />
    </div>
  );
}
