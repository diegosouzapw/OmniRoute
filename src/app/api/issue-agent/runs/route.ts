import { NextResponse } from "next/server";
import { z } from "zod";
import { appendIssueAgentAuditRecord } from "@/lib/issueAgent/audit";
import { normalizeGitHubIssueExport } from "@/lib/issueAgent/githubExport";
import { createRecordedTriageRun } from "@/lib/issueAgent/recordedTriage";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const issueAgentRunRequestSchema = z.object({
  mode: z.string().optional(),
  issueUrl: z.string().optional(),
  dryRun: z.boolean().optional(),
  recordedContext: z.unknown().optional(),
  githubExport: z.unknown().optional(),
});

const ENABLED_VALUES = new Set(["1", "true", "yes", "on"]);

function isIssueAgentEnabled(): boolean {
  return ENABLED_VALUES.has((process.env.OMNIROUTE_ISSUE_AGENT_ENABLED ?? "").toLowerCase());
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    enabled: isIssueAgentEnabled(),
    supportedModes: ["recorded-triage"],
    execution: "disabled-by-default",
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(issueAgentRunRequestSchema, body);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const parsed = validation.data;
  if (parsed.mode !== "recorded-triage") {
    return NextResponse.json(
      { error: "Unsupported issue-agent mode", supportedModes: ["recorded-triage"] },
      { status: 400 }
    );
  }

  if (!isIssueAgentEnabled()) {
    return NextResponse.json(
      {
        error: "Issue Agent execution is disabled",
        enabled: false,
        requiredEnv: "OMNIROUTE_ISSUE_AGENT_ENABLED=true",
      },
      { status: 403 }
    );
  }

  try {
    const normalized = parsed.githubExport
      ? normalizeGitHubIssueExport(parsed.githubExport)
      : null;
    const run = createRecordedTriageRun({
      ...parsed,
      issueUrl: parsed.issueUrl ?? normalized?.issueUrl,
      recordedContext: parsed.recordedContext ?? normalized?.recordedContext,
    });
    const audit = await appendIssueAgentAuditRecord(run);
    return NextResponse.json({ ...run, auditPath: audit.path });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid issue-agent request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
