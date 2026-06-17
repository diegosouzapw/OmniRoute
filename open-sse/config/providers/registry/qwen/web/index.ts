import type { RegistryEntry } from "../../../shared.ts";

export const qwen_webProvider: RegistryEntry = {
  id: "qwen-web",
  // Distinct alias: the primary "qwen" provider keeps the short "qw" alias;
  // this web/cookie variant is addressed by its own id.
  alias: "qwen-web",
  format: "openai",
  executor: "qwen-web",
  // v2 API (the legacy /api/chat/completions endpoint was retired upstream).
  // Restored after the registry modularization (#3993) regressed this to v1 with
  // a retired catalog. Source of truth: pre-#3993 providerRegistry.ts (commit 1ed01dd90^).
  baseUrl: "https://chat.qwen.ai/api/v2/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Current upstream catalog (GET https://chat.qwen.ai/api/models). Legacy
  // ids (qwen-plus, qwen3-max, ...) still resolve via the executor's
  // MODEL_ALIASES map for backward compatibility.
  models: [
    { id: "qwen3.7-max", name: "Qwen3.7 Max" },
    { id: "qwen3.7-plus", name: "Qwen3.7 Plus" },
    { id: "qwen3.6-plus", name: "Qwen3.6 Plus" },
  ],
};
