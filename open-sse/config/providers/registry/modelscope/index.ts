import type { RegistryEntry } from "../../shared.ts";

// ModelScope (Alibaba 魔搭) — OpenAI-compatible API-Inference, ported from upstream
// 9router PR #1764 (@tn5052). The upstream PR hardcoded `https://api-inference.modelscope.ai/...`
// (`.ai` TLD) and a static 5-model list. Both were dropped here after verification:
//
// - baseUrl: ModelScope's own API-Inference docs (modelscope.cn/docs/model-service/API-Inference)
//   and third-party integration guides (e.g. Alibaba Cloud Model Studio compatibility docs)
//   consistently confirm the production domain is `api-inference.modelscope.cn` — the `.cn` TLD,
//   not `.ai`. Using the unverified `.ai` domain would have shipped a broken provider.
// - models: passthrough + empty static seed instead of copying the PR's 5-model snapshot, since
//   ModelScope hosts a large and fast-moving open-model catalog — `modelsUrl` keeps the list live.
export const modelscopeProvider: RegistryEntry = {
  id: "modelscope",
  alias: "ms",
  format: "openai",
  executor: "default",
  baseUrl: "https://api-inference.modelscope.cn/v1/chat/completions",
  modelsUrl: "https://api-inference.modelscope.cn/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  passthroughModels: true,
  models: [],
};
