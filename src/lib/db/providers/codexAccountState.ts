import type { CodexRecoveryEvidence } from "@omniroute/open-sse/services/usage/codexRecoveryEvidence.ts";
import { resolveResilienceSettings } from "../../resilience/settings";
import { createHash } from "node:crypto";
import { performance } from "node:perf_hooks";
import { decryptConnectionFields } from "../encryption";
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
  quotaPreflightWindow?: { name: string; windowSeconds: number };
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
    // A preflight may have started before another response published its refusal.
    // Never reclassify active or unknown scoped state from that late read.
    if (patch.quotaPreflightWindow) {
      const scoped = providerSpecificData.codexScopeRateLimitedUntil;
      if (
        scoped !== undefined &&
        (scoped === null || typeof scoped !== "object" || Array.isArray(scoped))
      ) {
        return providerSpecificData;
      }
      const cooldowns = toRecord(scoped);
      if (Object.hasOwn(cooldowns, scope)) {
        const deadline = typeof cooldowns[scope] === "string" ? Date.parse(cooldowns[scope]) : NaN;
        if (!Number.isFinite(deadline) || deadline > Date.now()) return providerSpecificData;
      }
    }
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

    // Every ordinary cooldown/quota response invalidates older preflight provenance.
    const preflightWindows = { ...toRecord(providerSpecificData.codexScopePreflightWindow) };
    delete preflightWindows[scope];

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
      const origin = patch.quotaPreflightWindow;
      if (
        !existingIsAuthoritative &&
        patch.rateLimitSource === "fallback" &&
        origin &&
        ["session", "weekly"].includes(origin.name) &&
        Number.isFinite(origin.windowSeconds) &&
        origin.windowSeconds > 0 &&
        Number.isFinite(Date.parse(patch.rateLimitedUntil))
      ) {
        preflightWindows[scope] = { ...origin, resetAt: patch.rateLimitedUntil };
      }
    }

    if (
      providerSpecificData.codexScopePreflightWindow !== undefined ||
      Object.keys(preflightWindows).length
    ) {
      nextProviderSpecificData.codexScopePreflightWindow = preflightWindows;
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
  rateLimitedUntil: string,
  quotaPreflightWindow?: { name: string; windowSeconds: number }
): Promise<JsonRecord | null> {
  return updateCodexScopedQuotaState(id, scope, {
    rateLimitedUntil,
    rateLimitSource: "fallback",
    quotaPreflightWindow,
  });
}

/** Internal observation only; never deserialized from an HTTP request. */
export interface CodexScopeRecoveryObservation {
  readonly connectionId: string;
  readonly rowDigest: string;
  readonly policyRaw: string | null;
  readonly oldResetAt: number;
  readonly blockingWindow: "session" | "weekly";
  readonly windowSeconds: number;
  readonly startedAt: number;
}

function rowDigest(row: unknown): string {
  return createHash("sha256").update(JSON.stringify(row)).digest("hex");
}

function policySnapshot(db: DbLike): string | null {
  const row = db
    .prepare<{ value: string }>(
      "SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'resilienceSettings'"
    )
    .get();
  return row?.value ?? null;
}

function policy(raw: string | null) {
  try {
    const value: unknown = raw === null ? undefined : JSON.parse(raw);
    if (value !== undefined && (!value || typeof value !== "object" || Array.isArray(value)))
      return null;
    return resolveResilienceSettings({ resilienceSettings: value }).quotaPreflight;
  } catch {
    return null;
  }
}

/** Bind exact credentials/workspace and policy before the live usage fetch. */
export function captureCodexScopeRecovery(
  connection: JsonRecord
): CodexScopeRecoveryObservation | null {
  const startedAt = performance.now();
  if (connection.provider !== "codex" || connection.authType !== "oauth") return null;
  const db = getDbInstance() as unknown as DbLike;
  const row = db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(connection.id);
  if (!row) return null;
  const current = decryptConnectionFields(toRecord(rowToCamel(row)));
  if (current.provider !== "codex" || current.isActive !== true) return null;
  if (["banned", "expired", "credits_exhausted"].includes(String(current.testStatus))) return null;
  for (const key of ["authType", "accessToken", "refreshToken", "providerSpecificData"]) {
    if (JSON.stringify(current[key]) !== JSON.stringify(connection[key])) return null;
  }
  const data = toRecord(current.providerSpecificData);
  if (toRecord(data.codexScopeRateLimitSource).codex !== "fallback") return null;
  const oldResetAt = Date.parse(String(toRecord(data.codexScopeRateLimitedUntil).codex));
  if (!Number.isFinite(oldResetAt) || oldResetAt <= Date.now()) return null;
  const origin = toRecord(toRecord(data.codexScopePreflightWindow).codex);
  if (
    (origin.name !== "session" && origin.name !== "weekly") ||
    Date.parse(String(origin.resetAt)) !== oldResetAt ||
    typeof origin.windowSeconds !== "number" ||
    !Number.isFinite(origin.windowSeconds) ||
    origin.windowSeconds <= 0
  )
    return null;
  const policyRaw = policySnapshot(db);
  if (!policy(policyRaw)) return null;
  return Object.freeze({
    connectionId: String(connection.id),
    rowDigest: rowDigest(row),
    policyRaw,
    oldResetAt,
    blockingWindow: origin.name,
    windowSeconds: origin.windowSeconds,
    startedAt,
  });
}

function hasAdvancedCodexWindows(
  evidence: CodexRecoveryEvidence,
  observation: CodexScopeRecoveryObservation,
  row: JsonRecord
): boolean {
  const blocked = evidence.windows[observation.blockingWindow];
  if (
    !blocked ||
    blocked.windowSeconds !== observation.windowSeconds ||
    blocked.resetAt <= observation.oldResetAt
  )
    return false;
  const currentPolicy = policy(observation.policyRaw);
  if (!currentPolicy) return false;
  const thresholds = toRecord(rowToCamel(row)?.quotaWindowThresholds);
  const providerDefaults = currentPolicy.providerWindowDefaults.codex ?? {};
  return Object.entries(evidence.windows).every(([key, window]) => {
    // These are normal Codex window keys, so the auth resolver's base-window alias is identical.
    const threshold =
      thresholds[key] ?? providerDefaults[key] ?? currentPolicy.defaultThresholdPercent;
    return (
      typeof threshold === "number" &&
      Number.isFinite(threshold) &&
      threshold >= 0 &&
      threshold <= 100 &&
      100 - window.usedPercent > threshold &&
      window.resetAt > Date.now()
    );
  });
}

/** Retire only a proven obsolete normal-Codex preflight fallback, under row + policy CAS. */
export function reconcileCodexScopeRecovery(
  observation: CodexScopeRecoveryObservation,
  evidence: CodexRecoveryEvidence | null
): boolean {
  const fresh = () => {
    const elapsed = performance.now() - observation.startedAt;
    return Number.isFinite(elapsed) && elapsed >= 0 && elapsed <= 30_000;
  };
  if (!evidence || !fresh()) return false;
  const db = getDbInstance() as unknown as DbLike;
  backupDbFile("pre-write");
  const changed = db.transaction(() => {
    const raw = db
      .prepare("SELECT * FROM provider_connections WHERE id = ?")
      .get(observation.connectionId);
    if (
      !raw ||
      !fresh() ||
      rowDigest(raw) !== observation.rowDigest ||
      policySnapshot(db) !== observation.policyRaw
    )
      return false;
    const row = toRecord(raw);
    if (!hasAdvancedCodexWindows(evidence, observation, row)) return false;
    const data = toRecord(rowToCamel(row)?.providerSpecificData);
    const cooldowns = { ...toRecord(data.codexScopeRateLimitedUntil) };
    const sources = { ...toRecord(data.codexScopeRateLimitSource) };
    if (
      sources.codex !== "fallback" ||
      Date.parse(String(cooldowns.codex)) !== observation.oldResetAt
    )
      return false;
    const origins = { ...toRecord(data.codexScopePreflightWindow) };
    delete cooldowns.codex;
    delete sources.codex;
    delete origins.codex;
    db.prepare(
      `UPDATE provider_connections SET provider_specific_data = ?, updated_at = ? WHERE id = ?`
    ).run(
      JSON.stringify({
        ...data,
        codexScopeRateLimitedUntil: cooldowns,
        codexScopeRateLimitSource: sources,
        codexScopePreflightWindow: origins,
      }),
      new Date().toISOString(),
      observation.connectionId
    );
    return true;
  })();
  if (changed) invalidateDbCache("connections");
  return changed;
}
