/**
 * Free-tier monthly token budget catalog.
 *
 * Hand-seeded from the 2026-06-05 per-provider research snapshot. Each value is
 * the UPPER-BOUND of a provider's DOCUMENTED recurring monthly free tokens
 * (explicit daily/monthly token cap, or documented RPD × ~800 tokens × 30).
 *
 * Deliberately EXCLUDED (rate-limit-only, no published token cap — theoretical,
 * not granted): tencent, siliconflow, nvidia, baidu, publicai, sparkdesk.
 * One-time signup credits and discontinued tiers are excluded (do not recur).
 */
export type TosVerdict = "ok" | "caution" | "ambiguous" | "avoid" | "unknown";

export const FREE_TIER_BUDGETS: Record<string, number> = {
  mistral: 1_000_000_000,
  "cloudflare-ai": 122_000_000,
  gemini: 60_000_000,
  doubao: 60_000_000,
  cerebras: 30_000_000,
  "api-airforce": 24_000_000,
  "ollama-cloud": 20_000_000,
  "github-models": 18_000_000,
  groq: 15_000_000,
  inclusionai: 15_000_000,
  bluesminds: 7_200_000,
  sambanova: 6_000_000,
  "arcee-ai": 4_800_000,
  llm7: 4_300_000,
  bazaarlink: 3_600_000,
  openrouter: 1_200_000,
  cohere: 800_000,
  huggingchat: 500_000,
  morph: 400_000,
  huggingface: 200_000,
  kiro: 25_000,
};

/**
 * Providers whose terms PROHIBIT routing through a self-hosted proxy or forbid
 * non-personal use. Source: ToS attention table in docs/reference/FREE_TIERS.md.
 */
export const FREE_TIER_TOS: Record<string, TosVerdict> = {
  opencode: "avoid",
  "duckduckgo-web": "avoid",
  agy: "avoid",
  kiro: "avoid",
  "amazon-q": "avoid",
  "muse-spark-web": "avoid",
  "t3-web": "avoid",
  "qwen-web": "avoid",
  modal: "avoid",
  nlpcloud: "avoid",
  blackbox: "avoid",
  completions: "avoid",
  fireworks: "avoid",
  "featherless-ai": "avoid",
  friendliai: "avoid",
  ai21: "avoid",
  iflytek: "avoid",
  coze: "avoid",
};

export interface FreeTierTotals {
  documentedMonthlyTokens: number;
  providerCount: number;
  byProvider: Array<{ id: string; monthlyTokens: number; tos: TosVerdict }>;
  headline: string;
}

function billions(n: number): string {
  return n >= 1e9 ? (n / 1e9).toFixed(2) + "B" : Math.round(n / 1e6) + "M";
}

/**
 * Sum the documented free-tier budgets. `excludeTosAvoid` drops providers whose
 * terms prohibit proxy use (not usable headroom).
 *
 * @deprecated Superseded by the per-MODEL catalog. Use
 * `computeFreeModelTotals()` from `./freeModelCatalog.ts` — it is the canonical
 * source behind `/api/free-tier/summary` (~1.94B steady vs this per-provider
 * ~1.54B). This per-provider aggregator is retained only for reference; the
 * `FREE_TIER_TOS` map below is still used as the ToS source of truth.
 */
export function computeFreeTierTotals(opts: { excludeTosAvoid?: boolean } = {}): FreeTierTotals {
  const byProvider = Object.entries(FREE_TIER_BUDGETS)
    .map(([id, monthlyTokens]) => ({
      id,
      monthlyTokens,
      tos: (FREE_TIER_TOS[id] ?? "caution") as TosVerdict,
    }))
    .filter((p) => !(opts.excludeTosAvoid && p.tos === "avoid"))
    .sort((a, b) => b.monthlyTokens - a.monthlyTokens);

  const documentedMonthlyTokens = byProvider.reduce((s, p) => s + p.monthlyTokens, 0);
  return {
    documentedMonthlyTokens,
    providerCount: byProvider.length,
    byProvider,
    headline: `over ${billions(documentedMonthlyTokens)} documented free tokens/month across ${byProvider.length}+ providers`,
  };
}
