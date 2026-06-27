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
 * Reasoning params are opt-in: reasoning_summary:"auto" is only added when the
 * client explicitly sets reasoning_effort. Plain requests are left untouched.
 * When the caller explicitly asks for "none"/"off" we drop the field entirely
 * (the gateway has no "none" value). Forcing reasoning on plain requests trips
 * CodeBuddy's content filter and returns an error.
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
    } else if (eff) {
      // Client explicitly asked for reasoning — mirror the CLI's reasoning_summary
      // so CodeBuddy surfaces the model's reasoning.
      out.reasoning_summary = "auto";
    }
    // No reasoning requested: leave both unset. Forcing reasoning_effort:"medium"
    // + reasoning_summary on plain requests makes CodeBuddy trip its content
    // filter and return an error.
    return out;
  }
}

export default CodeBuddyCnExecutor;
