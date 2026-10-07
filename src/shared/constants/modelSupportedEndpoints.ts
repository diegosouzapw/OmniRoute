export const MODEL_SUPPORTED_ENDPOINT_VALUES = [
  "chat",
  "embeddings",
  "rerank",
  "images",
  "videos",
  "audio-speech",
  "audio-transcriptions",
  "images-generations",
  // Persisted legacy values remain valid input and normalize on write/edit.
  "video",
  "audio",
] as const;

export type ModelSupportedEndpoint = (typeof MODEL_SUPPORTED_ENDPOINT_VALUES)[number];

export function normalizeModelSupportedEndpoints(endpoints: readonly string[]): string[] {
  const normalized: string[] = [];
  const add = (endpoint: string) => {
    if (!normalized.includes(endpoint)) normalized.push(endpoint);
  };

  for (const endpoint of endpoints) {
    if (endpoint === "video") {
      add("videos");
    } else if (endpoint === "audio") {
      add("audio-speech");
      add("audio-transcriptions");
    } else {
      add(endpoint);
    }
  }
  return normalized;
}

export function classifyModelSupportedEndpoints(endpoints: readonly string[]): {
  type?: "embedding" | "rerank" | "image" | "video" | "audio";
  subtype?: "speech" | "transcription";
} {
  if (endpoints.includes("embeddings")) return { type: "embedding" };
  if (endpoints.includes("rerank")) return { type: "rerank" };
  if (endpoints.includes("images")) return { type: "image" };
  if (endpoints.includes("videos") || endpoints.includes("video")) return { type: "video" };

  const supportsSpeech = endpoints.includes("audio-speech");
  const supportsTranscription =
    endpoints.includes("audio-transcriptions") || endpoints.includes("audio");
  if (!supportsSpeech && !supportsTranscription) return {};
  if (supportsSpeech && !supportsTranscription) return { type: "audio", subtype: "speech" };
  if (supportsTranscription && !supportsSpeech) {
    return { type: "audio", subtype: "transcription" };
  }
  return { type: "audio" };
}

/**
 * Default `supportedEndpoints` for a model row discovered from (or added to) an
 * OpenAI-compatible provider node, derived from the node's `apiType`.
 *
 * A node typed `embeddings` or `rerank` (or an audio/image type) serves exactly that
 * modality, so a row with no explicit endpoint metadata — the common case, since local
 * `/v1/models` listings rarely carry any — should inherit the node's modality rather
 * than the historical `["chat"]` default, which misrepresented e.g. `bge-m3` as a chat
 * model in `/v1/models`. Chat/Responses nodes (and unknown types) keep `["chat"]`.
 */
export function defaultEndpointsForProviderNodeApiType(
  apiType: string | null | undefined
): ModelSupportedEndpoint[] {
  switch ((apiType || "").trim().toLowerCase()) {
    case "embeddings":
      return ["embeddings"];
    case "rerank":
      return ["rerank"];
    case "audio-speech":
      return ["audio-speech"];
    case "audio-transcriptions":
      return ["audio-transcriptions"];
    case "images-generations":
      return ["images"];
    default:
      return ["chat"];
  }
}
