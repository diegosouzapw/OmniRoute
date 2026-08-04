// ── DeepSeek Web SSE "done terminator" helpers ──────────────────────────
//
// Extracted from deepseek-web.ts (frozen line-count) so the drain/guard
// state machine used to close the OpenAI-compatible SSE after DeepSeek's
// `response/status=FINISHED` event can grow without touching the frozen
// file. See #6777: upstreams that leave the HTTP body open hang OpenAI SDK
// clients that wait for `data: [DONE]` after `finish_reason: stop`.

/** How long to wait after DeepSeek `response/status=FINISHED` for trailing
 * search_results before closing the OpenAI-compatible SSE. */
export const DEEPSEEK_FINISHED_DRAIN_MS = 750;

/** Wraps a stream-finishing callback so it runs at most once and never
 * throws past a controller that the client already cancelled/closed. */
export function createFinishOnceGuard(finish: () => void): {
  finishOnce: () => void;
  hasFinished: () => boolean;
} {
  let streamFinished = false;
  return {
    finishOnce: () => {
      if (streamFinished) return;
      streamFinished = true;
      try {
        finish();
      } catch {
        // Controller may already be closed if the client cancelled.
      }
    },
    hasFinished: () => streamFinished,
  };
}

/** Schedules `finishStream` after a short drain window following
 * `response/status=FINISHED`, so late `search_results` payloads still get
 * captured, while guaranteeing the stream always closes even if the
 * upstream body stays open past that window. */
export function createFinishedDrainScheduler(
  finishStream: () => void,
  drainMs: number = DEEPSEEK_FINISHED_DRAIN_MS
): {
  scheduleFinishAfterDrain: () => void;
  clearFinishedDrain: () => void;
  isDrainPending: () => boolean;
} {
  let finishedDrainTimer: ReturnType<typeof setTimeout> | null = null;

  const clearFinishedDrain = () => {
    if (finishedDrainTimer) {
      clearTimeout(finishedDrainTimer);
      finishedDrainTimer = null;
    }
  };

  const scheduleFinishAfterDrain = () => {
    clearFinishedDrain();
    finishedDrainTimer = setTimeout(() => {
      finishedDrainTimer = null;
      finishStream();
    }, drainMs);
  };

  return {
    scheduleFinishAfterDrain,
    clearFinishedDrain,
    isDrainPending: () => finishedDrainTimer !== null,
  };
}
