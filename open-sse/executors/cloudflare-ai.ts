import { BaseExecutor } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";

/**
 * CloudflareAIExecutor — handles dynamic URL construction with accountId.
 * Cloudflare Workers AI uses the authenticated user's account ID in the URL.
 *
 * URL pattern: https://api.cloudflare.com/client/v4/accounts/{accountId}/ai/v1/chat/completions
 * Auth: Bearer <API Token>
 * Docs: https://developers.cloudflare.com/workers-ai/
 *
 * Free tier: 10,000 Neurons/day = ~150 LLM responses or 500s Whisper audio
 * API Token: dash.cloudflare.com/profile/api-tokens
 * Account ID: right sidebar of dash.cloudflare.com
 */
export class CloudflareAIExecutor extends BaseExecutor {
  constructor() {
    super("cloudflare-ai", PROVIDERS["cloudflare-ai"] || { format: "openai" });
  }

  buildUrl(_model: string, _stream: boolean, _urlIndex = 0, credentials: any = null): string {
    // Account ID can be stored in providerSpecificData or at top level credentials
    const accountId =
      credentials?.providerSpecificData?.accountId ||
      credentials?.accountId ||
      process.env.CLOUDFLARE_ACCOUNT_ID;

    if (!accountId) {
      throw new Error(
        "Cloudflare Workers AI requires an Account ID. " +
          "Add it in provider settings under 'Account ID'. " +
          "Find it at: https://dash.cloudflare.com (right sidebar)."
      );
    }

    return `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/v1/chat/completions`;
  }

  buildHeaders(credentials: any, stream = true): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credentials.apiKey || credentials.accessToken}`,
    };

    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  transformRequest(_model: string, body: any, _stream: boolean, _credentials: any): any {
    // Cloudflare uses full model paths like @cf/meta/llama-3.3-70b-instruct
    // No transformation needed — user sends the full Cloudflare model path.
    return body;
  }
}

export default CloudflareAIExecutor;
