import { NextResponse } from "next/server";
import { getTaskManager } from "@/lib/a2a/taskManager";
import { authorizeA2ATaskRoute } from "@/app/api/a2a/_auth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // GHSA-jcm5-6wpp-wjj8: this route had no auth call at all. The owner check
  // happens inside cancelTask: another principal's task throws the same
  // "not found" a missing one would (no existence oracle).
  const auth = await authorizeA2ATaskRoute(request);
  if (auth instanceof Response) return auth;
  try {
    const { id } = await params;
    const tm = getTaskManager();
    const task = tm.cancelTask(id, auth.owner);
    return NextResponse.json({ task: { id: task.id, state: task.state } });
  } catch (error) {
    const message = sanitizeErrorMessage(
      error instanceof Error ? error.message : "Failed to cancel A2A task"
    );
    const status = message.includes("not found") ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
