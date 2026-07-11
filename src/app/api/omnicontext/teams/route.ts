import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  createTeam,
  listTeams,
  assignProjectToTeam,
  listProjectsByTeam,
  getTeamById,
} from "@/lib/db/omnicontextTeams";
import { getProjectById } from "@/lib/db/omnicontextProjects";
import { appendAuditEvent } from "@/lib/db/omnicontextAudit";

const createSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  orgId: z.string().nullable().optional(),
  departmentId: z.string().nullable().optional(),
});

const assignSchema = z.object({
  projectId: z.string().min(1),
  teamId: z.string().nullable(),
});

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orgId = request.nextUrl.searchParams.get("orgId") || undefined;
  const departmentId = request.nextUrl.searchParams.get("departmentId") || undefined;
  const teamId = request.nextUrl.searchParams.get("teamId");
  try {
    if (teamId) {
      const team = getTeamById(teamId);
      if (!team) return NextResponse.json({ error: { message: "Not found" } }, { status: 404 });
      return NextResponse.json({ team, projects: listProjectsByTeam(teamId) });
    }
    return NextResponse.json({ teams: listTeams({ orgId, departmentId }) });
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
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }
  const validation = validateBody(createSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }
  try {
    const team = createTeam(validation.data);
    appendAuditEvent({
      action: "team.create",
      meta: { teamId: team.id, slug: team.slug },
    });
    return NextResponse.json({ team }, { status: 201 });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    const status = message.includes("UNIQUE") ? 409 : 500;
    return NextResponse.json({ error: { message } }, { status });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }
  const validation = validateBody(assignSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }
  if (!getProjectById(validation.data.projectId)) {
    return NextResponse.json({ error: { message: "Project not found" } }, { status: 404 });
  }
  if (validation.data.teamId && !getTeamById(validation.data.teamId)) {
    return NextResponse.json({ error: { message: "Team not found" } }, { status: 404 });
  }
  assignProjectToTeam(validation.data.projectId, validation.data.teamId);
  return NextResponse.json({ ok: true });
}
