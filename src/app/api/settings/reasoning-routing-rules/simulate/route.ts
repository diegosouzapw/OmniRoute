import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getApiKeyById } from "@/lib/db/apiKeys";
import { getComboForModel } from "@/sse/services/model";
import {
  resolveReasoningRoutingRule,
  resolveReasoningSourceModels,
  validateCodexWsDecision,
} from "@/lib/reasoningRouting/policy";
import { simulateReasoningRoutingSchema } from "@/shared/validation/schemas";
import { validatedJsonBody } from "@/shared/validation/helpers";
import { validateApiKeyRoutingTarget } from "@/shared/utils/apiKeyPolicy";
import { getModelInfo } from "@/sse/services/model";
import { resolveCodexWsModelInfo } from "@/app/api/internal/codex-responses-ws/modelResolution";

async function resolveSimulationSourceModels(model: string, transport: string, combo: unknown) {
  if (combo) return { normalized: model, aliases: [] };
  return resolveReasoningSourceModels(model, (value) =>
    transport === "codex-ws" ? resolveCodexWsModelInfo(value, getModelInfo) : getModelInfo(value)
  );
}

function simulationErrors(
  decision: Awaited<ReturnType<typeof resolveReasoningRoutingRule>>,
  transportError: string | null,
  permissionError: string | null
) {
  return [
    ...(decision?.capability === "unsupported"
      ? ["The configured effort is not supported by the target model"]
      : []),
    ...(transportError ? [transportError] : []),
    ...(permissionError ? [permissionError] : []),
  ];
}

async function readPermissionError(targetRejection: Response | null): Promise<string | null> {
  if (!targetRejection) return null;
  try {
    const payload = await targetRejection.json();
    return payload?.error?.message || payload?.error || "The API key cannot access the target";
  } catch {
    return "The API key cannot access the target";
  }
}

async function resolveSimulationDecision(
  model: string,
  effort: string,
  thinkingBudgetTokens: number | undefined,
  apiKey: { id?: string } | null,
  requestTags: string[],
  transport: string,
  combo: { id?: unknown } | null
) {
  const sourceModels = await resolveSimulationSourceModels(model, transport, combo);
  const decision = await resolveReasoningRoutingRule({
    sourceModel: sourceModels.normalized,
    sourceModelAliases: sourceModels.aliases,
    sourceEffort: effort === "any" ? "missing" : effort,
    hasReasoningSignal:
      (effort !== "missing" && effort !== "any") || typeof thinkingBudgetTokens === "number",
    hasThinkingBudget: typeof thinkingBudgetTokens === "number",
    apiKeyId: apiKey?.id ?? null,
    comboId: typeof combo?.id === "string" ? combo.id : null,
    requestTags,
  });
  return { decision, sourceModels };
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const parsed = await validatedJsonBody(request, simulateReasoningRoutingSchema);
  if (!parsed.success) return parsed.response;
  const { model, effort, thinkingBudgetTokens, apiKeyId, requestTags, transport } = parsed.data;
  const apiKey = apiKeyId ? await getApiKeyById(apiKeyId) : null;
  if (apiKeyId && !apiKey) {
    return NextResponse.json(buildErrorBody(404, "API key not found"), { status: 404 });
  }
  const combo = await getComboForModel(model);
  const { decision } = await resolveSimulationDecision(
    model,
    effort,
    thinkingBudgetTokens,
    apiKey,
    requestTags,
    transport,
    combo
  );
  const transportError =
    decision && transport === "codex-ws" ? validateCodexWsDecision(decision) : null;
  const targetRejection = decision
    ? await validateApiKeyRoutingTarget(
        request,
        typeof apiKey?.key === "string" ? apiKey.key : null,
        apiKey as never,
        decision.targetModel
      )
    : null;
  const permissionError = await readPermissionError(targetRejection);
  return NextResponse.json({
    matched: !!decision,
    decision,
    errors: simulationErrors(decision, transportError, permissionError),
  });
}
