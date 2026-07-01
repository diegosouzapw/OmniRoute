import { isVisionModelId } from "@/shared/constants/visionModels";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";

export { isVisionModelId };

export function buildVisionCapabilityFields(supportsVision: boolean | null | undefined) {
  if (supportsVision !== true) return null;
  return {
    capabilities: { vision: true },
    input_modalities: ["text", "image"],
    output_modalities: ["text"],
  };
}

export function getResolvedVisionCapabilityFields(providerId: string, modelId: string) {
  const resolved = getResolvedModelCapabilities({ provider: providerId, model: modelId });
  return buildVisionCapabilityFields(resolved.supportsVision);
}

function getEntryVisionCapability(entry: Record<string, unknown> | null | undefined) {
  if (!entry) return undefined;
  const overrides =
    entry.capabilityOverrides && typeof entry.capabilityOverrides === "object"
      ? (entry.capabilityOverrides as Record<string, unknown>)
      : null;
  if (overrides && Object.prototype.hasOwnProperty.call(overrides, "supportsVision")) {
    return overrides.supportsVision === null ? null : overrides.supportsVision;
  }
  const capabilities =
    entry.capabilities && typeof entry.capabilities === "object"
      ? (entry.capabilities as Record<string, unknown>)
      : null;
  if (capabilities && Object.prototype.hasOwnProperty.call(capabilities, "supportsVision")) {
    return capabilities.supportsVision === null ? null : capabilities.supportsVision;
  }
  if (Object.prototype.hasOwnProperty.call(entry, "supportsVision")) {
    return entry.supportsVision === null ? null : entry.supportsVision;
  }
  return undefined;
}

/** Vision fields for custom chat models; explicit supportsVision always wins. */
export function getCustomVisionCapabilityFields(
  entry: Record<string, unknown> | null | undefined,
  ...candidateIds: Array<string | null | undefined>
): {
  capabilities: { vision: true };
  input_modalities: string[];
  output_modalities: string[];
} | null {
  const explicit = getEntryVisionCapability(entry);
  if (explicit === true) return buildVisionCapabilityFields(true);
  if (explicit === false || explicit === null) return null;
  return candidateIds.some((id) => (id ? isVisionModelId(id) : false))
    ? buildVisionCapabilityFields(true)
    : null;
}
