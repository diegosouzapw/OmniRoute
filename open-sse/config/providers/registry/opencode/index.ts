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
    // #MUSE_SPARK: Muse Spark is served by OpenCode Zen ONLY on the OpenAI
    // Responses API (https://opencode.ai/zen/v1/responses), not /chat/completions
    // (confirmed in the official OpenCode Zen docs: https://opencode.ai/docs/zen/).
    // Without targetFormat:"openai-responses" these models fall through to the
    // default chat/completions pass-through and the upstream returns null/empty
    // content (see issue #10867). The opencode provider is passthrough, so
    // declaring them here only sets the wire format / capability flags — the
    // live upstream model list already advertises both ids.
    {
      id: "muse-spark-1.3",
      name: "Muse Spark 1.3",
      supportsReasoning: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.3-contributor-free",
      name: "Muse Spark 1.3 Contributor Free",
      supportsReasoning: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.2",
      name: "Muse Spark 1.2",
      supportsReasoning: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.2-contributor-free",
      name: "Muse Spark 1.2 Contributor Free",
      supportsReasoning: true,
      targetFormat: "openai-responses",
    },
    { id: "deepseek-v4-flash-free", name: "DeepSeek V4 Flash Free", supportsReasoning: true },
    // #6998: 2026-07-14 refresh — the upstream free tier rotated its lineup;
    // minimax-m3-free, minimax-m2.5-free, ling-2.6-1t-free,
    // trinity-large-preview-free, nemotron-3-super-free and qwen3.6-plus-free
    // were delisted (401 "Model X is not supported") and replaced by the 4
    // entries below, confirmed live against
    // https://opencode.ai/zen/v1/chat/completions.
    { id: "mimo-v2.5-free", name: "MiMo V2.5 Free", contextLength: 131000 },
    { id: "hy3-free", name: "HY3 Free", contextLength: 131000 },
    { id: "nemotron-3-ultra-free", name: "Nemotron 3 Ultra Free", contextLength: 1000000 },
    { id: "north-mini-code-free", name: "North Mini Code Free", contextLength: 131000 },
  ],
};
