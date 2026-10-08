type JsonRecord = Record<string, unknown>;

export const REASONING_CONTROL_DETECTOR_VERSION = 2;
export const REASONING_CONTROL_DETECTION_SOURCE = "models.data.effective_owned_by";
export const REASONING_CONTROL_MAX_MODELS = 10_000;

export const REASONING_CONTROL_DETECTED_BACKENDS = new Set(["vllm", "sglang", "llamacpp"]);

export type DetectedReasoningControl = {
  mode: "chat-template";
  modelBackends: Record<string, string>;
  source: typeof REASONING_CONTROL_DETECTION_SOURCE;
  detectorVersion: typeof REASONING_CONTROL_DETECTOR_VERSION;
  observedAt: string;
  endpointFingerprint: string;
};

export function normalizeDetectedReasoningControl(
  value: unknown
): DetectedReasoningControl | undefined {
  const record =
    value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
  if (
    record?.mode !== "chat-template" ||
    record.source !== REASONING_CONTROL_DETECTION_SOURCE ||
    record.detectorVersion !== REASONING_CONTROL_DETECTOR_VERSION ||
    typeof record.observedAt !== "string" ||
    !record.observedAt ||
    typeof record.endpointFingerprint !== "string" ||
    !record.endpointFingerprint
  ) {
    return undefined;
  }

  const modelBackends =
    record.modelBackends &&
    typeof record.modelBackends === "object" &&
    !Array.isArray(record.modelBackends)
      ? Object.entries(record.modelBackends as JsonRecord)
      : [];
  if (
    modelBackends.length === 0 ||
    modelBackends.length > REASONING_CONTROL_MAX_MODELS ||
    modelBackends.some(
      ([modelId, backend]) =>
        modelId.length === 0 ||
        typeof backend !== "string" ||
        !REASONING_CONTROL_DETECTED_BACKENDS.has(backend)
    )
  ) {
    return undefined;
  }

  return {
    mode: "chat-template",
    modelBackends: Object.fromEntries(modelBackends) as Record<string, string>,
    source: REASONING_CONTROL_DETECTION_SOURCE,
    detectorVersion: REASONING_CONTROL_DETECTOR_VERSION,
    observedAt: record.observedAt,
    endpointFingerprint: record.endpointFingerprint,
  };
}
