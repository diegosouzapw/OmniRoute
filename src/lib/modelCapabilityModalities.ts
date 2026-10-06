import type { ModelSpec } from "@/shared/constants/modelSpecs";

type ModalityName = "audio" | "video";
type ModalityCapabilityKey = "supportsAudio" | "supportsVideo";

function resolveInputModalityCapability(
  modality: ModalityName,
  capabilityKey: ModalityCapabilityKey,
  spec: Pick<ModelSpec, ModalityCapabilityKey> | undefined,
  registryModel: Partial<Record<ModalityCapabilityKey, boolean>> | null,
  modalitiesInput: readonly string[]
): boolean | null {
  const registryValue = registryModel?.[capabilityKey];
  if (typeof registryValue === "boolean") return registryValue;
  const specValue = spec?.[capabilityKey];
  if (typeof specValue === "boolean") return specValue;
  if (modalitiesInput.length === 0) return null;
  return modalitiesInput.some((entry) => String(entry).toLowerCase().includes(modality));
}

export function resolveAudioCapability(
  spec: Pick<ModelSpec, "supportsAudio"> | undefined,
  registryModel: { supportsAudio?: boolean } | null,
  modalitiesInput: readonly string[]
): boolean | null {
  return resolveInputModalityCapability(
    "audio",
    "supportsAudio",
    spec,
    registryModel,
    modalitiesInput
  );
}

export function resolveVideoCapability(
  spec: Pick<ModelSpec, "supportsVideo"> | undefined,
  registryModel: { supportsVideo?: boolean } | null,
  modalitiesInput: readonly string[]
): boolean | null {
  return resolveInputModalityCapability(
    "video",
    "supportsVideo",
    spec,
    registryModel,
    modalitiesInput
  );
}
