/**
 * #7819 (Level 1) — read-only candidate pool + reachability listing for an
 * `auto/*` channel.
 *
 * Builds the SAME candidate pool `virtualFactory.createVirtualAutoCombo` uses
 * for routing (via `createBuiltinAutoCombo`, unfiltered by any per-key
 * exclusion so the operator can see — and toggle — excluded candidates), then
 * decorates each candidate with live reachability derived from the existing
 * resilience reads (CLAUDE.md "Resilience Runtime State"):
 *   - provider circuit breaker: `getCircuitBreaker(provider).getStatus()` /
 *     `.canExecute()` — NEVER raw `state`, so an expired breaker (lazy
 *     recovery) doesn't show as permanently open.
 *   - connection cooldown: `rateLimitedUntil` / `testStatus` on the resolved
 *     provider_connections row (no-auth synthetic connections have no row —
 *     treated as always reachable on this axis).
 *   - model lockout: `isModelLocked(provider, connectionId, model)`.
 */
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { getCircuitBreaker } from "@/shared/utils/circuitBreaker";
import { isModelLocked } from "@omniroute/open-sse/services/accountFallback.ts";
import { getProviderConnectionById } from "@/lib/db/providers";
import { getExcludedConnectionIds } from "@/lib/db/autoCandidateOverrides";

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

  const modelLocked = isModelLocked(candidate.provider, candidate.connectionId, candidate.model);

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
  let virtualCombo;
  if (channel === "auto") {
    const { createVirtualAutoCombo } =
      await import("@omniroute/open-sse/services/autoCombo/virtualFactory.ts");
    virtualCombo = await createVirtualAutoCombo(undefined);
  } else {
    const { createBuiltinAutoCombo } =
      await import("@omniroute/open-sse/services/autoCombo/builtinCatalog.ts");
    virtualCombo = await createBuiltinAutoCombo(modelStr, channel);
  }

  const excludedConnectionIds = apiKeyId
    ? await getExcludedConnectionIds(apiKeyId, modelStr).catch(() => new Set<string>())
    : new Set<string>();

  const models: Array<{
    providerId: string;
    connectionId: string | null;
    allowedConnectionIds?: string[];
    model: string;
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
