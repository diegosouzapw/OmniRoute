export const MODEL_SUPPORTED_ENDPOINT_VALUES = [
  "chat",
  "embeddings",
  "rerank",
  "images",
  "videos",
  "audio-speech",
  "audio-transcriptions",
  "images-generations",
  "systemone",
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
  type?: "embedding" | "rerank" | "image" | "video" | "audio" | "systemone";
  subtype?: "speech" | "transcription";
} {
  if (endpoints.includes("embeddings")) return { type: "embedding" };
  if (endpoints.includes("rerank")) return { type: "rerank" };
  if (endpoints.includes("images")) return { type: "image" };
  if (endpoints.includes("systemone")) return { type: "systemone" };
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
