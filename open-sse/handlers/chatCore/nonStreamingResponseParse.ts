/**
 * chatCore non-streaming response parsing/classification (Quality Gate v2 / Fase 9 — chatCore
 * god-file decomposition, #3501 — response-handling slice of executeProviderRequest).
 *
 * Extracted from handleChatCore's `if (!stream)` block: reads the upstream non-streaming body,
 * detects whether it is an event stream (SSE / NDJSON) buffered for a non-streaming client, and
 * parses it into a JSON response body. Returns a discriminated union describing the outcome
 * (`ok` | `invalid_sse` | `invalid_json`) and leaves every persistence side-effect
 * (appendRequestLog / persistAttemptLogs / persistFailureUsage / trackPendingRequest /
 * createErrorResult) to the handler, so behaviour is observably identical to the previous inline
 * block. Pure with respect to handler state (only buffering debug/warn logs as a side effect).
 */

import { normalizePayloadForLog } from "@/lib/logPayloads";
import { extractSSEErrorMessage } from "../sseParser.ts";
import { readNonStreamingResponseBody } from "./nonStreamingResponseBody.ts";
import {
  normalizeNonStreamingEventPayload,
  parseNonStreamingSSEPayload,
  shouldTreatBufferedEventResponseAsExpected,
} from "./nonStreamingSse.ts";

type LoggerLike =
  | {
      debug?: (...args: unknown[]) => void;
      warn?: (...args: unknown[]) => void;
    }
  | null
  | undefined;

export type NonStreamingParseResult =
  | {
      kind: "ok";
      responseBody: unknown;
      responsePayloadFormat: string;
      looksLikeSSE: boolean;
      normalizedProviderPayload: unknown;
    }
  | {
      kind: "invalid_sse";
      message: string;
      looksLikeSSE: true;
      normalizedProviderPayload: unknown;
    }
  | {
      kind: "invalid_json";
      message: string;
      detailedError: string;
      looksLikeSSE: false;
      normalizedProviderPayload: unknown;
    };

export async function parseNonStreamingResponseBody(opts: {
  providerResponse: Response;
  upstreamStream: boolean;
  providerHeaders: Record<string, unknown> | Headers | null | undefined;
  finalBody: unknown;
  targetFormat: string;
  model: string;
  log?: LoggerLike;
}): Promise<NonStreamingParseResult> {
  const { providerResponse, upstreamStream, providerHeaders, finalBody, targetFormat, model, log } =
    opts;

  const contentType = (providerResponse.headers.get("content-type") || "").toLowerCase();
  const rawBody = await readNonStreamingResponseBody(providerResponse, contentType, upstreamStream);
  const normalizedProviderPayload = normalizePayloadForLog(rawBody);
  const looksLikeSSE =
    contentType.includes("text/event-stream") ||
    contentType.includes("application/x-ndjson") ||
    /(^|\n)\s*(event|data):/m.test(rawBody);

  if (looksLikeSSE) {
    const streamPayload = normalizeNonStreamingEventPayload(rawBody, contentType);
    const streamKind = contentType.includes("application/x-ndjson") ? "NDJSON" : "SSE";
    if (shouldTreatBufferedEventResponseAsExpected(upstreamStream, providerHeaders, finalBody)) {
      log?.debug?.(
        "STREAM",
        `Buffering upstream ${streamKind} response for non-streaming client request`
      );
    } else {
      log?.warn?.(
        "STREAM",
        `Unexpected ${streamKind} response for non-streaming request — buffering`
      );
    }
    // Upstream returned an event stream for a non-streaming client; convert best-effort to JSON.
    const parsedFromSSE = parseNonStreamingSSEPayload(streamPayload, targetFormat, model);

    if (!parsedFromSSE) {
      // Some executors (e.g. the Devin/Windsurf CLI) always emit text/event-stream, signalling
      // failure with an error-only chunk (`data: {"error":{"message":"Devin CLI not found..."}}`)
      // that carries no `choices`. Surface that real, sanitized message instead of the generic 502
      // so the actionable error is not swallowed (#3324).
      const surfacedSseError = extractSSEErrorMessage(streamPayload);
      const invalidSseMessage =
        surfacedSseError || "Invalid SSE response for non-streaming request";
      return {
        kind: "invalid_sse",
        message: invalidSseMessage,
        looksLikeSSE: true,
        normalizedProviderPayload,
      };
    }

    return {
      kind: "ok",
      responseBody: parsedFromSSE.body,
      responsePayloadFormat: parsedFromSSE.format,
      looksLikeSSE: true,
      normalizedProviderPayload,
    };
  }

  try {
    const responseBody = rawBody ? JSON.parse(rawBody) : {};
    return {
      kind: "ok",
      responseBody,
      responsePayloadFormat: targetFormat,
      looksLikeSSE: false,
      normalizedProviderPayload,
    };
  } catch (err) {
    const detailedError = `Invalid JSON response from provider (error: ${err instanceof Error ? err.message : String(err)}): ${rawBody.substring(0, 1000)}`;
    const invalidJsonMessage = "Invalid JSON response from provider";
    return {
      kind: "invalid_json",
      message: invalidJsonMessage,
      detailedError,
      looksLikeSSE: false,
      normalizedProviderPayload,
    };
  }
}
