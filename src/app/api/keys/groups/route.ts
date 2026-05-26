import { NextResponse } from "next/server";
import { z } from "zod";
import { getAllKeyGroups, createKeyGroup, getKeyGroup } from "@/lib/localDb";

const createKeyGroupSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  description: z.string().optional(),
});

/**
 * GET /api/keys/groups — List all key groups
 */
export async function GET() {
  try {
    const groups = getAllKeyGroups();
    return NextResponse.json({ groups });
  } catch (error) {
    return NextResponse.json({ error: "Failed to list groups" }, { status: 500 });
  }
}

/**
 * POST /api/keys/groups — Create a key group
 * Body: { name, description? }
 */
export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const parsed = createKeyGroupSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }
    const group = createKeyGroup(parsed.data.name, parsed.data.description || "");
    return NextResponse.json({ group }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create group" }, { status: 500 });
  }
}
