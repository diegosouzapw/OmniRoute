import { NextResponse } from "next/server";
import { getTaskManager } from "@/lib/a2a/taskManager";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tm = getTaskManager();
    const task = tm.getTask(id);
    if (!task) {
      return NextResponse.json({ error: `Task not found: ${id}` }, { status: 404 });
    }
    return NextResponse.json({ task });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load A2A task";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
