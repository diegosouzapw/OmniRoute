import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  addProjectMember,
  getProjectById,
  listProjectMembers,
  removeProjectMember,
} from "@/lib/db/omnicontextProjects";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";

const memberSchema = z.object({
  apiKeyId: z.string().min(1),
  role: z.enum(["member", "lead", "admin"]).default("member"),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  if (!getProjectById(id)) {
    return NextResponse.json({ error: { message: "Project not found" } }, { status: 404 });
  }
  return NextResponse.json({ members: listProjectMembers(id) });
}

export async function POST(request: NextRequest, context: RouteContext) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  if (!getProjectById(id)) {
    return NextResponse.json({ error: { message: "Project not found" } }, { status: 404 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: { message: "Invalid JSON body", details: [] } },
      { status: 400 }
    );
  }

  const validation = validateBody(memberSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  try {
    const member = addProjectMember(id, validation.data.apiKeyId, validation.data.role);
    appendAuditEvent({
      action: "project.member.add",
      projectId: id,
      actorApiKeyId: validation.data.apiKeyId,
      meta: { role: validation.data.role },
    });
    return NextResponse.json({ member }, { status: 201 });
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
  const apiKeyId = new URL(request.url).searchParams.get("apiKeyId");
  if (!apiKeyId) {
    return NextResponse.json(
      { error: { message: "apiKeyId query parameter required" } },
      { status: 400 }
    );
  }
  const ok = removeProjectMember(id, apiKeyId);
  if (!ok) {
    return NextResponse.json({ error: { message: "Member not found" } }, { status: 404 });
  }
  appendAuditEvent({
    action: "project.member.remove",
    projectId: id,
    actorApiKeyId: apiKeyId,
  });
  return NextResponse.json({ ok: true });
}
