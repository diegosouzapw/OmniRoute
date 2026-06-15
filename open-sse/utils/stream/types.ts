import { convertOpenAIToResponsesToolCall } from "../handlers/responseTranslator.ts";
import { v4 as uuidv4 } from "uuid";

export type JsonRecord = Record<string, unknown>;

export type StreamLogger = {
  appendProviderChunk?: (value: string) => void;
  appendConvertedChunk?: (value: string) => void;
  appendOpenAIChunk?: (value: string) => void;
};

export type StreamCompletePayload = {
  status: number;
  usage: unknown;
  /** Minimal response body for call log (streaming: usage + note; non-streaming not used) */
  responseBody?: unknown;
  providerPayload?: unknown;
  clientPayload?: unknown;
};

export type StreamFailurePayload = {
  status: number;
  message: string;
  code?: string;
  type?: string;
};

export type StreamOptions = {
  mode?: string;
  targetFormat?: string;
  sourceFormat?: string;
  clientResponseFormat?: string | null;
  copilotCompatibleReasoning?: boolean;
  provider?: string | null;
  reqLogger?: StreamLogger | null;
  toolNameMap?: unknown;
  model?: string | null;
  connectionId?: string | null;
  apiKeyInfo?: unknown;
  body?: unknown;
  onComplete?: ((payload: StreamCompletePayload) => void) | null;
  onFailure?: ((payload: StreamFailurePayload) => void | Promise<void>) | null;
};

export type TranslateState = ReturnType<typeof initState> & {
  provider?: string | null;
  toolNameMap?: unknown;
  signatureNamespace?: string | null;
  usage?: unknown;
  finishReason?: unknown;
  copilotCompatibleReasoning?: boolean;
  /** Accumulated message content for call log response body */
  accumulatedContent?: string;
  upstreamError?: {
    status: number;
    type: string;
    code: string;
    message: string;
  } | null;
};

export type ToolCall = {
  id: string | null;
  index: number;
  type: string;
  function: { name: string; arguments: string };
};

export type UsageTokenRecord = Record<string, number>;

export type SSEStreamContext = {
  mode: string;
  targetFormat?: string;
  sourceFormat?: string;
  clientResponseFormat: string | null;
  copilotCompatibleReasoning: boolean;
  provider: string | null;
  reqLogger: StreamLogger | null;
  toolNameMap: unknown;
  model: string | null;
  connectionId: string | null;
  apiKeyInfo: unknown;
  body: unknown;
  onComplete: ((payload: StreamCompletePayload) => void) | null;
  onFailure: ((payload: StreamFailurePayload) => void | Promise<void>) | null;

  clientExpectsResponsesStream: boolean;
  clientExpectsClaudeStream: boolean;
  shouldEmitDoneTerminator: boolean;
  expectsOpenAIUsageOnlyChunk: boolean;
  signatureNamespace: string | null;

  buffer: string;
  usage: UsageTokenRecord | null;
  passthroughHasToolCalls: boolean;
  passthroughToolCalls: Map<string, ToolCall>;
  passthroughToolCallSeq: number;
  allowedToolNames: string[];
  skipPassthroughEvent: boolean;
  state: TranslateState | null;
  totalContentLength: number;
  passthroughAccumulatedContent: string;
  passthroughAccumulatedReasoning: string;
  passthroughBufferedTextualToolCallContent: string;
  passthroughResponsesOutputItems: unknown[];
  passthroughResponsesPendingFunctionCalls: Map<string, JsonRecord>;
  passthroughResponsesId: string | null;
  passthroughResponsesCurrentFunctionCallKey: string | null;
  passthroughResponsesReasoningSummarySeen: Set<string>;
  streamStartedAt: number;
  lastToolCallChunkTime: number | null;
  toolFinishTime: number | null;
  contentAfterToolSeen: boolean;
  sessionId: string;
  pendingToolFinishTime: number | null;
  doneSent: boolean;
  pendingPassthroughEventLine: string | null;
  pendingPassthroughEventEmitted: boolean;
  lastChunkTime: number;
  streamTimedOut: boolean;

  decoder: TextDecoder;
  encoder: TextEncoder;
  idleTimer: ReturnType<typeof setInterval> | null;
  claudeEmptyResponseLifecycle: Record<string, unknown>;
  providerPayloadCollector: {
    push: (v: unknown) => void;
    build: (...args: unknown[]) => unknown;
    getEvents: () => unknown[];
  };
  clientPayloadCollector: {
    push: (v: unknown) => void;
    build: (...args: unknown[]) => unknown;
    getEvents: () => unknown[];
  };
  requestRecord: JsonRecord;
  requestStreamOptions: JsonRecord;
};
