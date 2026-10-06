/**
 * Provider-level image transport policy for loss-sensitive compression engines.
 *
 * `supportsVision` only says that a model can read images. OmniGlyph also needs
 * the PNG bytes and dimensions to survive the provider route unchanged. The
 * allowlist below contains only paths with an existing OmniRoute receipt;
 * everything else is deliberately classified as unknown and skipped.
 */

import type { ImageTransportFidelity } from "./engines/types.ts";

export type OmniGlyphTransportPolicy = {
  providerTransport: "direct" | "aggregator";
  imageTransportFidelity: ImageTransportFidelity;
};

const BYTE_PRESERVING_PROVIDERS = new Set(["anthropic", "claude"]);

export function resolveOmniGlyphTransport(
  provider: string | null | undefined
): OmniGlyphTransportPolicy {
  const normalized = typeof provider === "string" ? provider.trim().toLowerCase() : "";
  if (BYTE_PRESERVING_PROVIDERS.has(normalized)) {
    return {
      providerTransport: "direct",
      imageTransportFidelity: "byte-preserving",
    };
  }
  return {
    providerTransport: "aggregator",
    imageTransportFidelity: "unknown",
  };
}
