import type { RegistryEntry } from "../../shared.ts";

// ClinePass — Cline's $9.99/mo BYOK API-key gateway (https://cline.bot). Distinct
// from the OAuth `cline` provider: same host (api.cline.bot) but a plain Bearer
// API key and the `cline-pass/*` model namespace. OpenAI-compat proxy to
// https://api.cline.bot/api/v1. Responses are wrapped in a {success, data}
// envelope — unwrapped by open-sse/utils/clinepassEnvelope.ts.

export const clinepassProvider: RegistryEntry = {
  id: "clinepass",
  alias: "clinepass",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.cline.bot/api/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  extraHeaders: {
    "HTTP-Referer": "https://cline.bot",
    "X-Title": "Cline",
  },
  // passthroughModels: true keeps the catalog fresh via live /v1/models
  // discovery at runtime instead of baking a static model list.
  models: [],
  passthroughModels: true,
};