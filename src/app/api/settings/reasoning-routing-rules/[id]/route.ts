import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  deleteReasoningRoutingRule,
  getReasoningRoutingRuleById,
  updateReasoningRoutingRule,
} from "@/lib/db/reasoningRoutingRules";
import {
  createReasoningRoutingRuleSchema,
  updateReasoningRoutingRuleSchema,
} from "@/shared/validation/schemas";
import { validatedJsonBody } from "@/shared/validation/helpers";
import { reasoningRuleDataToInput } from "@/lib/reasoningRouting/input";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

function errorResponse(status: number, message: string) {
  return NextResponse.json(buildErrorBody(status, message), { status });
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const rule = await getReasoningRoutingRuleById((await params).id);
  return rule ? NextResponse.json({ rule }) : errorResponse(404, "Rule not found");
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const id = (await params).id;
  const existing = await getReasoningRoutingRuleById(id);
  if (!existing) return errorResponse(404, "Rule not found");
  const parsed = await validatedJsonBody(request, updateReasoningRoutingRuleSchema);
  if (!parsed.success) return parsed.response;
  const merged = { ...existing, ...parsed.data };
  const validated = createReasoningRoutingRuleSchema.safeParse(merged);
  if (!validated.success) {
    return errorResponse(400, "Reasoning routing rule validation failed");
  }
  try {
    const rule = await updateReasoningRoutingRule(id, reasoningRuleDataToInput(validated.data));
    return NextResponse.json({ rule });
  } catch (error) {
    return errorResponse(
      400,
      sanitizeErrorMessage(error instanceof Error ? error.message : String(error))
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const deleted = await deleteReasoningRoutingRule((await params).id);
  return deleted ? NextResponse.json({ success: true }) : errorResponse(404, "Rule not found");
}
