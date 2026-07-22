/**
 * "Featured" provider pinning + brand accent — presentation-only concern for the
 * providers dashboard grid.
 *
 * Currently powers the Kimi (Moonshot AI) official-partnership highlight
 * (2026-07): Kimi-family providers are pinned first within whichever
 * category/group they render in on `/dashboard/providers`, and their
 * `ProviderCard` renders a Kimi-blue accent + "Official Supporter" badge.
 *
 * Scope guard: this is a UI ordering/branding concern ONLY. It must never be
 * imported by routing/fallback code (`open-sse/config/providerRegistry.ts`,
 * `open-sse/config/providers/*`) — the order defined here has zero effect on
 * combo routing, Auto-Combo scoring, or fallback/account selection. See
 * `providerPageUtils.ts::sortProviderEntriesFeaturedFirst`, the sole consumer
 * of `FEATURED_PROVIDER_IDS`, and `ProviderCard.tsx`, the sole consumer of
 * `KIMI_BRAND_COLOR`/`isKimiPartnerProviderId`.
 */

/**
 * Official Kimi (Moonshot AI) brand blue — matches the Kimi app icon
 * (#1783FF on white). Card accent classes in `ProviderCard.tsx` use this exact
 * hex as Tailwind arbitrary values (Tailwind's JIT scanner requires a static
 * literal in the className string, so it cannot reference this constant
 * directly) — keep them in sync with this value if it ever changes.
 */
export const KIMI_BRAND_COLOR = "#1783FF";

/**
 * Every Kimi/Moonshot dashboard-catalog provider id (`src/shared/constants/providers/`),
 * including the two `hiddenFromDashboard` aliases that never render their own
 * card today — kept here so the set stays correct if that ever changes.
 *
 *  - "kimi"               legacy Moonshot API alias — apikey category, hiddenFromDashboard
 *  - "kimi-coding"        Kimi Code CLI — oauth category (visible card)
 *  - "kimi-coding-apikey" Kimi Code API Key — apikey category, hiddenFromDashboard
 *                         (its connections fold into the kimi-coding card, see
 *                         PROVIDER_CONNECTION_ALIASES in providerPageUtils.ts)
 *  - "kimi-web"           Kimi Web — web-cookie category (visible card)
 *  - "moonshot"           Moonshot AI — apikey category (visible card)
 */
const KIMI_PROVIDER_IDS: readonly string[] = [
  "kimi",
  "kimi-coding",
  "kimi-coding-apikey",
  "kimi-web",
  "moonshot",
];

/**
 * Providers pinned first within their dashboard category/group by
 * `sortProviderEntriesFeaturedFirst`. A plain Set (not hardcoded inline at the
 * sort call site) so a future partnership can extend it without touching the
 * sort implementation.
 */
export const FEATURED_PROVIDER_IDS: ReadonlySet<string> = new Set(KIMI_PROVIDER_IDS);

export function isFeaturedProviderId(providerId: string | null | undefined): boolean {
  return typeof providerId === "string" && FEATURED_PROVIDER_IDS.has(providerId);
}

/** True for providers that should render the Kimi official-supporter card accent. */
export function isKimiPartnerProviderId(providerId: string | null | undefined): boolean {
  return typeof providerId === "string" && KIMI_PROVIDER_IDS.includes(providerId);
}
