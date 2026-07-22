/**
 * GET /api/conductor/tasks/[id] — whitelisted task detail (manifest, prompt,
 * council funnel) from the Conductor hub. 404 sanitizado quando o hub não
 * conhece a task — o corpo do hub nunca é repassado.
 */

import { NextResponse } from "next/server";

import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getConductorTaskDetail } from "@/lib/conductor/hubProxy";

export async function GET(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { id } = await ctx.params;
  const detail = await getConductorTaskDetail(id);
  if (!detail) {
    return createErrorResponse({ status: 404, message: "Conductor task not found (or hub offline)" });
  }
  return NextResponse.json(detail);
}
