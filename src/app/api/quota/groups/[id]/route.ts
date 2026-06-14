/**
 * PATCH  /api/quota/groups/[id]  — rename a quota group (re-syncs combos)
 * DELETE /api/quota/groups/[id]  — delete a quota group
 *
 * Auth: requireManagementAuth
 * Zod:  GroupRenameSchema from @/shared/schemas/quota (PATCH only)
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12, B25)
 *
 * PATCH rename → renameGroup → re-sync combos for all pools in the group
 * (combo names include the group slug, so they must be refreshed after rename).
 *
 * DELETE blocks (409) when pools still reference the group, or when the
 * protected seed 'group-demo' is targeted. Both cases are signalled by
 * deleteGroup throwing — caught here and mapped to 409.
 *
 * NOT LOCAL_ONLY — does not spawn processes (B18, Hard Rules #15/#17 do not apply).
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { GroupRenameSchema } from "@/shared/schemas/quota";
import { renameGroup, deleteGroup, getGroup, getPoolsByGroup } from "@/lib/localDb";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await request.json().catch(() => null);
    const parsed = GroupRenameSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), { status: 400 });
    }

    const updated = renameGroup(id, parsed.data.name);
    if (!updated) {
      return NextResponse.json(buildErrorBody(404, "Group not found"), { status: 404 });
    }

    // Re-sync combos for all pools in the group — combo names embed the group
    // slug, so they must be refreshed after a rename. Dynamic import mirrors
    // quotaPools.ts::syncQuotaCombosGuarded pattern; failures are non-fatal.
    const pools = getPoolsByGroup(id);
    for (const pool of pools) {
      try {
        const { syncQuotaCombos } = await import("@/lib/quota/quotaCombos");
        await syncQuotaCombos(pool.id);
      } catch (err) {
        // Guard: combo-sync failure must never break group rename callers.
        console.warn(
          "[quota-groups] syncQuotaCombos failed (non-fatal):",
          (err as Error)?.message,
        );
      }
    }

    const group = getGroup(id);
    return NextResponse.json({ group });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to rename group";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    let existed: boolean;
    try {
      existed = deleteGroup(id);
    } catch (err) {
      // deleteGroup throws when the group is protected ('group-demo') or when
      // pools still reference it — both map to 409 Conflict.
      const message = err instanceof Error ? err.message : "Cannot delete group";
      return NextResponse.json(buildErrorBody(409, message), { status: 409 });
    }

    if (!existed) {
      return NextResponse.json(buildErrorBody(404, "Group not found"), { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete group";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
