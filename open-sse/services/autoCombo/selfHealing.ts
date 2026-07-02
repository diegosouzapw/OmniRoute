/**
 * Auto-Combo Self-Healing
 *
 * Features:
 *   - Temporary exclusion when score < 0.2
 *   - Circuit breaker awareness (OPEN → excluded, HALF_OPEN → probe)
 *   - Incident mode (>50% OPEN → exploitation only)
 *   - Cooldown recovery with progressive backoff
 */

export interface ExclusionEntry {
  provider: string;
  excludedAt: number;
  cooldownMs: number;
  reason: string;
  probeCount: number;
}

const DEFAULT_COOLDOWN_MS = 5 * 60 * 1000; // 5 min
const MAX_COOLDOWN_MS = 30 * 60 * 1000; // 30 min
const REENTRY_THRESHOLD = 0.3;
const EXCLUSION_THRESHOLD = 0.2;
const INCIDENT_MODE_THRESHOLD = 0.5; // >50% OPEN

export class SelfHealingManager {
  private exclusions = new Map<string, ExclusionEntry>();
  private incidentMode = false;

  /**
   * Check if a provider is currently excluded.
   */
  isExcluded(provider: string): boolean {
    const entry = this.exclusions.get(provider);
    if (!entry) return false;
    if (Date.now() - entry.excludedAt > entry.cooldownMs) return false; // Cooldown expired
    return true;
  }

  /**
   * Evaluate provider health and potentially exclude or re-admit.
   */
  evaluate(
    provider: string,
    score: number,
    circuitBreakerState: string
  ): {
    excluded: boolean;
    reason?: string;
    isProbe?: boolean;
  } {
    const existing = this.exclusions.get(provider);

    // Re-admission: score above threshold and cooldown expired
    if (
      existing &&
      score >= REENTRY_THRESHOLD &&
      Date.now() - existing.excludedAt > existing.cooldownMs
    ) {
      this.exclusions.delete(provider);
      return {
        excluded: false,
        reason: `Re-admitted: score ${score.toFixed(2)} >= ${REENTRY_THRESHOLD}`,
      };
    }

    // Already excluded and still in cooldown
    if (this.isExcluded(provider)) {
      // Allow probe if HALF_OPEN
      if (circuitBreakerState === "HALF_OPEN" && existing) {
        existing.probeCount++;
        return { excluded: false, isProbe: true, reason: `Probe request #${existing.probeCount}` };
      }
      return { excluded: true, reason: existing?.reason || "Excluded" };
    }

    // New exclusion: score too low
    if (score < EXCLUSION_THRESHOLD) {
      const cooldownMs = existing
        ? Math.min(existing.cooldownMs * 2, MAX_COOLDOWN_MS)
        : DEFAULT_COOLDOWN_MS;
      this.exclusions.set(provider, {
        provider,
        excludedAt: Date.now(),
        cooldownMs,
        reason: `Score ${score.toFixed(2)} < ${EXCLUSION_THRESHOLD}`,
        probeCount: 0,
      });
      return { excluded: true, reason: `Excluded: score ${score.toFixed(2)} below threshold` };
    }

    // Circuit breaker OPEN → auto-exclude
    if (circuitBreakerState === "OPEN") {
      this.exclusions.set(provider, {
        provider,
        excludedAt: Date.now(),
        cooldownMs: DEFAULT_COOLDOWN_MS,
        reason: "Circuit breaker OPEN",
        probeCount: 0,
      });
      return { excluded: true, reason: "Circuit breaker OPEN" };
    }

    return { excluded: false };
  }

  /**
   * Record probe result. After 3 successful probes, fully re-admit.
   */
  recordProbeResult(provider: string, success: boolean) {
    const entry = this.exclusions.get(provider);
    if (!entry) return;

    if (success && entry.probeCount >= 3) {
      this.exclusions.delete(provider);
    } else if (!success) {
      entry.cooldownMs = Math.min(entry.cooldownMs * 2, MAX_COOLDOWN_MS);
      entry.excludedAt = Date.now();
      entry.probeCount = 0;
    }
  }

  /**
   * Update incident mode based on circuit breaker states.
   */
  updateIncidentMode(circuitBreakerStates: string[]): boolean {
    const total = circuitBreakerStates.length;
    if (total === 0) {
      this.incidentMode = false;
      return false;
    }

    const openCount = circuitBreakerStates.filter((s) => s === "OPEN").length;
    this.incidentMode = openCount / total > INCIDENT_MODE_THRESHOLD;
    return this.incidentMode;
  }

  isInIncidentMode(): boolean {
    return this.incidentMode;
  }

  getExclusions(): ExclusionEntry[] {
    return [...this.exclusions.values()];
  }

  getStatus(): {
    exclusionCount: number;
    incidentMode: boolean;
    exclusions: Array<{ provider: string; reason: string; remainingMs: number }>;
  } {
    const now = Date.now();
    return {
      exclusionCount: this.exclusions.size,
      incidentMode: this.incidentMode,
      exclusions: [...this.exclusions.values()].map((e) => ({
        provider: e.provider,
        reason: e.reason,
        remainingMs: Math.max(0, e.cooldownMs - (now - e.excludedAt)),
      })),
    };
  }
}

let _instance: SelfHealingManager | null = null;
export function getSelfHealingManager(): SelfHealingManager {
  if (!_instance) _instance = new SelfHealingManager();
  return _instance;
}
