import { z } from "zod";

type JsonRecord = Record<string, unknown>;

const ollamaShowResponseSchema = z
  .object({
    capabilities: z.array(z.string().max(64)).max(32).optional(),
  })
  .passthrough();

const OLLAMA_CAPABILITY_TO_ENDPOINT: Readonly<Record<string, string>> = {
  completion: "chat",
  embedding: "embeddings",
  image: "images",
};

const MAX_CONCURRENT_SHOW_REQUESTS = 4;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function buildOllamaShowUrl(openAiBaseUrl: string): string {
  let base = openAiBaseUrl.trim();
  while (base.endsWith("/")) base = base.slice(0, -1);
  base = base.replace(/\/(?:chat\/completions|completions|embeddings|images\/generations)$/i, "");
  if (base.endsWith("/v1")) base = base.slice(0, -3);
  return `${base}/api/show`;
}

export function applyOllamaShowCapabilities(model: unknown, showResponse: unknown): JsonRecord {
  const record = asRecord(model);
  const parsed = ollamaShowResponseSchema.safeParse(showResponse);
  if (!parsed.success || !parsed.data.capabilities) return record;

  const capabilities = Array.from(
    new Set(parsed.data.capabilities.map((value) => value.trim().toLowerCase()).filter(Boolean))
  );
  const supportedEndpoints = Array.from(
    new Set(
      capabilities
        .map((capability) => OLLAMA_CAPABILITY_TO_ENDPOINT[capability])
        .filter((endpoint): endpoint is string => Boolean(endpoint))
    )
  );
  if (supportedEndpoints.length === 0) return record;

  const apiFormat = supportedEndpoints.includes("chat")
    ? "chat-completions"
    : supportedEndpoints.includes("embeddings")
      ? "embeddings"
      : "images-generations";

  return {
    ...record,
    apiFormat,
    supportedEndpoints,
    ...(capabilities.includes("vision") ? { supportsVision: true } : {}),
    ...(capabilities.includes("tools") ? { supportsTools: true } : {}),
    ...(capabilities.includes("thinking") ? { supportsThinking: true } : {}),
  };
}

export async function enrichOllamaModelsWithCapabilities(
  models: unknown[],
  fetchShow: (modelId: string) => Promise<unknown | null>
): Promise<JsonRecord[]> {
  const output: JsonRecord[] = new Array(models.length);
  let nextIndex = 0;

  const worker = async () => {
    while (nextIndex < models.length) {
      const index = nextIndex++;
      const model = asRecord(models[index]);
      const modelId =
        typeof model.id === "string"
          ? model.id
          : typeof model.name === "string"
            ? model.name
            : typeof model.model === "string"
              ? model.model
              : null;
      if (!modelId) {
        output[index] = model;
        continue;
      }
      try {
        output[index] = applyOllamaShowCapabilities(model, await fetchShow(modelId));
      } catch {
        output[index] = model;
      }
    }
  };

  const workerCount = Math.min(MAX_CONCURRENT_SHOW_REQUESTS, Math.max(1, models.length));
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return output;
}
