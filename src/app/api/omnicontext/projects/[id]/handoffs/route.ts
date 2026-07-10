import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { getMembership, getProjectById } from "@/lib/db/omnicontextProjects";
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
  apiKeyId: z.string().min(1),
  goal: z.string().min(1).max(2000),
  currentStatus: z.string().max(10_000).optional(),
  decisionsMd: z.string().max(50_000).optional(),
  approachesMd: z.string().max(50_000).optional(),
  blockersMd: z.string().max(50_000).optional(),
  nextStepsMd: z.string().max(50_000).optional(),
});

type RouteCtx = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, ctx: RouteCtx) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  if (!getProjectById(id)) {
    return NextResponse.json({ error: { message: "Project not found" } }, { status: 404 });
  }
  const status = request.nextUrl.searchParams.get("status") || undefined;
  return NextResponse.json({
    handoffs: listHandoffs({
      projectId: id,
      status: status as "active" | "resumed" | "closed" | undefined,
    }),
  });
}

export async function POST(request: NextRequest, ctx: RouteCtx) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  if (!getProjectById(id)) {
    return NextResponse.json({ error: { message: "Project not found" } }, { status: 404 });
  }
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
  const membership = getMembership(id, validation.data.apiKeyId);
  if (!membership || !roleHasPermission(membership.role as ProjectRole, "HANDOFF")) {
    return NextResponse.json({ error: { message: "Missing HANDOFF permission" } }, { status: 403 });
  }
  try {
    const handoff = createHandoff({
      projectId: id,
      goal: validation.data.goal,
      currentStatus: validation.data.currentStatus,
      decisionsMd: validation.data.decisionsMd,
      approachesMd: validation.data.approachesMd,
      blockersMd: validation.data.blockersMd,
      nextStepsMd: validation.data.nextStepsMd,
      fromApiKeyId: validation.data.apiKeyId,
    });
    appendAuditEvent({
      action: "handoff.create",
      projectId: id,
      actorApiKeyId: validation.data.apiKeyId,
      meta: { handoffId: handoff.id },
    });
    return NextResponse.json({ handoff }, { status: 201 });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, ctx: RouteCtx) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }
  const schema = z.object({
    handoffId: z.string().min(1),
    action: z.enum(["resume", "close"]),
    apiKeyId: z.string().min(1).optional(),
  });
  const validation = validateBody(schema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }
  const existing = getHandoffById(validation.data.handoffId);
  if (!existing || existing.projectId !== id) {
    return NextResponse.json({ error: { message: "Handoff not found" } }, { status: 404 });
  }
  const handoff =
    validation.data.action === "resume"
      ? resumeHandoff(validation.data.handoffId, validation.data.apiKeyId ?? null)
      : closeHandoff(validation.data.handoffId);
  appendAuditEvent({
    action: `handoff.${validation.data.action}`,
    projectId: id,
    actorApiKeyId: validation.data.apiKeyId,
    meta: { handoffId: validation.data.handoffId },
  });
  return NextResponse.json({ handoff });
}
