import { cacheReasoningFromAssistantMessage, requiresReasoningReplay } from "../../services/reasoningCache.ts";
import { FORMATS } from "../../translator/formats.ts";
import { needsTranslation } from "../../translator/index.ts";
import { extractToolSchemaMap } from "../../translator/response/openai-responses/toolSchemas.ts";
import { translateNonStreamingResponse } from "../responseTranslator.ts";

interface StreamReasoningCaptureInput {
  streamResponseBody: unknown;
  clientResponseFormat: string;
  responseToolNameMap: Map<string, string> | null;
  providerRequestBody: unknown;
  translatedBody: unknown;
  reasoningReplayHistory: unknown[] | null | undefined;
  provider: string;
  model: string;
  reasoningCacheScope: string | null | undefined;
  videoTranscriptSensitive: boolean;
}

/** Best-effort reasoning capture after a successful stream; never changes the client response. */
export function captureStreamReasoningForReplay(input: StreamReasoningCaptureInput): void {
  try {
    const streamBody = input.streamResponseBody as Record<string, unknown>;
    const cacheStreamBody = Array.isArray(streamBody.choices)
      ? streamBody
      : needsTranslation(input.clientResponseFormat, FORMATS.OPENAI)
        ? (translateNonStreamingResponse(
            streamBody,
            input.clientResponseFormat,
            FORMATS.OPENAI,
            input.responseToolNameMap,
            extractToolSchemaMap(input.providerRequestBody)
          ) as Record<string, unknown>)
        : streamBody;
    const choices = cacheStreamBody.choices as { message?: Record<string, unknown> }[] | undefined;
    const msg = choices?.[0]?.message;
    // Responses bodies carry `input`; use the pivot transcript for the read-side key.
    const historyMessages =
      (input.translatedBody as { messages?: unknown[] } | null | undefined)?.messages ??
      input.reasoningReplayHistory;
    if (requiresReasoningReplay({ provider: input.provider, model: input.model })) {
      cacheReasoningFromAssistantMessage(msg, input.provider, input.model, {
        scope: input.reasoningCacheScope,
        historyMessages: Array.isArray(historyMessages) ? historyMessages : [],
        videoTranscriptSensitive: input.videoTranscriptSensitive,
      });
    }
  } catch {
    // Cache capture is non-critical — never block the stream.
  }
}
