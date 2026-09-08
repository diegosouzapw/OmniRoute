import { getCodexModelScope, type CodexQuotaScope } from "../../config/codexQuotaScopes.ts";
import { updateCodexScopeCooldown } from "@/lib/db/providers";

export interface PersistCodexChildCooldownResult {
  readonly scope: CodexQuotaScope;
  readonly providerSpecificData: Record<string, unknown>;
}

/** Persist one virtual child's cooldown without mutating parent-level health state. */
export async function persistCodexChildCooldown(params: {
  connectionId: string;
  model: string;
  rateLimitedUntil: string;
  quotaPreflightWindow?: { name: string; windowSeconds: number };
}): Promise<PersistCodexChildCooldownResult | null> {
  if (params.model.trim().length === 0) return null;
  const scope = getCodexModelScope(params.model);
  const providerSpecificData = await updateCodexScopeCooldown(
    params.connectionId,
    scope,
    params.rateLimitedUntil,
    params.quotaPreflightWindow
  );
  return providerSpecificData ? { scope, providerSpecificData } : null;
}
