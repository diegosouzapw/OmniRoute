import { NextResponse } from "next/server";
import { skillRegistry } from "@/lib/skills/registry";

export async function GET() {
  try {
    await skillRegistry.loadFromDatabase();
    const skills = skillRegistry.list();
    return NextResponse.json({ skills });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
