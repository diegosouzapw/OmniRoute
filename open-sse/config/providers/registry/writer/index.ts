import type { RegistryEntry } from "../../shared.ts";

export const writerProvider: RegistryEntry = {
  id: "writer",
  alias: "writer",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.writer.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "palmyra-x5", name: "Palmyra X5", contextLength: 1048576 },
    { id: "palmyra-x4", name: "Palmyra X4", contextLength: 131072 },
  ],
};
