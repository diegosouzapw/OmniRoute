/**
 * Log wiring for mid-stream continuation (stream recovery). Kept out of chatCore so the
 * call site stays one line.
 *
 * Levels: the continuation attempt line keeps its release wording at warn; a recovery that
 * gives up (the continuation budget is spent, or the continuation request returned no
 * stream) is warn; a cut refused because a tool call is in flight is debug; every other
 * outcome — stitched suffix, overlap rejection, terminal or empty continuation, a cut
 * refused for another reason — is info, so a healthy stream never adds a warn line but a
 * stitched recovery stays visible outside debug. Every line carries
 * `correlationId=<id|none>` so it joins the requesting call, plus `attempt N/MAX` so it
 * joins the attempt line.
 */
import { STREAM_RECOVERY } from "../../config/constants.ts";
import { noteContinuedSuffix } from "./continuationResilienceNotes.ts";
import type {
  ContinuationOutcome,
  RecoverableStreamOptions,
} from "../../services/streamRecovery.ts";

type RecoveryLogger =
  | {
      warn?: (tag: string, message: string) => void;
      debug?: (tag: string, message: string) => void;
      info?: (tag: string, message: string) => void;
    }
  | null
  | undefined;

/** Correlated log line suffix. Falls back to "none" like the empty-string fallback in formatBufferedVerdictLog. */
type CorrelationId = string | null | undefined;

const TAG = "STREAM_RECOVERY";
const MAX = STREAM_RECOVERY.EARLY_RETRY_MAX;

export function formatContinuationOutcome(event: ContinuationOutcome): string {
  const head = `mid-stream continuation attempt ${event.attempt}/${MAX} outcome=${event.outcome}`;
  switch (event.outcome) {
    case "suffix":
      return `${head} suffixChars=${event.suffixChars}`;
    case "overlap-reject":
      return `${head} overlapChars=${event.overlapChars}`;
    case "refused":
      return `${head} reason=${event.reason}`;
    default:
      return head;
  }
}

/** True for the outcomes that end a recovery without delivering the missing text. */
export function isContinuationGiveUp(event: ContinuationOutcome): boolean {
  if (event.outcome === "no-stream") return true;
  return event.outcome === "refused" && event.reason === "budget" && event.attempt > 0;
}

export function buildContinuationLogHooks(
  log: RecoveryLogger,
  correlationId?: CorrelationId,
  resilience?: { onSuffix?: (event: ContinuationOutcome) => void }
): Pick<RecoverableStreamOptions, "onContinue" | "onContinueOutcome"> {
  // Default resilience note: only a stitched suffix counts as a resume of
  // the turn. Terminal/empty/overlap-reject/refused/no-stream outcomes
  // record nothing. Kept here so the call site stays one line.
  const onSuffix = resilience?.onSuffix ?? noteContinuedSuffix;
  // Same empty-string-to-"none" fallback as formatBufferedVerdictLog, without trim.
  const cid = correlationId && correlationId.length > 0 ? correlationId : "none";
  return {
    onContinue: (attempt) =>
      log?.warn?.(TAG, `mid-stream continuation attempt ${attempt}/${MAX} correlationId=${cid}`),
    onContinueOutcome: (event) => {
      const line = `${formatContinuationOutcome(event)} correlationId=${cid}`;
      if (isContinuationGiveUp(event)) log?.warn?.(TAG, line);
      else if (event.outcome === "refused" && event.reason === "tool-call") log?.debug?.(TAG, line);
      else log?.info?.(TAG, line);
      // best-effort resilience note; never throws into the stream path.
      try {
        if (event.outcome === "suffix") onSuffix(event);
      } catch {
        /* observability only */
      }
    },
  };
}
