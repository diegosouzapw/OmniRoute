import type { RegistryEntry } from "../../shared.ts";

// g4f.space/api/nvidia — optional-auth remote NVIDIA NIM gateway (gpt4free,
// issue #6650). Anonymous requests require proof-of-work cake credits; a member API key
// is the alternative. Limits are dynamic; this is separate from the direct `nvidia` entry.
export const g4f_nvidiaProvider: RegistryEntry = {
  id: "g4f-nvidia",
  alias: "g4fnv",
  format: "openai",
  executor: "default",
  baseUrl: "https://g4f.space/api/nvidia/v1/chat/completions",
  modelsUrl: "https://g4f.space/api/nvidia/v1/models",
  authType: "optional",
  authHeader: "bearer",
  passthroughModels: true,
  models: [
    { id: "nvidia/nemotron-3-nano-30b-a3b", name: "Nemotron 3 Nano 30B (g4f/NVIDIA)" },
    { id: "z-ai/glm-5.2", name: "GLM 5.2 (g4f/NVIDIA)" },
    { id: "minimaxai/minimax-m2.7", name: "MiniMax M2.7 (g4f/NVIDIA)" },
  ],
};
