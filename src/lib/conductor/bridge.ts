/**
 * Conductor Bridge — mirrors OmniConductor hub tasks into the local A2A TaskManager.
 *
 * The hub's SSE feed is the source of truth; this mirror is disposable and fully
 * rebuildable by replay (`last_event_id`). State spelling differs on purpose:
 * the Conductor follows A2A upstream with `canceled` (1 L) while OmniRoute's
 * TaskManager uses `cancelled` (2 L) — the mapping here is explicit and tested.
 */

import type { A2ATaskManager, TaskState } from "@/lib/a2a/taskManager";

export interface ConductorEvent {
  id: string;
  type: string;
  payload: Record<string, unknown>;
}

/** Target A2A state for a Conductor event type; null = not a task-state event (tolerated). */
export function conductorStateFor(type: string): TaskState | null {
  switch (type) {
    case "task.created":
      return "submitted";
    case "task.scheduled":
    case "task.input_required":
      return "working";
    case "task.completed":
      return "completed";
    case "task.failed":
      return "failed";
    case "task.canceled": // Conductor/A2A upstream spelling (1 L)
      return "cancelled"; // local TaskManager spelling (2 L)
    default:
      return null; // runner.*, council.*, terminal.*, future types — forward-compat
  }
}

/** Minimal legal path from a task's current state up to the target state. */
const LADDER: TaskState[] = ["submitted", "working", "completed"];

function climb(tm: A2ATaskManager, a2aId: string, target: TaskState): void {
  const task = tm.getTask(a2aId);
  if (!task) return;
  if (task.state === target) return;
  if (task.state === "completed" || task.state === "failed" || task.state === "cancelled") return; // terminal: late events ignored
  try {
    if (target === "completed") {
      // submitted → working → completed (the manager rejects skips)
      let idx = LADDER.indexOf(task.state);
      for (idx = idx + 1; idx < LADDER.length; idx++) tm.updateTask(a2aId, LADDER[idx]);
      return;
    }
    tm.updateTask(a2aId, target); // working/failed/cancelled are reachable from any non-terminal state
  } catch {
    // A transition rejected by the manager must never take the bridge down; the
    // hub replay will converge the mirror on the next connection.
  }
}

function ensureMirrored(tm: A2ATaskManager, index: Map<string, string>, conductorId: string, payload: Record<string, unknown>): string {
  const known = index.get(conductorId);
  if (known && tm.getTask(known)) return known;
  const mode = typeof payload.mode === "string" ? payload.mode : "?";
  const task = tm.createTask({
    skill: "conductor",
    messages: [{ role: "user", content: `Conductor task ${conductorId} (${mode})` }],
    metadata: {
      conductor: {
        task_id: conductorId,
        mode,
        from: typeof payload.from === "string" ? payload.from : undefined,
      },
    },
  });
  index.set(conductorId, task.id);
  return task.id;
}

function conductorMeta(tm: A2ATaskManager, a2aId: string): Record<string, unknown> | null {
  const task = tm.getTask(a2aId);
  if (!task) return null;
  // The manager has no public metadata mutator; direct mutation is the repo precedent
  // (tests mutate task fields) and the object lives in the same process.
  const meta = (task.metadata.conductor ??= {}) as Record<string, unknown>;
  return meta;
}

/** Applies one hub event to the mirror. Never throws for event-shaped input. */
export function applyConductorEvent(tm: A2ATaskManager, index: Map<string, string>, ev: ConductorEvent): void {
  const target = conductorStateFor(ev.type);
  if (!target) return;
  const conductorId = typeof ev.payload.task_id === "string" ? ev.payload.task_id : null;
  if (!conductorId) return;

  const a2aId = ensureMirrored(tm, index, conductorId, ev.payload);
  const meta = conductorMeta(tm, a2aId);
  if (meta) {
    if (ev.type === "task.scheduled" && typeof ev.payload.runner_id === "string") meta.runner = ev.payload.runner_id;
    if (ev.type === "task.input_required") meta.input_required = true;
    if (ev.type === "task.completed" || ev.type === "task.failed") {
      const manifest = (ev.payload.manifest ?? {}) as Record<string, unknown>;
      if (typeof manifest.summary === "string") meta.summary = manifest.summary;
      if (typeof manifest.branch === "string") meta.branch = manifest.branch;
      if (typeof manifest.error === "string") meta.error = manifest.error;
    }
  }
  if (target !== "submitted") climb(tm, a2aId, target);
}
