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

// Bounded re-run budget for the model param-filter save: if the draft changed while the PUT was
// in flight, the save repeats with the newer draft instead of clearing the dirty flag on a
// payload that no longer matches what the user typed (#8910).
const PARAM_SAVE_MAX_ATTEMPTS = 3;

// Param filters are stored as one document per provider. Model rows render independent popover
// instances, so their GET -> whole-document PUT transactions must share a provider-level queue;
// instance-local saving refs cannot prevent sibling rows from overwriting each other's updates.
const paramFilterSaveQueues = new Map<string, Promise<void>>();

async function serializeProviderParamFilterSave<T>(
  providerId: string,
  save: () => Promise<T>
): Promise<T> {
  const previous = paramFilterSaveQueues.get(providerId) ?? Promise.resolve();
  const result = previous.then(save);
  const tail = result.then(
    () => undefined,
    () => undefined
  );
  paramFilterSaveQueues.set(providerId, tail);
  try {
    return await result;
  } finally {
    if (paramFilterSaveQueues.get(providerId) === tail) paramFilterSaveQueues.delete(providerId);
  }
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

// An unsaved param-filter draft, bound to the provider/model it was typed for. The save path
// writes through THIS target instead of the props the callback happens to close over, so a draft
// can never be persisted under a provider/model the user never edited (#8910).
interface ParamFilterDraft {
  key: string;
  providerId: string;
  modelId: string;
  block: string;
  allow: string;
}

function paramTargetKeyOf(providerId: string, modelId: string): string {
  return `${providerId}\u0000${modelId}`;
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
  providerId,
  modelId,
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
  const [paramSaving, setParamSaving] = useState(false);
  const [paramSaveFailed, setParamSaveFailed] = useState(false);
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

  // Param-filter drafts are mirrored into a ref so the close/unmount save path reads the
  // latest typed values instead of the values captured when the handler was created (#8910).
  const paramSavingRef = useRef(false);
  // Every unsaved draft, keyed by the provider/model it was typed for. A per-target map (rather
  // than a single slot) is required because a live popover can be re-pointed at another target
  // while a draft is still unsaved: with one slot the next keystroke on the new target destroyed
  // the previous target's unsaved work, and the new target's successful save then cleared the
  // failure indicator — a green UI over data that was never written, i.e. exactly the silent
  // data loss reported in #8910. Drafts are recorded when edited — never derived from a completed
  // load — so an unsaved draft survives even when no load ever succeeded for that target, and
  // every write lands on the draft's own target rather than whatever the popover now points at.
  const paramDraftsRef = useRef<Map<string, ParamFilterDraft>>(new Map());

  const paramTargetKey = paramTargetKeyOf(providerId, modelId);
  const paramTargetRef = useRef<{ key: string; providerId: string; modelId: string }>({
    key: paramTargetKey,
    providerId,
    modelId,
  });
  paramTargetRef.current = { key: paramTargetKey, providerId, modelId };

  // Mirrors of the displayed text, so an edit can snapshot both fields synchronously.
  const blockTextRef = useRef("");
  const allowTextRef = useRef("");
  blockTextRef.current = blockText;
  allowTextRef.current = allowText;
  // Which target the values currently in the fields belong to. Guards the invariant that
  // blockTextRef/allowTextRef never hold content belonging to a target other than the one being
  // displayed — the desync that let one model's server values be saved under another (#8910).
  const fieldsTargetKeyRef = useRef<string | null>(null);

  const applyParamFields = useCallback((targetKey: string, block: string, allow: string) => {
    fieldsTargetKeyRef.current = targetKey;
    blockTextRef.current = block;
    allowTextRef.current = allow;
    setBlockText(block);
    setAllowText(allow);
  }, []);

  // Every edit rewrites the draft for the CURRENT target. The counterpart field is only trusted
  // when the values on screen belong to this target; otherwise it is taken from this target's own
  // pending draft (or empty), so another target's value can never be captured into this draft and
  // then persisted here (#8910). Object identity doubles as the draft revision an in-flight save
  // compares against.
  const editParamDraft = useCallback(
    (field: "block" | "allow", value: string) => {
      const target = paramTargetRef.current;
      const fieldsOwned = fieldsTargetKeyRef.current === target.key;
      const pending = paramDraftsRef.current.get(target.key);
      const block =
        field === "block" ? value : fieldsOwned ? blockTextRef.current : (pending?.block ?? "");
      const allow =
        field === "allow" ? value : fieldsOwned ? allowTextRef.current : (pending?.allow ?? "");
      applyParamFields(target.key, block, allow);
      paramDraftsRef.current.set(target.key, {
        key: target.key,
        providerId: target.providerId,
        modelId: target.modelId,
        block,
        allow,
      });
    },
    [applyParamFields]
  );
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

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
    const draftKey = paramTargetKeyOf(providerId, modelId);
    const draftForThisTarget = () => paramDraftsRef.current.get(draftKey);
    // The fields must always show THIS target's content, and nothing else may ever be read back
    // out of them. A draft that is still pending for this exact provider/model was never persisted
    // (failed or exhausted save): restore it into the inputs instead of loading server state over
    // it, because reloading here would silently revert it — the very complaint behind #8910.
    const pending = draftForThisTarget();
    if (pending) {
      applyParamFields(draftKey, pending.block, pending.allow);
      return;
    }
    // No draft for this target: drop whatever the previously displayed target left on screen so
    // the fields can never present (or contribute) another target's values.
    if (fieldsTargetKeyRef.current !== draftKey) applyParamFields(draftKey, "", "");
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/providers/${providerId}/param-filters`);
        if (!res.ok) throw new Error(`param-filters GET failed: ${res.status}`);
        const data = await res.json();
        if (cancelled || !mountedRef.current) return;
        // Re-check after the await: the user may have typed while the GET was in flight, and a
        // load result must never overwrite (or acknowledge) a draft that is not on the server.
        if (draftForThisTarget()) return;
        const modelCfg = data?.models?.[modelId];
        applyParamFields(
          draftKey,
          modelCfg ? (modelCfg.block ?? []).join(", ") : "",
          modelCfg ? (modelCfg.allow ?? []).join(", ") : ""
        );
        // A load never clears a draft: any draft still pending here belongs to a DIFFERENT
        // target and is still owed a write to that target (#8910). The failure indicator is
        // only cleared once nothing is left unsaved anywhere.
        if (paramDraftsRef.current.size === 0) setParamSaveFailed(false);
      } catch {
        // Keep whatever the user has in the fields (and its dirty flag) on load failure.
      }
    })();
    return () => {
      cancelled = true;
    };
    // Reload only when opening or when the popover targets a different provider/model.
  }, [open, providerId, modelId, applyParamFields]);

  // Drains EVERY pending draft, each written through its OWN provider/model — never the props this
  // callback happens to be bound to — so a draft typed for target A can never be persisted under a
  // target B the user never edited, and re-pointing the popover cannot destroy target A's unsaved
  // work (#8910). Each draft is re-read after every await for the same reason the load effect
  // re-checks its guard: the user can keep typing while a write is in flight.
  const saveModelParamFilters = useCallback(async () => {
    if (paramDraftsRef.current.size === 0 || paramSavingRef.current) return;
    paramSavingRef.current = true;
    if (mountedRef.current) setParamSaving(true);

    // Returns true once nothing is owed for this target any more.
    const saveDraftForTarget = async (key: string): Promise<boolean> => {
      // Re-run while the draft changed under the in-flight write: the payload is snapshotted
      // before the PUT resolves, so a keystroke landing in that window would otherwise be
      // acknowledged (draft dropped) but never persisted — the #8910 lost update.
      for (let attempt = 0; attempt < PARAM_SAVE_MAX_ATTEMPTS; attempt += 1) {
        const draft = paramDraftsRef.current.get(key);
        if (!draft) return true;
        try {
          const wroteDraft = await serializeProviderParamFilterSave(draft.providerId, async () => {
            const res = await fetch(`/api/providers/${draft.providerId}/param-filters`);
            if (!res.ok) throw new Error(`param-filters GET failed: ${res.status}`);
            const current = await res.json();
            // The fetched config belongs to draft.providerId; if the draft was replaced by a newer
            // one while the GET (or this instance's queue wait) was in flight, restart fresh.
            if (paramDraftsRef.current.get(key) !== draft) return false;
            const payload = buildModelParamFilterPayload(
              current,
              draft.modelId,
              draft.block,
              draft.allow
            );
            const putRes = await fetch(`/api/providers/${draft.providerId}/param-filters`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            if (!putRes.ok) throw new Error(`param-filters PUT failed: ${putRes.status}`);
            return true;
          });
          if (!wroteDraft) continue;
          // Only the exact draft that was written may be discarded.
          if (paramDraftsRef.current.get(key) === draft) {
            paramDraftsRef.current.delete(key);
            return true;
          }
        } catch {
          // Save failed — the draft (and the target it belongs to) is intentionally preserved so
          // the next blur/close/unmount save retries it against its own provider/model.
          return false;
        }
      }
      // Budget exhausted (the user is still typing): stay dirty for this target.
      return false;
    };

    try {
      // Do not snapshot the keys once: a second target can become dirty while an earlier target's
      // PUT is in flight. Keep selecting live drafts until only revisions that already failed in
      // this drain remain. Remember the failed object (not just its key), so a newer edit for that
      // target that lands while another request is pending still gets one save attempt.
      const failedDrafts = new Map<string, ParamFilterDraft>();
      while (true) {
        const next = Array.from(paramDraftsRef.current.entries()).find(
          ([key, draft]) => failedDrafts.get(key) !== draft
        );
        if (!next) break;
        const [key] = next;
        if (!(await saveDraftForTarget(key))) {
          const failedDraft = paramDraftsRef.current.get(key);
          if (failedDraft) failedDrafts.set(key, failedDraft);
        }
      }
      // The indicator tracks unsaved work across ALL targets: a successful write for the target
      // now on screen must not signal "saved" while another target's draft is still owed a write.
      if (mountedRef.current) setParamSaveFailed(paramDraftsRef.current.size > 0);
    } finally {
      paramSavingRef.current = false;
      if (mountedRef.current) setParamSaving(false);
    }
  }, []);

  // Persist pending param-filter drafts when the popover closes, unmounts, or is re-pointed at a
  // different provider/model (#8910).
  useEffect(() => {
    if (!open) return;
    return () => {
      void saveModelParamFilters();
    };
  }, [open, paramTargetKey, saveModelParamFilters]);

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
                    onChange={(e) => editParamDraft("block", e.target.value)}
                    onBlur={() => saveModelParamFilters()}
                    placeholder={t("compatBlockedParamsPlaceholder")}
                    disabled={disabled}
                    className="mb-1 w-full rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] font-mono text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 dark:border-zinc-600 dark:bg-zinc-900"
                  />
                  <p className="text-[10px] text-text-muted">
                    {t("compatBlockedParamsHint") ?? "Blocked params (stripped from requests)"}
                    {paramSaving && ` ● ${t("compatSaving")}`}
                    {paramSaveFailed && !paramSaving && (
                      <span
                        role="alert"
                        className="ml-1 font-medium text-red-600 dark:text-red-400"
                        title={t("failedSaveConnectionRetry")}
                      >
                        ● {t("failed")}
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    value={allowText}
                    onChange={(e) => editParamDraft("allow", e.target.value)}
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
