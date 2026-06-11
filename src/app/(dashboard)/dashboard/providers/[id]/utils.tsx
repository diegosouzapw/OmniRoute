"use client";
import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Input,
  Toggle
} from "@/shared/components";
import {
  LOCAL_PROVIDERS,
  isSelfHostedChatProvider
} from "@/shared/constants/providers";
import {
  getModelCatalogSourceLabel,
  normalizeModelCatalogSource
} from "@/shared/utils/modelCatalogSearch";
import {
  MODEL_COMPAT_PROTOCOL_KEYS
} from "@/shared/constants/modelCompat";
import {
  getClaudeCodeCompatibleRequestDefaults as _getClaudeCodeCompatibleRequestDefaults,
  getCodexRequestDefaults as _getCodexRequestDefaults,
  CodexServiceTier
} from "@/lib/providers/requestDefaults";
import {
  CodexGlobalServiceMode
} from "@/lib/providers/codexFastTier";
import {
  WebSessionCredentialRequirement
} from "./webSessionCredentials";

import type {
  CompatByProtocolMap,
  ModelCompatSavePatch,
  CompatModelRow,
  CompatModelMap,
  ModelRowProps,
  PassthroughModelRowProps,
  PassthroughModelsSectionProps,
  CustomModelsSectionProps,
  CompatibleModelsSectionProps,
  ProviderMessageTranslator,
  HeaderDraftRow,
  ProviderModelsApiErrorBody,
  CommandCodeAuthFlowState,
  CooldownTimerProps,
  ConnectionRowConnection,
  ConnectionRowProps,
  AddApiKeyModalProps,
  EditConnectionModalConnection,
  EditConnectionModalProps,
  EditCompatibleNodeModalNode,
  EditCompatibleNodeModalProps,
  ImportTopTab,
  ClaudeImportTopTab,
  GeminiImportTopTab,
  LocalProviderMetadata
} from "./types";

function buildCompatMap(rows: CompatModelRow[]): CompatModelMap {
  const m = new Map<string, CompatModelRow>();
  for (const r of rows) if (r.id) m.set(r.id, r);
  return m;
}

function getProtoSlice(
  c: CompatModelRow | undefined,
  o: CompatModelRow | undefined,
  protocol: string
) {
  return c?.compatByProtocol?.[protocol] ?? o?.compatByProtocol?.[protocol];
}

function isModelHidden(
  modelId: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): boolean {
  const c = customMap.get(modelId);
  if (c && Object.prototype.hasOwnProperty.call(c, "isHidden")) {
    return Boolean(c.isHidden);
  }
  const o = overrideMap.get(modelId);
  if (o && Object.prototype.hasOwnProperty.call(o, "isHidden")) {
    return Boolean(o.isHidden);
  }
  return false;
}

function providerText(
  t: ProviderMessageTranslator,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
): string {
  if (typeof t.has === "function" && t.has(key)) {
    return t(key, values);
  }
  if (values) {
    return Object.entries(values).reduce(
      (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
      fallback
    );
  }
  return fallback;
}

function providerCountText(
  t: ProviderMessageTranslator,
  key: string,
  count: number,
  singularFallback: string,
  pluralFallback: string
): string {
  return providerText(t, key, count === 1 ? singularFallback : pluralFallback, { count });
}

function readBooleanToggle(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "1" || normalized === "true") return true;
    if (normalized === "0" || normalized === "false") return false;
  }
  return fallback;
}

function getWebSessionCredentialLabel(
  t: ProviderMessageTranslator,
  requirement: WebSessionCredentialRequirement,
  optional: boolean
): string {
  if (requirement.kind === "none") {
    return providerText(t, "webNoAuthCredentialLabel", "No credential required");
  }
  const baseLabel =
    requirement.kind === "token"
      ? providerText(t, "webTokenCredentialLabel", "Web session token")
      : t("sessionCookieLabel");
  return optional ? `${baseLabel} (${t("optional").toLowerCase()})` : baseLabel;
}

function getWebSessionCredentialHint(
  t: ProviderMessageTranslator,
  requirement: WebSessionCredentialRequirement,
  providerName: string,
  editing: boolean
): string | undefined {
  if (requirement.kind === "none") return undefined;

  const values = { provider: providerName, credential: requirement.credentialName };
  if (editing) {
    return requirement.kind === "token"
      ? providerText(
          t,
          "webTokenEditHint",
          "Leave blank to keep the current web session token. Credential: {credential}.",
          values
        )
      : providerText(
          t,
          "webCookieEditHint",
          "Leave blank to keep the current session cookie. Required cookie: {credential}.",
          values
        );
  }

  return requirement.kind === "token"
    ? providerText(
        t,
        "webTokenCredentialHint",
        "Credential: {credential}. Paste the token value from your own signed-in {provider} web session, or a DevTools HAR export if the provider supports it.",
        values
      )
    : providerText(
        t,
        "webCookieCredentialHint",
        "Required cookie: {credential}. Paste the Cookie header value from your own signed-in {provider} web session. Do not include the Cookie: prefix.",
        values
      );
}

function getWebSessionCredentialCheckLabel(
  t: ProviderMessageTranslator,
  requirement: WebSessionCredentialRequirement
): string {
  if (requirement.kind === "token") return providerText(t, "checkWebToken", "Check token");
  return providerText(t, "checkCookie", "Check cookie");
}

function getAddCredentialModalTitle(
  t: ProviderMessageTranslator,
  providerName: string,
  requirement: WebSessionCredentialRequirement | null
): string {
  if (!requirement) return t("addProviderApiKeyTitle", { provider: providerName });
  if (requirement.kind === "none") {
    return providerText(t, "addProviderConnectionTitle", "Add {provider} connection", {
      provider: providerName,
    });
  }
  if (requirement.kind === "token") {
    return providerText(t, "addProviderWebTokenTitle", "Add {provider} web token", {
      provider: providerName,
    });
  }
  return providerText(t, "addProviderSessionCookieTitle", "Add {provider} session cookie", {
    provider: providerName,
  });
}

function WebSessionCredentialGuide({
  requirement,
  providerName,
  t,
}: {
  requirement: WebSessionCredentialRequirement;
  providerName: string;
  t: ProviderMessageTranslator;
}) {
  if (requirement.kind === "none") {
    return (
      <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-3 text-sm text-text-muted">
        <div className="flex items-start gap-2">
          <span className="material-symbols-outlined mt-0.5 text-[18px] text-emerald-500">
            check_circle
          </span>
          <div>
            <p className="font-medium text-text-main">
              {providerText(t, "webNoAuthGuideTitle", "No credential required")}
            </p>
            <p className="mt-1">
              {providerText(
                t,
                "webNoAuthGuideBody",
                "{provider} does not need an API key or cookie. Save the connection to use its free web endpoint.",
                { provider: providerName }
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const requiredCredentialKey =
    requirement.kind === "token" ? "webTokenRequiredCredential" : "webCookieRequiredCredential";
  const requiredCredentialFallback =
    requirement.kind === "token" ? "Required token: {credential}" : "Required cookie: {credential}";

  return (
    <div className="rounded-lg border border-purple-500/25 bg-purple-500/10 px-3 py-3 text-sm text-text-muted">
      <div className="flex items-start gap-2">
        <span className="material-symbols-outlined mt-0.5 text-[18px] text-purple-500">cookie</span>
        <div className="space-y-2">
          <div>
            <p className="font-medium text-text-main">
              {providerText(t, "webSessionGuideTitle", "How to get the session credential")}
            </p>
            <p className="mt-1">
              {providerText(
                t,
                "webSessionGuideIntro",
                "{provider} uses a browser web session instead of an API key.",
                { provider: providerName }
              )}
            </p>
          </div>
          <p className="font-medium text-text-main">
            {providerText(t, requiredCredentialKey, requiredCredentialFallback, {
              credential: requirement.credentialName,
            })}
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              {providerText(t, "webSessionGuideStep1", "Sign in to {provider} in your browser.", {
                provider: providerName,
              })}
            </li>
            <li>
              {providerText(
                t,
                "webSessionGuideStep2",
                "Open the browser developer tools and inspect a request made by the web app."
              )}
            </li>
            <li>
              {providerText(
                t,
                "webSessionGuideStep3",
                "Copy the required credential from the provider's own domain. For cookies, copy only the Cookie header value and omit Cookie:.",
                { credential: requirement.credentialName }
              )}
            </li>
            <li>
              {providerText(
                t,
                "webSessionGuideStep4",
                "Paste it here and check the connection. If it stops working, sign in again and replace it with a fresh value."
              )}
            </li>
          </ol>
          <p className="text-xs text-amber-700 dark:text-amber-300">
            {providerText(
              t,
              "webSessionSecurityHint",
              "Treat this like a password: it may access your signed-in web account until it expires or is revoked."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function effectiveNormalizeForProtocol(
  modelId: string,
  protocol: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): boolean {
  const c = customMap.get(modelId);
  const o = overrideMap.get(modelId);
  const pc = getProtoSlice(c, o, protocol);
  if (pc && Object.prototype.hasOwnProperty.call(pc, "normalizeToolCallId")) {
    return Boolean(pc.normalizeToolCallId);
  }
  if (c?.normalizeToolCallId) return true;
  return Boolean(o?.normalizeToolCallId);
}

function effectivePreserveForProtocol(
  modelId: string,
  protocol: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): boolean {
  const c = customMap.get(modelId);
  const o = overrideMap.get(modelId);
  const pc = getProtoSlice(c, o, protocol);
  if (pc && Object.prototype.hasOwnProperty.call(pc, "preserveOpenAIDeveloperRole")) {
    return Boolean(pc.preserveOpenAIDeveloperRole);
  }
  if (c && Object.prototype.hasOwnProperty.call(c, "preserveOpenAIDeveloperRole")) {
    return Boolean(c.preserveOpenAIDeveloperRole);
  }
  if (o && Object.prototype.hasOwnProperty.call(o, "preserveOpenAIDeveloperRole")) {
    return Boolean(o.preserveOpenAIDeveloperRole);
  }
  return true;
}

function anyNormalizeCompatBadge(
  modelId: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): boolean {
  const c = customMap.get(modelId);
  const o = overrideMap.get(modelId);
  if (c?.normalizeToolCallId || o?.normalizeToolCallId) return true;
  for (const p of MODEL_COMPAT_PROTOCOL_KEYS) {
    const pc = getProtoSlice(c, o, p);
    if (pc?.normalizeToolCallId) return true;
  }
  return false;
}

function anyNoPreserveCompatBadge(
  modelId: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): boolean {
  const c = customMap.get(modelId);
  const o = overrideMap.get(modelId);
  if (
    c &&
    Object.prototype.hasOwnProperty.call(c, "preserveOpenAIDeveloperRole") &&
    c.preserveOpenAIDeveloperRole === false
  ) {
    return true;
  }
  if (
    o &&
    Object.prototype.hasOwnProperty.call(o, "preserveOpenAIDeveloperRole") &&
    o.preserveOpenAIDeveloperRole === false
  ) {
    return true;
  }
  for (const p of MODEL_COMPAT_PROTOCOL_KEYS) {
    const pc = getProtoSlice(c, o, p);
    if (
      pc &&
      Object.prototype.hasOwnProperty.call(pc, "preserveOpenAIDeveloperRole") &&
      pc.preserveOpenAIDeveloperRole === false
    ) {
      return true;
    }
  }
  return false;
}

function upstreamHeadersRecordsEqual(
  a: Record<string, string>,
  b: Record<string, string>
): boolean {
  const ka = Object.keys(a).sort();
  const kb = Object.keys(b).sort();
  if (ka.length !== kb.length) return false;
  return ka.every((k, i) => k === kb[i] && a[k] === b[k]);
}

function headerRowsToRecord(rows: HeaderDraftRow[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const r of rows) {
    const k = r.name.trim();
    if (!k) continue;
    out[k] = r.value;
  }
  return out;
}

async function formatProviderModelsErrorResponse(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as ProviderModelsApiErrorBody;
    const err = data?.error;
    if (Array.isArray(err?.details) && err.details.length > 0) {
      return err.details
        .map((d) => {
          const f = typeof d.field === "string" && d.field ? d.field : "?";
          const m = typeof d.message === "string" ? d.message : "";
          return m ? `${f}: ${m}` : f;
        })
        .join("; ");
    }
    if (typeof err?.message === "string" && err.message.trim()) {
      return err.message.trim();
    }
  } catch {
    /* ignore */
  }
  const st = res.statusText?.trim();
  return st || `HTTP ${res.status}`;
}

function effectiveUpstreamHeadersForProtocol(
  modelId: string,
  protocol: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): Record<string, string> {
  const c = customMap.get(modelId);
  const o = overrideMap.get(modelId);
  const base: Record<string, string> = {};
  if (c?.upstreamHeaders && typeof c.upstreamHeaders === "object") {
    Object.assign(base, c.upstreamHeaders);
  } else if (o?.upstreamHeaders && typeof o.upstreamHeaders === "object") {
    Object.assign(base, o.upstreamHeaders);
  }
  const pc = getProtoSlice(c, o, protocol);
  if (pc?.upstreamHeaders && typeof pc.upstreamHeaders === "object") {
    Object.assign(base, pc.upstreamHeaders);
  }
  return base;
}

function anyUpstreamHeadersBadge(
  modelId: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): boolean {
  const c = customMap.get(modelId);
  const o = overrideMap.get(modelId);
  const nonempty = (u: unknown) =>
    u && typeof u === "object" && !Array.isArray(u) && Object.keys(u as object).length > 0;
  if (nonempty(c?.upstreamHeaders) || nonempty(o?.upstreamHeaders)) return true;
  for (const p of MODEL_COMPAT_PROTOCOL_KEYS) {
    const pc = getProtoSlice(c, o, p);
    if (nonempty(pc?.upstreamHeaders)) return true;
  }
  return false;
}

function getModelSourceBadgeClass(source?: string): string {
  switch (normalizeModelCatalogSource(source)) {
    case "imported":
      return "border-sky-500/30 bg-sky-500/10 text-sky-300";
    case "custom":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "fallback":
      return "border-amber-500/30 bg-amber-500/10 text-amber-300";
    case "alias":
      return "border-violet-500/30 bg-violet-500/10 text-violet-300";
    case "system":
    default:
      return "border-border bg-sidebar/70 text-text-muted";
  }
}

function ModelSourceBadge({ source }: { source?: string }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${getModelSourceBadgeClass(
        source
      )}`}
    >
      {getModelCatalogSourceLabel(source)}
    </span>
  );
}

function getCodexServiceTierLabel(
  t: ProviderMessageTranslator,
  value: CodexGlobalServiceMode
): string {
  if (value === "none") {
    return providerText(t, "codexServiceModeNone", "No global setting");
  }
  if (value === "default") return providerText(t, "codexServiceTierDefault", "Default");
  if (value === "priority") return providerText(t, "codexServiceTierPriority", "Priority");
  return providerText(t, "codexServiceTierFlex", "Flex");
}

function normalizeCodexLimitPolicy(policy: unknown): { use5h: boolean; useWeekly: boolean } {
  const record =
    policy && typeof policy === "object" && !Array.isArray(policy)
      ? (policy as Record<string, unknown>)
      : {};
  return {
    use5h: typeof record.use5h === "boolean" ? record.use5h : true,
    useWeekly: typeof record.useWeekly === "boolean" ? record.useWeekly : true,
  };
}

function getCodexRequestDefaults(providerSpecificData: unknown): {
  reasoningEffort: string;
  serviceTier?: CodexServiceTier;
} {
  const defaults = _getCodexRequestDefaults(providerSpecificData);
  return {
    reasoningEffort: defaults.reasoningEffort ?? "medium",
    ...(defaults.serviceTier ? { serviceTier: defaults.serviceTier } : {}),
  };
}

function getClaudeCodeCompatibleRequestDefaults(providerSpecificData: unknown): {
  context1m: boolean;
} {
  const defaults = _getClaudeCodeCompatibleRequestDefaults(providerSpecificData);
  return {
    context1m: defaults.context1m === true,
  };
}

function compatProtocolLabelKey(protocol: string): string {
  if (protocol === "openai") return "compatProtocolOpenAI";
  if (protocol === "openai-responses") return "compatProtocolOpenAIResponses";
  if (protocol === "claude") return "compatProtocolClaude";
  return "compatProtocolOpenAI";
}

function ModelCompatPopover({
  t,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  onCompatPatch,
  showDeveloperToggle = true,
  compact = false,
  disabled,
}: {
  t: (key: string) => string;
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
}) {
  const [open, setOpen] = useState(false);
  const [protocol, setProtocol] = useState<string>(MODEL_COMPAT_PROTOCOL_KEYS[0]);
  const [headerRows, setHeaderRows] = useState<HeaderDraftRow[]>([]);
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

function getLocalProviderMetadata(providerId?: string | null) {
  if (!providerId || !isSelfHostedChatProvider(providerId)) return null;
  return (LOCAL_PROVIDERS as Record<string, LocalProviderMetadata>)[providerId] || null;
}

function isBaseUrlConfigurableProvider(providerId?: string | null) {
  return Boolean(
    providerId &&
    (CONFIGURABLE_BASE_URL_PROVIDERS.has(providerId) || isSelfHostedChatProvider(providerId))
  );
}

function getProviderBaseUrlDefault(providerId?: string | null) {
  const localProvider = getLocalProviderMetadata(providerId);
  if (typeof localProvider?.localDefault === "string" && localProvider.localDefault.trim()) {
    return localProvider.localDefault;
  }
  return providerId ? DEFAULT_PROVIDER_BASE_URLS[providerId] || "" : "";
}

function getProviderBaseUrlHint(
  providerId?: string | null,
  t?: ((key: string, values?: Record<string, unknown>) => string) | null
) {
  const localProvider = getLocalProviderMetadata(providerId);
  if (localProvider && t) {
    return t("localProviderBaseUrlHint", {
      provider: localProvider.name || providerId,
      baseUrl: getProviderBaseUrlDefault(providerId),
    });
  }
  switch (providerId) {
    case "azure-openai":
      return t ? t("azureOpenAiBaseUrlHint") : undefined;
    case "bailian-coding-plan":
      return t ? t("bailianBaseUrlHint") : undefined;
    case "xiaomi-mimo":
      return t ? t("xiaomiMimoBaseUrlHint") : undefined;
    case "heroku":
      return t ? t("herokuBaseUrlHint") : undefined;
    case "databricks":
      return t ? t("databricksBaseUrlHint") : undefined;
    case "snowflake":
      return t ? t("snowflakeBaseUrlHint") : undefined;
    case "searxng-search":
      return t ? t("searxngBaseUrlHint") : undefined;
    default:
      return undefined;
  }
}

function getProviderBaseUrlPlaceholder(providerId?: string | null) {
  if (isSelfHostedChatProvider(providerId || "")) {
    return getProviderBaseUrlDefault(providerId);
  }
  switch (providerId) {
    case "azure-openai":
      return "https://my-resource.openai.azure.com";
    case "bailian-coding-plan":
    case "xiaomi-mimo":
      return getProviderBaseUrlDefault(providerId);
    case "siliconflow":
      return "https://api.siliconflow.cn/v1";
    case "heroku":
      return "https://us.inference.heroku.com";
    case "databricks":
      return "https://adb-1234567890123456.7.azuredatabricks.net/serving-endpoints";
    case "snowflake":
      return "https://example-account.snowflakecomputing.com";
    case "searxng-search":
      return "http://localhost:8888/search";
    default:
      return "";
  }
}

function isGlmProvider(providerId?: string | null) {
  return providerId === "glm" || providerId === "glm-cn" || providerId === "glmt";
}

function parseRoutingTagsInput(value: string): string[] | undefined {
  const tags = Array.from(
    new Set(
      value
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
    )
  );
  return tags.length > 0 ? tags : undefined;
}

function parseExcludedModelsInput(value: string): string[] | undefined {
  const patterns = Array.from(
    new Set(
      value
        .split(",")
        .map((pattern) => pattern.trim())
        .filter(Boolean)
    )
  );
  return patterns.length > 0 ? patterns : undefined;
}

function formatRoutingTagsInput(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0)
    .join(", ");
}

function formatExcludedModelsInput(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .filter(
      (pattern): pattern is string => typeof pattern === "string" && pattern.trim().length > 0
    )
    .join(", ");
}

function extractCommandCodeCredentialInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (parsed && typeof parsed === "object") {
      const record = parsed as Record<string, unknown>;
      const direct = record.apiKey || record.api_key || record.key || record.token;
      if (typeof direct === "string" && direct.trim()) return direct.trim();
      const nested = record.data;
      if (nested && typeof nested === "object") {
        const nestedRecord = nested as Record<string, unknown>;
        const nestedKey = nestedRecord.apiKey || nestedRecord.api_key || nestedRecord.key;
        if (typeof nestedKey === "string" && nestedKey.trim()) return nestedKey.trim();
      }
    }
  } catch {
    // Not JSON; continue with URL/raw parsing.
  }

  try {
    const url = new URL(trimmed);
    const key =
      url.searchParams.get("apiKey") ||
      url.searchParams.get("api_key") ||
      url.searchParams.get("key") ||
      url.searchParams.get("token");
    if (key?.trim()) return key.trim();
    const hash = url.hash.replace(/^#/, "");
    if (hash) {
      const hashParams = new URLSearchParams(hash);
      const hashKey =
        hashParams.get("apiKey") ||
        hashParams.get("api_key") ||
        hashParams.get("key") ||
        hashParams.get("token");
      if (hashKey?.trim()) return hashKey.trim();
    }
  } catch {
    // Not a URL; use the raw value.
  }

  return trimmed;
}

function normalizeAndValidateHttpBaseUrl(rawValue, fallbackUrl) {
  const value = (typeof rawValue === "string" ? rawValue.trim() : "") || fallbackUrl;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { value: null, error: "Base URL must use http or https" };
    }
    return { value, error: null };
  } catch {
    return { value: null, error: "Base URL must be a valid URL" };
  }
}

function inferErrorType(connection, isCooldown) {
  if (isCooldown) return "upstream_rate_limited";
  if (connection.testStatus === "banned") return "banned";
  if (connection.testStatus === "credits_exhausted") return "credits_exhausted";
  if (connection.lastErrorType) return connection.lastErrorType;

  const code = Number(connection.errorCode);
  if (code === 401 || code === 403) return "upstream_auth_error";
  if (code === 429) return "upstream_rate_limited";
  if (code >= 500) return "upstream_unavailable";

  const msg = (connection.lastError || "").toLowerCase();
  if (!msg) return null;
  if (
    msg.includes("runtime") ||
    msg.includes("not runnable") ||
    msg.includes("not installed") ||
    msg.includes("healthcheck")
  )
    return "runtime_error";
  if (msg.includes("refresh failed")) return "token_refresh_failed";
  if (msg.includes("token expired") || msg.includes("expired")) return "token_expired";
  if (
    msg.includes("invalid api key") ||
    msg.includes("token invalid") ||
    msg.includes("revoked") ||
    msg.includes("access denied") ||
    msg.includes("unauthorized")
  )
    return "upstream_auth_error";
  if (
    msg.includes("rate limit") ||
    msg.includes("quota") ||
    msg.includes("too many requests") ||
    msg.includes("429")
  )
    return "upstream_rate_limited";
  if (
    msg.includes("fetch failed") ||
    msg.includes("network") ||
    msg.includes("timeout") ||
    msg.includes("econn") ||
    msg.includes("enotfound")
  )
    return "network_error";
  if (msg.includes("not supported")) return "unsupported";
  return "upstream_error";
}

function getStatusPresentation(connection, effectiveStatus, isCooldown, t) {
  if (connection.isActive === false) {
    return {
      statusVariant: "default",
      statusLabel: t("statusDisabled"),
      errorType: null,
      errorBadge: null,
      errorTextClass: "text-text-muted",
    };
  }

  if (effectiveStatus === "active" || effectiveStatus === "success") {
    return {
      statusVariant: "success",
      statusLabel: t("statusConnected"),
      errorType: null,
      errorBadge: null,
      errorTextClass: "text-text-muted",
    };
  }

  const errorType = inferErrorType(connection, isCooldown);
  const errorBadge = errorType ? ERROR_TYPE_LABELS[errorType] || null : null;

  if (errorType === "runtime_error") {
    return {
      statusVariant: "warning",
      statusLabel: t("statusRuntimeIssue"),
      errorType,
      errorBadge,
      errorTextClass: "text-yellow-600 dark:text-yellow-400",
    };
  }

  if (errorType === "account_deactivated") {
    return {
      statusVariant: "error",
      statusLabel: t("statusDeactivated", "Deactivated"),
      errorType,
      errorBadge,
      errorTextClass: "text-red-600 font-bold",
    };
  }

  if (
    errorType === "upstream_auth_error" ||
    errorType === "auth_missing" ||
    errorType === "token_refresh_failed" ||
    errorType === "token_expired"
  ) {
    return {
      statusVariant: "error",
      statusLabel: t("statusAuthFailed"),
      errorType,
      errorBadge,
      errorTextClass: "text-red-500",
    };
  }

  if (errorType === "upstream_rate_limited") {
    return {
      statusVariant: "warning",
      statusLabel: t("statusRateLimited"),
      errorType,
      errorBadge,
      errorTextClass: "text-yellow-600 dark:text-yellow-400",
    };
  }

  if (errorType === "network_error") {
    return {
      statusVariant: "warning",
      statusLabel: t("statusNetworkIssue"),
      errorType,
      errorBadge,
      errorTextClass: "text-yellow-600 dark:text-yellow-400",
    };
  }

  if (errorType === "unsupported") {
    return {
      statusVariant: "default",
      statusLabel: t("statusTestUnsupported"),
      errorType,
      errorBadge,
      errorTextClass: "text-text-muted",
    };
  }

  if (errorType === "banned") {
    return {
      statusVariant: "error",
      statusLabel: t("statusBanned", "Banned (403)"),
      errorType,
      errorBadge,
      errorTextClass: "text-red-600 font-bold",
    };
  }

  if (errorType === "credits_exhausted") {
    return {
      statusVariant: "warning",
      statusLabel: t("statusCreditsExhausted", "Out of Credits"),
      errorType,
      errorBadge,
      errorTextClass: "text-amber-500",
    };
  }

  const fallbackStatusMap = {
    unavailable: t("statusUnavailable"),
    failed: t("statusFailed"),
    error: t("statusError"),
  };

  return {
    statusVariant: "error",
    statusLabel: fallbackStatusMap[effectiveStatus] || effectiveStatus || t("statusError"),
    errorType,
    errorBadge,
    errorTextClass: "text-red-500",
  };
}

function extractEmailFromJwtLocal(idToken: string): string | null {
  try {
    const parts = idToken.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    return typeof payload.email === "string" ? payload.email : null;
  } catch {
    return null;
  }
}

function previewCodexJson(json: unknown): { valid: boolean; email: string | null } {
  try {
    const doc = json && typeof json === "object" ? (json as Record<string, unknown>) : null;
    // Codex CLI no longer writes auth_mode — accept both with and without it.
    // Only reject when auth_mode is explicitly set to something other than "chatgpt".
    if (
      !doc ||
      (doc.auth_mode !== undefined && doc.auth_mode !== null && doc.auth_mode !== "chatgpt")
    )
      return { valid: false, email: null };
    const tokens =
      doc.tokens && typeof doc.tokens === "object" ? (doc.tokens as Record<string, unknown>) : null;
    if (!tokens?.id_token || typeof tokens.id_token !== "string")
      return { valid: false, email: null };
    return { valid: true, email: extractEmailFromJwtLocal(tokens.id_token as string) };
  } catch {
    return { valid: false, email: null };
  }
}

function parseBulkPasteText(text: string): BulkEntry[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const tryParse = (s: string): BulkEntry => {
    try {
      const json = JSON.parse(s);
      const { email } = previewCodexJson(json);
      return { name: email || "unknown", json, parseError: null, email };
    } catch {
      return { name: "parse error", json: null, parseError: "Invalid JSON", email: null };
    }
  };

  try {
    const arr = JSON.parse(trimmed);
    if (Array.isArray(arr))
      return arr.map((item) => {
        const { email } = previewCodexJson(item);
        return { name: email || "unknown", json: item, parseError: null, email };
      });
    const { email } = previewCodexJson(arr);
    return [{ name: email || "unknown", json: arr, parseError: null, email }];
  } catch {
    return trimmed
      .split(/^---$/m)
      .map((s) => tryParse(s.trim()))
      .filter((e) => e.json !== null || e.parseError !== null);
  }
}

function extractEmailFromClaudeJson(json: unknown): string | null {
  try {
    const doc = json && typeof json === "object" ? (json as Record<string, unknown>) : null;
    if (!doc) return null;
    const oauth =
      doc.claudeAiOauth && typeof doc.claudeAiOauth === "object"
        ? (doc.claudeAiOauth as Record<string, unknown>)
        : null;
    if (!oauth) return null;
    return null; // email comes from bootstrap, not the file
  } catch {
    return null;
  }
}

function previewClaudeJson(json: unknown): { valid: boolean; email: string | null } {
  try {
    const doc = json && typeof json === "object" ? (json as Record<string, unknown>) : null;
    if (!doc) return { valid: false, email: null };
    const oauth =
      doc.claudeAiOauth && typeof doc.claudeAiOauth === "object"
        ? (doc.claudeAiOauth as Record<string, unknown>)
        : null;
    if (!oauth || !oauth.accessToken || !oauth.refreshToken) return { valid: false, email: null };
    return { valid: true, email: null };
  } catch {
    return { valid: false, email: null };
  }
}

function extractEmailFromGeminiJwt(idToken: string): string | null {
  try {
    const parts = idToken.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    return typeof payload.email === "string" ? payload.email : null;
  } catch {
    return null;
  }
}

function previewGeminiJson(json: unknown): { valid: boolean; email: string | null } {
  try {
    const doc = json && typeof json === "object" ? (json as Record<string, unknown>) : null;
    if (!doc) return { valid: false, email: null };
    if (!doc.access_token || !doc.refresh_token || !doc.id_token)
      return { valid: false, email: null };
    const email = typeof doc.id_token === "string" ? extractEmailFromGeminiJwt(doc.id_token) : null;
    return { valid: true, email };
  } catch {
    return { valid: false, email: null };
  }
}

function CooldownTimer({ until }: CooldownTimerProps) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const updateRemaining = () => {
      const diff = new Date(until).getTime() - Date.now();
      if (diff <= 0) {
        setRemaining("");
        return;
      }
      const secs = Math.floor(diff / 1000);
      if (secs < 60) {
        setRemaining(`${secs}s`);
      } else if (secs < 3600) {
        setRemaining(`${Math.floor(secs / 60)}m ${secs % 60}s`);
      } else {
        const hrs = Math.floor(secs / 3600);
        const mins = Math.floor((secs % 3600) / 60);
        setRemaining(`${hrs}h ${mins}m`);
      }
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);
    return () => clearInterval(interval);
  }, [until]);

  if (!remaining) return null;

  return <span className="text-xs text-orange-500 font-mono">⏱ {remaining}</span>;
}
