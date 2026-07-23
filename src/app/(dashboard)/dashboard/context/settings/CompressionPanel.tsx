"use client";

// CompressionPanel — the single-source engine-grid UI for compression.
//
// Renders the master on/off switch, one row per catalog engine (on/off + level +
// link to its detail page), the cavemanOutput intensity row, the mcpAccessibility
// toggle (its own endpoint / separate store), a read-only derived-pipeline preview,
// and the general settings (auto-trigger tokens + preserve-system-prompt).
//
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
// Import Card/Toggle from their direct module paths rather than the @/shared/components
// barrel: the barrel transitively pulls a heavy/Node-only module that hangs the
// vitest/jsdom component test. Direct imports resolve identically under Next.js.
import Card from "@/shared/components/Card";
import Toggle from "@/shared/components/Toggle";
import {
  ENGINE_IDS,
  engineMeta,
} from "../../../../../../open-sse/services/compression/engineCatalog.ts";
import {
  OUTPUT_STYLE_IDS,
  outputStyleMeta,
} from "../../../../../../open-sse/services/compression/outputStyles/catalog.ts";
import { deriveDefaultPlan } from "../../../../../../open-sse/services/compression/deriveDefaultPlan.ts";
import EngineGuidanceDetail from "./EngineGuidanceDetail";
import {
  DEFAULT_CONTEXT_BUDGET,
  type ContextBudgetConfig,
} from "../../../../../../open-sse/services/compression/adaptiveCompression/types.ts";
import { getAdaptiveTargetSummary } from "./adaptiveTargetLabel.ts";

type CavemanIntensity = "lite" | "full" | "ultra";

interface EngineToggle {
  enabled: boolean;
  level?: string;
}

interface CavemanOutputModeConfig {
  enabled: boolean;
  intensity: CavemanIntensity;
  autoClarity: boolean;
}

interface CompressionConfig {
  enabled: boolean;
  autoTriggerTokens: number;
  preserveSystemPrompt: boolean;
  preserveSystemPromptMode?: "always" | "whenNoCache" | "never";
  engines: Record<string, EngineToggle>;
  activeComboId: string | null;
  cavemanOutputMode?: CavemanOutputModeConfig;
  outputStyles?: Array<{ id: string; level: CavemanIntensity }>;
  // Phase 4 (B): two-tier `ultra` mode controls.
  // ultraEngine "heuristic" = Tier-A token pruner (default, byte-identical to pre-B);
  // "slm" = Tier-B LLMLingua-2 ONNX worker when available, else fail-open to Tier-A.
  ultraEngine?: "heuristic" | "slm";
  // Best-effort pre-warm of the SLM model on enable / cold restart. Default false.
  ultraSlmPrewarm?: boolean;
  // Phase 4 (C): adaptive context-budget. Absent / mode:"off" = legacy auto-trigger.
  // The panel currently surfaces the computed target read-only; mode/policy editors are a
  // follow-up (the load/save path does not yet populate this field).
  contextBudget?: ContextBudgetConfig;
  liveZone?: { enabled: boolean };
}

const CAVEMAN_OUTPUT_LEVELS: CavemanIntensity[] = ["lite", "full", "ultra"];

const DEFAULT_CONFIG: CompressionConfig = {
  enabled: false,
  autoTriggerTokens: 0,
  preserveSystemPrompt: true,
  engines: {},
  activeComboId: null,
  cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
  outputStyles: [],
  ultraEngine: "heuristic",
  ultraSlmPrewarm: false,
  liveZone: { enabled: false },
};

function normalizeEngines(raw: unknown): Record<string, EngineToggle> {
  const engines: Record<string, EngineToggle> = {};
  const source = (raw && typeof raw === "object" ? raw : {}) as Record<string, EngineToggle>;
  for (const id of ENGINE_IDS) {
    const cur = source[id];
    engines[id] = cur
      ? { enabled: cur.enabled === true, ...(cur.level ? { level: cur.level } : {}) }
      : { enabled: false };
  }
  return engines;
}

function LiveZoneToggle({
  enabled,
  saving,
  onChange,
}: {
  enabled: boolean;
  saving: boolean;
  onChange: (enabled: boolean) => void;
}) {
  const t = useTranslations("settings");
  return (
    <label className="flex items-center justify-between gap-4">
      <span className="space-y-0.5">
        <span className="block text-sm text-text-muted">{t("compressionLiveZoneTitle")}</span>
        <span className="block text-xs text-text-muted">{t("compressionLiveZoneDesc")}</span>
      </span>
      <Toggle
        size="sm"
        checked={enabled}
        onChange={onChange}
        disabled={saving}
        ariaLabel={t("compressionLiveZoneTitle")}
      />
    </label>
  );
}

function AdaptiveTargetPreview({ contextBudget }: { contextBudget?: ContextBudgetConfig }) {
  const t = useTranslations("settings");
  const target = getAdaptiveTargetSummary(contextBudget ?? DEFAULT_CONTEXT_BUDGET, 200000);
  return (
    <div
      data-testid="adaptive-target-preview"
      className="mb-4 rounded-md border border-border/60 bg-bg-subtle px-3 py-2 text-xs text-text-muted"
    >
      {target.enabled
        ? t("compressionAdaptiveTarget", {
            mode: target.mode,
            policy: target.policy,
            target: target.target,
            contextLimit: target.contextLimit,
          })
        : t("compressionAdaptiveOff")}
    </div>
  );
}

export default function CompressionPanel() {
  const t = useTranslations("settings");
  // D-A6/§7: locale-gated styles (e.g. terse-cjk → zh) are only OFFERED under their locale.
  // Compare the UI language base ("zh-CN" → "zh") against the style's `locale`.
  const uiLang = (useLocale() || "en").split("-")[0];
  const [config, setConfig] = useState<CompressionConfig>(DEFAULT_CONFIG);
  const [mcpAccessibility, setMcpAccessibility] = useState(true);
  // #7530 — per-engine expandable guidance (tradeoffs/lossy/cache-impact); collapsed by
  // default so the grid stays scannable.
  const [expandedGuidance, setExpandedGuidance] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"" | "saved" | "error">("");

  useEffect(() => {
    fetch("/api/settings/compression")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Partial<CompressionConfig> | null) => {
        if (data) {
          setConfig({
            ...DEFAULT_CONFIG,
            ...data,
            engines: normalizeEngines(data.engines),
            cavemanOutputMode: data.cavemanOutputMode ?? DEFAULT_CONFIG.cavemanOutputMode,
            outputStyles: data.outputStyles ?? DEFAULT_CONFIG.outputStyles,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch("/api/settings/compression/mcp-accessibility")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { enabled?: boolean } | null) => {
        if (data && typeof data.enabled === "boolean") setMcpAccessibility(data.enabled);
      })
      .catch(() => {});
  }, []);

  // Persist a merge-patch. The DB persists `engines` as one whole row, so callers that
  // touch an engine pass the full engines map to avoid dropping the other engines.
  const save = async (updates: Partial<CompressionConfig>) => {
    const next = { ...config, ...updates };
    setConfig(next);
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/settings/compression", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
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

  const setEngine = (id: string, patch: Partial<EngineToggle>) => {
    const engines = {
      ...config.engines,
      [id]: { ...(config.engines[id] ?? { enabled: false }), ...patch },
    };
    // Send the full engines map — the persistence layer stores it as one JSON row.
    save({ engines });
  };

  const toggleGuidance = (id: string) => {
    setExpandedGuidance((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const setOutputStyle = (id: string, patch: { enabled?: boolean; level?: CavemanIntensity }) => {
    const current = config.outputStyles ?? [];
    const existing = current.find((s) => s.id === id);
    let next = current;
    if (patch.enabled === false) {
      next = current.filter((s) => s.id !== id);
    } else {
      const level = patch.level ?? existing?.level ?? "full";
      next = existing
        ? current.map((s) => (s.id === id ? { id, level } : s))
        : [...current, { id, level }];
    }
    // Persist in catalog order so injection order is stable.
    const ordered = OUTPUT_STYLE_IDS.flatMap((sid) => {
      const hit = next.find((s) => s.id === sid);
      return hit ? [hit] : [];
    });
    save({ outputStyles: ordered });
  };

  const toggleMcpAccessibility = async (enabled: boolean) => {
    setMcpAccessibility(enabled);
    try {
      await fetch("/api/settings/compression/mcp-accessibility", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      });
    } catch {
      // Surface nothing — the row reflects optimistic local state; the next mount re-reads.
    }
  };

  const derived = deriveDefaultPlan(config.engines, config.enabled);
  const derivedText =
    derived.mode === "off"
      ? t("compressionDerivedOff")
      : derived.stackedPipeline.length > 0
        ? t("compressionDerivedRuns", {
            pipeline: derived.stackedPipeline.map((s) => s.engine).join(" → "),
          })
        : t("compressionDerivedMode", { mode: derived.mode });
  if (loading) {
    return (
      <Card className="p-6">
        <p className="text-sm text-text-muted">{t("loading")}</p>
      </Card>
    );
  }

  return (
    <Card className="p-6" data-testid="compression-panel">
      {/* Master */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              compress
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("compressionTitle")}</h3>
            <p className="text-sm text-text-muted">{t("compressionDesc")}</p>
            <a
              href="https://github.com/diegosouzapw/OmniRoute/blob/main/docs/compression/COMPRESSION_GUIDE.md"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="compression-guide-link"
              className="mt-0.5 inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              {t("compressionGuidanceFullGuideLink")}
              <span className="material-symbols-outlined text-[12px]" aria-hidden="true">
                open_in_new
              </span>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>{" "}
              {t("saved")}
            </span>
          )}
          {status === "error" && (
            <span className="flex items-center gap-1 text-xs font-medium text-red-500">
              <span className="material-symbols-outlined text-[14px]">error</span> {t("saveFailed")}
            </span>
          )}
          <Toggle
            size="md"
            checked={config.enabled}
            onChange={(enabled) => save({ enabled })}
            disabled={saving}
            ariaLabel={t("compressionTitle")}
          />
        </div>
      </div>

      {/* Derived pipeline preview */}
      <div
        data-testid="derived-pipeline-preview"
        className="mb-4 rounded-md border border-border/60 bg-bg-subtle px-3 py-2 text-xs text-text-muted"
      >
        <span className="font-medium text-text-main">{t("compressionEffectivePipeline")}</span>{" "}
        {derivedText}
      </div>

      {/* Adaptive context-budget — read-only computed target (Phase 4C, D-C1 transparency) */}
      <AdaptiveTargetPreview contextBudget={config.contextBudget} />

      {/* Engine grid */}
      <div className={`divide-y divide-border ${config.enabled ? "" : "opacity-60"}`}>
        {ENGINE_IDS.map((id) => {
          const meta = engineMeta(id);
          const engine = config.engines[id] ?? { enabled: false };
          const levels = meta.levels;
          const level = engine.level ?? levels?.[0] ?? "";
          const engineLabel = t(`compressionEngine.${id}.label`);
          const engineDescription = t(`compressionEngine.${id}.description`);
          return (
            <div
              key={id}
              data-testid={`engine-row-${id}`}
              className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm font-medium text-text-main">
                  {engineLabel}
                  <Link
                    href={`/dashboard/context/${id}`}
                    className="rounded border border-border bg-bg-subtle px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-text-muted hover:border-primary/40 hover:text-primary"
                  >
                    {id}
                  </Link>
                </div>
                <p className="mt-0.5 text-xs text-text-muted">{engineDescription}</p>
                <EngineGuidanceDetail
                  id={id}
                  guidance={meta.guidance}
                  expanded={Boolean(expandedGuidance[id])}
                  onToggle={() => toggleGuidance(id)}
                />
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {levels && (
                  <select
                    value={level}
                    onChange={(e) => setEngine(id, { level: e.target.value })}
                    disabled={!config.enabled || !engine.enabled || saving}
                    className="w-28 rounded border border-border bg-surface px-2 py-1 text-xs text-text-main"
                  >
                    {levels.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {t(`compressionLevel.${lvl}`)}
                      </option>
                    ))}
                  </select>
                )}
                <span data-testid={`engine-toggle-${id}`}>
                  <Toggle
                    size="sm"
                    checked={engine.enabled}
                    onChange={(enabled) => setEngine(id, { enabled })}
                    disabled={!config.enabled || saving}
                    ariaLabel={engineLabel}
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Output Styles — response-output instruction injection (Phase 4A, catalog-driven) */}
      <div className="mt-2 flex flex-col gap-3 border-t border-border/30 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-text-main">
            {t("compressionSettingsOutputStyles")}
          </p>
          <p className="mt-0.5 text-xs text-text-muted">
            {t("compressionOutputStylesDescription")}
          </p>
        </div>
        {OUTPUT_STYLE_IDS.filter((id) => {
          const m = outputStyleMeta(id);
          return !m?.locale || m.locale === uiLang;
        }).map((id) => {
          const meta = outputStyleMeta(id);
          const sel = config.outputStyles?.find((s) => s.id === id);
          const styleLabel = t(`compressionOutputStyle.${id}.label`);
          const styleDescription = t(`compressionOutputStyle.${id}.description`);
          return (
            <div
              key={id}
              data-testid={`output-style-row-${id}`}
              className="flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <p className="text-sm text-text-main">{styleLabel}</p>
                {meta.description && <p className="text-xs text-text-muted">{styleDescription}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <select
                  data-testid={`output-style-level-${id}`}
                  value={sel?.level ?? "full"}
                  onChange={(e) =>
                    setOutputStyle(id, { level: e.target.value as CavemanIntensity })
                  }
                  disabled={!sel || saving}
                  className="w-28 rounded border border-border bg-surface px-2 py-1 text-xs text-text-main"
                >
                  {CAVEMAN_OUTPUT_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {t(`compressionLevel.${lvl}`)}
                    </option>
                  ))}
                </select>
                <span data-testid={`output-style-toggle-${id}`}>
                  <Toggle
                    size="sm"
                    checked={Boolean(sel)}
                    onChange={(enabled) => setOutputStyle(id, { enabled })}
                    disabled={saving}
                    ariaLabel={styleLabel}
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ultra SLM tier — Phase 4 (B): pick the `ultra`-mode engine (heuristic Tier-A
          or the opt-in LLMLingua-2 SLM Tier-B) + best-effort pre-warm. */}
      <div className="mt-2 flex flex-col gap-3 border-t border-border/30 py-3">
        <label className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-main">{t("compressionUltraEngine")}</span>
          <select
            data-testid="ultra-engine-select"
            value={config.ultraEngine ?? "heuristic"}
            onChange={(e) => save({ ultraEngine: e.target.value === "slm" ? "slm" : "heuristic" })}
            disabled={saving}
            className="w-44 rounded border border-border bg-surface px-2 py-1 text-sm text-text-main"
          >
            <option value="heuristic">{t("compressionUltraEngineHeuristic")}</option>
            <option value="slm">{t("compressionUltraEngineSlm")}</option>
          </select>
        </label>

        {config.ultraEngine === "slm" && (
          <>
            <p className="text-xs text-text-muted">{t("compressionUltraSlmHint")}</p>
            <label className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{t("compressionUltraSlmPrewarm")}</span>
              <span data-testid="ultra-slm-prewarm-toggle">
                <Toggle
                  size="sm"
                  checked={config.ultraSlmPrewarm ?? false}
                  onChange={(ultraSlmPrewarm) => save({ ultraSlmPrewarm })}
                  disabled={saving}
                  ariaLabel={t("compressionUltraSlmPrewarm")}
                />
              </span>
            </label>
          </>
        )}
      </div>

      {/* mcpAccessibility — writes its own endpoint / separate store */}
      <div className="flex flex-col gap-2 border-t border-border/30 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-text-main">{t("mcpAccessibilityTitle")}</p>
          <p className="mt-0.5 text-xs text-text-muted">{t("mcpAccessibilityDescription")}</p>
        </div>
        <span data-testid="mcp-accessibility-toggle">
          <Toggle
            size="sm"
            checked={mcpAccessibility}
            onChange={toggleMcpAccessibility}
            ariaLabel={t("mcpAccessibilityTitle")}
          />
        </span>
      </div>

      {/* General */}
      <div className="space-y-3 border-t border-border/30 pt-4">
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
              className="w-24 rounded border border-border bg-surface px-2 py-1 text-sm text-text-main"
            />
            <span className="text-xs text-text-muted">{t("tokens")}</span>
          </div>
        </label>
        <label className="flex items-center justify-between">
          <span className="text-sm text-text-muted">{t("compressionPreserveSystem")}</span>
          <select
            value={
              config.preserveSystemPromptMode ??
              (config.preserveSystemPrompt === false ? "whenNoCache" : "always")
            }
            onChange={(e) =>
              save({
                preserveSystemPromptMode: e.target.value as "always" | "whenNoCache" | "never",
              })
            }
            disabled={saving}
            aria-label={t("compressionPreserveSystem")}
            data-testid="preserve-system-mode-select"
            className="w-36 rounded border border-border bg-surface px-2 py-1 text-sm text-text-main"
          >
            <option value="always">{t("compressionPreserveSystemAlways")}</option>
            <option value="whenNoCache">{t("compressionPreserveSystemWhenNoCache")}</option>
            <option value="never">{t("compressionPreserveSystemNever")}</option>
          </select>
        </label>
        <LiveZoneToggle
          enabled={config.liveZone?.enabled === true}
          saving={saving}
          onChange={(enabled) => save({ liveZone: { enabled } })}
        />
      </div>
    </Card>
  );
}
