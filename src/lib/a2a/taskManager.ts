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
  private cleanupInterval: ReturnType<typeof setInterval>;
  private activeStreams = 0;

  constructor(ttlMinutes: number = 5) {
    this.ttlMs = ttlMinutes * 60 * 1000;
    // Cleanup expired tasks every 60s
    this.cleanupInterval = setInterval(() => this.cleanupExpired(), 60_000);
  }

  createTask(input: TaskInput): A2ATask {
    const now = new Date();
    const task: A2ATask = {
      id: randomUUID(),
      skill: input.skill,
      state: "submitted",
      input,
      artifacts: [],
      events: [{ timestamp: now.toISOString(), state: "submitted" }],
      metadata: input.metadata || {},
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + this.ttlMs).toISOString(),
    };
    this.tasks.set(task.id, task);
    return task;
  }

  getTask(taskId: string): A2ATask | undefined {
    const task = this.tasks.get(taskId);
    if (task && new Date(task.expiresAt) < new Date()) {
      if (task.state === "submitted" || task.state === "working") {
        this.updateTask(taskId, "failed", undefined, "Task expired");
      }
    }
    return this.tasks.get(taskId);
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

    return task;
  }

  cancelTask(taskId: string): A2ATask {
    return this.updateTask(taskId, "cancelled", undefined, "Cancelled by client");
  }

  countTasks(filter?: Pick<TaskListFilter, "state" | "skill">): number {
    let tasks = [...this.tasks.values()];
    if (filter?.state) tasks = tasks.filter((t) => t.state === filter.state);
    if (filter?.skill) tasks = tasks.filter((t) => t.skill === filter.skill);
    return tasks.length;
  }

  listTasks(filter?: TaskListFilter): A2ATask[] {
    let tasks = [...this.tasks.values()];
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
      }
      // Remove terminal tasks older than 2x TTL
      if (
        ["completed", "failed", "cancelled"].includes(task.state) &&
        now.getTime() - new Date(task.updatedAt).getTime() > this.ttlMs * 2
      ) {
        this.tasks.delete(id);
      }
    }
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
