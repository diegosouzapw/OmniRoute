/** Conductor fleet snapshot → unified orchestration nodes. Pure. */
import type { FleetRunner, FleetSnapshot, FleetTask } from "@/lib/conductor/hubProxy";
import type { OrchEdge, OrchNode, OrchState } from "./orchestrationTypes";

const TERMINAL: ReadonlySet<OrchState> = new Set(["succeeded", "failed", "cancelled"]);

function mapHubStatus(status: string): OrchState | null {
  const s = status.toLowerCase();
  if (s === "queued" || s === "pending") return "queued";
  if (s === "running" || s === "working" || s === "scheduled") return "running";
  if (s === "done" || s === "completed" || s === "succeeded") return "succeeded";
  if (s === "failed" || s === "error") return "failed";
  if (s === "cancelled" || s === "canceled") return "cancelled";
  return null;
}

function taskNode(t: FleetTask, kind: "work" | "activity"): OrchNode {
  const mapped = mapHubStatus(t.status);
  const state: OrchState = mapped ?? "failed";
  return {
    id: `conductor:task:${t.id}`,
    kind,
    source: "conductor",
    state,
    label: t.summary ?? t.id,
    sublabel: mapped ? (t.repo ?? t.mode) : `unknown status: ${t.status}`,
    updatedAt: t.updated_at ?? undefined,
    // FleetTask has no dedicated completion timestamp — updated_at is the closest
    // proxy, same pattern as fromA2A.ts (A2ATask has no completedAt either).
    endedAt: TERMINAL.has(state) ? (t.updated_at ?? undefined) : undefined,
    raw: t,
  };
}

/**
 * Tasks whose runner actually exists in `snap.runners` AND is currently "running" — those
 * get "absorbed" into that runner's ActivityNode instead of getting their own work node.
 * A running task pointing at a runner id that has since deregistered falls through to the
 * normal work-node loop instead of being silently skipped as "already an activity".
 */
function computeActiveByRunner(snap: FleetSnapshot): Map<string, FleetTask> {
  const runnerIds = new Set(snap.runners.map((r) => r.id));
  const activeByRunner = new Map<string, FleetTask>();
  for (const t of snap.tasks) {
    if (t.runner && runnerIds.has(t.runner) && mapHubStatus(t.status) === "running") {
      activeByRunner.set(t.runner, t);
    }
  }
  return activeByRunner;
}

function runnerState(r: FleetRunner, activeTask: FleetTask | undefined): OrchState {
  if (!r.online) return "failed";
  if (r.draining) return "cancelled";
  return activeTask ? "running" : "queued";
}

/** One work node per runner, plus an activity node for its currently-active task. */
function runnerWorkNodes(
  snap: FleetSnapshot,
  activeByRunner: Map<string, FleetTask>,
  bump: (s: OrchState) => void
): { nodes: OrchNode[]; edges: OrchEdge[] } {
  const nodes: OrchNode[] = [];
  const edges: OrchEdge[] = [];
  for (const r of snap.runners) {
    const id = `conductor:runner:${r.id}`;
    const activeTask = activeByRunner.get(r.id);
    const state = runnerState(r, activeTask);
    bump(state);
    nodes.push({
      id,
      kind: "work",
      source: "conductor",
      state,
      label: r.name,
      sublabel: r.clis.join(", "),
      raw: r,
    });
    edges.push({
      id: `e:source:conductor→${id}`,
      from: "source:conductor",
      to: id,
      kind: "owns",
      active: state === "running",
    });
    if (activeTask) {
      nodes.push(taskNode(activeTask, "activity"));
      edges.push({
        id: `e:${id}→conductor:task:${activeTask.id}`,
        from: id,
        to: `conductor:task:${activeTask.id}`,
        kind: "owns",
        active: true,
      });
    }
  }
  return { nodes, edges };
}

/** Work nodes for tasks not already absorbed as a runner's activity node. */
function remainingTaskWorkNodes(
  snap: FleetSnapshot,
  activeByRunner: Map<string, FleetTask>,
  bump: (s: OrchState) => void
): { nodes: OrchNode[]; edges: OrchEdge[] } {
  const nodes: OrchNode[] = [];
  const edges: OrchEdge[] = [];
  for (const t of snap.tasks) {
    if (t.runner && activeByRunner.get(t.runner)?.id === t.id) continue; // already an activity
    const node = taskNode(t, "work");
    bump(node.state as OrchState);
    nodes.push(node);
    edges.push({
      id: `e:source:conductor→${node.id}`,
      from: "source:conductor",
      to: node.id,
      kind: "owns",
      active: node.state === "running",
    });
  }
  return { nodes, edges };
}

export function fromConductor(snap: FleetSnapshot): { nodes: OrchNode[]; edges: OrchEdge[] } {
  if (snap.offline || (snap.runners.length === 0 && snap.tasks.length === 0)) {
    return { nodes: [], edges: [] };
  }
  const counts: Partial<Record<OrchState, number>> = {};
  const bump = (s: OrchState) => {
    counts[s] = (counts[s] ?? 0) + 1;
  };

  const activeByRunner = computeActiveByRunner(snap);
  const runners = runnerWorkNodes(snap, activeByRunner, bump);
  const tasks = remainingTaskWorkNodes(snap, activeByRunner, bump);
  const nodes = [...runners.nodes, ...tasks.nodes];
  const edges = [...runners.edges, ...tasks.edges];

  nodes.unshift({
    id: "source:conductor",
    kind: "source",
    source: "conductor",
    label: "Conductor",
    counts,
  });
  return { nodes, edges };
}
