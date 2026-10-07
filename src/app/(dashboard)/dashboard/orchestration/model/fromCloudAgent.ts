/** Cloud Agent tasks → unified orchestration nodes. Pure. */
import type { CloudAgentTask } from "@/lib/cloudAgent/types";
import type { OrchEdge, OrchNode, OrchState } from "./orchestrationTypes";

const STATE_MAP: Record<string, OrchState> = {
  queued: "queued",
  running: "running",
  awaiting_approval: "waiting_approval",
  completed: "succeeded",
  failed: "failed",
  cancelled: "cancelled",
};

function truncate(s: string, n = 60): string {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

export function fromCloudAgent(tasks: CloudAgentTask[]): { nodes: OrchNode[]; edges: OrchEdge[] } {
  if (tasks.length === 0) return { nodes: [], edges: [] };
  const nodes: OrchNode[] = [];
  const edges: OrchEdge[] = [];
  const counts: Partial<Record<OrchState, number>> = {};

  for (const t of tasks) {
    const mapped = STATE_MAP[t.status];
    const state: OrchState = mapped ?? "failed";
    counts[state] = (counts[state] ?? 0) + 1;
    const id = `cloud-agent:${t.id}`;
    const active = state === "running";
    nodes.push({
      id,
      kind: "work",
      source: "cloud-agent",
      state,
      label: truncate(t.prompt),
      sublabel: mapped ? t.providerId : `${t.providerId} — unknown status: ${String(t.status)}`,
      startedAt: t.createdAt,
      updatedAt: t.updatedAt,
      endedAt: t.completedAt,
      cost: t.result?.cost,
      raw: t,
    });
    edges.push({
      id: `e:source:cloud-agent→${id}`,
      from: "source:cloud-agent",
      to: id,
      kind: "owns",
      active,
    });

    const last = t.activities[t.activities.length - 1];
    if (active && last) {
      const actId = `${id}:activity`;
      nodes.push({
        id: actId,
        kind: "activity",
        source: "cloud-agent",
        state,
        label: truncate(last.content),
        sublabel: last.type,
        updatedAt: last.timestamp,
      });
      edges.push({ id: `e:${id}→${actId}`, from: id, to: actId, kind: "owns", active: true });
    }
  }

  nodes.unshift({
    id: "source:cloud-agent",
    kind: "source",
    source: "cloud-agent",
    label: "Cloud Agent",
    counts,
  });
  return { nodes, edges };
}
