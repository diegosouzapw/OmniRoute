/**
 * A2A Task Manager — Full lifecycle management for A2A tasks.
 *
 * State machine: submitted → working → completed | failed | cancelled
 *
 * Features:
 *   - UUID v4 task IDs
 *   - In-memory storage with optional SQLite persistence
 *   - Event logging for each state transition
 *   - TTL with configurable expiration (default 5 min)
 *   - Concurrent task limit
 */

import { randomUUID } from "crypto";

import { emit } from "@/lib/events/eventBus";
import { upsertA2ATask, appendA2ATaskEvent, purgeA2AHistory } from "@/lib/db/a2aTasks";
import { logger } from "@omniroute/open-sse/utils/logger";

const log = logger("A2A_TASKS");

/**
 * Publish an `agent.task.updated` transition for the orchestration canvas (Fase 2, Task B2).
 * Best-effort: a listener throwing must never break the task write path that triggered it.
 */
function emitAgentTaskUpdated(source: "cloud-agent" | "a2a", taskId: string, state: string): void {
  try {
    emit("agent.task.updated", { source, taskId, state, timestamp: Date.now() });
  } catch {
    /* listeners never derail the write path */
  }
}

/**
 * DI seam for history persistence (Orchestration Canvas Fase 2, Task C2). Defaults to the real
 * `src/lib/db/a2aTasks.ts` module functions; tests inject a fake so they never touch SQLite.
 */
export interface A2APersistence {
  upsert: typeof upsertA2ATask;
  appendEvent: typeof appendA2ATaskEvent;
  purge: typeof purgeA2AHistory;
}

const defaultPersistence: A2APersistence = {
  upsert: upsertA2ATask,
  appendEvent: appendA2ATaskEvent,
  purge: purgeA2AHistory,
};

/** Terminal task states — mirrors `A2ATaskManager`'s own terminal-state notion. */
const TERMINAL = new Set(["completed", "failed", "cancelled"]);

/**
 * Days of A2A task history to retain before `purgeA2AHistory` deletes a row. Reads
 * `OMNIROUTE_A2A_HISTORY_RETENTION_DAYS`; falls back to 30 when unset, non-numeric, or <= 0.
 */
export function historyRetentionDays(): number {
  const raw = Number.parseInt(process.env.OMNIROUTE_A2A_HISTORY_RETENTION_DAYS ?? "", 10);
  return Number.isFinite(raw) && raw > 0 ? raw : 30;
}

const DAY_MS = 86_400_000;

// ============ Types ============

export type TaskState = "submitted" | "working" | "completed" | "failed" | "cancelled";

export interface TaskInput {
  skill: string;
  messages: Array<{ role: string; content: string }>;
  metadata?: Record<string, unknown>;
}

export interface TaskArtifact {
  type: "text" | "json" | "error";
  content: string;
}

export interface TaskEvent {
  timestamp: string;
  state: TaskState;
  message?: string;
}

export interface A2ATask {
  id: string;
  skill: string;
  state: TaskState;
  input: TaskInput;
  artifacts: TaskArtifact[];
  events: TaskEvent[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  /**
   * GHSA-jcm5-6wpp-wjj8: principal that created the task (hashed API key).
   * `undefined` = created under the keyless local-first posture — such tasks
   * stay visible to every caller, matching the pre-owner behavior. Tasks WITH
   * an owner are only returned/cancelled/listed for the same owner.
   */
  owner?: string;
}

export interface TaskListFilter {
  state?: TaskState;
  skill?: string;
  limit?: number;
  offset?: number;
}

export interface A2ATaskStats {
  counts: Record<TaskState, number>;
  total: number;
  activeStreams: number;
  lastTaskAt: string | null;
}

// ============ Valid Transitions ============

const VALID_TRANSITIONS: Record<TaskState, TaskState[]> = {
  submitted: ["working", "failed", "cancelled"],
  working: ["completed", "failed", "cancelled"],
  completed: [],
  failed: [],
  cancelled: [],
};

// ============ Task Manager ============

export class A2ATaskManager {
  private tasks = new Map<string, A2ATask>();
  private readonly ttlMs: number;
  private readonly persistence: A2APersistence;
  private cleanupInterval: ReturnType<typeof setInterval>;
  private activeStreams = 0;
  private lastPurgeAt = 0;

  constructor(ttlMinutes: number = 5, persistence: A2APersistence = defaultPersistence) {
    this.ttlMs = ttlMinutes * 60 * 1000;
    this.persistence = persistence;
    this.cleanupInterval = setInterval(() => this.cleanupExpired(), 60_000);
    if (
      this.cleanupInterval &&
      typeof this.cleanupInterval === "object" &&
      "unref" in this.cleanupInterval
    ) {
      (this.cleanupInterval as { unref?: () => void }).unref?.();
    }
  }

  /**
   * Persist a task's current state to the history tables (Task C2). Best-effort: any failure
   * (SQLite unavailable, schema drift, …) is logged and swallowed — the in-memory `Map` stays
   * the source of truth for live tasks, and this call must never break the caller's write path.
   */
  private persist(task: A2ATask, eventType: string, message?: string): void {
    try {
      this.persistence.upsert({
        id: task.id,
        state: task.state,
        skillId: task.skill,
        inputJson: JSON.stringify(task.input),
        outputJson: task.artifacts.length ? JSON.stringify(task.artifacts) : null,
        apiKeyId: task.owner ?? null,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        completedAt: TERMINAL.has(task.state) ? task.updatedAt : null,
      });
      this.persistence.appendEvent(
        task.id,
        eventType,
        message ? JSON.stringify({ message }) : undefined
      );
    } catch (err) {
      log.warn("a2a task history persist failed", { err, taskId: task.id, eventType });
    }
  }

  /**
   * Purge task history rows older than the retention window, throttled to at most once per 24h
   * (called from the existing `cleanupExpired` interval). Best-effort, like `persist`.
   */
  private maybePurge(): void {
    if (Date.now() - this.lastPurgeAt <= DAY_MS) return;
    this.lastPurgeAt = Date.now();
    try {
      this.persistence.purge(historyRetentionDays());
    } catch (err) {
      log.warn("a2a task history purge failed", { err });
    }
  }

  createTask(input: TaskInput, owner?: string): A2ATask {
    const now = new Date();
    const task: A2ATask = {
      id: randomUUID(),
      skill: input.skill,
      state: "submitted",
      input,
      artifacts: [],
      events: [{ timestamp: now.toISOString(), state: "submitted" }],
      // COPY, never the caller's object: `metadata` is the task's own mutable
      // runtime bag (`taskExecution.ts` writes `memoryHits` into it), while
      // `input.metadata` is the immutable record of what the caller sent. Sharing
      // one reference made every runtime write leak back into `input` — and from
      // there into the persisted `a2a_tasks.input_json` and into the drawer's
      // "Repeat" body, so a repeated task was born carrying the previous run's
      // memory snippets even with `OMNIROUTE_A2A_MEMORY_HITS=0`.
      metadata: { ...(input.metadata ?? {}) },
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + this.ttlMs).toISOString(),
      ...(owner !== undefined ? { owner } : {}),
    };
    this.tasks.set(task.id, task);
    emitAgentTaskUpdated("a2a", task.id, "submitted");
    this.persist(task, "state:submitted");
    return task;
  }

  /**
   * Owner scoping (GHSA-jcm5-6wpp-wjj8): a task carrying an owner is visible
   * only to that owner. Ownerless tasks (keyless posture, or created before
   * this field existed) stay visible to everyone — no behavior change there.
   */
  private isVisibleTo(task: A2ATask, owner?: string): boolean {
    return task.owner === undefined || task.owner === owner;
  }

  getTask(taskId: string, owner?: string): A2ATask | undefined {
    const task = this.tasks.get(taskId);
    if (task && new Date(task.expiresAt) < new Date()) {
      if (task.state === "submitted" || task.state === "working") {
        this.updateTask(taskId, "failed", undefined, "Task expired");
      }
    }
    const current = this.tasks.get(taskId);
    if (!current || !this.isVisibleTo(current, owner)) return undefined;
    return current;
  }

  updateTask(
    taskId: string,
    state: TaskState,
    artifacts?: TaskArtifact[],
    message?: string
  ): A2ATask {
    const task = this.tasks.get(taskId);
    if (!task) throw new Error(`Task ${taskId} not found`);

    const valid = VALID_TRANSITIONS[task.state];
    if (!valid.includes(state)) {
      throw new Error(`Invalid transition: ${task.state} → ${state}`);
    }

    const now = new Date().toISOString();
    task.state = state;
    task.updatedAt = now;
    task.events.push({ timestamp: now, state, message });
    if (artifacts) task.artifacts.push(...artifacts);

    emitAgentTaskUpdated("a2a", taskId, state);
    this.persist(task, `state:${state}`, message);
    return task;
  }

  cancelTask(taskId: string, owner?: string): A2ATask {
    // Owner check BEFORE the mutation (GHSA-jcm5-6wpp-wjj8): a caller must not
    // cancel another principal's task by id. Uses the same not-found error as
    // a missing task so an IDOR probe cannot distinguish "exists but not
    // yours" from "does not exist".
    const task = this.tasks.get(taskId);
    if (!task || !this.isVisibleTo(task, owner)) {
      throw new Error(`Task ${taskId} not found`);
    }
    return this.updateTask(taskId, "cancelled", undefined, "Cancelled by client");
  }

  countTasks(filter?: Pick<TaskListFilter, "state" | "skill">): number {
    let tasks = [...this.tasks.values()];
    if (filter?.state) tasks = tasks.filter((t) => t.state === filter.state);
    if (filter?.skill) tasks = tasks.filter((t) => t.skill === filter.skill);
    return tasks.length;
  }

  listTasks(filter?: TaskListFilter, owner?: string): A2ATask[] {
    let tasks = [...this.tasks.values()];
    // GHSA-jcm5-6wpp-wjj8: when an owner scope is supplied, owned tasks of
    // other principals are hidden; ownerless tasks remain visible (posture).
    if (owner !== undefined) tasks = tasks.filter((t) => this.isVisibleTo(t, owner));
    if (filter?.state) tasks = tasks.filter((t) => t.state === filter.state);
    if (filter?.skill) tasks = tasks.filter((t) => t.skill === filter.skill);
    tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const offset = Math.max(0, filter?.offset || 0);
    const limit =
      typeof filter?.limit === "number" && Number.isFinite(filter.limit)
        ? Math.max(1, Math.floor(filter.limit))
        : 50;
    return tasks.slice(offset, offset + limit);
  }

  beginStream() {
    this.activeStreams += 1;
  }

  endStream() {
    this.activeStreams = Math.max(0, this.activeStreams - 1);
  }

  getStats(): A2ATaskStats {
    const counts: Record<TaskState, number> = {
      submitted: 0,
      working: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    };

    let lastTaskAt: string | null = null;
    for (const task of this.tasks.values()) {
      counts[task.state] += 1;
      const updatedAt = new Date(task.updatedAt).getTime();
      if (!Number.isFinite(updatedAt)) continue;
      if (!lastTaskAt || updatedAt > new Date(lastTaskAt).getTime()) {
        lastTaskAt = task.updatedAt;
      }
    }

    return {
      counts,
      total: this.tasks.size,
      activeStreams: this.activeStreams,
      lastTaskAt,
    };
  }

  private cleanupExpired() {
    const now = new Date();
    for (const [id, task] of this.tasks) {
      if (
        new Date(task.expiresAt) < now &&
        task.state !== "completed" &&
        task.state !== "failed" &&
        task.state !== "cancelled"
      ) {
        task.state = "failed";
        task.updatedAt = now.toISOString();
        task.events.push({ timestamp: now.toISOString(), state: "failed", message: "TTL expired" });
        emitAgentTaskUpdated("a2a", id, "failed");
        this.persist(task, "state:failed", "TTL expired");
      }
      // Remove terminal tasks older than 2x TTL
      if (
        ["completed", "failed", "cancelled"].includes(task.state) &&
        now.getTime() - new Date(task.updatedAt).getTime() > this.ttlMs * 2
      ) {
        this.tasks.delete(id);
      }
    }
    this.maybePurge();
  }

  destroy() {
    clearInterval(this.cleanupInterval);
  }
}

// Singleton
const globalForA2A = globalThis as unknown as { _a2aTaskManager?: A2ATaskManager };

export function getTaskManager(): A2ATaskManager {
  if (!globalForA2A._a2aTaskManager) {
    globalForA2A._a2aTaskManager = new A2ATaskManager();
  }
  return globalForA2A._a2aTaskManager;
}
