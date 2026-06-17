import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";
import { STANDARD_USER_AGENT } from "../config/constants.ts";

const LLM7_API_URL = "https://api.llm7.io/v1/chat/completions";

export class Llm7Executor extends BaseExecutor {
  constructor() {
    super("llm7", { id: "llm7", baseUrl: "https://api.llm7.io" });
  }

  async execute(input: ExecuteInput) {
    const { body, signal, stream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;

    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": STANDARD_USER_AGENT,
    };

    let upstream: Response;
    try {
      upstream = await fetch(LLM7_API_URL, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(bodyObj),
        signal,
      });
    } catch (err) {
      return makeErrorResult(this.name, `Request failed: ${err}`);
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "Unknown error");
      return makeErrorResult(this.name, `Upstream ${upstream.status}: ${errText}`);
    }

    return {
      response: upstream,
      url: LLM7_API_URL,
      headers: reqHeaders,
      transformedBody: bodyObj,
    };
  }
}
