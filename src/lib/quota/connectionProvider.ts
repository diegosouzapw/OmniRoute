/**
 * connectionProvider.ts — Resolve the provider name for a quota-governed
 * connection.
 *
 * A `QuotaPool` (and the pool-usage route) only carries a `connectionId`, not
 * the provider name. To resolve the connection's plan via the catalog
 * (`resolvePlan(connectionId, provider)`) we must look the provider up from the
 * `provider_connections` row. `getProviderConnectionById` is async, so this
 * MUST be awaited — a previous private copy in the plans route omitted the
 * await and silently degraded every catalog lookup to "unknown".
 *
 * Fail-safe: returns "unknown" if the DB is unavailable or the connection is
 * missing, so callers degrade to an empty/manual plan rather than throwing.
 *
 * Part of: Group B — Quota Sharing Engine (plan 22).
 */

export async function resolveConnectionProvider(connectionId: string): Promise<string> {
  try {
    // Lazy import — avoids circular deps and keeps the module loadable without a full DB.
    const { getProviderConnectionById } = await import("@/lib/localDb");
    if (typeof getProviderConnectionById === "function") {
      const conn = await getProviderConnectionById(connectionId);
      if (conn && typeof (conn as { provider?: string }).provider === "string") {
        return (conn as { provider: string }).provider;
      }
    }
  } catch {
    // DB not available or export not present — fall through to the safe default.
  }
  return "unknown";
}
