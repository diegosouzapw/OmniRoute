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

export type TranslateState = {
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