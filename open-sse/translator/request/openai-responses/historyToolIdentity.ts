import { toRecord, toString } from "./helpers.ts";
import { flattenNamespaceToolName } from "./namespaceFlatten.ts";

type ToolIdentity = { namespace: string; name: string };

function collectHistoricalIdentities(input: unknown[]): Map<string, ToolIdentity> {
  const identities = new Map<string, ToolIdentity>();
  for (const value of input) {
    const item = toRecord(value);
    if (item.type !== "function_call" || !toString(item.call_id).trim()) continue;
    const namespace = toString(item.namespace);
    const name = toString(item.name).trim();
    if (!namespace.trim() || !name) continue;

    const wireName = flattenNamespaceToolName(namespace, name);
    const previous = identities.get(wireName);
    // The already-qualified-leaf exception can make two explicit identities
    // share a wire name. Preserve that ambiguity instead of picking by order.
    const ambiguous = previous && (previous.namespace !== namespace || previous.name !== name);
    identities.set(wireName, ambiguous ? { namespace: "", name: wireName } : { namespace, name });
  }
  return identities;
}

/**
 * Recover identity evidence carried by this request's own function-call history.
 * Current namespace declarations win. Empty namespace entries explicitly retain
 * a flat/ambiguous wire name and suppress response-side guessing; this ledger is
 * transient metadata, never a tool declaration or cross-request cache.
 */
export function mergeHistoricalToolIdentities(
  current: Map<string, ToolIdentity>,
  input: unknown[],
  tools: unknown[]
): void {
  const historical = collectHistoricalIdentities(input);
  if (historical.size === 0) return;

  const currentNamespaceNames = new Set(current.keys());
  for (const [wireName, identity] of historical) {
    if (!current.has(wireName)) current.set(wireName, identity);
  }
  for (const value of tools) {
    const tool = toRecord(value);
    if (!tool.function && tool.type !== "function" && tool.type !== "custom") continue;
    const name = toString(toRecord(tool.function).name) || toString(tool.name);
    if (name && !currentNamespaceNames.has(name)) {
      current.set(name, { namespace: "", name });
    }
  }
}
