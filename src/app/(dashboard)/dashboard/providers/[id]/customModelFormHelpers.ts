export type BooleanCapabilityChoice = "unknown" | "yes" | "no";

export type NewModelCapabilitiesDraft = {
  supportsVision: BooleanCapabilityChoice;
  supportsTools: BooleanCapabilityChoice;
  supportsThinking: BooleanCapabilityChoice;
  supportsXHigh: BooleanCapabilityChoice;
  supportsMax: BooleanCapabilityChoice;
  contextWindow: string;
  maxOutputTokens: string;
  defaultThinkingBudget: string;
  thinkingBudgetCap: string;
};

function positiveInteger(value: string): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.trunc(parsed) : null;
}

function nonNegativeInteger(value: string): number | null {
  if (value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.trunc(parsed) : null;
}

export function buildNewModelCapabilities(
  draft: NewModelCapabilitiesDraft
): Record<string, unknown> {
  const capabilities: Record<string, unknown> = {};
  const assignBoolean = (key: string, choice: BooleanCapabilityChoice) => {
    if (choice === "yes") capabilities[key] = true;
    if (choice === "no") capabilities[key] = false;
  };
  assignBoolean("supportsVision", draft.supportsVision);
  assignBoolean("supportsTools", draft.supportsTools);
  assignBoolean("supportsReasoning", draft.supportsThinking);
  assignBoolean("supportsXHighEffort", draft.supportsXHigh);
  assignBoolean("supportsMaxEffort", draft.supportsMax);

  const contextWindow = positiveInteger(draft.contextWindow);
  if (contextWindow) {
    capabilities.contextWindow = contextWindow;
    capabilities.maxInputTokens = contextWindow;
  }

  const maxOutputTokens = positiveInteger(draft.maxOutputTokens);
  if (maxOutputTokens) capabilities.maxOutputTokens = maxOutputTokens;

  const defaultThinkingBudget = nonNegativeInteger(draft.defaultThinkingBudget);
  if (defaultThinkingBudget !== null) capabilities.defaultThinkingBudget = defaultThinkingBudget;

  const thinkingBudgetCap = nonNegativeInteger(draft.thinkingBudgetCap);
  if (thinkingBudgetCap !== null) capabilities.thinkingBudgetCap = thinkingBudgetCap;

  return capabilities;
}

export function parseUnsupportedParamsDraft(value: string): string[] {
  return Array.from(
    new Set(
      value
        .split(/[\n,]/)
        .map((entry) => entry.trim())
        .filter(Boolean)
    )
  );
}
