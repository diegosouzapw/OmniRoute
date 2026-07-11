import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { requireOmniContextApiKeyId } from "../_auth";
import { submitFeedback } from "@/lib/omnicontext/feedback";
import { PublishError } from "@/lib/omnicontext/publish";
import { listFeedback } from "@/lib/db/omnicontextFeedback";
import { getMembership } from "@/lib/db/omnicontextProjects";
import { roleHasPermission } from "@/lib/omnicontext/permissions";
import type { ProjectRole } from "@/lib/omnicontext/types";

const schema = z.object({
  projectId: z.string().min(1),
  artifactId: z.string().min(1),
  verdict: z.enum(["helpful", "harmful"]),
  retrieveId: z.string().nullable().optional(),
  note: z.string().max(2000).nullable().optional(),
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
  const artifactId = request.nextUrl.searchParams.get("artifactId") || undefined;
  return NextResponse.json({ feedback: listFeedback({ projectId, artifactId }) });
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
  const validation = validateBody(schema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }
  try {
    const feedback = submitFeedback({
      ...validation.data,
      apiKeyId: auth.apiKeyId,
    });
    return NextResponse.json({ feedback }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof PublishError) {
      return NextResponse.json({ error: { message: err.message } }, { status: err.status });
    }
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
