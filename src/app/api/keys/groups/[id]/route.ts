import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getKeyGroupWithPermissions,
  updateKeyGroup,
  deleteKeyGroup,
  getGroupMembers,
  addGroupPermission,
  removeGroupPermission,
  addKeyToGroup,
  removeKeyFromGroup,
} from "@/lib/localDb";

const updateKeyGroupSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/keys/groups/[id] — Get group details with permissions and members
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const group = getKeyGroupWithPermissions(id);
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }
    const members = getGroupMembers(id);
    return NextResponse.json({ group, members });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get group" }, { status: 500 });
  }
}

/**
 * PUT /api/keys/groups/[id] — Update a group
 */
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const raw = await request.json();
    const parsed = updateKeyGroupSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }
    const updates: { name?: string; description?: string; isActive?: boolean } = {};
    if (parsed.data.name !== undefined) updates.name = parsed.data.name;
    if (parsed.data.description !== undefined) updates.description = parsed.data.description;
    if (parsed.data.isActive !== undefined) updates.isActive = parsed.data.isActive;

    const group = updateKeyGroup(id, updates);
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }
    return NextResponse.json({ group });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update group" }, { status: 500 });
  }
}

/**
 * DELETE /api/keys/groups/[id] — Delete a group
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const deleted = deleteKeyGroup(id);
    if (!deleted) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete group" }, { status: 500 });
  }
}
