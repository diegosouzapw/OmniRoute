/**
 * Cache Control Policy
 *
 * Determines when to preserve client-side prompt caching headers (cache_control)
 * vs. applying OmniRoute's own caching strategy.
 *
 * Client-side caching (e.g., Claude Code) should be preserved when:
 * 1. Client is Claude Code or similar caching-aware client
 * 2. Request will hit a deterministic target (single model or deterministic combo strategy)
 * 3. Provider supports prompt caching (Anthropic, Alibaba Qwen, etc.)
 */

import type { RoutingStrategyValue } from "../../src/shared/constants/routingStrategies";

/**
 * Cache control preservation modes
 */
export type CacheControlMode = "auto" | "always" | "never";

/**
 * Cache control settings from the database
 */
export interface CacheControlSettings {
  alwaysPreserveClientCache?: CacheControlMode;
}

/**
 * Cache metrics for tracking effectiveness
 */
export interface CacheControlMetrics {
  // Totals
  totalRequests: number;
  requestsWithCacheControl: number;

  // Token counts
  totalInputTokens: number;
  totalCachedTokens: number;
  totalCacheCreationTokens: number;

  // Savings
  tokensSaved: number;
  estimatedCostSaved: number;

  // Breakdowns
  byProvider: Record<
    string,
    {
      requests: number;
      inputTokens: number;
      cachedTokens: number;
      cacheCreationTokens: number;
    }
  >;
  byStrategy: Record<
    string,
    {
      requests: number;
      inputTokens: number;
      cachedTokens: number;
      cacheCreationTokens: number;
    }
  >;

  lastUpdated: string;
}

/**
 * Routing strategies that are deterministic (same request → same provider)
 */
const DETERMINISTIC_STRATEGIES: Set<RoutingStrategyValue> = new Set(["priority", "cost-optimized"]);

/**
 * Providers that support prompt caching
 */
const CACHING_PROVIDERS = new Set(["claude", "anthropic", "zai", "qwen", "deepseek"]);

/**
 * Detect if the client is Claude Code or another caching-aware client
 */
export function isClaudeCodeClient(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();

  // Claude Code user agents
  if (ua.includes("claude-code") || ua.includes("claude_code")) return true;
  if (ua.includes("claude-cli/")) return true;
  if (ua.includes("sdk-cli")) return true;
  if (ua.includes("anthropic") && ua.includes("cli")) return true;

  return false;
}

/**
 * Check if a provider supports prompt caching
 * Supports caching if:
 * 1. Provider is in the known caching providers list, OR
 * 2. Provider uses Claude protocol (detected via targetFormat)
 */
export function providerSupportsCaching(
  provider: string | null | undefined,
  targetFormat?: string | null
): boolean {
  if (!provider) return false;
  if (CACHING_PROVIDERS.has(provider.toLowerCase())) return true;
  // All Claude-protocol providers support prompt caching
  if (targetFormat === "claude") return true;
  return false;
}

/**
 * Check if a routing strategy is deterministic
 */
export function isDeterministicStrategy(
  strategy: RoutingStrategyValue | null | undefined
): boolean {
  if (!strategy) return false;
  return DETERMINISTIC_STRATEGIES.has(strategy);
}

/**
 * Determine if client-side cache_control headers should be preserved
 *
 * @param userAgent - User-Agent header from the request
 * @param isCombo - Whether this is a combo model
 * @param comboStrategy - The combo's routing strategy (if applicable)
 * @param targetProvider - The target provider for the request
 * @param settings - Cache control settings from database (optional)
 * @returns true if cache_control should be preserved, false if OmniRoute should manage it
 */
export function shouldPreserveCacheControl({
  userAgent,
  isCombo,
  comboStrategy,
  targetProvider,
  targetFormat,
  settings,
}: {
  userAgent: string | null | undefined;
  isCombo: boolean;
  comboStrategy?: RoutingStrategyValue | null;
  targetProvider: string | null | undefined;
  targetFormat?: string | null;
  settings?: CacheControlSettings;
}): boolean {
  // User override takes precedence
  if (settings?.alwaysPreserveClientCache === "always") {
    return true;
  }
  if (settings?.alwaysPreserveClientCache === "never") {
    return false;
  }

  // Auto mode: use automatic detection (existing logic)
  // Must be a caching-aware client
  if (!isClaudeCodeClient(userAgent)) {
    return false;
  }

  // Target provider must support caching
  if (!providerSupportsCaching(targetProvider, targetFormat)) {
    return false;
  }

  // Single model: always preserve (deterministic)
  if (!isCombo) {
    return true;
  }

  // Combo: only preserve if strategy is deterministic
  return isDeterministicStrategy(comboStrategy);
}

/**
 * Track cache control metrics for a request
 */
export function trackCacheMetrics({
  preserved,
  provider,
  strategy,
  metrics,
  inputTokens,
  cachedTokens,
  cacheCreationTokens,
}: {
  preserved: boolean;
  provider: string;
  strategy: string | null | undefined;
  metrics: CacheControlMetrics;
  inputTokens?: number;
  cachedTokens?: number;
  cacheCreationTokens?: number;
}): CacheControlMetrics {
  const now = new Date().toISOString();

  // Initialize metrics if empty
  if (!metrics) {
    metrics = {
      totalRequests: 0,
      requestsWithCacheControl: 0,
      totalInputTokens: 0,
      totalCachedTokens: 0,
      totalCacheCreationTokens: 0,
      tokensSaved: 0,
      estimatedCostSaved: 0,
      byProvider: {},
      byStrategy: {},
      lastUpdated: now,
    };
  }

  // Increment total requests
  metrics.totalRequests++;

  // Track token counts
  const input = inputTokens || 0;
  const cached = cachedTokens || 0;
  const creation = cacheCreationTokens || 0;

  metrics.totalInputTokens += input;
  metrics.totalCachedTokens += cached;
  metrics.totalCacheCreationTokens += creation;

  // Calculate tokens saved (cached tokens are reused, not charged)
  if (cached > 0) {
    metrics.tokensSaved += cached;
  }

  // Only track requests where cache_control was preserved
  if (preserved) {
    metrics.requestsWithCacheControl++;

    // Initialize provider tracking
    if (!metrics.byProvider[provider]) {
      metrics.byProvider[provider] = {
        requests: 0,
        inputTokens: 0,
        cachedTokens: 0,
        cacheCreationTokens: 0,
      };
    }
    metrics.byProvider[provider].requests++;
    metrics.byProvider[provider].inputTokens += input;
    metrics.byProvider[provider].cachedTokens += cached;
    metrics.byProvider[provider].cacheCreationTokens += creation;

    // Initialize strategy tracking
    if (strategy && !metrics.byStrategy[strategy]) {
      metrics.byStrategy[strategy] = {
        requests: 0,
        inputTokens: 0,
        cachedTokens: 0,
        cacheCreationTokens: 0,
      };
    }
    if (strategy) {
      metrics.byStrategy[strategy].requests++;
      metrics.byStrategy[strategy].inputTokens += input;
      metrics.byStrategy[strategy].cachedTokens += cached;
      metrics.byStrategy[strategy].cacheCreationTokens += creation;
    }
  }

  metrics.lastUpdated = now;
  return metrics;
}

/**
 * Record cache token usage and update metrics
 */
export function updateCacheTokenMetrics({
  metrics,
  provider,
  strategy,
  inputTokens,
  cachedTokens,
  cacheCreationTokens,
  costSaved,
}: {
  metrics: CacheControlMetrics;
  provider: string;
  strategy: string | null | undefined;
  inputTokens: number;
  cachedTokens: number;
  cacheCreationTokens: number;
  costSaved?: number;
}): CacheControlMetrics {
  metrics.totalCachedTokens += cachedTokens;
  metrics.totalCacheCreationTokens += cacheCreationTokens;
  metrics.totalInputTokens += inputTokens;

  // Cached tokens are reused (saved), creation tokens are new cache writes
  metrics.tokensSaved += cachedTokens;
  if (costSaved !== undefined) {
    metrics.estimatedCostSaved += costSaved;
  }

  // Update provider tracking
  if (metrics.byProvider[provider]) {
    metrics.byProvider[provider].cachedTokens += cachedTokens;
    metrics.byProvider[provider].cacheCreationTokens += cacheCreationTokens;
    metrics.byProvider[provider].inputTokens += inputTokens;
  }

  // Update strategy tracking
  if (strategy && metrics.byStrategy[strategy]) {
    metrics.byStrategy[strategy].cachedTokens += cachedTokens;
    metrics.byStrategy[strategy].cacheCreationTokens += cacheCreationTokens;
    metrics.byStrategy[strategy].inputTokens += inputTokens;
  }

  metrics.lastUpdated = new Date().toISOString();
  return metrics;
}
