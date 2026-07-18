import type { RegistryEntry } from "../../shared.ts";
import { resolvePublicCred } from "../../shared.ts";

export const grok_cliProvider: RegistryEntry = {
  id: "grok-cli",
  alias: "gc",
  format: "openai",
  executor: "grok-cli",
  baseUrl: "https://cli-chat-proxy.grok.com/v1/chat/completions",
  authType: "oauth",
  authHeader: "bearer",
  passthroughModels: true,
  models: [
    {
      id: "grok-build",
      name: "Grok Build",
      contextLength: 256000,
      // cli-chat-proxy rejects reasoning_effort/reasoning outright (see grok-cli.ts
      // executor's transformRequest, which strips them unconditionally for this model).
      supportsReasoning: false,
      unsupportedParams: [
        "presencePenalty",
        "frequencyPenalty",
        "logprobs",
        "topLogprobs",
        "reasoningEffort",
      ],
    },
    {
      id: "grok-composer-2.5-fast",
      name: "Grok Composer 2.5 Fast",
      contextLength: 200000,
      // cli-chat-proxy rejects reasoning_effort/reasoning outright (see grok-cli.ts
      // executor's transformRequest, which strips them unconditionally for this model).
      supportsReasoning: false,
      unsupportedParams: [
        "presencePenalty",
        "frequencyPenalty",
        "logprobs",
        "topLogprobs",
        "reasoningEffort",
      ],
    },
  ],
  oauth: {
    clientIdEnv: "GROK_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("grok_id", "GROK_OAUTH_CLIENT_ID"),
    tokenUrl: "https://auth.x.ai/oauth2/token",
  },
};
