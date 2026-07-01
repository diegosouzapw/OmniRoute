"use client";

import { useState, useEffect, useLayoutEffect, useCallback, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Input, Toggle } from "@/shared/components";
import { MODEL_COMPAT_PROTOCOL_KEYS } from "@/shared/constants/modelCompat";
import type {
  ProviderModelCapabilities,
  ProviderModelCapabilitiesPatch,
} from "@/shared/types/modelConfig";
import {
  upstreamHeadersRecordsEqual,
  UPSTREAM_HEADERS_UI_MAX,
  headerRowsToRecord,
  compatProtocolLabelKey,
  type HeaderDraftRow,
} from "../providerPageHelpers";
import {
  readCapabilityBoolean,
  readCapabilityNumber,
  readConfiguredCapabilityBoolean,
  recordToHeaderRows,
  stableHeaderRecordSignature,
  useResetDraftCommitGuard,
  type BooleanCapabilityKey,
} from "./modelCompatPopoverHelpers";
import ModelCapabilitiesPanel, {
  type CapabilityMode,
  type CapabilityNumberControl,
} from "./ModelCapabilitiesPanel";

export interface ModelCompatPopoverProps {
  t: (key: string) => string;
  effectiveModelNormalize: (protocol: string) => boolean;
  effectiveModelPreserveDeveloper: (protocol: string) => boolean;
  getUpstreamHeadersRecord: (protocol: string) => Record<string, string>;
  capabilities?: ProviderModelCapabilities;
  configuredCapabilities?: ProviderModelCapabilities;
  targetFormat?: string | null;
  configuredTargetFormat?: string | null;
  unsupportedParams?: string[];
  configuredUnsupportedParams?: string[];
  onCapabilitiesPatch?: (capabilities: ProviderModelCapabilitiesPatch) => void;
  onModelConfigPatch?: (payload: {
    targetFormat?: string | null;
    unsupportedParams?: string[] | null;
  }) => void;
  onReset?: () => void;
  hasModelConfigOverride?: boolean;
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

export default function ModelCompatPopover({
  t,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  capabilities = {},
  configuredCapabilities,
  targetFormat = null,
  configuredTargetFormat,
  unsupportedParams = [],
  configuredUnsupportedParams,
  onCapabilitiesPatch,
  onModelConfigPatch,
  onReset,
  hasModelConfigOverride = false,
  onCompatPatch,
  showDeveloperToggle = true,
  compact = false,
  disabled,
}: ModelCompatPopoverProps) {
  const [open, setOpen] = useState(false);
  const [protocol, setProtocol] = useState<string>(MODEL_COMPAT_PROTOCOL_KEYS[0]);
  const [headerRows, setHeaderRows] = useState<HeaderDraftRow[]>([]);
  const [contextDraft, setContextDraft] = useState("");
  const [maxOutputDraft, setMaxOutputDraft] = useState("");
  const [defaultThinkingBudgetDraft, setDefaultThinkingBudgetDraft] = useState("");
  const [thinkingBudgetCapDraft, setThinkingBudgetCapDraft] = useState("");
  const [unsupportedParamsDraft, setUnsupportedParamsDraft] = useState("");
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
  const headerRowsDirtyRef = useRef(false);
  const headerRowsBaselineRef = useRef<{
    protocol: string;
    record: Record<string, string>;
  } | null>(null);
  const triggerId = useId();
  const panelId = useId();
  const panelTitleId = useId();
  const protocolSelectId = useId();
  const targetFormatSelectId = useId();
  const unsupportedParamsTextareaId = useId();
  const { resetDraftCommitGuardRef, beginResetDraftGuard, releaseResetDraftGuardSoon } =
    useResetDraftCommitGuard();

  const genHeaderRowId = () => {
    headerRowIdRef.current += 1;
    return `uh-${headerRowIdRef.current}`;
  };

  const normalizeToolCallId = effectiveModelNormalize(protocol);
  const preserveDeveloperRole = effectiveModelPreserveDeveloper(protocol);
  const devToggle = showDeveloperToggle && protocol !== "claude";
  const tx = (key: string, fallback: string) => {
    try {
      const value = t(key);
      return value &&
        value !== key &&
        value !== `providers.${key}` &&
        !value.endsWith(`.${key}`) &&
        !value.startsWith("__MISSING__:")
        ? value
        : fallback;
    } catch {
      return fallback;
    }
  };

  const capabilityMode = (key: BooleanCapabilityKey): CapabilityMode => {
    const explicit = readConfiguredCapabilityBoolean(configuredCapabilities, key);
    if (explicit === true) return "yes";
    if (explicit === false) return "no";
    if (explicit === null) return "unknown";
    const effective = readCapabilityBoolean(capabilities, key);
    if (effective === true) return "yes";
    if (effective === false) return "no";
    return "unknown";
  };

  const resolvedNumberLabel = (keys: readonly (keyof ProviderModelCapabilities)[]): string => {
    const value = readCapabilityNumber(capabilities, keys, {
      allowZero: keys.includes("defaultThinkingBudget") || keys.includes("thinkingBudgetCap"),
    });
    return value !== undefined
      ? `${tx("modelCapabilityResolvedPrefix", "Resolved")}: ${value}`
      : tx("modelCapabilityResolvedUnknown", "Resolved: unknown");
  };

  const patchCapabilityMode = (key: BooleanCapabilityKey, mode: CapabilityMode) => {
    if (!onCapabilitiesPatch) return;
    onCapabilitiesPatch({ [key]: mode === "unknown" ? null : mode === "yes" });
  };

  const configuredContextWindow = readCapabilityNumber(configuredCapabilities, [
    "contextWindow",
    "maxInputTokens",
  ]);
  const configuredMaxOutputTokens = readCapabilityNumber(configuredCapabilities, [
    "maxOutputTokens",
  ]);
  const configuredDefaultThinkingBudget = readCapabilityNumber(
    configuredCapabilities,
    ["defaultThinkingBudget"],
    { allowZero: true }
  );
  const configuredThinkingBudgetCap = readCapabilityNumber(
    configuredCapabilities,
    ["thinkingBudgetCap"],
    { allowZero: true }
  );
  const configuredTargetFormatValue = configuredTargetFormat ?? null;
  const configuredUnsupportedParamsValue = configuredUnsupportedParams ?? [];
  const configuredUnsupportedParamsDraftValue = (configuredUnsupportedParamsValue || []).join("\n");
  const resolvedTargetFormatLabel = targetFormat
    ? `${tx("modelCapabilityResolvedPrefix", "Resolved")}: ${targetFormat}`
    : tx("modelCapabilityResolvedUnknown", "Resolved: unknown");
  const noneLabel = tx("none", "None");
  const resolvedUnsupportedParamsLabel = `${tx("modelCapabilityResolvedPrefix", "Resolved")}: ${
    unsupportedParams.length > 0 ? unsupportedParams.join(", ") : noneLabel
  }`;

  const commitCapabilityNumber = (
    key: "contextWindow" | "maxOutputTokens" | "defaultThinkingBudget" | "thinkingBudgetCap",
    value: string
  ) => {
    if (resetDraftCommitGuardRef.current) return;
    if (!onCapabilitiesPatch) return;
    const trimmed = value.trim();
    if (!trimmed) {
      if (key === "contextWindow") {
        if (configuredContextWindow == null) return;
        onCapabilitiesPatch({
          contextWindow: null,
          contextLength: null,
          maxInputTokens: null,
          inputTokenLimit: null,
        });
      } else if (key === "maxOutputTokens") {
        if (configuredMaxOutputTokens == null) return;
        onCapabilitiesPatch({ maxOutputTokens: null, outputTokenLimit: null });
      } else {
        const configuredValue =
          key === "defaultThinkingBudget"
            ? configuredDefaultThinkingBudget
            : configuredThinkingBudgetCap;
        if (configuredValue == null) return;
        onCapabilitiesPatch({ [key]: null });
      }
      return;
    }
    const parsed = Number(trimmed);
    const allowsZero = key === "defaultThinkingBudget" || key === "thinkingBudgetCap";
    if (!Number.isFinite(parsed) || parsed < 0 || (!allowsZero && parsed === 0)) return;
    const nextValue = Math.trunc(parsed);
    const currentValue =
      key === "contextWindow"
        ? configuredContextWindow
        : key === "maxOutputTokens"
          ? configuredMaxOutputTokens
          : key === "defaultThinkingBudget"
            ? configuredDefaultThinkingBudget
            : configuredThinkingBudgetCap;
    if (currentValue === nextValue) return;
    onCapabilitiesPatch({
      ...(key === "contextWindow" ? { maxInputTokens: nextValue } : {}),
      [key]: nextValue,
    });
  };

  const commitUnsupportedParams = () => {
    if (resetDraftCommitGuardRef.current) return;
    if (!onModelConfigPatch) return;
    const params = Array.from(
      new Set(
        unsupportedParamsDraft
          .split(/[\n,]/)
          .map((entry) => entry.trim())
          .filter(Boolean)
      )
    );
    const current = Array.from(new Set(configuredUnsupportedParamsValue)).filter(Boolean);
    if (JSON.stringify(params) === JSON.stringify(current)) return;
    onModelConfigPatch({ unsupportedParams: params });
  };

  const resetCapabilityDrafts = () => {
    setContextDraft(configuredContextWindow != null ? String(configuredContextWindow) : "");
    setMaxOutputDraft(configuredMaxOutputTokens != null ? String(configuredMaxOutputTokens) : "");
    setDefaultThinkingBudgetDraft(
      configuredDefaultThinkingBudget != null ? String(configuredDefaultThinkingBudget) : ""
    );
    setThinkingBudgetCapDraft(
      configuredThinkingBudgetCap != null ? String(configuredThinkingBudgetCap) : ""
    );
    setUnsupportedParamsDraft(configuredUnsupportedParamsDraftValue);
  };

  const tryCommitHeaderRows = useCallback(
    (rows: HeaderDraftRow[]) => {
      if (resetDraftCommitGuardRef.current) return;
      if (!headerRowsDirtyRef.current) return;
      const parsed = headerRowsToRecord(rows);
      const current = getUpstreamHeadersRecord(protocol);
      if (!upstreamHeadersRecordsEqual(parsed, current)) {
        onCompatPatch(protocol, { upstreamHeaders: parsed });
      }
      headerRowsDirtyRef.current = false;
      headerRowsBaselineRef.current = { protocol, record: parsed };
    },
    [getUpstreamHeadersRecord, onCompatPatch, protocol, resetDraftCommitGuardRef]
  );

  useEffect(() => {
    headerRowsRef.current = headerRows;
  }, [headerRows]);

  const onHeaderFieldBlur = useCallback(() => {
    queueMicrotask(() => tryCommitHeaderRows(headerRowsRef.current));
  }, [tryCommitHeaderRows]);

  const handleReset = () => {
    beginResetDraftGuard();
    resetCapabilityDrafts();
    headerRowsDirtyRef.current = false;
    const currentRecord = getUpstreamHeadersRecord(protocol);
    const currentRows = recordToHeaderRows(currentRecord, genHeaderRowId);
    headerRowsBaselineRef.current = { protocol, record: currentRecord };
    headerRowsRef.current = currentRows;
    setHeaderRows(currentRows);
    const resetResult = onReset?.() as unknown;
    if (resetResult && typeof (resetResult as Promise<void>).finally === "function") {
      void (resetResult as Promise<void>).finally(releaseResetDraftGuardSoon);
    } else {
      releaseResetDraftGuardSoon();
    }
  };

  useEffect(() => {
    if (!open) return;
    return () => {
      tryCommitHeaderRows(headerRowsRef.current);
    };
  }, [open, tryCommitHeaderRows]);

  const upstreamHeadersSignature = stableHeaderRecordSignature(getUpstreamHeadersRecord(protocol));

  useEffect(() => {
    if (!open || headerRowsDirtyRef.current) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled || headerRowsDirtyRef.current) return;
      const rec = getUpstreamHeadersRecord(protocol);
      headerRowsBaselineRef.current = { protocol, record: rec };
      setHeaderRows(recordToHeaderRows(rec, genHeaderRowId));
    });
    return () => {
      cancelled = true;
    };
    // Intentionally keyed by the serialized current value instead of callback identity so reset
    // updates refresh clean rows without wiping in-progress edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, protocol, upstreamHeadersSignature]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setContextDraft(configuredContextWindow != null ? String(configuredContextWindow) : "");
      setMaxOutputDraft(configuredMaxOutputTokens != null ? String(configuredMaxOutputTokens) : "");
      setDefaultThinkingBudgetDraft(
        configuredDefaultThinkingBudget != null ? String(configuredDefaultThinkingBudget) : ""
      );
      setThinkingBudgetCapDraft(
        configuredThinkingBudgetCap != null ? String(configuredThinkingBudgetCap) : ""
      );
    });
    return () => {
      cancelled = true;
    };
  }, [
    configuredContextWindow,
    configuredDefaultThinkingBudget,
    configuredMaxOutputTokens,
    configuredThinkingBudgetCap,
    open,
  ]);

  useEffect(() => {
    if (!open) return;
    setUnsupportedParamsDraft(configuredUnsupportedParamsDraftValue);
  }, [configuredUnsupportedParamsDraftValue, open]);

  useEffect(() => {
    queueMicrotask(() => {
      setValuePeekRowId(null);
      setValueFocusRowId(null);
    });
  }, [open, protocol]);

  const namedHeaderCount = headerRows.filter((r) => r.name.trim()).length;
  const canAddHeaderRow = namedHeaderCount < UPSTREAM_HEADERS_UI_MAX;

  const updateHeaderRow = (id: string, patch: Partial<Pick<HeaderDraftRow, "name" | "value">>) => {
    headerRowsDirtyRef.current = true;
    setHeaderRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addHeaderRow = () => {
    if (!canAddHeaderRow) return;
    headerRowsDirtyRef.current = true;
    setHeaderRows((prev) => [...prev, { id: genHeaderRowId(), name: "", value: "" }]);
  };

  const removeHeaderRow = (id: string) => {
    headerRowsDirtyRef.current = true;
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
    if (!open) return;
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
  const capabilityControls = [
    { key: "supportsVision", label: tx("modelCapabilityVision", "Vision") },
    { key: "supportsTools", label: tx("modelCapabilityTools", "Tool calling") },
    { key: "supportsReasoning", label: tx("modelCapabilityThinking", "Thinking") },
    { key: "supportsXHighEffort", label: tx("modelCapabilityXHigh", "xhigh") },
    { key: "supportsMaxEffort", label: tx("modelCapabilityMaxEffort", "max") },
  ].map(({ key, label }) => ({
    key: key as BooleanCapabilityKey,
    label,
    mode: capabilityMode(key as BooleanCapabilityKey),
  }));
  const numberControls: CapabilityNumberControl[] = [
    {
      id: "contextWindow",
      label: tx("modelCapabilityContext", "Context"),
      min: 1,
      value: contextDraft,
      setValue: setContextDraft,
      commit: () => commitCapabilityNumber("contextWindow", contextDraft),
      resolvedLabel: resolvedNumberLabel(["contextWindow", "maxInputTokens"]),
    },
    {
      id: "maxOutputTokens",
      label: tx("modelCapabilityMaxOutput", "Max output"),
      min: 1,
      value: maxOutputDraft,
      setValue: setMaxOutputDraft,
      commit: () => commitCapabilityNumber("maxOutputTokens", maxOutputDraft),
      resolvedLabel: resolvedNumberLabel(["maxOutputTokens"]),
    },
    {
      id: "defaultThinkingBudget",
      label: tx("modelCapabilityDefaultThinkingBudget", "Default thinking"),
      min: 0,
      value: defaultThinkingBudgetDraft,
      setValue: setDefaultThinkingBudgetDraft,
      commit: () => commitCapabilityNumber("defaultThinkingBudget", defaultThinkingBudgetDraft),
      resolvedLabel: resolvedNumberLabel(["defaultThinkingBudget"]),
    },
    {
      id: "thinkingBudgetCap",
      label: tx("modelCapabilityThinkingBudgetCap", "Max thinking"),
      min: 0,
      value: thinkingBudgetCapDraft,
      setValue: setThinkingBudgetCapDraft,
      commit: () => commitCapabilityNumber("thinkingBudgetCap", thinkingBudgetCapDraft),
      resolvedLabel: resolvedNumberLabel(["thinkingBudgetCap"]),
    },
  ];

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        id={triggerId}
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-border bg-background text-text-muted hover:bg-muted hover:text-text-main disabled:opacity-50 transition-colors"
        title={t("compatAdjustmentsTitle")}
        aria-label={t("compatAdjustmentsTitle")}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
      >
        <span className="material-symbols-outlined text-base leading-none" aria-hidden="true">
          tune
        </span>
        {!compact && t("compatButtonLabel")}
      </button>
      {open &&
        typeof document !== "undefined" &&
        portalPanelRect &&
        createPortal(
          <div
            id={panelId}
            ref={panelRef}
            role="dialog"
            aria-labelledby={panelTitleId}
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
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p id={panelTitleId} className="text-xs font-semibold text-text-main">
                    {t("compatAdjustmentsTitle")}
                  </p>
                  <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                    {t("compatProtocolHint")}
                  </p>
                </div>
                {onReset && (
                  <button
                    type="button"
                    onPointerDown={beginResetDraftGuard}
                    onMouseDown={beginResetDraftGuard}
                    onClick={handleReset}
                    disabled={disabled || !hasModelConfigOverride}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] font-medium text-text-muted hover:bg-muted hover:text-text-main disabled:opacity-40 disabled:hover:bg-transparent"
                    title={tx("modelConfigResetHint", "Restore the model baseline")}
                  >
                    <span
                      className="material-symbols-outlined text-sm leading-none"
                      aria-hidden="true"
                    >
                      restart_alt
                    </span>
                    {tx("modelConfigReset", "Reset")}
                  </button>
                )}
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-white p-3 [scrollbar-gutter:stable] [scrollbar-width:thin] dark:bg-zinc-950">
              {onCapabilitiesPatch && (
                <ModelCapabilitiesPanel
                  title={tx("modelCapabilitiesTitle", "Capabilities")}
                  controls={capabilityControls}
                  numberControls={numberControls}
                  unknownLabel={tx("modelCapabilityUnknown", "Unknown")}
                  supportedLabel={tx("modelCapabilityYes", "Supported")}
                  unsupportedLabel={tx("modelCapabilityNo", "Unsupported")}
                  disabled={disabled}
                  onModeChange={patchCapabilityMode}
                />
              )}
              {onModelConfigPatch && (
                <div className="mb-4 rounded-lg border-2 border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-600 dark:bg-zinc-900">
                  <label className="block text-[11px] font-semibold text-text-main mb-2">
                    {tx("modelCompatMetadataTitle", "Model compatibility")}
                  </label>
                  <label className="block min-w-0">
                    <span className="mb-1 block text-[11px] font-medium text-text-muted">
                      {tx("targetFormatLabel", "Target format")}
                    </span>
                    <select
                      id={targetFormatSelectId}
                      value={configuredTargetFormatValue || ""}
                      onChange={(e) => onModelConfigPatch({ targetFormat: e.target.value || null })}
                      disabled={disabled}
                      className="h-9 w-full rounded-lg border border-zinc-200 bg-white px-2 text-xs text-text-main focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-zinc-600 dark:bg-zinc-900"
                    >
                      <option value="">{tx("targetFormatUnset", "No override")}</option>
                      <option value="openai">{tx("compatProtocolOpenAI", "OpenAI")}</option>
                      <option value="openai-responses">
                        {tx("compatProtocolOpenAIResponses", "OpenAI Responses")}
                      </option>
                      <option value="claude">{tx("compatProtocolClaude", "Claude")}</option>
                      <option value="gemini">{tx("targetFormatGemini", "Gemini")}</option>
                      <option value="antigravity">
                        {tx("targetFormatAntigravity", "Antigravity")}
                      </option>
                    </select>
                    <span className="mt-1 block truncate text-[10px] text-text-muted">
                      {resolvedTargetFormatLabel}
                    </span>
                  </label>
                  <label className="mt-3 block min-w-0">
                    <span className="mb-1 block text-[11px] font-medium text-text-muted">
                      {tx("modelUnsupportedParams", "Unsupported params")}
                    </span>
                    <textarea
                      id={unsupportedParamsTextareaId}
                      value={unsupportedParamsDraft}
                      onChange={(e) => setUnsupportedParamsDraft(e.target.value)}
                      onBlur={commitUnsupportedParams}
                      disabled={disabled}
                      rows={3}
                      className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs font-mono text-text-main focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-zinc-600 dark:bg-zinc-900"
                    />
                    <span className="mt-1 block truncate text-[10px] text-text-muted">
                      {resolvedUnsupportedParamsLabel}
                    </span>
                  </label>
                </div>
              )}
              <label
                htmlFor={protocolSelectId}
                className="block text-[11px] font-medium text-text-muted mb-1.5"
              >
                {t("compatProtocolLabel")}
              </label>
              <select
                id={protocolSelectId}
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
                        aria-label={t("compatUpstreamHeaderName")}
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
                          aria-label={t("compatUpstreamHeaderValue")}
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
                        aria-label={t("compatUpstreamRemoveRow")}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/80 text-text-muted hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text-muted transition-colors"
                      >
                        <span
                          className="material-symbols-outlined text-lg leading-none"
                          aria-hidden="true"
                        >
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
                  <span
                    className="material-symbols-outlined text-base leading-none"
                    aria-hidden="true"
                  >
                    add
                  </span>
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
