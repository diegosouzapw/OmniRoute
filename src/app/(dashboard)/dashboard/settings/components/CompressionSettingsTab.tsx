"use client";

import { useState, useEffect } from "react";
import { Card, Button } from "@/shared/components";
import { useTranslations } from "next-intl";

type CompressionMode = "off" | "lite" | "standard" | "aggressive" | "ultra" | "rtk" | "stacked";
type CavemanIntensity = "lite" | "full" | "ultra";

interface CavemanConfig {
  enabled: boolean;
  compressRoles: ("user" | "assistant" | "system")[];
  skipRules: string[];
  minMessageLength: number;
  preservePatterns: string[];
  intensity: CavemanIntensity;
}

interface CavemanOutputModeConfig {
  enabled: boolean;
  intensity: CavemanIntensity;
  autoClarity: boolean;
}

interface AggressiveConfig {
  thresholds: {
    fullSummary: number;
    moderate: number;
    light: number;
    verbatim: number;
  };
  toolStrategies: {
    fileContent: boolean;
    grepSearch: boolean;
    shellOutput: boolean;
    json: boolean;
    errorMessage: boolean;
  };
  summarizerEnabled: boolean;
  maxTokensPerMessage: number;
  minSavingsThreshold: number;
}

interface UltraConfig {
  enabled: boolean;
  compressionRate: number;
  minScoreThreshold: number;
  slmFallbackToAggressive: boolean;
  modelPath?: string;
  maxTokensPerMessage: number;
}

interface CompressionConfig {
  enabled: boolean;
  defaultMode: CompressionMode;
  autoTriggerMode?: CompressionMode;
  autoTriggerTokens: number;
  cacheMinutes: number;
  preserveSystemPrompt: boolean;
  mcpDescriptionCompressionEnabled?: boolean;
  comboOverrides: Record<string, CompressionMode>;
  cavemanConfig?: CavemanConfig;
  cavemanOutputMode?: CavemanOutputModeConfig;
  aggressive?: AggressiveConfig;
  ultra?: UltraConfig;
}

interface RuleMetadata {
  name: string;
  category: string;
  context: string;
  minIntensity: CavemanIntensity;
  intensities?: CavemanIntensity[];
  description: string;
}

const MODES: { value: CompressionMode; labelKey: string; descKey: string; icon: string }[] = [
  {
    value: "off",
    labelKey: "compressionModeOff",
    descKey: "compressionModeOffDesc",
    icon: "block",
  },
  {
    value: "lite",
    labelKey: "compressionModeLite",
    descKey: "compressionModeLiteDesc",
    icon: "compress",
  },
  {
    value: "standard",
    labelKey: "compressionModeStandard",
    descKey: "compressionModeStandardDesc",
    icon: "speed",
  },
  {
    value: "aggressive",
    labelKey: "compressionModeAggressive",
    descKey: "compressionModeAggressiveDesc",
    icon: "bolt",
  },
  {
    value: "ultra",
    labelKey: "compressionModeUltra",
    descKey: "compressionModeUltraDesc",
    icon: "filter_alt",
  },
  {
    value: "rtk",
    labelKey: "compressionModeRtk",
    descKey: "compressionModeRtkDesc",
    icon: "filter_list",
  },
  {
    value: "stacked",
    labelKey: "compressionModeStacked",
    descKey: "compressionModeStackedDesc",
    icon: "hub",
  },
];

const ROLE_OPTIONS: { value: "user" | "assistant" | "system"; labelKey: string }[] = [
  { value: "user", labelKey: "compressionRoleUser" },
  { value: "assistant", labelKey: "compressionRoleAssistant" },
  { value: "system", labelKey: "compressionRoleSystem" },
];

export default function CompressionSettingsTab() {
  const t = useTranslations("settings");
  const [config, setConfig] = useState<CompressionConfig>({
    enabled: false,
    defaultMode: "off",
    autoTriggerTokens: 0,
    cacheMinutes: 5,
    preserveSystemPrompt: true,
    comboOverrides: {},
    cavemanConfig: {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
      intensity: "full",
    },
    cavemanOutputMode: {
      enabled: false,
      intensity: "full",
      autoClarity: true,
    },
    aggressive: {
      thresholds: { fullSummary: 5, moderate: 3, light: 2, verbatim: 2 },
      toolStrategies: {
        fileContent: true,
        grepSearch: true,
        shellOutput: true,
        json: true,
        errorMessage: true,
      },
      summarizerEnabled: true,
      maxTokensPerMessage: 2048,
      minSavingsThreshold: 0.05,
    },
    ultra: {
      enabled: false,
      compressionRate: 0.5,
      minScoreThreshold: 0.3,
      slmFallbackToAggressive: true,
      maxTokensPerMessage: 0,
    },
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"" | "saved" | "error">("");
  const [ruleMetadata, setRuleMetadata] = useState<RuleMetadata[]>([]);

  useEffect(() => {
    fetch("/api/settings/compression")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setConfig(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    fetch("/api/compression/rules")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.rules)) setRuleMetadata(data.rules);
      })
      .catch(() => {});
  }, []);

  const save = async (updates: Partial<CompressionConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/settings/compression", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const toggleCavemanRole = (role: "user" | "assistant" | "system") => {
    const currentRoles = config.cavemanConfig?.compressRoles ?? ["user"];
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter((r) => r !== role)
      : [...currentRoles, role];
    save({
      cavemanConfig: { ...config.cavemanConfig!, compressRoles: newRoles },
    });
  };

  const toggleCavemanRule = (rule: string) => {
    const currentSkip = config.cavemanConfig?.skipRules ?? [];
    const newSkip = currentSkip.includes(rule)
      ? currentSkip.filter((r) => r !== rule)
      : [...currentSkip, rule];
    save({
      cavemanConfig: { ...config.cavemanConfig!, skipRules: newSkip },
    });
  };

  if (loading) {
    return (
      <Card className="p-6">
        <p className="text-sm text-text-muted">{t("loading")}</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            compress
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{t("compressionTitle")}</h3>
          <p className="text-sm text-text-muted">{t("compressionDesc")}</p>
        </div>
        {status === "saved" && (
          <span className="ml-auto text-xs font-medium text-emerald-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span> {t("saved")}
          </span>
        )}
        {status === "error" && (
          <span className="ml-auto text-xs font-medium text-red-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span> {t("saveFailed")}
          </span>
        )}
      </div>

      <div className="space-y-6">
        <label className="flex items-center justify-between">
          <span className="text-sm text-text-muted">{t("enabled")}</span>
          <button
            onClick={() => save({ enabled: !config.enabled })}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              config.enabled ? "bg-green-500" : "bg-border"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                config.enabled ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </label>

        {config.enabled && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-main">{t("compressionMode")}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-7 gap-2">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  onClick={() => save({ defaultMode: m.value })}
                  disabled={saving}
                  className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                    config.defaultMode === m.value
                      ? "border-blue-500/50 bg-blue-500/5 ring-1 ring-blue-500/20"
                      : "border-border/50 hover:border-border hover:bg-surface/30"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] mt-0.5 ${
                      config.defaultMode === m.value ? "text-blue-500" : "text-text-muted"
                    }`}
                  >
                    {m.icon}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        config.defaultMode === m.value ? "text-blue-400" : ""
                      }`}
                    >
                      {t(m.labelKey)}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{t(m.descKey)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {config.enabled && (
          <div className="space-y-3 pt-4 border-t border-border/30">
            <h4 className="text-sm font-medium text-text-main">{t("compressionGeneral")}</h4>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionAutoTrigger")}</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={100000}
                  value={config.autoTriggerTokens}
                  onChange={(e) => save({ autoTriggerTokens: parseInt(e.target.value) || 0 })}
                  className="w-24 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
                />
                <span className="text-xs text-text-muted">{t("tokens")}</span>
              </div>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Auto trigger mode</span>
              <select
                value={config.autoTriggerMode ?? "lite"}
                onChange={(e) => save({ autoTriggerMode: e.target.value as CompressionMode })}
                className="w-36 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
              >
                {MODES.filter((mode) => mode.value !== "off").map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.value}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionCacheTTL")}</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={1440}
                  value={config.cacheMinutes}
                  onChange={(e) => save({ cacheMinutes: parseInt(e.target.value) || 5 })}
                  className="w-24 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
                />
                <span className="text-xs text-text-muted">{t("minutes")}</span>
              </div>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionPreserveSystem")}</span>
              <button
                onClick={() => save({ preserveSystemPrompt: !config.preserveSystemPrompt })}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  config.preserveSystemPrompt ? "bg-green-500" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    config.preserveSystemPrompt ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">MCP description compression</span>
              <button
                onClick={() =>
                  save({
                    mcpDescriptionCompressionEnabled:
                      config.mcpDescriptionCompressionEnabled === false,
                  })
                }
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  config.mcpDescriptionCompressionEnabled !== false ? "bg-green-500" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    config.mcpDescriptionCompressionEnabled !== false ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </label>
          </div>
        )}

        {config.enabled &&
          config.defaultMode !== "off" &&
          config.defaultMode !== "lite" &&
          config.cavemanConfig && (
            <div className="space-y-3 pt-4 border-t border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-text-main">
                    {t("compressionCavemanConfig")}
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">
                    {t("compressionCavemanConfigDesc")}
                  </p>
                </div>
                <button
                  onClick={() =>
                    save({
                      cavemanConfig: {
                        ...config.cavemanConfig!,
                        enabled: !config.cavemanConfig!.enabled,
                      },
                    })
                  }
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    config.cavemanConfig.enabled ? "bg-green-500" : "bg-border"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      config.cavemanConfig.enabled ? "left-5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              {config.cavemanConfig.enabled && (
                <>
                  <div className="space-y-2">
                    <p className="text-sm text-text-muted">{t("compressionRoles")}</p>
                    <div className="flex flex-wrap gap-2">
                      {ROLE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => toggleCavemanRole(opt.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            config.cavemanConfig!.compressRoles.includes(opt.value)
                              ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                              : "border-border/50 text-text-muted hover:border-border"
                          }`}
                        >
                          {t(opt.labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">{t("compressionMinLength")}</span>
                    <input
                      type="number"
                      min={0}
                      max={100000}
                      value={config.cavemanConfig.minMessageLength}
                      onChange={(e) =>
                        save({
                          cavemanConfig: {
                            ...config.cavemanConfig!,
                            minMessageLength: parseInt(e.target.value) || 50,
                          },
                        })
                      }
                      className="w-24 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Caveman intensity</span>
                    <select
                      value={config.cavemanConfig.intensity}
                      onChange={(e) =>
                        save({
                          cavemanConfig: {
                            ...config.cavemanConfig!,
                            intensity: e.target.value as CavemanIntensity,
                          },
                        })
                      }
                      className="w-28 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
                    >
                      <option value="lite">lite</option>
                      <option value="full">full</option>
                      <option value="ultra">ultra</option>
                    </select>
                  </label>

                  <div className="space-y-2">
                    <p className="text-sm text-text-muted">{t("compressionSkipRules")}</p>
                    <p className="text-xs text-text-muted">{t("compressionSkipRulesDesc")}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {ruleMetadata.map((rule) => (
                        <button
                          key={rule.name}
                          onClick={() => toggleCavemanRule(rule.name)}
                          title={`${rule.category} · ${rule.context} · ${(rule.intensities ?? [rule.minIntensity]).join("/")}`}
                          className={`px-2 py-1 rounded text-xs border transition-all ${
                            config.cavemanConfig!.skipRules.includes(rule.name)
                              ? "border-red-500/50 bg-red-500/10 text-red-400 line-through"
                              : "border-border/50 text-text-muted hover:border-border"
                          }`}
                        >
                          {rule.name.replace(/_/g, " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-text-muted">{t("compressionPreservePatterns")}</p>
                    <p className="text-xs text-text-muted">
                      {t("compressionPreservePatternsDesc")}
                    </p>
                    <textarea
                      value={(config.cavemanConfig.preservePatterns ?? []).join("\n")}
                      onChange={(e) => {
                        const patterns = e.target.value
                          .split("\n")
                          .map((p) => p.trim())
                          .filter(Boolean);
                        save({
                          cavemanConfig: {
                            ...config.cavemanConfig!,
                            preservePatterns: patterns,
                          },
                        });
                      }}
                      placeholder="https?://\S+\n```[\s\S]*?```"
                      className="w-full min-h-[80px] px-3 py-2 text-sm rounded-lg border border-border bg-surface text-text-main font-mono resize-y"
                    />
                  </div>
                </>
              )}
            </div>
          )}

        {config.enabled && config.cavemanOutputMode && (
          <div className="space-y-3 pt-4 border-t border-border/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-text-main">Caveman output mode</h4>
                <p className="text-xs text-text-muted mt-0.5">
                  Injects terse response instructions without rewriting provider output.
                </p>
              </div>
              <button
                onClick={() =>
                  save({
                    cavemanOutputMode: {
                      ...config.cavemanOutputMode!,
                      enabled: !config.cavemanOutputMode!.enabled,
                    },
                  })
                }
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  config.cavemanOutputMode.enabled ? "bg-green-500" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    config.cavemanOutputMode.enabled ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Output intensity</span>
              <select
                value={config.cavemanOutputMode.intensity}
                onChange={(e) =>
                  save({
                    cavemanOutputMode: {
                      ...config.cavemanOutputMode!,
                      intensity: e.target.value as CavemanIntensity,
                    },
                  })
                }
                className="w-28 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
              >
                <option value="lite">lite</option>
                <option value="full">full</option>
                <option value="ultra">ultra</option>
              </select>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Auto clarity bypass</span>
              <button
                onClick={() =>
                  save({
                    cavemanOutputMode: {
                      ...config.cavemanOutputMode!,
                      autoClarity: !config.cavemanOutputMode!.autoClarity,
                    },
                  })
                }
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  config.cavemanOutputMode.autoClarity ? "bg-green-500" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    config.cavemanOutputMode.autoClarity ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </label>
          </div>
        )}

        {config.enabled && config.defaultMode === "aggressive" && config.aggressive && (
          <div className="space-y-3 pt-4 border-t border-border/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-text-main">
                  {t("compressionAggressiveConfig")}
                </h4>
                <p className="text-xs text-text-muted mt-0.5">
                  {t("compressionAggressiveConfigDesc")}
                </p>
              </div>
            </div>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionSummarizerEnabled")}</span>
              <button
                onClick={() =>
                  save({
                    aggressive: {
                      ...config.aggressive!,
                      summarizerEnabled: !config.aggressive!.summarizerEnabled,
                    },
                  })
                }
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  config.aggressive.summarizerEnabled ? "bg-green-500" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    config.aggressive.summarizerEnabled ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionMaxTokensPerMessage")}</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={256}
                  max={32768}
                  value={config.aggressive.maxTokensPerMessage}
                  onChange={(e) =>
                    save({
                      aggressive: {
                        ...config.aggressive!,
                        maxTokensPerMessage: parseInt(e.target.value) || 2048,
                      },
                    })
                  }
                  className="w-24 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
                />
                <span className="text-xs text-text-muted">{t("tokens")}</span>
              </div>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionMinSavings")}</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={config.aggressive.minSavingsThreshold}
                  onChange={(e) =>
                    save({
                      aggressive: {
                        ...config.aggressive!,
                        minSavingsThreshold: parseFloat(e.target.value) || 0.05,
                      },
                    })
                  }
                  className="w-24 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
                />
                <span className="text-xs text-text-muted">%</span>
              </div>
            </label>

            <div className="space-y-2 pt-2">
              <p className="text-sm font-medium text-text-main">
                {t("compressionAgingThresholds")}
              </p>
              <p className="text-xs text-text-muted">{t("compressionAgingThresholdsDesc")}</p>
              <div className="grid grid-cols-2 gap-2">
                {(["fullSummary", "moderate", "light", "verbatim"] as const).map((tier) => (
                  <label
                    key={tier}
                    className="flex items-center justify-between p-2 rounded border border-border/50"
                  >
                    <span className="text-xs text-text-muted capitalize">
                      {tier.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={config.aggressive!.thresholds[tier]}
                      onChange={(e) =>
                        save({
                          aggressive: {
                            ...config.aggressive!,
                            thresholds: {
                              ...config.aggressive!.thresholds,
                              [tier]: parseInt(e.target.value) || 2,
                            },
                          },
                        })
                      }
                      className="w-16 px-2 py-1 text-xs rounded border border-border bg-surface text-text-main"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-sm font-medium text-text-main">{t("compressionToolStrategies")}</p>
              <p className="text-xs text-text-muted">{t("compressionToolStrategiesDesc")}</p>
              <div className="flex flex-wrap gap-2">
                {(
                  ["fileContent", "grepSearch", "shellOutput", "json", "errorMessage"] as const
                ).map((strategy) => (
                  <button
                    key={strategy}
                    onClick={() =>
                      save({
                        aggressive: {
                          ...config.aggressive!,
                          toolStrategies: {
                            ...config.aggressive!.toolStrategies,
                            [strategy]: !config.aggressive!.toolStrategies[strategy],
                          },
                        },
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      config.aggressive!.toolStrategies[strategy]
                        ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                        : "border-border/50 text-text-muted hover:border-border"
                    }`}
                  >
                    {strategy.replace(/([A-Z])/g, " $1").trim()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {config.enabled && config.defaultMode === "ultra" && config.ultra && (
          <div className="space-y-3 pt-4 border-t border-border/30">
            <div>
              <h4 className="text-sm font-medium text-text-main">{t("compressionUltraConfig")}</h4>
              <p className="text-xs text-text-muted mt-0.5">{t("compressionUltraConfigDesc")}</p>
            </div>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("enabled")}</span>
              <button
                onClick={() =>
                  save({
                    ultra: {
                      ...config.ultra!,
                      enabled: !config.ultra!.enabled,
                    },
                  })
                }
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  config.ultra.enabled ? "bg-green-500" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    config.ultra.enabled ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionUltraRate")}</span>
              <input
                type="number"
                min={0}
                max={1}
                step={0.05}
                value={config.ultra.compressionRate}
                onChange={(e) =>
                  save({
                    ultra: {
                      ...config.ultra!,
                      compressionRate: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="w-24 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionUltraMinScore")}</span>
              <input
                type="number"
                min={0}
                max={1}
                step={0.05}
                value={config.ultra.minScoreThreshold}
                onChange={(e) =>
                  save({
                    ultra: {
                      ...config.ultra!,
                      minScoreThreshold: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                className="w-24 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionMaxTokensPerMessage")}</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={32768}
                  value={config.ultra.maxTokensPerMessage}
                  onChange={(e) =>
                    save({
                      ultra: {
                        ...config.ultra!,
                        maxTokensPerMessage: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-24 px-2 py-1 text-sm rounded border border-border bg-surface text-text-main"
                />
                <span className="text-xs text-text-muted">{t("tokens")}</span>
              </div>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionUltraSlmFallback")}</span>
              <button
                onClick={() =>
                  save({
                    ultra: {
                      ...config.ultra!,
                      slmFallbackToAggressive: !config.ultra!.slmFallbackToAggressive,
                    },
                  })
                }
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  config.ultra.slmFallbackToAggressive ? "bg-green-500" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    config.ultra.slmFallbackToAggressive ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </label>

            <label className="block space-y-1">
              <span className="text-sm text-text-muted">{t("compressionUltraModelPath")}</span>
              <input
                type="text"
                value={config.ultra.modelPath ?? ""}
                onChange={(e) =>
                  save({
                    ultra: {
                      ...config.ultra!,
                      modelPath: e.target.value.trim() || undefined,
                    },
                  })
                }
                placeholder="/path/to/model.onnx"
                className="w-full px-2 py-1 text-sm rounded border border-border bg-surface text-text-main font-mono"
              />
            </label>
          </div>
        )}
      </div>
    </Card>
  );
}
