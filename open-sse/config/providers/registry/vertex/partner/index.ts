import type { RegistryEntry } from "../../../shared.ts";

export const vertex_partnerProvider: RegistryEntry = {
  id: "vertex-partner",
  alias: "vp",
  format: "gemini",
  executor: "vertex",
  baseUrl: "https://us-central1-aiplatform.googleapis.com/v1/projects",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "DeepSeek-V4-Flash", name: "DeepSeek V4 Flash" },
    { id: "DeepSeek-V4-Pro", name: "DeepSeek V4 Pro" },
    { id: "Qwen3.6-35B-A3B", name: "Qwen 3.6 35B A3B" },
    { id: "GLM-5.1-FP8", name: "GLM 5.1" },
    // Sweep 2026-06-19: + Claude Opus on Vertex (Anthropic partner models).
    { id: "claude-opus-4-8", name: "Claude Opus 4.8" },
    { id: "claude-opus-4-7", name: "Claude Opus 4.7" },
    { id: "claude-opus-4-6", name: "Claude Opus 4.6" },
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6" },
  ],
};
