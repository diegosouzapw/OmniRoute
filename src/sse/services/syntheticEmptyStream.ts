/**
 * True for the 502 OmniRoute synthesizes when an upstream stream ends without a
 * content block — NOT a provider-reported 502. Keyed off the exact message
 * emitted by `emitClaudeEmptyStreamErrorAndAbort` (open-sse/utils/stream.ts).
 */
export function isSyntheticEmptyStreamFailure(
  status: number,
  errorText: string | null | undefined
): boolean {
  if (status !== 502) return false;
  return /empty response \(no content block\)/i.test(String(errorText || ""));
}

/**
 * A 5xx that says nothing about the model's health, so it must not record a
 * model-only lockout (the lock would bench the model for every other client):
 * - a bare 500 is intermittent and not model-specific (#5976);
 * - the synthesized empty-stream 502 above is OmniRoute's, not the provider's;
 * - a 5xx after the stream already relayed output to the client fails only that
 *   request: its response is committed, so no failover can help it anyway. The caller
 *   passes `exemptAfterOutput` false once such failures repeat with no completed stream
 *   in between (accountFallback/postOutputFailureStreak.ts).
 */
export function isRequestScopedServerFailure(
  status: number,
  errorText: string | null | undefined,
  exemptAfterOutput?: boolean
): boolean {
  if (status === 500 || isSyntheticEmptyStreamFailure(status, errorText)) return true;
  return status >= 500 && exemptAfterOutput === true;
}
