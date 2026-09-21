import type { RegistryEntry } from "../../../shared.ts";
import { VERTEX_XAI_MODELS } from "../../../../vertexModels.ts";

export const vertex_partnerProvider: RegistryEntry = {
  id: "vertex-partner",
  alias: "vp",
  format: "gemini",
  executor: "vertex",
  baseUrl: "https://us-central1-aiplatform.googleapis.com/v1/projects",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "deepseek-ai/deepseek-v3.2-maas", name: "DeepSeek V3.2", targetFormat: "openai" },
    { id: "deepseek-ai/deepseek-v3.1-maas", name: "DeepSeek V3.1", targetFormat: "openai" },
    {
      id: "qwen/qwen3-next-80b-a3b-instruct-maas",
      name: "Qwen3 Next 80B Instruct",
      targetFormat: "openai",
    },
    { id: "zai-org/glm-5-maas", name: "GLM 5", targetFormat: "openai" },
    ...VERTEX_XAI_MODELS,
    { id: "claude-fable-5-1", name: "Claude Fable 5.1", targetFormat: "claude" },
    { id: "claude-fable-5", name: "Claude Fable 5", targetFormat: "claude" },
    { id: "claude-opus-5", name: "Claude Opus 5", targetFormat: "claude" },
    { id: "claude-sonnet-5", name: "Claude Sonnet 5", targetFormat: "claude" },
    { id: "claude-opus-4-8", name: "Claude Opus 4.8", targetFormat: "claude" },
    { id: "claude-opus-4-7", name: "Claude Opus 4.7", targetFormat: "claude" },
    { id: "claude-opus-4-6", name: "Claude Opus 4.6", targetFormat: "claude" },
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", targetFormat: "claude" },
    { id: "claude-sonnet-4-5-v2", name: "Claude Sonnet 4.5 v2", targetFormat: "claude" },
    { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5", targetFormat: "claude" },
    { id: "claude-sonnet-4", name: "Claude Sonnet 4", targetFormat: "claude" },
    { id: "claude-opus-4-5", name: "Claude Opus 4.5", targetFormat: "claude" },
    { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", targetFormat: "claude" },
  ],
  liveCatalogAuthoritative: false,
};
