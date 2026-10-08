import { recordComboRequest } from "../comboMetrics.ts";
import { classifyComboOutcome, type ComboErrorEntry } from "./comboErrorAggregation.ts";
import { toRecordedTarget } from "./comboPredicates.ts";
import type { ResolvedComboTarget } from "./types.ts";

/** Record a local breaker refusal as one attempted combo leg, without upstream health effects. */
export function recordLocalCircuitRefusal(args: {
  comboName: string;
  modelStr: string;
  result: Response;
  errorText: string;
  startTime: number;
  fallbackCount: number;
  strategy: string;
  target: ResolvedComboTarget;
}): { error: string; status: number; outcome: ComboErrorEntry } {
  const error = args.errorText || String(args.result.status);
  recordComboRequest(args.comboName, args.modelStr, {
    success: false,
    latencyMs: Date.now() - args.startTime,
    fallbackCount: args.fallbackCount,
    strategy: args.strategy,
    target: toRecordedTarget(args.target),
  });
  return {
    error,
    status: args.result.status,
    outcome: {
      model: args.modelStr,
      status: args.result.status,
      error,
      kind: classifyComboOutcome(args.result.status, args.errorText),
    },
  };
}
