import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { MemoryReindexSchema } from "@/shared/schemas/memory";
import { runReindexBatch, getReindexPending } from "@/lib/memory/reindex";
import { markAllMemoriesNeedReindex } from "@/lib/localDb";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { logger } from "@omniroute/open-sse/utils/logger.ts";

const log = logger("MEMORY_REINDEX_ROUTE");

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

  const validation = validateBody(MemoryReindexSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  const { force } = validation.data;

  try {
    if (force) {
      markAllMemoriesNeedReindex();
    }

    const pending = getReindexPending();

    // Dispatch batch in background — do NOT await (returns immediate response).
    setImmediate(() => {
      runReindexBatch(100).catch((err: unknown) => {
        log.error("memory.reindex.background.fail", {
          error: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
        });
      });
    });

    return NextResponse.json({ started: true, pending });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
