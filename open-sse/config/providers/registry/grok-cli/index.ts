import type { RegistryEntry } from "../../shared.ts";
import { resolvePublicCred } from "../../shared.ts";
import {
  getGrokBuildClientVersion,
  GROK_BUILD_MODELS_URL,
  GROK_BUILD_TOKEN_URL,
} from "../../../grokBuild.ts";

export const grok_cliProvider: RegistryEntry = {
  id: "grok-cli",
  alias: "gc",
  format: "openai",
  executor: "grok-cli",
  // Keep the generic translate-path contract stable. GrokCliExecutor owns the
  // official Grok Build upstream URL and always dispatches to /v1/responses.
  baseUrl: "https://cli-chat-proxy.grok.com/v1/chat/completions",
  modelsUrl: GROK_BUILD_MODELS_URL,
  clientVersion: getGrokBuildClientVersion(),
  authType: "oauth",
  authHeader: "bearer",
  passthroughModels: true,
  models: [
    {
      id: "grok-4.5",
      name: "Grok 4.5",
      contextLength: 500000,
      supportsReasoning: true,
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["presencePenalty", "frequencyPenalty", "logprobs", "topLogprobs"],
    },
    {
      id: "grok-composer-2.5-fast",
      name: "Composer 2.5",
      contextLength: 200000,
      supportsReasoning: false,
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["presencePenalty", "frequencyPenalty", "logprobs", "topLogprobs"],
    },
  ],
  oauth: {
    clientIdEnv: "GROK_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("grok_id", "GROK_OAUTH_CLIENT_ID"),
    tokenUrl: GROK_BUILD_TOKEN_URL,
  },
};
