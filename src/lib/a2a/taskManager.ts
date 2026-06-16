/**
 * A2A Task Manager — Tracks task lifecycle and state
 */

import { randomUUID } from "crypto";

export interface A2ATask {
  id: string;
  skill: string;
  messages: Array<{ role: string; content: string }>;
  metadata?: Record<string, unknown>;
  state: "pending" | "working" | "completed" | "failed" | "cancelled";
  artifacts?: Array<{ type: string; content: string }>;
  errorMessage?: string;
  createdAt: number;
  updatedAt: number;
}

interface A2ATaskManagerInstance {
  createTask(input: {
    skill: string;
    messages: Array<{ role: string; content: string }>;
    metadata?: Record<string, unknown>;
  }): A2ATask;
  updateTask(
    id: string,
    state: A2ATask["state"],
    artifacts?: A2ATask["artifacts"],
    errorMessage?: string
  ): void;
  getTask(id: string): A2ATask | undefined;
  cancelTask(id: string): A2ATask;
  beginStream(): void;
  endStream(): void;
}

const tasks = new Map<string, A2ATask>();
const TASK_TTL_MS = 5 * 60 * 1000; // 5 minutes

let streamActive = false;

const taskManager: A2ATaskManagerInstance = {
  createTask(input) {
    const id = randomUUID();
    const now = Date.now();
    const task: A2ATask = {
      id,
      skill: input.skill,
      messages: input.messages,
      metadata: input.metadata,
      state: "pending",
      createdAt: now,
      updatedAt: now,
    };
    tasks.set(id, task);

    // Clean up expired tasks
    if (tasks.size > 1000) {
      for (const [key, value] of tasks.entries()) {
        if (now - value.createdAt > TASK_TTL_MS) {
          tasks.delete(key);
        }
      }
    }

    return task;
  },

  updateTask(id, state, artifacts, errorMessage) {
    const task = tasks.get(id);
    if (task) {
      task.state = state;
      task.updatedAt = Date.now();
      if (artifacts) task.artifacts = artifacts;
      if (errorMessage) task.errorMessage = errorMessage;
    }
  },

  getTask(id) {
    return tasks.get(id);
  },

  cancelTask(id) {
    const task = tasks.get(id);
    if (!task) throw new Error(`Task not found: ${id}`);
    task.state = "cancelled";
    task.updatedAt = Date.now();
    return task;
  },

  beginStream() {
    streamActive = true;
  },

  endStream() {
    streamActive = false;
  },
};

export function getTaskManager(): A2ATaskManagerInstance {
  return taskManager;
}
