import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Yolo-Auto - OpenAI-compatible API with a request-limited free tier.
 *
 * The catalog is kept intentionally small: the documented free-tier model is
 * seeded while passthrough discovery allows the service to publish updates.
 */
export const yoloAutoProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "yolo-auto",
  alias: "yolo-auto",
  baseUrl: "https://yolo-auto.com/v1/chat/completions",
  modelsUrl: "https://yolo-auto.com/v1/models",
  models: [{ id: "qwen3.6-35b-a3b", name: "Qwen 3.6 35B A3B" }],
  passthroughModels: true,
});
