import type { ComboDiagnostics, ComboRecoveryHint } from "../../utils/error.ts";

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
    case "all_models_failed":
      return {
        action: "try-auto",
        next_step:
          "Every model in this combo failed. Switch to model: auto to let OmniRoute pick a working provider, or wait a few seconds for rate limits to recover.",
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
