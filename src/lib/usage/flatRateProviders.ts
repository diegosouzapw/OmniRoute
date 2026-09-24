/**
 * Flat-rate (subscription / cookie-web) provider classification — issue #5552.
 *
 * Some providers are billed at a flat rate (a subscription or a coding plan),
 * not per token: cookie/web sessions (ChatGPT Web (Codex), grok-web, …) are backed by a
 * consumer subscription, and several "Coding Plan" providers (Codex, MiniMax
 * Coding, Kimi Coding, GLM Coding, …) bill a fixed monthly fee. These providers
 * still carry per-token pricing rows (used for pre-flight estimates), so cost
 * analytics computed from those rows shows an inflated dollar amount that does
 * not match the user's actual bill. For those providers analytics should show
 * $0 instead — see {@link module:lib/usage/costCalculator}.
 *
 * This classification is the single source of provider economics. Analytics
 * consult it for display (opt-in via the `flatRateAsZero` cost option), and
 * `lib/usage/meteredBudgetPolicy` derives the metered-dollar-budget decisions
 * from it — whether a candidate spends the allowance, and how much of it a
 * completed call consumes. Per-request cost ESTIMATION is unchanged: nothing
 * here rewrites a price, and the quota/rate-limit paths do not consult it.
 *
 * @module lib/usage/flatRateProviders
 */

import { WEB_COOKIE_PROVIDERS } from "@/shared/constants/providers/web-cookie";

/**
 * Dedicated subscription / coding-plan provider ids whose identity IS a
 * flat-rate plan. Kept explicit (not derived) because these entries sit in the
 * api-key / oauth categories alongside genuinely metered providers and carry
 * real per-token pricing rows.
 *
 * Deliberately EXCLUDED even though token-priced and sometimes grouped with the
 * above: `codex`/`cx` (OmniRoute actively tracks Codex token cost — Fast-tier
 * multipliers and GPT-5.x pricing — and Codex can be a metered API account, so
 * its analytics cost is intentional, not an artifact), `byteplus` (BytePlus
 * ModelArk is a metered inference host, billed per token — zeroing it would hide
 * real cost), `minimax-cn` (the metered Minimax China API, distinct from the
 * `minimax` "Minimax Coding" plan), `glm-thinking` (metered tier, distinct
 * from the `glm` Coding plan), and `anthropic` (the metered Anthropic API,
 * distinct from the `claude`/`cc` Claude Code plan below).
 */
const FLAT_RATE_SUBSCRIPTION_PROVIDER_IDS: ReadonlySet<string> = new Set([
  "minimax", // "Minimax Coding" plan
  "kimi-coding", // Kimi Coding plan (OAuth)
  "kimi-coding-apikey", // Kimi Coding plan (API-key auth, still flat-rate)
  "muse-code", // Muse Code subscription (device OAuth minted key or META_API_KEY)
  "xiaomi-mimo", // Xiaomi MiMo plan (issue: "MiMo Token Plan")
  "bailian-coding-plan", // Alibaba Token Plan (legacy provider ID)
  "qwen-cloud-token-plan", // Qwen Cloud Token Plan
  "glm", // GLM Coding plan
  "glm-cn", // GLM Coding (China) plan
  "claude", // Claude Code plan (OAuth-only — a Claude Pro/Max subscription)
  "cc", // Claude Code plan (alias id — same connection, shares the `cc` pricing rows)
  // OpenCode Go subscription (https://opencode.ai/go) — a flat monthly fee. It is an
  // aggregator reselling GLM, Kimi, Grok, DeepSeek, MiniMax, Qwen and GPT-5.x, so
  // per-token rows price each call at the UNDERLYING model's metered rate and the
  // analytics overstatement is large rather than marginal (#11149).
  "opencode-go",
]);

/**
 * Whether a provider bills at a flat rate (subscription / coding plan / cookie
 * web session) rather than per token, so its per-token cost estimate should be
 * surfaced as $0 in analytics. Cookie/web providers are covered dynamically
 * (every web session is subscription-backed), plus the explicit plan set above.
 */
export function isFlatRateProvider(providerId: string | null | undefined): boolean {
  if (!providerId || typeof providerId !== "string") return false;
  const id = providerId.trim().toLowerCase();
  if (!id) return false;
  if (FLAT_RATE_SUBSCRIPTION_PROVIDER_IDS.has(id)) return true;
  return Object.prototype.hasOwnProperty.call(WEB_COOKIE_PROVIDERS, id);
}
