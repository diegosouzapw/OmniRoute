"use client";

// Compression Hub — the single place to understand and control compression.
//
// IMPORTANT (hydration): this component deliberately does NOT use `useTranslations`.
// The previous combos redesign failed to hydrate on the production build; the only
// structural difference from the engine pages (which hydrate fine) was a page-level
// `useTranslations("contextCombos")`. To stay on the proven-good path, all strings
// here are hardcoded (pt-BR), exactly like `EngineConfigPage`.

import { useCallback, useEffect, useState } from "react";
import type { EngineConfigField } from "@omniroute/open-sse/services/compression/engines/types";
import { EngineConfigForm } from "@/shared/components/compression/EngineConfigForm";

// ── Types ─────────────────────────────────────────────────────────────────────

type CompressionMode = "off" | "lite" | "standard" | "aggressive" | "ultra" | "rtk" | "stacked";

interface CompressionSettings {
  enabled: boolean;
  defaultMode: CompressionMode;
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
  configSchema: EngineConfigField[];
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
  { value: "off", label: "Off", hint: "Sem compressão" },
  { value: "lite", label: "Lite", hint: "Limpeza rápida" },
  { value: "standard", label: "Standard", hint: "Caveman padrão" },
  { value: "aggressive", label: "Aggressive", hint: "Resumo + aging" },
  { value: "ultra", label: "Ultra", hint: "Poda heurística" },
  { value: "rtk", label: "RTK", hint: "Filtros de tool output" },
  { value: "stacked", label: "Stacked", hint: "Roda as camadas abaixo em sequência" },
];

// Engines with a rich bespoke page (analytics, language packs, filter catalog, live
// preview): the gear links there. Every other engine is configured inline in the Hub.
const BESPOKE_PAGE_ENGINES = new Set(["caveman", "rtk"]);

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

function EngineBadges({ engine }: { engine: EngineEntry | undefined }) {
  if (!engine) return null;
  return (
    <>
      {engine.metadata?.stable === false && (
        <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-500">
          experimental
        </span>
      )}
    </>
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

  // Inline per-engine config (replaces the old per-engine menu pages for generic engines)
  const [configEngineId, setConfigEngineId] = useState<string | null>(null);
  const [draftConfig, setDraftConfig] = useState<Record<string, unknown>>({});
  const [savingConfig, setSavingConfig] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);

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
        setSettings({ enabled: false, defaultMode: "off" });
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
          setError("Falha ao salvar as configurações.");
        }
      } catch {
        setSettings(settings);
        setError("Falha ao salvar as configurações.");
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
      const enabledNow = combo.pipeline.some((s) => s.engine === engineId);
      const prev = combo;

      // Optimistic update (mirrors the server's insert-at-priority / remove logic).
      let optimistic: PipelineStep[];
      if (enabledNow) {
        optimistic = combo.pipeline.filter((s) => s.engine !== engineId);
        if (configEngineId === engineId) setConfigEngineId(null);
      } else {
        const priorityOf = (eid: string) =>
          engines.find((e) => e.id === eid)?.stackPriority ?? 50;
        optimistic = [...combo.pipeline];
        let insertAt = optimistic.findIndex(
          (s) => priorityOf(s.engine) > priorityOf(engineId)
        );
        if (insertAt < 0) insertAt = optimistic.length;
        optimistic.splice(insertAt, 0, { engine: engineId });
      }
      setCombo({ ...combo, pipeline: optimistic });
      setError(null);

      try {
        const res = await fetch("/api/context/combos/default", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ engineId, enabled: !enabledNow }),
        });
        if (!res.ok) {
          setCombo(prev);
          setError("Falha ao atualizar a camada.");
          return;
        }
        const updated = await res.json();
        if (Array.isArray(updated?.pipeline)) {
          setCombo({ ...prev, pipeline: updated.pipeline });
        }
      } catch {
        setCombo(prev);
        setError("Falha ao atualizar a camada.");
      }
    },
    [combo, engines, configEngineId]
  );

  // ── Reorder an active layer ───────────────────────────────────────────────────
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
          setError("Falha ao reordenar o pipeline.");
        }
      } catch {
        setCombo(prev);
        setError("Falha ao reordenar o pipeline.");
      }
    },
    [combo]
  );

  // ── Inline config (open / save) ───────────────────────────────────────────────
  const openInlineConfig = useCallback(
    (engineId: string) => {
      const engine = engines.find((e) => e.id === engineId);
      const step = combo?.pipeline.find((s) => s.engine === engineId);
      const defaults: Record<string, unknown> = {};
      for (const f of engine?.configSchema ?? []) defaults[f.key] = f.defaultValue;
      setDraftConfig({ ...defaults, ...(step?.config ?? {}) });
      setConfigError(null);
      setConfigEngineId(engineId);
    },
    [engines, combo]
  );

  const saveInlineConfig = useCallback(
    async (engineId: string) => {
      setSavingConfig(true);
      setConfigError(null);
      try {
        const res = await fetch("/api/context/combos/default", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          // enabled:true — configuring implies the layer stays active (config only
          // persists on an active pipeline step).
          body: JSON.stringify({ engineId, enabled: true, config: draftConfig }),
        });
        if (!res.ok) {
          setConfigError("Falha ao salvar a configuração.");
          return;
        }
        const updated = await res.json();
        if (combo && Array.isArray(updated?.pipeline)) {
          setCombo({ ...combo, pipeline: updated.pipeline });
        }
        setConfigEngineId(null);
      } catch {
        setConfigError("Falha ao salvar a configuração.");
      } finally {
        setSavingConfig(false);
      }
    },
    [draftConfig, combo]
  );

  // ── Derived state ─────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center p-10 text-sm text-text-muted">
        Carregando…
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

  // Gear control: bespoke engines link to their page; generic engines open inline config.
  function GearControl({ engineId, active }: { engineId: string; active: boolean }) {
    if (BESPOKE_PAGE_ENGINES.has(engineId)) {
      return (
        <a
          href={enginePagePath(engineId)}
          title="Abrir página de configuração"
          className="shrink-0 rounded-lg border border-border px-2 py-1.5 text-text-muted hover:bg-surface hover:text-text-main"
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
        </a>
      );
    }
    if (!active) return null; // config only persists on an active layer
    const open = configEngineId === engineId;
    return (
      <button
        type="button"
        title="Configurar camada"
        aria-label="Configurar camada"
        aria-expanded={open}
        onClick={() => (open ? setConfigEngineId(null) : openInlineConfig(engineId))}
        className={`shrink-0 rounded-lg border px-2 py-1.5 hover:bg-surface ${
          open
            ? "border-primary/60 text-primary"
            : "border-border text-text-muted hover:text-text-main"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">settings</span>
      </button>
    );
  }

  function InlineConfigPanel({ engineId }: { engineId: string }) {
    if (configEngineId !== engineId) return null;
    const engine = engineById(engineId);
    const schema = engine?.configSchema ?? [];
    return (
      <div className="mt-3 flex flex-col gap-3 rounded-lg border border-primary/30 bg-surface p-3">
        {schema.length === 0 ? (
          <p className="text-xs text-text-muted">Esta camada não tem parâmetros configuráveis.</p>
        ) : (
          <EngineConfigForm schema={schema} value={draftConfig} onChange={setDraftConfig} />
        )}
        {configError && <p className="text-xs text-danger">{configError}</p>}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => saveInlineConfig(engineId)}
            disabled={savingConfig}
            className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {savingConfig ? "Salvando…" : "Salvar"}
          </button>
          <button
            type="button"
            onClick={() => setConfigEngineId(null)}
            className="rounded-lg border border-border px-3 py-1.5 text-sm text-text-main"
          >
            Cancelar
          </button>
          <a
            href={enginePagePath(engineId)}
            className="text-xs text-primary underline hover:text-text-main"
          >
            Pré-visualizar + analytics →
          </a>
        </div>
      </div>
    );
  }

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
              Ligue, configure e ordene as camadas de compressão num só lugar.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setExplainerOpen((v) => !v)}
          className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs text-text-main hover:bg-bg"
        >
          {explainerOpen ? "Ocultar explicação" : "Como funciona?"}
        </button>
      </div>

      {error && (
        <p className="rounded border border-danger/40 px-3 py-2 text-xs text-danger">{error}</p>
      )}

      {/* ── Explainer ── */}
      {explainerOpen && (
        <div className="rounded-lg border border-border bg-bg p-4 text-sm text-text-muted">
          <p className="mb-2">
            A compressão reduz <strong className="text-text-main">tokens e custo</strong> reescrevendo
            o histórico antes de enviar ao provider, preservando o sentido.
          </p>
          <ol className="ml-4 list-decimal space-y-1.5">
            <li>
              <strong className="text-text-main">Token Saver (master)</strong>: precisa estar ligado.
              Desligado, nada é comprimido.
            </li>
            <li>
              <strong className="text-text-main">Modo</strong>: define a estratégia. Os modos simples
              (Lite/Standard/Aggressive/Ultra/RTK) rodam uma única técnica. O modo{" "}
              <strong className="text-text-main">Stacked</strong> roda várias camadas em sequência — é
              o que usa a lista de camadas abaixo.
            </li>
            <li>
              <strong className="text-text-main">Camadas (pipeline)</strong>: no modo Stacked, cada
              camada ativa roda na ordem definida, passando o texto já comprimido para a próxima
              (ex.: Session Dedup → RTK → Caveman).
            </li>
            <li>
              <strong className="text-text-main">Configuração</strong>: cada camada ativa tem o botão
              ⚙ para liga/desliga e parâmetros, configuráveis aqui mesmo (Caveman e RTK abrem a
              página completa).
            </li>
            <li>
              <strong className="text-text-main">Combos nomeados</strong>: salve diferentes pipelines
              e atribua a combos de roteamento específicos (seção abaixo).
            </li>
          </ol>
        </div>
      )}

      {/* ── Master switch + status ── */}
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-bg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-text-main">Token Saver</p>
            <p className="text-xs text-text-muted">Chave geral da compressão.</p>
          </div>
          <Toggle
            checked={enabled}
            onChange={() => saveSettings({ enabled: !enabled })}
            ariaLabel="Ligar/desligar Token Saver"
          />
        </div>

        {/* Mode selector */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-text-muted">Modo</p>
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
            Pipeline de camadas ativo — as camadas abaixo rodam em cada requisição.
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/5 px-3 py-2 text-xs text-amber-500">
            <span className="material-symbols-outlined text-[16px]">info</span>
            <span>As camadas abaixo só rodam no modo Stacked com o Token Saver ligado.</span>
            {!enabled && (
              <button
                type="button"
                onClick={() => saveSettings({ enabled: true })}
                className="rounded border border-amber-500/50 px-2 py-0.5 font-medium hover:bg-amber-500/10"
              >
                Ligar Token Saver
              </button>
            )}
            {enabled && mode !== "stacked" && (
              <button
                type="button"
                onClick={() => saveSettings({ defaultMode: "stacked" })}
                className="rounded border border-amber-500/50 px-2 py-0.5 font-medium hover:bg-amber-500/10"
              >
                Usar modo Stacked
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Active pipeline (ordered, reorderable) ── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text-main">
            Pipeline ativo <span className="text-text-muted">(ordem de execução)</span>
          </h2>
          <span className="text-xs text-text-muted">{activeSteps.length} camada(s)</span>
        </div>
        {activeSteps.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border px-3 py-4 text-center text-xs text-text-muted">
            Nenhuma camada ativa. Ligue uma camada abaixo para montar o pipeline.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {activeSteps.map((step, index) => {
              const engine = engineById(step.engine);
              const experimental = engine?.metadata?.stable === false;
              return (
                <li
                  key={step.engine}
                  className="flex flex-col rounded-lg border border-border bg-bg p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => moveStep(index, -1)}
                        disabled={index === 0}
                        aria-label="Mover para cima"
                        className="text-text-muted hover:text-text-main disabled:opacity-30"
                      >
                        <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => moveStep(index, 1)}
                        disabled={index === activeSteps.length - 1}
                        aria-label="Mover para baixo"
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
                        <EngineBadges engine={engine} />
                      </div>
                      <p className="truncate text-xs text-text-muted">{engine?.description ?? ""}</p>
                      {experimental && (
                        <p className="text-[11px] text-amber-500">
                          Em desenvolvimento — pode não comprimir ainda.
                        </p>
                      )}
                    </div>
                    <GearControl engineId={step.engine} active />
                    <Toggle
                      checked
                      onChange={() => toggleEngine(step.engine)}
                      ariaLabel={`Desligar ${engine?.name ?? step.engine}`}
                    />
                  </div>
                  <InlineConfigPanel engineId={step.engine} />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ── Inactive layers ── */}
      {inactiveEngines.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-text-main">Camadas disponíveis</h2>
          <ul className="flex flex-col gap-2">
            {inactiveEngines.map((engine) => {
              const experimental = engine.metadata?.stable === false;
              return (
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
                      <EngineBadges engine={engine} />
                      <span className="rounded bg-border/50 px-1.5 py-0.5 text-[10px] text-text-muted">
                        prio {engine.stackPriority}
                      </span>
                    </div>
                    <p className="truncate text-xs text-text-muted">{engine.description}</p>
                    {experimental && (
                      <p className="text-[11px] text-amber-500">
                        Em desenvolvimento — pode não comprimir ainda.
                      </p>
                    )}
                  </div>
                  <GearControl engineId={engine.id} active={false} />
                  <Toggle
                    checked={false}
                    onChange={() => toggleEngine(engine.id)}
                    ariaLabel={`Ligar ${engine.name}`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
