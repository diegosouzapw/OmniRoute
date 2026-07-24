/**
 * Single source of truth for recognizing a "compatible provider" connection
 * ID — the dynamic IDs generated for openai-compatible / anthropic-compatible
 * custom nodes (src/app/api/provider-nodes/route.ts).
 *
 * Generated shapes (all four must match):
 *   - openai-compatible-chat-<uuid>
 *   - openai-compatible-responses-<uuid>
 *   - anthropic-compatible-<uuid>
 *   - anthropic-compatible-cc-<uuid>
 *
 * Built from the same prefix constants used at ID-generation time
 * (src/shared/constants/providers.ts) so the generator and the validator can
 * never drift apart again. See #8326: the previous inline regex required a
 * literal "-chat-" segment, rejecting 3 of the 4 shapes the system actually
 * generates.
 *
 * @module shared/utils/compatibleProviderId
 */

import { OPENAI_COMPATIBLE_PREFIX, ANTHROPIC_COMPATIBLE_PREFIX } from "@/shared/constants/providers";

const COMPATIBLE_PROVIDER_ID_PATTERN = new RegExp(
  `^(?:${OPENAI_COMPATIBLE_PREFIX}(?:chat|responses)-|${ANTHROPIC_COMPATIBLE_PREFIX}(?:cc-)?)[0-9a-f-]+$`,
  "i"
);

/**
 * True when `providerId` matches one of the four generated compatible-
 * provider connection ID shapes. Rejects plain built-in provider IDs (e.g.
 * "openai", "anthropic") and unrelated look-alikes (e.g.
 * "custom-compatible-chat-...").
 */
export function isCompatibleProviderConnectionId(providerId: string | null | undefined): boolean {
  return typeof providerId === "string" && COMPATIBLE_PROVIDER_ID_PATTERN.test(providerId);
}
