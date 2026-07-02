import { NextResponse } from "next/server";
import { z } from "zod";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { executeProviderHealthAutopilotAction } from "@/lib/monitoring/providerHealthAutopilot";
import { validateBrowserMutationOrigin } from "@/server/origin/publicOrigin";
import { validateBody } from "@/shared/validation/helpers";

const actionSchema = z.object({
  type: z.enum([
    "clear_provider_breaker",
    "clear_connection_cooldown",
    "clear_stale_connection_error",
    "clear_model_lockout",
    "reactivate_connection",
    "deactivate_connection",
  ]),
  target: z.object({
    provider: z.string().min(1),
    connectionId: z.string().min(1).optional(),
    model: z.string().min(1).optional(),
  }),
  preconditionsHash: z.string().min(8).max(128),
  dryRun: z.boolean().optional(),
  confirm: z.boolean().optional(),
});

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const originVerdict = validateBrowserMutationOrigin(request);
  if (!originVerdict.ok) {
    return NextResponse.json({ error: { message: "Invalid request origin" } }, { status: 403 });
  }

  try {
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
    }

    const validation = validateBody(actionSchema, rawBody);
    if (!validation.success) {
      return NextResponse.json({ error: { message: validation.error } }, { status: 400 });
    }

    const result = await executeProviderHealthAutopilotAction(validation.data);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error("[API] POST /api/providers/health-autopilot/actions error:", error);
    return NextResponse.json(
      { error: { message: "Failed to apply provider health autopilot action" } },
      { status: 500 }
    );
  }
}
