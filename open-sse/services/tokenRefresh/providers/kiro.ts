// @ts-nocheck
// Extracted from open-sse/services/tokenRefresh.ts — see ../shared.ts for
// provenance notes (ported idea from KooshaPari's PR #7338, redone on tip).
import { PROVIDERS } from "../../../config/constants.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import { buildExternalIdpRefreshParams, isExternalIdpAuthMethod } from "../../kiroExternalIdp.ts";

/**
 * Specialized refresh for Kiro (AWS CodeWhisperer) tokens
 * Supports both AWS SSO OIDC (Builder ID/IDC) and Social Auth (Google/GitHub)
 */
export async function refreshKiroToken(
  refreshToken,
  providerSpecificData,
  log,
  proxyConfig: unknown = null
) {
  try {
    const authMethod = providerSpecificData?.authMethod;
    const clientId = providerSpecificData?.clientId;
    const clientSecret = providerSpecificData?.clientSecret;
    const region = providerSpecificData?.region;

    // Enterprise / Microsoft Entra "Your organization" (external_idp) logins refresh with a
    // standard PUBLIC-client OAuth2 refresh_token grant against the org IdP's own tokenEndpoint
    // (form-encoded client_id + refresh_token + scope, no client_secret) — NOT the AWS SSO OIDC
    // or Kiro social endpoints. The rotated refresh_token is persisted by the caller.
    if (isExternalIdpAuthMethod(authMethod)) {
      let refreshRequest;
      try {
        refreshRequest = buildExternalIdpRefreshParams(refreshToken, providerSpecificData);
      } catch (cfgErr) {
        log?.error?.(
          "TOKEN_REFRESH",
          `Invalid Kiro external_idp refresh config: ${cfgErr instanceof Error ? cfgErr.message : String(cfgErr)}`
        );
        return null;
      }

      const response = await runWithProxyContext(proxyConfig, () =>
        fetch(refreshRequest.tokenEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: refreshRequest.body,
        })
      );

      if (!response.ok) {
        const errorText = await response.text();
        let oauthErr: string | undefined;
        try {
          oauthErr = JSON.parse(errorText)?.error;
        } catch {
          /* not JSON */
        }
        if (oauthErr === "invalid_grant" || oauthErr === "invalid_client") {
          log?.error?.(
            "TOKEN_REFRESH",
            "Kiro external_idp refresh token expired/invalid. Re-authentication required.",
            { oauthErr }
          );
          return { error: "unrecoverable_refresh_error", code: oauthErr };
        }
        log?.error?.("TOKEN_REFRESH", "Failed to refresh Kiro external_idp token", {
          status: response.status,
          error: errorText.slice(0, 200),
        });
        return null;
      }

      const tokens = await response.json();
      log?.info?.("TOKEN_REFRESH", "Successfully refreshed Kiro external_idp token", {
        hasNewAccessToken: !!tokens.access_token,
        hasNewRefreshToken: !!tokens.refresh_token,
        expiresIn: tokens.expires_in,
      });
      return {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || refreshToken,
        expiresIn: tokens.expires_in || 3600,
      };
    }

    // AWS SSO OIDC (Builder ID or IDC)
    // If clientId and clientSecret exist, assume AWS SSO OIDC (default to builder-id if authMethod not specified).
    // Exception: imported social tokens (authMethod === "imported") carry a freshly-registered
    // clientId/clientSecret but their refresh token is Kiro-social-issued — the isolated OIDC client
    // cannot refresh it, so they must fall through to the social auth path (#2467).
    if (clientId && clientSecret && authMethod !== "imported") {
      const endpoint = `https://oidc.${region || "us-east-1"}.amazonaws.com/token`;

      const response = await runWithProxyContext(proxyConfig, () =>
        fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            grantType: "refresh_token",
          }),
        })
      );

      if (!response.ok) {
        const errorText = await response.text();

        // AWS SSO OIDC uses {"__type": "InvalidGrantException"} error format (not standard OAuth2).
        let awsErrorType: string | undefined;
        try {
          const awsError = JSON.parse(errorText);
          awsErrorType = awsError.__type || awsError.error;
        } catch {
          // not JSON
        }

        // If the refresh token itself is expired/revoked, no amount of re-registration helps.
        if (
          awsErrorType === "InvalidGrantException" ||
          awsErrorType === "ExpiredTokenException" ||
          awsErrorType === "invalid_grant"
        ) {
          log?.error?.(
            "TOKEN_REFRESH",
            "Kiro AWS refresh token expired/invalid. Re-authentication required.",
            { awsErrorType }
          );
          return { error: "unrecoverable_refresh_error", code: awsErrorType };
        }

        // Client credentials may be expired/invalid (DB import, TTL expiry, browser conflict).
        // Re-register a fresh OIDC client and retry once before giving up (#2524).
        log?.warn?.(
          "TOKEN_REFRESH",
          "Kiro OIDC refresh failed, attempting client re-registration...",
          { status: response.status, error: errorText.slice(0, 200) }
        );

        try {
          const resolvedRegion = region || "us-east-1";
          const regEndpoint = `https://oidc.${resolvedRegion}.amazonaws.com/client/register`;
          const regRes = await runWithProxyContext(proxyConfig, () =>
            fetch(regEndpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "application/json" },
              body: JSON.stringify({
                clientName: "kiro-oauth-client",
                clientType: "public",
                scopes: [
                  "codewhisperer:completions",
                  "codewhisperer:analysis",
                  "codewhisperer:conversations",
                ],
                grantTypes: ["urn:ietf:params:oauth:grant-type:device_code", "refresh_token"],
                issuerUrl: "https://identitycenter.amazonaws.com/ssoins-722374e8c3c8e6c6",
              }),
            })
          );

          if (regRes.ok) {
            const newClient = await regRes.json();
            const retryRes = await runWithProxyContext(proxyConfig, () =>
              fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                  clientId: newClient.clientId,
                  clientSecret: newClient.clientSecret,
                  refreshToken: refreshToken,
                  grantType: "refresh_token",
                }),
              })
            );

            if (retryRes.ok) {
              const retryTokens = await retryRes.json();
              log?.info?.("TOKEN_REFRESH", "Kiro refresh recovered via client re-registration", {
                hasNewAccessToken: !!retryTokens.accessToken,
                expiresIn: retryTokens.expiresIn,
              });
              return {
                accessToken: retryTokens.accessToken,
                refreshToken: retryTokens.refreshToken || refreshToken,
                expiresIn: retryTokens.expiresIn,
                _newClientId: newClient.clientId,
                _newClientSecret: newClient.clientSecret,
                _newClientSecretExpiresAt: newClient.clientSecretExpiresAt,
              };
            }
          }
        } catch (reRegErr) {
          log?.warn?.("TOKEN_REFRESH", "Kiro client re-registration fallback failed", {
            error: String(reRegErr),
          });
        }

        log?.error?.("TOKEN_REFRESH", "Failed to refresh Kiro AWS token", {
          status: response.status,
          error: errorText.slice(0, 200),
        });
        return null;
      }

      const tokens = await response.json();

      log?.info?.("TOKEN_REFRESH", "Successfully refreshed Kiro AWS token", {
        hasNewAccessToken: !!tokens.accessToken,
        expiresIn: tokens.expiresIn,
      });

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken || refreshToken,
        expiresIn: tokens.expiresIn,
      };
    }

    // Social Auth (Google/GitHub) - use Kiro's refresh endpoint
    const tokenUrl = PROVIDERS.kiro.tokenUrl;
    if (!tokenUrl) {
      log?.error?.("TOKEN_REFRESH", "Missing Kiro token endpoint");
      return null;
    }
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      })
    );

    if (!response.ok) {
      const errorText = await response.text();

      // Also check for AWS-style errors on the social auth path (Kiro may relay them)
      try {
        const awsError = JSON.parse(errorText);
        const awsErrorType = awsError.__type || awsError.error;
        if (
          awsErrorType === "InvalidGrantException" ||
          awsErrorType === "ExpiredTokenException" ||
          awsErrorType === "invalid_grant"
        ) {
          log?.error?.(
            "TOKEN_REFRESH",
            "Kiro social refresh token expired/invalid. Re-authentication required.",
            {
              awsErrorType,
            }
          );
          return { error: "unrecoverable_refresh_error", code: awsErrorType };
        }
      } catch {
        // not JSON — fall through
      }

      log?.error?.("TOKEN_REFRESH", "Failed to refresh Kiro social token", {
        status: response.status,
        error: errorText.slice(0, 200),
      });
      return null;
    }

    const tokens = await response.json();

    log?.info?.("TOKEN_REFRESH", "Successfully refreshed Kiro social token", {
      hasNewAccessToken: !!tokens.accessToken,
      expiresIn: tokens.expiresIn,
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken || refreshToken,
      expiresIn: tokens.expiresIn,
    };
  } catch (error) {
    log?.error?.("TOKEN_REFRESH", `Network error refreshing Kiro token: ${error.message}`);
    return null;
  }
}
