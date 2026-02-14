import { NextResponse } from "next/server";
import {
  getAvailabilityReport,
  clearModelUnavailability,
  getUnavailableCount,
} from "@/domain/modelAvailability";

export async function GET() {
  try {
    const report = getAvailabilityReport();
    const count = getUnavailableCount();
    return NextResponse.json({ unavailableCount: count, models: report });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { provider, model } = await request.json();
    if (!provider || !model) {
      return NextResponse.json({ error: "provider and model are required" }, { status: 400 });
    }
    const removed = clearModelUnavailability(provider, model);
    return NextResponse.json({ success: true, removed });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
