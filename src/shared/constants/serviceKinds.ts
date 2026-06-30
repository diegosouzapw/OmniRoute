/**
 * Service kind — declarative tag for what a provider can do beyond basic LLM chat.
 * Affects UI filtering and playground routing; does not influence request routing.
 *
 * This is a dependency-free leaf module to avoid circular imports between
 * providers.ts and providerSchema.ts.
 */

export type ServiceKind =
  | "llm"
  | "embedding"
  | "image"
  | "imageToText"
  | "tts"
  | "stt"
  | "webSearch"
  | "webFetch"
  | "video"
  | "music";

export const SERVICE_KIND_VALUES: readonly ServiceKind[] = [
  "llm",
  "embedding",
  "image",
  "imageToText",
  "tts",
  "stt",
  "webSearch",
  "webFetch",
  "video",
  "music",
];
