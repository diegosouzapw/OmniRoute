/**
 * Shared abort reasons for combo target dispatch.
 *
 * `buildTargetTimeoutRunner` aborts a stalled target with `new Error(...)` as the
 * abort reason, and hedged targets are cancelled with a different one. Consumers
 * downstream (session-affinity eviction in src/sse/handlers/chat.ts) must be able
 * to tell those two apart from an ordinary client disconnect: only the per-model
 * TIMEOUT means "this account stalled", while a hedge cancellation means "a
 * sibling target won" and says nothing about the account's health.
 *
 * Kept as a dependency-free leaf so src/** can import it without pulling in the
 * combo dispatcher.
 */

/** Abort reason used when a combo target exceeds `comboTargetTimeoutMs`. */
export const COMBO_PER_MODEL_TIMEOUT_REASON = "combo-per-model-timeout";

/** Abort reason used when a hedged sibling target won the race. */
export const COMBO_HEDGE_CANCELLED_REASON = "hedge-cancelled";

function abortReasonMessage(signal: AbortSignal): string {
  const reason: unknown = signal.reason;
  if (typeof reason === "string") return reason;
  if (reason && typeof reason === "object" && typeof (reason as Error).message === "string") {
    return (reason as Error).message;
  }
  return "";
}

/**
 * True only when `signal` was aborted by the combo per-model timeout. A client
 * disconnect, a hedge cancellation, or a non-aborted signal all return false.
 */
export function isComboPerModelTimeoutAbort(signal: AbortSignal | null | undefined): boolean {
  if (!signal?.aborted) return false;
  return abortReasonMessage(signal) === COMBO_PER_MODEL_TIMEOUT_REASON;
}
