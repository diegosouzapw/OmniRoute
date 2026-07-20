"use client";

// Phase 1d extraction — Issue #3501
// ModelCompatPopover and its local helper (recordToHeaderRows) moved out of
// ProviderDetailPageClient.tsx. Leaf deps: @/shared + providerPageHelpers.

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Input, Toggle } from "@/shared/components";
import { MODEL_COMPAT_PROTOCOL_KEYS } from "@/shared/constants/modelCompat";
import {
  upstreamHeadersRecordsEqual,
  UPSTREAM_HEADERS_UI_MAX,
  headerRowsToRecord,
  compatProtocolLabelKey,
  type HeaderDraftRow,
} from "../providerPageHelpers";

// ---------------------------------------------------------------------------
// Local helper — only used by this component
// ---------------------------------------------------------------------------

function recordToHeaderRows(rec: Record<string, string>, genId: () => string): HeaderDraftRow[] {
  const entries = Object.entries(rec).filter(([k]) => k.trim());
  if (entries.length === 0) return [{ id: genId(), name: "", value: "" }];
  return entries.map(([name, value]) => ({ id: genId(), name, value }));
}

function parseCommaList(text: string): string[] {
  return text
    ? text
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
}

interface ParamFilterConfigLike {
  block?: string[];
  allow?: string[];
  models?: Record<string, unknown>;
  autoLearn?: boolean;
}

// Builds the PUT body for the model-level block/allow save. Extracted so the
// caller's async handler stays simple — this is pure payload-shaping logic.
function buildModelParamFilterPayload(
  current: ParamFilterConfigLike | null | undefined,
  modelId: string,
  blockText: string,
  allowText: string
) {
  const updatedModels: Record<string, unknown> = { ...(current?.models ?? {}) };
  const block = parseCommaList(blockText);
  const allow = parseCommaList(allowText);
  if (block.length > 0 || allow.length > 0) {
    updatedModels[modelId] = { block, allow };
  } else {
    delete updatedModels[modelId];
  }
  return {
    block: current?.block ?? [],
    allow: current?.allow ?? [],
    models: Object.keys(updatedModels).length > 0 ? updatedModels : undefined,
    autoLearn: current?.autoLearn ?? false,
  };
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ModelCompatPopoverProps {
  t: (key: string) => string;
  providerId: string;
  modelId: string;
  effectiveModelNormalize: (protocol: string) => boolean;
  effectiveModelPreserveDeveloper: (protocol: string) => boolean;
  getUpstreamHeadersRecord: (protocol: string) => Record<string, string>;
  onCompatPatch: (
    protocol: string,
    payload: {
      normalizeToolCallId?: boolean;
      preserveOpenAIDeveloperRole?: boolean;
      upstreamHeaders?: Record<string, string>;
    }
  ) => void;
  showDeveloperToggle?: boolean;
  compact?: boolean;
  disabled?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ModelCompatPopover({
  t,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  onCompatPatch,
  showDeveloperToggle = true,
  compact = false,
  disabled,
}: ModelCompatPopoverProps) {
  const [open, setOpen] = useState(false);
  const [protocol, setProtocol] = useState<string>(MODEL_COMPAT_PROTOCOL_KEYS[0]);
  const [headerRows, setHeaderRows] = useState<HeaderDraftRow[]>([]);
  const [blockText, setBlockText] = useState("");
  const [allowText, setAllowText] = useState("");
  const [paramDirty, setParamDirty] = useState(false);
  const [paramSaving, setParamSaving] = useState(false);
  const [valuePeekRowId, setValuePeekRowId] = useState<string | null>(null);
  const [valueFocusRowId, setValueFocusRowId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [portalPanelRect, setPortalPanelRect] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width: number;
  } | null>(null);
  const headerRowIdRef = useRef(0);
  const headerRowsRef = useRef<HeaderDraftRow[]>([]);
  headerRowsRef.current = headerRows;

  const genHeaderRowId = () => {
    headerRowIdRef.current += 1;
    return `uh-${headerRowIdRef.current}`;
  };

  const normalizeToolCallId = effectiveModelNormalize(protocol);
  const preserveDeveloperRole = effectiveModelPreserveDeveloper(protocol);
  const devToggle = showDeveloperToggle && protocol !== "claude";

  const tryCommitHeaderRows = useCallback(
    (rows: HeaderDraftRow[]) => {
      const parsed = headerRowsToRecord(rows);
      const current = getUpstreamHeadersRecord(protocol);
      if (upstreamHeadersRecordsEqual(parsed, current)) return;
      onCompatPatch(protocol, { upstreamHeaders: parsed });
    },
    [getUpstreamHeadersRecord, onCompatPatch, protocol]
  );

  const onHeaderFieldBlur = useCallback(() => {
    queueMicrotask(() => tryCommitHeaderRows(headerRowsRef.current));
  }, [tryCommitHeaderRows]);

  useEffect(() => {
    if (!open) return;
    return () => {
      tryCommitHeaderRows(headerRowsRef.current);
    };
  }, [open, tryCommitHeaderRows]);

  useEffect(() => {
    if (!open) return;
    const rec = getUpstreamHeadersRecord(protocol);
    setHeaderRows(recordToHeaderRows(rec, genHeaderRowId));
    // Only re-load rows when opening or switching protocol — not when the parent passes a new
    // inline callback every render (would wipe in-progress edits).
    // eslint-disable-next-line react-hooks/exhaustive-deps -- see above
  }, [open, protocol]);

  // Load model-level block/allow from param-filters API
  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        const res = await fetch(`/api/providers/${providerId}/param-filters`);
        const data = await res.json();
        const modelCfg = data?.models?.[modelId];
        setBlockText(modelCfg ? (modelCfg.block ?? []).join(", ") : "");
        setAllowText(modelCfg ? (modelCfg.allow ?? []).join(", ") : "");
      } catch {
        setBlockText("");
        setAllowText("");
      }
      setParamDirty(false);
    })();
  }, [open]);

  const saveModelParamFilters = useCallback(async () => {
    if (!paramDirty) return;
    setParamSaving(true);
    try {
      const res = await fetch(`/api/providers/${providerId}/param-filters`);
      const current = await res.json();
      const payload = buildModelParamFilterPayload(current, modelId, blockText, allowText);
      await fetch(`/api/providers/${providerId}/param-filters`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setParamDirty(false);
    } catch {
      // Silently ignore save error
    } finally {
      setParamSaving(false);
    }
  }, [paramDirty, blockText, allowText]);

  useEffect(() => {
    setValuePeekRowId(null);
    setValueFocusRowId(null);
  }, [open, protocol]);

  const namedHeaderCount = headerRows.filter((r) => r.name.trim()).length;
  const canAddHeaderRow = namedHeaderCount < UPSTREAM_HEADERS_UI_MAX;

  const updateHeaderRow = (id: string, patch: Partial<Pick<HeaderDraftRow, "name" | "value">>) => {
    setHeaderRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addHeaderRow = () => {
    if (!canAddHeaderRow) return;
    setHeaderRows((prev) => [...prev, { id: genHeaderRowId(), name: "", value: "" }]);
  };

  const removeHeaderRow = (id: string) => {
    setHeaderRows((prev) => {
      const next = prev.filter((r) => r.id !== id);
      const normalized = next.length === 0 ? [{ id: genHeaderRowId(), name: "", value: "" }] : next;
      queueMicrotask(() => tryCommitHeaderRows(normalized));
      return normalized;
    });
  };

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideTrigger = ref.current?.contains(target);
      const insidePanel = panelRef.current?.contains(target);
      if (!insideTrigger && !insidePanel) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const updatePortalPanelRect = useCallback(() => {
    if (!open || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const margin = 10;
    const width = Math.min(window.innerWidth - 2 * margin, 24 * 16);
    let left = rect.right - width;
    left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
    // Estimated panel height: capped at min(82vh, 42rem=672px)
    const estimatedPanelHeight = Math.min(window.innerHeight * 0.82, 672);
    const spaceBelow = window.innerHeight - rect.bottom - margin;
    const spaceAbove = rect.top - margin;
    if (spaceBelow < estimatedPanelHeight && spaceAbove > spaceBelow) {
      // Not enough space below — open upward
      setPortalPanelRect({ bottom: window.innerHeight - rect.top + 8, left, width });
    } else {
      setPortalPanelRect({ top: rect.bottom + 8, left, width });
    }
  }, [open]);

  useLayoutEffect(() => {
    if (!open) {
      setPortalPanelRect(null);
      return;
    }
    updatePortalPanelRect();
    window.addEventListener("resize", updatePortalPanelRect);
    window.addEventListener("scroll", updatePortalPanelRect, true);
    return () => {
      window.removeEventListener("resize", updatePortalPanelRect);
      window.removeEventListener("scroll", updatePortalPanelRect, true);
    };
  }, [open, updatePortalPanelRect]);

  const panelChromeClass =
    "flex max-h-[min(82vh,42rem)] flex-col overflow-hidden rounded-xl border-2 border-zinc-200 bg-white shadow-2xl dark:border-zinc-600 dark:bg-zinc-950";

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-border bg-background text-text-muted hover:bg-muted hover:text-text-main disabled:opacity-50 transition-colors"
        title={t("compatAdjustmentsTitle")}
      >
        <span className="material-symbols-outlined text-base leading-none">tune</span>
        {!compact && t("compatButtonLabel")}
      </button>
      {open &&
        typeof document !== "undefined" &&
        portalPanelRect &&
        createPortal(
          <div
            ref={panelRef}
            className={panelChromeClass}
            style={{
              position: "fixed",
              ...(portalPanelRect.top !== undefined
                ? { top: portalPanelRect.top }
                : { bottom: portalPanelRect.bottom }),
              left: portalPanelRect.left,
              width: portalPanelRect.width,
              zIndex: 10040,
            }}
          >
            <div className="shrink-0 border-b-2 border-zinc-200 bg-zinc-100 px-3 py-2.5 dark:border-zinc-600 dark:bg-zinc-900">
              <p className="text-xs font-semibold text-text-main">{t("compatAdjustmentsTitle")}</p>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                {t("compatProtocolHint")}
              </p>
            </div>
            <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-white p-3 [scrollbar-gutter:stable] [scrollbar-width:thin] dark:bg-zinc-950">
              <label className="block text-[11px] font-medium text-text-muted mb-1.5">
                {t("compatProtocolLabel")}
              </label>
              <select
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                disabled={disabled}
                className="mb-4 w-full rounded-lg border border-zinc-200 bg-white px-2.5 py-2 text-xs text-text-main focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-zinc-600 dark:bg-zinc-900"
              >
                {MODEL_COMPAT_PROTOCOL_KEYS.map((p) => (
                  <option key={p} value={p}>
                    {t(compatProtocolLabelKey(p))}
                  </option>
                ))}
              </select>
              <div className="flex flex-col gap-3.5">
                <Toggle
                  size="sm"
                  label={t("compatToolIdShort")}
                  title={t("normalizeToolCallIdLabel")}
                  checked={normalizeToolCallId}
                  onChange={(v) => onCompatPatch(protocol, { normalizeToolCallId: v })}
                  disabled={disabled}
                />
                {devToggle && (
                  <Toggle
                    size="sm"
                    label={t("compatDoNotPreserveDeveloper")}
                    title={t("preserveDeveloperRoleLabel")}
                    checked={preserveDeveloperRole === false}
                    onChange={(checked) =>
                      onCompatPatch(protocol, { preserveOpenAIDeveloperRole: !checked })
                    }
                    disabled={disabled}
                  />
                )}
              </div>

              {/* Param filters — model-level block/allow (#6625) */}
              <div className="mt-4 space-y-2.5">
                <label className="block text-[11px] font-semibold text-text-main">
                  {t("compatParamFiltersLabel") ?? "Param Filters"}
                </label>
                <div>
                  <input
                    type="text"
                    value={blockText}
                    onChange={(e) => {
                      setBlockText(e.target.value);
                      setParamDirty(true);
                    }}
                    onBlur={() => saveModelParamFilters()}
                    placeholder={t("compatBlockedParamsPlaceholder")}
                    disabled={disabled}
                    className="mb-1 w-full rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] font-mono text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 dark:border-zinc-600 dark:bg-zinc-900"
                  />
                  <p className="text-[10px] text-text-muted">
                    {t("compatBlockedParamsHint") ?? "Blocked params (stripped from requests)"}
                    {paramSaving && ` ● ${t("compatSaving")}`}
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    value={allowText}
                    onChange={(e) => {
                      setAllowText(e.target.value);
                      setParamDirty(true);
                    }}
                    onBlur={() => saveModelParamFilters()}
                    placeholder={t("compatAllowedParamsPlaceholder")}
                    disabled={disabled}
                    className="mb-1 w-full rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] font-mono text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 dark:border-zinc-600 dark:bg-zinc-900"
                  />
                  <p className="text-[10px] text-text-muted">
                    {t("compatAllowedParamsHint") ?? "Allowed params (re-added after deny)"}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border-2 border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-600 dark:bg-zinc-900">
                <label className="block text-[11px] font-semibold text-text-main mb-1">
                  {t("compatUpstreamHeadersLabel")}
                </label>
                <p className="text-[11px] text-text-muted mb-3 leading-relaxed">
                  {t("compatUpstreamHeadersHint")}
                </p>
                <div className="space-y-2">
                  <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-1.5 items-end text-[10px] font-medium uppercase tracking-wide text-text-muted px-0.5">
                    <span>{t("compatUpstreamHeaderName")}</span>
                    <span className="col-span-1">{t("compatUpstreamHeaderValue")}</span>
                    <span className="w-8 shrink-0" aria-hidden />
                  </div>
                  {headerRows.map((row) => (
                    <div
                      key={row.id}
                      className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-1.5 items-center"
                    >
                      <Input
                        value={row.name}
                        onChange={(e) => updateHeaderRow(row.id, { name: e.target.value })}
                        onBlur={onHeaderFieldBlur}
                        disabled={disabled}
                        placeholder={t("compatUpstreamHeaderNamePlaceholder")}
                        className="gap-0 min-w-0"
                        inputClassName="h-9 bg-white py-1.5 px-2 text-xs font-mono dark:bg-zinc-900"
                        autoComplete="off"
                      />
                      <div
                        className="min-w-0"
                        onMouseEnter={() => setValuePeekRowId(row.id)}
                        onMouseLeave={() =>
                          setValuePeekRowId((cur) => (cur === row.id ? null : cur))
                        }
                      >
                        <Input
                          type={
                            valuePeekRowId === row.id || valueFocusRowId === row.id
                              ? "text"
                              : "password"
                          }
                          value={row.value}
                          onChange={(e) => updateHeaderRow(row.id, { value: e.target.value })}
                          onFocus={() => setValueFocusRowId(row.id)}
                          onBlur={() => {
                            setValueFocusRowId((cur) => (cur === row.id ? null : cur));
                            onHeaderFieldBlur();
                          }}
                          disabled={disabled}
                          placeholder={t("compatUpstreamHeaderValuePlaceholder")}
                          className="gap-0 min-w-0"
                          inputClassName="h-9 bg-white py-1.5 px-2 text-xs dark:bg-zinc-900"
                          autoComplete="off"
                          spellCheck={false}
                        />
                      </div>
                      <button
                        type="button"
                        disabled={disabled || headerRows.length <= 1}
                        onClick={() => removeHeaderRow(row.id)}
                        title={t("compatUpstreamRemoveRow")}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/80 text-text-muted hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text-muted transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg leading-none">
                          close
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={disabled || !canAddHeaderRow}
                  onClick={addHeaderRow}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-xs font-medium text-primary hover:bg-primary/5 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                >
                  <span className="material-symbols-outlined text-base leading-none">add</span>
                  {t("compatUpstreamAddRow")}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
