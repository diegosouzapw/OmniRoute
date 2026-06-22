"use client";

// Compression Hub — the single place to understand and control compression.
//
// IMPORTANT (hydration): this component deliberately does NOT use `useTranslations`.
// The previous combos redesign failed to hydrate on the production build; the only
// structural difference from the engine pages (which hydrate fine) was a page-level
// `useTranslations("contextCombos")`. To stay on the proven-good path, strings here
// remain literal English text, exactly like `EngineConfigPage`.
//
// Phase 2: this Hub is now a thin overview. The master toggle, mode selector, and the
// reorderable per-layer pipeline live in the panel at /dashboard/context/settings and
// in the named-combo editor. Here we expose a single active-profile selector
// (Default-from-panel | a named combo) + a read-only preview.

import { useCallback, useEffect, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type CompressionMode = "off" | "lite" | "standard" | "aggressive" | "ultra" | "rtk" | "stacked";

interface CompressionSettings {
  enabled: boolean;
  defaultMode: CompressionMode;
  activeComboId?: string | null;
  contextEditing?: { enabled: boolean };
  [key: string]: unknown;
}

interface NamedCombo {
  id: string;
  name: string;
  pipeline: { engine: string; intensity?: string }[];
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
  const [combos, setCombos] = useState<NamedCombo[]>([]);
  const [loading, setLoading] = useState(true);
  const [explainerOpen, setExplainerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Initial load (parallel) ──────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const asJson = (r: Response) => (r.ok ? r.json() : null);
      const [settingsData, combosData] = await Promise.all([
        fetch("/api/settings/compression")
          .then(asJson)
          .catch(() => null),
        fetch("/api/context/combos")
          .then(asJson)
          .catch(() => null),
      ]);
      if (cancelled) return;
      if (settingsData) {
        setSettings(settingsData as CompressionSettings);
      } else {
        setSettings({ enabled: false, defaultMode: "off", contextEditing: { enabled: false } });
      }
      if (Array.isArray(combosData?.combos)) {
        setCombos(combosData.combos as NamedCombo[]);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Settings mutations ───────────────────────────────────────────────────────
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

  // ── Derived state ─────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center p-10 text-sm text-text-muted">
        Loading...
      </div>
    );
  }

  const activeCombo = combos.find((c) => c.id === settings?.activeComboId) ?? null;
  const activePipelineText = activeCombo
    ? activeCombo.pipeline.map((s) => s.engine).join(" → ")
    : "";

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
            <p className="text-sm text-text-muted">Pick which compression profile runs globally.</p>
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
              <strong className="text-text-main">Active profile</strong>: chooses which compression
              profile runs globally — the panel-derived Default or one of your saved named combos.
            </li>
            <li>
              <strong className="text-text-main">Default (from panel)</strong>: derived from the
              master switch and per-engine toggles you configure in Compression Settings.
            </li>
            <li>
              <strong className="text-text-main">Named combos</strong>: saved pipelines you build in
              the named-combo editor. Selecting one makes it the active profile for every request.
            </li>
            <li>
              <strong className="text-text-main">Preview</strong>: shows which engines the active
              profile runs, in order.
            </li>
          </ol>
        </div>
      )}

      {/* ── Active profile ── */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg p-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="active-profile" className="text-sm font-semibold text-text-main">
            Active profile
          </label>
          <p className="text-xs text-text-muted">
            Pick which compression profile runs globally — the panel-derived Default or a saved
            named combo.
          </p>
        </div>
        <select
          id="active-profile"
          data-testid="active-profile-select"
          value={settings?.activeComboId ?? ""}
          onChange={(e) => saveSettings({ activeComboId: e.target.value || null })}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main"
        >
          <option value="">Default (from panel)</option>
          {combos.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <div
          data-testid="active-profile-preview"
          className="rounded-lg border border-dashed border-border px-3 py-2 text-xs text-text-muted"
        >
          {activeCombo ? (
            <span>
              Runs: <span className="font-mono text-text-main">{activePipelineText}</span>
            </span>
          ) : (
            <span>
              Default — configured in{" "}
              <a href="/dashboard/context/settings" className="underline hover:text-text-main">
                Compression Settings
              </a>
              .
            </span>
          )}
        </div>
      </div>

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
