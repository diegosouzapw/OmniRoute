import type { RegistryEntry } from "../../shared.ts";

const ADJUSTABLE_REASONING = {
  toolCalling: false,
  supportsReasoning: true,
  supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max"],
  supportsVision: true,
} as const;

const FIXED_TEXT = {
  toolCalling: false,
  supportsVision: true,
} as const;

/** Routes observed from first-party ChatGPT Pro and Free UIs through 2026-08-31. */
export const chatgpt_webProvider: RegistryEntry = {
  id: "chatgpt-web",
  format: "openai",
  executor: "chatgpt-web",
  baseUrl: "https://chatgpt.com",
  reasoningTransport: "opaque",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "gpt-5-6", name: "GPT-5.6 Sol — Instant", ...FIXED_TEXT },
    {
      id: "gpt-5-6-thinking",
      name: "GPT-5.6 Sol — Thinking",
      aliases: ["gpt-5-6-sol"],
      ...ADJUSTABLE_REASONING,
    },
    { id: "gpt-5-6-pro", name: "GPT-5.6 Sol — Pro", ...FIXED_TEXT, supportsReasoning: true },
    { id: "gpt-5.6-luna-free", name: "GPT-5.6 Luna — Free", ...FIXED_TEXT },
    {
      id: "gpt-5.6-luna-free-thinking",
      name: "GPT-5.6 Luna — Free Thinking",
      ...FIXED_TEXT,
      supportsReasoning: true,
    },
    { id: "gpt-5-5-instant", name: "GPT-5.5 — Instant", ...FIXED_TEXT },
    {
      id: "gpt-5-5-thinking",
      name: "GPT-5.5 — Thinking",
      aliases: ["gpt-5-5"],
      ...ADJUSTABLE_REASONING,
    },
    { id: "gpt-5-5-pro", name: "GPT-5.5 — Pro", ...FIXED_TEXT, supportsReasoning: true },
  ],
};
