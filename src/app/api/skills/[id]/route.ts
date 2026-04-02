import { NextResponse } from "next/server";
import { getDbInstance } from "@/lib/db/core";
import { skillRegistry } from "@/lib/skills/registry";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { z } from "zod";

const updateSkillSchema = z.object({
  enabled: z.boolean(),
});

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const rawBody = await request.json();
    const validation = validateBody(updateSkillSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(
        { error: "Invalid request body", details: validation.error },
        { status: 400 }
      );
    }

    const db = getDbInstance();
    db.prepare("UPDATE skills SET enabled = ? WHERE id = ?").run(
      validation.data.enabled ? 1 : 0,
      id
    );

    await skillRegistry.loadFromDatabase();

    return NextResponse.json({ success: true, enabled: validation.data.enabled });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
