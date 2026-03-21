import { BaseExecutor } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";

/**
 * PollinationsExecutor — handles optional API key auth.
 * Pollinations AI works WITHOUT any API key for basic use (1 req/15s).
 * If an API key is provided, higher rate limits apply.
 *
 * Endpoint: https://text.pollinations.ai/openai/chat/completions
 * Docs: https://pollinations.ai/docs
 */
export class PollinationsExecutor extends BaseExecutor {
  constructor() {
    super("pollinations", PROVIDERS["pollinations"] || { format: "openai" });
  }

  buildUrl(_model: string, _stream: boolean, _urlIndex = 0, _credentials = null): string {
    return "https://text.pollinations.ai/openai/chat/completions";
  }

  buildHeaders(credentials: any, stream = true): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // API key is OPTIONAL — skip Authorization header if no key provided
    const key = credentials?.apiKey || credentials?.accessToken;
    if (key) {
      headers["Authorization"] = `Bearer ${key}`;
    }

    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  transformRequest(model: string, body: any, _stream: boolean, _credentials: any): any {
    // Pollinations uses model names directly like "openai", "claude", "deepseek", etc.
    // No transformation needed — the model name is already the Pollinations alias.
    return body;
  }
}

export default PollinationsExecutor;
