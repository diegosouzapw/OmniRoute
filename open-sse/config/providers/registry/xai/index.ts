import type { RegistryEntry } from "../../shared.ts";

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
  authType: "apikey",
  authHeader: "bearer",
  models: [
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
