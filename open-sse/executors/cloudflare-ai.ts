import { BaseExecutor } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";

type CloudflareCredentials = {
  apiKey?: string;
  accessToken?: string;
  accountId?: string;
  providerSpecificData?: {
    accountId?: string;
  } | null;
} | null;

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

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: CloudflareCredentials = null
  ): string {
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

  buildHeaders(credentials: CloudflareCredentials, stream = true): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credentials.apiKey || credentials.accessToken}`,
    };

    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  transformRequest(
    _model: string,
    body: Record<string, unknown>,
    _stream: boolean,
    _credentials: CloudflareCredentials
  ): Record<string, unknown> {
    // Cloudflare uses full model paths like @cf/meta/llama-3.3-70b-instruct — the model id
    // needs no transformation. But the Workers AI /ai/v1/chat/completions endpoint requires
    // each message `content` to be a plain string; it rejects the OpenAI content-part array
    // shape (`[{ type:"text", text }]`) with HTTP 400 (#2539). Flatten text parts to a string.
    if (!Array.isArray(body.messages)) return body;

    // #6390: the endpoint has no way to carry image/non-text parts once flattened to a
    // string, so previously any non-text part (e.g. image_url) was silently mapped to ""
    // and the image quietly disappeared from the outgoing request. Refuse instead of
    // silently dropping data — this throws a plain Error which the caller (chatCore.ts)
    // already routes through buildErrorBody()/sanitizeErrorMessage() before it reaches
    // the client, matching the existing buildUrl() missing-accountId error above.
    const flattenContent = (content: unknown): unknown => {
      if (typeof content === "string" || !Array.isArray(content)) return content;
      return content
        .map((part) => {
          if (!part || typeof part !== "object") return "";
          const p = part as Record<string, unknown>;
          if (p.type === "text" && typeof p.text === "string") return p.text;
          throw new Error(
            "Cloudflare Workers AI chat endpoint does not accept image/non-text content parts " +
              `(got type "${typeof p.type === "string" ? p.type : "unknown"}"). ` +
              "Remove image/file attachments or route this request to a vision-capable provider."
          );
        })
        .join("");
    };

    const messages = (body.messages as Array<Record<string, unknown>>).map((msg) =>
      msg && Array.isArray(msg.content) ? { ...msg, content: flattenContent(msg.content) } : msg
    );

    return { ...body, messages };
  }
}

export default CloudflareAIExecutor;
