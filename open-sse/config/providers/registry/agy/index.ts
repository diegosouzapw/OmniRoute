import type { RegistryEntry } from "../../shared.ts";
import {
  buildAntigravityUrl,
  ANTIGRAVITY_RUNTIME_BASE_URLS,
  AGY_PUBLIC_MODELS,
  getAntigravityProviderHeaders,
  resolvePublicCred,
} from "../../shared.ts";

export const agyProvider: RegistryEntry = {
  id: "agy",
  alias: "agy",
  format: "antigravity",
  executor: "antigravity",
  baseUrls: [...ANTIGRAVITY_RUNTIME_BASE_URLS],
  urlBuilder: buildAntigravityUrl,
  authType: "oauth",
  authHeader: "bearer",
  headers: getAntigravityProviderHeaders("cli"),
  oauth: {
    clientIdEnv: "ANTIGRAVITY_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("antigravity_id"),
    clientSecretEnv: "ANTIGRAVITY_OAUTH_CLIENT_SECRET",
    clientSecretDefault: resolvePublicCred("antigravity_alt"),
  },
  models: [...AGY_PUBLIC_MODELS],
  passthroughModels: true,
};
