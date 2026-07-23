import type { RegistryEntry } from "../../shared.ts";
import { DEVIN_MODEL_CATALOG } from "../devin/catalog.ts";

export const devin_cliProvider: RegistryEntry = {
  id: "devin-cli",
  alias: "dv",
  format: "openai",
  executor: "devin-cli",
  baseUrl: "devin://acp/stdio",
  authType: "oauth",
  authHeader: "Authorization",
  authPrefix: "Bearer ",
  defaultContextLength: 200000,
  models: DEVIN_MODEL_CATALOG,
};
