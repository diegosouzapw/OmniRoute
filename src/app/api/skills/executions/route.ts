import { NextResponse } from "next/server";
import { skillExecutor } from "@/lib/skills/executor";
import { parsePaginationParams, buildPaginatedResponse } from "@/shared/types/pagination";
import { z } from "zod";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { isAuthenticated } from "@/shared/utils/apiAuth";

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const url = new URL(request.url);
    const params = parsePaginationParams(url.searchParams);
    const apiKeyId = url.searchParams.get("apiKeyId") || undefined;
    const total = skillExecutor.countExecutions(apiKeyId);
    const executions = skillExecutor.listExecutions(
      apiKeyId,
      params.limit,
      (params.page - 1) * params.limit
    );
    return NextResponse.json(buildPaginatedResponse(executions, total, params));
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}

const executionSchema = z.object({
  skillName: z.string().min(1),
  apiKeyId: z.string().min(1),
  input: z.record(z.string(), z.unknown()).optional(),
  sessionId: z.string().optional(),
});

export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const rawBody = await request.json();
    const validation = validateBody(executionSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(validation.error, { status: 400 });
    }
    const { skillName, input, apiKeyId, sessionId } = validation.data;

    const execution = await skillExecutor.execute(skillName, input || {}, {
      apiKeyId,
      sessionId,
    });
    return NextResponse.json({ execution });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    if (error.includes("disabled")) {
      return NextResponse.json({ error }, { status: 503 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
