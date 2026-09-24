type RequestToolIdentity = { namespace: string; name: string };

function asRequestToolIdentity(value: unknown): RequestToolIdentity | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const { namespace, name } = value as Record<string, unknown>;
  return typeof namespace === "string" && namespace && typeof name === "string" && name
    ? { namespace, name }
    : null;
}

// #8295's `flattenNamespaceToolName` folds a declared `type:"namespace"` tool
// group onto the Chat wire as `${nsName}__${leaf}`, always prefixed with the
// MCP container convention documented in open-sse/executors/codex/tools.ts
// (`mcp__<server>...`). Gate the split-fallback below on this exact prefix so
// it never misfires on an unrelated flat `type:"function"` tool that merely
// happens to contain `__` in its own name.
const NAMESPACE_TOOL_PREFIX = "mcp__";

/**
 * #12996 — deterministic wire-name fallback for when no per-request identity
 * map entry exists at all (e.g. a follow-up turn in the same Codex/MCP
 * session that relies on `previous_response_id` continuity instead of
 * re-declaring its `type:"namespace"` tools every turn — OmniRoute is a
 * stateless-upstream-by-default proxy for the Responses API, so nothing
 * persists the prior turn's identity map across separate HTTP requests).
 *
 * Recovers `{namespace, name}` by splitting the wire name on its LAST `__`
 * separator, mirroring `flattenNamespaceToolName`'s own construction
 * (`${nsName}__${leaf}`, with leaf never containing its own `__`). Scoped to
 * wire names that start with the `mcp__` namespace-container convention so it
 * cannot attach a spurious `namespace` to a flat, non-namespaced tool that
 * happens to contain `__`.
 *
 * Known gap: a wire name hash-truncated by `flattenNamespaceToolName` (>64
 * chars) loses its `__` boundary and cannot be recovered here.
 */
function splitFlattenedNamespaceWireName(toolName: string): RequestToolIdentity | null {
  if (!toolName.startsWith(NAMESPACE_TOOL_PREFIX)) return null;

  const lastSeparator = toolName.lastIndexOf("__");
  if (lastSeparator <= 0) return null;

  const namespace = toolName.slice(0, lastSeparator);
  const name = toolName.slice(lastSeparator + 2);
  return namespace && name ? { namespace, name } : null;
}

/**
 * Resolve a flattened Chat function name back to the identity declared by the
 * request's Responses namespace tool. The request path supplies this map on
 * the response translation state.
 *
 * Some model-specific tool parsers render the registered `namespace__leaf`
 * wire name as `namespace.leaf`. Accept that spelling only when it matches an
 * identity already present in the request ledger; never infer a namespace by
 * splitting an otherwise unknown tool name outside the narrow `mcp__`
 * fallback below.
 */
export function resolveRequestToolIdentity(identityMap: unknown, toolName: string) {
  if (!toolName) return null;

  const direct =
    identityMap instanceof Map
      ? identityMap.get(toolName)
      : identityMap && typeof identityMap === "object" && !Array.isArray(identityMap)
        ? (identityMap as Record<string, unknown>)[toolName]
        : undefined;
  const directIdentity = asRequestToolIdentity(direct);
  if (directIdentity) return directIdentity;

  const candidates =
    identityMap instanceof Map
      ? identityMap.values()
      : identityMap && typeof identityMap === "object" && !Array.isArray(identityMap)
        ? Object.values(identityMap as Record<string, unknown>)
        : [];
  for (const candidate of candidates) {
    const identity = asRequestToolIdentity(candidate);
    if (identity && `${identity.namespace}.${identity.name}` === toolName) return identity;
  }

  return splitFlattenedNamespaceWireName(toolName);
}
