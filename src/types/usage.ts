/**
 * Usage tracking types for API call monitoring and statistics.
 */
export interface UsageEntry {
  id: string;
  date: string;
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  latencyMs: number;
  statusCode: number;
  comboId?: string;
  apiKeyId?: string;
}

export interface UsageStats {
  totalCalls: number;
  totalTokens: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  avgLatencyMs: number;
  errorRate: number;
  byProvider: Record<string, ProviderUsageStats>;
  byModel: Record<string, ModelUsageStats>;
}

export interface ProviderUsageStats {
  calls: number;
  tokens: number;
  errors: number;
  avgLatencyMs: number;
}

export interface ModelUsageStats {
  calls: number;
  inputTokens: number;
  outputTokens: number;
  avgLatencyMs: number;
}

export interface CallLog {
  id: string;
  timestamp: string;
  method: string;
  path: string;
  provider: string;
  model: string;
  statusCode: number;
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  error?: string;
  comboId?: string;
  connectionId?: string;
}
