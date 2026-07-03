import { access } from "fs/promises";
import { execFile } from "child_process";
import { promisify } from "util";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import {
  checkIssueAgentPrerequisites,
  createIssueAgentRun,
  listIssueAgentRuns,
  saveIssueAgentRun,
  type CommandRunner,
} from "@/lib/issueAgent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const execFileAsync = promisify(execFile);

const issueAgentModeSchema = z.enum(["report", "triage", "fix", "triage-and-fix"]);

const createIssueAgentRunSchema = z.object({
  mode: issueAgentModeSchema,
  source: z.string().max(100).optional(),
  issueRef: z.string().max(300).optional(),
  log: z.unknown().optional(),
  detail: z.unknown().optional(),
  settings: z
    .object({
      mode: issueAgentModeSchema.optional(),
      maxBudgetUsd: z.number().min(0).max(100).optional(),
      maxIterations: z.number().int().min(1).max(100).optional(),
      provider: z.string().max(100).optional(),
      model: z.string().max(200).optional(),
      routingPolicy: z.string().max(200).optional(),
      githubRepository: z.string().max(200).optional(),
      defaultBaseBranch: z.string().max(100).optional(),
      dockerWorkerImage: z.string().max(300).optional(),
      retentionDays: z.number().int().min(1).max(365).optional(),
      budgets: z
        .object({
          maxRuntimeSeconds: z.number().int().min(30).max(86_400).optional(),
          maxTokens: z.number().int().min(1_000).max(50_000_000).optional(),
          maxCostUsd: z.number().min(0).max(100_000).optional(),
        })
        .optional(),
    })
    .optional(),
});

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
    const parsed = createIssueAgentRunSchema.safeParse(await request.json());
    if (!parsed.success) {
      return createErrorResponse({
        status: 400,
        message: "Invalid issue-agent run request",
        details: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    const body = parsed.data;

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
        settings: body.settings,
        prerequisiteCheck,
        dockerDetected: await detectDocker(),
      })
    );

    return NextResponse.json({ run }, { status: run.status === "blocked" ? 202 : 201 });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to create issue-agent run");
  }
}
