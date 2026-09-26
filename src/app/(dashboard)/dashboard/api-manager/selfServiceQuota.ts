/**
 * Per-key self-service quota settings (self-usage contract §1): which providers'
 * shared account quota the key holder may see through /v1/me/status, and how
 * upstream `anthropic-ratelimit-*` headers are handled for the key.
 *
 * Pure helpers shared by the permissions modal and the per-key details page. They
 * live outside ApiManagerPageClient.tsx (frozen god-file) so the modal only takes
 * call-site lines.
 */

export type AnthropicRateLimitHeaderMode = "auto" | "forward" | "strip";

export const ANTHROPIC_RATE_LIMIT_HEADER_MODES: readonly AnthropicRateLimitHeaderMode[] = [
  "auto",
  "forward",
  "strip",
];

export interface SelfServiceQuota {
  /** `null` = every provider the key can reach (default); `[]` = share none. */
  sharedQuotaProviders: string[] | null;
  anthropicRateLimitHeaders: AnthropicRateLimitHeaderMode;
}

export interface QuotaProviderOption {
  provider: string;
  connectionCount: number;
  /** `false` = the provider exposes no account quota data; `undefined` = unknown. */
  quotaSupported?: boolean;
}

interface ConnectionLike {
  id: string;
  provider: string;
  isActive?: boolean;
}

export function isAnthropicRateLimitHeaderMode(
  value: unknown
): value is AnthropicRateLimitHeaderMode {
  return value === "auto" || value === "forward" || value === "strip";
}

/** Non-array input means "all providers" (`null`); arrays are trimmed and de-duplicated. */
export function normalizeSharedQuotaProviders(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const providers: string[] = [];
  for (const entry of value) {
    if (typeof entry !== "string") continue;
    const provider = entry.trim();
    if (provider && !providers.includes(provider)) providers.push(provider);
  }
  return providers;
}

/** Read the settings off a key object (`GET /api/keys`) or a settings payload. */
export function readSelfServiceQuota(
  source: { sharedQuotaProviders?: unknown; anthropicRateLimitHeaders?: unknown } | null | undefined
): SelfServiceQuota {
  return {
    sharedQuotaProviders: normalizeSharedQuotaProviders(source?.sharedQuotaProviders),
    anthropicRateLimitHeaders: isAnthropicRateLimitHeaderMode(source?.anthropicRateLimitHeaders)
      ? source.anthropicRateLimitHeaders
      : "auto",
  };
}

/**
 * Distinct providers of the active connections a key can reach.
 * `allowedConnectionIds === null` = every active connection (an unrestricted key).
 */
export function quotaProviderOptions(
  connections: readonly ConnectionLike[],
  allowedConnectionIds: readonly string[] | null
): QuotaProviderOption[] {
  const allowed = allowedConnectionIds === null ? null : new Set(allowedConnectionIds);
  const counts = new Map<string, number>();
  for (const connection of connections) {
    if (!connection || typeof connection.provider !== "string" || !connection.provider) continue;
    if (connection.isActive === false) continue;
    if (allowed && !allowed.has(connection.id)) continue;
    counts.set(connection.provider, (counts.get(connection.provider) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([provider, connectionCount]) => ({ provider, connectionCount }))
    .sort((a, b) => a.provider.localeCompare(b.provider));
}

/** Toggle one provider inside an explicit selection (never returns `null`). */
export function toggleSharedQuotaProvider(selected: readonly string[], provider: string): string[] {
  return selected.includes(provider)
    ? selected.filter((entry) => entry !== provider)
    : [...selected, provider];
}
