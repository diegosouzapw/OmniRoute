/**
 * apiKeyRotator.ts — T07: API Key Round-Robin
 *
 * Rotates between a primary API key and extra API keys stored in
 * providerSpecificData.extraApiKeys[]. Uses round-robin by default.
 *
 * Extra keys are stored as plain strings in providerSpecificData.extraApiKeys.
 * Example: { extraApiKeys: ["sk-abc...", "sk-def...", "sk-ghi..."] }
 *
 * The in-memory rotation index resets on process restart, which is intentional —
 * it ensures even distribution across restarts without persistence overhead.
 */

// In-memory round-robin index per connection
const _keyIndexes = new Map<string, number>();

/**
 * Get the next API key in round-robin rotation for a given connection.
 * If no extra keys are configured, returns the primary key unchanged.
 *
 * @param connectionId - Unique connection identifier (for index isolation)
 * @param primaryKey - The main api_key from the connection
 * @param extraKeys - Additional API keys from providerSpecificData.extraApiKeys
 * @returns The selected API key (may be primary or one of the extras)
 */
export function getRotatingApiKey(
  connectionId: string,
  primaryKey: string,
  extraKeys: string[] = []
): string {
  const validExtras = extraKeys.filter((k) => typeof k === "string" && k.trim().length > 0);

  // Only 1 key available → no rotation needed
  if (validExtras.length === 0) return primaryKey;

  const allKeys = [primaryKey, ...validExtras].filter(Boolean);
  if (allKeys.length <= 1) return primaryKey;

  const current = _keyIndexes.get(connectionId) ?? 0;
  const idx = current % allKeys.length;
  _keyIndexes.set(connectionId, current + 1);

  return allKeys[idx];
}

/**
 * Reset the rotation index for a connection.
 * Call this when a key fails (401/403) to skip the bad key next time.
 *
 * @param connectionId - Connection to reset
 */
export function resetRotationIndex(connectionId: string): void {
  _keyIndexes.delete(connectionId);
}

/**
 * Get the total number of API keys available for a connection.
 * Used for logging/observability.
 */
export function getApiKeyCount(primaryKey: string, extraKeys: string[] = []): number {
  const validExtras = extraKeys.filter((k) => typeof k === "string" && k.trim().length > 0);
  return (primaryKey ? 1 : 0) + validExtras.length;
}
