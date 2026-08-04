import { NextResponse } from "next/server";
import { z } from "zod";
import { appendIssueAgentAuditRecord } from "@/lib/issueAgent/audit";
import {
  executeRecordedTriageChatCompletion,
  RecordedTriageTimeoutError,
} from "@/lib/issueAgent/execution";
import { normalizeGitHubIssueExport } from "@/lib/issueAgent/githubExport";
import { createRecordedTriageRun } from "@/lib/issueAgent/recordedTriage";
import { POST as postChatCompletion } from "@/app/api/v1/chat/completions/route";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

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

function isIssueAgentEnabled(): boolean {
  return ENABLED_VALUES.has((process.env.OMNIROUTE_ISSUE_AGENT_ENABLED ?? "").toLowerCase());
}

/**
 * Node's own fs/system errors (ENOENT, EACCES, EEXIST, ...) always set `.code`
 * to an uppercase errno identifier and embed the absolute path in `.message`
 * (e.g. `appendIssueAgentAuditRecord`'s mkdir/appendFile on DATA_DIR). Hand-thrown
 * validation errors in this module (createRecordedTriageRun,
 * normalizeGitHubIssueExport) are plain `new Error("...")` with a curated,
 * path-free message and never set `.code` — so this check safely distinguishes
 * "safe to show the client" validation failures from opaque internal/system
 * errors that could otherwise leak the server's filesystem layout.
 */
function isNodeSystemError(error: unknown): error is NodeJS.ErrnoException {
  return (
    error instanceof Error &&
    typeof (error as NodeJS.ErrnoException).code === "string" &&
    /^[A-Z]/.test((error as NodeJS.ErrnoException).code as string)
  );
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
    const audit = await appendIssueAgentAuditRecord(run);
    if (run.dryRun) {
      return NextResponse.json({ ...run, auditPath: audit.path });
    }

    const completion = await executeRecordedTriageChatCompletion(
      {
        run,
        model: parsed.model,
        provider: parsed.provider,
        routingPolicy: parsed.routingPolicy,
        timeoutMs: parsed.timeoutMs,
      },
      postChatCompletion
    );
    return NextResponse.json(
      {
        ...run,
        runner: "omniroute-chat-completions",
        auditPath: audit.path,
        completion: completion.body,
      },
      { status: completion.status }
    );
  } catch (error) {
    if (error instanceof RecordedTriageTimeoutError) {
      return NextResponse.json(
        { error: sanitizeErrorMessage(error.message), code: "ISSUE_AGENT_TIMEOUT" },
        { status: 504 }
      );
    }
    // Hard Rule #12: never put a raw err.message in a response. Validation
    // failures thrown by this module (bad issue URL, malformed GitHub export)
    // are safe, curated messages meant for the client — sanitizeErrorMessage()
    // is a no-op for them. An opaque Node system/fs error (e.g. audit.ts
    // failing to mkdir/appendFile under DATA_DIR) is replaced with a generic
    // message instead, since its raw text would otherwise embed the server's
    // absolute filesystem path.
    const message = isNodeSystemError(error)
      ? "Issue Agent request failed due to an internal error"
      : sanitizeErrorMessage(error instanceof Error ? error.message : "Invalid issue-agent request");
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
