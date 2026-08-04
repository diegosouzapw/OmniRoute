/**
 * Pure, dependency-free helpers for detecting proxy nodes that require a
 * local proxy core (sing-box / clash).
 *
 * Extracted from the SubscriptionTab UI so the rule is unit-testable without
 * React / DOM. The redacted node summary (from `parse.redactedNodeSummary`)
 * carries `type` for directly-usable nodes (http/https/socks5) and only
 * `rawProtocol` for nodes that need a local core.
 */

export const NEEDS_CORE_PROTOCOLS = new Set<string>([
  "ss",
  "vmess",
  "trojan",
  "vless",
  "tuic",
  "hysteria",
  "wireguard",
]);

/**
 * Whether a redacted node summary represents a node that OmniRoute cannot
 * forward directly and therefore needs a local sing-box / clash core.
 *
 * A node needs a core when it has no usable `type` (i.e. it is not a direct
 * http/https/socks5 node) and its `rawProtocol` is one of the core protocols.
 */
export function isNeedsCoreNode(n: unknown): boolean {
  if (!n || typeof n !== "object") return false;
  const r = n as Record<string, unknown>;
  if (typeof r.type === "string") return false; // directly-usable node
  return typeof r.rawProtocol === "string" && NEEDS_CORE_PROTOCOLS.has(r.rawProtocol);
}

/** Count how many of the given redacted node summaries need a local core. */
export function countNeedsCoreNodes(nodes: unknown[] | null | undefined): number {
  if (!Array.isArray(nodes)) return 0;
  let count = 0;
  for (const n of nodes) if (isNeedsCoreNode(n)) count += 1;
  return count;
}
