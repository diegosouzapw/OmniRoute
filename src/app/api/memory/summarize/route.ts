import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { MemorySummarizeSchema } from "@/shared/schemas/memory";
import { summarizeMemoriesOlderThan } from "@/lib/memory/summarization";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: { message: "Invalid JSON body", details: [] } },
      { status: 400 },
    );
  }

  const validation = validateBody(MemorySummarizeSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  const { apiKeyId, olderThanDays, dryRun } = validation.data;

  try {
    const result = await summarizeMemoriesOlderThan(apiKeyId, olderThanDays, dryRun);
    return NextResponse.json({
      candidates: result.candidates,
      totalTokens: result.totalTokens,
      deletedCount: result.deletedCount,
      summaryId: result.summaryId,
      dryRun: result.dryRun,
    });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
