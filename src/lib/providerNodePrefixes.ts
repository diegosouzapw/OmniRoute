/**
 * Shared provider-node public-prefix index (#9557).
 *
 * A compatible provider node (openai/anthropic-compatible) can carry an
 * operator-configured public `prefix` (e.g. `vibeproxy`) that the Model
 * Overrides surface must expose instead of the generated
 * `openai-compatible-chat-<uuid>` node id.
 *
 * This module is the single narrow home for that index so both the pricing
 * catalog route and the override route resolve node → prefix / prefix → node
 * consistently. It does one `getProviderNodes()` DB read per call and derives
 * every map from it — no module-global mutable caches, no route-to-route
 * imports.
 *
 * Classification of each configured prefix (mirrors runtime semantics):
 *   - `reserved`: the prefix collides with a built-in registry id/alias
 *     (e.g. `cx` → codex). Such a node must NOT be advertised as a compatible
 *     public target and the prefix must never be canonicalized to that node —
 *     runtime routes reserved prefixes to the built-in provider, so the
 *     override route must too.
 *   - `unique`: a single runtime-routable node owns the prefix. When two or
 *     more nodes share a prefix, the runtime winner is deterministic (first
 *     openai-compatible node by id order, else first anthropic-compatible
 *     node — see `getModelInfo`), and the prefix index selects that same
 *     winner. Only the winner is targetable/displayed under the prefix;
 *     losing nodes are ineligible and never fall back to a node UUID target.
 *   - `ambiguous`: multiple nodes share the prefix but no runtime winner is
 *     selectable (no compatible node matches) — practically unreachable since
 *     only compatible nodes carry prefixes, kept for safety.
 *
 * Model-Overrides eligibility: a compatible node is eligible only when it is
 * the unique, non-reserved winner of its configured prefix (i.e. it is in
 * `eligibleNodeIds`). Reserved/losing/no-public-prefix compatible nodes are
 * ineligible and must be skipped — never surfaced under a generated node UUID.
 * Built-in/no-compatible catalog entries are always eligible.
 */

import { getProviderNodes } from "@/lib/db/providers/nodes";
import {
  getReservedProviderPrefixes,
  isReservedProviderPrefix,
} from "@/shared/constants/reservedProviderPrefixes";

export type ProviderPrefixStatus = "unique" | "ambiguous" | "reserved";

export interface ProviderPrefixEntry {
  prefix: string;
  status: ProviderPrefixStatus;
  /** Present only when `status === "unique"`. */
  nodeId?: string;
}

export interface ProviderPrefixIndex {
  /** prefix → classification entry (every configured prefix). */
  entries: Map<string, ProviderPrefixEntry>;
  /** nodeId → public prefix, only for uniquely-routable non-reserved winners. */
  nodeToPrefix: Map<string, string>;
  /** public prefix → nodeId, only for uniquely-routable non-reserved winners. */
  prefixToNode: Map<string, string>;
  /** Every compatible provider node id present in the node table. */
  compatibleNodeIds: Set<string>;
  /** Compatible node ids eligible for Model Overrides (unique non-reserved winners). */
  eligibleNodeIds: Set<string>;
}

/**
 * Built-in reserved prefixes — registry ids + aliases, the same semantics the
 * runtime `getReservedProviderPrefixes()` uses so user-defined compatible-node
 * prefixes can never shadow a built-in provider.
 */
export function buildReservedPrefixes(): Set<string> {
  return new Set(getReservedProviderPrefixes());
}

export function isProviderNodePrefixReserved(value: unknown): boolean {
  return isReservedProviderPrefix(value);
}

export interface CompatibleNodeLike {
  id?: string;
  type?: string;
  prefix?: string | null;
}

/**
 * Pure prefix→node winner selection replicating the runtime `getModelInfo`
 * rule exactly: the first openai-compatible node (by DB/id order) whose
 * `prefix` matches wins; otherwise the first anthropic-compatible node.
 * `nodes` must already be in the runtime's id-ascending order (as
 * `getProviderNodes` returns).
 */
export function selectCompatibleNodeForPrefix(
  nodes: CompatibleNodeLike[],
  prefix: string
): CompatibleNodeLike | null {
  const openaiMatch = nodes.find((n) => n.type === "openai-compatible" && n.prefix === prefix);
  if (openaiMatch) return openaiMatch;
  return nodes.find((n) => n.type === "anthropic-compatible" && n.prefix === prefix) ?? null;
}

export async function getProviderPrefixIndex(): Promise<ProviderPrefixIndex> {
  const nodes = (await getProviderNodes()) as CompatibleNodeLike[];
  const compatible = nodes.filter(
    (n) => n.type === "openai-compatible" || n.type === "anthropic-compatible"
  );

  const compatibleNodeIds = new Set<string>();
  for (const node of compatible) {
    if (node.id) compatibleNodeIds.add(node.id);
  }

  const byPrefix = new Map<string, CompatibleNodeLike[]>();
  for (const node of compatible) {
    const prefix = node.prefix?.trim();
    if (!node.id || !prefix) continue;
    const list = byPrefix.get(prefix) ?? [];
    list.push(node);
    byPrefix.set(prefix, list);
  }

  const entries = new Map<string, ProviderPrefixEntry>();
  const nodeToPrefix = new Map<string, string>();
  const prefixToNode = new Map<string, string>();
  const eligibleNodeIds = new Set<string>();

  for (const [prefix, prefixNodes] of byPrefix) {
    if (isProviderNodePrefixReserved(prefix)) {
      // Built-in registry id/alias or case-insensitive retired id — never a
      // compatible public target.
      entries.set(prefix, { prefix, status: "reserved" });
      continue;
    }
    const winner = selectCompatibleNodeForPrefix(prefixNodes, prefix);
    if (!winner?.id) {
      entries.set(prefix, { prefix, status: "ambiguous" });
      continue;
    }
    // The runtime-routable winner alone owns the prefix.
    entries.set(prefix, { prefix, status: "unique", nodeId: winner.id });
    nodeToPrefix.set(winner.id, prefix);
    prefixToNode.set(prefix, winner.id);
    eligibleNodeIds.add(winner.id);
  }

  return { entries, nodeToPrefix, prefixToNode, compatibleNodeIds, eligibleNodeIds };
}
