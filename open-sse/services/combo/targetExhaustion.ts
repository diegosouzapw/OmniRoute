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
import {
  classifyErrorText,
  hasPerModelQuota,
  isProviderExhaustedReason,
} from "../accountFallback.ts";
import { RateLimitReason } from "../../config/constants.ts";
import { isProviderCircuitOpenResult, isRequestScopedUpstreamFailure } from "./comboPredicates.ts";
import type { ComboLogger, ResolvedComboTarget } from "./types.ts";

// Connection-level failure statuses: the provider connection itself is likely bad (upstream
// unreachable, proxy/gateway error), so remaining same-connection targets are skipped.
const CONNECTION_LEVEL_ERROR_STATUSES = [408, 500, 502, 503, 504, 524];

// Auth-level failure statuses: the provider's credentials are invalid/expired (401) or
// forbidden (403). When the failing target carries a connectionId, only that connection's
// credentials are bad — sibling connections on the same provider may still be healthy, so
// mark connection-level exhaustion (mirrors markConnectionLevelExhaustion). Only fall back to
// whole-provider exhaustion when no connectionId is available (#8133: combo engine wastes
// attempts on dead connections; #8137: whole-provider exhaustion wrongly skipped healthy
// sibling connections on the same provider).
const AUTH_LEVEL_ERROR_STATUSES = [401, 403];

// #5085: an "empty content" 502 is the synthetic status chatCore assigns to a provider that
// answered HTTP 200 with no usable completion (isEmptyContentResponse). The connection is
// HEALTHY — it just returned an empty body — so this must NOT be classified as a connection
// failure (which would exhaust the whole provider/connection and skip every remaining
// same-provider leg via #1731v2). It is a model-level transient failure: advance to the next
// leg, leaving the rest of that provider's legs eligible.
function isEmptyContentFailure(status: number, errorText: string): boolean {
  return status === 502 && /empty content/i.test(errorText);
}

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
  /** Structured error object from upstream response — preferred over raw errorText for classification */
  structuredError?: { code?: string; type?: string; message?: string };
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
  const { result, sets, log, tag } = opts;
  const provider = target.provider;

  // #8133/#8137: auth-level failures (401/403) mean that connection's credentials are bad.
  // Split out to keep applyComboTargetExhaustion under the complexity ceiling.
  if (AUTH_LEVEL_ERROR_STATUSES.includes(result.status) && provider && provider !== "unknown") {
    markAuthLevelExhaustion(target, { result, sets, log, tag });
    return true;
  }

  // #1731: full provider quota exhausted → skip remaining same-provider targets this request.
  const providerExhausted = isProviderQuotaExhausted(provider, opts);
  if (providerExhausted) {
    markProviderQuotaExhaustion(provider as string, opts);
  } else {
    markTransientOrConnectionLevel(target, opts);
  }

  return providerExhausted;
}

/**
 * #1731: full-provider quota-exhaustion classification, split out of applyComboTargetExhaustion
 * to keep it under the complexity ceiling. Passthrough/per-model-quota providers multiplex
 * models behind one connection, so a quota 429 for one model must NOT skip fallback targets for
 * another model on the same provider.
 */
function isProviderQuotaExhausted(
  provider: string | null | undefined,
  opts: Pick<
    ApplyComboTargetExhaustionOptions,
    "rawModel" | "fallbackResult" | "structuredError" | "errorText" | "allAccountsRateLimited"
  >
): boolean {
  const { rawModel, fallbackResult, structuredError, errorText, allAccountsRateLimited } = opts;
  return (
    Boolean(provider && provider !== "unknown") &&
    !hasPerModelQuota(provider as string, rawModel) &&
    (isProviderExhaustedReason(fallbackResult) ||
      classifyErrorText(structuredError?.code || errorText) === RateLimitReason.QUOTA_EXHAUSTED ||
      allAccountsRateLimited)
  );
}

function markProviderQuotaExhaustion(
  provider: string,
  opts: Pick<ApplyComboTargetExhaustionOptions, "sets" | "log" | "tag" | "exhaustedLogLevel">
): void {
  const { sets, log, tag, exhaustedLogLevel } = opts;
  sets.exhaustedProviders.add(provider);
  const emit = exhaustedLogLevel === "debug" ? log.debug : log.info;
  emit?.(tag, `Provider ${provider} quota exhausted — marking for skip on remaining targets (#1731)`);
}

/**
 * Not-quota-exhausted path: track transient 429 rate-limiting, then delegate to the
 * connection-level (408/5xx) classification. Split out of applyComboTargetExhaustion to keep
 * it under the complexity ceiling.
 */
function markTransientOrConnectionLevel(
  target: ResolvedComboTarget,
  opts: ApplyComboTargetExhaustionOptions
): void {
  const { result, errorText, rawModel, isTokenLimitBreach, sets, log, tag, structuredError } =
    opts;
  const provider = target.provider;
  if (result.status === 429 && !isTokenLimitBreach && provider && provider !== "unknown") {
    sets.transientRateLimitedProviders.add(provider);
  }
  markConnectionLevelExhaustion(target, { result, errorText, sets, log, tag, rawModel, structuredError });
}

/**
 * #8133/#8137: mark an auth-level (401/403) failure. When the target carries a connectionId,
 * only that connection's credentials are bad — sibling connections on the same provider may
 * still be healthy, so mark connection-level exhaustion (mirrors markConnectionLevelExhaustion).
 * Falls back to whole-provider exhaustion only when no connectionId is available, since every
 * model behind an unscoped provider will fail identically.
 */
function markAuthLevelExhaustion(
  target: ResolvedComboTarget,
  opts: Pick<ApplyComboTargetExhaustionOptions, "result" | "sets" | "log" | "tag">
): void {
  const { result, sets, log, tag } = opts;
  const provider = target.provider;
  const connId = target.connectionId ?? undefined;
  if (connId) {
    sets.exhaustedConnections.add(`${provider}:${connId}`);
    log.info(
      tag,
      `Provider ${provider} connection ${connId} auth failure (${result.status}) — marking for skip on remaining targets (#8133)`
    );
  } else {
    sets.exhaustedProviders.add(provider);
    log.info(
      tag,
      `Provider ${provider} auth failure (${result.status}) — marking for skip on remaining targets (#8133)`
    );
  }
}

/**
 * #1731v2: connection-level errors (408/5xx, excluding the OmniRoute circuit-open signal) suggest
 * the provider connection itself is bad → skip remaining same-connection (or same-provider, when
 * no connectionId) targets this request. Only runs when the provider was NOT already marked fully
 * exhausted above. Split out to keep applyComboTargetExhaustion under the complexity ceiling.
 */
function markConnectionLevelExhaustion(
  target: ResolvedComboTarget,
  opts: Pick<
    ApplyComboTargetExhaustionOptions,
    "result" | "errorText" | "sets" | "log" | "tag" | "rawModel" | "structuredError"
  >
): void {
  const { result, errorText, sets, log, tag, rawModel, structuredError } = opts;
  const provider = target.provider;
  if (
    !provider ||
    provider === "unknown" ||
    !CONNECTION_LEVEL_ERROR_STATUSES.includes(result.status) ||
    isProviderCircuitOpenResult(result, errorText) ||
    isRequestScopedUpstreamFailure(structuredError) ||
    // #5085: empty-content 502 is a healthy connection returning no body — model-level, not
    // connection-level. Don't exhaust the provider; let the remaining legs (incl. same-provider)
    // be tried in-request.
    isEmptyContentFailure(result.status, errorText) ||
    // Per-model-quota providers (gemini, github, passthrough, compatible) multiplex models
    // behind one connection. A model-level 500 (e.g. Gemini "Internal error encountered")
    // must NOT exhaust the connection — other models on the same connection may still succeed.
    // Other connection-level statuses (408/502/503/504/524) indicate the connection itself is
    // bad, so they correctly exhaust even for per-model-quota providers.
    (result.status === 500 && hasPerModelQuota(provider, rawModel))
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
