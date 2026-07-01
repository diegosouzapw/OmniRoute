import type { RegistryEntry } from "../../shared.ts";
export const zenmuxProvider: RegistryEntry = {
  id: "zenmux",
  alias: "zm",
  format: "openai",
  executor: "default",
  baseUrl: "https://zenmux.ai/api/v1/chat/completions",
  modelsUrl: "https://zenmux.ai/api/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    {
      id: "google/gemini-3.1-pro-preview",
      name: "Gemini 3.1 Pro Preview (ZenMux)",
      capabilities: {
        contextWindow: 1048576,
        supportsVision: true,
        supportsTools: true,
        supportsReasoning: true,
      },
    },
    {
      id: "google/gemini-3-flash-preview",
      name: "Gemini 3 Flash Preview (ZenMux)",
      capabilities: {
        contextWindow: 1048576,
        supportsVision: true,
        supportsTools: true,
        supportsReasoning: true,
      },
    },
    {
      id: "openai/gpt-5",
      name: "GPT-5 (ZenMux)",
      capabilities: {
        contextWindow: 400000,
        supportsVision: true,
        supportsTools: true,
        supportsReasoning: true,
      },
    },
    {
      id: "anthropic/claude-sonnet-4.5",
      name: "Claude Sonnet 4.5 (ZenMux)",
      capabilities: {
        contextWindow: 200000,
        supportsVision: true,
        supportsTools: true,
        supportsReasoning: true,
      },
    },
    {
      id: "anthropic/claude-opus-4.5",
      name: "Claude Opus 4.5 (ZenMux)",
      capabilities: {
        contextWindow: 200000,
        supportsVision: true,
        supportsTools: true,
        supportsReasoning: true,
      },
    },
    {
      id: "deepseek/deepseek-chat",
      name: "DeepSeek V3.2 Chat (ZenMux)",
      capabilities: {
        contextWindow: 128000,
        supportsVision: false,
        supportsTools: true,
        supportsReasoning: false,
      },
    },
    {
      id: "x-ai/grok-4.1-fast",
      name: "Grok 4.1 Fast (ZenMux)",
      capabilities: {
        contextWindow: 131072,
        supportsVision: false,
        supportsTools: true,
        supportsReasoning: true,
      },
    },
    {
      id: "mistralai/mistral-large-2512",
      name: "Mistral Large 2512 (ZenMux)",
      capabilities: {
        contextWindow: 128000,
        supportsVision: true,
        supportsTools: true,
        supportsReasoning: false,
      },
    },
    {
      id: "z-ai/glm-4.6v-flash",
      name: "GLM 4.6V Flash (ZenMux)",
      capabilities: {
        contextWindow: 128000,
        supportsVision: true,
        supportsTools: true,
        supportsReasoning: false,
      },
    },
  ],
};
