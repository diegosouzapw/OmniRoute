import { NextResponse } from "next/server";
import { skillExecutor } from "@/lib/skills/executor";

export async function GET() {
  try {
    const executions = skillExecutor.listExecutions();
    return NextResponse.json({ executions });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
