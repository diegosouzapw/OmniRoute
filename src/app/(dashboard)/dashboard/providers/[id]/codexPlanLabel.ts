/**
 * Codex subscription plan label (e.g. "Plus", "Pro", "Team"), persisted on the
 * connection's providerSpecificData.chatgptPlanType at OAuth import time (see
 * src/lib/oauth/services/codexImport.ts). Returns "" when the connection is
 * not Codex or the value is missing/blank — callers gate rendering on that.
 *
 * Kept in its own module (not providerPageHelpers.ts) because that file is
 * frozen at its file-size ratchet cap (config/quality/file-size-baseline.json)
 * and this helper is fully self-contained.
 */
export function getCodexPlanLabel(isCodex: boolean, providerSpecificData: unknown): string {
  if (!isCodex) return "";
  const record =
    providerSpecificData && typeof providerSpecificData === "object"
      ? (providerSpecificData as Record<string, unknown>)
      : {};
  const raw = record.chatgptPlanType;
  return typeof raw === "string" ? raw.trim() : "";
}
