import { v4 as uuidv4 } from "uuid";
import {
  createFile,
  deleteFile,
  getApiKeyById,
  getBatch,
  getFileContent,
  getPendingBatches,
  getTerminalBatches,
  listFiles,
  updateBatch,
  updateFileStatus,
} from "@/lib/localDb";
import { handleChat } from "@/sse/handlers/chat";
import { POST as handleEmbeddingsRoute } from "@/app/api/v1/embeddings/route";
import { POST as handleModerationsRoute } from "@/app/api/v1/moderations/route";
import { POST as handleImagesGenerationsRoute } from "@/app/api/v1/images/generations/route";
import { POST as handleVideosGenerationsRoute } from "@/app/api/v1/videos/generations/route";

let isProcessing = false;
let pollInterval: NodeJS.Timeout | null = null;

export function initBatchProcessor() {
  if (pollInterval) return pollInterval;
  console.log("[BATCH] Initializing batch processor polling...");

  // Fail any batches that were in_progress when the server last shut down —
  // we cannot safely resume mid-batch without re-processing from scratch.
  recoverOrphanedBatches();

  pollInterval = setInterval(async () => {
    if (isProcessing) return;
    try {
      isProcessing = true;
      await processPendingBatches();
    } catch (err) {
      console.error("[BATCH] Polling error:", err);
    } finally {
      isProcessing = false;
    }
  }, 10000); // Poll every 10s
  return pollInterval;
}

export function stopBatchProcessor() {
  if (pollInterval) {
    clearInterval(pollInterval);
    pollInterval = null;
    console.log("[BATCH] Stopped batch processor polling.");
  }
}

/**
 * Mark any in_progress batches as failed on startup.
 * These were orphaned by a server crash or restart and cannot be safely resumed.
 */
function recoverOrphanedBatches() {
  try {
    const pending = getPendingBatches();
    for (const batch of pending) {
      if (batch.status === "in_progress") {
        console.warn(`[BATCH] Failing orphaned in_progress batch ${batch.id} (server restarted)`);
        updateBatch(batch.id, {
          status: "failed",
          failedAt: Math.floor(Date.now() / 1000),
          errors: [{ message: "Batch interrupted by server restart and cannot be resumed" }],
        });
        if (batch.inputFileId) {
          updateFileStatus(batch.inputFileId, "processed");
        }
      }
    }
  } catch (err) {
    console.error("[BATCH] Orphan recovery error:", err);
  }
}

export async function processPendingBatches() {
  const pending = getPendingBatches();
  for (const batch of pending) {
    if (batch.status === "validating") {
      await startBatch(batch);
    } else if (batch.status === "cancelling") {
      await cancelBatch(batch);
    }
    // in_progress: currently being processed by processBatchItems running in background;
    // orphaned in_progress batches are handled by recoverOrphanedBatches() at startup.
  }

  // Cleanup task: delete files for batches completed more than completionWindow ago
  await cleanupExpiredBatches();
}

async function cleanupExpiredBatches() {
  try {
    const now = Math.floor(Date.now() / 1000);
    const batches = getTerminalBatches();

    const parseWindow = (window: string): number => {
      if (!window) return 86400;
      const match = new RegExp(/^(\d+)([hdm])$/).exec(window);
      if (!match) return 86400;
      const val = Number.parseInt(match[1]);
      const unit = match[2];
      if (unit === "h") return val * 3600;
      if (unit === "d") return val * 86400;
      if (unit === "m") return val * 60;
      return 86400;
    };

    // Delete files for terminal batches that have exceeded their completion window
    for (const batch of batches) {
      const windowSeconds = parseWindow(batch.completionWindow);
      const completionTime =
        batch.completedAt || batch.failedAt || batch.cancelledAt || batch.expiredAt;
      if (completionTime && now - completionTime > windowSeconds) {
        if (batch.inputFileId) deleteFile(batch.inputFileId);
        if (batch.outputFileId) deleteFile(batch.outputFileId);
        if (batch.errorFileId) deleteFile(batch.errorFileId);
      }
    }

    // Expire validating batches that have exceeded their completion window
    for (const batch of getPendingBatches()) {
      if (batch.status === "validating") {
        const windowSeconds = parseWindow(batch.completionWindow);
        if (now - batch.createdAt > windowSeconds) {
          updateBatch(batch.id, { status: "expired", expiredAt: now });
        }
      }
    }

    // Cleanup orphan files (batch-purpose files stuck in validating after 48h)
    // Use asc order so oldest files are processed first; use a high limit to avoid missing old orphans.
    const allFiles = listFiles({ order: "asc", limit: 100 });
    for (const file of allFiles) {
      if (
        file.purpose === "batch" &&
        (file.status === "validating" || !file.status) &&
        now - file.createdAt > 172800
      ) {
        deleteFile(file.id);
      }
    }
  } catch (err) {
    console.error("[BATCH] Cleanup error:", err);
  }
}

async function startBatch(batch: any) {
  console.log(`[BATCH] Starting batch ${batch.id}`);

  const content = getFileContent(batch.inputFileId);
  if (!content) {
    failBatch(batch.id, "Input file content not found");
    return;
  }

  try {
    const lines = content.toString().split("\n").filter((l) => l.trim());
    const total = lines.length;

    updateFileStatus(batch.inputFileId, "validating");
    updateBatch(batch.id, {
      status: "in_progress",
      inProgressAt: Math.floor(Date.now() / 1000),
      requestCountsTotal: total,
    });

    // Fire-and-forget: process items in the background so the poll loop isn't blocked.
    // isProcessing prevents a second poll tick from overlapping.
    processBatchItems(batch, lines).catch((err) => {
      console.error(`[BATCH] Critical error in processBatchItems for ${batch.id}:`, err);
      failBatch(batch.id, String(err));
    });
  } catch (err) {
    console.error(`[BATCH] Error starting batch ${batch.id}:`, err);
    failBatch(batch.id, err instanceof Error ? err.message : String(err));
  }
}

/**
 * Dispatch a single batch item to the correct handler based on the URL.
 * Each batch item may target a different API endpoint (chat, embeddings, etc.).
 */
async function dispatchBatchItem(
  url: string,
  headers: Headers,
  body: Record<string, unknown>
): Promise<Response> {
  // BATCH-SPECIFIC: Force stream: false — batches don't support SSE responses.
  // This is primarily relevant for chat/completion endpoints.
  const isChatEndpoint = ![
    "/v1/embeddings",
    "/v1/moderations",
    "/v1/images/generations",
    "/v1/images/edits",
    "/v1/videos",
    "/v1/videos/generations",
  ].includes(url);

  const request = new Request(`http://localhost${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...body,
      ...(isChatEndpoint ? { stream: false } : {}),
    }),
  });

  switch (url) {
    case "/v1/embeddings":
      return handleEmbeddingsRoute(request);
    case "/v1/moderations":
      return handleModerationsRoute(request);
    case "/v1/images/generations":
      return handleImagesGenerationsRoute(request);
    case "/v1/videos/generations":
      return handleVideosGenerationsRoute(request);
    default:
      return handleChat(request);
  }
}

async function processBatchItems(batch: any, lines: string[]) {
  const results: any[] = [];
  const errors: any[] = [];
  let completedCount = 0;
  let failedCount = 0;
  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  let totalReasoningTokens = 0;
  let usedModel = batch.model || null;

  const apiKeyRow = batch.apiKeyId ? await getApiKeyById(batch.apiKeyId) : null;

  for (const line of lines) {
    // Check if cancelled mid-process
    const current = getBatch(batch.id);
    if (!current || current.status === "cancelling" || current.status === "cancelled") {
      break;
    }

    try {
      const item = JSON.parse(line);
      const { custom_id: customId, url, body } = item;

      const headers = new Headers();
      if (apiKeyRow?.key) {
        headers.set("Authorization", `Bearer ${apiKeyRow.key}`);
      }
      headers.set("Content-Type", "application/json");

      const response = await dispatchBatchItem(url, headers, body);

      let responseData: { error: any; id?: any; usage?: any; model?: any };
      let statusCode = 200;

      if (response instanceof Response) {
        statusCode = response.status;
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          responseData = await response.json();
        } else {
          const text = await response.text();
          try {
            responseData = JSON.parse(text);
          } catch {
            responseData = { error: { message: text || "Unknown error", type: "invalid_response" } };
          }
        }
      } else {
        responseData = response;
      }

      const hasError = responseData?.error;
      const requestId = `batch_req_${uuidv4().replaceAll("-", "")}`;

      results.push({
        id: requestId,
        custom_id: customId,
        response: {
          status_code: statusCode,
          request_id: responseData?.id || "req_unknown",
          body: responseData,
        },
        error: null,
      });

      if (hasError || statusCode >= 400) {
        failedCount++;
      } else {
        completedCount++;
        if (responseData?.usage) {
          totalInputTokens += responseData.usage.prompt_tokens || 0;
          totalOutputTokens += responseData.usage.completion_tokens || 0;
          totalReasoningTokens +=
            responseData.usage.completion_tokens_details?.reasoning_tokens || 0;
        }
        if (!usedModel && responseData?.model) {
          usedModel = responseData.model;
        }
      }
    } catch (err) {
      console.error(`[BATCH] Item failed in ${batch.id}:`, err);
      let customId = "unknown";
      try {
        customId = JSON.parse(line).custom_id || "unknown";
      } catch {
        // line was malformed JSON
      }
      errors.push({
        custom_id: customId,
        error: err instanceof Error ? err.message : String(err),
      });
      failedCount++;
    }

    // Throttle progress updates to every 50 items to reduce DB contention
    if ((completedCount + failedCount) % 50 === 0) {
      updateBatch(batch.id, {
        requestCountsCompleted: completedCount,
        requestCountsFailed: failedCount,
        model: usedModel,
        usage: {
          input_tokens: totalInputTokens,
          output_tokens: totalOutputTokens,
          total_tokens: totalInputTokens + totalOutputTokens,
          input_tokens_details: { cached_tokens: 0 },
          output_tokens_details: { reasoning_tokens: totalReasoningTokens },
        },
      });
    }
  }

  // Final progress update to capture accurate counts before finalization
  updateBatch(batch.id, {
    requestCountsCompleted: completedCount,
    requestCountsFailed: failedCount,
    model: usedModel,
    usage: {
      input_tokens: totalInputTokens,
      output_tokens: totalOutputTokens,
      total_tokens: totalInputTokens + totalOutputTokens,
      input_tokens_details: { cached_tokens: 0 },
      output_tokens_details: { reasoning_tokens: totalReasoningTokens },
    },
  });

  // Finalize
  await finalizeBatch(batch.id, results, errors);
}

async function finalizeBatch(batchId: string, results: any[], itemsWithErrors: any[]) {
  const current = getBatch(batchId);
  if (current?.status === "cancelling") {
    updateBatch(batchId, { status: "cancelled", cancelledAt: Math.floor(Date.now() / 1000) });
    return;
  }

  updateBatch(batchId, { status: "finalizing", finalizingAt: Math.floor(Date.now() / 1000) });

  if (current?.inputFileId) {
    updateFileStatus(current.inputFileId, "processed");
  }

  let outputFileId: string | null = null;
  const successes = results.filter(
    (r) => r.response.status_code < 400 && !r.response.body?.error
  );
  if (successes.length > 0) {
    const outputContent = successes.map((r) => JSON.stringify(r)).join("\n");
    const file = createFile({
      bytes: Buffer.byteLength(outputContent),
      filename: `batch_${batchId}_output.jsonl`,
      purpose: "batch_output",
      content: Buffer.from(outputContent),
      apiKeyId: current?.apiKeyId,
      status: "completed",
    });
    outputFileId = file.id;
  }

  let errorFileId: string | null = null;
  const failures = results.filter(
    (r) => r.response.status_code >= 400 || r.response.body?.error
  );
  const allFailures = [
    ...failures,
    ...itemsWithErrors.map((e) => ({
      id: `batch_req_${uuidv4().replaceAll("-", "")}`,
      custom_id: e.custom_id,
      response: null,
      error: { message: e.error, type: "batch_process_error" },
    })),
  ];

  if (allFailures.length > 0) {
    const errorContent = allFailures.map((e) => JSON.stringify(e)).join("\n");
    const file = createFile({
      bytes: Buffer.byteLength(errorContent),
      filename: `batch_${batchId}_error.jsonl`,
      purpose: "batch_output",
      content: Buffer.from(errorContent),
      apiKeyId: current?.apiKeyId,
      status: "completed",
    });
    errorFileId = file.id;
  }

  updateBatch(batchId, {
    status: "completed",
    completedAt: Math.floor(Date.now() / 1000),
    outputFileId,
    errorFileId,
  });
  console.log(`[BATCH] Completed batch ${batchId}`);
}

async function cancelBatch(batch: any) {
  updateBatch(batch.id, {
    status: "cancelled",
    cancelledAt: Math.floor(Date.now() / 1000),
  });
  console.log(`[BATCH] Cancelled batch ${batch.id}`);
}

function failBatch(batchId: string, reason: string) {
  updateBatch(batchId, {
    status: "failed",
    failedAt: Math.floor(Date.now() / 1000),
    errors: [{ message: reason }],
  });
}
