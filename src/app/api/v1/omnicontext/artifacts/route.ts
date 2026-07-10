import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { requireOmniContextApiKeyId } from "../_auth";
import { getMembership } from "@/lib/db/omnicontextProjects";
import { publishArtifact, PublishError } from "@/lib/omnicontext/publish";
import { listArtifacts } from "@/lib/db/omnicontextArtifacts";
import { roleHasPermission } from "@/lib/omnicontext/permissions";
import type { ProjectRole } from "@/lib/omnicontext/types";

const publishSchema = z.object({
  projectId: z.string().min(1),
  type: z.enum(["summary", "decision", "blocker", "snippet", "handoff", "stable_prefix"]),
  title: z.string().min(1).max(500),
  body: z.string().min(1).max(200_000),
  ticketId: z.string().nullable().optional(),
  repo: z.string().nullable().optional(),
  branch: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  publishPolicy: z.enum(["auto", "review_required", "lead_only"]).optional(),
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
  return NextResponse.json({ artifacts: listArtifacts({ projectId }) });
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
  const validation = validateBody(publishSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }
  try {
    const result = publishArtifact({
      ...validation.data,
      apiKeyId: auth.apiKeyId,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof PublishError) {
      return NextResponse.json({ error: { message: err.message } }, { status: err.status });
    }
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
