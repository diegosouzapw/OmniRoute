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
import {
  isAlibabaFreeQuotaExhaustedError,
  isAlibabaModelStudioProvider,
} from "../alibabaFreeTier.ts";
import { RateLimitReason } from "../../config/constants.ts";
import { isProviderCircuitOpenResult, isRequestScopedUpstreamFailure } from "./comboPredicates.ts";
import { isCloudflareFingerprintRejection } from "../errorClassifier.ts";
// #10334 — agentrouter-exclusive predicate shared with the persistence layer
// (markAccountUnavailable) so the same-request combo skip and the persisted
// connection cooldown agree on exactly which fallbackResult shapes qualify.
import { isAgentrouterConnectionQuotaScope } from "@/sse/services/auth";
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
  return status === 502 && (/empty content/i.test(errorText) || /empty response/i.test(errorText));
}

/** #12441 — quota/credits bodies must not take the 401/403 auth-skip path. */
export function isQuotaOrCreditsError(
  errorText: string,
  structuredError?: { code?: string; type?: string; message?: string }
): boolean {
  const blobs = [
    errorText,
    structuredError?.type,
    structuredError?.message,
    structuredError?.code,
  ].filter((value): value is string => Boolean(value));
  const joined = blobs.join(" ");
  if (/credits exhausted/i.test(joined)) return true;
  if (/quota exhausted/i.test(joined) && !/authentication expired/i.test(joined)) return true;
  // Classify each candidate independently. A non-quota structuredError.code must
  // not hide quota wording in errorText or structuredError.message.
  return blobs.some((blob) => classifyErrorText(blob) === RateLimitReason.QUOTA_EXHAUSTED);
}

export type ComboExhaustionSets = {
  exhaustedProviders: Set<string>;
  exhaustedConnections: Set<string>;
  transientRateLimitedProviders: Set<string>;
};

export type ApplyComboTargetExhaustionOptions = {
  result: { status: number; headers?: Headers | null };
  fallbackResult: Parameters<typeof isProviderExhaustedReason>[0] & {
    /** #10334 — agentrouter-exclusive; see isAgentrouterConnectionQuotaScope
     * (src/sse/services/auth.ts). Populated only for providers in
     * HONORS_RULE_LOCK_SCOPE_PROVIDERS (today: agentrouter only). */
    ruleScope?: "model" | "provider" | "connection";
    permanent?: boolean;
  };
  errorText: string;
  rawModel: string;
  isTokenLimitBreach: boolean;
  allAccountsRateLimited: boolean;
  requestScopedFailure: boolean;
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
  const { result, sets, log, tag, errorText, structuredError } = opts;
  const provider = target.provider;

  // #10334: agentrouter-exclusive account-wide quota exhaustion ("额度不足")
  // must skip remaining SAME-CONNECTION targets within THIS request too, not
  // just via the persisted cooldown markAccountUnavailable applies for
  // whichever leg runs next. agentrouter is a passthroughModels provider
  // (hasPerModelQuota() === true), so without this branch the classification
  // below would fall straight through isProviderQuotaExhausted's
  // !hasPerModelQuota() guard, and — for the restated-429 case —
  // markConnectionLevelExhaustion's connection-level guard (429 is not in
  // CONNECTION_LEVEL_ERROR_STATUSES), marking nothing: combo would keep
  // burning one upstream call per remaining model of the same exhausted
  // account. isAgentrouterConnectionQuotaScope is the same guard
  // markAccountUnavailable uses, so both consumers agree on exactly which
  // fallbackResult shapes qualify (never a permanent/credits-exhausted
  // result, even one carrying ruleScope "connection").
  //
  // Runs BEFORE the auth-level (401/403) branch below. This is deliberate,
  // not incidental: the "额度不足" rule matches statuses {400, 403, 429}
  // (buildAgentrouterRules, providerErrorRules.ts), and Task 1's FORBIDDEN
  // pre-check (accountFallback.ts ~1729-1751) surfaces `ruleScope:
  // "connection"` for a RAW 403 carrying that body too — so this branch can
  // also fire on a 403, not just the restated 429. That is safe: for a 403
  // this branch and markAuthLevelExhaustion below write the SAME set with
  // the SAME `${provider}:${connId}` key and both return `true` — they are
  // set-equivalent for agentrouter on that status. The Cloudflare-1010 and
  // Alibaba free-tier EXEMPTIONS further down in the 401/403 branch cannot
  // apply here regardless of ordering: 1010 is a CDN fingerprint rejection
  // agentrouter's own text never carries, and the Alibaba exemption is
  // gated on isAlibabaModelStudioProvider(provider), which agentrouter is
  // not.
  //
  // Unlike the connection-level/auth-level branches, this path deliberately
  // does NOT fall through to markTransientOrConnectionLevel, so
  // sets.transientRateLimitedProviders is NEVER populated for this failure.
  // That is required, not just incidental: combo.ts (both dispatchers, see
  // the `allowRateLimitedConnection` reads keyed off
  // transientRateLimitedProviders) uses that set to force-allow reusing a
  // rate-limited CONNECTION for the provider's remaining legs — i.e. it
  // bypasses the very `rateLimitedUntil` filter this branch (and Task 2's
  // markAccountUnavailable) just set. Marking it here would silently
  // re-open the account this branch just cooled down. One secondary
  // consequence: a SIBLING agentrouter connection that is merely
  // rate-limited (not the one this branch exhausted) will also no longer be
  // force-allowed for a later leg on the same provider — a remaining leg
  // can now resolve to "no credentials available" instead of retrying a
  // rate-limited sibling account, which is the intended, safer outcome.
  if (isAgentrouterConnectionQuotaScope(provider, opts.fallbackResult)) {
    markAgentrouterConnectionQuotaExhaustion(target, { sets, log, tag });
    return true;
  }

  // #8133/#8137: auth-level failures (401/403) mean that connection's credentials are bad.
  // Split out to keep applyComboTargetExhaustion under the complexity ceiling.
  // Cloudflare 1010 (a 403 carrying error_code 1010 / browser_signature_banned) is NOT an
  // auth failure: the CDN in front of the upstream refused the client's TLS/UA signature,
  // and a different client on the same key succeeds. Treating it as auth-level would mark
  // every connection in the pool exhausted on the first 1010 and, with a multi-target combo,
  // crystallize a misleading ALL_ACCOUNTS_INACTIVE after two such calls — see
  // errorClassifier.isCloudflareFingerprintRejection. The signal may arrive via the
  // upstream JSON's structuredError.message (nested "error_code":1010 / browser_signature_banned)
  // when the raw errorText is generic, so inspect both. A normalized structuredError.code/type
  // ("1010" / browser_signature_banned / fingerprint_rejection) is matched directly — it arrives
  // without the error_code key that the text regex keys on. The comparison is case-insensitive
  // (matching isCloudflareFingerprintRejection's lowercase) and exact: a numeric 10101
  // (port/count/request id) is a different token, never a 1010.
  const fingerprintToken = [structuredError?.code, structuredError?.type].some((value) =>
    ["1010", "browser_signature_banned", "fingerprint_rejection"].includes(
      value == null ? "" : String(value).toLowerCase()
    )
  );
  // code/type can also carry the signal in a non-normalized form (e.g. a gateway stuffing
  // "error_code: 1010" into the code field verbatim), so the shared text matcher sees every
  // candidate string — the exact allowlist above is not the only path in.
  const fingerprintText = isCloudflareFingerprintRejection(
    [structuredError?.message, structuredError?.code, structuredError?.type, errorText]
      .filter(Boolean)
      .join(" ")
  );
  const quotaMisclassifiedAsAuth = isQuotaOrCreditsError(errorText, structuredError);
  if (
    AUTH_LEVEL_ERROR_STATUSES.includes(result.status) &&
    // Cloudflare 1010 is a 403-ONLY fingerprint rejection. A 401 that merely happens to
    // mention "1010" or "fingerprint_rejection" in a port/count/model token must NOT skip
    // auth-level exhaustion — only a 403 carrying the Cloudflare fingerprint signal does.
    !(result.status === 403 && (fingerprintToken || fingerprintText)) &&
    !quotaMisclassifiedAsAuth &&
    provider &&
    provider !== "unknown"
  ) {
    // Alibaba free-tier drain is model-scoped — the connection and sibling models stay eligible.
    if (
      result.status === 403 &&
      isAlibabaModelStudioProvider(provider) &&
      isAlibabaFreeQuotaExhaustedError(opts.errorText)
    ) {
      return false;
    }
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
    | "rawModel"
    | "fallbackResult"
    | "structuredError"
    | "errorText"
    | "allAccountsRateLimited"
    | "requestScopedFailure"
  >
): boolean {
  const {
    rawModel,
    fallbackResult,
    structuredError,
    errorText,
    allAccountsRateLimited,
    requestScopedFailure,
  } = opts;
  return (
    Boolean(provider && provider !== "unknown") &&
    !(requestScopedFailure || isRequestScopedUpstreamFailure(structuredError)) &&
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
  emit?.(
    tag,
    `Provider ${provider} quota exhausted — marking for skip on remaining targets (#1731)`
  );
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
  const {
    result,
    errorText,
    rawModel,
    isTokenLimitBreach,
    requestScopedFailure,
    sets,
    log,
    tag,
    structuredError,
  } = opts;
  const provider = target.provider;
  if (result.status === 429 && !isTokenLimitBreach && provider && provider !== "unknown") {
    sets.transientRateLimitedProviders.add(provider);
  }
  markConnectionLevelExhaustion(target, {
    result,
    errorText,
    sets,
    log,
    tag,
    rawModel,
    requestScopedFailure,
    structuredError,
  });
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
 * #10334: agentrouter-exclusive connection-scope account quota exhaustion. Mirrors
 * markAuthLevelExhaustion's connectionId-present/absent split — when the target carries a
 * connectionId, only that connection's account is exhausted (sibling agentrouter connections
 * for the same user may still have quota); fall back to whole-provider exhaustion only when no
 * connectionId is available.
 */
function markAgentrouterConnectionQuotaExhaustion(
  target: ResolvedComboTarget,
  opts: Pick<ApplyComboTargetExhaustionOptions, "sets" | "log" | "tag">
): void {
  const { sets, log, tag } = opts;
  const provider = target.provider;
  const connId = target.connectionId ?? undefined;
  if (connId) {
    sets.exhaustedConnections.add(`${provider}:${connId}`);
    log.info(
      tag,
      `Provider ${provider} connection ${connId} account quota exhausted (rule scope=connection) — marking for skip on remaining targets (#10334)`
    );
  } else {
    sets.exhaustedProviders.add(provider as string);
    log.info(
      tag,
      `Provider ${provider} account quota exhausted (rule scope=connection, no connectionId) — marking for skip on remaining targets (#10334)`
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
    | "result"
    | "errorText"
    | "sets"
    | "log"
    | "tag"
    | "rawModel"
    | "requestScopedFailure"
    | "structuredError"
  >
): void {
  const { result, errorText, sets, log, tag, rawModel, requestScopedFailure, structuredError } =
    opts;
  const provider = target.provider;
  if (
    !provider ||
    provider === "unknown" ||
    !CONNECTION_LEVEL_ERROR_STATUSES.includes(result.status) ||
    isProviderCircuitOpenResult(result, errorText) ||
    requestScopedFailure ||
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
