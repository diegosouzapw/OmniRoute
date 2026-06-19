/**
 * Media serviceKinds — derived from the backend registries.
 *
 * The dashboard's `/dashboard/media-providers/[kind]` pages list a provider
 * under a media kind when the provider supports it. Historically this relied on
 * a hand-maintained `serviceKinds` array on every provider in providers.ts,
 * which had drifted badly: ~48 providers were wired into the audio/video/music/
 * image/embedding registries (backend works) but declared no `serviceKinds`, so
 * they never appeared in the UI.
 *
 * This module makes the registries the single source of truth: a provider that
 * appears as a key in a media registry supports that kind, full stop. The UI
 * derives membership from here instead of duplicating it by hand, so adding a
 * provider to a registry automatically surfaces it — no second edit, no drift.
 *
 * Kinds without a backing registry (imageToText, webSearch, webFetch, llm) are
 * still declared explicitly via `serviceKinds` on the provider entry; callers
 * union the two sources.
 */
import {
  AUDIO_TRANSCRIPTION_PROVIDERS,
  AUDIO_SPEECH_PROVIDERS,
} from "./audioRegistry.ts";
import { VIDEO_PROVIDERS } from "./videoRegistry.ts";
import { MUSIC_PROVIDERS } from "./musicRegistry.ts";
import { IMAGE_PROVIDERS } from "./imageRegistry.ts";
import { EMBEDDING_PROVIDERS } from "./embeddingRegistry.ts";

/** Media kinds whose provider membership is defined by a backend registry. */
export const MEDIA_KIND_REGISTRIES = {
  stt: AUDIO_TRANSCRIPTION_PROVIDERS,
  tts: AUDIO_SPEECH_PROVIDERS,
  video: VIDEO_PROVIDERS,
  music: MUSIC_PROVIDERS,
  image: IMAGE_PROVIDERS,
  embedding: EMBEDDING_PROVIDERS,
} as const satisfies Record<string, Record<string, unknown>>;

export type RegistryMediaKind = keyof typeof MEDIA_KIND_REGISTRIES;

export const REGISTRY_MEDIA_KINDS: readonly RegistryMediaKind[] = Object.freeze(
  Object.keys(MEDIA_KIND_REGISTRIES) as RegistryMediaKind[]
);

/**
 * Media serviceKinds a provider supports, derived from the backend registries.
 * Returns the kinds (e.g. `["tts","video","music"]`) for which `providerId`
 * appears as a registry key. Empty array if the provider serves no media.
 */
export function getRegistryMediaKinds(providerId: string): RegistryMediaKind[] {
  const kinds: RegistryMediaKind[] = [];
  for (const kind of REGISTRY_MEDIA_KINDS) {
    if (Object.prototype.hasOwnProperty.call(MEDIA_KIND_REGISTRIES[kind], providerId)) {
      kinds.push(kind);
    }
  }
  return kinds;
}

/**
 * Full set of serviceKinds for a provider: the explicitly declared ones (llm,
 * web*, imageToText) unioned with the media kinds derived from the registries.
 */
export function resolveProviderServiceKinds(
  providerId: string,
  declared: readonly string[] | undefined
): string[] {
  const set = new Set<string>(declared ?? []);
  for (const kind of getRegistryMediaKinds(providerId)) set.add(kind);
  return [...set];
}
