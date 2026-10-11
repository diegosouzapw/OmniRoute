"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { EngineConfigField } from "@omniroute/open-sse/services/compression/engines/types";
import { EngineConfigForm } from "@/shared/components/compression/EngineConfigForm";
import {
  buildEngineDetailUpdate,
  forgetSentEdits,
  formAfterSave,
  seedEngineForm,
  withoutEmptyText,
} from "@/shared/components/compression/engineConfigSave";

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
// persist the extra per-engine fields edited on this page. session-dedup and ccr
// joined headroom in #8388 (they previously rendered a real, editable detail form
// with no Save affordance — edits vanished on reload). lite gained a dedicated
// sub-object with the compressToolResults toggle. Other structural engines
// (llmlingua, relevance) still have no dedicated sub-object — their page
// keeps the detail form + preview but has nothing extra to persist yet.
const SETTINGS_SUBOBJECT: Record<string, string> = {
  lite: "lite",
  aggressive: "aggressive",
  ultra: "ultra",
  headroom: "headroom",
  "session-dedup": "sessionDedup",
  ccr: "ccr",
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

const ENGINE_ICON_ALIASES: Record<string, string> = {
  brain: "psychology",
};

// ── Sub-components ────────────────────────────────────────────────────────

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-lg border border-border bg-surface p-3">
      <span className="text-xs text-text-muted">{label}</span>
      <span className="text-lg font-semibold text-text">{value}</span>
    </div>
  );
}

function renderDiffSegment(
  segment: PreviewDiffSegment,
  index: number,
  translateLabel: (label: string) => string
) {
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
        {translateLabel(label)}
      </span>
      <span className="whitespace-pre-wrap break-words text-text">{text}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export function EngineConfigPage({ engineId }: { engineId: string }) {
  const locale = useLocale();
  const t = useTranslations("compressionEngineConfig");
  // ── Data state ──────────────────────────────────────────────────────────
  const [engine, setEngine] = useState<EngineEntry | null>(null);
  const [configState, setConfigState] = useState<Record<string, unknown>>({});
  // The stored values as of the last load or save, in form shape. A save sends the fields
  // changed since.
  const [savedConfig, setSavedConfig] = useState<Record<string, unknown>>({});
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ── Preview state ───────────────────────────────────────────────────────
  const [previewText, setPreviewText] = useState(() => t("previewSample"));
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

      const foundEngine = enginesData?.engines?.find((e) => e.id === engineId) ?? null;

      // Detailed config lives in the engine's settings sub-object (when it has one);
      // the on/off + level moved to the panel. A missing sub-object means schema defaults.
      const subKey = SETTINGS_SUBOBJECT[engineId];
      const stored = subKey ? settingsData?.[subKey] : undefined;

      if (!cancelled) {
        if (!enginesData) {
          setLoadError(t("loadFailed"));
        } else if (subKey && !settingsData) {
          // Without the stored settings the form would show defaults as saved values, so
          // Save stays off.
          setLoadError(t("settingsLoadFailed"));
        }
        if (analyticsData) setAnalytics(analyticsData);
        setEngine(foundEngine);
        const seeded = seedEngineForm(engineId, foundEngine?.configSchema ?? [], stored);
        setConfigState(seeded);
        setSavedConfig(seeded);
        setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [engineId, t]);

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
    // Lite's cap must be in range before anything is sent; the save floors it to a whole number.
    // Only NaN (the emptied sentinel) skips the check — overflow like 1e999 fails the range below.
    const cap = engineId === "lite" ? configState.maxToolLength : undefined;
    if (
      typeof cap === "number" &&
      !Number.isNaN(cap) &&
      (Math.floor(cap) < 256 || Math.floor(cap) > 1_000_000)
    ) {
      setSaveError(t("saveFailed"));
      return;
    }
    const sent = configState;
    setSaving(true);
    setSaveError(null);
    try {
      // The body starts from the copy stored now and changes only the fields edited here. The
      // server replaces each sub-object whole (lite merges), so a copy this page loaded earlier
      // would write back fields another page saved since.
      const current = (await fetch("/api/settings/compression")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null)) as CompressionSettings | null;
      if (!current) {
        setSaveError(t("saveFailed"));
        return;
      }
      const detail = buildEngineDetailUpdate(engineId, savedConfig, sent, current[subKey]);
      const res = await fetch("/api/settings/compression", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [subKey]: detail }),
      });
      if (!res.ok) {
        setSavedConfig((saved) => forgetSentEdits(saved, sent));
        setSaveError(t("saveFailed"));
        return;
      }
      // Show what the server now holds, which can include fields another page changed, and
      // keep anything typed while the save was out.
      const settings = (await res.json().catch(() => null)) as CompressionSettings | null;
      const written = seedEngineForm(
        engineId,
        engine?.configSchema ?? [],
        settings?.[subKey] ?? detail
      );
      setSavedConfig(written);
      setConfigState((now) => formAfterSave(written, sent, now));
    } catch {
      // The PUT may have reached the server before the request failed, so the next save
      // sends these fields again.
      setSavedConfig((saved) => forgetSentEdits(saved, sent));
      setSaveError(t("saveFailed"));
    } finally {
      setSaving(false);
    }
  }

  async function handlePreview() {
    setPreviewLoading(true);
    setPreviewError(null);
    setPreview(null);
    try {
      // Pass the form's current detail (e.g. headroom.minRows) so preview honors
      // unsaved edits and the persisted sub-object after save (#8056).
      const detailConfig =
        engineId === "headroom"
          ? {
              headroom: {
                ...(typeof configState.minRows === "number" && !Number.isNaN(configState.minRows)
                  ? { minRows: configState.minRows }
                  : {}),
              },
            }
          : engineId === "aggressive"
            ? { aggressive: withoutEmptyText(configState) }
            : engineId === "ultra"
              ? { ultra: withoutEmptyText(configState) }
              : undefined;
      const res = await fetch("/api/compression/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          engineId,
          messages: [{ role: "user", content: previewText }],
          ...(detailConfig ? { config: detailConfig } : {}),
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as PreviewResult;
        setPreview(data);
      } else {
        setPreviewError(t("previewFailed"));
      }
    } catch {
      setPreviewError(t("previewFailed"));
    } finally {
      setPreviewLoading(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-text-muted text-sm">
        {t("loading")}
      </div>
    );
  }

  if (!engine) {
    return (
      <div className="p-6 text-sm text-text-muted">
        {loadError ?? t("engineNotFound", { engine: engineId })}
      </div>
    );
  }

  const engineNameKey = `engines.${engineId}.name`;
  const engineDescriptionKey = `engines.${engineId}.description`;
  const engineName = t.has(engineNameKey) ? t(engineNameKey) : engine.name;
  const rawSubtitle = engine.metadata?.description ?? engine.description;
  const subtitle = t.has(engineDescriptionKey) ? t(engineDescriptionKey) : rawSubtitle;
  const visibleConfigSchema = engine.configSchema
    .filter((field) => field.key !== "enabled")
    .map((field) => {
      const engineFieldPrefix = `engineFields.${engineId}.${field.key}`;
      const fieldPrefix = `fields.${field.key}`;
      const labelKey = t.has(`${engineFieldPrefix}.label`)
        ? `${engineFieldPrefix}.label`
        : `${fieldPrefix}.label`;
      const descriptionKey = t.has(`${engineFieldPrefix}.description`)
        ? `${engineFieldPrefix}.description`
        : `${fieldPrefix}.description`;

      return {
        ...field,
        label: t.has(labelKey) ? t(labelKey) : field.label,
        description:
          field.description && t.has(descriptionKey) ? t(descriptionKey) : field.description,
        options: field.options?.map((option) => {
          const optionKey = `options.${field.key}.${option.value}`;
          return { ...option, label: t.has(optionKey) ? t(optionKey) : option.label };
        }),
      };
    });
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
              {ENGINE_ICON_ALIASES[engine.icon] || engine.icon}
            </span>
          )}
          <h1 className="text-2xl font-bold text-text">{engineName}</h1>
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
          {t("panelPointerPrefix")}{" "}
          <a href="/dashboard/context/settings" className="underline hover:text-text">
            {t("compressionSettings")}
          </a>
          {t("panelPointerSuffix")}
        </p>
      </div>

      {/* ── Config form ── */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold text-text">{t("configuration")}</h2>
        {visibleConfigSchema.length > 0 ? (
          <EngineConfigForm
            schema={visibleConfigSchema}
            value={configState}
            onChange={(key, next) => setConfigState((prev) => ({ ...prev, [key]: next }))}
          />
        ) : (
          <p className="text-sm text-text-muted">{t("noAdditionalConfiguration")}</p>
        )}
        <div className="flex items-center gap-3 pt-1">
          {persistable ? (
            <button
              onClick={handleSave}
              disabled={saving || Boolean(loadError)}
              className="px-4 py-1.5 rounded bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
            >
              {saving ? t("saving") : t("save")}
            </button>
          ) : (
            <p className="text-xs text-text-muted" data-testid="no-detail-store-notice">
              {t("globalSettingsOnly")}
            </p>
          )}
          {saveError && <p className="text-xs text-destructive">{saveError}</p>}
        </div>
      </div>

      {/* ── Live preview ── */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold text-text">{t("preview")}</h2>
        <textarea
          className="border border-border rounded px-3 py-2 text-sm text-text bg-background resize-y min-h-[80px]"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          aria-label={t("previewInput")}
        />
        <div className="flex items-center gap-3">
          <button
            onClick={handlePreview}
            disabled={previewLoading}
            className="px-4 py-1.5 rounded bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
          >
            {previewLoading ? t("processing") : t("preview")}
          </button>
        </div>
        {previewError && <p className="text-xs text-destructive">{previewError}</p>}
        {preview && (
          <div className="flex flex-col gap-3 pt-1 text-sm">
            <div className="flex flex-wrap gap-4">
              <span className="text-text-muted">
                {t("originalTokens")}:{" "}
                <strong className="text-text">{preview.originalTokens}</strong>
              </span>
              <span className="text-text-muted">
                {t("compressedTokens")}:{" "}
                <strong className="text-text">{preview.compressedTokens}</strong>
              </span>
              <span className="text-text-muted">
                {t("savings")}:{" "}
                <strong className="text-primary">{preview.savingsPct.toFixed(1)}%</strong>
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {t("original")}
                </h3>
                <pre className="max-h-72 overflow-auto rounded border border-border bg-background p-3 whitespace-pre-wrap break-words text-text">
                  {preview.original ?? ""}
                </pre>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {t("compressed")}
                </h3>
                <pre className="max-h-72 overflow-auto rounded border border-border bg-background p-3 whitespace-pre-wrap break-words text-text">
                  {preview.compressed ?? ""}
                </pre>
              </div>
            </div>
            {preview.diff && preview.diff.length > 0 && (
              <div className="flex flex-col gap-2" data-testid="compression-preview-diff">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {t("diff")}
                </h3>
                <div className="flex max-h-72 flex-col gap-2 overflow-auto rounded border border-border p-2">
                  {preview.diff.map((segment, index) =>
                    renderDiffSegment(segment, index, (label) => {
                      const key = `diffLabels.${label}`;
                      return t.has(key) ? t(key) : label;
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Analytics strip ── */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold text-text">{t("last7Days")}</h2>
        {analytics && analytics.runs === 0 ? (
          <p className="text-sm text-text-muted">{t("noDataYet")}</p>
        ) : analytics ? (
          <div className="grid grid-cols-3 gap-3">
            <StatCard label={t("runs")} value={analytics.runs.toLocaleString(locale)} />
            <StatCard
              label={t("tokensSaved")}
              value={analytics.tokensSaved.toLocaleString(locale)}
            />
            <StatCard
              label={t("averageSavings")}
              value={`${analytics.avgSavingsPercent.toFixed(1)}%`}
            />
          </div>
        ) : (
          <p className="text-sm text-text-muted">{t("noDataYet")}</p>
        )}
      </div>
    </div>
  );
}

export default EngineConfigPage;
