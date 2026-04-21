import { NextResponse } from "next/server";
import { evalsDb } from "@/lib/localDb";

export async function GET(request: Request, { params }: { params: { suiteId: string } }) {
  try {
    const { suiteId } = await params;
    const history = evalsDb.getEvalHistory(suiteId);
    return NextResponse.json(history);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
