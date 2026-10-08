import {
  finalizePendingRequest,
  finalizePendingRequestById,
  updatePendingRequest,
  updatePendingRequestById,
  type PendingRequestMetadata,
} from "./usageHistory";

export type PendingRequestScope = {
  id: string | null | undefined;
  model: string;
  provider: string;
  connectionId: string | null;
  videoTranscriptSensitive?: boolean;
};

const OMITTED_VIDEO_TRANSCRIPT = "[omitted: video transcript]";
const PENDING_PAYLOAD_KEYS = [
  "clientRequest",
  "providerRequest",
  "providerResponse",
  "clientResponse",
] as const;

function omitVideoSensitivePendingPayload(payload: unknown, sensitive: boolean): unknown {
  return sensitive ? { _omniroute_omitted: "video-transcript" } : payload;
}

export function initialPendingBody(
  body: unknown,
  effectiveModel: string,
  sensitive: boolean
): unknown {
  const initial =
    body && typeof body === "object" && !Array.isArray(body)
      ? {
          ...(body as Record<string, unknown>),
          model:
            typeof (body as Record<string, unknown>).model === "string"
              ? (body as Record<string, unknown>).model
              : effectiveModel,
        }
      : body;
  return omitVideoSensitivePendingPayload(initial, sensitive);
}

function protectPendingMetadata(
  scope: PendingRequestScope,
  metadata: PendingRequestMetadata
): PendingRequestMetadata {
  if (!scope.videoTranscriptSensitive) return metadata;

  // A provider request or reply may contain rendered transcript prose without
  // any structured cue boundary. Omit only the retained preview; callers keep
  // their original values for dispatch, response handling and classification.
  const protectedMetadata = { ...metadata };
  for (const key of PENDING_PAYLOAD_KEYS) {
    protectedMetadata[key] = omitVideoSensitivePendingPayload(metadata[key], true);
  }
  if (metadata.providerUrl !== undefined) protectedMetadata.providerUrl = OMITTED_VIDEO_TRANSCRIPT;
  if (metadata.error !== undefined) protectedMetadata.error = OMITTED_VIDEO_TRANSCRIPT;
  if (metadata.errorCode !== undefined) protectedMetadata.errorCode = OMITTED_VIDEO_TRANSCRIPT;
  if (metadata.sessionTag !== undefined) protectedMetadata.sessionTag = OMITTED_VIDEO_TRANSCRIPT;
  return protectedMetadata;
}

export function updatePendingScope(scope: PendingRequestScope, metadata: PendingRequestMetadata) {
  const retainedMetadata = protectPendingMetadata(scope, metadata);
  if (!updatePendingRequestById(scope.id || null, retainedMetadata)) {
    updatePendingRequest(scope.model, scope.provider, scope.connectionId, retainedMetadata);
  }
}

export function finalizePendingScope(scope: PendingRequestScope, metadata: PendingRequestMetadata) {
  const retainedMetadata = protectPendingMetadata(scope, metadata);
  if (!finalizePendingRequestById(scope.id, retainedMetadata)) {
    finalizePendingRequest(scope.model, scope.provider, scope.connectionId, retainedMetadata);
  }
}
