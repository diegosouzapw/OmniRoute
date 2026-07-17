import type { ReasoningRoutingRuleInput } from "@/lib/db/reasoningRoutingRules";

type RuleScope = ReasoningRoutingRuleInput["scope"];
type TargetKind = ReasoningRoutingRuleInput["targetKind"];

function scopedString(
  data: Record<string, unknown>,
  scope: RuleScope,
  expected: RuleScope,
  key: string
) {
  return scope === expected ? ((data[key] as string | null) ?? null) : null;
}

function scopedModelPattern(data: Record<string, unknown>, scope: RuleScope) {
  return scope === "model" || scope === "apiKey"
    ? ((data.modelPattern as string | null) ?? null)
    : null;
}

function targetValue(
  data: Record<string, unknown>,
  kind: TargetKind,
  expected: TargetKind,
  key: string
) {
  return kind === expected ? ((data[key] as string | null) ?? null) : null;
}

export function reasoningRuleDataToInput(data: Record<string, unknown>): ReasoningRoutingRuleInput {
  const scope = data.scope as RuleScope;
  const targetKind = (scope === "connection" ? "keep" : data.targetKind) as TargetKind;
  return {
    name: String(data.name),
    description: String(data.description ?? ""),
    scope,
    apiKeyId: scopedString(data, scope, "apiKey", "apiKeyId"),
    comboId: scopedString(data, scope, "combo", "comboId"),
    connectionId: scopedString(data, scope, "connection", "connectionId"),
    modelPattern: scopedModelPattern(data, scope),
    sourceEffort: data.sourceEffort as ReasoningRoutingRuleInput["sourceEffort"],
    requestTags: data.requestTags as string[],
    tagMatchMode: data.tagMatchMode as ReasoningRoutingRuleInput["tagMatchMode"],
    effortMode: data.effortMode as ReasoningRoutingRuleInput["effortMode"],
    targetEffort: (data.targetEffort as ReasoningRoutingRuleInput["targetEffort"]) ?? null,
    targetKind,
    targetModel: targetValue(data, targetKind, "model", "targetModel"),
    targetComboId: targetValue(data, targetKind, "combo", "targetComboId"),
    budgetAction: data.budgetAction as ReasoningRoutingRuleInput["budgetAction"],
    budgetTokens: (data.budgetTokens as number | null) ?? null,
    priority: Number(data.priority ?? 0),
    enabled: data.enabled !== false,
  };
}
