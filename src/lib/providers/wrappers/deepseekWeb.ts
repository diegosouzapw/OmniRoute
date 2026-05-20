export interface DeepSeekWebConfig {
  cookies?: string;
  userAgent?: string;
  sessionRefreshInterval?: number;
  autoRefresh?: boolean;
}

export interface DeepSeekWebMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface DeepSeekWebCompletionRequest {
  model: "deepseek-v4-flash" | "deepseek-v4-pro" | "deepseek-r1" | "deepseek-v3" | string;
  messages: DeepSeekWebMessage[];
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
  reasoning_effort?: "low" | "medium" | "high";
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

export interface DeepSeekWebCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message?: { role: string; content: string };
    delta?: { content?: string; role?: string };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface DeepSeekWebStreamingChunk {
  id?: string;
  object?: string;
  created?: number;
  model?: string;
  choices?: Array<{
    index?: number;
    delta?: { content?: string; role?: string };
    finish_reason?: string | null;
  }>;
  [key: string]: unknown;
}

export const DeepSeekWebEndpoint = {
  base: "https://chat.deepseek.com",
  completion: "/api/v0/chat/completion",
  rateLimit: { requestsPerMinute: 60, tokensPerDay: 100000, concurrentRequests: 10 },
};

export const DeepSeekWebModels = {
  default: "deepseek-v4-flash",
  flash: "deepseek-v4-flash",
  pro: "deepseek-v4-pro",
  reasoning: "deepseek-r1",
  v3: "deepseek-v3",
} as const;

export const DeepSeekWebDefaults = {
  temperature: 0.7,
  maxTokens: 4096,
  reasoningEffort: "medium" as const,
  topP: 1.0,
  frequencyPenalty: 0,
  presencePenalty: 0,
};

export const DeepSeekWebHeaders = {
  "Content-Type": "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/event-stream,application/json",
  "Accept-Encoding": "gzip, deflate, br",
};

export const DeepSeekWebErrors = {
  SESSION_EXPIRED: "session_expired",
  RATE_LIMITED: "rate_limit_exceeded",
  INVALID_REQUEST: "invalid_request_error",
  SERVER_ERROR: "internal_server_error",
  SERVICE_UNAVAILABLE: "service_unavailable",
};
