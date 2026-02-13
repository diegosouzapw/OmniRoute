/**
 * OAuth Provider Configurations and Handlers
 * Centralized DRY approach for all OAuth providers
 */

import { generatePKCE, generateState } from "./utils/pkce";
import {
  CLAUDE_CONFIG,
  CODEX_CONFIG,
  GEMINI_CONFIG,
  QWEN_CONFIG,
  IFLOW_CONFIG,
  KIMI_CODING_CONFIG,
  ANTIGRAVITY_CONFIG,
  GITHUB_CONFIG,
  KIRO_CONFIG,
  CURSOR_CONFIG,
  KILOCODE_CONFIG,
  CLINE_CONFIG,
} from "./constants/oauth";

// Provider configurations
const PROVIDERS = {
  claude: {
    config: CLAUDE_CONFIG,
    flowType: "authorization_code_pkce",
    buildAuthUrl: (config, redirectUri, state, codeChallenge) => {
      const params = new URLSearchParams({
        code: "true",
        client_id: config.clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        scope: config.scopes.join(" "),
        code_challenge: codeChallenge,
        code_challenge_method: config.codeChallengeMethod,
        state: state,
      });
      return `${config.authorizeUrl}?${params.toString()}`;
    },
    exchangeToken: async (config, code, redirectUri, codeVerifier, state) => {
      // Parse code - may contain state after #
      let authCode = code;
      let codeState = "";
      if (authCode.includes("#")) {
        const parts = authCode.split("#");
        authCode = parts[0];
        codeState = parts[1] || "";
      }

      const response = await fetch(config.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          code: authCode,
          state: codeState || state,
          grant_type: "authorization_code",
          client_id: config.clientId,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Token exchange failed: ${error}`);
      }

      return await response.json();
    },
    mapTokens: (tokens) => ({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
      scope: tokens.scope,
    }),
  },

  codex: {
    config: CODEX_CONFIG,
    flowType: "authorization_code_pkce",
    fixedPort: 1455,
    callbackPath: "/auth/callback",
    buildAuthUrl: (config, redirectUri, state, codeChallenge) => {
      const params = {
        response_type: "code",
        client_id: config.clientId,
        redirect_uri: redirectUri,
        scope: config.scope,
        code_challenge: codeChallenge,
        code_challenge_method: config.codeChallengeMethod,
        ...config.extraParams,
        state: state,
      };
      const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      return `${config.authorizeUrl}?${queryString}`;
    },
    exchangeToken: async (config, code, redirectUri, codeVerifier) => {
      const response = await fetch(config.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: config.clientId,
          code: code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Token exchange failed: ${error}`);
      }

      return await response.json();
    },
    mapTokens: (tokens) => ({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      idToken: tokens.id_token,
      expiresIn: tokens.expires_in,
    }),
  },

  "gemini-cli": {
    config: GEMINI_CONFIG,
    flowType: "authorization_code",
    buildAuthUrl: (config, redirectUri, state) => {
      const params = new URLSearchParams({
        client_id: config.clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        scope: config.scopes.join(" "),
        state: state,
        access_type: "offline",
        prompt: "consent",
      });
      return `${config.authorizeUrl}?${params.toString()}`;
    },
    exchangeToken: async (config, code, redirectUri) => {
      const response = await fetch(config.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: config.clientId,
          client_secret: config.clientSecret,
          code: code,
          redirect_uri: redirectUri,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Token exchange failed: ${error}`);
      }

      return await response.json();
    },
    postExchange: async (tokens) => {
      // Fetch user info
      const userInfoRes = await fetch(`${GEMINI_CONFIG.userInfoUrl}?alt=json`, {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      const userInfo = userInfoRes.ok ? await userInfoRes.json() : {};

      // Fetch project ID
      let projectId = "";
      try {
        const projectRes = await fetch(
          "https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              metadata: {
                ideType: "IDE_UNSPECIFIED",
                platform: "PLATFORM_UNSPECIFIED",
                pluginType: "GEMINI",
              },
            }),
          }
        );
        if (projectRes.ok) {
          const data = await projectRes.json();
          projectId = data.cloudaicompanionProject?.id || data.cloudaicompanionProject || "";
        }
      } catch (e) {
        console.log("Failed to fetch project ID:", e);
      }

      return { userInfo, projectId };
    },
    mapTokens: (tokens, extra) => ({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
      scope: tokens.scope,
      email: extra?.userInfo?.email,
      projectId: extra?.projectId,
    }),
  },

  antigravity: {
    config: ANTIGRAVITY_CONFIG,
    flowType: "authorization_code",
    buildAuthUrl: (config, redirectUri, state) => {
      const params = new URLSearchParams({
        client_id: config.clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        scope: config.scopes.join(" "),
        state: state,
        access_type: "offline",
        prompt: "consent",
      });
      return `${config.authorizeUrl}?${params.toString()}`;
    },
    exchangeToken: async (config, code, redirectUri) => {
      const response = await fetch(config.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: config.clientId,
          client_secret: config.clientSecret,
          code: code,
          redirect_uri: redirectUri,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Token exchange failed: ${error}`);
      }

      return await response.json();
    },
    postExchange: async (tokens) => {
      const headers = {
        Authorization: `Bearer ${tokens.access_token}`,
        "Content-Type": "application/json",
        "User-Agent": ANTIGRAVITY_CONFIG.loadCodeAssistUserAgent,
        "X-Goog-Api-Client": ANTIGRAVITY_CONFIG.loadCodeAssistApiClient,
        "Client-Metadata": ANTIGRAVITY_CONFIG.loadCodeAssistClientMetadata,
      };
      const metadata = {
        ideType: "IDE_UNSPECIFIED",
        platform: "PLATFORM_UNSPECIFIED",
        pluginType: "GEMINI",
      };

      // Fetch user info
      const userInfoRes = await fetch(`${ANTIGRAVITY_CONFIG.userInfoUrl}?alt=json`, {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      const userInfo = userInfoRes.ok ? await userInfoRes.json() : {};

      // Load Code Assist to get project ID and tier
      let projectId = "";
      let tierId = "legacy-tier";
      try {
        const loadRes = await fetch(ANTIGRAVITY_CONFIG.loadCodeAssistEndpoint, {
          method: "POST",
          headers,
          body: JSON.stringify({ metadata }),
        });
        if (loadRes.ok) {
          const data = await loadRes.json();
          projectId = data.cloudaicompanionProject?.id || data.cloudaicompanionProject || "";
          // Extract tier ID
          if (Array.isArray(data.allowedTiers)) {
            for (const tier of data.allowedTiers) {
              if (tier.isDefault && tier.id) {
                tierId = tier.id.trim();
                break;
              }
            }
          }
        }
      } catch (e) {
        console.log("Failed to load code assist:", e);
      }

      // Onboard user to enable Gemini Code Assist
      if (projectId) {
        try {
          for (let i = 0; i < 10; i++) {
            const onboardRes = await fetch(ANTIGRAVITY_CONFIG.onboardUserEndpoint, {
              method: "POST",
              headers,
              body: JSON.stringify({ tierId, metadata, cloudaicompanionProject: projectId }),
            });
            if (onboardRes.ok) {
              const result = await onboardRes.json();
              if (result.done === true) {
                // Extract final project ID from response
                if (result.response?.cloudaicompanionProject) {
                  const respProject = result.response.cloudaicompanionProject;
                  projectId =
                    typeof respProject === "string"
                      ? respProject.trim()
                      : respProject.id || projectId;
                }
                break;
              }
            }
            // Wait 5 seconds before retry
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } catch (e) {
          console.log("Failed to onboard user:", e);
        }
      }

      return { userInfo, projectId };
    },
    mapTokens: (tokens, extra) => ({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
      scope: tokens.scope,
      email: extra?.userInfo?.email,
      projectId: extra?.projectId,
    }),
  },

  iflow: {
    config: IFLOW_CONFIG,
    flowType: "authorization_code",
    buildAuthUrl: (config, redirectUri, state) => {
      const params = new URLSearchParams({
        loginMethod: config.extraParams.loginMethod,
        type: config.extraParams.type,
        redirect: redirectUri,
        state: state,
        client_id: config.clientId,
      });
      return `${config.authorizeUrl}?${params.toString()}`;
    },
    exchangeToken: async (config, code, redirectUri) => {
      // Create Basic Auth header
      const basicAuth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");

      const response = await fetch(config.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Basic ${basicAuth}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
          client_id: config.clientId,
          client_secret: config.clientSecret,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Token exchange failed: ${error}`);
      }

      return await response.json();
    },
    postExchange: async (tokens) => {
      // Fetch user info
      const userInfoRes = await fetch(
        `${IFLOW_CONFIG.userInfoUrl}?accessToken=${encodeURIComponent(tokens.access_token)}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const result = userInfoRes.ok ? await userInfoRes.json() : {};
      const userInfo = result.success ? result.data : {};
      return { userInfo };
    },
    mapTokens: (tokens, extra) => ({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
      apiKey: extra?.userInfo?.apiKey,
      email: extra?.userInfo?.email || extra?.userInfo?.phone,
      displayName: extra?.userInfo?.nickname || extra?.userInfo?.name,
    }),
  },

  qwen: {
    config: QWEN_CONFIG,
    flowType: "device_code",
    requestDeviceCode: async (config, codeChallenge) => {
      const response = await fetch(config.deviceCodeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          client_id: config.clientId,
          scope: config.scope,
          code_challenge: codeChallenge,
          code_challenge_method: config.codeChallengeMethod,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Device code request failed: ${error}`);
      }

      return await response.json();
    },
    pollToken: async (config, deviceCode, codeVerifier) => {
      const response = await fetch(config.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:device_code",
          client_id: config.clientId,
          device_code: deviceCode,
          code_verifier: codeVerifier,
        }),
      });

      return {
        ok: response.ok,
        data: await response.json(),
      };
    },
    mapTokens: (tokens) => ({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
      providerSpecificData: { resourceUrl: tokens.resource_url },
    }),
  },

  "kimi-coding": {
    config: KIMI_CODING_CONFIG,
    flowType: "device_code",
    requestDeviceCode: async (config) => {
      const response = await fetch(config.deviceCodeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          client_id: config.clientId,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Device code request failed: ${error}`);
      }

      const data = await response.json();
      return {
        device_code: data.device_code,
        user_code: data.user_code,
        verification_uri: data.verification_uri || `https://www.kimi.com/code/authorize_device`,
        verification_uri_complete:
          data.verification_uri_complete ||
          `https://www.kimi.com/code/authorize_device?user_code=${data.user_code}`,
        expires_in: data.expires_in,
        interval: data.interval || 5,
      };
    },
    pollToken: async (config, deviceCode) => {
      const response = await fetch(config.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:device_code",
          client_id: config.clientId,
          device_code: deviceCode,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        const text = await response.text();
        data = { error: "invalid_response", error_description: text };
      }

      return {
        ok: response.ok,
        data: data,
      };
    },
    mapTokens: (tokens) => ({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
    }),
  },

  github: {
    config: GITHUB_CONFIG,
    flowType: "device_code",
    requestDeviceCode: async (config) => {
      const response = await fetch(config.deviceCodeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          client_id: config.clientId,
          scope: config.scopes,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Device code request failed: ${error}`);
      }

      return await response.json();
    },
    pollToken: async (config, deviceCode) => {
      const response = await fetch(config.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          client_id: config.clientId,
          device_code: deviceCode,
          grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        }),
      });

      // Handle response properly - if not ok, try to get error as text first
      let data;
      try {
        data = await response.json();
      } catch (e) {
        // If response is not JSON, get as text
        const text = await response.text();
        data = { error: "invalid_response", error_description: text };
      }

      return {
        ok: response.ok,
        data: data,
      };
    },
    postExchange: async (tokens) => {
      // Get Copilot token using GitHub access token
      const copilotRes = await fetch(GITHUB_CONFIG.copilotTokenUrl, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          Accept: "application/json",
          "X-GitHub-Api-Version": GITHUB_CONFIG.apiVersion,
          "User-Agent": GITHUB_CONFIG.userAgent,
        },
      });
      const copilotToken = copilotRes.ok ? await copilotRes.json() : {};

      // Get user info from GitHub
      const userRes = await fetch(GITHUB_CONFIG.userInfoUrl, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          Accept: "application/json",
          "X-GitHub-Api-Version": GITHUB_CONFIG.apiVersion,
          "User-Agent": GITHUB_CONFIG.userAgent,
        },
      });
      const userInfo = userRes.ok ? await userRes.json() : {};

      return { copilotToken, userInfo };
    },
    mapTokens: (tokens, extra) => ({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
      providerSpecificData: {
        copilotToken: extra?.copilotToken?.token,
        copilotTokenExpiresAt: extra?.copilotToken?.expires_at,
        githubUserId: extra?.userInfo?.id,
        githubLogin: extra?.userInfo?.login,
        githubName: extra?.userInfo?.name,
        githubEmail: extra?.userInfo?.email,
      },
    }),
  },

  kiro: {
    config: KIRO_CONFIG,
    flowType: "device_code",
    // Kiro uses AWS SSO OIDC - requires client registration first
    requestDeviceCode: async (config) => {
      // Step 1: Register client with AWS SSO OIDC
      const registerRes = await fetch(config.registerClientUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          clientName: config.clientName,
          clientType: config.clientType,
          scopes: config.scopes,
          grantTypes: config.grantTypes,
          issuerUrl: config.issuerUrl,
        }),
      });

      if (!registerRes.ok) {
        const error = await registerRes.text();
        throw new Error(`Client registration failed: ${error}`);
      }

      const clientInfo = await registerRes.json();

      // Step 2: Request device authorization
      const deviceRes = await fetch(config.deviceAuthUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          clientId: clientInfo.clientId,
          clientSecret: clientInfo.clientSecret,
          startUrl: config.startUrl,
        }),
      });

      if (!deviceRes.ok) {
        const error = await deviceRes.text();
        throw new Error(`Device authorization failed: ${error}`);
      }

      const deviceData = await deviceRes.json();

      // Return combined data for polling
      return {
        device_code: deviceData.deviceCode,
        user_code: deviceData.userCode,
        verification_uri: deviceData.verificationUri,
        verification_uri_complete: deviceData.verificationUriComplete,
        expires_in: deviceData.expiresIn,
        interval: deviceData.interval || 5,
        // Store client credentials for token exchange
        _clientId: clientInfo.clientId,
        _clientSecret: clientInfo.clientSecret,
      };
    },
    pollToken: async (config, deviceCode, codeVerifier, extraData) => {
      const response = await fetch(config.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          clientId: extraData?._clientId,
          clientSecret: extraData?._clientSecret,
          deviceCode: deviceCode,
          grantType: "urn:ietf:params:oauth:grant-type:device_code",
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        const text = await response.text();
        data = { error: "invalid_response", error_description: text };
      }

      // AWS SSO OIDC returns camelCase
      if (data.accessToken) {
        return {
          ok: true,
          data: {
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
            expires_in: data.expiresIn,
            // Store client credentials for refresh
            _clientId: extraData?._clientId,
            _clientSecret: extraData?._clientSecret,
          },
        };
      }

      return {
        ok: false,
        data: {
          error: data.error || "authorization_pending",
          error_description: data.error_description || data.message,
        },
      };
    },
    mapTokens: (tokens) => ({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
      providerSpecificData: {
        clientId: tokens._clientId,
        clientSecret: tokens._clientSecret,
      },
    }),
  },

  cursor: {
    config: CURSOR_CONFIG,
    flowType: "import_token",
    // Cursor uses import token flow - tokens are extracted from local SQLite database
    // No OAuth flow needed, handled by /api/oauth/cursor/import route
    mapTokens: (tokens) => ({
      accessToken: tokens.accessToken,
      refreshToken: null, // Cursor doesn't have public refresh endpoint
      expiresIn: tokens.expiresIn || 86400,
      providerSpecificData: {
        machineId: tokens.machineId,
        authMethod: "imported",
      },
    }),
  },

  kilocode: {
    config: KILOCODE_CONFIG,
    flowType: "device_code",
    requestDeviceCode: async (config) => {
      // KiloCode uses a custom device auth flow (not standard OAuth)
      const response = await fetch(config.initiateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many pending authorization requests. Please try again later.");
        }
        const error = await response.text();
        throw new Error(`Device auth initiation failed: ${error}`);
      }

      const data = await response.json();
      // Map KiloCode response to standard device code format
      return {
        device_code: data.code, // Use code as device_code for polling
        user_code: data.code,
        verification_uri: data.verificationUrl,
        verification_uri_complete: data.verificationUrl,
        expires_in: data.expiresIn || 300,
        interval: 3,
      };
    },
    pollToken: async (config, deviceCode) => {
      // KiloCode polls by GET /api/device-auth/codes/{code}
      const response = await fetch(`${config.pollUrlBase}/${deviceCode}`);

      // Handle custom status codes
      if (response.status === 202) {
        // Still pending
        return { ok: false, data: { error: "authorization_pending" } };
      }
      if (response.status === 403) {
        return {
          ok: false,
          data: { error: "access_denied", error_description: "Authorization denied by user" },
        };
      }
      if (response.status === 410) {
        return {
          ok: false,
          data: { error: "expired_token", error_description: "Authorization code expired" },
        };
      }

      if (!response.ok) {
        return {
          ok: false,
          data: { error: "poll_failed", error_description: `Poll failed: ${response.status}` },
        };
      }

      // Success - map KiloCode {token, userEmail} to standard format
      const data = await response.json();
      if (data.status === "approved" && data.token) {
        return {
          ok: true,
          data: {
            access_token: data.token,
            _userEmail: data.userEmail,
          },
        };
      }

      return { ok: false, data: { error: "authorization_pending" } };
    },
    mapTokens: (tokens) => ({
      accessToken: tokens.access_token,
      refreshToken: null, // KiloCode JWT doesn't have refresh tokens
      expiresIn: null, // JWT expiry is embedded in the token
      email: tokens._userEmail,
    }),
  },

  cline: {
    config: CLINE_CONFIG,
    flowType: "authorization_code",
    buildAuthUrl: (config, redirectUri) => {
      const params = new URLSearchParams({
        client_type: "extension",
        callback_url: redirectUri,
        redirect_uri: redirectUri,
      });
      return `${config.authorizeUrl}?${params.toString()}`;
    },
    exchangeToken: async (config, code, redirectUri) => {
      // Cline callback returns base64-encoded JSON with tokens directly in the code param
      // The code may have a signature suffix after the JSON - strip it
      try {
        // Add padding if needed
        let base64 = code;
        const padding = 4 - (base64.length % 4);
        if (padding !== 4) {
          base64 += "=".repeat(padding);
        }
        const decoded = Buffer.from(base64, "base64").toString("utf-8");
        // Find the JSON boundary (ends with })
        const lastBrace = decoded.lastIndexOf("}");
        if (lastBrace === -1) {
          throw new Error("No JSON found in decoded code");
        }
        const jsonStr = decoded.substring(0, lastBrace + 1);
        const tokenData = JSON.parse(jsonStr);
        return {
          access_token: tokenData.accessToken,
          refresh_token: tokenData.refreshToken,
          email: tokenData.email,
          firstName: tokenData.firstName,
          lastName: tokenData.lastName,
          expires_at: tokenData.expiresAt,
        };
      } catch (e) {
        // Fallback: try token exchange via API
        const response = await fetch(config.tokenExchangeUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            grant_type: "authorization_code",
            code: code,
            client_type: "extension",
            redirect_uri: redirectUri,
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Cline token exchange failed: ${error}`);
        }

        const data = await response.json();
        return {
          access_token: data.data?.accessToken || data.accessToken,
          refresh_token: data.data?.refreshToken || data.refreshToken,
          email: data.data?.userInfo?.email || "",
          expires_at: data.data?.expiresAt || data.expiresAt,
        };
      }
    },
    mapTokens: (tokens) => ({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_at
        ? Math.floor((new Date(tokens.expires_at).getTime() - Date.now()) / 1000)
        : 3600,
      email: tokens.email,
      providerSpecificData: {
        firstName: tokens.firstName,
        lastName: tokens.lastName,
      },
    }),
  },
};

/**
 * Get provider handler
 */
export function getProvider(name) {
  const provider = PROVIDERS[name];
  if (!provider) {
    throw new Error(`Unknown provider: ${name}`);
  }
  return provider;
}

/**
 * Get all provider names
 */
export function getProviderNames() {
  return Object.keys(PROVIDERS);
}

/**
 * Generate auth data for a provider
 */
export function generateAuthData(providerName, redirectUri) {
  const provider = getProvider(providerName);
  const { codeVerifier, codeChallenge, state } = generatePKCE();

  let authUrl;
  if (provider.flowType === "device_code") {
    // Device code flow doesn't have auth URL upfront
    authUrl = null;
  } else if (provider.flowType === "authorization_code_pkce") {
    authUrl = provider.buildAuthUrl(provider.config, redirectUri, state, codeChallenge);
  } else {
    authUrl = provider.buildAuthUrl(provider.config, redirectUri, state);
  }

  return {
    authUrl,
    state,
    codeVerifier,
    codeChallenge,
    redirectUri,
    flowType: provider.flowType,
    fixedPort: provider.fixedPort,
    callbackPath: provider.callbackPath || "/callback",
  };
}

/**
 * Exchange code for tokens
 */
export async function exchangeTokens(providerName, code, redirectUri, codeVerifier, state) {
  const provider = getProvider(providerName);

  const tokens = await provider.exchangeToken(
    provider.config,
    code,
    redirectUri,
    codeVerifier,
    state
  );

  let extra = null;
  if (provider.postExchange) {
    extra = await provider.postExchange(tokens);
  }

  return provider.mapTokens(tokens, extra);
}

/**
 * Request device code (for device_code flow)
 */
export async function requestDeviceCode(providerName, codeChallenge) {
  const provider = getProvider(providerName);
  if (provider.flowType !== "device_code") {
    throw new Error(`Provider ${providerName} does not support device code flow`);
  }
  return await provider.requestDeviceCode(provider.config, codeChallenge);
}

/**
 * Poll for token (for device_code flow)
 * @param {string} providerName - Provider name
 * @param {string} deviceCode - Device code from requestDeviceCode
 * @param {string} codeVerifier - PKCE code verifier (optional for some providers)
 * @param {object} extraData - Extra data from device code response (e.g. clientId/clientSecret for Kiro)
 */
export async function pollForToken(providerName, deviceCode, codeVerifier, extraData) {
  const provider = getProvider(providerName);
  if (provider.flowType !== "device_code") {
    throw new Error(`Provider ${providerName} does not support device code flow`);
  }

  const result = await provider.pollToken(provider.config, deviceCode, codeVerifier, extraData);

  if (result.ok) {
    // For device code flows, success is only when we have an access token
    if (result.data.access_token) {
      // Call postExchange to get additional data (copilotToken, userInfo, etc.)
      let extra = null;
      if (provider.postExchange) {
        extra = await provider.postExchange(result.data);
      }
      return { success: true, tokens: provider.mapTokens(result.data, extra) };
    } else {
      // Check if it's still pending authorization
      if (result.data.error === "authorization_pending" || result.data.error === "slow_down") {
        // This is not a failure, just still waiting
        return {
          success: false,
          error: result.data.error,
          errorDescription: result.data.error_description || result.data.message,
          pending: result.data.error === "authorization_pending",
        };
      } else {
        // Actual error
        return {
          success: false,
          error: result.data.error || "no_access_token",
          errorDescription:
            result.data.error_description || result.data.message || "No access token received",
        };
      }
    }
  }

  return {
    success: false,
    error: result.data.error,
    errorDescription: result.data.error_description,
  };
}
