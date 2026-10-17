// Paid-plan guard shared by hosted tools and the state-independent Images transport.
export function isCodexFreePlan(providerSpecificData: unknown): boolean {
  if (!providerSpecificData || typeof providerSpecificData !== "object") return false;
  const data = providerSpecificData as {
    workspacePlanType?: unknown;
    chatgptPlanType?: unknown;
  };
  const plan =
    typeof data.workspacePlanType === "string"
      ? data.workspacePlanType
      : data.chatgptPlanType;
  return typeof plan === "string" && plan.trim().toLowerCase() === "free";
}
