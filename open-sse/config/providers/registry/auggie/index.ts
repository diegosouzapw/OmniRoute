import type { RegistryEntry } from "../../shared.ts";

// Augment / Auggie CLI — local no-auth provider. The executor spawns the
// user's local `auggie` binary (auth handled entirely by `auggie login`);
// OmniRoute never stores credentials for this connection.
export const auggieProvider: RegistryEntry = {
  id: "auggie",
  alias: "aug",
  format: "openai",
  executor: "auggie",
  baseUrl: "auggie://cli/stdio",
  authType: "none",
  authHeader: "none",
  defaultContextLength: 200000,
  models: [
    // Claude
    { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6", contextLength: 200000 },
    {
      id: "claude-sonnet-4.6-thinking",
      name: "Claude Sonnet 4.6 Thinking",
      contextLength: 200000,
    },
    { id: "claude-opus-4.6", name: "Claude Opus 4.6", contextLength: 200000 },
    { id: "claude-haiku-4.5", name: "Claude Haiku 4.5", contextLength: 200000 },
    // Gemini
    { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro", contextLength: 1000000 },
    { id: "gemini-3.0-flash", name: "Gemini 3 Flash", contextLength: 1000000 },
    // GPT-5.x
    { id: "gpt-5.5-high", name: "GPT-5.5 High", contextLength: 200000 },
    { id: "gpt-5.5-medium", name: "GPT-5.5 Medium", contextLength: 200000 },
    { id: "gpt-5.4-high", name: "GPT-5.4 High", contextLength: 200000 },
    { id: "gpt-5.4-medium", name: "GPT-5.4 Medium", contextLength: 200000 },
    // Kimi
    { id: "kimi-k2.6", name: "Kimi K2.6", contextLength: 131000 },
    // Prism (Augment's in-house model)
    { id: "prism", name: "Augment Prism", contextLength: 200000 },
  ],
};
