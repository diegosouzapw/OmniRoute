/**
 * Log wiring for mid-stream continuation (stream recovery). Kept out of chatCore so the
 * call site stays one line.
 *
 * Levels: the continuation attempt line keeps its release wording at warn; a recovery that
 * gives up (the continuation budget is spent, or the continuation request returned no
 * stream) is warn; every other outcome — stitched suffix, overlap rejection, terminal or
 * empty continuation, a cut refused because of a tool call — is debug, so a healthy stream
 * never adds a warn line. Every line carries `attempt N/MAX` so it joins the attempt line.
 */
import { STREAM_RECOVERY } from "../../config/constants.ts";
import type {
  ContinuationOutcome,
  RecoverableStreamOptions,
} from "../../services/streamRecovery.ts";

type RecoveryLogger =
  | {
      warn?: (tag: string, message: string) => void;
      debug?: (tag: string, message: string) => void;
    }
  | null
  | undefined;

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
  log: RecoveryLogger
): Pick<RecoverableStreamOptions, "onContinue" | "onContinueOutcome"> {
  return {
    onContinue: (attempt) => log?.warn?.(TAG, `mid-stream continuation attempt ${attempt}/${MAX}`),
    onContinueOutcome: (event) => {
      const line = formatContinuationOutcome(event);
      if (isContinuationGiveUp(event)) log?.warn?.(TAG, line);
      else log?.debug?.(TAG, line);
    },
  };
}
