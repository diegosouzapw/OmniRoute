import type { RegistryEntry } from "../../shared.ts";

// g4f.space/api/nvidia — no-key reverse proxy to NVIDIA NIM (gpt4free project,
// issue #6650). The existing `nvidia` entry requires signup; this is the genuine
// no-key gap the reporter flagged. Free tier is rate-limited to 5 req/min
// (confirmed live via 429 upsell to g4f.dev/members.html).
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
