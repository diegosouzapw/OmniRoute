import type { RegistryEntry } from "../../shared.ts";
import {
  getAnthropicCompatHeaders,
  ANTHROPIC_VERSION_HEADER
} from "../../shared.ts";

export const minimaxProvider: RegistryEntry = {
  id: "minimax",
  alias: "minimax",
  format: "claude",
  executor: "default",
  baseUrl: "https://api.minimax.io/anthropic/v1/messages",
  urlSuffix: "?beta=true",
  authType: "apikey",
  authHeader: "bearer",
  headers: getAnthropicCompatHeaders(),
  models: [
    // T12/T28: MiniMax default upgraded from M2.5 to M2.7
    // #3110: MiniMax M3 — frontier coding model with 1M context
    { id: "MiniMax-M3", name: "MiniMax M3", contextLength: 1048576, supportsVision: true },
    { id: "MiniMax-M2.7", name: "MiniMax M2.7" },
    { id: "MiniMax-M2.7-highspeed", name: "MiniMax M2.7 Highspeed" },
    { id: "MiniMax-M2.5", name: "MiniMax M2.5" },
    { id: "MiniMax-M2.5-highspeed", name: "MiniMax M2.5 Highspeed" },
  ],
};
