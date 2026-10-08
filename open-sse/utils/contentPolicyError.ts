/** Exact upstream refusal identifiers, not text heuristics or account-health signals. */
export function isContentPolicyRefusal(error?: { code?: unknown; type?: unknown } | null): boolean {
  return [error?.code, error?.type].some(
    (value) =>
      typeof value === "string" &&
      ["cyber_policy", "content_policy_violation"].includes(value.toLowerCase())
  );
}
