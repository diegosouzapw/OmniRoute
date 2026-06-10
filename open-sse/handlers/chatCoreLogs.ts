/**
 * Persist call log (request/response log) to the database.
 *
 * This module handles the saving of request/response logs after a chat
 * completion attempt. The function is called from both the streaming
 * and non-streaming paths in handleChatCore.
 *
 * The function takes all its inputs as parameters — no closure dependencies.
 */

import {
  saveCallLog,
  truncateForLog,
  attachLogMeta,
  cloneBoundedChatLogPayload,
} from "@/lib/logPayloads";

export type CallLogPayload = {
  id: string;
  method: string;
  path: string;
  status: number;
  model: string | null;
  requestedModel: string;
  provider: string | null;
  connectionId: string | null | undefined;
  duration: number;
  tokens: unknown;
  requestBody: unknown;
  responseBody: unknown;
  error: string | null;
  sourceFormat: string;
  targetFormat: string;
  comboName: string | undefined;
  comboStepId?: string | null;
  comboExecutionKey?: string | null;
  tokensCompressed: number | null;
  cacheSource: "upstream" | "semantic";
  apiKeyId: string | null;
  apiKeyName: string | null;
  noLog: boolean;
  pipelinePayloads: Record<string, unknown> | null;
};

export async function persistCallLog(payload: CallLogPayload): Promise<void> {
  try {
    await saveCallLog(payload);
  } catch {
    // Best-effort — never throw to caller
  }
}

/**
 * Build the request/response body for a call log, applying log meta
 * (Claude prompt cache) and log truncation.
 */
export function buildCallLogBody(
  body: Record<string, unknown> | null,
  claudeCacheMeta?: Record<string, unknown>
): unknown {
  return cloneBoundedChatLogPayload(
    attachLogMeta(truncateForLog(body as Record<string, unknown>), {
      claudePromptCache: claudeCacheMeta,
    })
  );
}

/**
 * Build the response body for a call log.
 */
export function buildCallLogResponseBody(
  responseBody: unknown,
  claudeCacheMeta?: Record<string, unknown>,
  claudeCacheUsageMeta?: Record<string, unknown>
): unknown {
  return cloneBoundedChatLogPayload(
    attachLogMeta(truncateForLog(responseBody as Record<string, unknown>), {
      claudePromptCache: claudeCacheMeta
        ? {
            applied: claudeCacheMeta.applied,
            totalBreakpoints: claudeCacheMeta.totalBreakpoints,
            anthropicBeta: claudeCacheMeta.anthropicBeta,
          }
        : null,
      claudePromptCacheUsage: claudeCacheUsageMeta,
    })
  );
}
