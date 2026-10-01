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
