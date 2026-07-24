/**
 * Browser-TLS-impersonating HTTP client for chatgpt.com.
 *
 * Thin wrapper — all logic lives in `tlsClientBase.ts`.
 *
 * NOTE: capitalisation `ChatGpt` (not `ChatGPT`) is kept for backward
 * compatibility with existing importers.
 */

import { createTlsClientModule } from "./tlsClientBase.ts";

// ---------------------------------------------------------------------------
// Env-var overrides (ChatGPT-specific names)
// ---------------------------------------------------------------------------
const DEFAULT_TIMEOUT_MS =
  Number.parseInt(process.env.OMNIROUTE_CHATGPT_TLS_TIMEOUT_MS || "", 10) || 60_000;
const HARD_TIMEOUT_GRACE_MS =
  Number.parseInt(process.env.OMNIROUTE_CHATGPT_TLS_GRACE_MS || "", 10) || 10_000;
const STREAM_FIRST_BYTE_TIMEOUT_MS =
  Number.parseInt(process.env.OMNIROUTE_CHATGPT_STREAM_FIRST_BYTE_TIMEOUT_MS || "", 10) || 30_000;

// ---------------------------------------------------------------------------
// Module singleton
// ---------------------------------------------------------------------------
const module = createTlsClientModule({
  providerName: "ChatGPT",
  tlsProfile: "firefox_148",
  domain: "https://chatgpt.com",
  tempDirPrefix: "cgpt-stream-",
  defaultTimeoutMs: DEFAULT_TIMEOUT_MS,
  hardTimeoutGraceMs: HARD_TIMEOUT_GRACE_MS,
  firstByteTimeoutMs: STREAM_FIRST_BYTE_TIMEOUT_MS,
  tailFileVariant: "A",
  responseValidation: "sse",
  exportCloudflareCheck: false,
  exposeStreamingForTesting: true,
});

// ---------------------------------------------------------------------------
// Public API — backward-compatible names
// ---------------------------------------------------------------------------
export const tlsFetchChatGpt = module.tlsFetch;
export const __setTlsFetchOverrideForTesting = module.__setTlsFetchOverrideForTesting;
export const __tlsFetchStreamingForTesting = module.__tlsFetchStreamingForTesting!;

export type { TlsFetchOptions, TlsFetchResult } from "./tlsClientBase.ts";
export { TlsClientUnavailableError, TlsClientHangError } from "./tlsClientBase.ts";
