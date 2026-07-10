import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { requireOmniContextApiKeyId } from "../_auth";
import { bootstrapFromDirectory } from "@/lib/omnicontext/bootstrap";
import { PublishError } from "@/lib/omnicontext/publish";

const schema = z.object({
  projectId: z.string().min(1),
  cwd: z.string().min(1).max(4096),
});

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
    const result = await bootstrapFromDirectory({
      projectId: validation.data.projectId,
      apiKeyId: auth.apiKeyId,
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
