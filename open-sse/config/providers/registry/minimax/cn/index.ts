import type { RegistryEntry } from "../../../shared.ts";

export const minimax_cnProvider: RegistryEntry = {
  id: "minimax-cn",
  alias: "minimax-cn", // unique alias (was colliding with minimax)
  format: "openai",
  executor: "default",
  baseUrl: "https://api.minimaxi.com/v1/chat/completions",
  modelsUrl: "https://api.minimaxi.com/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    // Keep parity with minimax to ensure model discovery works for minimax-cn connections.
    // #3110: MiniMax M3 — frontier coding model with 1M context
    { id: "MiniMax-M3", name: "MiniMax M3", contextLength: 1048576, supportsVision: true },
    { id: "MiniMax-M2.7", name: "MiniMax M2.7" },
    { id: "MiniMax-M2.7-highspeed", name: "MiniMax M2.7 Highspeed" },
    { id: "MiniMax-M2.5", name: "MiniMax M2.5" },
    { id: "MiniMax-M2.5-highspeed", name: "MiniMax M2.5 Highspeed" },
  ],
};
