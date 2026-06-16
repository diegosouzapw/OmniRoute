import type { RegistryEntry } from "../../shared.ts";

export const longcatProvider: RegistryEntry = {
  id: "longcat",
  alias: "lc",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.longcat.chat/openai/v1/chat/completions",
  authType: "apikey",
  authHeader: "Authorization",
  authPrefix: "Bearer",
  // Free tier: 50M tokens/day (Flash-Lite) + 500K/day (Chat/Thinking) — 100% free while public beta
  models: [
    { id: "LongCat-Flash-Lite", name: "LongCat Flash-Lite (50M tok/day 🆓)" },
    { id: "LongCat-Flash-Chat", name: "LongCat Flash-Chat (500K tok/day 🆓)" },
    { id: "LongCat-Flash-Thinking", name: "LongCat Flash-Thinking (500K tok/day 🆓)" },
    { id: "LongCat-Flash-Omni-2603", name: "LongCat Flash-Omni-2603 (500K tok/day 🆓)" },
    //{ id: "LongCat-2.0-Preview", name: "LongCat 2.0 Preview (10M tok/day 🆓)" },
  ],
};
