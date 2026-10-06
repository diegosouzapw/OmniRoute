import { judgeBufferedTurn } from "../../utils/emptyTurnRetry.ts";
import { noteResilienceAction } from "@/lib/usage/resilienceActionsContext.ts";

type Verdict = ReturnType<typeof judgeBufferedTurn>;

/**
 * record the buffered-turn verdict outcome (pass/retry) and the
 * empty-retry count into the attempt resilience store. A pass or an
 * exhausted budget closes the loop with a terminal verdict note; each
 * scheduled retry adds one empty-retry.
 */
export function noteBufferedVerdictOutcome(
  verdict: Verdict,
  logLine: { level: "warn" | "debug" | "info"; line: string } | null,
  budgetExhausted: boolean
): void {
  if (verdict.kind === "pass") {
    noteResilienceAction({ buffered: "pass" });
    return;
  }
  if (budgetExhausted) {
    noteResilienceAction({ buffered: "retry" });
    return;
  }
  if (logLine) noteResilienceAction({ emptyRetries: 1 });
}
