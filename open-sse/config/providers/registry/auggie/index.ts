import type { RegistryEntry } from "../../shared.ts";

// Augment / Auggie CLI — local no-auth provider. The executor spawns the
// user's local `auggie` binary (auth handled entirely by `auggie login`);
// OmniRoute never stores credentials for this connection.
//
// Model IDs sourced from `auggie model list` on auggie v0.32.0.
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
    // ── Anthropic Claude ────────────────────────────────────────────────
    { id: "sonnet4.6", name: "Sonnet 4.6", contextLength: 200000 },
    { id: "fable-5", name: "Claude Fable 5", contextLength: 200000 },
    { id: "haiku4.5", name: "Haiku 4.5", contextLength: 200000 },
    { id: "sonnet4.5", name: "Sonnet 4.5", contextLength: 200000 },
    { id: "sonnet4.6-500k", name: "Sonnet 4.6 (500K)", contextLength: 500000 },
    { id: "sonnet5-high", name: "Claude Sonnet 5", contextLength: 200000 },
    { id: "sonnet5-500k", name: "Claude Sonnet 5 (500K)", contextLength: 500000 },
    { id: "opus4.5", name: "Opus 4.5", contextLength: 200000 },
    { id: "opus4.6", name: "Opus 4.6", contextLength: 200000 },
    { id: "opus4.6-500k", name: "Opus 4.6 (500K)", contextLength: 500000 },
    { id: "opus4.7", name: "Opus 4.7", contextLength: 200000 },
    { id: "opus4.7-500k", name: "Opus 4.7 (500K)", contextLength: 500000 },
    { id: "opus4.8", name: "Opus 4.8", contextLength: 200000 },
    // ── Gemini ──────────────────────────────────────────────────────────
    { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro", contextLength: 1000000 },
    // ── OpenAI GPT ──────────────────────────────────────────────────────
    { id: "gpt5", name: "GPT-5", contextLength: 200000 },
    { id: "gpt5.1", name: "GPT-5.1", contextLength: 200000 },
    { id: "gpt5.2", name: "GPT-5.2", contextLength: 200000 },
    { id: "gpt5.4", name: "GPT-5.4", contextLength: 200000 },
    { id: "gpt5.4-mini", name: "GPT-5.4 Mini", contextLength: 200000 },
    { id: "gpt5.5", name: "GPT-5.5", contextLength: 200000 },
    { id: "gpt5.6-luna", name: "GPT-5.6 Luna", contextLength: 200000 },
    { id: "gpt5.6-sol", name: "GPT-5.6 Sol", contextLength: 200000 },
    { id: "gpt5.6-terra", name: "GPT-5.6 Terra", contextLength: 200000 },
    // ── Others ──────────────────────────────────────────────────────────
    { id: "glm-5.2", name: "GLM 5.2", contextLength: 200000 },
    { id: "kimi-k2.6", name: "Kimi K2.6", contextLength: 131000 },
    { id: "kimi-k2.7", name: "Kimi K2.7 Code", contextLength: 131000 },
    // ── Augment Prism (composite routers) ───────────────────────────────
    { id: "prism-a", name: "Prism (Claude + Gemini)", contextLength: 200000 },
    { id: "prism-b", name: "Prism (GPT + Kimi)", contextLength: 200000 },
  ],
};
