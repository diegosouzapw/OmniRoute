/**
 * Deterministic fallback color for provider ids that are not present in the static
 * AI_PROVIDERS registry — e.g. user-defined `openai-compatible-*` / `anthropic-compatible-*`
 * providers backed by the `provider_nodes` table. Without this, every such custom provider
 * rendered as the same anonymous gray node in the Topology view, indistinguishable from any
 * other custom provider even though its label was already resolved correctly. See #8328.
 */

// Small palette of visually distinguishable, saturated colors — spread far enough apart in
// hue to stay distinguishable side-by-side on both light and dark topology backgrounds.
export const FALLBACK_COLOR_PALETTE: readonly string[] = [
  "#0ea5e9", // sky
  "#a855f7", // purple
  "#f59e0b", // amber
  "#10b981", // emerald
  "#ec4899", // pink
  "#6366f1", // indigo
  "#14b8a6", // teal
  "#f97316", // orange
];

/** FNV-1a hash — fast, deterministic, and well-distributed for short id strings. */
function hashProviderId(value: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * Returns a deterministic color for a provider id not present in the static AI_PROVIDERS
 * registry: the same id always maps to the same palette entry, and different ids spread
 * across the palette so distinct custom providers stay visually distinguishable.
 */
export function getFallbackProviderColor(providerId: string): string {
  if (!providerId) return FALLBACK_COLOR_PALETTE[0];
  const index = hashProviderId(providerId) % FALLBACK_COLOR_PALETTE.length;
  return FALLBACK_COLOR_PALETTE[index];
}
