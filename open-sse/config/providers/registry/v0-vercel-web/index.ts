import type { RegistryEntry } from "../../shared.ts";

export const v0_vercel_webProvider: RegistryEntry = {
  id: "v0-vercel-web",
  alias: "v0",
  format: "openai",
  executor: "v0-vercel-web",
  baseUrl: "https://v0.dev",
  models: [{ id: "v0-default", name: "v0 Default" }],
  defaultModel: "v0-default",
  auth: "cookie",
};
