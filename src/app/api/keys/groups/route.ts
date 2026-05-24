import { NextResponse } from "next/server";
import {
  getAllKeyGroups,
  createKeyGroup,
  getKeyGroup,
} from "@/lib/localDb";

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
    const body = await request.json();
    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }
    const group = createKeyGroup(body.name.trim(), body.description || "");
    return NextResponse.json({ group }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create group" }, { status: 500 });
  }
}
