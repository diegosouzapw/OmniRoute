/** OrchSnapshot → overview counters + kanban columns. Pure. */
import {
  ORCH_STATES,
  type OrchNode,
  type OrchSnapshot,
  type OrchState,
} from "./orchestrationTypes";

export interface OverviewData {
  counts: Record<OrchState, number>;
  columns: {
    queued: OrchNode[];
    running: OrchNode[];
    waiting_approval: OrchNode[];
    done: OrchNode[];
  };
}

export function overviewProjection(snap: OrchSnapshot, comboActive: number): OverviewData {
  const counts = Object.fromEntries(ORCH_STATES.map((s) => [s, 0])) as Record<OrchState, number>;
  const columns: OverviewData["columns"] = {
    queued: [],
    running: [],
    waiting_approval: [],
    done: [],
  };

  for (const n of snap.nodes) {
    // Overflow nodes (MAX_WORK_NODES cap) fold their dropped work nodes' true
    // per-state counts into `counts` only — never into `columns`, since those
    // nodes are not rendered on the canvas. Counters must show TRUE totals
    // even when the canvas caps the rendered node count (operator ruling).
    if (n.kind === "overflow" && n.droppedByState) {
      for (const s of ORCH_STATES) {
        counts[s] += n.droppedByState[s] ?? 0;
      }
      continue;
    }
    if (n.kind !== "work" || !n.state) continue;
    counts[n.state] += 1;
    if (n.state === "queued" || n.state === "running" || n.state === "waiting_approval") {
      columns[n.state].push(n);
    } else {
      columns.done.push(n);
    }
  }
  columns.done.sort((a, b) => Date.parse(b.updatedAt ?? "0") - Date.parse(a.updatedAt ?? "0"));
  counts.running += comboActive;
  return { counts, columns };
}
