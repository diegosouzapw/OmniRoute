/**
 * Pure client-side filter over an OrchSnapshot — full-text search + state/source/provider chips.
 * No React, no side effects. Spec: _tasks/superpowers/specs/2026-08-30-orchestration-canvas-design.md §1/2.4
 *
 * Only `work` nodes are tested against the filter dimensions. `activity` nodes always follow
 * their parent work node (id = `${workId}:activity`) — they survive iff the parent does.
 * `orchestrator` / `source` / `overflow` nodes are always kept. SourceNode `counts` (and
 * overflow `droppedByState`) are NOT recalculated here — they keep showing the TRUE totals
 * even while the filter hides nodes from the canvas; only visibility is affected.
 */
import type { OrchNode, OrchSnapshot, OrchSource, OrchState } from "./orchestrationTypes";

export interface OrchFilter {
  q: string;
  states: ReadonlySet<OrchState>;
  sources: ReadonlySet<OrchSource>;
  providers: ReadonlySet<string>;
}

export const EMPTY_FILTER: OrchFilter = {
  q: "",
  states: new Set(),
  sources: new Set(),
  providers: new Set(),
};

export function isEmptyFilter(f: OrchFilter): boolean {
  return f.q === "" && f.states.size === 0 && f.sources.size === 0 && f.providers.size === 0;
}

/**
 * The provider identity of a work node, or `null` when its source has no provider concept
 * (a2a, routing) or the raw payload doesn't carry one.
 */
export function nodeProviderKey(node: OrchNode): string | null {
  if (node.source === "cloud-agent") {
    return (node.raw as { providerId?: string } | undefined)?.providerId ?? null;
  }
  if (node.source === "conductor") {
    return (node.raw as { runner?: string | null } | undefined)?.runner ?? null;
  }
  return null;
}

/** Distinct non-null provider keys among the snapshot's work nodes, sorted. */
export function collectProviderKeys(snap: OrchSnapshot): string[] {
  const keys = new Set<string>();
  for (const n of snap.nodes) {
    if (n.kind !== "work") continue;
    const key = nodeProviderKey(n);
    if (key !== null) keys.add(key);
  }
  return [...keys].sort();
}

function matchesWork(node: OrchNode, f: OrchFilter): boolean {
  if (f.q) {
    const haystack = `${node.label} ${node.sublabel ?? ""} ${node.id}`.toLowerCase();
    if (!haystack.includes(f.q.toLowerCase())) return false;
  }
  if (f.states.size > 0 && (!node.state || !f.states.has(node.state))) return false;
  if (f.sources.size > 0 && (!node.source || !f.sources.has(node.source))) return false;
  if (f.providers.size > 0) {
    const key = nodeProviderKey(node);
    if (key === null || !f.providers.has(key)) return false;
  }
  return true;
}

const ACTIVITY_SUFFIX = ":activity";

function activityParentId(id: string): string {
  return id.endsWith(ACTIVITY_SUFFIX) ? id.slice(0, -ACTIVITY_SUFFIX.length) : id;
}

/**
 * Filters a snapshot down to the nodes/edges matching `f` (all non-empty dimensions AND
 * together). Returns `snap` itself (same reference) when `f` is empty, so callers can memoize
 * on the previous result instead of re-rendering on every keystroke of a cleared search box.
 */
export function filterSnapshot(snap: OrchSnapshot, f: OrchFilter): OrchSnapshot {
  if (isEmptyFilter(f)) return snap;

  const workSurvivors = new Set<string>();
  for (const n of snap.nodes) {
    if (n.kind === "work" && matchesWork(n, f)) workSurvivors.add(n.id);
  }

  const nodes = snap.nodes.filter((n) => {
    if (n.kind === "work") return workSurvivors.has(n.id);
    if (n.kind === "activity") return workSurvivors.has(activityParentId(n.id));
    return true; // orchestrator, source, overflow always survive
  });
  const survivingIds = new Set(nodes.map((n) => n.id));
  const edges = snap.edges.filter((e) => survivingIds.has(e.from) && survivingIds.has(e.to));

  return { ...snap, nodes, edges };
}
