/**
 * GET /api/guardrails — list the registered runtime guardrails and their status
 * (name / enabled / priority). Guardrails run on every request; per-call opt-out
 * is done via the `x-omniroute-disabled-guardrails` header, so there is no
 * persisted enable/disable surface — see POST /api/guardrails/test to dry-run
 * the pipeline. (#3496)
 *
 * LOCAL_ONLY: not process-spawning; management-scoped via requireManagementAuth.
 */
import { NextRequest, NextResponse } from "next/server";

import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { registerDefaultGuardrails } from "@/lib/guardrails/registry";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const registry = registerDefaultGuardrails();
  const guardrails = registry.list().map((guardrail) => ({
    name: guardrail.name,
    enabled: guardrail.enabled,
    priority: guardrail.priority,
  }));

  return NextResponse.json({ guardrails }, { headers: CORS_HEADERS });
}
