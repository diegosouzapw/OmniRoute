/**
 * Provider Diversity Tracking via Shannon Entropy
 *
 * Measures and tracks how evenly distributed requests are across providers.
 * A system routing 90% of traffic to one provider has a catastrophic single
 * point of failure. This module provides a diversity score [0..1] that can
 * be used as a scoring factor in auto-combo selection.
 *
 * Shannon entropy normalized to [0..1]:
 *   - 0.0 = all requests go to one provider (maximum risk)
 *   - 1.0 = perfectly even distribution (minimum risk)
 *
 * @see https://en.wikipedia.org/wiki/Entropy_(information_theory)
 */

/** Rolling window entry for provider usage tracking */
interface UsageEntry {
  provider: string;
  timestamp: number;
}

/** Configuration for the diversity tracker */
export interface DiversityConfig {
  /** Maximum entries in the rolling window (default: 200) */
  windowSize: number;
  /** Time-to-live in ms for entries — older entries are pruned (default: 1 hour) */
  ttlMs: number;
}

const DEFAULT_CONFIG: DiversityConfig = {
  windowSize: 200,
  ttlMs: 3_600_000, // 1 hour
};

/** In-memory rolling window of recent provider usage */
let usageWindow: UsageEntry[] = [];
let config: DiversityConfig = { ...DEFAULT_CONFIG };

/**
 * Configure the diversity tracker.
 */
export function configureDiversity(userConfig: Partial<DiversityConfig>): void {
  config = { ...DEFAULT_CONFIG, ...userConfig };
}

/**
 * Record that a provider was used for a request.
 * Call this after a successful request completes.
 */
export function recordProviderUsage(provider: string): void {
  const now = Date.now();

  usageWindow.push({ provider, timestamp: now });

  // Prune by window size
  if (usageWindow.length > config.windowSize) {
    usageWindow = usageWindow.slice(-config.windowSize);
  }

  // Prune by TTL
  const cutoff = now - config.ttlMs;
  usageWindow = usageWindow.filter((e) => e.timestamp >= cutoff);
}

/**
 * Calculate Shannon entropy normalized to [0..1] for the current usage window.
 *
 * @returns Normalized entropy where 0 = single provider, 1 = perfect distribution
 */
export function calculateDiversityScore(): number {
  if (usageWindow.length === 0) return 1.0; // No data = assume diverse

  const now = Date.now();
  const cutoff = now - config.ttlMs;
  const recent = usageWindow.filter((e) => e.timestamp >= cutoff);

  if (recent.length === 0) return 1.0;

  // Count occurrences per provider
  const counts = new Map<string, number>();
  for (const entry of recent) {
    counts.set(entry.provider, (counts.get(entry.provider) || 0) + 1);
  }

  const total = recent.length;
  const nUnique = counts.size;

  if (nUnique <= 1) return 0.0;

  // Shannon entropy
  let entropy = 0;
  for (const count of counts.values()) {
    const p = count / total;
    entropy -= p * Math.log2(p);
  }

  // Normalize by maximum possible entropy
  const maxEntropy = Math.log2(nUnique);
  return maxEntropy > 0 ? entropy / maxEntropy : 0;
}

/**
 * Get the diversity score for a specific provider.
 * Returns a boost value [0..1] where underrepresented providers score higher.
 * This can be used as a per-candidate factor in auto-combo scoring.
 *
 * @param provider - The provider to score
 * @returns Diversity boost where 1.0 = never used (maximum boost), 0.0 = most used
 */
export function getProviderDiversityBoost(provider: string): number {
  if (usageWindow.length === 0) return 0.5; // No data = neutral

  const now = Date.now();
  const cutoff = now - config.ttlMs;
  const recent = usageWindow.filter((e) => e.timestamp >= cutoff);

  if (recent.length === 0) return 0.5;

  const total = recent.length;
  const providerCount = recent.filter((e) => e.provider === provider).length;

  // Inverse usage share: providers used less get higher boost
  const usageShare = providerCount / total;
  return Math.max(0, 1 - usageShare);
}

/**
 * Get a summary of the current provider distribution.
 * Useful for dashboard display and debugging.
 */
export function getDiversityReport(): {
  score: number;
  totalRequests: number;
  providers: Record<string, { count: number; share: number }>;
  windowSize: number;
  ttlMs: number;
} {
  const now = Date.now();
  const cutoff = now - config.ttlMs;
  const recent = usageWindow.filter((e) => e.timestamp >= cutoff);

  const counts = new Map<string, number>();
  for (const entry of recent) {
    counts.set(entry.provider, (counts.get(entry.provider) || 0) + 1);
  }

  const providers: Record<string, { count: number; share: number }> = {};
  for (const [provider, count] of counts) {
    providers[provider] = {
      count,
      share: recent.length > 0 ? count / recent.length : 0,
    };
  }

  return {
    score: calculateDiversityScore(),
    totalRequests: recent.length,
    providers,
    windowSize: config.windowSize,
    ttlMs: config.ttlMs,
  };
}

/**
 * Reset the diversity tracker. Useful for testing.
 */
export function resetDiversity(): void {
  usageWindow = [];
  config = { ...DEFAULT_CONFIG };
}
