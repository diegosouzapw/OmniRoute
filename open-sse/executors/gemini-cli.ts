import { BaseExecutor } from "./base.ts";
import { PROVIDERS, OAUTH_ENDPOINTS } from "../config/constants.ts";

export class GeminiCLIExecutor extends BaseExecutor {
  private _currentModel: string = "";

  constructor() {
    super("gemini-cli", PROVIDERS["gemini-cli"]);
  }

  buildUrl(model, stream, urlIndex = 0) {
    const action = stream ? "streamGenerateContent?alt=sse" : "generateContent";
    return `${this.config.baseUrl}:${action}`;
  }

  buildHeaders(credentials, stream = true) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credentials.accessToken}`,
      // Fingerprint headers matching native GeminiCLI client (prevents upstream rejection)
      "User-Agent": `GeminiCLI/0.31.0/${this._currentModel || "unknown"} (linux; x64)`,
      "X-Goog-Api-Client": "google-genai-sdk/1.41.0 gl-node/v24.0.0",
      ...(stream && { Accept: "text/event-stream" }),
      ...(credentials?.projectId && { "x-goog-user-project": credentials.projectId }),
    };
  }

  transformRequest(model, body, stream, credentials) {
    // Capture model so buildHeaders (called after transformRequest) can include it in User-Agent
    this._currentModel = model || "";

    const allowBodyProjectOverride = process.env.OMNIROUTE_ALLOW_BODY_PROJECT_OVERRIDE === "1";

    // Default: prefer OAuth-stored projectId. Incoming body.project can be stale
    // when clients cache older Cloud Code project values.
    // Opt-in escape hatch: set OMNIROUTE_ALLOW_BODY_PROJECT_OVERRIDE=1.
    if (allowBodyProjectOverride && body?.project) {
      return body;
    }

    if (credentials?.projectId) {
      body.project = credentials.projectId;
    }
    return body;
  }

  async refreshCredentials(credentials, log) {
    if (!credentials.refreshToken) return null;

    try {
      const response = await fetch(OAUTH_ENDPOINTS.google.token, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: credentials.refreshToken,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        }),
      });

      if (!response.ok) return null;

      const tokens = await response.json();
      log?.info?.("TOKEN", "Gemini CLI refreshed");

      return {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || credentials.refreshToken,
        expiresIn: tokens.expires_in,
        projectId: credentials.projectId,
      };
    } catch (error) {
      log?.error?.("TOKEN", `Gemini CLI refresh error: ${error.message}`);
      return null;
    }
  }
}

export default GeminiCLIExecutor;
