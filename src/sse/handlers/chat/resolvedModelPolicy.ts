/**
 * Resolved-model API-key policy for handleSingleModelChat (#12886 / #12899).
 *
 * Extracted from chat.ts so the frozen handler does not grow. Entry admission
 * authorizes the requested model string; aliases, combo targets and
 * connection/reasoning overrides resolve to a concrete model afterwards, so the
 * same key must admit that concrete model too before any upstream dispatch.
 */
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { isModelAllowedForKey } from "@/lib/db/apiKeys";
import { withHiddenModelGate } from "./hiddenModelGate.ts";
import {
  checkResolvedModelPermission,
  markLocalModelPolicyResponse,
} from "@/shared/utils/resolvedModelAccess";
import {
  isExplicitlyAllowedComboForKey,
  type ComboTargetKeyPolicyInfo,
} from "./comboTargetKeyPolicy.ts";

/** Request identity admitted at entry: the combo/alias context, else the model string. */
export function resolveAuthorizationContextModel(
  contextModel: string | null | undefined,
  modelStr: string
): string {
  return typeof contextModel === "string" && contextModel.trim().length > 0
    ? contextModel.trim()
    : modelStr;
}

/**
 * An explicitly allowed stored combo authorizes its own target (#14197); any
 * other model a connection/reasoning override swaps in is still checked.
 */
export function comboGrantedTargetSet(
  comboGrantsTargets: boolean | undefined,
  provider: string,
  model: string,
  modelStr: string
): Set<string> | null {
  if (comboGrantsTargets !== true) return null;
  return new Set([
    `${provider}/${model}`,
    modelStr.includes("/") ? modelStr : `${provider}/${modelStr}`,
  ]);
}

/**
 * Concrete targets after connection routing. requestBody.model is only a new
 * target when an override rewrote it; the client's own model string (e.g. the
 * combo name) was already admitted at entry.
 */
export function effectivePolicyTargets(
  provider: string,
  effectiveModel: string,
  requestBodyModel: unknown,
  incomingModel: unknown
): Set<string> {
  const targets = new Set([`${provider}/${effectiveModel}`]);
  if (
    typeof requestBodyModel === "string" &&
    requestBodyModel.length > 0 &&
    requestBodyModel !== incomingModel
  ) {
    targets.add(
      requestBodyModel.includes("/") ? requestBodyModel : `${provider}/${requestBodyModel}`
    );
  }
  return targets;
}

/** Returns a marked local policy rejection for the first target the key does not admit. */
export async function rejectUnauthorizedResolvedModels(opts: {
  hasApiKeyMetadata: boolean;
  apiKey: string | null | undefined;
  requestedModel: string;
  resolvedModels: Iterable<string>;
  grantedTargets?: Set<string> | null;
}): Promise<Response | null> {
  for (const resolvedModel of opts.resolvedModels) {
    if (opts.grantedTargets?.has(resolvedModel)) continue;
    const permission = await checkResolvedModelPermission(
      {
        hasApiKeyMetadata: opts.hasApiKeyMetadata,
        apiKey: opts.apiKey,
        requestedModel: opts.requestedModel,
        resolvedModel,
      },
      isModelAllowedForKey
    );
    if (permission === "allowed") continue;
    return markLocalModelPolicyResponse(
      errorResponse(
        permission === "denied" ? HTTP_STATUS.FORBIDDEN : HTTP_STATUS.SERVICE_UNAVAILABLE,
        permission === "denied"
          ? "Resolved model is not allowed for this API key"
          : "API key model policy unavailable"
      )
    );
  }
  return null;
}

/** Runtime options a combo dispatch passes so its targets keep the admitted context. */
export function comboAuthorizationOptions(
  apiKeyInfo: ComboTargetKeyPolicyInfo | null | undefined,
  requestedModelStr: string
): { authorizationContextModel: string; comboGrantsTargets: boolean } {
  return {
    // The preflight admits the originally requested combo or alias; every
    // resolved target stays subject to its own blocked/group/publication checks.
    authorizationContextModel: requestedModelStr,
    // #14197: a stored combo named in allowedCombos grants its own targets.
    comboGrantsTargets: isExplicitlyAllowedComboForKey(apiKeyInfo, requestedModelStr),
  };
}

/** Per-request gate: returns a rejection for the first resolved model the key does not admit. */
export function createResolvedModelGate(opts: {
  apiKeyInfo: unknown;
  apiKey: string | null | undefined;
  contextModel: string | null | undefined;
  comboGrantsTargets: boolean | undefined;
  provider: string;
  model: string;
  modelStr: string;
}): (resolvedModels: Iterable<string>) => Promise<Response | null> {
  const base = {
    hasApiKeyMetadata: Boolean(opts.apiKeyInfo),
    apiKey: opts.apiKey,
    requestedModel: resolveAuthorizationContextModel(opts.contextModel, opts.modelStr),
    grantedTargets: comboGrantedTargetSet(
      opts.comboGrantsTargets,
      opts.provider,
      opts.model,
      opts.modelStr
    ),
  };
  return (resolvedModels) => rejectUnauthorizedResolvedModels({ ...base, resolvedModels });
}

/**
 * #12666: the dispatch gate chat.ts uses — key/combo authorization first (its rejection keeps
 * precedence), then hidden-model enforcement on the same resolved targets. Composed here so the
 * frozen chat.ts does not grow (file-size gate).
 */
export function createVisibleResolvedModelGate(
  opts: Parameters<typeof createResolvedModelGate>[0]
): (resolvedModels: Iterable<string>) => Promise<Response | null> {
  return withHiddenModelGate(createResolvedModelGate(opts));
}
