import type { RegistryEntry } from "../../shared.ts";
import { resolvePublicCred } from "../../shared.ts";
import { FACTORY_MODELS } from "../../../factoryModels.ts";

export const factoryProvider: RegistryEntry = {
  id: "factory",
  alias: "factory",
  format: "openai",
  executor: "factory",
  authType: "oauth",
  authHeader: "bearer",
  passthroughModels: true,
  liveCatalogAuthoritative: false,
  oauth: {
    clientIdEnv: "FACTORY_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("factory_id", "FACTORY_OAUTH_CLIENT_ID"),
    tokenUrl: "https://api.workos.com/user_management/authenticate",
  },
  models: FACTORY_MODELS,
};
