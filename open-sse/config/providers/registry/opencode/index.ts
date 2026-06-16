import type { RegistryEntry } from "../../shared.ts";

export const opencodeProvider: RegistryEntry = {
  id: "opencode",
  alias: "oc",
  format: "openai",
  executor: "opencode",
  baseUrl: "https://opencode.ai/zen/v1",
  modelsUrl: "https://opencode.ai/zen/v1/models",
  authType: "apikey",
  authHeader: "Authorization",
  authPrefix: "Bearer",
  passthroughModels: true,
  defaultContextLength: 200000,
  models: [
    // #2900: big-pickle's upstream runs DeepSeek thinking mode — declare the
    // interleaved reasoning_content contract so follow-up/tool-use turns replay
    // it (otherwise DeepSeek returns 400 "reasoning_content ... must be passed back").
    {
      id: "big-pickle",
      name: "Big Pickle",
      supportsReasoning: true,
      interleavedField: "reasoning_content",
    },
    { id: "deepseek-v4-flash-free", name: "DeepSeek V4 Flash Free", supportsReasoning: true },
    // #3110: MiniMax M3 free tier via OpenCode
    // #3328: MiniMax M3 is multimodal (verified: describes base64 images via the
    // opencode upstream) — flag it so vision requests aren't gated/stripped.
    {
      id: "minimax-m3-free",
      name: "MiniMax M3 Free",
      contextLength: 1048576,
      supportsVision: true,
    },
    { id: "minimax-m2.5-free", name: "MiniMax M2.5 Free", contextLength: 204800 },
    { id: "ling-2.6-1t-free", name: "Ling 2.6 Free", contextLength: 262000 },
    {
      id: "trinity-large-preview-free",
      name: "Trinity Large Preview Free",
      contextLength: 131000,
    },
    { id: "nemotron-3-super-free", name: "Nemotron 3 Super Free", contextLength: 1000000 },
    {
      id: "qwen3.6-plus-free",
      name: "Qwen3.6 Plus Free",
      targetFormat: "claude",
      supportsVision: false,
      contextLength: 200000,
    },
  ],
};
