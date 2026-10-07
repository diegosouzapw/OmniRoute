/**
 * Server-owned tool loop state machine (spec §5.5).
 *
 * Handles the complete lifecycle:
 * 1. Classify ownership of tool calls
 * 2. Execute server-owned tools
 * 3. Serialize results within UTF-8 byte budgets
 * 4. Build accumulated transcript and resume upstream
 * 5. Terminate on any boundary condition
 */

import type {
  ServerOwnedToolLoopOptions,
  ServerOwnedToolLoopResult,
  NonStreamingProviderLegResult,
  ProviderLegUsage,
  ProviderLegReceipt,
  ChatCoreErrorResult,
  ExecutedToolResult,
} from "./toolLoopTypes.ts";
import {
  classifyServerOwnedCalls,
  extractToolCalls,
  formatEscapeHatchResponse,
  ServerOwnedExecutionError,
} from "./interception.ts";
import {
  buildFollowUpSourceBody,
  serializeBoundedToolResult,
  MAX_RESULT_BYTES_PER_TOOL,
  MAX_RESULT_BYTES_TOTAL,
} from "./followUpTranscript.ts";
import { createErrorResult } from "@omniroute/open-sse/utils/error.ts";

// ─── Constants ────────────────────────────────────────────────────────────────

export const MAX_FOLLOW_UPS = 3;
export const LOOP_BUDGET_MS = 120_000;
export const MIN_REMAINING_FOR_FOLLOW_UP_MS = 10_000;

// ─── Usage aggregation ────────────────────────────────────────────────────────

export function aggregateProviderLegUsage(
  usages: Array<ProviderLegUsage | null>
): ProviderLegUsage {
  let prompt_tokens = 0;
  let completion_tokens = 0;
  let cached_tokens: number | undefined;
  let cache_read_input_tokens: number | undefined;
  let cache_creation_input_tokens: number | undefined;
  let reasoning_tokens: number | undefined;
  let cost_in_usd_ticks: number | undefined;

  for (const u of usages) {
    if (!u) continue;
    prompt_tokens += u.prompt_tokens;
    completion_tokens += u.completion_tokens;
    if (u.cached_tokens !== undefined) {
      cached_tokens = (cached_tokens ?? 0) + u.cached_tokens;
    }
    if (u.cache_read_input_tokens !== undefined) {
      cache_read_input_tokens = (cache_read_input_tokens ?? 0) + u.cache_read_input_tokens;
    }
    if (u.cache_creation_input_tokens !== undefined) {
      cache_creation_input_tokens =
        (cache_creation_input_tokens ?? 0) + u.cache_creation_input_tokens;
    }
    if (u.reasoning_tokens !== undefined) {
      reasoning_tokens = (reasoning_tokens ?? 0) + u.reasoning_tokens;
    }
    if (u.cost_in_usd_ticks !== undefined) {
      cost_in_usd_ticks = (cost_in_usd_ticks ?? 0) + u.cost_in_usd_ticks;
    }
  }

  return {
    prompt_tokens,
    completion_tokens,
    total_tokens: prompt_tokens + completion_tokens,
    ...(cached_tokens !== undefined ? { cached_tokens } : {}),
    ...(cache_read_input_tokens !== undefined ? { cache_read_input_tokens } : {}),
    ...(cache_creation_input_tokens !== undefined ? { cache_creation_input_tokens } : {}),
    ...(reasoning_tokens !== undefined ? { reasoning_tokens } : {}),
    ...(cost_in_usd_ticks !== undefined ? { cost_in_usd_ticks } : {}),
  };
}

function aggregateUsageOrNull(usages: Array<ProviderLegUsage | null>): ProviderLegUsage | null {
  const hasNonNull = usages.some((u) => u !== null);
  if (!hasNonNull) return null;
  return aggregateProviderLegUsage(usages);
}

// ─── Execution error → errorResult mapping ────────────────────────────────────

function mapExecutionError(err: ServerOwnedExecutionError): ChatCoreErrorResult {
  return createErrorResult(
    err.httpStatus,
    err.message,
    null,
    err.code,
    "server_tool_execution_error"
  ) as unknown as ChatCoreErrorResult;
}

// ─── State machine ────────────────────────────────────────────────────────────

export async function runServerOwnedToolLoop(
  options: ServerOwnedToolLoopOptions
): Promise<ServerOwnedToolLoopResult> {
  const now = options.now ?? performance.now.bind(performance);
  const loopStartedAtMs = now();
  const loopDeadlineAtMs = Math.min(options.deadlineAtMs, loopStartedAtMs + LOOP_BUDGET_MS);

  const maxFollowUps = options.maxFollowUps ?? MAX_FOLLOW_UPS;
  const maxResultBytes = options.maxResultBytes ?? MAX_RESULT_BYTES_PER_TOOL;
  const maxTotalResultBytes = options.maxTotalResultBytes ?? MAX_RESULT_BYTES_TOTAL;

  // State
  let currentSourceBody = options.sourceBody;
  let currentLeg: NonStreamingProviderLegResult = options.initialLeg;
  let cumulativeOutputBytes = 0;
  let followUps = 0;
  const receipts: ProviderLegReceipt[] = [options.initialLeg.receipt];
  const usages: Array<ProviderLegUsage | null> = [options.initialLeg.usage];

  // Accumulate initial leg receipt cost
  let totalCostUsd = options.initialLeg.receipt.computedCostUsd ?? 0;

  const errorResult: (msg: string, status?: number, code?: string) => ServerOwnedToolLoopResult = (
    msg,
    status = 500,
    code = "internal_error"
  ) => ({
    kind: "error",
    errorResult: createErrorResult(status, msg, null, code) as unknown as ChatCoreErrorResult,
    cumulativeUsage: aggregateUsageOrNull(usages),
    totalCostUsd,
    receipts,
    followUps,
    termination: "provider_error",
  });

  // Main loop
  while (true) {
    // Extract tool calls from current leg response
    const response = currentLeg.kind === "ok" ? currentLeg.response : undefined;
    if (!response) {
      return errorResult("No response from provider leg");
    }

    // Extract tool calls by actual source format, not model alias heuristic
    const toolCalls = extractToolCalls(response, options.sourceFormat);

    // Classify ownership
    const { serverOwned, clientNative } = await classifyServerOwnedCalls(
      toolCalls,
      options.executionContext
    );

    // No server-owned calls → done
    if (serverOwned.length === 0) {
      const termination = clientNative.length > 0 ? "client_tools" : "completed";
      return {
        kind: "ok",
        response: currentLeg.kind === "ok" ? currentLeg.response : undefined,
        responseForMemoryExtraction:
          currentLeg.kind === "ok" ? currentLeg.responseForMemoryExtraction : undefined,
        finalProviderBody: currentLeg.kind === "ok" ? currentLeg.providerBody : undefined,
        finalProviderRequest: currentLeg.kind === "ok" ? currentLeg.providerRequest : undefined,
        cumulativeUsage: aggregateUsageOrNull(usages),
        totalCostUsd,
        receipts,
        followUps,
        termination,
      };
    }

    // Mixed tools → escape hatch, no follow-up
    if (clientNative.length > 0) {
      // Check abort before execute
      if (options.abortSignal?.aborted) {
        return {
          kind: "error",
          errorResult: createErrorResult(
            499,
            "Client closed request",
            null,
            "client_closed_request",
            "invalid_request_error"
          ) as unknown as ChatCoreErrorResult,
          cumulativeUsage: aggregateUsageOrNull(usages),
          totalCostUsd,
          receipts,
          followUps,
          termination: "client_abort",
        };
      }

      // Execute server calls, then format with bounded serialization
      const execResults = await options.executeServerOwned(serverOwned, options.executionContext);

      // Build serialized text map using bounded serialization
      const serMap = new Map<string, string>();
      let remainingBytes = maxTotalResultBytes;
      for (const r of execResults) {
        const itemMaxBytes = Math.min(maxResultBytes, remainingBytes);
        const bounded = serializeBoundedToolResult(r.result, itemMaxBytes);
        serMap.set(r.id, bounded.text);
        remainingBytes -= Buffer.byteLength(bounded.text, "utf8");
      }

      const formatted = formatEscapeHatchResponse(
        response,
        serverOwned,
        execResults,
        clientNative,
        options.sourceFormat,
        serMap
      );

      return {
        kind: "ok",
        response: formatted,
        responseForMemoryExtraction:
          currentLeg.kind === "ok" ? currentLeg.responseForMemoryExtraction : undefined,
        finalProviderBody: currentLeg.kind === "ok" ? currentLeg.providerBody : undefined,
        finalProviderRequest: currentLeg.kind === "ok" ? currentLeg.providerRequest : undefined,
        cumulativeUsage: aggregateUsageOrNull(usages),
        totalCostUsd,
        receipts,
        followUps,
        termination: "mixed_tools",
      };
    }

    // All server-owned: check abort before execute
    if (options.abortSignal?.aborted) {
      return {
        kind: "error",
        errorResult: createErrorResult(
          499,
          "Client closed request",
          null,
          "client_closed_request",
          "invalid_request_error"
        ) as unknown as ChatCoreErrorResult,
        cumulativeUsage: aggregateUsageOrNull(usages),
        totalCostUsd,
        receipts,
        followUps,
        termination: "client_abort",
      };
    }

    // Execute server-owned calls
    let execResults: ExecutedToolResult[];
    try {
      execResults = await options.executeServerOwned(serverOwned, options.executionContext);
    } catch (err: unknown) {
      if (err instanceof ServerOwnedExecutionError) {
        const termMap: Record<string, ServerOwnedToolLoopResult["termination"]> = {
          TOOL_IN_PROGRESS: "execution_in_progress",
          TOOL_STATE_UNKNOWN: "execution_unknown",
          IDENTITY_CONFLICT: "execution_identity_conflict",
          TOOL_EXECUTION_ERROR: "execution_error",
          TOOL_EXECUTION_TIMEOUT: "execution_timeout",
        };
        const termination = termMap[err.code] ?? "execution_error";
        return {
          kind: "error",
          errorResult: mapExecutionError(err),
          cumulativeUsage: aggregateUsageOrNull(usages),
          totalCostUsd,
          receipts,
          followUps,
          termination,
        };
      }
      throw err;
    }

    // Serialize results with cumulative UTF-8 budget
    const serMap = new Map<string, string>();
    let anyTruncated = false;
    let remainingBytes = maxTotalResultBytes - cumulativeOutputBytes;
    if (remainingBytes < 0) remainingBytes = 0;

    for (const r of execResults) {
      const itemMaxBytes = Math.min(maxResultBytes, remainingBytes);
      const bounded = serializeBoundedToolResult(r.result, itemMaxBytes);
      serMap.set(r.id, bounded.text);
      const bytes = Buffer.byteLength(bounded.text, "utf8");
      cumulativeOutputBytes += bytes;
      remainingBytes -= bytes;
      if (bounded.truncated) {
        anyTruncated = true;
      }
    }

    // Check budget exhaustion — any truncated result terminates
    if (anyTruncated || cumulativeOutputBytes >= maxTotalResultBytes) {
      const formatted = formatEscapeHatchResponse(
        response,
        serverOwned,
        execResults,
        [],
        options.sourceFormat,
        serMap
      );

      return {
        kind: "ok",
        response: formatted,
        responseForMemoryExtraction:
          currentLeg.kind === "ok" ? currentLeg.responseForMemoryExtraction : undefined,
        finalProviderBody: currentLeg.kind === "ok" ? currentLeg.providerBody : undefined,
        finalProviderRequest: currentLeg.kind === "ok" ? currentLeg.providerRequest : undefined,
        cumulativeUsage: aggregateUsageOrNull(usages),
        totalCostUsd,
        receipts,
        followUps,
        termination: "tool_output_budget",
      };
    }

    // Check follow-up limit
    if (followUps >= maxFollowUps) {
      const formatted = formatEscapeHatchResponse(
        response,
        serverOwned,
        execResults,
        [],
        options.sourceFormat,
        serMap
      );

      return {
        kind: "ok",
        response: formatted,
        responseForMemoryExtraction:
          currentLeg.kind === "ok" ? currentLeg.responseForMemoryExtraction : undefined,
        finalProviderBody: currentLeg.kind === "ok" ? currentLeg.providerBody : undefined,
        finalProviderRequest: currentLeg.kind === "ok" ? currentLeg.providerRequest : undefined,
        cumulativeUsage: aggregateUsageOrNull(usages),
        totalCostUsd,
        receipts,
        followUps,
        termination: "max_followups",
      };
    }

    // Check deadline before resume
    const remainingMs = loopDeadlineAtMs - now();
    if (remainingMs < MIN_REMAINING_FOR_FOLLOW_UP_MS) {
      const formatted = formatEscapeHatchResponse(
        response,
        serverOwned,
        execResults,
        [],
        options.sourceFormat,
        serMap
      );

      return {
        kind: "ok",
        response: formatted,
        responseForMemoryExtraction:
          currentLeg.kind === "ok" ? currentLeg.responseForMemoryExtraction : undefined,
        finalProviderBody: currentLeg.kind === "ok" ? currentLeg.providerBody : undefined,
        finalProviderRequest: currentLeg.kind === "ok" ? currentLeg.providerRequest : undefined,
        cumulativeUsage: aggregateUsageOrNull(usages),
        totalCostUsd,
        receipts,
        followUps,
        termination: "deadline",
      };
    }

    // Check abort before resume
    if (options.abortSignal?.aborted) {
      return {
        kind: "error",
        errorResult: createErrorResult(
          499,
          "Client closed request",
          null,
          "client_closed_request",
          "invalid_request_error"
        ) as unknown as ChatCoreErrorResult,
        cumulativeUsage: aggregateUsageOrNull(usages),
        totalCostUsd,
        receipts,
        followUps,
        termination: "client_abort",
      };
    }

    // Build accumulated transcript
    const nextSourceBody = buildFollowUpSourceBody({
      sourceBody: currentSourceBody,
      previousResponse: response,
      toolCalls: serverOwned,
      results: execResults,
      sourceFormat: options.sourceFormat,
      maxResultBytes,
      maxTotalResultBytes: maxTotalResultBytes - cumulativeOutputBytes,
      serializedResultTextById: serMap,
    });

    // Resume upstream
    const nextLeg = await options.resumeUpstream(
      nextSourceBody,
      options.initialLeg.connectionId,
      loopDeadlineAtMs
    );

    // Provider error → preserve identity
    if (nextLeg.kind === "error") {
      receipts.push(nextLeg.receipt);
      usages.push(nextLeg.usage);
      totalCostUsd += nextLeg.receipt.computedCostUsd ?? 0;

      return {
        kind: "error",
        errorResult: nextLeg.result,
        cumulativeUsage: aggregateUsageOrNull(usages),
        totalCostUsd,
        receipts,
        followUps: followUps + 1,
        termination: "provider_error",
      };
    }

    // Connection mismatch check
    if (nextLeg.connectionId !== options.initialLeg.connectionId) {
      receipts.push(nextLeg.receipt);
      usages.push(nextLeg.usage);
      totalCostUsd += nextLeg.receipt.computedCostUsd ?? 0;

      return {
        kind: "error",
        errorResult: createErrorResult(
          409,
          "Follow-up connection does not match initial connection",
          null,
          "LEASE_CONNECTION_MISMATCH",
          "lease_error"
        ) as unknown as ChatCoreErrorResult,
        cumulativeUsage: aggregateUsageOrNull(usages),
        totalCostUsd,
        receipts,
        followUps: followUps + 1,
        termination: "connection_mismatch",
      };
    }

    // Update state for next iteration
    currentSourceBody = nextSourceBody;
    currentLeg = nextLeg;
    followUps++;
    receipts.push(nextLeg.receipt);
    usages.push(nextLeg.usage);
    totalCostUsd += nextLeg.receipt.computedCostUsd ?? 0;
  }
}
