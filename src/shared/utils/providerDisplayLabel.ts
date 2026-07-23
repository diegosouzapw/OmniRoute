/**
 * Get a friendly display label for compatible providers.
 * Converts long IDs like "openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441"
 * to readable labels. If providerNodes are available, uses user-defined name;
 * otherwise falls back to "OAI-COMPAT" / "ANT-COMPAT".
 *
 * @param provider - The raw provider ID string from a request log or active request.
 * @param providerNodes - Optional array of provider node objects (from /api/provider-nodes).
 * @returns A human-readable label for compatible providers, or `null` if the provider
 *          is not an openai-compatible-* or anthropic-compatible-* provider (caller
 *          should use its own default in that case).
 */
export function getProviderDisplayLabel(
  provider: string,
  providerNodes?: Array<{ id?: string; prefix?: string; name?: string }>
): string | null {
  if (!provider) return "-";
  if (provider.startsWith("openai-compatible-") || provider.startsWith("anthropic-compatible-")) {
    // Try to find user-defined name from provider nodes
    if (providerNodes?.length) {
      const matchedNode = providerNodes.find(
        (node) => node.id === provider || node.prefix === provider
      );
      if (matchedNode?.name) return matchedNode.name;
    }
    // Fallback to generic labels
    if (provider.startsWith("openai-compatible-")) {
      const suffix = provider.replace("openai-compatible-", "");
      const parts = suffix.split("-");
      if (parts.length > 1 && parts[1]?.length >= 8) return `OAI-COMPAT`;
      return `OAI: ${suffix.slice(0, 16).toUpperCase()}`;
    }
    if (provider.startsWith("anthropic-compatible-")) {
      const suffix = provider.replace("anthropic-compatible-", "");
      const parts = suffix.split("-");
      if (parts.length > 1 && parts[1]?.length >= 8) return `ANT-COMPAT`;
      return `ANT: ${suffix.slice(0, 16).toUpperCase()}`;
    }
  }
  return null; // Not a compatible provider, use default PROVIDER_COLORS
}
