import { NextResponse } from "next/server";
import { addKeyToGroup, removeKeyFromGroup, getGroupMembers, getKeyGroup } from "@/lib/localDb";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/keys/groups/[id]/keys — List API keys in a group
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const group = getKeyGroup(id);
    if (!group) return NextResponse.json({ error: "Group not found" }, { status: 404 });
    const members = getGroupMembers(id);
    return NextResponse.json({ members });
  } catch (error) {
    return NextResponse.json({ error: "Failed to list members" }, { status: 500 });
  }
}

/**
 * POST /api/keys/groups/[id]/keys — Add an API key to the group
 * Body: { keyId }
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const group = getKeyGroup(id);
    if (!group) return NextResponse.json({ error: "Group not found" }, { status: 404 });

    const body = await request.json();
    if (!body.keyId) {
      return NextResponse.json({ error: "keyId is required" }, { status: 400 });
    }
    const added = addKeyToGroup(body.keyId, id);
    if (!added) {
      return NextResponse.json({ error: "Failed to add key" }, { status: 500 });
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add key to group" }, { status: 500 });
  }
}

/**
 * DELETE /api/keys/groups/[id]/keys?keyId=xxx — Remove an API key from the group
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const url = new URL(request.url);
    const keyId = url.searchParams.get("keyId");
    if (!keyId) {
      return NextResponse.json({ error: "keyId query param required" }, { status: 400 });
    }
    const removed = removeKeyFromGroup(keyId, id);
    if (!removed) {
      return NextResponse.json({ error: "Key not found in group" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove key from group" }, { status: 500 });
  }
}
