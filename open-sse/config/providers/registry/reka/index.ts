import type { RegistryEntry } from "../../shared.ts";

export const rekaProvider: RegistryEntry = {
  id: "reka",
  alias: "reka",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.reka.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "reka-flash", name: "Reka Flash" },
    { id: "reka-flash-3", name: "Reka Flash 3" },
    { id: "reka-edge-2603", name: "Reka Edge 2603" },
  ],
};
