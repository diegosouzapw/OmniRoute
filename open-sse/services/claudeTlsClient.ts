/**
 * Browser-TLS-impersonating HTTP client for claude.ai.
 *
 * Thin wrapper — all logic lives in `tlsClientBase.ts`.
 *
 * NOTE: temp dir prefix `cgpt-stream-` is a copy-paste legacy from the
 * ChatGPT implementation and is preserved for reproducibility.
 */

import { createTlsClientModule } from "./tlsClientBase.ts";

// ---------------------------------------------------------------------------
// Env-var overrides (Claude-specific names)
// ---------------------------------------------------------------------------
const DEFAULT_TIMEOUT_MS =
  Number.parseInt(process.env.OMNIROUTE_CLAUDE_TLS_TIMEOUT_MS || "", 10) || 60_000;
const HARD_TIMEOUT_GRACE_MS =
  Number.parseInt(process.env.OMNIROUTE_CLAUDE_TLS_GRACE_MS || "", 10) || 10_000;

// ---------------------------------------------------------------------------
// Module singleton
// ---------------------------------------------------------------------------
const module = createTlsClientModule({
  providerName: "Claude",
  tlsProfile: "chrome_146",
  domain: "https://claude.ai",
  tempDirPrefix: "cgpt-stream-",
  defaultTimeoutMs: DEFAULT_TIMEOUT_MS,
  hardTimeoutGraceMs: HARD_TIMEOUT_GRACE_MS,
  tailFileVariant: "A",
  responseValidation: "sse",
  exportCloudflareCheck: false,
});

// ---------------------------------------------------------------------------
// Public API — backward-compatible names
// ---------------------------------------------------------------------------
export const tlsFetchClaude = module.tlsFetch;
export const __setTlsFetchOverrideForTesting = module.__setTlsFetchOverrideForTesting;
export const CLAUDE_TLS_BROWSER_MAJOR_VERSION = "146";

export type { TlsFetchOptions, TlsFetchResult } from "./tlsClientBase.ts";
export { TlsClientUnavailableError, TlsClientHangError } from "./tlsClientBase.ts";
