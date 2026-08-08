/**
 * Shared provider-node resolution for the audio routes
 * (`/v1/audio/transcriptions`, `/v1/audio/speech`, `/v1/audio/translations`).
 *
 * The three routes each carried an identical copy of this filter, and every copy
 * accepted only nodes typed `chat`/`responses` — so a node explicitly typed
 * `audio-transcriptions` was rejected by the very route it exists for, and its
 * models fell through to the hardcoded registry's bare-id lookup (where an
 * unrelated provider owning a model literally named `whisper` silently won).
 *
 * Two axes are resolved here:
 *
 * 1. **apiType** — a node qualifies when its type matches the route's own audio
 *    type, or when it is a general `chat`/`responses` node (a multimodal gateway
 *    that serves audio on the same base URL).
 *
 * 2. **host** — loopback/private nodes are always eligible. Remote nodes are
 *    opt-in via `AUDIO_REMOTE_PROVIDER_NODES`, default OFF: routing audio to an
 *    arbitrary remote host changes egress identity, so it must be an explicit
 *    operator decision rather than a silent default (cf. #3963).
 */

import { getCachedProviderNodes } from "@/lib/db/readCache";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import {
  buildDynamicAudioProvider,
  isLoopbackNodeHost,
  type AudioProvider,
  type ProviderNodeRow,
} from "@omniroute/open-sse/config/audioRegistry.ts";

/** Feature flag gating remote (non-loopback) audio provider nodes. Default OFF. */
export const AUDIO_REMOTE_NODES_FLAG = "AUDIO_REMOTE_PROVIDER_NODES";

/**
 * Loopback / private-range hosts that never leave the operator's machine or
 * Docker network. `::1` stays excluded, matching the previous SSRF hardening.
 */
export { isLoopbackNodeHost as isLocalAudioNodeHost };

/**
 * Pure selection step — no DB, no flag lookup, so the policy is directly testable.
 *
 * @param nodes       provider_node rows
 * @param audioPath   endpoint suffix, e.g. "/audio/transcriptions"
 * @param nodeApiType the audio apiType this route serves, e.g. "audio-transcriptions"
 * @param allowRemote whether non-loopback nodes are eligible (feature-flagged)
 */
export function selectAudioProviderNodes(
  nodes: ProviderNodeRow[],
  {
    audioPath,
    nodeApiType,
    allowRemote,
  }: { audioPath: string; nodeApiType: string; allowRemote: boolean }
): AudioProvider[] {
  const eligible = nodes.filter((node) => {
    // A node qualifies on its own audio type, or as a general chat/responses
    // gateway that also serves audio on the same base URL.
    if (node.apiType !== nodeApiType && node.apiType !== "chat" && node.apiType !== "responses") {
      return false;
    }
    if (!node.baseUrl) return false;
    return isLoopbackNodeHost(node.baseUrl) || allowRemote;
  });

  const providers: AudioProvider[] = [];
  for (const node of eligible) {
    const byPrefix = buildDynamicAudioProvider(node, audioPath);
    providers.push(byPrefix);
    // A node is addressable two ways: by its `prefix` (what a human types) and by
    // its row id (what combos and /v1/models store). Registering only the prefix
    // made the id form — which the catalog itself advertises, and which combo
    // expansion produces — parse as an unknown provider and 400.
    if (node.id && node.id !== node.prefix) {
      providers.push({ ...byPrefix, id: node.id });
    }
  }
  return providers;
}

/**
 * Load provider nodes and resolve the ones this audio route may use.
 * Never throws — a DB failure degrades to the hardcoded registry only.
 */
export async function resolveDynamicAudioProviders(
  audioPath: string,
  nodeApiType: string
): Promise<AudioProvider[]> {
  try {
    const nodes = await getCachedProviderNodes();
    if (!Array.isArray(nodes)) return [];
    let allowRemote = false;
    try {
      allowRemote = isFeatureFlagEnabled(AUDIO_REMOTE_NODES_FLAG);
    } catch {
      // Fail closed: an unreadable flag store keeps remote nodes disabled.
      allowRemote = false;
    }
    return selectAudioProviderNodes(nodes as unknown as ProviderNodeRow[], {
      audioPath,
      nodeApiType,
      allowRemote,
    });
  } catch {
    return [];
  }
}
