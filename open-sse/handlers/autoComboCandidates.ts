/**
 * #7819 (Level 1) — read-only candidate pool + reachability listing for an
 * `auto/*` channel.
 *
 * Builds its OWN candidate pool via `prepareVirtualAutoComboInputs({}, true)`
 * (#9133, the `skip` opt-out) — the full, unfiltered pool that routing would
 * otherwise narrow with `filterResilienceBlockedCandidates` before ever
 * handing it to this endpoint. Not filtered by any per-key exclusion either,
 * so the operator can see — and toggle — excluded candidates. Every
 * candidate is then decorated with live reachability derived from the
 * existing resilience reads (CLAUDE.md "Resilience Runtime State"):
 *   - provider circuit breaker: `getCircuitBreaker(provider).getStatus()` /
 *     `.canExecute()` — NEVER raw `state`, so an expired breaker (lazy
 *     recovery) doesn't show as permanently open.
 *   - connection cooldown: `rateLimitedUntil` / `testStatus` on the resolved
 *     provider_connections row (no-auth synthetic connections have no row —
 *     treated as always reachable on this axis).
 *   - model lockout: `isModelLocked(provider, connectionId, model)`.
 *
 * A candidate the routing path would currently skip (model-locked, cooled
 * down, breaker open) is never dropped from this listing — it is surfaced
 * with `reachable:false` and the specific reason field (`modelLocked` /
 * `connectionCooldown` / `breakerState`) set, since the panel's whole
 * purpose is read-only transparency, not a preview of the dispatch pool.
 * The actual routing path (`createVirtualAutoCombo` /
 * `createBuiltinAutoCombo` called without a `prepared` override) is
 * unchanged and keeps excluding these candidates before dispatch.
 */
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { getCircuitBreaker } from "@/shared/utils/circuitBreaker";
import { isModelLocked } from "@omniroute/open-sse/services/accountFallback.ts";
import { parseModel } from "@omniroute/open-sse/services/model.ts";
import type { StrictZeroCostExclusionReason } from "@omniroute/open-sse/services/autoCombo/strictZeroCostFilter.ts";
import { getProviderConnectionById } from "@/lib/db/providers";
import { getExcludedConnectionIds } from "@/lib/db/autoCandidateOverrides";

/**
 * One row of the unfiltered, reason-annotated candidate pool (#9133): every
 * eligible provider/model/account combination the routing pool would
 * otherwise contain, including rows routing itself would currently skip.
 * `reachable:false` plus the relevant reason field (`modelLocked` /
 * `connectionCooldown` / `breakerState`) is how a blocked candidate is
 * represented here — it is never simply absent from `candidates`.
 */
export interface AutoComboCandidateView {
  provider: string;
  connectionId: string;
  model: string;
  modelStr: string;
  excluded: boolean;
  reachable: boolean;
  breakerState: string;
  connectionCooldown: boolean;
  modelLocked: boolean;
  /**
   * Why STRICT_ZERO_COST would exclude this candidate from dispatch, or null
   * when it would not — and null as well when the policy is off, which is the
   * default. Reported, never enforced: this listing shows the candidate either
   * way, the routing path is what acts on it.
   */
  freeAccessExclusion: StrictZeroCostExclusionReason | null;
}

export interface AutoComboCandidatesResult {
  channel: string;
  candidates: AutoComboCandidateView[];
}

function hasFutureRateLimit(value: unknown): boolean {
  if (value === null || value === undefined || value === "") return false;
  const time = new Date(String(value)).getTime();
  return Number.isFinite(time) && time > Date.now();
}

async function decorateCandidate(candidate: {
  provider: string;
  connectionId: string;
  model: string;
  modelStr: string;
  freeAccessExclusion?: StrictZeroCostExclusionReason | null;
}): Promise<AutoComboCandidateView> {
  const breaker = getCircuitBreaker(candidate.provider);
  const breakerStatus = breaker.getStatus();
  const breakerReachable = breaker.canExecute();

  let connectionCooldown = false;
  if (candidate.connectionId && candidate.connectionId !== "noauth") {
    try {
      const connection = await getProviderConnectionById(candidate.connectionId);
      connectionCooldown =
        hasFutureRateLimit((connection as Record<string, unknown> | null)?.rateLimitedUntil) ||
        (connection as Record<string, unknown> | null)?.testStatus === "unavailable";
    } catch {
      // Fail-open: an unresolved connection lookup should not mark a
      // candidate unreachable — the panel is read-only transparency, not the
      // dispatch path.
      connectionCooldown = false;
    }
  }

  // #9133 (latent alignment): every lock writer (accountFallback.ts) and the
  // routing-side filter (resilienceCandidateFilter.ts, combo.ts) key
  // `isModelLocked` off the BARE model id, never the "provider/model"
  // `modelStr`. `candidate.model` here is the prefixed form (it comes from
  // the materialized combo's `models[].model`, not the raw candidate pool),
  // so it must be parsed back to bare before the lock lookup — currently
  // masked (both spellings map to the same quota-family key for every
  // provider exercised so far) but not guaranteed for a provider whose lock
  // key isn't family-scoped.
  const bareModel = parseModel(candidate.modelStr).model ?? candidate.model;
  const modelLocked = isModelLocked(candidate.provider, candidate.connectionId, bareModel);

  return {
    provider: candidate.provider,
    connectionId: candidate.connectionId,
    model: candidate.model,
    modelStr: candidate.modelStr,
    excluded: false,
    reachable: breakerReachable && !connectionCooldown && !modelLocked,
    breakerState: String(breakerStatus.state),
    connectionCooldown,
    modelLocked,
    freeAccessExclusion: candidate.freeAccessExclusion ?? null,
  };
}

/**
 * Builds the candidate pool for `channel` (the suffix after "auto/", or the
 * literal "auto" for the base channel) and decorates it with reachability +
 * this API key's exclusion state. Read-only — never mutates routing state.
 */
export async function getAutoComboCandidates(
  channel: string,
  apiKeyId: string | null
): Promise<AutoComboCandidatesResult> {
  const modelStr = channel === "auto" ? "auto" : `auto/${channel}`;

  // The bare "auto" channel (no variant/spec overlay) is handled directly by
  // virtualFactory — createBuiltinAutoCombo() only recognizes `auto/<suffix>`
  // ids (matches classifyAutoModel()'s special-casing of the literal "auto"
  // model string in src/sse/handlers/autoRouting.ts).
  // #9133 — this endpoint's stated role is read-only transparency, so it must
  // build its OWN unfiltered pool (`prepareVirtualAutoComboInputs({}, true)`,
  // the `skip` opt-out) rather than reuse the routing path's pool. Routing
  // legitimately drops resilience-blocked candidates before dispatch; this
  // inspector must not, or a model-locked/cooled-down row silently vanishes
  // instead of showing up as `reachable:false` with a reason. The routing
  // path itself is unchanged — it keeps calling
  // `prepareVirtualAutoComboInputs()`/`createVirtualAutoCombo()` with the
  // default (filtered) behavior.
  const { prepareVirtualAutoComboInputs, createVirtualAutoComboFromPrepared } =
    await import("@omniroute/open-sse/services/autoCombo/virtualFactory.ts");
  const prepared = await prepareVirtualAutoComboInputs({}, true);

  let virtualCombo;
  if (channel === "auto") {
    virtualCombo = await createVirtualAutoComboFromPrepared(prepared, undefined);
  } else {
    const { createBuiltinAutoCombo } =
      await import("@omniroute/open-sse/services/autoCombo/builtinCatalog.ts");
    virtualCombo = await createBuiltinAutoCombo(modelStr, channel, prepared);
  }

  const excludedConnectionIds = apiKeyId
    ? await getExcludedConnectionIds(apiKeyId, modelStr).catch(() => new Set<string>())
    : new Set<string>();

  const models: Array<{
    providerId: string;
    connectionId: string | null;
    allowedConnectionIds?: string[];
    model: string;
    freeAccessExclusion?: StrictZeroCostExclusionReason | null;
  }> = Array.isArray(virtualCombo?.models) ? virtualCombo.models : [];
  // Routing keeps one logical provider/model candidate, but the management API
  // remains account-oriented so operators can inspect and toggle each fallback.
  const accountCandidates = models.flatMap((candidate) => {
    if (candidate.connectionId) return [{ ...candidate, connectionId: candidate.connectionId }];
    return (candidate.allowedConnectionIds ?? []).map((connectionId) => ({
      ...candidate,
      connectionId,
    }));
  });

  const candidates = await Promise.all(
    accountCandidates.map(async (candidate) => {
      const decorated = await decorateCandidate({
        provider: candidate.providerId,
        connectionId: candidate.connectionId,
        model: candidate.model,
        modelStr: candidate.model,
        freeAccessExclusion: candidate.freeAccessExclusion,
      });
      return { ...decorated, excluded: excludedConnectionIds.has(candidate.connectionId) };
    })
  );

  return { channel: modelStr, candidates };
}

/** Thrown by `getAutoComboCandidates` (via `createBuiltinAutoCombo`) when the
 * channel is not a recognized built-in `auto/*` id — mapped to a 404 by the
 * route handler. */
export function isUnknownAutoChannelError(err: unknown): boolean {
  return err instanceof Error && err.message.startsWith("Unknown built-in auto combo");
}

export function buildCandidatesErrorBody(statusCode: number, message: string) {
  return buildErrorBody(statusCode, message);
}
