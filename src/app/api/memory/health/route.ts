import { NextResponse } from "next/server";
import { verifyExtractionPipeline } from "@/lib/memory/verify";

export async function GET() {
  try {
    const result = await verifyExtractionPipeline("health-check");
    return NextResponse.json(result);
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ working: false, latencyMs: 0, error }, { status: 500 });
  }
}
