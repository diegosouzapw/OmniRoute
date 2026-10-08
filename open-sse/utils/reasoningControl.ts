import { createHash } from "node:crypto";
import {
  REASONING_CONTROL_DETECTED_BACKENDS,
  REASONING_CONTROL_DETECTION_SOURCE,
  REASONING_CONTROL_DETECTOR_VERSION,
  REASONING_CONTROL_MAX_MODELS,
  normalizeDetectedReasoningControl,
  type DetectedReasoningControl,
} from "@/shared/reasoning/reasoningControl.ts";

export {
  REASONING_CONTROL_DETECTION_SOURCE,
  REASONING_CONTROL_DETECTOR_VERSION,
  normalizeDetectedReasoningControl,
  type DetectedReasoningControl,
} from "@/shared/reasoning/reasoningControl.ts";

type JsonRecord = Record<string, unknown>;
const MAX_TRANSPARENT_OWNER_DEPTH = 3;

function toRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

export function getReasoningControlEndpointFingerprint(
  providerSpecificData: unknown
): string | null {
  const data = toRecord(providerSpecificData);
  const rawBaseUrl = typeof data?.baseUrl === "string" ? data.baseUrl.trim() : "";
  const apiType =
    typeof data?.apiType === "string" && data.apiType.trim()
      ? data.apiType.trim().toLowerCase()
      : "chat";
  if (!rawBaseUrl || apiType !== "chat") return null;

  let baseUrl: string;
  try {
    const parsed = new URL(rawBaseUrl);
    parsed.hash = "";
    baseUrl = parsed.toString().replace(/\/+$/, "");
  } catch {
    return null;
  }
  const chatPath = typeof data?.chatPath === "string" ? data.chatPath.trim() : "";
  return createHash("sha256")
    .update(JSON.stringify({ apiType, baseUrl, chatPath }))
    .digest("hex")
    .slice(0, 24);
}

export function detectReasoningControl(
  modelsPayload: unknown,
  providerSpecificData: unknown,
  observedAt = new Date().toISOString()
): DetectedReasoningControl | null {
  const payload = toRecord(modelsPayload);
  const rows = payload?.data;
  if (!Array.isArray(rows) || rows.length === 0 || rows.length > REASONING_CONTROL_MAX_MODELS)
    return null;

  const endpointFingerprint = getReasoningControlEndpointFingerprint(providerSpecificData);
  if (!endpointFingerprint) return null;

  const evidence = new Map<string, string | null>();
  for (const row of rows) {
    const record = toRecord(row);
    const modelId = typeof record?.id === "string" && record.id.length > 0 ? record.id : null;
    if (!modelId) continue;

    const backend = readDetectedBackend(record);
    if (!evidence.has(modelId)) {
      evidence.set(modelId, backend);
    } else if (evidence.get(modelId) !== backend) {
      evidence.set(modelId, null);
    }
  }

  const modelBackends = Object.fromEntries(
    [...evidence].filter((entry): entry is [string, string] => entry[1] !== null)
  );
  if (Object.keys(modelBackends).length === 0) return null;

  return {
    mode: "chat-template",
    modelBackends,
    source: REASONING_CONTROL_DETECTION_SOURCE,
    detectorVersion: REASONING_CONTROL_DETECTOR_VERSION,
    observedAt,
    endpointFingerprint,
  };
}

function readDetectedBackend(row: JsonRecord): string | null {
  let current: JsonRecord | null = row;
  for (let depth = 0; current && depth <= MAX_TRANSPARENT_OWNER_DEPTH; depth += 1) {
    const owner = typeof current.owned_by === "string" ? current.owned_by.trim().toLowerCase() : "";
    if (REASONING_CONTROL_DETECTED_BACKENDS.has(owner)) return owner;
    if (owner !== "openai" || depth === MAX_TRANSPARENT_OWNER_DEPTH) return null;
    current = toRecord(current.openai);
  }
  return null;
}

export function resolveReasoningControl(
  providerSpecificData: unknown,
  modelId?: unknown
): "chat-template" | "openai" {
  const data = toRecord(providerSpecificData);
  if (data?.reasoningControl === "chat-template") return "chat-template";
  if (data?.reasoningControl === "openai") return "openai";
  if (typeof modelId !== "string" || modelId.length === 0) return "openai";

  const detected = normalizeDetectedReasoningControl(data?.detectedReasoningControl);
  const currentFingerprint = getReasoningControlEndpointFingerprint(data);
  if (!detected || detected.endpointFingerprint !== currentFingerprint) return "openai";
  return Object.hasOwn(detected.modelBackends, modelId) ? "chat-template" : "openai";
}
