/**
 * Request-scoped, privacy-safe routing observations. These helpers never
 * select, exclude, or persist anything: callers may use them around existing
 * routing transitions without changing their behaviour.
 */
function accountPrefix(value: string): string {
  return value.slice(0, 8);
}

export function summarizeAccountRouting(input: {
  correlationId: string;
  provider: unknown;
  model: unknown;
  candidateConnectionIds: readonly unknown[];
  attemptedConnectionIds: ReadonlySet<string>;
  excludedConnectionIds?: readonly unknown[];
}) {
  const candidateIds = input.candidateConnectionIds.filter(
    (value): value is string => typeof value === "string" && value.trim().length > 0
  );
  const excluded = (input.excludedConnectionIds || []).filter(
    (value): value is string => typeof value === "string" && value.trim().length > 0
  );
  const eligibleUnattemptedIds = candidateIds.filter(
    (id) => !input.attemptedConnectionIds.has(id) && !excluded.includes(id)
  );
  return {
    event: "routing_account_scope",
    correlationId: input.correlationId,
    provider: typeof input.provider === "string" ? input.provider : "unknown",
    model: typeof input.model === "string" ? input.model : "unknown",
    candidateAccountPrefixes: candidateIds.map(accountPrefix),
    attemptedAccountPrefixes: [...input.attemptedConnectionIds].map(accountPrefix),
    excludedAccountPrefixes: excluded.map(accountPrefix),
    candidateCount: candidateIds.length,
    attemptedCount: input.attemptedConnectionIds.size,
    excludedCount: excluded.length,
    eligibleUnattemptedCount: eligibleUnattemptedIds.length,
  };
}

export function nextRoutingTransition(input: {
  sameProvider: boolean;
  sameModel: boolean;
  retryableAccountFailure: boolean;
  eligibleUnattemptedCount: number;
}) {
  const hasEligibleUnattemptedAccount = input.eligibleUnattemptedCount > 0;
  return {
    transition:
      input.sameProvider && input.sameModel ? "next_account_same_model" : "next_combo_target",
    event: "routing_account_scope",
    invariantViolation: Boolean(
      input.retryableAccountFailure && !input.sameModel && hasEligibleUnattemptedAccount
    ),
  } as const;
}
