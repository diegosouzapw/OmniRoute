/**
 * HouMinXi: one connection's failures must not open the breaker for every
 * account on that provider. A dead proxy still uses the provider key, because
 * it fails every account the same way.
 */
import { resolveProviderId } from "../../src/shared/constants/providers";

export function connectionCircuitBreakerName(provider: string, connectionId: string): string {
  return `${resolveProviderId(provider)}::conn::${connectionId}`;
}

export function failureCircuitBreakerName(
  provider: string,
  connectionId?: string | null,
  isNetworkError?: boolean
): string {
  if (connectionId && !isNetworkError) return connectionCircuitBreakerName(provider, connectionId);
  return resolveProviderId(provider);
}
