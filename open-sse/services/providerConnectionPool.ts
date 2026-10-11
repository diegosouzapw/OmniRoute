import { nodeTypeFromId } from "@/lib/db/providerNodeSelect";
import { getCachedProviderConnections, getCachedProviderNodes } from "@/lib/db/readCache";
import { isCommonChatGptWebRetiredProviderId } from "@/shared/constants/chatgptWebRetirement";
import { getProviderById, getProviderAlias, resolveProviderId } from "@/shared/constants/providers";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

const PROVIDER_SEARCH_PAIRS: string[][] = [
  ["nvidia", "nvidia_nim"],
  ["kimi-coding", "kimi-coding-apikey"],
  // The model layer canonicalizes `agy/` to `antigravity`, but the Antigravity
  // CLI card stores its connection under `agy`. Same account, either id serves.
  ["antigravity", "agy"],
  // One Jina token works on api.jina.ai, r.jina.ai, and s.jina.ai.
  // Requested id stays first so embed/rerank do not silently pick a
  // Reader-only row when both cards are filled. jina-search has no
  // dashboard card — it must still see jina-ai / jina-reader keys
  // before falling through to JINA_AI_API_KEY.
  ["jina-ai", "jina-reader", "jina-search"],
];
/** Resolve provider aliases (e.g., nvidia -> nvidia_nim) for DB lookup. */
export async function getProviderSearchPool(provider: string): Promise<string[]> {
  const canonicalProvider = resolveProviderId(provider);
  const canonicalAlias = getProviderAlias(canonicalProvider);
  if (isCommonChatGptWebRetiredProviderId(provider)) return [];
  const group = PROVIDER_SEARCH_PAIRS.find((aliases) => aliases.includes(provider));
  if (group) return [provider, ...group.filter((id) => id !== provider)];

  const searchPool = new Set([provider, canonicalProvider, canonicalAlias].filter(Boolean));

  // Built-in providers already resolve through static ids/aliases. Only
  // compatible/custom providers need provider_nodes expansion back to the
  // generated internal connection ids. (#3058)
  if (getProviderById(canonicalProvider)) {
    return Array.from(searchPool);
  }

  // Custom provider nodes are referenced by user-facing prefixes in combos
  // (for example "78code/gpt-5.4"), but live credentials are stored under
  // internal provider ids like openai-compatible-responses-<uuid>.
  try {
    const providerNodes = await getCachedProviderNodes();
    const compatibleNodes = Array.isArray(providerNodes) ? providerNodes : [];
    const nodeTypes = new Map<string, number>();
    for (const node of compatibleNodes) {
      const nodeRecord = asRecord(node);
      const nodeId = typeof nodeRecord.id === "string" ? nodeRecord.id.trim() : "";
      if (!nodeId) continue;
      const derivedType = nodeTypeFromId(nodeId);
      nodeTypes.set(derivedType, (nodeTypes.get(derivedType) || 0) + 1);
    }

    for (const node of compatibleNodes) {
      const nodeRecord = asRecord(node);
      const nodePrefix = typeof nodeRecord.prefix === "string" ? nodeRecord.prefix.trim() : "";
      const nodeId = typeof nodeRecord.id === "string" ? nodeRecord.id.trim() : "";
      if (!nodeId) continue;
      if (
        nodePrefix &&
        (nodePrefix === provider ||
          nodePrefix === canonicalProvider ||
          nodePrefix === canonicalAlias)
      ) {
        searchPool.add(nodeId);
      }

      // #10085: bridge the concrete uuid node id (what the chat path resolves,
      // "<generic-type>-<uuid>") to the GENERIC derived type id (what
      // resolveProviderNodeForConnection also accepts for connection creation,
      // #4421) -- and back. A connection created via the bare generic type
      // (e.g. "openai-compatible-chat") must still be found when the chat path
      // looks up the concrete node id, and vice versa.
      //
      // #10434: both bridging directions MUST require the derived type to be
      // unambiguous (exactly one provider node of that type) before falling
      // back to a generic-type match -- an explicit ownership check, not just
      // a string-format coincidence. This mirrors the exact rule already
      // enforced by selectProviderNodeForConnection() for connection CREATION
      // (src/lib/db/providerNodeSelect.ts, #4421): "only when exactly one such
      // node exists, so an ambiguous type never silently picks the wrong
      // node". Without this guard on the generic->concrete direction, a bare
      // generic-type lookup would pool in EVERY node sharing that derived
      // type, including a connection scoped (via its own providerSpecificData
      // baseUrl/headers) to one specific node -- leaking that node's
      // credentials/upstream URL into a lookup for a different, unrelated
      // node of the same generic type.
      const derivedType = nodeTypeFromId(nodeId);
      if (derivedType && derivedType !== nodeId) {
        const typeIsUnambiguous = nodeTypes.get(derivedType) === 1;
        if (typeIsUnambiguous) {
          if (nodeId === provider || nodeId === canonicalProvider || nodeId === canonicalAlias) {
            searchPool.add(derivedType);
          }
          if (
            derivedType === provider ||
            derivedType === canonicalProvider ||
            derivedType === canonicalAlias
          ) {
            searchPool.add(nodeId);
          }
        }
      }
    }
  } catch {
    // Best-effort alias expansion only.
  }

  return Array.from(searchPool);
}

/** Resolve the same account pool as direct auth, keeping the existing DB cache. */
export async function getCachedProviderPoolConnections(
  filter?: Record<string, unknown>
): Promise<unknown[]> {
  if (typeof filter?.provider !== "string") return getCachedProviderConnections(filter);
  const providers = await getProviderSearchPool(filter.provider);
  const results = await Promise.all(
    providers.map((provider) => getCachedProviderConnections({ ...filter, provider }))
  );
  const seen = new Set<string>();
  return results.flat().filter((connection) => {
    const id = asRecord(connection).id;
    if (typeof id !== "string" || !id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}
