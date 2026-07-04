import { NextResponse } from "next/server";
import { appendIssueAgentAuditRecord } from "@/lib/issueAgent/audit";
import { normalizeGitHubIssueExport } from "@/lib/issueAgent/githubExport";
import { createRecordedTriageRun } from "@/lib/issueAgent/recordedTriage";

interface IssueAgentRunRequest {
  mode?: string;
  issueUrl?: string;
  dryRun?: boolean;
  recordedContext?: unknown;
  githubExport?: unknown;
}

const ENABLED_VALUES = new Set(["1", "true", "yes", "on"]);

function isIssueAgentEnabled(): boolean {
  return ENABLED_VALUES.has((process.env.OMNIROUTE_ISSUE_AGENT_ENABLED ?? "").toLowerCase());
}

function parseRunRequest(value: unknown): IssueAgentRunRequest {
  if (!value || typeof value !== "object") return {};
  const row = value as Record<string, unknown>;
  return {
    mode: typeof row.mode === "string" ? row.mode : undefined,
    issueUrl: typeof row.issueUrl === "string" ? row.issueUrl : undefined,
    dryRun: typeof row.dryRun === "boolean" ? row.dryRun : undefined,
    recordedContext: row.recordedContext,
    githubExport: row.githubExport,
  };
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

  const parsed = parseRunRequest(body);
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
