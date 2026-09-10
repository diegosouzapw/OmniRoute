/** Merge the three source mappers into one snapshot: root, dedupe, staleness filter, cap. Pure. */
import {
  MAX_WORK_NODES,
  STALE_COMPLETED_MS,
  type OrchEdge,
  type OrchNode,
  type OrchSnapshot,
  type OrchSource,
  type OrchState,
  type SourceStatus,
} from "./orchestrationTypes";

const TERMINAL: ReadonlySet<OrchState> = new Set(["succeeded", "failed", "cancelled"]);

export interface MergeOptions {
  now: number;
  showCompleted?: boolean;
}

interface Part {
  nodes: OrchNode[];
  edges: OrchEdge[];
}

interface NodesAndEdges {
  nodes: OrchNode[];
  edges: OrchEdge[];
}

function conductorMirrorId(node: OrchNode): string | null {
  const raw = node.raw as { metadata?: { conductor?: { task_id?: unknown } } } | undefined;
  const id = raw?.metadata?.conductor?.task_id;
  return typeof id === "string" ? id : null;
}

/**
 * (2) Conductor↔A2A dedupe — key verified in src/lib/conductor/bridge.ts::ensureMirrored.
 * Mutates `dropped` in place; returns the (possibly patched) nodes/edges.
 */
function dedupeConductorMirrors(
  nodes: OrchNode[],
  edges: OrchEdge[],
  dropped: Set<string>
): NodesAndEdges {
  const conductorTaskIds = new Set(
    nodes
      .filter((n) => n.source === "conductor" && n.id.startsWith("conductor:task:"))
      .map((n) => n.id.slice("conductor:task:".length))
  );
  const nextNodes = [...nodes];
  const nextEdges = [...edges];
  for (const n of nextNodes) {
    if (n.source !== "a2a" || n.kind !== "work") continue;
    const mirror = conductorMirrorId(n);
    if (mirror && conductorTaskIds.has(mirror)) {
      dropped.add(n.id);
      const cIndex = nextNodes.findIndex((c) => c.id === `conductor:task:${mirror}`);
      if (cIndex !== -1) {
        // Copy rather than mutate — the original object is still referenced by
        // parts.conductor.nodes, and this function's contract is Pure.
        const cNode: OrchNode = { ...nextNodes[cIndex], mirrorOf: n.id };
        nextNodes[cIndex] = cNode;
        nextEdges.push({
          id: `e:mirror:${cNode.id}`,
          from: cNode.id,
          to: "source:a2a",
          kind: "mirror",
          active: false,
        });
      }
    }
  }
  return { nodes: nextNodes, edges: nextEdges };
}

/** (3) staleness filter — adds stale terminal work/activity node ids to `dropped`. */
function markStaleCompleted(nodes: OrchNode[], now: number, dropped: Set<string>): void {
  for (const n of nodes) {
    if (n.kind !== "work" && n.kind !== "activity") continue;
    if (
      n.state &&
      TERMINAL.has(n.state) &&
      n.endedAt &&
      now - Date.parse(n.endedAt) > STALE_COMPLETED_MS
    ) {
      dropped.add(n.id);
    }
  }
}

/** One source's overflow placeholder node, or null when it fits under `budgetPer`. */
function overflowNodeForSource(
  source: OrchSource,
  list: OrchNode[],
  budgetPer: number,
  dropped: Set<string>
): OrchNode | null {
  if (list.length <= budgetPer) return null;
  list.sort((a, b) => Date.parse(b.updatedAt ?? "0") - Date.parse(a.updatedAt ?? "0"));
  const excess = list.slice(budgetPer);
  const counts: Partial<Record<OrchState, number>> = {};
  for (const n of excess) {
    dropped.add(n.id);
    if (n.state) counts[n.state] = (counts[n.state] ?? 0) + 1;
  }
  return {
    id: `overflow:${source}`,
    kind: "overflow",
    source,
    label: `+${excess.length} more`,
    counts,
    // Additive: lets overviewProjection fold true per-state totals into its
    // counters even though these nodes no longer render on the canvas
    // (operator ruling — spec governs, counters must show TRUE totals).
    // Spread into a fresh object — sharing the `counts` reference is a mutation
    // footgun (a caller mutating either field silently corrupts the other).
    droppedByState: { ...counts },
  };
}

/** (4) cap with per-source overflow, newest kept. */
function capWorkNodesWithOverflow(
  nodes: OrchNode[],
  edges: OrchEdge[],
  dropped: Set<string>
): NodesAndEdges {
  const works = nodes.filter((n) => n.kind === "work");
  if (works.length <= MAX_WORK_NODES) return { nodes, edges };

  const bySource = new Map<OrchSource, OrchNode[]>();
  for (const w of works) {
    const list = bySource.get(w.source as OrchSource) ?? [];
    list.push(w);
    bySource.set(w.source as OrchSource, list);
  }
  const budgetPer = Math.max(1, Math.floor(MAX_WORK_NODES / bySource.size));
  const overflowNodes: OrchNode[] = [];
  for (const [source, list] of bySource) {
    const overflow = overflowNodeForSource(source, list, budgetPer, dropped);
    if (overflow) overflowNodes.push(overflow);
  }

  const nextNodes = nodes.filter((n) => !dropped.has(n.id)).concat(overflowNodes);
  const nextEdges = edges.filter((e) => !dropped.has(e.from) && !dropped.has(e.to));
  for (const o of overflowNodes) {
    nextEdges.push({
      id: `e:source:${o.source}→${o.id}`,
      from: `source:${o.source}`,
      to: o.id,
      kind: "owns",
      active: false,
    });
  }
  return { nodes: nextNodes, edges: nextEdges };
}

/**
 * (1) root — link every present SourceNode, plus failed sources so the UI can show them
 * stale. Returns nodes with the root prepended.
 */
function buildRootAndSourceEdges(
  nodes: OrchNode[],
  edges: OrchEdge[],
  sources: SourceStatus[]
): NodesAndEdges {
  const root: OrchNode = { id: "orchestrator", kind: "orchestrator", label: "OmniRoute" };
  const nextNodes = [...nodes];
  const nextEdges = [...edges];
  const sourceIds = new Set(nextNodes.filter((n) => n.kind === "source").map((n) => n.id));
  for (const s of sources) {
    // `!s.ok` covers hard failures; `s.offline` also materializes a placeholder
    // for a source that reported ok:true but offline:true (e.g. Conductor with
    // no hub configured) — otherwise that source never gets a SourceNode at all
    // and its "offline" sublabel can never render.
    if ((!s.ok || s.offline) && !sourceIds.has(`source:${s.source}`) && s.source !== "routing") {
      nextNodes.push({
        id: `source:${s.source}`,
        kind: "source",
        source: s.source,
        label: s.source,
        sublabel: s.offline ? "offline" : "error",
        sourceIssue: s.offline ? "offline" : "error",
        staleSince: s.staleSince,
      });
      sourceIds.add(`source:${s.source}`);
    }
  }
  for (const id of sourceIds) {
    nextEdges.push({
      id: `e:orchestrator→${id}`,
      from: "orchestrator",
      to: id,
      kind: "owns",
      active: false,
    });
  }
  return { nodes: [root, ...nextNodes], edges: nextEdges };
}

export function mergeSnapshot(
  parts: { cloudAgent: Part; a2a: Part; conductor: Part },
  sources: SourceStatus[],
  opts: MergeOptions
): OrchSnapshot {
  let nodes: OrchNode[] = [...parts.cloudAgent.nodes, ...parts.a2a.nodes, ...parts.conductor.nodes];
  let edges: OrchEdge[] = [...parts.cloudAgent.edges, ...parts.a2a.edges, ...parts.conductor.edges];

  const dropped = new Set<string>();
  ({ nodes, edges } = dedupeConductorMirrors(nodes, edges, dropped));

  if (!opts.showCompleted) {
    markStaleCompleted(nodes, opts.now, dropped);
  }
  nodes = nodes.filter((n) => !dropped.has(n.id));
  edges = edges.filter((e) => !dropped.has(e.from) && !dropped.has(e.to));

  ({ nodes, edges } = capWorkNodesWithOverflow(nodes, edges, dropped));
  ({ nodes, edges } = buildRootAndSourceEdges(nodes, edges, sources));

  return { nodes, edges, sources, generatedAt: new Date(opts.now).toISOString() };
}
