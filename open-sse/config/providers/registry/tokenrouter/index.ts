import type { RegistryEntry } from "../../shared.ts";

// TokenRouter (#3841) — OpenAI-compatible aggregator. Author @FerLuisxd confirmed
// Bearer auth, OpenAI-compatible, working `/v1/models`, and a free `minimax 3`
// model. Standard named OpenAI-style provider, zenmux shape.
//
// Seed list is a fallback ONLY — the provider is in NAMED_OPENAI_STYLE_PROVIDERS
// so `/models` serves the live upstream catalog and falls back here on error.
// `deepseek-v4-pro` / `deepseek-v4-flash` are REAL ids already used in production
// (they appear in the vision-bridge force-list added by #3946, @WormAlien);
// `minimax-3` is the free model the author cited. Base path confirmed live
// (returns a 401 OpenAI-style error body). Full upstream list pending a live key.
//
// Note: TokenRouter's deepseek models overstate vision support upstream and are
// already forced through the Vision Bridge (see visionBridgeDefaults.ts), so they
// are intentionally left without `supportsVision` here.
export const tokenrouterProvider: RegistryEntry = {
  id: "tokenrouter",
  alias: "trk",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.tokenrouter.com/v1/chat/completions",
  modelsUrl: "https://api.tokenrouter.com/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    { id: "minimax-3", name: "MiniMax 3 (free, TokenRouter)", contextLength: 128000, toolCalling: true },
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro (TokenRouter)",
      contextLength: 163840,
      toolCalling: true,
      supportsReasoning: true,
    },
    {
      id: "deepseek-v4-flash",
      name: "DeepSeek V4 Flash (TokenRouter)",
      contextLength: 163840,
      toolCalling: true,
      supportsReasoning: true,
    },
  ],
};
