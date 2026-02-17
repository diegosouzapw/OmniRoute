import { NextResponse } from "next/server";
import { getPromptCache } from "@/lib/cacheLayer";

export async function GET() {
  try {
    const cache = getPromptCache();
    const stats = (cache as any).getStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cache = getPromptCache();
    (cache as any).clear();
    return NextResponse.json({ success: true, message: "Cache cleared" });
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}
