import { BaseExecutor } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { SessionPool, PoolRegistry } from "../services/sessionPool/index.ts";
import type { ExecuteInput } from "./base.ts";

export class PollinationsExecutor extends BaseExecutor {
  constructor() {
    super("pollinations", PROVIDERS["pollinations"] || { format: "openai" });
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
    const session = pool ? pool.acquire() : null;

    if (session) {
      const fpHeaders = session.buildHeaders();
      input.upstreamExtraHeaders = {
        ...fpHeaders,
        ...input.upstreamExtraHeaders,
      };
    }

    let result;
    try {
      result = await super.execute(input);
    } catch (err) {
      if (session && pool) {
        pool.reportCooldown(session);
        session.release();
      }
      throw err;
    }

    if (session && pool) {
      try {
        const status = result.response.status;
        if (status === 429) {
          pool.reportCooldown(session);
        } else if (status >= 500) {
          pool.reportDead(session);
        } else {
          pool.reportSuccess(session);
        }
      } finally {
        session.release();
      }
    }

    return result;
  }
}

export default PollinationsExecutor;
