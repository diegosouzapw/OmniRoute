/**
 * Browser-TLS-impersonating HTTP client for www.perplexity.ai.
 *
 * Thin wrapper — all logic lives in `tlsClientBase.ts`.
 */

import { createTlsClientModule } from "./tlsClientBase.ts";

// ---------------------------------------------------------------------------
// Env-var overrides (Perplexity-specific names)
// ---------------------------------------------------------------------------
const DEFAULT_TIMEOUT_MS =
  Number.parseInt(process.env.OMNIROUTE_PPLX_TLS_TIMEOUT_MS || "", 10) || 30_000;
const HARD_TIMEOUT_GRACE_MS =
  Number.parseInt(process.env.OMNIROUTE_PPLX_TLS_GRACE_MS || "", 10) || 10_000;

// ---------------------------------------------------------------------------
// Module singleton
// ---------------------------------------------------------------------------
const module = createTlsClientModule({
  providerName: "Perplexity",
  tlsProfile: "firefox_148",
  domain: "https://www.perplexity.ai",
  tempDirPrefix: "pplx-stream-",
  defaultTimeoutMs: DEFAULT_TIMEOUT_MS,
  hardTimeoutGraceMs: HARD_TIMEOUT_GRACE_MS,
  tailFileVariant: "A",
  responseValidation: "sse",
  exportCloudflareCheck: true,
});

// ---------------------------------------------------------------------------
// Public API — backward-compatible names
// ---------------------------------------------------------------------------
export const tlsFetchPerplexity = module.tlsFetch;
export const __setTlsFetchOverrideForTesting = module.__setTlsFetchOverrideForTesting;
export const isCloudflareChallenge = module.isCloudflareChallenge!;

export type { TlsFetchOptions, TlsFetchResult } from "./tlsClientBase.ts";
export { TlsClientUnavailableError, TlsClientHangError } from "./tlsClientBase.ts";
