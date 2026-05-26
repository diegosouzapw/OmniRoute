"use client";

import { useState, useEffect, useLayoutEffect, useCallback, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { LlmChatCard } from "@/app/(dashboard)/dashboard/media-providers/components/LlmChatCard";
import { ServiceKindTabs } from "@/app/(dashboard)/dashboard/media-providers/components/ServiceKindTabs";
import { EmbeddingExampleCard } from "@/app/(dashboard)/dashboard/media-providers/components/EmbeddingExampleCard";
import { ImageExampleCard } from "@/app/(dashboard)/dashboard/media-providers/components/ImageExampleCard";
import { TtsExampleCard } from "@/app/(dashboard)/dashboard/media-providers/components/TtsExampleCard";
import { SttExampleCard } from "@/app/(dashboard)/dashboard/media-providers/components/SttExampleCard";
import { WebSearchExampleCard } from "@/app/(dashboard)/dashboard/media-providers/components/WebSearchExampleCard";
import { WebFetchExampleCard } from "@/app/(dashboard)/dashboard/media-providers/components/WebFetchExampleCard";
import { VideoExampleCard } from "@/app/(dashboard)/dashboard/media-providers/components/VideoExampleCard";
import { MusicExampleCard } from "@/app/(dashboard)/dashboard/media-providers/components/MusicExampleCard";
import type { ServiceKind } from "@/shared/constants/providers";
import { useNotificationStore } from "@/store/notificationStore";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Card,
  Button,
  Badge,
  Input,
  Modal,
  CardSkeleton,
  OAuthModal,
  KiroOAuthWrapper,
  CursorAuthModal,
  Toggle,
  Select,
  ProxyConfigModal,
  NoAuthProviderCard,
} from "@/shared/components";
import {
  LOCAL_PROVIDERS,
  NOAUTH_PROVIDERS,
  AI_PROVIDERS,
  getProviderAlias,
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
  isClaudeCodeCompatibleProvider,
  isSelfHostedChatProvider,
  providerAllowsOptionalApiKey,
  supportsApiKeyOnFreeProvider,
  supportsBulkApiKey,
} from "@/shared/constants/providers";
import {
  ANTIGRAVITY_CLIENT_PROFILE_OPTIONS,
  normalizeAntigravityClientProfileSetting,
} from "@/shared/constants/antigravityClientProfile";
import { parseBulkApiKeys } from "@/shared/utils/bulkApiKeyParser";
import { getModelsByProviderId } from "@/shared/constants/models";
import {
  compatibleProviderSupportsModelImport,
  getCompatibleFallbackModels,
} from "@/lib/providers/managedAvailableModels";
import {
  getModelCatalogSourceLabel,
  matchesModelCatalogQuery,
  normalizeModelCatalogSource,
} from "@/shared/utils/modelCatalogSearch";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import {
  MODEL_COMPAT_PROTOCOL_KEYS,
  type ModelCompatProtocolKey,
} from "@/shared/constants/modelCompat";
import { resolveManagedModelAlias } from "@/shared/utils/providerModelAliases";
import { maskEmail, pickMaskedDisplayValue, pickDisplayValue } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import EmailPrivacyToggle from "@/shared/components/EmailPrivacyToggle";
import ProviderIcon from "@/shared/components/ProviderIcon";
import {
  getClaudeCodeCompatibleRequestDefaults as _getClaudeCodeCompatibleRequestDefaults,
  getCodexRequestDefaults as _getCodexRequestDefaults,
} from "@/lib/providers/requestDefaults";
import {
  getCodexEffectiveFastServiceTier,
  isCodexGlobalFastServiceTierEnabled,
} from "@/lib/providers/codexFastTier";
import { isClaudeExtraUsageBlockEnabled } from "@/lib/providers/claudeExtraUsage";
import { parseExtraApiKeys } from "@/shared/utils/parseApiKeys";
import RiskNoticeModal from "../components/RiskNoticeModal";
import { isRiskAcknowledged, useRiskAcknowledged } from "../hooks/useRiskAcknowledged";
import { resolveDashboardProviderInfo } from "../providerPageUtils";

type CompatByProtocolMap = Partial<
  Record<
    ModelCompatProtocolKey,
    {
      normalizeToolCallId?: boolean;
      preserveOpenAIDeveloperRole?: boolean;
      upstreamHeaders?: Record<string, string>;
    }
  >
>;

/** PATCH fields for provider model compat (matches API + `ModelCompatPerProtocol` shape). */
type ModelCompatSavePatch = {
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  upstreamHeaders?: Record<string, string>;
  compatByProtocol?: CompatByProtocolMap;
  isHidden?: boolean;
};

type CompatModelRow = {
  id?: string;
  name?: string;
  source?: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  isHidden?: boolean;
  upstreamHeaders?: Record<string, string>;
  compatByProtocol?: CompatByProtocolMap;
};

type CompatModelMap = Map<string, CompatModelRow>;
type LocalProviderMetadata = {
  name?: string;
  localDefault?: string;
  [key: string]: unknown;
};

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
  t: ((key: string, values?: Record<string, unknown>) => string) & {
    has?: (key: string) => boolean;
  },
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

type HeaderDraftRow = { id: string; name: string; value: string };

const UPSTREAM_HEADERS_UI_MAX = 16;

function recordToHeaderRows(rec: Record<string, string>, genId: () => string): HeaderDraftRow[] {
  const entries = Object.entries(rec).filter(([k]) => k.trim());
  if (entries.length === 0) return [{ id: genId(), name: "", value: "" }];
  return entries.map(([name, value]) => ({ id: genId(), name, value }));
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

type ProviderModelsApiErrorBody = {
  error?: {
    message?: string;
    details?: Array<{ field?: string; message?: string }>;
  };
};

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

interface ModelRowProps {
  model: { id: string; name?: string; source?: string; isHidden?: boolean };
  fullModel: string;
  provider: string;
  copied?: string;
  onCopy: (text: string, key: string) => void;
  t: (key: string, values?: Record<string, unknown>) => string;
  showDeveloperToggle?: boolean;
  effectiveModelNormalize: (modelId: string, protocol?: string) => boolean;
  effectiveModelPreserveDeveloper: (modelId: string, protocol?: string) => boolean;
  saveModelCompatFlags: (modelId: string, patch: ModelCompatSavePatch) => void;
  getUpstreamHeadersRecord: (protocol: string) => Record<string, string>;
  compatDisabled?: boolean;
  onToggleHidden?: (modelId: string, hidden: boolean) => Promise<void>;
  togglingHidden?: boolean;
  onTestModel?: (modelId: string, fullModel: string) => Promise<void>;
  testStatus?: "ok" | "error" | null;
  testingModel?: boolean;
}

interface PassthroughModelRowProps {
  modelId: string;
  fullModel: string;
  source?: string;
  isHidden?: boolean;
  copied?: string;
  onCopy: (text: string, key: string) => void;
  onDeleteAlias?: () => void;
  t: (key: string, values?: Record<string, unknown>) => string;
  showDeveloperToggle?: boolean;
  effectiveModelNormalize: (modelId: string, protocol?: string) => boolean;
  effectiveModelPreserveDeveloper: (modelId: string, protocol?: string) => boolean;
  saveModelCompatFlags: (modelId: string, patch: ModelCompatSavePatch) => void;
  getUpstreamHeadersRecord: (protocol: string) => Record<string, string>;
  compatDisabled?: boolean;
  onToggleHidden?: (modelId: string, hidden: boolean) => Promise<void>;
  togglingHidden?: boolean;
  onTestModel?: (modelId: string, fullModel: string) => Promise<void>;
  testStatus?: "ok" | "error" | null;
  testingModel?: boolean;
}

interface PassthroughModelsSectionProps {
  providerAlias: string;
  modelAliases: Record<string, string>;
  availableModels?: CompatModelRow[];
  customModels?: CompatModelRow[];
  copied?: string;
  onCopy: (text: string, key: string) => void;
  onSetAlias: (modelId: string, alias: string) => Promise<void>;
  onDeleteAlias: (alias: string) => void;
  t: (key: string, values?: Record<string, unknown>) => string;
  effectiveModelNormalize: (alias: string) => boolean;
  effectiveModelPreserveDeveloper: (alias: string) => boolean;
  getUpstreamHeadersRecord: (modelId: string, protocol: string) => Record<string, string>;
  saveModelCompatFlags: (
    modelId: string,
    flags: {
      normalizeToolCallId?: boolean;
      preserveDeveloperRole?: boolean;
      preserveOpenAIDeveloperRole?: boolean;
    }
  ) => Promise<void>;
  compatSavingModelId?: string;
  isModelHidden: (modelId: string) => boolean;
  onToggleHidden: (modelId: string, hidden: boolean) => Promise<void>;
  onBulkToggleHidden: (modelIds: string[], hidden: boolean) => Promise<void>;
  bulkTogglePending?: boolean;
  togglingModelId?: string | null;
  onTestModel?: (modelId: string, fullModel: string) => Promise<void>;
  modelTestStatus?: Record<string, "ok" | "error" | null>;
  testingModelId?: string | null;
}

interface CustomModelsSectionProps {
  providerId: string;
  providerAlias: string;
  copied?: string;
  onCopy: (text: string, key: string) => void;
  onModelsChanged?: () => void;
}

interface CompatibleModelsSectionProps {
  providerStorageAlias: string;
  providerDisplayAlias: string;
  modelAliases: Record<string, string>;
  availableModels?: CompatModelRow[];
  customModels?: CompatModelRow[];
  fallbackModels?: CompatModelRow[];
  allowImport: boolean;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  copied?: string;
  onCopy: (text: string, key: string) => void;
  onSetAlias: (modelId: string, alias: string, providerStorageAlias?: string) => Promise<void>;
  onDeleteAlias: (alias: string) => void;
  connections: { id?: string; isActive?: boolean }[];
  isAnthropic?: boolean;
  onImportWithProgress: (connectionId: string) => Promise<void>;
  t: (key: string, values?: Record<string, unknown>) => string;
  effectiveModelNormalize: (alias: string) => boolean;
  effectiveModelPreserveDeveloper: (alias: string) => boolean;
  getUpstreamHeadersRecord: (modelId: string, protocol: string) => Record<string, string>;
  saveModelCompatFlags: (
    modelId: string,
    flags: {
      normalizeToolCallId?: boolean;
      preserveDeveloperRole?: boolean;
      preserveOpenAIDeveloperRole?: boolean;
      isHidden?: boolean;
    }
  ) => Promise<void>;
  compatSavingModelId?: string;
  onModelsChanged?: () => void;
  isModelHidden: (modelId: string) => boolean;
  onToggleHidden: (modelId: string, hidden: boolean) => Promise<void>;
  onBulkToggleHidden: (modelIds: string[], hidden: boolean) => Promise<void>;
  bulkTogglePending?: boolean;
  togglingModelId?: string | null;
  onTestModel?: (modelId: string, fullModel: string) => Promise<void>;
  modelTestStatus?: Record<string, "ok" | "error" | null>;
  testingModelId?: string | null;
}

interface CooldownTimerProps {
  until: string | number | Date;
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

interface ConnectionRowConnection {
  id?: string;
  name?: string;
  email?: string;
  displayName?: string;
  rateLimitedUntil?: string;
  rateLimitProtection?: boolean;
  testStatus?: string;
  isActive?: boolean;
  priority?: number;
  lastError?: string;
  lastErrorType?: string;
  lastErrorSource?: string;
  errorCode?: string | number;
  globalPriority?: number;
  providerSpecificData?: Record<string, unknown>;
  expiresAt?: string;
  tokenExpiresAt?: string;
  maxConcurrent?: number | null;
  authType?: string;
}

interface ConnectionRowProps {
  connection: ConnectionRowConnection;
  isOAuth: boolean;
  isClaude?: boolean;
  isCodex?: boolean;
  isGeminiCli?: boolean;
  codexFastGlobalEnabled?: boolean;
  isFirst: boolean;
  isLast: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleActive: (isActive?: boolean) => void | Promise<void>;
  onToggleRateLimit: (enabled?: boolean) => void;
  onToggleClaudeExtraUsage?: (enabled?: boolean) => void;
  onToggleCodex5h?: (enabled?: boolean) => void;
  onToggleCodexWeekly?: (enabled?: boolean) => void;
  isCcCompatible?: boolean;
  cliproxyapiEnabled?: boolean;
  onToggleCliproxyapiMode?: (enabled?: boolean) => void;
  onRetest: () => void;
  isRetesting?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onReauth?: () => void;
  onProxy?: () => void;
  hasProxy?: boolean;
  proxySource?: string;
  proxyHost?: string;
  onRefreshToken?: () => void;
  isRefreshing?: boolean;
  onApplyCodexAuthLocal?: () => void;
  isApplyingCodexAuthLocal?: boolean;
  onExportCodexAuthFile?: () => void;
  isExportingCodexAuthFile?: boolean;
  onApplyClaudeAuthLocal?: () => void;
  isApplyingClaudeAuthLocal?: boolean;
  onExportClaudeAuthFile?: () => void;
  isExportingClaudeAuthFile?: boolean;
  onApplyGeminiAuthLocal?: () => void;
  isApplyingGeminiAuthLocal?: boolean;
  onExportGeminiAuthFile?: () => void;
  isExportingGeminiAuthFile?: boolean;
}

interface AddApiKeyModalProps {
  isOpen: boolean;
  provider?: string;
  providerName?: string;
  isCompatible?: boolean;
  isAnthropic?: boolean;
  isCcCompatible?: boolean;
  isCommandCode?: boolean;
  commandCodeAuthState?: CommandCodeAuthFlowState;
  onStartCommandCodeAuth?: () => void;
  onSave: (data: {
    name: string;
    apiKey?: string;
    priority: number;
    baseUrl?: string;
    providerSpecificData?: Record<string, unknown>;
  }) => Promise<void | unknown>;
  onClose: () => void;
}

type CommandCodeAuthFlowState = {
  phase:
    | "idle"
    | "starting"
    | "polling"
    | "received"
    | "applying"
    | "applied"
    | "expired"
    | "error";
  state: string;
  authUrl: string;
  callbackUrl: string;
  expiresAt: string | null;
  message?: string;
};

interface EditConnectionModalConnection {
  id?: string;
  name?: string;
  email?: string;
  priority?: number;
  maxConcurrent?: number | null;
  authType?: string;
  provider?: string;
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
  healthCheckInterval?: number;
  projectId?: string | null;
}

const formatTimeAgo = (dateStr: string): string => {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  if (diff < 0) return "just now";
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
};

interface EditConnectionModalProps {
  isOpen: boolean;
  connection: EditConnectionModalConnection | null;
  onSave: (data: unknown) => Promise<void | unknown>;
  onClose: () => void;
}

interface EditCompatibleNodeModalNode {
  id?: string;
  name?: string;
  prefix?: string;
  apiType?: string;
  baseUrl?: string;
  chatPath?: string;
  modelsPath?: string;
}

interface EditCompatibleNodeModalProps {
  isOpen: boolean;
  node: EditCompatibleNodeModalNode | null;
  onSave: (data: unknown) => Promise<void>;
  onClose: () => void;
  isAnthropic?: boolean;
  isCcCompatible?: boolean;
}

const CC_COMPATIBLE_DEFAULT_CHAT_PATH = "/v1/messages?beta=true";
const CODEX_REASONING_STRENGTH_OPTIONS = [
  { value: "none", label: "None" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "xhigh", label: "XHigh" },
];

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

/**
 * UI adapter around the canonical getCodexRequestDefaults from requestDefaults.ts.
 * Adds the "medium" fallback for reasoningEffort required by the connection form.
 */
function getCodexRequestDefaults(providerSpecificData: unknown): {
  reasoningEffort: string;
  serviceTier?: "priority";
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
        {t("compatButtonLabel")}
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

// ──── ProviderPlaygroundPanel ────────────────────────────────────────────────
// Renders a playground section on the individual provider page.
// Shows ServiceKindTabs if the provider declares multiple kinds; falls back to
// a single-kind panel or the LlmChatCard for standard LLM providers.

const MEDIA_SERVICE_KINDS: ServiceKind[] = [
  "embedding",
  "image",
  "tts",
  "stt",
  "webSearch",
  "webFetch",
  "video",
  "music",
];

function renderKindPanel(kind: ServiceKind, providerId: string): JSX.Element | null {
  switch (kind) {
    case "llm":
      return <LlmChatCard providerId={providerId} />;
    case "embedding":
      return <EmbeddingExampleCard providerId={providerId} />;
    case "image":
      return <ImageExampleCard providerId={providerId} />;
    case "tts":
      return <TtsExampleCard providerId={providerId} />;
    case "stt":
      return <SttExampleCard providerId={providerId} />;
    case "webSearch":
      return <WebSearchExampleCard providerId={providerId} />;
    case "webFetch":
      return <WebFetchExampleCard providerId={providerId} />;
    case "video":
      return <VideoExampleCard providerId={providerId} />;
    case "music":
      return <MusicExampleCard providerId={providerId} />;
    default:
      return null;
  }
}

function ProviderPlaygroundPanel({ providerId }: { providerId: string }) {
  // Resolve serviceKinds from AI_PROVIDERS.
  // For providers without explicit serviceKinds (most LLM providers), we infer
  // "llm" as the default.
  const providerEntry = AI_PROVIDERS[providerId as keyof typeof AI_PROVIDERS] as
    | (Record<string, unknown> & { serviceKinds?: string[] })
    | undefined;

  const rawKinds: string[] = providerEntry?.serviceKinds ?? [];

  const ALL_VALID_KINDS = [
    "llm",
    "embedding",
    "image",
    "imageToText",
    "tts",
    "stt",
    "webSearch",
    "webFetch",
    "video",
    "music",
  ] as const;

  const kinds: ServiceKind[] =
    rawKinds.length > 0
      ? rawKinds.filter((k): k is ServiceKind => (ALL_VALID_KINDS as readonly string[]).includes(k))
      : ["llm"];

  // Filter out kinds that have no playground implementation yet
  const playgroundableKinds = kinds.filter((k) => k !== "imageToText");

  // useState must be called unconditionally (Rules of Hooks)
  const [activeKind, setActiveKind] = useState<ServiceKind>(playgroundableKinds[0] ?? "llm");

  if (playgroundableKinds.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Playground</h2>
      <ServiceKindTabs
        kinds={playgroundableKinds}
        activeKind={activeKind}
        onSelect={setActiveKind}
      />
      {renderKindPanel(activeKind, providerId)}
    </div>
  );
}

export default function ProviderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const providerId = params.id as string;
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [providerNode, setProviderNode] = useState(null);
  const [showOAuthModal, _setShowOAuthModal] = useState(false);
  const [reauthConnection, setReauthConnection] = useState<ConnectionRowConnection | null>(null);
  const [showAddApiKeyModal, setShowAddApiKeyModal] = useState(false);
  const [showRiskNoticeModal, setShowRiskNoticeModal] = useState(false);
  const [commandCodeAuthState, setCommandCodeAuthState] = useState<CommandCodeAuthFlowState>({
    phase: "idle",
    state: "",
    authUrl: "",
    callbackUrl: "",
    expiresAt: null,
    message: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditNodeModal, setShowEditNodeModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [retestingId, setRetestingId] = useState(null);
  const [batchTesting, setBatchTesting] = useState(false);
  const [batchTestResults, setBatchTestResults] = useState<any>(null);
  const [modelAliases, setModelAliases] = useState({});
  const { copied, copy } = useCopyToClipboard();
  const t = useTranslations("providers");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const notify = useNotificationStore();
  const [proxyTarget, setProxyTarget] = useState(null);
  const [proxyConfig, setProxyConfig] = useState(null);
  const [connProxyMap, setConnProxyMap] = useState<
    Record<string, { proxy: any; level: string } | null>
  >({});
  const [importingModels, setImportingModels] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [importingZed, setImportingZed] = useState(false);
  const [showZedManual, setShowZedManual] = useState(false);
  const [zedManualProvider, setZedManualProvider] = useState("openai");
  const [zedManualToken, setZedManualToken] = useState("");
  const [importingZedManual, setImportingZedManual] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importProgress, setImportProgress] = useState({
    current: 0,
    total: 0,
    phase: "idle" as "idle" | "fetching" | "importing" | "done" | "error",
    status: "",
    logs: [] as string[],
    error: "",
    importedCount: 0,
  });
  const [modelMeta, setModelMeta] = useState<{
    customModels: CompatModelRow[];
    modelCompatOverrides: Array<CompatModelRow & { id: string }>;
  }>({ customModels: [], modelCompatOverrides: [] });
  const [syncedAvailableModels, setSyncedAvailableModels] = useState<any[]>([]);
  const [compatSavingModelId, setCompatSavingModelId] = useState<string | null>(null);
  const [modelFilter, setModelFilter] = useState("");
  const [togglingModelId, setTogglingModelId] = useState<string | null>(null);
  const [testingModelId, setTestingModelId] = useState<string | null>(null);
  const [modelTestStatus, setModelTestStatus] = useState<Record<string, "ok" | "error">>({});
  const [bulkVisibilityAction, setBulkVisibilityAction] = useState<"select" | "deselect" | null>(
    null
  );
  const [applyingCodexAuthId, setApplyingCodexAuthId] = useState<string | null>(null);
  const [applyCodexModalConnectionId, setApplyCodexModalConnectionId] = useState<string | null>(
    null
  );
  const [exportingCodexAuthId, setExportingCodexAuthId] = useState<string | null>(null);
  const [importCodexModalOpen, setImportCodexModalOpen] = useState(false);
  const [applyingClaudeAuthId, setApplyingClaudeAuthId] = useState<string | null>(null);
  const [applyClaudeModalConnectionId, setApplyClaudeModalConnectionId] = useState<string | null>(
    null
  );
  const [exportingClaudeAuthId, setExportingClaudeAuthId] = useState<string | null>(null);
  const [importClaudeModalOpen, setImportClaudeModalOpen] = useState(false);
  const [applyingGeminiAuthId, setApplyingGeminiAuthId] = useState<string | null>(null);
  const [applyGeminiModalConnectionId, setApplyGeminiModalConnectionId] = useState<string | null>(
    null
  );
  const [exportingGeminiAuthId, setExportingGeminiAuthId] = useState<string | null>(null);
  const [importGeminiModalOpen, setImportGeminiModalOpen] = useState(false);
  const [codexGlobalFastServiceTier, setCodexGlobalFastServiceTier] = useState(false);
  const [savingCodexGlobalFastServiceTier, setSavingCodexGlobalFastServiceTier] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [batchDeleting, setBatchDeleting] = useState(false);
  const commandCodeAuthWindowRef = useRef<Window | null>(null);
  const commandCodeAuthTimerRef = useRef<number | null>(null);
  const pendingRiskActionRef = useRef<(() => void) | null>(null);
  const { acknowledged: riskAcknowledged, acknowledge: acknowledgeRisk } =
    useRiskAcknowledged(providerId);
  const isOpenAICompatible = isOpenAICompatibleProvider(providerId);
  const isCcCompatible = isClaudeCodeCompatibleProvider(providerId);
  const isCommandCode = providerId === "command-code";
  const isAnthropicCompatible =
    isAnthropicCompatibleProvider(providerId) && !isClaudeCodeCompatibleProvider(providerId);
  const isCompatible = isOpenAICompatible || isAnthropicCompatible || isCcCompatible;
  const isAnthropicProtocolCompatible = isAnthropicCompatible || isCcCompatible;

  const setShowOAuthModal = (show: boolean, connectionRow?: ConnectionRowConnection) => {
    _setShowOAuthModal(show);
    setReauthConnection(show && connectionRow ? connectionRow : null);
  };

  const providerInfo = resolveDashboardProviderInfo(providerId, {
    providerNode,
    compatibleLabels: {
      ccCompatibleName: t("ccCompatibleLabel"),
      anthropicCompatibleName: t("anthropicCompatibleName"),
      openAiCompatibleName: t("openaiCompatibleName"),
    },
  });
  const providerSupportsOAuth =
    providerInfo?.toggleAuthType === "oauth" || providerInfo?.toggleAuthType === "free";
  const subscriptionRisk = providerInfo?.subscriptionRisk === true;
  const providerSupportsPat = supportsApiKeyOnFreeProvider(providerId);
  const isOAuth = providerSupportsOAuth && !providerSupportsPat;
  const isFreeNoAuth = NOAUTH_PROVIDERS[providerId]?.noAuth === true;
  const registryModels = getModelsByProviderId(providerId);
  // Prefer synced API-discovered models when available, then merge built-ins
  // and user-managed custom models without duplicating IDs.
  const models = useMemo(() => {
    if (providerId === "gemini") {
      return syncedAvailableModels.map((model: any) => ({
        ...model,
        source: "imported",
      }));
    }

    const builtInModels = registryModels.map((model) => ({
      ...model,
      source: "system",
    }));

    const registryIds = new Set(builtInModels.map((m) => m.id));
    const syncedExtras = syncedAvailableModels
      .filter((model: any) => model?.id && !registryIds.has(model.id))
      .map((model: any) => ({
        id: model.id,
        name: model.name || model.id,
        source: "imported",
      }));
    const knownIds = new Set([...registryIds, ...syncedExtras.map((model: any) => model.id)]);
    const customExtras = modelMeta.customModels
      .filter((cm: any) => cm.id && !knownIds.has(cm.id))
      .map((cm: any) => ({
        id: cm.id,
        name: cm.name || cm.id,
        source: normalizeModelCatalogSource(cm.source) === "imported" ? "imported" : "custom",
      }));
    return [...builtInModels, ...syncedExtras, ...customExtras];
  }, [providerId, registryModels, syncedAvailableModels, modelMeta.customModels]);
  const providerAlias = getProviderAlias(providerId);
  const isManagedAvailableModelsProvider = isCompatible || providerId === "openrouter";
  const isSearchProvider = providerId.endsWith("-search");
  const isUpstreamProxyProvider = providerInfo?.category === "upstream-proxy";
  const compatibleSupportsModelImport = compatibleProviderSupportsModelImport(providerId);

  const providerStorageAlias = isCompatible ? providerId : providerAlias;
  const providerDisplayAlias = isCompatible ? providerNode?.prefix || providerId : providerAlias;

  const getApiLabel = () => {
    if (isAnthropicProtocolCompatible) return t("messagesApi");
    const type = providerNode?.apiType;
    switch (type) {
      case "responses":
        return t("responsesApi");
      case "embeddings":
        return t("embeddings");
      case "audio-transcriptions":
        return t("audioTranscriptions");
      case "audio-speech":
        return t("audioSpeech");
      case "images-generations":
        return t("imagesGenerations");
      default:
        return t("chatCompletions");
    }
  };

  const getApiDefaultPath = () => {
    if (isCcCompatible) return CC_COMPATIBLE_DEFAULT_CHAT_PATH;
    if (isAnthropicCompatible) return "/messages";
    const type = providerNode?.apiType;
    switch (type) {
      case "responses":
        return "/responses";
      case "embeddings":
        return "/embeddings";
      case "audio-transcriptions":
        return "/audio/transcriptions";
      case "audio-speech":
        return "/audio/speech";
      case "images-generations":
        return "/images/generations";
      default:
        return "/chat/completions";
    }
  };

  const getApiPath = () => {
    const defaultPath = getApiDefaultPath();
    return (providerNode?.chatPath || defaultPath).replace(/^\//, "");
  };

  // Define callbacks BEFORE the useEffect that uses them
  const fetchAliases = useCallback(async () => {
    try {
      const res = await fetch("/api/models/alias");
      const data = await res.json();
      if (res.ok) {
        setModelAliases(data.aliases || {});
      }
    } catch (error) {
      console.log("Error fetching aliases:", error);
    }
  }, []);

  const fetchProviderModelMeta = useCallback(async () => {
    if (isSearchProvider) return;
    try {
      const res = await fetch(`/api/provider-models?provider=${encodeURIComponent(providerId)}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      setModelMeta({
        customModels: data.models || [],
        modelCompatOverrides: data.modelCompatOverrides || [],
      });
      try {
        const syncRes = await fetch(
          `/api/synced-available-models?provider=${encodeURIComponent(providerId)}`,
          {
            cache: "no-store",
          }
        );
        if (syncRes.ok) {
          const syncData = await syncRes.json();
          setSyncedAvailableModels(syncData.models || []);
        } else {
          setSyncedAvailableModels([]);
        }
      } catch {
        setSyncedAvailableModels([]);
      }
    } catch (e) {
      console.error("fetchProviderModelMeta", e);
    }
  }, [providerId, isSearchProvider]);

  const fetchConnections = useCallback(async () => {
    try {
      const [connectionsRes, nodesRes] = await Promise.all([
        fetch("/api/providers", { cache: "no-store" }),
        fetch("/api/provider-nodes", { cache: "no-store" }),
      ]);
      const connectionsData = await connectionsRes.json();
      const nodesData = await nodesRes.json();
      if (connectionsRes.ok) {
        const filtered = (connectionsData.connections || []).filter(
          (c) => c.provider === providerId
        );
        setConnections(filtered);
      }
      if (nodesRes.ok) {
        let node = (nodesData.nodes || []).find((entry) => entry.id === providerId) || null;

        // Newly created compatible nodes can be briefly unavailable on one worker.
        // Retry a few times before showing "Provider not found".
        if (!node && isCompatible) {
          for (let attempt = 0; attempt < 3; attempt += 1) {
            await new Promise((resolve) => setTimeout(resolve, 150));
            const retryRes = await fetch("/api/provider-nodes", { cache: "no-store" });
            if (!retryRes.ok) continue;
            const retryData = await retryRes.json();
            node = (retryData.nodes || []).find((entry) => entry.id === providerId) || null;
            if (node) break;
          }
        }

        setProviderNode(node);
      }
    } catch (error) {
      console.log("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  }, [providerId, isCompatible]);

  const handleUpdateNode = async (formData) => {
    try {
      const res = await fetch(`/api/provider-nodes/${providerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setProviderNode(data.node);
        await fetchConnections();
        setShowEditNodeModal(false);
      }
    } catch (error) {
      console.log("Error updating provider node:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
    fetchAliases();
    // Load proxy config for visual indicators (provider-level button)
    fetch("/api/settings/proxy")
      .then((r) => (r.ok ? r.json() : null))
      .then((c) => setProxyConfig(c))
      .catch(() => {});
  }, [fetchConnections, fetchAliases]);

  const handleZedImport = useCallback(async () => {
    if (importingZed) return;
    setImportingZed(true);
    try {
      const res = await fetch("/api/providers/zed/import", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.zedDockerEnvironment) {
          setShowZedManual(true);
        }
        notify.error(data.error || "Zed import failed");
      } else if (!data.count) {
        const found = data.credentials?.length ?? 0;
        if (found === 0) {
          notify.info("No Zed credentials found in keychain");
        } else {
          notify.info(
            `Found ${found} keychain credential(s), but none matched supported providers`
          );
        }
      } else {
        notify.success(
          `Imported ${data.count} credential(s) from Zed for ${data.providers?.length ?? 0} provider(s)`
        );
        await fetchConnections();
      }
    } catch (e: any) {
      notify.error(e?.message || "Zed import failed");
    } finally {
      setImportingZed(false);
    }
  }, [importingZed, notify, fetchConnections]);

  const handleZedManualImport = useCallback(async () => {
    if (importingZedManual || !zedManualToken.trim()) return;
    setImportingZedManual(true);
    try {
      const res = await fetch("/api/providers/zed/manual-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: zedManualProvider, token: zedManualToken.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        notify.error(data.error?.message ?? data.error ?? "Manual import failed");
      } else {
        notify.success(`Imported ${zedManualProvider} token from Zed`);
        setZedManualToken("");
        await fetchConnections();
      }
    } catch (e: any) {
      notify.error(e?.message || "Manual import failed");
    } finally {
      setImportingZedManual(false);
    }
  }, [importingZedManual, zedManualProvider, zedManualToken, notify, fetchConnections]);

  useEffect(() => {
    if (providerId !== "codex") return;
    fetch("/api/settings", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setCodexGlobalFastServiceTier(isCodexGlobalFastServiceTierEnabled(data));
      })
      .catch(() => {});
  }, [providerId]);

  const loadConnProxies = useCallback(async (conns: { id?: string }[]) => {
    if (!conns.length) return;
    try {
      const results = await Promise.all(
        conns
          .filter((c) => c.id)
          .map((c) =>
            fetch(`/api/settings/proxy?resolve=${encodeURIComponent(c.id!)}`, { cache: "no-store" })
              .then((r) => (r.ok ? r.json() : null))
              .then((data) => [c.id!, data] as [string, any])
              .catch(() => [c.id!, null] as [string, any])
          )
      );
      const map: Record<string, { proxy: any; level: string } | null> = {};
      for (const [id, data] of results) {
        map[id] = data?.proxy ? data : null;
      }
      setConnProxyMap(map);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (loading || isSearchProvider) return;
    fetchProviderModelMeta();
  }, [loading, isSearchProvider, fetchProviderModelMeta]);

  // Load per-connection effective proxy (handles registry assignments)
  useEffect(() => {
    if (!loading && connections.length > 0) {
      void loadConnProxies(connections);
    }
  }, [loading, connections, loadConnProxies]);

  const onTestModel = async (modelId: string, fullModel: string) => {
    setTestingModelId(modelId);
    setModelTestStatus((prev) => ({ ...prev, [modelId]: undefined }));
    try {
      const res = await fetch("/api/models/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerId: selectedConnection?.provider || providerNode?.id || providerId,
          modelId: fullModel,
        }),
      });
      const data = await res.json();
      if (res.ok && data.status === "ok") {
        notify.success(
          providerText(
            t,
            "testModelSuccess",
            `Model ${modelId} is working. Latency: ${data.latencyMs}ms`,
            { modelId, latencyMs: data.latencyMs }
          )
        );
        setModelTestStatus((prev) => ({ ...prev, [modelId]: "ok" }));
      } else {
        notify.error(data.error || "Model test failed");
        setModelTestStatus((prev) => ({ ...prev, [modelId]: "error" }));
      }
    } catch (err) {
      notify.error("Network error testing model");
      setModelTestStatus((prev) => ({ ...prev, [modelId]: "error" }));
    } finally {
      setTestingModelId(null);
    }
  };

  const handleSetAlias = async (modelId, alias, providerAliasOverride = providerAlias) => {
    const fullModel = `${providerAliasOverride}/${modelId}`;
    try {
      const res = await fetch("/api/models/alias", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: fullModel, alias }),
      });
      if (res.ok) {
        await fetchAliases();
      } else {
        const data = await res.json();
        alert(data.error || t("failedSetAlias"));
      }
    } catch (error) {
      console.log("Error setting alias:", error);
    }
  };

  const handleDeleteAlias = async (alias) => {
    try {
      const res = await fetch(`/api/models/alias?alias=${encodeURIComponent(alias)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchAliases();
      }
    } catch (error) {
      console.log("Error deleting alias:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(t("deleteConnectionConfirm"))) return;
    try {
      const res = await fetch(`/api/providers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setConnections(connections.filter((c) => c.id !== id));
        if (providerId === "gemini") {
          await fetchProviderModelMeta();
        }
      }
    } catch (error) {
      console.log("Error deleting connection:", error);
    }
  };

  const handleToggleSelectAll = useCallback(() => {
    setSelectedIds((prev) =>
      prev.size === connections.length ? new Set() : new Set(connections.map((c) => c.id))
    );
  }, [connections]);

  const handleToggleSelectOne = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleBatchDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(t("batchDeleteConfirm", { count: selectedIds.size }))) return;

    setBatchDeleting(true);
    try {
      const res = await fetch("/api/providers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });

      if (res.ok) {
        setSelectedIds(new Set());
        await fetchConnections();
        notify.success(t("batchDeleteSuccess", { count: selectedIds.size }));
        if (providerId === "gemini") {
          await fetchProviderModelMeta();
        }
      } else {
        const data = await res.json();
        notify.error(data.error || "Batch delete failed");
      }
    } catch {
      notify.error("Network error during batch delete");
    } finally {
      setBatchDeleting(false);
    }
  };

  const handleOAuthSuccess = useCallback(() => {
    fetchConnections();
    setShowOAuthModal(false);
  }, [fetchConnections]);

  const openPrimaryAddFlow = useCallback(() => {
    if (isOAuth) {
      setShowOAuthModal(true);
      return;
    }
    setShowAddApiKeyModal(true);
  }, [isOAuth]);

  const gateConnectionFlow = useCallback(
    (callback: () => void) => {
      if (subscriptionRisk && !riskAcknowledged && !isRiskAcknowledged(providerId)) {
        pendingRiskActionRef.current = callback;
        setShowRiskNoticeModal(true);
        return;
      }
      callback();
    },
    [providerId, riskAcknowledged, subscriptionRisk]
  );

  const handleConfirmRiskNotice = useCallback(() => {
    acknowledgeRisk();
    setShowRiskNoticeModal(false);
    const pendingAction = pendingRiskActionRef.current;
    pendingRiskActionRef.current = null;
    pendingAction?.();
  }, [acknowledgeRisk]);

  const handleCancelRiskNotice = useCallback(() => {
    pendingRiskActionRef.current = null;
    setShowRiskNoticeModal(false);
  }, []);

  const clearCommandCodeAuthTimer = useCallback(() => {
    if (commandCodeAuthTimerRef.current !== null) {
      window.clearTimeout(commandCodeAuthTimerRef.current);
      commandCodeAuthTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearCommandCodeAuthTimer();
      commandCodeAuthWindowRef.current?.close?.();
    };
  }, [clearCommandCodeAuthTimer]);

  const handleCloseAddApiKeyModal = useCallback(() => {
    clearCommandCodeAuthTimer();
    commandCodeAuthWindowRef.current?.close?.();
    commandCodeAuthWindowRef.current = null;
    setCommandCodeAuthState({
      phase: "idle",
      state: "",
      authUrl: "",
      callbackUrl: "",
      expiresAt: null,
      message: "",
    });
    setShowAddApiKeyModal(false);
  }, [clearCommandCodeAuthTimer]);

  const handleCommandCodeAuthApply = useCallback(
    async (state: string, connectionId?: string, name?: string, setDefault?: boolean) => {
      setCommandCodeAuthState((current) => ({
        ...current,
        phase: "applying",
        message: "Applying browser-approved key…",
      }));

      try {
        const res = await fetch("/api/providers/command-code/auth/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state, connectionId, name, setDefault }),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          const errorMessage = data.error || "Failed to apply Command Code auth";
          setCommandCodeAuthState((current) => ({
            ...current,
            phase: "error",
            message: errorMessage,
          }));
          notify.error(errorMessage);
          return false;
        }

        setCommandCodeAuthState((current) => ({
          ...current,
          phase: "applied",
          message: "Command Code connected",
        }));
        commandCodeAuthWindowRef.current?.close?.();
        commandCodeAuthWindowRef.current = null;
        await fetchConnections();
        handleCloseAddApiKeyModal();
        notify.success("Command Code connection added");
        return true;
      } catch (error) {
        console.error("Error applying Command Code auth:", error);
        setCommandCodeAuthState((current) => ({
          ...current,
          phase: "error",
          message: "Failed to apply Command Code auth",
        }));
        notify.error("Failed to apply Command Code auth");
        return false;
      }
    },
    [fetchConnections, handleCloseAddApiKeyModal, notify]
  );

  const handleStartCommandCodeAuth = useCallback(async () => {
    if (commandCodeAuthState.phase === "starting" || commandCodeAuthState.phase === "polling") {
      return;
    }

    clearCommandCodeAuthTimer();
    commandCodeAuthWindowRef.current?.close?.();

    const popup = window.open("about:blank", "_blank");
    setCommandCodeAuthState({
      phase: "starting",
      state: "",
      authUrl: "",
      callbackUrl: "",
      expiresAt: null,
      message: "Opening Command Code Studio…",
    });

    try {
      const res = await fetch("/api/providers/command-code/auth/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.state || !data.authUrl) {
        const errorMessage = data.error || "Failed to start Command Code auth";
        setCommandCodeAuthState((current) => ({
          ...current,
          phase: "error",
          message: errorMessage,
        }));
        notify.error(errorMessage);
        popup?.close?.();
        return;
      }

      setCommandCodeAuthState({
        phase: "polling",
        state: data.state,
        authUrl: data.authUrl,
        callbackUrl: data.callbackUrl || "",
        expiresAt: data.expiresAt || null,
        message: "Open the auth URL, approve access, then paste the returned key/JSON/URL below…",
      });

      if (popup) {
        try {
          popup.opener = null;
        } catch {
          // Ignore opener cleanup failures.
        }
        popup.location.href = data.authUrl;
        commandCodeAuthWindowRef.current = popup;
      } else {
        const fallbackPopup = window.open(data.authUrl, "_blank", "noopener,noreferrer");
        if (!fallbackPopup) {
          setCommandCodeAuthState((current) => ({
            ...current,
            phase: "error",
            message: "Popup blocked. Please allow popups and try Command Code Connect again.",
          }));
          notify.error("Popup blocked. Please allow popups and try Command Code Connect again.");
          return;
        }
        commandCodeAuthWindowRef.current = fallbackPopup;
      }

      const deadline = data.expiresAt ? new Date(data.expiresAt).getTime() : Date.now() + 180000;
      const poll = async () => {
        if (Date.now() >= deadline) {
          setCommandCodeAuthState((current) => ({
            ...current,
            phase: "expired",
            message: "Command Code link expired",
          }));
          commandCodeAuthWindowRef.current?.close?.();
          commandCodeAuthWindowRef.current = null;
          notify.error("Command Code auth expired");
          clearCommandCodeAuthTimer();
          return;
        }

        try {
          const statusRes = await fetch(
            `/api/providers/command-code/auth/status?state=${encodeURIComponent(data.state)}`,
            { method: "GET", cache: "no-store" }
          );
          const statusData = await statusRes.json().catch(() => ({}));
          const status = String(statusData.status || statusData.state || statusData.phase || "")
            .toLowerCase()
            .trim();

          if (status === "expired") {
            setCommandCodeAuthState((current) => ({
              ...current,
              phase: "expired",
              message: "Command Code link expired",
            }));
            commandCodeAuthWindowRef.current?.close?.();
            commandCodeAuthWindowRef.current = null;
            notify.error("Command Code auth expired");
            clearCommandCodeAuthTimer();
            return;
          }

          if (status === "applied") {
            setCommandCodeAuthState((current) => ({
              ...current,
              phase: "applied",
              message: "Command Code connected",
            }));
            commandCodeAuthWindowRef.current?.close?.();
            commandCodeAuthWindowRef.current = null;
            await fetchConnections();
            handleCloseAddApiKeyModal();
            notify.success("Command Code connection added");
            clearCommandCodeAuthTimer();
            return;
          }

          if (status === "received") {
            setCommandCodeAuthState((current) => ({
              ...current,
              phase: "received",
              message: "Browser approved, applying…",
            }));
            clearCommandCodeAuthTimer();
            await handleCommandCodeAuthApply(
              data.state,
              statusData.connectionId,
              statusData.name,
              statusData.setDefault
            );
            return;
          }
        } catch {
          // Keep polling until the contract reports a terminal state or timeout.
        }

        commandCodeAuthTimerRef.current = window.setTimeout(poll, 2000);
      };

      commandCodeAuthTimerRef.current = window.setTimeout(poll, 1000);
    } catch (error) {
      console.error("Error starting Command Code auth:", error);
      setCommandCodeAuthState((current) => ({
        ...current,
        phase: "error",
        message: "Failed to start Command Code auth",
      }));
      notify.error("Failed to start Command Code auth");
      popup?.close?.();
      commandCodeAuthWindowRef.current = null;
      clearCommandCodeAuthTimer();
    }
  }, [
    clearCommandCodeAuthTimer,
    handleCloseAddApiKeyModal,
    commandCodeAuthState.phase,
    fetchConnections,
    handleCommandCodeAuthApply,
    notify,
  ]);

  const handleOpenCommandCodeConnect = useCallback(() => {
    setShowAddApiKeyModal(true);
    void handleStartCommandCodeAuth();
  }, [handleStartCommandCodeAuth]);

  const handleSaveApiKey = async (formData) => {
    try {
      const res = await fetch("/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: providerId, ...formData }),
      });
      if (res.ok) {
        const connectionData = await res.json();
        const newConnection = connectionData?.connection;
        await fetchConnections();
        setShowAddApiKeyModal(false);

        // For Gemini: show progress dialog and sync models from endpoint
        if (providerId === "gemini" && newConnection?.id) {
          setShowImportModal(true);
          setImportProgress({
            current: 0,
            total: 0,
            phase: "fetching",
            status: t("fetchingModels"),
            logs: [],
            error: "",
            importedCount: 0,
          });

          try {
            const syncRes = await fetch(`/api/providers/${newConnection.id}/sync-models`, {
              method: "POST",
              signal: AbortSignal.timeout(30_000), // 30s timeout — model sync shouldn't hang
            });
            const syncData = await syncRes.json();

            if (!syncRes.ok || syncData.error) {
              setImportProgress((prev) => ({
                ...prev,
                phase: "error",
                status: t("failedFetchModels"),
                error: syncData.error?.message || syncData.error || t("failedImportModels"),
              }));
              return null;
            }

            const syncedCount = syncData.syncedModels || 0;
            const availableCount =
              typeof syncData.availableModelsCount === "number"
                ? syncData.availableModelsCount
                : Array.isArray(syncData.models)
                  ? syncData.models.length
                  : syncedCount;
            const syncedModelList: Array<{ id: string; name?: string }> = syncData.models || [];
            const logs: string[] = [];
            if (syncedModelList.length > 0) {
              logs.push(`✓ ${availableCount} models available`);
              logs.push("");
              for (const m of syncedModelList) {
                logs.push(`  ${m.name || m.id}`);
              }
            }

            setImportProgress((prev) => ({
              ...prev,
              phase: "done",
              status: t("modelsImported", { count: availableCount }),
              total: availableCount,
              current: availableCount,
              importedCount: availableCount,
              logs,
            }));

            await fetchProviderModelMeta();
          } catch (syncError) {
            setImportProgress((prev) => ({
              ...prev,
              phase: "error",
              status: t("failedFetchModels"),
              error: String(syncError),
            }));
          }
        }
        return null;
      }
      const data = await res.json().catch(() => ({}));
      const errorMsg = data.error?.message || data.error || t("failedSaveConnection");
      return errorMsg;
    } catch (error) {
      console.log("Error saving connection:", error);
      return t("failedSaveConnectionRetry");
    }
  };

  const handleUpdateConnection = async (formData) => {
    try {
      const res = await fetch(`/api/providers/${selectedConnection.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        await fetchConnections();
        setShowEditModal(false);
        return null;
      }
      const data = await res.json().catch(() => ({}));
      return data.error?.message || data.error || t("failedSaveConnection");
    } catch (error) {
      console.log("Error updating connection:", error);
      return t("failedSaveConnectionRetry");
    }
  };

  const handleUpdateConnectionStatus = async (id, isActive) => {
    try {
      const res = await fetch(`/api/providers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });
      if (res.ok) {
        setConnections((prev) => prev.map((c) => (c.id === id ? { ...c, isActive } : c)));
      }
    } catch (error) {
      console.log("Error updating connection status:", error);
    }
  };

  const handleToggleRateLimit = async (connectionId, enabled) => {
    try {
      const res = await fetch("/api/rate-limits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectionId, enabled }),
      });
      if (res.ok) {
        setConnections((prev) =>
          prev.map((c) => (c.id === connectionId ? { ...c, rateLimitProtection: enabled } : c))
        );
      }
    } catch (error) {
      console.error("Error toggling rate limit:", error);
    }
  };

  const handleToggleClaudeExtraUsage = async (connectionId, enabled) => {
    try {
      const target = connections.find((connection) => connection.id === connectionId);
      if (!target) return;

      const providerSpecificData =
        target.providerSpecificData && typeof target.providerSpecificData === "object"
          ? target.providerSpecificData
          : {};

      const res = await fetch(`/api/providers/${connectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerSpecificData: {
            ...providerSpecificData,
            blockExtraUsage: enabled,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        notify.error(data.error || "Failed to update Claude extra-usage policy");
        return;
      }

      setConnections((prev) =>
        prev.map((connection) =>
          connection.id === connectionId
            ? {
                ...connection,
                providerSpecificData: {
                  ...(connection.providerSpecificData || {}),
                  blockExtraUsage: enabled,
                },
                ...(!enabled && connection.lastErrorSource === "extra_usage"
                  ? {
                      testStatus: "active",
                      lastError: null,
                      lastErrorAt: null,
                      lastErrorType: null,
                      lastErrorSource: null,
                      errorCode: null,
                      rateLimitedUntil: null,
                    }
                  : {}),
              }
            : connection
        )
      );
      notify.success(
        enabled
          ? "Claude extra-usage blocking enabled (extra usage will be blocked)"
          : "Claude extra-usage blocking disabled (extra usage is allowed)"
      );
    } catch (error) {
      console.error("Error toggling Claude extra-usage policy:", error);
      notify.error("Failed to update Claude extra-usage policy");
    }
  };

  const [cpaProviderEnabled, setCpaProviderEnabled] = useState(false);

  // Load upstream proxy config for this provider on mount
  useEffect(() => {
    if (!isCcCompatible) return;
    fetch(`/api/settings`)
      .then((r) => r.json())
      .then((data) => {
        // Check if this provider has CLIProxyAPI routing enabled
        // The upstream_proxy_config is synced via the settings API
      })
      .catch(() => {});

    // Also check via direct upstream proxy config lookup
    fetch(`/api/upstream-proxy/${providerId}`)
      .then((r) => {
        if (!r.ok) return null;
        return r.json();
      })
      .then((data) => {
        if (data?.enabled && (data.mode === "cliproxyapi" || data.mode === "fallback")) {
          setCpaProviderEnabled(true);
        }
      })
      .catch(() => {});
  }, [isCcCompatible, providerId]);

  const handleToggleCliproxyapiMode = async (_connectionId, enabled) => {
    try {
      // Write to upstream_proxy_config table which resolveExecutorWithProxy reads
      const res = await fetch(`/api/upstream-proxy/${providerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: enabled ? "cliproxyapi" : "native",
          enabled: enabled,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        notify.error(data.error || "Failed to update CLIProxyAPI routing");
        return;
      }

      setCpaProviderEnabled(enabled);
      notify.success(
        enabled
          ? "Requests now route through CLIProxyAPI (deeper emulation)"
          : "Requests now use native OmniRoute (direct)"
      );
    } catch {
      notify.error("Failed to update CLIProxyAPI routing");
    }
  };

  const handleToggleCodexLimit = async (connectionId, field, enabled) => {
    try {
      const target = connections.find((connection) => connection.id === connectionId);
      if (!target) return;

      const providerSpecificData =
        target.providerSpecificData && typeof target.providerSpecificData === "object"
          ? target.providerSpecificData
          : {};
      const existingPolicy =
        providerSpecificData.codexLimitPolicy &&
        typeof providerSpecificData.codexLimitPolicy === "object"
          ? providerSpecificData.codexLimitPolicy
          : {};

      const nextPolicy = {
        ...normalizeCodexLimitPolicy(existingPolicy),
        [field]: enabled,
      };

      const res = await fetch(`/api/providers/${connectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerSpecificData: {
            ...providerSpecificData,
            codexLimitPolicy: nextPolicy,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        notify.error(data.error || "Failed to update Codex limit policy");
        return;
      }

      setConnections((prev) =>
        prev.map((connection) =>
          connection.id === connectionId
            ? {
                ...connection,
                providerSpecificData: {
                  ...(connection.providerSpecificData || {}),
                  codexLimitPolicy: nextPolicy,
                },
              }
            : connection
        )
      );
      notify.success("Codex limit policy updated");
    } catch (error) {
      console.error("Error toggling Codex quota policy:", error);
      notify.error("Failed to update Codex limit policy");
    }
  };

  const handleToggleCodexGlobalFastServiceTier = async (enabled: boolean) => {
    if (savingCodexGlobalFastServiceTier) return;
    setSavingCodexGlobalFastServiceTier(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codexServiceTier: { enabled } }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        notify.error(data.error || "Failed to update Codex Fast setting");
        return;
      }

      setCodexGlobalFastServiceTier(enabled);
      notify.success(enabled ? "Codex Fast enabled globally" : "Codex Fast disabled globally");
    } catch (error) {
      console.error("Error toggling Codex Fast setting:", error);
      notify.error("Failed to update Codex Fast setting");
    } finally {
      setSavingCodexGlobalFastServiceTier(false);
    }
  };

  const handleRetestConnection = async (connectionId) => {
    if (!connectionId || retestingId) return;
    setRetestingId(connectionId);
    try {
      const res = await fetch(`/api/providers/${connectionId}/test`, { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || t("failedRetestConnection"));
        return;
      }
      await fetchConnections();
    } catch (error) {
      console.error("Error retesting connection:", error);
    } finally {
      setRetestingId(null);
    }
  };

  // Batch test all connections for this provider
  const handleBatchTestAll = async () => {
    if (batchTesting || connections.length === 0) return;
    setBatchTesting(true);
    setBatchTestResults(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120_000); // 2min max
    try {
      const res = await fetch("/api/providers/test-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "provider", providerId }),
        signal: controller.signal,
      });
      let data: any;
      try {
        data = await res.json();
      } catch {
        data = { error: t("providerTestFailed"), results: [], summary: null };
      }
      setBatchTestResults({
        ...data,
        error: data.error
          ? typeof data.error === "object"
            ? data.error.message || data.error.error || JSON.stringify(data.error)
            : String(data.error)
          : null,
      });
      if (data?.summary) {
        const { passed, failed, total } = data.summary;
        if (failed === 0) notify.success(t("allTestsPassed", { total }));
        else notify.warning(t("testSummary", { passed, failed, total }));
      }
      // Refresh connections to update statuses
      await fetchConnections();
    } catch (error: any) {
      const isAbort = error?.name === "AbortError";
      const msg = isAbort ? t("providerTestTimeout") : t("providerTestFailed");
      setBatchTestResults({ error: msg, results: [], summary: null });
      notify.error(msg);
    } finally {
      clearTimeout(timeoutId);
      setBatchTesting(false);
    }
  };

  // T12: Manual token refresh
  const [refreshingId, setRefreshingId] = useState<string | null>(null);

  const parseApiErrorMessage = async (res: Response, fallback: string) => {
    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await res.json().catch(() => ({}));
      if (typeof data?.error === "string" && data.error.trim()) {
        return data.error;
      }
      if (data?.error?.message) {
        return data.error.message;
      }
    }

    const text = await res.text().catch(() => "");
    return text.trim() || fallback;
  };

  const getAttachmentFilename = (res: Response, fallback: string) => {
    const disposition = res.headers.get("content-disposition") || "";
    const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
    if (utf8Match?.[1]) {
      return decodeURIComponent(utf8Match[1]);
    }

    const plainMatch = disposition.match(/filename="([^"]+)"/i);
    if (plainMatch?.[1]) {
      return plainMatch[1];
    }

    return fallback;
  };

  const handleRefreshToken = async (connectionId: string) => {
    if (refreshingId) return;
    setRefreshingId(connectionId);
    try {
      const res = await fetch(`/api/providers/${connectionId}/refresh`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        notify.success(t("tokenRefreshed"));
        await fetchConnections();
      } else {
        notify.error(data.error || t("tokenRefreshFailed"));
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      notify.error(t("tokenRefreshFailed"));
    } finally {
      setRefreshingId(null);
    }
  };

  const handleApplyCodexAuthLocal = async (connectionId: string) => {
    if (applyingCodexAuthId) return;
    setApplyingCodexAuthId(connectionId);

    const defaultSuccess =
      typeof t.has === "function" && t.has("codexAuthAppliedLocal")
        ? t("codexAuthAppliedLocal")
        : "Codex auth.json applied locally";
    const defaultError =
      typeof t.has === "function" && t.has("codexAuthApplyFailed")
        ? t("codexAuthApplyFailed")
        : "Failed to apply Codex auth.json locally";

    try {
      const res = await fetch(`/api/providers/${connectionId}/codex-auth/apply-local`, {
        method: "POST",
      });

      if (!res.ok) {
        notify.error(await parseApiErrorMessage(res, defaultError));
        return;
      }

      notify.success(defaultSuccess);
      setApplyCodexModalConnectionId(null);
    } catch (error) {
      console.error("Error applying Codex auth locally:", error);
      notify.error(defaultError);
    } finally {
      setApplyingCodexAuthId(null);
    }
  };

  const handleExportCodexAuthFile = async (connectionId: string) => {
    if (exportingCodexAuthId) return;
    setExportingCodexAuthId(connectionId);

    const defaultSuccess =
      typeof t.has === "function" && t.has("codexAuthExported")
        ? t("codexAuthExported")
        : "Codex auth.json exported";
    const defaultError =
      typeof t.has === "function" && t.has("codexAuthExportFailed")
        ? t("codexAuthExportFailed")
        : "Failed to export Codex auth.json";

    try {
      const res = await fetch(`/api/providers/${connectionId}/codex-auth/export`, {
        method: "POST",
      });

      if (!res.ok) {
        notify.error(await parseApiErrorMessage(res, defaultError));
        return;
      }

      const blob = await res.blob();
      const filename = getAttachmentFilename(res, "codex-auth.json");
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);

      notify.success(defaultSuccess);
    } catch (error) {
      console.error("Error exporting Codex auth file:", error);
      notify.error(defaultError);
    } finally {
      setExportingCodexAuthId(null);
    }
  };

  const handleApplyClaudeAuthLocal = async (connectionId: string) => {
    if (applyingClaudeAuthId) return;
    setApplyingClaudeAuthId(connectionId);

    const defaultSuccess =
      typeof t.has === "function" && t.has("claudeAuthAppliedLocal")
        ? t("claudeAuthAppliedLocal")
        : "Claude auth applied locally";
    const defaultError =
      typeof t.has === "function" && t.has("claudeAuthApplyFailed")
        ? t("claudeAuthApplyFailed")
        : "Failed to apply Claude auth locally";

    try {
      const res = await fetch(`/api/providers/${connectionId}/claude-auth/apply-local`, {
        method: "POST",
      });

      if (!res.ok) {
        notify.error(await parseApiErrorMessage(res, defaultError));
        return;
      }

      notify.success(defaultSuccess);
      setApplyClaudeModalConnectionId(null);
    } catch (error) {
      console.error("Error applying Claude auth locally:", error);
      notify.error(defaultError);
    } finally {
      setApplyingClaudeAuthId(null);
    }
  };

  const handleExportClaudeAuthFile = async (connectionId: string) => {
    if (exportingClaudeAuthId) return;
    setExportingClaudeAuthId(connectionId);

    const defaultSuccess =
      typeof t.has === "function" && t.has("claudeAuthExported")
        ? t("claudeAuthExported")
        : "Claude auth file exported";
    const defaultError =
      typeof t.has === "function" && t.has("claudeAuthExportFailed")
        ? t("claudeAuthExportFailed")
        : "Failed to export Claude auth file";

    try {
      const res = await fetch(`/api/providers/${connectionId}/claude-auth/export`, {
        method: "POST",
      });

      if (!res.ok) {
        notify.error(await parseApiErrorMessage(res, defaultError));
        return;
      }

      const blob = await res.blob();
      const filename = getAttachmentFilename(res, "claude-auth.json");
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);

      notify.success(defaultSuccess);
    } catch (error) {
      console.error("Error exporting Claude auth file:", error);
      notify.error(defaultError);
    } finally {
      setExportingClaudeAuthId(null);
    }
  };

  const handleApplyGeminiAuthLocal = async (connectionId: string) => {
    if (applyingGeminiAuthId) return;
    setApplyingGeminiAuthId(connectionId);

    const defaultSuccess =
      typeof t.has === "function" && t.has("geminiAuthAppliedLocal")
        ? t("geminiAuthAppliedLocal")
        : "Gemini auth applied locally";
    const defaultError =
      typeof t.has === "function" && t.has("geminiAuthApplyFailed")
        ? t("geminiAuthApplyFailed")
        : "Failed to apply Gemini auth locally";

    try {
      const res = await fetch(`/api/providers/${connectionId}/gemini-cli-auth/apply-local`, {
        method: "POST",
      });

      if (!res.ok) {
        notify.error(await parseApiErrorMessage(res, defaultError));
        return;
      }

      notify.success(defaultSuccess);
      setApplyGeminiModalConnectionId(null);
    } catch (error) {
      console.error("Error applying Gemini auth locally:", error);
      notify.error(defaultError);
    } finally {
      setApplyingGeminiAuthId(null);
    }
  };

  const handleExportGeminiAuthFile = async (connectionId: string) => {
    if (exportingGeminiAuthId) return;
    setExportingGeminiAuthId(connectionId);

    const defaultSuccess =
      typeof t.has === "function" && t.has("geminiAuthExported")
        ? t("geminiAuthExported")
        : "Gemini auth file exported";
    const defaultError =
      typeof t.has === "function" && t.has("geminiAuthExportFailed")
        ? t("geminiAuthExportFailed")
        : "Failed to export Gemini auth file";

    try {
      const res = await fetch(`/api/providers/${connectionId}/gemini-cli-auth/export`, {
        method: "POST",
      });

      if (!res.ok) {
        notify.error(await parseApiErrorMessage(res, defaultError));
        return;
      }

      const blob = await res.blob();
      const filename = getAttachmentFilename(res, "gemini-auth.json");
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);

      notify.success(defaultSuccess);
    } catch (error) {
      console.error("Error exporting Gemini auth file:", error);
      notify.error(defaultError);
    } finally {
      setExportingGeminiAuthId(null);
    }
  };

  const handleSwapPriority = async (conn1, conn2) => {
    if (!conn1 || !conn2) return;
    try {
      // If they have the same priority, we need to ensure the one moving up
      // gets a lower value than the one moving down.
      // We use a small offset which the backend re-indexing will fix.
      let p1 = conn2.priority;
      let p2 = conn1.priority;

      if (p1 === p2) {
        // If moving conn1 "up" (index decreases)
        const isConn1MovingUp = connections.indexOf(conn1) > connections.indexOf(conn2);
        if (isConn1MovingUp) {
          p1 = conn2.priority - 0.5;
        } else {
          p1 = conn2.priority + 0.5;
        }
      }

      await Promise.all([
        fetch(`/api/providers/${conn1.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priority: p1 }),
        }),
        fetch(`/api/providers/${conn2.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priority: p2 }),
        }),
      ]);
      await fetchConnections();
    } catch (error) {
      console.log("Error swapping priority:", error);
    }
  };

  const handleImportModels = async () => {
    if (importingModels) return;
    const activeConnection = connections.find((conn) => conn.isActive !== false);
    if (!activeConnection) return;

    setImportingModels(true);
    setShowImportModal(true);
    setImportProgress({
      current: 0,
      total: 0,
      phase: "fetching",
      status: t("fetchingModels"),
      logs: [],
      error: "",
      importedCount: 0,
    });

    try {
      const res = await fetch(`/api/providers/${activeConnection.id}/models?refresh=true`);
      const data = await res.json();
      if (!res.ok) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "error",
          status: t("failedFetchModels"),
          error: data.error || t("failedImportModels"),
        }));
        return;
      }
      const fetchedModels = data.models || [];
      if (fetchedModels.length === 0) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "done",
          status: t("noModelsFound"),
          logs: [t("noModelsReturnedFromEndpoint")],
        }));
        return;
      }

      const existingIds = new Set([
        ...(modelMeta.customModels || []).map((m: any) => m.id),
        ...models.map((m: any) => m.id),
      ]);
      const newModels = fetchedModels.filter(
        (model: any) => !existingIds.has(model.id || model.name || model.model)
      );

      if (newModels.length === 0) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "done",
          status: t("allModelsAlreadyImported") || "All models already imported",
          logs: [t("noNewModelsToImport") || "No new models to import"],
          importedCount: 0,
          total: 0,
          current: 0,
        }));
        return;
      }

      setImportProgress((prev) => ({
        ...prev,
        phase: "importing",
        total: newModels.length,
        current: 0,
        status: t("importingModelsProgress", { current: 0, total: newModels.length }),
        logs: [
          t("foundModelsStartingImport", { count: newModels.length }),
          ...(newModels.length < fetchedModels.length
            ? [
                t("skippingExistingModels", { count: fetchedModels.length - newModels.length }) ||
                  `Skipping ${fetchedModels.length - newModels.length} existing models`,
              ]
            : []),
        ],
      }));

      let importedCount = 0;
      for (let i = 0; i < newModels.length; i++) {
        const model = newModels[i];
        const modelId = model.id || model.name || model.model;
        if (!modelId) continue;
        const parts = modelId.split("/");
        const baseAlias = parts[parts.length - 1];

        setImportProgress((prev) => ({
          ...prev,
          current: i + 1,
          status: t("importingModelsProgress", { current: i + 1, total: newModels.length }),
          logs: [...prev.logs, t("importingModelById", { modelId })],
        }));

        // Save as imported (default) model in the DB
        await fetch("/api/provider-models", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: providerId,
            modelId,
            modelName: model.name || modelId,
            source: "imported",
            ...(typeof model.apiFormat === "string" ? { apiFormat: model.apiFormat } : {}),
            ...(Array.isArray(model.supportedEndpoints)
              ? { supportedEndpoints: model.supportedEndpoints }
              : {}),
          }),
        });
        // Also create an alias for routing
        if (!modelAliases[baseAlias]) {
          await handleSetAlias(modelId, baseAlias, providerStorageAlias);
        }
        importedCount += 1;
      }

      await fetchAliases();

      setImportProgress((prev) => ({
        ...prev,
        phase: "done",
        current: newModels.length,
        status:
          importedCount > 0
            ? t("importSuccessCount", { count: importedCount })
            : t("noNewModelsAddedExisting"),
        logs: [
          ...prev.logs,
          importedCount > 0
            ? t("importDoneCount", { count: importedCount })
            : t("noNewModelsAdded"),
        ],
        importedCount,
      }));

      // Auto-reload after success
      if (importedCount > 0) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error importing models:", error);
      setImportProgress((prev) => ({
        ...prev,
        phase: "error",
        status: t("importFailed"),
        error: error instanceof Error ? error.message : t("unexpectedErrorOccurred"),
      }));
    } finally {
      setImportingModels(false);
    }
  };

  // Shared import handler for CompatibleModelsSection
  const handleCompatibleImportWithProgress = async (connectionId: string) => {
    setShowImportModal(true);
    setImportProgress({
      current: 0,
      total: 0,
      phase: "fetching",
      status: t("fetchingModels"),
      logs: [],
      error: "",
      importedCount: 0,
    });

    try {
      const response = await fetch(`/api/providers/${connectionId}/sync-models?mode=import`, {
        method: "POST",
        signal: AbortSignal.timeout(60_000),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || t("failedImportModels"));
      }

      const importedModels = Array.isArray(data.importedModels) ? data.importedModels : [];
      const importedCount =
        typeof data.importedCount === "number" ? data.importedCount : importedModels.length;
      const changedCount =
        typeof data.importedChanges?.total === "number"
          ? data.importedChanges.total
          : importedCount;
      const totalChangedCount =
        changedCount +
        (typeof data.customModelChanges?.total === "number" ? data.customModelChanges.total : 0);

      if (importedModels.length === 0) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "done",
          status:
            importedCount > 0
              ? t("importSuccessCount", { count: importedCount })
              : t("noNewModelsAdded"),
          logs: [
            importedCount > 0
              ? t("importDoneCount", { count: importedCount })
              : t("noNewModelsAdded"),
          ],
          importedCount,
        }));
        if (totalChangedCount > 0) {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        return;
      }

      setImportProgress((prev) => ({
        ...prev,
        phase: "done",
        total: importedModels.length,
        current: importedModels.length,
        status:
          importedCount > 0
            ? t("importSuccessCount", { count: importedCount })
            : t("noNewModelsAdded"),
        logs: [
          t("foundModelsStartingImport", { count: importedModels.length }),
          ...importedModels.map((model: any) =>
            t("importingModelById", { modelId: model.id || model.name || model.model })
          ),
          importedCount > 0
            ? t("importDoneCount", { count: importedCount })
            : t("noNewModelsAdded"),
        ],
        importedCount,
      }));

      if (totalChangedCount > 0) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error importing models:", error);
      setImportProgress((prev) => ({
        ...prev,
        phase: "error",
        status: t("importFailed"),
        error: error instanceof Error ? error.message : t("unexpectedErrorOccurred"),
      }));
    }
  };

  const canImportModels = isFreeNoAuth || connections.some((conn) => conn.isActive !== false);

  // Auto-sync toggle state: read from first active connection's providerSpecificData
  const autoSyncConnection = connections.find((conn: any) => conn.isActive !== false);
  const isAutoSyncEnabled = !!(autoSyncConnection as any)?.providerSpecificData?.autoSync;
  const [togglingAutoSync, setTogglingAutoSync] = useState(false);

  const handleToggleAutoSync = async () => {
    if (!autoSyncConnection || togglingAutoSync) return;
    setTogglingAutoSync(true);
    try {
      const newValue = !isAutoSyncEnabled;
      await fetch(`/api/providers/${(autoSyncConnection as any).id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerSpecificData: { autoSync: newValue },
        }),
      });
      await fetchConnections();
      notify[newValue ? "success" : "info"](
        newValue ? t("autoSyncEnabled") : t("autoSyncDisabled")
      );
    } catch (error) {
      console.log("Error toggling auto-sync:", error);
      notify.error(t("autoSyncToggleFailed"));
    } finally {
      setTogglingAutoSync(false);
    }
  };

  const [clearingModels, setClearingModels] = useState(false);
  const providerAliasEntries = useMemo(
    () =>
      Object.entries(modelAliases).filter(([, model]) =>
        (model as string).startsWith(`${providerStorageAlias}/`)
      ),
    [modelAliases, providerStorageAlias]
  );

  const handleClearAllModels = async () => {
    if (clearingModels) return;
    if (!confirm(t("clearAllModelsConfirm"))) return;
    setClearingModels(true);
    try {
      const res = await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerStorageAlias)}&all=true`,
        { method: "DELETE" }
      );
      if (res.ok) {
        // Also delete all aliases that belong to this provider
        await Promise.all(
          providerAliasEntries.map(([alias]) =>
            fetch(`/api/models/alias?alias=${encodeURIComponent(alias)}`, {
              method: "DELETE",
            }).catch(() => {})
          )
        );
        await fetchProviderModelMeta();
        await fetchAliases();
        notify.success(t("clearAllModelsSuccess"));
      } else {
        notify.error(t("clearAllModelsFailed"));
      }
    } catch {
      notify.error(t("clearAllModelsFailed"));
    } finally {
      setClearingModels(false);
    }
  };

  const customMap = useMemo(() => buildCompatMap(modelMeta.customModels), [modelMeta.customModels]);
  const overrideMap = useMemo(
    () => buildCompatMap(modelMeta.modelCompatOverrides),
    [modelMeta.modelCompatOverrides]
  );
  const compatibleFallbackModels = useMemo(
    () => getCompatibleFallbackModels(providerId, modelMeta.customModels),
    [providerId, modelMeta.customModels]
  );

  const effectiveModelNormalize = (modelId: string, protocol = MODEL_COMPAT_PROTOCOL_KEYS[0]) =>
    effectiveNormalizeForProtocol(modelId, protocol, customMap, overrideMap);

  const effectiveModelPreserveDeveloper = (
    modelId: string,
    protocol = MODEL_COMPAT_PROTOCOL_KEYS[0]
  ) => effectivePreserveForProtocol(modelId, protocol, customMap, overrideMap);

  const effectiveModelHidden = useCallback(
    (modelId: string) => isModelHidden(modelId, customMap, overrideMap),
    [customMap, overrideMap]
  );

  const getUpstreamHeadersRecordForModel = useCallback(
    (modelId: string, protocol: string) =>
      effectiveUpstreamHeadersForProtocol(modelId, protocol, customMap, overrideMap),
    [customMap, overrideMap]
  );

  const saveModelCompatFlags = async (modelId: string, patch: ModelCompatSavePatch) => {
    setCompatSavingModelId(modelId);
    try {
      const c = customMap.get(modelId) as Record<string, unknown> | undefined;
      let body: Record<string, unknown>;
      const onlyCompatByProtocol =
        patch.compatByProtocol &&
        patch.normalizeToolCallId === undefined &&
        patch.preserveOpenAIDeveloperRole === undefined &&
        !("upstreamHeaders" in patch);

      if (c) {
        if (onlyCompatByProtocol) {
          body = {
            provider: providerId,
            modelId,
            compatByProtocol: patch.compatByProtocol,
          };
        } else {
          body = {
            provider: providerId,
            modelId,
            modelName: (c.name as string) || modelId,
            source: (c.source as string) || "manual",
            apiFormat: (c.apiFormat as string) || "chat-completions",
            supportedEndpoints:
              Array.isArray(c.supportedEndpoints) && (c.supportedEndpoints as unknown[]).length
                ? c.supportedEndpoints
                : ["chat"],
            normalizeToolCallId:
              patch.normalizeToolCallId !== undefined
                ? patch.normalizeToolCallId
                : Boolean(c.normalizeToolCallId),
            preserveOpenAIDeveloperRole:
              patch.preserveOpenAIDeveloperRole !== undefined
                ? patch.preserveOpenAIDeveloperRole
                : Object.prototype.hasOwnProperty.call(c, "preserveOpenAIDeveloperRole")
                  ? Boolean(c.preserveOpenAIDeveloperRole)
                  : true,
          };
          if (patch.compatByProtocol) body.compatByProtocol = patch.compatByProtocol;
        }
      } else {
        body = { provider: providerId, modelId, ...patch };
      }
      const res = await fetch("/api/provider-models", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const detail = await formatProviderModelsErrorResponse(res);
        notify.error(
          detail ? `${t("failedSaveCustomModel")} — ${detail}` : t("failedSaveCustomModel")
        );
        return;
      }
    } catch {
      notify.error(t("failedSaveCustomModel"));
      return;
    } finally {
      setCompatSavingModelId(null);
    }
    try {
      await fetchProviderModelMeta();
    } catch {
      /* refresh failure is non-critical — data was already saved */
    }
  };

  const handleToggleModelHidden = async (
    providerKey: string,
    modelId: string,
    hidden: boolean
  ): Promise<void> => {
    setTogglingModelId(modelId);
    try {
      const res = await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerKey)}&modelId=${encodeURIComponent(modelId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isHidden: hidden }),
        }
      );
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        notify.error(detail || t("failedSaveCustomModel"));
        return;
      }
      await Promise.all([fetchProviderModelMeta().catch(() => {}), fetchAliases().catch(() => {})]);
    } catch {
      notify.error(t("failedSaveCustomModel"));
    } finally {
      setTogglingModelId(null);
    }
  };

  const handleBulkToggleModelHidden = async (
    providerKey: string,
    modelIds: string[],
    hidden: boolean
  ): Promise<void> => {
    if (modelIds.length === 0) return;
    setBulkVisibilityAction(hidden ? "deselect" : "select");
    try {
      const res = await fetch(`/api/provider-models?provider=${encodeURIComponent(providerKey)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: hidden, modelIds }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        notify.error(detail || t("failedSaveCustomModel"));
        return;
      }
      await Promise.all([fetchProviderModelMeta().catch(() => {}), fetchAliases().catch(() => {})]);
    } catch {
      notify.error(t("failedSaveCustomModel"));
    } finally {
      setBulkVisibilityAction(null);
    }
  };

  const renderModelsSection = () => {
    const autoSyncToggle = compatibleSupportsModelImport && canImportModels && (
      <button
        onClick={handleToggleAutoSync}
        disabled={togglingAutoSync}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-transparent cursor-pointer text-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
        title={t("autoSyncTooltip")}
      >
        <span
          className="material-symbols-outlined text-[16px]"
          style={{ color: isAutoSyncEnabled ? "#22c55e" : "var(--color-text-muted)" }}
        >
          {isAutoSyncEnabled ? "toggle_on" : "toggle_off"}
        </span>
        <span className="text-text-main">{t("autoSync")}</span>
      </button>
    );

    const clearAllButton = (modelMeta.customModels.length > 0 ||
      providerAliasEntries.length > 0) && (
      <button
        onClick={handleClearAllModels}
        disabled={clearingModels}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-red-300 dark:border-red-800 bg-transparent cursor-pointer text-[12px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
        title={t("clearAllModels")}
      >
        <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
        <span>{t("clearAllModels")}</span>
      </button>
    );

    if (isManagedAvailableModelsProvider) {
      const description =
        providerId === "openrouter"
          ? t("openRouterAnyModelHint")
          : isCcCompatible
            ? t("ccCompatibleModelsDescription")
            : t("compatibleModelsDescription", {
                type: isAnthropicCompatible ? t("anthropic") : t("openai"),
              });
      const inputLabel = providerId === "openrouter" ? t("modelIdFromOpenRouter") : t("modelId");
      const inputPlaceholder =
        providerId === "openrouter"
          ? t("openRouterModelPlaceholder")
          : isCcCompatible
            ? "claude-sonnet-4-6"
            : isAnthropicCompatible
              ? t("anthropicCompatibleModelPlaceholder")
              : t("openaiCompatibleModelPlaceholder");

      return (
        <div>
          <div className="flex items-center gap-2 mb-4">
            {autoSyncToggle}
            {clearAllButton}
          </div>
          <CompatibleModelsSection
            providerStorageAlias={providerStorageAlias}
            providerDisplayAlias={providerDisplayAlias}
            modelAliases={modelAliases}
            availableModels={syncedAvailableModels}
            customModels={modelMeta.customModels}
            fallbackModels={compatibleFallbackModels}
            description={description}
            inputLabel={inputLabel}
            inputPlaceholder={inputPlaceholder}
            copied={copied}
            onCopy={copy}
            onSetAlias={handleSetAlias}
            onDeleteAlias={handleDeleteAlias}
            connections={connections}
            isAnthropic={isAnthropicProtocolCompatible}
            onImportWithProgress={handleCompatibleImportWithProgress}
            t={t}
            effectiveModelNormalize={effectiveModelNormalize}
            effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
            getUpstreamHeadersRecord={getUpstreamHeadersRecordForModel}
            saveModelCompatFlags={saveModelCompatFlags}
            compatSavingModelId={compatSavingModelId}
            onModelsChanged={fetchProviderModelMeta}
            allowImport={compatibleSupportsModelImport}
            isModelHidden={effectiveModelHidden}
            onToggleHidden={(modelId, hidden) =>
              handleToggleModelHidden(providerStorageAlias, modelId, hidden)
            }
            onBulkToggleHidden={(modelIds, hidden) =>
              handleBulkToggleModelHidden(providerStorageAlias, modelIds, hidden)
            }
            bulkTogglePending={bulkVisibilityAction !== null}
            togglingModelId={togglingModelId}
            onTestModel={onTestModel}
            modelTestStatus={modelTestStatus}
            testingModelId={testingModelId}
          />
        </div>
      );
    }

    if (providerInfo.passthroughModels) {
      return (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Button
              size="sm"
              variant="secondary"
              icon="download"
              onClick={handleImportModels}
              disabled={!canImportModels || importingModels}
            >
              {importingModels ? t("importingModels") : t("importFromModels")}
            </Button>
            {autoSyncToggle}
            {clearAllButton}
            {!canImportModels && (
              <span className="text-xs text-text-muted">{t("addConnectionToImport")}</span>
            )}
          </div>
          <PassthroughModelsSection
            providerAlias={providerAlias}
            modelAliases={modelAliases}
            availableModels={syncedAvailableModels}
            customModels={modelMeta.customModels}
            copied={copied}
            onCopy={copy}
            onSetAlias={handleSetAlias}
            onDeleteAlias={handleDeleteAlias}
            t={t}
            effectiveModelNormalize={effectiveModelNormalize}
            effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
            getUpstreamHeadersRecord={getUpstreamHeadersRecordForModel}
            saveModelCompatFlags={saveModelCompatFlags}
            compatSavingModelId={compatSavingModelId}
            isModelHidden={effectiveModelHidden}
            onToggleHidden={(modelId, hidden) =>
              handleToggleModelHidden(providerStorageAlias, modelId, hidden)
            }
            onBulkToggleHidden={(modelIds, hidden) =>
              handleBulkToggleModelHidden(providerStorageAlias, modelIds, hidden)
            }
            bulkTogglePending={bulkVisibilityAction !== null}
            togglingModelId={togglingModelId}
            onTestModel={onTestModel}
            modelTestStatus={modelTestStatus}
            testingModelId={testingModelId}
          />
        </div>
      );
    }

    const importButton =
      providerId === "gemini" ? null : (
        <div className="flex items-center gap-2 mb-4">
          <Button
            size="sm"
            variant="secondary"
            icon="download"
            onClick={handleImportModels}
            disabled={!canImportModels || importingModels}
          >
            {importingModels ? t("importingModels") : t("importFromModels")}
          </Button>
          {autoSyncToggle}
          {!canImportModels && (
            <span className="text-xs text-text-muted">{t("addConnectionToImport")}</span>
          )}
        </div>
      );

    if (models.length === 0) {
      return (
        <div>
          {importButton}
          <p className="text-sm text-text-muted">{t("noModelsConfigured")}</p>
        </div>
      );
    }
    const modelsWithVisibility = models.map((model) => ({
      ...model,
      isHidden: effectiveModelHidden(model.id),
    }));
    const filteredModels = modelsWithVisibility.filter((model) =>
      matchesModelCatalogQuery(modelFilter, {
        modelId: model.id,
        modelName: model.name,
        source: model.source,
      })
    );
    const activeCount = modelsWithVisibility.filter((m) => !m.isHidden).length;
    const hiddenFilteredCount = filteredModels.filter((m) => m.isHidden).length;
    const visibleFilteredCount = filteredModels.length - hiddenFilteredCount;
    return (
      <div>
        {importButton}
        {modelsWithVisibility.length > 0 && (
          <ModelVisibilityToolbar
            t={t}
            filterValue={modelFilter}
            onFilterChange={setModelFilter}
            activeCount={activeCount}
            totalCount={modelsWithVisibility.length}
            onSelectAll={() =>
              handleBulkToggleModelHidden(
                providerId,
                filteredModels.map((model) => model.id),
                false
              )
            }
            onDeselectAll={() =>
              handleBulkToggleModelHidden(
                providerId,
                filteredModels.map((model) => model.id),
                true
              )
            }
            selectAllDisabled={hiddenFilteredCount === 0 || bulkVisibilityAction !== null}
            deselectAllDisabled={visibleFilteredCount === 0 || bulkVisibilityAction !== null}
          />
        )}
        <div className="flex flex-wrap gap-3">
          {filteredModels.map((model) => {
            return (
              <ModelRow
                key={model.id}
                model={model}
                fullModel={`${providerDisplayAlias}/${model.id}`}
                provider={providerId}
                copied={copied}
                onCopy={copy}
                t={t}
                showDeveloperToggle
                effectiveModelNormalize={effectiveModelNormalize}
                effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
                getUpstreamHeadersRecord={(p) => getUpstreamHeadersRecordForModel(model.id, p)}
                saveModelCompatFlags={saveModelCompatFlags}
                compatDisabled={compatSavingModelId === model.id}
                onToggleHidden={(modelId, hidden) =>
                  handleToggleModelHidden(providerId, modelId, hidden)
                }
                togglingHidden={togglingModelId === model.id}
                onTestModel={onTestModel}
                testStatus={modelTestStatus[model.id] || null}
                testingModel={testingModelId === model.id}
              />
            );
          })}
          {filteredModels.length === 0 && modelFilter && (
            <p className="text-sm text-text-muted py-2">
              {providerText(t, "noModelsMatch", `No models match "${modelFilter}"`, {
                filter: modelFilter,
              })}
            </p>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (!providerInfo) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted">{t("providerNotFound")}</p>
        <Link href="/dashboard/providers" className="text-primary mt-4 inline-block">
          {t("backToProviders")}
        </Link>
      </div>
    );
  }

  // OpenAI/Anthropic compatible providers use their specialized pseudo-provider icons.
  const getHeaderIconProviderId = () => {
    if (isOpenAICompatible && providerInfo.apiType) {
      return providerInfo.apiType === "responses" ? "oai-r" : "oai-cc";
    }
    if (isAnthropicProtocolCompatible) {
      return "anthropic-m";
    }
    return providerInfo.id;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/providers"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors mb-4"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          {t("backToProviders")}
        </Link>
        <div className="flex items-center gap-4">
          <div
            className="rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${providerInfo.color}15` }}
          >
            <ProviderIcon providerId={getHeaderIconProviderId()} size={48} type="color" />
          </div>
          <div>
            {providerInfo.website ? (
              <a
                href={providerInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl font-semibold tracking-tight hover:underline inline-flex items-center gap-2"
                style={{ color: providerInfo.color }}
              >
                {providerInfo.name}
                <span className="material-symbols-outlined text-lg opacity-60">open_in_new</span>
              </a>
            ) : (
              <h1 className="text-3xl font-semibold tracking-tight">{providerInfo.name}</h1>
            )}
            <div className="flex items-center gap-2">
              <p className="text-text-muted">
                {t("connectionCountLabel", { count: connections.length })}
              </p>
              <EmailPrivacyToggle size="md" />
              {(providerId === "inner-ai" || providerId === "adapta-web") && (
                <button
                  onClick={() => setShowTutorialModal(true)}
                  className="text-sm font-medium underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity"
                  style={{ color: providerInfo.color }}
                >
                  Tutorial
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {providerId === "zed" && (
        <>
          <Card>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  Import from Zed Keychain
                </h2>
                <p className="text-sm text-text-muted mt-1">
                  Discover AI provider credentials (OpenAI, Anthropic, Google, Mistral, xAI) that
                  Zed IDE stored in the OS keychain and import them as connections. Requires Zed IDE
                  installed on this machine.
                </p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                icon={importingZed ? "sync" : "download"}
                onClick={handleZedImport}
                disabled={importingZed}
              >
                {importingZed ? "Importing…" : "Import from Zed"}
              </Button>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-3">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => setShowZedManual((v) => !v)}
              >
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                  Manual Token Import
                </h2>
                <span className="material-symbols-outlined text-[18px] text-text-muted">
                  {showZedManual ? "expand_less" : "expand_more"}
                </span>
              </button>
              {showZedManual && (
                <div className="flex flex-col gap-3 mt-1">
                  <p className="text-sm text-text-muted">
                    Use this when OmniRoute runs in Docker or the keychain is unavailable. Paste the
                    API key that Zed stored under{" "}
                    <code className="font-mono text-xs">~/.config/zed/settings.json</code> or copy
                    it from the Zed AI settings panel.
                  </p>
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <select
                      className="input input-sm"
                      value={zedManualProvider}
                      onChange={(e) => setZedManualProvider(e.target.value)}
                    >
                      <option value="openai">OpenAI</option>
                      <option value="anthropic">Anthropic</option>
                      <option value="google">Google</option>
                      <option value="mistral">Mistral</option>
                      <option value="xai">xAI</option>
                      <option value="openrouter">OpenRouter</option>
                      <option value="deepseek">DeepSeek</option>
                    </select>
                    <input
                      type="password"
                      className="input input-sm flex-1"
                      placeholder="Paste API key…"
                      value={zedManualToken}
                      onChange={(e) => setZedManualToken(e.target.value)}
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={importingZedManual ? "sync" : "upload"}
                      onClick={handleZedManualImport}
                      disabled={importingZedManual || !zedManualToken.trim()}
                    >
                      {importingZedManual ? "Saving…" : "Import"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </>
      )}

      {isCompatible && providerNode && (
        <Card>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                {isCcCompatible
                  ? t("ccCompatibleDetailsTitle")
                  : isAnthropicCompatible
                    ? t("anthropicCompatibleDetails")
                    : t("openaiCompatibleDetails")}
              </h2>
              <p className="text-sm text-text-muted">
                {getApiLabel()} · {(providerNode.baseUrl || "").replace(/\/$/, "")}/{getApiPath()}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                icon="add"
                onClick={() => gateConnectionFlow(() => setShowAddApiKeyModal(true))}
              >
                {t("add")}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                icon="edit"
                onClick={() => setShowEditNodeModal(true)}
              >
                {t("edit")}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                icon="delete"
                onClick={async () => {
                  if (
                    !confirm(
                      t("deleteCompatibleNodeConfirm", {
                        type: isCcCompatible
                          ? t("ccCompatibleLabel")
                          : isAnthropicCompatible
                            ? t("anthropic")
                            : t("openai"),
                      })
                    )
                  )
                    return;
                  try {
                    const res = await fetch(`/api/provider-nodes/${providerId}`, {
                      method: "DELETE",
                    });
                    if (res.ok) {
                      router.push("/dashboard/providers");
                    }
                  } catch (error) {
                    console.log("Error deleting provider node:", error);
                  }
                }}
              >
                {t("delete")}
              </Button>
            </div>
          </div>
          {isCcCompatible && (
            <div className="mb-4 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-text-muted">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined mt-0.5 text-[18px] text-amber-500">
                  warning
                </span>
                <p>{t("ccCompatibleValidationHint")}</p>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Connections */}
      {!isUpstreamProxyProvider && isFreeNoAuth && <NoAuthProviderCard />}
      {!isUpstreamProxyProvider && !isFreeNoAuth && (
        <Card>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">{t("connections")}</h2>
              {providerId === "codex" && (
                <div title={t("providerDetailFastTierTooltip")}>
                  <Toggle
                    size="sm"
                    checked={codexGlobalFastServiceTier}
                    onChange={handleToggleCodexGlobalFastServiceTier}
                    disabled={savingCodexGlobalFastServiceTier}
                    label={t("providerDetailFastDefaultLabel")}
                    ariaLabel="Toggle Codex Fast default"
                    className="rounded-lg border border-sky-500/20 bg-sky-500/5 px-2 py-1"
                  />
                </div>
              )}
              {/* Provider-level proxy indicator/button */}
              <button
                onClick={() =>
                  setProxyTarget({
                    level: "provider",
                    id: providerId,
                    label: providerInfo?.name || providerId,
                  })
                }
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                  proxyConfig?.providers?.[providerId]
                    ? "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25"
                    : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                }`}
                title={
                  proxyConfig?.providers?.[providerId]
                    ? t("providerProxyTitleConfigured", {
                        host: proxyConfig.providers[providerId].host || t("configured"),
                      })
                    : t("providerProxyConfigureHint")
                }
              >
                <span className="material-symbols-outlined text-[14px]">vpn_lock</span>
                {proxyConfig?.providers?.[providerId]
                  ? proxyConfig.providers[providerId].host || t("providerProxy")
                  : t("providerProxy")}
              </button>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
              {connections.length > 1 && (
                <button
                  onClick={handleBatchTestAll}
                  disabled={batchTesting || !!retestingId}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    batchTesting
                      ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
                      : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
                  }`}
                  title={t("testAll")}
                  aria-label={t("testAll")}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {batchTesting ? "sync" : "play_arrow"}
                  </span>
                  {batchTesting ? t("testing") : t("testAll")}
                </button>
              )}
              {!isCompatible ? (
                <>
                  {isCommandCode ? (
                    <>
                      <Button
                        size="sm"
                        icon="open_in_new"
                        loading={
                          commandCodeAuthState.phase === "starting" ||
                          commandCodeAuthState.phase === "polling" ||
                          commandCodeAuthState.phase === "applying"
                        }
                        onClick={() => gateConnectionFlow(handleOpenCommandCodeConnect)}
                      >
                        Connect
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        icon="add"
                        onClick={() => gateConnectionFlow(() => setShowAddApiKeyModal(true))}
                      >
                        Manual API key
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        icon="add"
                        onClick={() => gateConnectionFlow(openPrimaryAddFlow)}
                      >
                        {providerSupportsPat ? "Add PAT" : t("add")}
                      </Button>
                      {providerId === "qoder" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => gateConnectionFlow(() => setShowOAuthModal(true))}
                        >
                          Experimental OAuth
                        </Button>
                      )}
                      {providerId === "claude" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          icon="upload_file"
                          onClick={() => gateConnectionFlow(() => setImportClaudeModalOpen(true))}
                        >
                          {typeof t.has === "function" && t.has("importClaudeAuth")
                            ? t("importClaudeAuth")
                            : "Import auth"}
                        </Button>
                      )}
                      {providerId === "gemini-cli" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          icon="upload_file"
                          onClick={() => gateConnectionFlow(() => setImportGeminiModalOpen(true))}
                        >
                          {typeof t.has === "function" && t.has("importGeminiAuth")
                            ? t("importGeminiAuth")
                            : "Import auth"}
                        </Button>
                      )}
                    </>
                  )}
                </>
              ) : (
                connections.length === 0 && (
                  <Button
                    size="sm"
                    icon="add"
                    onClick={() => gateConnectionFlow(() => setShowAddApiKeyModal(true))}
                  >
                    {t("add")}
                  </Button>
                )
              )}
            </div>
          </div>

          {connections.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <span className="material-symbols-outlined text-[32px]">
                  {isOAuth ? "lock" : "key"}
                </span>
              </div>
              <p className="text-text-main font-medium mb-1">{t("noConnectionsYet")}</p>
              <p className="text-sm text-text-muted mb-4">{t("addFirstConnectionHint")}</p>
              {!isCompatible && (
                <div className="flex items-center justify-center gap-2">
                  {isCommandCode ? (
                    <>
                      <Button
                        icon="open_in_new"
                        loading={
                          commandCodeAuthState.phase === "starting" ||
                          commandCodeAuthState.phase === "polling" ||
                          commandCodeAuthState.phase === "applying"
                        }
                        onClick={() => gateConnectionFlow(handleOpenCommandCodeConnect)}
                      >
                        Connect
                      </Button>
                      <Button
                        variant="secondary"
                        icon="add"
                        onClick={() => gateConnectionFlow(() => setShowAddApiKeyModal(true))}
                      >
                        Manual API key
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button icon="add" onClick={() => gateConnectionFlow(openPrimaryAddFlow)}>
                        {providerSupportsPat ? "Add PAT" : t("addConnection")}
                      </Button>
                      {providerId === "qoder" && (
                        <Button
                          variant="secondary"
                          onClick={() => gateConnectionFlow(() => setShowOAuthModal(true))}
                        >
                          Experimental OAuth
                        </Button>
                      )}
                      {providerId === "codex" && (
                        <Button
                          variant="secondary"
                          icon="upload_file"
                          onClick={() => gateConnectionFlow(() => setImportCodexModalOpen(true))}
                        >
                          {typeof t.has === "function" && t.has("importCodexAuth")
                            ? t("importCodexAuth")
                            : "Import auth"}
                        </Button>
                      )}
                      {providerId === "claude" && (
                        <Button
                          variant="secondary"
                          icon="upload_file"
                          onClick={() => gateConnectionFlow(() => setImportClaudeModalOpen(true))}
                        >
                          {typeof t.has === "function" && t.has("importClaudeAuth")
                            ? t("importClaudeAuth")
                            : "Import auth"}
                        </Button>
                      )}
                      {providerId === "gemini-cli" && (
                        <Button
                          variant="secondary"
                          icon="upload_file"
                          onClick={() => gateConnectionFlow(() => setImportGeminiModalOpen(true))}
                        >
                          {typeof t.has === "function" && t.has("importGeminiAuth")
                            ? t("importGeminiAuth")
                            : "Import auth"}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            (() => {
              const sorted = [...connections].sort((a, b) => (a.priority || 0) - (b.priority || 0));
              const hasAnyTag = sorted.some(
                (c) => c.providerSpecificData?.tag as string | undefined
              );
              const allSelected = selectedIds.size === connections.length && connections.length > 0;
              const someSelected = selectedIds.size > 0 && selectedIds.size < connections.length;

              if (!hasAnyTag) {
                return (
                  <>
                    <div className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-t-lg border border-b-0 border-border">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={allSelected}
                          ref={(el) => {
                            if (el) el.indeterminate = someSelected;
                          }}
                          onChange={handleToggleSelectAll}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-text-muted">
                          {selectedIds.size > 0
                            ? `${selectedIds.size} selected`
                            : `${connections.length} accounts`}
                        </span>
                      </label>

                      {selectedIds.size > 0 && (
                        <Button
                          variant="danger"
                          size="sm"
                          icon="delete"
                          loading={batchDeleting}
                          onClick={handleBatchDelete}
                        >
                          {t("batchDeleteSelected", { count: selectedIds.size })}
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-col divide-y divide-black/[0.03] dark:divide-white/[0.03] border border-t-0 border-border rounded-b-lg overflow-hidden">
                      {sorted.map((conn, index) => (
                        <ConnectionRow
                          key={conn.id}
                          connection={conn}
                          isOAuth={conn.authType === "oauth"}
                          isClaude={providerId === "claude"}
                          codexFastGlobalEnabled={codexGlobalFastServiceTier}
                          isFirst={index === 0}
                          isLast={index === sorted.length - 1}
                          isSelected={selectedIds.has(conn.id)}
                          onToggleSelect={() => handleToggleSelectOne(conn.id)}
                          onMoveUp={() => handleSwapPriority(conn, sorted[index - 1])}
                          onMoveDown={() => handleSwapPriority(conn, sorted[index + 1])}
                          onToggleActive={(isActive) =>
                            handleUpdateConnectionStatus(conn.id, isActive)
                          }
                          onToggleRateLimit={(enabled) => handleToggleRateLimit(conn.id, enabled)}
                          onToggleClaudeExtraUsage={(enabled) =>
                            handleToggleClaudeExtraUsage(conn.id, enabled)
                          }
                          isCodex={providerId === "codex"}
                          isGeminiCli={providerId === "gemini-cli"}
                          isCcCompatible={isCcCompatible}
                          cliproxyapiEnabled={cpaProviderEnabled}
                          onToggleCliproxyapiMode={(enabled) =>
                            handleToggleCliproxyapiMode(conn.id, enabled)
                          }
                          onToggleCodex5h={(enabled) =>
                            handleToggleCodexLimit(conn.id, "use5h", enabled)
                          }
                          onToggleCodexWeekly={(enabled) =>
                            handleToggleCodexLimit(conn.id, "useWeekly", enabled)
                          }
                          onRetest={() => handleRetestConnection(conn.id)}
                          isRetesting={retestingId === conn.id}
                          onEdit={() => {
                            setSelectedConnection(conn);
                            setShowEditModal(true);
                          }}
                          onDelete={() => handleDelete(conn.id)}
                          onReauth={
                            conn.authType === "oauth"
                              ? () => gateConnectionFlow(() => setShowOAuthModal(true, conn))
                              : undefined
                          }
                          onRefreshToken={
                            conn.authType === "oauth"
                              ? () => handleRefreshToken(conn.id)
                              : undefined
                          }
                          isRefreshing={refreshingId === conn.id}
                          onApplyCodexAuthLocal={
                            providerId === "codex"
                              ? () => setApplyCodexModalConnectionId(conn.id)
                              : undefined
                          }
                          isApplyingCodexAuthLocal={applyingCodexAuthId === conn.id}
                          onExportCodexAuthFile={
                            providerId === "codex"
                              ? () => handleExportCodexAuthFile(conn.id)
                              : undefined
                          }
                          isExportingCodexAuthFile={exportingCodexAuthId === conn.id}
                          onApplyClaudeAuthLocal={
                            providerId === "claude"
                              ? () => setApplyClaudeModalConnectionId(conn.id)
                              : undefined
                          }
                          isApplyingClaudeAuthLocal={applyingClaudeAuthId === conn.id}
                          onExportClaudeAuthFile={
                            providerId === "claude"
                              ? () => handleExportClaudeAuthFile(conn.id)
                              : undefined
                          }
                          isExportingClaudeAuthFile={exportingClaudeAuthId === conn.id}
                          onApplyGeminiAuthLocal={
                            providerId === "gemini-cli"
                              ? () => setApplyGeminiModalConnectionId(conn.id)
                              : undefined
                          }
                          isApplyingGeminiAuthLocal={applyingGeminiAuthId === conn.id}
                          onExportGeminiAuthFile={
                            providerId === "gemini-cli"
                              ? () => handleExportGeminiAuthFile(conn.id)
                              : undefined
                          }
                          isExportingGeminiAuthFile={exportingGeminiAuthId === conn.id}
                          onProxy={() =>
                            setProxyTarget({
                              level: "key",
                              id: conn.id,
                              label: pickDisplayValue(
                                [conn.name, conn.email],
                                emailsVisible,
                                conn.id
                              ),
                            })
                          }
                          hasProxy={!!connProxyMap[conn.id]?.proxy}
                          proxySource={connProxyMap[conn.id]?.level || null}
                          proxyHost={connProxyMap[conn.id]?.proxy?.host || null}
                        />
                      ))}
                    </div>
                  </>
                );
              }

              // Build ordered tag groups: untagged first, then alphabetically
              const groupMap = new Map<string, ConnectionRowConnection[]>();
              for (const conn of sorted) {
                const tag = (conn.providerSpecificData?.tag as string | undefined)?.trim() || "";
                if (!groupMap.has(tag)) groupMap.set(tag, []);
                groupMap.get(tag)!.push(conn);
              }
              const groupKeys = Array.from(groupMap.keys()).sort((a, b) => {
                if (a === "") return -1;
                if (b === "") return 1;
                return a.localeCompare(b);
              });

              return (
                <>
                  {selectedIds.size > 0 || connections.length > 0 ? (
                    <div className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-t-lg border border-b-0 border-border">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={allSelected}
                          ref={(el) => {
                            if (el) el.indeterminate = someSelected;
                          }}
                          onChange={handleToggleSelectAll}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-text-muted">
                          {selectedIds.size > 0
                            ? `${selectedIds.size} selected`
                            : `${connections.length} accounts`}
                        </span>
                      </label>

                      {selectedIds.size > 0 && (
                        <Button
                          variant="danger"
                          size="sm"
                          icon="delete"
                          loading={batchDeleting}
                          onClick={handleBatchDelete}
                        >
                          {t("batchDeleteSelected", { count: selectedIds.size })}
                        </Button>
                      )}
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-0 border border-t-0 border-border rounded-b-lg overflow-hidden">
                    {groupKeys.map((tag, gi) => {
                      const groupConns = groupMap.get(tag)!;
                      return (
                        <div
                          key={tag || "__untagged__"}
                          className={
                            gi > 0
                              ? "border-t border-black/[0.06] dark:border-white/[0.06] mt-1 pt-1"
                              : ""
                          }
                        >
                          {tag && (
                            <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                              <span className="material-symbols-outlined text-[13px] text-text-muted/50">
                                label
                              </span>
                              <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted/60 select-none">
                                {tag}
                              </span>
                              <div className="flex-1 h-px bg-black/[0.04] dark:bg-white/[0.04]" />
                              <span className="text-[10px] text-text-muted/40">
                                {groupConns.length}
                              </span>
                            </div>
                          )}
                          <div className="flex flex-col divide-y divide-black/[0.03] dark:divide-white/[0.03]">
                            {groupConns.map((conn, index) => (
                              <ConnectionRow
                                key={conn.id}
                                connection={conn}
                                isOAuth={conn.authType === "oauth"}
                                isClaude={providerId === "claude"}
                                codexFastGlobalEnabled={codexGlobalFastServiceTier}
                                isFirst={gi === 0 && index === 0}
                                isLast={
                                  gi === groupKeys.length - 1 && index === groupConns.length - 1
                                }
                                isSelected={selectedIds.has(conn.id)}
                                onToggleSelect={() => handleToggleSelectOne(conn.id)}
                                onMoveUp={() =>
                                  handleSwapPriority(conn, sorted[sorted.indexOf(conn) - 1])
                                }
                                onMoveDown={() =>
                                  handleSwapPriority(conn, sorted[sorted.indexOf(conn) + 1])
                                }
                                onToggleActive={(isActive) =>
                                  handleUpdateConnectionStatus(conn.id, isActive)
                                }
                                onToggleRateLimit={(enabled) =>
                                  handleToggleRateLimit(conn.id, enabled)
                                }
                                onToggleClaudeExtraUsage={(enabled) =>
                                  handleToggleClaudeExtraUsage(conn.id, enabled)
                                }
                                isCodex={providerId === "codex"}
                                isGeminiCli={providerId === "gemini-cli"}
                                isCcCompatible={isCcCompatible}
                                cliproxyapiEnabled={cpaProviderEnabled}
                                onToggleCodex5h={(enabled) =>
                                  handleToggleCodexLimit(conn.id, "use5h", enabled)
                                }
                                onToggleCodexWeekly={(enabled) =>
                                  handleToggleCodexLimit(conn.id, "useWeekly", enabled)
                                }
                                onRetest={() => handleRetestConnection(conn.id)}
                                isRetesting={retestingId === conn.id}
                                onEdit={() => {
                                  setSelectedConnection(conn);
                                  setShowEditModal(true);
                                }}
                                onDelete={() => handleDelete(conn.id)}
                                onReauth={
                                  conn.authType === "oauth"
                                    ? () => gateConnectionFlow(() => setShowOAuthModal(true, conn))
                                    : undefined
                                }
                                onRefreshToken={
                                  conn.authType === "oauth"
                                    ? () => handleRefreshToken(conn.id)
                                    : undefined
                                }
                                isRefreshing={refreshingId === conn.id}
                                onApplyCodexAuthLocal={
                                  providerId === "codex"
                                    ? () => setApplyCodexModalConnectionId(conn.id)
                                    : undefined
                                }
                                isApplyingCodexAuthLocal={applyingCodexAuthId === conn.id}
                                onExportCodexAuthFile={
                                  providerId === "codex"
                                    ? () => handleExportCodexAuthFile(conn.id)
                                    : undefined
                                }
                                isExportingCodexAuthFile={exportingCodexAuthId === conn.id}
                                onApplyClaudeAuthLocal={
                                  providerId === "claude"
                                    ? () => setApplyClaudeModalConnectionId(conn.id)
                                    : undefined
                                }
                                isApplyingClaudeAuthLocal={applyingClaudeAuthId === conn.id}
                                onExportClaudeAuthFile={
                                  providerId === "claude"
                                    ? () => handleExportClaudeAuthFile(conn.id)
                                    : undefined
                                }
                                isExportingClaudeAuthFile={exportingClaudeAuthId === conn.id}
                                onApplyGeminiAuthLocal={
                                  providerId === "gemini-cli"
                                    ? () => setApplyGeminiModalConnectionId(conn.id)
                                    : undefined
                                }
                                isApplyingGeminiAuthLocal={applyingGeminiAuthId === conn.id}
                                onExportGeminiAuthFile={
                                  providerId === "gemini-cli"
                                    ? () => handleExportGeminiAuthFile(conn.id)
                                    : undefined
                                }
                                isExportingGeminiAuthFile={exportingGeminiAuthId === conn.id}
                                onProxy={() =>
                                  setProxyTarget({
                                    level: "key",
                                    id: conn.id,
                                    label: pickDisplayValue(
                                      [conn.name, conn.email],
                                      emailsVisible,
                                      conn.id
                                    ),
                                  })
                                }
                                hasProxy={!!connProxyMap[conn.id]?.proxy}
                                proxySource={connProxyMap[conn.id]?.level || null}
                                proxyHost={connProxyMap[conn.id]?.proxy?.host || null}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()
          )}
        </Card>
      )}

      {isUpstreamProxyProvider && (
        <Card>
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-lg font-semibold">
                {providerText(
                  t,
                  "upstreamProxyManagedTitle",
                  "Managed via Upstream Proxy Settings"
                )}
              </h2>
              <p className="text-sm text-text-muted mt-1">
                {providerText(
                  t,
                  "upstreamProxyManagedDescription",
                  "CLIProxyAPI is configured as an upstream proxy layer, not as a direct provider connection. Manage the binary/runtime in CLI Tools and enable proxy routing on each provider via the provider proxy controls."
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/cli-tools"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-main hover:border-primary/40 hover:text-text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base">terminal</span>
                {t("openCliTools")}
              </Link>
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-main hover:border-primary/40 hover:text-text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base">settings</span>
                {t("openSettings")}
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Models — hidden for search providers (they don't have models) */}
      {!isSearchProvider && !isUpstreamProxyProvider && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">{t("availableModels")}</h2>
          {renderModelsSection()}

          {/* Custom Models — available for all providers */}
          <CustomModelsSection
            providerId={providerId}
            providerAlias={providerDisplayAlias}
            copied={copied}
            onCopy={copy}
            onModelsChanged={fetchProviderModelMeta}
          />
        </Card>
      )}

      {/* Search provider info */}
      {isSearchProvider && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">{t("searchProvider")}</h2>
          <p className="text-sm text-text-muted">{t("searchProviderDesc")}</p>
          {providerId === "perplexity-search" && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <span className="material-symbols-outlined text-sm text-blue-400">link</span>
              <p className="text-xs text-blue-300">{t("perplexitySearchSharedKeyInfo")}</p>
            </div>
          )}
          {providerId === "google-pse-search" && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="material-symbols-outlined text-sm text-amber-300">tune</span>
              <p className="text-xs text-amber-200">{t("googlePseInfo")}</p>
            </div>
          )}
          {providerId === "searxng-search" && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="material-symbols-outlined text-sm text-emerald-300">dns</span>
              <p className="text-xs text-emerald-200">{t("searxngInfo")}</p>
            </div>
          )}
        </Card>
      )}

      {/* Playground panel — rendered for providers that declare serviceKinds */}
      <ProviderPlaygroundPanel providerId={providerId} />

      {/* Modals */}
      {showRiskNoticeModal && subscriptionRisk && (
        <RiskNoticeModal
          variant={providerInfo.riskNoticeVariant ?? "oauth"}
          providerId={providerId}
          providerName={providerInfo.name}
          onConfirm={handleConfirmRiskNotice}
          onCancel={handleCancelRiskNotice}
        />
      )}
      {!isUpstreamProxyProvider &&
        (providerId === "kiro" || providerId === "amazon-q" ? (
          <KiroOAuthWrapper
            isOpen={showOAuthModal}
            reauthConnection={reauthConnection}
            providerInfo={{ ...providerInfo, id: providerId }}
            onSuccess={handleOAuthSuccess}
            onClose={() => {
              setShowOAuthModal(false);
            }}
          />
        ) : providerId === "cursor" ? (
          <CursorAuthModal
            isOpen={showOAuthModal}
            reauthConnection={reauthConnection}
            onSuccess={handleOAuthSuccess}
            onClose={() => {
              setShowOAuthModal(false);
            }}
          />
        ) : (
          <OAuthModal
            isOpen={showOAuthModal}
            reauthConnection={reauthConnection}
            provider={providerId}
            providerInfo={providerInfo}
            onSuccess={handleOAuthSuccess}
            onClose={() => {
              setShowOAuthModal(false);
            }}
          />
        ))}
      {!isUpstreamProxyProvider && (
        <AddApiKeyModal
          isOpen={showAddApiKeyModal}
          provider={providerId}
          providerName={providerInfo.name}
          isCompatible={isCompatible}
          isAnthropic={isAnthropicProtocolCompatible}
          isCcCompatible={isCcCompatible}
          isCommandCode={isCommandCode}
          commandCodeAuthState={commandCodeAuthState}
          onStartCommandCodeAuth={handleStartCommandCodeAuth}
          onSave={handleSaveApiKey}
          onClose={handleCloseAddApiKeyModal}
        />
      )}
      {providerId === "codex" && applyCodexModalConnectionId && (
        <ApplyCodexAuthModal
          key={applyCodexModalConnectionId}
          connectionId={applyCodexModalConnectionId}
          inProgress={!!applyingCodexAuthId}
          onConfirm={handleApplyCodexAuthLocal}
          onClose={() => setApplyCodexModalConnectionId(null)}
        />
      )}
      {!isUpstreamProxyProvider && (
        <EditConnectionModal
          isOpen={showEditModal}
          connection={selectedConnection}
          onSave={handleUpdateConnection}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {!isUpstreamProxyProvider && isCompatible && (
        <EditCompatibleNodeModal
          isOpen={showEditNodeModal}
          node={providerNode}
          onSave={handleUpdateNode}
          onClose={() => setShowEditNodeModal(false)}
          isAnthropic={isAnthropicProtocolCompatible}
          isCcCompatible={isCcCompatible}
        />
      )}
      {/* Codex Import Auth Modal */}
      {providerId === "codex" && importCodexModalOpen && (
        <ImportCodexAuthModal
          key="import-codex-modal"
          onClose={() => setImportCodexModalOpen(false)}
          onSuccess={() => {
            setImportCodexModalOpen(false);
            fetchData();
          }}
        />
      )}
      {/* Claude Apply Auth Modal */}
      {providerId === "claude" && applyClaudeModalConnectionId && (
        <ApplyClaudeAuthModal
          key={applyClaudeModalConnectionId}
          connectionId={applyClaudeModalConnectionId}
          inProgress={!!applyingClaudeAuthId}
          onConfirm={handleApplyClaudeAuthLocal}
          onClose={() => setApplyClaudeModalConnectionId(null)}
        />
      )}
      {/* Claude Import Auth Modal */}
      {providerId === "claude" && importClaudeModalOpen && (
        <ImportClaudeAuthModal
          key="import-claude-modal"
          onClose={() => setImportClaudeModalOpen(false)}
          onSuccess={() => {
            setImportClaudeModalOpen(false);
            fetchData();
          }}
        />
      )}
      {/* Gemini Apply Auth Modal */}
      {providerId === "gemini-cli" && applyGeminiModalConnectionId && (
        <ApplyGeminiAuthModal
          key={applyGeminiModalConnectionId}
          connectionId={applyGeminiModalConnectionId}
          inProgress={!!applyingGeminiAuthId}
          onConfirm={handleApplyGeminiAuthLocal}
          onClose={() => setApplyGeminiModalConnectionId(null)}
        />
      )}
      {/* Gemini Import Auth Modal */}
      {providerId === "gemini-cli" && importGeminiModalOpen && (
        <ImportGeminiAuthModal
          key="import-gemini-modal"
          onClose={() => setImportGeminiModalOpen(false)}
          onSuccess={() => {
            setImportGeminiModalOpen(false);
            fetchData();
          }}
        />
      )}
      {/* Batch Test Results Modal */}
      {batchTestResults && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]"
          onClick={() => setBatchTestResults(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-bg-primary border border-border rounded-xl w-full max-w-[600px] max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b border-border bg-bg-primary/95 backdrop-blur-sm rounded-t-xl">
              <h3 className="font-semibold">{t("testResults")}</h3>
              <button
                onClick={() => setBatchTestResults(null)}
                className="p-1 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
                aria-label={t("close")}
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="p-5">
              {batchTestResults.error &&
              (!batchTestResults.results || batchTestResults.results.length === 0) ? (
                <div className="text-center py-6">
                  <span className="material-symbols-outlined text-red-500 text-[32px] mb-2 block">
                    error
                  </span>
                  <p className="text-sm text-red-400">{String(batchTestResults.error)}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {batchTestResults.summary && (
                    <div className="flex items-center gap-3 text-xs mb-1">
                      <span className="text-text-muted">{providerInfo?.name || providerId}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-medium">
                        {t("passedCount", { count: batchTestResults.summary.passed })}
                      </span>
                      {batchTestResults.summary.failed > 0 && (
                        <span className="px-2 py-0.5 rounded bg-red-500/15 text-red-400 font-medium">
                          {t("failedCount", { count: batchTestResults.summary.failed })}
                        </span>
                      )}
                      <span className="text-text-muted ml-auto">
                        {t("testedCount", { count: batchTestResults.summary.total })}
                      </span>
                    </div>
                  )}
                  {(batchTestResults.results || []).map((r: any, i: number) => (
                    <div
                      key={r.connectionId || i}
                      className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03]"
                    >
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          r.valid ? "text-emerald-500" : "text-red-500"
                        }`}
                      >
                        {r.valid ? "check_circle" : "error"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium">
                          {pickDisplayValue([r.connectionName], emailsVisible, r.connectionName)}
                        </span>
                      </div>
                      {r.latencyMs !== undefined && (
                        <span className="text-text-muted font-mono tabular-nums">
                          {t("millisecondsAbbr", { value: r.latencyMs })}
                        </span>
                      )}
                      <span
                        className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          r.valid
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        {r.valid ? t("okShort") : r.diagnosis?.type || t("errorShort")}
                      </span>
                    </div>
                  ))}
                  {(!batchTestResults.results || batchTestResults.results.length === 0) && (
                    <div className="text-center py-4 text-text-muted text-sm">
                      {t("noActiveConnectionsInGroup")}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Proxy Config Modal */}
      {proxyTarget && (
        <ProxyConfigModal
          isOpen={!!proxyTarget}
          onClose={() => setProxyTarget(null)}
          level={proxyTarget.level}
          levelId={proxyTarget.id}
          levelLabel={proxyTarget.label}
          onSaved={() => void loadConnProxies(connections)}
        />
      )}
      {/* Import Progress Modal */}
      <Modal
        isOpen={showImportModal}
        onClose={() => {
          if (importProgress.phase === "done" || importProgress.phase === "error") {
            setShowImportModal(false);
          }
        }}
        title={t("importingModelsTitle")}
        size="md"
        closeOnOverlay={false}
        showCloseButton={importProgress.phase === "done" || importProgress.phase === "error"}
      >
        <div className="flex flex-col gap-4">
          {/* Status text */}
          <div className="flex items-center gap-3">
            {importProgress.phase === "fetching" && (
              <span className="material-symbols-outlined text-primary animate-spin">
                progress_activity
              </span>
            )}
            {importProgress.phase === "importing" && (
              <span className="material-symbols-outlined text-primary animate-spin">
                progress_activity
              </span>
            )}
            {importProgress.phase === "done" && (
              <span className="material-symbols-outlined text-green-500">check_circle</span>
            )}
            {importProgress.phase === "error" && (
              <span className="material-symbols-outlined text-red-500">error</span>
            )}
            <span className="text-sm font-medium text-text-main">{importProgress.status}</span>
          </div>

          {/* Progress bar */}
          {(importProgress.phase === "importing" || importProgress.phase === "done") &&
            importProgress.total > 0 && (
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-muted">
                    {importProgress.current} / {importProgress.total}
                  </span>
                  <span className="text-xs text-text-muted">
                    {Math.round((importProgress.current / importProgress.total) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: `${(importProgress.current / importProgress.total) * 100}%`,
                      background:
                        importProgress.phase === "done"
                          ? "linear-gradient(90deg, #22c55e, #16a34a)"
                          : "linear-gradient(90deg, var(--color-primary), var(--color-primary-hover, var(--color-primary)))",
                    }}
                  />
                </div>
              </div>
            )}

          {/* Fetching indeterminate bar */}
          {importProgress.phase === "fetching" && (
            <div className="w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full animate-pulse"
                style={{
                  width: "60%",
                  background:
                    "linear-gradient(90deg, var(--color-primary), var(--color-primary-hover, var(--color-primary)))",
                }}
              />
            </div>
          )}

          {/* Error message */}
          {importProgress.phase === "error" && importProgress.error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{importProgress.error}</p>
            </div>
          )}

          {/* Log list */}
          {importProgress.logs.length > 0 && (
            <div className="max-h-48 overflow-y-auto rounded-lg bg-black/5 dark:bg-white/5 p-3 border border-black/5 dark:border-white/5">
              <div className="flex flex-col gap-1">
                {importProgress.logs.map((log, i) => (
                  <p
                    key={i}
                    className={`text-xs font-mono ${
                      log.startsWith("✓") ? "text-green-500 font-semibold" : "text-text-muted"
                    }`}
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Close button */}
          {importProgress.phase === "done" && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90 transition-opacity"
              >
                {t("close")}
              </button>
            </div>
          )}
        </div>
      </Modal>

      {/* Inner.ai Tutorial Modal */}
      {providerId === "inner-ai" && (
        <Modal
          isOpen={showTutorialModal}
          onClose={() => setShowTutorialModal(false)}
          title="Como conectar o Inner.ai"
        >
          <div className="flex flex-col gap-4 text-sm">
            <p className="text-text-muted">
              O Inner.ai requer o token de sessão <strong>e</strong> o seu e-mail de login. Cole os
              dois no campo de autenticação separados por um espaço.
            </p>
            <ol className="flex flex-col gap-3 list-none">
              {[
                {
                  step: 1,
                  title: "Acesse o Inner.ai e faça login",
                  desc: "Abra o Chrome e vá para app.innerai.com. Faça login com sua conta.",
                },
                {
                  step: 2,
                  title: "Abra o DevTools",
                  desc: "Pressione F12 (Windows/Linux) ou Cmd+Option+I (Mac) para abrir as ferramentas de desenvolvedor.",
                },
                {
                  step: 3,
                  title: "Navegue até Application → Cookies → .innerai.com",
                  desc: 'No painel do DevTools, clique na aba "Application". No painel esquerdo, expanda "Cookies" e clique em ".innerai.com".',
                },
                {
                  step: 4,
                  title: 'Copie o valor do cookie "token"',
                  desc: 'Procure na lista o cookie de nome "token". Clique duas vezes no campo "Value" e copie o valor completo (começa com "eyJ…").',
                },
                {
                  step: 5,
                  title: "Cole token + email no campo de autenticação",
                  desc: "No OmniRoute, cole o token, adicione um espaço e depois o seu e-mail de login do Inner.ai. Exemplo: eyJhbGc... seuemail@exemplo.com",
                },
              ].map(({ step, title, desc }) => (
                <li key={step} className="flex gap-3">
                  <span
                    className="flex-none w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: "#1A56DB" }}
                  >
                    {step}
                  </span>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-text-muted text-xs mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div
              className="rounded-lg px-4 py-3 text-xs"
              style={{
                background: "rgba(26,86,219,0.08)",
                border: "1px solid rgba(26,86,219,0.2)",
              }}
            >
              <strong style={{ color: "#1A56DB" }}>Formato:</strong>{" "}
              <code className="font-mono">eyJhbGc... seuemail@exemplo.com</code>
              <br />
              <span className="opacity-75">
                O token tem validade de ~360 dias. Se expirar, repita o processo acima.
              </span>
            </div>
          </div>
        </Modal>
      )}

      {/* Adapta Web — Tutorial Modal */}
      {providerId === "adapta-web" && (
        <Modal
          isOpen={showTutorialModal}
          onClose={() => setShowTutorialModal(false)}
          title="Como conectar o Adapta Web"
          size="md"
        >
          <div className="flex flex-col gap-5 text-sm">
            <p className="text-text-muted">
              O Adapta usa autenticação via Clerk. O token{" "}
              <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code> é um JWT
              de longa duração que permite renovar sessões automaticamente.
            </p>

            <ol className="flex flex-col gap-4 list-none">
              <li className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <p className="font-medium">Acesse o chat do Adapta</p>
                  <p className="text-text-muted mt-0.5">
                    Abra{" "}
                    <a
                      href="https://agent.adapta.one/agentic-chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-primary"
                    >
                      agent.adapta.one/agentic-chat
                    </a>{" "}
                    e faça login com sua conta Gold ou Business.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <p className="font-medium">Abra o DevTools</p>
                  <p className="text-text-muted mt-0.5">
                    Pressione{" "}
                    <kbd className="bg-surface-2 px-1.5 py-0.5 rounded text-xs font-mono">F12</kbd>{" "}
                    ou{" "}
                    <kbd className="bg-surface-2 px-1.5 py-0.5 rounded text-xs font-mono">
                      Cmd+Option+I
                    </kbd>{" "}
                    para abrir as Ferramentas do Desenvolvedor.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <div>
                  <p className="font-medium">Vá em Application → Cookies</p>
                  <p className="text-text-muted mt-0.5">
                    Na aba <strong>Application</strong> (Chrome/Edge) ou <strong>Storage</strong>{" "}
                    (Firefox), expanda <strong>Cookies</strong> e clique em{" "}
                    <code className="bg-surface-2 px-1 rounded font-mono text-xs">
                      .clerk.agent.adapta.one
                    </code>
                    .
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <div>
                  <p className="font-medium">
                    Copie o valor do cookie{" "}
                    <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code>
                  </p>
                  <p className="text-text-muted mt-0.5">
                    Localize o cookie chamado{" "}
                    <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code> na
                    lista. Clique nele e copie o conteúdo da coluna <strong>Value</strong> — começa
                    com <code className="bg-surface-2 px-1 rounded font-mono text-xs">eyJ…</code>.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  5
                </span>
                <div>
                  <p className="font-medium">Cole aqui e salve</p>
                  <p className="text-text-muted mt-0.5">
                    Clique em <strong>Add Connection</strong>, cole o valor do{" "}
                    <code className="bg-surface-2 px-1 rounded font-mono text-xs">__client</code> no
                    campo de API Key e salve. O OmniRoute renovará a sessão automaticamente.
                  </p>
                </div>
              </li>
            </ol>

            <div
              className="rounded-lg p-3 text-xs text-text-muted"
              style={{ backgroundColor: "rgba(110,58,211,0.08)", borderLeft: "3px solid #6E3AD3" }}
            >
              <strong>Dica:</strong> O cookie <code className="font-mono">__client</code> tem
              validade longa (meses). Só será necessário renová-lo se você sair da conta ou o Adapta
              invalidar a sessão.
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ModelRow({
  model,
  fullModel,
  provider,
  copied,
  onCopy,
  t,
  showDeveloperToggle = true,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  saveModelCompatFlags,
  compatDisabled,
  onToggleHidden,
  togglingHidden,
  onTestModel,
  testStatus,
  testingModel,
}: ModelRowProps) {
  const isHidden = Boolean(model.isHidden);
  return (
    <div
      className={`flex min-w-[220px] max-w-md items-center gap-2 rounded-lg border border-border px-3 py-2 hover:bg-sidebar/50 transition-opacity ${
        isHidden ? "opacity-50" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <span
          className="material-symbols-outlined shrink-0 text-base"
          style={{ color: isHidden ? "var(--color-text-muted)" : undefined }}
        >
          smart_toy
        </span>
        <code className="rounded bg-sidebar px-1.5 py-0.5 font-mono text-xs text-text-muted">
          {fullModel}
        </code>
        <ModelSourceBadge source={model.source} />
        <button
          onClick={() => onCopy(fullModel, `model-${model.id}`)}
          className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary"
          title={t("copyModel")}
        >
          <span className="material-symbols-outlined text-sm">
            {copied === `model-${model.id}` ? "check" : "content_copy"}
          </span>
        </button>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {onTestModel && (
          <button
            onClick={() => onTestModel(model.id, fullModel)}
            disabled={testingModel}
            className={`rounded p-0.5 hover:bg-sidebar transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${testStatus === "ok" ? "text-green-500" : testStatus === "error" ? "text-red-500" : "text-text-muted hover:text-primary"}`}
            title={
              testingModel
                ? t("testingModel")
                : testStatus === "ok"
                  ? "OK"
                  : testStatus === "error"
                    ? "Error"
                    : t("testModel")
            }
          >
            {testingModel ? (
              <span className="material-symbols-outlined text-sm animate-spin">
                progress_activity
              </span>
            ) : testStatus === "ok" ? (
              <span className="material-symbols-outlined text-sm">check_circle</span>
            ) : testStatus === "error" ? (
              <span className="material-symbols-outlined text-sm">error</span>
            ) : (
              <span className="material-symbols-outlined text-sm">play_circle</span>
            )}
          </button>
        )}
        {onToggleHidden && (
          <button
            onClick={() => onToggleHidden(model.id, !isHidden)}
            disabled={togglingHidden}
            className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed"
            title={
              isHidden
                ? providerText(t, "showModel", "Show model")
                : providerText(t, "hideModel", "Hide model")
            }
          >
            <span className="material-symbols-outlined text-sm">
              {isHidden ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
        <ModelCompatPopover
          t={t}
          effectiveModelNormalize={(p) => effectiveModelNormalize(model.id, p)}
          effectiveModelPreserveDeveloper={(p) => effectiveModelPreserveDeveloper(model.id, p)}
          getUpstreamHeadersRecord={getUpstreamHeadersRecord}
          onCompatPatch={(protocol, payload) =>
            saveModelCompatFlags(model.id, { compatByProtocol: { [protocol]: payload } })
          }
          showDeveloperToggle={showDeveloperToggle}
          disabled={compatDisabled}
        />
      </div>
    </div>
  );
}

function ModelVisibilityToolbar({
  t,
  filterValue,
  onFilterChange,
  activeCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  selectAllDisabled,
  deselectAllDisabled,
}: {
  t: ((key: string, values?: Record<string, unknown>) => string) & {
    has?: (key: string) => boolean;
  };
  filterValue: string;
  onFilterChange: (value: string) => void;
  activeCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  selectAllDisabled?: boolean;
  deselectAllDisabled?: boolean;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <div className="relative min-w-[220px] flex-1">
        <span className="material-symbols-outlined pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[15px] text-text-muted">
          search
        </span>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder={providerText(t, "filterModels", "Filter models…")}
          className="w-full rounded-lg border border-border bg-sidebar/50 py-1.5 pl-7 pr-3 text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <button
        onClick={onSelectAll}
        disabled={selectAllDisabled}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1 text-[12px] text-text-main disabled:cursor-not-allowed disabled:opacity-50"
        title={providerText(t, "selectAllModels", "Select all")}
      >
        <span className="material-symbols-outlined text-[16px]">done_all</span>
        <span>{providerText(t, "selectAllModels", "Select all")}</span>
      </button>
      <button
        onClick={onDeselectAll}
        disabled={deselectAllDisabled}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1 text-[12px] text-text-main disabled:cursor-not-allowed disabled:opacity-50"
        title={providerText(t, "deselectAllModels", "Deselect all")}
      >
        <span className="material-symbols-outlined text-[16px]">remove_done</span>
        <span>{providerText(t, "deselectAllModels", "Deselect all")}</span>
      </button>
      <span className="whitespace-nowrap text-xs text-text-muted">
        {providerText(t, "modelsActiveCount", "{active}/{total} active", {
          active: activeCount,
          total: totalCount,
        })}
      </span>
    </div>
  );
}

function PassthroughModelsSection({
  providerAlias,
  modelAliases,
  availableModels = [],
  customModels = [],
  copied,
  onCopy,
  onSetAlias,
  onDeleteAlias,
  t,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  saveModelCompatFlags,
  compatSavingModelId,
  isModelHidden,
  onToggleHidden,
  onBulkToggleHidden,
  bulkTogglePending,
  togglingModelId,
  onTestModel,
  modelTestStatus,
  testingModelId,
}: PassthroughModelsSectionProps) {
  const [newModel, setNewModel] = useState("");
  const [adding, setAdding] = useState(false);
  const [modelFilter, setModelFilter] = useState("");
  const customModelMap = useMemo(() => buildCompatMap(customModels), [customModels]);

  const providerAliases = useMemo(
    () =>
      Object.entries(modelAliases).filter(([, model]: [string, any]) =>
        (model as string).startsWith(`${providerAlias}/`)
      ),
    [modelAliases, providerAlias]
  );

  const allModels = useMemo(() => {
    const prefix = `${providerAlias}/`;
    const aliasByModelId = new Map<string, string>();
    const fullModelByModelId = new Map<string, string>();
    const rows: Array<{
      modelId: string;
      fullModel: string;
      alias: string | null;
      displayName: string;
      source: string;
      isHidden: boolean;
    }> = [];
    const seenModelIds = new Set<string>();

    for (const [alias, fullModel] of providerAliases) {
      const fmStr = fullModel as string;
      const modelId = fmStr.startsWith(prefix) ? fmStr.slice(prefix.length) : fmStr;
      aliasByModelId.set(modelId, alias as string);
      fullModelByModelId.set(modelId, fmStr);
    }

    const addModel = (model: CompatModelRow, source: string) => {
      if (!model?.id || seenModelIds.has(model.id)) return;
      const fullModel = fullModelByModelId.get(model.id) || `${providerAlias}/${model.id}`;
      rows.push({
        modelId: model.id,
        fullModel,
        alias: aliasByModelId.get(model.id) || null,
        displayName: model.name || model.id,
        source,
        isHidden: isModelHidden(model.id),
      });
      seenModelIds.add(model.id);
    };

    for (const model of availableModels) {
      addModel(model, "imported");
    }

    for (const model of customModels) {
      addModel(
        model,
        normalizeModelCatalogSource(model.source) === "imported" ? "imported" : "custom"
      );
    }

    for (const [alias, fullModel] of providerAliases) {
      const fmStr = fullModel as string;
      const modelId = fmStr.startsWith(prefix) ? fmStr.slice(prefix.length) : fmStr;
      if (!modelId || seenModelIds.has(modelId)) continue;
      const customModel = customModelMap.get(modelId);
      rows.push({
        modelId,
        fullModel: fmStr,
        alias: alias as string,
        displayName: alias as string,
        source: customModel ? customModel.source || "custom" : "alias",
        isHidden: isModelHidden(modelId),
      });
      seenModelIds.add(modelId);
    }

    return rows;
  }, [
    availableModels,
    customModelMap,
    customModels,
    isModelHidden,
    providerAlias,
    providerAliases,
  ]);
  const filteredModels = allModels.filter((model) =>
    matchesModelCatalogQuery(modelFilter, {
      modelId: model.modelId,
      modelName: model.displayName,
      alias: model.alias,
      source: model.source,
    })
  );
  const activeCount = allModels.filter((model) => !model.isHidden).length;
  const hiddenFilteredCount = filteredModels.filter((model) => model.isHidden).length;
  const visibleFilteredCount = filteredModels.length - hiddenFilteredCount;

  // Generate default alias from modelId (last part after /)
  const generateDefaultAlias = (modelId) => {
    const parts = modelId.split("/");
    return parts[parts.length - 1];
  };

  const handleAdd = async () => {
    if (!newModel.trim() || adding) return;
    const modelId = newModel.trim();
    const defaultAlias = generateDefaultAlias(modelId);

    // Check if alias already exists
    if (modelAliases[defaultAlias]) {
      alert(t("aliasExistsAlert", { alias: defaultAlias }));
      return;
    }

    setAdding(true);
    try {
      await onSetAlias(modelId, defaultAlias);
      setNewModel("");
    } catch (error) {
      console.log("Error adding model:", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-muted">{t("openRouterAnyModelHint")}</p>

      {/* Add new model */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label htmlFor="new-model-input" className="text-xs text-text-muted mb-1 block">
            {t("modelIdFromOpenRouter")}
          </label>
          <input
            id="new-model-input"
            type="text"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder={t("openRouterModelPlaceholder")}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
          />
        </div>
        <Button size="sm" icon="add" onClick={handleAdd} disabled={!newModel.trim() || adding}>
          {adding ? t("adding") : t("add")}
        </Button>
      </div>

      {/* Models list */}
      {allModels.length > 0 && (
        <div className="flex flex-col gap-3">
          <ModelVisibilityToolbar
            t={t}
            filterValue={modelFilter}
            onFilterChange={setModelFilter}
            activeCount={activeCount}
            totalCount={allModels.length}
            onSelectAll={() =>
              onBulkToggleHidden(
                filteredModels.map((model) => model.modelId),
                false
              )
            }
            onDeselectAll={() =>
              onBulkToggleHidden(
                filteredModels.map((model) => model.modelId),
                true
              )
            }
            selectAllDisabled={hiddenFilteredCount === 0 || bulkTogglePending}
            deselectAllDisabled={visibleFilteredCount === 0 || bulkTogglePending}
          />
          {filteredModels.map(({ modelId, fullModel, alias, isHidden, source }) => (
            <PassthroughModelRow
              key={fullModel as string}
              modelId={modelId}
              fullModel={fullModel}
              source={source}
              isHidden={isHidden}
              copied={copied}
              onCopy={onCopy}
              onDeleteAlias={source === "alias" && alias ? () => onDeleteAlias(alias) : undefined}
              t={t}
              showDeveloperToggle
              effectiveModelNormalize={effectiveModelNormalize}
              effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
              getUpstreamHeadersRecord={(p) => getUpstreamHeadersRecord(modelId, p)}
              saveModelCompatFlags={saveModelCompatFlags}
              compatDisabled={compatSavingModelId === modelId}
              onToggleHidden={onToggleHidden}
              togglingHidden={togglingModelId === modelId}
            />
          ))}
          {filteredModels.length === 0 && modelFilter && (
            <p className="py-2 text-sm text-text-muted">
              {providerText(t, "noModelsMatch", `No models match "${modelFilter}"`, {
                filter: modelFilter,
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function PassthroughModelRow({
  modelId,
  fullModel,
  source,
  isHidden,
  copied,
  onCopy,
  onDeleteAlias,
  t,
  showDeveloperToggle = true,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  saveModelCompatFlags,
  compatDisabled,
  onToggleHidden,
  togglingHidden,
  onTestModel,
  testStatus,
  testingModel,
}: PassthroughModelRowProps) {
  return (
    <div
      className={`flex gap-0 rounded-lg border border-border p-3 transition-opacity hover:bg-sidebar/50 ${
        isHidden ? "opacity-50" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span
          className="material-symbols-outlined shrink-0 text-base text-text-muted"
          style={{ color: isHidden ? "var(--color-text-muted)" : undefined }}
        >
          smart_toy
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{modelId}</p>
          <div className="mt-1 flex flex-wrap items-center gap-1">
            <code className="rounded bg-sidebar px-1.5 py-0.5 font-mono text-xs text-text-muted">
              {fullModel}
            </code>
            <ModelSourceBadge source={source} />
            <button
              onClick={() => onCopy(fullModel, `model-${modelId}`)}
              className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary"
              title={t("copyModel")}
            >
              <span className="material-symbols-outlined text-sm">
                {copied === `model-${modelId}` ? "check" : "content_copy"}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1 self-start">
        {onTestModel && (
          <button
            onClick={() => onTestModel(modelId, fullModel)}
            disabled={testingModel}
            className={`rounded p-0.5 hover:bg-sidebar transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${testStatus === "ok" ? "text-green-500" : testStatus === "error" ? "text-red-500" : "text-text-muted hover:text-primary"}`}
            title={
              testingModel
                ? t("testingModel")
                : testStatus === "ok"
                  ? "OK"
                  : testStatus === "error"
                    ? "Error"
                    : t("testModel")
            }
          >
            {testingModel ? (
              <span className="material-symbols-outlined text-sm animate-spin">
                progress_activity
              </span>
            ) : testStatus === "ok" ? (
              <span className="material-symbols-outlined text-sm">check_circle</span>
            ) : testStatus === "error" ? (
              <span className="material-symbols-outlined text-sm">error</span>
            ) : (
              <span className="material-symbols-outlined text-sm">play_circle</span>
            )}
          </button>
        )}
        {onToggleHidden && (
          <button
            onClick={() => onToggleHidden(modelId, !isHidden)}
            disabled={togglingHidden}
            className="rounded p-0.5 text-text-muted hover:bg-sidebar hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            title={
              isHidden
                ? providerText(t, "showModel", "Show model")
                : providerText(t, "hideModel", "Hide model")
            }
          >
            <span className="material-symbols-outlined text-sm">
              {isHidden ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
        <ModelCompatPopover
          t={t}
          effectiveModelNormalize={(p) => effectiveModelNormalize(modelId, p)}
          effectiveModelPreserveDeveloper={(p) => effectiveModelPreserveDeveloper(modelId, p)}
          getUpstreamHeadersRecord={getUpstreamHeadersRecord}
          onCompatPatch={(protocol, payload) =>
            saveModelCompatFlags(modelId, { compatByProtocol: { [protocol]: payload } })
          }
          showDeveloperToggle={showDeveloperToggle}
          disabled={compatDisabled}
        />
        {onDeleteAlias && (
          <button
            onClick={onDeleteAlias}
            className="rounded p-1 text-red-500 hover:bg-red-50"
            title={t("removeModel")}
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ============ Custom Models Section (for ALL providers) ============

function CustomModelsSection({
  providerId,
  providerAlias,
  copied,
  onCopy,
  onModelsChanged,
}: CustomModelsSectionProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const [customModels, setCustomModels] = useState<CompatModelRow[]>([]);
  const [modelCompatOverrides, setModelCompatOverrides] = useState<
    Array<CompatModelRow & { id: string }>
  >([]);
  const [newModelId, setNewModelId] = useState("");
  const [newModelName, setNewModelName] = useState("");
  const [newApiFormat, setNewApiFormat] = useState("chat-completions");
  const [newEndpoints, setNewEndpoints] = useState(["chat"]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingModelId, setEditingModelId] = useState<string | null>(null);
  const [editingApiFormat, setEditingApiFormat] = useState("chat-completions");
  const [editingEndpoints, setEditingEndpoints] = useState<string[]>(["chat"]);
  const [savingModelId, setSavingModelId] = useState<string | null>(null);
  const [togglingModelId, setTogglingModelId] = useState<string | null>(null);

  const customMap = useMemo(() => buildCompatMap(customModels), [customModels]);
  const overrideMap = useMemo(() => buildCompatMap(modelCompatOverrides), [modelCompatOverrides]);

  const fetchCustomModels = useCallback(async () => {
    try {
      const res = await fetch(`/api/provider-models?provider=${encodeURIComponent(providerId)}`);
      if (res.ok) {
        const data = await res.json();
        setCustomModels(data.models || []);
        setModelCompatOverrides(data.modelCompatOverrides || []);
      }
    } catch (e) {
      console.error("Failed to fetch custom models:", e);
    } finally {
      setLoading(false);
    }
  }, [providerId]);

  useEffect(() => {
    fetchCustomModels();
  }, [fetchCustomModels]);

  const handleAdd = async () => {
    if (!newModelId.trim() || adding) return;
    setAdding(true);
    try {
      const res = await fetch("/api/provider-models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerId,
          modelId: newModelId.trim(),
          modelName: newModelName.trim() || undefined,
          apiFormat: newApiFormat,
          supportedEndpoints: newEndpoints,
        }),
      });
      if (res.ok) {
        setNewModelId("");
        setNewModelName("");
        setNewApiFormat("chat-completions");
        setNewEndpoints(["chat"]);
        await fetchCustomModels();
        onModelsChanged?.();
      }
    } catch (e) {
      console.error("Failed to add custom model:", e);
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (modelId) => {
    try {
      await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerId)}&model=${encodeURIComponent(modelId)}`,
        {
          method: "DELETE",
        }
      );
      await fetchCustomModels();
      onModelsChanged?.();
    } catch (e) {
      console.error("Failed to remove custom model:", e);
    }
  };

  const handleToggleHidden = async (modelId: string, hidden: boolean) => {
    setTogglingModelId(modelId);
    try {
      const res = await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerId)}&modelId=${encodeURIComponent(modelId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isHidden: hidden }),
        }
      );
      if (res.ok) {
        await fetchCustomModels();
        onModelsChanged?.();
      }
    } catch (e) {
      console.error("Failed to toggle model visibility:", e);
    } finally {
      setTogglingModelId(null);
    }
  };

  const beginEdit = (model) => {
    setEditingModelId(model.id);
    setEditingApiFormat(model.apiFormat || "chat-completions");
    setEditingEndpoints(
      Array.isArray(model.supportedEndpoints) && model.supportedEndpoints.length
        ? model.supportedEndpoints
        : ["chat"]
    );
  };

  const cancelEdit = () => {
    setEditingModelId(null);
    setEditingApiFormat("chat-completions");
    setEditingEndpoints(["chat"]);
    setSavingModelId(null);
  };

  const saveCustomCompat = async (
    modelId: string,
    patch: { compatByProtocol?: CompatByProtocolMap }
  ) => {
    setSavingModelId(modelId);
    try {
      const res = await fetch("/api/provider-models", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: providerId, modelId, ...patch }),
      });
      if (!res.ok) {
        const detail = await formatProviderModelsErrorResponse(res);
        notify.error(
          detail ? `${t("failedSaveCustomModel")} — ${detail}` : t("failedSaveCustomModel")
        );
        return;
      }
    } catch {
      notify.error(t("failedSaveCustomModel"));
      return;
    } finally {
      setSavingModelId(null);
    }
    try {
      await fetchCustomModels();
      onModelsChanged?.();
    } catch {
      /* refresh failure is non-critical — data was already saved */
    }
  };

  const saveEdit = async (modelId) => {
    if (!editingModelId || editingModelId !== modelId) return;
    if (!editingEndpoints.length) {
      notify.error("Select at least one supported endpoint");
      return;
    }

    setSavingModelId(modelId);
    try {
      const model = customModels.find((m) => m.id === modelId);
      const res = await fetch("/api/provider-models", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerId,
          modelId,
          modelName: model?.name || modelId,
          source: model?.source || "manual",
          apiFormat: editingApiFormat,
          supportedEndpoints: editingEndpoints,
        }),
      });

      if (!res.ok) {
        const detail = await formatProviderModelsErrorResponse(res);
        throw new Error(detail || "Failed to save model endpoint settings");
      }

      await fetchCustomModels();
      onModelsChanged?.();
      notify.success("Saved model endpoint settings");
      cancelEdit();
    } catch (e) {
      console.error("Failed to save custom model:", e);
      notify.error(
        e instanceof Error && e.message ? e.message : "Failed to save model endpoint settings"
      );
    } finally {
      setSavingModelId(null);
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-base text-primary">tune</span>
        {t("customModels")}
      </h3>
      <p className="text-xs text-text-muted mb-3">{t("customModelsHint")}</p>

      {/* Add form */}
      <div className="flex flex-col gap-3 mb-3">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label htmlFor="custom-model-id" className="text-xs text-text-muted mb-1 block">
              {t("modelId")}
            </label>
            <input
              id="custom-model-id"
              type="text"
              value={newModelId}
              onChange={(e) => setNewModelId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder={t("customModelPlaceholder")}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            />
          </div>
          <div className="w-40">
            <label htmlFor="custom-model-name" className="text-xs text-text-muted mb-1 block">
              {t("displayName")}
            </label>
            <input
              id="custom-model-name"
              type="text"
              value={newModelName}
              onChange={(e) => setNewModelName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder={t("optional")}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            />
          </div>
          <Button size="sm" icon="add" onClick={handleAdd} disabled={!newModelId.trim() || adding}>
            {adding ? t("adding") : t("add")}
          </Button>
        </div>

        {/* API Format + Supported Endpoints */}
        <div className="flex items-end gap-4 flex-wrap">
          <div className="w-48">
            <label htmlFor="custom-api-format" className="text-xs text-text-muted mb-1 block">
              API Format
            </label>
            <select
              id="custom-api-format"
              value={newApiFormat}
              onChange={(e) => setNewApiFormat(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            >
              <option value="chat-completions">{t("chatCompletions")}</option>
              <option value="responses">{t("responsesApi")}</option>
              <option value="embeddings">{t("embeddings")}</option>
              <option value="rerank">Rerank</option>
              <option value="audio-transcriptions">{t("audioTranscriptions")}</option>
              <option value="audio-speech">{t("audioSpeech")}</option>
              <option value="images-generations">{t("imagesGenerations")}</option>
            </select>
          </div>
          <div className="flex-1">
            <span className="text-xs text-text-muted mb-1 block">
              {t("supportedEndpointsLabel")}
            </span>
            <div className="flex items-center gap-3">
              {["chat", "embeddings", "rerank", "images", "audio"].map((ep) => (
                <label
                  key={ep}
                  className="flex items-center gap-1.5 text-xs text-text-main cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={newEndpoints.includes(ep)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewEndpoints((prev) => [...prev, ep]);
                      } else {
                        setNewEndpoints((prev) => prev.filter((x) => x !== ep));
                      }
                    }}
                    className="rounded border-border"
                  />
                  {ep === "chat"
                    ? `💬 ${t("supportedEndpointChat")}`
                    : ep === "embeddings"
                      ? `📐 ${t("supportedEndpointEmbeddings")}`
                      : ep === "rerank"
                        ? "Rerank"
                        : ep === "images"
                          ? `🖼️ ${t("supportedEndpointImages")}`
                          : `🔊 ${t("supportedEndpointAudio")}`}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-xs text-text-muted">{t("loading")}</p>
      ) : customModels.length > 0 ? (
        <div className="flex flex-col gap-2">
          {customModels.map((model) => {
            const fullModel = `${providerAlias}/${model.id}`;
            const copyKey = `custom-${model.id}`;
            return (
              <div
                key={model.id}
                className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-sidebar/50"
              >
                {editingModelId !== model.id && (
                  <span className="material-symbols-outlined text-base text-primary shrink-0">
                    tune
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{model.name || model.id}</p>
                  <div className="flex items-center gap-1 mt-1 flex-wrap">
                    <code className="text-xs text-text-muted font-mono bg-sidebar px-1.5 py-0.5 rounded">
                      {fullModel}
                    </code>
                    <button
                      onClick={() => onCopy(fullModel, copyKey)}
                      className="p-0.5 hover:bg-sidebar rounded text-text-muted hover:text-primary"
                      title={t("copyModel")}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copied === copyKey ? "check" : "content_copy"}
                      </span>
                    </button>
                    {model.apiFormat === "responses" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-medium">
                        {t("responses")}
                      </span>
                    )}
                    {model.supportedEndpoints?.includes("embeddings") && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 font-medium">
                        {`📐 ${t("supportedEndpointEmbeddings")}`}
                      </span>
                    )}
                    {model.supportedEndpoints?.includes("images") && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-medium">
                        {`🖼️ ${t("imagesShortLabel")}`}
                      </span>
                    )}
                    {model.supportedEndpoints?.includes("audio") && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 font-medium">
                        {`🔊 ${t("audioShortLabel")}`}
                      </span>
                    )}
                    {anyNormalizeCompatBadge(model.id, customMap, overrideMap) && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-500/15 text-slate-400 font-medium"
                        title={t("normalizeToolCallIdLabel")}
                      >
                        ID×9
                      </span>
                    )}
                    {anyNoPreserveCompatBadge(model.id, customMap, overrideMap) && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 font-medium"
                        title={t("compatDoNotPreserveDeveloper")}
                      >
                        {t("compatBadgeNoPreserve")}
                      </span>
                    )}
                    {anyUpstreamHeadersBadge(model.id, customMap, overrideMap) && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-400 font-medium"
                        title={t("compatUpstreamHeadersLabel")}
                      >
                        {t("compatBadgeUpstreamHeaders")}
                      </span>
                    )}
                  </div>

                  {editingModelId === model.id && (
                    <div className="mt-3 min-w-0 max-w-full rounded-lg border border-border bg-muted p-3 dark:bg-zinc-900">
                      <div className="flex min-w-0 flex-wrap items-end gap-x-3 gap-y-2">
                        <div className="w-[11rem] shrink-0 min-w-0">
                          <label className="text-xs text-text-muted mb-1 block">
                            {t("apiFormatLabel")}
                          </label>
                          <select
                            value={editingApiFormat}
                            onChange={(e) => setEditingApiFormat(e.target.value)}
                            className="w-full px-2.5 py-2 text-xs border border-border rounded-lg bg-background text-text-main focus:outline-none focus:border-primary"
                          >
                            <option value="chat-completions">{t("chatCompletions")}</option>
                            <option value="responses">{t("responsesApi")}</option>
                            <option value="embeddings">{t("embeddings")}</option>
                            <option value="rerank">Rerank</option>
                            <option value="audio-transcriptions">{t("audioTranscriptions")}</option>
                            <option value="audio-speech">{t("audioSpeech")}</option>
                            <option value="images-generations">{t("imagesGenerations")}</option>
                          </select>
                        </div>
                        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 overflow-x-auto overflow-y-visible [scrollbar-width:thin]">
                          <span className="text-xs text-text-muted shrink-0">
                            {t("supportedEndpointsLabel")}
                          </span>
                          <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 min-w-0">
                            {["chat", "embeddings", "rerank", "images", "audio"].map((ep) => (
                              <label
                                key={ep}
                                className="flex items-center gap-1.5 text-xs text-text-main cursor-pointer whitespace-nowrap"
                              >
                                <input
                                  type="checkbox"
                                  checked={editingEndpoints.includes(ep)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setEditingEndpoints((prev) =>
                                        prev.includes(ep) ? prev : [...prev, ep]
                                      );
                                    } else {
                                      setEditingEndpoints((prev) => prev.filter((x) => x !== ep));
                                    }
                                  }}
                                  className="rounded border-border"
                                />
                                {ep === "chat"
                                  ? `💬 ${t("supportedEndpointChat")}`
                                  : ep === "embeddings"
                                    ? `📐 ${t("supportedEndpointEmbeddings")}`
                                    : ep === "rerank"
                                      ? "Rerank"
                                      : ep === "images"
                                        ? `🖼️ ${t("supportedEndpointImages")}`
                                        : `🔊 ${t("supportedEndpointAudio")}`}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-wrap items-center gap-2 pb-0.5">
                          <Button
                            size="sm"
                            onClick={() => saveEdit(model.id)}
                            disabled={savingModelId === model.id}
                          >
                            {savingModelId === model.id ? t("saving") : t("save")}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={cancelEdit}>
                            {t("cancel")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => beginEdit(model)}
                    className="rounded p-1 text-text-muted hover:bg-sidebar hover:text-primary"
                    title={t("edit")}
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <ModelCompatPopover
                    t={t}
                    effectiveModelNormalize={(p) =>
                      effectiveNormalizeForProtocol(model.id, p, customMap, overrideMap)
                    }
                    effectiveModelPreserveDeveloper={(p) =>
                      effectivePreserveForProtocol(model.id, p, customMap, overrideMap)
                    }
                    getUpstreamHeadersRecord={(p) =>
                      effectiveUpstreamHeadersForProtocol(model.id, p, customMap, overrideMap)
                    }
                    onCompatPatch={(protocol, payload) =>
                      saveCustomCompat(model.id, {
                        compatByProtocol: { [protocol]: payload },
                      })
                    }
                    showDeveloperToggle
                    disabled={savingModelId === model.id}
                  />
                  <button
                    onClick={() => handleToggleHidden(model.id, !model.isHidden)}
                    disabled={togglingModelId === model.id}
                    className="rounded p-1 text-text-muted hover:bg-sidebar hover:text-primary disabled:opacity-50"
                    title={model.isHidden ? t("unhideModel") : t("hideModel")}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {model.isHidden ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                  <button
                    onClick={() => handleRemove(model.id)}
                    className="rounded p-1 text-red-500 hover:bg-red-50"
                    title={t("removeCustomModel")}
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-text-muted">{t("noCustomModels")}</p>
      )}
    </div>
  );
}

function CompatibleModelsSection({
  providerStorageAlias,
  providerDisplayAlias,
  modelAliases,
  availableModels = [],
  customModels = [],
  fallbackModels = [],
  description,
  inputLabel,
  inputPlaceholder,
  copied,
  onCopy,
  onSetAlias,
  onDeleteAlias,
  connections,
  isAnthropic,
  onImportWithProgress,
  t,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  saveModelCompatFlags,
  compatSavingModelId,
  onModelsChanged,
  allowImport,
  isModelHidden,
  onToggleHidden,
  onBulkToggleHidden,
  bulkTogglePending,
  togglingModelId,
  onTestModel,
  modelTestStatus,
  testingModelId,
}: CompatibleModelsSectionProps) {
  const [newModel, setNewModel] = useState("");
  const [adding, setAdding] = useState(false);
  const [importing, setImporting] = useState(false);
  const [modelFilter, setModelFilter] = useState("");
  const notify = useNotificationStore();
  const customModelMap = useMemo(() => buildCompatMap(customModels), [customModels]);

  const providerAliases = useMemo(
    () =>
      Object.entries(modelAliases).filter(([, model]: [string, any]) =>
        (model as string).startsWith(`${providerStorageAlias}/`)
      ),
    [modelAliases, providerStorageAlias]
  );

  const allModels = useMemo(() => {
    const prefix = `${providerStorageAlias}/`;
    const aliasByModelId = new Map<string, string>();
    const rows: Array<{
      modelId: string;
      alias: string | null;
      displayName: string;
      source: string;
      isHidden: boolean;
    }> = [];
    const seenModelIds = new Set<string>();

    for (const [alias, fullModel] of providerAliases) {
      const fmStr = fullModel as string;
      const modelId = fmStr.startsWith(prefix) ? fmStr.slice(prefix.length) : fmStr;
      aliasByModelId.set(modelId, alias as string);
    }

    const addModel = (model: CompatModelRow, source: string) => {
      if (!model?.id || seenModelIds.has(model.id)) return;
      rows.push({
        modelId: model.id,
        alias: aliasByModelId.get(model.id) || null,
        displayName: model.name || model.id,
        source,
        isHidden: isModelHidden(model.id),
      });
      seenModelIds.add(model.id);
    };

    for (const model of availableModels) {
      addModel(model, "imported");
    }

    for (const model of customModels) {
      addModel(
        model,
        normalizeModelCatalogSource(model.source) === "imported" ? "imported" : "custom"
      );
    }

    for (const model of fallbackModels) {
      addModel(model, "fallback");
    }

    for (const [alias, fullModel] of providerAliases) {
      const fmStr = fullModel as string;
      const modelId = fmStr.startsWith(prefix) ? fmStr.slice(prefix.length) : fmStr;
      if (!modelId || seenModelIds.has(modelId)) continue;
      const customModel = customModelMap.get(modelId);
      rows.push({
        modelId,
        alias: alias as string,
        displayName: alias as string,
        source: customModel ? customModel.source || "custom" : "alias",
        isHidden: isModelHidden(modelId),
      });
      seenModelIds.add(modelId);
    }

    return rows;
  }, [
    availableModels,
    customModelMap,
    customModels,
    fallbackModels,
    isModelHidden,
    providerAliases,
    providerStorageAlias,
  ]);
  const filteredModels = allModels.filter((model) =>
    matchesModelCatalogQuery(modelFilter, {
      modelId: model.modelId,
      modelName: model.displayName,
      alias: model.alias,
      source: model.source,
    })
  );
  const activeCount = allModels.filter((model) => !model.isHidden).length;
  const hiddenFilteredCount = filteredModels.filter((model) => model.isHidden).length;
  const visibleFilteredCount = filteredModels.length - hiddenFilteredCount;

  const resolveAlias = useCallback(
    (modelId: string, workingAliases: Record<string, string>) =>
      resolveManagedModelAlias({
        modelId,
        fullModel: `${providerStorageAlias}/${modelId}`,
        providerDisplayAlias,
        existingAliases: workingAliases,
      }),
    [providerDisplayAlias, providerStorageAlias]
  );

  const handleAdd = async () => {
    if (!newModel.trim() || adding) return;
    const modelId = newModel.trim();
    const resolvedAlias = resolveAlias(modelId, modelAliases);
    if (!resolvedAlias) {
      notify.error(t("allSuggestedAliasesExist"));
      return;
    }

    setAdding(true);
    try {
      // Save to customModels DB FIRST - only create alias if this succeeds
      const customModelRes = await fetch("/api/provider-models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerStorageAlias,
          modelId,
          modelName: modelId,
          source: "manual",
        }),
      });

      if (!customModelRes.ok) {
        let errorData: { error?: { message?: string } } = {};
        try {
          errorData = await customModelRes.json();
        } catch (jsonError) {
          console.error("Failed to parse error response from custom model API:", jsonError);
        }
        throw new Error(errorData.error?.message || t("failedSaveCustomModel"));
      }

      // Only create alias after customModel is saved successfully
      await onSetAlias(modelId, resolvedAlias, providerStorageAlias);
      setNewModel("");
      notify.success(t("modelAddedSuccess", { modelId }));
      onModelsChanged?.();
    } catch (error) {
      console.error("Error adding model:", error);
      notify.error(error instanceof Error ? error.message : t("failedAddModelTryAgain"));
    } finally {
      setAdding(false);
    }
  };

  const handleImport = async () => {
    if (!allowImport || importing) return;
    const activeConnection = connections.find((conn) => conn.isActive !== false);
    if (!activeConnection?.id) return;

    setImporting(true);
    try {
      await onImportWithProgress(activeConnection.id);
    } catch (error) {
      console.error("Error importing models:", error);
      notify.error(t("failedImportModelsTryAgain"));
    } finally {
      setImporting(false);
    }
  };

  const canImport = connections.some((conn) => conn.isActive !== false);

  // Handle delete: remove from both alias and customModels DB
  const handleDeleteModel = async (modelId: string, alias?: string | null) => {
    try {
      // Remove from customModels DB
      const res = await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerStorageAlias)}&model=${encodeURIComponent(modelId)}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        throw new Error(t("failedRemoveModelFromDatabase"));
      }
      // Also delete the alias
      if (alias) {
        await onDeleteAlias(alias);
      }
      notify.success(t("modelRemovedSuccess"));
      onModelsChanged?.();
    } catch (error) {
      console.error("Error deleting model:", error);
      notify.error(error instanceof Error ? error.message : t("failedDeleteModelTryAgain"));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-muted">{description}</p>

      <div className="flex items-end gap-2 flex-wrap">
        <div className="flex-1 min-w-[240px]">
          <label
            htmlFor="new-compatible-model-input"
            className="text-xs text-text-muted mb-1 block"
          >
            {inputLabel}
          </label>
          <input
            id="new-compatible-model-input"
            type="text"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder={inputPlaceholder}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
          />
        </div>
        <Button size="sm" icon="add" onClick={handleAdd} disabled={!newModel.trim() || adding}>
          {adding ? t("adding") : t("add")}
        </Button>
        {allowImport && (
          <Button
            size="sm"
            variant="secondary"
            icon="download"
            onClick={handleImport}
            disabled={!canImport || importing}
          >
            {importing ? t("importingModels") : t("importFromModels")}
          </Button>
        )}
      </div>

      {allowImport && !canImport && (
        <p className="text-xs text-text-muted">{t("addConnectionToImport")}</p>
      )}

      {allModels.length > 0 && (
        <div className="flex flex-col gap-3">
          <ModelVisibilityToolbar
            t={t}
            filterValue={modelFilter}
            onFilterChange={setModelFilter}
            activeCount={activeCount}
            totalCount={allModels.length}
            onSelectAll={() =>
              onBulkToggleHidden(
                filteredModels.map((model) => model.modelId),
                false
              )
            }
            onDeselectAll={() =>
              onBulkToggleHidden(
                filteredModels.map((model) => model.modelId),
                true
              )
            }
            selectAllDisabled={hiddenFilteredCount === 0 || bulkTogglePending}
            deselectAllDisabled={visibleFilteredCount === 0 || bulkTogglePending}
          />
          {filteredModels.map(({ modelId, alias, isHidden, source }) => (
            <PassthroughModelRow
              key={`${providerStorageAlias}:${modelId}`}
              modelId={modelId}
              fullModel={`${providerDisplayAlias}/${modelId}`}
              source={source}
              isHidden={isHidden}
              copied={copied}
              onCopy={onCopy}
              onDeleteAlias={
                source === "custom" || source === "manual"
                  ? () => handleDeleteModel(modelId, alias)
                  : source === "alias" && alias
                    ? () => onDeleteAlias(alias)
                    : undefined
              }
              t={t}
              showDeveloperToggle={!isAnthropic}
              effectiveModelNormalize={effectiveModelNormalize}
              effectiveModelPreserveDeveloper={effectiveModelPreserveDeveloper}
              getUpstreamHeadersRecord={(p) => getUpstreamHeadersRecord(modelId, p)}
              saveModelCompatFlags={saveModelCompatFlags}
              compatDisabled={compatSavingModelId === modelId}
              onToggleHidden={onToggleHidden}
              togglingHidden={togglingModelId === modelId}
            />
          ))}
          {filteredModels.length === 0 && modelFilter && (
            <p className="py-2 text-sm text-text-muted">
              {providerText(t, "noModelsMatch", `No models match "${modelFilter}"`, {
                filter: modelFilter,
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
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

const ERROR_TYPE_LABELS = {
  runtime_error: { labelKey: "errorTypeRuntime", variant: "warning" },
  upstream_auth_error: { labelKey: "errorTypeUpstreamAuth", variant: "error" },
  account_deactivated: { labelKey: "Account Deactivated", variant: "error" },
  auth_missing: { labelKey: "errorTypeMissingCredential", variant: "warning" },
  token_refresh_failed: { labelKey: "errorTypeRefreshFailed", variant: "warning" },
  token_expired: { labelKey: "errorTypeTokenExpired", variant: "warning" },
  upstream_rate_limited: { labelKey: "errorTypeRateLimited", variant: "warning" },
  upstream_unavailable: { labelKey: "errorTypeUpstreamUnavailable", variant: "error" },
  network_error: { labelKey: "errorTypeNetworkError", variant: "warning" },
  unsupported: { labelKey: "errorTypeTestUnsupported", variant: "default" },
  upstream_error: { labelKey: "errorTypeUpstreamError", variant: "error" },
  banned: { labelKey: "403 Banned", variant: "error" },
  credits_exhausted: { labelKey: "No Credits", variant: "warning" },
};

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

function ConnectionRow({
  connection,
  isOAuth,
  isClaude,
  isCodex,
  isGeminiCli,
  codexFastGlobalEnabled,
  isCcCompatible,
  cliproxyapiEnabled,
  isFirst,
  isLast,
  isSelected,
  onToggleSelect,
  onMoveUp,
  onMoveDown,
  onToggleActive,
  onToggleRateLimit,
  onToggleClaudeExtraUsage,
  onToggleCodex5h,
  onToggleCodexWeekly,
  onToggleCliproxyapiMode,
  onRetest,
  isRetesting,
  onEdit,
  onDelete,
  onReauth,
  onProxy,
  hasProxy,
  proxySource,
  proxyHost,
  onRefreshToken,
  isRefreshing,
  onApplyCodexAuthLocal,
  isApplyingCodexAuthLocal,
  onExportCodexAuthFile,
  isExportingCodexAuthFile,
  onApplyClaudeAuthLocal,
  isApplyingClaudeAuthLocal,
  onExportClaudeAuthFile,
  isExportingClaudeAuthFile,
  onApplyGeminiAuthLocal,
  isApplyingGeminiAuthLocal,
  onExportGeminiAuthFile,
  isExportingGeminiAuthFile,
}: ConnectionRowProps) {
  const t = useTranslations("providers");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const displayName = isOAuth
    ? pickDisplayValue(
        [connection.name, connection.email, connection.displayName],
        emailsVisible,
        t("oauthAccount")
      )
    : connection.name;
  const applyCodexAuthLabel =
    typeof t.has === "function" && t.has("applyCodexAuthLocal")
      ? t("applyCodexAuthLocal")
      : "Apply auth";
  const exportCodexAuthLabel =
    typeof t.has === "function" && t.has("exportCodexAuthFile")
      ? t("exportCodexAuthFile")
      : "Export auth";
  const applyClaudeAuthLabel =
    typeof t.has === "function" && t.has("applyClaudeAuthLocal")
      ? t("applyClaudeAuthLocal")
      : "Apply auth";
  const exportClaudeAuthLabel =
    typeof t.has === "function" && t.has("exportClaudeAuthFile")
      ? t("exportClaudeAuthFile")
      : "Export auth";
  const applyGeminiAuthLabel =
    typeof t.has === "function" && t.has("applyGeminiAuthLocal")
      ? t("applyGeminiAuthLocal")
      : "Apply auth";
  const exportGeminiAuthLabel =
    typeof t.has === "function" && t.has("exportGeminiAuthFile")
      ? t("exportGeminiAuthFile")
      : "Export auth";

  // Use useState + useEffect for impure Date.now() to avoid calling during render
  const [isCooldown, setIsCooldown] = useState(false);
  // T12: token expiry status — lazy init avoids calling Date.now() during render;
  // updates every 30s via interval only (no sync setState in effect body).
  // Prefer tokenExpiresAt (updated on each refresh) over expiresAt (original grant date).
  const effectiveExpiresAt = connection.tokenExpiresAt || connection.expiresAt;
  const getTokenMinsLeft = () => {
    if (!isOAuth || !effectiveExpiresAt) return null;
    const expiresMs = new Date(effectiveExpiresAt).getTime();
    return Math.floor((expiresMs - Date.now()) / 60000);
  };
  const [tokenMinsLeft, setTokenMinsLeft] = useState<number | null>(getTokenMinsLeft);

  useEffect(() => {
    if (!isOAuth || !effectiveExpiresAt) return;
    const update = () => {
      const expiresMs = new Date(effectiveExpiresAt).getTime();
      setTokenMinsLeft(Math.floor((expiresMs - Date.now()) / 60000));
    };
    update();
    const iv = setInterval(update, 30000);
    return () => clearInterval(iv);
  }, [isOAuth, effectiveExpiresAt]);

  useEffect(() => {
    const checkCooldown = () => {
      const cooldown =
        connection.rateLimitedUntil && new Date(connection.rateLimitedUntil).getTime() > Date.now();
      setIsCooldown(cooldown);
    };

    checkCooldown();
    // Update every second while in cooldown
    const interval = connection.rateLimitedUntil ? setInterval(checkCooldown, 1000) : null;
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [connection.rateLimitedUntil]);

  // Determine effective status (override unavailable if cooldown expired)
  const effectiveStatus =
    connection.testStatus === "unavailable" && !isCooldown
      ? "active" // Cooldown expired → treat as active
      : connection.testStatus;

  const statusPresentation = getStatusPresentation(connection, effectiveStatus, isCooldown, t);
  const rateLimitEnabled = !!connection.rateLimitProtection;
  const codexPolicy =
    connection.providerSpecificData &&
    typeof connection.providerSpecificData === "object" &&
    connection.providerSpecificData.codexLimitPolicy &&
    typeof connection.providerSpecificData.codexLimitPolicy === "object"
      ? connection.providerSpecificData.codexLimitPolicy
      : {};
  const normalizedCodexPolicy = normalizeCodexLimitPolicy(codexPolicy);
  const codex5hEnabled = normalizedCodexPolicy.use5h;
  const codexWeeklyEnabled = normalizedCodexPolicy.useWeekly;
  const codexFastEnabled = isCodex
    ? getCodexEffectiveFastServiceTier(
        connection.providerSpecificData,
        codexFastGlobalEnabled === true
      )
    : false;
  const claudeBlockExtraUsageEnabled = isClaude
    ? isClaudeExtraUsageBlockEnabled("claude", connection.providerSpecificData)
    : false;
  const cliproxyapiDeepMode = !!cliproxyapiEnabled;

  return (
    <div
      className={`group flex items-center justify-between p-3 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors ${connection.isActive === false ? "opacity-60" : ""}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {onToggleSelect && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="w-4 h-4 shrink-0 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
          />
        )}
        {/* Priority arrows */}
        <div className="flex flex-col">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className={`p-0.5 rounded ${isFirst ? "text-text-muted/30 cursor-not-allowed" : "hover:bg-sidebar text-text-muted hover:text-primary"}`}
          >
            <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className={`p-0.5 rounded ${isLast ? "text-text-muted/30 cursor-not-allowed" : "hover:bg-sidebar text-text-muted hover:text-primary"}`}
          >
            <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
          </button>
        </div>
        <span className="material-symbols-outlined text-base text-text-muted">
          {isOAuth ? "lock" : "key"}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{displayName}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant={statusPresentation.statusVariant as any} size="sm" dot>
              {statusPresentation.statusLabel}
            </Badge>
            {/* T12: Token expiry status indicator (state-driven, no Date.now in render) */}
            {tokenMinsLeft !== null &&
              (tokenMinsLeft < 0 ? (
                <span
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium bg-red-500/15 text-red-500"
                  title={t("tokenExpiredTitle", { date: effectiveExpiresAt })}
                >
                  <span className="material-symbols-outlined text-[11px]">error</span>
                  {t("tokenExpiredBadge")}
                </span>
              ) : tokenMinsLeft < 30 ? (
                <span
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium bg-amber-500/15 text-amber-500"
                  title={t("tokenExpiresSoonTitle", { minutes: tokenMinsLeft })}
                >
                  <span className="material-symbols-outlined text-[11px]">warning</span>
                  {`~${tokenMinsLeft}m`}
                </span>
              ) : null)}
            {isCooldown && connection.isActive !== false && (
              <CooldownTimer until={connection.rateLimitedUntil} />
            )}
            {statusPresentation.errorBadge && connection.isActive !== false && (
              <Badge variant={statusPresentation.errorBadge.variant} size="sm">
                {t(statusPresentation.errorBadge.labelKey)}
              </Badge>
            )}
            {connection.lastError && connection.isActive !== false && (
              <span
                className={`text-xs truncate max-w-[300px] ${statusPresentation.errorTextClass}`}
                title={connection.lastError}
              >
                {connection.lastError}
              </span>
            )}
            <span className="text-xs text-text-muted">#{connection.priority}</span>
            {connection.globalPriority && (
              <span className="text-xs text-text-muted">
                {t("autoPriority", { priority: connection.globalPriority })}
              </span>
            )}
            {connection.maxConcurrent != null && connection.maxConcurrent > 0 && (
              <span
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium bg-zinc-500/15 text-zinc-500 dark:bg-zinc-400/15 dark:text-zinc-400"
                title={t("accountConcurrencyCapLabel")}
              >
                <span className="material-symbols-outlined text-[11px]">dynamic_feed</span>
                {connection.maxConcurrent}
              </span>
            )}
            {/* Rate Limit Protection — inline toggle with label */}
            <span className="text-text-muted/30 select-none">|</span>
            <button
              onClick={() => onToggleRateLimit(!rateLimitEnabled)}
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                rateLimitEnabled
                  ? "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25"
                  : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
              }`}
              title={
                rateLimitEnabled ? t("disableRateLimitProtection") : t("enableRateLimitProtection")
              }
            >
              <span className="material-symbols-outlined text-[13px]">shield</span>
              {rateLimitEnabled ? t("rateLimitProtected") : t("rateLimitUnprotected")}
            </button>
            {isClaude && (
              <>
                <span className="text-text-muted/30 select-none">|</span>
                <button
                  onClick={() => onToggleClaudeExtraUsage?.(!claudeBlockExtraUsageEnabled)}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    !claudeBlockExtraUsageEnabled
                      ? "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  }`}
                  title={t("claudeExtraUsageToggleTitle")}
                >
                  <span className="material-symbols-outlined text-[13px]">payments</span>
                  {t("claudeExtraUsageShort")}{" "}
                  {!claudeBlockExtraUsageEnabled ? t("toggleOnShort") : t("toggleOffShort")}
                </button>
              </>
            )}
            {isCcCompatible && (
              <>
                <span className="text-text-muted/30 select-none">|</span>
                <button
                  onClick={() => onToggleCliproxyapiMode?.(!cliproxyapiDeepMode)}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    cliproxyapiDeepMode
                      ? "bg-indigo-500/15 text-indigo-500 hover:bg-indigo-500/25"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  }`}
                  title={cliproxyapiDeepMode ? t("cpaModeEnabledTitle") : t("cpaModeDisabledTitle")}
                >
                  <span className="material-symbols-outlined text-[13px]">swap_horiz</span>
                  CPA {cliproxyapiDeepMode ? t("toggleOnShort") : t("toggleOffShort")}
                </button>
              </>
            )}
            {isCodex && (
              <>
                <span className="text-text-muted/30 select-none">|</span>
                {codexFastEnabled && (
                  <span
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-sky-500/15 text-sky-500"
                    title={
                      codexFastGlobalEnabled
                        ? "Global Codex fast tier is active"
                        : "Codex fast tier is active for this connection"
                    }
                  >
                    <span className="material-symbols-outlined text-[13px]">bolt</span>
                    Fast
                  </span>
                )}
                <button
                  onClick={() => onToggleCodex5h?.(!codex5hEnabled)}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    codex5hEnabled
                      ? "bg-blue-500/15 text-blue-500 hover:bg-blue-500/25"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  }`}
                  title={t("codex5hToggleTitle")}
                >
                  <span className="material-symbols-outlined text-[13px]">timer</span>
                  5h {codex5hEnabled ? t("toggleOnShort") : t("toggleOffShort")}
                </button>
                <button
                  onClick={() => onToggleCodexWeekly?.(!codexWeeklyEnabled)}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    codexWeeklyEnabled
                      ? "bg-violet-500/15 text-violet-500 hover:bg-violet-500/25"
                      : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
                  }`}
                  title={t("codexWeeklyToggleTitle")}
                >
                  <span className="material-symbols-outlined text-[13px]">date_range</span>
                  {t("weeklyShort")} {codexWeeklyEnabled ? t("toggleOnShort") : t("toggleOffShort")}
                </button>
              </>
            )}
            {hasProxy &&
              (() => {
                const colorClass =
                  proxySource === "global"
                    ? "bg-emerald-500/15 text-emerald-500"
                    : proxySource === "provider"
                      ? "bg-amber-500/15 text-amber-500"
                      : "bg-blue-500/15 text-blue-500";
                const label =
                  proxySource === "global"
                    ? t("proxySourceGlobal")
                    : proxySource === "provider"
                      ? t("proxySourceProvider")
                      : t("proxySourceKey");
                return (
                  <>
                    <span className="text-text-muted/30 select-none">|</span>
                    <span
                      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium ${colorClass}`}
                      title={t("proxyConfiguredBySource", {
                        source: label,
                        host: proxyHost || t("configured"),
                      })}
                    >
                      <span className="material-symbols-outlined text-[13px]">vpn_lock</span>
                      {proxyHost || t("proxy")}
                    </span>
                  </>
                );
              })()}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          icon="refresh"
          loading={isRetesting}
          disabled={connection.isActive === false}
          onClick={onRetest}
          className="!h-7 !px-2 text-xs"
          title={t("retestAuthentication")}
        >
          {t("retest")}
        </Button>
        {/* T12: Manual token refresh for OAuth accounts */}
        {onRefreshToken && (
          <Button
            size="sm"
            variant="ghost"
            icon="token"
            loading={isRefreshing}
            disabled={connection.isActive === false || isRefreshing}
            onClick={onRefreshToken}
            className="!h-7 !px-2 text-xs text-amber-500 hover:text-amber-400"
            title={t("refreshOauthTokenTitle")}
          >
            {t("tokenShort")}
          </Button>
        )}
        {isCodex && onApplyCodexAuthLocal && (
          <Button
            size="sm"
            variant="ghost"
            icon="download_done"
            loading={isApplyingCodexAuthLocal}
            disabled={isApplyingCodexAuthLocal}
            onClick={onApplyCodexAuthLocal}
            className="!h-7 !px-2 text-xs text-emerald-500 hover:text-emerald-400"
            title={applyCodexAuthLabel}
          >
            {applyCodexAuthLabel}
          </Button>
        )}
        {isCodex && onExportCodexAuthFile && (
          <Button
            size="sm"
            variant="ghost"
            icon="download"
            loading={isExportingCodexAuthFile}
            disabled={isExportingCodexAuthFile}
            onClick={onExportCodexAuthFile}
            className="!h-7 !px-2 text-xs text-sky-500 hover:text-sky-400"
            title={exportCodexAuthLabel}
          >
            {exportCodexAuthLabel}
          </Button>
        )}
        {isClaude && onApplyClaudeAuthLocal && (
          <Button
            size="sm"
            variant="ghost"
            icon="install_desktop"
            loading={isApplyingClaudeAuthLocal}
            disabled={isApplyingClaudeAuthLocal}
            onClick={onApplyClaudeAuthLocal}
            className="!h-7 !px-2 text-xs text-emerald-500 hover:text-emerald-400"
            title={applyClaudeAuthLabel}
          >
            {applyClaudeAuthLabel}
          </Button>
        )}
        {isClaude && onExportClaudeAuthFile && (
          <Button
            size="sm"
            variant="ghost"
            icon="download"
            loading={isExportingClaudeAuthFile}
            disabled={isExportingClaudeAuthFile}
            onClick={onExportClaudeAuthFile}
            className="!h-7 !px-2 text-xs text-sky-500 hover:text-sky-400"
            title={exportClaudeAuthLabel}
          >
            {exportClaudeAuthLabel}
          </Button>
        )}
        {isGeminiCli && onApplyGeminiAuthLocal && (
          <Button
            size="sm"
            variant="ghost"
            icon="install_desktop"
            loading={isApplyingGeminiAuthLocal}
            disabled={isApplyingGeminiAuthLocal}
            onClick={onApplyGeminiAuthLocal}
            className="!h-7 !px-2 text-xs text-emerald-500 hover:text-emerald-400"
            title={applyGeminiAuthLabel}
          >
            {applyGeminiAuthLabel}
          </Button>
        )}
        {isGeminiCli && onExportGeminiAuthFile && (
          <Button
            size="sm"
            variant="ghost"
            icon="download"
            loading={isExportingGeminiAuthFile}
            disabled={isExportingGeminiAuthFile}
            onClick={onExportGeminiAuthFile}
            className="!h-7 !px-2 text-xs text-sky-500 hover:text-sky-400"
            title={exportGeminiAuthLabel}
          >
            {exportGeminiAuthLabel}
          </Button>
        )}
        <Toggle
          size="sm"
          checked={connection.isActive ?? true}
          onChange={onToggleActive}
          title={(connection.isActive ?? true) ? t("disableConnection") : t("enableConnection")}
        />
        <div className="flex gap-1 ml-1 transition-opacity">
          {onReauth && (
            <button
              onClick={onReauth}
              className="p-2 hover:bg-amber-500/10 rounded text-amber-600 hover:text-amber-500"
              title={t("reauthenticateConnection")}
            >
              <span className="material-symbols-outlined text-[18px]">passkey</span>
            </button>
          )}
          <button
            onClick={onEdit}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary"
            title={t("edit")}
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            onClick={onProxy}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary"
            title={t("proxyConfig")}
          >
            <span className="material-symbols-outlined text-[18px]">vpn_lock</span>
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-500/10 rounded text-red-500"
            title={t("delete")}
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const CONFIGURABLE_BASE_URL_PROVIDERS = new Set([
  "azure-openai",
  "azure-ai",
  "bailian-coding-plan",
  "xiaomi-mimo",
  "heroku",
  "databricks",
  "snowflake",
  "searxng-search",
  "petals",
]);

const DEFAULT_PROVIDER_BASE_URLS: Record<string, string> = {
  "azure-openai": "https://example-resource.openai.azure.com",
  "azure-ai": "https://example-resource.services.ai.azure.com/openai/v1",
  "bailian-coding-plan": "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
  "xiaomi-mimo": "https://token-plan-sgp.xiaomimimo.com/v1",
  "searxng-search": "http://localhost:8888/search",
  petals: "https://chat.petals.dev/api/v1/generate",
};

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

function AddApiKeyModal({
  isOpen,
  provider,
  providerName,
  isCompatible,
  isAnthropic,
  isCcCompatible,
  isCommandCode,
  commandCodeAuthState,
  onStartCommandCodeAuth,
  onSave,
  onClose,
}: AddApiKeyModalProps) {
  const t = useTranslations("providers");
  const usesBaseUrl = isBaseUrlConfigurableProvider(provider);
  const defaultBaseUrl = getProviderBaseUrlDefault(provider);
  const isVertex = provider === "vertex" || provider === "vertex-partner";
  const defaultRegion = "us-central1";
  const isGlm = isGlmProvider(provider);
  const isQoder = provider === "qoder";
  const isCloudflare = provider === "cloudflare-ai";
  const localProviderMetadata = getLocalProviderMetadata(provider);
  const isLocalSelfHostedProvider = !!localProviderMetadata;
  const isGooglePse = provider === "google-pse-search";
  const isGrokWeb = provider === "grok-web";
  const isPerplexityWeb = provider === "perplexity-web";
  const isBlackboxWeb = provider === "blackbox-web";
  const isMuseSparkWeb = provider === "muse-spark-web";
  const isDeepSeekWeb = provider === "deepseek-web";
  const isWebSessionProvider = isGrokWeb || isPerplexityWeb || isBlackboxWeb || isMuseSparkWeb;
  const apiKeyOptional = providerAllowsOptionalApiKey(provider);
  const commandCodeAuthPhaseLabel = commandCodeAuthState
    ? {
        idle: "Ready",
        starting: "Starting…",
        polling: "Waiting for browser…",
        received: "Browser approved",
        applying: "Applying key…",
        applied: "Connected",
        expired: "Link expired",
        error: "Connection failed",
      }[commandCodeAuthState.phase]
    : null;

  const [formData, setFormData] = useState({
    name: "",
    apiKey: "",
    priority: 1,
    baseUrl: defaultBaseUrl,
    cx: "",
    region: isVertex ? defaultRegion : "",
    apiRegion: "international",
    validationModelId: "",
    routingTags: "",
    excludedModels: "",
    customUserAgent: "",
    accountId: "",
    consoleApiKey: "",
    ccCompatibleContext1m: false,
    passthroughModels: false,
  });
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copiedCommandCodeField, setCopiedCommandCodeField] = useState<string | null>(null);

  const bulkSupported = supportsBulkApiKey(provider);
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [bulkText, setBulkText] = useState("");
  const [bulkValidateKeys, setBulkValidateKeys] = useState(false);
  const [bulkResult, setBulkResult] = useState<{
    success: number;
    failed: number;
    total: number;
    errors: Array<{ index: number; name: string; message: string }>;
  } | null>(null);
  const [bulkWarnings, setBulkWarnings] = useState<string[]>([]);
  const apiCredentialLabel = isQoder
    ? t("personalAccessTokenLabel")
    : isDeepSeekWeb
      ? "User Token"
      : isWebSessionProvider
        ? t("sessionCookieLabel")
        : apiKeyOptional
          ? `${t("apiKeyLabel")} (${t("optional").toLowerCase()})`
          : t("apiKeyLabel");
  const apiCredentialPlaceholder = isVertex
    ? t("vertexServiceAccountPlaceholder")
    : isDeepSeekWeb
      ? "Paste userToken value from localStorage"
      : isGrokWeb
        ? t("grokWebCookiePlaceholder")
        : isPerplexityWeb
          ? t("perplexityWebCookiePlaceholder")
          : isBlackboxWeb
            ? t("blackboxWebCookiePlaceholder")
            : isMuseSparkWeb
              ? t("museSparkWebCookiePlaceholder")
              : isQoder
                ? t("qoderPatPlaceholder")
                : apiKeyOptional
                  ? t("optional")
                  : undefined;
  const apiCredentialHint = isQoder
    ? t("qoderPatHint")
    : isDeepSeekWeb
      ? "Found in browser DevTools → Application → Local Storage → chat.deepseek.com → userToken"
      : isGrokWeb
        ? t("grokWebCookieHint")
        : isPerplexityWeb
          ? t("perplexityWebCookieHint")
          : isBlackboxWeb
            ? t("blackboxWebCookieHint")
            : isMuseSparkWeb
              ? t("museSparkWebCookieHint")
              : isLocalSelfHostedProvider
                ? t("localProviderApiKeyOptionalHint", {
                    provider: localProviderMetadata?.name || providerName || provider || "",
                  })
                : apiKeyOptional
                  ? t("apiKeyOptionalHint")
                  : undefined;

  const handleValidate = async () => {
    setValidating(true);
    setSaveError(null);
    try {
      const credentialInput = isCommandCode
        ? extractCommandCodeCredentialInput(formData.apiKey)
        : formData.apiKey;
      const res = await fetch("/api/providers/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          apiKey: credentialInput,
          validationModelId: formData.validationModelId || undefined,
          customUserAgent: formData.customUserAgent.trim() || undefined,
          baseUrl: formData.baseUrl.trim() || undefined,
          cx: formData.cx.trim() || undefined,
        }),
      });
      const data = await res.json();
      setValidationResult(data.valid ? "success" : "failed");
    } catch {
      setValidationResult("failed");
    } finally {
      setValidating(false);
    }
  };

  const copyCommandCodeValue = async (value: string | undefined, key: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedCommandCodeField(key);
      window.setTimeout(() => setCopiedCommandCodeField(null), 1500);
    } catch {
      setSaveError("Copy failed. Select the text and copy it manually.");
    }
  };

  const handleSubmit = async () => {
    const credentialInput = isCommandCode
      ? extractCommandCodeCredentialInput(formData.apiKey)
      : formData.apiKey;
    if (!provider || (!isCompatible && !apiKeyOptional && !credentialInput)) return;

    setSaving(true);
    setSaveError(null);
    try {
      if (isGooglePse && !formData.cx.trim()) {
        setSaveError(t("searchEngineIdRequired"));
        return;
      }

      let validatedBaseUrl = null;
      if (usesBaseUrl) {
        const checked = normalizeAndValidateHttpBaseUrl(formData.baseUrl, defaultBaseUrl);
        if (checked.error) {
          setSaveError(checked.error);
          return;
        }
        validatedBaseUrl = checked.value;
      }

      let isValid = false;
      let validationError: string | null = null;
      try {
        setValidating(true);
        setValidationResult(null);
        const res = await fetch("/api/providers/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider,
            apiKey: credentialInput,
            validationModelId: formData.validationModelId || undefined,
            customUserAgent: formData.customUserAgent.trim() || undefined,
            baseUrl: formData.baseUrl.trim() || undefined,
            cx: formData.cx.trim() || undefined,
          }),
        });
        const data = await res.json();
        isValid = !!data.valid;
        if (!isValid && data.error) {
          validationError = data.error;
        }
        setValidationResult(isValid ? "success" : "failed");
      } catch {
        setValidationResult("failed");
      } finally {
        setValidating(false);
      }

      if (!isValid) {
        if (apiKeyOptional && !credentialInput) {
          // Bypass validation block for local/optional providers when no key is provided
          console.debug("Validation failed but apiKey is optional; proceeding to save.");
        } else {
          setSaveError(validationError || t("apiKeyValidationFailed"));
          return;
        }
      }

      const providerSpecificData: Record<string, unknown> = {};
      if (formData.customUserAgent.trim()) {
        providerSpecificData.customUserAgent = formData.customUserAgent.trim();
      }
      if (formData.routingTags.trim()) {
        providerSpecificData.tags = parseRoutingTagsInput(formData.routingTags);
      }
      if (formData.excludedModels.trim()) {
        providerSpecificData.excludedModels = parseExcludedModelsInput(formData.excludedModels);
      }
      if (formData.passthroughModels) {
        providerSpecificData.passthroughModels = true;
      }
      if (provider === "bailian-coding-plan" && formData.consoleApiKey.trim()) {
        providerSpecificData.consoleApiKey = formData.consoleApiKey.trim();
      }
      if (isGooglePse && formData.cx.trim()) {
        providerSpecificData.cx = formData.cx.trim();
      }
      if (usesBaseUrl) {
        providerSpecificData.baseUrl = validatedBaseUrl;
      } else if (isVertex) {
        providerSpecificData.region = formData.region;
      } else if (isGlm) {
        providerSpecificData.apiRegion = formData.apiRegion;
      } else if (isCloudflare && formData.accountId.trim()) {
        providerSpecificData.accountId = formData.accountId.trim();
      }
      if (isCcCompatible && formData.ccCompatibleContext1m) {
        providerSpecificData.requestDefaults = { context1m: true };
      }

      const payload = {
        name: formData.name,
        apiKey: credentialInput.trim() || undefined,
        priority: formData.priority,
        testStatus: "active",
        providerSpecificData:
          Object.keys(providerSpecificData).length > 0 ? providerSpecificData : undefined,
      };

      const error = await onSave(payload);
      if (error) {
        setSaveError(typeof error === "string" ? error : t("failedSaveConnection"));
      }
    } finally {
      setSaving(false);
    }
  };

  const handleBulkSubmit = async () => {
    if (!provider) return;
    const parsed = parseBulkApiKeys(bulkText);
    setBulkWarnings(parsed.warnings);
    if (parsed.entries.length === 0) return;

    setSaving(true);
    setBulkResult(null);
    setSaveError(null);

    try {
      const res = await fetch("/api/providers/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          entries: parsed.entries.map((e) => ({ name: e.name, apiKey: e.apiKey })),
          priority: formData.priority || 1,
          validateKeys: bulkValidateKeys,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveError(typeof data?.error === "string" ? data.error : t("failedSaveConnection"));
        return;
      }
      setBulkResult({
        success: data.success || 0,
        failed: data.failed || 0,
        total: data.total || 0,
        errors: Array.isArray(data.errors) ? data.errors : [],
      });
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : t("failedSaveConnection"));
    } finally {
      setSaving(false);
    }
  };

  if (!provider) return null;

  return (
    <Modal
      isOpen={isOpen}
      title={t("addProviderApiKeyTitle", { provider: providerName || provider })}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        {bulkSupported && (
          <div className="flex gap-1 border-b border-border">
            <button
              type="button"
              onClick={() => {
                setMode("single");
                setBulkResult(null);
                setBulkWarnings([]);
              }}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === "single"
                  ? "border-b-2 border-primary text-text-main"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              {t("bulkTabSingle")}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("bulk");
                setSaveError(null);
              }}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === "bulk"
                  ? "border-b-2 border-primary text-text-main"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              {t("bulkTabBulkAdd")}
            </button>
          </div>
        )}

        {bulkSupported && mode === "bulk" && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-text-muted">{t("bulkAddFormatHint")}</p>
            <textarea
              className="w-full rounded border border-border bg-background p-2 text-sm font-mono resize-y min-h-[140px] focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={"name1|sk-key1\nname2|sk-key2\nsk-key-only-auto-named"}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
            />
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-sm text-text-muted">{t("priorityLabel")}</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: Number.parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-20 px-2 py-1 text-sm border border-border rounded bg-background"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={bulkValidateKeys}
                  onChange={(e) => setBulkValidateKeys(e.target.checked)}
                  className="rounded border-border"
                />
                {t("bulkValidateKeys")}
              </label>
            </div>
            {bulkWarnings.length > 0 && (
              <div className="rounded border border-amber-500/25 bg-amber-500/10 p-2 text-xs text-amber-200 space-y-1">
                {bulkWarnings.map((w, i) => (
                  <div key={i}>{w}</div>
                ))}
              </div>
            )}
            {bulkResult && (
              <div
                className={`text-sm font-medium ${
                  bulkResult.failed > 0 ? "text-amber-300" : "text-emerald-400"
                }`}
              >
                {t("bulkAddedCount", { count: bulkResult.success })}
                {bulkResult.failed > 0 && (
                  <>, {t("bulkFailedCount", { count: bulkResult.failed })}</>
                )}
                {bulkResult.errors.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-xs text-text-muted font-normal space-y-0.5">
                    {bulkResult.errors.slice(0, 10).map((err, i) => (
                      <li key={i}>
                        {err.name}: {err.message}
                      </li>
                    ))}
                    {bulkResult.errors.length > 10 && (
                      <li>… {bulkResult.errors.length - 10} more</li>
                    )}
                  </ul>
                )}
              </div>
            )}
            {saveError && <div className="text-sm text-rose-400">{saveError}</div>}
            <div className="flex gap-2">
              <Button onClick={handleBulkSubmit} fullWidth disabled={saving || !bulkText.trim()}>
                {saving ? t("adding") : t("bulkAddAllKeys")}
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </div>
        )}

        {(!bulkSupported || mode === "single") && (
          <>
            {isCcCompatible && (
              <div className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-text-muted">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined mt-0.5 text-[18px] text-amber-500">
                    warning
                  </span>
                  <p>{t("ccCompatibleValidationHint")}</p>
                </div>
              </div>
            )}
            {isCommandCode && onStartCommandCodeAuth && (
              <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 px-3 py-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined mt-0.5 text-[18px] text-sky-500">
                    open_in_new
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-text-main">
                      {t("providerDetailBrowserManualConnect")}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      Open Command Code Studio, then paste the returned key/JSON/URL into the API
                      key field below.
                    </p>
                    {commandCodeAuthState?.message && (
                      <p className="mt-2 text-xs text-text-muted">
                        {commandCodeAuthPhaseLabel}: {commandCodeAuthState.message}
                      </p>
                    )}
                    {commandCodeAuthState?.authUrl && (
                      <div className="mt-3 space-y-2">
                        <div>
                          <p className="mb-1 text-xs font-medium text-text-main">
                            {t("providerDetailAuthUrl")}
                          </p>
                          <div className="flex gap-2">
                            <Input
                              value={commandCodeAuthState.authUrl}
                              readOnly
                              className="flex-1 font-mono text-xs"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={copiedCommandCodeField === "authUrl" ? "check" : "content_copy"}
                              onClick={() =>
                                copyCommandCodeValue(commandCodeAuthState.authUrl, "authUrl")
                              }
                            />
                          </div>
                        </div>
                        {commandCodeAuthState.callbackUrl && (
                          <div>
                            <p className="mb-1 text-xs font-medium text-text-main">
                              {t("providerDetailCallbackUrl")}
                            </p>
                            <div className="flex gap-2">
                              <Input
                                value={commandCodeAuthState.callbackUrl}
                                readOnly
                                className="flex-1 font-mono text-xs"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={
                                  copiedCommandCodeField === "callbackUrl"
                                    ? "check"
                                    : "content_copy"
                                }
                                onClick={() =>
                                  copyCommandCodeValue(
                                    commandCodeAuthState.callbackUrl,
                                    "callbackUrl"
                                  )
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon="open_in_new"
                    loading={
                      commandCodeAuthState?.phase === "starting" ||
                      commandCodeAuthState?.phase === "polling" ||
                      commandCodeAuthState?.phase === "applying"
                    }
                    onClick={onStartCommandCodeAuth}
                  >
                    Connect in browser
                  </Button>
                </div>
              </div>
            )}
            <Input
              label={t("nameLabel")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={isQoder ? t("personalAccessTokenLabel") : t("productionKey")}
            />
            <div className="flex gap-2">
              <Input
                label={apiCredentialLabel}
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                className="flex-1"
                placeholder={apiCredentialPlaceholder}
                hint={apiCredentialHint}
              />
              <div className="pt-6">
                <Button
                  onClick={handleValidate}
                  disabled={
                    (!isCompatible && !apiKeyOptional && !formData.apiKey) ||
                    (isGooglePse && !formData.cx.trim()) ||
                    validating ||
                    saving
                  }
                  variant="secondary"
                >
                  {validating ? t("checking") : t("check")}
                </Button>
              </div>
            </div>
            {isGooglePse && (
              <Input
                label={t("searchEngineIdLabel")}
                value={formData.cx}
                onChange={(e) => setFormData({ ...formData, cx: e.target.value })}
                placeholder="012345678901234567890:abc123xyz"
                hint={t("searchEngineIdHint")}
              />
            )}
            {validationResult && (
              <Badge variant={validationResult === "success" ? "success" : "error"}>
                {validationResult === "success" ? t("valid") : t("invalid")}
              </Badge>
            )}
            {saveError && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {saveError}
              </div>
            )}
            {isCcCompatible && (
              <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
                <Toggle
                  checked={formData.ccCompatibleContext1m}
                  onChange={(checked) =>
                    setFormData({ ...formData, ccCompatibleContext1m: checked })
                  }
                  label={t("ccCompatibleContext1mLabel")}
                  description={t("ccCompatibleContext1mDescription")}
                />
              </div>
            )}
            {isCompatible && !isCcCompatible && (
              <p className="text-xs text-text-muted">
                {isAnthropic
                  ? t("validationChecksAnthropicCompatible", {
                      provider: providerName || t("anthropicCompatibleName"),
                    })
                  : t("validationChecksOpenAiCompatible", {
                      provider: providerName || t("openaiCompatibleName"),
                    })}
              </p>
            )}
            <button
              type="button"
              className="text-sm text-text-muted hover:text-text-primary flex items-center gap-1"
              onClick={() => setShowAdvanced(!showAdvanced)}
              aria-expanded={showAdvanced}
              aria-controls="add-api-key-advanced-settings"
            >
              <span
                className={`transition-transform ${showAdvanced ? "rotate-90" : ""}`}
                aria-hidden="true"
              >
                ▶
              </span>
              {t("advancedSettings")}
            </button>
            {showAdvanced && (
              <div
                id="add-api-key-advanced-settings"
                className="flex flex-col gap-3 pl-2 border-l-2 border-border"
              >
                <Input
                  label={t("customUserAgentLabel")}
                  value={formData.customUserAgent}
                  onChange={(e) => setFormData({ ...formData, customUserAgent: e.target.value })}
                  placeholder="my-app/1.0"
                  hint={t("customUserAgentHint")}
                />
                <Input
                  label={t("routingTagsLabel")}
                  value={formData.routingTags}
                  onChange={(e) => setFormData({ ...formData, routingTags: e.target.value })}
                  placeholder={t("routingTagsPlaceholder")}
                  hint={t("routingTagsHint")}
                />
                <Input
                  label={t("excludedModelsLabel")}
                  value={formData.excludedModels}
                  onChange={(e) => setFormData({ ...formData, excludedModels: e.target.value })}
                  placeholder={t("excludedModelsPlaceholder")}
                  hint={t("excludedModelsHint")}
                />
                <Toggle
                  size="sm"
                  checked={formData.passthroughModels}
                  onChange={(checked) => setFormData({ ...formData, passthroughModels: checked })}
                  label={t("perModelQuotaLabel")}
                  description={t("perModelQuotaDescription")}
                />
                {provider === "bailian-coding-plan" && (
                  <Input
                    label={t("consoleApiKeyOracleLabel")}
                    value={formData.consoleApiKey}
                    onChange={(e) => setFormData({ ...formData, consoleApiKey: e.target.value })}
                    placeholder={t("consoleApiKeyOraclePlaceholder")}
                    hint={t("consoleApiKeyOracleHint")}
                    type="password"
                  />
                )}
              </div>
            )}
            <Input
              label={t("validationModelIdLabel")}
              placeholder={t("validationModelIdPlaceholder")}
              value={formData.validationModelId}
              onChange={(e) => setFormData({ ...formData, validationModelId: e.target.value })}
              hint={t("validationModelIdHint")}
            />
            <Input
              label={t("priorityLabel")}
              type="number"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: Number.parseInt(e.target.value) || 1 })
              }
            />
            {usesBaseUrl && (
              <Input
                label={t("baseUrlLabel")}
                value={formData.baseUrl}
                onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
                placeholder={getProviderBaseUrlPlaceholder(provider)}
                hint={getProviderBaseUrlHint(provider, t)}
              />
            )}
            {isVertex && (
              <Input
                label={t("regionLabel")}
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder={defaultRegion}
                hint={t("regionHint")}
              />
            )}
            {isCloudflare && (
              <Input
                label={t("accountIdLabel")}
                value={formData.accountId}
                onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                placeholder={t("accountIdPlaceholder")}
                hint={t("accountIdHint")}
              />
            )}
            {isGlm && (
              <div>
                <label className="text-sm font-medium text-text-main mb-1 block">
                  {t("apiRegionLabel")}
                </label>
                <select
                  value={formData.apiRegion}
                  onChange={(e) => setFormData({ ...formData, apiRegion: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                >
                  <option value="international">{t("apiRegionInternational")}</option>
                  <option value="china">{t("apiRegionChina")}</option>
                </select>
                <p className="text-xs text-text-muted mt-1">{t("apiRegionHint")}</p>
              </div>
            )}
            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                fullWidth
                disabled={
                  !formData.name ||
                  (!isCompatible && !apiKeyOptional && !formData.apiKey) ||
                  (isGooglePse && !formData.cx.trim()) ||
                  saving ||
                  (usesBaseUrl && !formData.baseUrl.trim() && !defaultBaseUrl)
                }
              >
                {saving ? t("saving") : t("save")}
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

// ──── ImportCodexAuthModal ────────────────────────────────────────────────────

interface ImportCodexAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

type ImportTopTab = "single" | "bulk";
type BulkSubMode = "upload" | "paste" | "zip";

interface BulkEntry {
  name: string;
  json: unknown;
  parseError: string | null;
  email: string | null;
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

function ImportCodexAuthModal({ onClose, onSuccess }: ImportCodexAuthModalProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();

  // Top-level tab: Single / Bulk
  const [topTab, setTopTab] = useState<ImportTopTab>("single");

  // ── Single mode state ──
  const [singleTab, setSingleTab] = useState<"upload" | "paste">("upload");
  const [singleParsedJson, setSingleParsedJson] = useState<unknown>(null);
  const [singleParseError, setSingleParseError] = useState<string | null>(null);
  const [singleDetectedEmail, setSingleDetectedEmail] = useState<string | null>(null);
  const [singlePasteText, setSinglePasteText] = useState("");
  const [singleName, setSingleName] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [singleOverwrite, setSingleOverwrite] = useState(false);
  const [singleLoading, setSingleLoading] = useState(false);
  const [singleError, setSingleError] = useState<string | null>(null);

  // ── Bulk mode state ──
  const [bulkMode, setBulkMode] = useState<BulkSubMode>("upload");
  const [bulkEntries, setBulkEntries] = useState<BulkEntry[]>([]);
  const [bulkPasteText, setBulkPasteText] = useState("");
  const [bulkZipExtracting, setBulkZipExtracting] = useState(false);
  const [bulkZipError, setBulkZipError] = useState<string | null>(null);
  const [bulkOverwrite, setBulkOverwrite] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResult, setBulkResult] = useState<{
    success: number;
    failed: number;
    errors: { index: number; name: string; message: string }[];
  } | null>(null);

  // ── Single helpers ──

  function handleSinglePreview(json: unknown) {
    setSingleParseError(null);
    setSingleDetectedEmail(null);
    setSingleParsedJson(null);
    const { valid, email } = previewCodexJson(json);
    if (!valid) {
      setSingleParseError(t("codexImportInvalidShape") || "Not a valid Codex auth.json");
      return;
    }
    setSingleDetectedEmail(email);
    if (email && !singleEmail) setSingleEmail(email);
    setSingleParsedJson(json);
  }

  function handleSingleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        handleSinglePreview(JSON.parse(ev.target?.result as string));
      } catch {
        setSingleParseError(t("codexImportInvalidJson") || "Could not parse JSON");
      }
    };
    reader.readAsText(file);
  }

  function handleSinglePasteChange(text: string) {
    setSinglePasteText(text);
    if (!text.trim()) {
      setSingleParsedJson(null);
      setSingleParseError(null);
      setSingleDetectedEmail(null);
      return;
    }
    try {
      handleSinglePreview(JSON.parse(text));
    } catch {
      setSingleParseError(t("codexImportInvalidJson") || "Could not parse JSON");
      setSingleParsedJson(null);
    }
  }

  async function handleSingleSubmit() {
    if (!singleParsedJson) return;
    setSingleLoading(true);
    setSingleError(null);
    try {
      const res = await fetch("/api/providers/codex-auth/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: { kind: "json", json: singleParsedJson },
          name: singleName.trim() || undefined,
          email: singleEmail.trim() || undefined,
          overwriteExisting: singleOverwrite,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSingleError(
          data.code === "duplicate_account"
            ? t("codexImportDuplicate") ||
                "Account already exists — enable Replace existing to overwrite"
            : data.error || t("codexImportFailed") || "Failed to import"
        );
        return;
      }
      notify.success(t("codexImportSuccess") || "Codex connection imported successfully");
      onSuccess();
    } catch {
      setSingleError(t("codexImportFailed") || "Failed to import Codex auth");
    } finally {
      setSingleLoading(false);
    }
  }

  // ── Bulk helpers ──

  function handleBulkFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const entries: BulkEntry[] = [];
    let pending = files.length;
    if (pending === 0) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = JSON.parse(ev.target?.result as string);
          const { email } = previewCodexJson(json);
          entries.push({
            name: email || file.name.replace(".json", ""),
            json,
            parseError: null,
            email,
          });
        } catch {
          entries.push({ name: file.name, json: null, parseError: "Invalid JSON", email: null });
        }
        if (--pending === 0) setBulkEntries([...entries]);
      };
      reader.readAsText(file);
    });
  }

  function handleBulkPasteChange(text: string) {
    setBulkPasteText(text);
    if (!text.trim()) {
      setBulkEntries([]);
      return;
    }
    setBulkEntries(parseBulkPasteText(text));
  }

  async function handleZipUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBulkZipExtracting(true);
    setBulkZipError(null);
    setBulkEntries([]);
    try {
      const res = await fetch("/api/providers/codex-auth/zip-extract", {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: file,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBulkZipError(data.error || t("codexImportBulkZipError") || "Failed to extract ZIP");
        return;
      }
      const extracted: BulkEntry[] = (data.entries || []).map(
        (entry: { name: string; json: unknown; parseError: string | null }) => {
          if (entry.parseError)
            return { name: entry.name, json: null, parseError: entry.parseError, email: null };
          const { email } = previewCodexJson(entry.json);
          return {
            name: email || entry.name.replace(".json", ""),
            json: entry.json,
            parseError: null,
            email,
          };
        }
      );
      setBulkEntries(extracted);
    } catch {
      setBulkZipError(t("codexImportBulkZipError") || "Failed to extract ZIP");
    } finally {
      setBulkZipExtracting(false);
    }
  }

  async function handleBulkSubmit() {
    const validEntries = bulkEntries.filter((e) => !e.parseError && e.json !== null);
    if (validEntries.length === 0) return;
    setBulkLoading(true);
    setBulkResult(null);
    try {
      const res = await fetch("/api/providers/codex-auth/import-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entries: validEntries.map((e) => ({
            json: e.json,
            name: e.name || undefined,
            email: e.email || undefined,
          })),
          overwriteExisting: bulkOverwrite,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(data.error || t("codexImportFailed") || "Failed to import");
        return;
      }
      setBulkResult({ success: data.success, failed: data.failed, errors: data.errors || [] });
      if (data.success > 0) onSuccess();
    } catch {
      notify.error(t("codexImportFailed") || "Failed to import Codex auth");
    } finally {
      setBulkLoading(false);
    }
  }

  const singleCanSubmit = !!singleParsedJson && !singleParseError && !singleLoading;
  const validBulkCount = bulkEntries.filter((e) => !e.parseError && e.json !== null).length;
  const bulkCanSubmit = validBulkCount > 0 && !bulkLoading && !bulkZipExtracting;

  const TOP_TABS: { id: ImportTopTab; label: string }[] = [
    { id: "single", label: t("codexImportTabSingle") || "Single" },
    { id: "bulk", label: t("codexImportTabBulk") || "Bulk" },
  ];

  const BULK_MODES: { id: BulkSubMode; label: string }[] = [
    { id: "upload", label: t("codexImportBulkModeUpload") || "Upload files" },
    { id: "paste", label: t("codexImportBulkModePaste") || "Paste list" },
    { id: "zip", label: t("codexImportBulkModeZip") || "ZIP archive" },
  ];

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={t("codexImportModalTitle") || "Import Codex Auth"}
      maxWidth="max-w-lg"
    >
      <div className="flex flex-col gap-4">
        {/* Top-level Single / Bulk tabs */}
        <div className="flex border-b border-border">
          {TOP_TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                setTopTab(id);
                setBulkResult(null);
                setSingleError(null);
              }}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                topTab === id
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-text-main"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Single tab ── */}
        {topTab === "single" && (
          <>
            {/* Source sub-tabs */}
            <div className="flex border-b border-border">
              {(["upload", "paste"] as const).map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setSingleTab(id);
                    setSingleParsedJson(null);
                    setSingleParseError(null);
                    setSingleDetectedEmail(null);
                  }}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    singleTab === id
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted hover:text-text-main"
                  }`}
                >
                  {id === "upload"
                    ? t("codexImportTabUpload") || "Upload file"
                    : t("codexImportTabPaste") || "Paste JSON"}
                </button>
              ))}
            </div>

            {singleTab === "upload" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-main">
                  {t("codexImportFileLabel") || "Choose auth.json"}
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleSingleFileChange}
                  className="text-sm text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:text-xs file:bg-bg-subtle file:text-text-main hover:file:bg-bg-hover cursor-pointer"
                />
                <p className="text-xs text-text-muted">
                  {t("codexImportFileHint") ||
                    "Select the auth.json file exported from Codex or OmniRoute."}
                </p>
              </div>
            )}

            {singleTab === "paste" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-main">
                  {t("codexImportPasteLabel") || "Paste the JSON content"}
                </label>
                <textarea
                  value={singlePasteText}
                  onChange={(e) => handleSinglePasteChange(e.target.value)}
                  rows={7}
                  placeholder='{ "auth_mode": "chatgpt", ... }'
                  className="w-full rounded-lg border border-border bg-bg-subtle px-3 py-2 text-xs font-mono text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
              </div>
            )}

            {singleParseError && <p className="text-sm text-red-500">{singleParseError}</p>}
            {singleDetectedEmail && !singleParseError && (
              <p className="text-xs text-text-muted">
                {t("codexImportDetectedEmail", { email: singleDetectedEmail }) ||
                  `Detected: ${singleDetectedEmail}`}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-main">
                  {t("codexImportEmailLabel") || "Account email"}
                </label>
                <input
                  type="email"
                  value={singleEmail}
                  onChange={(e) => setSingleEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <p className="text-xs text-text-muted">
                  {t("codexImportEmailHint") || "Auto-detected from the file; edit if needed."}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-main">
                  {t("codexImportNameLabel") || "Connection name (optional)"}
                </label>
                <input
                  type="text"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  placeholder={singleEmail || "Codex (imported)"}
                  className="rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={singleOverwrite}
                  onChange={(e) => setSingleOverwrite(e.target.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm text-text-main">
                  {t("codexImportOverwriteLabel") ||
                    "Replace existing connection if account already exists"}
                </span>
              </label>
            </div>

            {singleError && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                {singleError}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleSingleSubmit}
                disabled={!singleCanSubmit}
                loading={singleLoading}
                fullWidth
              >
                {t("codexImportSubmit") || "Import"}
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </>
        )}

        {/* ── Bulk tab ── */}
        {topTab === "bulk" && (
          <>
            {/* Sub-mode selector */}
            <div className="flex gap-1 p-1 bg-bg-subtle rounded-lg">
              {BULK_MODES.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    setBulkMode(id);
                    setBulkEntries([]);
                    setBulkZipError(null);
                    setBulkPasteText("");
                    setBulkResult(null);
                  }}
                  className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    bulkMode === id
                      ? "bg-bg-primary text-text-main shadow-sm"
                      : "text-text-muted hover:text-text-main"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Upload mode */}
            {bulkMode === "upload" && (
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept=".json"
                  multiple
                  onChange={handleBulkFilesChange}
                  className="text-sm text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:text-xs file:bg-bg-subtle file:text-text-main hover:file:bg-bg-hover cursor-pointer"
                />
                <p className="text-xs text-text-muted">
                  {t("codexImportBulkUploadHint") || "Select multiple .json files"}
                </p>
              </div>
            )}

            {/* Paste mode */}
            {bulkMode === "paste" && (
              <div className="flex flex-col gap-2">
                <textarea
                  value={bulkPasteText}
                  onChange={(e) => handleBulkPasteChange(e.target.value)}
                  rows={7}
                  placeholder={'[{ "auth_mode": "chatgpt", ... }, ...]'}
                  className="w-full rounded-lg border border-border bg-bg-subtle px-3 py-2 text-xs font-mono text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
                <p className="text-xs text-text-muted">
                  {t("codexImportBulkPasteHint") || "JSON array or multiple JSONs separated by ---"}
                </p>
              </div>
            )}

            {/* ZIP mode */}
            {bulkMode === "zip" && (
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleZipUpload}
                  disabled={bulkZipExtracting}
                  className="text-sm text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-border file:text-xs file:bg-bg-subtle file:text-text-main hover:file:bg-bg-hover cursor-pointer disabled:opacity-50"
                />
                {bulkZipExtracting && (
                  <p className="text-xs text-text-muted animate-pulse">
                    {t("codexImportBulkZipExtracting") || "Extracting ZIP…"}
                  </p>
                )}
                {bulkZipError && <p className="text-sm text-red-500">{bulkZipError}</p>}
                <p className="text-xs text-text-muted">
                  {t("codexImportBulkZipHint") ||
                    "Upload a .zip containing auth.json files (max 50 files, 10 MB)"}
                </p>
              </div>
            )}

            {/* Entry preview list */}
            {bulkEntries.length > 0 && !bulkResult && (
              <div className="flex flex-col gap-1 max-h-40 overflow-y-auto rounded-lg border border-border bg-bg-subtle p-2">
                <p className="text-xs font-medium text-text-muted px-1">
                  {validBulkCount} / {bulkEntries.length} valid
                </p>
                {bulkEntries.map((entry, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1 rounded">
                    <span
                      className={`material-symbols-outlined text-[14px] ${entry.parseError ? "text-red-500" : "text-emerald-500"}`}
                    >
                      {entry.parseError ? "error" : "check_circle"}
                    </span>
                    <span className="text-xs text-text-main flex-1 truncate">{entry.name}</span>
                    {entry.parseError && (
                      <span className="text-xs text-red-400">{entry.parseError}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Overwrite checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={bulkOverwrite}
                onChange={(e) => setBulkOverwrite(e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm text-text-main">
                {t("codexImportOverwriteLabel") ||
                  "Replace existing connections if accounts already exist"}
              </span>
            </label>

            {/* Result panel */}
            {bulkResult && (
              <div
                className={`rounded-lg border px-4 py-3 text-sm ${
                  bulkResult.failed === 0
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                }`}
              >
                <p className="font-medium">
                  {bulkResult.success}{" "}
                  {t("codexImportBulkSuccess", { count: bulkResult.success }) || "imported"} ·{" "}
                  {bulkResult.failed}{" "}
                  {t("codexImportBulkFailed", { count: bulkResult.failed }) || "failed"}
                </p>
                {bulkResult.errors.length > 0 && (
                  <ul className="mt-2 space-y-0.5 text-xs">
                    {bulkResult.errors.map((e, i) => (
                      <li key={i}>
                        <span className="font-medium">{e.name}:</span> {e.message}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleBulkSubmit}
                disabled={!bulkCanSubmit}
                loading={bulkLoading}
                fullWidth
              >
                {bulkLoading
                  ? t("saving") || "Importing…"
                  : typeof t.has === "function" && t.has("codexImportBulkSubmit")
                    ? t("codexImportBulkSubmit", { count: validBulkCount })
                    : `Import ${validBulkCount} accounts`}
              </Button>
              <Button onClick={onClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

function ApplyCodexAuthModal({
  connectionId,
  inProgress,
  onConfirm,
  onClose,
}: {
  connectionId: string | null;
  inProgress: boolean;
  onConfirm: (id: string) => Promise<void>;
  onClose: () => void;
}) {
  const t = useTranslations("providers");
  // `key`-reset pattern: caller re-mounts the modal each open (different
  // connectionId triggers a new instance), so local confirmation state is
  // naturally fresh without any post-render bookkeeping.
  const [confirmed, setConfirmed] = useState(false);
  const isOpen = !!connectionId;

  if (!connectionId) return null;

  const title =
    typeof t.has === "function" && t.has("codexApplyModalTitle")
      ? t("codexApplyModalTitle")
      : "Apply to Local Codex";
  const targetLabel =
    typeof t.has === "function" && t.has("codexApplyTargetLabel")
      ? t("codexApplyTargetLabel")
      : "Target path";
  const backupLabel =
    typeof t.has === "function" && t.has("codexApplyBackupLabel")
      ? t("codexApplyBackupLabel")
      : "Backups";
  const warning =
    typeof t.has === "function" && t.has("codexApplyWarning")
      ? t("codexApplyWarning")
      : "This will replace the existing auth.json. Continue?";
  const confirmText =
    typeof t.has === "function" && t.has("codexApplyConfirmCheckbox")
      ? t("codexApplyConfirmCheckbox")
      : "I confirm I want to replace the existing auth.json";
  const applyText = typeof t.has === "function" && t.has("codexApply") ? t("codexApply") : "Apply";

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{targetLabel}</div>
          <code className="block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main">
            ~/.codex/auth.json
          </code>
          <p className="mt-1 text-xs text-text-muted">{t("providerDetailPathAutoDetectedAllOs")}</p>
        </div>
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{backupLabel}</div>
          <ul className="text-xs text-text-muted space-y-0.5 list-disc pl-4">
            <li>
              <code className="text-text-main">~/.codex/auth-&lt;timestamp&gt;.bak</code> — quick
              local rollback
            </li>
            <li>Centralized backup history (audit trail)</li>
          </ul>
        </div>
        <div className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined mt-0.5 text-[18px] text-amber-500">
              warning
            </span>
            <span>{warning}</span>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="rounded border-border"
          />
          {confirmText}
        </label>
        <div className="flex gap-2">
          <Button
            onClick={() => void onConfirm(connectionId)}
            fullWidth
            disabled={!confirmed || inProgress}
          >
            {inProgress ? t("saving") : applyText}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth disabled={inProgress}>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// ──── ImportClaudeAuthModal ────────────────────────────────────────────────────

interface ImportClaudeAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

type ClaudeImportTopTab = "single" | "bulk";
type ClaudeBulkSubMode = "upload" | "paste" | "zip";

interface ClaudeBulkEntry {
  name: string;
  json: unknown;
  parseError: string | null;
  email: string | null;
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

function ImportClaudeAuthModal({ onClose, onSuccess }: ImportClaudeAuthModalProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();

  const [topTab, setTopTab] = useState<ClaudeImportTopTab>("single");
  const [singleSubTab, setSingleSubTab] = useState<"upload" | "paste">("upload");
  const [bulkSubMode, setBulkSubMode] = useState<ClaudeBulkSubMode>("upload");

  // Single
  const [singleJson, setSingleJson] = useState<unknown>(null);
  const [singlePasteText, setSinglePasteText] = useState("");
  const [singleName, setSingleName] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [overwriteExisting, setOverwriteExisting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Bulk
  const [bulkEntries, setBulkEntries] = useState<ClaudeBulkEntry[]>([]);
  const [bulkPasteText, setBulkPasteText] = useState("");
  const [bulkSubmitting, setBulkSubmitting] = useState(false);
  const [bulkErrors, setBulkErrors] = useState<{ index: number; name: string; message: string }[]>(
    []
  );
  const [bulkResult, setBulkResult] = useState<{
    success: number;
    failed: number;
    total: number;
  } | null>(null);
  const [zipExtracting, setZipExtracting] = useState(false);

  const handleSingleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        setSingleJson(json);
      } catch {
        notify.error(
          typeof t.has === "function" && t.has("claudeImportInvalidJson")
            ? t("claudeImportInvalidJson")
            : "Could not parse the file as JSON"
        );
      }
    };
    reader.readAsText(file);
  };

  const handleSingleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      let rawJson: unknown;
      if (singleSubTab === "upload") {
        rawJson = singleJson;
      } else {
        try {
          rawJson = JSON.parse(singlePasteText);
        } catch {
          notify.error(
            typeof t.has === "function" && t.has("claudeImportInvalidJson")
              ? t("claudeImportInvalidJson")
              : "Could not parse the pasted content as JSON"
          );
          return;
        }
      }

      const body =
        singleSubTab === "paste"
          ? {
              source: { kind: "text", text: singlePasteText },
              name: singleName || undefined,
              email: singleEmail || undefined,
              overwriteExisting,
            }
          : {
              source: { kind: "json", json: rawJson },
              name: singleName || undefined,
              email: singleEmail || undefined,
              overwriteExisting,
            };

      const res = await fetch("/api/providers/claude-auth/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.code === "duplicate_account") {
          notify.error(
            typeof t.has === "function" && t.has("claudeImportDuplicate")
              ? t("claudeImportDuplicate")
              : 'Account already exists — enable "Replace existing" to overwrite'
          );
        } else if (data.code === "identity_unverified") {
          notify.error(
            typeof t.has === "function" && t.has("claudeImportIdentityUnverified")
              ? t("claudeImportIdentityUnverified")
              : 'Bootstrap could not verify the account. Enable "Replace existing" or provide an email.'
          );
        } else {
          notify.error(
            data.error ||
              (typeof t.has === "function" && t.has("claudeImportFailed")
                ? t("claudeImportFailed")
                : "Failed to import Claude auth")
          );
        }
        return;
      }

      notify.success(
        typeof t.has === "function" && t.has("claudeImportSuccess")
          ? t("claudeImportSuccess")
          : "Claude connection imported successfully"
      );
      onSuccess();
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("claudeImportFailed")
          ? t("claudeImportFailed")
          : "Failed to import Claude auth"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleBulkFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newEntries: ClaudeBulkEntry[] = [];
    let pending = files.length;
    if (!pending) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = JSON.parse(ev.target?.result as string);
          const email = extractEmailFromClaudeJson(json);
          newEntries.push({
            name: file.name.replace(/\.json$/, ""),
            json,
            parseError: null,
            email,
          });
        } catch {
          newEntries.push({
            name: file.name,
            json: null,
            parseError: "Not valid JSON",
            email: null,
          });
        }
        pending--;
        if (pending === 0) setBulkEntries((prev) => [...prev, ...newEntries]);
      };
      reader.readAsText(file);
    });
  };

  const handleBulkPasteChange = (text: string) => {
    setBulkPasteText(text);
    const trimmed = text.trim();
    if (!trimmed) {
      setBulkEntries([]);
      return;
    }
    try {
      const arr = JSON.parse(trimmed);
      if (Array.isArray(arr)) {
        setBulkEntries(
          arr.map((item, i) => ({
            name: `entry ${i + 1}`,
            json: item,
            parseError: null,
            email: null,
          }))
        );
      } else {
        setBulkEntries([{ name: "entry 1", json: arr, parseError: null, email: null }]);
      }
    } catch {
      setBulkEntries([
        { name: "parse error", json: null, parseError: "Invalid JSON", email: null },
      ]);
    }
  };

  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setZipExtracting(true);
    try {
      const res = await fetch("/api/providers/claude-auth/zip-extract", {
        method: "POST",
        headers: { "Content-Type": "application/zip" },
        body: file,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(
          data.error ||
            (typeof t.has === "function" && t.has("claudeImportBulkZipError")
              ? t("claudeImportBulkZipError")
              : "Failed to extract ZIP")
        );
        return;
      }
      const entries: ClaudeBulkEntry[] = (data.entries || []).map(
        (e: { name: string; json: unknown; parseError: string | null }) => ({
          name: e.name,
          json: e.json,
          parseError: e.parseError,
          email: null,
        })
      );
      setBulkEntries(entries);
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("claudeImportBulkZipError")
          ? t("claudeImportBulkZipError")
          : "Failed to extract ZIP"
      );
    } finally {
      setZipExtracting(false);
    }
  };

  const handleBulkSubmit = async () => {
    if (bulkSubmitting) return;
    setBulkSubmitting(true);
    setBulkErrors([]);
    setBulkResult(null);
    try {
      const validEntries = bulkEntries.filter((e) => e.json !== null);
      if (validEntries.length === 0) {
        notify.error("No valid entries to import");
        return;
      }
      const res = await fetch("/api/providers/claude-auth/import-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entries: validEntries.map((e) => ({
            json: e.json,
            name: e.name,
            email: e.email || undefined,
          })),
          overwriteExisting,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(
          data.error ||
            (typeof t.has === "function" && t.has("claudeImportBulkFailed")
              ? t("claudeImportBulkFailed")
              : "Some entries failed to import")
        );
        return;
      }
      setBulkResult({ success: data.success, failed: data.failed, total: data.total });
      if (data.errors?.length > 0) setBulkErrors(data.errors);
      if (data.success > 0) {
        notify.success(
          typeof t.has === "function" && t.has("claudeImportBulkSuccess")
            ? t("claudeImportBulkSuccess", { count: data.success })
            : `Imported ${data.success} Claude connections`
        );
        if (data.failed === 0) onSuccess();
      }
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("claudeImportBulkFailed")
          ? t("claudeImportBulkFailed")
          : "Some entries failed to import"
      );
    } finally {
      setBulkSubmitting(false);
    }
  };

  const tabLabels: Record<ClaudeImportTopTab, string> = {
    single:
      typeof t.has === "function" && t.has("claudeImportTabSingle")
        ? t("claudeImportTabSingle")
        : "Single",
    bulk:
      typeof t.has === "function" && t.has("claudeImportTabBulk")
        ? t("claudeImportTabBulk")
        : "Bulk",
  };

  const modalTitle =
    typeof t.has === "function" && t.has("claudeImportModalTitle")
      ? t("claudeImportModalTitle")
      : "Import Claude Auth";

  return (
    <Modal isOpen onClose={onClose} title={modalTitle}>
      <div className="flex flex-col gap-4">
        {/* Top tabs */}
        <div className="flex gap-1 border-b border-border pb-0">
          {(["single", "bulk"] as ClaudeImportTopTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setTopTab(tab)}
              className={`px-3 py-1.5 text-sm rounded-t-md transition-colors ${
                topTab === tab
                  ? "bg-primary/10 text-primary border-b-2 border-primary"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        {topTab === "single" && (
          <div className="flex flex-col gap-3">
            {/* Sub-tabs */}
            <div className="flex gap-1">
              {(["upload", "paste"] as const).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSingleSubTab(sub)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    singleSubTab === sub
                      ? "bg-bg-subtle text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {sub === "upload"
                    ? typeof t.has === "function" && t.has("claudeImportTabUpload")
                      ? t("claudeImportTabUpload")
                      : "Upload file"
                    : typeof t.has === "function" && t.has("claudeImportTabPaste")
                      ? t("claudeImportTabPaste")
                      : "Paste JSON"}
                </button>
              ))}
            </div>
            {singleSubTab === "upload" ? (
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportFileLabel")
                    ? t("claudeImportFileLabel")
                    : "Choose .credentials.json"}
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleSingleFileChange}
                  className="block w-full text-sm"
                />
                {singleJson && previewClaudeJson(singleJson).valid && (
                  <p className="mt-1 text-xs text-emerald-500">
                    {t("providerDetailValidClaudeCredentialsFile")}
                  </p>
                )}
                {singleJson && !previewClaudeJson(singleJson).valid && (
                  <p className="mt-1 text-xs text-red-500">
                    {typeof t.has === "function" && t.has("claudeImportInvalidShape")
                      ? t("claudeImportInvalidShape")
                      : "The file is not a valid .credentials.json"}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportPasteLabel")
                    ? t("claudeImportPasteLabel")
                    : "Paste the JSON content"}
                </label>
                <textarea
                  value={singlePasteText}
                  onChange={(e) => setSinglePasteText(e.target.value)}
                  rows={6}
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main"
                  placeholder='{ "claudeAiOauth": { ... } }'
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportEmailLabel")
                    ? t("claudeImportEmailLabel")
                    : "Account email"}
                </label>
                <input
                  type="email"
                  value={singleEmail}
                  onChange={(e) => setSingleEmail(e.target.value)}
                  placeholder="auto-detected"
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs text-text-main"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportNameLabel")
                    ? t("claudeImportNameLabel")
                    : "Connection name (optional)"}
                </label>
                <input
                  type="text"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  placeholder="My Claude account"
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs text-text-main"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs text-text-muted">
              <input
                type="checkbox"
                checked={overwriteExisting}
                onChange={(e) => setOverwriteExisting(e.target.checked)}
              />
              {typeof t.has === "function" && t.has("claudeImportOverwriteLabel")
                ? t("claudeImportOverwriteLabel")
                : "Replace existing connection if account already exists"}
            </label>
            <Button
              loading={submitting}
              onClick={handleSingleSubmit}
              disabled={singleSubTab === "upload" ? !singleJson : !singlePasteText.trim()}
            >
              {typeof t.has === "function" && t.has("claudeImportSubmit")
                ? t("claudeImportSubmit")
                : "Import"}
            </Button>
          </div>
        )}

        {topTab === "bulk" && (
          <div className="flex flex-col gap-3">
            {/* Sub-mode tabs */}
            <div className="flex gap-1">
              {(["upload", "paste", "zip"] as ClaudeBulkSubMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setBulkSubMode(mode);
                    setBulkEntries([]);
                  }}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    bulkSubMode === mode
                      ? "bg-bg-subtle text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {mode === "upload"
                    ? typeof t.has === "function" && t.has("claudeImportBulkModeUpload")
                      ? t("claudeImportBulkModeUpload")
                      : "Upload files"
                    : mode === "paste"
                      ? typeof t.has === "function" && t.has("claudeImportBulkModePaste")
                        ? t("claudeImportBulkModePaste")
                        : "Paste JSON array"
                      : typeof t.has === "function" && t.has("claudeImportBulkModeZip")
                        ? t("claudeImportBulkModeZip")
                        : "Upload ZIP"}
                </button>
              ))}
            </div>

            {bulkSubMode === "upload" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportBulkUploadHint")
                    ? t("claudeImportBulkUploadHint")
                    : "Drop or pick up to 50 .credentials.json files (256KB each, 10MB total)."}
                </p>
                <input
                  type="file"
                  accept=".json"
                  multiple
                  onChange={handleBulkFilesChange}
                  className="block w-full text-sm"
                />
              </div>
            )}
            {bulkSubMode === "paste" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportBulkPasteHint")
                    ? t("claudeImportBulkPasteHint")
                    : "Paste an array of objects: [{ json, name?, email? }, ...]"}
                </p>
                <textarea
                  value={bulkPasteText}
                  onChange={(e) => handleBulkPasteChange(e.target.value)}
                  rows={6}
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main"
                  placeholder="[{ ... }, { ... }]"
                />
              </div>
            )}
            {bulkSubMode === "zip" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("claudeImportBulkZipHint")
                    ? t("claudeImportBulkZipHint")
                    : "ZIP containing .json entries. Max 50 entries, 10MB unpacked."}
                </p>
                {zipExtracting ? (
                  <p className="text-xs text-primary animate-pulse">
                    {typeof t.has === "function" && t.has("claudeImportBulkZipExtracting")
                      ? t("claudeImportBulkZipExtracting")
                      : "Extracting ZIP…"}
                  </p>
                ) : (
                  <input
                    type="file"
                    accept=".zip"
                    onChange={handleZipUpload}
                    className="block w-full text-sm"
                  />
                )}
              </div>
            )}

            {bulkEntries.length > 0 && (
              <div className="rounded border border-border bg-bg-subtle px-2 py-1.5 max-h-36 overflow-y-auto">
                {bulkEntries.map((e, i) => (
                  <div
                    key={i}
                    className={`text-xs py-0.5 flex items-center gap-1 ${e.parseError ? "text-red-500" : "text-text-main"}`}
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      {e.parseError ? "error" : "check_circle"}
                    </span>
                    {e.name}
                    {e.email ? ` (${e.email})` : ""}
                    {e.parseError ? ` — ${e.parseError}` : ""}
                  </div>
                ))}
              </div>
            )}

            <label className="flex items-center gap-2 text-xs text-text-muted">
              <input
                type="checkbox"
                checked={overwriteExisting}
                onChange={(e) => setOverwriteExisting(e.target.checked)}
              />
              {typeof t.has === "function" && t.has("claudeImportOverwriteLabel")
                ? t("claudeImportOverwriteLabel")
                : "Replace existing connection if account already exists"}
            </label>

            {bulkResult && (
              <div className="rounded bg-bg-subtle px-2 py-1.5 text-xs">
                {bulkResult.success}/{bulkResult.total} imported
                {bulkResult.failed > 0 ? `, ${bulkResult.failed} failed` : ""}
              </div>
            )}
            {bulkErrors.length > 0 && (
              <div className="rounded border border-red-500/30 bg-red-500/5 px-2 py-1.5 max-h-28 overflow-y-auto">
                {bulkErrors.map((e) => (
                  <div key={e.index} className="text-xs text-red-500 py-0.5">
                    {e.name}: {e.message}
                  </div>
                ))}
              </div>
            )}

            <Button
              loading={bulkSubmitting}
              onClick={handleBulkSubmit}
              disabled={bulkEntries.filter((e) => e.json !== null).length === 0}
            >
              {typeof t.has === "function" && t.has("claudeImportBulkSubmit")
                ? t("claudeImportBulkSubmit")
                : "Import all"}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}

// ──── ApplyClaudeAuthModal ────────────────────────────────────────────────────

function ApplyClaudeAuthModal({
  connectionId,
  inProgress,
  onConfirm,
  onClose,
}: {
  connectionId: string | null;
  inProgress: boolean;
  onConfirm: (id: string) => Promise<void>;
  onClose: () => void;
}) {
  const t = useTranslations("providers");
  const [confirmed, setConfirmed] = useState(false);
  const isOpen = !!connectionId;

  if (!connectionId) return null;

  const title =
    typeof t.has === "function" && t.has("claudeApplyModalTitle")
      ? t("claudeApplyModalTitle")
      : "Apply to Local Claude Code";
  const targetLabel =
    typeof t.has === "function" && t.has("claudeApplyTargetLabel")
      ? t("claudeApplyTargetLabel")
      : "Target path";
  const backupLabel =
    typeof t.has === "function" && t.has("claudeApplyBackupLabel")
      ? t("claudeApplyBackupLabel")
      : "Backups";
  const warning =
    typeof t.has === "function" && t.has("claudeApplyWarning")
      ? t("claudeApplyWarning")
      : "This will replace the existing claudeAiOauth section. Continue?";
  const confirmText =
    typeof t.has === "function" && t.has("claudeApplyConfirmCheckbox")
      ? t("claudeApplyConfirmCheckbox")
      : "I confirm I want to replace the existing claudeAiOauth section";
  const applyText =
    typeof t.has === "function" && t.has("claudeApply") ? t("claudeApply") : "Apply";
  const mcpHint =
    typeof t.has === "function" && t.has("claudeApplyMcpHint")
      ? t("claudeApplyMcpHint")
      : "Existing MCP OAuth state will be preserved.";

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{targetLabel}</div>
          <code className="block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main">
            ~/.claude/.credentials.json
          </code>
          <p className="mt-1 text-xs text-text-muted">Path is auto-detected per OS (Linux/Mac).</p>
        </div>
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{backupLabel}</div>
          <code className="block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main">
            {"~/.claude/credentials-{timestamp}.bak"}
          </code>
        </div>
        <div className="rounded bg-sky-500/10 border border-sky-500/20 px-3 py-2 text-xs text-sky-400">
          {mcpHint}
        </div>
        <p className="text-sm text-text-muted">{warning}</p>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          {confirmText}
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={inProgress}>
            Cancel
          </Button>
          <Button
            loading={inProgress}
            disabled={!confirmed || inProgress}
            onClick={() => void onConfirm(connectionId)}
          >
            {applyText}
          </Button>
        </div>
      </div>
    </Modal>
  );
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

function EditConnectionModal({ isOpen, connection, onSave, onClose }: EditConnectionModalProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const [formData, setFormData] = useState({
    name: "",
    priority: 1,
    maxConcurrent: "",
    apiKey: "",
    healthCheckInterval: 60,
    baseUrl: "",
    cx: "",
    region: "",
    apiRegion: "international",
    validationModelId: "",
    tag: "",
    routingTags: "",
    excludedModels: "",
    customUserAgent: "",
    accountId: "",
    codexReasoningEffort: "medium",
    codexFastServiceTier: false,
    codexOpenaiStoreEnabled: false,
    consoleApiKey: "",
    ccCompatibleContext1m: false,
    cloudCodeProjectId: "",
    antigravityClientProfile: "ide",
    blockExtraUsage:
      connection?.provider === "claude"
        ? isClaudeExtraUsageBlockEnabled(connection?.provider, connection?.providerSpecificData)
        : false,
    passthroughModels: connection?.providerSpecificData?.passthroughModels === true,
  });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [extraApiKeys, setExtraApiKeys] = useState<string[]>([]);
  const [newExtraKey, setNewExtraKey] = useState("");
  const [apiKeyHealth, setApiKeyHealth] = useState<
    Record<
      string,
      {
        status: "active" | "warning" | "invalid";
        failures: number;
        lastFailure: string | null;
        totalRequests?: number;
        totalFailures?: number;
      }
    >
  >({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { emailsVisible: showEmail, toggleEmailVisibility: toggleShowEmail } =
    useEmailPrivacyStore();

  const usesBaseUrl = isBaseUrlConfigurableProvider(connection?.provider);
  const defaultBaseUrl = getProviderBaseUrlDefault(connection?.provider);
  const isVertex = connection?.provider === "vertex" || connection?.provider === "vertex-partner";
  const isGlm = isGlmProvider(connection?.provider);
  const isCloudflare = connection?.provider === "cloudflare-ai";
  const isCodex = connection?.provider === "codex";
  const isClaude = connection?.provider === "claude";
  const isGeminiCli = connection?.provider === "gemini-cli";
  const isAntigravity = connection?.provider === "antigravity";
  const supportsGoogleProjectId = isGeminiCli || isAntigravity;
  const localProviderMetadata = getLocalProviderMetadata(connection?.provider);
  const isLocalSelfHostedProvider = !!localProviderMetadata;
  const isGooglePse = connection?.provider === "google-pse-search";
  const apiKeyOptional = providerAllowsOptionalApiKey(connection?.provider);
  const isCcCompatible = isClaudeCodeCompatibleProvider(connection?.provider);
  const defaultRegion = "us-central1";
  const apiCredentialHint = isLocalSelfHostedProvider
    ? t("localProviderApiKeyOptionalHint", {
        provider: localProviderMetadata?.name || connection?.provider || "",
      })
    : apiKeyOptional
      ? t("apiKeyOptionalHint")
      : t("leaveBlankKeepCurrentApiKey");

  useEffect(() => {
    if (isOpen && connection) {
      const rawBaseUrl = connection.providerSpecificData?.baseUrl;
      const existingBaseUrl = typeof rawBaseUrl === "string" ? rawBaseUrl : "";
      const rawRegion = connection.providerSpecificData?.region;
      const existingRegion = typeof rawRegion === "string" ? rawRegion : "";
      const rawCustomUserAgent = connection.providerSpecificData?.customUserAgent;
      const existingCustomUserAgent =
        typeof rawCustomUserAgent === "string" ? rawCustomUserAgent : "";
      const rawCx = connection.providerSpecificData?.cx;
      const existingCx = typeof rawCx === "string" ? rawCx : "";
      const rawAccountId = connection.providerSpecificData?.accountId;
      const existingAccountId = typeof rawAccountId === "string" ? rawAccountId : "";
      const codexRequestDefaults = getCodexRequestDefaults(connection.providerSpecificData);
      const ccRequestDefaults = getClaudeCodeCompatibleRequestDefaults(
        connection.providerSpecificData
      );
      const rawConsoleApiKey = connection.providerSpecificData?.consoleApiKey;
      const existingConsoleApiKey = typeof rawConsoleApiKey === "string" ? rawConsoleApiKey : "";
      setFormData({
        name: connection.name || "",
        priority: connection.priority || 1,
        maxConcurrent:
          connection.maxConcurrent !== null && connection.maxConcurrent !== undefined
            ? String(connection.maxConcurrent)
            : "",
        apiKey: "",
        healthCheckInterval: connection.healthCheckInterval ?? 60,
        baseUrl: existingBaseUrl || defaultBaseUrl,
        cx: existingCx,
        region: existingRegion || (isVertex ? defaultRegion : ""),
        apiRegion: (connection.providerSpecificData?.apiRegion as string) || "international",
        validationModelId: (connection.providerSpecificData?.validationModelId as string) || "",
        tag: (connection.providerSpecificData?.tag as string) || "",
        routingTags: formatRoutingTagsInput(connection.providerSpecificData?.tags),
        excludedModels: formatExcludedModelsInput(
          connection.providerSpecificData?.excludedModels ??
            connection.providerSpecificData?.excluded_models
        ),
        customUserAgent: existingCustomUserAgent,
        accountId: existingAccountId,
        codexReasoningEffort: codexRequestDefaults.reasoningEffort,
        codexFastServiceTier: codexRequestDefaults.serviceTier === "priority",
        codexOpenaiStoreEnabled: connection.providerSpecificData?.openaiStoreEnabled === true,
        consoleApiKey: existingConsoleApiKey,
        ccCompatibleContext1m: ccRequestDefaults.context1m,
        cloudCodeProjectId:
          (connection.providerSpecificData?.projectId as string) || connection.projectId || "",
        antigravityClientProfile: normalizeAntigravityClientProfileSetting(
          connection.providerSpecificData?.clientProfile
        ),
        blockExtraUsage: isClaudeExtraUsageBlockEnabled(
          connection.provider,
          connection.providerSpecificData
        ),
        passthroughModels: connection?.providerSpecificData?.passthroughModels === true,
      });
      // Load existing extra keys from providerSpecificData
      const existing = connection.providerSpecificData?.extraApiKeys;
      setExtraApiKeys(Array.isArray(existing) ? existing : []);
      // Load API key health status
      const health = connection.providerSpecificData?.apiKeyHealth as
        | Record<
            string,
            {
              status: "active" | "warning" | "invalid";
              failures: number;
              lastFailure: string | null;
              totalRequests?: number;
              totalFailures?: number;
            }
          >
        | undefined;
      setApiKeyHealth(health || {});
      setNewExtraKey("");
      setShowAdvanced(!!existingCustomUserAgent);
      // email visibility controlled by global store
      setTestResult(null);
      setValidationResult(null);
      setSaveError(null);
    }
  }, [isOpen, connection, defaultBaseUrl, isVertex]);

  const handleTest = async () => {
    if (!connection?.provider) return;
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(`/api/providers/${connection.id}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          validationModelId: formData.validationModelId || undefined,
        }),
      });
      const data = await res.json();
      setTestResult({
        valid: !!data.valid,
        diagnosis: data.diagnosis || null,
        message: data.error || null,
      });
    } catch {
      setTestResult({
        valid: false,
        diagnosis: { type: "network_error" },
        message: t("failedTestConnection"),
      });
    } finally {
      setTesting(false);
    }
  };

  const handleValidate = async () => {
    if (!connection?.provider || (!isCompatible && !apiKeyOptional && !formData.apiKey)) return;
    setValidating(true);
    setValidationResult(null);
    try {
      const res = await fetch("/api/providers/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: connection.provider,
          apiKey: formData.apiKey,
          validationModelId: formData.validationModelId || undefined,
          customUserAgent: formData.customUserAgent.trim() || undefined,
          baseUrl: formData.baseUrl.trim() || undefined,
          cx: formData.cx.trim() || undefined,
        }),
      });
      const data = await res.json();
      setValidationResult(data.valid ? "success" : "failed");
    } catch {
      setValidationResult("failed");
    } finally {
      setValidating(false);
    }
  };

  const handleAddParsedExtraKeys = (raw: string) => {
    const { added, duplicates } = parseExtraApiKeys(raw, extraApiKeys);
    if (added.length > 0) {
      setExtraApiKeys((prev) => [...prev, ...added]);
      notify.success(t("bulkPasteAdded", { count: added.length }));
    }
    if (duplicates > 0) {
      notify.warning(t("bulkPasteDuplicatesIgnored", { count: duplicates }));
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const trimmedMaxConcurrent = formData.maxConcurrent.trim();
      const trimmedCloudCodeProjectId = formData.cloudCodeProjectId.trim();
      let parsedMaxConcurrent: number | null = null;
      if (trimmedMaxConcurrent) {
        const numericMaxConcurrent = Number(trimmedMaxConcurrent);
        if (!Number.isInteger(numericMaxConcurrent) || numericMaxConcurrent < 0) {
          setSaveError(t("maxConcurrentWholeNumberError"));
          return;
        }
        parsedMaxConcurrent = numericMaxConcurrent;
      }

      const updates: any = {
        name: formData.name,
        priority: formData.priority,
        maxConcurrent: parsedMaxConcurrent,
        healthCheckInterval: formData.healthCheckInterval,
      };

      if (supportsGoogleProjectId) {
        updates.projectId = trimmedCloudCodeProjectId || null;
      }

      if (isGooglePse && !formData.cx.trim()) {
        setSaveError(t("searchEngineIdRequired"));
        return;
      }

      let validatedBaseUrl = null;
      if (usesBaseUrl) {
        const checked = normalizeAndValidateHttpBaseUrl(formData.baseUrl, defaultBaseUrl);
        if (checked.error) {
          setSaveError(checked.error);
          return;
        }
        validatedBaseUrl = checked.value;
      }

      if (!isOAuth && formData.apiKey) {
        updates.apiKey = formData.apiKey;
        let isValid = validationResult === "success";
        if (!isValid) {
          try {
            setValidating(true);
            setValidationResult(null);
            const res = await fetch("/api/providers/validate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                provider: connection.provider,
                apiKey: formData.apiKey,
                validationModelId: formData.validationModelId || undefined,
                customUserAgent: formData.customUserAgent.trim() || undefined,
                baseUrl: formData.baseUrl.trim() || undefined,
                cx: formData.cx.trim() || undefined,
              }),
            });
            const data = await res.json();
            isValid = !!data.valid;
            setValidationResult(isValid ? "success" : "failed");
          } catch {
            setValidationResult("failed");
          } finally {
            setValidating(false);
          }
        }
        if (isValid) {
          updates.testStatus = "active";
          updates.lastError = null;
          updates.lastErrorAt = null;
          updates.lastErrorType = null;
          updates.lastErrorSource = null;
          updates.errorCode = null;
          updates.rateLimitedUntil = null;
        }
      }
      // Persist extra API keys and baseUrl in providerSpecificData
      if (!isOAuth) {
        updates.providerSpecificData = {
          ...(connection.providerSpecificData || {}),
          extraApiKeys: extraApiKeys.filter((k) => k.trim().length > 0),
          tag: formData.tag.trim() || undefined,
          tags: parseRoutingTagsInput(formData.routingTags),
          excludedModels: parseExcludedModelsInput(formData.excludedModels),
          customUserAgent: formData.customUserAgent.trim(),
          // Only write when explicitly enabled; omit to let registry default take effect
          ...(formData.passthroughModels ? { passthroughModels: true } : {}),
        };
        if (connection.provider === "bailian-coding-plan") {
          if (formData.consoleApiKey.trim()) {
            updates.providerSpecificData.consoleApiKey = formData.consoleApiKey.trim();
          } else {
            updates.providerSpecificData.consoleApiKey = undefined;
          }
        }
        if (formData.validationModelId) {
          updates.providerSpecificData.validationModelId = formData.validationModelId;
        }
        if (isGooglePse) {
          updates.providerSpecificData.cx = formData.cx.trim() || undefined;
        }
        if (usesBaseUrl) {
          updates.providerSpecificData.baseUrl = validatedBaseUrl;
        } else if (isVertex) {
          updates.providerSpecificData.region = formData.region;
        } else if (isGlm) {
          updates.providerSpecificData.apiRegion = formData.apiRegion;
        } else if (isCloudflare && formData.accountId.trim()) {
          updates.providerSpecificData.accountId = formData.accountId.trim();
        }
        if (supportsGoogleProjectId) {
          updates.providerSpecificData.projectId = trimmedCloudCodeProjectId || null;
        }
        if (isCcCompatible) {
          const currentRequestDefaults =
            updates.providerSpecificData.requestDefaults &&
            typeof updates.providerSpecificData.requestDefaults === "object" &&
            !Array.isArray(updates.providerSpecificData.requestDefaults)
              ? { ...(updates.providerSpecificData.requestDefaults as Record<string, unknown>) }
              : {};
          if (formData.ccCompatibleContext1m) {
            currentRequestDefaults.context1m = true;
          } else {
            delete currentRequestDefaults.context1m;
          }
          updates.providerSpecificData.requestDefaults =
            Object.keys(currentRequestDefaults).length > 0 ? currentRequestDefaults : undefined;
        }
      } else {
        // Also persist tag for OAuth accounts
        updates.providerSpecificData = {
          ...(connection.providerSpecificData || {}),
          tag: formData.tag.trim() || undefined,
          tags: parseRoutingTagsInput(formData.routingTags),
          excludedModels: parseExcludedModelsInput(formData.excludedModels),
        };
        if (isClaude) {
          updates.providerSpecificData.blockExtraUsage = formData.blockExtraUsage;
        }
        if (isCodex) {
          updates.providerSpecificData.requestDefaults = {
            reasoningEffort: formData.codexReasoningEffort,
            ...(formData.codexFastServiceTier ? { serviceTier: "priority" } : {}),
          };
          updates.providerSpecificData.openaiStoreEnabled =
            formData.codexOpenaiStoreEnabled === true;
        }
        if (supportsGoogleProjectId) {
          updates.providerSpecificData.projectId = trimmedCloudCodeProjectId || null;
        }
      }
      if (isAntigravity) {
        updates.providerSpecificData = {
          ...(connection.providerSpecificData || {}),
          ...(updates.providerSpecificData || {}),
          clientProfile: normalizeAntigravityClientProfileSetting(
            formData.antigravityClientProfile
          ),
        };
      }
      const error = (await onSave(updates)) as void | unknown;
      if (error) {
        setSaveError(typeof error === "string" ? error : t("failedSaveConnection"));
      }
    } finally {
      setSaving(false);
    }
  };

  if (!connection) return null;

  const isOAuth = connection.authType === "oauth";
  const isCompatible =
    isOpenAICompatibleProvider(connection.provider) ||
    isAnthropicCompatibleProvider(connection.provider);
  const testErrorMeta =
    !testResult?.valid && testResult?.diagnosis?.type
      ? ERROR_TYPE_LABELS[testResult.diagnosis.type] || null
      : null;

  return (
    <Modal isOpen={isOpen} title={t("editConnection")} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Input
          label={t("nameLabel")}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={isOAuth ? t("accountName") : t("productionKey")}
        />
        <Input
          label={t("tagGroupLabel")}
          value={formData.tag}
          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          placeholder={t("tagGroupPlaceholder")}
          hint={t("tagGroupHint")}
        />
        <Input
          label={t("routingTagsLabel")}
          value={formData.routingTags}
          onChange={(e) => setFormData({ ...formData, routingTags: e.target.value })}
          placeholder={t("routingTagsPlaceholder")}
          hint={t("routingTagsHint")}
        />
        <Input
          label={t("excludedModelsLabel")}
          value={formData.excludedModels}
          onChange={(e) => setFormData({ ...formData, excludedModels: e.target.value })}
          placeholder={t("excludedModelsPlaceholder")}
          hint={t("excludedModelsHint")}
        />
        {isCodex && (
          <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
            <Select
              label={t("defaultThinkingStrengthLabel")}
              value={formData.codexReasoningEffort}
              options={CODEX_REASONING_STRENGTH_OPTIONS}
              onChange={(e) => setFormData({ ...formData, codexReasoningEffort: e.target.value })}
              hint={t("defaultThinkingStrengthHint")}
            />
            <Toggle
              checked={formData.codexFastServiceTier}
              onChange={(checked) => setFormData({ ...formData, codexFastServiceTier: checked })}
              label={t("codexFastServiceTierLabel")}
              description={t("codexFastServiceTierDescription")}
            />
            <Toggle
              checked={formData.codexOpenaiStoreEnabled}
              onChange={(checked) => setFormData({ ...formData, codexOpenaiStoreEnabled: checked })}
              label={t("openaiResponsesStoreLabel")}
              description={t("openaiResponsesStoreDescription")}
            />
          </div>
        )}
        {isClaude && (
          <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
            <Toggle
              checked={formData.blockExtraUsage}
              onChange={(checked) => setFormData({ ...formData, blockExtraUsage: checked })}
              label={t("blockClaudeExtraUsageLabel")}
              description={t("blockClaudeExtraUsageDescription")}
            />
          </div>
        )}
        {isCcCompatible && (
          <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
            <Toggle
              checked={formData.ccCompatibleContext1m}
              onChange={(checked) => setFormData({ ...formData, ccCompatibleContext1m: checked })}
              label={t("ccCompatibleContext1mLabel")}
              description={t("ccCompatibleContext1mDescription")}
            />
          </div>
        )}
        {supportsGoogleProjectId && (
          <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-surface/20 p-4">
            {isAntigravity && (
              <Select
                label={t("antigravityClientProfileLabel")}
                value={formData.antigravityClientProfile}
                options={ANTIGRAVITY_CLIENT_PROFILE_OPTIONS.map((option) => ({
                  value: option.value,
                  label: t(option.labelKey),
                }))}
                onChange={(e) =>
                  setFormData({ ...formData, antigravityClientProfile: e.target.value })
                }
                hint={t("antigravityClientProfileHint")}
              />
            )}
            <Input
              label={isAntigravity ? t("antigravityProjectIdLabel") : t("geminiCliProjectIdLabel")}
              value={formData.cloudCodeProjectId}
              onChange={(e) => setFormData({ ...formData, cloudCodeProjectId: e.target.value })}
              placeholder={
                isAntigravity
                  ? t("antigravityProjectIdPlaceholder")
                  : t("geminiCliProjectIdPlaceholder")
              }
              hint={isAntigravity ? t("antigravityProjectIdHint") : t("geminiCliProjectIdHint")}
              className="font-mono text-xs"
            />
          </div>
        )}
        {isOAuth && connection.email && (
          <div className="bg-sidebar/50 p-3 rounded-lg">
            <p className="text-sm text-text-muted mb-1">{t("email")}</p>
            <div className="flex items-center gap-2">
              <p className="font-medium" title={showEmail ? connection.email : undefined}>
                {showEmail ? connection.email : maskEmail(connection.email)}
              </p>
              <button
                type="button"
                onClick={toggleShowEmail}
                className="rounded p-1 text-text-muted hover:bg-sidebar hover:text-primary"
                title={showEmail ? t("hideEmail") : t("showEmail")}
              >
                <span className="material-symbols-outlined text-sm">
                  {showEmail ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>
        )}
        {isOAuth && (
          <Input
            label={t("healthCheckMinutes")}
            type="number"
            value={formData.healthCheckInterval}
            onChange={(e) =>
              setFormData({
                ...formData,
                healthCheckInterval: Math.max(0, Number.parseInt(e.target.value) || 0),
              })
            }
            hint={t("healthCheckHint")}
          />
        )}
        <Input
          label={t("priorityLabel")}
          type="number"
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: Number.parseInt(e.target.value) || 1 })
          }
        />
        <Input
          label={t("accountConcurrencyCapLabel")}
          type="number"
          min={0}
          step={1}
          value={formData.maxConcurrent}
          onChange={(e) => {
            const nextValue = e.target.value;
            setFormData({ ...formData, maxConcurrent: nextValue });
            if (saveError && nextValue.trim()) {
              const numericValue = Number(nextValue);
              if (Number.isInteger(numericValue) && numericValue >= 0) {
                setSaveError(null);
              }
            }
          }}
          placeholder="0"
          hint={t("accountConcurrencyCapHint")}
        />
        {saveError && (
          <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {saveError}
          </div>
        )}
        {!isOAuth && (
          <>
            <div className="flex gap-2">
              <Input
                label={apiKeyOptional ? t("apiKeyOptionalLabel") : t("apiKeyLabel")}
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                placeholder={isVertex ? t("vertexServiceAccountPlaceholder") : t("enterNewApiKey")}
                hint={apiCredentialHint}
                className="flex-1"
              />
              <div className="pt-6">
                <Button
                  onClick={handleValidate}
                  disabled={
                    (!isCompatible && !apiKeyOptional && !formData.apiKey) ||
                    (isGooglePse && !formData.cx.trim()) ||
                    validating ||
                    saving
                  }
                  variant="secondary"
                >
                  {validating ? t("checking") : t("check")}
                </Button>
              </div>
            </div>
            {isGooglePse && (
              <Input
                label={t("searchEngineIdLabel")}
                value={formData.cx}
                onChange={(e) => setFormData({ ...formData, cx: e.target.value })}
                placeholder="012345678901234567890:abc123xyz"
                hint={t("searchEngineIdHint")}
              />
            )}
            {validationResult && (
              <Badge variant={validationResult === "success" ? "success" : "error"}>
                {validationResult === "success" ? t("valid") : t("invalid")}
              </Badge>
            )}
            <button
              type="button"
              className="text-sm text-text-muted hover:text-text-primary flex items-center gap-1"
              onClick={() => setShowAdvanced(!showAdvanced)}
              aria-expanded={showAdvanced}
              aria-controls="edit-connection-advanced-settings"
            >
              <span
                className={`transition-transform ${showAdvanced ? "rotate-90" : ""}`}
                aria-hidden="true"
              >
                ▶
              </span>
              {t("advancedSettings")}
            </button>
            {showAdvanced && (
              <div
                id="edit-connection-advanced-settings"
                className="flex flex-col gap-3 pl-2 border-l-2 border-border"
              >
                <Input
                  label={t("customUserAgentLabel")}
                  value={formData.customUserAgent}
                  onChange={(e) => setFormData({ ...formData, customUserAgent: e.target.value })}
                  placeholder="my-app/1.0"
                  hint={t("customUserAgentHint")}
                />
                <Toggle
                  size="sm"
                  checked={formData.passthroughModels}
                  onChange={(checked) => setFormData({ ...formData, passthroughModels: checked })}
                  label={t("perModelQuotaLabel")}
                  description={t("perModelQuotaDescription")}
                />
                {connection.provider === "bailian-coding-plan" && (
                  <Input
                    label={t("consoleApiKeyOracleLabel")}
                    value={formData.consoleApiKey}
                    onChange={(e) => setFormData({ ...formData, consoleApiKey: e.target.value })}
                    placeholder={t("consoleApiKeyOraclePlaceholder")}
                    hint={t("consoleApiKeyOracleHint")}
                    type="password"
                  />
                )}
              </div>
            )}
            <Input
              label={t("validationModelIdLabel")}
              placeholder={t("validationModelIdPlaceholder")}
              value={formData.validationModelId}
              onChange={(e) => setFormData({ ...formData, validationModelId: e.target.value })}
              hint={t("validationModelIdHint")}
            />
          </>
        )}

        {usesBaseUrl && (
          <Input
            label={t("baseUrlLabel")}
            value={formData.baseUrl}
            onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
            placeholder={getProviderBaseUrlPlaceholder(connection.provider)}
            hint={getProviderBaseUrlHint(connection.provider, t)}
          />
        )}

        {isVertex && (
          <Input
            label={t("regionLabel")}
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            placeholder={defaultRegion}
            hint={t("regionHint")}
          />
        )}

        {isCloudflare && (
          <Input
            label={t("accountIdLabel")}
            value={formData.accountId}
            onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
            placeholder={t("accountIdPlaceholder")}
            hint={t("accountIdHint")}
          />
        )}

        {isGlm && (
          <div>
            <label className="text-sm font-medium text-text-main mb-1 block">
              {t("apiRegionLabel")}
            </label>
            <select
              value={formData.apiRegion}
              onChange={(e) => setFormData({ ...formData, apiRegion: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
            >
              <option value="international">{t("apiRegionInternational")}</option>
              <option value="china">{t("apiRegionChina")}</option>
            </select>
            <p className="text-xs text-text-muted mt-1">{t("apiRegionHint")}</p>
          </div>
        )}

        {/* T07: API Key Health Status */}
        {!isOAuth && connection?.apiKey && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-main">{t("apiKeyHealthLabel")}</label>
            <div className="flex flex-col gap-1.5">
              {/* Primary Key Health */}
              {(() => {
                const keyId = "primary";
                const health = apiKeyHealth[keyId];
                const statusColor =
                  health?.status === "invalid"
                    ? "text-red-400"
                    : health?.status === "warning"
                      ? "text-yellow-400"
                      : "text-text-muted";
                const statusIcon =
                  health?.status === "invalid" ? "🔴" : health?.status === "warning" ? "🟡" : "🟢";
                const statusLabel =
                  health?.status === "invalid"
                    ? t("apiKeyStatusInvalid")
                    : health?.status === "warning"
                      ? t("apiKeyStatusWarning", { count: health.failures })
                      : t("apiKeyStatusActive");

                return (
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex-1 font-mono text-xs bg-sidebar/50 px-3 py-2 rounded border border-border truncate ${statusColor}`}
                    >
                      {statusIcon} {t("primaryKey")}: {connection.apiKey.slice(0, 6)}...
                      {connection.apiKey.slice(-4)}
                    </span>
                    {health && (
                      <span
                        className="text-[10px] text-text-muted whitespace-nowrap"
                        title={statusLabel}
                      >
                        {health.failures}x
                        {health.lastFailure ? ` · ${formatTimeAgo(health.lastFailure)}` : ""}
                        {health.totalRequests != null
                          ? ` · (${health.totalRequests} req${health.totalFailures != null ? `, ${health.totalFailures} fail` : ""})`
                          : ""}
                      </span>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* T07: Extra API Keys for round-robin rotation */}
        {!isOAuth && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-text-main">
                {t("extraApiKeysLabel")}
                <span className="ml-2 text-[11px] font-normal text-text-muted">
                  ({t("extraApiKeysHint")})
                </span>
              </label>
              {extraApiKeys.length > 0 && (
                <button
                  type="button"
                  onClick={() => setExtraApiKeys([])}
                  className="px-2.5 py-1.5 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 text-xs font-medium transition-colors"
                >
                  {t("deleteAllExtraApiKeys")}
                </button>
              )}
            </div>
            {extraApiKeys.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {extraApiKeys.map((key, idx) => {
                  const keyId = `extra_${idx}`;
                  const health = apiKeyHealth[keyId];
                  const statusColor =
                    health?.status === "invalid"
                      ? "text-red-400"
                      : health?.status === "warning"
                        ? "text-yellow-400"
                        : "text-text-muted";
                  const statusIcon =
                    health?.status === "invalid"
                      ? "🔴"
                      : health?.status === "warning"
                        ? "🟡"
                        : "🟢";
                  const statusLabel =
                    health?.status === "invalid"
                      ? t("apiKeyStatusInvalid")
                      : health?.status === "warning"
                        ? t("apiKeyStatusWarning", { count: health.failures })
                        : t("apiKeyStatusActive");

                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <span
                        className={`flex-1 font-mono text-xs bg-sidebar/50 px-3 py-2 rounded border border-border truncate ${statusColor}`}
                      >
                        {statusIcon}{" "}
                        {t("extraApiKeyMasked", {
                          index: idx + 2,
                          prefix: key.slice(0, 6),
                          suffix: key.slice(-4),
                        })}
                      </span>
                      <div className="flex items-center gap-1">
                        {health && (
                          <span
                            className="text-[10px] text-text-muted whitespace-nowrap"
                            title={statusLabel}
                          >
                            {health.failures}x
                            {health.lastFailure ? ` · ${formatTimeAgo(health.lastFailure)}` : ""}
                            {health.totalRequests != null
                              ? ` · (${health.totalRequests} req${health.totalFailures != null ? `, ${health.totalFailures} fail` : ""})`
                              : ""}
                          </span>
                        )}
                        <button
                          onClick={() => setExtraApiKeys(extraApiKeys.filter((_, i) => i !== idx))}
                          className="p-1.5 rounded hover:bg-red-500/10 text-red-400 hover:text-red-500"
                          title={t("removeThisKey")}
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="password"
                value={newExtraKey}
                onChange={(e) => setNewExtraKey(e.target.value)}
                placeholder={t("addAnotherApiKey")}
                className="flex-1 text-sm bg-sidebar/50 border border-border rounded px-3 py-2 text-text-main placeholder:text-text-muted focus:ring-1 focus:ring-primary outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newExtraKey.trim()) {
                    setExtraApiKeys([...extraApiKeys, newExtraKey.trim()]);
                    setNewExtraKey("");
                  }
                }}
                onPaste={(e) => {
                  const text = e.clipboardData.getData("text");
                  if (!/\r?\n/.test(text)) return;
                  e.preventDefault();
                  handleAddParsedExtraKeys(text);
                }}
              />
              <button
                onClick={() => {
                  if (newExtraKey.trim()) {
                    setExtraApiKeys([...extraApiKeys, newExtraKey.trim()]);
                    setNewExtraKey("");
                  }
                }}
                disabled={!newExtraKey.trim()}
                className="px-3 py-2 rounded bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-40 text-sm font-medium"
              >
                {t("add")}
              </button>
            </div>
            <p className="text-[11px] text-text-muted">{t("bulkPasteHint")}</p>
            {extraApiKeys.length > 0 && (
              <p className="text-[11px] text-text-muted">
                {t("totalKeysRotating", { count: extraApiKeys.length + 1 })}
              </p>
            )}
          </div>
        )}

        {/* Test Connection */}
        {!isCompatible && (
          <div className="flex items-center gap-3">
            <Button onClick={handleTest} variant="secondary" disabled={testing}>
              {testing ? t("testing") : t("testConnection")}
            </Button>
            {testResult && (
              <>
                <Badge variant={testResult.valid ? "success" : "error"}>
                  {testResult.valid ? t("valid") : t("failed")}
                </Badge>
                {testErrorMeta && (
                  <Badge variant={testErrorMeta.variant}>{t(testErrorMeta.labelKey)}</Badge>
                )}
              </>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            fullWidth
            disabled={saving || (isGooglePse && !formData.cx.trim())}
          >
            {saving ? t("saving") : t("save")}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function EditCompatibleNodeModal({
  isOpen,
  node,
  onSave,
  onClose,
  isAnthropic,
  isCcCompatible,
}: EditCompatibleNodeModalProps) {
  const t = useTranslations("providers");
  const [formData, setFormData] = useState({
    name: "",
    prefix: "",
    apiType: "chat",
    baseUrl: "https://api.openai.com/v1",
    chatPath: "",
    modelsPath: "",
  });
  const [saving, setSaving] = useState(false);
  const [checkKey, setCheckKey] = useState("");
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (node) {
      setFormData({
        name: node.name || "",
        prefix: node.prefix || "",
        apiType: node.apiType || "chat",
        baseUrl:
          node.baseUrl ||
          (isCcCompatible
            ? "https://api.anthropic.com"
            : isAnthropic
              ? "https://api.anthropic.com/v1"
              : "https://api.openai.com/v1"),
        chatPath: node.chatPath || (isCcCompatible ? CC_COMPATIBLE_DEFAULT_CHAT_PATH : ""),
        modelsPath: isCcCompatible ? "" : node.modelsPath || "",
      });
      setShowAdvanced(
        !!(
          node.chatPath ||
          (!isCcCompatible && node.modelsPath) ||
          (isCcCompatible && !node.chatPath)
        )
      );
    }
  }, [node, isAnthropic, isCcCompatible]);

  const apiTypeOptions = [
    { value: "chat", label: t("chatCompletions") },
    { value: "responses", label: t("responsesApi") },
    { value: "embeddings", label: t("embeddings") },
    { value: "audio-transcriptions", label: t("audioTranscriptions") },
    { value: "audio-speech", label: t("audioSpeech") },
    { value: "images-generations", label: t("imagesGenerations") },
  ];

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.prefix.trim() || !formData.baseUrl.trim()) return;
    setSaving(true);
    try {
      const payload: any = {
        name: formData.name,
        prefix: formData.prefix,
        baseUrl: formData.baseUrl,
        chatPath: formData.chatPath || (isCcCompatible ? CC_COMPATIBLE_DEFAULT_CHAT_PATH : ""),
        modelsPath: isCcCompatible ? "" : formData.modelsPath,
      };
      if (!isAnthropic) {
        payload.apiType = formData.apiType;
      }
      await onSave(payload);
    } finally {
      setSaving(false);
    }
  };

  const handleValidate = async () => {
    setValidating(true);
    try {
      const res = await fetch("/api/provider-nodes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: formData.baseUrl,
          apiKey: checkKey,
          type: isAnthropic ? "anthropic-compatible" : "openai-compatible",
          compatMode: isCcCompatible ? "cc" : undefined,
          chatPath: formData.chatPath || (isCcCompatible ? CC_COMPATIBLE_DEFAULT_CHAT_PATH : ""),
          modelsPath: isCcCompatible ? "" : formData.modelsPath,
        }),
      });
      const data = await res.json();
      setValidationResult(data.valid ? "success" : "failed");
    } catch {
      setValidationResult("failed");
    } finally {
      setValidating(false);
    }
  };

  if (!node) return null;

  return (
    <Modal
      isOpen={isOpen}
      title={
        isCcCompatible
          ? t("ccCompatibleDetailsTitle")
          : t("editCompatibleTitle", { type: isAnthropic ? t("anthropic") : t("openai") })
      }
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        {isCcCompatible && (
          <div className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-text-muted">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined mt-0.5 text-[18px] text-amber-500">
                warning
              </span>
              <p>{t("ccCompatibleValidationHint")}</p>
            </div>
          </div>
        )}
        <Input
          label={t("nameLabel")}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={
            isCcCompatible
              ? t("ccCompatibleNamePlaceholder")
              : t("compatibleProdPlaceholder", {
                  type: isAnthropic ? t("anthropic") : t("openai"),
                })
          }
          hint={isCcCompatible ? t("ccCompatibleNameHint") : t("nameHint")}
        />
        <Input
          label={t("prefixLabel")}
          value={formData.prefix}
          onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
          placeholder={
            isCcCompatible
              ? t("ccCompatiblePrefixPlaceholder")
              : isAnthropic
                ? t("anthropicPrefixPlaceholder")
                : t("openaiPrefixPlaceholder")
          }
          hint={isCcCompatible ? t("ccCompatiblePrefixHint") : t("prefixHint")}
        />
        {!isAnthropic && (
          <Select
            label={t("apiTypeLabel")}
            options={apiTypeOptions}
            value={formData.apiType}
            onChange={(e) => setFormData({ ...formData, apiType: e.target.value })}
          />
        )}
        <Input
          label={t("baseUrlLabel")}
          value={formData.baseUrl}
          onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
          placeholder={
            isCcCompatible
              ? t("ccCompatibleBaseUrlPlaceholder")
              : isAnthropic
                ? t("anthropicBaseUrlPlaceholder")
                : t("openaiBaseUrlPlaceholder")
          }
          hint={
            isCcCompatible
              ? t("ccCompatibleBaseUrlHint")
              : t("compatibleBaseUrlHint", {
                  type: isAnthropic ? t("anthropic") : t("openai"),
                })
          }
        />
        <button
          type="button"
          className="text-sm text-text-muted hover:text-text-primary flex items-center gap-1"
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-expanded={showAdvanced}
          aria-controls="advanced-settings"
        >
          <span
            className={`transition-transform ${showAdvanced ? "rotate-90" : ""}`}
            aria-hidden="true"
          >
            ▶
          </span>
          {t("advancedSettings")}
        </button>
        {showAdvanced && (
          <div id="advanced-settings" className="flex flex-col gap-3 pl-2 border-l-2 border-border">
            <Input
              label={t("chatPathLabel")}
              value={formData.chatPath}
              onChange={(e) => setFormData({ ...formData, chatPath: e.target.value })}
              placeholder={
                isCcCompatible
                  ? CC_COMPATIBLE_DEFAULT_CHAT_PATH
                  : isAnthropic
                    ? "/messages"
                    : t("chatPathPlaceholder")
              }
              hint={isCcCompatible ? t("ccCompatibleChatPathHint") : t("chatPathHint")}
            />
            {!isCcCompatible && (
              <Input
                label={t("modelsPathLabel")}
                value={formData.modelsPath}
                onChange={(e) => setFormData({ ...formData, modelsPath: e.target.value })}
                placeholder={t("modelsPathPlaceholder")}
                hint={t("modelsPathHint")}
              />
            )}
          </div>
        )}
        <div className="flex gap-2">
          <Input
            label={t("apiKeyForCheck")}
            type="password"
            value={checkKey}
            onChange={(e) => setCheckKey(e.target.value)}
            className="flex-1"
          />
          <div className="pt-6">
            <Button
              onClick={handleValidate}
              disabled={!checkKey || validating || !formData.baseUrl.trim()}
              variant="secondary"
            >
              {validating ? t("checking") : t("check")}
            </Button>
          </div>
        </div>
        {validationResult && (
          <Badge variant={validationResult === "success" ? "success" : "error"}>
            {validationResult === "success" ? t("valid") : t("invalid")}
          </Badge>
        )}
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            fullWidth
            disabled={
              !formData.name.trim() || !formData.prefix.trim() || !formData.baseUrl.trim() || saving
            }
          >
            {saving ? t("saving") : t("save")}
          </Button>
          <Button onClick={onClose} variant="ghost" fullWidth>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// ──── ImportGeminiAuthModal ────────────────────────────────────────────────────

interface ImportGeminiAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

type GeminiImportTopTab = "single" | "bulk";
type GeminiBulkSubMode = "upload" | "paste" | "zip";

interface GeminiBulkEntry {
  name: string;
  json: unknown;
  parseError: string | null;
  email: string | null;
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

function ImportGeminiAuthModal({ onClose, onSuccess }: ImportGeminiAuthModalProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();

  const [topTab, setTopTab] = useState<GeminiImportTopTab>("single");
  const [singleSubTab, setSingleSubTab] = useState<"upload" | "paste">("upload");
  const [bulkSubMode, setBulkSubMode] = useState<GeminiBulkSubMode>("upload");

  // Single
  const [singleJson, setSingleJson] = useState<unknown>(null);
  const [singlePasteText, setSinglePasteText] = useState("");
  const [singleName, setSingleName] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [overwriteExisting, setOverwriteExisting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Bulk
  const [bulkEntries, setBulkEntries] = useState<GeminiBulkEntry[]>([]);
  const [bulkPasteText, setBulkPasteText] = useState("");
  const [bulkSubmitting, setBulkSubmitting] = useState(false);
  const [bulkErrors, setBulkErrors] = useState<{ index: number; name: string; message: string }[]>(
    []
  );
  const [bulkResult, setBulkResult] = useState<{
    success: number;
    failed: number;
    total: number;
  } | null>(null);
  const [zipExtracting, setZipExtracting] = useState(false);

  const handleSingleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        setSingleJson(json);
      } catch {
        notify.error(
          typeof t.has === "function" && t.has("geminiImportInvalidJson")
            ? t("geminiImportInvalidJson")
            : "Could not parse the file as JSON"
        );
      }
    };
    reader.readAsText(file);
  };

  const handleSingleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const body =
        singleSubTab === "paste"
          ? {
              source: { kind: "text", text: singlePasteText },
              name: singleName || undefined,
              email: singleEmail || undefined,
              overwriteExisting,
            }
          : {
              source: { kind: "json", json: singleJson },
              name: singleName || undefined,
              email: singleEmail || undefined,
              overwriteExisting,
            };

      const res = await fetch("/api/providers/gemini-cli-auth/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.code === "duplicate_account") {
          notify.error(
            typeof t.has === "function" && t.has("geminiImportDuplicate")
              ? t("geminiImportDuplicate")
              : 'Account already exists — enable "Replace existing" to overwrite'
          );
        } else if (data.code === "identity_unverified") {
          notify.error(
            typeof t.has === "function" && t.has("geminiImportIdentityUnverified")
              ? t("geminiImportIdentityUnverified")
              : 'Could not verify identity from id_token. Enable "Replace existing" or provide an email.'
          );
        } else {
          notify.error(
            data.error ||
              (typeof t.has === "function" && t.has("geminiImportFailed")
                ? t("geminiImportFailed")
                : "Failed to import Gemini auth")
          );
        }
        return;
      }

      const preview = previewGeminiJson(singleJson);
      notify.success(
        typeof t.has === "function" && t.has("geminiImportSuccess")
          ? t("geminiImportSuccess")
          : `Gemini connection imported successfully${preview.email ? ` (${preview.email})` : ""}`
      );
      onSuccess();
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("geminiImportFailed")
          ? t("geminiImportFailed")
          : "Failed to import Gemini auth"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleBulkFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newEntries: GeminiBulkEntry[] = [];
    let pending = files.length;
    if (!pending) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = JSON.parse(ev.target?.result as string);
          const { email } = previewGeminiJson(json);
          newEntries.push({
            name: file.name.replace(/\.json$/, ""),
            json,
            parseError: null,
            email,
          });
        } catch {
          newEntries.push({
            name: file.name,
            json: null,
            parseError: "Not valid JSON",
            email: null,
          });
        }
        pending--;
        if (pending === 0) setBulkEntries((prev) => [...prev, ...newEntries]);
      };
      reader.readAsText(file);
    });
  };

  const handleBulkPasteChange = (text: string) => {
    setBulkPasteText(text);
    const trimmed = text.trim();
    if (!trimmed) {
      setBulkEntries([]);
      return;
    }
    try {
      const arr = JSON.parse(trimmed);
      if (Array.isArray(arr)) {
        setBulkEntries(
          arr.map((item, i) => {
            const { email } = previewGeminiJson(item);
            return { name: email || `entry ${i + 1}`, json: item, parseError: null, email };
          })
        );
      } else {
        const { email } = previewGeminiJson(arr);
        setBulkEntries([{ name: email || "entry 1", json: arr, parseError: null, email }]);
      }
    } catch {
      setBulkEntries([
        { name: "parse error", json: null, parseError: "Invalid JSON", email: null },
      ]);
    }
  };

  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setZipExtracting(true);
    try {
      const res = await fetch("/api/providers/gemini-cli-auth/zip-extract", {
        method: "POST",
        headers: { "Content-Type": "application/zip" },
        body: file,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(
          data.error ||
            (typeof t.has === "function" && t.has("geminiImportBulkZipError")
              ? t("geminiImportBulkZipError")
              : "Failed to extract ZIP")
        );
        return;
      }
      const entries: GeminiBulkEntry[] = (data.entries || []).map(
        (e: { name: string; json: unknown; parseError: string | null }) => {
          const { email } = previewGeminiJson(e.json);
          return { name: e.name, json: e.json, parseError: e.parseError, email };
        }
      );
      setBulkEntries(entries);
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("geminiImportBulkZipError")
          ? t("geminiImportBulkZipError")
          : "Failed to extract ZIP"
      );
    } finally {
      setZipExtracting(false);
    }
  };

  const handleBulkSubmit = async () => {
    if (bulkSubmitting) return;
    setBulkSubmitting(true);
    setBulkErrors([]);
    setBulkResult(null);
    try {
      const validEntries = bulkEntries.filter((e) => e.json !== null);
      if (validEntries.length === 0) {
        notify.error("No valid entries to import");
        return;
      }
      const res = await fetch("/api/providers/gemini-cli-auth/import-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entries: validEntries.map((e) => ({
            json: e.json,
            name: e.name,
            email: e.email || undefined,
          })),
          overwriteExisting,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        notify.error(
          data.error ||
            (typeof t.has === "function" && t.has("geminiImportBulkFailed")
              ? t("geminiImportBulkFailed")
              : "Some entries failed to import")
        );
        return;
      }
      setBulkResult({ success: data.success, failed: data.failed, total: data.total });
      if (data.errors?.length > 0) setBulkErrors(data.errors);
      if (data.success > 0) {
        notify.success(
          typeof t.has === "function" && t.has("geminiImportBulkSuccess")
            ? t("geminiImportBulkSuccess", { count: data.success })
            : `Imported ${data.success} Gemini connections`
        );
        if (data.failed === 0) onSuccess();
      }
    } catch {
      notify.error(
        typeof t.has === "function" && t.has("geminiImportBulkFailed")
          ? t("geminiImportBulkFailed")
          : "Some entries failed to import"
      );
    } finally {
      setBulkSubmitting(false);
    }
  };

  const tabLabels: Record<GeminiImportTopTab, string> = {
    single:
      typeof t.has === "function" && t.has("geminiImportTabSingle")
        ? t("geminiImportTabSingle")
        : "Single",
    bulk:
      typeof t.has === "function" && t.has("geminiImportTabBulk")
        ? t("geminiImportTabBulk")
        : "Bulk",
  };

  const modalTitle =
    typeof t.has === "function" && t.has("geminiImportModalTitle")
      ? t("geminiImportModalTitle")
      : "Import Gemini Auth";

  return (
    <Modal isOpen onClose={onClose} title={modalTitle}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-1 border-b border-border pb-0">
          {(["single", "bulk"] as GeminiImportTopTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setTopTab(tab)}
              className={`px-3 py-1.5 text-sm rounded-t-md transition-colors ${
                topTab === tab
                  ? "bg-primary/10 text-primary border-b-2 border-primary"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        {topTab === "single" && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              {(["upload", "paste"] as const).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSingleSubTab(sub)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    singleSubTab === sub
                      ? "bg-bg-subtle text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {sub === "upload"
                    ? typeof t.has === "function" && t.has("geminiImportTabUpload")
                      ? t("geminiImportTabUpload")
                      : "Upload file"
                    : typeof t.has === "function" && t.has("geminiImportTabPaste")
                      ? t("geminiImportTabPaste")
                      : "Paste JSON"}
                </button>
              ))}
            </div>
            {singleSubTab === "upload" ? (
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportFileLabel")
                    ? t("geminiImportFileLabel")
                    : "Choose oauth_creds.json"}
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleSingleFileChange}
                  className="block w-full text-sm"
                />
                {singleJson && previewGeminiJson(singleJson).valid && (
                  <p className="mt-1 text-xs text-emerald-500">
                    Valid Gemini OAuth credentials
                    {previewGeminiJson(singleJson).email
                      ? ` (${previewGeminiJson(singleJson).email})`
                      : ""}
                  </p>
                )}
                {singleJson && !previewGeminiJson(singleJson).valid && (
                  <p className="mt-1 text-xs text-red-500">
                    {typeof t.has === "function" && t.has("geminiImportInvalidShape")
                      ? t("geminiImportInvalidShape")
                      : "The file is not a valid oauth_creds.json"}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportPasteLabel")
                    ? t("geminiImportPasteLabel")
                    : "Paste the JSON content"}
                </label>
                <textarea
                  value={singlePasteText}
                  onChange={(e) => setSinglePasteText(e.target.value)}
                  rows={6}
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main"
                  placeholder='{ "access_token": "...", "refresh_token": "...", "id_token": "..." }'
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportEmailLabel")
                    ? t("geminiImportEmailLabel")
                    : "Account email"}
                </label>
                <input
                  type="email"
                  value={singleEmail}
                  onChange={(e) => setSingleEmail(e.target.value)}
                  placeholder="auto-detected from id_token"
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs text-text-main"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportNameLabel")
                    ? t("geminiImportNameLabel")
                    : "Connection name (optional)"}
                </label>
                <input
                  type="text"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  placeholder="My Gemini account"
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs text-text-main"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs text-text-muted">
              <input
                type="checkbox"
                checked={overwriteExisting}
                onChange={(e) => setOverwriteExisting(e.target.checked)}
              />
              {typeof t.has === "function" && t.has("geminiImportOverwriteLabel")
                ? t("geminiImportOverwriteLabel")
                : "Replace existing connection if account already exists"}
            </label>
            <Button
              loading={submitting}
              onClick={handleSingleSubmit}
              disabled={singleSubTab === "upload" ? !singleJson : !singlePasteText.trim()}
            >
              {typeof t.has === "function" && t.has("geminiImportSubmit")
                ? t("geminiImportSubmit")
                : "Import"}
            </Button>
          </div>
        )}

        {topTab === "bulk" && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              {(["upload", "paste", "zip"] as GeminiBulkSubMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setBulkSubMode(mode);
                    setBulkEntries([]);
                  }}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    bulkSubMode === mode
                      ? "bg-bg-subtle text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {mode === "upload"
                    ? typeof t.has === "function" && t.has("geminiImportBulkModeUpload")
                      ? t("geminiImportBulkModeUpload")
                      : "Upload files"
                    : mode === "paste"
                      ? typeof t.has === "function" && t.has("geminiImportBulkModePaste")
                        ? t("geminiImportBulkModePaste")
                        : "Paste JSON array"
                      : typeof t.has === "function" && t.has("geminiImportBulkModeZip")
                        ? t("geminiImportBulkModeZip")
                        : "Upload ZIP"}
                </button>
              ))}
            </div>

            {bulkSubMode === "upload" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportBulkUploadHint")
                    ? t("geminiImportBulkUploadHint")
                    : "Drop or pick up to 50 oauth_creds.json files (256KB each, 10MB total)."}
                </p>
                <input
                  type="file"
                  accept=".json"
                  multiple
                  onChange={handleBulkFilesChange}
                  className="block w-full text-sm"
                />
              </div>
            )}
            {bulkSubMode === "paste" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportBulkPasteHint")
                    ? t("geminiImportBulkPasteHint")
                    : "Paste an array of objects: [{ json, name?, email? }, ...]"}
                </p>
                <textarea
                  value={bulkPasteText}
                  onChange={(e) => handleBulkPasteChange(e.target.value)}
                  rows={6}
                  className="w-full rounded border border-border bg-bg-subtle px-2 py-1.5 text-xs font-mono text-text-main"
                  placeholder="[{ ... }, { ... }]"
                />
              </div>
            )}
            {bulkSubMode === "zip" && (
              <div>
                <p className="text-xs text-text-muted mb-1">
                  {typeof t.has === "function" && t.has("geminiImportBulkZipHint")
                    ? t("geminiImportBulkZipHint")
                    : "ZIP containing oauth_creds.json entries. Max 50 entries, 10MB unpacked."}
                </p>
                {zipExtracting ? (
                  <p className="text-xs text-primary animate-pulse">
                    {typeof t.has === "function" && t.has("geminiImportBulkZipExtracting")
                      ? t("geminiImportBulkZipExtracting")
                      : "Extracting ZIP…"}
                  </p>
                ) : (
                  <input
                    type="file"
                    accept=".zip"
                    onChange={handleZipUpload}
                    className="block w-full text-sm"
                  />
                )}
              </div>
            )}

            {bulkEntries.length > 0 && (
              <div className="rounded border border-border bg-bg-subtle px-2 py-1.5 max-h-36 overflow-y-auto">
                {bulkEntries.map((e, i) => (
                  <div
                    key={i}
                    className={`text-xs py-0.5 flex items-center gap-1 ${e.parseError ? "text-red-500" : "text-text-main"}`}
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      {e.parseError ? "error" : "check_circle"}
                    </span>
                    {e.name}
                    {e.email ? ` (${e.email})` : ""}
                    {e.parseError ? ` — ${e.parseError}` : ""}
                  </div>
                ))}
              </div>
            )}

            <label className="flex items-center gap-2 text-xs text-text-muted">
              <input
                type="checkbox"
                checked={overwriteExisting}
                onChange={(e) => setOverwriteExisting(e.target.checked)}
              />
              {typeof t.has === "function" && t.has("geminiImportOverwriteLabel")
                ? t("geminiImportOverwriteLabel")
                : "Replace existing connection if account already exists"}
            </label>

            {bulkResult && (
              <div className="rounded bg-bg-subtle px-2 py-1.5 text-xs">
                {bulkResult.success}/{bulkResult.total} imported
                {bulkResult.failed > 0 ? `, ${bulkResult.failed} failed` : ""}
              </div>
            )}
            {bulkErrors.length > 0 && (
              <div className="rounded border border-red-500/30 bg-red-500/5 px-2 py-1.5 max-h-28 overflow-y-auto">
                {bulkErrors.map((e) => (
                  <div key={e.index} className="text-xs text-red-500 py-0.5">
                    {e.name}: {e.message}
                  </div>
                ))}
              </div>
            )}

            <Button
              loading={bulkSubmitting}
              onClick={handleBulkSubmit}
              disabled={bulkEntries.filter((e) => e.json !== null).length === 0}
            >
              {typeof t.has === "function" && t.has("geminiImportBulkSubmit")
                ? t("geminiImportBulkSubmit")
                : "Import all"}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}

// ──── ApplyGeminiAuthModal ────────────────────────────────────────────────────

function ApplyGeminiAuthModal({
  connectionId,
  inProgress,
  onConfirm,
  onClose,
}: {
  connectionId: string | null;
  inProgress: boolean;
  onConfirm: (id: string) => Promise<void>;
  onClose: () => void;
}) {
  const t = useTranslations("providers");
  const [confirmed, setConfirmed] = useState(false);
  const isOpen = !!connectionId;

  if (!connectionId) return null;

  const title =
    typeof t.has === "function" && t.has("geminiApplyModalTitle")
      ? t("geminiApplyModalTitle")
      : "Apply to Local Gemini CLI";
  const targetLabel =
    typeof t.has === "function" && t.has("geminiApplyTargetLabel")
      ? t("geminiApplyTargetLabel")
      : "Target path";
  const backupLabel =
    typeof t.has === "function" && t.has("geminiApplyBackupLabel")
      ? t("geminiApplyBackupLabel")
      : "Backups";
  const warning =
    typeof t.has === "function" && t.has("geminiApplyWarning")
      ? t("geminiApplyWarning")
      : "This will replace the existing oauth_creds.json and update google_accounts.json. Continue?";
  const confirmText =
    typeof t.has === "function" && t.has("geminiApplyConfirmCheckbox")
      ? t("geminiApplyConfirmCheckbox")
      : "I confirm I want to replace the existing oauth_creds.json";
  const applyText =
    typeof t.has === "function" && t.has("geminiApply") ? t("geminiApply") : "Apply";
  const accountsHint =
    typeof t.has === "function" && t.has("geminiApplyAccountsHint")
      ? t("geminiApplyAccountsHint")
      : "The google_accounts.json active account will be updated to match this connection.";

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{targetLabel}</div>
          <code className="block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main">
            ~/.gemini/oauth_creds.json
          </code>
          <p className="mt-1 text-xs text-text-muted">Path is auto-detected per OS (Linux/Mac).</p>
        </div>
        <div>
          <div className="text-xs uppercase text-text-muted mb-1">{backupLabel}</div>
          <code className="block rounded bg-sidebar px-2 py-1.5 text-xs font-mono text-text-main">
            ~/.gemini/oauth_creds-&#123;timestamp&#125;.bak
          </code>
        </div>
        <div className="rounded bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-xs text-amber-400">
          {accountsHint}
        </div>
        <p className="text-sm text-text-muted">{warning}</p>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          {confirmText}
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={inProgress}>
            Cancel
          </Button>
          <Button
            loading={inProgress}
            disabled={!confirmed || inProgress}
            onClick={() => void onConfirm(connectionId)}
          >
            {applyText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
