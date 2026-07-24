/**
 * Browser-TLS-impersonating HTTP client for app.notion.com.
 *
 * Thin wrapper — all logic lives in `tlsClientBase.ts`.
 *
 * NOTE: temp dir prefix `pplx-stream-` is a copy-paste legacy from the
 * Perplexity implementation and is preserved for reproducibility.
 */

import { createTlsClientModule } from "./tlsClientBase.ts";

// ---------------------------------------------------------------------------
// Env-var overrides (Notion-specific names)
// ---------------------------------------------------------------------------
const DEFAULT_TIMEOUT_MS =
  Number.parseInt(process.env.OMNIROUTE_NOTION_TLS_TIMEOUT_MS || "", 10) || 30_000;
const HARD_TIMEOUT_GRACE_MS =
  Number.parseInt(process.env.OMNIROUTE_NOTION_TLS_GRACE_MS || "", 10) || 10_000;

// ---------------------------------------------------------------------------
// Module singleton
// ---------------------------------------------------------------------------
const module = createTlsClientModule({
  providerName: "Notion",
  tlsProfile: "chrome_146",
  domain: "https://app.notion.com",
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
export const tlsFetchNotion = module.tlsFetch;
export const __setTlsFetchOverrideForTesting = module.__setTlsFetchOverrideForTesting;
export const isCloudflareChallenge = module.isCloudflareChallenge!;

export type { TlsFetchOptions, TlsFetchResult } from "./tlsClientBase.ts";
export { TlsClientUnavailableError, TlsClientHangError } from "./tlsClientBase.ts";
