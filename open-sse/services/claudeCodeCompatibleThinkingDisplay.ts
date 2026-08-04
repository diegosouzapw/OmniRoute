const COPILOT_REASONING_SUMMARY_MARKER = "_omnirouteCopilotReasoningSummary";

export function applyClaudeCodeCompatibleThinkingDisplay(
  thinking: Record<string, unknown>,
  options: {
    normalizedBody?: Record<string, unknown> | null;
    summarizeThinking?: boolean;
  } = {}
) {
  if (thinking.type === "disabled") {
    return thinking;
  }

  const markerRequestsSummary =
    options.normalizedBody?.[COPILOT_REASONING_SUMMARY_MARKER] === "summarized";
  const connectionRequestsSummary = options.summarizeThinking === true;
  if (!markerRequestsSummary && !connectionRequestsSummary) {
    return thinking;
  }

  const hasExplicitDisplay =
    Object.prototype.hasOwnProperty.call(thinking, "display") &&
    thinking.display !== undefined &&
    thinking.display !== null &&
    String(thinking.display).trim().length > 0;
  if (hasExplicitDisplay && !markerRequestsSummary) {
    return thinking;
  }

  return {
    ...thinking,
    display: "summarized",
  };
}
