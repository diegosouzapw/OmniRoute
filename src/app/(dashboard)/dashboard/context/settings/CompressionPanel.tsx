"use client";

// CompressionPanel — the single-source engine-grid UI for compression.
//
// Renders the master on/off switch, one row per catalog engine (on/off + level +
// link to its detail page), the adaptive context-budget dial, the cavemanOutput
// intensity row, the mcpAccessibility toggle (its own endpoint / separate store),
// a derived-pipeline preview, and the general settings (auto-trigger tokens +
// preserve-system-prompt).
//
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
// Import Card/Toggle/Button from their direct module paths rather than the @/shared/components
// barrel: the barrel transitively pulls a heavy/Node-only module that hangs the
// vitest/jsdom component test. Direct imports resolve identically under Next.js.
import Button from "@/shared/components/Button";
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
import {
  deriveEffectivePreviewPlan,
  type NamedCombos,
} from "../../../../../../open-sse/services/compression/deriveEffectivePreviewPlan.ts";
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
  contextBudget?: ContextBudgetConfig;
  liveZone?: { enabled: boolean };
}

const CONTEXT_BUDGET_MODES = new Set<ContextBudgetConfig["mode"]>([
  "off",
  "floor",
  "replace-autotrigger",
]);
const CONTEXT_BUDGET_POLICIES = new Set<ContextBudgetConfig["policy"]>([
  "reserve-output",
  "percentage",
  "absolute",
]);
const CAVEMAN_OUTPUT_LEVELS: CavemanIntensity[] = ["lite", "full", "ultra"];
// A settings PUT that has not answered by then counts as failed, so one stalled save cannot hold
// the controls disabled indefinitely. The server can still commit a PUT the panel gave up on;
// after such a failure the panel re-reads the settings, so the next save starts from what the
// server actually has.
const SAVE_TIMEOUT_MS = 15_000;
// How long the "Saved" badge stays up before clearing itself.
const SAVED_STATUS_CLEAR_MS = 2_000;
// The auto-trigger box's declared min/max; commits outside it keep the draft instead of
// coercing the value into something the field never showed.
const AUTO_TRIGGER_MIN = 0;
const AUTO_TRIGGER_MAX = 100_000;

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
  contextBudget: { ...DEFAULT_CONTEXT_BUDGET },
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

// Merge a stored settings row onto the defaults the panel renders.
function toNormalizedConfig(data: Partial<CompressionConfig>): CompressionConfig {
  return {
    ...DEFAULT_CONFIG,
    ...data,
    engines: normalizeEngines(data.engines),
    cavemanOutputMode: data.cavemanOutputMode ?? DEFAULT_CONFIG.cavemanOutputMode,
    outputStyles: data.outputStyles ?? DEFAULT_CONFIG.outputStyles,
    contextBudget: { ...DEFAULT_CONTEXT_BUDGET, ...(data.contextBudget ?? {}) },
  };
}

// A pending save may carry one engine. Lay that patch over the map already shown so
// the other engines stay on screen (#15613). contextBudget is one stored object; merging
// still keeps a field the patch omitted (#15600).
function overlayConfig(
  base: CompressionConfig,
  update: Partial<CompressionConfig>
): CompressionConfig {
  return {
    ...base,
    ...update,
    ...(update.engines ? { engines: { ...base.engines, ...update.engines } } : {}),
    ...(update.contextBudget
      ? {
          contextBudget: {
            ...(base.contextBudget ?? DEFAULT_CONTEXT_BUDGET),
            ...update.contextBudget,
          },
        }
      : {}),
  };
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

// Saves on Enter or when the field loses focus, so typing a number sends one save with the
// final value. Until then the field shows the edit; otherwise it shows the current value,
// including one a failed save rolled back.
function AutoTriggerInput({
  value,
  onCommit,
}: {
  value: number;
  onCommit: (tokens: number) => void;
}) {
  // The edit not saved yet, or null while the field shows the current value.
  const [draft, setDraft] = useState<string | null>(null);
  const commit = (text: string) => {
    const tokens = Number(text);
    // Keep a value the field itself rejects (non-integer, negative, over max) in the box
    // rather than coercing it; an empty box still means 0.
    if (!Number.isInteger(tokens) || tokens < AUTO_TRIGGER_MIN || tokens > AUTO_TRIGGER_MAX) {
      return;
    }
    setDraft(null);
    if (tokens !== value) onCommit(tokens);
  };
  return (
    <input
      type="number"
      min={AUTO_TRIGGER_MIN}
      max={AUTO_TRIGGER_MAX}
      value={draft ?? String(value)}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={(e) => commit(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setDraft(null);
          return;
        }
        if (e.key === "Enter") commit(e.currentTarget.value);
      }}
      className="w-24 rounded border border-border bg-surface px-2 py-1 text-sm text-text-main"
    />
  );
}

function AdaptiveContextBudgetDial({
  contextBudget,
  saving,
  onChange,
}: {
  contextBudget: ContextBudgetConfig;
  saving: boolean;
  onChange: (patch: Partial<ContextBudgetConfig>) => void;
}) {
  const t = useTranslations("settings");
  // Representative window for the preview label (D-C1). Not the live model limit —
  // the panel has no selected-model context here; 200k is Claude-class default.
  const target = getAdaptiveTargetSummary(contextBudget, 200000);
  return (
    <div className="mb-4 space-y-2 rounded-md border border-border/60 bg-bg-subtle px-3 py-2">
      <label className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-text-main">{t("compressionAdaptiveMode")}</span>
        <select
          data-testid="context-budget-mode-select"
          value={contextBudget.mode ?? "off"}
          onChange={(e) => {
            const mode = e.target.value;
            if (CONTEXT_BUDGET_MODES.has(mode as ContextBudgetConfig["mode"])) {
              onChange({ mode: mode as ContextBudgetConfig["mode"] });
            }
          }}
          disabled={saving}
          className="w-44 rounded border border-border bg-surface px-2 py-1 text-sm text-text-main"
        >
          <option value="off">{t("compressionAdaptiveModeOff")}</option>
          <option value="floor">{t("compressionAdaptiveModeFloor")}</option>
          <option value="replace-autotrigger">{t("compressionAdaptiveModeReplace")}</option>
        </select>
      </label>
      {(contextBudget.mode ?? "off") !== "off" && (
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-text-main">
            {t("compressionAdaptivePolicy")}
          </span>
          <select
            data-testid="context-budget-policy-select"
            value={contextBudget.policy ?? "reserve-output"}
            onChange={(e) => {
              const policy = e.target.value;
              if (CONTEXT_BUDGET_POLICIES.has(policy as ContextBudgetConfig["policy"])) {
                onChange({ policy: policy as ContextBudgetConfig["policy"] });
              }
            }}
            disabled={saving}
            className="w-44 rounded border border-border bg-surface px-2 py-1 text-sm text-text-main"
          >
            <option value="reserve-output">{t("compressionAdaptivePolicyReserve")}</option>
            <option value="percentage">{t("compressionAdaptivePolicyPercentage")}</option>
            <option value="absolute">{t("compressionAdaptivePolicyAbsolute")}</option>
          </select>
        </label>
      )}
      <div data-testid="adaptive-target-preview" className="text-xs text-text-muted">
        {target.enabled
          ? t("compressionAdaptiveTarget", {
              mode: target.mode,
              policy: target.policy,
              target: target.target,
              contextLimit: target.contextLimit,
            })
          : t("compressionAdaptiveOff")}
      </div>
    </div>
  );
}

function derivedPreviewText(
  derived: ReturnType<typeof deriveEffectivePreviewPlan>,
  t: ReturnType<typeof useTranslations>
): string {
  if (derived.mode === "off") return t("compressionDerivedOff");
  if (derived.stackedPipeline.length > 0) {
    return t("compressionDerivedRuns", {
      pipeline: derived.stackedPipeline.map((s) => s.engine).join(" → "),
    });
  }
  return t("compressionDerivedMode", { mode: derived.mode });
}

export default function CompressionPanel() {
  const t = useTranslations("settings");
  const tCommon = useTranslations("common");
  // D-A6/§7: locale-gated styles (e.g. terse-cjk → zh) are only OFFERED under their locale.
  // Compare the UI language base ("zh-CN" → "zh") against the style's `locale`.
  const uiLang = (useLocale() || "en").split("-")[0];
  const [config, setConfig] = useState<CompressionConfig>(DEFAULT_CONFIG);
  const [mcpAccessibility, setMcpAccessibility] = useState(true);
  // Named-combo pipelines (id -> steps), so the "Effective pipeline" preview below can match
  // what a live request actually runs when an active profile is selected (#12063).
  const [namedCombos, setNamedCombos] = useState<NamedCombos>({});
  // #7530 — per-engine expandable guidance (tradeoffs/lossy/cache-impact); collapsed by
  // default so the grid stays scannable.
  const [expandedGuidance, setExpandedGuidance] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  // Saves write over stored fields, so the controls wait for a GET that succeeds. A failed
  // load shows a retry, which bumps loadAttempt to re-run the loads.
  const [loadFailed, setLoadFailed] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"" | "saved" | "error">("");
  const saveGenRef = useRef(0);
  // The last config the server confirmed.
  const lastConfirmedRef = useRef(config);
  // Saves still waiting on the server, oldest first.
  const pendingRef = useRef<Partial<CompressionConfig>[]>([]);
  const batchFailedRef = useRef(false);
  // contextBudget is one stored object. React state is stale until the next commit, so a
  // second patch in the same turn spreads this copy, which save() updates synchronously.
  const contextBudgetRef = useRef<ContextBudgetConfig>({ ...DEFAULT_CONTEXT_BUDGET });
  // How many acked saves each top-level key has seen; a re-read answers only the keys no
  // ack has bumped since the re-read was dispatched, so a stale snapshot can never
  // overwrite a newer confirmed value.
  const ackSeqByKeyRef = useRef(new Map<string, number>());

  // The confirmed config with the saves still in flight laid over it, oldest first. The other
  // controls disable while one of their saves is in flight. The auto-trigger box never
  // disables, so its saves leave them enabled, and a click that ends an edit in the box still
  // reaches the control it lands on.
  const showSaves = () => {
    const shown = pendingRef.current.reduce<CompressionConfig>(
      (acc, pending) => overlayConfig(acc, pending),
      lastConfirmedRef.current
    );
    // A failed save drops out of the overlay; keep the sync copy on that rolled-back value.
    contextBudgetRef.current = { ...(shown.contextBudget ?? DEFAULT_CONTEXT_BUDGET) };
    setConfig(shown);
    setSaving(
      pendingRef.current.some((pending) =>
        Object.keys(pending).some((key) => key !== "autoTriggerTokens")
      )
    );
  };

  // Re-read the settings after a save that threw. The server may have stored it after the
  // panel gave up, and the next save of the same top-level key would otherwise overwrite that
  // stored value with one built from the pre-save snapshot. Only the failed save's keys are
  // uncertain, and only until one of them is acked again — an older answer for a key a newer
  // ack already settled is dropped.
  const resyncConfirmed = async (keys: string[]) => {
    try {
      const seqsAtDispatch = keys.map((key) => ackSeqByKeyRef.current.get(key) ?? 0);
      const res = await fetch("/api/settings/compression", {
        signal: AbortSignal.timeout(SAVE_TIMEOUT_MS),
      });
      if (!res.ok) return;
      const fresh = toNormalizedConfig(await res.json());
      const confirmed: CompressionConfig = { ...lastConfirmedRef.current };
      keys.forEach((key, i) => {
        if ((ackSeqByKeyRef.current.get(key) ?? 0) === seqsAtDispatch[i]) {
          Object.assign(confirmed, { [key]: fresh[key as keyof CompressionConfig] });
        }
      });
      lastConfirmedRef.current = confirmed;
      showSaves();
    } catch {
      // The server is still unreachable; the next failing save retries the re-read.
    }
  };

  useEffect(() => {
    // A retry re-runs these loads; answers that arrive for the run it replaced are ignored.
    let ignore = false;
    fetch("/api/settings/compression")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Partial<CompressionConfig> | null) => {
        if (ignore) return;
        if (data) {
          lastConfirmedRef.current = toNormalizedConfig(data);
          if (pendingRef.current.length > 0) {
            // A save already started; show the confirmed base with it laid over, not the
            // stale GET snapshot alone.
            showSaves();
          } else {
            contextBudgetRef.current = {
              ...(lastConfirmedRef.current.contextBudget ?? DEFAULT_CONTEXT_BUDGET),
            };
            setConfig(lastConfirmedRef.current);
          }
        }
        setLoadFailed(!data);
      })
      .catch(() => {
        if (!ignore) setLoadFailed(true);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    fetch("/api/settings/compression/mcp-accessibility")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { enabled?: boolean } | null) => {
        if (!ignore && data && typeof data.enabled === "boolean") {
          setMcpAccessibility(data.enabled);
        }
      })
      .catch(() => {});

    fetch("/api/context/combos")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { combos?: Array<{ id: string; pipeline: NamedCombos[string] }> } | null) => {
        if (ignore) return;
        const combos = Array.isArray(data?.combos) ? data.combos : [];
        const map: NamedCombos = {};
        for (const combo of combos) map[combo.id] = combo.pipeline;
        setNamedCombos(map);
      })
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, [loadAttempt]);

  // Persist a merge-patch. The server merges `engines` by engine id, so a caller sends
  // only the engine it touched (#15613). overlayConfig lays that patch over the map on
  // screen. contextBudget is one stored object, so each save carries the whole object
  // from contextBudgetRef (#15600).
  // Every save goes out at once. The server stores each save just before it answers, so a
  // confirmed save applies its fields whatever its age, and a failed save drops out of the
  // saves in flight, which rolls back only its own fields. Two overlapping saves of one field
  // can answer in a different order than the server stored them; the panel then shows the
  // value that answered last until the page reloads. "Save failed" shows from the first
  // failure until a save starts with no other save in flight. A save that threw (network
  // error or the timeout) may still have been stored — the re-read below picks that up.
  const save = async (updates: Partial<CompressionConfig>) => {
    saveGenRef.current += 1;
    if (pendingRef.current.length === 0) {
      batchFailedRef.current = false;
      setStatus("");
    }
    pendingRef.current.push(updates);
    showSaves();
    let ok = false;
    let threw = false;
    try {
      const res = await fetch("/api/settings/compression", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        signal: AbortSignal.timeout(SAVE_TIMEOUT_MS),
      });
      ok = res.ok;
    } catch (error) {
      // A network error or the timeout counts as a failed save.
      threw = true;
      console.error("Failed to save compression settings:", error);
    }
    pendingRef.current = pendingRef.current.filter((pending) => pending !== updates);
    if (ok) {
      for (const key of Object.keys(updates)) {
        ackSeqByKeyRef.current.set(key, (ackSeqByKeyRef.current.get(key) ?? 0) + 1);
      }
      lastConfirmedRef.current = overlayConfig(lastConfirmedRef.current, updates);
    } else {
      batchFailedRef.current = true;
      setStatus("error");
      if (threw) void resyncConfirmed(Object.keys(updates));
    }
    showSaves();
    if (pendingRef.current.length > 0) return;
    if (batchFailedRef.current) return;
    setStatus("saved");
    const latestGen = saveGenRef.current;
    setTimeout(() => {
      if (latestGen === saveGenRef.current) setStatus("");
    }, SAVED_STATUS_CLEAR_MS);
  };

  const setEngine = (id: string, patch: Partial<EngineToggle>) => {
    save({ engines: { [id]: { ...(config.engines[id] ?? { enabled: false }), ...patch } } });
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

  const derived = deriveEffectivePreviewPlan(config, namedCombos);
  const derivedText = derivedPreviewText(derived, t);
  if (loading) {
    return (
      <Card className="p-6">
        <p className="text-sm text-text-muted">{t("loading")}</p>
      </Card>
    );
  }

  if (loadFailed) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between gap-4">
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {t("compressionTitle")}: {tCommon("failedToLoad")}
          </p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setLoading(true);
              setLoadAttempt((attempt) => attempt + 1);
            }}
          >
            {t("retry")}
          </Button>
        </div>
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

      {/* Adaptive context-budget dial — mode/policy persist via PUT contextBudget */}
      <AdaptiveContextBudgetDial
        contextBudget={config.contextBudget ?? DEFAULT_CONTEXT_BUDGET}
        saving={saving}
        onChange={(patch) => {
          const next = { ...contextBudgetRef.current, ...patch };
          contextBudgetRef.current = next;
          save({ contextBudget: next });
        }}
      />

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
            <AutoTriggerInput
              value={config.autoTriggerTokens}
              onCommit={(autoTriggerTokens) => save({ autoTriggerTokens })}
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
