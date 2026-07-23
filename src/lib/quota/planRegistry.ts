import type { QuotaDimension } from "./dimensions";

interface KnownPlanShape {
  provider: string;
  dimensions: QuotaDimension[];
}

const KNOWN_PLANS: Record<string, KnownPlanShape> = {
  codex: {
    provider: "codex",
    dimensions: [
      { unit: "percent", window: "5h", limit: 100 },
      { unit: "percent", window: "weekly", limit: 100 },
    ],
  },
  // Claude Code (Pro / Max 5x / Max 20x) is a percentage-of-plan quota over a 5h
  // rolling window + a weekly cap, shared across Claude and Claude Code. The exact
  // token caps are not published and vary by task, so % is the practical unit; the
  // provider reports % used and fair-share attributes it across keys by local count.
  claude: {
    provider: "claude",
    dimensions: [
      { unit: "percent", window: "5h", limit: 100 },
      { unit: "percent", window: "weekly", limit: 100 },
    ],
  },
  glm: {
    provider: "glm",
    dimensions: [
      // limit=0 = desconhecido; documentado. Mantido para correta detecção pelo planResolver.
      // Sliding window / fair-share devem tratar limit=0 como "manual obrigatório".
      { unit: "tokens", window: "5h", limit: Number.EPSILON },
      { unit: "tokens", window: "weekly", limit: Number.EPSILON },
    ],
  },
  minimax: {
    provider: "minimax",
    // MiniMax token plan (platform.minimax.io/docs/token-plan): monthly allowance
    // enforced over 5h-rolling + weekly windows. Tiers (M3): Plus ~1.633B ($20),
    // Max ~5.053B ($50), Ultra ~9.796B ($120). EPSILON = pick your tier in "Limite".
    dimensions: [
      { unit: "tokens", window: "5h", limit: Number.EPSILON },
      { unit: "tokens", window: "weekly", limit: Number.EPSILON },
    ],
  },
  // DeepSeek is prepaid in USD — its balance API is already wired (deepseekQuotaFetcher)
  // and shown on the quota page. fair-share supports the `usd` unit (COUNTABLE_UNITS),
  // so set a USD budget here ("fixado por valor"); the proxy sums each key's USD cost.
  deepseek: {
    provider: "deepseek",
    dimensions: [{ unit: "usd", window: "monthly", limit: Number.EPSILON }],
  },
  bailian: {
    provider: "bailian",
    dimensions: [
      { unit: "percent", window: "5h", limit: 100 },
      { unit: "percent", window: "weekly", limit: 100 },
      { unit: "percent", window: "monthly", limit: 100 },
    ],
  },
  kimi: {
    provider: "kimi",
    dimensions: [{ unit: "requests", window: "hourly", limit: 1500 }],
  },
  // Kimi "coding" plan connections register under the `kimi-coding` slug, which
  // exposes no upstream balance API. EPSILON = "unknown, set the real plan limit
  // manually in the Wizard 'Limite' step" (same convention as glm/minimax).
  "kimi-coding": {
    provider: "kimi-coding",
    dimensions: [
      { unit: "tokens", window: "5h", limit: Number.EPSILON },
      { unit: "tokens", window: "weekly", limit: Number.EPSILON },
    ],
  },
  // Xiaomi MiMo token plan (platform.xiaomimimo.com/token-plan) is a MONTHLY
  // allowance with no balance API. Default seeds the "lite" plan's 4.1B-token
  // monthly cap so the Wizard pre-fills a usable fair-share limit; adjust in the
  // "Limite" step to match the connection's actual plan.
  "xiaomi-mimo": {
    provider: "xiaomi-mimo",
    dimensions: [{ unit: "tokens", window: "monthly", limit: 4_100_000_000 }],
  },
  alibaba: {
    provider: "alibaba",
    dimensions: [{ unit: "requests", window: "monthly", limit: 90_000 }],
  },
  // Grok Build (xAI) — rate limits from x-ratelimit-* headers:
  // Daily: 864 requests, 18M tokens (from API headers)
  // Weekly: derived from daily * 7
  // #6844: this static estimate is now the fallback used only when the live
  // grok-cli quota fetcher (open-sse/services/grokCliQuotaFetcher.ts) returns
  // null (both credentials missing and upstream fetch/parse failures fail
  // open to this static plan) — the shared weekly percent-based credit pool
  // it estimates is not observable from local request/token counters alone.
  "grok-cli": {
    provider: "grok-cli",
    dimensions: [
      { unit: "requests", window: "daily", limit: 864 },
      { unit: "tokens", window: "daily", limit: 18_000_000 },
      { unit: "requests", window: "weekly", limit: 6048 },
      { unit: "tokens", window: "weekly", limit: 126_000_000 },
    ],
  },
};

export function getKnownPlan(provider: string): KnownPlanShape | null {
  return KNOWN_PLANS[provider] ?? null;
}

export function knownProviders(): readonly string[] {
  return Object.keys(KNOWN_PLANS);
}
