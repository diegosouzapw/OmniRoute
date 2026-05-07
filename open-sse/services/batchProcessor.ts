import { v4 as uuidv4 } from "uuid";
import type { BatchRecord } from "@/lib/localDb";
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
} from "@/lib/localDb";
import { dispatch } from "@/lib/batches/dispatch";
import type { SupportedBatchEndpoint } from "@/shared/constants/batchEndpoints";
import { DEFAULT_BATCH_EXPIRATION_SECONDS } from "@/shared/constants/batch";

let isProcessing: boolean = false;
let pollInterval: NodeJS.Timeout | null = null;
const activeProcesses = new Set<Promise<void>>();
const DEFAULT_BATCH_WINDOW_SECONDS: number = 24 * 60 * 60;

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

  pollInterval = setInterval(async (): Promise<void> => {
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

export function stopBatchProcessor(): void {
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
function recoverOrphanedBatches(): void {
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
      }
    }
  } catch (err) {
    console.error("[BATCH] Orphan recovery error:", err);
  }
}

export async function processPendingBatches(): Promise<void> {
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

  const completionTime: number =
    batch.completedAt || batch.failedAt || batch.cancelledAt || batch.expiredAt;
  if (!completionTime) return null;
  // Default: batch output files expire 30 days after completion
  return completionTime + DEFAULT_BATCH_EXPIRATION_SECONDS;
}

function resolveBatchApiKeyValue(batch: Pick<BatchRecord, "apiKeyId">, apiKeyRow: any): any {
  if (typeof apiKeyRow?.key === "string" && apiKeyRow.key.length > 0) {
    return apiKeyRow.key;
  }
  if (batch.apiKeyId === "env-key") {
    return process.env.OMNIROUTE_API_KEY || process.env.ROUTER_API_KEY || null;
  }
  return null;
}

export function parseBatchItems(
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

async function cleanupExpiredBatches(): Promise<void> {
  try {
    const now = Math.floor(Date.now() / 1_000);
    const batches = getTerminalBatches();

    // Delete files for terminal batches that have exceeded their completion window
    for (const batch of batches) {
      const completionTime =
        batch.completedAt || batch.failedAt || batch.cancelledAt || batch.expiredAt;
      // Input files expire 30 days after batch completion
      const inputExpiresAt =
        completionTime && batch.inputFileId
          ? completionTime + DEFAULT_BATCH_EXPIRATION_SECONDS
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
      if (file.purpose === "batch" && now - file.createdAt > DEFAULT_BATCH_EXPIRATION_SECONDS) {
        deleteFile(file.id);
      }
    }
  } catch (err) {
    console.error("[BATCH] Cleanup error:", err);
  }
}

async function startBatch(batch: any): Promise<void> {
  console.log(`[BATCH] Starting batch ${batch.id}`);

  const content = getFileContent(batch.inputFileId);
  if (!content) {
    failBatch(batch.id, "Input file content not found");
    return;
  }

  try {
    const parsedItems = parseBatchItems(content, batch.endpoint);
    if (parsedItems.error) {
      // Set total count even on validation failure so UI shows correct numbers
      const lines = content
        .toString()
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      updateBatch(batch.id, {
        requestCountsTotal: lines.length,
        requestCountsFailed: lines.length, // All failed due to validation error
      });
      failBatch(batch.id, parsedItems.error);
      return;
    }
    const total = parsedItems.items.length;

    console.log(`[BATCH] Batch ${batch.id} contains (${total} items)`);

    updateBatch(batch.id, {
      status: "in_progress",
      inProgressAt: Math.floor(Date.now() / 1000),
      requestCountsTotal: total,
    });

    // Fire-and-forget: process items in the background so the poll loop isn't blocked.
    // isProcessing prevents a second poll tick from overlapping.
    const p = processBatchItems(batch, parsedItems.items).catch((err) => {
      console.error(`[BATCH] Critical error in processBatchItems for ${batch.id}:`, err);
      failBatch(batch.id, String(err));
    });
    activeProcesses.add(p);
    p.finally(() => activeProcesses.delete(p));
  } catch (err) {
    console.error(`[BATCH] Error starting batch ${batch.id}:`, err);
    failBatch(batch.id, err instanceof Error ? err.message : String(err));
  }
}

async function processBatchItems(batch: BatchRecord, items: BatchRequestItem[]): Promise<void> {
  const state = createBatchState(batch);

  const apiKey = await resolveApiKey(batch);
  let prevHeaders: Headers | null = null;

  for (const item of items) {
    if (isBatchCancelled(batch.id)) break;

    if (prevHeaders) {
      const delay = maybeThrottle(prevHeaders);
      if (delay) {
        await sleep(delay);
      }
    }

    try {
      const response = await processSingleItemWithRetry(item, apiKey);
      let responseBody: unknown;
      try {
        responseBody = await response.clone().json();
      } catch {
        responseBody = await response.text();
      }

      // Record the item's result so finalization can emit output/error files.
      // The output file format expects entries like:
      // { id, custom_id, response: { status_code, body } }
      const wrapped = {
        id: `req_${uuidv4().replaceAll("-", "")}`,
        custom_id: item.customId ?? null,
        response: {
          status_code: response.status,
          body: responseBody,
        },
      };

      state.results.push(wrapped);
      applyItemResult(state, response.status, responseBody);
      prevHeaders = response.headers;
    } catch (exception) {
      // Track processing-level errors separately (items that failed to be processed)
      state.errors.push({ custom_id: item.customId ?? null, error: String(exception) });
      prevHeaders = null;
    }

    maybePersistProgress(batch.id, state);
  }

  return finalizeBatch(batch.id, state.results, state.errors);
}

function isBatchCancelled(batchId: string): boolean {
  const current = getBatch(batchId);

  return !current || current.status === "cancelling" || current.status === "cancelled";
}

async function resolveApiKey(batch: BatchRecord): Promise<any> {
  const apiKeyRow = batch.apiKeyId ? await getApiKeyById(batch.apiKeyId) : null;
  return resolveBatchApiKeyValue(batch, apiKeyRow);
}

async function processSingleItemWithRetry(item: BatchRequestItem, apiKey: string) {
  // TODO: expose as configurable parameter
  const maxRetries = 10;

  let response: Response = null;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    // If the previous attempt got a response, check for rate limit headers and throttle if needed before retrying.
    if (response) {
      const delay = maybeThrottle(response.headers);
      if (delay) {
        await sleep(delay);
      }
    }

    response = await processSingleItem(item, apiKey);

    if (
      (response.status === 429 || response.status === 502 || response.status === 504) &&
      attempt < maxRetries
    ) {
      const delay = getRetryDelayMs(response.headers) ?? getBackoffDelayMs(attempt);
      await sleep(delay);
      continue;
    }

    return response;
  }
}

async function processSingleItem(item: BatchRequestItem, apiKey: string) {
  const body = buildRequestBody(item);

  return await dispatch.dispatchBatchApiRequest({
    endpoint: item.url,
    body,
    apiKey,
  });
}

export function buildRequestBody(item: BatchRequestItem) {
  const isChatEndpoint = ![
    "/v1/embeddings",
    "/v1/moderations",
    "/v1/images/generations",
    "/v1/images/edits",
    "/v1/videos",
    "/v1/videos/generations",
  ].includes(item.url);

  return {
    ...item.body,
    ...(isChatEndpoint ? { stream: false } : {}),
  };
}

function getBackoffDelayMs(attempt: number) {
  // TODO: expose in config
  let baseMs = 500;
  let maxMs = 30_000;

  // exponential: 2^attempt * base
  const exp = Math.min(maxMs, baseMs * 2 ** attempt);

  // jitter ±20%
  const jitterFactor = 1 + (Math.random() * 0.4 - 0.2);

  return Math.floor(exp * jitterFactor);
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
function getRetryDelayMs(headers: Headers): number | null {
  const retryAfter = headers.get("retry-after");
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (!Number.isNaN(seconds)) {
      return seconds * 1_000;
    }

    // fallback: HTTP-date
    const date = new Date(retryAfter).getTime();
    if (!Number.isNaN(date)) {
      return Math.max(0, date - Date.now());
    }
  }

  return null;
}

export function maybeThrottle(headers: Headers): number | null {
  // Mistral reports these headers from their API
  const remainingReq = toNumber(headers.get("x-ratelimit-remaining-req-minute"));
  const limitReq = toNumber(headers.get("x-ratelimit-limit-req-minute"));

  const remainingTokens = toNumber(headers.get("x-ratelimit-remaining-tokens-minute"));
  const cost = toNumber(headers.get("x-ratelimit-tokens-query-cost"));

  let pressures: number[] = [];

  // Request pressureRemaining
  if (remainingReq !== null && limitReq !== null) {
    if (limitReq > 0) {
      pressures.push(remainingReq / limitReq);
    }
  }

  // Token pressureRemaining
  if (remainingTokens !== null && cost !== null) {
    if (remainingTokens + cost > 0) {
      pressures.push(remainingTokens / (remainingTokens + cost));
    }
  }

  if (pressures.length === 0) {
    console.log("[BATCH] Throttle check - no rate-limit headers present");
    return null;
  } else {
    const tokenTotal = remainingTokens != null && cost != null ? remainingTokens + cost : null;
    console.log(
      `[BATCH] Throttle check - Request pressure: ${remainingReq ?? "n/a"}/${limitReq ?? "n/a"}, Token pressure: ${remainingTokens ?? "n/a"}/${tokenTotal ?? "n/a"}`
    );
  }

  const pressureRemaining = Math.min(...pressures);

  const delay = throttleDelay(pressureRemaining);
  if (delay !== null) {
    console.log(
      `[BATCH] Throttling next request with delay of ${Math.round(delay)}ms (pressure remaining: ${(pressureRemaining * 100).toFixed(2)}%)`
    );
  }
  return delay;
}

function throttleDelay(pressure: number): number | null {
  if (pressure >= 0.2) return null;

  const severity = (0.2 - pressure) / 0.2;

  const delay = Math.pow(severity, 2) * 30_000;

  return 200 + delay + Math.random() * 1000;
}

const toNumber = (v: string | null) => {
  if (v === null || v.trim() === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

function createBatchState(batch: BatchRecord) {
  return {
    results: [],
    errors: [],
    completed: 0,
    failed: 0,
    tokens: {
      input: 0,
      output: 0,
      reasoning: 0,
    },
    model: batch.model || null,
  };
}

function applyItemResult(state: any, statusCode: number, body: any): void {
  if (statusCode >= 400 || body?.error) {
    state.failed++;
  } else {
    state.completed++;

    if (body?.usage) {
      state.tokens.input += body.usage.prompt_tokens || body.usage.input_tokens || 0;
      state.tokens.output += body.usage.completion_tokens || body.usage.output_tokens || 0;
      state.tokens.reasoning += body.usage.completion_tokens_details?.reasoning_tokens || 0;
    }

    if (!state.model && body?.model) {
      state.model = body.model;
    }
  }
}

function maybePersistProgress(batchId: string, state: any): void {
  // Persist basic progress (completed/failed counts + model) on every item so
  // the UI can show up-to-date progress even for small batches.
  try {
    updateBatch(batchId, {
      requestCountsCompleted: state.completed,
      requestCountsFailed: state.failed,
      model: state.model,
    });
  } catch (err) {
    console.error(`[BATCH] Failed to persist progress for ${batchId}:`, err);
  }

  // Persist richer usage/model info less frequently to avoid excessive writes.
  const total = state.completed + state.failed;
  if (total % 50 !== 0) return;

  try {
    updateBatch(batchId, {
      requestCountsCompleted: state.completed,
      requestCountsFailed: state.failed,
      model: state.model,
      usage: {
        input_tokens: state.tokens.input,
        output_tokens: state.tokens.output,
        total_tokens: state.tokens.input + state.tokens.output,
        input_tokens_details: { cached_tokens: 0 },
        output_tokens_details: { reasoning_tokens: state.tokens.reasoning },
      },
    });
  } catch (err) {
    console.error(`[BATCH] Failed to persist extended progress for ${batchId}:`, err);
  }
}

async function finalizeBatch(
  batchId: string,
  results: any[],
  itemsWithErrors: any[]
): Promise<void> {
  const current = getBatch(batchId);

  if (handleCancellation(batchId, current)) return;

  // Mark as finalizing first
  markFinalizing(batchId);

  // Compute counts from results
  const successes = results.filter(
    (r) =>
      typeof r.response?.status_code === "number" &&
      r.response.status_code < 400 &&
      !r.response.body?.error
  );
  const failuresFromResults = results.filter(
    (r) =>
      (typeof r.response?.status_code === "number" && r.response.status_code >= 400) ||
      r.response?.body?.error
  );
  const processingErrors = itemsWithErrors || [];

  const completedCount = successes.length;
  const failedCount = failuresFromResults.length + processingErrors.length;
  const totalCount = current?.requestCountsTotal || completedCount + failedCount;

  // Aggregate usage from per-item responses when available
  let inputTokens = 0;
  let outputTokens = 0;
  let reasoningTokens = 0;

  for (const r of results) {
    try {
      const body = r.response?.body;
      if (!body) continue;
      const usage = body.usage || {};
      inputTokens += usage.prompt_tokens ?? usage.input_tokens ?? usage.total_tokens ?? 0;
      outputTokens += usage.completion_tokens ?? 0;
      reasoningTokens += usage.completion_tokens_details?.reasoning_tokens ?? 0;
    } catch (err) {
      console.error("Failed to aggregate usage for batch", batchId, err);
    }
  }

  const model =
    results.find((r) => r.response?.body?.model)?.response?.body?.model || current?.model || null;

  const completionTime = now();

  // Persist final counts and (approximate) usage so UI shows correct numbers
  try {
    updateBatch(batchId, {
      requestCountsTotal: totalCount,
      requestCountsCompleted: completedCount,
      requestCountsFailed: failedCount,
      model,
      usage: {
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        total_tokens: inputTokens + outputTokens,
        input_tokens_details: { cached_tokens: 0 },
        output_tokens_details: { reasoning_tokens: reasoningTokens },
      },
      // also set completedAt so file expiration calculation can use it
      completedAt: completionTime,
    });
  } catch (err) {
    console.error(`[BATCH] Failed to persist final progress for ${batchId}:`, err);
  }

  // Re-read the batch (with completedAt set) so file creation sees a completion timestamp
  const batchForFiles = getBatch(batchId);

  const outputFileId = createSuccessFile(batchId, batchForFiles, results);
  const errorFileId = createErrorFile(batchId, batchForFiles, results, itemsWithErrors);

  completeBatch(batchId, outputFileId, errorFileId);
}

function handleCancellation(batchId: string, current: any): boolean {
  if (!current) return true;

  if (current.status === "cancelling") {
    updateBatch(batchId, {
      status: "cancelled",
      cancelledAt: now(),
    });
    return true;
  }

  return current.status === "cancelled";
}

function markFinalizing(batchId: string): void {
  updateBatch(batchId, {
    status: "finalizing",
    finalizingAt: now(),
  });
}

function completeBatch(
  batchId: string,
  outputFileId: string | null,
  errorFileId: string | null
): void {
  updateBatch(batchId, {
    status: "completed",
    completedAt: now(),
    outputFileId,
    errorFileId,
  });

  const b = getBatch(batchId);
  const total = b?.requestCountsTotal ?? "?";
  console.log(`[BATCH] Completed batch ${batchId} (${total} items)`);
}

function now(): number {
  return Math.floor(Date.now() / 1_000);
}

function createSuccessFile(batchId: string, current: any, results: any[]): string | null {
  const successes = results.filter((r) => r.response.status_code < 400 && !r.response.body?.error);

  if (successes.length === 0) return null;

  const content = toJsonl(successes);

  const file = createFile({
    bytes: Buffer.byteLength(content),
    filename: `batch_${batchId}_output.jsonl`,
    purpose: "batch_output",
    content: Buffer.from(content),
    apiKeyId: current?.apiKeyId,
    expiresAt: getBatchOutputExpiresAt(current),
  });

  return file.id;
}

function createErrorFile(
  batchId: string,
  current: any,
  results: any[],
  itemsWithErrors: any[]
): string | null {
  const failures = results.filter((r) => r.response.status_code >= 400 || r.response.body?.error);

  const processErrors = itemsWithErrors.map((e) => ({
    id: `batch_req_${uuidv4().replaceAll("-", "")}`,
    custom_id: e.custom_id,
    response: null,
    error: { message: e.error, type: "batch_process_error" },
  }));

  const allFailures = [...failures, ...processErrors];

  if (allFailures.length === 0) return null;

  const content = toJsonl(allFailures);

  const file = createFile({
    bytes: Buffer.byteLength(content),
    filename: `batch_${batchId}_error.jsonl`,
    purpose: "batch_output",
    content: Buffer.from(content),
    apiKeyId: current?.apiKeyId,
    expiresAt: getBatchOutputExpiresAt(current),
  });

  return file.id;
}

function toJsonl(items: any[]): string {
  return items.map((i) => JSON.stringify(i)).join("\n");
}

async function cancelBatch(batch: any): Promise<void> {
  updateBatch(batch.id, {
    status: "cancelled",
    cancelledAt: Math.floor(Date.now() / 1000),
  });
  console.log(`[BATCH] Cancelled batch ${batch.id}`);
}

function failBatch(batchId: string, reason: string): void {
  updateBatch(batchId, {
    status: "failed",
    failedAt: Math.floor(Date.now() / 1000),
    errors: [{ message: reason }],
  });
}

export async function waitForAllBatches(): Promise<void> {
  await Promise.all(Array.from(activeProcesses));
}
