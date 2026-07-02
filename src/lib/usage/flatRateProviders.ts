/**
 * Flat-rate (subscription / cookie-web) provider classification — issue #5552.
 *
 * Some providers are billed at a flat rate (a subscription or a coding plan),
 * not per token: cookie/web sessions (ChatGPT Web, grok-web, …) are backed by a
 * consumer subscription, and several "Coding Plan" providers (Codex, MiniMax
 * Coding, Kimi Coding, GLM Coding, …) bill a fixed monthly fee. These providers
 * still carry per-token pricing rows (used for pre-flight estimates), so cost
 * analytics computed from those rows shows an inflated dollar amount that does
 * not match the user's actual bill. For those providers analytics should show
 * $0 instead — see {@link module:lib/usage/costCalculator}.
 *
 * This is intentionally a DISPLAY-only signal: it is consulted by the analytics
 * surfaces (opt-in via the `flatRateAsZero` cost option), never by the budget /
 * quota / routing paths, so per-request cost estimation is unchanged.
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
 * `minimax` "Minimax Coding" plan), and `glm-thinking` (metered tier, distinct
 * from the `glm` Coding plan).
 */
const FLAT_RATE_SUBSCRIPTION_PROVIDER_IDS: ReadonlySet<string> = new Set([
  "minimax", // "Minimax Coding" plan
  "kimi-coding", // Kimi Coding plan (OAuth)
  "kimi-coding-apikey", // Kimi Coding plan (API-key auth, still flat-rate)
  "xiaomi-mimo", // Xiaomi MiMo plan (issue: "MiMo Token Plan")
  "bailian-coding-plan", // Alibaba Coding Plan
  "glm", // GLM Coding plan
  "glm-cn", // GLM Coding (China) plan
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
