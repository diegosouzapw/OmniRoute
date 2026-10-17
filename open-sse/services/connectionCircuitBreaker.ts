/**
 * HouMinXi: one connection's failures must not open the breaker for every
 * account on that provider. A dead proxy still uses the provider key, because
 * it fails every account the same way.
 */
import { resolveProviderId } from "../../src/shared/constants/providers";
import { getCircuitBreaker } from "../../src/shared/utils/circuitBreaker";

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

/**
 * A valid connection test proves the provider answers: close the provider breaker and the
 * tested connection's breaker when they are DEGRADED, since DEGRADED steers traffic away and
 * the successes that would close it may never come. Everything else stays as it is: a CLOSED
 * partial count still wears down one success at a time, and an auth/models probe does not
 * prove the inference path, so only a request probe may settle OPEN or HALF_OPEN.
 * An operator-disabled connection is only tested on explicit request (the health scheduler
 * tests active connections), so its valid probe also counts.
 */
export function clearTestedBreakers(provider: string, connectionId: string): void {
  if (!provider) return;
  getCircuitBreaker(resolveProviderId(provider)).closeDegraded("connection-test");
  getCircuitBreaker(connectionCircuitBreakerName(provider, connectionId)).closeDegraded(
    "connection-test"
  );
}
