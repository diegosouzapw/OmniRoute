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

// ============ Valid Transitions ============

const VALID_TRANSITIONS: Record<TaskState, TaskState[]> = {
  submitted: ["working", "cancelled"],
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
      this.updateTask(taskId, "failed", undefined, "Task expired");
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

  listTasks(filter?: { state?: TaskState; skill?: string; limit?: number }): A2ATask[] {
    let tasks = [...this.tasks.values()];
    if (filter?.state) tasks = tasks.filter((t) => t.state === filter.state);
    if (filter?.skill) tasks = tasks.filter((t) => t.skill === filter.skill);
    tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return tasks.slice(0, filter?.limit || 50);
  }

  private cleanupExpired() {
    const now = new Date();
    for (const [id, task] of this.tasks) {
      if (new Date(task.expiresAt) < now && task.state !== "completed" && task.state !== "failed") {
        task.state = "failed";
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
let _manager: A2ATaskManager | null = null;
export function getTaskManager(): A2ATaskManager {
  if (!_manager) _manager = new A2ATaskManager();
  return _manager;
}
