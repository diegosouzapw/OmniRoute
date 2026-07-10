import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { requireOmniContextApiKeyId } from "../_auth";
import { getMembership } from "@/lib/db/omnicontextProjects";
import {
  createHandoff,
  listHandoffs,
  resumeHandoff,
  closeHandoff,
  getHandoffById,
} from "@/lib/db/omnicontextHandoffs";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";
import { roleHasPermission } from "@/lib/omnicontext/permissions";
import type { ProjectRole } from "@/lib/omnicontext/types";

const createSchema = z.object({
  projectId: z.string().min(1),
  goal: z.string().min(1).max(2000),
  currentStatus: z.string().max(10_000).optional(),
  decisionsMd: z.string().max(50_000).optional(),
  approachesMd: z.string().max(50_000).optional(),
  blockersMd: z.string().max(50_000).optional(),
  nextStepsMd: z.string().max(50_000).optional(),
});

const actionSchema = z.object({
  handoffId: z.string().min(1),
  action: z.enum(["resume", "close"]),
});

export async function GET(request: NextRequest) {
  const auth = await requireOmniContextApiKeyId(request);
  if (auth instanceof Response) return auth;
  const projectId = request.nextUrl.searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json({ error: { message: "projectId required" } }, { status: 400 });
  }
  const membership = getMembership(projectId, auth.apiKeyId);
  if (!membership || !roleHasPermission(membership.role as ProjectRole, "VIEW")) {
    return NextResponse.json({ error: { message: "Forbidden" } }, { status: 403 });
  }
  return NextResponse.json({ handoffs: listHandoffs({ projectId }) });
}

export async function POST(request: NextRequest) {
  const auth = await requireOmniContextApiKeyId(request);
  if (auth instanceof Response) return auth;
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }
  const validation = validateBody(createSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }
  const membership = getMembership(validation.data.projectId, auth.apiKeyId);
  if (!membership || !roleHasPermission(membership.role as ProjectRole, "HANDOFF")) {
    return NextResponse.json({ error: { message: "Forbidden" } }, { status: 403 });
  }
  try {
    const handoff = createHandoff({
      ...validation.data,
      fromApiKeyId: auth.apiKeyId,
    });
    appendAuditEvent({
      action: "handoff.create",
      projectId: validation.data.projectId,
      actorApiKeyId: auth.apiKeyId,
      meta: { handoffId: handoff.id },
    });
    return NextResponse.json({ handoff }, { status: 201 });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await requireOmniContextApiKeyId(request);
  if (auth instanceof Response) return auth;
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }
  const validation = validateBody(actionSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }
  const existing = getHandoffById(validation.data.handoffId);
  if (!existing) {
    return NextResponse.json({ error: { message: "Handoff not found" } }, { status: 404 });
  }
  const membership = getMembership(existing.projectId, auth.apiKeyId);
  if (!membership || !roleHasPermission(membership.role as ProjectRole, "HANDOFF")) {
    return NextResponse.json({ error: { message: "Forbidden" } }, { status: 403 });
  }
  const handoff =
    validation.data.action === "resume"
      ? resumeHandoff(validation.data.handoffId, auth.apiKeyId)
      : closeHandoff(validation.data.handoffId);
  return NextResponse.json({ handoff });
}
