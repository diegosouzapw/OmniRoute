"use client";
import {
  ModelCompatProtocolKey
} from "@/shared/constants/modelCompat";
import {
  CodexGlobalServiceMode
} from "@/lib/providers/codexFastTier";


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
  isFree?: boolean;
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
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
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
  providerId: string;
  connectionId: string;
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
  onTestAll?: (targets: Array<{ modelId: string; fullModel: string }>) => Promise<void>;
  testingAll?: boolean;
  testProgress?: { done: number; total: number } | null;
  autoHideFailed?: boolean;
  onAutoHideFailedChange?: (v: boolean) => void;
}

type ProviderMessageTranslator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

type HeaderDraftRow = { id: string; name: string; value: string };

const UPSTREAM_HEADERS_UI_MAX = 16;

function recordToHeaderRows(rec: Record<string, string>, genId: () => string): HeaderDraftRow[] {
  const entries = Object.entries(rec).filter(([k]) => k.trim());
  if (entries.length === 0) return [{ id: genId(), name: "", value: "" }];
  return entries.map(([name, value]) => ({ id: genId(), name, value }));
}

type ProviderModelsApiErrorBody = {
  error?: {
    message?: string;
    details?: Array<{ field?: string; message?: string }>;
  };
};

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

interface CooldownTimerProps {
  until: string | number | Date;
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
  proxyEnabled?: boolean;
  perKeyProxyEnabled?: boolean;
}

interface ConnectionRowProps {
  connection: ConnectionRowConnection;
  isOAuth: boolean;
  isClaude?: boolean;
  isCodex?: boolean;
  isGeminiCli?: boolean;
  codexGlobalServiceMode?: CodexGlobalServiceMode;
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
  proxyEnabled?: boolean;
  perKeyProxyEnabled?: boolean;
  onToggleProxyEnabled?: (enabled: boolean) => void;
  onTogglePerKeyProxyEnabled?: (enabled: boolean) => void;
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
  initialBaseUrl?: string;
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

interface EditConnectionModalConnection {
  id?: string;
  name?: string;
  email?: string;
  priority?: number;
  maxConcurrent?: number | null;
  rateLimitOverrides?: Record<string, number> | null;
  authType?: string;
  provider?: string;
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
  healthCheckInterval?: number;
  projectId?: string | null;
}

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

type ImportTopTab = "single" | "bulk";
type BulkSubMode = "upload" | "paste" | "zip";

interface BulkEntry {
  name: string;
  json: unknown;
  parseError: string | null;
  email: string | null;
}

type ClaudeImportTopTab = "single" | "bulk";
type ClaudeBulkSubMode = "upload" | "paste" | "zip";

interface ClaudeBulkEntry {
  name: string;
  json: unknown;
  parseError: string | null;
  email: string | null;
}

type GeminiImportTopTab = "single" | "bulk";
type GeminiBulkSubMode = "upload" | "paste" | "zip";

interface GeminiBulkEntry {
  name: string;
  json: unknown;
  parseError: string | null;
  email: string | null;
}
