import { NextResponse } from "next/server";
import { getDbInstance } from "@/lib/db/core";
import { skillRegistry } from "@/lib/skills/registry";

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const body = await request.json();

    if (typeof body.enabled !== "boolean") {
      return NextResponse.json(
        { error: "Invalid payload, missing enabled boolean" },
        { status: 400 }
      );
    }

    const db = getDbInstance();
    db.prepare("UPDATE skills SET enabled = ? WHERE id = ?").run(body.enabled ? 1 : 0, id);

    await skillRegistry.loadFromDatabase();

    return NextResponse.json({ success: true, enabled: body.enabled });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
