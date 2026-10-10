/**
 * Jev workflow-step advisory for the server-owned tool loop.
 *
 * After at least one completed follow-up round, the decision model inspects the
 * goal plus the tool calls/results so far and answers one question: will another
 * tool call materially advance the goal? A high-confidence "no" appends a
 * stop-tools instruction to the next provider leg — the model stays free to
 * ignore it, so the loop contract, termination accounting and tool schemas are
 * all unchanged. Lane-gated (`tool_loop`) and fail-open: any failure returns
 * null and the leg proceeds exactly as before.
 */
import { decideWorkflowStep } from "../../../open-sse/services/jev/decisions.ts";
import { isJevFeatureEnabled } from "../../../open-sse/services/jev/config.ts";

/** Below this probability of further progress, the advisory is emitted. */
export const JEV_STOP_TOOLS_MIN_PROCEED = 0.25;

export const JEV_STOP_TOOLS_ADVISORY_TEXT =
  "You already have the tool results you asked for. Do not call more tools: answer the user " +
  "directly with the information gathered so far, and state plainly anything you could not " +
  "determine.";

/**
 * Extract the request goal from a source body: the last user message's text,
 * accepting both the string and the content-parts shapes (OpenAI / Anthropic).
 */
export function extractGoalText(sourceBody: Record<string, unknown> | null | undefined): string {
  const messages = Array.isArray(sourceBody?.messages) ? sourceBody.messages : [];
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (!message || typeof message !== "object" || Array.isArray(message)) continue;
    const record = message as Record<string, unknown>;
    if (record.role !== "user") continue;
    const content = record.content;
    if (typeof content === "string") {
      const text = content.trim();
      if (text) return text;
      continue;
    }
    if (Array.isArray(content)) {
      const text = content
        .map((part) => {
          if (!part || typeof part !== "object" || Array.isArray(part)) return undefined;
          if (!("text" in part)) return undefined;
          const value = part.text;
          return typeof value === "string" ? value : undefined;
        })
        .filter((part): part is string => typeof part === "string" && part.length > 0)
        .join("\n")
        .trim();
      if (text) return text;
    }
  }
  return "";
}

/**
 * Resolve the stop-tools advisory for the next loop leg, or null to proceed
 * unchanged. `steps` is the compact summary of what the loop has done so far
 * (tool names + serialized results).
 */
export async function maybeJevStopToolsAdvisory(input: {
  goal: string;
  steps: string[];
  stepsTaken: number;
}): Promise<string | null> {
  if (!isJevFeatureEnabled("tool_loop")) return null;
  const goal = input.goal?.trim();
  if (!goal || input.steps.length === 0) return null;

  const decision = await decideWorkflowStep({
    goal,
    stepsSummary: input.steps.join("\n").slice(0, 4_000),
    stepsTaken: input.stepsTaken,
  });
  if (!decision) return null;
  if (decision.proceed >= JEV_STOP_TOOLS_MIN_PROCEED) return null;
  return JEV_STOP_TOOLS_ADVISORY_TEXT;
}
