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

/**
 * Bundled logo for a compatible provider node that carries no operator `icon_url`.
 *
 * WHY THIS EXISTS
 * ---------------
 * A compatible node's id is a generated UUID, so it matches no local SVG/PNG and no
 * LobeHub icon: `ProviderIcon`'s resolution chain runs out of tiers and draws its generic
 * circle-plus glyph. The providers page never showed that glyph — but only because it
 * hand-rolled this same mapping at its own call site, OUTSIDE the shared icon component.
 * The result was one node rendering a real logo on the providers page and a plus on the
 * home topology. Defining it once here lets every surface resolve it identically.
 *
 * Returns `null` for anything that is not a compatible node: a registry provider must keep
 * flowing through the normal chain, and handing it a compat image would mislabel it.
 *
 * `apiType` only separates the two OpenAI-compatible shapes. Both Anthropic-compatible
 * variants share one asset, and Claude-Code-compatible ids also start with the Anthropic
 * prefix, so that branch covers them without a separate case.
 */
export function resolveCompatibleStaticIcon(
  providerId: unknown,
  apiType?: string | null
): string | null {
  if (typeof providerId !== "string") return null;
  const id = providerId.trim();
  if (!id) return null;
  if (id.startsWith(ANTHROPIC_COMPATIBLE_PREFIX)) return "/providers/anthropic-m.png";
  if (id.startsWith(OPENAI_COMPATIBLE_PREFIX)) {
    return apiType === "responses" ? "/providers/oai-r.png" : "/providers/oai-cc.png";
  }
  return null;
}
