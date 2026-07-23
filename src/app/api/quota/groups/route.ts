/**
 * GET  /api/quota/groups  — list all quota groups
 * POST /api/quota/groups  — create a new quota group
 *
 * Auth: requireManagementAuth (same pattern as /api/quota/pools)
 * Zod:  GroupCreateSchema from @/shared/schemas/quota
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12, B25)
 *
 * NOT LOCAL_ONLY — does not spawn processes (B18, Hard Rules #15/#17 do not apply).
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { GroupCreateSchema } from "@/shared/schemas/quota";
import { listGroups, createGroup } from "@/lib/localDb";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const groups = listGroups();
    return NextResponse.json({ groups });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to list groups";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json().catch(() => null);
    const parsed = GroupCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), { status: 400 });
    }

    const group = createGroup(parsed.data.name);
    return NextResponse.json({ group }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create group";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
