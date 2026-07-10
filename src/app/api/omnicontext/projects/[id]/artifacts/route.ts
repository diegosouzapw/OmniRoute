import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { getProjectById } from "@/lib/db/omnicontextProjects";
import {
  listArtifacts,
  softDeleteArtifact,
  approveArtifact,
  getArtifactById,
} from "@/lib/db/omnicontextArtifacts";
import { publishArtifact, PublishError } from "@/lib/omnicontext/publish";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";

const publishSchema = z.object({
  type: z.enum(["summary", "decision", "blocker", "snippet", "handoff", "stable_prefix"]),
  title: z.string().min(1).max(500),
  body: z.string().min(1).max(200_000),
  ticketId: z.string().nullable().optional(),
  repo: z.string().nullable().optional(),
  branch: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  publishPolicy: z.enum(["auto", "review_required", "lead_only"]).optional(),
  supersedesId: z.string().nullable().optional(),
  apiKeyId: z.string().min(1),
});

type RouteCtx = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, ctx: RouteCtx) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  if (!getProjectById(id)) {
    return NextResponse.json({ error: { message: "Project not found" } }, { status: 404 });
  }
  const type = request.nextUrl.searchParams.get("type") || undefined;
  try {
    const artifacts = listArtifacts({
      projectId: id,
      type: type as Parameters<typeof listArtifacts>[0]["type"],
    });
    return NextResponse.json({ artifacts });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}

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
  const validation = validateBody(publishSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  try {
    const result = publishArtifact({
      projectId: id,
      apiKeyId: validation.data.apiKeyId,
      type: validation.data.type,
      title: validation.data.title,
      body: validation.data.body,
      ticketId: validation.data.ticketId,
      repo: validation.data.repo,
      branch: validation.data.branch,
      tags: validation.data.tags,
      publishPolicy: validation.data.publishPolicy,
      supersedesId: validation.data.supersedesId,
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

export async function DELETE(request: NextRequest, ctx: RouteCtx) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const artifactId = request.nextUrl.searchParams.get("artifactId");
  if (!artifactId) {
    return NextResponse.json({ error: { message: "artifactId required" } }, { status: 400 });
  }
  const art = getArtifactById(artifactId);
  if (!art || art.projectId !== id) {
    return NextResponse.json({ error: { message: "Artifact not found" } }, { status: 404 });
  }
  softDeleteArtifact(artifactId);
  appendAuditEvent({
    action: "artifact.delete",
    projectId: id,
    meta: { artifactId },
  });
  return NextResponse.json({ ok: true });
}

export async function PATCH(request: NextRequest, ctx: RouteCtx) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }
  const schema = z.object({
    artifactId: z.string().min(1),
    action: z.literal("approve"),
    apiKeyId: z.string().min(1),
  });
  const validation = validateBody(schema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }
  const art = getArtifactById(validation.data.artifactId);
  if (!art || art.projectId !== id) {
    return NextResponse.json({ error: { message: "Artifact not found" } }, { status: 404 });
  }
  const updated = approveArtifact(validation.data.artifactId, validation.data.apiKeyId);
  appendAuditEvent({
    action: "artifact.approve",
    projectId: id,
    actorApiKeyId: validation.data.apiKeyId,
    meta: { artifactId: validation.data.artifactId },
  });
  return NextResponse.json({ artifact: updated });
}
