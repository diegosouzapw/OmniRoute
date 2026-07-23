import type { RegistryEntry } from "../../shared.ts";
import { resolvePublicCred } from "../../shared.ts";
import { xaiProvider } from "../xai/index.ts";

export const xai_oauthProvider: RegistryEntry = {
  id: "xai-oauth",
  alias: "xao",
  format: "openai",
  executor: "xai-oauth",
  baseUrl: xaiProvider.baseUrl,
  responsesBaseUrl: xaiProvider.responsesBaseUrl,
  authType: "oauth",
  authHeader: "bearer",
  passthroughModels: true,
  oauth: {
    clientIdEnv: "GROK_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("grok_id", "GROK_OAUTH_CLIENT_ID"),
    tokenUrl: "https://auth.x.ai/oauth2/token",
  },
  models: [
    { id: "grok-4.5", name: "Grok 4.5", contextLength: 500000 },
    ...(xaiProvider.models || []),
  ],
};
