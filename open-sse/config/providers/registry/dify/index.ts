import type { RegistryEntry } from "../../shared.ts";

export const difyProvider: RegistryEntry = {
  id: "dify",
  alias: "dify",
  format: "openai",
  executor: "default",
  // Dify does not serve /chat/completions — its native completion route is
  // POST /v1/chat-messages (validated via the dedicated dify validator, #11002).
  // Keep this as the bare API root so route suffixes build correctly and
  // self-hosted instances can override the base URL per connection.
  baseUrl: "https://api.dify.ai",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "auto", name: "Auto" }],
};
