import type { ReasoningRoutingRuleInput } from "@/lib/db/reasoningRoutingRules";

export function reasoningRuleDataToInput(data: Record<string, unknown>): ReasoningRoutingRuleInput {
  const scope = data.scope as ReasoningRoutingRuleInput["scope"];
  const targetKind =
    scope === "connection" ? "keep" : (data.targetKind as ReasoningRoutingRuleInput["targetKind"]);
  return {
    name: String(data.name),
    description: String(data.description ?? ""),
    scope,
    apiKeyId: scope === "apiKey" ? ((data.apiKeyId as string | null) ?? null) : null,
    comboId: scope === "combo" ? ((data.comboId as string | null) ?? null) : null,
    connectionId: scope === "connection" ? ((data.connectionId as string | null) ?? null) : null,
    modelPattern:
      scope === "model" || scope === "apiKey"
        ? ((data.modelPattern as string | null) ?? null)
        : null,
    sourceEffort: data.sourceEffort as ReasoningRoutingRuleInput["sourceEffort"],
    requestTags: data.requestTags as string[],
    tagMatchMode: data.tagMatchMode as ReasoningRoutingRuleInput["tagMatchMode"],
    effortMode: data.effortMode as ReasoningRoutingRuleInput["effortMode"],
    targetEffort: (data.targetEffort as ReasoningRoutingRuleInput["targetEffort"]) ?? null,
    targetKind,
    targetModel: targetKind === "model" ? ((data.targetModel as string | null) ?? null) : null,
    targetComboId: targetKind === "combo" ? ((data.targetComboId as string | null) ?? null) : null,
    budgetAction: data.budgetAction as ReasoningRoutingRuleInput["budgetAction"],
    budgetTokens: (data.budgetTokens as number | null) ?? null,
    priority: Number(data.priority ?? 0),
    enabled: data.enabled !== false,
  };
}
