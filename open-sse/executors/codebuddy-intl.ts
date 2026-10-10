import { CodeBuddyBaseExecutor, NEUTRAL_PROMPT } from "./codebuddy/shared.ts";
import type { ProviderCredentials } from "./base.ts";

/**
 * CodeBuddyIntlExecutor — talks to https://www.codebuddy.ai/v2/chat/completions
 *
 * CodeBuddy International gateway strictly requires the first message in the
 * request to be a system prompt (rejects with 400 "first message is not system
 * prompt" otherwise). Inherits all shared CodeBuddy gateway behavior and
 * prepends a neutral system prompt when callers/probes send none.
 */
export class CodeBuddyIntlExecutor extends CodeBuddyBaseExecutor {
  constructor(providerId: string = "codebuddy-intl") {
    super(providerId);
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

    if (Array.isArray(out.messages)) {
      const first = out.messages[0] as Record<string, unknown> | undefined;
      if (!first || first.role !== "system") {
        out.messages = [{ role: "system", content: NEUTRAL_PROMPT }, ...out.messages];
      }
    }

    return out;
  }
}
