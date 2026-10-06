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
    // needs no transformation. The `content` shape, however, is validated against the
    // *model's* schema and not the endpoint's: text-only models declare `content: string`
    // and reject the OpenAI content-part array with HTTP 400 (#2539), while multimodal
    // models declare `content: string | array` and accept it. Flattening an all-text array
    // to a plain string is therefore still right — it is the one shape every model accepts.
    if (!Array.isArray(body.messages)) return body;

    // #6390 refused any non-text part instead of letting it vanish into a flattened string,
    // and refusing did beat dropping. Passing the array through is better still: an image is
    // only meaningful to a multimodal model, and those accept the array shape. When the
    // target model is text-only, Cloudflare answers with its own 400, which is more useful
    // than a gateway refusal that pre-empts every model alike.
    const isTextPart = (part: unknown): boolean => {
      if (!part || typeof part !== "object") return false;
      const p = part as Record<string, unknown>;
      return p.type === "text" && typeof p.text === "string";
    };

    const flattenTextParts = (content: unknown[]): string =>
      content.map((part) => (part as Record<string, unknown>).text as string).join("");

    const messages = (body.messages as Array<Record<string, unknown>>).map((msg) =>
      msg && Array.isArray(msg.content) && msg.content.every(isTextPart)
        ? { ...msg, content: flattenTextParts(msg.content) }
        : msg
    );

    return { ...body, messages };
  }
}

export default CloudflareAIExecutor;
