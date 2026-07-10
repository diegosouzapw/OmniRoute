import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { getProjectById } from "@/lib/db/omnicontextProjects";
import { deleteRepoMapping, listRepoMap, setRepoProjectMapping } from "@/lib/db/omnicontextRepoMap";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";

const putSchema = z.object({
  repoKey: z.string().min(1).max(300),
  projectId: z.string().min(1),
});

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ mappings: listRepoMap() });
}

export async function PUT(request: NextRequest) {
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

  const validation = validateBody(putSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  if (!getProjectById(validation.data.projectId)) {
    return NextResponse.json({ error: { message: "Project not found" } }, { status: 404 });
  }

  try {
    const mapping = setRepoProjectMapping(validation.data.repoKey, validation.data.projectId);
    appendAuditEvent({
      action: "repo_map.set",
      projectId: mapping.projectId,
      meta: { repoKey: mapping.repoKey },
    });
    return NextResponse.json({ mapping });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const repoKey = new URL(request.url).searchParams.get("repoKey");
  if (!repoKey) {
    return NextResponse.json(
      { error: { message: "repoKey query parameter required" } },
      { status: 400 }
    );
  }
  const ok = deleteRepoMapping(repoKey);
  if (!ok) {
    return NextResponse.json({ error: { message: "Mapping not found" } }, { status: 404 });
  }
  appendAuditEvent({ action: "repo_map.delete", meta: { repoKey } });
  return NextResponse.json({ ok: true });
}
