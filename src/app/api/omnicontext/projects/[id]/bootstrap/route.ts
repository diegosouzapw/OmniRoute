import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { getProjectById } from "@/lib/db/omnicontextProjects";
import { bootstrapFromDirectory } from "@/lib/omnicontext/bootstrap";
import { PublishError } from "@/lib/omnicontext/publish";

const schema = z.object({
  apiKeyId: z.string().min(1),
  cwd: z.string().min(1).max(4096),
});

type RouteCtx = { params: Promise<{ id: string }> };

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
  const validation = validateBody(schema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }
  try {
    const result = await bootstrapFromDirectory({
      projectId: id,
      apiKeyId: validation.data.apiKeyId,
      cwd: validation.data.cwd,
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
