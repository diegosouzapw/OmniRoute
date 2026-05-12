import { NextResponse } from "next/server";
import {
  clearModelUnavailability,
  getAvailabilityReport,
  resetAllAvailability,
} from "@/domain/modelAvailability";

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function GET() {
  try {
    const items = getAvailabilityReport().sort((a, b) => b.remainingMs - a.remainingMs);
    return NextResponse.json({ items });
  } catch (error: unknown) {
    console.error("[API] GET /api/resilience/model-cooldowns error:", error);
    return NextResponse.json(
      { error: getErrorMessage(error, "Failed to load cooldowns") },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      provider?: string;
      model?: string;
      all?: boolean;
    };

    if (body.all) {
      resetAllAvailability();
      return NextResponse.json({ ok: true, clearedAll: true });
    }

    const provider = typeof body.provider === "string" ? body.provider.trim() : "";
    const model = typeof body.model === "string" ? body.model.trim() : "";
    if (!provider || !model) {
      return NextResponse.json({ error: "provider and model are required" }, { status: 400 });
    }

    const removed = clearModelUnavailability(provider, model);
    return NextResponse.json({ ok: true, removed });
  } catch (error: unknown) {
    console.error("[API] DELETE /api/resilience/model-cooldowns error:", error);
    return NextResponse.json(
      { error: getErrorMessage(error, "Failed to clear cooldown") },
      { status: 500 }
    );
  }
}
