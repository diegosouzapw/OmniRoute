import { randomUUID, createHash } from "crypto";
import {
  getProviderConnections,
  getProviderNodes,
  validateApiKey,
  updateProviderConnection,
  getSettings,
  getCachedSettings,
  getSessionAccountAffinity,
  upsertSessionAccountAffinity,
  touchSessionAccountAffinity,
  deleteSessionAccountAffinity,
} from "@/lib/localDb";
import {
  DEFAULT_QUOTA_THRESHOLD_PERCENT,
  getQuotaCache,
  getQuotaWindowStatus,
  isAccountQuotaExhausted,
} from "@/domain/quotaCache";
import {
  isAccountUnavailable,
  getUnavailableUntil,
  getEarliestRateLimitedUntil,
  formatRetryAfter,
  checkFallbackError,
  isModelLocked,
  getModelLockoutInfo,
  lockModel,
  hasPerModelQuota,
  getRuntimeProviderProfile,
  recordModelLockoutFailure,
} from "@omniroute/open-sse/services/accountFallback.ts";
import { isLocalProvider } from "@omniroute/open-sse/config/providerRegistry.ts";
import { COOLDOWN_MS } from "@omniroute/open-sse/config/constants.ts";
import {
  preflightQuota,
  isQuotaPreflightEnabled,
} from "@omniroute/open-sse/services/quotaPreflight.ts";
import { resolveResilienceSettings } from "@/lib/resilience/settings";
import { syncHealthFromDB, type KeyHealth } from "@omniroute/open-sse/services/apiKeyRotator.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "@omniroute/open-sse/services/errorClassifier.ts";
import { looksLikeQuotaExhausted } from "@/shared/utils/classify429";
import { getCodexModelScope } from "@omniroute/open-sse/executors/codex.ts";
import {
  getProviderById,
  getProviderAlias,
  resolveProviderId,
  NOAUTH_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
} from "@/shared/constants/providers";
import { isModelExcludedByConnection } from "@/domain/connectionModelRules";
import * as log from "../utils/logger";
import { fisherYatesShuffle, getNextFromDeckSync } from "@/shared/utils/shuffleDeck";
import crypto from "node:crypto";

import { asRecord, readHeaderValue } from "./utils.ts";

export function normalizeSessionKey(value: unknown, prefix: string): string | null {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  const trimmed = value.trim();
  if (trimmed.length <= 180 && /^[A-Za-z0-9._:-]+$/.test(trimmed)) {
    return `${prefix}:${trimmed}`;
  }
  return `${prefix}:sha256:${createHash("sha256").update(trimmed).digest("hex")}`;
}

export function extractTextForSessionHash(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    const parts = value
      .map((item) => {
        if (typeof item === "string") return item;
        const record = asRecord(item);
        if (typeof record.text === "string") return record.text;
        if (typeof record.content === "string") return record.content;
        return null;
      })
      .filter(Boolean) as string[];
    return parts.length > 0 ? parts.join("\n") : JSON.stringify(value);
  }
  if (value && typeof value === "object") return JSON.stringify(value);
  return null;
}

export function getFirstInputText(body: unknown): string | null {
  const record = asRecord(body);
  if (record.input !== undefined) {
    if (typeof record.input === "string") return record.input;
    if (Array.isArray(record.input)) {
      for (const item of record.input) {
        const itemRecord = asRecord(item);
        const text = extractTextForSessionHash(itemRecord.content ?? item);
        if (text && text.trim().length > 0) return text;
      }
    }
    const text = extractTextForSessionHash(record.input);
    if (text && text.trim().length > 0) return text;
  }

  if (Array.isArray(record.messages)) {
    const userMessage = record.messages.find((message) => asRecord(message).role === "user");
    const firstMessage = userMessage ?? record.messages[0];
    const text = extractTextForSessionHash(asRecord(firstMessage).content ?? firstMessage);
    if (text && text.trim().length > 0) return text;
  }

  return null;
}

export function extractSessionAffinityKey(
  body: unknown,
  headers?: Headers | { get?: (name: string) => string | null } | null
): string | null {
  const headerKey = normalizeSessionKey(
    readHeaderValue(headers, "x-codex-session-id") ??
      readHeaderValue(headers, "x-session-id") ??
      readHeaderValue(headers, "x-omniroute-session"),
    "header"
  );
  if (headerKey) return headerKey;

  const record = asRecord(body);
  const metadata = asRecord(record.metadata);
  const explicitKey =
    normalizeSessionKey(metadata.session_id, "metadata") ??
    normalizeSessionKey(metadata.sessionId, "metadata") ??
    normalizeSessionKey(record.conversation_id, "conversation") ??
    normalizeSessionKey(record.session_id, "session") ??
    normalizeSessionKey(record.prompt_cache_key, "prompt-cache");
  if (explicitKey) return explicitKey;

  const inputText = getFirstInputText(body);
  if (!inputText || inputText.trim().length === 0) return null;
  return `input:sha256:${createHash("sha256").update(inputText.slice(0, 4096)).digest("hex")}`;
}

export function formatSessionKeyForLog(sessionKey: string): string {
  return `${sessionKey.slice(0, 18)}...`;
}