import { NextResponse } from "next/server";
import { getCallLogById } from "@/lib/usageDb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const log = await getCallLogById(id);

    if (!log) {
      return NextResponse.json({ error: "Log not found" }, { status: 404 });
    }

    return NextResponse.json(log);
  } catch (error) {
    console.error("[API ERROR] /api/usage/call-logs/[id] failed:", error);
    return NextResponse.json({ error: "Failed to fetch log" }, { status: 500 });
  }
}
