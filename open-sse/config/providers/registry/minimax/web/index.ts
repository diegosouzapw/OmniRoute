import type { RegistryEntry } from "../../../shared.ts";

export const HAILUO_WEB_STATIC_MODELS = [
  // The Hailuo web client does not expose a model selector in its chat API —
  // one default assistant persona (characterID) handles every request. See
  // open-sse/executors/hailuo-web.ts for the ported g4f protocol details.
  { id: "hailuo", name: "Hailuo (MiniMax)" },
];

export const hailuo_webProvider: RegistryEntry = {
  id: "hailuo-web",
  // Distinct alias: the paid API-key "minimax"/"minimax-cn" providers
  // (../../minimax/index.ts) keep their own short alias; this free web/cookie
  // variant is addressed by its own id, per the established kimi-web/qwen-web
  // secondary-variant convention (tests/unit/provider-alias-uniqueness.test.ts).
  alias: "hailuo-web",
  format: "openai",
  executor: "hailuo-web",
  baseUrl: "https://www.hailuo.ai",
  authType: "apikey",
  authHeader: "bearer",
  models: HAILUO_WEB_STATIC_MODELS,
};
