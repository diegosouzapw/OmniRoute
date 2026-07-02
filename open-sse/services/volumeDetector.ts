/**
 * Volume & Complexity Detector for Adaptive Routing
 *
 * Detects request characteristics (batch size, token estimate, tool count,
 * complexity signals) and recommends routing strategy overrides.
 *
 * When a request clearly belongs to a different routing profile than the
 * combo's default strategy, this module suggests an override. For example:
 *   - Batch of 500 items → round-robin (prevent throttling)
 *   - 3 tools + browser → priority with premium-first (needs best model)
 *   - 50 tokens → keep strategy but flag for economy tier
 */

/** Signals extracted from a request for routing decisions */
export interface VolumeSignals {
  /** Number of items in a batch (1 for single requests) */
  batchSize: number;
  /** Estimated total tokens (input + output) */
  estimatedTokens: number;
  /** Number of tools defined in the request */
  toolCount: number;
  /** Whether the request involves browser/UI interaction */
  hasBrowser: boolean;
  /** Whether the request includes image/screenshot content */
  hasImages: boolean;
  /** Rough complexity level derived from signals */
  complexity: "trivial" | "low" | "medium" | "high" | "critical";
}

/** Strategy override recommendation */
export interface StrategyOverride {
  /** Whether an override is recommended */
  shouldOverride: boolean;
  /** Recommended strategy (null if no override) */
  strategy: "priority" | "round-robin" | "cost-optimized" | "weighted" | null;
  /** Whether to prefer economy models */
  preferEconomy: boolean;
  /** Whether to force premium models first */
  forcePremium: boolean;
  /** Reason for the override (for logging) */
  reason: string;
}

// Tool-related keywords that signal browser/UI interaction
const BROWSER_KEYWORDS = [
  "browser",
  "playwright",
  "puppeteer",
  "screenshot",
  "navigate",
  "click",
  "form",
  "page",
  "tab",
  "window",
  "computer_use",
  "computer-use",
];

// Keywords that signal high complexity
const HIGH_COMPLEXITY_KEYWORDS = [
  "deploy",
  "migration",
  "security",
  "auth",
  "database",
  "refactor",
  "production",
  "incident",
];

/**
 * Detect volume and complexity signals from a chat request body.
 *
 * @param body - The raw request body (OpenAI or Claude format)
 * @returns Extracted signals
 */
export function detectVolumeSignals(body: Record<string, unknown>): VolumeSignals {
  const messages = (body.messages || body.input || []) as unknown[];
  const tools = (body.tools || []) as unknown[];
  const toolCount = tools.length;

  // Estimate batch size from array structures
  let batchSize = 1;
  if (Array.isArray(body.input) && body.input.length > 1) {
    batchSize = body.input.length;
  } else if (Array.isArray(messages)) {
    // Check if the last user message contains multiple items (common batch pattern)
    const lastMsg = messages[messages.length - 1] as Record<string, unknown> | undefined;
    if (lastMsg && Array.isArray(lastMsg.content)) {
      const contentParts = lastMsg.content as unknown[];
      batchSize = Math.max(1, contentParts.length);
    }
  }

  // Estimate tokens from serialized message size
  const serialized = JSON.stringify(messages);
  const estimatedTokens = Math.ceil(serialized.length / 4); // rough: 4 chars ≈ 1 token

  // Detect browser/UI signals
  const lowerSerialized = serialized.toLowerCase();
  const hasBrowser = BROWSER_KEYWORDS.some((kw) => lowerSerialized.includes(kw));

  // Detect image content
  const hasImages =
    lowerSerialized.includes("image_url") ||
    lowerSerialized.includes("image/") ||
    lowerSerialized.includes("base64") ||
    lowerSerialized.includes("screenshot");

  // Determine complexity
  const hasHighKeywords = HIGH_COMPLEXITY_KEYWORDS.some((kw) => lowerSerialized.includes(kw));
  let complexity: VolumeSignals["complexity"];

  if (toolCount > 3 || (hasBrowser && toolCount > 1) || hasHighKeywords) {
    complexity = "critical";
  } else if (toolCount > 1 || hasBrowser || hasImages || estimatedTokens > 10000) {
    complexity = "high";
  } else if (toolCount === 1 || estimatedTokens > 2000) {
    complexity = "medium";
  } else if (estimatedTokens > 500) {
    complexity = "low";
  } else {
    complexity = "trivial";
  }

  return {
    batchSize,
    estimatedTokens,
    toolCount,
    hasBrowser,
    hasImages,
    complexity,
  };
}

/**
 * Recommend a routing strategy override based on detected volume signals.
 *
 * @param signals - Volume signals from detectVolumeSignals()
 * @param currentStrategy - The combo's configured strategy
 * @returns Override recommendation
 */
export async function recommendStrategyOverride(
  signals: VolumeSignals,
  currentStrategy: string
): Promise<StrategyOverride> {
  const noOverride: StrategyOverride = {
    shouldOverride: false,
    strategy: null,
    preferEconomy: false,
    forcePremium: false,
    reason: "no override needed",
  };

  // Check if adaptive routing is enabled globally
  try {
    const { getSettings } = await import("@/lib/localDb");
    const settings = await getSettings();
    if (!settings.adaptiveVolumeRouting) {
      return noOverride;
    }
  } catch (error) {
    console.error("Failed to check adaptiveVolumeRouting setting:", error);
    return noOverride;
  }

  // Rule 1: Large batch → round-robin to distribute load
  if (signals.batchSize >= 50) {
    return {
      shouldOverride: true,
      strategy: "round-robin",
      preferEconomy: true,
      forcePremium: false,
      reason: `batch size ${signals.batchSize} >= 50: distribute load via round-robin with economy models`,
    };
  }

  // Rule 2: Medium batch with low complexity → cost-optimized
  if (signals.batchSize >= 10 && signals.complexity === "low") {
    return {
      shouldOverride: currentStrategy !== "cost-optimized",
      strategy: "cost-optimized",
      preferEconomy: true,
      forcePremium: false,
      reason: `batch size ${signals.batchSize} with low complexity: use cost-optimized routing`,
    };
  }

  // Rule 3: Critical complexity → force priority with premium
  if (signals.complexity === "critical") {
    return {
      shouldOverride: true,
      strategy: "priority",
      preferEconomy: false,
      forcePremium: true,
      reason: `critical complexity (tools=${signals.toolCount}, browser=${signals.hasBrowser}): force premium-first priority`,
    };
  }

  // Rule 4: Browser/UI interaction → force priority with premium
  if (signals.hasBrowser) {
    return {
      shouldOverride: currentStrategy !== "priority",
      strategy: "priority",
      preferEconomy: false,
      forcePremium: true,
      reason: "browser/UI interaction detected: force premium-first priority",
    };
  }

  // Rule 5: Very short request → flag for economy (but don't change strategy)
  if (signals.estimatedTokens <= 200) {
    return {
      shouldOverride: false,
      strategy: null,
      preferEconomy: true,
      forcePremium: false,
      reason: `short request (${signals.estimatedTokens} tokens): prefer economy tier`,
    };
  }

  return noOverride;
}
