import type { RegistryEntry } from "../../shared.ts";

export const ant_lingProvider: RegistryEntry = {
  id: "ant-ling",
  alias: "ling",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.ant-ling.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    // Ids and casing come from Ant Ling's own docs: the quickstart sample uses
    // base_url "https://api.ant-ling.com/v1" with model "Ling-2.6-1T", and the
    // pricing page bills exactly these three. Ling-2.6-1T stays first so it
    // remains the provider default (flagship).
    //
    // The Ming family (Ming-Flash-Omni, Ming-Light) is deliberately NOT listed:
    // it is documented as open-source/Ling Studio only and does not appear on
    // the pricing page, i.e. it is not served over this chat-completions API.
    { id: "Ling-2.6-1T", name: "Ling 2.6 1T" },
    { id: "Ring-2.6-1T", name: "Ring 2.6 1T" },
    { id: "Ling-2.6-flash", name: "Ling 2.6 Flash" },
  ],
};
