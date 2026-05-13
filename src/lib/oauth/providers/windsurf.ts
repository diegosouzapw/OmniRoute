import { WINDSURF_CONFIG } from "../constants/oauth";

/**
 * Windsurf / Devin CLI OAuth Provider
 *
 * Uses PKCE Authorization Code Flow — same pattern as Codex CLI.
 * Extracted from Devin CLI binary (devin.exe string analysis):
 *
 *   1. OmniRoute starts a local callback server (random port, 127.0.0.1)
 *   2. Browser opens:
 *        https://app.devin.ai/editor/signin
 *          ?response_type=code
 *          &redirect_uri=http://127.0.0.1:PORT/auth/callback
 *          &code_challenge=<S256_CHALLENGE>
 *          &code_challenge_method=S256
 *   3. User logs in (Google / GitHub / Windsurf Enterprise)
 *   4. Browser redirects back to callback server with `code`
 *   5. Exchange code via Windsurf Connect JSON:
 *        POST https://server.codeium.com/exa.seat_management_pb.SeatManagementService/ExchangePKCEAuthorizationCode
 *        { "code": "...", "codeVerifier": "...", "redirectUri": "..." }
 *   6. Response: { "windsurfApiKey": "...", "apiServerUrl": "...", ... }
 *   7. `windsurfApiKey` stored as `accessToken` (= WINDSURF_API_KEY)
 *
 * Fallback (import_token): user visits windsurf.com/show-auth-token,
 * copies their API key, and pastes it into the connection form.
 */
export const windsurf = {
  config: WINDSURF_CONFIG,
  flowType: "authorization_code_pkce",
  // Fixed callback path expected by Devin CLI auth flow
  callbackPath: WINDSURF_CONFIG.callbackPath,
  // Port 0 = OS assigns a free port (we use the globalThis devin callback state)
  callbackPort: WINDSURF_CONFIG.callbackPort,

  buildAuthUrl: (
    config: typeof WINDSURF_CONFIG,
    redirectUri: string,
    state: string,
    codeChallenge: string
  ) => {
    const params = new URLSearchParams({
      response_type: "code",
      redirect_uri: redirectUri,
      code_challenge: codeChallenge,
      code_challenge_method: config.codeChallengeMethod,
      state,
    });
    return `${config.authorizeUrl}?${params.toString()}`;
  },

  /**
   * Exchange authorization code for Windsurf API key.
   * Uses the Windsurf Connect JSON protocol (not standard OAuth token endpoint).
   */
  exchangeToken: async (
    config: typeof WINDSURF_CONFIG,
    code: string,
    redirectUri: string,
    codeVerifier: string
  ) => {
    const url = `${config.apiServerUrl}${config.exchangePath}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Connect protocol version header
        "Connect-Protocol-Version": "1",
      },
      body: JSON.stringify({
        code,
        codeVerifier,
        redirectUri,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Windsurf token exchange failed (${response.status}): ${error}`);
    }

    const data = await response.json();
    return data;
  },

  /**
   * Map exchange response to OmniRoute connection fields.
   * The Windsurf Connect response uses camelCase JSON:
   *   windsurfApiKey, apiServerUrl, devinWebappHost, devinApiUrl
   */
  mapTokens: (tokens: {
    windsurfApiKey?: string;
    apiServerUrl?: string;
    devinWebappHost?: string;
    devinApiUrl?: string;
    // Fallback import-token fields
    accessToken?: string;
    apiKey?: string;
    refreshToken?: string;
    expiresIn?: number;
    email?: string;
    authMethod?: string;
  }) => {
    // PKCE flow: token is in windsurfApiKey
    const token = tokens.windsurfApiKey || tokens.accessToken || tokens.apiKey || "";

    return {
      accessToken: token,
      // Windsurf API keys are long-lived — no refresh token needed
      refreshToken: tokens.refreshToken || null,
      expiresIn: tokens.expiresIn || 0,
      email: tokens.email || null,
      providerSpecificData: {
        authMethod: tokens.authMethod || (tokens.windsurfApiKey ? "browser" : "import"),
        apiServerUrl: tokens.apiServerUrl || null,
        devinWebappHost: tokens.devinWebappHost || null,
        devinApiUrl: tokens.devinApiUrl || null,
      },
    };
  },
};
