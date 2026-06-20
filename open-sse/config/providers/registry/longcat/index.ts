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
  // Sweep 2026-06-19: the LongCat-Flash-* line was officially retired 2026-05-29; the
  // current docs (longcat.chat/platform/docs) expose only LongCat-2.0-Preview.
  models: [
    {
      id: "LongCat-2.0-Preview",
      name: "LongCat 2.0 Preview (10M tok/day 🆓)",
      contextLength: 1048576,
    },
  ],
};
