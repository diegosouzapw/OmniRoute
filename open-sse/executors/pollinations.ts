import { BaseExecutor } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";

/**
 * PollinationsExecutor — Pollinations now requires API key auth.
 * The free Spore tier grants 0.01 pollen/hour, so keep the messaging
 * aligned with a key-backed free tier instead of anonymous access.
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
    const key = credentials?.apiKey || credentials?.accessToken;
    if (!key) {
      throw new Error("Pollinations API key is required");
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    };

    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  transformRequest(model: string, body: any, _stream: boolean, _credentials: any): any {
    // Pollinations uses provider aliases directly: "openai", "claude", "gemini", etc.
    return body;
  }
}

export default PollinationsExecutor;
