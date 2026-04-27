/**
 * Model Availability — Domain Layer (compat shim preserved for customized chat pipeline)
 *
 * Tracks model availability per provider with TTL-based cooldowns.
 * This file was removed upstream in v3.7, but the customized Easy IA routing
 * pipeline still depends on it. Keep this compatibility layer until chat.ts is
 * fully migrated to the newer accountFallback/providerProfile flow.
 */

type UnavailableEntry = {
  provider: string;
  model: string;
  unavailableSince: number;
  cooldownMs: number;
  reason?: string;
};

type FailureState = {
  failureCount: number;
  lastFailureAt: number;
  resetAfterMs: number;
};

type ProviderProfile = {
  transientCooldown?: number;
  rateLimitCooldown?: number;
  maxBackoffLevel?: number;
  circuitBreakerThreshold?: number;
  circuitBreakerReset?: number;
};

const unavailable = new Map<string, UnavailableEntry>();
const failureState = new Map<string, FailureState>();

const FAILURE_WINDOW_MS = 30 * 60 * 1000;

const PROBLEMATIC_STATUS_COOLDOWNS: Record<number, number> = {
  429: 5 * 60 * 1000,
  408: 60 * 1000,
  500: 2 * 60 * 1000,
  502: 2 * 60 * 1000,
  503: 2 * 60 * 1000,
  504: 2 * 60 * 1000,
};

const MIN_PROBLEMATIC_COOLDOWN_MS = 60 * 1000;
const MAX_PROBLEMATIC_COOLDOWN_MS = 30 * 60 * 1000;

function toPositiveNumber(value: unknown): number | null {
  return Number.isFinite(value) && Number(value) > 0 ? Number(value) : null;
}

function toNonNegativeNumber(value: unknown): number | null {
  return Number.isFinite(value) && Number(value) >= 0 ? Number(value) : null;
}

function getFailureWindowMs(profile?: ProviderProfile | null): number {
  return toPositiveNumber(profile?.circuitBreakerReset) ?? FAILURE_WINDOW_MS;
}

function getFailureThreshold(profile?: ProviderProfile | null): number {
  return toPositiveNumber(profile?.circuitBreakerThreshold) ?? 1;
}

function getLegacyStatusCooldown(status?: number | null): number {
  if (!status) return 0;
  return Object.prototype.hasOwnProperty.call(PROBLEMATIC_STATUS_COOLDOWNS, status)
    ? PROBLEMATIC_STATUS_COOLDOWNS[status]
    : 0;
}

function getProfileStatusCooldown(
  status?: number | null,
  profile?: ProviderProfile | null
): number {
  if (!profile) return 0;
  if (status === 429) {
    return toPositiveNumber(profile.rateLimitCooldown) ?? 0;
  }
  return toPositiveNumber(profile.transientCooldown) ?? 0;
}

function getScaledCooldown(
  baseCooldownMs: number,
  failureCount: number,
  profile?: ProviderProfile | null
): number {
  const safeBase = toPositiveNumber(baseCooldownMs) ?? 1000;
  if (!profile) {
    return Math.min(
      Math.max(safeBase, MIN_PROBLEMATIC_COOLDOWN_MS) * Math.pow(2, Math.max(0, failureCount - 1)),
      MAX_PROBLEMATIC_COOLDOWN_MS
    );
  }

  const maxBackoffLevel = Math.max(
    0,
    Math.trunc(toNonNegativeNumber(profile.maxBackoffLevel) ?? 0)
  );
  const exponent = Math.min(Math.max(0, failureCount - 1), maxBackoffLevel);
  return safeBase * Math.pow(2, exponent);
}

function makeKey(provider: string, model: string): string {
  return `${provider}::${model}`;
}

export function isModelAvailable(provider: string, model: string): boolean {
  const key = makeKey(provider, model);
  const entry = unavailable.get(key);
  if (!entry) return true;

  if (Date.now() - entry.unavailableSince >= entry.cooldownMs) {
    unavailable.delete(key);
    return true;
  }

  return false;
}

export function getModelCooldownInfo(provider: string, model: string) {
  const key = makeKey(provider, model);
  const entry = unavailable.get(key);
  if (!entry) return null;

  const elapsed = Date.now() - entry.unavailableSince;
  if (elapsed >= entry.cooldownMs) {
    unavailable.delete(key);
    return null;
  }

  return {
    provider: entry.provider,
    model: entry.model,
    reason: entry.reason || "unknown",
    remainingMs: entry.cooldownMs - elapsed,
    unavailableSince: new Date(entry.unavailableSince).toISOString(),
  };
}

export function setModelUnavailable(
  provider: string,
  model: string,
  cooldownMs = 60000,
  reason?: string
): void {
  const key = makeKey(provider, model);
  const now = Date.now();
  const safeCooldownMs = Number.isFinite(cooldownMs) && cooldownMs > 0 ? cooldownMs : 60000;
  const existing = unavailable.get(key);
  const existingRemainingMs =
    existing && Date.now() - existing.unavailableSince < existing.cooldownMs
      ? existing.cooldownMs - (Date.now() - existing.unavailableSince)
      : 0;
  const effectiveCooldownMs = Math.max(safeCooldownMs, existingRemainingMs);

  unavailable.set(key, {
    provider,
    model,
    unavailableSince: now,
    cooldownMs: effectiveCooldownMs,
    reason: reason || "unknown",
  });
}

export function markModelAsProblematic(
  provider: string,
  model: string,
  options: {
    status?: number;
    baseCooldownMs?: number;
    reason?: string;
    profile?: ProviderProfile | null;
  } = {}
) {
  const key = makeKey(provider, model);
  const now = Date.now();
  const status = Number.isFinite(options.status) ? Number(options.status) : null;
  const profile = options.profile || null;
  const explicitBaseCooldownMs =
    Number.isFinite(options.baseCooldownMs) && Number(options.baseCooldownMs) > 0
      ? Number(options.baseCooldownMs)
      : 0;
  const statusBaseCooldown = profile
    ? getProfileStatusCooldown(status, profile)
    : getLegacyStatusCooldown(status);
  const baseCooldownMs = Math.max(explicitBaseCooldownMs, statusBaseCooldown);

  const prev = failureState.get(key);
  const resetAfterMs = getFailureWindowMs(profile);
  const withinFailureWindow = prev && now - prev.lastFailureAt <= prev.resetAfterMs;
  const failureCount = withinFailureWindow ? prev.failureCount + 1 : 1;
  failureState.set(key, { failureCount, lastFailureAt: now, resetAfterMs });

  const threshold = getFailureThreshold(profile);
  const cooldownMs = getScaledCooldown(baseCooldownMs, failureCount, profile);
  const quarantined = failureCount >= threshold;

  if (quarantined) {
    setModelUnavailable(provider, model, cooldownMs, options.reason || "problematic_model");
  }

  return {
    cooldownMs,
    failureCount,
    quarantined,
    threshold,
    resetAfterMs,
  };
}

export function clearModelUnavailability(provider: string, model: string): boolean {
  const key = makeKey(provider, model);
  failureState.delete(key);
  return unavailable.delete(key);
}

export function getAvailabilityReport() {
  const now = Date.now();
  const report: Array<{
    provider: string;
    model: string;
    reason: string;
    remainingMs: number;
    unavailableSince: string;
  }> = [];

  for (const [key, entry] of unavailable.entries()) {
    const elapsed = now - entry.unavailableSince;
    if (elapsed >= entry.cooldownMs) {
      unavailable.delete(key);
      continue;
    }

    report.push({
      provider: entry.provider,
      model: entry.model,
      reason: entry.reason || "unknown",
      remainingMs: entry.cooldownMs - elapsed,
      unavailableSince: new Date(entry.unavailableSince).toISOString(),
    });
  }

  return report;
}

export function getUnavailableCount(): number {
  getAvailabilityReport();
  return unavailable.size;
}

export function resetAllAvailability(): void {
  unavailable.clear();
  failureState.clear();
}
