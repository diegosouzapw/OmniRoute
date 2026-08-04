interface CooldownEntry {
  until: number;
  reason: string;
}

const cooldowns = new Map<string, CooldownEntry>();

export interface ActiveBifrostCooldown {
  remainingMs: number;
  reason: string;
}

export function getBifrostFailureCooldownMs(env: NodeJS.ProcessEnv = process.env): number {
  const parsed = Number.parseInt(env.OMNIROUTE_BIFROST_FAILURE_COOLDOWN_MS || "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 5000;
}

export function getActiveBifrostCooldown(
  baseUrl: string,
  now = Date.now()
): ActiveBifrostCooldown | null {
  const entry = cooldowns.get(baseUrl);
  if (!entry) return null;
  if (entry.until <= now) {
    cooldowns.delete(baseUrl);
    return null;
  }

  return {
    remainingMs: entry.until - now,
    reason: entry.reason,
  };
}

export function recordBifrostFailure(
  baseUrl: string,
  reason: string,
  now = Date.now(),
  cooldownMs = getBifrostFailureCooldownMs()
): void {
  if (cooldownMs <= 0) {
    cooldowns.delete(baseUrl);
    return;
  }
  cooldowns.set(baseUrl, { until: now + cooldownMs, reason });
}

export function clearBifrostFailure(baseUrl: string): void {
  cooldowns.delete(baseUrl);
}

export function resetBifrostCooldowns(): void {
  cooldowns.clear();
}
