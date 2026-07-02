import { NextResponse } from "next/server";
import { getTaskManager } from "@/lib/a2a/taskManager";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tm = getTaskManager();
    const task = tm.cancelTask(id);
    return NextResponse.json({ task: { id: task.id, state: task.state } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to cancel A2A task";
    const status = message.includes("not found") ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
