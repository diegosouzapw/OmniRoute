import { GEMINI_CONFIG } from "../constants/oauth";

export const gemini = {
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
    const bodyParams: Record<string, string> = {
      grant_type: "authorization_code",
      client_id: config.clientId,
      code: code,
      redirect_uri: redirectUri,
    };

    if (config.clientSecret) {
      bodyParams.client_secret = config.clientSecret;
    } else {
      // (#537) Google's OAuth2 token endpoint always requires client_secret for
      // non-PKCE flows. Without it we get a cryptic "client_secret is missing" error.
      const envName = "GEMINI_CLI_OAUTH_CLIENT_SECRET or GEMINI_OAUTH_CLIENT_SECRET";

      throw new Error(
        `Gemini OAuth requires ${envName} to be set.\n` +
          `In Docker: add '${envName}=<your-secret>' to your docker-compose.yml env.\n` +
          "In npm: add it to ~/.omniroute/.env\n" +
          "Obtain the client secret from https://console.cloud.google.com/apis/credentials\n" +
          "for the same OAuth 2.0 Client ID configured as GEMINI_CLI_OAUTH_CLIENT_ID or GEMINI_OAUTH_CLIENT_ID."
      );
    }

    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
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
    const userInfoRes = await fetch(`${GEMINI_CONFIG.userInfoUrl}?alt=json`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const userInfo = userInfoRes.ok ? await userInfoRes.json() : {};

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
};
