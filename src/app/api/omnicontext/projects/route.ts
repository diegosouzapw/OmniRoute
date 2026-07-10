import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { createProject, listProjects } from "@/lib/db/omnicontextProjects";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";

const createSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
  orgId: z.string().nullable().optional(),
  teamId: z.string().nullable().optional(),
  retentionDays: z.number().int().min(1).max(3650).optional(),
  injectEnabled: z.boolean().optional(),
  publishPolicyDefault: z.enum(["auto", "review_required", "lead_only"]).optional(),
});

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json({ projects: listProjects() });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  const validation = validateBody(createSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  try {
    const project = createProject(validation.data);
    appendAuditEvent({
      action: "project.create",
      projectId: project.id,
      meta: { slug: project.slug },
    });
    return NextResponse.json({ project }, { status: 201 });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    const status = message.includes("UNIQUE") ? 409 : 500;
    return NextResponse.json({ error: { message } }, { status });
  }
}
