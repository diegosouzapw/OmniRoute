import type { RegistryEntry } from "../../shared.ts";

export const venice_webProvider: RegistryEntry = {
  id: "venice-web",
  alias: "venice",
  format: "openai",
  executor: "venice-web",
  baseUrl: "https://venice.ai",
  models: [{ id: "venice-default", name: "Venice Default" }],
  defaultModel: "venice-default",
  auth: "cookie",
};
