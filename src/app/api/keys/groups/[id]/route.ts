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
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

type RouteParams = { params: Promise<{ id: string }> };

const updateKeyGroupSchema = z
  .object({
    name: z.string().trim().min(1, "name cannot be empty").optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, "At least one update field is required");

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
    const rawBody = await request.json();
    const validation = validateBody(updateKeyGroupSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const group = updateKeyGroup(id, validation.data);
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
