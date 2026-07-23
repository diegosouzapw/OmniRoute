import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const databricksProvider: RegistryEntry = {
  id: "databricks",
  alias: "databricks",
  format: "openai",
  executor: "default",
  baseUrl: "https://adb-0000000000000000.0.azuredatabricks.net/serving-endpoints",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.databricks,
};
