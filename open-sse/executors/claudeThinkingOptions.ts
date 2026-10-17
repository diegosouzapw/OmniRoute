import { getClaudeCodeCompatibleRequestDefaults } from "@/lib/providers/requestDefaults";
import { applyClaudeCodeCompatibleThinkingDisplay } from "../services/claudeCodeCompatibleThinkingDisplay.ts";
import { hasActiveClaudeThinking } from "../utils/thinkingBudget.ts";

/** Pair active thinking with context management, then apply the native display opt-in. */
export function finalizeClaudeThinkingOptions(
  body: Record<string, unknown>,
  provider: string,
  providerSpecificData: unknown
): void {
  if (!hasActiveClaudeThinking(body)) return;
  // Preserve the existing native/CC pairing so long sessions retain thinking context.
  if (!body.context_management) {
    body.context_management = {
      edits: [{ type: "clear_thinking_20251015", keep: "all" }],
    };
  }
  if (provider !== "claude") return;
  const configuration = body.thinking as Record<string, unknown>;
  const { summarizeThinking } = getClaudeCodeCompatibleRequestDefaults(providerSpecificData);
  body.thinking = applyClaudeCodeCompatibleThinkingDisplay(configuration, { summarizeThinking });
}
