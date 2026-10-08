/**
 * Combo pre-dispatch API-key model policy (#9057 / #12886).
 *
 * Policy already admitted the requested combo. Per-target
 * `isModelAllowedForKey` must not then skip every member just because the
 * allow-list is the combo name. auto/* / disableNonPublic still check the
 * inner target so #9057 holds.
 */

import { isModelBlockedByPatterns } from "@/lib/db/apiKeys";
import { isComboNameAllowedForKey } from "@/shared/utils/apiKeyPolicy";
import { hasApiKeyModelRestrictions } from "@/shared/utils/resolvedModelAccess";

export type ComboTargetKeyPolicyInfo = {
  allowedModels?: string[] | null;
  blockedModels?: string[] | null;
  disableNonPublicModels?: boolean | null;
  modelAccessMode?: string | null;
  allowedCombos?: string[] | null;
};

export type ComboTargetKeyPolicyOptions = {
  apiKey: string | null | undefined;
  apiKeyInfo: ComboTargetKeyPolicyInfo | null | undefined;
  requestedModelStr: string;
  targetModelStr: string;
  isModelAllowedForKey: (key: string, model: string) => Promise<boolean>;
};

export type ComboTargetPreflightDecision = "deny" | "check-availability" | "bypass-availability";

function modelMatchesAllowPattern(pattern: string, model: string): boolean {
  if (pattern.endsWith("/*")) return model.startsWith(pattern.slice(0, -1));
  return pattern === model;
}

function allowListCoversRequestedCombo(
  allowedModels: string[] | null | undefined,
  requestedModelStr: string
): boolean {
  if (!allowedModels?.length || !requestedModelStr) return false;
  return allowedModels.some((pattern) => modelMatchesAllowPattern(pattern, requestedModelStr));
}

/**
 * A stored (non-`auto/*`) combo named in the key's `allowedCombos` grants its
 * own targets (#14197). `auto/*` combos keep per-candidate model checks (#9057).
 */
export function isExplicitlyAllowedComboForKey(
  apiKeyInfo: ComboTargetKeyPolicyInfo | null | undefined,
  requestedModelStr: string | null | undefined
): boolean {
  if (!apiKeyInfo || !requestedModelStr) return false;
  return (
    !requestedModelStr.startsWith("auto/") &&
    Array.isArray(apiKeyInfo.allowedCombos) &&
    isComboNameAllowedForKey(apiKeyInfo.allowedCombos, requestedModelStr)
  );
}

export async function comboTargetPassesKeyModelPolicy(
  opts: ComboTargetKeyPolicyOptions
): Promise<boolean> {
  const { apiKey, apiKeyInfo, requestedModelStr, targetModelStr, isModelAllowedForKey } = opts;
  if (!apiKey || !apiKeyInfo) return true;

  if (!hasApiKeyModelRestrictions(apiKeyInfo)) return true;

  if (isExplicitlyAllowedComboForKey(apiKeyInfo, requestedModelStr)) return true;

  if (await isModelBlockedByPatterns(apiKeyInfo.blockedModels, targetModelStr)) return false;

  if (allowListCoversRequestedCombo(apiKeyInfo.allowedModels, requestedModelStr)) {
    return true;
  }

  return isModelAllowedForKey(apiKey, targetModelStr);
}

/**
 * A combo live test may skip availability probes only after target authorization.
 * The client marker can never convert a denied model into an authorized target.
 */
export async function evaluateComboTargetPreflight(
  opts: ComboTargetKeyPolicyOptions & { isComboLiveTest: boolean }
): Promise<ComboTargetPreflightDecision> {
  if (!(await comboTargetPassesKeyModelPolicy(opts))) return "deny";
  return opts.isComboLiveTest ? "bypass-availability" : "check-availability";
}
