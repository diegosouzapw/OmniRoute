/**
 * Browser-TLS-impersonating HTTP client for claude.ai.
 *
 * Thin re-export over the shared `tlsClientBase.ts` factory
 * (`createTlsClientModule`). All provider-agnostic logic (wreq-js transport
 * pooling, direct streaming, proxy resolution, deadlines, SSE detection) lives
 * in the base module; this file supplies only Claude-specific config and
 * preserves the original public export surface.
 */

import {
  createTlsClientModule,
  type TlsFetchOptions,
  type TlsFetchResult,
} from "./tlsClientBase.ts";

export const CLAUDE_TLS_BROWSER_MAJOR_VERSION = "146";

const DEFAULT_TIMEOUT_MS =
  Number.parseInt(process.env.OMNIROUTE_CLAUDE_TLS_TIMEOUT_MS || "", 10) || 60_000;
const HARD_TIMEOUT_GRACE_MS =
  Number.parseInt(process.env.OMNIROUTE_CLAUDE_TLS_GRACE_MS || "", 10) || 10_000;

export const tlsClientModule = createTlsClientModule({
  providerName: "Claude",
  tlsProfile: `chrome_${CLAUDE_TLS_BROWSER_MAJOR_VERSION}`,
  emulationOs: "linux",
  domain: "https://claude.ai",
  streamEofPolicy: "include",
  responseValidation: "sse",
  exportCloudflareCheck: false,
  exposeStreamingForTesting: true,
  // Claude allows the native/hard request deadline to bound a slow first SSE byte.
  defaultTimeoutMs: DEFAULT_TIMEOUT_MS,
  hardTimeoutGraceMs: HARD_TIMEOUT_GRACE_MS,
  firstByteTimeoutMs: Number.POSITIVE_INFINITY,
});

export const tlsFetchClaude = (
  url: string,
  options: TlsFetchOptions = {}
): Promise<TlsFetchResult> => tlsClientModule.tlsFetch(url, options);
export const tlsFetchStreaming = tlsClientModule.__tlsFetchStreamingForTesting;

export const __setTlsFetchOverrideForTesting = tlsClientModule.__setTlsFetchOverrideForTesting;

export { TlsClientHangError, TlsClientUnavailableError } from "./tlsClientBase.ts";
export type { TlsFetchOptions, TlsFetchResult } from "./tlsClientBase.ts";
export { looksLikeSse } from "./tlsClientBase.ts";
