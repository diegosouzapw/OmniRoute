/**
 * Provider-node listings for the memory Embedding / Rerank selectors, derived
 * from the models each `provider_nodes` row actually exposes.
 *
 * The two selector endpoints (`GET /api/memory/embedding-providers` and
 * `GET /api/memory/rerank-providers`) used to append local provider nodes by
 * `apiType` alone and always with an empty model list — a node typed
 * `embeddings` that also serves a rerank model (one TEI / Infinity / vLLM box
 * hosting both `bge-m3` and `bge-reranker-v2-m3` is the common self-hosted
 * layout) never appeared in the Rerank dropdown at all, and in the Embedding
 * dropdown it appeared as a provider with nothing to pick. Typing the
 * `prefix/model` id by hand worked, because the request path resolves it
 * directly; only the convenience layer was blind.
 *
 * This module builds the listing from the node's synced + custom model rows,
 * typing each row the same way `GET /v1/models` does: an explicit
 * `supportedEndpoints` wins, otherwise the node's `apiType` decides. A node is
 * listed for a modality when its `apiType` matches, when it is a generic
 * chat/responses node (which can expose that endpoint even without a catalog —
 * the historical behaviour), or when any of its rows is typed for the modality.
 */

import { getCachedProviderNodes } from "@/lib/db/readCache";
import { getAllActiveSyncedModels } from "@/lib/db/models/activeSyncedCatalog";
import { getAllCustomModels } from "@/lib/db/models";
import { defaultEndpointsForProviderNodeApiType } from "@/shared/constants/modelSupportedEndpoints";
import type { EmbeddingProviderListing } from "./types";

export type NodeListingModality = "embeddings" | "rerank";

export interface ProviderNodeListingRow {
  id?: string;
  prefix?: string;
  baseUrl?: string;
  apiType?: string;
}

export interface ProviderNodeModelRow {
  id?: string;
  name?: string;
  supportedEndpoints?: unknown;
}

/** apiTypes that are listed for a modality even when the node has no catalog. */
const IMPLICIT_API_TYPES: Record<NodeListingModality, ReadonlySet<string>> = {
  embeddings: new Set(["chat", "responses", "embeddings"]),
  rerank: new Set(["chat", "responses", "rerank"]),
};

function rowEndpoints(row: ProviderNodeModelRow, nodeApiType: string | undefined): string[] {
  return Array.isArray(row.supportedEndpoints)
    ? row.supportedEndpoints.filter((e): e is string => typeof e === "string")
    : defaultEndpointsForProviderNodeApiType(nodeApiType);
}

interface TypedRow {
  id: string;
  name: string;
  endpoints: string[];
}

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function validRows(
  rows: ProviderNodeModelRow[] | undefined
): (ProviderNodeModelRow & { id: string })[] {
  if (!Array.isArray(rows)) return [];
  return rows.filter(
    (row): row is ProviderNodeModelRow & { id: string } =>
      !!row && typeof row === "object" && typeof row.id === "string" && row.id !== ""
  );
}

/**
 * Merge a node's synced and custom rows on id, exactly as in /v1/models: a custom
 * row's explicit `supportedEndpoints` re-types the model (a manual `["rerank"]`
 * override on a discovered row must win over the node default); a custom row
 * without one only contributes its name.
 */
function mergeNodeRows(
  apiType: string,
  synced: ProviderNodeModelRow[] | undefined,
  custom: ProviderNodeModelRow[] | undefined
): Map<string, TypedRow> {
  const rows = new Map<string, TypedRow>();
  for (const row of validRows(synced)) {
    rows.set(row.id, {
      id: row.id,
      name: str(row.name) || row.id,
      endpoints: rowEndpoints(row, apiType),
    });
  }
  for (const row of validRows(custom)) {
    const existing = rows.get(row.id);
    const explicit = Array.isArray(row.supportedEndpoints);
    rows.set(row.id, {
      id: row.id,
      name: str(row.name) || existing?.name || row.id,
      endpoints: explicit || !existing ? rowEndpoints(row, apiType) : existing.endpoints,
    });
  }
  return rows;
}

/** A usable node prefix: non-empty, no path or whitespace characters. */
function nodePrefix(node: ProviderNodeListingRow): string | null {
  const prefix = str(node.prefix);
  if (!prefix || !str(node.baseUrl) || prefix.includes("/") || prefix.includes(" ")) return null;
  return prefix;
}

/** The listing for one node, or `null` when it has nothing for `modality`. */
function nodeListing(
  modality: NodeListingModality,
  node: ProviderNodeListingRow,
  prefix: string,
  syncedByNodeId: Record<string, ProviderNodeModelRow[] | undefined>,
  customByNodeId: Record<string, ProviderNodeModelRow[] | undefined>
): EmbeddingProviderListing | null {
  const apiType = str(node.apiType).trim().toLowerCase();
  const nodeId = str(node.id);
  const rows = mergeNodeRows(apiType, syncedByNodeId[nodeId], customByNodeId[nodeId]);
  const typed = [...rows.values()].filter((row) => row.endpoints.includes(modality));
  if (typed.length === 0 && !IMPLICIT_API_TYPES[modality].has(apiType)) return null;
  return {
    provider: prefix,
    hasKey: true, // local provider nodes carry their own credential (or none)
    models: typed.map((m) => ({ id: `${prefix}/${m.id}`, name: m.name, dimensions: null })),
  };
}

/**
 * Pure selection step: which nodes are listed for `modality`, and with which
 * models. Exported for tests; the async loader below feeds it from the DB.
 */
export function buildProviderNodeModalityListings(
  modality: NodeListingModality,
  nodes: ProviderNodeListingRow[],
  syncedByNodeId: Record<string, ProviderNodeModelRow[] | undefined>,
  customByNodeId: Record<string, ProviderNodeModelRow[] | undefined>
): EmbeddingProviderListing[] {
  const result: EmbeddingProviderListing[] = [];
  const seenPrefixes = new Set<string>();

  for (const node of nodes) {
    const prefix = nodePrefix(node);
    if (!prefix || seenPrefixes.has(prefix)) continue;
    const listing = nodeListing(modality, node, prefix, syncedByNodeId, customByNodeId);
    if (!listing) continue;
    seenPrefixes.add(prefix);
    result.push(listing);
  }

  return result;
}

/**
 * Load provider nodes plus their synced/custom model rows and build the
 * listings for `modality`. Best-effort: any storage failure yields `[]` so the
 * selector endpoints still return the curated providers.
 */
export async function listProviderNodeModalityListings(
  modality: NodeListingModality
): Promise<EmbeddingProviderListing[]> {
  try {
    const nodes = (await getCachedProviderNodes()) as unknown as ProviderNodeListingRow[];
    if (!Array.isArray(nodes) || nodes.length === 0) return [];

    let synced: Record<string, ProviderNodeModelRow[] | undefined> = {};
    try {
      synced = (await getAllActiveSyncedModels()) as Record<string, ProviderNodeModelRow[]>;
    } catch {
      synced = {};
    }
    let custom: Record<string, ProviderNodeModelRow[] | undefined> = {};
    try {
      const raw = (await getAllCustomModels()) as Record<string, unknown>;
      for (const [providerId, rows] of Object.entries(raw)) {
        if (Array.isArray(rows)) custom[providerId] = rows as ProviderNodeModelRow[];
      }
    } catch {
      custom = {};
    }

    return buildProviderNodeModalityListings(modality, nodes, synced, custom);
  } catch {
    return [];
  }
}
