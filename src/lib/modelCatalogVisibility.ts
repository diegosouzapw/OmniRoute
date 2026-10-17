import { createHiddenModelLookup } from "@/lib/hiddenModelLookup";
import {
  isProviderNodePrefixReserved,
  selectCompatibleNodeForPrefix,
  type CompatibleNodeLike,
} from "@/lib/providerNodePrefixes";

/** One `(provider, modelId)` pair the `PATCH /api/provider-models` visibility toggle writes. */
export type CatalogVisibilityTarget = { provider: string; modelId: string };

/** What the management catalog tells the dashboard about one row's visibility. */
export type CatalogRowVisibility = { modality: string; targets: CatalogVisibilityTarget[] };

type CatalogRowLike = {
  id?: unknown;
  owned_by?: unknown;
  root?: unknown;
  type?: unknown;
  subtype?: unknown;
};

/** Catalog row `type` -> the modality the `/v1/models` builder checks hidden flags under. */
const MODALITY_BY_TYPE: Record<string, string> = {
  embedding: "embeddings",
  image: "images",
  rerank: "rerank",
  audio: "audio",
  moderation: "moderation",
  video: "videos",
  music: "music",
};

/**
 * Extra provider keys the builder also reads hidden flags from (#11300): codex-native
 * models can be hidden from the shared openai-compatible provider page.
 */
const EXTRA_HIDDEN_KEYS: Record<string, string[]> = { codex: ["openai"] };

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Listing identity of a catalog row; the same id can repeat across types. */
export function catalogRowKey(row: CatalogRowLike): string {
  return [row.id, row.type, row.subtype, row.owned_by].map(asString).join("\u0000");
}

export function catalogRowModality(row: CatalogRowLike): string {
  // OpenRouter rows are checked as chat regardless of their output modality.
  if (row.owned_by === "openrouter") return "chat";
  return MODALITY_BY_TYPE[asString(row.type)] ?? "chat";
}

function catalogRowModelId(row: CatalogRowLike): string {
  const root = asString(row.root);
  if (root) return root;
  const id = asString(row.id);
  const owner = asString(row.owned_by);
  return owner && id.startsWith(`${owner}/`) ? id.slice(owner.length + 1) : id;
}

function buildNodeIdByPrefix(nodes: CompatibleNodeLike[]): Map<string, string> {
  const nodeIdByPrefix = new Map<string, string>();
  for (const node of nodes) {
    if (!node.prefix || isProviderNodePrefixReserved(node.prefix)) continue;
    const winner = selectCompatibleNodeForPrefix(nodes, node.prefix);
    if (winner?.id) nodeIdByPrefix.set(node.prefix, winner.id);
  }
  return nodeIdByPrefix;
}

type StoredHiddenEntry = CatalogVisibilityTarget & {
  matches: (provider: string, modelId: string) => boolean;
};

/**
 * Tags the rows of a hidden-inclusive catalog build. `visibleRows` is the regular build:
 * a revealed row missing from it is hidden. Hidden rows report every stored key that
 * hides them (an alias, a canonical id, a node prefix…) so "show" can clear them all;
 * visible rows report the raw provider id a "hide" should be written under.
 */
export function createCatalogVisibilityAnnotator(
  visibleRows: CatalogRowLike[],
  options: {
    nodes: CompatibleNodeLike[];
    getHiddenModels: (modality: string) => ReadonlyMap<string, ReadonlySet<string>>;
  }
): (row: CatalogRowLike) => { hidden?: true; visibility?: CatalogRowVisibility } {
  const visibleKeys = new Set(visibleRows.map(catalogRowKey));
  const nodeIdByPrefix = buildNodeIdByPrefix(options.nodes);
  const storedByModality = new Map<string, StoredHiddenEntry[]>();

  // Built once per modality from the hidden map; only consulted for hidden rows.
  const getStoredEntries = (modality: string): StoredHiddenEntry[] => {
    let entries = storedByModality.get(modality);
    if (entries) return entries;
    entries = [];
    for (const [provider, modelIds] of options.getHiddenModels(modality)) {
      for (const modelId of modelIds) {
        const single = new Map([[provider, new Set([modelId])]]);
        const matches = createHiddenModelLookup(single, options.nodes, modality);
        entries.push({ provider, modelId, matches });
      }
    }
    storedByModality.set(modality, entries);
    return entries;
  };

  return (row) => {
    const owner = asString(row.owned_by);
    if (!owner || owner === "combo") return {};
    const modality = catalogRowModality(row);
    const derived = {
      provider: nodeIdByPrefix.get(owner) ?? owner,
      modelId: catalogRowModelId(row),
    };
    if (!derived.modelId) return {};
    if (visibleKeys.has(catalogRowKey(row))) {
      return { visibility: { modality, targets: [derived] } };
    }
    const keys = [derived.provider, ...(EXTRA_HIDDEN_KEYS[derived.provider] ?? [])];
    const stored = getStoredEntries(modality)
      .filter((entry) => keys.some((key) => entry.matches(key, derived.modelId)))
      .map(({ provider, modelId }) => ({ provider, modelId }));
    return {
      hidden: true,
      visibility: { modality, targets: stored.length > 0 ? stored : [derived] },
    };
  };
}
