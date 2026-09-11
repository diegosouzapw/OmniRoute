// Self-cleaning abort-signal merge. Extracted from base.ts so the frozen
// executor host does not grow past its file-size cap for this leak fix.

/**
 * Merge two abort signals into one that fires when either does.
 *
 * The `primary`/`secondary` abort listeners registered below MUST be removed once the
 * merged controller settles — otherwise they outlive this call and stay attached to
 * whichever input signal is longer-lived (typically the combo/client signal, which
 * stays open for the whole request while this merge is re-done per executor fetch
 * attempt/retry). A hedge cancellation or client disconnect arriving after this
 * particular merge's caller has already moved on then still fires the listener,
 * detached from anything that's still awaiting it. Mirrors the already-correct
 * self-cleaning pattern in `open-sse/utils/directResponseStartTimeout.ts`'s local
 * `mergeAbortSignals` (#hedge-cancelled-abort-listener-leak).
 */
export function mergeAbortSignals(primary: AbortSignal, secondary: AbortSignal): AbortSignal {
  const controller = new AbortController();

  const cleanup = () => {
    primary.removeEventListener("abort", onPrimaryAbort);
    secondary.removeEventListener("abort", onSecondaryAbort);
  };

  const abortFrom = (source: AbortSignal) => {
    if (!controller.signal.aborted) {
      controller.abort(source.reason);
    }
    cleanup();
  };

  const onPrimaryAbort = () => abortFrom(primary);
  const onSecondaryAbort = () => abortFrom(secondary);

  if (primary.aborted) {
    abortFrom(primary);
    return controller.signal;
  }
  if (secondary.aborted) {
    abortFrom(secondary);
    return controller.signal;
  }

  primary.addEventListener("abort", onPrimaryAbort, { once: true });
  secondary.addEventListener("abort", onSecondaryAbort, { once: true });
  return controller.signal;
}
