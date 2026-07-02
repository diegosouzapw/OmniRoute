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
    {
      id: "gpt-5.5",
      name: "GPT-5.5",
      capabilities: {
        contextWindow: 1050000,
      },
    },
    {
      id: "gpt-5.5-pro",
      name: "GPT-5.5 Pro",
      capabilities: {
        contextWindow: 1050000,
      },
      // #5842: *-pro reasoning models are responses-only upstream — /v1/chat/completions
      // 404s ("only supported in v1/responses"). targetFormat routes them natively.
      compat: {
        targetFormat: "openai-responses",
      },
    },
    {
      id: "gpt-5.4",
      name: "GPT-5.4",
      capabilities: {
        contextWindow: 1050000,
      },
    },
    {
      id: "gpt-5.4-pro",
      name: "GPT-5.4 Pro",
      capabilities: {
        contextWindow: 1050000,
      },
      compat: {
        targetFormat: "openai-responses",
      },
    },
    {
      id: "gpt-5.4-mini",
      name: "GPT-5.4 Mini",
      capabilities: {
        contextWindow: 400000,
      },
    },
    {
      id: "gpt-5.4-nano",
      name: "GPT-5.4 Nano",
      capabilities: {
        contextWindow: 400000,
      },
    },
    {
      id: "gpt-4.1",
      name: "GPT-4.1",
      capabilities: {
        contextWindow: 1047576,
      },
    },
    {
      id: "gpt-4.1-mini",
      name: "GPT-4.1 Mini",
      capabilities: {
        contextWindow: 1047576,
      },
    },
    {
      id: "gpt-4.1-nano",
      name: "GPT-4.1 Nano",
      capabilities: {
        contextWindow: 1047576,
      },
    },
    {
      id: "gpt-4o",
      name: "GPT-4o",
      capabilities: {
        contextWindow: 128000,
      },
    },
    {
      id: "gpt-4o-2024-11-20",
      name: "GPT-4o (Nov 2024)",
      capabilities: {
        contextWindow: 128000,
      },
    },
    {
      id: "gpt-4o-mini",
      name: "GPT-4o Mini",
      capabilities: {
        contextWindow: 128000,
      },
    },
    {
      id: "o3",
      name: "O3",
      capabilities: {
        contextWindow: 200000,
      },
      compat: {
        unsupportedParams: REASONING_UNSUPPORTED,
      },
    },
    {
      id: "o3-mini",
      name: "O3 Mini",
      capabilities: {
        contextWindow: 200000,
      },
      compat: {
        unsupportedParams: REASONING_UNSUPPORTED,
      },
    },
    {
      id: "o4-mini",
      name: "O4 Mini",
      capabilities: {
        contextWindow: 200000,
      },
      compat: {
        unsupportedParams: REASONING_UNSUPPORTED,
      },
    },
  ],
};
