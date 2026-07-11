import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { getProjectById } from "@/lib/db/omnicontextProjects";
import { setLegalHold } from "@/lib/omnicontext/legalHold";
import { PublishError } from "@/lib/omnicontext/publish";

const schema = z.object({
  artifactId: z.string().min(1),
  apiKeyId: z.string().min(1),
  held: z.boolean(),
});

type RouteCtx = { params: Promise<{ id: string }> };

/** Phase 4 — set or clear legal hold on an artifact. */
export async function POST(request: NextRequest, ctx: RouteCtx) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id: projectId } = await ctx.params;
  if (!getProjectById(projectId)) {
    return NextResponse.json({ error: { message: "Project not found" } }, { status: 404 });
  }

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
    const artifact = setLegalHold({
      projectId,
      artifactId: validation.data.artifactId,
      apiKeyId: validation.data.apiKeyId,
      held: validation.data.held,
    });
    return NextResponse.json({ artifact });
  } catch (err: unknown) {
    if (err instanceof PublishError) {
      return NextResponse.json({ error: { message: err.message } }, { status: err.status });
    }
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
