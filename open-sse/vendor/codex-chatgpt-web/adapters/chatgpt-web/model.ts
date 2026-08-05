/* Adapted from miuuyy/codex-chatgpt-web commit 55592fca0ba19a27f1b769cec8fff61ff340a785 (MIT). */
export const CHATGPT_WEB_MODEL_ID = "gpt-5.6-sol";

export interface ChatGptWebCapabilities {
  localToolsEnabled: boolean;
  proAvailable: boolean;
}

export interface ChatGptWebModelMode {
  modelId: string;
  effort: "low" | "medium" | "high" | "xhigh" | "max";
  displayLabel: "Instant" | "Medium" | "High" | "Extra High" | "Pro";
  uiEffortLabel: "Instant 5.5" | "Medium" | "High" | "Extra High" | "Pro";
  localTools: boolean;
}

export function resolveChatGptWebModelMode(
  modelId: string,
  reasoning: string | undefined,
  capabilities: ChatGptWebCapabilities
): ChatGptWebModelMode {
  if (modelId !== CHATGPT_WEB_MODEL_ID) {
    throw new Error(`ChatGPT web model is not supported: ${modelId}`);
  }
  const effort = reasoning ?? "high";
  switch (effort) {
    case "low":
      return {
        modelId,
        effort,
        displayLabel: "Instant",
        uiEffortLabel: "Instant 5.5",
        localTools: capabilities.localToolsEnabled,
      };
    case "medium":
      return {
        modelId,
        effort,
        displayLabel: "Medium",
        uiEffortLabel: "Medium",
        localTools: capabilities.localToolsEnabled,
      };
    case "high":
      return {
        modelId,
        effort,
        displayLabel: "High",
        uiEffortLabel: "High",
        localTools: capabilities.localToolsEnabled,
      };
    case "xhigh":
      return {
        modelId,
        effort,
        displayLabel: "Extra High",
        uiEffortLabel: "Extra High",
        localTools: capabilities.localToolsEnabled,
      };
    case "max":
      if (!capabilities.proAvailable)
        throw new Error("ChatGPT Pro effort is not available for this account");
      return { modelId, effort, displayLabel: "Pro", uiEffortLabel: "Pro", localTools: false };
    default:
      throw new Error(`ChatGPT web effort is not supported: ${effort}`);
  }
}
