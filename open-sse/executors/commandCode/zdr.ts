/**
 * Command Code per-connection Zero Data Retention (ZDR).
 *
 * When a Command Code API-key connection opts in (`providerSpecificData.zdrEnabled === true`),
 * every upstream call — the flat provider endpoint, the /alpha/generate CLI fallback and the
 * key-validation probe — carries `x-cmd-zdr: 1`. Off by default; only a strict boolean `true`
 * enables it (a string "true" does not).
 */
export const COMMAND_CODE_ZDR_HEADER = "x-cmd-zdr";

export function isCommandCodeZdrEnabled(providerSpecificData: unknown): boolean {
  return (
    !!providerSpecificData &&
    typeof providerSpecificData === "object" &&
    (providerSpecificData as Record<string, unknown>).zdrEnabled === true
  );
}

/**
 * Set `x-cmd-zdr: 1` when the connection enables ZDR. Never removes a header the operator
 * configured elsewhere (per-model upstream headers) when ZDR is off, and reuses an existing
 * casing of the header instead of adding a duplicate.
 */
export function applyCommandCodeZdrHeader(
  headers: Record<string, string>,
  providerSpecificData: unknown
): void {
  if (!isCommandCodeZdrEnabled(providerSpecificData)) return;
  const existing = Object.keys(headers).find(
    (name) => name.toLowerCase() === COMMAND_CODE_ZDR_HEADER
  );
  headers[existing ?? COMMAND_CODE_ZDR_HEADER] = "1";
}
