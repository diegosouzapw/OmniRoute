/** * Resolve a flattened Chat function name back to the identity declared by the * request's Responses namespace tool. The request path supplies this map on * the response translation state; this resolver intentionally never parses a name. */ export function resolveRequestToolIdentity(
  identityMap: unknown,
  toolName: string
) {
  if (!toolName || !identityMap) return null;
  const identity =
    identityMap instanceof Map
      ? identityMap.get(toolName)
      : typeof identityMap === "object" && !Array.isArray(identityMap)
        ? (identityMap as Record<string, unknown>)[toolName]
        : undefined;
  if (!identity || typeof identity !== "object" || Array.isArray(identity)) return null;
  const { namespace, name } = identity as Record<string, unknown>;
  return typeof namespace === "string" && namespace && typeof name === "string" && name
    ? { namespace, name }
    : null;
}
