// @ts-nocheck
// Extracted from open-sse/services/tokenRefresh.ts — see ../shared.ts for
// provenance notes (ported idea from KooshaPari's PR #7338, redone on tip).
import { PROVIDERS, OAUTH_ENDPOINTS } from "../../../config/constants.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import { buildFormParams } from "../shared.ts";

/**
 * Specialized refresh for Codex (OpenAI) OAuth tokens.
 * OpenAI uses rotating (one-time-use) refresh tokens.
 * Returns { error: 'unrecoverable_refresh_error', code } when the token has already been
 * consumed or is invalid, so callers can stop retrying and request re-authentication.
 */
export async function refreshCodexToken(refreshToken, log, proxyConfig: unknown = null) {
  try {
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(OAUTH_ENDPOINTS.openai.token, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        // Body intentionally omits `scope`. RFC 6749 §6 makes scope optional on a
        // refresh_token grant (the server reuses the originally-granted scope when
        // absent). Including `scope` causes Auth0 (which OpenAI Codex OAuth is
        // built on) to treat the request as a re-scope, which can invalidate
        // sibling refresh_token families on the same client_id. Matches the
        // pattern used by ndycode/codex-multi-auth, the only known tool that
        // sustains multiple Codex accounts without cross-invalidation.
        body: buildFormParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: PROVIDERS.codex.clientId,
        }),
      })
    );

    if (!response.ok) {
      const errorText = await response.text();

      // Detect unrecoverable "refresh_token_reused" or "invalid_grant" error from OpenAI
      // This means the token was already consumed or has expired.
      // Retrying with the same token will never succeed.
      let errorCode = null;
      try {
        const parsed = JSON.parse(errorText);
        errorCode =
          parsed?.error?.code || (typeof parsed?.error === "string" ? parsed.error : null);
      } catch {
        // not JSON, ignore
      }

      if (
        errorCode === "refresh_token_reused" ||
        errorCode === "invalid_grant" ||
        errorCode === "token_expired" ||
        errorCode === "invalid_token"
      ) {
        log?.error?.(
          "TOKEN_REFRESH",
          "Codex refresh token already used or invalid. Re-authentication required.",
          {
            status: response.status,
            errorCode,
          }
        );
        return { error: "unrecoverable_refresh_error", code: errorCode };
      }

      // Defense-in-depth (port from decolua/9router#1821): any 401 from OpenAI's
      // OAuth token endpoint means the refresh credential itself was rejected
      // (e.g. rotated away, or a payload variant whose code we do not yet
      // recognize — OpenAI has shipped both `token_expired` and the bare
      // "Could not validate your token" message). Retrying with the same dead
      // refresh token will never succeed; surface re-auth instead of looping.
      // 429 / 5xx remain transient and fall through to the retryable branch.
      if (response.status === 401) {
        const code = errorCode || "unauthorized";
        log?.error?.(
          "TOKEN_REFRESH",
          "Codex OAuth token endpoint returned 401. Re-authentication required.",
          {
            status: response.status,
            errorCode: code,
          }
        );
        return { error: "unrecoverable_refresh_error", code };
      }

      log?.error?.("TOKEN_REFRESH", "Failed to refresh Codex token", {
        status: response.status,
        error: errorText,
      });
      return null;
    }

    const tokens = await response.json();

    log?.info?.("TOKEN_REFRESH", "Successfully refreshed Codex token", {
      hasNewAccessToken: !!tokens.access_token,
      hasNewRefreshToken: !!tokens.refresh_token,
      expiresIn: tokens.expires_in,
    });

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || refreshToken,
      expiresIn: tokens.expires_in,
    };
  } catch (error) {
    log?.error?.("TOKEN_REFRESH", `Network error refreshing Codex token: ${error.message}`);
    return null;
  }
}
