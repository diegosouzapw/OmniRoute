import type { RegistryEntry } from "../../../shared.ts";

export const qwen_webProvider: RegistryEntry = {
  id: "qwen-web",
  // Distinct alias: the primary "qwen" provider keeps the short "qw" alias;
  // this web/cookie variant is addressed by its own id.
  alias: "qwen-web",
  format: "openai",
  executor: "qwen-web",
  baseUrl: "https://chat.qwen.ai/api/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "qwen-plus", name: "Qwen Plus" },
    { id: "qwen-max", name: "Qwen Max" },
    { id: "qwen-turbo", name: "Qwen Turbo" },
    { id: "qwen3-plus", name: "Qwen3 Plus" },
    { id: "qwen3-max", name: "Qwen3 Max" },
    { id: "qwen3-flash", name: "Qwen3 Flash" },
    { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus" },
    { id: "qwen3-coder-flash", name: "Qwen3 Coder Flash" },
  ],
};
