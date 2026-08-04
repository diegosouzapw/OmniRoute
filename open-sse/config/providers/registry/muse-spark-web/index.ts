import type { RegistryEntry } from "../../shared.ts";

export const muse_spark_webProvider: RegistryEntry = {
  id: "muse-spark-web",
  alias: "ms-web",
  format: "openai",
  executor: "muse-spark-web",
  baseUrl: "https://www.meta.ai/api/graphql",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "muse-spark", name: "Muse Spark", toolCalling: false },
    {
      id: "muse-spark-thinking",
      name: "Muse Spark Thinking",
      supportsReasoning: true,
    },
    {
      id: "muse-spark-contemplating",
      name: "Muse Spark Contemplating",
      supportsReasoning: true,
    },
  ],
};
