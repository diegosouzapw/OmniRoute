import { NextResponse } from "next/server";
import { z } from "zod";
import {
  addGroupPermission,
  removeGroupPermission,
  getGroupPermissions,
  getKeyGroup,
} from "@/lib/localDb";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

type RouteParams = { params: Promise<{ id: string }> };

const addGroupPermissionSchema = z.object({
  modelPattern: z.string().trim().min(1, "modelPattern is required"),
  accessType: z.enum(["allow", "deny"]),
  provider: z.string().trim().min(1).optional(),
});

/**
 * GET /api/keys/groups/[id]/permissions — List permissions for a group
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const group = getKeyGroup(id);
    if (!group) return NextResponse.json({ error: "Group not found" }, { status: 404 });

    const permissions = getGroupPermissions(id);
    return NextResponse.json({ permissions });
  } catch (error) {
    return NextResponse.json({ error: "Failed to list permissions" }, { status: 500 });
  }
}

/**
 * POST /api/keys/groups/[id]/permissions — Add a permission rule
 * Body: { modelPattern, accessType, provider? }
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const group = getKeyGroup(id);
    if (!group) return NextResponse.json({ error: "Group not found" }, { status: 404 });

    const rawBody = await request.json();
    const validation = validateBody(addGroupPermissionSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const permission = addGroupPermission(
      id,
      validation.data.modelPattern,
      validation.data.accessType,
      validation.data.provider
    );
    return NextResponse.json({ permission }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add permission" }, { status: 500 });
  }
}

/**
 * DELETE /api/keys/groups/[id]/permissions?permissionId=xxx — Remove a permission
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const url = new URL(request.url);
    const permissionId = url.searchParams.get("permissionId");
    if (!permissionId) {
      return NextResponse.json({ error: "permissionId query param required" }, { status: 400 });
    }
    const removed = removeGroupPermission(permissionId);
    if (!removed) {
      return NextResponse.json({ error: "Permission not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove permission" }, { status: 500 });
  }
}
