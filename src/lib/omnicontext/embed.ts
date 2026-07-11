/**
 * OmniContext embedding resolver.
 * Default: deterministic local hash (offline, no network).
 * Opt-in `embedSource: "memory-auto"`: reuse Memory `embed()` stack, fall back to hash.
 * Vectors stay in `omnicontext_artifact_embeddings` — never written to `vec_memories`.
 */
import type { MemorySettingsExtended } from "@/shared/schemas/memory";
import { embed } from "@/lib/memory/embedding";
import { getMemorySettings } from "@/lib/memory/settings";
import { getOmniContextSettings, DEFAULT_OMNICONTEXT_SETTINGS } from "./settings";
import { localHashEmbed, LOCAL_EMBED_MODEL } from "./localEmbed";
import type { OmniContextEmbedSource } from "./types";

export interface OmniContextEmbedResult {
  vector: number[];
  model: string;
  source: OmniContextEmbedSource | "local-fallback";
}

function memoryModelTag(source: string, model: string): string {
  return `memory:${source}:${model}`;
}

/** Sync local-only embed (tests + default path). */
export function embedLocalHash(text: string): OmniContextEmbedResult {
  return {
    vector: localHashEmbed(text),
    model: LOCAL_EMBED_MODEL,
    source: "local",
  };
}

/**
 * Resolve embedding for OmniContext index/query.
 * Fail-open to local hash when Memory has no source or embed errors.
 */
export async function embedForOmniContext(text: string): Promise<OmniContextEmbedResult> {
  const settings = await getOmniContextSettings().catch(() => DEFAULT_OMNICONTEXT_SETTINGS);
  if (settings.embedSource !== "memory-auto") {
    return embedLocalHash(text);
  }

  try {
    const memorySettings = await getMemorySettings();
    const result = await embed(text, memorySettings as MemorySettingsExtended);
    if ("vector" in result && Array.isArray(result.vector) && result.vector.length > 0) {
      return {
        vector: result.vector,
        model: memoryModelTag(result.source, result.model || "unknown"),
        source: "memory-auto",
      };
    }
  } catch {
    /* fall through to local hash */
  }

  return {
    ...embedLocalHash(text),
    source: "local-fallback",
  };
}
