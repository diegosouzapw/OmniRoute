// Request-local execution metadata, not a provider credential or a wire field.
// Symbol keys survive credential object spreads but cannot be supplied through JSON.
const FORCED_EFFORT = Symbol.for("omniroute.forcedReasoningEffort");
const EFFORTS = new Set(["none", "low", "medium", "high", "xhigh", "max", "ultra"]);

export function withReasoningRuleContext<T>(credentials: T, directive: unknown): T {
  if (
    !credentials ||
    typeof credentials !== "object" ||
    !directive ||
    typeof directive !== "object"
  )
    return credentials;
  const rule = directive as Record<string, unknown>;
  if (
    !rule.id ||
    rule.effortMode !== "force" ||
    typeof rule.targetEffort !== "string" ||
    !EFFORTS.has(rule.targetEffort)
  )
    return credentials;
  return { ...credentials, [FORCED_EFFORT]: rule.targetEffort };
}

export function getForcedReasoningEffort(credentials: unknown): string | undefined {
  if (!credentials || typeof credentials !== "object") return undefined;
  return (credentials as { [FORCED_EFFORT]?: string })[FORCED_EFFORT];
}
