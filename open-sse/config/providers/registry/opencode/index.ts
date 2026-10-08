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
    // #12681: real window confirmed against the opencode-go registry's own
    // muse-spark-1.2-contributor entries (contextLength: 1048576, maxOutputTokens:
    // 131072) — without an explicit value here resolution fell back to the
    // provider-wide defaultContextLength (200000), understating the real window.
    {
      id: "muse-spark-1.2",
      name: "Muse Spark 1.2",
      supportsReasoning: true,
      targetFormat: "openai-responses",
      contextLength: 1048576,
      maxOutputTokens: 131072,
    },
    {
      id: "muse-spark-1.2-contributor-free",
      name: "Muse Spark 1.2 Contributor Free",
      supportsReasoning: true,
      targetFormat: "openai-responses",
      contextLength: 1048576,
      maxOutputTokens: 131072,
    },
    // Muse Spark 1.3 is served only on the Responses API, same as 1.2 above.
    // Its window matches the published OpenCode catalog instead of the
    // 200000 provider default.
    {
      id: "muse-spark-1.3",
      name: "Muse Spark 1.3",
      supportsReasoning: true,
      targetFormat: "openai-responses",
      contextLength: 1048576,
      maxOutputTokens: 131072,
    },
    {
      id: "muse-spark-1.3-contributor-free",
      name: "Muse Spark 1.3 Contributor Free",
      supportsReasoning: true,
      targetFormat: "openai-responses",
      contextLength: 1048576,
      maxOutputTokens: 131072,
    },
    // #6998: 2026-07-14 refresh — the upstream free tier rotated its lineup;
    // minimax-m3-free, minimax-m2.5-free, ling-2.6-1t-free,
    // trinity-large-preview-free, nemotron-3-super-free and qwen3.6-plus-free
    // were delisted (401 "Model X is not supported").
    // 2026-10-08 refresh — next rotation: mimo-v2.5-free, hy3-free,
    // north-mini-code-free and deepseek-v4-flash-free are gone upstream too (401
    // verified live against https://opencode.ai/zen/v1/chat/completions).
    // Advertising a delisted model here poisons the shared `noauth` connection for
    // EVERY sibling target on the first 401 (#8133) and fails auto/best-coding at
    // attempt 1 — so only models confirmed live above may be listed.
    // MiMo V2.6 Flash Free ships a 1M window upstream (same as V2.5); without
    // this row it falls through to the 200000 provider default and clients
    // compact far too early.
    {
      id: "mimo-v2.6-flash-free",
      name: "MiMo V2.6 Flash Free",
      contextLength: 1048576,
      maxOutputTokens: 131072,
    },
    { id: "nemotron-3-ultra-free", name: "Nemotron 3 Ultra Free", contextLength: 1000000 },
  ],
};
