import { KIRO_CONFIG, assertValidAwsRegion } from "../constants/oauth";
import {
  buildExternalIdpRefreshParams,
  isExternalIdpAuthMethod,
} from "@omniroute/open-sse/services/kiroExternalIdp.ts";

/**
 * Kiro OAuth Service
 * Supports multiple authentication methods:
 * 1. AWS Builder ID (Device Code Flow)
 * 2. AWS IAM Identity Center/IDC (Device Code Flow)
 * 3. Google/GitHub Social Login (Authorization Code Flow + Manual Callback)
 * 4. Import Token (Manual refresh token paste)
 */

const KIRO_AUTH_SERVICE = "https://prod.us-east-1.auth.desktop.kiro.dev";

export class KiroService {
  /**
   * Register OIDC client with AWS SSO
   * Returns clientId and clientSecret for device code flow
   */
  async registerClient(region: string = "us-east-1") {
    assertValidAwsRegion(region);
    const endpoint = `https://oidc.${region}.amazonaws.com/client/register`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientName: KIRO_CONFIG.clientName,
        clientType: KIRO_CONFIG.clientType,
        scopes: KIRO_CONFIG.scopes,
        grantTypes: KIRO_CONFIG.grantTypes,
        issuerUrl: KIRO_CONFIG.issuerUrl,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to register client: ${error}`);
    }

    const data = await response.json();
    return {
      clientId: data.clientId,
      clientSecret: data.clientSecret,
      clientSecretExpiresAt: data.clientSecretExpiresAt,
    };
  }

  /**
   * Start device authorization for AWS Builder ID or IDC
   */
  async startDeviceAuthorization(
    clientId: string,
    clientSecret: string,
    startUrl: string,
    region: string = "us-east-1"
  ) {
    assertValidAwsRegion(region);
    const endpoint = `https://oidc.${region}.amazonaws.com/device_authorization`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        clientSecret,
        startUrl,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to start device authorization: ${error}`);
    }

    const data = await response.json();
    return {
      deviceCode: data.deviceCode,
      userCode: data.userCode,
      verificationUri: data.verificationUri,
      verificationUriComplete: data.verificationUriComplete,
      expiresIn: data.expiresIn,
      interval: data.interval || 5,
    };
  }

  /**
   * Poll for token using device code (AWS Builder ID/IDC)
   */
  async pollDeviceToken(
    clientId: string,
    clientSecret: string,
    deviceCode: string,
    region: string = "us-east-1"
  ) {
    assertValidAwsRegion(region);
    const endpoint = `https://oidc.${region}.amazonaws.com/token`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        clientSecret,
        deviceCode,
        grantType: "urn:ietf:params:oauth:grant-type:device_code",
      }),
    });

    const data = await response.json();

    // Handle pending/slow_down/errors
    if (!response.ok || data.error) {
      return {
        success: false,
        error: data.error,
        errorDescription: data.error_description,
        pending: data.error === "authorization_pending" || data.error === "slow_down",
      };
    }

    return {
      success: true,
      tokens: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
        tokenType: data.tokenType,
      },
    };
  }

  /**
   * Build Google/GitHub social login URL
   * Returns authorization URL for manual callback flow
   * Uses kiro:// custom protocol as required by AWS Cognito whitelist
   */
  buildSocialLoginUrl(provider: string, codeChallenge: string, state: string) {
    const idp = provider === "google" ? "Google" : "Github";
    // AWS Cognito only whitelists kiro:// protocol, not localhost
    const redirectUri = "kiro://kiro.kiroAgent/authenticate-success";
    return `${KIRO_AUTH_SERVICE}/login?idp=${idp}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${state}&prompt=select_account`;
  }

  /**
   * Exchange authorization code for tokens (Social Login)
   * Must use same redirect_uri as authorization request
   */
  async exchangeSocialCode(code: string, codeVerifier: string) {
    // Must match the redirect_uri used in buildSocialLoginUrl
    const redirectUri = "kiro://kiro.kiroAgent/authenticate-success";

    const response = await fetch(`${KIRO_AUTH_SERVICE}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        code_verifier: codeVerifier,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    const data = await response.json();
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      profileArn: data.profileArn,
      expiresIn: data.expiresIn || 3600,
    };
  }

  /**
   * Refresh token using refresh token
   */
  async refreshToken(refreshToken: string, providerSpecificData: any = {}) {
    const { authMethod, clientId, clientSecret, region } = providerSpecificData;

    // Enterprise / Microsoft Entra "Your organization" (external_idp) login: refresh with a
    // standard public-client OAuth2 refresh_token grant against the org IdP's tokenEndpoint
    // (form-encoded client_id + refresh_token + scope, no client_secret). The AWS SSO OIDC and
    // Kiro social endpoints cannot refresh these tokens.
    if (isExternalIdpAuthMethod(authMethod)) {
      const refreshRequest = buildExternalIdpRefreshParams(refreshToken, providerSpecificData);
      const response = await fetch(refreshRequest.tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: refreshRequest.body,
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Token refresh failed: ${error}`);
      }
      const data = await response.json();
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || refreshToken,
        expiresIn: data.expires_in || 3600,
      };
    }

    // AWS SSO OIDC refresh (Builder ID or IDC).
    // Imported social tokens (authMethod === "imported") have a registered clientId/clientSecret
    // but a Kiro-social refresh token the OIDC client can't refresh — use the social path (#2467).
    if (clientId && clientSecret && authMethod !== "imported") {
      const resolvedRegion = region || "us-east-1";
      assertValidAwsRegion(resolvedRegion);
      const endpoint = `https://oidc.${resolvedRegion}.amazonaws.com/token`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId,
          clientSecret,
          refreshToken,
          grantType: "refresh_token",
        }),
      });

      if (!response.ok) {
        // Client credentials may be expired or invalid (DB import, TTL, browser conflict).
        // Re-register a fresh OIDC client and retry once before giving up (#2524).
        console.warn("[kiro refresh] OIDC refresh failed, attempting client re-registration...");
        try {
          const newReg = await this.registerClient(resolvedRegion);
          const retryRes = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              clientId: newReg.clientId,
              clientSecret: newReg.clientSecret,
              refreshToken,
              grantType: "refresh_token",
            }),
          });

          if (retryRes.ok) {
            const retryData = await retryRes.json();
            return {
              accessToken: retryData.accessToken,
              refreshToken: retryData.refreshToken || refreshToken,
              expiresIn: retryData.expiresIn || 3600,
              _newClientId: newReg.clientId,
              _newClientSecret: newReg.clientSecret,
              _newClientSecretExpiresAt: newReg.clientSecretExpiresAt,
            };
          } else {
            const retryError = await retryRes.text();
            throw new Error(`Token refresh retry failed after re-registration: ${retryError}`);
          }
        } catch (reRegErr) {
          if (reRegErr.message?.includes("Token refresh retry failed")) throw reRegErr;
          console.warn("[kiro refresh] Re-registration fallback failed:", reRegErr);
        }

        const error = await response.text();
        throw new Error(`Token refresh failed: ${error}`);
      }

      const data = await response.json();
      return {
        // Builder ID / IDC OIDC refresh: no profileArn (the social path supplies
        // one; Builder ID connections legitimately have none). expiresIn falls
        // back to 3600 so the import route never computes Date(NaN) if upstream
        // omits it (the social path already guards the same way).
        accessToken: data.accessToken,
        refreshToken: data.refreshToken || refreshToken,
        expiresIn: data.expiresIn || 3600,
      };
    }

    // Social auth refresh (Google/GitHub)
    const response = await fetch(`${KIRO_AUTH_SERVICE}/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token refresh failed: ${error}`);
    }

    const data = await response.json();
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken || refreshToken,
      profileArn: data.profileArn,
      expiresIn: data.expiresIn || 3600,
    };
  }

  /**
   * Validate and import refresh token.
   * First attempts to validate using cached AWS SSO client credentials (Builder ID path).
   * If that fails or no cached credentials exist, registers a dedicated OIDC client.
   * If registerClient() also fails, the import falls back to the shared social-auth refresh path.
   */
  async validateImportToken(refreshToken: string, region: string = "us-east-1") {
    assertValidAwsRegion(region);
    // Validate token format
    if (!refreshToken.startsWith("aorAAAAAG")) {
      throw new Error("Invalid token format. Token should start with aorAAAAAG...");
    }

    // Try to read cached clientId/clientSecret from AWS SSO cache (Builder ID tokens)
    const cachedClient = await this.readCachedClientCredentials(region);

    // Attempt 1: Try Builder ID refresh using cached credentials
    if (cachedClient) {
      try {
        const result = await this.refreshToken(refreshToken, {
          clientId: cachedClient.clientId,
          clientSecret: cachedClient.clientSecret,
          authMethod: "builder-id",
          // Forward the requested region so a non-us-east-1 Builder ID validates
          // against the right OIDC endpoint instead of defaulting to us-east-1.
          region,
        });
        return {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken || refreshToken,
          // profileArn is intentionally absent for Builder ID (OIDC) imports —
          // only the social-auth path returns one, and Builder ID connections
          // don't require it. The Kiro executor adds profileArn conditionally.
          profileArn: result.profileArn,
          expiresIn: result.expiresIn,
          authMethod: "builder-id",
          clientId: cachedClient.clientId,
          clientSecret: cachedClient.clientSecret,
        };
      } catch {
        // Cached credentials didn't work, fall through
      }
    }

    // Attempt 2: Try social auth refresh
    let result: Awaited<ReturnType<typeof this.refreshToken>>;
    try {
      result = await this.refreshToken(refreshToken);
    } catch (error: any) {
      throw new Error(`Token validation failed: ${error.message}`);
    }

    // Register an independent OIDC client for this connection so multiple accounts
    // do not share a single Kiro backend session (issue #2328).
    let clientId: string | undefined;
    let clientSecret: string | undefined;
    let clientSecretExpiresAt: number | undefined;
    try {
      const registration = await this.registerClient(region);
      clientId = registration.clientId;
      clientSecret = registration.clientSecret;
      clientSecretExpiresAt = registration.clientSecretExpiresAt;
    } catch (err: any) {
      console.warn("[kiro import] registerClient failed, continuing without isolated client:", err);
    }

    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken || refreshToken,
      profileArn: result.profileArn,
      expiresIn: result.expiresIn,
      authMethod: "imported",
      ...(clientId ? { clientId, clientSecret, clientSecretExpiresAt } : {}),
    };
  }

  /**
   * Read clientId/clientSecret from AWS SSO cache (for Builder ID tokens).
   * The cache is located at ~/.aws/sso/cache/ and contains JSON files from
   * the OIDC client registration step of the device code flow.
   */
  private async readCachedClientCredentials(
    region?: string
  ): Promise<{ clientId: string; clientSecret: string } | null> {
    try {
      const { readdir, readFile } = await import("fs/promises");
      const { homedir } = await import("os");
      const { join } = await import("path");
      const cachePath = join(homedir(), ".aws", "sso", "cache");
      const files = await readdir(cachePath);

      const candidates: {
        clientId: string;
        clientSecret: string;
        region?: string;
        expiresAt?: string;
      }[] = [];
      for (const file of files) {
        if (!file.endsWith(".json")) continue;
        try {
          const content = await readFile(join(cachePath, file), "utf-8");
          const data = JSON.parse(content);
          if (data.clientId && data.clientSecret) {
            candidates.push({
              clientId: data.clientId,
              clientSecret: data.clientSecret,
              region: data.region,
              expiresAt: data.clientSecretExpiresAt || data.expiresAt,
            });
          }
        } catch {
          continue;
        }
      }
      if (candidates.length === 0) return null;

      // A host can cache OIDC client registrations for several SSO sessions;
      // adopting the wrong pair makes the Builder ID refresh fail. Prefer a
      // registration whose region matches the requested import region, then —
      // among the candidates — the one with the latest secret expiry, instead
      // of blindly taking the first file readdir happens to return.
      const byLatestExpiry = (a: { expiresAt?: string }, b: { expiresAt?: string }): number =>
        String(b.expiresAt || "").localeCompare(String(a.expiresAt || ""));
      const matching = region ? candidates.filter((c) => c.region === region) : [];
      const ordered = (matching.length > 0 ? matching : candidates).slice().sort(byLatestExpiry);
      const best = ordered[0];
      return { clientId: best.clientId, clientSecret: best.clientSecret };
    } catch {
      // Cache not available
    }
    return null;
  }

  /**
   * List available CodeWhisperer profiles for an access token or long-lived API key.
   * Some long-lived API keys can call GenerateAssistantResponse but are explicitly
   * denied on ListAvailableProfiles, so callers must treat an AccessDenied profile
   * lookup as an optional discovery failure rather than a hard auth failure.
   */
  async listAvailableProfiles(accessToken: string, region: string = "us-east-1") {
    assertValidAwsRegion(region);
    const endpoint =
      region === "us-east-1"
        ? "https://codewhisperer.us-east-1.amazonaws.com"
        : `https://q.${region}.amazonaws.com`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-amz-json-1.0",
        "x-amz-target": "AmazonCodeWhispererService.ListAvailableProfiles",
        Accept: "application/json",
        tokentype: "API_KEY",
      },
      body: JSON.stringify({ maxResults: 10 }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to list profiles: ${error}`);
    }

    const data = await response.json();
    const profiles = Array.isArray(data?.profiles) ? data.profiles : [];
    const arnOf = (profile: any) => profile?.arn || profile?.profileArn || null;
    const match =
      profiles.find((profile: any) => String(arnOf(profile) || "").includes(`:${region}:`)) ||
      profiles[0];
    return arnOf(match);
  }

  /**
   * Normalize a long-lived Kiro/CodeWhisperer API key.
   */
  async validateApiKey(apiKey: string, regionInput?: string) {
    // Default kept OUT of the parameter list: check-public-creds' CRED_KEY_RE matches the
    // `apiKey:` annotation and flags any string literal in the signature (fn-param FP class).
    const region = regionInput || "us-east-1";
    assertValidAwsRegion(region);
    const accessToken = apiKey.trim();
    if (!accessToken) {
      throw new Error("API key is required");
    }

    let profileArn: string | null = null;
    try {
      profileArn = await this.listAvailableProfiles(accessToken, region);
    } catch (error: any) {
      const message = String(error?.message || error || "");
      const isApiKeyProfileDenied =
        message.includes("AccessDeniedException") &&
        message.includes("API key authentication is not supported for this operation");
      if (!isApiKeyProfileDenied) {
        throw error;
      }
    }

    return {
      accessToken,
      refreshToken: null,
      profileArn,
      region,
      authMethod: "api_key",
    };
  }

  /**
   * Fetch user email from access token (optional, for display)
   */
  extractEmailFromJWT(accessToken: string) {
    try {
      const parts = accessToken.split(".");
      if (parts.length !== 3) return null;

      // Decode payload (add padding if needed)
      let payload = parts[1];
      while (payload.length % 4) {
        payload += "=";
      }

      const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
      return decoded.email || decoded.preferred_username || decoded.sub;
    } catch {
      return null;
    }
  }
}
