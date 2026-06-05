import { NextResponse } from "next/server";
import { z } from "zod";
import { getAllKeyGroups, createKeyGroup, getKeyGroup } from "@/lib/localDb";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const createKeyGroupSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  description: z.string().optional().default(""),
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
    const rawBody = await request.json();
    const validation = validateBody(createKeyGroupSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const group = createKeyGroup(validation.data.name, validation.data.description);
    return NextResponse.json({ group }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create group" }, { status: 500 });
  }
}
