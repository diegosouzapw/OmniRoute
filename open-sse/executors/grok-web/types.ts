// Grok NDJSON stream response/event types. Extracted verbatim from grok-web.ts.

// ─── NDJSON stream types ────────────────────────────────────────────────────

export interface GrokStreamResponse {
  token?: string;
  isThinking?: boolean;
  reasoning?: string;
  reasoningContent?: string;
  reasoning_content?: string;
  thinking?: string;
  thought?: string;
  responseId?: string;
  messageTag?: string;
  messageStepId?: number;
  toolUsageCardId?: string;
  toolUsageCard?: {
    toolUsageCardId?: string;
    bash?: { args?: Record<string, unknown> };
    readFile?: { args?: Record<string, unknown> };
    read_file?: { args?: Record<string, unknown> };
    webSearch?: { args?: Record<string, unknown> };
    browsePage?: { args?: Record<string, unknown> };
    browse_page?: { args?: Record<string, unknown> };
  };
  webSearchResults?: {
    results?: Array<Record<string, unknown>>;
  };
  llmInfo?: { modelHash?: string };
  modelResponse?: {
    message?: string;
    reasoning?: string;
    reasoningContent?: string;
    reasoning_content?: string;
    thinking?: string;
    thought?: string;
    responseId?: string;
    generatedImageUrls?: string[];
    metadata?: { llm_info?: { modelHash?: string } };
    pipelineToken?: string;
  };
}

export interface GrokStreamEvent {
  result?: { response?: GrokStreamResponse };
  error?: { message?: string; code?: string };
}
