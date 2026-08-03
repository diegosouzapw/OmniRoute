import type { AccessSchedule, RateLimitRule } from "./types";
import { normalizeModelAccessUpdate, type ModelAccessMode } from "./modelAccessMode";

export interface ApiKeyPermissionsUpdate {
  name?: string;
  modelAccessMode?: ModelAccessMode;
  allowedModels?: string[];
  blockedModels?: string[];
  allowedCombos?: string[];
  allowedConnections?: string[];
  allowedQuotas?: string[];
  noLog?: boolean;
  autoResolve?: boolean;
  isActive?: boolean;
  accessSchedule?: AccessSchedule | null;
  maxRequestsPerDay?: number | null;
  maxRequestsPerMinute?: number | null;
  throttleDelayMs?: number | null;
  rateLimits?: RateLimitRule[] | null;
  isBanned?: boolean;
  expiresAt?: string | null;
  maxSessions?: number | null;
  scopes?: string[] | null;
  proxyId?: string | null;
  allowedEndpoints?: string[] | null;
  streamDefaultMode?: "legacy" | "json" | null;
  disableNonPublicModels?: boolean;
  allowUsageCommand?: boolean;
  usageLimitEnabled?: boolean;
  dailyUsageLimitUsd?: number | null;
  weeklyUsageLimitUsd?: number | null;
  chaosModeEnabled?: boolean;
}

export function normalizeApiKeyPermissionsUpdate(
  update: string[] | ApiKeyPermissionsUpdate | undefined
): ApiKeyPermissionsUpdate {
  if (update === undefined) {
    return normalizeModelAccessUpdate(undefined, []);
  }
  if (Array.isArray(update)) {
    return normalizeModelAccessUpdate(undefined, update);
  }
  return {
    name: update.name,
    ...normalizeModelAccessUpdate(update.modelAccessMode, update.allowedModels),
    blockedModels: update.blockedModels,
    allowedCombos: update.allowedCombos,
    allowedConnections: update.allowedConnections,
    allowedQuotas: update.allowedQuotas,
    noLog: update.noLog,
    autoResolve: update.autoResolve,
    isActive: update.isActive,
    accessSchedule: update.accessSchedule,
    maxRequestsPerDay: update.maxRequestsPerDay,
    maxRequestsPerMinute: update.maxRequestsPerMinute,
    throttleDelayMs: update.throttleDelayMs,
    rateLimits: update.rateLimits,
    isBanned: update.isBanned,
    expiresAt: update.expiresAt,
    maxSessions: update.maxSessions,
    scopes: update.scopes,
    proxyId: update.proxyId,
    allowedEndpoints: update.allowedEndpoints,
    streamDefaultMode: update.streamDefaultMode,
    disableNonPublicModels: update.disableNonPublicModels,
    allowUsageCommand: update.allowUsageCommand,
    usageLimitEnabled: update.usageLimitEnabled,
    dailyUsageLimitUsd: update.dailyUsageLimitUsd,
    weeklyUsageLimitUsd: update.weeklyUsageLimitUsd,
    chaosModeEnabled: update.chaosModeEnabled,
  };
}
