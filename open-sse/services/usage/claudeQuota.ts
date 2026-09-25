import { getProviderModels } from "../../config/providerModels.ts";
import { getRegisteredProviderEffortBaseModelId } from "../../utils/registeredEffortVariants.ts";
import { parseModel, stripContextWindowSuffix } from "../model.ts";
import { isSubscriptionQuotaText } from "../quotaTextCooldowns.ts";
import { safePercentage } from "@/shared/utils/formatting";
import { parseResetTime, type ClaudeQuotaMetadata, type UsageQuota } from "./quota.ts";
import { toRecord } from "./scalars.ts";

export type ClaudeQuotaKind = "session" | "weekly_all" | "weekly_scoped";

const LEGACY_MODEL_DISPLAY_NAMES: Readonly<Record<string, string>> = {
  // Legacy `seven_day_*` keys use Anthropic codenames, so preserve the public
  // model-family label operators already recognize in quota displays and routing.
  omelette: "designer",
};
const MINUTE_RATE_LIMIT_RE =
  /\b(?:tpm|rpm)\b|(?:tokens?|requests?)[\s_-]*(?:per|\/)[\s_-]*min(?:ute)?s?\b/i;

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function normalizedTokens(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function normalizedTokenKey(value: string): string {
  return normalizedTokens(value).join("-");
}

function quotaObject(
  usedValue: unknown,
  resetValue: unknown,
  claudeQuota: ClaudeQuotaMetadata
): UsageQuota {
  // Anthropic reports utilization and current-limit percent as percentage used,
  // so the display and routing remainder is always 100 minus that value (#299).
  const reportedUsed = safePercentage(usedValue);
  const used = reportedUsed ?? 0;
  const remaining = Math.max(0, 100 - used);
  return {
    used,
    total: 100,
    remaining,
    resetAt: parseResetTime(resetValue),
    remainingPercentage: remaining,
    unlimited: false,
    fractionReported: reportedUsed === undefined ? false : undefined,
    claudeQuota,
  };
}

function currentLimitPercent(limit: Record<string, unknown>): number | undefined {
  const percent =
    safePercentage(limit.percent) ??
    safePercentage(limit.utilization) ??
    safePercentage(limit.percentage);
  return percent !== undefined && percent >= 0 && percent <= 100 ? percent : undefined;
}

function currentLimitReset(limit: Record<string, unknown>): unknown {
  return limit.resetsAt ?? limit.resets_at ?? limit.resetAt ?? limit.reset_at;
}

function currentLimitActive(limit: Record<string, unknown>): boolean {
  if (typeof limit.isActive === "boolean") return limit.isActive;
  if (typeof limit.is_active === "boolean") return limit.is_active;
  return false;
}

function currentLimitModel(limit: Record<string, unknown>): {
  modelId: string | null;
  modelDisplayName: string | null;
} {
  const scope = toRecord(limit.scope);
  const modelValue = scope.model;
  if (typeof modelValue === "string") {
    return { modelId: modelValue.trim() || null, modelDisplayName: null };
  }
  const model = toRecord(modelValue);
  return {
    modelId:
      nonEmptyString(model.id) ?? nonEmptyString(model.model_id) ?? nonEmptyString(model.modelId),
    modelDisplayName:
      nonEmptyString(model.displayName) ??
      nonEmptyString(model.display_name) ??
      nonEmptyString(model.name),
  };
}

function currentLimitSurfaceDisplayName(limit: Record<string, unknown>): string | null {
  const scope = toRecord(limit.scope);
  const surface = toRecord(scope.surface);
  return nonEmptyString(surface.display_name);
}

function quotaKey(kind: ClaudeQuotaKind, displayName: string | null): string {
  if (kind === "session") return "session (5h)";
  if (kind === "weekly_all") return "weekly (7d)";
  return `weekly ${(displayName || "scoped").toLowerCase()} (7d)`;
}

export interface NormalizedClaudeUsageQuotas {
  quotas: Record<string, UsageQuota>;
  modelQuotas: Record<string, UsageQuota>;
}

interface NormalizedClaudeWindow {
  semanticKey: string;
  displayKey: string;
  quota: UsageQuota;
}

function normalizeCurrentLimits(limits: unknown[]): NormalizedClaudeWindow[] {
  const windows: NormalizedClaudeWindow[] = [];
  const surfaceOccurrences = new Map<string, number>();
  for (const [index, value] of limits.entries()) {
    const limit = toRecord(value);
    const kind = nonEmptyString(limit.kind);
    if (kind !== "session" && kind !== "weekly_all" && kind !== "weekly_scoped") continue;
    const percent = currentLimitPercent(limit);

    const { modelId, modelDisplayName } = currentLimitModel(limit);
    const scopeLabel = modelDisplayName ?? modelId;
    const scopeToken = scopeLabel ? normalizedTokenKey(scopeLabel) : "";
    const surfaceDisplayName =
      kind === "weekly_scoped" && !scopeToken ? currentLimitSurfaceDisplayName(limit) : null;
    const surfaceOccurrence = surfaceDisplayName
      ? (surfaceOccurrences.get(surfaceDisplayName) ?? 0) + 1
      : null;
    if (surfaceDisplayName && surfaceOccurrence) {
      surfaceOccurrences.set(surfaceDisplayName, surfaceOccurrence);
    }
    const surfaceKey = surfaceDisplayName
      ? `weekly scoped (7d) [surface:${JSON.stringify(surfaceDisplayName)}]${
          surfaceOccurrence === 1 ? "" : ` #${surfaceOccurrence}`
        }`
      : null;
    // Keep unresolved upstream scopes distinct without changing known model labels.
    const displayKey =
      kind === "weekly_scoped" && !scopeToken
        ? (surfaceKey ?? `${quotaKey(kind, null)} #${index + 1}`)
        : quotaKey(kind, scopeLabel);
    const metadata: ClaudeQuotaMetadata = {
      kind,
      active: currentLimitActive(limit),
      severity: nonEmptyString(limit.severity),
      scopeKey: kind === "weekly_scoped" && scopeToken ? `model:${scopeToken}` : null,
      modelId,
      modelDisplayName,
    };
    // Current payload percentages are display metadata. Upstream `isActive`
    // and severity decide whether the window blocks routing.
    const quota = quotaObject(percent, currentLimitReset(limit), metadata);
    if (surfaceDisplayName) quota.displayName = `weekly scoped ${surfaceDisplayName} (7d)`;
    windows.push({
      semanticKey:
        kind === "session"
          ? "session"
          : kind === "weekly_all"
            ? "weekly_all"
            : (metadata.scopeKey ??
              (surfaceKey
                ? `weekly_scoped:surface:${surfaceKey}`
                : `weekly_scoped:unknown:${index}`)),
      displayKey,
      quota,
    });
  }
  return windows;
}

function legacyQuota(
  kind: ClaudeQuotaKind,
  window: Record<string, unknown>,
  modelDisplayName: string | null
): UsageQuota | null {
  const used = safePercentage(window.utilization);
  if (used === undefined) return null;
  const scopeToken = modelDisplayName ? normalizedTokenKey(modelDisplayName) : "";
  return quotaObject(used, window.resets_at, {
    kind,
    active: used >= 100,
    severity: used >= 100 ? "critical" : null,
    scopeKey: kind === "weekly_scoped" && scopeToken ? `model:${scopeToken}` : null,
    modelId: null,
    modelDisplayName,
  });
}

function normalizePreviousLimits(data: Record<string, unknown>): NormalizedClaudeWindow[] {
  const windows: NormalizedClaudeWindow[] = [];
  const session = legacyQuota("session", toRecord(data.five_hour), null);
  if (session) windows.push({ semanticKey: "session", displayKey: "session (5h)", quota: session });

  const weekly = legacyQuota("weekly_all", toRecord(data.seven_day), null);
  if (weekly) {
    windows.push({ semanticKey: "weekly_all", displayKey: "weekly (7d)", quota: weekly });
  }

  for (const [key, value] of Object.entries(data)) {
    if (!key.startsWith("seven_day_") || key === "seven_day") continue;
    const codename = key.slice("seven_day_".length);
    const modelDisplayName = LEGACY_MODEL_DISPLAY_NAMES[codename] ?? codename;
    const scoped = legacyQuota("weekly_scoped", toRecord(value), modelDisplayName);
    if (scoped) {
      windows.push({
        semanticKey: `model:${normalizedTokenKey(modelDisplayName)}`,
        displayKey: `weekly ${modelDisplayName} (7d)`,
        quota: scoped,
      });
    }
  }
  return windows;
}

export function normalizeClaudeUsageQuotas(
  payload: Record<string, unknown>
): NormalizedClaudeUsageQuotas {
  const windows = new Map<string, NormalizedClaudeWindow>();
  for (const window of normalizePreviousLimits(payload)) {
    windows.set(window.semanticKey, window);
  }
  if (Array.isArray(payload.limits)) {
    for (const window of normalizeCurrentLimits(payload.limits)) {
      const metadata = window.quota.claudeQuota;
      if (metadata?.kind === "weekly_scoped" && metadata.modelId) {
        for (const [semanticKey, previous] of windows) {
          const previousMetadata = previous.quota.claudeQuota;
          if (
            previousMetadata?.kind === "weekly_scoped" &&
            claudeQuotaMatchesModel(previousMetadata, metadata.modelId)
          ) {
            windows.delete(semanticKey);
          }
        }
      }
      windows.set(window.semanticKey, window);
    }
  }

  const normalized: NormalizedClaudeUsageQuotas = { quotas: {}, modelQuotas: {} };
  for (const window of windows.values()) {
    const target =
      window.quota.claudeQuota?.kind === "weekly_scoped"
        ? normalized.modelQuotas
        : normalized.quotas;
    target[window.displayKey] = window.quota;
  }
  return normalized;
}

export function isClaudeQuotaMetadata(value: unknown): value is ClaudeQuotaMetadata {
  if (!value || typeof value !== "object") return false;
  const metadata = value as Partial<ClaudeQuotaMetadata>;
  return (
    (metadata.kind === "session" ||
      metadata.kind === "weekly_all" ||
      metadata.kind === "weekly_scoped") &&
    typeof metadata.active === "boolean" &&
    (metadata.severity === null || typeof metadata.severity === "string") &&
    (metadata.scopeKey === null || typeof metadata.scopeKey === "string") &&
    (metadata.modelId === null || typeof metadata.modelId === "string") &&
    (metadata.modelDisplayName === null || typeof metadata.modelDisplayName === "string")
  );
}

export function isExplicitClaudeQuota429Text(errorText: string): boolean {
  return (
    !isClaudeMinuteRateLimitText(errorText) &&
    isSubscriptionQuotaText(errorText.toLowerCase(), "claude")
  );
}

export function isClaudeMinuteRateLimitText(errorText: string): boolean {
  return MINUTE_RATE_LIMIT_RE.test(errorText);
}

function stripDeclaredEffort(modelId: string): string {
  const registeredBase = getRegisteredProviderEffortBaseModelId("claude", modelId);
  if (registeredBase) return registeredBase;

  for (const candidate of getProviderModels("claude")) {
    for (const effort of candidate.supportedThinkingEfforts ?? []) {
      if (
        modelId === `${candidate.id}-${effort}` ||
        modelId === `${candidate.id}-thinking-${effort}`
      ) {
        return candidate.id;
      }
    }
  }
  return modelId;
}

function normalizedRequestedModel(model: string): string {
  const parsed = parseModel(model);
  const routedModel = parsed.model ?? model;
  const withoutContext = stripContextWindowSuffix(routedModel) ?? routedModel;
  const withoutRouteDecoration = withoutContext.split("@", 1)[0].split(":", 1)[0];
  return normalizedTokenKey(stripDeclaredEffort(withoutRouteDecoration));
}

function numericVersionTokens(value: string): string[] {
  return normalizedTokens(value).filter((token) => /^\d+$/.test(token));
}

export function claudeQuotaMatchesModel(
  metadata: ClaudeQuotaMetadata,
  requestedModel: string
): boolean {
  if (metadata.kind !== "weekly_scoped") return false;
  const requestedKey = normalizedRequestedModel(requestedModel);
  if (!requestedKey) return false;

  if (metadata.modelId) {
    return requestedKey === normalizedRequestedModel(metadata.modelId);
  }

  if (!metadata.modelDisplayName) return false;
  const displayVersions = numericVersionTokens(metadata.modelDisplayName);
  const requestedVersions = numericVersionTokens(requestedKey.replace(/-\d{8}$/, ""));
  // Family-only labels remain broad, but explicit versions must match exactly and in order.
  if (
    displayVersions.length > 0 &&
    (displayVersions.length !== requestedVersions.length ||
      displayVersions.some((version, index) => version !== requestedVersions[index]))
  ) {
    return false;
  }
  const requestedTokens = new Set(normalizedTokens(requestedKey));
  const displayTokens = normalizedTokens(metadata.modelDisplayName);
  return displayTokens.length > 0 && displayTokens.every((token) => requestedTokens.has(token));
}
