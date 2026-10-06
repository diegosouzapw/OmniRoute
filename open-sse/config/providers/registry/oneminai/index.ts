import type { RegistryEntry } from "../../shared.ts";

// 1min.ai (docs.1min.ai) — a chat aggregator exposing many upstream models
// through one custom API. Not OpenAI-compatible at the wire level (single
// `promptObject.prompt` string instead of a `messages` array, real SSE with
// event:/data: framing instead of raw text deltas, "API-KEY" auth header
// instead of Authorization: Bearer) — see open-sse/executors/oneminai.ts for
// the request/response translation. `format: "openai"` here describes the
// client-facing surface OmniRoute exposes, not 1min.ai's actual wire format.
export const oneminaiProvider: RegistryEntry = {
  id: "oneminai",
  alias: "1min",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.1min.ai/api/chat-with-ai",
  authType: "apikey",
  authHeader: "api-key",
  // The model catalog is loaded dynamically per-account/plan on 1min.ai's own
  // dashboard rather than published as a stable public list, so only the
  // model shown in every one of 1min.ai's own docs examples is statically
  // catalogued; passthroughModels lets any other slug the account has access
  // to be used by id.
  passthroughModels: true,
  liveCatalogAuthoritative: false,
  // No tool/function-calling, JSON mode, or vision support is wired up by the
  // executor's translation (1min.ai's attachments.images/files feature would
  // need separate Asset API upload plumbing this provider doesn't implement).
  unsupportedParams: ["tools", "tool_choice", "functions", "function_call", "response_format"],
  models: [{ id: "gpt-4o-mini", name: "GPT-4o Mini" }],
};
