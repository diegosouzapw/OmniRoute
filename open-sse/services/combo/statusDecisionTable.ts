import { isContextOverflow400, isModelScoped400, isParamValidation400 } from "./comboPredicates.ts";

export type ComboTargetDecision = "advance" | "stop";

/**
 * KooshaPari's #8251 plan: one table of `(status, envelope) → advance | stop`,
 * so a new 400 shape is a row. HouMinXi made the same point: model-scoped
 * wrappers advance, and a blanket `includes("invalid")` is not the stop rule.
 * These rows are the body-specific stops. Model-scoped wrappers advance.
 */
export const COMBO_400_STOP_ROWS: ReadonlyArray<{ id: string; pattern: RegExp }> = [
  { id: "invalid-message-format", pattern: /invalid message format/i },
  { id: "malformed-body", pattern: /\bmalformed\b/i },
  { id: "context-shape", pattern: /\bcontext\b/i },
  { id: "prompt-shape", pattern: /\bprompt\b/i },
  { id: "token-shape", pattern: /\btoken\b/i },
];

/**
 * 400 decision for one combo target.
 * Overflow, parameter validation, and model-scoped rejections advance.
 * Only an explicit stop row holds the combo.
 */
export function comboTargetDecision(
  status: number,
  errorText: string | null | undefined
): ComboTargetDecision {
  if (status !== 400) return "advance";
  const text = String(errorText || "");
  if (!text) return "advance";
  if (isContextOverflow400(text) || isParamValidation400(text) || isModelScoped400(text)) {
    return "advance";
  }
  return COMBO_400_STOP_ROWS.some((row) => row.pattern.test(text)) ? "stop" : "advance";
}
