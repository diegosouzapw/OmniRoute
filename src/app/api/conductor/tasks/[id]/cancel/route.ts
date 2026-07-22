/**
 * POST /api/conductor/tasks/[id]/cancel — cancela a task no hub do Conductor.
 * Ação destrutiva: auth de gerência + confirmação na UI (ConfirmModal). A
 * recusa do hub volta só como status + mensagem sanitizada (nunca o corpo
 * upstream — Hard Rule #12).
 */

import { NextResponse } from "next/server";

import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { cancelConductorTask } from "@/lib/conductor/hubProxy";

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { id } = await ctx.params;
  const result = await cancelConductorTask(id);
  if (!result.ok) {
    return createErrorResponse({
      status: result.status,
      message: `Conductor hub refused the cancellation (HTTP ${result.status})`,
    });
  }
  return NextResponse.json({ ok: true });
}
