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

// Engines whose detailed config has a dedicated sub-object in the compression
// settings store. The on/off + level for ALL engines now live in the panel
// (/dashboard/context/settings, the `engines` map); only these have a place to
// persist the extra per-engine fields edited on this page. Structural engines
// (lite, headroom, session-dedup, ccr, llmlingua) have no sub-object yet — their
// page keeps the detail form + preview but has nothing extra to persist this phase.
const SETTINGS_SUBOBJECT: Record<string, string> = {
  aggressive: "aggressive",
  ultra: "ultra",
};

interface CompressionSettings {
  engines?: Record<string, { enabled?: boolean; level?: string }>;
  [key: string]: unknown;
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
      const [enginesData, settingsData, analyticsData] = await Promise.all([
        fetch("/api/compression/engines")
          .then(asJson)
          .catch(() => null) as Promise<{ engines: EngineEntry[] } | null>,
        fetch("/api/settings/compression")
          .then(asJson)
          .catch(() => null) as Promise<CompressionSettings | null>,
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

      // Detailed config lives in the engine's settings sub-object (when it has one);
      // the on/off + level moved to the panel. 404/null/missing = schema defaults.
      const subKey = SETTINGS_SUBOBJECT[engineId];
      const stored = subKey ? settingsData?.[subKey] : undefined;
      const currentConfig: Record<string, unknown> =
        stored && typeof stored === "object" ? (stored as Record<string, unknown>) : {};

      if (!cancelled) {
        if (analyticsData) setAnalytics(analyticsData);
        setEngine(foundEngine);
        // Seed configState from defaultValues then override with the stored sub-object.
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

  // Persist the engine's DETAILED config to its settings sub-object. The on/off +
  // level are owned by the panel (the `engines` map) and are NOT written here — so
  // this page never touches the deprecated /api/context/combos/default route.
  async function handleSave() {
    const subKey = SETTINGS_SUBOBJECT[engineId];
    if (!subKey) {
      // Structural engines have no detail store yet — nothing to persist this phase.
      setSaveError(null);
      return;
    }
    // Strip the `enabled` key — engine on/off is the panel's responsibility.
    const { enabled: _ignored, ...detail } = configState;
    void _ignored;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/settings/compression", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [subKey]: detail }),
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
  // Only engines with a dedicated settings sub-object can persist their detail here.
  const persistable = Boolean(SETTINGS_SUBOBJECT[engineId]);

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

      {/* ── Panel pointer (on/off + level live there now) ── */}
      <div className="flex flex-col gap-1 rounded-lg border border-border bg-surface p-4">
        <p className="text-xs text-text-muted" data-testid="panel-pointer-notice">
          Turn this layer on/off and set its level in{" "}
          <a href="/dashboard/context/settings" className="underline hover:text-text">
            Compression Settings
          </a>
          . This page edits its detailed configuration only.
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
          {persistable ? (
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-1.5 rounded bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          ) : (
            <p className="text-xs text-text-muted" data-testid="no-detail-store-notice">
              This layer is configured by the global settings; there is no per-engine override to
              save here yet.
            </p>
          )}
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
