export interface WarmupTarget {
  connectionId: string;
  label: string;
  accessToken: string;
  refreshToken?: string;
  tokenExpiresAt?: string | null;
  authType: string;
  providerSpecificData?: Record<string, unknown>;
  baseUrl: string;
  urlSuffix: string;
  headers: Record<string, string>;
  proxyConfig: Record<string, unknown> | string | null;
  model: string;
}

export type WarmupFailureKind = "auth" | "forbidden" | "rate_limit" | "network" | "unknown";

export interface WarmupResult {
  success: boolean;
  tokensUsed: number;
  durationMs: number;
  failureKind?: WarmupFailureKind;
  error?: string;
  retryAttempted?: boolean;
  retryAfterSeconds?: number;
}
