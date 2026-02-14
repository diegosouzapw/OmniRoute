/**
 * Domain Types — FASE-03 Architecture Refactoring
 *
 * Centralized type definitions for the OmniRoute domain layer.
 * Uses JSDoc for type safety without TypeScript compilation.
 *
 * @module domain/types
 */

/**
 * @typedef {'openai'|'claude'|'gemini'|'codex'|'qwen'|'deepseek'|'cohere'|'groq'|'mistral'|'openrouter'} ProviderId
 */

/**
 * @typedef {'apikey'|'oauth'|'bearer'} AuthType
 */

/**
 * @typedef {Object} ProviderConnection
 * @property {string} id - Unique connection ID
 * @property {ProviderId} provider - Provider identifier
 * @property {AuthType} authType - Authentication type
 * @property {string} name - Display name
 * @property {boolean} isActive - Whether the connection is active
 * @property {string} [apiKey] - API key (for apikey auth)
 * @property {string} [accessToken] - Access token (for oauth auth)
 * @property {string} [refreshToken] - Refresh token (for oauth auth)
 * @property {string} [email] - Email (for oauth auth)
 * @property {string} [baseUrl] - Custom base URL
 * @property {boolean} [rateLimitProtection] - Whether rate limit protection is enabled
 * @property {string} createdAt - ISO timestamp
 * @property {string} updatedAt - ISO timestamp
 */

/**
 * @typedef {Object} Combo
 * @property {string} id - Combo unique ID
 * @property {string} name - Display name
 * @property {'priority'|'round-robin'|'random'|'least-used'} strategy - Selection strategy
 * @property {Array<string|{model: string, weight?: number}>} models - Model entries
 * @property {boolean} [isActive] - Whether the combo is active
 */

/**
 * @typedef {Object} UsageEntry
 * @property {string} id - Unique entry ID
 * @property {string} model - Model identifier
 * @property {string} provider - Provider identifier
 * @property {string} connectionId - Connection ID
 * @property {number} inputTokens - Input token count
 * @property {number} outputTokens - Output token count
 * @property {number} totalTokens - Total token count
 * @property {number} [cost] - Estimated cost in USD
 * @property {string} status - Request status (success, error, timeout)
 * @property {number} latencyMs - Response latency in milliseconds
 * @property {string} timestamp - ISO timestamp
 */

/**
 * @typedef {Object} ChatRequest
 * @property {Array<{role: string, content: string|Array}>} [messages] - OpenAI/Claude format
 * @property {Array} [input] - Responses API format
 * @property {string} [model] - Model identifier
 * @property {string} [system] - System prompt (Claude format)
 * @property {boolean} [stream] - Whether to stream response
 * @property {number} [max_tokens] - Maximum output tokens
 */

/**
 * @typedef {Object} SanitizeResult
 * @property {boolean} blocked - Whether the request was blocked
 * @property {boolean} modified - Whether the request body was modified
 * @property {Array<{pattern: string, severity: string, matched: string}>} detections - Detected patterns
 * @property {ChatRequest} [sanitizedBody] - Modified body (if redacted)
 */

/**
 * @typedef {Object} SecretsValidationResult
 * @property {boolean} valid - Whether all secrets pass validation
 * @property {Array<{name: string, issue: string}>} errors - Critical errors
 * @property {Array<{name: string, issue: string}>} warnings - Non-blocking warnings
 */

/**
 * @typedef {Object} ProxyConfig
 * @property {'http'|'https'|'socks5'} type - Proxy type
 * @property {string} host - Proxy host
 * @property {string} port - Proxy port
 * @property {string} [username] - Proxy username
 * @property {string} [password] - Proxy password
 */

/**
 * @typedef {Object} AppSettings
 * @property {boolean} requireLogin - Whether login is required
 * @property {boolean} hasPassword - Whether a password has been set
 * @property {string} [theme] - UI theme
 * @property {string} [language] - UI language
 * @property {boolean} [enableRequestLogs] - Whether request logging is enabled
 * @property {boolean} [enableSocks5Proxy] - Whether SOCKS5 proxy is allowed
 * @property {string} [instanceName] - Instance display name
 * @property {string} [corsOrigins] - Allowed CORS origins
 * @property {number} [logRetentionDays] - Log retention in days
 */

/**
 * Standard API error response shape.
 * @typedef {Object} ApiError
 * @property {number} status - HTTP status code
 * @property {string} code - Error code (e.g. 'INVALID_INPUT', 'AUTH_REQUIRED')
 * @property {string} message - Human-readable error message
 * @property {Object} [details] - Additional error details
 */

// Export nothing — this file is purely for JSDoc type definitions
export {};
