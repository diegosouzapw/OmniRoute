import { resolveCanonicalProviderModel } from "@omniroute/open-sse/services/modelCanonicalization.ts";
import { PROVIDER_ID_TO_ALIAS } from "@omniroute/open-sse/config/providerModels.ts";
import {
  isProviderNodePrefixReserved,
  selectCompatibleNodeForPrefix,
  type CompatibleNodeLike,
} from "./providerNodePrefixes";

type HiddenModels = ReadonlyMap<string, ReadonlySet<string>>;

/** Normalize both persisted keys and requests, retaining independent provider/node ownership. */
export function createHiddenModelLookup(
  hiddenModels: HiddenModels,
  nodes: CompatibleNodeLike[] = [],
  modality = "chat"
): (provider: string | null | undefined, model: string) => boolean {
  if (hiddenModels.size === 0) return () => false;
  const nodeByPrefix = new Map<string, string>();
  for (const node of nodes) {
    if (!node.prefix || isProviderNodePrefixReserved(node.prefix)) continue;
    const winner = selectCompatibleNodeForPrefix(nodes, node.prefix);
    if (winner?.id) nodeByPrefix.set(node.prefix, winner.id);
  }
  const resolve = (provider: string | null | undefined, model: string) => {
    const identity = nodeByPrefix.get(provider || "") || provider;
    const resolved = resolveCanonicalProviderModel(identity, model);
    // Stored/resolved IDs are authoritative: e.g. opencode (oc) and opencode-zen
    // are distinct, even though the public opencode/ prefix redirects to the latter.
    const canonical = identity && identity in PROVIDER_ID_TO_ALIAS ? identity : resolved.provider;
    return { provider: canonical, model: modality === "chat" ? resolved.model : model };
  };
  const normalized = new Map<string, Set<string>>();
  for (const [provider, models] of hiddenModels) {
    for (const model of models) {
      const target = resolve(provider, model);
      if (!target.provider || !target.model) continue;
      const entries = normalized.get(target.provider) || new Set<string>();
      entries.add(target.model);
      normalized.set(target.provider, entries);
    }
  }
  return (provider, model) => {
    const target = resolve(provider, model);
    return Boolean(
      target.provider && target.model && normalized.get(target.provider)?.has(target.model)
    );
  };
}
