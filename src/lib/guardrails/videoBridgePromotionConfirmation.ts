import {
  promotionExecutionSchema,
  type PromotionExecutionReceipt,
} from "./videoBridgePromotionEvidence";
import type { PromotionVerdict } from "./videoBridgePromotionEvaluator";

export interface PromotionRunReceipt {
  comparison?: "fu07" | "fu09" | null;
  candidateModel: string | null;
  execution: { state: "executed" | "not-configured"; receipt?: PromotionExecutionReceipt };
  observationsDigest: string | null;
  fu07: PromotionVerdict;
  fu09: PromotionVerdict;
}

export interface PromotionConfirmation {
  fu07: PromotionVerdict;
  fu09: PromotionVerdict;
}

function hold(reason: string): PromotionConfirmation {
  return {
    fu07: { status: "hold", reasons: [reason] },
    fu09: { status: "hold", reasons: [reason] },
  };
}

function validReport(report: PromotionRunReceipt): boolean {
  return (
    report.execution.state === "executed" &&
    promotionExecutionSchema.safeParse(report.execution.receipt).success &&
    typeof report.candidateModel === "string" &&
    report.candidateModel.length > 0 &&
    typeof report.observationsDigest === "string" &&
    /^[a-f0-9]{64}$/.test(report.observationsDigest)
  );
}

/** Only the last two receipts count: an intervening ineligible run resets confirmation. */
export function confirmVideoBridgePromotionRuns(
  reports: readonly PromotionRunReceipt[]
): PromotionConfirmation {
  if (reports.length < 2) return hold("SECOND_INDEPENDENT_RUN_REQUIRED");
  const [first, second] = reports.slice(-2);
  if (!validReport(first) || !validReport(second)) return hold("EXECUTION_RECEIPT_INVALID");
  if (
    (first.comparison !== "fu07" && first.comparison !== "fu09") ||
    first.comparison !== second.comparison
  )
    return hold("COMPARISON_TARGET_MISMATCH");
  const left = first.execution.receipt!;
  const right = second.execution.receipt!;
  if (
    left.candidateSha !== right.candidateSha ||
    left.manifestDigest !== right.manifestDigest ||
    first.candidateModel !== second.candidateModel
  )
    return hold("EXECUTION_TARGET_MISMATCH");
  if (
    left.runId === right.runId ||
    left.orderSeed === right.orderSeed ||
    first.observationsDigest === second.observationsDigest
  )
    return hold("EXECUTIONS_NOT_INDEPENDENT");
  if (
    Date.parse(left.finishedAt) <= Date.parse(left.startedAt) ||
    Date.parse(right.finishedAt) <= Date.parse(right.startedAt) ||
    Date.parse(right.startedAt) < Date.parse(left.finishedAt)
  )
    return hold("EXECUTION_ORDER_INVALID");
  const lane = (name: "fu07" | "fu09"): PromotionVerdict =>
    name === first.comparison &&
    first[name].status === "eligible" &&
    second[name].status === "eligible"
      ? { status: "eligible", reasons: [] }
      : { status: "hold", reasons: ["CONSECUTIVE_ELIGIBLE_RUNS_REQUIRED"] };
  return { fu07: lane("fu07"), fu09: lane("fu09") };
}
