import { NextResponse } from "next/server";
import { z } from "zod";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { executeProviderHealthAutopilotAction } from "@/lib/monitoring/providerHealthAutopilot";
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

function hasSafeMutationOrigin(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site")?.toLowerCase();
  if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite)) return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  if (!hasSafeMutationOrigin(request)) {
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
