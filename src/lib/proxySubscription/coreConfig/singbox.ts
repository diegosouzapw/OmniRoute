/**
 * sing-box renderer: merges the generation model into owned sections only.
 *
 * Owned = any `inbounds` / `outbounds` entry (or `route.rules` entry) whose
 * tag (or rule `inbound[0]`) starts with the shared owned-tag prefix. Owned
 * entries are removed then replaced; everything else (dns, log,
 * experimental/clash_api, user rules, user outbounds, unknown keys) is kept
 * verbatim, key order included. An adopted file without an `inbounds` or
 * `outbounds` array is refused (`no_ownable_section`), never rewritten.
 *
 * Skipped (reported, never converted): a URI/Clash to sing-box outbound
 * converter doesn't exist here — nodes whose source isn't sing-box-shaped
 * are listed with `source_not_singbox_shape`. When the feed offers a variant
 * already shaped for this core, point the subscription at it instead.
 */
import { OWNED_TAG_PREFIX, type CoreListener, type CoreModel } from "./model";
import { createHash } from "node:crypto";
import type { RenderRefused, RenderResult } from "./renderers";

export function isSingBoxShape(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.type === "string" && typeof v.server === "string" && typeof v.server_port === "number"
  );
}

function inboundFor(listener: CoreListener): Record<string, unknown> {
  return {
    type: listener.scheme === "socks5" ? "socks" : "http",
    tag: listener.tag,
    listen: listener.host,
    listen_port: listener.port,
  };
}

function isOwnedTag(tag: unknown): boolean {
  return typeof tag === "string" && tag.startsWith(OWNED_TAG_PREFIX);
}

function withoutOwned<T>(items: T[], tagOf: (item: T) => unknown): T[] {
  return items.filter((item) => !isOwnedTag(tagOf(item)));
}

function ruleTargetsOwned(rule: unknown): boolean {
  if (!rule || typeof rule !== "object") return false;
  const inbound = (rule as Record<string, unknown>).inbound;
  return Array.isArray(inbound) && isOwnedTag(inbound[0]);
}

function parseBase(existingText: string | null): Record<string, unknown> | RenderResult {
  if (existingText === null) return { inbounds: [], outbounds: [] };
  let parsed: unknown;
  try {
    parsed = JSON.parse(existingText);
  } catch {
    return { ok: false, reason: "unparseable" };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, reason: "not_an_object" };
  }
  const base = parsed as Record<string, unknown>;
  if (!Array.isArray(base.inbounds) && !Array.isArray(base.outbounds)) {
    return { ok: false, reason: "no_ownable_section" };
  }
  return base;
}

function renderedTagSet(model: CoreModel): Set<string> {
  const tags = new Set<string>();
  for (const node of model.nodes) {
    if (node.source.kind === "object" && isSingBoxShape(node.source.value)) {
      tags.add(node.tag);
    }
  }
  return tags;
}

function selectorOutbounds(
  model: CoreModel,
  renderedTags: Set<string>,
  keptOutbounds: Array<Record<string, unknown>>
): string[] {
  const emittedGroups = model.groups.filter((g) => g.members.some((m) => renderedTags.has(m)));
  const emittedTags = new Set(emittedGroups.map((g) => g.tag));
  for (const node of model.nodes) {
    if (!renderedTags.has(node.tag)) continue;
    const value = (node.source as { kind: "object"; value: Record<string, unknown> }).value;
    keptOutbounds.push({ ...value, tag: `${OWNED_TAG_PREFIX}${node.tag}` });
  }
  for (const group of emittedGroups) {
    const members = group.members
      .filter((m) => renderedTags.has(m))
      .map((m) => `${OWNED_TAG_PREFIX}${m}`);
    keptOutbounds.push({
      type: "selector",
      tag: group.tag,
      outbounds: members,
      default: members[0],
    });
  }
  return [...emittedTags];
}

function mergedRoute(
  base: Record<string, unknown>,
  listeners: CoreListener[],
  emittedGroupTags: Set<string>
): Record<string, unknown> | null {
  const routeRaw = base.route;
  const route: Record<string, unknown> =
    routeRaw && typeof routeRaw === "object" && !Array.isArray(routeRaw)
      ? { ...(routeRaw as Record<string, unknown>) }
      : {};
  const existingRules = Array.isArray(route.rules) ? (route.rules as unknown[]) : [];
  const keptRules = existingRules.filter((r) => !ruleTargetsOwned(r));
  const newRules = listeners
    .filter((l) => emittedGroupTags.has(l.group))
    .map((l) => ({ inbound: [l.tag], outbound: l.group }));
  route.rules = [...newRules, ...keptRules];
  if (newRules.length === 0 && base.route === undefined) return null;
  return route;
}

function isRefused(value: Record<string, unknown> | RenderResult): value is RenderRefused {
  return "ok" in value && value.ok === false;
}

export function renderSingBox(model: CoreModel, existingText: string | null): RenderResult {
  const baseOrRefused = parseBase(existingText);
  if (isRefused(baseOrRefused)) return baseOrRefused;
  const base: Record<string, unknown> = baseOrRefused;

  const renderedTags = renderedTagSet(model);
  const out: Record<string, unknown> = { ...base };
  const inbounds = (Array.isArray(base.inbounds) ? base.inbounds : []).slice() as Array<
    Record<string, unknown>
  >;
  const outbounds = (Array.isArray(base.outbounds) ? base.outbounds : []).slice() as Array<
    Record<string, unknown>
  >;

  const keptInbounds = withoutOwned(inbounds, (i) => (i as Record<string, unknown>).tag);
  const keptOutbounds = withoutOwned(outbounds, (o) => (o as Record<string, unknown>).tag);

  const skipped: Array<{ node: string; reason: string }> = [];
  for (const node of model.nodes) {
    if (!renderedTags.has(node.tag))
      skipped.push({ node: node.tag, reason: "source_not_singbox_shape" });
  }

  const operatorCount = keptOutbounds.length;
  const emittedTags = selectorOutbounds(model, renderedTags, keptOutbounds);
  const emittedGroupTags = new Set(emittedTags);

  // Groups with members assigned but none renderable emit nothing (see
  // selectorOutbounds above): report each once so an unemitted listener never
  // goes silent. Groups already reported by the model layer (no members
  // assigned at all) are excluded here — no double count at the sync merge.
  for (const group of model.groups) {
    if (group.members.length === 0) continue;
    if (group.members.some((m) => renderedTags.has(m))) continue;
    skipped.push({ node: group.tag, reason: "empty_group" });
  }
  // Owned-position table, aligned with the final `outbounds` array:
  // operator entries (kept) and selectors (appended by selectorOutbounds
  // after the node entries) are unowned; node entries carry the model tag.
  // Positional, never prefix-matched, so selector tags sharing the owned
  // prefix can never resolve to a node.
  const renderableTags = model.nodes.filter((n) => renderedTags.has(n.tag)).map((n) => n.tag);
  const ownedIndex: Array<string | null> = keptOutbounds.map((_, i) => {
    const nodePos = i - operatorCount;
    return nodePos >= 0 && nodePos < renderableTags.length
      ? (renderableTags[nodePos] as string)
      : null;
  });

  for (const listener of model.listeners) {
    if (!emittedGroupTags.has(listener.group)) continue;
    keptInbounds.push(inboundFor(listener));
  }

  out.inbounds = keptInbounds;
  out.outbounds = keptOutbounds;
  const route = mergedRoute(base, model.listeners, emittedGroupTags);
  if (route) out.route = route;

  const text = `${JSON.stringify(out, null, 2)}\n`;
  const membersDigest = createHash("sha256")
    .update([...renderedTags].sort().join("\n"), "utf8")
    .digest("hex");
  return { ok: true, text, unchanged: text === existingText, skipped, ownedIndex, membersDigest };
}

/**
 * Map a failed check's raw output to the owned node tag it names, via the
 * renderer's owned-position table. First `outbound[i]` match wins (a check
 * names one position per run); unowned, out-of-range or absent positions
 * resolve to null and keep the previous behaviour upstream.
 */
export function resolveOffendingTag(
  stderr: string,
  ownedIndex: Array<string | null>
): { tag: string; token: string } | null {
  const match = /outbound\[(\d{1,6})\]/.exec(stderr);
  if (!match) return null;
  const index = Number(match[1]);
  const tag = Number.isSafeInteger(index) ? ownedIndex[index] : null;
  if (typeof tag !== "string" || !tag) return null;
  return { tag, token: `offending-pattern:outbound[${match[1]}]` };
}
