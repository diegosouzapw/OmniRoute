import type { RegistryEntry } from "../../shared.ts";
import { resolvePublicCred } from "../../shared.ts";

export const xaiProvider: RegistryEntry = {
  id: "xai",
  alias: "xai",
  format: "openai",
  executor: "xai",
  baseUrl: "https://api.x.ai/v1/chat/completions",
  // Port of decolua/9router#2439 (author: @ryanngit): xAI ships a native
  // `/v1/responses` endpoint alongside `/v1/chat/completions`. Consumed by
  // XaiExecutor.buildUrl (open-sse/executors/xai.ts) for models tagged
  // targetFormat: "openai-responses" below.
  responsesBaseUrl: "https://api.x.ai/v1/responses",
  reasoningTransport: "opaque",
  authType: "apikey",
  authHeader: "bearer",
  passthroughModels: true,
  models: [
    {
      id: "grok-4.6",
      name: "Grok 4.6",
      contextLength: 500000,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh"],
      supportsVision: true,
      supportsXHighEffort: true,
      toolCalling: true,
      targetFormat: "openai-responses",
    },
    { id: "grok-4.3", name: "Grok 4.3" },
    { id: "grok-build-0.1", name: "Grok Build 0.1", contextLength: 256000 },
    // Responses-only per upstream 9router#2439: xAI serves this id exclusively
    // over its native /v1/responses endpoint.
    {
      id: "grok-4.20-multi-agent-0309",
      name: "Grok 4.20 Multi Agent",
      targetFormat: "openai-responses",
    },
    { id: "grok-4.20-0309-reasoning", name: "Grok 4.20 Reasoning" },
    { id: "grok-4.20-0309-non-reasoning", name: "Grok 4.20" },
  ],
};

/**
 * OAuth authentication variant for the unified xAI provider.
 *
 * Keep the backend ID distinct because refresh and quota handling key off
 * `xai-oauth`, while co-locating both variants prevents their shared endpoint
 * and model catalog from drifting apart.
 */
export const xai_oauthProvider: RegistryEntry = {
  id: "xai-oauth",
  alias: "xao",
  format: xaiProvider.format,
  executor: "xai-oauth",
  baseUrl: xaiProvider.baseUrl,
  responsesBaseUrl: xaiProvider.responsesBaseUrl,
  reasoningTransport: "opaque",
  authType: "oauth",
  authHeader: xaiProvider.authHeader,
  passthroughModels: true,
  oauth: {
    clientIdEnv: "GROK_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("grok_id", "GROK_OAUTH_CLIENT_ID"),
    tokenUrl: "https://auth.x.ai/oauth2/token",
  },
  models: [
    // SuperGrok / xAI OAuth serves grok-4.5 on native /v1/responses. Tag so
    // chatCore translates OpenAI Chat Completions → Responses (messages→input,
    // max_tokens→max_output_tokens). Without the tag, some 3.8.50 paths hit
    // /v1/responses with a chat-shaped body → 422 missing `input` (#10165).
    {
      id: "grok-4.5",
      name: "Grok 4.5",
      contextLength: 500000,
      targetFormat: "openai-responses",
    },
    ...(xaiProvider.models || []),
  ],
};
