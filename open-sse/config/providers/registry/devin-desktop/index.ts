import type { RegistryEntry } from "../../shared.ts";
import { DEVIN_MODEL_CATALOG } from "../devin/catalog.ts";

export const devin_desktopProvider: RegistryEntry = {
  id: "devin-desktop",
  format: "windsurf",
  executor: "devin-desktop",
  baseUrl: "https://server.codeium.com",
  authType: "oauth",
  authHeader: "Authorization",
  authPrefix: "Bearer ",
  defaultContextLength: 200000,
  models: DEVIN_MODEL_CATALOG,
};
