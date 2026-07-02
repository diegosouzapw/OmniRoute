import type { RegistryEntry } from "../../shared.ts";

export const tencentProvider: RegistryEntry = {
  id: "tencent",
  alias: "tencent",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.hunyuan.cloud.tencent.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Sweep 2026-06-19: refreshed against the official Tencent Hunyuan OpenAI-compatible
  // catalog. turbos-latest / t1-latest are the current rolling flagships. NOTE: Tencent's
  // legacy Hunyuan platform discontinues 46 models (incl. the turbos/t1 lines) on
  // 2026-06-22, migrating to TokenHub/hy3-preview — revisit before 2026-09-30. Legacy
  // hunyuan-standard/-256K/-code/-role and the pinned turbos-20250226 snapshot were
  // dropped from the live catalog and are intentionally omitted.
  models: [
    { id: "hunyuan-turbos-latest", name: "Hunyuan TurboS Latest", contextLength: 200000 },
    { id: "hunyuan-t1-latest", name: "Hunyuan T1 Latest", contextLength: 256000 },
    { id: "hunyuan-pro", name: "Hunyuan Pro" },
    { id: "hunyuan-vision", name: "Hunyuan Vision" },
    { id: "hunyuan-functioncall", name: "Hunyuan FunctionCall" },
    { id: "hunyuan-lite", name: "Hunyuan Lite" },
  ],
};
