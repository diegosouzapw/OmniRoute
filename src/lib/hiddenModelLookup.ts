import { resolveCanonicalProviderModel } from "@omniroute/open-sse/services/modelCanonicalization.ts";
import { PROVIDER_ID_TO_ALIAS } from "@omniroute/open-sse/config/providerModels.ts";
import { isAdmittedByModelVisibilityAllowlist } from "@/shared/utils/modelVisibility";
import {
  isProviderNodePrefixReserved,
  selectCompatibleNodeForPrefix,
  type CompatibleNodeLike,
} from "./providerNodePrefixes";

type HiddenModels = ReadonlyMap<string, ReadonlySet<string>>;
type AllowedModels = ReadonlyMap<string, ReadonlySet<string>>;

/** Normalize both persisted keys and requests, retaining independent provider/node ownership. */
export function createHiddenModelLookup(
  hiddenModels: HiddenModels,
  nodes: CompatibleNodeLike[] = [],
  modality = "chat",
  modelVisibilityAllowlists: AllowedModels = new Map()
): (provider: string | null | undefined, model: string) => boolean {
  if (hiddenModels.size === 0 && modelVisibilityAllowlists.size === 0) return () => false;
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
  const admittedByProvider = new Map<string, Set<string>>();
  if (modality === "chat") {
    for (const [provider, allowed] of modelVisibilityAllowlists) {
      const key = resolve(provider, "").provider;
      if (!key) continue;
      const entries = admittedByProvider.get(key) || new Set<string>();
      for (const id of allowed) {
        entries.add(id); // raw provider-relative ID is authoritative
        const canonicalModel = resolve(provider, id).model;
        if (canonicalModel) entries.add(canonicalModel);
      }
      admittedByProvider.set(key, entries);
    }
  }
  return (provider, model) => {
    const target = resolve(provider, model);
    if (!target.provider || !target.model) return false;
    const hidden = normalized.get(target.provider);
    if (hidden?.has(target.model)) return true;
    const tier = target.model.match(/-(?:none|low|medium|high|xhigh|max)$/);
    if (tier && hidden?.has(target.model.slice(0, -tier[0].length))) return true;
    const allowed = admittedByProvider.get(target.provider);
    return !isAdmittedByModelVisibilityAllowlist(target.model, allowed);
  };
}
