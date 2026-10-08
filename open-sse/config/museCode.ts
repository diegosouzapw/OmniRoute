/**
 * Muse Code (Meta) public endpoints and CLI identity.
 *
 * Parity with CLIProxyAPI's Meta provider (`internal/auth/meta`,
 * `internal/runtime/executor/meta_executor*`): RFC 8628 device grant against
 * auth.meta.com, then mint of the subscription inference key at
 * api.meta.ai/muse-code/key. The Muse CLI User-Agent is required by Meta.
 */

export const MUSE_CODE_USER_AGENT = "muse-code/1.0.2";
/** Inference UA used by CLIProxyAPI's MetaExecutor (auth still uses muse-code/1.0.2). */
export const MUSE_CODE_INFERENCE_USER_AGENT =
  "muse-build/1.3.0 (interactive; macos-aarch64; build ac7280f2aca67769d1455a8847bb502b617d50f6)";
export const MUSE_CODE_AUTH_HOST = "https://auth.meta.com";
export const MUSE_CODE_DEVICE_CODE_URL = `${MUSE_CODE_AUTH_HOST}/oidc/device/authorization/`;
export const MUSE_CODE_TOKEN_URL = `${MUSE_CODE_AUTH_HOST}/oidc/device/token/`;
export const MUSE_CODE_MINT_URL = "https://api.meta.ai/muse-code/key";
export const MUSE_CODE_API_BASE_URL = "https://api.meta.ai/v1";
export const MUSE_CODE_RESPONSES_URL = `${MUSE_CODE_API_BASE_URL}/responses`;
export const MUSE_CODE_DEVICE_GRANT = "urn:ietf:params:oauth:grant-type:device_code";
export const MUSE_CODE_DEFAULT_POLL_INTERVAL_SEC = 5;
export const MUSE_CODE_MAX_POLL_MS = 15 * 60 * 1000;

export function museCodeHeaders(extra?: Record<string, string>): Record<string, string> {
  return {
    Accept: "application/json",
    "User-Agent": MUSE_CODE_USER_AGENT,
    ...extra,
  };
}

export function isMuseDcaToken(token: string | null | undefined): boolean {
  return typeof token === "string" && token.trim().startsWith("dca:");
}

export function normalizeMuseBaseUrl(raw: string | null | undefined): string {
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  if (!trimmed) return MUSE_CODE_API_BASE_URL;
  return trimmed.replace(/\/+$/, "");
}
