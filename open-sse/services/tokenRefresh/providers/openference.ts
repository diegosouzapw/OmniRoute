// @ts-nocheck
import { OAUTH_ENDPOINTS } from "../../../config/constants.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import { buildFormParams } from "../shared.ts";

/**
 * Specialized refresh for Openference OAuth tokens.
 * Openference uses rotating (one-time-use) oar_* refresh tokens.
 */
export async function refreshOpenferenceToken(refreshToken, log, proxyConfig: unknown = null) {
  try {
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(OAUTH_ENDPOINTS.openference.token, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: buildFormParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: OAUTH_ENDPOINTS.openference.clientId,
        }),
      })
    );

    if (!response.ok) {
      const errorText = await response.text();

      let errorCode = null;
      try {
        const parsed = JSON.parse(errorText);
        errorCode =
          parsed?.error?.code || (typeof parsed?.error === "string" ? parsed.error : null);
      } catch {
        // not JSON, ignore
      }

      if (
        errorCode === "invalid_grant" ||
        errorCode === "token_expired" ||
        errorCode === "invalid_token"
      ) {
        log?.error?.(
          "TOKEN_REFRESH",
          "Openference refresh token already used or invalid. Re-authentication required.",
          {
            status: response.status,
            errorCode,
          }
        );
        return { error: "unrecoverable_refresh_error", code: errorCode };
      }

      if (response.status === 401) {
        const code = errorCode || "unauthorized";
        log?.error?.(
          "TOKEN_REFRESH",
          "Openference OAuth token endpoint returned 401. Re-authentication required.",
          {
            status: response.status,
            errorCode: code,
          }
        );
        return { error: "unrecoverable_refresh_error", code };
      }

      log?.error?.("TOKEN_REFRESH", "Failed to refresh Openference token", {
        status: response.status,
        error: errorText,
      });
      return null;
    }

    const tokens = await response.json();

    log?.info?.("TOKEN_REFRESH", "Successfully refreshed Openference token", {
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
    log?.error?.("TOKEN_REFRESH", `Network error refreshing Openference token: ${error.message}`);
    return null;
  }
}
