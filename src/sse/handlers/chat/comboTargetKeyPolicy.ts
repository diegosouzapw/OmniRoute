/**
 * Combo pre-dispatch API-key model policy (#9057 / #12886).
 *
 * Policy already admitted the requested combo. Per-target
 * `isModelAllowedForKey` must not then skip every member just because the
 * allow-list is the combo name. auto/* / disableNonPublic still check the
 * inner target so #9057 holds.
 */

export type ComboTargetKeyPolicyInfo = {
  allowedModels?: string[] | null;
  disableNonPublicModels?: boolean | null;
  modelAccessMode?: string | null;
};

export type ComboTargetKeyPolicyOptions = {
  apiKey: string | null | undefined;
  apiKeyInfo: ComboTargetKeyPolicyInfo | null | undefined;
  requestedModelStr: string;
  targetModelStr: string;
  isModelAllowedForKey: (key: string, model: string) => Promise<boolean>;
};

export type ComboTargetPreflightDecision =
  | "deny"
  | "check-availability"
  | "bypass-availability";

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

export async function comboTargetPassesKeyModelPolicy(
  opts: ComboTargetKeyPolicyOptions
): Promise<boolean> {
  const { apiKey, apiKeyInfo, requestedModelStr, targetModelStr, isModelAllowedForKey } = opts;
  if (!apiKey || !apiKeyInfo) return true;

  const hasModelRestrictions =
    apiKeyInfo.modelAccessMode === "restricted" ||
    Boolean(apiKeyInfo.allowedModels?.length) ||
    apiKeyInfo.disableNonPublicModels === true;
  if (!hasModelRestrictions) return true;

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
