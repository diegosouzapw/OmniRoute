/**
 * Shared upstream-error → exhaustion-set classification for the combo dispatchers
 * (Quality Gate v2 / Fase 9 — combo god-file decomposition, dispatcher de-dup fase 2b).
 *
 * Both dispatchers (handleComboChat's speculative loop + handleRoundRobinCombo's rotation)
 * ran a near-identical block after each target's upstream error: mark the provider fully
 * exhausted (#1731), the provider:connection pair connection-errored (#1731v2), or the
 * provider transiently rate-limited — driving same-request target skipping (read back by
 * getExhaustedTargetSkipReason). The SET mutations are byte-identical to the previous inline
 * code in BOTH dispatchers; the only differences (preserved here as parameters) were:
 *   - the log tag ("COMBO" / "COMBO-RR");
 *   - the round-robin's extra `|| isAllAccountsRateLimited` term in the exhaustion test
 *     (`allAccountsRateLimited`, false for handleComboChat);
 *   - the quota-exhausted log LEVEL ("info" for handleComboChat, "debug" for round-robin).
 * The only standardization is the log MESSAGE wording (round-robin previously dropped the
 * "on remaining targets" suffix) — diagnostic text only, same #code + provider info.
 */
import { classifyErrorText, hasPerModelQuota, isProviderExhaustedReason } from "../accountFallback.ts";
import { RateLimitReason } from "../../config/constants.ts";
import { isProviderCircuitOpenResult } from "./comboPredicates.ts";
import type { ComboLogger, ResolvedComboTarget } from "./types.ts";

// Connection-level failure statuses: the provider connection itself is likely bad (upstream
// unreachable, proxy/gateway error), so remaining same-connection targets are skipped.
const CONNECTION_LEVEL_ERROR_STATUSES = [408, 500, 502, 503, 504, 524];

export type ComboExhaustionSets = {
  exhaustedProviders: Set<string>;
  exhaustedConnections: Set<string>;
  transientRateLimitedProviders: Set<string>;
};

export type ApplyComboTargetExhaustionOptions = {
  result: { status: number; headers?: Headers | null };
  fallbackResult: Parameters<typeof isProviderExhaustedReason>[0];
  errorText: string;
  rawModel: string;
  isTokenLimitBreach: boolean;
  allAccountsRateLimited: boolean;
  sets: ComboExhaustionSets;
  log: ComboLogger;
  tag: string;
  exhaustedLogLevel: "info" | "debug";
};

/**
 * Update the per-request exhaustion sets from a target's upstream error.
 * @returns providerExhausted — callers gate the connection-level branch and the same-provider
 *          retry decision on this (was a `const providerExhausted` local in both dispatchers).
 */
export function applyComboTargetExhaustion(
  target: ResolvedComboTarget,
  opts: ApplyComboTargetExhaustionOptions
): boolean {
  const {
    result,
    fallbackResult,
    errorText,
    rawModel,
    isTokenLimitBreach,
    allAccountsRateLimited,
    sets,
    log,
    tag,
    exhaustedLogLevel,
  } = opts;
  const { exhaustedProviders, exhaustedConnections, transientRateLimitedProviders } = sets;
  const provider = target.provider;

  // #1731: full provider quota exhausted → skip remaining same-provider targets this request.
  // Passthrough/per-model-quota providers multiplex models behind one connection, so a quota
  // 429 for one model must NOT skip fallback targets for another model on the same provider.
  const providerExhausted =
    Boolean(provider && provider !== "unknown") &&
    !hasPerModelQuota(provider, rawModel) &&
    (isProviderExhaustedReason(fallbackResult) ||
      classifyErrorText(errorText) === RateLimitReason.QUOTA_EXHAUSTED ||
      allAccountsRateLimited);
  if (providerExhausted) {
    exhaustedProviders.add(provider);
    const emit = exhaustedLogLevel === "debug" ? log.debug : log.info;
    emit?.(tag, `Provider ${provider} quota exhausted — marking for skip on remaining targets (#1731)`);
  } else {
    if (result.status === 429 && !isTokenLimitBreach && provider && provider !== "unknown") {
      transientRateLimitedProviders.add(provider);
    }
    markConnectionLevelExhaustion(target, { result, errorText, sets, log, tag });
  }

  return providerExhausted;
}

/**
 * #1731v2: connection-level errors (408/5xx, excluding the OmniRoute circuit-open signal) suggest
 * the provider connection itself is bad → skip remaining same-connection (or same-provider, when
 * no connectionId) targets this request. Only runs when the provider was NOT already marked fully
 * exhausted above. Split out to keep applyComboTargetExhaustion under the complexity ceiling.
 */
function markConnectionLevelExhaustion(
  target: ResolvedComboTarget,
  opts: Pick<ApplyComboTargetExhaustionOptions, "result" | "errorText" | "sets" | "log" | "tag">
): void {
  const { result, errorText, sets, log, tag } = opts;
  const provider = target.provider;
  if (
    !provider ||
    provider === "unknown" ||
    !CONNECTION_LEVEL_ERROR_STATUSES.includes(result.status) ||
    isProviderCircuitOpenResult(result, errorText)
  ) {
    return;
  }
  const connId = target.connectionId ?? undefined;
  if (connId) {
    sets.exhaustedConnections.add(`${provider}:${connId}`);
    log.info(
      tag,
      `Provider ${provider} connection ${connId} error (${result.status}) — marking for skip on remaining targets (#1731v2)`
    );
  } else {
    sets.exhaustedProviders.add(provider);
    log.info(
      tag,
      `Provider ${provider} connection error (${result.status}) — marking for skip on remaining targets (#1731)`
    );
  }
}
