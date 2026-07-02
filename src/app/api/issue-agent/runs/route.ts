import { access } from "fs/promises";
import { execFile } from "child_process";
import { promisify } from "util";
import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import {
  checkIssueAgentPrerequisites,
  createIssueAgentRun,
  listIssueAgentRuns,
  saveIssueAgentRun,
  type CommandRunner,
  type IssueAgentMode,
  type IssueAgentSettingsInput,
} from "@/lib/issueAgent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const execFileAsync = promisify(execFile);

const commandRunner: CommandRunner = async (command, args) => {
  try {
    const result = await execFileAsync(command, args, { timeout: 5000, windowsHide: true });
    return { exitCode: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    const err = error as { code?: number; stdout?: string; stderr?: string };
    return {
      exitCode: typeof err.code === "number" ? err.code : 1,
      stdout: err.stdout,
      stderr: err.stderr,
    };
  }
};

function isIssueAgentMode(value: unknown): value is IssueAgentMode {
  return value === "report" || value === "triage" || value === "fix" || value === "triage-and-fix";
}

async function detectDocker() {
  if (process.env.DOCKER_CONTAINER || process.env.KUBERNETES_SERVICE_HOST) return true;
  try {
    await access("/.dockerenv");
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return NextResponse.json(
    { runs: listIssueAgentRuns() },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    if (!isIssueAgentMode(body.mode)) {
      return createErrorResponse({
        status: 400,
        message: "mode must be report, triage, fix, or triage-and-fix",
      });
    }

    const needsPrereqs = body.mode === "fix" || body.mode === "triage-and-fix";
    const prerequisiteCheck = needsPrereqs
      ? await checkIssueAgentPrerequisites(commandRunner)
      : undefined;
    const run = saveIssueAgentRun(
      createIssueAgentRun({
        mode: body.mode,
        issueRef: typeof body.issueRef === "string" ? body.issueRef : undefined,
        source: typeof body.source === "string" ? body.source : "api",
        log: body.log,
        detail: body.detail,
        settings:
          body.settings && typeof body.settings === "object"
            ? (body.settings as IssueAgentSettingsInput)
            : undefined,
        prerequisiteCheck,
        dockerDetected: await detectDocker(),
      })
    );

    return NextResponse.json({ run }, { status: run.status === "blocked" ? 202 : 201 });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to create issue-agent run");
  }
}
