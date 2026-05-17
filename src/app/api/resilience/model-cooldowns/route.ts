import { NextResponse } from "next/server";
import { z } from "zod";
import {
  clearModelUnavailability,
  getAvailabilityReport,
  resetAllAvailability,
} from "@/domain/modelAvailability";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { validateBody } from "@/shared/validation/helpers";

const deleteCooldownSchema = z
  .object({
    provider: z.string().optional(),
    model: z.string().optional(),
    all: z.boolean().optional(),
  })
  .passthrough();

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

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
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json().catch(() => ({}));
    const validation = validateBody(deleteCooldownSchema, rawBody);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;

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
