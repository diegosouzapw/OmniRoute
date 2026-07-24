import { backupDbFile } from "../backup";
import { getDbInstance, rowToCamel } from "../core";
import { invalidateDbCache } from "../readCache";
import { toRecord } from "./columns";

type JsonRecord = Record<string, unknown>;

interface StatementLike<TRow = unknown> {
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes?: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
  transaction: <T>(fn: () => T) => () => T;
}

type CodexScopedQuotaPatch = {
  quotaState?: JsonRecord;
  exhaustedWindow?: "5h" | "7d" | null;
  rateLimitedUntil?: string;
  rateLimitSource?: "fallback" | "quota_reset";
};

/**
 * Atomically merge one virtual Codex child's quota evidence into its persisted parent.
 * The transaction reads the latest row so sibling child state cannot be lost.
 */
export async function updateCodexScopedQuotaState(
  id: string,
  scope: "codex" | "spark",
  patch: CodexScopedQuotaPatch
): Promise<JsonRecord | null> {
  const db = getDbInstance() as unknown as DbLike;
  const candidate = db.prepare("SELECT provider FROM provider_connections WHERE id = ?").get(id);
  if (toRecord(candidate).provider !== "codex") return null;

  backupDbFile("pre-write");
  const persisted = db.transaction(() => {
    const existing = db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(id);
    if (!existing) return null;

    const existingRecord = toRecord(rowToCamel(existing));
    if (existingRecord.provider !== "codex") return null;
    const providerSpecificData = toRecord(existingRecord.providerSpecificData);
    const nextProviderSpecificData: JsonRecord = { ...providerSpecificData };

    if (patch.quotaState) {
      const quotaByScope = toRecord(providerSpecificData.codexQuotaStateByScope);
      nextProviderSpecificData.codexQuotaStateByScope = {
        ...quotaByScope,
        [scope]: patch.quotaState,
      };
      nextProviderSpecificData.codexQuotaState = {
        ...patch.quotaState,
        scope,
        updatedAt: patch.quotaState.observedAt,
      };
    }

    if (patch.exhaustedWindow !== undefined) {
      const exhaustedByScope = { ...toRecord(providerSpecificData.codexExhaustedWindowByScope) };
      if (patch.exhaustedWindow) exhaustedByScope[scope] = patch.exhaustedWindow;
      else delete exhaustedByScope[scope];
      nextProviderSpecificData.codexExhaustedWindowByScope = exhaustedByScope;
      if (patch.exhaustedWindow) {
        nextProviderSpecificData.codexExhaustedWindow = patch.exhaustedWindow;
      } else {
        delete nextProviderSpecificData.codexExhaustedWindow;
      }
    }

    if (patch.rateLimitedUntil) {
      const scopeCooldowns = toRecord(providerSpecificData.codexScopeRateLimitedUntil);
      const sourceByScope = toRecord(providerSpecificData.codexScopeRateLimitSource);
      const existingCooldownMs =
        typeof scopeCooldowns[scope] === "string"
          ? new Date(scopeCooldowns[scope] as string).getTime()
          : NaN;
      const existingIsAuthoritative =
        sourceByScope[scope] === "quota_reset" &&
        patch.rateLimitSource !== "quota_reset" &&
        Number.isFinite(existingCooldownMs) &&
        existingCooldownMs > Date.now();
      nextProviderSpecificData.codexScopeRateLimitedUntil = {
        ...scopeCooldowns,
        [scope]: existingIsAuthoritative ? scopeCooldowns[scope] : patch.rateLimitedUntil,
      };
      nextProviderSpecificData.codexScopeRateLimitSource = {
        ...sourceByScope,
        [scope]: existingIsAuthoritative
          ? sourceByScope[scope]
          : (patch.rateLimitSource ?? "fallback"),
      };
    }

    db.prepare(
      `UPDATE provider_connections
       SET provider_specific_data = ?, updated_at = ?
       WHERE id = ?`
    ).run(JSON.stringify(nextProviderSpecificData), new Date().toISOString(), id);
    return nextProviderSpecificData;
  })();

  if (persisted) invalidateDbCache("connections");
  return persisted;
}

/** Persist one child cooldown through the shared scoped quota-state transaction. */
export async function updateCodexScopeCooldown(
  id: string,
  scope: "codex" | "spark",
  rateLimitedUntil: string
): Promise<JsonRecord | null> {
  return updateCodexScopedQuotaState(id, scope, {
    rateLimitedUntil,
    rateLimitSource: "fallback",
  });
}
