/** A2A tasks → unified orchestration nodes. Pure. */
import type { A2ATask } from "@/lib/a2a/taskManager";
import type { OrchEdge, OrchNode, OrchState } from "./orchestrationTypes";

const STATE_MAP: Record<string, OrchState> = {
  submitted: "queued",
  working: "running",
  completed: "succeeded",
  failed: "failed",
  cancelled: "cancelled",
};
const TERMINAL: ReadonlySet<OrchState> = new Set(["succeeded", "failed", "cancelled"]);

function truncate(s: string, n = 60): string {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

export function fromA2A(tasks: A2ATask[]): { nodes: OrchNode[]; edges: OrchEdge[] } {
  if (tasks.length === 0) return { nodes: [], edges: [] };
  const nodes: OrchNode[] = [];
  const edges: OrchEdge[] = [];
  const counts: Partial<Record<OrchState, number>> = {};

  for (const t of tasks) {
    const mapped = STATE_MAP[t.state];
    const state: OrchState = mapped ?? "failed";
    counts[state] = (counts[state] ?? 0) + 1;
    const id = `a2a:${t.id}`;
    const firstUser = t.input.messages.find((m) => m.role === "user")?.content ?? "";
    nodes.push({
      id,
      kind: "work",
      source: "a2a",
      state,
      label: t.skill,
      sublabel: mapped ? truncate(firstUser) : `unknown state: ${String(t.state)}`,
      startedAt: t.createdAt,
      updatedAt: t.updatedAt,
      endedAt: TERMINAL.has(state) ? t.updatedAt : undefined,
      raw: t,
    });
    edges.push({
      id: `e:source:a2a→${id}`,
      from: "source:a2a",
      to: id,
      kind: "owns",
      active: state === "running",
    });
  }

  nodes.unshift({ id: "source:a2a", kind: "source", source: "a2a", label: "A2A", counts });
  return { nodes, edges };
}
