// Auto-extracted from open-sse/services/tokenRefresh.ts in PR-#4609-batch
// Function: refreshKimiCodingToken | Lines: 535-647 (113 LOC)
// Ref: see open-sse/services/tokenRefresh.ts top-of-file comment for split rationale.

export async function refreshKimiCodingToken(
  refreshToken: string,
  providerSpecificData: Record<string, unknown> | null | undefined,
  log: RefreshLogger,
  proxyConfig: unknown = null
) {
  const endpoint = PROVIDERS["kimi-coding"]?.refreshUrl || PROVIDERS["kimi-coding"]?.tokenUrl;
  if (!endpoint) {
    log?.warn?.("TOKEN_REFRESH", "No refresh URL configured for Kimi Coding");
    return null;
  }

  // Prefer stable device_id persisted at login time; fall back to a
  // deterministic hash of the refresh token so it is at least consistent
  // across refreshes for the same session.
  const stableDeviceId =
    (providerSpecificData?.deviceId as string) ||
    pbkdf2Sync(refreshToken, "kimi-device-id", 1000, 16, "sha256").toString("hex");

  const platform = "kimi_cli";
  const version = process.env.KIMI_CLI_VERSION || "1.36.0";

  // Build device model string matching the format from providers/kimi-coding.ts.
  // open-sse is a portable workspace — use process.platform/arch (always available in Node).
  const osTypeStr = typeof process !== "undefined" ? process.platform : "unknown";
  const archStr = typeof process !== "undefined" ? process.arch : "unknown";
  const deviceModel = [osTypeStr, archStr].filter(Boolean).join(" ");

  try {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: PROVIDERS["kimi-coding"]?.clientId || "",
    });

    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "X-Msh-Platform": platform,
          "X-Msh-Version": version,
          "X-Msh-Device-Model": (providerSpecificData?.deviceModel as string) || deviceModel,
          "X-Msh-Device-Id": stableDeviceId,
          // These headers match getKimiOAuthHeaders() in providers/kimi-coding.ts.
          // They're derived at runtime from os module calls; use safe fallbacks here
          // since open-sse is a portable workspace without direct fs/os access.
          "X-Msh-Device-Name": (providerSpecificData?.deviceName as string) || osTypeStr,
          "X-Msh-Os-Version": (providerSpecificData?.osVersion as string) || osTypeStr,
        },
        body: params,
      })
    );

    if (!response.ok) {
      const errorText = await response.text();

      // Detect unrecoverable errors
      try {
        const parsed = JSON.parse(errorText);
        const errorCode = parsed?.error;
        if (errorCode === "invalid_grant" || errorCode === "invalid_request") {
          log?.error?.(
            "TOKEN_REFRESH",
            "Kimi Coding refresh token invalid. Re-authentication required.",
            {
              errorCode,
            }
          );
          return { error: "unrecoverable_refresh_error", code: errorCode };
        }
      } catch {
        // not JSON — fall through
      }

      log?.error?.("TOKEN_REFRESH", "Failed to refresh Kimi Coding token", {
        status: response.status,
        error: errorText.slice(0, 200),
      });
      return null;
    }

    const tokens = await response.json();
    log?.info?.("TOKEN_REFRESH", "Successfully refreshed Kimi Coding token", {
      hasNewAccessToken: !!tokens.access_token,
      hasNewRefreshToken: !!tokens.refresh_token,
      expiresIn: tokens.expires_in,
    });

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || refreshToken,
      expiresIn: tokens.expires_in,
      tokenType: tokens.token_type,
      scope: tokens.scope,
    };
  } catch (error) {
    log?.error?.(
      "TOKEN_REFRESH",
      `Network error refreshing Kimi Coding token: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
}

/**
 * Specialized refresh for GitLab Duo OAuth tokens.
 * Token URL is instance-specific; resolves from providerSpecificData.baseUrl.
 * Uses PKCE authorization_code flow initially but refresh_token grant does NOT
 * require code_verifier — only client_id + refresh_token.
 * On invalid_grant (revoked/expired refresh token) returns the unrecoverable sentinel.
 */
