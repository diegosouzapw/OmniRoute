import { NextResponse } from "next/server";
import { getDbInstance } from "@/lib/db/core";
import { skillRegistry } from "@/lib/skills/registry";
import { z } from "zod";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";

const updateSkillSchema = z.object({
  enabled: z.boolean().optional(),
  mode: z.enum(["on", "off", "auto"]).optional(),
});

export async function DELETE(_request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const deleted = await skillRegistry.unregisterById(id);
    if (!deleted) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const rawBody = await request.json();
    const validation = validateBody(updateSkillSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(validation.error, { status: 400 });
    }

    const db = getDbInstance();
    const updates: string[] = [];
    const params: unknown[] = [];

    if (validation.data.enabled !== undefined) {
      updates.push("enabled = ?");
      params.push(validation.data.enabled ? 1 : 0);

      // Legacy enabled toggle should also keep mode in sync.
      // Without this, skills created as mode="off" remain excluded even after enabled=true.
      if (validation.data.mode === undefined) {
        updates.push("mode = ?");
        params.push(validation.data.enabled ? "on" : "off");
      }
    }

    if (validation.data.mode !== undefined) {
      updates.push("mode = ?");
      params.push(validation.data.mode);
      // keep enabled column consistent for older codepaths
      updates.push("enabled = ?");
      params.push(validation.data.mode === "off" ? 0 : 1);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: "No update payload provided" }, { status: 400 });
    }

    updates.push("updated_at = datetime('now')");
    params.push(id);
    db.prepare(`UPDATE skills SET ${updates.join(", ")} WHERE id = ?`).run(...params);

    await skillRegistry.loadFromDatabase();

    return NextResponse.json({
      success: true,
      enabled: validation.data.enabled,
      mode: validation.data.mode,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
