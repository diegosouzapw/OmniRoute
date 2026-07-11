import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { syncProjectMembersFromScim } from "@/lib/omnicontext/scimSync";
import { PublishError } from "@/lib/omnicontext/publish";

const schema = z.object({
  projectId: z.string().min(1),
  actorApiKeyId: z.string().min(1),
  members: z
    .array(
      z.object({
        apiKeyId: z.string().min(1),
        role: z.enum(["member", "lead", "admin"]).optional(),
        externalId: z.string().optional(),
        email: z.string().optional(),
      })
    )
    .min(1)
    .max(500),
});

/** Phase 4 — SCIM-like membership sync (push payload; no live IdP). */
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    const result = syncProjectMembersFromScim(validation.data);
    return NextResponse.json(result);
  } catch (err: unknown) {
    if (err instanceof PublishError) {
      return NextResponse.json({ error: { message: err.message } }, { status: err.status });
    }
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
