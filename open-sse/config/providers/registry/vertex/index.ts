import type { RegistryEntry } from "../../shared.ts";

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
    { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview (Vertex)" },
    { id: "gemini-3.1-flash-lite", name: "Gemini 3.1 Flash Lite (Vertex)" },
    { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview (Vertex)" },
    { id: "gemma-4-31b-it", name: "Gemma 4 31B (Vertex)" },
    { id: "DeepSeek-V4-Flash", name: "DeepSeek V4 Flash (Vertex Partner)" },
    { id: "DeepSeek-V4-Pro", name: "DeepSeek V4 Pro (Vertex Partner)" },
    { id: "Qwen3.6-35B-A3B", name: "Qwen3.6 35B A3B (Vertex Partner)" },
    { id: "GLM-5.1-FP8", name: "GLM-5.1 (Vertex Partner)" },
    { id: "claude-opus-4-7", name: "Claude Opus 4.7 (Vertex)" },
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6 (Vertex)" },
  ],
};
