/** OrchSnapshot → @xyflow nodes/edges with a deterministic shallow 3-layer layout. Pure. */
import type { Edge, Node } from "@xyflow/react";
import type { OrchNodeKind, OrchSnapshot, OrchSource } from "./orchestrationTypes";

const LAYER_Y: Record<OrchNodeKind, number> = {
  orchestrator: 0,
  source: 150,
  work: 320,
  overflow: 320,
  activity: 470,
};
const X_GAP = 260;

export interface OrchestrationToFlowOptions {
  collapsed?: ReadonlySet<OrchSource>;
}

export function orchestrationToFlow(
  snap: OrchSnapshot,
  opts?: OrchestrationToFlowOptions
): {
  nodes: Node[];
  edges: Edge[];
  fitKey: string;
} {
  const collapsed = opts?.collapsed;
  const hasCollapsed = !!collapsed && collapsed.size > 0;

  // Drop work/activity/overflow nodes whose source is collapsed BEFORE layout, so the
  // remaining nodes recenter into their layer instead of leaving gaps.
  const visibleNodes = hasCollapsed
    ? snap.nodes.filter((n) => {
        if (n.kind !== "work" && n.kind !== "activity" && n.kind !== "overflow") return true;
        return !(n.source && collapsed!.has(n.source));
      })
    : snap.nodes;
  const visibleIds = hasCollapsed ? new Set(visibleNodes.map((n) => n.id)) : null;
  const visibleEdges = visibleIds
    ? snap.edges.filter((e) => visibleIds.has(e.from) && visibleIds.has(e.to))
    : snap.edges;

  const byLayer = new Map<number, string[]>();
  for (const n of [...visibleNodes].sort((a, b) => a.id.localeCompare(b.id))) {
    const y = LAYER_Y[n.kind];
    const ids = byLayer.get(y) ?? [];
    ids.push(n.id);
    byLayer.set(y, ids);
  }
  const pos = new Map<string, { x: number; y: number }>();
  for (const [y, ids] of byLayer) {
    const width = (ids.length - 1) * X_GAP;
    ids.forEach((id, i) => pos.set(id, { x: i * X_GAP - width / 2, y }));
  }

  const stateOf = new Map(visibleNodes.map((n) => [n.id, n.state]));
  const nodes: Node[] = visibleNodes.map((n) => {
    const isCollapsedSource = n.kind === "source" && !!n.source && !!collapsed?.has(n.source);
    return {
      id: n.id,
      type: n.kind,
      position: pos.get(n.id)!,
      data: (isCollapsedSource ? { ...n, collapsed: true } : n) as unknown as Record<
        string,
        unknown
      >,
    };
  });
  const edges: Edge[] = visibleEdges.map((e) => ({
    id: e.id,
    source: e.from,
    target: e.to,
    type: "status",
    data: { state: stateOf.get(e.to), active: e.active, mirror: e.kind === "mirror" },
  }));

  const workIdsKey = visibleNodes
    .filter((n) => n.kind === "work")
    .map((n) => n.id)
    .sort()
    .join("|");
  const fitKey = hasCollapsed
    ? `${workIdsKey}::collapsed=${[...collapsed!].sort().join(",")}`
    : workIdsKey;
  return { nodes, edges, fitKey };
}
