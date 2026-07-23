/**
 * POST /api/guardrails/test — dry-run the pre-call guardrail pipeline over a
 * sample input and return the per-guardrail verdict (blocked / modified /
 * skipped / passed) plus the resulting (possibly masked) payload. Lets operators
 * preview PII masking, prompt-injection and vision-bridge behavior without
 * issuing a real upstream request. (#3496)
 *
 * LOCAL_ONLY: not process-spawning; management-scoped via requireManagementAuth.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { registerDefaultGuardrails } from "@/lib/guardrails/registry";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";

const TestRequestSchema = z.object({
  input: z.union([z.string(), z.record(z.unknown()), z.array(z.unknown())]),
  disabledGuardrails: z.array(z.string()).optional(),
});

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body", type: "invalid_request" });
  }

  const validation = validateBody(TestRequestSchema, rawBody);
  if (isValidationFailure(validation)) {
    return createErrorResponse({ status: 400, message: "Invalid request body — expected { input: string | object | array, disabledGuardrails?: string[] }", type: "invalid_request" });
  }
  const parsed = validation.data;

  const registry = registerDefaultGuardrails();
  const outcome = await registry.runPreCallHooks(parsed.input, {
    disabledGuardrails: parsed.disabledGuardrails,
  });

  return NextResponse.json(
    { blocked: outcome.blocked, results: outcome.results, payload: outcome.payload },
    { headers: CORS_HEADERS }
  );
}
