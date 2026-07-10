import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { deleteProject, getProjectById, updateProject } from "@/lib/db/omnicontextProjects";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";

const patchSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  orgId: z.string().nullable().optional(),
  teamId: z.string().nullable().optional(),
  retentionDays: z.number().int().min(1).max(3650).optional(),
  injectEnabled: z.boolean().optional(),
  publishPolicyDefault: z.enum(["auto", "review_required", "lead_only"]).optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const project = getProjectById(id);
  if (!project) {
    return NextResponse.json({ error: { message: "Project not found" } }, { status: 404 });
  }
  return NextResponse.json({ project });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: { message: "Invalid JSON body", details: [] } },
      { status: 400 }
    );
  }

  const validation = validateBody(patchSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  try {
    const project = updateProject(id, validation.data);
    if (!project) {
      return NextResponse.json({ error: { message: "Project not found" } }, { status: 404 });
    }
    appendAuditEvent({ action: "project.update", projectId: id });
    return NextResponse.json({ project });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const ok = deleteProject(id);
  if (!ok) {
    return NextResponse.json({ error: { message: "Project not found" } }, { status: 404 });
  }
  appendAuditEvent({ action: "project.delete", projectId: id });
  return NextResponse.json({ ok: true });
}
