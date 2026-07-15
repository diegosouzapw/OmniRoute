import { NextResponse } from "next/server";
import { z } from "zod";
import { appendIssueAgentAuditRecord } from "@/lib/issueAgent/audit";
import { executeRecordedTriageChatCompletion } from "@/lib/issueAgent/execution";
import { normalizeGitHubIssueExport } from "@/lib/issueAgent/githubExport";
import { createRecordedTriageRun } from "@/lib/issueAgent/recordedTriage";
import { POST as postChatCompletion } from "@/app/api/v1/chat/completions/route";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import type { RecordedTriageExecutionInput, RecordedTriageChatCompletion } from "@/lib/issueAgent/execution";
import type { RecordedTriageRun } from "@/lib/issueAgent/recordedTriage";

const issueAgentRunRequestSchema = z.object({
  mode: z.string().optional(),
  issueUrl: z.string().optional(),
  dryRun: z.boolean().optional(),
  model: z.string().min(1).max(256).optional(),
  provider: z.string().min(1).max(128).optional(),
  routingPolicy: z.string().min(1).max(128).optional(),
  timeoutMs: z.number().int().min(1).max(120_000).optional(),
  recordedContext: z.unknown().optional(),
  githubExport: z.unknown().optional(),
});

const ENABLED_VALUES = new Set(["1", "true", "yes", "on"]);

export const issueAgentRouteExecutor = {
  async executeRecordedTriageChatCompletion(
    input: RecordedTriageExecutionInput,
    post: (request: Request) => Promise<Response>
  ): Promise<RecordedTriageChatCompletion> {
    return executeRecordedTriageChatCompletion(input, post);
  },
};

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
    const normalized = parsed.githubExport ? normalizeGitHubIssueExport(parsed.githubExport) : null;
    const run = createRecordedTriageRun({
      ...parsed,
      issueUrl: parsed.issueUrl ?? normalized?.issueUrl,
      recordedContext: parsed.recordedContext ?? normalized?.recordedContext,
    });

    const acceptedAudit = await appendIssueAgentAuditRecord(run, { state: "accepted" });
    if (run.dryRun) {
      return NextResponse.json({ ...run, auditPath: acceptedAudit.path });
    }

    const runningAudit = await appendIssueAgentAuditRecord(run, { state: "running" });
    const completion = await issueAgentRouteExecutor.executeRecordedTriageChatCompletion(
      {
        run,
        model: parsed.model,
        provider: parsed.provider,
        routingPolicy: parsed.routingPolicy,
        timeoutMs: parsed.timeoutMs,
      },
      postChatCompletion
    );
    await appendIssueAgentAuditRecord(run, {
      state: completion.terminalState,
      terminalState: completion.terminalState,
      completionStatus: completion.completionStatus,
      durationMs: completion.durationMs,
      terminalError: completion.terminalError,
      error: completion.terminalError,
    });

    const response = buildIssueAgentRunResponse(run, completion, runningAudit.path);
    return NextResponse.json(response.body, { status: response.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid issue-agent request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function buildIssueAgentRunResponse(
  run: RecordedTriageRun,
  completion: RecordedTriageChatCompletion,
  runningAuditPath: string
) {
  const status =
    completion.terminalState === "timed_out"
      ? 408
      : completion.terminalState === "budget_stopped"
        ? 429
        : completion.status;

  return {
    body: {
      ...run,
      runner: "omniroute-chat-completions",
      state: completion.terminalState,
      completionStatus: completion.completionStatus,
      terminalState: completion.terminalState,
      terminalError: completion.terminalError,
      timedOutMs: completion.timedOutMs,
      auditPath: runningAuditPath,
      completion: completion.body,
    },
    status,
  };
}
