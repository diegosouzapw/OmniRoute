"use client";

import { useEffect, useState } from "react";
import type { EngineConfigField } from "@omniroute/open-sse/services/compression/engines/types";
import { EngineConfigForm } from "@/shared/components/compression/EngineConfigForm";

// ── Types ─────────────────────────────────────────────────────────────────

interface EngineEntry {
  id: string;
  name: string;
  description: string;
  icon: string;
  stackable: boolean;
  stackPriority: number;
  metadata: { description?: string; [key: string]: unknown };
  configSchema: EngineConfigField[];
}

interface ComboStep {
  engine: string;
  intensity?: string;
  config?: Record<string, unknown>;
}

interface Analytics {
  engineId: string;
  runs: number;
  tokensSaved: number;
  avgSavingsPercent: number;
  days: number;
}

interface PreviewResult {
  originalTokens: number;
  compressedTokens: number;
  savingsPct: number;
}

// ── Default preview sample ────────────────────────────────────────────────

const PREVIEW_SAMPLE =
  "The quick brown fox jumps over the lazy dog. " +
  "This is a sample message used to preview compression. " +
  "It contains enough text to show meaningful token savings.";

// ── Sub-components ────────────────────────────────────────────────────────

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-lg border border-border bg-surface p-3">
      <span className="text-xs text-text-muted">{label}</span>
      <span className="text-lg font-semibold text-text">{value}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export function EngineConfigPage({ engineId }: { engineId: string }) {
  // ── Data state ──────────────────────────────────────────────────────────
  const [engine, setEngine] = useState<EngineEntry | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [configState, setConfigState] = useState<Record<string, unknown>>({});
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ── Preview state ───────────────────────────────────────────────────────
  const [previewText, setPreviewText] = useState(PREVIEW_SAMPLE);
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // ── Action state ────────────────────────────────────────────────────────
  const [saveError, setSaveError] = useState<string | null>(null);
  const [toggleError, setToggleError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // ── Initial load ────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError(null);

      // Fetch engine list
      let foundEngine: EngineEntry | null = null;
      try {
        const res = await fetch("/api/compression/engines");
        if (res.ok) {
          const data = (await res.json()) as { engines: EngineEntry[] };
          foundEngine = data.engines?.find((e) => e.id === engineId) ?? null;
        }
      } catch {
        setLoadError("Failed to load engine information.");
      }

      // Fetch current combo to derive enabled + currentConfig
      let currentEnabled = false;
      let currentConfig: Record<string, unknown> = {};
      try {
        const res = await fetch("/api/context/combos/default");
        if (res.ok) {
          const combo = (await res.json()) as { pipeline?: ComboStep[] };
          const step = combo.pipeline?.find((s) => s.engine === engineId);
          currentEnabled = !!step;
          currentConfig = step?.config ?? {};
        }
        // 404 = no default combo yet — stay at defaults
      } catch {
        // fail-soft: keep defaults
      }

      // Fetch analytics
      try {
        const res = await fetch(`/api/context/analytics/engine?engineId=${engineId}&days=7`);
        if (res.ok) {
          const data = (await res.json()) as Analytics;
          if (!cancelled) setAnalytics(data);
        }
      } catch {
        // fail-soft: analytics stays null
      }

      if (!cancelled) {
        setEngine(foundEngine);
        setEnabled(currentEnabled);
        // Seed configState from defaultValues then override with currentConfig
        const defaults: Record<string, unknown> = {};
        for (const field of foundEngine?.configSchema ?? []) {
          defaults[field.key] = field.defaultValue;
        }
        setConfigState({ ...defaults, ...currentConfig });
        setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [engineId]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  async function handleToggle() {
    const next = !enabled;
    setEnabled(next);
    setToggleError(null);
    try {
      const res = await fetch("/api/context/combos/default", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ engineId, enabled: next }),
      });
      if (!res.ok) {
        setToggleError("Failed to update engine state.");
        setEnabled(!next); // revert
      }
    } catch {
      setToggleError("Failed to update engine state.");
      setEnabled(!next); // revert
    }
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/context/combos/default", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ engineId, enabled: true, config: configState }),
      });
      if (!res.ok) {
        setSaveError("Failed to save configuration.");
      }
    } catch {
      setSaveError("Failed to save configuration.");
    } finally {
      setSaving(false);
    }
  }

  async function handlePreview() {
    setPreviewLoading(true);
    setPreviewError(null);
    setPreview(null);
    try {
      const res = await fetch("/api/compression/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          engineId,
          messages: [{ role: "user", content: previewText }],
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as PreviewResult;
        setPreview(data);
      } else {
        setPreviewError("Preview failed.");
      }
    } catch {
      setPreviewError("Preview failed.");
    } finally {
      setPreviewLoading(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-text-muted text-sm">Loading…</div>
    );
  }

  if (!engine) {
    return (
      <div className="p-6 text-sm text-text-muted">
        {loadError ?? `Engine "${engineId}" not found.`}
      </div>
    );
  }

  const subtitle = engine.metadata?.description ?? engine.description;

  return (
    <div className="flex flex-col gap-6 p-6 max-w-3xl">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {engine.icon && <span className="text-2xl">{engine.icon}</span>}
          <h1 className="text-2xl font-bold text-text">{engine.name}</h1>
        </div>
        {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
      </div>

      {loadError && (
        <p className="text-xs text-destructive border border-destructive/30 rounded px-3 py-2">
          {loadError}
        </p>
      )}

      {/* ── Enable toggle ── */}
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-text">Ativar camada</span>
            <span className="text-xs text-text-muted">
              {enabled ? "Esta camada está ativa no pipeline padrão." : "Esta camada está inativa."}
            </span>
          </div>
          <input
            type="checkbox"
            data-toggle="enable"
            checked={enabled}
            onChange={handleToggle}
            className="h-4 w-4 accent-primary cursor-pointer"
            aria-label="Ativar camada"
          />
        </div>
        {toggleError && <p className="text-xs text-destructive">{toggleError}</p>}
      </div>

      {/* ── Config form ── */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold text-text">Configuração</h2>
        <EngineConfigForm
          schema={engine.configSchema}
          value={configState}
          onChange={setConfigState}
        />
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-1.5 rounded bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
          >
            {saving ? "Salvando…" : "Salvar"}
          </button>
          {saveError && <p className="text-xs text-destructive">{saveError}</p>}
        </div>
      </div>

      {/* ── Live preview ── */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold text-text">Preview</h2>
        <textarea
          className="border border-border rounded px-3 py-2 text-sm text-text bg-background resize-y min-h-[80px]"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          aria-label="Preview input"
        />
        <div className="flex items-center gap-3">
          <button
            onClick={handlePreview}
            disabled={previewLoading}
            className="px-4 py-1.5 rounded bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
          >
            {previewLoading ? "Processando…" : "Preview"}
          </button>
        </div>
        {previewError && <p className="text-xs text-destructive">{previewError}</p>}
        {preview && (
          <div className="flex gap-4 text-sm pt-1">
            <span className="text-text-muted">
              Tokens originais: <strong className="text-text">{preview.originalTokens}</strong>
            </span>
            <span className="text-text-muted">
              Tokens comprimidos: <strong className="text-text">{preview.compressedTokens}</strong>
            </span>
            <span className="text-text-muted">
              Economia: <strong className="text-primary">{preview.savingsPct.toFixed(1)}%</strong>
            </span>
          </div>
        )}
      </div>

      {/* ── Analytics strip ── */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold text-text">Últimos 7 dias</h2>
        {analytics && analytics.runs === 0 ? (
          <p className="text-sm text-text-muted">Sem dados ainda / No data yet</p>
        ) : analytics ? (
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Execuções" value={analytics.runs.toLocaleString()} />
            <StatCard label="Tokens economizados" value={analytics.tokensSaved.toLocaleString()} />
            <StatCard label="Economia média" value={`${analytics.avgSavingsPercent.toFixed(1)}%`} />
          </div>
        ) : (
          <p className="text-sm text-text-muted">Sem dados ainda / No data yet</p>
        )}
      </div>
    </div>
  );
}

export default EngineConfigPage;
