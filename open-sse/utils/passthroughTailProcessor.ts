import { extractUsage } from "./usageTracking.ts";
import { parseSSEDataPayload } from "./streamHelpers.ts";
import {
  backfillResponsesCompletedOutput,
  normalizeResponsesSseIds,
  pushUniqueResponsesOutputItems,
  stringifyIdValue,
  stripResponsesLifecycleEcho,
} from "./responsesStreamHelpers.ts";
import { getAnyReasoningValue } from "./reasoningFields.ts";

type JsonRecord = Record<string, unknown>;

type EventPrefixBuffer = {
  eventType: () => string;
  flush: () => string;
  prefixData: (output: string, line: string) => string;
  remember: (line: string) => void;
};

export type PassthroughTailProcessorContext = {
  getSkipPassthroughEvent: () => boolean;
  setSkipPassthroughEvent: (value: boolean) => void;
  clearPendingPassthroughEvent: () => void;
  shouldAbortOnClaudeLifecycle: (payload: unknown) => boolean;
  emitClaudeEmptyStreamErrorAndAbort: () => void;
  isClaudeEventPayload: (payload: unknown) => boolean;
  updateClaudeEmptyResponseLifecycle: (payload: unknown) => void;
  passthroughEventPrefix: EventPrefixBuffer;
  emitConvertedOutput: (output: string) => void;
  pushProviderPayload: (payload: unknown) => void;
  pushClientPayload: (payload: unknown) => void;
  setPassthroughResponsesId: (value: string) => void;
  setUsage: (value: unknown) => void;
  addTotalContentLength: (value: number) => void;
  appendPassthroughContent: (value: string) => void;
  appendPassthroughReasoning: (value: string) => void;
  getResponsesReasoningKey: (payload: Record<string, unknown>) => string | null;
  markResponsesReasoningSummarySeen: (key: string) => void;
  ensureVisibleResponsesReasoningSummary: (payload: Record<string, unknown>) => boolean;
  emitSyntheticResponsesReasoningSummary: (payload: Record<string, unknown>) => void;
  passthroughResponsesOutputItems: unknown[];
  passthroughResponsesPendingFunctionCalls: Map<string, JsonRecord>;
  getPassthroughResponsesCurrentFunctionCallKey: () => string | null;
  setPassthroughResponsesCurrentFunctionCallKey: (value: string | null) => void;
  hasPassthroughToolCalls: () => boolean;
  toResponsesCompletedWithToolCalls: (parsed: JsonRecord) => JsonRecord;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function getFunctionCallPendingKey(item: JsonRecord | null): string | null {
  if (!item) return null;
  if (typeof item.id === "string") return item.id;
  if (typeof item.call_id === "string") return item.call_id;
  return null;
}

function handleResponsesTailPayload(
  parsed: JsonRecord,
  output: string,
  context: PassthroughTailProcessorContext
): string {
  const responsesIdsNormalized = normalizeResponsesSseIds(parsed);
  const parsedResponse = asRecord(parsed.response);
  const responseId =
    (parsedResponse ? stringifyIdValue(parsedResponse.id) : null) ||
    stringifyIdValue(parsed.response_id);
  if (responseId) {
    context.setPassthroughResponsesId(responseId);
  }

  const extracted = extractUsage(parsed);
  if (extracted) {
    context.setUsage(extracted);
  }

  if (typeof parsed.delta === "string") {
    context.addTotalContentLength(parsed.delta.length);
  }
  if (parsed.type === "response.output_text.delta" && typeof parsed.delta === "string") {
    context.appendPassthroughContent(parsed.delta);
  }
  if (
    parsed.type === "response.reasoning_summary_text.delta" ||
    parsed.type === "response.reasoning_summary_text.done" ||
    parsed.type === "response.reasoning_summary_part.done"
  ) {
    const reasoningKey = context.getResponsesReasoningKey(parsed);
    if (reasoningKey) {
      context.markResponsesReasoningSummarySeen(reasoningKey);
    }
  }
  if (
    parsed.type === "response.output_item.added" &&
    asRecord(parsed.item).type === "function_call"
  ) {
    const item = { ...(parsed.item as JsonRecord) };
    const pendingKey = getFunctionCallPendingKey(item);
    if (pendingKey) {
      if (typeof item.arguments !== "string") {
        item.arguments = "";
      }
      context.passthroughResponsesPendingFunctionCalls.set(pendingKey, item);
      context.setPassthroughResponsesCurrentFunctionCallKey(pendingKey);
    }
  }
  if (parsed.type === "response.function_call_arguments.delta") {
    const pendingKey =
      typeof parsed.item_id === "string"
        ? parsed.item_id
        : context.getPassthroughResponsesCurrentFunctionCallKey();
    const pending = pendingKey
      ? context.passthroughResponsesPendingFunctionCalls.get(pendingKey)
      : undefined;
    if (pending && typeof parsed.delta === "string") {
      const previousArgs = typeof pending.arguments === "string" ? pending.arguments : "";
      pending.arguments = previousArgs + parsed.delta;
    }
  }
  if (parsed.type === "response.function_call_arguments.done") {
    const pendingKey =
      typeof parsed.item_id === "string"
        ? parsed.item_id
        : context.getPassthroughResponsesCurrentFunctionCallKey();
    const pending = pendingKey
      ? context.passthroughResponsesPendingFunctionCalls.get(pendingKey)
      : undefined;
    if (pending) {
      if (typeof parsed.arguments === "string") {
        pending.arguments = parsed.arguments;
      }
      pushUniqueResponsesOutputItems(context.passthroughResponsesOutputItems, [pending]);
    }
  }
  if (parsed.type === "response.output_item.done" && parsed.item) {
    const reasoningSummaryInjected = context.ensureVisibleResponsesReasoningSummary(parsed);
    context.emitSyntheticResponsesReasoningSummary(parsed);
    pushUniqueResponsesOutputItems(context.passthroughResponsesOutputItems, [parsed.item]);
    if (reasoningSummaryInjected) {
      output = `data: ${JSON.stringify(parsed)}\n\n`;
    }
    const item = asRecord(parsed.item);
    if (item.type === "function_call") {
      const pendingKey = getFunctionCallPendingKey(item);
      if (pendingKey) {
        context.passthroughResponsesPendingFunctionCalls.delete(pendingKey);
        if (context.getPassthroughResponsesCurrentFunctionCallKey() === pendingKey) {
          context.setPassthroughResponsesCurrentFunctionCallKey(null);
        }
      }
    }
  }
  if (
    parsed.type === "response.completed" &&
    Array.isArray(asRecord(parsed.response).output) &&
    (asRecord(parsed.response).output as unknown[]).length > 0
  ) {
    pushUniqueResponsesOutputItems(
      context.passthroughResponsesOutputItems,
      asRecord(parsed.response).output as unknown[]
    );
  }
  if (
    parsed.type === "response.completed" &&
    context.passthroughResponsesPendingFunctionCalls.size > 0
  ) {
    pushUniqueResponsesOutputItems(context.passthroughResponsesOutputItems, [
      ...context.passthroughResponsesPendingFunctionCalls.values(),
    ]);
    context.passthroughResponsesPendingFunctionCalls.clear();
    context.setPassthroughResponsesCurrentFunctionCallKey(null);
  }

  const textualToolCallBackfilled =
    parsed.type === "response.completed" && context.hasPassthroughToolCalls();
  const outputPayload = textualToolCallBackfilled
    ? context.toResponsesCompletedWithToolCalls(parsed)
    : parsed;
  const stripped = stripResponsesLifecycleEcho(outputPayload);
  const backfilled = backfillResponsesCompletedOutput(
    outputPayload,
    context.passthroughResponsesOutputItems
  );

  if (stripped || backfilled || textualToolCallBackfilled || responsesIdsNormalized) {
    output = `data: ${JSON.stringify(outputPayload)}\n\n`;
  }

  return output;
}

function handleOpenAiTailPayload(parsed: JsonRecord, context: PassthroughTailProcessorContext) {
  const firstChoice = Array.isArray(parsed.choices)
    ? (parsed.choices[0] as JsonRecord | undefined)
    : undefined;
  const delta = asRecord(firstChoice?.delta);
  if (typeof delta.content === "string") {
    context.appendPassthroughContent(delta.content);
    context.addTotalContentLength(delta.content.length);
  }
  const reasoningDelta = getAnyReasoningValue(delta);
  if (reasoningDelta) {
    context.appendPassthroughReasoning(reasoningDelta);
  }
}

export function processBufferedPassthroughLine(
  line: string,
  context: PassthroughTailProcessorContext
): boolean {
  const trimmed = line.trim();

  if (context.getSkipPassthroughEvent()) {
    if (!trimmed) {
      context.setSkipPassthroughEvent(false);
      context.clearPendingPassthroughEvent();
    }
    return false;
  }

  if (/^event:\s*keepalive\b/i.test(trimmed)) {
    context.setSkipPassthroughEvent(true);
    context.clearPendingPassthroughEvent();
    return false;
  }

  if (/^event:/i.test(trimmed)) {
    const eventType = trimmed.replace(/^event:\s*/i, "");
    if (context.shouldAbortOnClaudeLifecycle({ type: eventType })) {
      context.emitClaudeEmptyStreamErrorAndAbort();
      return true;
    }
    context.passthroughEventPrefix.remember(line);
    return false;
  }

  if (/^(?::|id:|retry:)/i.test(trimmed)) {
    context.passthroughEventPrefix.remember(line);
    return false;
  }

  if (!trimmed) {
    const pendingOutput = context.passthroughEventPrefix.flush();
    if (pendingOutput) {
      context.emitConvertedOutput(pendingOutput);
    }
    context.clearPendingPassthroughEvent();
    return false;
  }

  if (!trimmed.startsWith("data:")) {
    context.passthroughEventPrefix.remember(line);
    return false;
  }

  const parsedPassthroughData = parseSSEDataPayload(trimmed.slice(5), {
    eventType: context.passthroughEventPrefix.eventType(),
  });
  if (parsedPassthroughData?.done === true) {
    return false;
  }

  let output =
    line.startsWith("data:") && !line.startsWith("data: ")
      ? `data: ${line.slice(5)}\n\n`
      : `${line}\n\n`;

  if (parsedPassthroughData) {
    context.pushProviderPayload(parsedPassthroughData);
    if (context.shouldAbortOnClaudeLifecycle(parsedPassthroughData)) {
      context.emitClaudeEmptyStreamErrorAndAbort();
      return true;
    }

    if (context.isClaudeEventPayload(parsedPassthroughData)) {
      context.updateClaudeEmptyResponseLifecycle(parsedPassthroughData);
    }

    const parsed = parsedPassthroughData as JsonRecord;
    const parsedType = typeof parsed.type === "string" ? parsed.type : "";
    const isResponses = parsedType.startsWith("response.");
    const isClaude = context.isClaudeEventPayload(parsed);

    if (isResponses) {
      output = handleResponsesTailPayload(parsed, output, context);
    } else if (!isClaude) {
      handleOpenAiTailPayload(parsed, context);
    }

    context.pushClientPayload(parsed);
  }

  output = context.passthroughEventPrefix.prefixData(output, line);
  context.emitConvertedOutput(output);
  return false;
}
