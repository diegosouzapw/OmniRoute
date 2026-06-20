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

interface PreviewDiffSegment {
  type?: string;
  value?: string;
  text?: string;
  content?: string;
  original?: string;
  compressed?: string;
  before?: string;
  after?: string;
}

interface PreviewResult {
  original?: string;
  compressed?: string;
  originalTokens: number;
  compressedTokens: number;
  savingsPct: number;
  diff?: PreviewDiffSegment[];
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

function renderDiffSegment(segment: PreviewDiffSegment, index: number) {
  const label = segment.type ?? "change";
  const text =
    segment.value ??
    segment.text ??
    segment.content ??
    [segment.original ?? segment.before, segment.compressed ?? segment.after]
      .filter(Boolean)
      .join(" → ") ??
    "";

  return (
    <div key={`${label}-${index}`} className="rounded border border-border bg-background p-2">
      <span className="mr-2 rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </span>
      <span className="whitespace-pre-wrap break-words text-text">{text}</span>
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

      // Fire the three independent reads in parallel — load time is the slowest
      // single request, not their sum. Each resolves to null on failure (fail-soft).
      const asJson = (r: Response) => (r.ok ? r.json() : null);
      const [enginesData, comboData, analyticsData] = await Promise.all([
        fetch("/api/compression/engines")
          .then(asJson)
          .catch(() => null) as Promise<{ engines: EngineEntry[] } | null>,
        fetch("/api/context/combos/default")
          .then(asJson)
          .catch(() => null) as Promise<{ pipeline?: ComboStep[] } | null>,
        fetch(`/api/context/analytics/engine?engineId=${engineId}&days=7`)
          .then(asJson)
          .catch(() => null) as Promise<Analytics | null>,
      ]);

      let foundEngine: EngineEntry | null = null;
      if (enginesData) {
        foundEngine = enginesData.engines?.find((e) => e.id === engineId) ?? null;
      } else {
        setLoadError("Failed to load engine information.");
      }

      // Derive enabled + currentConfig from the default combo (404/null = defaults)
      let currentEnabled = false;
      let currentConfig: Record<string, unknown> = {};
      const step = comboData?.pipeline?.find((s) => s.engine === engineId);
      if (step) {
        currentEnabled = step.config?.enabled !== false;
        currentConfig = step.config ?? {};
      }

      if (!cancelled) {
        if (analyticsData) setAnalytics(analyticsData);
        setEngine(foundEngine);
        setEnabled(currentEnabled);
        // Seed configState from defaultValues then override with currentConfig
        const defaults: Record<string, unknown> = {};
        for (const field of foundEngine?.configSchema ?? []) {
          defaults[field.key] = field.defaultValue;
        }
        setConfigState({ ...defaults, ...currentConfig, enabled: currentEnabled });
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
    const nextConfig = { ...configState, enabled: next };
    setEnabled(next);
    setConfigState(nextConfig);
    setToggleError(null);
    try {
      const res = await fetch("/api/context/combos/default", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ engineId, enabled: next, config: nextConfig }),
      });
      if (!res.ok) {
        setToggleError("Failed to update engine state.");
        setEnabled(!next); // revert
        setConfigState(configState);
      }
    } catch {
      setToggleError("Failed to update engine state.");
      setEnabled(!next); // revert
      setConfigState(configState);
    }
  }

  async function handleSave() {
    const nextEnabled = typeof configState.enabled === "boolean" ? configState.enabled : enabled;
    const nextConfig = { ...configState, enabled: nextEnabled };
    setEnabled(nextEnabled);
    setConfigState(nextConfig);
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/context/combos/default", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ engineId, enabled: nextEnabled, config: nextConfig }),
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
  const visibleConfigSchema = engine.configSchema.filter((field) => field.key !== "enabled");

  return (
    <div className="flex flex-col gap-6 p-6 max-w-3xl">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {engine.icon && (
            <span
              className="material-symbols-outlined text-[28px] leading-none text-text-muted"
              aria-hidden="true"
            >
              {engine.icon}
            </span>
          )}
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
            <span className="text-sm font-medium text-text">Enable layer</span>
            <span className="text-xs text-text-muted">
              {enabled
                ? "This layer is active in the default pipeline."
                : "This layer is inactive."}
            </span>
          </div>
          <input
            type="checkbox"
            data-toggle="enable"
            checked={enabled}
            onChange={handleToggle}
            className="h-4 w-4 accent-primary cursor-pointer"
            aria-label="Enable layer"
          />
        </div>
        {toggleError && <p className="text-xs text-destructive">{toggleError}</p>}
        <p className="text-xs text-text-muted" data-testid="stacked-mode-notice">
          Enabled layers run when compression is in &quot;stacked&quot; mode. Configure it in{" "}
          <a href="/dashboard/context/settings" className="underline hover:text-text">
            Compression Settings
          </a>
          .
        </p>
      </div>

      {/* ── Config form ── */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold text-text">Configuration</h2>
        {visibleConfigSchema.length > 0 ? (
          <EngineConfigForm
            schema={visibleConfigSchema}
            value={configState}
            onChange={setConfigState}
          />
        ) : (
          <p className="text-sm text-text-muted">No additional configuration.</p>
        )}
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-1.5 rounded bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
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
            {previewLoading ? "Processing..." : "Preview"}
          </button>
        </div>
        {previewError && <p className="text-xs text-destructive">{previewError}</p>}
        {preview && (
          <div className="flex flex-col gap-3 pt-1 text-sm">
            <div className="flex flex-wrap gap-4">
              <span className="text-text-muted">
                Original tokens: <strong className="text-text">{preview.originalTokens}</strong>
              </span>
              <span className="text-text-muted">
                Compressed tokens: <strong className="text-text">{preview.compressedTokens}</strong>
              </span>
              <span className="text-text-muted">
                Savings: <strong className="text-primary">{preview.savingsPct.toFixed(1)}%</strong>
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Original
                </h3>
                <pre className="max-h-72 overflow-auto rounded border border-border bg-background p-3 whitespace-pre-wrap break-words text-text">
                  {preview.original ?? ""}
                </pre>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Compressed
                </h3>
                <pre className="max-h-72 overflow-auto rounded border border-border bg-background p-3 whitespace-pre-wrap break-words text-text">
                  {preview.compressed ?? ""}
                </pre>
              </div>
            </div>
            {preview.diff && preview.diff.length > 0 && (
              <div className="flex flex-col gap-2" data-testid="compression-preview-diff">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Diff
                </h3>
                <div className="flex max-h-72 flex-col gap-2 overflow-auto rounded border border-border p-2">
                  {preview.diff.map(renderDiffSegment)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Analytics strip ── */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold text-text">Last 7 days</h2>
        {analytics && analytics.runs === 0 ? (
          <p className="text-sm text-text-muted">No data yet</p>
        ) : analytics ? (
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Runs" value={analytics.runs.toLocaleString()} />
            <StatCard label="Tokens saved" value={analytics.tokensSaved.toLocaleString()} />
            <StatCard
              label="Average savings"
              value={`${analytics.avgSavingsPercent.toFixed(1)}%`}
            />
          </div>
        ) : (
          <p className="text-sm text-text-muted">No data yet</p>
        )}
      </div>
    </div>
  );
}

export default EngineConfigPage;
