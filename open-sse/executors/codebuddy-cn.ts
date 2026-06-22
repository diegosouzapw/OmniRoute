import { DefaultExecutor } from "./default.ts";
import type { ProviderCredentials } from "./base.ts";

/**
 * CodeBuddyCnExecutor — talks to https://copilot.tencent.com/v2/chat/completions
 *
 * CodeBuddy CN is an OpenAI-compatible Tencent gateway but it rejects non-stream
 * chat requests (HTTP 400, code 11101 "Non-stream chat request is currently not
 * supported"). The same-format (openai→openai) translator path leaves body.stream
 * as the client sent it, so we force it true here — OmniRoute still re-aggregates
 * the SSE into a JSON response for non-streaming clients.
 *
 * CodeBuddy CN only surfaces model reasoning when the request carries the
 * official CLI's OpenAI-style params: reasoning_effort + reasoning_summary:"auto".
 * Mirror the CLI here. When the caller explicitly asks for "none"/"off" we drop
 * the field entirely (the gateway has no "none" value).
 */
export class CodeBuddyCnExecutor extends DefaultExecutor {
  constructor() {
    super("codebuddy-cn");
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const transformed = super.transformRequest(model, body, stream, credentials);
    if (!transformed || typeof transformed !== "object" || Array.isArray(transformed)) {
      return transformed;
    }
    const out = transformed as Record<string, unknown>;
    out.stream = true;

    const eff = out.reasoning_effort;
    if (eff === "none" || eff === "off") {
      // Gateway has no "none" — just omit. Do NOT set reasoning_summary.
      delete out.reasoning_effort;
    } else {
      if (!eff) out.reasoning_effort = "medium";
      out.reasoning_summary = "auto";
    }
    return out;
  }
}

export default CodeBuddyCnExecutor;
