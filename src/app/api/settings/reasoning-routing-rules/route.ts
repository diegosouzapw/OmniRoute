import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  createReasoningRoutingRule,
  getReasoningRoutingRules,
} from "@/lib/db/reasoningRoutingRules";
import { reasoningRuleDataToInput } from "@/lib/reasoningRouting/input";
import { createReasoningRoutingRuleSchema } from "@/shared/validation/schemas";
import { validatedJsonBody } from "@/shared/validation/helpers";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return NextResponse.json({ rules: await getReasoningRoutingRules() });
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const parsed = await validatedJsonBody(request, createReasoningRoutingRuleSchema);
  if (!parsed.success) return parsed.response;
  try {
    const rule = await createReasoningRoutingRule(reasoningRuleDataToInput(parsed.data));
    return NextResponse.json({ rule }, { status: 201 });
  } catch (error) {
    const message = sanitizeErrorMessage(error instanceof Error ? error.message : String(error));
    return NextResponse.json(buildErrorBody(400, message), { status: 400 });
  }
}
