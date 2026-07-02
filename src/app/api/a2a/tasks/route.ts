import { NextResponse } from "next/server";
import { getTaskManager, type TaskState } from "@/lib/a2a/taskManager";

const VALID_TASK_STATES = new Set<TaskState>([
  "submitted",
  "working",
  "completed",
  "failed",
  "cancelled",
]);

function parseIntParam(value: string | null, fallback: number): number {
  if (typeof value !== "string") return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return parsed;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const stateParam = searchParams.get("state");
    const skill = searchParams.get("skill") || undefined;
    const limit = Math.max(1, Math.min(200, parseIntParam(searchParams.get("limit"), 50)));
    const offset = Math.max(0, parseIntParam(searchParams.get("offset"), 0));

    const state =
      typeof stateParam === "string" && VALID_TASK_STATES.has(stateParam as TaskState)
        ? (stateParam as TaskState)
        : undefined;

    const tm = getTaskManager();
    const total = tm.countTasks({ state, skill });
    const tasks = tm.listTasks({ state, skill, limit, offset });

    return NextResponse.json({
      tasks,
      total,
      limit,
      offset,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list A2A tasks";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
