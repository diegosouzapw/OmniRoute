import { NextResponse } from "next/server";
import { listMemories, createMemory } from "@/lib/memory/store";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const apiKeyId = searchParams.get("apiKeyId") || undefined;
    const type = (searchParams.get("type") as any) || undefined;
    const sessionId = searchParams.get("sessionId") || undefined;
    const limitParams = searchParams.get("limit");
    const offsetParams = searchParams.get("offset");

    const memories = await listMemories({
      apiKeyId,
      type,
      sessionId,
      limit: limitParams ? parseInt(limitParams, 10) : undefined,
      offset: offsetParams ? parseInt(offsetParams, 10) : undefined,
    });
    return NextResponse.json({ memories });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const memoryId = await createMemory(body);
    return NextResponse.json({ success: true, id: memoryId });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 400 });
  }
}
