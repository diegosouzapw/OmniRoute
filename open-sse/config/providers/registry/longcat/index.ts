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
  // Sweep 2026-06-30: the LongCat-Flash-* line was retired 2026-05-29 and the Preview
  // ended; current docs (longcat.chat/platform/docs) expose only the GA LongCat-2.0
  // (1M context, 128K max output). Free tier is a ONE-TIME 10M-token grant unlocked
  // after account signup + KYC verification — NOT a recurring daily/monthly allowance.
  // Beyond the free quota it is pay-as-you-go (see providerCostData).
  models: [
    {
      id: "LongCat-2.0",
      name: "LongCat 2.0 (10M tok free 🆓)",
      contextLength: 1048576,
    },
  ],
};
