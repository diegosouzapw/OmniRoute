import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { MemoryReindexSchema } from "@/shared/schemas/memory";
import { runReindexBatch, getReindexPending } from "@/lib/memory/reindex";
import { createReindexDrainController } from "@/lib/memory/reindexDrain";
import { markAllMemoriesNeedReindex } from "@/lib/db/memoryVec";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { logger } from "@omniroute/open-sse/utils/logger.ts";

const log = logger("MEMORY_REINDEX_ROUTE");

const reindexDrain = createReindexDrainController({
  runBatch: runReindexBatch,
  getPending: getReindexPending,
  onComplete: (result) => {
    if (result.reason === "drained") {
      log.info("memory.reindex.background.complete", { ...result });
    } else {
      log.warn("memory.reindex.background.paused", { ...result });
    }
  },
  onError: (err: unknown) => {
    log.error("memory.reindex.background.fail", {
      error: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
    });
  },
});

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: { message: "Invalid JSON body", details: [] } },
      { status: 400 }
    );
  }

  const validation = validateBody(MemoryReindexSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  const { force } = validation.data;

  try {
    // Queue resets must be guarded by the same single-flight lock as the
    // worker. Otherwise POST {force:true} while running reflags already
    // processed rows even though start() correctly refuses a second worker.
    // Keep the pending count in the response and preserve the empty-queue
    // {started:true} behavior for an idle worker.
    const started = reindexDrain.start(force ? markAllMemoriesNeedReindex : undefined);
    const pending = getReindexPending();
    return NextResponse.json({ started, pending });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
