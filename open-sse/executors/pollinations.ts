import { BaseExecutor } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { DEFAULT_POOL_CONFIG } from "../services/sessionPool/types.ts";
import type { ExecuteInput } from "./base.ts";

export class PollinationsExecutor extends BaseExecutor {
  constructor() {
    super("pollinations", PROVIDERS["pollinations"] || { format: "openai" });
    this.poolConfig = DEFAULT_POOL_CONFIG;
  }

  buildUrl(_model: string, _stream: boolean, urlIndex = 0, _credentials = null): string {
    const baseUrls = this.getBaseUrls();
    return (
      baseUrls[urlIndex] || baseUrls[0] || "https://gen.pollinations.ai/v1/chat/completions"
    );
  }

  buildHeaders(credentials: any, stream = true): Record<string, string> {
    const key = credentials?.apiKey || credentials?.accessToken;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (key) {
      headers.Authorization = `Bearer ${key}`;
    }

    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  transformRequest(model: string, body: any, stream: boolean, _credentials: any): any {
    if (typeof body === "object" && body !== null) {
      body.model = model;
      body.stream = stream;
      body.jsonMode = true;
    }
    return body;
  }

  async execute(input: ExecuteInput) {
    const isAnonymous = !input.credentials?.apiKey && !input.credentials?.accessToken;

    if (!isAnonymous) {
      return super.execute(input);
    }

    const pool = this.getPool();

    // Use acquireBlocking for anonymous requests to wait for available session
    let session;
    try {
      session = pool ? await pool.acquireBlocking(10_000) : null;
    } catch {
      // Pool exhausted — fall through to direct request without fingerprint
      session = null;
    }

    if (session) {
      const fpHeaders = session.buildHeaders();
      input.upstreamExtraHeaders = {
        ...fpHeaders,
        ...input.upstreamExtraHeaders,
      };
    }

    try {
      const result = await super.execute(input);

      if (session && pool) {
        const status = result.response.status;
        if (status === 429) {
          pool.reportCooldown(session);
        } else if (status >= 500) {
          pool.reportDead(session);
        } else {
          pool.reportSuccess(session);
        }
      }

      return result;
    } catch (err: any) {
      if (session && pool) {
        pool.reportCooldown(session);
      }
      // Enhance 401 errors with actionable guidance
      if (err?.status === 401 || err?.statusCode === 401) {
        const premiumModels = ["claude", "claude-fast", "claude-large", "gemini", "gemini-fast", "midijourney", "midijourney-large"];
        const model = input.model || "";
        if (premiumModels.includes(model)) {
          const enhanced = new Error(
            `Pollinations model "${model}" requires an API key. ` +
            `Free keyless models: openai, openai-fast, openai-large, qwen-coder, mistral, deepseek, grok, gemini-flash-lite-3.1, perplexity-fast, perplexity-reasoning. ` +
            `Get a Pollinations API key at https://enter.pollinations.ai and add it in Settings → API Keys.`
          );
          (enhanced as any).status = 401;
          (enhanced as any).type = "authentication_error";
          throw enhanced;
        }
      }
      throw err;
    } finally {
      session?.release();
    }
  }
}

export default PollinationsExecutor;
