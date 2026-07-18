// Re-exported here (rather than a separate import line in chat.ts, a frozen
// file-size chokepoint — see config/quality/file-size-baseline.json) so both
// combo-failure-handling helpers chat.ts needs share a single import line.
export { isRequestScopedUpstreamFailure } from "@omniroute/open-sse/services/combo/comboPredicates.ts";

export async function getComboFailureLogError(
  response: Response,
  comboName: string
): Promise<string> {
  const fallback = `[${response.status}] Combo "${comboName}" failed`;
  try {
    const body = await response.clone().json();
    const message = body?.error?.message;
    return typeof message === "string" && message.trim()
      ? `[${response.status}] ${message.trim()}`
      : fallback;
  } catch {
    return fallback;
  }
}
