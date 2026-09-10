/**
 * Client translation for non-streaming responses.
 * Extracted from chatCore.ts (lines ~5098-5195) by symbol boundaries.
 *
 * Handles: translate, tool-name restore, finish-reason normalization, sanitize,
 * reasoning replay capture, and client usage buffer application.
 *
 * Phase distinction:
 * - "final": applies applyClientUsageBuffer (normalizes visible usage fields)
 * - "intermediate": skips usage buffer (raw usage preserved for aggregation)
 */

import type {
  NonStreamingClientTranslateInput,
  NonStreamingClientTranslateResult,
} from "@/lib/skills/toolLoopTypes.ts";
import { needsTranslation } from "../../translator/index.ts";
import { FORMATS } from "../../translator/formats.ts";
import { translateNonStreamingResponse } from "../responseTranslator.ts";
import { extractToolSchemaMap } from "../../translator/response/openai-responses/toolSchemas.ts";
import { stripMarkdownCodeFence } from "../../utils/aiSdkCompat.ts";
import { normalizeOpenAIToolFinishReasons } from "./passthroughToolNames.ts";
import {
  cacheReasoningFromAssistantMessage,
  requiresReasoningReplay,
} from "../../services/reasoningCache.ts";
import {
  sanitizeOpenAIResponse,
  sanitizeResponsesApiResponse,
  shouldParseTextualReasoningTags,
} from "../responseSanitizer.ts";
import { isStripReasoningRequested } from "./headers.ts";
import { applyClientUsageBuffer } from "./clientUsageBuffer.ts";

export type { NonStreamingClientTranslateInput, NonStreamingClientTranslateResult };

/**
 * Translate a non-streaming provider response to the client's expected format.
 *
 * All of: translate, tool-name identity restore, finish-reason normalization,
 * and sanitize are applied every round (both intermediate and final).
 * `applyClientUsageBuffer` is applied only for `phase === "final"`.
 * Reasoning replay capture runs every round.
 */
export function translateNonStreamingClientResponse(
  input: NonStreamingClientTranslateInput
): NonStreamingClientTranslateResult {
  const {
    responseBody,
    responsePayloadFormat,
    clientResponseFormat,
    sourceFormat,
    provider,
    model,
    requestBody,
    responseToolNameMap,
    requestToolIdentityMap,
    reasoningCacheScope,
    clientHeaders,
    isClaudeCodeCompatible,
    phase,
  } = input;

  // ── Extract tool schemas for schema-aware translation ──────────────────────
  const finalBody = requestBody as Record<string, unknown> | null;
  const responseToolSchemas = extractToolSchemaMap(finalBody || responseBody);

  // ── Translate response to client's expected format ─────────────────────────
  let translatedResponse = needsTranslation(responsePayloadFormat, clientResponseFormat)
    ? translateNonStreamingResponse(
        responseBody,
        responsePayloadFormat,
        clientResponseFormat,
        responseToolNameMap,
        responseToolSchemas
      )
    : responseBody;
  const responseForMemoryExtraction = translatedResponse;

  // ── T26: Strip markdown code blocks if provider format is Claude ───────────
  if (sourceFormat === "claude") {
    if (typeof translatedResponse?.choices?.[0]?.message?.content === "string") {
      translatedResponse.choices[0].message.content = stripMarkdownCodeFence(
        translatedResponse.choices[0].message.content
      ) as string;
    }
  }

  // ── T18: Normalize finish_reason to 'tool_calls' if tool calls present ─────
  normalizeOpenAIToolFinishReasons(translatedResponse);

  // ── Reasoning Replay Cache (#1628) ────────────────────────────────────────
  // Capture reasoning_content from non-streaming responses with tool_calls
  // so it can be replayed on subsequent turns.
  try {
    const cacheResponse = translatedResponse?.choices?.[0]
      ? translatedResponse
      : needsTranslation(responsePayloadFormat, FORMATS.OPENAI)
        ? translateNonStreamingResponse(
            responseBody,
            responsePayloadFormat,
            FORMATS.OPENAI,
            responseToolNameMap,
            responseToolSchemas
          )
        : responseBody;
    const firstChoice = cacheResponse?.choices?.[0];
    const msg = firstChoice?.message;
    // Prefer explicit historyMessages (parent: translatedBody.messages). Do not
    // overload requestBody — Responses-shaped finalBody has `input`, not `messages`.
    const historyMessages = Array.isArray(input.historyMessages)
      ? input.historyMessages
      : (finalBody as { messages?: unknown[] } | null | undefined)?.messages;
    if (requiresReasoningReplay({ provider, model })) {
      cacheReasoningFromAssistantMessage(msg, provider, model, {
        scope: reasoningCacheScope,
        historyMessages: Array.isArray(historyMessages) ? historyMessages : [],
      });
    }
  } catch {
    // Cache capture is non-critical — never block the response
  }

  // ── Sanitize response for SDK compatibility ────────────────────────────────
  if (clientResponseFormat === FORMATS.OPENAI_RESPONSES) {
    translatedResponse = sanitizeResponsesApiResponse(translatedResponse);
    // Restore {namespace, name} on function_call items for round-trip closure (#7936)
    const responseOutput = translatedResponse?.output;
    if (requestToolIdentityMap && Array.isArray(responseOutput)) {
      for (const item of responseOutput) {
        if (item?.type !== "function_call") continue;
        const identity = requestToolIdentityMap.get(item.name);
        if (identity) {
          item.namespace = identity.namespace;
          item.name = identity.name;
        }
      }
    }
  } else if (clientResponseFormat === FORMATS.OPENAI) {
    const stripReasoning = isStripReasoningRequested(clientHeaders ?? null);
    translatedResponse = sanitizeOpenAIResponse(translatedResponse, {
      stripReasoning,
      parseTextualReasoningTags: shouldParseTextualReasoningTags(provider, model),
    });
  }

  // ── Client usage buffer (#8331) ───────────────────────────────────────────
  // Only apply for final phase; intermediate preserves raw usage for aggregation.
  if (phase === "final") {
    applyClientUsageBuffer(translatedResponse, finalBody || responseBody, clientResponseFormat, {
      preserveContextBudgetInVisibleUsage: isClaudeCodeCompatible,
    });
  }

  return {
    response: translatedResponse,
    responseForMemoryExtraction,
  };
}
