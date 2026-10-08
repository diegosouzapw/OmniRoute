/** Both existing controls must explicitly opt this Codex connection out of local quota filtering. */
export function isCodexQuotaFilteringDisabled(
  provider: string | null | undefined,
  providerSpecificData: unknown
): boolean {
  if (
    provider !== "codex" ||
    !providerSpecificData ||
    typeof providerSpecificData !== "object" ||
    Array.isArray(providerSpecificData)
  ) {
    return false;
  }
  const data = providerSpecificData as Record<string, unknown>;
  const policy = data.limitPolicy;
  return (
    data.quotaPreflightEnabled === false &&
    !!policy &&
    typeof policy === "object" &&
    !Array.isArray(policy) &&
    (policy as Record<string, unknown>).enabled === false
  );
}
