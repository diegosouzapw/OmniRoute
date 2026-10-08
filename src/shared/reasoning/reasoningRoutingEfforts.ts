import { codexModelFamilySupportsExtendedEffort } from "./codexExtendedEffort";

export const STANDARD_REASONING_EFFORTS = ["none", "low", "medium", "high", "xhigh"] as const;
export const EXTENDED_REASONING_EFFORTS = ["max", "ultra"] as const;

type ExtendedReasoningEffort = (typeof EXTENDED_REASONING_EFFORTS)[number];

/**
 * The rules editor accepts provider-prefixed ids (`codex/`, `cx/`, `openai/` #14961, and
 * `github/`, `opencode-zen/`… #14059); the alias-set lookup shared with the Codex executor
 * (#14720) matches bare ids, so strip any single provider namespace here — the same way the
 * routing policy resolves `modelIdForRegistry`.
 */
export function supportsExtendedCodexEffort(
  model: string,
  effort: ExtendedReasoningEffort
): boolean {
  return codexModelFamilySupportsExtendedEffort(model.trim().replace(/^[^/]+\//, ""), effort);
}

export function getReasoningRoutingTargetEffortOptions(
  model: string,
  currentTargetEffort: string
): string[] {
  return [
    ...STANDARD_REASONING_EFFORTS,
    ...EXTENDED_REASONING_EFFORTS.filter(
      (effort) => supportsExtendedCodexEffort(model, effort) || currentTargetEffort === effort
    ),
  ];
}
