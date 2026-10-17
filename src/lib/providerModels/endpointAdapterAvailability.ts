/**
 * Provider endpoint adapter evidence (#16929).
 *
 * A model can advertise an endpoint without OmniRoute having a handler for it.
 * Static registrations are positive evidence. Unknown dynamic/gateway providers
 * remain "unknown", not falsely labeled supported or rejected.
 */
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry";
import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry";
import { getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry";
import { getImageProvider } from "@omniroute/open-sse/config/imageRegistry";
import { getVideoProvider } from "@omniroute/open-sse/config/videoRegistry";
import { getMusicProvider } from "@omniroute/open-sse/config/musicRegistry";
import { getSpeechProvider, getTranscriptionProvider } from "@omniroute/open-sse/config/audioRegistry";

export type EndpointAdapterStatus = "available" | "unavailable" | "unknown";
export type EndpointAdapterStatuses = Record<string, EndpointAdapterStatus>;

export function getRegisteredEndpointAdapterStatuses(provider: string): EndpointAdapterStatuses {
  const hasChatRegistry = Boolean(getRegistryEntry(provider));
  const status = (present: boolean, knownAbsent = false): EndpointAdapterStatus =>
    present ? "available" : knownAbsent ? "unavailable" : "unknown";
  const audioMissing = hasChatRegistry;
  return {
    chat: status(hasChatRegistry),
    responses: status(hasChatRegistry),
    embeddings: status(Boolean(getEmbeddingProvider(provider))),
    rerank: status(Boolean(getRerankProvider(provider))),
    images: status(Boolean(getImageProvider(provider))),
    "images-generations": status(Boolean(getImageProvider(provider))),
    videos: status(Boolean(getVideoProvider(provider))),
    music: status(Boolean(getMusicProvider(provider)), hasChatRegistry),
    "audio-speech": status(Boolean(getSpeechProvider(provider)), audioMissing),
    "audio-transcriptions": status(Boolean(getTranscriptionProvider(provider)), audioMissing),
  };
}
