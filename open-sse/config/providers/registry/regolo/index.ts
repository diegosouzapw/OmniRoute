import type { RegistryEntry } from "../../shared.ts";

export const regoloProvider: RegistryEntry = {
  id: "regolo",
  alias: "regolo",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.regolo.ai",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "regolo-chat", name: "Regolo Chat" },
    { id: "regolo-fast", name: "Regolo Fast" },
  ],
  passthroughModels: true,
};
