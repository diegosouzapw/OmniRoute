import { capMaxOutputTokens } from "../../../../src/lib/modelCapabilities.ts";

// Anthropic constraints for the thinking + max_tokens contract:
//   - thinking.budget_tokens must be >= 1024 when thinking is enabled
//   - max_tokens must be > thinking.budget_tokens (covers thinking + response)
//   - max_tokens must be <= model output cap (e.g. 128000 for Opus 4.7)
const MIN_CLAUDE_THINKING_BUDGET = 1024;
const MIN_RESPONSE_ROOM = 1024;

function safeCapMaxOutputTokens(model: string): number | null {
  try {
    const cap = capMaxOutputTokens(model);
    return typeof cap === "number" && cap > 0 ? cap : null;
  } catch {
    return null;
  }
}

/**
 * Fit Claude thinking budget within the model's max output cap.
 *
 * Replaces the previous unconditional `max_tokens = budget + 8192` inflation,
 * which could exceed the model output cap (e.g. Opus 4.7's 128000 ceiling) and
 * trigger HTTP 400 from Anthropic ("max_tokens > 128000").
 *
 * Strategy (preserves caller intent up to the model cap):
 *   - Preserve caller's max_tokens as response room (floored to MIN_RESPONSE_ROOM)
 *   - Target max_tokens = responseRoom + requestedBudget, capped at modelCap
 *   - fittedBudget = max_tokens - responseRoom (the thinking budget actually used)
 *   - If the cap squeezes fittedBudget below the Anthropic minimum, retry with
 *     responseRoom shrunk to MIN_RESPONSE_ROOM; if still below MIN, disable
 *     thinking entirely (cap too tight for any reasoning).
 *
 * Worked example (real-world Opus 4.7 case that previously 400'd):
 *   caller max_tokens = 32000, reasoning_effort=high → budget = 131072,
 *   model cap = 128000.
 *   responseRoom = max(32000, 1024) = 32000
 *   target       = min(32000 + 131072, 128000) = 128000
 *   fittedBudget = 128000 - 32000 = 96000  (>= 1024, OK)
 *   → max_tokens=128000, budget_tokens=96000 (vs. the old buggy 139264 / 131072).
 */
export function fitThinkingToMaxTokens(
  model: string,
  callerMaxTokens: number,
  thinking: Record<string, unknown> | undefined
): { maxTokens: number; thinking: Record<string, unknown> | undefined } {
  const modelCap = safeCapMaxOutputTokens(model);
  const requestedBudget = Number(thinking?.budget_tokens) || 0;

  // No budgeted thinking — just cap max_tokens to the model output ceiling.
  if (!thinking || requestedBudget <= 0) {
    return {
      maxTokens:
        modelCap === null
          ? Math.max(callerMaxTokens, 1)
          : Math.min(Math.max(callerMaxTokens, 1), modelCap),
      thinking,
    };
  }

  let responseRoom = Math.max(callerMaxTokens, MIN_RESPONSE_ROOM);
  let target =
    modelCap === null
      ? responseRoom + requestedBudget
      : Math.min(responseRoom + requestedBudget, modelCap);
  let fittedBudget = target - responseRoom;

  // If the cap squeezed thinking below Anthropic's floor, try shrinking
  // response room to MIN_RESPONSE_ROOM to recover budget.
  if (fittedBudget < MIN_CLAUDE_THINKING_BUDGET && responseRoom > MIN_RESPONSE_ROOM) {
    responseRoom = MIN_RESPONSE_ROOM;
    target =
      modelCap === null
        ? responseRoom + requestedBudget
        : Math.min(responseRoom + requestedBudget, modelCap);
    fittedBudget = target - responseRoom;
  }

  // Cap too tight for any thinking — disable rather than send an invalid request.
  if (fittedBudget < MIN_CLAUDE_THINKING_BUDGET) {
    return { maxTokens: modelCap ?? Math.max(callerMaxTokens, 1), thinking: undefined };
  }

  const adjustedThinking: Record<string, unknown> = { ...thinking };
  if (fittedBudget < requestedBudget) {
    adjustedThinking.budget_tokens = fittedBudget;
  }
  return { maxTokens: target, thinking: adjustedThinking };
}
