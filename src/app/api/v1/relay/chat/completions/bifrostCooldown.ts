import {
  clearBackendFailure,
  getActiveBackendFailure,
  recordBackendFailure,
  resetBackendFailures,
  type ActiveBackendFailure,
} from "./backendFailureState.ts";

export type ActiveBifrostCooldown = ActiveBackendFailure;

export function getBifrostFailureCooldownMs(env: NodeJS.ProcessEnv = process.env): number {
  const parsed = Number.parseInt(env.OMNIROUTE_BIFROST_FAILURE_COOLDOWN_MS || "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 5000;
}

export function getActiveBifrostCooldown(
  baseUrl: string,
  now = Date.now()
): ActiveBifrostCooldown | null {
  return getActiveBackendFailure(baseUrl, now);
}

export function recordBifrostFailure(
  baseUrl: string,
  reason: string,
  now = Date.now(),
  cooldownMs = getBifrostFailureCooldownMs()
): void {
  recordBackendFailure(baseUrl, reason, now, cooldownMs);
}

export function clearBifrostFailure(baseUrl: string): void {
  clearBackendFailure(baseUrl);
}

export function resetBifrostCooldowns(): void {
  resetBackendFailures();
}
