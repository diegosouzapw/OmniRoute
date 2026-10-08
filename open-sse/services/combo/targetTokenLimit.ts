/**
 * Per-connection TPM budget for combo quota reservation.
 *
 * Extracted from roundRobinCombo.ts, a file-size-frozen file: the lookup is
 * unchanged, only relocated so the dispatcher can keep its own behavior.
 *
 * @internal — not part of the public combo.ts barrel.
 */
import { getCachedProviderConnectionById } from "../../../src/lib/db/readCache.ts";

/** Undefined = the store keeps its prior limit for this connection. */
export async function resolveTargetTokenLimit(target: {
  connectionId?: string | null;
}): Promise<number | undefined> {
  const connectionId = target?.connectionId;
  if (!connectionId) return undefined;
  try {
    const connection = await getCachedProviderConnectionById(connectionId);
    const overrides = (connection as { rateLimitOverrides?: Record<string, number> | null } | null)
      ?.rateLimitOverrides;
    const tpm = overrides?.tpm;
    return typeof tpm === "number" && tpm > 0 ? tpm : undefined;
  } catch {
    return undefined;
  }
}
