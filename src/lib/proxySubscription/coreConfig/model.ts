/**
 * Core-agnostic generation model: what OmniRoute owns (local listeners,
 * selector groups, node tags) — never how a protocol is translated.
 *
 * It doesn't model outbound protocol payloads: each node carries its
 * original definition untouched (`source`), and a renderer passes it through
 * verbatim or skips it with a reason.
 */
import { createHash } from "node:crypto";
import type { NeedsCoreNode, NodeSource, SubscriptionNode } from "../parse";
import { isLocalCoreEndpointAllowed } from "../coreEndpoint";
import { parseSelectorTag, stripSelectorSuffix } from "../selectorEndpoint";

/** Prefix marking every tag this generator owns (listeners, groups, nodes). */
export const OWNED_TAG_PREFIX = "omniroute-";

export interface CoreListener {
  tag: string;
  scheme: "socks5" | "http" | "https";
  host: string;
  port: number;
  group: string;
}

export interface CoreGroup {
  tag: string;
  members: string[];
}

export interface CoreNode {
  tag: string;
  source: NodeSource;
}

export interface CoreModel {
  listeners: CoreListener[];
  groups: CoreGroup[];
  nodes: CoreNode[];
  skipped: Array<{ line?: string; node?: string; reason: string }>;
}

function hashSlotFallback(name: string, slots: number): number {
  const digest = createHash("sha256").update(name, "utf8").digest();
  return digest.readUInt32BE(0) % slots;
}

function displayLabel(name: unknown): string {
  return (typeof name === "string" ? name.normalize("NFC") : "") || "node";
}

const IDENTITY_SUFFIX_LENGTH = 6;

function firstPresent(value: unknown): string {
  return typeof value === "string" && value ? value : "";
}

function canonicalFields(
  type: string,
  server: string,
  port: number,
  identity: string,
  transport: string,
  security: string
): string {
  return [type, server, String(port), identity, transport, security].join("\x1f");
}

function numericField(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.trunc(value) : 0;
}

function objectPort(value: Record<string, unknown>): number {
  return numericField(value.port) || numericField(value.server_port);
}

function objectCredential(value: Record<string, unknown>): string {
  return (
    firstPresent(value.uuid) ||
    firstPresent(value.password) ||
    firstPresent(value.token) ||
    firstPresent(value.username)
  );
}

function identityFromObject(value: Record<string, unknown>): string | null {
  const type = typeof value.type === "string" ? value.type.toLowerCase().trim() : "";
  const serverRaw = typeof value.server === "string" ? value.server : "";
  const server = serverRaw.trim().toLowerCase().normalize("NFC");
  const port = objectPort(value);
  const identity = objectCredential(value);
  const transport = (firstPresent(value.transport) || firstPresent(value.network)).toLowerCase();
  const security = (firstPresent(value.security) || firstPresent(value.tls)).toLowerCase();
  if (!type && !server && port === 0 && !identity) return null;
  return createHash("sha256")
    .update(canonicalFields(type, server, port, identity, transport, security), "utf8")
    .digest("hex");
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function uriCredential(url: URL): string {
  if (url.username) return safeDecode(url.username);
  if (url.password) return safeDecode(url.password);
  if (url.hash) return safeDecode(url.hash.replace(/^#/, ""));
  return "";
}

function identityFromUri(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  const type = url.protocol.replace(/:$/, "").toLowerCase();
  const server = url.hostname.trim().toLowerCase().normalize("NFC");
  const port = url.port ? Number(url.port) || 0 : 0;
  const identity = uriCredential(url);
  const transport = (url.searchParams.get("type") ?? "").toLowerCase();
  const security = (url.searchParams.get("security") ?? "").toLowerCase();
  if (!type && !server && port === 0 && !identity) return null;
  return createHash("sha256")
    .update(canonicalFields(type, server, port, identity, transport, security), "utf8")
    .digest("hex");
}

function nodeIdentity(source: NodeSource): string | null {
  if (!source) return null;
  if (source.kind === "object") {
    if (!source.value || typeof source.value !== "object") return null;
    return identityFromObject(source.value as Record<string, unknown>);
  }
  if (source.kind === "uri") {
    if (typeof source.value !== "string") return null;
    return identityFromUri(source.value);
  }
  return null;
}

function rendezvousGroup(identity: string, groups: string[]): string {
  let best = groups[0];
  let bestScore = "";
  for (const group of groups) {
    const score = createHash("sha256").update(`${identity}\x1f${group}`, "utf8").digest("hex");
    if (score > bestScore) {
      bestScore = score;
      best = group;
    }
  }
  return best;
}

function uniqueTag(base: string, taken: Set<string>): string {
  if (!taken.has(base)) {
    taken.add(base);
    return base;
  }
  let i = 2;
  while (taken.has(`${base}-${i}`)) i += 1;
  const tag = `${base}-${i}`;
  taken.add(tag);
  return tag;
}

function listenerPort(url: URL, scheme: "socks5" | "http" | "https"): number {
  const port = Number(url.port);
  if (port > 0) return port;
  return scheme === "https" ? 443 : scheme === "http" ? 80 : 1080;
}

function listenerFromLine(
  line: string,
  index: number,
  skipped: CoreModel["skipped"]
): CoreListener | null {
  const tag = parseSelectorTag(line);
  if (!tag) {
    skipped.push({ line, reason: "no_selector_tag" });
    return null;
  }
  const bare = stripSelectorSuffix(line);
  if (!isLocalCoreEndpointAllowed(bare)) {
    skipped.push({ line, reason: "invalid_endpoint" });
    return null;
  }
  let url: URL;
  try {
    url = new URL(bare);
  } catch {
    skipped.push({ line, reason: "invalid_endpoint" });
    return null;
  }
  const scheme = url.protocol === "https:" ? "https" : url.protocol === "http:" ? "http" : "socks5";
  const group = `${OWNED_TAG_PREFIX}${tag}`;
  return {
    tag: `${OWNED_TAG_PREFIX}in-${tag}-${index}`,
    scheme,
    host: url.hostname,
    port: listenerPort(url, scheme),
    group,
  };
}

function assignNodes(
  nodes: Array<SubscriptionNode | NeedsCoreNode>,
  groups: string[],
  groupMembers: Map<string, CoreNode[]>,
  skipped: CoreModel["skipped"]
): CoreNode[] {
  const taken = new Set<string>();
  const coreNodes: CoreNode[] = [];
  for (const node of nodes) {
    const source = node.source;
    if (!source) {
      skipped.push({ node: node.name, reason: "no_source" });
      continue;
    }
    const identity = nodeIdentity(source);
    const display = displayLabel(node.name);
    let tag: string;
    if (identity) {
      const suffixed = `${display}-${identity.slice(0, IDENTITY_SUFFIX_LENGTH)}`;
      if (!taken.has(suffixed)) {
        taken.add(suffixed);
        tag = suffixed;
      } else {
        tag = uniqueTag(suffixed, taken);
      }
    } else {
      tag = uniqueTag(display, taken);
    }
    coreNodes.push({ tag, source });
    const group = identity
      ? rendezvousGroup(identity, groups)
      : groups[hashSlotFallback(display, groups.length)];
    groupMembers.get(group)!.push({ tag, source });
  }
  return coreNodes;
}

/**
 * Build the generation model from local-core lines and parsed nodes.
 *
 * `entries` are the already-split `localCoreEndpoint` lines (one per line).
 * Lines without a `selector=` suffix or with a disallowed endpoint land in
 * `skipped`; every other line becomes one listener. Lines sharing a selector
 * tag form one group. Each node with a `source` joins exactly one group by
 * rendezvous hashing on its definition identity, so removing a group only
 * moves that group's members and adding a node never moves the others.
 * Without any group the model stays empty: nodes are neither rendered nor
 * listed, and the renderer emits nothing owned.
 */
export function buildCoreModel(
  entries: string[],
  nodes: Array<SubscriptionNode | NeedsCoreNode>
): CoreModel {
  const skipped: CoreModel["skipped"] = [];
  const listeners: CoreListener[] = [];
  const groupTags = new Map<string, string>();
  const groupMembers = new Map<string, CoreNode[]>();

  entries.forEach((raw, index) => {
    const line = typeof raw === "string" ? raw.trim() : "";
    if (!line) return;
    const listener = listenerFromLine(line, index, skipped);
    if (!listener) return;
    // Key on the bare selector tag: listener.group carries the owned prefix,
    // so testing the prefixed form here would never hit and reset the member
    // list on every line sharing a selector.
    if (!groupTags.has(parseSelectorTag(line)!)) {
      groupTags.set(parseSelectorTag(line)!, listener.group);
      groupMembers.set(listener.group, []);
    }
    listeners.push(listener);
  });

  const groups = [...groupTags.entries()]
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .map(([, tag]) => tag);
  if (groups.length === 0) return { listeners: [], groups: [], nodes: [], skipped };

  const coreNodes = assignNodes(nodes, groups, groupMembers, skipped);
  for (const tag of groups) {
    if ((groupMembers.get(tag) ?? []).length === 0) {
      skipped.push({ node: tag, reason: "empty_group" });
    }
  }

  return {
    listeners,
    groups: groups.map((tag) => ({
      tag,
      members: (groupMembers.get(tag) ?? []).map((n) => n.tag),
    })),
    nodes: coreNodes,
    skipped,
  };
}
