import { NextResponse } from "next/server";
import { deleteMemory, getMemory } from "@/lib/memory/store";

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const success = await deleteMemory(id);
    if (!success) {
      return NextResponse.json({ error: "Memory not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const memory = await getMemory(id);
    if (!memory) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ memory });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
