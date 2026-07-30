/* Adapted from miuuyy/codex-chatgpt-web commit 55592fca0ba19a27f1b769cec8fff61ff340a785 (MIT). */
import type { CodexUsage } from "../types";

/**
 * `inputTokens` already includes cache detail, so cache tokens are never added twice. A provider's
 * explicit total is accepted only when it is at least input+output.
 */
export function usageDisplayTotalTokens(usage: CodexUsage | undefined): number | undefined {
  if (!usage) return undefined;
  const baseTotal = usage.inputTokens + usage.outputTokens;
  const explicitTotal = usage.totalTokens;
  return typeof explicitTotal === "number" ? Math.max(explicitTotal, baseTotal) : baseTotal;
}
