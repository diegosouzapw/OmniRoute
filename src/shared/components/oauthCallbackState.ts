/**
 * An automatic OAuth callback (postMessage / BroadcastChannel / localStorage relay) may only
 * complete the attempt it belongs to. When the active attempt carries a state, the relayed
 * callback must echo exactly that state: a callback with no state at all is not proof it came
 * from this attempt, so it is rejected instead of being exchanged (GHSA-3fxv-j4h8-9mgg).
 */
export function isCallbackStateAcceptable(
  expectedState: string | null | undefined,
  receivedState: string | null | undefined
): boolean {
  if (!expectedState) return true; // no state issued for this attempt, nothing to bind to
  return typeof receivedState === "string" && receivedState === expectedState;
}
