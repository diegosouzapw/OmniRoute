import type { RegistryEntry } from "../../shared.ts";
import { REASONING_UNSUPPORTED } from "../../shared.ts";

export const openaiProvider: RegistryEntry = {
  id: "openai",
  alias: "openai",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.openai.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    { id: "gpt-5.5", name: "GPT-5.5", contextLength: 1050000 },
    // #5842: *-pro reasoning models are responses-only upstream — /v1/chat/completions
    // 404s ("only supported in v1/responses"). targetFormat routes them natively.
    {
      id: "gpt-5.5-pro",
      name: "GPT-5.5 Pro",
      contextLength: 1050000,
      targetFormat: "openai-responses",
    },
    { id: "gpt-5.4", name: "GPT-5.4", contextLength: 1050000 },
    {
      id: "gpt-5.4-pro",
      name: "GPT-5.4 Pro",
      contextLength: 1050000,
      targetFormat: "openai-responses",
    },
    { id: "gpt-5.4-mini", name: "GPT-5.4 Mini", contextLength: 400000 },
    { id: "gpt-5.4-nano", name: "GPT-5.4 Nano", contextLength: 400000 },
    { id: "gpt-4.1", name: "GPT-4.1", contextLength: 1047576 },
    { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", contextLength: 1047576 },
    { id: "gpt-4.1-nano", name: "GPT-4.1 Nano", contextLength: 1047576 },
    { id: "gpt-4o", name: "GPT-4o", contextLength: 128000 },
    { id: "gpt-4o-2024-11-20", name: "GPT-4o (Nov 2024)", contextLength: 128000 },
    { id: "gpt-4o", name: "GPT-4o", contextLength: 128000 },
    { id: "gpt-4o-mini", name: "GPT-4o Mini", contextLength: 128000 },
    { id: "o3", name: "O3", contextLength: 200000, unsupportedParams: REASONING_UNSUPPORTED },
    { id: "o3-mini", name: "O3 Mini", contextLength: 200000, unsupportedParams: REASONING_UNSUPPORTED },
    { id: "o4-mini", name: "O4 Mini", contextLength: 200000, unsupportedParams: REASONING_UNSUPPORTED },
  ],
};
