"use client";

// Compression Hub — the single place to understand and control compression.
//
// IMPORTANT (hydration): this component deliberately does NOT use `useTranslations`.
// The previous combos redesign failed to hydrate on the production build; the only
// structural difference from the engine pages (which hydrate fine) was a page-level
// `useTranslations("contextCombos")`. To stay on the proven-good path, strings here
// remain literal English text, exactly like `EngineConfigPage`.

import { useCallback, useEffect, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type CompressionMode = "off" | "lite" | "standard" | "aggressive" | "ultra" | "rtk" | "stacked";

interface CompressionSettings {
  enabled: boolean;
  defaultMode: CompressionMode;
  contextEditing?: { enabled: boolean };
  [key: string]: unknown;
}

interface EngineEntry {
  id: string;
  name: string;
  description: string;
  icon: string;
  stackable: boolean;
  stackPriority: number;
  metadata: { stable?: boolean; description?: string; [key: string]: unknown };
}

interface PipelineStep {
  engine: string;
  intensity?: string;
  config?: Record<string, unknown>;
}

interface DefaultCombo {
  id: string;
  name: string;
  pipeline: PipelineStep[];
}

// ── Constants ──────────────────────────────────────────────────────────────────

const MODES: { value: CompressionMode; label: string; hint: string }[] = [
  { value: "off", label: "Off", hint: "No compression" },
  { value: "lite", label: "Lite", hint: "Fast cleanup" },
  { value: "standard", label: "Standard", hint: "Standard Caveman" },
  { value: "aggressive", label: "Aggressive", hint: "Summary plus aging" },
  { value: "ultra", label: "Ultra", hint: "Heuristic pruning" },
  { value: "rtk", label: "RTK", hint: "Tool output filters" },
  { value: "stacked", label: "Stacked", hint: "Run the layers below in sequence" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function enginePagePath(engineId: string): string {
  return `/dashboard/context/${engineId}`;
}

// ── Sub-components ──────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  onChange: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-colors ${
        checked ? "bg-green-500" : "bg-border"
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
          checked ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  );
}

// ── Main component ──────────────────────────────────────────────────────────────

export default function CompressionHub() {
  const [settings, setSettings] = useState<CompressionSettings | null>(null);
  const [engines, setEngines] = useState<EngineEntry[]>([]);
  const [combo, setCombo] = useState<DefaultCombo | null>(null);
  const [loading, setLoading] = useState(true);
  const [explainerOpen, setExplainerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Initial load (parallel) ──────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const asJson = (r: Response) => (r.ok ? r.json() : null);
      const [settingsData, enginesData, comboData] = await Promise.all([
        fetch("/api/settings/compression")
          .then(asJson)
          .catch(() => null),
        fetch("/api/compression/engines")
          .then(asJson)
          .catch(() => null),
        fetch("/api/context/combos/default")
          .then(asJson)
          .catch(() => null),
      ]);
      if (cancelled) return;
      if (settingsData) {
        setSettings(settingsData as CompressionSettings);
      } else {
        setSettings({ enabled: false, defaultMode: "off", contextEditing: { enabled: false } });
      }
      if (enginesData?.engines) {
        setEngines(
          [...(enginesData.engines as EngineEntry[])].sort(
            (a, b) => a.stackPriority - b.stackPriority
          )
        );
      }
      if (comboData?.id) {
        setCombo({
          id: String(comboData.id),
          name: String(comboData.name ?? "Default"),
          pipeline: Array.isArray(comboData.pipeline) ? comboData.pipeline : [],
        });
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Settings mutations (master switch + mode) ────────────────────────────────
  const saveSettings = useCallback(
    async (patch: Partial<CompressionSettings>) => {
      if (!settings) return;
      const next = { ...settings, ...patch };
      setSettings(next);
      setError(null);
      try {
        const res = await fetch("/api/settings/compression", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        if (!res.ok) {
          setSettings(settings); // revert
          setError("Failed to save settings.");
        }
      } catch {
        setSettings(settings);
        setError("Failed to save settings.");
      }
    },
    [settings]
  );

  // ── Toggle a layer (enable/disable) ───────────────────────────────────────────
  // Routed through the dedicated `/default` endpoint (setEngineInDefaultCombo): it
  // accepts an empty pipeline (disabling the last layer) and inserts at the
  // stackPriority-correct position — the [id] route requires `pipeline.min(1)`.
  const toggleEngine = useCallback(
    async (engineId: string) => {
      if (!combo) return;
      const existingIndex = combo.pipeline.findIndex((s) => s.engine === engineId);
      const existingStep = existingIndex >= 0 ? combo.pipeline[existingIndex] : null;
      const enabledNow = Boolean(existingStep && existingStep.config?.enabled !== false);
      const prev = combo;

      // Optimistic update (mirrors the server's insert-at-priority / remove logic).
      let optimistic: PipelineStep[];
      if (enabledNow) {
        optimistic = combo.pipeline.filter((s) => s.engine !== engineId);
      } else if (existingStep) {
        optimistic = combo.pipeline.map((step, index) =>
          index === existingIndex
            ? { ...step, config: { ...(step.config ?? {}), enabled: true } }
            : step
        );
      } else {
        const priorityOf = (eid: string) => engines.find((e) => e.id === eid)?.stackPriority ?? 50;
        optimistic = [...combo.pipeline];
        let insertAt = optimistic.findIndex((s) => priorityOf(s.engine) > priorityOf(engineId));
        if (insertAt < 0) insertAt = optimistic.length;
        optimistic.splice(insertAt, 0, { engine: engineId });
      }
      setCombo({ ...combo, pipeline: optimistic });
      setError(null);

      try {
        const res = await fetch("/api/context/combos/default", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            engineId,
            enabled: !enabledNow,
            config: { ...(existingStep?.config ?? {}), enabled: !enabledNow },
          }),
        });
        if (!res.ok) {
          setCombo(prev);
          setError("Failed to update layer.");
          return;
        }
        const updated = await res.json();
        if (Array.isArray(updated?.pipeline)) {
          setCombo({ ...prev, pipeline: updated.pipeline });
        }
      } catch {
        setCombo(prev);
        setError("Failed to update layer.");
      }
    },
    [combo, engines]
  );

  // ── Reorder an active layer ───────────────────────────────────────────────────
  // Persisted via the [id] route so the custom order survives (the `/default` route
  // re-sorts by stackPriority). Only callable with ≥2 active steps, so the route's
  // `pipeline.min(1)` guard is always satisfied.
  const moveStep = useCallback(
    async (index: number, direction: -1 | 1) => {
      if (!combo) return;
      const target = index + direction;
      if (target < 0 || target >= combo.pipeline.length) return;
      const next = [...combo.pipeline];
      [next[index], next[target]] = [next[target], next[index]];
      const prev = combo;
      setCombo({ ...combo, pipeline: next });
      setError(null);
      try {
        const res = await fetch(`/api/context/combos/${combo.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pipeline: next }),
        });
        if (!res.ok) {
          setCombo(prev);
          setError("Failed to reorder pipeline.");
        }
      } catch {
        setCombo(prev);
        setError("Failed to reorder pipeline.");
      }
    },
    [combo]
  );

  // ── Derived state ─────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center p-10 text-sm text-text-muted">
        Loading...
      </div>
    );
  }

  const enabled = settings?.enabled ?? false;
  const mode = settings?.defaultMode ?? "off";
  const pipelineActive = enabled && mode === "stacked";
  const enabledIds = new Set((combo?.pipeline ?? []).map((s) => s.engine));
  const activeSteps = combo?.pipeline ?? [];
  const inactiveEngines = engines.filter((e) => !enabledIds.has(e.id));
  const engineById = (id: string) => engines.find((e) => e.id === id);

  return (
    <section className="flex flex-col gap-5 rounded-xl border border-primary/30 bg-surface p-5">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[26px] text-primary" aria-hidden="true">
            hub
          </span>
          <div>
            <h1 className="text-xl font-bold text-text-main">Compression Hub</h1>
            <p className="text-sm text-text-muted">
              Enable, configure, and order compression layers in one place.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setExplainerOpen((v) => !v)}
          className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs text-text-main hover:bg-bg"
        >
          {explainerOpen ? "Hide explanation" : "How it works"}
        </button>
      </div>

      {error && (
        <p className="rounded border border-danger/40 px-3 py-2 text-xs text-danger">{error}</p>
      )}

      {/* ── Explainer ── */}
      {explainerOpen && (
        <div className="rounded-lg border border-border bg-bg p-4 text-sm text-text-muted">
          <p className="mb-2">
            Compression reduces <strong className="text-text-main">tokens and cost</strong> by
            rewriting history before it is sent to the provider while preserving meaning.
          </p>
          <ol className="ml-4 list-decimal space-y-1.5">
            <li>
              <strong className="text-text-main">Token Saver (master)</strong>: must be enabled.
              When it is off, nothing is compressed.
            </li>
            <li>
              <strong className="text-text-main">Mode</strong>: defines the strategy. Simple modes
              (Lite/Standard/Aggressive/Ultra/RTK) run one technique.{" "}
              <strong className="text-text-main">Stacked</strong> runs multiple layers in sequence
              and uses the layer list below.
            </li>
            <li>
              <strong className="text-text-main">Layers (pipeline)</strong>: in Stacked mode, each
              active layer runs in order and passes the compressed text to the next one (for
              example: Session Dedup → RTK → Caveman).
            </li>
            <li>
              <strong className="text-text-main">Configuration</strong>: each layer has its own
              enable switch and parameters (the settings button).
            </li>
            <li>
              <strong className="text-text-main">Named combos</strong>: save different pipelines and
              assign them to specific routing combos in the section below.
            </li>
          </ol>
        </div>
      )}

      {/* ── Master switch + status ── */}
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-bg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-text-main">Token Saver</p>
            <p className="text-xs text-text-muted">Master switch for compression.</p>
          </div>
          <Toggle
            checked={enabled}
            onChange={() => saveSettings({ enabled: !enabled })}
            ariaLabel="Toggle Token Saver"
          />
        </div>

        {/* Mode selector */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-text-muted">Mode</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7">
            {MODES.map((m) => (
              <button
                key={m.value}
                type="button"
                disabled={!enabled}
                onClick={() => saveSettings({ defaultMode: m.value })}
                title={m.hint}
                className={`rounded-lg border px-2.5 py-2 text-left text-xs transition-all disabled:opacity-40 ${
                  mode === m.value
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border text-text-main hover:bg-surface"
                }`}
              >
                <span className="block font-medium">{m.label}</span>
                <span className="mt-0.5 block text-[10px] leading-tight text-text-muted">
                  {m.hint}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pipeline status callout */}
        {pipelineActive ? (
          <div className="flex items-center gap-2 rounded-lg border border-green-500/40 bg-green-500/5 px-3 py-2 text-xs text-green-500">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Layer pipeline is active. The layers below run on each request.
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/5 px-3 py-2 text-xs text-amber-500">
            <span className="material-symbols-outlined text-[16px]">info</span>
            <span>The layers below only run in Stacked mode with Token Saver enabled.</span>
            {!enabled && (
              <button
                type="button"
                onClick={() => saveSettings({ enabled: true })}
                className="rounded border border-amber-500/50 px-2 py-0.5 font-medium hover:bg-amber-500/10"
              >
                Enable Token Saver
              </button>
            )}
            {enabled && mode !== "stacked" && (
              <button
                type="button"
                onClick={() => saveSettings({ defaultMode: "stacked" })}
                className="rounded border border-amber-500/50 px-2 py-0.5 font-medium hover:bg-amber-500/10"
              >
                Use Stacked mode
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Active pipeline (ordered, reorderable) ── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text-main">
            Active pipeline <span className="text-text-muted">(execution order)</span>
          </h2>
          <span className="text-xs text-text-muted">{activeSteps.length} layer(s)</span>
        </div>
        {activeSteps.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border px-3 py-4 text-center text-xs text-text-muted">
            No active layers. Enable a layer below to build the pipeline.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {activeSteps.map((step, index) => {
              const engine = engineById(step.engine);
              return (
                <li
                  key={step.engine}
                  className="flex items-center gap-3 rounded-lg border border-border bg-bg p-3"
                >
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => moveStep(index, -1)}
                      disabled={index === 0}
                      aria-label="Move up"
                      className="text-text-muted hover:text-text-main disabled:opacity-30"
                    >
                      <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => moveStep(index, 1)}
                      disabled={index === activeSteps.length - 1}
                      aria-label="Move down"
                      className="text-text-muted hover:text-text-main disabled:opacity-30"
                    >
                      <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                    </button>
                  </div>
                  <span className="w-5 text-center text-xs font-mono text-text-muted">
                    {index + 1}
                  </span>
                  <span
                    className="material-symbols-outlined text-[20px] text-primary"
                    aria-hidden="true"
                  >
                    {engine?.icon ?? "compress"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-text-main">
                        {engine?.name ?? step.engine}
                      </p>
                      {engine && engine.metadata?.stable === false && (
                        <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-500">
                          beta
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-text-muted">{engine?.description ?? ""}</p>
                  </div>
                  <a
                    href={enginePagePath(step.engine)}
                    title="Configure layer"
                    className="shrink-0 rounded-lg border border-border px-2 py-1.5 text-text-muted hover:bg-surface hover:text-text-main"
                  >
                    <span className="material-symbols-outlined text-[18px]">settings</span>
                  </a>
                  <Toggle
                    checked
                    onChange={() => toggleEngine(step.engine)}
                    ariaLabel={`Disable ${engine?.name ?? step.engine}`}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ── Inactive layers ── */}
      {inactiveEngines.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-text-main">Available layers</h2>
          <ul className="flex flex-col gap-2">
            {inactiveEngines.map((engine) => (
              <li
                key={engine.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-bg p-3 opacity-90"
              >
                <span
                  className="material-symbols-outlined text-[20px] text-text-muted"
                  aria-hidden="true"
                >
                  {engine.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-text-main">{engine.name}</p>
                    {engine.metadata?.stable === false && (
                      <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-500">
                        beta
                      </span>
                    )}
                    <span className="rounded bg-border/50 px-1.5 py-0.5 text-[10px] text-text-muted">
                      prio {engine.stackPriority}
                    </span>
                  </div>
                  <p className="truncate text-xs text-text-muted">{engine.description}</p>
                </div>
                <a
                  href={enginePagePath(engine.id)}
                  title="Configure layer"
                  className="shrink-0 rounded-lg border border-border px-2 py-1.5 text-text-muted hover:bg-surface hover:text-text-main"
                >
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                </a>
                <Toggle
                  checked={false}
                  onChange={() => toggleEngine(engine.id)}
                  ariaLabel={`Enable ${engine.name}`}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Compressão delegada ao provedor ── */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-text-main">Compressão delegada ao provedor</h2>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-bg p-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-main">Context Editing (Claude)</p>
            <p className="text-xs text-text-muted">
              Deixa o próprio provedor limpar blocos antigos de tool-use no servidor, sem reescrever
              a mensagem.
            </p>
          </div>
          <Toggle
            checked={!!settings?.contextEditing?.enabled}
            onChange={() =>
              saveSettings({ contextEditing: { enabled: !settings?.contextEditing?.enabled } })
            }
            ariaLabel="Context Editing"
          />
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/5 px-3 py-2 text-xs text-amber-500">
          <span className="material-symbols-outlined text-[16px]">info</span>
          <span>
            Hoje disponível apenas para Claude (Anthropic). É um modo delegado: o próprio provedor
            limpa blocos antigos de tool-use no servidor — não reescrevemos a mensagem. Não afeta
            outros provedores.
          </span>
        </div>
      </div>
    </section>
  );
}
