import type { RegistryEntry } from "../../shared.ts";
import { VERTEX_XAI_MODELS } from "../../../vertexModels.ts";

export const vertexProvider: RegistryEntry = {
  id: "vertex",
  alias: "vertex",
  // Vertex AI uses Google's generateContent format (same as Gemini)
  format: "gemini",
  executor: "vertex",
  // URL uses {project_id} and {region} from providerSpecificData — handled by custom executor or fallback
  // Default to us-central1 / generic endpoint; users configure project via providerSpecificData
  baseUrl: "https://us-central1-aiplatform.googleapis.com/v1/projects",
  urlBuilder: (base, model, stream) => {
    // Full URL: {base}/{project}/locations/{region}/publishers/google/models/{model}:{action}
    // For a generic fallback, we build a Gemini-compatible URL
    // The actual project/region are configured via providerSpecificData in the DB connection
    const action = stream ? "streamGenerateContent?alt=sse" : "generateContent";
    return `https://generativelanguage.googleapis.com/v1beta/models/${model}:${action}`;
  },
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "gemini-3.7-flash", name: "Gemini 3.7 Flash (Vertex)" },
    { id: "gemini-3.6-flash", name: "Gemini 3.6 Flash (Vertex)" },
    { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash (Vertex)" },
    { id: "gemini-3.5-flash-lite", name: "Gemini 3.5 Flash-Lite (Vertex)" },
    { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview (Vertex)" },
    { id: "gemini-3.1-flash-lite", name: "Gemini 3.1 Flash Lite (Vertex)" },
    { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview (Vertex)" },
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro (Vertex)" },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash (Vertex)" },
    { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash-Lite (Vertex)" },
    {
      id: "deepseek-ai/deepseek-v3.2-maas",
      name: "DeepSeek V3.2 (Vertex MaaS)",
      targetFormat: "openai",
    },
    {
      id: "deepseek-ai/deepseek-v3.1-maas",
      name: "DeepSeek V3.1 (Vertex MaaS)",
      targetFormat: "openai",
    },
    {
      id: "qwen/qwen3-next-80b-a3b-instruct-maas",
      name: "Qwen3 Next 80B Instruct (Vertex MaaS)",
      targetFormat: "openai",
    },
    { id: "zai-org/glm-5-maas", name: "GLM 5 (Vertex MaaS)", targetFormat: "openai" },
    ...VERTEX_XAI_MODELS,
    { id: "claude-fable-5-1", name: "Claude Fable 5.1 (Vertex)", targetFormat: "claude" },
    { id: "claude-fable-5", name: "Claude Fable 5 (Vertex)", targetFormat: "claude" },
    { id: "claude-opus-5", name: "Claude Opus 5 (Vertex)", targetFormat: "claude" },
    { id: "claude-sonnet-5", name: "Claude Sonnet 5 (Vertex)", targetFormat: "claude" },
    { id: "claude-opus-4-8", name: "Claude Opus 4.8 (Vertex)", targetFormat: "claude" },
    { id: "claude-opus-4-7", name: "Claude Opus 4.7 (Vertex)", targetFormat: "claude" },
    { id: "claude-opus-4-6", name: "Claude Opus 4.6 (Vertex)", targetFormat: "claude" },
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6 (Vertex)", targetFormat: "claude" },
    { id: "claude-sonnet-4-5-v2", name: "Claude Sonnet 4.5 v2 (Vertex)", targetFormat: "claude" },
    { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5 (Vertex)", targetFormat: "claude" },
    { id: "claude-opus-4-5", name: "Claude Opus 4.5 (Vertex)", targetFormat: "claude" },
    { id: "claude-haiku-4-5", name: "Claude Haiku 4.5 (Vertex)", targetFormat: "claude" },
  ],
  passthroughModels: true,
  // Gemini + publisher discovery are independent APIs. A partial successful response must not
  // hide curated partner models omitted by another publisher catalog.
  liveCatalogAuthoritative: false,
};
