import type { CodexGlobalServiceMode } from "@/lib/providers/codexFastTier";
import type { CodexAccountPoolProjection } from "@omniroute/open-sse/services/codexAccount/index.ts";
import type { ProviderQuotaCacheEntry } from "../hooks/useProviderQuota";

export interface ConnectionRowConnection {
  id?: string;
  provider?: string;
  name?: string;
  email?: string;
  displayName?: string;
  rateLimitedUntil?: string;
  rateLimitProtection?: boolean;
  rateLimitAutoProtected?: boolean;
  testStatus?: string;
  isActive?: boolean;
  priority?: number;
  lastError?: string;
  lastErrorType?: string;
  lastErrorSource?: string;
  errorCode?: string | number;
  globalPriority?: number;
  providerSpecificData?: Record<string, unknown>;
  defaultModel?: string | null;
  expiresAt?: string;
  tokenExpiresAt?: string;
  syncedModelsAt?: string | null;
  maxConcurrent?: number | null;
  authType?: string;
  proxyEnabled?: boolean;
  perKeyProxyEnabled?: boolean;
  quotaVisible?: boolean;
  codexAccountPool?: CodexAccountPoolProjection;
}

export interface ConnectionRowProps {
  connection: ConnectionRowConnection;
  isOAuth: boolean;
  isClaude?: boolean;
  isCodex?: boolean;
  codexGlobalServiceMode?: CodexGlobalServiceMode;
  isFirst: boolean;
  isLast: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleActive: (isActive?: boolean) => void | Promise<void>;
  onToggleRateLimit: (enabled?: boolean) => void;
  onToggleQuotaVisibility?: (visible: boolean) => void;
  onToggleClaudeExtraUsage?: (enabled?: boolean) => void;
  onToggleCodexPaidCredits?: (enabled: boolean) => void;
  onToggleAutoSync?: (enabled: boolean) => void;
  onToggleCodex5h?: (enabled?: boolean) => void;
  onToggleCodexWeekly?: (enabled?: boolean) => void;
  isCcCompatible?: boolean;
  cliproxyapiEnabled?: boolean;
  onToggleCliproxyapiMode?: (enabled?: boolean) => void;
  /** Provider-level upstream proxy routing mode (native/CLIProxyAPI/Dario/fallback). */
  upstreamProxyMode?: "native" | "cliproxyapi" | "dario" | "fallback";
  upstreamProxyFallbackBackend?: "cliproxyapi" | "dario";
  onSetUpstreamProxyMode?: (
    mode: "native" | "cliproxyapi" | "dario" | "fallback",
    fallbackBackend?: "cliproxyapi" | "dario"
  ) => void;
  onRetest: () => void;
  isRetesting?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onReauth?: () => void;
  onProxy?: () => void;
  hasProxy?: boolean;
  proxySource?: string;
  proxyHost?: string;
  proxyName?: string | null;
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
  /** Latest cached usage/limits snapshot for this account (see useProviderQuota). */
  quotaCache?: ProviderQuotaCacheEntry | null;
  quotaRefreshing?: boolean;
  onRefreshQuota?: () => void;
}
