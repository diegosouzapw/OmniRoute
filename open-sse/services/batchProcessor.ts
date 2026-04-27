import { v4 as uuidv4 } from "uuid";
import {
  getPendingBatches,
  getTerminalBatches,
  updateBatch,
  getFileContent,
  createFile,
  getApiKeyById,
  getBatch,
  listFiles,
  deleteFile,
  updateFileStatus,
} from "@/lib/localDb";
import type { BatchRecord } from "@/lib/localDb";
import { dispatchBatchApiRequest } from "@/lib/batches/dispatch";
import type { SupportedBatchEndpoint } from "@/shared/constants/batchEndpoints";

let isProcessing = false;
let pollInterval: NodeJS.Timeout | null = null;
const DEFAULT_BATCH_WINDOW_SECONDS = 24 * 60 * 60;

interface BatchRequestItem {
  body: Record<string, unknown>;
  customId: string | null;
  lineNumber: number;
  method: "POST";
  url: SupportedBatchEndpoint;
}

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
 * Mark any in_progress/finalizing batches as failed on startup.
 * These were orphaned by a server crash or restart and cannot be safely resumed.
 */
function recoverOrphanedBatches() {
  try {
    const pending = getPendingBatches();
    for (const batch of pending) {
      if (batch.status === "in_progress" || batch.status === "finalizing") {
        const interruptedPhase =
          batch.status === "finalizing" ? "during finalization" : "while processing requests";
        console.warn(
          `[BATCH] Failing orphaned ${batch.status} batch ${batch.id} (server restarted)`
        );
        updateBatch(batch.id, {
          status: "failed",
          failedAt: Math.floor(Date.now() / 1000),
          errors: [
            {
              message: `Batch interrupted ${interruptedPhase} by server restart and cannot be resumed`,
            },
          ],
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
    // in_progress/finalizing batches are either actively being worked by the current process
    // or will be failed by recoverOrphanedBatches() on the next startup.
  }

  // Cleanup task: delete files for batches completed more than completionWindow ago
  await cleanupExpiredBatches();
}

function parseBatchWindowSeconds(window: string | null | undefined): number {
  if (!window) return DEFAULT_BATCH_WINDOW_SECONDS;
  const match = /^(\d+)([hdm])$/.exec(window);
  if (!match) return DEFAULT_BATCH_WINDOW_SECONDS;

  const value = Number.parseInt(match[1], 10);
  const unit = match[2];
  if (unit === "h") return value * 3600;
  if (unit === "d") return value * 86400;
  if (unit === "m") return value * 60;
  return DEFAULT_BATCH_WINDOW_SECONDS;
}

function getBatchOutputExpiresAt(batch: BatchRecord): number | null {
  if (
    batch.outputExpiresAfterAnchor === "created_at" &&
    typeof batch.outputExpiresAfterSeconds === "number" &&
    batch.outputExpiresAfterSeconds > 0
  ) {
    return batch.createdAt + batch.outputExpiresAfterSeconds;
  }

  const completionTime =
    batch.completedAt || batch.failedAt || batch.cancelledAt || batch.expiredAt;
  if (!completionTime) return null;
  return completionTime + parseBatchWindowSeconds(batch.completionWindow);
}

function resolveBatchApiKeyValue(batch: Pick<BatchRecord, "apiKeyId">, apiKeyRow: any) {
  if (typeof apiKeyRow?.key === "string" && apiKeyRow.key.length > 0) {
    return apiKeyRow.key;
  }
  if (batch.apiKeyId === "env-key") {
    return process.env.OMNIROUTE_API_KEY || process.env.ROUTER_API_KEY || null;
  }
  return null;
}

function parseBatchItems(
  content: Buffer,
  batchEndpoint: SupportedBatchEndpoint
): { items: BatchRequestItem[]; error: null } | { items: null; error: string } {
  const lines = content
    .toString()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const items: BatchRequestItem[] = [];
  for (const [index, line] of lines.entries()) {
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(line);
    } catch {
      return { items: null, error: `Line ${index + 1} is not valid JSON` };
    }

    const method = String(parsed.method || "POST").toUpperCase();
    const url = parsed.url;
    const body = parsed.body;

    if (method !== "POST") {
      return {
        items: null,
        error: `Line ${index + 1} uses unsupported method ${method}; only POST is supported`,
      };
    }
    if (url !== batchEndpoint) {
      return {
        items: null,
        error: `Line ${index + 1} url ${String(url)} does not match batch endpoint ${batchEndpoint}`,
      };
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return { items: null, error: `Line ${index + 1} must include a JSON object body` };
    }

    items.push({
      body: body as Record<string, unknown>,
      customId: typeof parsed.custom_id === "string" ? parsed.custom_id : null,
      lineNumber: index + 1,
      method: "POST",
      url: batchEndpoint,
    });
  }

  return { items, error: null };
}

async function cleanupExpiredBatches() {
  try {
    const now = Math.floor(Date.now() / 1000);
    const batches = getTerminalBatches();

    // Delete files for terminal batches that have exceeded their completion window
    for (const batch of batches) {
      const completionTime =
        batch.completedAt || batch.failedAt || batch.cancelledAt || batch.expiredAt;
      const inputExpiresAt =
        completionTime && batch.inputFileId
          ? completionTime + parseBatchWindowSeconds(batch.completionWindow)
          : null;
      const outputExpiresAt = getBatchOutputExpiresAt(batch);

      if (batch.inputFileId && inputExpiresAt && now > inputExpiresAt) {
        deleteFile(batch.inputFileId);
      }
      if (batch.outputFileId && outputExpiresAt && now > outputExpiresAt) {
        deleteFile(batch.outputFileId);
      }
      if (batch.errorFileId && outputExpiresAt && now > outputExpiresAt) {
        deleteFile(batch.errorFileId);
      }
    }

    // Expire validating batches that have exceeded their completion window
    for (const batch of getPendingBatches()) {
      if (batch.status === "validating") {
        const windowSeconds = parseBatchWindowSeconds(batch.completionWindow);
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
    const parsedItems = parseBatchItems(content, batch.endpoint);
    if (parsedItems.error) {
      updateFileStatus(batch.inputFileId, "processed");
      failBatch(batch.id, parsedItems.error);
      return;
    }
    const total = parsedItems.items.length;

    updateFileStatus(batch.inputFileId, "validating");
    updateBatch(batch.id, {
      status: "in_progress",
      inProgressAt: Math.floor(Date.now() / 1000),
      requestCountsTotal: total,
    });

    // Fire-and-forget: process items in the background so the poll loop isn't blocked.
    // isProcessing prevents a second poll tick from overlapping.
    processBatchItems(batch, parsedItems.items).catch((err) => {
      console.error(`[BATCH] Critical error in processBatchItems for ${batch.id}:`, err);
      failBatch(batch.id, String(err));
    });
  } catch (err) {
    console.error(`[BATCH] Error starting batch ${batch.id}:`, err);
    failBatch(batch.id, err instanceof Error ? err.message : String(err));
  }
}

async function processBatchItems(batch: BatchRecord, items: BatchRequestItem[]) {
  const results: any[] = [];
  const errors: any[] = [];
  let completedCount = 0;
  let failedCount = 0;
  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  let totalReasoningTokens = 0;
  let usedModel = batch.model || null;

  const apiKeyRow = batch.apiKeyId ? await getApiKeyById(batch.apiKeyId) : null;
  const apiKeyValue = resolveBatchApiKeyValue(batch, apiKeyRow);

  for (const item of items) {
    // Check if cancelled mid-process
    const current = getBatch(batch.id);
    if (!current || current.status === "cancelling" || current.status === "cancelled") {
      break;
    }

    try {
      // BATCH-SPECIFIC: Force stream: false — batches don't support SSE responses
      const isChatEndpoint = ![
        "/v1/embeddings",
        "/v1/moderations",
        "/v1/images/generations",
        "/v1/images/edits",
        "/v1/videos",
        "/v1/videos/generations",
      ].includes(item.url);

      const batchItemBody = {
        ...item.body,
        ...(isChatEndpoint ? { stream: false } : {}),
      };
      const response = await dispatchBatchApiRequest({
        endpoint: item.url,
        body: batchItemBody,
        apiKey: apiKeyValue,
      });

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
            responseData = {
              error: { message: text || "Unknown error", type: "invalid_response" },
            };
          }
        }
      } else {
        responseData = response;
      }

      const hasError = responseData?.error;
      const requestId = `batch_req_${uuidv4().replaceAll("-", "")}`;

      results.push({
        id: requestId,
        custom_id: item.customId,
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
      errors.push({
        custom_id: item.customId || `line-${item.lineNumber}`,
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
  if (current?.status === "cancelling" || current?.status === "cancelled") {
    if (current?.inputFileId) {
      updateFileStatus(current.inputFileId, "processed");
    }
    if (current?.status === "cancelling") {
      updateBatch(batchId, { status: "cancelled", cancelledAt: Math.floor(Date.now() / 1000) });
    }
    return;
  }

  updateBatch(batchId, { status: "finalizing", finalizingAt: Math.floor(Date.now() / 1000) });

  if (current?.inputFileId) {
    updateFileStatus(current.inputFileId, "processed");
  }

  let outputFileId: string | null = null;
  const outputExpiresAt = current ? getBatchOutputExpiresAt(current) : null;
  const successes = results.filter((r) => r.response.status_code < 400 && !r.response.body?.error);
  if (successes.length > 0) {
    const outputContent = successes.map((r) => JSON.stringify(r)).join("\n");
    const file = createFile({
      bytes: Buffer.byteLength(outputContent),
      filename: `batch_${batchId}_output.jsonl`,
      purpose: "batch_output",
      content: Buffer.from(outputContent),
      apiKeyId: current?.apiKeyId,
      status: "completed",
      expiresAt: outputExpiresAt,
    });
    outputFileId = file.id;
  }

  let errorFileId: string | null = null;
  const failures = results.filter((r) => r.response.status_code >= 400 || r.response.body?.error);
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
      expiresAt: outputExpiresAt,
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
