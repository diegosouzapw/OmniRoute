import { ANTIGRAVITY_CONFIG } from "../constants/oauth";
import {
  antigravityNativeOAuthUserAgent,
  getAntigravityHeaders,
  getAntigravityLoadCodeAssistMetadata,
} from "@omniroute/open-sse/services/antigravityHeaders.ts";

async function fetchFirstOk(endpoints: string[], init: RequestInit) {
  let lastError: unknown = null;
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, init);
      if (response.ok) return response;
      lastError = new Error(`${response.status} ${await response.text()}`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("No Antigravity endpoints configured");
}

export const antigravity = {
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
    const bodyParams: Record<string, string> = {
      grant_type: "authorization_code",
      client_id: config.clientId,
      code: code,
      redirect_uri: redirectUri,
    };

    if (config.clientSecret) {
      bodyParams.client_secret = config.clientSecret;
    }

    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        "User-Agent": antigravityNativeOAuthUserAgent(),
      },
      body: new URLSearchParams(bodyParams),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return await response.json();
  },
  postExchange: async (tokens) => {
    const headers = getAntigravityHeaders("loadCodeAssist", tokens.access_token);
    const metadata = getAntigravityLoadCodeAssistMetadata();

    const userInfoRes = await fetch(`${ANTIGRAVITY_CONFIG.userInfoUrl}?alt=json`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const userInfo = userInfoRes.ok ? await userInfoRes.json() : {};

    let projectId = "";
    let tierId = "legacy-tier";
    try {
      const loadRes = await fetchFirstOk(ANTIGRAVITY_CONFIG.loadCodeAssistEndpoints, {
        method: "POST",
        headers,
        body: JSON.stringify({ metadata }),
      });
      const data = await loadRes.json();
      projectId = data.cloudaicompanionProject?.id || data.cloudaicompanionProject || "";
      if (Array.isArray(data.allowedTiers)) {
        for (const tier of data.allowedTiers) {
          if (tier.isDefault && tier.id) {
            tierId = tier.id.trim();
            break;
          }
        }
      }
    } catch (e) {
      console.log("Failed to load code assist:", e);
    }

    if (projectId) {
      try {
        for (let i = 0; i < 10; i++) {
          const onboardRes = await fetchFirstOk(ANTIGRAVITY_CONFIG.onboardUserEndpoints, {
            method: "POST",
            headers,
            body: JSON.stringify({ tier_id: tierId, metadata }),
          });
          const result = await onboardRes.json();
          if (result.done === true) {
            if (result.response?.cloudaicompanionProject) {
              const respProject = result.response.cloudaicompanionProject;
              projectId =
                typeof respProject === "string" ? respProject.trim() : respProject.id || projectId;
            }
            break;
          }
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
};
