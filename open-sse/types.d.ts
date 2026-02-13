/**
 * Core type definitions for omniroute.
 *
 * These types describe the main data structures flowing through the proxy
 * pipeline: credentials, model info, executor results, and chat parameters.
 *
 * Usage (JSDoc reference):
 *   /** @type {import("./types").ProviderCredentials} *\/
 */

// ============ Provider & Auth ============

export interface ProviderCredentials {
  /** OAuth access token (short-lived) */
  accessToken: string;
  /** OAuth refresh token (long-lived) */
  refreshToken?: string;
  /** Internal connection ID */
  connectionId: string;
  /** User email associated with the connection */
  email?: string;
  /** API key (for apikey auth type) */
  apiKey?: string;
  /** Token expiry timestamp */
  expiresAt?: string;
  /** Provider-specific extra data (e.g., AWS region, auth method) */
  providerSpecificData?: Record<string, unknown>;
}

export interface ModelInfo {
  /** Canonical provider ID (e.g., "claude", "gemini-cli") */
  provider: string;
  /** Model identifier (e.g., "claude-opus-4-6") */
  model: string;
  /** Optional original model string from client (e.g., "cc/opus-4-6") */
  originalModel?: string;
}

// ============ Executor ============

export interface ExecutorResult {
  /** Whether the upstream request succeeded (2xx) */
  success: boolean;
  /** The HTTP Response from the upstream provider */
  response: Response;
  /** HTTP status code (present on failure) */
  status?: number;
  /** Human-readable error message (present on failure) */
  error?: string;
  /** Suggested retry delay in ms (present on rate-limit) */
  retryAfterMs?: number;
}

// ============ Chat Pipeline ============

export interface ChatCoreParams {
  /** Parsed request body */
  body: Record<string, unknown>;
  /** Resolved model info */
  modelInfo: ModelInfo;
  /** Provider credentials to use */
  credentials: ProviderCredentials;
  /** Request-scoped logger */
  log: Logger;
  /** Raw client request body (before translation) */
  clientRawRequest?: Record<string, unknown>;
  /** Connection ID for usage tracking */
  connectionId: string;
  /** API key metadata for usage attribution */
  apiKeyInfo?: { id?: string; name?: string } | null;
  /** Client User-Agent header */
  userAgent?: string;
  /** Callback when credentials are refreshed mid-request */
  onCredentialsRefreshed?: (creds: ProviderCredentials) => Promise<void>;
  /** Callback on successful upstream response */
  onRequestSuccess?: () => Promise<void>;
}

// ============ Logger ============

export interface Logger {
  debug(tag: string, message: string, data?: Record<string, unknown>): void;
  info(tag: string, message: string, data?: Record<string, unknown>): void;
  warn(tag: string, message: string, data?: Record<string, unknown>): void;
  error(tag: string, message: string, data?: Record<string, unknown>): void;
}

export interface TaggedLogger {
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
}

// ============ Configuration ============

export interface ProviderConfig {
  /** Primary base URL */
  baseUrl?: string;
  /** Multiple base URLs for failover */
  baseUrls?: string[];
  /** API format identifier */
  format: string;
  /** Default HTTP headers */
  headers?: Record<string, string>;
  /** OAuth client ID */
  clientId?: string;
  /** OAuth client secret */
  clientSecret?: string;
  /** Token refresh endpoint */
  tokenUrl?: string;
  /** Authorization endpoint */
  authUrl?: string;
}

// ============ Translator ============

export interface TranslationState {
  /** Source format to translate TO */
  sourceFormat: string;
  /** Current accumulated content */
  content?: string;
  /** Provider that generated the response */
  provider?: string;
  /** Map of tool names for translation */
  toolNameMap?: Record<string, string> | null;
  /** Accumulated usage data */
  usage?: UsageData | null;
  /** Finish reason from provider */
  finishReason?: string | null;
}

export interface UsageData {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
