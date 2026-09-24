import {
  errorResponseWithComboDiagnostics,
  type ComboDiagnostics,
  type ComboRecoveryHint,
} from "../../utils/error.ts";

/**
 * Build the recovery hint that travels with a terminal combo failure. Lives
 * alongside the diagnostic payload so the OpenCode plugin (and any other
 * client) can render an actionable next-step instead of an opaque 5xx loop.
 *
 * The action verb is selected from the terminalReason the dispatcher already
 * stamps onto ComboDiagnostics so this helper stays a pure projection — no new
 * control flow, just a human-friendly next_step string per branch.
 */
export function buildRecoveryHint(
  terminalReason: string,
  retryAfterSeconds?: number
): ComboRecoveryHint {
  switch (terminalReason) {
    case "reasoning_budget_exhausted":
      return {
        action: "switch-combo",
        next_step:
          "Reasoning models consumed the output budget without emitting content. Increase max_tokens or pick a combo without a reasoning-heavy lead model.",
      };
    case "max_attempts_exceeded":
      return {
        action: "try-auto",
        next_step:
          "Every candidate in this combo failed. Switch to model: auto to let OmniRoute pick a working provider, or pick a different combo.",
      };
    case "all_accounts_inactive":
      return {
        action: "switch-combo",
        next_step:
          "No active accounts are connected for this combo. Open /dashboard/providers, reconnect at least one, then retry.",
      };
    case "quota_exhausted":
      return {
        action: "switch-combo",
        next_step:
          "Every target in this combo failed with a quota or account-balance exhaustion error. Top up the account/wallet or switch to a combo/provider with available quota — this will not recover on retry.",
      };
    case "all_models_failed":
      return {
        action: "try-auto",
        next_step:
          "Every model in this combo failed. Switch to model: auto to let OmniRoute pick a working provider, or wait a few seconds for rate limits to recover.",
        ...(typeof retryAfterSeconds === "number" && retryAfterSeconds > 0
          ? { retry_after_seconds: retryAfterSeconds }
          : {}),
      };
    case "all_targets_cooling_down":
      return {
        action: "wait",
        next_step:
          "Every target is temporarily excluded by resilience state (model lockout, circuit breaker or provider cooldown); the pool itself is configured and connected. Wait for the cooldown and retry, or switch combo.",
        ...(typeof retryAfterSeconds === "number" && retryAfterSeconds > 0
          ? { retry_after_seconds: retryAfterSeconds }
          : {}),
      };
    case "no_executable_targets":
      return {
        action: "switch-combo",
        next_step:
          "This combo has no executable targets in the current account pool. Pick a different combo or reconnect the missing providers.",
      };
    case "context_requirements_exhausted":
      return {
        action: "switch-combo",
        next_step:
          "Strict context requirements removed every target (known context windows are below minContextWindow). Lower minContextWindow, switch contextFilterMode to lenient, or add larger-context models.",
      };
    case "all_targets_skipped":
      return {
        action: "switch-combo",
        next_step:
          "Every target was skipped before dispatch (capability pre-filter narrowed the pool and the remaining targets were all quota-exhausted/unavailable). Check the provider's quota in /dashboard/providers, reconnect or top up the account, or switch to a combo/model that has a healthy capability-matching target.",
      };
    default:
      return {
        action: "retry",
        next_step:
          "The combo failed transiently. Retry the same combo, or switch to model: auto if the failure repeats.",
      };
  }
}

/**
 * Diagnostics payload for the rare "combo routing completed without an
 * upstream response" fallback — the dispatcher never crystallized a terminal
 * status. Kept minimal (matches the original inline literal — no `recovery`
 * field) so this extraction is a pure move, not a behavior change.
 */
export function buildNoUpstreamResponseDiagnostics(poolSize: number): ComboDiagnostics {
  return {
    poolSize,
    attempted: 0,
    excluded: [],
    attemptOrder: [],
    terminalReason: "no_upstream_response",
  };
}

/**
 * #8786: empty-pool payload after `applyContextRequirements`. When the
 * pre-filter pool was non-empty, surface `context_requirements_exhausted`
 * (with excluded targets) instead of a generic `no_executable_targets` 404.
 * Lives here so combo.ts / targetResolution stay under the file-size freeze.
 */
export function buildEmptyComboTargetsPayload(
  preContextTargets: ReadonlyArray<{ provider: string; modelStr: string }>,
  minContextWindow?: number
): { message: string; diagnostics: ComboDiagnostics } {
  if (preContextTargets.length > 0) {
    const minCtxLabel =
      typeof minContextWindow === "number" && minContextWindow > 0
        ? ` (minContextWindow: ${minContextWindow})`
        : "";
    return {
      message: `Combo has no executable targets after context requirements filtering${minCtxLabel}`,
      diagnostics: {
        poolSize: preContextTargets.length,
        attempted: 0,
        excluded: preContextTargets.map((t) => ({
          provider: t.provider,
          model: t.modelStr,
          reason: "context_requirements",
        })),
        attemptOrder: [],
        terminalReason: "context_requirements_exhausted",
        recovery: buildRecoveryHint("context_requirements_exhausted"),
      },
    };
  }
  return {
    message: "Combo has no executable targets",
    diagnostics: {
      poolSize: 0,
      attempted: 0,
      excluded: [],
      attemptOrder: [],
      terminalReason: "no_executable_targets",
      recovery: buildRecoveryHint("no_executable_targets"),
    },
  };
}

/** Which weighted-selection gate dropped a target before dispatch. */
export type PreDispatchExclusionReason =
  "circuit_open" | "provider_cooldown" | "model_lockout" | "free_tier_drained" | "unavailable";

export interface PreDispatchExclusion {
  provider: string;
  /** Bare model id (no provider prefix) — the diagnostics header joins provider/model. */
  model: string;
  reason: PreDispatchExclusionReason;
  /** Remaining exclusion time when the gate knows it (resilience gates), else null. */
  retryAfterMs: number | null;
}

/**
 * Gates whose exclusion is a timer on a configured, connected target — the pool
 * is intact, it is just cooling down. `unavailable` (the host's account probe)
 * and `free_tier_drained` are not timers the combo layer can vouch for.
 */
const TEMPORARY_EXCLUSION_REASONS: ReadonlySet<PreDispatchExclusionReason> = new Set([
  "circuit_open",
  "provider_cooldown",
  "model_lockout",
]);

/** One-line operator summary: `openai/a: model_lockout (57s), claude/b: circuit_open`. */
export function formatPreDispatchExclusions(exclusions: readonly PreDispatchExclusion[]): string {
  return exclusions
    .map((e) => {
      const wait =
        typeof e.retryAfterMs === "number" && e.retryAfterMs > 0
          ? ` (${Math.ceil(e.retryAfterMs / 1000)}s)`
          : "";
      return `${e.provider}/${e.model}: ${e.reason}${wait}`;
    })
    .join(", ");
}

/**
 * The weighted strategy filters targets before dispatch (breaker, provider
 * cooldown, model lockout, availability probe). When that leaves nothing, the
 * host used to answer 404 `no_executable_targets` — "switch combo / reconnect
 * the missing providers" — for a pool that is configured, connected and merely
 * cooling down, and clients such as Claude Code render a 404 as "this model may
 * not exist". When at least one target was excluded by a resilience timer this
 * builds the 503 the in-loop skip path already uses, with `Retry-After` set to
 * the earliest exclusion to lapse and every excluded target in the diagnostics.
 * Returns null when no resilience gate was involved (caller keeps its 404).
 */
export function buildAllTargetsCoolingDownResponse(
  exclusions: readonly PreDispatchExclusion[]
): Response | null {
  const cooling = exclusions.filter((e) => TEMPORARY_EXCLUSION_REASONS.has(e.reason));
  if (cooling.length === 0) return null;
  const known = cooling
    .map((e) => e.retryAfterMs)
    .filter((ms): ms is number => typeof ms === "number" && ms > 0);
  const retryAfterSeconds =
    known.length > 0 ? Math.max(1, Math.ceil(Math.min(...known) / 1000)) : undefined;
  const response = errorResponseWithComboDiagnostics(
    503,
    "Service temporarily unavailable: every target in this combo is cooling down (model lockout, circuit breaker or provider cooldown)",
    {
      poolSize: exclusions.length,
      attempted: 0,
      excluded: exclusions.map(({ provider, model, reason }) => ({ provider, model, reason })),
      attemptOrder: [],
      terminalReason: "all_targets_cooling_down",
      recovery: buildRecoveryHint("all_targets_cooling_down", retryAfterSeconds),
    },
    { code: "all_targets_cooling_down", type: "service_unavailable" }
  );
  if (retryAfterSeconds !== undefined) {
    response.headers.set("Retry-After", String(retryAfterSeconds));
  }
  return response;
}
