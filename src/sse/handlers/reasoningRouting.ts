import { getComboForModel, getModelInfo } from "../services/model";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import {
  validateApiKeyRoutingTarget,
  type ApiKeyMetadata,
  type ApiKeyPolicyResult,
} from "@/shared/utils/apiKeyPolicy";
import { resolveRequestRoutingTags } from "@/domain/tagRouter";
import * as log from "../utils/logger";
import {
  attachReasoningRuleDirective,
  extractReasoningIntent,
  filterComboForReasoningDecision,
  resolveReasoningSourceModels,
  resolveReasoningRoutingRule,
  type ExtractedReasoningIntent,
  type ReasoningRuleDecision,
} from "@/lib/reasoningRouting/policy";

type RoutingPolicy = Pick<ApiKeyPolicyResult, "apiKey" | "apiKeyInfo">;
type JsonRecord = Record<string, unknown>;

type ReasoningRoutingResult = {
  body: any;
  modelStr: string;
  reasoningIntent: ExtractedReasoningIntent;
  reasoningDecision: ReasoningRuleDecision | null;
  requestRoutingTags: { tags: string[] };
  response: Response | null;
};

type DecisionResolution =
  { decision: ReasoningRuleDecision | null; error: null } | { decision: null; error: Response };

async function resolveDecision(
  input: Parameters<typeof resolveReasoningRoutingRule>[0]
): Promise<DecisionResolution> {
  try {
    return { decision: await resolveReasoningRoutingRule(input), error: null };
  } catch (error) {
    log.error("REASONING_ROUTE", "Failed to resolve reasoning routing policy", { error });
    return {
      decision: null,
      error: errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        "Reasoning routing policy could not be resolved"
      ),
    };
  }
}

type AppliedDecisionResult =
  { body: JsonRecord; modelStr: string; response: null } | { response: Response };

async function applyDecision(
  request: Request,
  body: JsonRecord,
  policy: RoutingPolicy,
  apiKeyInfo: ApiKeyMetadata | null,
  decision: ReasoningRuleDecision
): Promise<AppliedDecisionResult> {
  if (decision.capability === "unsupported" && !decision.targetCombo) {
    return {
      response: errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `Reasoning effort '${decision.targetEffort}' is not supported by the configured target`
      ),
    };
  }

  const rejection = await validateApiKeyRoutingTarget(
    request,
    policy.apiKey,
    apiKeyInfo,
    decision.targetModel
  );
  if (rejection) {
    log.warn("REASONING_ROUTE", `Rule ${decision.rule.id} target rejected by API key policy`);
    return { response: rejection };
  }

  log.info(
    "REASONING_ROUTE",
    `Rule ${decision.rule.id}: ${decision.sourceModel}/${decision.sourceEffort} → ${decision.targetModel}/${decision.targetEffort || "inherit"}`
  );
  for (const warning of decision.warnings) {
    log.warn("REASONING_ROUTE", `Rule ${decision.rule.id}: ${warning}`);
  }
  return {
    body: attachReasoningRuleDirective(body, decision),
    modelStr: decision.targetModel,
    response: null,
  };
}

export async function applyReasoningRouting({
  request,
  body,
  modelStr,
  policy,
  apiKeyInfo,
  reasoningIntent,
}: {
  request: Request;
  body: JsonRecord;
  modelStr: string;
  policy: RoutingPolicy;
  apiKeyInfo: ApiKeyMetadata | null;
  reasoningIntent?: ExtractedReasoningIntent | null;
}): Promise<ReasoningRoutingResult> {
  const stableReasoningIntent = reasoningIntent || extractReasoningIntent(modelStr, body);
  const requestedCombo = await getComboForModel(stableReasoningIntent.model);
  let sourceAliases: string[] = [];
  if (!requestedCombo) {
    const sourceModels = await resolveReasoningSourceModels(
      stableReasoningIntent.model,
      getModelInfo
    );
    stableReasoningIntent.model = sourceModels.normalized;
    sourceAliases = sourceModels.aliases;
  }

  const requestRoutingTags = resolveRequestRoutingTags(body);
  const decisionResolution = await resolveDecision({
    sourceModel: stableReasoningIntent.model,
    sourceModelAliases: sourceAliases,
    sourceEffort: stableReasoningIntent.sourceEffort,
    hasReasoningSignal: stableReasoningIntent.hasReasoningSignal,
    hasThinkingBudget: stableReasoningIntent.hasThinkingBudget,
    apiKeyId: apiKeyInfo?.id ?? null,
    comboId: typeof requestedCombo?.id === "string" ? requestedCombo.id : null,
    requestTags: requestRoutingTags.tags,
  });
  if (decisionResolution.error) {
    return {
      body,
      modelStr,
      reasoningIntent: stableReasoningIntent,
      reasoningDecision: null,
      requestRoutingTags,
      response: decisionResolution.error,
    };
  }
  const decision = decisionResolution.decision;
  if (!decision) {
    return {
      body,
      modelStr,
      reasoningIntent: stableReasoningIntent,
      reasoningDecision: null,
      requestRoutingTags,
      response: null,
    };
  }

  const applied = await applyDecision(request, body, policy, apiKeyInfo, decision);
  if (!("body" in applied)) {
    return {
      body,
      modelStr,
      reasoningIntent: stableReasoningIntent,
      reasoningDecision: decision,
      requestRoutingTags,
      response: applied.response,
    };
  }
  return {
    body: applied.body,
    modelStr: applied.modelStr,
    reasoningIntent: stableReasoningIntent,
    reasoningDecision: decision,
    requestRoutingTags,
    response: null,
  };
}

export function filterReasoningCombo(combo: any, decision: ReasoningRuleDecision) {
  const filtered = filterComboForReasoningDecision(combo, decision);
  if (!filtered.combo) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      "Reasoning routing policy leaves no compatible combo target"
    );
  }
  if (filtered.removed.length > 0) {
    log.warn(
      "REASONING_ROUTE",
      `Rule ${decision.rule.id} skipped ${filtered.removed.length} incompatible combo target(s)`
    );
  }
  return filtered.combo;
}

export async function applyConnectionReasoningRule({
  requestBody,
  provider,
  effectiveModel,
  credentials,
  apiKeyInfo,
  reasoningIntent,
  reasoningDecision,
  requestRoutingTags,
}: {
  requestBody: any;
  provider: string;
  effectiveModel: string;
  credentials: any;
  apiKeyInfo: ApiKeyMetadata | null;
  reasoningIntent?: ExtractedReasoningIntent | null;
  reasoningDecision?: ReasoningRuleDecision | null;
  requestRoutingTags?: string[];
}): Promise<{ body: any; response: Response | null }> {
  if (reasoningDecision || !reasoningIntent) return { body: requestBody, response: null };

  const decision = await resolveReasoningRoutingRule({
    sourceModel: reasoningIntent.model,
    sourceEffort: reasoningIntent.sourceEffort,
    hasReasoningSignal: reasoningIntent.hasReasoningSignal,
    hasThinkingBudget: reasoningIntent.hasThinkingBudget,
    apiKeyId: apiKeyInfo?.id ?? null,
    connectionId: credentials.connectionId,
    requestTags: requestRoutingTags ?? [],
    connectionOnly: true,
    capabilityModel: `${provider}/${effectiveModel}`,
  });
  if (!decision) return { body: requestBody, response: null };
  if (decision.capability === "unsupported") {
    return {
      body: requestBody,
      response: errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `Reasoning effort '${decision.targetEffort}' is not supported by the selected connection model`
      ),
    };
  }

  log.info(
    "REASONING_ROUTE",
    `Connection rule ${decision.rule.id} applied to ${credentials.connectionId}`
  );
  return { body: attachReasoningRuleDirective(requestBody, decision), response: null };
}
