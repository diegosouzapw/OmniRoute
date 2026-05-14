import { BaseExecutor, ExecuteInput, type ProviderCredentials } from "./base.ts";
import { PROVIDERS, OAUTH_ENDPOINTS } from "../config/constants.ts";
import { getModelTargetFormat } from "../config/providerModels.ts";

export class NousPortalExecutor extends BaseExecutor {
  constructor() {
    super("nous-portal", PROVIDERS["nous-portal"] as any);
  }

  buildUrl(model: string, _stream: boolean, _urlIndex = 0) {
    const targetFormat = getModelTargetFormat("nous-portal", model);
    if (targetFormat === "openai-responses") {
      return (
        this.config.responsesBaseUrl ||
        this.config.baseUrl?.replace(/\/chat\/completions\/?$/, "/responses") ||
        "https://inference-api.nousresearch.com/v1/responses"
      );
    }
    return (
      this.config.baseUrl ||
      (this.credentials as any)?.providerSpecificData?.inferenceBaseUrl ||
      "https://inference-api.nousresearch.com/v1/chat/completions"
    );
  }

  transformRequest(model: string, body: any, stream: boolean, credentials: any): any {
    void stream;

    const sourceBody = body && typeof body === "object" ? body : {};
    const modifiedBody = { ...sourceBody };

    return modifiedBody;
  }

  buildHeaders(
    credentials: ProviderCredentials,
    stream = true,
    clientHeaders?: Record<string, string> | null
  ): Record<string, string> {
    const token =
      credentials?.accessToken || credentials?.providerSpecificData?.portalAccessToken || "";

    return {
      ...(clientHeaders || {}),
      Authorization: `Bearer ${token}`,
      "x-request-id":
        crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };
  }

  async refreshCredentials(credentials: any, log: any) {
    // Nous Portal doesn't support simple token refresh through this path.
    // The agent key is short-lived and must be re-minted via the portal OAuth flow.
    // Return null to signal that re-authentication is needed.
    log?.warn?.("TOKEN", "Nous Portal agent key expired — re-authentication required");
    return null;
  }

  needsRefresh(credentials: any) {
    if (!credentials?.accessToken) return true;
    // Agent keys are short-lived (default 1800s). Refresh proactively.
    const expiresAt = credentials?.providerSpecificData?.portalAccessTokenExpires;
    if (expiresAt) {
      if (typeof expiresAt === "number" && expiresAt - Date.now() < 5 * 60 * 1000) return true;
    }
    return false;
  }
}
