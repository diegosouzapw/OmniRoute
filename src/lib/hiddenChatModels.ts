import { getHiddenModelsByProvider } from "./db/models";
import { getCachedProviderNodes } from "./db/readCache";
import {
  isProviderNodePrefixReserved,
  selectCompatibleNodeForPrefix,
} from "./providerNodePrefixes";

/** One DB visibility snapshot, shared by nested combos and their target filters. */
export async function getHiddenChatModels(): Promise<Map<string, Set<string>>> {
  const hidden = getHiddenModelsByProvider("chat");
  if (hidden.size === 0) return hidden;
  const nodes = (await getCachedProviderNodes()).flatMap((node) => {
    if (!node || typeof node.id !== "string" || typeof node.type !== "string") return [];
    return [
      {
        id: node.id,
        type: node.type,
        prefix: typeof node.prefix === "string" ? node.prefix : null,
      },
    ];
  });
  for (const node of nodes) {
    const prefix = typeof node?.prefix === "string" ? node.prefix : "";
    if (!prefix || isProviderNodePrefixReserved(prefix)) continue;
    const winner = selectCompatibleNodeForPrefix(nodes, prefix);
    if (!winner?.id) continue;
    const models = new Set([...(hidden.get(prefix) || []), ...(hidden.get(winner.id) || [])]);
    if (models.size === 0) continue;
    hidden.set(prefix, models);
    hidden.set(winner.id, models);
  }
  return hidden;
}
